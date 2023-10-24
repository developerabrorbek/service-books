import { Global, Module } from "@nestjs/common";
import { MinioService } from "./minio.service";

@Global()
@Module({
  exports: [MinioService],
  providers: [MinioService]
})
export class MinioModule {}