import { Body, Controller, Get, Post } from '@nestjs/common';
import { ExecutionService } from './execution.service';

@Controller('execute')
export class ExecutionController {
  constructor(private readonly executionService: ExecutionService) {}

  @Post()
  async execute(@Body() body: { language: string; code: string }) {

    if (body.language === 'python') {
      const result = await this.executionService.executePython(body.code);
      return { output: result };
    }

    return { output: 'Lenguaje no soportado' };
  }

  @Get()
  test() {
    return { message: 'Backend funcionando en /execute' };
  }
}

