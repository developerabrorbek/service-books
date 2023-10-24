import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UpdateGenreRequest } from '../interfaces';

export class UpdateGenreDto implements UpdateGenreRequest {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  name: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
