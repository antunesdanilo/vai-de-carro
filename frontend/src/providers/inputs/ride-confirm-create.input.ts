import { RideConfirmCreateDriverInput } from './ride-confirm-create-driver.input';

export interface RideConfirmCreateInput {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: RideConfirmCreateDriverInput;
  value: number;
}
