-- DropForeignKey
ALTER TABLE "business"."post" DROP CONSTRAINT "post_user_id_fkey";

-- DropForeignKey
ALTER TABLE "business"."uploaded_file" DROP CONSTRAINT "uploaded_file_post_id_fkey";

-- AddForeignKey
ALTER TABLE "business"."post" ADD CONSTRAINT "post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "admin"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business"."uploaded_file" ADD CONSTRAINT "uploaded_file_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "business"."post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
