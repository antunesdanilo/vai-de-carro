import { Controller, Get, Query } from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetPredictionsService } from '../services/get-predictions.service';
import { AddressPredictionDto } from 'src/providers/dtos/address-prediction.dto';

@ApiTags('maps-api')
@Controller('maps-api')
export class MapsApiController {
  constructor(
    private readonly customerFindManyService: GetPredictionsService,
  ) {}

  /**
   * Fetches a list of address predictions based on the input query.
   * This method interacts with the Google Maps API to provide autocomplete address suggestions.
   *
   * @param {string} input - The input string to search for address predictions.
   * @returns {Promise<AddressPredictionDto[]>} - A promise that resolves to an array of address predictions.
   * Each prediction contains details like description, place ID, and formatted address.
   *
   * @example
   * // Example of request query: `?input=São Paulo`
   * // Example of response:
   * [
   *   {
   *     "placeId": "ChIJ0WGkg4FEzpQRrlsz_whLqZs",
   *     "description": "São Paulo, SP, Brasil"
   *   },
   *   // More predictions...
   * ]
   */
  @Get('predictions')
  @ApiOperation({
    summary: 'Get address predictions from Google Maps API based on input',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the list of address predictions.',
    type: [AddressPredictionDto],
  })
  @ApiResponse({
    status: 400,
    description:
      'Invalid input provided. Ensure the query parameter is a valid address.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error while processing the request.',
  })
  getPredictions(
    @Query('input') input: string,
  ): Promise<AddressPredictionDto[]> {
    return this.customerFindManyService.handle(input);
  }
}
