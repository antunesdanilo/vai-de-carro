import { Test, TestingModule } from '@nestjs/testing';
import { DriverFindManyService } from 'src/modules/driver/service/find-many.service';

import { DriverRepository } from 'src/repositories/abstract-repositories/driver.repository';
import {
  drivers,
  TestMockDriverRepository,
} from 'src/repositories/test-mock-repositories/driver.repository';

describe('DriverFindManyService', () => {
  let service: DriverFindManyService;

  const mockDriverRepository: DriverRepository = new TestMockDriverRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DriverFindManyService,
        { provide: DriverRepository, useValue: mockDriverRepository },
      ],
    }).compile();

    service = module.get<DriverFindManyService>(DriverFindManyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a list of drivers', async () => {
    const result = await service.handle();
    expect(result).toEqual(drivers);
    expect(mockDriverRepository.findMany).toHaveBeenCalledWith({});
  });

  it('should return an empty list if no drivers found', async () => {
    // Adjust the mock to return an empty array
    jest.spyOn(mockDriverRepository, 'findMany').mockResolvedValue([]);
    const result = await service.handle();
    expect(result).toEqual([]);
  });
});
