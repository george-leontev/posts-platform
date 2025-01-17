/*
  Warnings:

  - You are about to drop the column `fileUrl` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "business"."post" DROP COLUMN "fileUrl",
ADD COLUMN     "file_url" BYTEA;
