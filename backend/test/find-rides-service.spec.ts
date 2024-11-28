import { Test, TestingModule } from '@nestjs/testing';

import { RideRepository } from 'src/repositories/abstract-repositories/ride.repository';
import { CustomerRepository } from 'src/repositories/abstract-repositories/customer.repository';
import { DriverRepository } from 'src/repositories/abstract-repositories/driver.repository';
import { HttpException, HttpStatus } from '@nestjs/common';
import { FindRidesService } from 'src/modules/ride/services/find-rides.service';
import { TestMockCustomerRepository } from 'src/repositories/test-mock-repositories/customer.repository';
import { TestMockDriverRepository } from 'src/repositories/test-mock-repositories/driver.repository';
import { TestMockRideRepository } from 'src/repositories/test-mock-repositories/ride.repository';

describe('FindRidesService', () => {
  let service: FindRidesService;

  const mockCustomerRepository: CustomerRepository =
    new TestMockCustomerRepository();
  const mockDriverRepository: DriverRepository = new TestMockDriverRepository();
  const mockRideRepository: RideRepository = new TestMockRideRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindRidesService,
        {
          provide: RideRepository,
          useValue: mockRideRepository,
        },
        {
          provide: CustomerRepository,
          useValue: mockCustomerRepository,
        },
        {
          provide: DriverRepository,
          useValue: mockDriverRepository,
        },
      ],
    }).compile();

    service = module.get<FindRidesService>(FindRidesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return rides for a customer', async () => {
    const result = await service.handle('valid-customer-id');
    expect(result.customer_id).toBe('valid-customer-id');
    expect(result.rides.length).toBe(2);
  });

  it('should return rides filtered by driver', async () => {
    const result = await service.handle('valid-customer-id', 1);
    expect(result.customer_id).toBe('valid-customer-id');
    expect(result.rides.length).toBe(1);
    expect(result.rides[0].driverId).toBe(1);
  });

  it('should throw an error if the customer is not found', async () => {
    await expect(service.handle('not-found-customer-id')).rejects.toThrowError(
      new HttpException(
        {
          error_code: 'INVALID_CUSTOMER',
          error_description:
            'The customer with ID not-found-customer-id was not found.',
        },
        HttpStatus.BAD_REQUEST,
      ),
    );
  });

  it('should throw an error if the driver is not found when filtering by driver', async () => {
    await expect(service.handle('valid-customer-id', 99)).rejects.toThrowError(
      new HttpException(
        {
          error_code: 'INVALID_DRIVER',
          error_description: 'The driver with ID 99 was not found.',
        },
        HttpStatus.BAD_REQUEST,
      ),
    );
  });

  it('should throw an error if no rides are found', async () => {
    await expect(
      service.handle('customer-without-rides-id'),
    ).rejects.toThrowError(
      new HttpException(
        {
          error_code: 'NO_RIDES_FOUND',
          error_description: 'No rides were found for the given parameters.',
        },
        HttpStatus.NOT_FOUND,
      ),
    );
  });
});
