import { Test, TestingModule } from '@nestjs/testing';

import { CustomerRepository } from 'src/repositories/abstract-repositories/customer.repository';

import { HttpException, HttpStatus } from '@nestjs/common';
import { CustomerCreateService } from 'src/modules/customer/service/create.service';
import {
  customers,
  TestMockCustomerRepository,
} from 'src/repositories/test-mock-repositories/customer.repository';
import { CustomerCreateInput } from 'src/modules/customer/inputs/customer-create.input';
import { faker } from '@faker-js/faker/.';

describe('CustomerCreateService', () => {
  let service: CustomerCreateService;

  const mockCustomerRepository: CustomerRepository =
    new TestMockCustomerRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerCreateService,
        { provide: CustomerRepository, useValue: mockCustomerRepository },
      ],
    }).compile();

    service = module.get<CustomerCreateService>(CustomerCreateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw an error if a customer with the same name already exists', async () => {
    const createInput: CustomerCreateInput = { ...customers[0] };

    // Expecting the service to throw an HttpException with BAD_REQUEST status
    await expect(service.handle(createInput)).rejects.toThrowError(
      new HttpException(
        {
          error_code: 'INVALID_DATA',
          error_description: 'Já existe um cliente com este nome',
        },
        HttpStatus.BAD_REQUEST,
      ),
    );
  });

  it('should create a new customer if the name is unique', async () => {
    const createInput: CustomerCreateInput = {
      id: 'unique-customer-id',
      name: faker.person.fullName(),
    };

    const result = await service.handle(createInput);
    expect(result).toEqual({ success: true });

    // Verifying that the create method was called with the correct data
    expect(mockCustomerRepository.create).toHaveBeenCalledWith({
      id: createInput.id,
      name: createInput.name,
    });
  });
});
