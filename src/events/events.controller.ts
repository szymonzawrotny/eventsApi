import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dtos/createEventDto.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get('show-events')
  async showEvents() {
    return this.eventsService.showEvents();
  }

  @UseGuards(AuthGuard)
  @Post('create-event')
  async createEvent(@Body() data: CreateEventDto) {
    return this.eventsService.createEvent(data);
  }
}