import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { RetrieveGenreListRequest } from "../interfaces";

export class RetrieveGenreListDto implements RetrieveGenreListRequest {
  @IsString()
  @IsNotEmpty()
  @MaxLength(2)
  languageCode: string;
}