import { Component, OnInit } from '@angular/core';
import { DiscoveryService } from 'src/app/services/discovery.service';

@Component({
  selector: 'app-welcome-suggestions',
  templateUrl: './welcome-suggestions.component.html',
  styleUrls: ['./welcome-suggestions.component.scss']
})
export class WelcomeSuggestionsComponent {

  suggestions: string[] = [
    "Gun Control",
    "Jobs",
    "COVID-19, Coronavirus, and Pandemic Response",
    "Climate Change",
    "Environmental Regulation",
    "Criminal Justice",
    "Drugs",
    "Racism",
    "Education",
    "Military",
    "Supreme Court",
    "China",
    "Healthcare",
    "Student Loans",
    "Law",
  ];

  constructor(private discovery: DiscoveryService) { }

  search(searchText: string) {
    this.discovery.query(searchText);
  }
}
