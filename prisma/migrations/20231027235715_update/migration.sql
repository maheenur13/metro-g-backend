/*
  Warnings:

  - You are about to drop the column `addiotionalInfo` on the `bookings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "addiotionalInfo",
ADD COLUMN     "additionalInfo" TEXT;
