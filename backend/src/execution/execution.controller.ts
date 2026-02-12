import { Controller, Post, Body , Get} from '@nestjs/common';
import { ExecutionService } from './execution.service';

@Controller('execute')
export class ExecutionController {
    constructor(private readonly executionService: ExecutionService) { }

    @Post()
    async execute(@Body() body: { language: string; code: string }) {

        if (body.language === 'python') {
            const result = await this.executionService.executePython(body.code);
            return { output: result };
        }

        return { output: 'Lenguaje no soportado' };
    }
    @Get('execute')
    test() {
        return { message: 'Backend funcionando' };
    }

}

