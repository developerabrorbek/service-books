import { LocalizationService } from '@client';
import { Author } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateAuthorRequest, UpdateAuthorRequest } from './interfaces';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class AuthorService {
  readonly #_localization: LocalizationService;
  readonly #_prisma: PrismaService;

  constructor(localization: LocalizationService, prisma: PrismaService) {
    this.#_localization = localization;
    this.#_prisma = prisma;
  }

  async retrieveAuthorList(languageCode: string): Promise<Author[]> {
    const authors = await this.#_prisma.author.findMany();
    const allAuthors = [];
    for (const item of authors) {
      const { value } = await this.#_localization.retrieveSingleTranslate({
        languageCode,
        translateId: item.name,
      });
      allAuthors.push({
        ...item,
        name: value,
      });
    }
    return allAuthors;
  }

  async createAuthor(paylaod: CreateAuthorRequest): Promise<void> {
    await this.#_checkExistingAuthor(paylaod.name);
    await this.#_prisma.author.create({
      data: {
        name: paylaod.name,
      },
    });
  }

  async updateAuthor(payload: UpdateAuthorRequest): Promise<void> {
    await this.#_prisma.author.update({
      where: { id: payload.id },
      data: { name: payload.name },
    });
  }

  async deleteAuthor(id: string): Promise<void> {
    await this.#_prisma.author.delete({ where: { id } });
  }

  async #_checkExistingAuthor(name: string): Promise<void> {
    const author = await this.#_prisma.author.findFirst({ where: { name } });

    if (author) {
      throw new ConflictException(`${name} author already exists`);
    }
  }
}
