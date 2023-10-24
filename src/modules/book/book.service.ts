import { LocalizationService, MinioService } from '@client';
import { Book } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import {
  CreateBookRequest,
  RetrieveFilteredBookRequest,
  RetrieveSearchedBookRequest,
  UpdateBookRequest,
} from './interfaces';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BookService {
  readonly #_localization: LocalizationService;
  readonly #_prisma: PrismaService;
  readonly #_minio: MinioService;
  readonly #_config: ConfigService;

  constructor(
    localization: LocalizationService,
    prisma: PrismaService,
    minio: MinioService,
    config: ConfigService,
  ) {
    this.#_localization = localization;
    this.#_prisma = prisma;
    this.#_minio = minio;
    this.#_config = config;
  }

  async retrieveBookList(languageCode: string): Promise<Book[]> {
    const books = await this.#_prisma.book.findMany({
      include: { author: true, genre: true },
    });
    const allBooks = [];
    for (const item of books) {
      const title = await this.#_localization.retrieveSingleTranslate({
        languageCode,
        translateId: item.title,
      });

      const description = await this.#_localization.retrieveSingleTranslate({
        languageCode,
        translateId: item.description,
      });

      const authorName = await this.#_localization.retrieveSingleTranslate({
        languageCode,
        translateId: item.author.name,
      });

      const genreName = await this.#_localization.retrieveSingleTranslate({
        languageCode,
        translateId: item.genre.name,
      });

      const language = await this.#_localization.retrieveSingleTranslate({
        languageCode,
        translateId: item.language,
      });

      allBooks.push({
        ...item,
        title: title.value,
        description: description.value,
        language: language.value,
        genre: genreName,
        author: authorName,
      });
    }
    return allBooks;
  }

  async retrieveSearchBookList(
    payload: RetrieveSearchedBookRequest,
  ): Promise<Book[]> {
    const books = await this.#_prisma.book.findMany({
      include: { author: true, genre: true },
    });
    const foundedBooks = [];
    for (const item of books) {
      const title = await this.#_localization.retrieveSingleTranslate({
        languageCode: payload.languageCode,
        translateId: item.title,
      });

      const description = await this.#_localization.retrieveSingleTranslate({
        languageCode: payload.languageCode,
        translateId: item.description,
      });

      const authorName = await this.#_localization.retrieveSingleTranslate({
        languageCode: payload.languageCode,
        translateId: item.author.name,
      });

      const genreName = await this.#_localization.retrieveSingleTranslate({
        languageCode: payload.languageCode,
        translateId: item.genre.name,
      });

      const language = await this.#_localization.retrieveSingleTranslate({
        languageCode: payload.languageCode,
        translateId: item.language,
      });

      if (title.value.toLowerCase().includes(payload.text.toLowerCase())) {
        foundedBooks.push({
          ...item,
          title: title.value,
          description: description.value,
          language: language.value,
          genre: genreName,
          author: authorName,
        });
      }
    }
    return foundedBooks;
  }

  async retrieveFilteredBookList(
    payload: RetrieveFilteredBookRequest,
  ): Promise<Book[]> {
    const books = await this.#_prisma.book.findMany({
      include: { author: true, genre: true },
      where: {
        genreId: payload.genreId,
        authorId: payload.authorId,
        status: payload.status,
      },
    });
    const foundedBooks = [];
    for (const item of books) {
      const title = await this.#_localization.retrieveSingleTranslate({
        languageCode: payload.languageCode,
        translateId: item.title,
      });

      const description = await this.#_localization.retrieveSingleTranslate({
        languageCode: payload.languageCode,
        translateId: item.description,
      });

      const authorName = await this.#_localization.retrieveSingleTranslate({
        languageCode: payload.languageCode,
        translateId: item.author.name,
      });

      const genreName = await this.#_localization.retrieveSingleTranslate({
        languageCode: payload.languageCode,
        translateId: item.genre.name,
      });

      const language = await this.#_localization.retrieveSingleTranslate({
        languageCode: payload.languageCode,
        translateId: item.language,
      });

      foundedBooks.push({
        ...item,
        title: title.value,
        description: description.value,
        language: language.value,
        genre: genreName,
        author: authorName,
      })
    }
    return foundedBooks;
  }

  async retrieveSingleBook(languageCode: string, id: string): Promise<Book> {
    const book = await this.#_prisma.book.findFirst({
      where: { id },
      include: { author: true, genre: true },
    });
    const title = await this.#_localization.retrieveSingleTranslate({
      languageCode,
      translateId: book.title,
    });

    const description = await this.#_localization.retrieveSingleTranslate({
      languageCode,
      translateId: book.description,
    });

    const language = await this.#_localization.retrieveSingleTranslate({
      languageCode,
      translateId: book.language,
    });

    const authorName = await this.#_localization.retrieveSingleTranslate({
      languageCode,
      translateId: book.author.name,
    });

    const genreName = await this.#_localization.retrieveSingleTranslate({
      languageCode,
      translateId: book.genre.name,
    });

    (book.author.name = authorName.value), (book.genre.name = genreName.value);

    return {
      ...book,
      title: title.value,
      description: description.value,
      language: language.value,
    };
  }

  async createBook(paylaod: CreateBookRequest): Promise<void> {
    const imagePath = await this.#_minio.upload({
      bucket: this.#_config.getOrThrow<string>('minio.bucket'),
      file: paylaod.image,
    });

    await this.#_prisma.book
      .create({
        data: {
          title: paylaod.title,
          description: paylaod.description,
          language: paylaod.language,
          price: paylaod.price,
          status: paylaod.status,
          year: paylaod.year,
          image: imagePath,
          authorId: paylaod.authorId,
          genreId: paylaod.genreId,
        },
      })
      .catch((err) => console.log(err));
  }

  async updateBook(payload: UpdateBookRequest): Promise<void> {
    let imagePath = null;
    if (payload.image) {
      imagePath = await this.#_minio.upload({
        bucket: this.#_config.getOrThrow<string>('minio.bucket'),
        file: payload.image,
      });
    }

    await this.#_prisma.book.update({
      where: { id: payload.id },
      data: {
        title: payload.title,
        description: payload.description,
        language: payload.language,
        price: payload.price,
        status: payload.status,
        year: payload.year,
        image: imagePath,
        authorId: payload.authorId,
        genreId: payload.genreId,
      },
    });
  }

  async deleteBook(id: string): Promise<void> {
    await this.#_prisma.book.delete({ where: { id } });
  }
}
