import { Component, Input } from '@angular/core';
import { InternalQueryResult, Candidate, DiscoveryService } from '../../services/discovery.service';
import { Relevancy } from 'pizza-bot-shared'
import { MessageService } from 'primeng/api';
import { PdfService } from 'src/app/services/pdf.service';

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.scss']
})
export class ResultCardComponent {

  @Input() result: InternalQueryResult;
  @Input() candidate: Candidate.BIDEN | Candidate.TRUMP;

  constructor(
    private discovery: DiscoveryService,
    private messageService: MessageService, 
    private pdfService: PdfService
  ) { }

  positiveFeedback() {
    this.result.sendFeedback(Relevancy.HighlyRelevant);
    this.messageService.add({
      severity: 'success',
      summary: 'Thank you',
      detail: 'Your feedback has been recorded and will help improve results in the future.'
    });
  }

  negativeFeedback() {
    this.result.sendFeedback(Relevancy.Irrelevant);
    this.messageService.add({
      severity: 'success',
      summary: 'Thank you',
      detail: 'Your feedback has been recorded and will help improve results in the future.'
    });
  }

  onViewPdfButton(result: InternalQueryResult) {
    this.pdfService.open(result);
  }

  getConfidenceString(confidence): string {
    if (confidence > .45) {
      return "High";
    } else if (confidence > .2) {
      return "Medium";
    } else {
      return "Low";
    }
  }

  setCategoryFilter(category: string) {
    this.discovery.setCategoryFilter([category]);
  }
}
