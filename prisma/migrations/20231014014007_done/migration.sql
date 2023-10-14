-- CreateEnum
CREATE TYPE "Order_Status" AS ENUM ('COMPLETE', 'INCOMPLETE');

-- CreateEnum
CREATE TYPE "Fuel" AS ENUM ('OKTEN', 'DISEL', 'PETROL');

-- CreateTable
CREATE TABLE "service" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "repair_service_category" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "repair_service_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "repair_service" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT,
    "description" TEXT NOT NULL,
    "otherDetails" TEXT,
    "totalTaken" INTEGER NOT NULL DEFAULT 0,
    "price" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "serviceCategoryId" TEXT NOT NULL,

    CONSTRAINT "repair_service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "replacement_service_category" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT,
    "description" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "replacement_service_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "replacement_service" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT,
    "description" TEXT NOT NULL,
    "serviceCategoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "replacement_service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cleaning_service_category" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT,
    "description" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cleaning_service_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cleaning_service" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT,
    "description" TEXT NOT NULL,
    "cleaningCategoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cleaning_service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "urgent_service" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "serviceId" TEXT NOT NULL,
    "repairServiceId" TEXT NOT NULL,
    "cleaningServiceId" TEXT NOT NULL,
    "replacementServiceId" TEXT NOT NULL,

    CONSTRAINT "urgent_service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fuel_caterogy" (
    "id" TEXT NOT NULL,
    "type" "Fuel" NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fuel_caterogy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fuel_delivery" (
    "id" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "location" TEXT NOT NULL,
    "totalorder" INTEGER NOT NULL DEFAULT 0,
    "fuelId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fuel_delivery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" TEXT NOT NULL,
    "bookingDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deliveryDate" TIMESTAMP(3) NOT NULL,
    "price" INTEGER NOT NULL,
    "customerId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "Order_Status" NOT NULL,
    "price" INTEGER NOT NULL,
    "customerId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "repair_service_category_title_key" ON "repair_service_category"("title");

-- CreateIndex
CREATE UNIQUE INDEX "repair_service_title_key" ON "repair_service"("title");

-- CreateIndex
CREATE UNIQUE INDEX "replacement_service_category_title_key" ON "replacement_service_category"("title");

-- CreateIndex
CREATE UNIQUE INDEX "replacement_service_title_key" ON "replacement_service"("title");

-- CreateIndex
CREATE UNIQUE INDEX "cleaning_service_category_title_key" ON "cleaning_service_category"("title");

-- CreateIndex
CREATE UNIQUE INDEX "cleaning_service_title_key" ON "cleaning_service"("title");

-- CreateIndex
CREATE UNIQUE INDEX "urgent_service_title_key" ON "urgent_service"("title");

-- CreateIndex
CREATE UNIQUE INDEX "fuel_caterogy_type_key" ON "fuel_caterogy"("type");

-- AddForeignKey
ALTER TABLE "repair_service_category" ADD CONSTRAINT "repair_service_category_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repair_service" ADD CONSTRAINT "repair_service_serviceCategoryId_fkey" FOREIGN KEY ("serviceCategoryId") REFERENCES "repair_service_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replacement_service_category" ADD CONSTRAINT "replacement_service_category_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replacement_service" ADD CONSTRAINT "replacement_service_serviceCategoryId_fkey" FOREIGN KEY ("serviceCategoryId") REFERENCES "replacement_service_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cleaning_service_category" ADD CONSTRAINT "cleaning_service_category_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cleaning_service" ADD CONSTRAINT "cleaning_service_cleaningCategoryId_fkey" FOREIGN KEY ("cleaningCategoryId") REFERENCES "cleaning_service_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "urgent_service" ADD CONSTRAINT "urgent_service_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "urgent_service" ADD CONSTRAINT "urgent_service_repairServiceId_fkey" FOREIGN KEY ("repairServiceId") REFERENCES "repair_service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "urgent_service" ADD CONSTRAINT "urgent_service_cleaningServiceId_fkey" FOREIGN KEY ("cleaningServiceId") REFERENCES "cleaning_service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "urgent_service" ADD CONSTRAINT "urgent_service_replacementServiceId_fkey" FOREIGN KEY ("replacementServiceId") REFERENCES "replacement_service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fuel_delivery" ADD CONSTRAINT "fuel_delivery_fuelId_fkey" FOREIGN KEY ("fuelId") REFERENCES "fuel_caterogy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fuel_delivery" ADD CONSTRAINT "fuel_delivery_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
