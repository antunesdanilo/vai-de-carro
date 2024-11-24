import { Injectable } from '@nestjs/common';
import { CustomerRepository } from 'src/repositories/abstract-repositories/customer.repository';
import { CustomerDto } from '../dtos/customer.dto';

@Injectable()
export class CustomerFindManyService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async handle(): Promise<CustomerDto[]> {
    const customers = this.customerRepository.findMany();

    return customers;
  }
}
