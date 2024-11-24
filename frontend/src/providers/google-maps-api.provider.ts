import BaseApiProvider from './base-api.provider';
import { MapsApiPredictionDto } from './dtos/maps-api-prediction.dto';
import { MapsApiProvider } from './interfaces/maps-api.provider';

export class GoogleMapsApiProvider
  extends BaseApiProvider
  implements MapsApiProvider
{
  async getPredictions(input: string): Promise<MapsApiPredictionDto[]> {
    return this.get<MapsApiPredictionDto[]>(
      `/maps-api/predictions?input=${encodeURIComponent(input)}`
    );
  }
}
