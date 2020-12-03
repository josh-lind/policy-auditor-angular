import { Component } from '@angular/core';
import { PdfService } from '../../services/pdf.service';

@Component({
  selector: 'app-pdf-modal',
  templateUrl: './pdf-modal.component.html',
  styleUrls: ['./pdf-modal.component.scss']
})
export class PdfModalComponent {

  show$ = this.pdfService.show$;
  result$ = this.pdfService.result$;
  url$ = this.pdfService.pdfUrl$;

  constructor(private pdfService: PdfService) { }

  onClose() {
    this.pdfService.close();
  }
}
