import { ApiProperty } from '@nestjs/swagger';

export class CustomerDto {
  @ApiProperty({
    description: 'The ID of the customer.',
    example: 'e02a25a6-052a-4d44-b685-9682391b331d',
  })
  id: string;

  @ApiProperty({
    description: 'The full name of the customer.',
    example: 'John Doe',
  })
  name: string;
}
