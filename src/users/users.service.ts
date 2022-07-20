import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserResult } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResult> {
    try {
      const user = await this.userRepository.save({ ...createUserDto });
      if (user) {
        return {
          id: user.id,
          email: user.email,
        };
      }
      return null;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number): Promise<UserResult> {
    try {
      const user = await this.userRepository.findOneOrFail({ where: { id } });
      if (user) {
        return {
          id: user.id,
          email: user.email,
        };
      }
      return null;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  // don't expose this on a controller please
  // this surfaces the whole user object.
  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail({
        where: { email: email },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    try {
      return await this.userRepository.update(id, updateUserDto);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      return await this.userRepository.delete(id);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
