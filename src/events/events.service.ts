import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDto } from './dtos/createEventDto.dto';
import { EventType } from '@prisma/client';
import slugify from 'slugify';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async showEvents() {
    const [CONCERT, EXHIBITION, THEATRE, OTHER] = await Promise.all([
      this.prisma.event.findMany({ where: { type: EventType.CONCERT } }),
      this.prisma.event.findMany({ where: { type: EventType.EXHIBITION } }),
      this.prisma.event.findMany({ where: { type: EventType.THEATRE } }),
      this.prisma.event.findMany({ where: { type: EventType.OTHER } }),
    ]);

    return {
      CONCERT,
      EXHIBITION,
      THEATRE,
      OTHER,
    };
  }

  async createEvent(body: CreateEventDto) {
    const slug = slugify(body.slug, {
      lower: true,
      strict: true,
    });

    try {
      return await this.prisma.event.create({
        data: { ...body, slug },
      });
    } catch (error) {
      if (error.code === 'P2002' && error.meta?.target?.includes('slug')) {
        throw new ConflictException(`Slug "${slug}" already exists.`);
      }
      throw new InternalServerErrorException('Something went wrong.');
    }
  }
}
