import { MessageEvent } from '@nestjs/common';
import { Subject } from 'rxjs';

let sseSubject = new Subject<MessageEvent>();

export default sseSubject;
