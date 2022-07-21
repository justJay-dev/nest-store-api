import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'a great product title',
    description: 'Product title',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 69.99,
    description: 'Product price, represented as float/double',
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 'A generic product description',
    description: 'Product description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'https://picsum.photos/200',
    description: 'Product image URL',
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({ example: 'underwear', description: 'Product category' })
  @IsString()
  @IsNotEmpty()
  category: string;
}
