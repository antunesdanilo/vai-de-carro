import { DriverDto } from './driver.dto';

export interface RideDto {
  id: number;
  customerId: string;
  driverId: number;
  origin: string;
  destination: string;
  date: Date;
  distance: number;
  duration: string;
  value: number;
  driver: DriverDto;
}
