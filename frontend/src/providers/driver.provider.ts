import BaseApiProvider from './base-api.provider';
import { DriverDto } from './dtos/driver.dto';
import { IDriverProvider } from './interfaces/driver.provider';

export class DriverProvider extends BaseApiProvider implements IDriverProvider {
  getDrivers(): Promise<DriverDto[]> {
    return this.get<DriverDto[]>('/driver');
  }
}
