import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { UsersService } from './users/users.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, UsersModule, EventsModule, AuthModule],
  providers: [UsersService],
})
export class AppModule {}
