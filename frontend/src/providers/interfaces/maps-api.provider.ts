import { MapsApiPredictionDto } from '../dtos/maps-api-prediction.dto';

export interface IMapsApiProvider {
  getPredictions(input: string): Promise<MapsApiPredictionDto[]>;
}
