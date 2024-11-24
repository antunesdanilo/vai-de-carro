import { Global, Module } from '@nestjs/common';

import { DriverRepository } from './abstract-repositories/driver.repository';
import { CustomerRepository } from './abstract-repositories/customer.repository';
import { PrismaCustomerRepository } from './prisma-repositories/repositories/customer.repository';
import { PrismaDriverRepository } from './prisma-repositories/repositories/driver.repository';
import { RideRepository } from './abstract-repositories/ride.repository';
import { PrismaRideRepository } from './prisma-repositories/repositories/ride.repository';

@Global()
@Module({
  providers: [
    {
      provide: CustomerRepository,
      useClass: PrismaCustomerRepository,
    },
    {
      provide: DriverRepository,
      useClass: PrismaDriverRepository,
    },
    {
      provide: RideRepository,
      useClass: PrismaRideRepository,
    },
  ],
  exports: [CustomerRepository, DriverRepository, RideRepository],
})
export class RepositoriesModule {}
