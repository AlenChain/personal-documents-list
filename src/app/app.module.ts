import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddDocumentModalComponent } from './components/add-document-modal/add-document-modal.component';
import { SearchPanelComponent } from './components/search-panel/search-panel.component';
import { WorkWithDocumentsPanelComponent } from './components/work-with-documents-panel/work-with-documents-panel.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { DocumentsTableComponent } from './components/documents-table/documents-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { DocumentNamePipe } from './pipes/document-name.pipe'  

@NgModule({
  declarations: [
    AppComponent,
    AddDocumentModalComponent,
    SearchPanelComponent,
    WorkWithDocumentsPanelComponent,
    MainPageComponent,
    DocumentsTableComponent,
    DocumentNamePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
