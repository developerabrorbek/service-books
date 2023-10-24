import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { CreateAuthorRequest } from "../interfaces";

export class CreateAuthorDto implements CreateAuthorRequest{
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  name: string;
}