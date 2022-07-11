import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartsService.create(createCartDto);
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
  findAll() {
    return this.cartsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a cart' })
  @ApiResponse({
    status: 200,
    description: 'Successful operation.',
    type: Cart,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  findOne(@Param('id') id: string) {
    return this.cartsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a cart' })
  @ApiResponse({
    status: 200,
    description: 'Successful operation.',
    type: UpdateResult,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(id, updateCartDto);
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
  remove(@Param('id') id: string) {
    return this.cartsService.remove(id);
  }
}
