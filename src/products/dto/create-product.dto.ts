import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'a great product title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 69.99 })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 'A generic product description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'https://picsum.photos/200' })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({ example: 'underwear' })
  @IsString()
  @IsNotEmpty()
  category: string;
}
