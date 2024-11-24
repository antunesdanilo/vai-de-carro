import { Module } from '@nestjs/common';
import { CustomerController } from './controllers/customer.controller';
import { CustomerFindManyService } from './service/find-many.service';
import { CustomerFindByIdService } from './service/find-by-id.service';
import { CustomerCreateService } from './service/create.service';

@Module({
  controllers: [CustomerController],
  providers: [
    CustomerFindManyService,
    CustomerFindByIdService,
    CustomerCreateService,
  ],
})
export class CustomerModule {}
