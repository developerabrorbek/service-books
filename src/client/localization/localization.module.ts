import { Module } from '@nestjs/common';
import { LocalizationService } from './localization.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  exports: [LocalizationService],
  providers: [PrismaService,LocalizationService],
})
export class LocalizationModule {}
