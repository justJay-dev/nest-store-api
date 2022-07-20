import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    return 'Hello Nest Store API!!';
  }

  async getHealth(): Promise<string> {
    return 'OK';
  }
}
