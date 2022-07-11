import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartsController } from '../carts.controller';
import { CartsService } from '../carts.service';
import { Cart } from '../entities/cart.entity';
import { Product } from '../../products/entities/product.entity';
import { mockCarts } from './carts.mocks';

describe('CartsController', () => {
  let controller: CartsController;
  let service: CartsService;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'shoppingDBsb.db',
          entities: ['src/**/*.entity{.ts,.js}'],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Cart, Product]),
      ],
      controllers: [CartsController],
      providers: [CartsService],
    }).compile();

    controller = moduleRef.get<CartsController>(CartsController);
    service = moduleRef.get<CartsService>(CartsService);
  });

  afterAll(async () => {
    //ensure we have cleared test data.
    await controller.remove(mockCarts[0].id);
    await controller.remove(mockCarts[1].id);
    await moduleRef.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create the first mock cart', async () => {
      const result = await controller.create(mockCarts[0]);
      expect(result.id).toEqual(mockCarts[0].id);
      expect(result.products.length).toEqual(0);
    });
    it('should create the second mock cart', async () => {
      const result = await controller.create(mockCarts[1]);
      expect(result.id).toEqual(mockCarts[1].id);
      expect(result.products.length).toEqual(0);
    });
  });

  describe('update', () => {
    it('should add a product to the first cart', async () => {
      const products = mockCarts[0].products;
      const result = await controller.update(mockCarts[0].id, {
        products: [...products],
      });
      expect(result.affected).toEqual(1);
    });
    it('should add a product to the second cart', async () => {
      const products = mockCarts[1].products;
      const result = await controller.update(mockCarts[1].id, {
        products: [...products],
      });
      expect(result.affected).toEqual(1);
    });
  });

  describe('findOne', () => {
    it('should find the first cart', async () => {
      const result = await controller.findOne(mockCarts[0].id);
      expect(result.id).toEqual(mockCarts[0].id);
      expect(result.products.length).toEqual(mockCarts[0].products.length);
    });

    it('should find the second cart', async () => {
      const result = await controller.findOne(mockCarts[1].id);
      expect(result.id).toEqual(mockCarts[1].id);
      expect(result.products.length).toEqual(mockCarts[1].products.length);
    });
  });

  describe('findAll', () => {
    it('should return an array of carts', async () => {
      const result = await controller.findAll();
      expect(result.length).toEqual(mockCarts.length);
    });
  });

  describe('remove', () => {
    it('should remove the first cart', async () => {
      const result = await controller.remove(mockCarts[0].id);
      expect(result.affected).toEqual(1);
    });
    it('should remove the second cart', async () => {
      const result = await controller.remove(mockCarts[1].id);
      expect(result.affected).toEqual(1);
    });
  });
});
