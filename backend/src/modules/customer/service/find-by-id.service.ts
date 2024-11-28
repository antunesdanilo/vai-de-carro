import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CustomerRepository } from 'src/repositories/abstract-repositories/customer.repository';
import { CustomerDto } from '../dtos/customer.dto';

@Injectable()
export class CustomerFindByIdService {
  /**
   * Constructor for CustomerFindByIdService.
   * Injects the CustomerRepository to retrieve customer data.
   *
   * @param customerRepository - The CustomerRepository used to query customer data from the database.
   */
  constructor(private readonly customerRepository: CustomerRepository) {}

  /**
   * Handles the retrieval of a customer by their ID.
   *
   * This method checks if a customer with the given ID exists in the database.
   * If the customer is found, it returns the customer data.
   * If the customer is not found, it throws a NOT_FOUND error.
   *
   * @param id - The unique identifier of the customer to be retrieved.
   * @returns A promise that resolves to the CustomerDto object containing the customer's details.
   * @throws HttpException if the customer with the specified ID is not found (CUSTOMER_NOT_FOUND).
   */
  async handle(id: string): Promise<CustomerDto> {
    // Attempt to find the customer by ID
    const customer = await this.customerRepository.findById(id);

    // If customer is not found, throw a NOT_FOUND error
    if (!customer) {
      throw new HttpException(
        {
          error_code: 'CUSTOMER_NOT_FOUND',
          error_description: `O cliente com o id ${id} não foi encontrado.`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    // Return the customer data
    return customer;
  }
}
