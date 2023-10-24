import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { CreateBookRequest } from '../interfaces';
import { BookStatus } from '@prisma/client';

export class CreateBookDto implements CreateBookRequest {
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  description: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  status: BookStatus;

  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  language: string;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(4)
  year: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsUUID()
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  authorId: string;

  @IsUUID()
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  genreId: string;
}
