import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Cart {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  userId: number;

  //a jsonb array of products
  @ApiProperty()
  @Column('simple-json')
  products: Product[];
}
