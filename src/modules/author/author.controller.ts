import { Author } from '@prisma/client';
import {
  CreateAuthorDto,
  RetrieveAuthorListDto,
  UpdateAuthorDto,
} from './dtos';
import { Body, Controller, UnprocessableEntityException } from '@nestjs/common';
import { DeleteAuthorDto } from './dtos/delete-author.dto';
import { isUUID } from 'class-validator';
import { MessagePattern } from '@nestjs/microservices';
import { CMD } from './enums';
import { AuthorService } from './author.service';

@Controller()
export class AuthorController {
  #_service: AuthorService;

  constructor(service: AuthorService) {
    this.#_service = service;
  }

  @MessagePattern(CMD.RETRIEVE_AUTHOR_LIST)
  async retrieveAuthorList(
    @Body() payload: RetrieveAuthorListDto,
  ): Promise<Author[]> {
    return await this.#_service.retrieveAuthorList(payload.languageCode);
  }

  @MessagePattern(CMD.CREATE_AUTHOR)
  async createAuthor(payload: CreateAuthorDto): Promise<void> {
    await this.#_service.createAuthor(payload);
  }

  @MessagePattern(CMD.UPDATE_AUTHOR)
  async updateAuthor(@Body() payload: UpdateAuthorDto): Promise<void> {
    await this.#_checkUUID(payload.id);
    await this.#_service.updateAuthor(payload);
  }

  @MessagePattern(CMD.DELETE_AUTHOR)
  async deleteAuthor(@Body() payload: DeleteAuthorDto): Promise<void> {
    await this.#_checkUUID(payload.authorId);
    await this.#_service.deleteAuthor(payload.authorId);
  }

  async #_checkUUID(id: string): Promise<void> {
    if (!isUUID(id, 4)) {
      throw new UnprocessableEntityException(
        `Given ${id} id is not valid UUID`,
      );
    }
  }
}
