import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RideEstimateInput } from '../inputs/ride-estimate.input';
import { DriverRepository } from 'src/repositories/abstract-repositories/driver.repository';
import { RideEstimateDto } from '../dtos/ride-estimate.dto';
import { DriverDto } from '../dtos/driver.dto';
import { DriverOptionDto } from '../dtos/driver-option.dto';
import { MapsApiProvider } from 'src/providers/abstract-providers/map-api.provider';

/**
 * Service responsible for calculating the ride estimate based on origin and destination locations.
 *
 * It interacts with the driver repository and maps API provider to calculate:
 * - Distance between origin and destination
 * - Estimated travel time
 * - Available drivers nearby, with their prices and reviews.
 *
 * @export
 * @class GetRideEstimateService
 */
@Injectable()
export class GetRideEstimateService {
  /**
   * Creates an instance of the service with the required dependencies.
   * @param {DriverRepository} driverRepository - Driver repository
   * @param {MapsApiProvider} mapsApiProvider - Maps API provider for geolocation and distance calculations
   */
  constructor(
    private readonly driverRepository: DriverRepository,
    private readonly mapsApiProvider: MapsApiProvider,
  ) {}

  /**
   * Processes the ride estimate, calculating distance, duration, and listing available drivers.
   *
   * @param {RideEstimateInput} rideEstimateInput - Object containing the origin and destination data of the ride
   * @returns {Promise<RideEstimateDto>} - Ride estimate with driver options
   * @throws {HttpException} - Throws an exception if the origin and destination are the same
   */
  async handle(rideEstimateInput: RideEstimateInput): Promise<RideEstimateDto> {
    // Checks if the origin and destination are the same and throws an exception if true
    if (rideEstimateInput.origin === rideEstimateInput.destination) {
      throw new HttpException(
        {
          error_code: 'INVALID_DATA',
          error_description:
            'Os locais de origem e destino não podem ser iguais.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Gets the distance and estimated duration between origin and destination
    const distanceMatrix = await this.mapsApiProvider.getDistance(
      rideEstimateInput.origin,
      rideEstimateInput.destination,
    );

    const distanceInKilometers = distanceMatrix.distanceInMeters / 1000;

    const durationInMinutes = +(distanceMatrix.durationInSeconds / 60).toFixed(
      0,
    );

    // Gets the geolocation of the origin and destination
    const originGeoLocation = await this.mapsApiProvider.getGeoLocation(
      rideEstimateInput.origin,
    );

    const destinationGeoLocation = await this.mapsApiProvider.getGeoLocation(
      rideEstimateInput.destination,
    );

    // Finds nearby drivers based on the calculated distance
    const drivers: DriverDto[] = await this.driverRepository.findMany({
      distance: distanceInKilometers,
    });

    // Processes the driver options, calculating price and sorting by value
    const driverOptions: DriverOptionDto[] = drivers
      .map((driver) => ({
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.vehicle,
        review: driver.reviews[0],
        value:
          Math.round(
            (driver.pricePerKm * distanceInKilometers + Number.EPSILON) * 100,
          ) / 100,
      }))
      .sort((a: DriverOptionDto, b: DriverOptionDto) =>
        a.value < b.value ? -1 : 1,
      );

    // Returns the ride estimate with the driver options
    return {
      origin: originGeoLocation,
      destination: destinationGeoLocation,
      distance: +distanceInKilometers.toFixed(0),
      duration: `${durationInMinutes / 60 > 1 ? Math.floor(durationInMinutes / 60) + 'h' : ''}${durationInMinutes % 60}min`,
      options: driverOptions,
      routeResponse: distanceMatrix.providerResponse,
    };
  }
}
