/*
  Warnings:

  - Added the required column `brand` to the `vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vehicle" ADD COLUMN     "brand" TEXT NOT NULL;
