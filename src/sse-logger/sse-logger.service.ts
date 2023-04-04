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
    return new Proxy(this, {
      get(target, key) {
        const origMethod = target[key];
        if (typeof origMethod == 'function') {
          return function (...args: any) {
            if (this.useWeb)
              this.sseSubject.next({
                data: args[0],
                id: new Date().toJSON(),
                type: key.toString(),
              });
            let result = origMethod.apply(target, args);
            return result;
          };
        }
      },
    });
  }
}
