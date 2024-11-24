import { Module } from '@nestjs/common';
import { RideController } from './controllers/ride.controller';
import { GetRideEstimateService } from './services/get-ride-estimate.service';
import { CreateRideConfirmService } from './services/create-ride-confirm.service';
import { FindRidesService } from './services/find-rides.service';

@Module({
  controllers: [RideController],
  providers: [
    CreateRideConfirmService,
    FindRidesService,
    GetRideEstimateService,
  ],
})
export class RideModule {}
