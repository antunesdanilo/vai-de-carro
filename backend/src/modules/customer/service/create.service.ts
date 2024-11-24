import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CustomerRepository } from 'src/repositories/abstract-repositories/customer.repository';
import { CustomerCreateInput } from '../inputs/customer-create.input';
import { CustomerCreateData } from 'src/repositories/create-data/customer-create.data';
import { v4 as uuidv4 } from 'uuid';
import { CreateStatusDto } from 'src/app/dtos/create-status.dto';

@Injectable()
export class CustomerCreateService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async handle(createInput: CustomerCreateInput): Promise<CreateStatusDto> {
    const customer = await this.customerRepository.findByName(createInput.name);

    if (customer) {
      throw new HttpException(
        {
          error_code: 'INVALID_DATA',
          error_description: 'Já existe um cliente com este nome',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const createData: CustomerCreateData = {
      id: uuidv4(),
      name: createInput.name,
    };

    await this.customerRepository.create(createData);

    return { success: true };
  }
}
