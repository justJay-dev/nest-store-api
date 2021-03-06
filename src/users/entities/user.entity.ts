import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { EncryptionTransformer } from 'typeorm-encrypted';
import { authConfig } from '../../auth/auth.config';
import { ApiProperty } from '@nestjs/swagger';

export class UserResult {
  @ApiProperty({ example: 1, description: 'User ID' })
  id: number;

  @ApiProperty({ example: 'jon@doe.org', description: 'User email' })
  email: string;
}

@Entity()
export class User {
  @ApiProperty({ example: 1, description: 'User ID' })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({ example: 'jon@doe.org', description: 'User email' })
  @Column({ unique: true })
  email: string;

  // pretty please do not use this column in production
  // you will want to not store the key in code, and also in just general, don't roll youe own auth.
  @ApiProperty({ example: '123456', description: 'User password' })
  @Column({
    type: 'varchar',
    nullable: false,
    transformer: new EncryptionTransformer({
      key: authConfig.encryptionKey,
      algorithm: 'aes-256-cbc',
      ivLength: 16,
      iv: 'ff5ac19190424b1d88f9419ef949ae56',
    }),
  })
  password: string;
}
