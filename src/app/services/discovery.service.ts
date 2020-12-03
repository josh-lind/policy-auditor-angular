import { Injectable, SecurityContext } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FeedbackBody, QueryResult, Relevancy, extractQueryWords, cleanExcerpt } from 'pizza-bot-shared';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class DiscoveryService {
  // private baseUrl = 'http://localhost:3000/api';
  private baseUrl = 'https://evening-gorge-46233.herokuapp.com/api';

  private _categoryFilter$ = new BehaviorSubject([]);
  categoryFilter$: Observable<string[]> = this._categoryFilter$.asObservable();

  private _candidateFilter$ = new BehaviorSubject(Candidate.BOTH);
  candidateFilter$: Observable<Candidate> = this._candidateFilter$.asObservable();

  private _bidenResults$ = new BehaviorSubject<InternalQueryResult[]>([]);
  bidenResults$: Observable<InternalQueryResult[]> = this._bidenResults$.asObservable();

  private _trumpResults$ = new BehaviorSubject<InternalQueryResult[]>([]);
  trumpResults$: Observable<InternalQueryResult[]> = this._trumpResults$.asObservable();

  categories$: Observable<string[]> = combineLatest([this.bidenResults$, this.trumpResults$, this.candidateFilter$]).pipe(
    map(([bidens, trumps, candidateFilter]) => {

      // Only consider categories from results for candidates that are being shown
      let relevantResults = [];
      if (candidateFilter === Candidate.BOTH) {
        relevantResults = [...bidens, ...trumps];
      } else if (candidateFilter === Candidate.BIDEN) {
        relevantResults = bidens;
      } else if (candidateFilter === Candidate.TRUMP) {
        relevantResults = trumps;
      }

      // Get the set of unique categories from all of the results
      return this.extractCategories(relevantResults);
    }),
  );

  private _isLoading$ = new BehaviorSubject(false);
  isLoading$: Observable<boolean> = this._isLoading$.asObservable();

  private _hasSearched$ = new BehaviorSubject(false);
  hasSearched$: Observable<boolean> = this._hasSearched$.asObservable();

  private _lastQuery$ = new BehaviorSubject("");
  lastQuery$: Observable<string> = this._lastQuery$.asObservable();

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  /**
   * Update the category filter.
   * @param categories the new list of filter categories
   */
  setCategoryFilter(categories: string[]) {
    this._categoryFilter$.next(categories);
  }

  /**
   * Update the candidate filter.
   * @param candidate the new candidate (or both)
   */
  setCandidateFilter(candidate: Candidate) {
    this._candidateFilter$.next(candidate);
  }

  /**
   * Make a new query.
   * @param query the search / query text
   */
  async query(query: string): Promise<void> {
    this._isLoading$.next(true);

    let [biden, trump] = await Promise.all([this.getResults(Candidate.BIDEN, query), this.getResults(Candidate.TRUMP, query)]);
    this._bidenResults$.next(biden);
    this._trumpResults$.next(trump);

    this._isLoading$.next(false);
    this._hasSearched$.next(true);
    this._lastQuery$.next(query);
  }

  /**
   * Get results for a single candidate from the backend.
   * @param subject biden or trump (not both)
   * @param query the query / input text
   */
  private async getResults(candidate: Candidate, query: string): Promise<InternalQueryResult[]> {
    if (candidate === Candidate.BOTH)
      throw "Cannot getResults() for both candidates at once";

    // Get the results from the backend
    let params = new HttpParams();
    params = params.append('subject', candidate);
    params = params.append('q', query);
    const rawResults = await this.http
      .get<QueryResult[]>(`${this.baseUrl}/query`, { params })
      .toPromise();

    // Attach a sendFeedback() method to each result
    const internalResults: InternalQueryResult[] = rawResults.map((result) => ({
      sendFeedback: (relevancy: Relevancy) => {
        return this.sendFeedback(candidate, query, result.documentId, relevancy);
      },
      stylizedExcerpts: result.excerpts.map(excerpt => this.formatExcerpt(excerpt, query)),
      terms: result.terms.sort((a, b) => (a.articleTitle || "").localeCompare(b.articleTitle || "")),
      ...result
    }));

    return internalResults;
  }

  /**
   * Adds a training example that associates a document with how relevant it was to a certain query.
   *
   * @param candidate biden or trump (not both)
   * @param query the query that was entered
   * @param documentId the document that was either good or bad
   * @param relevancy how relevant the document was to the query
   */
  private sendFeedback(
    candidate: Candidate,
    query: string,
    documentId: string,
    relevancy: Relevancy
  ): Promise<any> {
    if (candidate === Candidate.BOTH)
      throw "Cannot send feedback for both candidates at once";

    let body: FeedbackBody = {
      subject: candidate,
      query,
      documentId,
      relevancy,
    };

    return this.http.post(`${this.baseUrl}/feedback`, body).toPromise();
  }

  /**
   * Format an excerpt for display. Returns a sanitized HTML string.
   * 
   * @param excerpt the excerpt to be formatted
   * @param query the query that the result is for
   */
  private formatExcerpt(excerpt: string, query: string): string {
    // Remove ugly content
    excerpt = cleanExcerpt(excerpt);
    
    // Remove malicious content
    excerpt = this.sanitizer.sanitize(SecurityContext.HTML, excerpt);
    
    // Bold relevant words
    const queryWords = extractQueryWords(query);
    for (const word of queryWords) {
      const pattern = new RegExp("(^|\\s|-)(" + word + ")([\\s,.]|-|$)", 'ig');
      excerpt = excerpt.replace(pattern, (_, a, b, c) => a + '<b>' + b + '</b>' + c);
    }

    return excerpt;
  }

  /**
   * Get a flat list of all the categories in the given results
   * @param results the results containing the categories
   */
  private extractCategories(results: InternalQueryResult[]): string[] {
    const categories = new Set<string>();
    for (const result of results) {
      for (const category of result?.categories) {
        categories.add(category);
      }
    }

    return Array.from(categories).sort();
  }
}

/**
 * A candidate, the subject of a search
 */
export enum Candidate {
  BOTH = "both",
  BIDEN = "biden",
  TRUMP = "trump",
}

/**
 * An extension of the QueryResult object returned by the backend.
 */
export interface InternalQueryResult extends QueryResult {
  stylizedExcerpts: string[],

  /**
   * Send feedback for this result.
   * @param relevancy how relevant the result was to the query
   */
  sendFeedback(relevancy: Relevancy): Promise<any>;
}