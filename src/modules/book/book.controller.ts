import { Book } from '@prisma/client';
import { BookService } from './book.service';
import {
  CreateBookDto,
  RetrieveBookListDto,
  RetrieveSingleBookDto,
  UpdateBookDto,
  DeleteBookDto,
  RetrieveSearchedBooksDto,
} from './dtos';
import { Body, Controller, UnprocessableEntityException } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { MessagePattern } from '@nestjs/microservices';
import { CMD } from './enums';
import { RetrieveFilteredBooksDto } from './dtos/retrieve-filtered-books.dto';

@Controller()
export class BookController {
  #_service: BookService;

  constructor(service: BookService) {
    this.#_service = service;
  }

  @MessagePattern(CMD.RETRIEVE_BOOK_LIST)
  async retrieveBookList(
    @Body() payload: RetrieveBookListDto,
  ): Promise<Book[]> {
    return await this.#_service.retrieveBookList(payload.languageCode);
  }

  @MessagePattern(CMD.RETRIEVE_BOOK)
  async retrieveSingleBook(
    @Body() payload: RetrieveSingleBookDto,
  ): Promise<Book> {
    return await this.#_service.retrieveSingleBook(
      payload.languageCode,
      payload.bookId,
    );
  }

  @MessagePattern(CMD.RETRIEVE_SEARCHED_BOOK)
  async retrieveSearchedBooks(
    @Body() payload: RetrieveSearchedBooksDto,
  ): Promise<Book[]> {
    return await this.#_service.retrieveSearchBookList({
      languageCode: payload.languageCode,
      text: payload.text,
    });
  }

  @MessagePattern(CMD.RETRIEVE_FILTERED_BOOK)
  async retrieveFilteredBooks(
    @Body() payload: RetrieveFilteredBooksDto,
  ): Promise<Book[]> {
    return await this.#_service.retrieveFilteredBookList({
      languageCode: payload.languageCode,
      authorId: payload.authorId,
      genreId: payload.genreId,
      status: payload.status
    });
  }

  @MessagePattern(CMD.CREATE_BOOK)
  async createBook(@Body() payload: CreateBookDto): Promise<void> {
    await this.#_service.createBook(payload);
  }

  @MessagePattern(CMD.UPDATE_BOOK)
  async updateBook(@Body() payload: UpdateBookDto): Promise<void> {
    await this.#_checkUUID(payload.id);
    await this.#_service.updateBook(payload);
  }

  @MessagePattern(CMD.DELETE_BOOK)
  async deleteBook(@Body() payload: DeleteBookDto): Promise<void> {
    await this.#_checkUUID(payload.bookId);
    await this.#_service.deleteBook(payload.bookId);
  }

  async #_checkUUID(id: string): Promise<void> {
    if (!isUUID(id, 4)) {
      throw new UnprocessableEntityException(
        `Given ${id} id is not valid UUID`,
      );
    }
  }
}
