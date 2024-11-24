import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DriverRepository } from 'src/repositories/abstract-repositories/driver.repository';
import { RideRepository } from 'src/repositories/abstract-repositories/ride.repository';
import { CustomerRepository } from 'src/repositories/abstract-repositories/customer.repository';
import { RideCreateData } from 'src/repositories/create-data/ride-create.data';
import { CreateStatusDto } from 'src/app/dtos/create-status.dto';
import { RideConfirmCreateInput } from '../inputs/ride-confirm-create.input';
import { generateNumericId } from 'src/utils/generate-numeric-id.util';

@Injectable()
export class CreateRideConfirmService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly driverRepository: DriverRepository,
    private readonly rideRepository: RideRepository,
  ) {}

  async handle(
    rideConfirmInput: RideConfirmCreateInput,
  ): Promise<CreateStatusDto> {
    if (rideConfirmInput.origin === rideConfirmInput.destination) {
      throw new HttpException(
        {
          error_code: 'INVALID_DATA',
          error_description:
            'Os endereços de origem e destino não podem ser iguais.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const customer = await this.customerRepository.findById(
      rideConfirmInput.customer_id,
    );

    if (!customer) {
      throw new HttpException(
        {
          error_code: 'CUSTOMER_NOT_FOUND',
          error_description: `O cliente com o id ${rideConfirmInput.customer_id} não foi encontrado.`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const driver = await this.driverRepository.findById(
      rideConfirmInput.driver.id,
    );

    if (!driver) {
      throw new HttpException(
        {
          error_code: 'DRIVER_NOT_FOUND',
          error_description: `O motorista com o id ${rideConfirmInput.driver.id} não foi encontrado.`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (driver.minimumDistanteInKm > rideConfirmInput.distance) {
      throw new HttpException(
        {
          error_code: 'INVALID_DISTANCE',
          error_description: `Este motorista aceita apenas corridas de no mínimo ${driver.minimumDistanteInKm}km.`,
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const createData: RideCreateData = {
      id: generateNumericId(),
      customerId: customer.id,
      driverId: driver.id,
      origin: rideConfirmInput.origin,
      destination: rideConfirmInput.destination,
      distance: rideConfirmInput.distance,
      duration: rideConfirmInput.duration,
      date: new Date(),
      value: rideConfirmInput.value,
    };

    this.rideRepository.create(createData);

    return { success: true };
  }
}
