import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/createUserDto.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/users/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(data: Prisma.UserFindManyArgs) {
    const users = await this.prisma.user.findMany(data);
    return users.map((user) => new UserEntity(user));
  }

  async getUser(email: string) {
    return this.prisma.user.findFirst({ where: { email: email } });
  }

  async createUser(data: CreateUserDto) {
    const { password, ...rest } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: { ...rest, password: hashedPassword },
    });
  }

  showUser(userId: number){
    return userId;
  }
}
