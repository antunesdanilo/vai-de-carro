import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CustomerRepository } from 'src/repositories/abstract-repositories/customer.repository';
import { CustomerDto } from 'src/modules/customer/dtos/customer.dto';
import { CustomerCreateData } from 'src/repositories/create-data/customer-create.data';

@Injectable()
export class PrismaCustomerRepository implements CustomerRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(): Promise<CustomerDto[]> {
    return this.prisma.customer.findMany();
  }

  findById(id: string): Promise<CustomerDto | undefined> {
    return this.prisma.customer.findUnique({ where: { id } });
  }

  findByName(name: string): Promise<CustomerDto | undefined> {
    return this.prisma.customer.findFirst({ where: { name } });
  }

  async create(createData: CustomerCreateData): Promise<void> {
    await this.prisma.customer.create({ data: createData });
  }
}
