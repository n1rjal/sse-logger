import { DynamicModule, MessageEvent, Module } from '@nestjs/common';
import { SseLoggerController } from './sse-logger.controller';
import { SseLoggerService } from './sse-logger.service';
import { SseLoggerRegisterInterface } from './sse-logger.options';
import {
  SSE_LOGGER_SUBJECT_TOKEN,
  SSE_USE_WEB_TOKEN,
} from './sse-logger.constants';
import { Subject } from 'rxjs';

@Module({})
export class SSELoggerModule {
  static register({
    isGlobal,
    useWeb,
  }: SseLoggerRegisterInterface): DynamicModule {
    return {
      module: SSELoggerModule,
      global: !!isGlobal,
      controllers: [SseLoggerController],
      providers: [
        SseLoggerService,
        {
          provide: SSE_USE_WEB_TOKEN,
          useValue: useWeb,
        },
        {
          provide: SSE_LOGGER_SUBJECT_TOKEN,
          useValue: new Subject<MessageEvent>(),
        },
      ],
      exports: [SseLoggerService],
    };
  }
}
