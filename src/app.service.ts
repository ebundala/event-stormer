import { Injectable } from '@nestjs/common';
import { SchemaDto } from './schemaDto';

@Injectable()
export class AppService {
  generateCode(schema: SchemaDto): string {
    throw new Error("Method not implemented.");
  }
  index(): any {
    return {title:'Nest-CQRS/ES Boilerplate Generator'};
  }
}
