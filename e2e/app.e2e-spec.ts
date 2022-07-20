import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ProductsModule } from '../src/products/products.module';
import { CartsModule } from '../src/carts/carts.module';
import { mockProducts } from '../src/products/tests/products.mocks';
import { mockCarts } from '../src/carts/tests/carts.mocks';
describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ProductsModule, CartsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('App Module', () => {
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

  describe('Products Module Happy Path', () => {
    it('/products (POST)', () => {
      return request(app.getHttpServer())
        .post('/products')
        .send({
          ...mockProducts[0],
        })
        .expect(201);
    });

    it('/products/:id (PATCH)', () => {
      return request(app.getHttpServer())
        .patch(`/products/${mockProducts[0].id}`)
        .send({
          ...mockProducts[0],
        })
        .expect(200);
    });

    it('/products (GET)', () => {
      return request(app.getHttpServer())
        .get('/products')
        .expect(200)
        .expect([mockProducts[0]]);
    });

    it('/products/:id (GET)', () => {
      return request(app.getHttpServer())
        .get(`/products/${mockProducts[0].id}`)
        .expect(200)
        .expect(mockProducts[0]);
    });

    it('/products/:id (DELETE)', () => {
      return request(app.getHttpServer())
        .delete(`/products/${mockProducts[0].id}`)
        .expect(200);
    });
  });

  describe('Carts Module Happy Path', () => {
    it('/carts (POST)', () => {
      return request(app.getHttpServer())
        .post('/carts')
        .send({
          ...mockCarts[0],
        })
        .expect(201);
    });

    it('/carts (GET)', () => {
      return request(app.getHttpServer()).get('/carts').expect(200);
    });

    it('/carts/:id (GET)', () => {
      return request(app.getHttpServer())
        .get(`/carts/${mockCarts[0].id}`)
        .expect(200);
    });

    it('/carts/:id (PATCH)', () => {
      return request(app.getHttpServer())
        .patch(`/carts/${mockCarts[0].id}`)
        .send({
          products: [...mockCarts[0].products],
        })
        .expect(200);
    });

    it('/carts/:id (DELETE)', () => {
      return request(app.getHttpServer())
        .delete(`/carts/${mockCarts[0].id}`)
        .expect(200);
    });
  });
});
