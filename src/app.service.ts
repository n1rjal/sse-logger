import { Injectable } from '@nestjs/common';
import { SseLoggerService } from './sse-logger/sse-logger.service';

@Injectable()
export class AppService {
  constructor(private readonly loggerService: SseLoggerService) {}

  getHello(name: string): string {
    this.loggerService.log('Hi ' + name);
    return 'Hello World! ' + name;
  }
}
