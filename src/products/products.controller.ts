import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a product' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
    type: Product,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error',
    type: HttpException,
  })
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      return await this.productsService.create(createProductDto);
    } catch (error) {
      throw new HttpException(error.toString(), 500);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: 200,
    description: 'Successful operation.',
    type: [Product],
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error',
    type: HttpException,
  })
  async findAll() {
    try {
      return await this.productsService.findAll();
    } catch (error) {
      throw new HttpException(error.toString(), 500);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product' })
  @ApiResponse({
    status: 200,
    description: 'Successful operation.',
    type: Product,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error',
    type: HttpException,
  })
  async findOne(@Param('id') id: string) {
    try {
      return await this.productsService.findOne(id);
    } catch (error) {
      throw new HttpException(error.toString(), 500);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({
    status: 200,
    description: 'Successful operation.',
    type: UpdateResult,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error',
    type: HttpException,
  })
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      return await this.productsService.update(id, updateProductDto);
    } catch (error) {
      throw new HttpException(error.toString(), 500);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({
    status: 200,
    description: 'Successful operation.',
    type: DeleteResult,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error',
    type: HttpException,
  })
  async remove(@Param('id') id: string) {
    try {
      return await this.productsService.remove(id);
    } catch (error) {
      throw new HttpException(error.toString(), 500);
    }
  }
}
