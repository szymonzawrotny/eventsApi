import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { UsersService } from './users/users.service';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [PrismaModule, UsersModule, EventsModule, AuthModule, ChatModule],
  providers: [UsersService, ChatGateway],
})
export class AppModule {}
