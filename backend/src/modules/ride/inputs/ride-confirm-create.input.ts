import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { RideDriverInput } from './ride-driver.input';
import { ApiProperty } from '@nestjs/swagger';

export class RideConfirmCreateInput {
  @IsString()
  @IsNotEmpty({ message: 'O id do cliente deve ser informado' })
  @ApiProperty({
    description: 'The ID of the customer.',
    example: 'e02a25a6-052a-4d44-b685-9682391b331d',
  })
  customer_id: string;

  @IsString()
  @IsNotEmpty({ message: 'O local de origem deve ser informado' })
  @ApiProperty({
    description: 'The origin location of the ride.',
    example: 'Afonso Pena, Belo Horizonte, MG',
  })
  origin: string;

  @IsString()
  @IsNotEmpty({ message: 'O local de destino deve ser informado' })
  @ApiProperty({
    description: 'The destination location of the ride.',
    example: 'Afonso Pena, Belo Horizonte, MG',
  })
  destination: string;

  @IsNumber()
  @IsNotEmpty({ message: 'O distância deve ser informada' })
  @ApiProperty({
    description: 'The distance of the ride in kilometers.',
    example: 12.5,
  })
  distance: number;

  @IsString()
  @IsNotEmpty({ message: 'A duração da corrida deve ser informada' })
  @ApiProperty({
    description: 'The duration of the ride in minutes.',
    example: '20min',
  })
  duration: string;

  @IsNotEmpty({ message: 'Os dados do motorista devem ser informado' })
  @ApiProperty({
    description: 'The driver details.',
    type: RideDriverInput,
    example: {
      id: 1,
      name: 'John Doe',
    },
  })
  driver: RideDriverInput;

  @IsNumber()
  @IsNotEmpty({ message: 'O valor total deve ser informado' })
  @ApiProperty({
    description: 'The total value of the ride in currency.',
    example: 25.75,
  })
  value: number;
}
