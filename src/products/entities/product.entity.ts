import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Product {
  @ApiProperty({
    example: 'some-uuid-v4',
    description: 'Unique Product ID represented as a UUIDV4',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Product 1', description: 'Product title' })
  @Column()
  title: string;

  @ApiProperty({
    example: 69.99,
    description: 'Product price, represented as float/double',
  })
  @Column()
  price: number;

  @ApiProperty({
    example: 'Product 1 description',
    description: 'Product description',
  })
  @Column()
  description: string;

  @ApiProperty({
    example: 'https://example.com/product-1.jpg',
    description: 'Product image URL',
  })
  @Column()
  image: string;

  @ApiProperty({ example: 'clothing', description: 'Product category' })
  @Column()
  category: string;
}
