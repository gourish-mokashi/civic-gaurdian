-- CreateEnum
CREATE TYPE "public"."role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "role" "public"."role" NOT NULL DEFAULT 'USER';
