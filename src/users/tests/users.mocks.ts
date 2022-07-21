import { User } from '../entities/user.entity';
export const mockUsers: Partial<User>[] = [
  {
    email: 'jon@doe.org',
    password: 'really-good-password',
  },
  {
    email: 'jane@doe.org',
    password: 'also-really-good-password',
  },
];
