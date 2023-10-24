-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('new', 'old', 'normal');

-- CreateTable
CREATE TABLE "book" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "title" VARCHAR(256) NOT NULL,
    "description" VARCHAR NOT NULL,
    "status" "BookStatus" NOT NULL,
    "language" VARCHAR(64) NOT NULL,
    "year" VARCHAR(4) NOT NULL,

    CONSTRAINT "book_pkey" PRIMARY KEY ("id")
);
