import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: number;

  @Column()
  quantity: number;

  //a jsonb array of products
  @Column('simple-json')
  products: Product[];
}
