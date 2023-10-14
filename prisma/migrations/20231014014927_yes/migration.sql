/*
  Warnings:

  - You are about to drop the column `serviceId` on the `cleaning_service_category` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `repair_service_category` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `replacement_service_category` table. All the data in the column will be lost.
  - Added the required column `serviceId` to the `cleaning_service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceId` to the `repair_service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceId` to the `replacement_service` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cleaning_service_category" DROP CONSTRAINT "cleaning_service_category_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "repair_service_category" DROP CONSTRAINT "repair_service_category_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "replacement_service_category" DROP CONSTRAINT "replacement_service_category_serviceId_fkey";

-- AlterTable
ALTER TABLE "cleaning_service" ADD COLUMN     "serviceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "cleaning_service_category" DROP COLUMN "serviceId";

-- AlterTable
ALTER TABLE "repair_service" ADD COLUMN     "serviceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "repair_service_category" DROP COLUMN "serviceId";

-- AlterTable
ALTER TABLE "replacement_service" ADD COLUMN     "serviceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "replacement_service_category" DROP COLUMN "serviceId";

-- AddForeignKey
ALTER TABLE "repair_service" ADD CONSTRAINT "repair_service_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replacement_service" ADD CONSTRAINT "replacement_service_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cleaning_service" ADD CONSTRAINT "cleaning_service_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
