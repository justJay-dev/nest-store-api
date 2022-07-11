import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from '../products.controller';
import { ProductsService } from '../products.service';
import { Cart } from '../../carts/entities/cart.entity';
import { Product } from '../entities/product.entity';
import { mockProducts } from './products.mocks';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'shoppingDBsb.db',
          entities: ['src/**/*.entity{.ts,.js}'],
          synchronize: true,
          dropSchema: true,
        }),
        TypeOrmModule.forFeature([Cart, Product]),
      ],
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    controller = moduleRef.get<ProductsController>(ProductsController);
    service = moduleRef.get<ProductsService>(ProductsService);
  });

  afterAll(async () => {
    //ensure we have cleared test data.
    await moduleRef.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create the first mock product', async () => {
      const result = await controller.create(mockProducts[0]);
      expect(result.id).toEqual(mockProducts[0].id);
    });
    it('should create the second mock product', async () => {
      const result = await controller.create(mockProducts[1]);
      expect(result.id).toEqual(mockProducts[1].id);
    });
  });

  describe('update', () => {
    it('should update the first product', async () => {
      const result = await controller.update(mockProducts[0].id, {
        title: 'changed',
        price: 68.99,
        description: 'Product 0 description',
        image: 'https://example.com/product-2.jpg',
        category: 'clothing',
      });
      expect(result.affected).toEqual(1);
      const checkQuery = await service.findOne(mockProducts[0].id);
      expect(checkQuery.title).toEqual('changed');
    });
    it('update the second product', async () => {
      const result = await controller.update(mockProducts[1].id, {
        title: 'also-changed',
        price: 68.99,
        description: 'Product 1 description',
        image: 'https://example.com/product-3.jpg',
        category: 'clothing',
      });
      expect(result.affected).toEqual(1);
      const checkQuery = await service.findOne(mockProducts[1].id);
      expect(checkQuery.title).toEqual('also-changed');
    });
  });

  describe('findOne', () => {
    it('should find the first product', async () => {
      const result = await controller.findOne(mockProducts[0].id);
      expect(result.id).toEqual(mockProducts[0].id);
    });
    it('should find the second product', async () => {
      const result = await controller.findOne(mockProducts[1].id);
      expect(result.id).toEqual(mockProducts[1].id);
    });
  });

  describe('findAll', () => {
    it('should find all products', async () => {
      const result = await controller.findAll();
      expect(result.length).toEqual(1);
    });
  });

  describe('remove', () => {
    it('should remove the first product', async () => {
      const result = await controller.remove(mockProducts[0].id);
      expect(result.affected).toEqual(1);
    });
    it('should remove the second product', async () => {
      const result = await controller.remove(mockProducts[1].id);
      expect(result.affected).toEqual(1);
    });
  });
});
