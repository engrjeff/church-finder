/*
  Warnings:

  - You are about to drop the column `churchAddressId` on the `Church` table. All the data in the column will be lost.
  - You are about to drop the `ChurchAddress` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `barangay` to the `Church` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Church` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `Church` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `Church` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Church` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Church" DROP CONSTRAINT "Church_churchAddressId_fkey";

-- AlterTable
ALTER TABLE "Church" DROP COLUMN "churchAddressId",
ADD COLUMN     "barangay" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "province" TEXT NOT NULL,
ADD COLUMN     "region" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL;

-- DropTable
DROP TABLE "ChurchAddress";
