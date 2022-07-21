import { ApiProperty } from '@nestjs/swagger';

export class SwaggerHttpException {
  @ApiProperty({
    example: 'Usually missing JSON or some TypeORM Error',
    description: 'the error message the server sent, cast to string.',
  })
  message: string;
  @ApiProperty({ example: 500, description: 'the status code the server sent' })
  status: number;
}

export class SwaggerUnauthorizedException {
  @ApiProperty({ example: 401, description: 'status code the server sent' })
  statusCode: number;
  @ApiProperty({
    example: 'Unauthorized',
    description:
      'Message recieved from server, likely due to bad password or email ',
  })
  message: string;
}
