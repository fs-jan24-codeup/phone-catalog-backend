/*
  Warnings:

  - You are about to drop the `ProductDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductDetails" DROP CONSTRAINT "ProductDetails_productId_fkey";

-- DropTable
DROP TABLE "ProductDetails";
