import { Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(data: any, req: Request) {
    const user = await this.usersService.getUser(data.username);

    if (!user) throw new NotFoundException('User not found!');

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (isMatch) {
      const safeUser = new UserEntity(user);
      req.session!.user = safeUser;
      return safeUser;
    }

    return { message: 'invalid credentials' };
  }

  logout(req: Request) {
    req.session = null;
    return { message: 'logged out' };
  }

  me(req: Request) {
    if (req.session!.user) {
      return new UserEntity(req.session!.user);
    }
    return { message: 'not logged in' };
  }
}
