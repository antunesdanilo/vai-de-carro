import { RideDto } from './ride.dto';

export interface CustomerRidesDto {
  customer_id: string;
  rides: RideDto[];
}
