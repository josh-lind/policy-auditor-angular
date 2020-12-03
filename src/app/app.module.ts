import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfModalComponent } from './components/pdf-modal/pdf-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ResultListComponent } from './components/result-list/result-list.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { ResultCardComponent } from './components/result-card/result-card.component';
import { ProgressBarModule } from 'primeng/progressbar';

import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MultiSelectModule } from 'primeng/multiselect';
import { WelcomeSuggestionsComponent } from './components/welcome-suggestions/welcome-suggestions.component';
import { ExplorePanelComponent } from './components/explore-panel/explore-panel.component';
import { SummaryHoverComponent } from './components/summary-hover/summary-hover.component';
@NgModule({
  declarations: [
    AppComponent,
    PdfModalComponent,
    ResultListComponent,
    HeaderComponent,
    SearchbarComponent,
    ResultCardComponent,
    WelcomeSuggestionsComponent,
    ExplorePanelComponent,
    SummaryHoverComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    PdfViewerModule,
    AppRoutingModule,
    FontAwesomeModule,
    ToolbarModule,
    InputTextModule,
    DropdownModule,
    BrowserAnimationsModule,
    ButtonModule,
    ProgressBarModule,
    ToastModule,
    MultiSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
