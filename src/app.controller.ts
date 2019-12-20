import { Controller, Get, Post, Body,Render, Header, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { SchemaDto } from './schemaDto';

@Controller("/editor")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root(): string {
    return this.appService.index();
  }
  @Post()
  @Header('Content-Type', 'application/zip')
  @Header('Content-Disposition',`attachment; filename=generated.zip`)
  async generateCode(@Body() schema:SchemaDto, @Res() res){
    const file = await this.appService.generateCode(schema);
    return file.pipe(res);
  }
}
