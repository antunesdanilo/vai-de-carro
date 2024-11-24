import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RideModule } from 'src/modules/ride/ride.module';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { ProvidersModule } from 'src/providers/providers.module';
import { CustomerModule } from 'src/modules/customer/customer.module';
import { PrismaModule } from 'src/repositories/prisma-repositories/prisma.module';
import { MapsApiModule } from 'src/modules/maps-api/maps-api.module';
import { DriverModule } from 'src/modules/driver/driver.module';

@Module({
  imports: [
    CustomerModule,
    DriverModule,
    MapsApiModule,
    PrismaModule,
    ProvidersModule,
    RepositoriesModule,
    RideModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
