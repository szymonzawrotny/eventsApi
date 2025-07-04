import { Exclude } from 'class-transformer';

export class UserEntity {
  id: number;
  email: string;
  name: string | null;
  lastname: string | null;
  role: string;
  age: number | null;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
