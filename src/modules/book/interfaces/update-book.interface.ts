import { BookStatus } from "@prisma/client";

export declare interface UpdateBookRequest {
  id: string;
  title?: string;
  description?: string;
  status?: BookStatus;
  language?: string;
  price?: number;
  year?: string;
  image?: string
  genreId?: string;
  authorId?: string;
}
