import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";
import { DeleteBookRequest } from "../interfaces";

export class DeleteBookDto implements DeleteBookRequest {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @MaxLength(64)
  bookId: string;
}