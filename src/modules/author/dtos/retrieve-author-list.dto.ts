import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { RetrieveAuthorListRequest } from "../interfaces";

export class RetrieveAuthorListDto implements RetrieveAuthorListRequest {
  @IsString()
  @IsNotEmpty()
  @MaxLength(2)
  languageCode: string;
}
