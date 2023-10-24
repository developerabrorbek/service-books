import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { UpdateBookRequest } from '../interfaces';
import { BookStatus } from '@prisma/client';

export class UpdateBookDto implements UpdateBookRequest {
  @IsString()
  @IsUUID()
  @MaxLength(64)
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  @MaxLength(64)
  title?: string;

  @IsString()
  @IsOptional()
  @MaxLength(64)
  description?: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  status?: BookStatus;

  @IsString()
  @IsOptional()
  @MaxLength(64)
  language?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  @MaxLength(4)
  year?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsUUID()
  @IsString()
  @IsOptional()
  @MaxLength(64)
  authorId?: string;

  @IsUUID()
  @IsString()
  @IsOptional()
  @MaxLength(64)
  genreId?: string;
}
