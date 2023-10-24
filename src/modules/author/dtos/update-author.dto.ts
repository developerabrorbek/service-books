import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UpdateAuthorRequest } from '../interfaces';

export class UpdateAuthorDto implements UpdateAuthorRequest {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  name: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
