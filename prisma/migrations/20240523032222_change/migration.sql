/*
  Warnings:

  - The primary key for the `ProductDetails` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `year` on the `ProductDetails` table. All the data in the column will be lost.
  - Added the required column `camera` to the `ProductDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `ProductDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `ProductDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `ProductDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namespaceId` to the `ProductDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceDiscount` to the `ProductDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceRegular` to the `ProductDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `processor` to the `ProductDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resolution` to the `ProductDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zoom` to the `ProductDetails` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ProductDetails_productId_key";

-- AlterTable
CREATE SEQUENCE product_id_seq;
ALTER TABLE "Product" ALTER COLUMN "id" SET DEFAULT nextval('product_id_seq');
ALTER SEQUENCE product_id_seq OWNED BY "Product"."id";

-- AlterTable
ALTER TABLE "ProductDetails" DROP CONSTRAINT "ProductDetails_pkey",
DROP COLUMN "year",
ADD COLUMN     "camera" TEXT NOT NULL,
ADD COLUMN     "capacityAvailable" TEXT[],
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "cell" TEXT[],
ADD COLUMN     "colorsAvailable" TEXT[],
ADD COLUMN     "description" JSONB NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "namespaceId" TEXT NOT NULL,
ADD COLUMN     "priceDiscount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "priceRegular" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "processor" TEXT NOT NULL,
ADD COLUMN     "resolution" TEXT NOT NULL,
ADD COLUMN     "zoom" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ProductDetails_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ProductDetails_id_seq";
