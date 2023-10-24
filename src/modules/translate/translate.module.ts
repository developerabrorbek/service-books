import { Module } from '@nestjs/common';
import { TranslateController } from './translate.controller';
import { TranslateService } from './translate.service';
import { LocalizationService } from '@client';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [TranslateController],
  providers: [LocalizationService, PrismaService ,TranslateService],
})
export class TranslateModule {}
