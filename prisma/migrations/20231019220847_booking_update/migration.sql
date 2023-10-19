/*
  Warnings:

  - You are about to drop the column `deliveryDate` on the `bookings` table. All the data in the column will be lost.
  - Added the required column `orderPlaceAt` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceAvailDate` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceAvailTime` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderPlace" AS ENUM ('SERVICE_POINT', 'AT_HOME');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'COMPLETE', 'REJECT');

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "deliveryDate",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "bookingStatus" "BookingStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "orderPlaceAt" "OrderPlace" NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "serviceAvailDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "serviceAvailTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "total" INTEGER NOT NULL,
ALTER COLUMN "paymentStatus" SET DEFAULT 'PENDING';
