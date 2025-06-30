import { Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(data: any, req: Request) {
    const user = await this.usersService.getUser(data.username);

    if (!user) throw new NotFoundException('User not found!');

    if(user.password === data.password){
      req.session!.user = user;
      return user;
    }

    return { message: 'invalid credentials' };
  }

  logout(req: Request) {
    req.session = null;
    return { message: 'logged out' };
  }

  me(req: Request) {
    if (req.session!.user) {
      return req.session!.user;
    }
    return { message: 'not logged in' };
  }
}
