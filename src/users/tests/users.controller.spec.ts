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
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = moduleRef.get<UsersController>(UsersController);
    service = moduleRef.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    await controller.remove(1);
    await controller.remove(2);
    await moduleRef.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should create the first mock user account', async () => {
      const result = await controller.register({
        email: mockUsers[0].email,
        password: mockUsers[0].password,
      });
      expect(result.id).toBeDefined();
      expect(result.id).toEqual(1);
      expect(result.email).toEqual(mockUsers[0].email);
      user0Id = result.id;
    });
    it('should create the second mock user account', async () => {
      const result = await controller.register({
        email: mockUsers[1].email,
        password: mockUsers[1].password,
      });
      expect(result.id).toBeDefined();
      expect(result.id).toEqual(2);
      expect(result.email).toEqual(mockUsers[1].email);
      user1Id = result.id;
    });
  });

  describe('login', () => {
    let token0 = '';
    let token1 = '';
    it('should return an access token with valid credentials mock 0', async () => {
      const result = await controller.login({
        email: mockUsers[0].email,
        password: mockUsers[0].password,
      });
      token0 = result.access_token;
      expect(result.access_token).toBeDefined();
    });
    it('should return an access token with valid credentials mock 1', async () => {
      const result = await controller.login({
        email: mockUsers[1].email,
        password: mockUsers[1].password,
      });
      token1 = result.access_token;
      expect(result.access_token).toBeDefined();
    });

    it('should produce different tokens for each user', () => {
      expect(token0).not.toEqual(token1);
    });

    /* TODO expect an exception? no plane wifi.
    it('should not return an access token with invalid credentials', async () => {
      const result = await controller.login({
        email: mockUsers[0].email,
        password: mockUsers[1].password,
      });
      expect(result).toBeFalsy();
    });
    */
  });

  describe('findOne', () => {
    it('should find the first user', async () => {
      const result = await controller.findOne(user0Id);
      expect(result.email).toEqual(mockUsers[0].email);
    });
    it('should find the second user', async () => {
      const result = await controller.findOne(user1Id);
      expect(result.email).toEqual(mockUsers[1].email);
    });
  });

  describe('update', () => {
    it('should update the first user', async () => {
      const result = await controller.update(user0Id, {
        email: 'new-email@jest.org',
      });
      expect(result.affected).toEqual(1);
      const checkQuery = await controller.findOne(user0Id);
      expect(checkQuery.email).toEqual('new-email@jest.org');
    });
    it('should update the second user', async () => {
      const result = await controller.update(user1Id, {
        email: 'new-new-email@jest.org',
      });
      expect(result.affected).toEqual(1);
      const checkQuery = await controller.findOne(user1Id);
      expect(checkQuery.email).toEqual('new-new-email@jest.org');
    });
  });

  describe('remove', () => {
    it('should remove the first user', async () => {
      const result = await controller.remove(user0Id);
      expect(result.affected).toEqual(1);
    });
    it('should remove the second user', async () => {
      const result = await controller.remove(user1Id);
      expect(result.affected).toEqual(1);
    });
  });
});
