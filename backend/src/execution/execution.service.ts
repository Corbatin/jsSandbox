import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class ExecutionService {

  executePython(code: string): Promise<string> {
    return new Promise((resolve) => {

      const process = exec(`python -c "${code.replace(/"/g, '\\"')}"`);

      let output = '';
      let errorOutput = '';

      process.stdout?.on('data', (data) => {
        output += data;
      });

      process.stderr?.on('data', (data) => {
        errorOutput += data;
      });

      process.on('close', () => {
        if (errorOutput) {
          resolve(errorOutput);
        } else {
          resolve(output);
        }
      });

    });
  }
}
