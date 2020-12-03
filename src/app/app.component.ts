import { Component } from '@angular/core';
import { DiscoveryService, Candidate } from './services/discovery.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent {
  // Imports
  Candidate = Candidate;

  // Stuff from DiscoveryService
  isLoading$ = this.discoveryService.isLoading$;
  candidate$ = this.discoveryService.candidateFilter$;

  hasSearched$ = this.discoveryService.hasSearched$;

  bidenResults$ = combineLatest([this.discoveryService.bidenResults$, this.discoveryService.categoryFilter$]).pipe(
    map(([results, categories]) =>
      results.filter(result => categories.some(category => result.categories.includes(category))))
  );

  trumpResults$ = combineLatest([this.discoveryService.trumpResults$, this.discoveryService.categoryFilter$]).pipe(
    map(([results, categories]) =>
      results.filter(result => categories.some(category => result.categories.includes(category))))
  );

  constructor(
    private discoveryService: DiscoveryService,
  ) { }
}
