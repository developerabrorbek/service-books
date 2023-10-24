import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { PrismaService } from 'prisma/prisma.service';
import { LocalizationService, MinioModule } from '@client';

@Module({
  imports: [MinioModule],
  controllers: [BookController],
  providers: [LocalizationService, PrismaService, BookService],
})
export class BookModule {}
