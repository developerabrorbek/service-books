import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';
import { RetrieveSingleBookRequest } from '../interfaces';

export class RetrieveSingleBookDto implements RetrieveSingleBookRequest {
  @IsString()
  @IsNotEmpty()
  @MaxLength(2)
  languageCode: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @MaxLength(64)
  bookId: string;
}
