import { Pipe, PipeTransform } from '@angular/core';
import { DocumentType } from 'src/app/constants/document-types';

@Pipe({
  name: 'documentName'
})
export class DocumentNamePipe implements PipeTransform {

  transform(documentType: string): string {
    switch(documentType) {
      case DocumentType.Passport: {
        return 'Паспорт гражданина РФ';
      }
      case DocumentType.TransborderPassport: {
        return 'Загран. паспорт гражданина';
      }
      case DocumentType.BirthCertificate: {
        return 'Свидетельство о рождении';
      }
      default: {
        return 'Документ';
      }
    }
  }

}
