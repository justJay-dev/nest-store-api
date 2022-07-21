import { Controller, Get, HttpException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    try {
      return this.appService.getHello();
    } catch (error) {
      throw new HttpException(error.toString(), 500);
    }
  }

  @Get('health')
  getHealth() {
    try {
      return this.appService.getHealth();
    } catch (error) {
      throw new HttpException(error.toString(), 500);
    }
  }
}
