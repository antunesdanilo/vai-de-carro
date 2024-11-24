import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RideEstimateInput {
  @IsString({ message: 'O id do cliente está com o formato inválido' })
  @IsNotEmpty({ message: 'O id do cliente deve ser informado' })
  @ApiProperty({
    description: 'The ID of the customer.',
    example: 'e02a25a6-052a-4d44-b685-9682391b331d',
  })
  customer_id: string;

  @IsString({ message: 'O local de origem está com o formato inválido' })
  @IsNotEmpty({ message: 'O local de origem deve ser informado' })
  @ApiProperty({
    description: 'The origin location of the ride.',
    example: 'Afonso Pena, Belo Horizonte, MG',
  })
  origin: string;

  @IsString({ message: 'O local de destino está com o formato inválido' })
  @IsNotEmpty({ message: 'O local de destino deve ser informado' })
  @ApiProperty({
    description: 'The destination location of the ride.',
    example: 'Antônio Carlos, Belo Horizonte, MG',
  })
  destination: string;
}
