import { Injectable } from '@nestjs/common';
import { RideRepository } from '../abstract-repositories/ride.repository';
import { RideCreateData } from '../create-data/ride-create.data';
import { RideDto } from 'src/modules/ride/dtos/ride.dto';
import { RideFilterData } from '../filter-data/ride-filter.data';

const rides: RideDto[] = [
  {
    id: 234,
    customerId: 'valid-customer-id',
    driverId: 1,
    origin: 'Point A',
    destination: 'Point B',
    date: new Date(),
    distance: 10,
    duration: '10min',
    value: 50,
  },
  {
    id: 567,
    customerId: 'valid-customer-id',
    driverId: 2,
    origin: 'Point C',
    destination: 'Point D',
    date: new Date(),
    distance: 15,
    duration: '15min',
    value: 75,
  },
  {
    id: 567,
    customerId: 'other-customer-id',
    driverId: 3,
    origin: 'Point E',
    destination: 'Point F',
    date: new Date(),
    distance: 15,
    duration: '15min',
    value: 75,
  },
];

@Injectable()
export class TestMockRideRepository implements RideRepository {
  findMany = jest
    .fn()
    .mockImplementation((filterData: RideFilterData): Promise<RideDto[]> => {
      let filteredRides = rides;

      if (filterData.customerId) {
        filteredRides = rides.filter(
          (r) => r.customerId === filterData.customerId,
        );
      }

      if (filterData.driverId) {
        filteredRides = rides.filter((r) => r.driverId === filterData.driverId);
      }
      return Promise.resolve(filteredRides);
    });

  create = jest
    .fn()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .mockImplementation((_data: RideCreateData): Promise<void> => {
      return Promise.resolve();
    });
}
