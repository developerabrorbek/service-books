import { TranslateService } from "./translate.service";
import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { CMD } from "./enums";
import { RetrieveUnUsedTranslateListResponse } from "./interfaces";

@Controller()
export class TranslateController {
  #_service: TranslateService

  constructor(service: TranslateService){
    this.#_service = service
  }

  @MessagePattern(CMD.RETRIEVE_UNUSED_TRANSLATE_LIST)
  async retrieveUnUsedTranslateList(): Promise<RetrieveUnUsedTranslateListResponse[]>{
    return await this.#_service.retrieveUnUsedTranslateList()
  }
}