import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InternalQueryResult } from './discovery.service';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  private _result$ = new BehaviorSubject<InternalQueryResult>(null);
  result$: Observable<InternalQueryResult> = this._result$.asObservable();

  pdfUrl$: Observable<string> = this.result$.pipe(
    map(result => result?.documentUrl || ""),
  );

  private _show$ = new BehaviorSubject(false);
  show$: Observable<boolean> = this._show$.asObservable();

  constructor() {}

  open(result: InternalQueryResult) {
    this._result$.next(result);
    this._show$.next(true);
  }

  close() {
    this._show$.next(false);
  }
}
