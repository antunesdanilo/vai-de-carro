import BaseApiProvider from './base-api.provider';
import { CustomerRidesDto } from './dtos/customer-rides.dto';
import { RideEstimateDto } from './dtos/ride-estimate.dto';
import { EstimateInput } from './inputs/estimate.input';
import { RideConfirmCreateInput } from './inputs/ride-confirm-create.input';
import { IRideProvider } from './interfaces/ride.provider';

export class RideProvider extends BaseApiProvider implements IRideProvider {
  getRideEstimate(estimateInput: EstimateInput): Promise<RideEstimateDto> {
    return this.get<RideEstimateDto>(
      `/ride/estimate?customer_id=${estimateInput.customer_id}&origin=${estimateInput.origin}&destination=${estimateInput.destination}`
    );
  }

  createRideConfirm(createInput: RideConfirmCreateInput): Promise<void> {
    return this.post<void, RideConfirmCreateInput>(
      '/ride/confirm',
      createInput
    );
  }

  getRides(customerId: string, driverId?: number): Promise<CustomerRidesDto> {
    return this.get<CustomerRidesDto>(
      `/ride/${customerId}${driverId ? '?driver_id=' + driverId : ''}`
    );
  }
}
