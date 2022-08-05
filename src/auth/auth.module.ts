import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { CartsModule } from '../carts/carts.module';
import { AuthService } from './auth.service';
import { authConfig } from './auth.config';
import { LocalAuthStrategy } from './strategies/local-auth.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => CartsModule),
    PassportModule,
    JwtModule.register({
      secret: authConfig.jwtSecret,
      signOptions: { expiresIn: '300s' },
    }),
  ],
  providers: [AuthService, LocalAuthStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
