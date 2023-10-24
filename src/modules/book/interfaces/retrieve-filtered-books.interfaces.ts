import { BookStatus } from "@prisma/client";

export declare interface RetrieveFilteredBookRequest {
  languageCode: string;
  genreId?: string;
  authorId?: string;
  status?: BookStatus;
}

