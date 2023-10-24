/*
  Warnings:

  - You are about to alter the column `title` on the `book` table. The data in that column could be lost. The data in that column will be cast from `VarChar(256)` to `VarChar(64)`.
  - You are about to alter the column `description` on the `book` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(64)`.

*/
-- AlterTable
ALTER TABLE "book" ALTER COLUMN "title" SET DATA TYPE VARCHAR(64),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(64);
