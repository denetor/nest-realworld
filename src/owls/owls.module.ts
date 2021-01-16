import { Module } from '@nestjs/common';
import { OwlsService } from './owls.service';
import { OwlsController } from './owls.controller';

@Module({
  providers: [OwlsService],
  controllers: [OwlsController]
})
export class OwlsModule {}
