/*
  Warnings:

  - You are about to drop the column `uploaded_file` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "business"."post" DROP COLUMN "uploaded_file";

-- CreateTable
CREATE TABLE "business"."uploaded_file" (
    "id" SERIAL NOT NULL,
    "data" BYTEA,
    "file_name" TEXT NOT NULL,
    "mime_type" TEXT NOT NULL,
    "post_id" INTEGER NOT NULL,

    CONSTRAINT "uploaded_file_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "business"."uploaded_file" ADD CONSTRAINT "uploaded_file_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "business"."post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
