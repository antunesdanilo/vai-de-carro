import { CustomerRidesDto } from '../dtos/customer-rides.dto';
import { RideEstimateDto } from '../dtos/ride-estimate.dto';
import { EstimateInput } from '../inputs/estimate.input';
import { RideConfirmCreateInput } from '../inputs/ride-confirm-create.input';

export interface IRideProvider {
  getRideEstimate(estimateInput: EstimateInput): Promise<RideEstimateDto>;

  createRideConfirm(createInput: RideConfirmCreateInput): Promise<void>;

  getRides(customerId: string, driverId?: number): Promise<CustomerRidesDto>;
}
