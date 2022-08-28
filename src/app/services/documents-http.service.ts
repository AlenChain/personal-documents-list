import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, map } from 'rxjs';
import { PersonalDocument } from 'src/app/interfaces/document';
import { PersonalDocumentType } from 'src/app/constants/document-types';

@Injectable({
  providedIn: 'root'
})
export class DocumentsHttpService {

  constructor(private http: HttpClient) { }

  getDocuments(): Observable<PersonalDocument[]> {
    return this.http.get<PersonalDocument[]>('documents');
  }

  getDocumentTypes(): Observable<PersonalDocumentType[]> {
    return this.http.get<PersonalDocumentType[]>('document-types');
  }

  getOrganizationTypes(): Observable<string[]> {
    return this.http.get<string[]>('issuance-organizations');
  }

  deleteDocument(document: PersonalDocument | null): Observable<unknown> {
    return this.http.delete<unknown>(`documents/${document?.id}`)
  }

  addDocument(document: PersonalDocument): Observable<PersonalDocument> {
    return this.http.post<PersonalDocument>(`documents`, document);
  }

  editDocument(document: PersonalDocument): Observable<PersonalDocument> {
    return this.http.patch<PersonalDocument>(`documents/${document?.id}`, document);
  }

  getNewId(): Observable<number> {
    return this.http.get<{id: number}>('new-id').pipe(
      switchMap((response: {id: number}) => {
        return this.http.post<{id: number}>('new-id', {id: response.id+1});
      }),
      map((response: {id: number}) => response.id)
    )
  }
}
