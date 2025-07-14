import { Module } from '@nestjs/common';
import { WebscrapService } from './webscrap.service';

@Module({
  providers: [WebscrapService]
})
export class WebscrapModule {}
