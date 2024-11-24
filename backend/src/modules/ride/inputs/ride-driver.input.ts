import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RideDriverInput {
  @IsNumber()
  @IsNotEmpty({ message: 'O id do motorista deve ser informado' })
  @ApiProperty({
    description: 'The ID of the driver.',
    example: 1,
  })
  id: number;

  @IsString({ message: 'O nome do motorista está com o formato inválido' })
  @IsNotEmpty({ message: 'O nome do motorista deve ser informado' })
  @ApiProperty({
    description: 'The full name of the driver.',
    example: 'John Doe',
  })
  name: string;
}
