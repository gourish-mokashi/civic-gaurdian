-- CreateEnum
CREATE TYPE "public"."department" AS ENUM ('MEDICAL', 'POLICE', 'FIRE_BRIGADE', 'MUNICIPAL', 'ELECTRICITY', 'OTHERS');

-- AlterTable
ALTER TABLE "public"."issue" ADD COLUMN     "assignedTo" "public"."department",
ADD COLUMN     "category" TEXT;
