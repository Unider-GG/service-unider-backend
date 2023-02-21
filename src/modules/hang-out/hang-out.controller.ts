import { Controller, Get, Inject, Query } from '@nestjs/common';
import { GooglePlacesAPIQuery } from 'src/shared/models/googleAPI';
import { HangOutService } from './hang-out.service';

@Controller('hang-out')
export class HangOutController {
  @Inject(HangOutService)
  private readonly service: HangOutService;

  @Get()
  async findAll(@Query() params: GooglePlacesAPIQuery) {
    return this.service.getNearbysearchHangOut(params);
  }
}
