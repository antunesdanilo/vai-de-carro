import { CustomerDto } from '../modules/home/dtos/customer.dto';
import { CustomerCreateInput } from './inputs/customer-create.input';
import BaseApiProvider from './base-api.provider';

export class CustomerProvider extends BaseApiProvider {
  getCustomers(): Promise<CustomerDto[]> {
    return this.get<CustomerDto[]>('/customer');
  }

  createCustomer(createInput: CustomerCreateInput): Promise<void> {
    return this.post<void, CustomerCreateInput>('/customer', createInput);
  }
}
