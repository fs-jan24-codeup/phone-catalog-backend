-- CreateTable
CREATE TABLE "ProductDetails" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "namespaceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "capacityAvailable" TEXT[],
    "capacity" TEXT NOT NULL,
    "priceRegular" DOUBLE PRECISION NOT NULL,
    "priceDiscount" DOUBLE PRECISION NOT NULL,
    "colorsAvailable" TEXT[],
    "color" TEXT NOT NULL,
    "images" TEXT[],
    "description" JSONB NOT NULL,
    "screen" TEXT NOT NULL,
    "resolution" TEXT NOT NULL,
    "processor" TEXT NOT NULL,
    "ram" TEXT NOT NULL,
    "camera" TEXT NOT NULL,
    "zoom" TEXT NOT NULL,
    "cell" TEXT[],

    CONSTRAINT "ProductDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductDetails" ADD CONSTRAINT "ProductDetails_id_fkey" FOREIGN KEY ("id") REFERENCES "Product"("itemId") ON DELETE RESTRICT ON UPDATE CASCADE;
