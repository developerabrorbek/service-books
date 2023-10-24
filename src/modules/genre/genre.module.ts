import { Module } from '@nestjs/common';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { PrismaService } from 'prisma/prisma.service';
import { LocalizationService } from '@client';

@Module({
  controllers: [GenreController],
  providers: [LocalizationService, PrismaService, GenreService],
})
export class GenreModule {}
