import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CustomerCreateInput {
  @IsString()
  @IsNotEmpty({ message: 'O nome do cliente deve ser informado' })
  @ApiProperty({
    description: 'The full name of the customer.',
    example: 'John Doe',
  })
  name: string;
}
