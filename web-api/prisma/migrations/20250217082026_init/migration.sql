-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "admin";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "business";

-- CreateTable
CREATE TABLE "admin"."user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business"."post" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "topic" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business"."uploaded_file" (
    "id" SERIAL NOT NULL,
    "data" BYTEA,
    "file_name" TEXT NOT NULL,
    "mime_type" TEXT NOT NULL,
    "post_id" INTEGER NOT NULL,

    CONSTRAINT "uploaded_file_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "admin"."user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "admin"."user"("username");

-- AddForeignKey
ALTER TABLE "business"."post" ADD CONSTRAINT "post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "admin"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business"."uploaded_file" ADD CONSTRAINT "uploaded_file_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "business"."post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
