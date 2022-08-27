import { Pipe, PipeTransform } from '@angular/core';
import { PersonalDocumentType } from 'src/app/constants/document-types';

@Pipe({
  name: 'documentName'
})
export class DocumentNamePipe implements PipeTransform {

  transform(documentType: string): string {
    switch(documentType) {
      case PersonalDocumentType.Passport: {
        return 'Паспорт гражданина РФ';
      }
      case PersonalDocumentType.TransborderPassport: {
        return 'Загран. паспорт гражданина';
      }
      case PersonalDocumentType.BirthCertificate: {
        return 'Свидетельство о рождении';
      }
      default: {
        return 'Документ';
      }
    }
  }

}
