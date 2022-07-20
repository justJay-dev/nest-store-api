import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { EncryptionTransformer } from 'typeorm-encrypted';
import { authConfig } from 'src/auth/auth.config';
import { ApiProperty } from '@nestjs/swagger';

export class UserResult {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;
}

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  // pretty please do not use this column in production
  // you will want to not store the key in code, and also in just general, don't roll youe own auth.
  @ApiProperty()
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
