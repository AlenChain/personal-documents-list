import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { IPersonalDocument } from 'src/app/interfaces/document';
import { PersonalDocumentType } from 'src/app/constants/document-types';

@Injectable({
  providedIn: 'root'
})
export class DocumentsHttpService {

  constructor(private http: HttpClient) { }

  getDocuments(): Observable<IPersonalDocument[]> {
    return this.http.get<IPersonalDocument[]>('http://localhost:3000/documents');
  }

  getDocumentTypes(): Observable<PersonalDocumentType[]> {
    return this.http.get<PersonalDocumentType[]>('http://localhost:3000/document-types');
  }
}
