import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from '../auth/auth.service';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserResult } from './entities/user.entity';
import { AuthResponse } from '../auth/auth-response.type';
import {
  SwaggerHttpException,
  SwaggerUnauthorizedException,
} from '../common/types/exceptions.type';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/register')
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: UserResult,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error',
    type: SwaggerHttpException,
  })
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully logged in.',
    type: AuthResponse,
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Response for bad login credentials.',
    type: SwaggerUnauthorizedException,
  })
  @ApiResponse({
    status: 500,
    description: 'Error',
    type: SwaggerHttpException,
  })
  async login(@Body() createUserDto: CreateUserDto) {
    return await this.authService.login(createUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user' })
  @ApiResponse({
    status: 200,
    description: 'Successful operation.',
    type: UserResult,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error',
    type: SwaggerHttpException,
  })
  async findOne(@Param('id') id: number) {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 200,
    description: 'Successful operation.',
    type: UpdateResult,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error',
    type: SwaggerHttpException,
  })
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({
    status: 200,
    description: 'Successful operation.',
    type: DeleteResult,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error',
    type: SwaggerHttpException,
  })
  async remove(@Param('id') id: number) {
    return await this.usersService.remove(+id);
  }
}
