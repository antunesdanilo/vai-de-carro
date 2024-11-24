import { ApiProperty } from '@nestjs/swagger';
import { RideDto } from './ride.dto';

export class CustomerRidesDto {
  @ApiProperty({
    description: 'The unique identifier of the customer.',
    example: 'dc49b5ef-c085-4c05-a2b4-094dbbd7464c',
  })
  customer_id: string;

  @ApiProperty({
    description: 'A list of rides associated with the customer.',
    type: [RideDto],
    example: [
      {
        id: 545879,
        date: new Date(),
        origin: 'Afone Pena, Belo Horizonte, MG',
        destination: 'Antônio Carlos, Belo Horizonte, MG',
        distance: 8,
        duration: '10min',
        value: 15.5,
        driver: {
          id: 1,
          name: 'John Doe',
        },
      },
    ],
  })
  rides: RideDto[];
}
