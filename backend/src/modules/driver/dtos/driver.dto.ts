import { ReviewDto } from './review.dto';

export class DriverDto {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  pricePerKm: number;
  minimumDistanteInKm: number;
  // Relations
  reviews?: ReviewDto[];
}
