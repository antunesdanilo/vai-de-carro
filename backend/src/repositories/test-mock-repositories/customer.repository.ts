import { Injectable } from '@nestjs/common';
import { CustomerRepository } from 'src/repositories/abstract-repositories/customer.repository';
import { CustomerDto } from 'src/modules/customer/dtos/customer.dto';
import { CustomerCreateData } from 'src/repositories/create-data/customer-create.data';
import { faker } from '@faker-js/faker/.';

export const customers: CustomerDto[] = [
  {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
  },
  {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
  },
];

@Injectable()
export class TestMockCustomerRepository implements CustomerRepository {
  findMany = jest.fn().mockImplementation((): Promise<CustomerDto[]> => {
    return Promise.resolve(customers);
  });

  findById = jest
    .fn()
    .mockImplementation((id: string): Promise<CustomerDto | undefined> => {
      if (id === 'valid-customer-id') {
        return Promise.resolve({ id, name: 'Test Customer' });
      }
      return Promise.resolve(null);
    });

  findByName = jest
    .fn()
    .mockImplementation((name: string): Promise<CustomerDto | undefined> => {
      const customer = customers.find((c) => c.name === name);

      if (customer) {
        return Promise.resolve(customer);
      }

      return Promise.resolve(undefined);
    });

  create = jest
    .fn()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .mockImplementation((_data: CustomerCreateData): Promise<void> => {
      return Promise.resolve();
    });
}
