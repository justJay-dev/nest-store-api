import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCartDto {
  @ApiProperty({ example: 1 })
  @IsString()
  @IsNotEmpty()
  userId: number;
}
