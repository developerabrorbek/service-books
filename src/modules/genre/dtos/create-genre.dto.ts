import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { CreateGenreRequest } from "../interfaces";

export class CreateGenreDto implements CreateGenreRequest{
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  name: string;
}