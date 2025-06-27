import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUserDto.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('get-users')
  async getUsers(){
    return this.usersService.getUsers();
  }

  @Post('create-user')
  async createUser(@Body() data: CreateUserDto){
    return this.usersService.createUser(data)
  }
}
