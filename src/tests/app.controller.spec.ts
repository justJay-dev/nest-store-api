import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';

describe('AppController', () => {
  let moduleRef: TestingModule;
  let controller: AppController;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    controller = moduleRef.get<AppController>(AppController);
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  describe('root', () => {
    it('should return "Hello Nest Store API!!"', () => {
      expect(controller.getHello()).toBe('Hello Nest Store API!!');
    });
  });

  describe('health', () => {
    it('should return "OK"', () => {
      expect(controller.getHealth()).toBe('OK');
    });
  });
});
