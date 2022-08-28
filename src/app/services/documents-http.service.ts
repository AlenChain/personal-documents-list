import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { PersonalDocument } from 'src/app/interfaces/document';
import { PersonalDocumentType } from 'src/app/constants/document-types';

@Injectable({
  providedIn: 'root'
})
export class DocumentsHttpService {

  constructor(private http: HttpClient) { }

  getDocuments(): Observable<PersonalDocument[]> {
    return this.http.get<PersonalDocument[]>('http://localhost:3000/documents');
  }

  getDocumentTypes(): Observable<PersonalDocumentType[]> {
    return this.http.get<PersonalDocumentType[]>('http://localhost:3000/document-types');
  }
}
