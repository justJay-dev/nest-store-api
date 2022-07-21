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
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Cart } from './entities/cart.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@ApiTags('carts')
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a cart' })
  @ApiResponse({
    status: 201,
    description: 'The cart has been successfully created.',
    type: Cart,
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
  async create(@Body() createCartDto: CreateCartDto) {
    try {
      return await this.cartsService.create(createCartDto);
    } catch (error) {
      throw new HttpException(error.toString(), 500);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all carts' })
  @ApiResponse({
    status: 200,
    description: 'Successful operation.',
    type: [Cart],
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
      return await this.cartsService.findAll();
    } catch (error) {
      throw new HttpException(error.toString(), 500);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single cart' })
  @ApiResponse({
    status: 200,
    description: 'Successful operation.',
    type: Cart,
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
      return await this.cartsService.findOne(id);
    } catch (error) {
      throw new HttpException(error.toString(), 500);
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: "Update a cart's contents.",
  })
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
  async update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    try {
      return await this.cartsService.update(id, updateCartDto);
    } catch (error) {
      throw new HttpException(error.toString(), 500);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a cart' })
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
      return await this.cartsService.remove(id);
    } catch (error) {
      throw new HttpException(error.toString(), 500);
    }
  }
}
