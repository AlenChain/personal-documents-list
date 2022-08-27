import { Pipe, PipeTransform } from '@angular/core';
import { DocumentType } from 'src/app/constants/document-types';

@Pipe({
  name: 'documentName'
})
export class DocumentNamePipe implements PipeTransform {

  transform(documentType: string): string {
    switch(documentType) {
      case DocumentType.Passport: {
        return 'паспорт гражданина РФ';
      }
      case DocumentType.TransborderPassport: {
        return 'загран. паспорт гражданина';
      }
      case DocumentType.BirthCertificate: {
        return 'свидетельство о рождении';
      }
      default: {
        return 'документ';
      }
    }
  }

}
