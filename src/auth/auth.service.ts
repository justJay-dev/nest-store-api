import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CartsService } from '../carts/carts.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private cartService: CartsService,
    private jwtTokenService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findOneByEmail(email);

      if (user && user.password === password) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async login(body: CreateUserDto) {
    const isValid = await this.validateUser(body.email, body.password);

    if (isValid) {
      const user = await this.usersService.findOneByEmail(body.email);
      const payload = { email: user.email, sub: user.id };
      const cart = await this.cartService.findOrCreateCardByUserId(user.id);

      return {
        access_token: this.jwtTokenService.sign(payload),
        userId: user.id,
        cartId: cart.id,
      };
    }
    throw new UnauthorizedException();
  }
}
