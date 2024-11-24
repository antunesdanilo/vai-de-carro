import { ApiProperty } from '@nestjs/swagger';

export class AddressPredictionDto {
  @ApiProperty({
    description: 'Unique identifier for the place.',
    example: 'ChIJ0WGkg4FEzpQRrlsz_whLqZs',
  })
  placeId: string;

  @ApiProperty({
    description:
      'Description of the predicted address, typically includes city, state, and country.',
    example: 'São Paulo, SP, Brasil',
  })
  description: string;
}
