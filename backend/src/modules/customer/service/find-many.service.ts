import { Injectable } from '@nestjs/common';
import { CustomerRepository } from 'src/repositories/abstract-repositories/customer.repository';
import { CustomerDto } from '../dtos/customer.dto';

@Injectable()
export class CustomerFindManyService {
  /**
   * Constructor for CustomerFindManyService.
   * Injects the CustomerRepository to retrieve multiple customer data.
   *
   * @param customerRepository - The CustomerRepository used to query customer data from the database.
   */
  constructor(private readonly customerRepository: CustomerRepository) {}

  /**
   * Handles the retrieval of all customers from the repository.
   *
   * This method fetches all customers from the database and returns the list of customers.
   *
   * @returns A promise that resolves to an array of CustomerDto objects containing customer details.
   */
  async handle(): Promise<CustomerDto[]> {
    // Fetching all customers from the repository
    const customers = this.customerRepository.findMany();

    // Return the list of customers
    return customers;
  }
}
