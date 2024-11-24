import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { RideEstimateDto } from '../dtos/ride-estimate.dto';
import { RideEstimateInput } from '../inputs/ride-estimate.input';
import { GetRideEstimateService } from '../services/get-ride-estimate.service';
import { CreateRideConfirmService } from '../services/create-ride-confirm.service';
import { RideConfirmCreateInput } from '../inputs/ride-confirm-create.input';
import { CreateStatusDto } from 'src/app/dtos/create-status.dto';
import { FindRidesService } from '../services/find-rides.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CustomerRidesDto } from '../dtos/customer-rides.dto';

@ApiTags('rides')
@Controller('ride')
export class RideController {
  constructor(
    private readonly getRideEstimateService: GetRideEstimateService,
    private readonly createRideConfirmService: CreateRideConfirmService,
    private readonly findRidesService: FindRidesService,
  ) {}

  /**
   * Get an estimate for the ride based on input data.
   * @param {RideEstimateInput} input - The input data for estimating the ride (origin, destination, etc.)
   * @returns {RideEstimateDto} - The estimated cost and duration of the ride.
   */
  @Get('estimate')
  @ApiOperation({ summary: 'Get ride estimate' })
  @ApiQuery({
    name: 'origin',
    required: true,
    type: String,
    description: 'The origin address of the ride.',
  })
  @ApiQuery({
    name: 'destination',
    required: true,
    type: String,
    description: 'The destination address of the ride.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the ride estimate.',
    type: RideEstimateDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Customer not found.',
    example: {
      error_code: 'INVALID_DATA',
      error_description: 'Origin and destination can not be equals.',
    },
  })
  getRideEstimate(@Query() input: RideEstimateInput): Promise<RideEstimateDto> {
    return this.getRideEstimateService.handle(input);
  }

  /**
   * Get ride details based on customer ID and optional driver ID.
   * @param {string} customerId - The customer ID whose ride details are being requested.
   * @param {number} [driverId] - The optional driver ID to filter rides.
   * @returns {any} - The ride details, including ride status, driver, and other related data.
   */
  @Get(':customer_id')
  @ApiOperation({ summary: 'Get ride details by customer ID' })
  @ApiParam({
    name: 'customer_id',
    required: true,
    type: String,
    description: 'The customer ID whose ride details are being requested.',
  })
  @ApiQuery({
    name: 'driver_id',
    required: false,
    type: Number,
    description: 'Optional driver ID to filter rides.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the ride details.',
    type: CustomerRidesDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid customer ID or driver ID.',
    example: [
      {
        error_code: 'INVALID_CUSTOMER',
        error_description:
          'Customer with id dc49b5ef-c085-4c05-a2b4-094dbbd7464c not found.',
      },
      {
        error_code: 'INVALID_DRIVER',
        error_description: 'Driver with id 4 not found.',
      },
    ],
  })
  @ApiResponse({
    status: 404,
    description: 'No rides were found for the reported parameters',
    example: {
      error_code: 'NO_RIDES_FOUND',
      error_description: 'No rides were found for the reported parameters.',
    },
  })
  getRideDetails(
    @Param('customer_id') customerId: string,
    @Query('driver_id') driverId?: number | undefined,
  ): Promise<CustomerRidesDto> {
    driverId = isNaN(driverId) ? undefined : driverId;
    return this.findRidesService.handle(customerId, driverId);
  }

  /**
   * Confirm the creation of a ride.
   * @param {RideConfirmCreateInput} rideConfirmCreateInput - The details of the ride to confirm, including customer, driver, and ride specifics.
   * @returns {CreateStatusDto} - The status of the creation process.
   */
  @Post('confirm')
  @ApiOperation({ summary: 'Create and confirm a ride' })
  @ApiBody({
    type: RideConfirmCreateInput,
    description: 'The input data to confirm a ride creation.',
  })
  @ApiResponse({
    status: 201,
    description: 'Ride successfully created and confirmed.',
    type: CreateStatusDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data for ride creation.',
    example: [
      {
        error_code: 'INVALID_DATA',
        error_description: 'Origin and destination can not be equals.',
      },
    ],
  })
  @ApiResponse({
    status: 404,
    description: 'Invalid input data for ride creation.',
    example: [
      {
        error_code: 'CUSTOMER_NOT_FOUND',
        error_description:
          'Customer with id dc49b5ef-c085-4c05-a2b4-094dbbd7464c not found.',
      },
      {
        error_code: 'DRIVER_NOT_FOUND',
        error_description: 'Driver with id 4 not found.',
      },
    ],
  })
  @ApiResponse({
    status: 406,
    description: 'Invalid distance for the driver.',
    example: [
      {
        error_code: 'INVALID_DISTANCE',
        error_description: 'This driver accepts rides of at least 10 km.',
      },
    ],
  })
  async createRideConfirm(
    @Body() rideConfirmCreateInput: RideConfirmCreateInput,
  ): Promise<CreateStatusDto> {
    return this.createRideConfirmService.handle(rideConfirmCreateInput);
  }
}
