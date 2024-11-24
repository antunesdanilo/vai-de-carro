import { ApiProperty } from '@nestjs/swagger';
import { ReviewDto } from './review.dto';

export class DriverOptionDto {
  @ApiProperty({
    description: 'The ID of the driver.',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The full name of the driver.',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'A description about the driver.',
    example:
      'Hello! I am a reliable driver with years of experience. Your comfort and safety are my priorities.',
  })
  description: string;

  @ApiProperty({
    description: 'Details about the vehicle the driver uses.',
    example: 'Toyota Corolla 2020, blue',
  })
  vehicle: string;

  @ApiProperty({
    description: 'Driver review details, including rating and comments.',
    type: ReviewDto,
  })
  review: ReviewDto;

  @ApiProperty({
    description: 'The estimated value of the trip with this driver.',
    example: 25.5,
  })
  value: number;
}
