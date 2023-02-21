import { Injectable } from '@nestjs/common';
import { GoogleApiService } from 'src/shared/google-api/google-api.service';
import { GooglePlacesAPIQuery } from 'src/shared/models/googleAPI';

@Injectable()
export class HangOutService {
  constructor(private readonly googleAPIService: GoogleApiService) {}

  async getNearbysearchHangOut({
    latitude,
    location,
    longitude,
    radius,
    type,
  }: GooglePlacesAPIQuery) {
    try {
      if (location && (!latitude || !longitude)) {
        return {
          message: 'Parametro de localidade ou coordenada é obrigatorio',
        };
      }
      const { results } = await this.googleAPIService.nearbysearch({
        latitude,
        location,
        longitude,
        radius,
        type,
      });
      return { results };
    } catch (error) {
      return { error };
    }
  }
}
