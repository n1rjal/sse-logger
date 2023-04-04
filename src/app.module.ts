import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SSELoggerModule } from './SSE/sse-logger.module';

@Module({
  imports: [
    SSELoggerModule.register({
      isGlobal: true,
      useWeb: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
