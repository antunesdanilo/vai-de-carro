import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CustomerCreateInput {
  @IsString({ message: 'O ID do cliente está em um format inválido' })
  @IsNotEmpty({ message: 'O ID do cliente deve ser informado' })
  @ApiProperty({
    description: 'The ID of the customer.',
    example: 'ABC-123',
  })
  id: string;

  @IsString({ message: 'O nome do cliente está em um format inválido' })
  @IsNotEmpty({ message: 'O nome do cliente deve ser informado' })
  @ApiProperty({
    description: 'The full name of the customer.',
    example: 'John Doe',
  })
  name: string;
}
