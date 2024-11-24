import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RideEstimateInput } from '../inputs/ride-estimate.input';
import { DriverRepository } from 'src/repositories/abstract-repositories/driver.repository';
import { RideEstimateDto } from '../dtos/ride-estimate.dto';
import { DriverDto } from '../dtos/driver.dto';
import { DriverOptionDto } from '../dtos/driver-option.dto';
import { MapsApiProvider } from 'src/providers/abstract-providers/map-api.provider';

@Injectable()
export class GetRideEstimateService {
  constructor(
    private readonly driverRepository: DriverRepository,
    private readonly mapsApiProvider: MapsApiProvider,
  ) {}

  async handle(rideEstimateInput: RideEstimateInput): Promise<RideEstimateDto> {
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

    const distanceMatrix = await this.mapsApiProvider.getDistance(
      rideEstimateInput.origin,
      rideEstimateInput.destination,
    );

    const distanceInKilometers = distanceMatrix.distanceInMeters / 1000;

    const durationInMinutes = +(distanceMatrix.durationInSeconds / 60).toFixed(
      0,
    );

    const originGeoLocation = await this.mapsApiProvider.getGeoLocation(
      rideEstimateInput.origin,
    );

    const destinationGeoLocation = await this.mapsApiProvider.getGeoLocation(
      rideEstimateInput.destination,
    );

    const drivers: DriverDto[] = await this.driverRepository.findMany({
      distance: distanceInKilometers,
    });

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
