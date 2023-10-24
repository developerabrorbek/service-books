import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";
import { DeleteAuthorInterface } from "../interfaces";

export class DeleteAuthorDto implements DeleteAuthorInterface {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @MaxLength(64)
  authorId: string;
}