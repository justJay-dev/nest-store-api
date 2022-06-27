import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  price: number;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  image: string;

  @ApiProperty()
  @Column()
  category: string;
}
