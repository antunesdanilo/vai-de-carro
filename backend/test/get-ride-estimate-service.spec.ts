import { Test, TestingModule } from '@nestjs/testing';

import { DriverRepository } from 'src/repositories/abstract-repositories/driver.repository';
import { MapsApiProvider } from 'src/providers/abstract-providers/map-api.provider';
import { HttpException, HttpStatus } from '@nestjs/common';
import { GetRideEstimateService } from 'src/modules/ride/services/get-ride-estimate.service';
import { TestMockDriverRepository } from 'src/repositories/test-mock-repositories/driver.repository';
import { TestMockMapsApiProvider } from 'src/providers/test-mock-providers/maps-api.provider';
import { RideEstimateInput } from 'src/modules/ride/inputs/ride-estimate.input';

describe('GetRideEstimateService', () => {
  let service: GetRideEstimateService;

  const mockDriverRepository: DriverRepository = new TestMockDriverRepository();
  const mockMapsApiProvider: MapsApiProvider = new TestMockMapsApiProvider();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetRideEstimateService,
        {
          provide: DriverRepository,
          useValue: mockDriverRepository,
        },
        {
          provide: MapsApiProvider,
          useValue: mockMapsApiProvider,
        },
      ],
    }).compile();

    service = module.get<GetRideEstimateService>(GetRideEstimateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw an exception if origin and destination are the same', async () => {
    const rideEstimateInput: RideEstimateInput = {
      customer_id: 'valid-customer-id',
      origin: 'Location A',
      destination: 'Location A',
    };

    await expect(service.handle(rideEstimateInput)).rejects.toThrow(
      new HttpException(
        {
          error_code: 'INVALID_DATA',
          error_description:
            'Os locais de origem e destino não podem ser iguais.',
        },
        HttpStatus.BAD_REQUEST,
      ),
    );
  });

  it('should return a valid ride estimate', async () => {
    const rideEstimateInput: RideEstimateInput = {
      customer_id: 'valid-customer-id',
      origin: 'Location A',
      destination: 'Location B',
    };

    const result = await service.handle(rideEstimateInput);

    expect(result).toHaveProperty('origin');
    expect(result).toHaveProperty('destination');
    expect(result).toHaveProperty('options');
    expect(result.options).toHaveLength(3);
    expect(result.options[0]).toHaveProperty('value');
    expect(result.options[0].value).toBe(50);
  });
});
