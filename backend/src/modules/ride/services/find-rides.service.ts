import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RideRepository } from 'src/repositories/abstract-repositories/ride.repository';
import { RideFilterData } from 'src/repositories/filter-data/ride-filter.data';
import { CustomerRepository } from 'src/repositories/abstract-repositories/customer.repository';
import { DriverRepository } from 'src/repositories/abstract-repositories/driver.repository';
import { CustomerRidesDto } from '../dtos/customer-rides.dto';

@Injectable()
export class FindRidesService {
  constructor(
    private readonly rideRepository: RideRepository,
    private readonly customerRepository: CustomerRepository,
    private readonly driverRepository: DriverRepository,
  ) {}

  async handle(
    customerId: string,
    driverId?: number,
  ): Promise<CustomerRidesDto> {
    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new HttpException(
        {
          error_code: 'INVALID_CUSTOMER',
          error_description: `O cliente com o id ${customerId} não foi encontrado.`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const filterData: RideFilterData = {
      customerId,
      includeDriver: true,
      includeDriverFields: ['id', 'name'],
    };

    if (driverId !== undefined) {
      const driver = await this.driverRepository.findById(driverId);

      if (!driver) {
        throw new HttpException(
          {
            error_code: 'INVALID_DRIVER',
            error_description: `O motorista com id ${driverId} não foi encontrado.`,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      filterData.driverId = driverId;
    }

    const rides = await this.rideRepository.findMany(filterData);

    if (!rides.length) {
      throw new HttpException(
        {
          error_code: 'NO_RIDES_FOUND',
          error_description:
            'Não foram encontradas corridas para os parâmetros informados.',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      customer_id: customerId,
      rides,
    };
  }
}
