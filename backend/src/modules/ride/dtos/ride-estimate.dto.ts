import { IsNotEmpty } from 'class-validator';
import { GeoLocationDto } from './geo-location.dto';
import { DriverOptionDto } from './driver-option.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RideEstimateDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'The origin location of the ride.',
    example: 'Afonso Pena, Belo Horizonte, MG',
  })
  origin: GeoLocationDto;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The destination location of the ride.',
    example: 'Afonso Pena, Belo Horizonte, MG',
  })
  destination: GeoLocationDto;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The distance of the ride in kilometers.',
    example: 12.5,
  })
  distance: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The duration of the ride in minutes.',
    example: '20min',
  })
  duration: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The driver details.',
    type: [DriverOptionDto],
    example: [
      {
        id: 1,
        name: 'John Doe',
        description:
          'Hello! I am a reliable driver with years of experience. Your comfort and safety are my priorities.',
        vehicle: 'Toyota Corolla 2020, blue',
        review: {
          rating: 5,
          comment: 'Excellent driver, very polite and punctual.',
        },
        value: 25.5,
      },
    ],
  })
  options: DriverOptionDto[];

  @IsNotEmpty()
  routeResponse: object;
}
