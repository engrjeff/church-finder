/*
  Warnings:

  - Added the required column `full_address` to the `Church` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Church" ADD COLUMN     "full_address" TEXT NOT NULL;
