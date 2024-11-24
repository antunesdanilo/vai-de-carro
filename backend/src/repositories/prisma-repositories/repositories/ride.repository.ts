import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RideRepository } from 'src/repositories/abstract-repositories/ride.repository';
import { RideCreateData } from 'src/repositories/create-data/ride-create.data';
import { RideDto } from 'src/modules/ride/dtos/ride.dto';
import { RideFilterData } from 'src/repositories/filter-data/ride-filter.data';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaRideRepository implements RideRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(filterData: RideFilterData): Promise<RideDto[]> {
    const where: Prisma.RideWhereInput = {};

    const include: Prisma.RideInclude = {};

    if (filterData.customerId) {
      where.customerId = filterData.customerId;
    }

    if (filterData.driverId) {
      where.driverId = filterData.driverId;
    }

    if (filterData.includeDriver && filterData.includeDriverFields) {
      include.driver = {
        select: filterData.includeDriverFields.reduce(
          (acc, field) => {
            acc[field] = true;
            return acc;
          },
          {} as Record<string, boolean>,
        ),
      };
    } else if (filterData.includeDriver) {
      include.driver = true;
    }

    return this.prisma.ride.findMany({ where, include });
  }

  async create(createData: RideCreateData): Promise<void> {
    await this.prisma.ride.create({ data: createData });
  }
}
