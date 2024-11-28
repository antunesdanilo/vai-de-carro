import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CustomerRepository } from 'src/repositories/abstract-repositories/customer.repository';
import { CustomerCreateInput } from '../inputs/customer-create.input';
import { CustomerCreateData } from 'src/repositories/create-data/customer-create.data';
import { CreateStatusDto } from 'src/app/dtos/create-status.dto';

@Injectable()
export class CustomerCreateService {
  // Injecting the CustomerRepository to interact with customer data
  constructor(private readonly customerRepository: CustomerRepository) {}

  /**
   * Handles the creation of a new customer.
   *
   * This method checks if a customer with the provided name already exists.
   * If the customer exists, it throws a BAD_REQUEST error.
   * If the customer doesn't exist, it creates a new customer record and returns a success status.
   *
   * @param createInput - The data needed to create a new customer (ID and name).
   * @returns A promise that resolves to a CreateStatusDto indicating success.
   * @throws HttpException if a customer with the same name already exists.
   */
  async handle(createInput: CustomerCreateInput): Promise<CreateStatusDto> {
    // Checking if a customer with the same name already exists
    const customer = await this.customerRepository.findByName(createInput.name);

    if (customer) {
      // Throwing an error if a customer with the same name exists
      throw new HttpException(
        {
          error_code: 'INVALID_DATA',
          error_description: 'Já existe um cliente com este nome',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Preparing the data for customer creation
    const createData: CustomerCreateData = {
      id: createInput.id,
      name: createInput.name,
    };

    // Creating the customer record in the repository
    await this.customerRepository.create(createData);

    // Returning a success statu
    return { success: true };
  }
}
