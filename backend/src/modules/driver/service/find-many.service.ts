import { Injectable } from '@nestjs/common';
import { DriverRepository } from 'src/repositories/abstract-repositories/driver.repository';
import { DriverDto } from '../dtos/driver.dto';

@Injectable()
export class DriverFindManyService {
  constructor(private readonly driverRepository: DriverRepository) {}

  async handle(): Promise<DriverDto[]> {
    const drivers = this.driverRepository.findMany({});

    return drivers;
  }
}
