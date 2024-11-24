import { CustomerCreateData } from '../create-data/customer-create.data';
import { CustomerDto } from 'src/modules/customer/dtos/customer.dto';

export abstract class CustomerRepository {
  abstract findMany(): Promise<CustomerDto[]>;

  abstract findById(id: string): Promise<CustomerDto | undefined>;

  abstract findByName(name: string): Promise<CustomerDto | undefined>;

  abstract create(createData: CustomerCreateData): Promise<void>;
}
