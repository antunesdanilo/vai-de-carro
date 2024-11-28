import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MapsApiProvider } from '../abstract-providers/map-api.provider';

import { DistanceMatrixDto } from '../dtos/distance-matrix.dto';
import { GeoLocationDto } from 'src/modules/ride/dtos/geo-location.dto';
import { AddressPredictionDto } from '../dtos/address-prediction.dto';

@Injectable()
export class TestMockMapsApiProvider implements MapsApiProvider {
  /**
   * Mock method to simulate distance calculation.
   * It returns a predefined response with distance and duration.
   *
   * @param origin - The origin address.
   * @param destination - The destination address.
   * @returns A mock `DistanceMatrixDto` containing distance and duration.
   */
  getDistance = jest
    .fn()
    .mockImplementation(
      (origin: string, destination: string): Promise<DistanceMatrixDto> => {
        // Mock data for distance and duration
        if (origin === 'Invalid Address' || destination === 'Invalid Address') {
          throw new HttpException(
            {
              error_code: 'INVALID_DATA',
              error_description:
                'The origin or destination address is invalid.',
            },
            HttpStatus.BAD_REQUEST,
          );
        }

        return Promise.resolve({
          distanceInMeters: 10000, // 10 km
          durationInSeconds: 600, // 10 minutes
          providerResponse: {}, // Mock response object
        });
      },
    );

  /**
   * Mock method to simulate geolocation retrieval.
   * It returns a predefined geographical location based on the address.
   *
   * @param address - The address to get the geolocation for.
   * @returns A mock `GeoLocationDto` with latitude and longitude.
   */
  getGeoLocation = jest
    .fn()
    .mockImplementation((address: string): Promise<GeoLocationDto> => {
      // Mock geolocation data
      if (address === 'Invalid Address') {
        throw new HttpException(
          {
            error_code: 'INVALID_DATA',
            error_description: 'Address not found.',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      return Promise.resolve({
        latitude: 40.712776, // Mock latitude
        longitude: -74.005974, // Mock longitude
      });
    });

  /**
   * Mock method to simulate place predictions.
   * It returns a predefined list of address predictions.
   *
   * @param input - The input text for place predictions.
   * @returns A list of mock `AddressPredictionDto`.
   */
  getPredictions = jest
    .fn()
    .mockImplementation((input: string): Promise<AddressPredictionDto[]> => {
      // Mock predictions based on input
      if (input === 'Invalid Input') {
        throw new HttpException(
          {
            error_code: 'BAD_GATEWAY',
            error_description: 'Unable to fetch place predictions.',
          },
          HttpStatus.BAD_GATEWAY,
        );
      }

      return Promise.resolve([
        { placeId: '1', description: 'Mock Place 1' },
        { placeId: '2', description: 'Mock Place 2' },
      ]);
    });
}
