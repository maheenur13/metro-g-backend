/*
  Warnings:

  - You are about to drop the column `cateogryName` on the `service_category` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[categoryName]` on the table `service_category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryName` to the `service_category` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "service_category_cateogryName_key";

-- AlterTable
ALTER TABLE "service_category" DROP COLUMN "cateogryName",
ADD COLUMN     "categoryName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "service_category_categoryName_key" ON "service_category"("categoryName");
