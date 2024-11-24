import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MapsApiProvider } from 'src/providers/abstract-providers/map-api.provider';
import { AddressPredictionDto } from 'src/providers/dtos/address-prediction.dto';

@Injectable()
export class GetPredictionsService {
  constructor(private readonly mapsApiProvider: MapsApiProvider) {}

  handle(input: string): Promise<AddressPredictionDto[]> {
    if (!input) {
      throw new HttpException(
        {
          error_code: 'INVALID_DATA',
          error_description: 'Deve ser informado um input para a pesquisa.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.mapsApiProvider.getPredictions(input);
  }
}
