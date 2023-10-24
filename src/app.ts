import { LocalizationModule, MinioModule } from '@client';
import { databaseConfig, minioConfigs } from '@config';
import { AuthorModule, BookModule, GenreModule, TranslateModule } from '@modules';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, minioConfigs],
    }),
    MinioModule,
    PrismaModule,
    LocalizationModule,
    AuthorModule,
    GenreModule,
    BookModule,
    TranslateModule,
  ],
})
export class AppModule {}
