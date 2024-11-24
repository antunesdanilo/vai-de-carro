import { DriverOptionDto } from './driver-option.dto';
import { GeoLocationDto } from './geo-location.dto';

export interface RideEstimateDto {
  origin: GeoLocationDto;
  destination: GeoLocationDto;
  distance: number;
  duration: string;
  options: DriverOptionDto[];
  routeResponse: object;
}
