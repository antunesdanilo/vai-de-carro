import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Returns a hello world message.
   * @returns A greeting string
   */
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns a greeting message.',
    schema: {
      example: 'Hello, World!',
    },
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
