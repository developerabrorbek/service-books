import { LocalizationService } from '@client';
import { Genre } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateGenreRequest, UpdateGenreRequest } from './interfaces';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class GenreService {
  #_localization: LocalizationService;
  #_prisma: PrismaService;

  constructor(localization: LocalizationService, prisma: PrismaService) {
    this.#_localization = localization;
    this.#_prisma = prisma;
  }

  async retrieveGenreList(languageCode: string): Promise<Genre[]> {
    const genres = await this.#_prisma.genre.findMany();
    const allGenres = [];
    for (const item of genres) {
      const { value } = await this.#_localization.retrieveSingleTranslate({
        languageCode,
        translateId: item.name,
      });
      allGenres.push({
        ...item,
        name: value,
      });
    }
    return allGenres
  }

  async createGenre(paylaod: CreateGenreRequest): Promise<void> {
    await this.#_checkExistingGenre(paylaod.name);
    await this.#_prisma.genre.create({
      data: {
        name: paylaod.name,
      },
    });
  }

  async updateGenre(payload: UpdateGenreRequest): Promise<void> {
    await this.#_prisma.genre.update({
      where: { id: payload.id },
      data: { name: payload.name },
    });
  }

  async deleteGenre(id: string): Promise<void> {
    await this.#_prisma.genre.delete({ where: { id } });
  }

  async #_checkExistingGenre(name: string): Promise<void> {
    const genre = await this.#_prisma.genre.findFirst({ where: { name } });

    if (genre) {
      throw new ConflictException(`${name} genre already exists`);
    }
  }
}
