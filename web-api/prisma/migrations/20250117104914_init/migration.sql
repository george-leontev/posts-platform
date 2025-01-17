/*
  Warnings:

  - Added the required column `fileUrl` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "business"."post" ADD COLUMN     "fileUrl" TEXT NOT NULL;
