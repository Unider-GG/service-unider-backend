import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { HangOutController } from './hang-out.controller';
import { HangOutService } from './hang-out.service';

@Module({
  imports: [SharedModule],
  controllers: [HangOutController],
  providers: [HangOutService],
})
export class HangOutModule {}
