import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    try {
      return await this.cartRepository.save({ ...createCartDto, products: [] });
    } catch (error) {
      console.error(error);
    }
  }

  async findAll(): Promise<Cart[]> {
    try {
      return await this.cartRepository.find();
    } catch (error) {
      console.error(error);
    }
  }

  async findOne(id: string): Promise<Cart> {
    try {
      return await this.cartRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      console.error(error);
    }
  }

  async update(
    id: string,
    updateCartDto: UpdateCartDto,
  ): Promise<UpdateResult> {
    try {
      return await this.cartRepository.update(id, updateCartDto);
    } catch (error) {
      console.error(error);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      return await this.cartRepository.delete(id);
    } catch (error) {
      console.error(error);
    }
  }
}
