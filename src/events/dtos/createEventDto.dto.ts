import { EventType } from '@prisma/client';
import { IsString, IsNumber, IsEnum, IsDateString, IsArray } from 'class-validator';

export class CreateEventDto {
  @IsString()
  slug: string;

  @IsString()
  name: string;

  @IsString()
  city: string;

  @IsString()
  street: string;

  @IsString()
  zip: string;

  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;

  @IsEnum(EventType)
  type: EventType;

  @IsString()
  description: string;

  @IsNumber()
  author_id: number;

  @IsDateString()
  date: Date;

  @IsArray()
  @IsString({each: true})
  photo_paths: string[];
}
