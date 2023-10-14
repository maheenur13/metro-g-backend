/*
  Warnings:

  - You are about to drop the column `ctegoryId` on the `service` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `service` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "service" DROP CONSTRAINT "service_ctegoryId_fkey";

-- AlterTable
ALTER TABLE "service" DROP COLUMN "ctegoryId",
ADD COLUMN     "categoryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "service" ADD CONSTRAINT "service_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "service_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
