import { MapsApiPredictionDto } from '../dtos/maps-api-prediction.dto';

export interface MapsApiProvider {
  getPredictions(input: string): Promise<MapsApiPredictionDto[]>;
}
