import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUserDto.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('get-all-users')
  async getAllUsers() {
    return this.usersService.getAllUsers({});
  }

  @Post('create-user')
  async createUser(@Body() data: CreateUserDto) {
    return this.usersService.createUser(data);
  }

  @UseGuards(AuthGuard)
  @Get('show-user')
  showUser(@GetUser() user) {
    return this.usersService.showUser(user.id);
  }
}
