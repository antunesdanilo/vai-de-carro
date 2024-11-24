import { CustomerDto } from '../../modules/home/dtos/customer.dto';
import { CustomerCreateInput } from '../inputs/customer-create.input';

export interface ICustomerProvider {
  getCustomers(): Promise<CustomerDto[]>;

  createCustomer(createInput: CustomerCreateInput): Promise<void>;
}
