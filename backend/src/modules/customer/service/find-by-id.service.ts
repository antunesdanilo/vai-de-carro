import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CustomerRepository } from 'src/repositories/abstract-repositories/customer.repository';
import { CustomerDto } from '../dtos/customer.dto';

@Injectable()
export class CustomerFindByIdService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async handle(id: string): Promise<CustomerDto> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new HttpException(
        {
          error_code: 'CUSTOMER_NOT_FOUND',
          error_description: `O cliente com o id ${id} não foi encontrado.`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return customer;
  }
}
