import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { RetrieveBookListRequest } from "../interfaces";

export class RetrieveBookListDto implements RetrieveBookListRequest {
  @IsString()
  @IsNotEmpty()
  @MaxLength(2)
  languageCode: string;
}