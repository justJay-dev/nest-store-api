import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from '../products.service';
import { Product } from '../entities/product.entity';
import { Cart } from '../../carts/entities/cart.entity';
import { CartsModule } from '../../carts/carts.module';
import { mockProducts } from './products.mocks';

describe('ProductsService', () => {
  let service: ProductsService;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        CartsModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'shoppingDBsb.db',
          entities: ['src/**/*.entity{.ts,.js}'],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Cart, Product]),
      ],
      providers: [ProductsService],
    }).compile();

    service = moduleRef.get<ProductsService>(ProductsService);
  });

  afterAll(async () => {
    await service.remove(mockProducts[0].id);
    await service.remove(mockProducts[1].id);
    await moduleRef.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should reate the first mock product', async () => {
      const result = await service.create(mockProducts[0]);
      expect(result.id).toEqual(mockProducts[0].id);
      expect(result.title).toEqual(mockProducts[0].title);
    });
    it('should reate the second mock product', async () => {
      const result = await service.create(mockProducts[1]);
      expect(result.id).toEqual(mockProducts[1].id);
      expect(result.title).toEqual(mockProducts[1].title);
    });
  });

  describe('update', () => {
    it('should change the first product', async () => {
      const result = await service.update(mockProducts[0].id, {
        ...mockProducts[0],
        category: 'not-clothing',
      });
      const confirmQuery = await service.findOne(mockProducts[0].id);
      expect(result.affected).toEqual(1);
      expect(confirmQuery.category).toEqual('not-clothing');
    });
    it('should change the second product', async () => {
      const result = await service.update(mockProducts[1].id, {
        ...mockProducts[1],
        category: 'also-not-clothing',
      });
      const confirmQuery = await service.findOne(mockProducts[1].id);
      expect(result.affected).toEqual(1);
      expect(confirmQuery.category).toEqual('also-not-clothing');
    });
  });

  describe('findOne', () => {
    it('should find the first mock product', async () => {
      const result = await service.findOne(mockProducts[0].id);
      expect(result.id).toEqual(mockProducts[0].id);
    });
    it('should find the second mock cart', async () => {
      const result = await service.findOne(mockProducts[1].id);
      expect(result.id).toEqual(mockProducts[1].id);
    });
  });

  describe('findAll', () => {
    it('should find all products', async () => {
      const result = await service.findAll();
      expect(result.length).toEqual(2);
    });
  });

  describe('remove', () => {
    it('should remove the first mock product', async () => {
      const result = await service.remove(mockProducts[0].id);
      expect(result.affected).toEqual(1);
    });
    it('should remove the second mock product', async () => {
      const result = await service.remove(mockProducts[1].id);
      expect(result.affected).toEqual(1);
    });
  });
});
