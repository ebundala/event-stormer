import { Injectable } from '@nestjs/common';
import { SchemaDto } from './schemaDto';
import { runner } from 'hygen';
import * as fs from 'fs';
import * as path from 'path';
const execa = require('execa');
const Logger = require('hygen/lib/logger');
const defaultTemplates = path.join(__dirname, '_templates');
const zipFile = path.join(__dirname, '../generated.zip');
const reflect = (p) => p.then((v) => ({ v, status: true }),
  (e) => ({ e, status: false }));

@Injectable()
export class AppService {
  async generateCode(data: SchemaDto): Promise<any> {
    try {
      await execa.command("rimraf generated")
      await execa.command("rimraf generated.zip")
    } catch (e) {
      console.log(e)
    }
    const schema = data.schema;
    const res = await Promise.all(schema.map((item) => reflect(this.generate(item))));
   // console.log(res)
   try{
    await execa.command("zip -r generated.zip generated")
    return fs.createReadStream(zipFile);
   }
   catch(e){
     console.trace(e)
     throw new Error(e);
   } 
  }
  generate(item){
    const args = ["nest-cqrs-generator", "new", "--schema", JSON.stringify(item)]
    return runner(args, {
      templates: defaultTemplates,
      cwd: process.cwd(),
      logger: new Logger(console.log.bind(console)),
      createPrompter: () => require('enquirer'),
      exec: (action, body) => {
        const opts = body && body.length > 0 ? { input: body } : {}
        return execa.shell(action, opts)
      },
      debug: true //!!process.env.DEBUG
    });
    
  }
  index(): any {
    return { title: 'Nest-CQRS/ES Boilerplate Generator' };
  }

}
