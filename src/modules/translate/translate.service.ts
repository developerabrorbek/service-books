import { LocalizationService } from '@client';
import { Injectable } from '@nestjs/common';
import { RetrieveUnUsedTranslateListResponse } from './interfaces';

@Injectable()
export class TranslateService {
  #_localization: LocalizationService;

  constructor(localization: LocalizationService) {
    this.#_localization = localization;
  }

  async retrieveUnUsedTranslateList(): Promise<RetrieveUnUsedTranslateListResponse[]> {
    return await this.#_localization.retrieveUnusedTranslate()
  }
}
