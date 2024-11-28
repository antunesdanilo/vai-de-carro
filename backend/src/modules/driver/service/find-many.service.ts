import { Injectable } from '@nestjs/common';
import { DriverRepository } from 'src/repositories/abstract-repositories/driver.repository';
import { DriverDto } from '../dtos/driver.dto';

@Injectable()
export class DriverFindManyService {
  // Injecting the DriverRepository to access driver data
  constructor(private readonly driverRepository: DriverRepository) {}

  /**
   * Handles the retrieval of all drivers.
   *
   * This method uses the driver repository to fetch a list of all drivers.
   * It returns an array of DriverDto objects representing the drivers.
   *
   * @returns A promise that resolves to an array of DriverDto objects.
   */
  async handle(): Promise<DriverDto[]> {
    // Fetching all drivers from the repository
    const drivers = this.driverRepository.findMany({});

    // Returning the list of drivers
    return drivers;
  }
}
