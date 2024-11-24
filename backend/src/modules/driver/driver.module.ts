import { Module } from '@nestjs/common';
import { DriverFindManyService } from './service/find-many.service';
import { DriverController } from './controllers/driver.controller';

@Module({
  controllers: [DriverController],
  providers: [DriverFindManyService],
})
export class DriverModule {}
