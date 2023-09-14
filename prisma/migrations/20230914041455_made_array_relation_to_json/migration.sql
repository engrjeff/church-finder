/*
  Warnings:

  - You are about to drop the `ChurchConfession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChurchContactNumber` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChurchMinistry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChurchPublicService` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChurchService` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SocialLink` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChurchConfession" DROP CONSTRAINT "ChurchConfession_church_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "ChurchContactNumber" DROP CONSTRAINT "ChurchContactNumber_church_contact_id_fkey";

-- DropForeignKey
ALTER TABLE "ChurchMinistry" DROP CONSTRAINT "ChurchMinistry_church_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "ChurchPublicService" DROP CONSTRAINT "ChurchPublicService_church_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "ChurchService" DROP CONSTRAINT "ChurchService_church_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "SocialLink" DROP CONSTRAINT "SocialLink_church_contact_id_fkey";

-- AlterTable
ALTER TABLE "ChurchContact" ADD COLUMN     "contact_numbers" JSONB[],
ADD COLUMN     "social_links" JSONB[];

-- AlterTable
ALTER TABLE "ChurchProfile" ADD COLUMN     "confessions" JSONB[],
ADD COLUMN     "ministries" JSONB[],
ADD COLUMN     "public_services" JSONB[],
ADD COLUMN     "services" JSONB[];

-- DropTable
DROP TABLE "ChurchConfession";

-- DropTable
DROP TABLE "ChurchContactNumber";

-- DropTable
DROP TABLE "ChurchMinistry";

-- DropTable
DROP TABLE "ChurchPublicService";

-- DropTable
DROP TABLE "ChurchService";

-- DropTable
DROP TABLE "SocialLink";
