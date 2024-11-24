import { ApiProperty } from '@nestjs/swagger';

export class CreateStatusDto {
  @ApiProperty({
    description: 'Indicates whether the operation was successful.',
    example: true,
  })
  success: boolean;
}
