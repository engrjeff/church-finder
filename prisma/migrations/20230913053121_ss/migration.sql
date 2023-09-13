/*
  Warnings:

  - Made the column `full_address` on table `Church` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Church" ALTER COLUMN "full_address" SET NOT NULL;
