import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { mockProducts } from '../src/products/tests/products.mocks';
describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Core Module', () => {
    it('/ (GET)', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Hello Nest Store API!!');
    });

    it('/health (GET)', () => {
      return request(app.getHttpServer())
        .get('/health')
        .expect(200)
        .expect('OK');
    });
  });

  describe('Carts Module', () => {
    //todo this is fucked, do I want e2e in its own bucket?
    //probably if im going to have many more modules, but, will i?
    it('/carts (GET)', () => {
      return request(app.getHttpServer()).get('carts').expect(200);
    });
    /* todo
    it('/carts (POST)', ()=>{
return request(app.getHttpServer())
.post('/carts' )

    })
    */
  });
});
