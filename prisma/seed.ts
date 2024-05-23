import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import products from '../src/data/api/products.json';
import phones from '../src/data/api/phones.json';
import accessories from '../src/data/api/accessories.json';
import tablets from '../src/data/api/tablets.json';

async function main() {
  await prisma.$queryRawUnsafe(`Truncate "Product" restart identity cascade;`);

  const productDetails = [...phones, ...tablets];

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

  for (const detail of productDetails) {
    await prisma.productDetails.create({
      data: {
        id: detail.id,
        category: detail.category,
        namespaceId: detail.namespaceId,
        name: detail.name,
        capacityAvailable: detail.capacityAvailable,
        capacity: detail.capacity,
        priceRegular: detail.priceRegular,
        priceDiscount: detail.priceDiscount,
        colorsAvailable: detail.colorsAvailable,
        color: detail.color,
        images: detail.images,
        description: detail.description,
        screen: detail.screen,
        resolution: detail.resolution,
        processor: detail.processor,
        ram: detail.ram,
        camera: detail.camera,
        zoom: detail.zoom,
        cell: detail.cell,
        // product: {
        //   connect: {
        //     itemId: detail.id, // assuming id in ProductDetails is same as itemId in Product
        //   },
        // },
      },
    });
  }

  for (const detail of accessories) {
    await prisma.productDetails.create({
      data: {
        id: detail.id,
        category: detail.category,
        namespaceId: detail.namespaceId,
        name: detail.name,
        capacityAvailable: detail.capacityAvailable,
        capacity: detail.capacity,
        priceRegular: detail.priceRegular,
        priceDiscount: detail.priceDiscount,
        colorsAvailable: detail.colorsAvailable,
        color: detail.color,
        images: detail.images,
        description: detail.description,
        screen: detail.screen,
        resolution: detail.resolution,
        processor: detail.processor,
        ram: detail.ram,
        camera: '', // Add the missing property 'camera'
        zoom: '', // Add the missing property 'zoom'
        cell: detail.cell,
      },
    });
  }
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
