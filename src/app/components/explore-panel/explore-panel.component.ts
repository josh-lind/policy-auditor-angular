import { Component, Input } from '@angular/core';
import { ExploreTerm } from 'pizza-bot-shared';

@Component({
  selector: 'app-explore-panel',
  templateUrl: './explore-panel.component.html',
  styleUrls: ['./explore-panel.component.scss'],
})
export class ExplorePanelComponent {
  @Input() terms: ExploreTerm[];

  constructor() {}
}
