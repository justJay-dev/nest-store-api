import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      return await this.productRepository.save({ ...createProductDto });
    } catch (error) {
      console.error(error);
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      return await this.productRepository.find();
    } catch (error) {
      console.error(error);
    }
  }

  async findOne(id: string): Promise<Product> {
    try {
      return this.productRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      console.error(error);
    }
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<UpdateResult> {
    try {
      return await this.productRepository.update(id, updateProductDto);
    } catch (error) {
      console.error(error);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      return await this.productRepository.delete(id);
    } catch (error) {
      console.error(error);
    }
  }
}
