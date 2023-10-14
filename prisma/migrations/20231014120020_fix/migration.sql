/*
  Warnings:

  - Made the column `rating` on table `service` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "service" ALTER COLUMN "rating" SET NOT NULL;
