import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { RetrieveSearchedBookRequest } from "../interfaces";

export class RetrieveSearchedBooksDto implements RetrieveSearchedBookRequest {
  @IsString()
  @IsNotEmpty()
  @MaxLength(2)
  languageCode: string;

  @IsString()
  text: string;
}