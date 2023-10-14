/*
  Warnings:

  - Changed the type of `cc` on the `vehicle` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "vehicle" DROP COLUMN "cc",
ADD COLUMN     "cc" INTEGER NOT NULL;
