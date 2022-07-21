import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../users.service';
import { User } from '../entities/user.entity';
import { mockUsers } from './users.mocks';
import { AuthModule } from '../../auth/auth.module';

describe('UsersService', () => {
  let service: UsersService;
  let moduleRef: TestingModule;
  let user0Id: number;
  let user1Id: number;

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
      providers: [UsersService],
      exports: [UsersService],
    }).compile();

    service = moduleRef.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    await service.remove(user0Id);
    await service.remove(user1Id);
    await moduleRef.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
