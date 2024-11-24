import { DriverDto } from 'src/modules/ride/dtos/driver.dto';
import { DriverFilterData } from '../filter-data/driver-filter.data';

export abstract class DriverRepository {
  abstract findMany(driverFilter: DriverFilterData): Promise<DriverDto[]>;

  abstract findById(id: number): Promise<DriverDto | undefined>;
}
