import { Genre } from "@prisma/client";
import { GenreService } from "./genre.service";
import { CreateGenreDto, RetrieveGenreListDto, UpdateGenreDto } from "./dtos";
import { Body, Controller, UnprocessableEntityException } from "@nestjs/common";
import { DeleteGenreDto } from "./dtos/delete-genre.dto";
import { isUUID } from "class-validator";
import { MessagePattern } from "@nestjs/microservices";
import { CMD } from "./enums";

@Controller()
export class GenreController {
  #_service: GenreService

  constructor(service: GenreService){
    this.#_service = service
  }

  @MessagePattern(CMD.RETRIEVE_GENRE_LIST)
  async retrieveGenreList(@Body() payload: RetrieveGenreListDto ): Promise<Genre[]>{
    return await this.#_service.retrieveGenreList(payload.languageCode)
  }

  @MessagePattern(CMD.CREATE_GENRE)
  async createGenre(@Body() payload: CreateGenreDto): Promise<void>{
    await this.#_service.createGenre(payload)
  }

  @MessagePattern(CMD.UPDATE_GENRE)
  async updateGenre(@Body() payload: UpdateGenreDto): Promise<void> {
    await this.#_checkUUID(payload.id)
    await this.#_service.updateGenre(payload)
  }

  @MessagePattern(CMD.DELETE_GENRE)
  async deleteGenre(@Body() payload: DeleteGenreDto): Promise<void>{
    await this.#_checkUUID(payload.genreId)
    await this.#_service.deleteGenre(payload.genreId)
  }

  async #_checkUUID(id: string): Promise<void>{
    if(!isUUID(id, 4)){
      throw new UnprocessableEntityException(`Given ${id} id is not valid UUID`)
    }
  }
}