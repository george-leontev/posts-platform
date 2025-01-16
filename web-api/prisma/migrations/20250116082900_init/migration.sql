/*
  Warnings:

  - Added the required column `topic` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "business"."post" ADD COLUMN     "topic" TEXT NOT NULL;
