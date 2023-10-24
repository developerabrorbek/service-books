import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { PrismaService } from 'prisma/prisma.service';
import { LocalizationService } from '@client';
import { AuthorService } from './author.service';

@Module({
  providers: [LocalizationService, PrismaService, AuthorService],
  controllers: [AuthorController],
  exports: [AuthorService]
})
export class AuthorModule {}


