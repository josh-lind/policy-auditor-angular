import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-summary-hover',
  templateUrl: './summary-hover.component.html',
  styleUrls: ['./summary-hover.component.scss'],
})
export class SummaryHoverComponent {
  @Input() summary: string;

  @ViewChild('container')
  container: ElementRef;

  hidden = true;
  styles = {};

  constructor() {}

  show() {
    this.styles = { "transform": this.getTranslation() };
    this.hidden = false;
  }

  hide() {
    this.hidden = true;
  }

  getTranslation(): string {
    const windowHeight = window.innerHeight;
    const containerTop = (this.container
      .nativeElement as HTMLElement).getBoundingClientRect().top;

    if (containerTop > (3 * windowHeight) / 5) {
      return `translateX(3ex) translateY(calc(${containerTop}px - 100% + .5em))`;
    } else {
      return `translateX(3ex) translateY(calc(${containerTop}px + .5em))`;
    }
  }
}
