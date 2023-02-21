import { Module } from '@nestjs/common';
import { GoogleApiService } from './google-api/google-api.service';

@Module({
  providers: [GoogleApiService],
  exports: [GoogleApiService],
})
export class SharedModule {}
