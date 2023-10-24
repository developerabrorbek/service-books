import { BookStatus } from '@prisma/client';
import { RetrieveFilteredBookRequest } from '../interfaces';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class RetrieveFilteredBooksDto implements RetrieveFilteredBookRequest {
  @IsString()
  @IsNotEmpty()
  @MaxLength(2)
  languageCode: string;

  @IsUUID(4)
  @IsOptional()
  @IsString()
  @MaxLength(64)
  authorId?: string;

  @IsOptional()
  @IsUUID(4)
  @IsString()
  @MaxLength(64)
  genreId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(8)
  status?: BookStatus;
}
