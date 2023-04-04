import { Inject, Injectable, Logger, MessageEvent } from '@nestjs/common';
import { Subject } from 'rxjs';
import {
  SSE_LOGGER_SUBJECT_TOKEN,
  SSE_USE_WEB_TOKEN,
} from './sse-logger.constants';

type LogParams<
  T extends abstract new (...args: any) => any,
  K extends keyof T,
> = Parameters<InstanceType<T>[K]>;

@Injectable()
export class SseLoggerService extends Logger {
  constructor(
    @Inject(SSE_LOGGER_SUBJECT_TOKEN)
    private readonly sseSubject: Subject<MessageEvent>,

    @Inject(SSE_USE_WEB_TOKEN)
    private readonly useWeb: boolean,
  ) {
    super(SseLoggerService.name);
  }

  log(...params: LogParams<typeof Logger, 'log'>) {
    if (this.useWeb)
      this.sseSubject.next({
        data: params[0],
        type: 'log',
        id: new Date().toJSON(),
      });
    super.log(params[0]);
  }

  warn(...params: LogParams<typeof Logger, 'warn'>) {
    if (this.useWeb)
      this.sseSubject.next({
        data: params[0],
        type: 'warn',
        id: new Date().toJSON(),
      });
    super.warn(params[0]);
  }

  error(...params: LogParams<typeof Logger, 'error'>) {
    if (this.useWeb)
      this.sseSubject.next({
        data: params[0],
        type: 'error',
        id: new Date().toJSON(),
      });
    super.error(params[0]);
  }

  verbose(...params: LogParams<typeof Logger, 'verbose'>) {
    if (this.useWeb)
      this.sseSubject.next({
        data: params[0],
        type: 'verbose',
        id: new Date().toJSON(),
      });
    super.verbose(params[0]);
  }

  debug(...params: LogParams<typeof Logger, 'debug'>) {
    if (this.useWeb)
      this.sseSubject.next({
        data: params[0],
        type: 'debug',
        id: new Date().toJSON(),
      });
    super.debug(params[0]);
  }
}
