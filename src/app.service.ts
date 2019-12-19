import { Injectable } from '@nestjs/common';
import { SchemaDto } from './schemaDto';
import {runner } from 'hygen';
const Logger = require('hygen/lib/logger')
const path = require('path')

const defaultTemplates = path.join(__dirname, '_templates')


@Injectable()
export class AppService {
 async generateCode(data: SchemaDto): Promise<any> {
    const schema = data.schema;
    schema.forEach(async (sch)=>{      
      const args =["nest-cqrs-generator", "new", "--schema", JSON.stringify(sch)]
  const result = await  runner(args, {
      templates: defaultTemplates,
      cwd: process.cwd(),
      logger: new Logger(console.log.bind(console)),
      createPrompter: () => require('enquirer'),
      exec: (action, body) => {
        const opts = body && body.length > 0 ? { input: body } : {}
        return require('execa').shell(action, opts)
      },
      debug:true //!!process.env.DEBUG
    });
    console.log(result);
  })
    return schema;
  }
  index(): any {
    return {title:'Nest-CQRS/ES Boilerplate Generator'};
  }

}
