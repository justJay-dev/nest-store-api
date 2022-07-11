import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Product 1' })
  @Column()
  title: string;

  @ApiProperty({ example: 69.99 })
  @Column()
  price: number;

  @ApiProperty({ example: 'Product 1 description' })
  @Column()
  description: string;

  @ApiProperty({ example: 'https://example.com/product-1.jpg' })
  @Column()
  image: string;

  @ApiProperty({ example: 'clothing' })
  @Column()
  category: string;
}
