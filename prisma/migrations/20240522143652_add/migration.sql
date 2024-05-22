-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "namespaceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "capacityAvailable" TEXT[],
    "capacity" TEXT NOT NULL,
    "priceRegular" INTEGER NOT NULL,
    "priceDiscount" INTEGER NOT NULL,
    "colorsAvailable" TEXT[],
    "color" TEXT NOT NULL,
    "images" TEXT[],
    "description" TEXT[],
    "screen" TEXT NOT NULL,
    "resolution" TEXT NOT NULL,
    "processor" TEXT NOT NULL,
    "ram" TEXT NOT NULL,
    "camera" TEXT NOT NULL,
    "zoom" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductInfo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT[],
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductInfo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductInfo" ADD CONSTRAINT "ProductInfo_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
