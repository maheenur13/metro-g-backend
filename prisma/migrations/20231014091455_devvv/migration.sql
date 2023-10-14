/*
  Warnings:

  - You are about to drop the column `serviceId` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the `cleaning_service` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cleaning_service_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fuel_caterogy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fuel_delivery` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `repair_service` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `repair_service_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `replacement_service` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `replacement_service_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `urgent_service` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ctegoryId` to the `service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `service` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "cleaning_service" DROP CONSTRAINT "cleaning_service_cleaningCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "cleaning_service" DROP CONSTRAINT "cleaning_service_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "fuel_delivery" DROP CONSTRAINT "fuel_delivery_fuelId_fkey";

-- DropForeignKey
ALTER TABLE "fuel_delivery" DROP CONSTRAINT "fuel_delivery_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "repair_service" DROP CONSTRAINT "repair_service_serviceCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "repair_service" DROP CONSTRAINT "repair_service_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "replacement_service" DROP CONSTRAINT "replacement_service_serviceCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "replacement_service" DROP CONSTRAINT "replacement_service_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "urgent_service" DROP CONSTRAINT "urgent_service_cleaningServiceId_fkey";

-- DropForeignKey
ALTER TABLE "urgent_service" DROP CONSTRAINT "urgent_service_repairServiceId_fkey";

-- DropForeignKey
ALTER TABLE "urgent_service" DROP CONSTRAINT "urgent_service_replacementServiceId_fkey";

-- DropForeignKey
ALTER TABLE "urgent_service" DROP CONSTRAINT "urgent_service_serviceId_fkey";

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "serviceId";

-- AlterTable
ALTER TABLE "service" ADD COLUMN     "ctegoryId" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "cleaning_service";

-- DropTable
DROP TABLE "cleaning_service_category";

-- DropTable
DROP TABLE "fuel_caterogy";

-- DropTable
DROP TABLE "fuel_delivery";

-- DropTable
DROP TABLE "repair_service";

-- DropTable
DROP TABLE "repair_service_category";

-- DropTable
DROP TABLE "replacement_service";

-- DropTable
DROP TABLE "replacement_service_category";

-- DropTable
DROP TABLE "urgent_service";

-- CreateTable
CREATE TABLE "service_category" (
    "id" TEXT NOT NULL,
    "cateogryName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "service_category_cateogryName_key" ON "service_category"("cateogryName");

-- AddForeignKey
ALTER TABLE "service" ADD CONSTRAINT "service_ctegoryId_fkey" FOREIGN KEY ("ctegoryId") REFERENCES "service_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
