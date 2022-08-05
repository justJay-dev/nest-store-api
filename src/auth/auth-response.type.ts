import { ApiProperty } from '@nestjs/swagger';
export class AuthResponse {
  @ApiProperty({ description: 'JWT token' })
  accessToken: string;

  @ApiProperty({ description: 'cart id' })
  cartId: string;

  @ApiProperty({ description: 'user id' })
  userId: number;
}
