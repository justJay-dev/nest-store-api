import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Cart {
  @ApiProperty({
    example: 'some-uuid-v4',
    description: 'Unique Card ID represented as a UUIDV4',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 1,
    description: 'Related User ID -- this is not an enforced relationship',
  })
  @Column()
  userId: number;

  //a jsonb array of products
  @ApiProperty({
    example: [
      {
        title: 'a great product title',
        price: 69.99,
        description: 'A generic product description',
        image: 'https://picsum.photos/200',
        category: 'underwear',
        id: '1258053e-f0f2-43b6-9972-88fe918ae041',
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
  @Column('simple-json')
  products: Product[];
}
