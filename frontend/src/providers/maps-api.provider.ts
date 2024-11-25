import BaseApiProvider from './base-api.provider';
import { MapsApiPredictionDto } from './dtos/maps-api-prediction.dto';
import { IMapsApiProvider } from './interfaces/maps-api.provider';

export class MapsApiProvider
  extends BaseApiProvider
  implements IMapsApiProvider
{
  async getPredictions(input: string): Promise<MapsApiPredictionDto[]> {
    return this.get<MapsApiPredictionDto[]>(
      `/maps-api/predictions?input=${encodeURIComponent(input)}`
    );
  }
}
