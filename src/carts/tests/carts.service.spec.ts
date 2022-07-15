import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartsService } from '../carts.service';
import { Cart } from '../entities/cart.entity';
import { Product } from '../../products/entities/product.entity';
import { ProductsModule } from '../../products/products.module';
import { mockCarts } from './carts.mocks';

describe('CartsService', () => {
  let service: CartsService;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        ProductsModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'shoppingDBsb.db',
          entities: ['src/**/*.entity{.ts,.js}'],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Cart, Product]),
      ],
      providers: [CartsService],
    }).compile();

    service = moduleRef.get<CartsService>(CartsService);
  });

  afterAll(async () => {
    await service.remove(mockCarts[0].id);
    await service.remove(mockCarts[1].id);
    await moduleRef.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create the first mock cart', async () => {
      const result = await service.create(mockCarts[0]);
      expect(result.id).toEqual(mockCarts[0].id);
    });
    it('should create the second mock cart', async () => {
      const result = await service.create(mockCarts[1]);
      expect(result.id).toEqual(mockCarts[1].id);
    });
  });

  describe('update', () => {
    it('should add a product to the first cart', async () => {
      const products = mockCarts[0].products;
      const result = await service.update(mockCarts[0].id, {
        products: [...products],
      });
      expect(result.affected).toEqual(1);
    });

    it('should add a product to the second cart', async () => {
      const products = mockCarts[1].products;
      const result = await service.update(mockCarts[1].id, {
        products: [...products],
      });
      expect(result.affected).toEqual(1);
    });
  });

  describe('findOne', () => {
    it('should find the first mock cart', async () => {
      const result = await service.findOne(mockCarts[0].id);
      expect(result.id).toEqual(mockCarts[0].id);
    });
    it('should find the second mock cart', async () => {
      const result = await service.findOne(mockCarts[1].id);
      expect(result.id).toEqual(mockCarts[1].id);
    });
  });

  describe('findAll', () => {
    it('should find all carts', async () => {
      const result = await service.findAll();
      expect(result.length).toEqual(2);
    });
  });

  describe('remove', () => {
    it('should remove the first mock cart', async () => {
      const result = await service.remove(mockCarts[0].id);
      expect(result.affected).toEqual(1);
    });
    it('should remove the second mock cart', async () => {
      const result = await service.remove(mockCarts[1].id);
      expect(result.affected).toEqual(1);
    });
  });
});
