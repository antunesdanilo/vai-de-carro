import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker/.';
import { DriverRepository } from '../abstract-repositories/driver.repository';
import { DriverDto } from 'src/modules/driver/dtos/driver.dto';

export const drivers: DriverDto[] = [
  {
    id: 1,
    name: faker.person.fullName(),
    description: faker.person.bio(),
    vehicle: faker.vehicle.model(),
    pricePerKm: 5,
    minimumDistanteInKm: 5,
    reviews: [
      {
        id: 1,
        driverId: 1,
        rating: 1,
        comment: 'comment',
      },
    ],
  },
  {
    id: 2,
    name: faker.person.fullName(),
    description: faker.person.bio(),
    vehicle: faker.vehicle.model(),
    pricePerKm: 10,
    minimumDistanteInKm: 10,
    reviews: [
      {
        id: 2,
        driverId: 2,
        rating: 3,
        comment: 'comment',
      },
    ],
  },
  {
    id: 3,
    name: faker.person.fullName(),
    description: faker.person.bio(),
    vehicle: faker.vehicle.model(),
    pricePerKm: 15,
    minimumDistanteInKm: 15,
    reviews: [
      {
        id: 3,
        driverId: 3,
        rating: 5,
        comment: 'comment',
      },
    ],
  },
];

@Injectable()
export class TestMockDriverRepository implements DriverRepository {
  findMany = jest.fn().mockImplementation((): Promise<DriverDto[]> => {
    return Promise.resolve(drivers);
  });

  findById = jest
    .fn()
    .mockImplementation((id: number): Promise<DriverDto | undefined> => {
      const driver = drivers.find((d) => d.id === id);

      if (!driver) {
        return Promise.resolve(undefined);
      }

      return Promise.resolve(driver);
    });
}
