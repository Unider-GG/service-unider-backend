import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { GooglePlacesAPIQuery, NearbysearchResult } from '../models/googleAPI';

@Injectable()
export class GoogleApiService {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public async nearbysearch({
    location,
    latitude,
    longitude,
    radius = '1000',
    type = 'bar',
  }: GooglePlacesAPIQuery): Promise<NearbysearchResult> {
    const local = location ?? `${latitude},${longitude}`;
    const GOOGLE_API_KEY = this.config.get<string>('GOOGLE_API_KEY');
    const queryString = `location=${local}&radius=${radius}&type=${type}&key=${GOOGLE_API_KEY}`;

    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${queryString}`,
    );
    return data as NearbysearchResult;
  }
}
