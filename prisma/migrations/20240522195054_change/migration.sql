/*
  Warnings:

  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `camera` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `capacity` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `capacityAvailable` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `colorsAvailable` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `namespaceId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `priceDiscount` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `priceRegular` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `processor` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `ram` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `resolution` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `screen` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `zoom` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `ProductInfo` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[itemId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fullPrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "ProductInfo" DROP CONSTRAINT "ProductInfo_productId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
DROP COLUMN "camera",
DROP COLUMN "capacity",
DROP COLUMN "capacityAvailable",
DROP COLUMN "color",
DROP COLUMN "colorsAvailable",
DROP COLUMN "description",
DROP COLUMN "images",
DROP COLUMN "namespaceId",
DROP COLUMN "priceDiscount",
DROP COLUMN "priceRegular",
DROP COLUMN "processor",
DROP COLUMN "ram",
DROP COLUMN "resolution",
DROP COLUMN "screen",
DROP COLUMN "zoom",
ADD COLUMN     "fullPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "itemId" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "ProductInfo";

-- CreateTable
CREATE TABLE "ProductDetails" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "capacity" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "screen" TEXT NOT NULL,
    "ram" TEXT NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "ProductDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductDetails_productId_key" ON "ProductDetails"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_itemId_key" ON "Product"("itemId");

-- AddForeignKey
ALTER TABLE "ProductDetails" ADD CONSTRAINT "ProductDetails_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
