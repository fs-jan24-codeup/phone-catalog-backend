import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import products from '../src/data/api/products.json';

async function main() {
  await prisma.$queryRawUnsafe(`Truncate "Product" restart identity cascade;`);
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
