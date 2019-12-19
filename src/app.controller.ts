import { Controller, Get, Post, Body,Render } from '@nestjs/common';
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
  generateCode(@Body() schema:SchemaDto ): any {
    return this.appService.generateCode(schema);
  }
}
