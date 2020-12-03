import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faDownload, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { cleanExcerpt, QueryResult, Relevancy } from 'pizza-bot-shared';
import { InternalQueryResult, DiscoveryService, Candidate } from '../../services/discovery.service';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent {
  @Input() results: InternalQueryResult[];
  @Input() candidate: Candidate.BIDEN | Candidate.TRUMP;

  hasSearched$ = this.discoveryService.hasSearched$;
  lastQuery$ = this.discoveryService.lastQuery$;
  categoryFilter$ = this.discoveryService.categoryFilter$;

  // These make imports available to the template
  cleanExcerpt = cleanExcerpt;
  thumbsUp = faThumbsUp;
  thumbsDown = faThumbsDown;
  download = faDownload;
  relevancy = Relevancy;

  constructor(
    private discoveryService: DiscoveryService,
  ) { }
}
