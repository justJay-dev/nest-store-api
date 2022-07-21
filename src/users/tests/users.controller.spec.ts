import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { mockUsers } from './users.mocks';
import { AuthModule } from '../../auth/auth.module';
import { User } from '../entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        AuthModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'shoppingDBsb.db',
          entities: ['src/**/*.entity{.ts,.js}'],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
      ],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = moduleRef.get<UsersController>(UsersController);
    service = moduleRef.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    await moduleRef.close();
  });
});
