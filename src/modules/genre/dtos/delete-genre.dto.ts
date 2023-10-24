import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";
import { DeleteGenreInterface } from "../interfaces";

export class DeleteGenreDto implements DeleteGenreInterface {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @MaxLength(64)
  genreId: string;
}