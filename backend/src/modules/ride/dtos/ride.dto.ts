import { DriverDto } from './driver.dto';

export class RideDto {
  id: number;
  customerId: string;
  driverId: number;
  origin: string;
  destination: string;
  date: Date;
  distance: number;
  duration: string;
  value: number;
  // Relations
  driver?: Partial<DriverDto>;
}
