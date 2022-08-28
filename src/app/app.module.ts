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
import { DocumentNamePipe } from './pipes/document-name.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { VarDirective } from './directives/var.directive';
import { MatDialogModule } from '@angular/material/dialog'; 
import { BaseUrlInterceptor } from 'src/app/interceptors/base-url.interceptor';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatNativeDateModule, } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    AddDocumentModalComponent,
    SearchPanelComponent,
    WorkWithDocumentsPanelComponent,
    MainPageComponent,
    DocumentsTableComponent,
    DocumentNamePipe,
    VarDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    HttpClientModule,
    MatPaginatorModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule,
    MatFormFieldModule,
    MatSortModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
