import { RideDto } from 'src/modules/ride/dtos/ride.dto';
import { RideCreateData } from '../create-data/ride-create.data';
import { RideFilterData } from '../filter-data/ride-filter.data';

export abstract class RideRepository {
  abstract findMany(filterData: RideFilterData): Promise<RideDto[]>;

  abstract create(createData: RideCreateData): void;
}
