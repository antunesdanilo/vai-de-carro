import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CustomerFindManyService } from '../service/find-many.service';
import { CustomerFindByIdService } from '../service/find-by-id.service';
import { CustomerCreateService } from '../service/create.service';
import { CustomerDto } from '../dtos/customer.dto';
import { CustomerCreateInput } from '../inputs/customer-create.input';
import { CreateStatusDto } from 'src/app/dtos/create-status.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('customers')
@Controller('customer')
export class CustomerController {
  constructor(
    private readonly customerFindManyService: CustomerFindManyService,
    private readonly customerFindByIdService: CustomerFindByIdService,
    private readonly customerCreateService: CustomerCreateService,
  ) {}

  /**
   * Get a list of all customers.
   * @returns {CustomerDto[]} - A list of customer data.
   */
  @Get()
  @ApiOperation({ summary: 'Get all customers' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the list of customers.',
    type: [CustomerDto],
  })
  getCustomers(): Promise<CustomerDto[]> {
    return this.customerFindManyService.handle();
  }

  /**
   * Get customer details by customer ID.
   * @param {string} customerId - The unique identifier of the customer.
   * @returns {CustomerDto} - The customer data.
   */
  @Get(':customer_id')
  @ApiOperation({ summary: 'Get customer by ID' })
  @ApiParam({
    name: 'customer_id',
    required: true,
    type: String,
    description: 'The unique customer ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved customer details.',
    type: CustomerDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Customer not found.',
    example: {
      error_code: 'CUSTOMER_NOT_FOUND',
      error_description:
        'Customer with id c79b55ff-92c1-4140-ad65-b4d0dda497de not found.',
    },
  })
  getCustomer(@Param('customer_id') customerId: string): Promise<CustomerDto> {
    return this.customerFindByIdService.handle(customerId);
  }

  /**
   * Create a new customer.
   * @param {CustomerCreateInput} customerCreateInput - The customer data to create a new customer.
   * @returns {CreateStatusDto} - The status of the customer creation process.
   */
  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiBody({
    type: CustomerCreateInput,
    description: 'The input data to create a new customer.',
  })
  @ApiResponse({
    status: 201,
    description: 'Customer successfully created.',
    type: CreateStatusDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid customer data.',
    example: [
      {
        error_code: 'INVALID_DATA',
        error_description: 'There is already a client with this name',
      },
    ],
  })
  createCustomer(
    @Body() customerCreateInput: CustomerCreateInput,
  ): Promise<CreateStatusDto> {
    return this.customerCreateService.handle(customerCreateInput);
  }
}
