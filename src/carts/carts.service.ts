import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async create(createCartDto: CreateCartDto) {
    return await this.cartRepository.save({ ...createCartDto, products: [] });
  }

  async findAll() {
    return await this.cartRepository.find();
  }

  async findOne(id: string) {
    return await this.cartRepository.findOneOrFail({ where: { id } });
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    return await this.cartRepository.update(id, updateCartDto);
  }

  async remove(id: string) {
    return await this.cartRepository.delete(id);
  }
}
