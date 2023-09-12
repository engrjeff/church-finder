/*
  Warnings:

  - Added the required column `status` to the `Church` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Church` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Church` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PublishStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'INACTIVE');

-- AlterTable
ALTER TABLE "Church" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "PublishStatus" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ChurchProfile" (
    "id" TEXT NOT NULL,
    "mission" TEXT,
    "vision" TEXT,
    "church_size" INTEGER NOT NULL,
    "communion_frequency" TEXT NOT NULL,
    "church_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChurchProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChurchService" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "church_profile_id" TEXT,

    CONSTRAINT "ChurchService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChurchMinistry" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "church_profile_id" TEXT,

    CONSTRAINT "ChurchMinistry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChurchPublicService" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "church_profile_id" TEXT,

    CONSTRAINT "ChurchPublicService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChurchConfession" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "church_profile_id" TEXT,

    CONSTRAINT "ChurchConfession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChurchContact" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "website" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "church_id" TEXT NOT NULL,

    CONSTRAINT "ChurchContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChurchContactNumber" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "church_contact_id" TEXT,

    CONSTRAINT "ChurchContactNumber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialLink" (
    "id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "church_contact_id" TEXT,

    CONSTRAINT "SocialLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pastor" (
    "id" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "church_id" TEXT NOT NULL,

    CONSTRAINT "Pastor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChurchProfile_church_id_key" ON "ChurchProfile"("church_id");

-- CreateIndex
CREATE UNIQUE INDEX "ChurchContact_church_id_key" ON "ChurchContact"("church_id");

-- CreateIndex
CREATE UNIQUE INDEX "Pastor_church_id_key" ON "Pastor"("church_id");

-- AddForeignKey
ALTER TABLE "Church" ADD CONSTRAINT "Church_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchProfile" ADD CONSTRAINT "ChurchProfile_church_id_fkey" FOREIGN KEY ("church_id") REFERENCES "Church"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchService" ADD CONSTRAINT "ChurchService_church_profile_id_fkey" FOREIGN KEY ("church_profile_id") REFERENCES "ChurchProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchMinistry" ADD CONSTRAINT "ChurchMinistry_church_profile_id_fkey" FOREIGN KEY ("church_profile_id") REFERENCES "ChurchProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchPublicService" ADD CONSTRAINT "ChurchPublicService_church_profile_id_fkey" FOREIGN KEY ("church_profile_id") REFERENCES "ChurchProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchConfession" ADD CONSTRAINT "ChurchConfession_church_profile_id_fkey" FOREIGN KEY ("church_profile_id") REFERENCES "ChurchProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchContact" ADD CONSTRAINT "ChurchContact_church_id_fkey" FOREIGN KEY ("church_id") REFERENCES "Church"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchContactNumber" ADD CONSTRAINT "ChurchContactNumber_church_contact_id_fkey" FOREIGN KEY ("church_contact_id") REFERENCES "ChurchContact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialLink" ADD CONSTRAINT "SocialLink_church_contact_id_fkey" FOREIGN KEY ("church_contact_id") REFERENCES "ChurchContact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pastor" ADD CONSTRAINT "Pastor_church_id_fkey" FOREIGN KEY ("church_id") REFERENCES "Church"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
