import { Prisma, PrismaClient } from '@prisma/client';
import products from '../src/data/api/products.json';
import phonesDetails from '../src/data/api/phones.json';
import tabletsDetails from '../src/data/api/tablets.json';
import accessoriesDetails from '../src/data/api/accessories.json';
import { ProductDetailsType } from '../src/types/types';

const prisma = new PrismaClient();

async function main() {
  await prisma.$queryRawUnsafe(`TRUNCATE "Product" RESTART IDENTITY CASCADE;`);
  await prisma.$queryRawUnsafe(
    `TRUNCATE "ProductDetails" RESTART IDENTITY CASCADE;`,
  );

  for (const item of products) {
    await prisma.product.create({
      data: {
        itemId: item.itemId,
        name: item.name,
        category: item.category,
        fullPrice: item.fullPrice,
        price: item.price,
        screen: item.screen,
        capacity: item.capacity,
        color: item.color,
        ram: item.ram,
        year: item.year,
        image: item.image,
      },
    });
  }

  const insertProductDetails = async (
    details: ProductDetailsType[],
    category: string,
  ) => {
    for (const detail of details) {
      await prisma.productDetails.create({
        data: {
          id: detail.id,
          namespaceId: detail.namespaceId,
          category: category,
          name: detail.name,
          capacityAvailable: detail.capacityAvailable,
          capacity: detail.capacity,
          priceRegular: detail.priceRegular,
          priceDiscount: detail.priceDiscount,
          colorsAvailable: detail.colorsAvailable,
          color: detail.color,
          images: detail.images,
          description: detail.description ?? Prisma.JsonNull,
          screen: detail.screen,
          resolution: detail.resolution,
          processor: detail.processor,
          ram: detail.ram,
          camera: detail.camera,
          zoom: detail.zoom,
          cell: detail.cell,
        },
      });
    }
  };

  await insertProductDetails(phonesDetails, 'phone');
  await insertProductDetails(tabletsDetails, 'tablet');
  await insertProductDetails(accessoriesDetails, 'accessory');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
