import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddDocumentModalComponent } from './add-document-modal/add-document-modal.component';
import { SearchPanelComponent } from './search-panel/search-panel.component';
import { WorkWithDocumentsPanelComponent } from './work-with-documents-panel/work-with-documents-panel.component';
import { MainPageComponent } from './main-page/main-page.component';
import { DocumentsTableComponent } from './documents-table/documents-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AddDocumentModalComponent,
    SearchPanelComponent,
    WorkWithDocumentsPanelComponent,
    MainPageComponent,
    DocumentsTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
