import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UsersModule } from '../../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalAuthStrategy } from '../strategies/local-auth.strategy';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { authConfig } from '../auth.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { CartsModule } from 'src/carts/carts.module';

describe('AuthService', () => {
  let service: AuthService;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        UsersModule,
        PassportModule,
        CartsModule,
        JwtModule.register({
          secret: authConfig.jwtSecret,
          signOptions: { expiresIn: '300s' },
        }),
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'shoppingDBsb.db',
          entities: ['src/**/*.entity{.ts,.js}'],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [AuthService, LocalAuthStrategy, JwtStrategy],
      exports: [AuthService],
    }).compile();

    service = moduleRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
