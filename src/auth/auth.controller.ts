import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '../common/guards/auth.guard';
import { AuthService } from './auth.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() data: any, @Req() req: Request) {
    return this.authService.login(data, req);
  }

  @Post('logout')
  logout(@Req() req: Request) {
    return this.authService.logout(req);
  }

  @Get('me')
  me(@Req() req: Request) {
    return this.authService.me(req);
  }

  @UseGuards(AuthGuard)
  @Get('checkProtected')
  checkProtected() {
    return 'protected';
  }
}
