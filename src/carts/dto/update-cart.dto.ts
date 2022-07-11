import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDto } from './create-cart.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
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
    ],
  })
  @IsNotEmpty()
  @IsString()
  products: Product[];
}
