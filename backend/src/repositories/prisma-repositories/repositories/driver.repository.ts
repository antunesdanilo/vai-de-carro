import { Injectable } from '@nestjs/common';
import { DriverRepository } from '../../abstract-repositories/driver.repository';
import { DriverDto } from 'src/modules/ride/dtos/driver.dto';
import { DriverFilterData } from 'src/repositories/filter-data/driver-filter.data';
import { PrismaService } from '../../prisma-repositories/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaDriverRepository implements DriverRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(driverFilter: DriverFilterData): Promise<DriverDto[]> {
    const where: Prisma.DriverWhereInput = {};

    if (driverFilter.distance) {
      where.minimumDistanteInKm = {
        lt: driverFilter.distance,
      };
    }

    return this.prisma.driver.findMany({
      where,
      include: {
        reviews: true,
      },
    });
  }

  findById(id: number): Promise<DriverDto | undefined> {
    return this.prisma.driver.findUnique({
      where: { id },
    });
  }
}
