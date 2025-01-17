/*
  Warnings:

  - You are about to drop the column `file_url` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "business"."post" DROP COLUMN "file_url",
ADD COLUMN     "uploaded_file" BYTEA;
