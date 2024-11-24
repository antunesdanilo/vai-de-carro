import { Global, Module } from '@nestjs/common';
import { MapsApiProvider } from './abstract-providers/map-api.provider';
import { GoogleMapsApiProvider } from './maps-providers/google-maps-api.provider';

@Global()
@Module({
  providers: [
    {
      provide: MapsApiProvider,
      useClass: GoogleMapsApiProvider,
    },
  ],
  exports: [MapsApiProvider],
})
export class ProvidersModule {}
