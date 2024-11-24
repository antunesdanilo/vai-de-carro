import { DriverDto } from '../dtos/driver.dto';

export interface IDriverProvider {
  getDrivers(): Promise<DriverDto[]>;
}
