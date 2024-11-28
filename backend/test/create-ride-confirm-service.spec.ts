import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { faker } from '@faker-js/faker';

import { CustomerRepository } from '../src/repositories/abstract-repositories/customer.repository';
import { DriverRepository } from '../src/repositories/abstract-repositories/driver.repository';
import { RideRepository } from '../src/repositories/abstract-repositories/ride.repository';

import { TestMockCustomerRepository } from '../src/repositories/test-mock-repositories/customer.repository';
import { TestMockDriverRepository } from '../src/repositories/test-mock-repositories/driver.repository';
import { TestMockRideRepository } from '../src/repositories/test-mock-repositories/ride.repository';

import { RideConfirmCreateInput } from '../src/modules/ride/inputs/ride-confirm-create.input';
import { CreateRideConfirmService } from './../src/modules/ride/services/create-ride-confirm.service';

describe('CreateRideConfirmService', () => {
  let service: CreateRideConfirmService;

  const mockCustomerRepository: CustomerRepository =
    new TestMockCustomerRepository();
  const mockDriverRepository: DriverRepository = new TestMockDriverRepository();
  const mockRideRepository: RideRepository = new TestMockRideRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateRideConfirmService,
        { provide: CustomerRepository, useValue: mockCustomerRepository },
        { provide: DriverRepository, useValue: mockDriverRepository },
        { provide: RideRepository, useValue: mockRideRepository },
      ],
    }).compile();

    service = module.get<CreateRideConfirmService>(CreateRideConfirmService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if origin and destination are the same', async () => {
    const input: RideConfirmCreateInput = {
      customer_id: '1',
      driver: { id: 1, name: faker.person.fullName() },
      origin: 'Same Place',
      destination: 'Same Place',
      distance: 10,
      duration: '15m',
      value: 50,
    };

    await expect(service.handle(input)).rejects.toThrow(HttpException);
    await expect(service.handle(input)).rejects.toHaveProperty(
      'response.error_code',
      'INVALID_DATA',
    );
  });

  it('should throw an error if the customer is not found', async () => {
    const input: RideConfirmCreateInput = {
      customer_id: 'invalid-customer-id',
      driver: { id: 1, name: faker.person.fullName() },
      origin: 'Point A',
      destination: 'Point B',
      distance: 10,
      duration: '15m',
      value: 50,
    };

    await expect(service.handle(input)).rejects.toThrow(HttpException);
    await expect(service.handle(input)).rejects.toHaveProperty(
      'response.error_code',
      'CUSTOMER_NOT_FOUND',
    );
  });

  it('should throw an error if the driver is not found', async () => {
    const input: RideConfirmCreateInput = {
      customer_id: 'valid-customer-id',
      driver: { id: 4, name: faker.person.fullName() },
      origin: 'Point A',
      destination: 'Point B',
      distance: 10,
      duration: '15m',
      value: 50,
    };

    await expect(service.handle(input)).rejects.toThrow(HttpException);
    await expect(service.handle(input)).rejects.toHaveProperty(
      'response.error_code',
      'DRIVER_NOT_FOUND',
    );
  });

  it("should throw an error if the distance is less than the driver's minimum distance", async () => {
    const input: RideConfirmCreateInput = {
      customer_id: 'valid-customer-id',
      driver: { id: 1, name: faker.person.fullName() },
      origin: 'Point A',
      destination: 'Point B',
      distance: 3,
      duration: '15m',
      value: 50,
    };

    await expect(service.handle(input)).rejects.toThrow(HttpException);
    await expect(service.handle(input)).rejects.toHaveProperty(
      'response.error_code',
      'INVALID_DISTANCE',
    );
  });

  it('should create a ride and return success', async () => {
    const input: RideConfirmCreateInput = {
      customer_id: 'valid-customer-id',
      driver: { id: 1, name: faker.person.fullName() },
      origin: 'Point A',
      destination: 'Point B',
      distance: 10,
      duration: '15m',
      value: 50,
    };

    const result = await service.handle(input);

    expect(mockRideRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        customerId: 'valid-customer-id',
        driverId: 1,
        origin: 'Point A',
        destination: 'Point B',
        distance: 10,
        value: 50,
      }),
    );

    expect(result).toEqual({ success: true });
  });
});
