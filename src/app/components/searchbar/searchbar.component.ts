import { Component } from '@angular/core';
import { Candidate, DiscoveryService } from '../../services/discovery.service';
import { SelectItem } from 'primeng/api/selectitem';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent {

  // Imports
  Candidate = Candidate;

  // Local form state
  query = '';
  candidate = Candidate.BOTH;
  selectedCategories = [];
  preserveCategoryFilter = false;

  categories$: Observable<SelectItem[]> = this.discoveryService.categories$.pipe(
    tap(categories => this.onCategoryListChange(categories)),
    map(categories => categories.map((category) => ({ label: category, value: category})))
  );

  candidates: SelectItem[] = [
    { label: "Trump vs. Biden", value: Candidate.BOTH },
    { label: "Trump only", value: Candidate.TRUMP },
    { label: "Biden only", value: Candidate.BIDEN },
  ];

  constructor(
    private discoveryService: DiscoveryService, 
    private messageService: MessageService
  ) {
    this.discoveryService.categoryFilter$.subscribe(categories => {
      if (categories != this.selectedCategories) {
        this.selectedCategories = categories;
      }
    });

    this.discoveryService.lastQuery$.pipe(
      tap((query) => { if (this.query != query) this.query = query; }),
    ).subscribe();
  }

  async onSearch() {
    this.preserveCategoryFilter = false;

    if (!this.query) {
      this.messageService.add({
        severity: 'error',
        summary: 'Invalid Form!',
        detail: 'You must enter a query to search',
      });
    } else {
      await this.discoveryService.query(this.query);
    }
  }

  onCandidateSelect() {
    this.discoveryService.setCandidateFilter(this.candidate);
  }

  onCategorySelect(event: { value: string[] }) {
    this.setCategoriesFilter(event.value, true);
  }

  private setCategoriesFilter(categories: string[], wasUser: boolean) {
    this.preserveCategoryFilter = wasUser;
    this.selectedCategories = categories;
    this.discoveryService.setCategoryFilter(categories);
  }

  private onCategoryListChange(categoryList: string[]) {
    if (!this.preserveCategoryFilter) {
      this.setCategoriesFilter(categoryList, false);
    } else {
      let updatedFilter = categoryList.filter(category => this.selectedCategories.includes(category));
      if (updatedFilter.length === 0) {
        this.setCategoriesFilter(categoryList, false);
      } else if (updatedFilter !== this.selectedCategories) {
        this.setCategoriesFilter(updatedFilter, true);
      }
    }
  }
}
