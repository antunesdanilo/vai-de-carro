import { Module } from '@nestjs/common';
import { MapsApiController } from './controllers/maps-api.controller';
import { GetPredictionsService } from './services/get-predictions.service';

@Module({
  controllers: [MapsApiController],
  providers: [GetPredictionsService],
})
export class MapsApiModule {}
