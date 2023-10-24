import { localizationConfig } from '@config';
import axios, { AxiosInstance } from 'axios';
import {
  RetrieveSingleTranslateRequest,
  RetrieveSingleTranslateResponse,
  RetrieveTranslateList,
} from './interfaces';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class LocalizationService {
  #_axios: AxiosInstance;
  #_prisma: PrismaService;
  constructor(prisma: PrismaService) {
    this.#_axios = axios.create({
      baseURL: localizationConfig.BASE_URL,
      timeout: 5000,
    });
    this.#_prisma = prisma;
  }

  async retrieveSingleTranslate(
    payload: RetrieveSingleTranslateRequest,
  ): Promise<RetrieveSingleTranslateResponse> {
    const { data } = await this.#_axios('/translate/single', {
      method: 'POST',
      data: {
        translateId: payload.translateId,
      },
      headers: {
        language: payload.languageCode,
      },
      timeout: 5000,
    });
    return data;
  }

  async retrieveUnusedTranslate(): Promise<RetrieveTranslateList[]> {
    const books = await this.#_prisma.book.findMany();
    const genres = await this.#_prisma.genre.findMany();
    const authors = await this.#_prisma.author.findMany();

    const unUsedTranslates = [];

    const translates = await this.#_axios('/translate/all', {
      method: 'GET',
      timeout: 5000,
    });

    translates.data.forEach((tr) => {
      let isUsed = false;
      books.forEach((e) => {
        if (e.title == tr.id || e.description == tr.id || e.language == tr.id)
          isUsed = true;
      });

      genres.forEach((e) => {
        if (e.name == tr.id) isUsed = true;
      });

      authors.forEach((e) => {
        if (e.name == tr.id) isUsed = true;
      });

      if (isUsed == false) unUsedTranslates.push(tr);
    });

    return unUsedTranslates;
  }
}
