import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MapsApiProvider } from 'src/providers/abstract-providers/map-api.provider';
import { AddressPredictionDto } from 'src/providers/dtos/address-prediction.dto';

@Injectable()
export class GetPredictionsService {
  /**
   * Constructor for GetPredictionsService.
   * Injects the MapsApiProvider to fetch address predictions.
   *
   * @param mapsApiProvider - The MapsApiProvider used to interact with the map API for address predictions.
   */
  constructor(private readonly mapsApiProvider: MapsApiProvider) {}

  /**
   * Handles the prediction of addresses based on the input string.
   *
   * This method checks if the input is provided. If no input is given, it throws a BAD_REQUEST error.
   * If the input is valid, it fetches address predictions from the MapsApiProvider.
   *
   * @param input - The search string used to get address predictions. This could be a partial address or place name.
   * @returns A promise that resolves to an array of AddressPredictionDto, containing predicted addresses.
   * @throws HttpException if no input is provided (INVALID_DATA).
   */
  handle(input: string): Promise<AddressPredictionDto[]> {
    // Checking if input is provided
    if (!input) {
      // Throwing an error if input is missing
      throw new HttpException(
        {
          error_code: 'INVALID_DATA',
          error_description: 'Deve ser informado um input para a pesquisa.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Fetching address predictions from the MapsApiProvider
    return this.mapsApiProvider.getPredictions(input);
  }
}
