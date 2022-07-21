import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDto } from './create-cart.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Product } from 'src/products/entities/product.entity';

export class UpdateCartDto extends PartialType(CreateCartDto) {
  @ApiProperty({
    example: [
      {
        id: 'some-uuid',
        title: 'Product 1',
        price: 69.99,
        description: 'Product 1 description',
        image: 'https://example.com/product-1.jpg',
        category: 'clothing',
      },
      {
        title: 'a great product title2',
        price: 69.99,
        description: 'A generic product description2',
        image: 'https://picsum.photos/200',
        category: 'not-underwear',
        id: '2258053e-f0f2-43b6-9972-88fe918ae041',
      },
    ],
    description: 'A list of products in the cart, represented as a JSONB array',
  })
  @IsNotEmpty()
  products: Product[];
}
