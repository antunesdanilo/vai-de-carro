import { Controller, Get } from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DriverFindManyService } from '../service/find-many.service';
import { DriverDto } from '../dtos/driver.dto';

@ApiTags('drivers')
@Controller('driver')
export class DriverController {
  constructor(private readonly driverFindManyService: DriverFindManyService) {}

  /**
   * Get a list of all drives.
   * @returns {DriverDto[]} - A list of driver data.
   */
  @Get()
  @ApiOperation({ summary: 'Get all drivers' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the list of drivers.',
    type: [DriverDto],
  })
  getDrivers(): Promise<DriverDto[]> {
    return this.driverFindManyService.handle();
  }
}
