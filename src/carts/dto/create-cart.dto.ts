import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCartDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: number;
}
