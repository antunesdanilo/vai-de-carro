import { ReviewDto } from './review.dto';

export interface DriverOptionDto {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: ReviewDto;
  value: number;
}
