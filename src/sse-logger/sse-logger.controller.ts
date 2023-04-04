import { Controller, Inject, MessageEvent, Sse } from '@nestjs/common';
import { Observable, Subject, map } from 'rxjs';
import { SSE_LOGGER_SUBJECT_TOKEN } from './sse-logger.constants';

@Controller()
export class SseLoggerController {
  sseObservable: Observable<MessageEvent>;

  constructor(
    @Inject(SSE_LOGGER_SUBJECT_TOKEN)
    private readonly sseSubject: Subject<MessageEvent>,
  ) {
    this.sseObservable = this.sseSubject.asObservable();
  }

  @Sse('sse-logger')
  sse(): Observable<MessageEvent> {
    return this.sseObservable.pipe(
      map((event) => ({
        event,
        data: event.data,
        type: event.type,
        id: event.id,
      })),
    );
  }
}
