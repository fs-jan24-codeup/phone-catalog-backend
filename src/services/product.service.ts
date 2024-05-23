import { Product, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAll = async (): Promise<Product[]> => {
  const result = await prisma.product.findMany();
  return result;
};

export const normalize = (product: Partial<Product>): Partial<Product> => {
  const { id, name, category } = product;
  return { id, name, category };
};

export async function getOne(id: number): Promise<Product | null> {
  return prisma.product.findUnique({
    where: { id: id.toString() },
  });
}

export async function getRecommended(id: number): Promise<Product[]> {
  const product = await getOne(id);

  if (!product) {
    return [];
  }

  return prisma.product.findMany({
    where: {
      category: product.category,
      id: { not: product.id },
    },
  });
}

//export async function createOne(data: Omit<Product, 'id'>): Promise<Product> {
//  const newProduct = await prisma.product.create({
//    data: data,
//  });
//  return newProduct;
//}

// }
// const newProduct = await prisma.product.create({
//   data: {
//     itemId: "apple-iphone-11-128gb-black",
//     name: "Apple iPhone 11 128GB Black",
//     category: "phones",
//     fullPrice: 1100,
//     price: 1050,
//     image: "img/phones/apple-iphone-11/black/00.webp",
//     details: {
//       create: {
//         namespaceId: "apple-iphone-11",
//         capacity: "128GB",
//         priceRegular: 1100,
//         priceDiscount: 1050,
//         color: "black",
//         images: ["img/phones/apple-iphone-11/black/00.webp",
//                  "img/phones/apple-iphone-11/black/01.webp"],
//         description: JSON.stringify([
//           {
//             title: "And then there was Pro",
//             text: ["A transformative triple-camera system..."]
//           }
//         ]),
//         screen: "6.1' IPS",
//         resolution: "1792x828",
//         processor: "Apple A13 Bionic",
//         ram: "4GB",
//         camera: "12 Mp + 12 Mp + 12MP",
//         zoom: "Digital, 5x",
//         cell: ["GPRS", "EDGE", "UMTS", "LTE"]
//       }
//     }
//   }
// });

//export async function updateOne(
//  id: number,
//  updateData: Partial<Product>,
//): Promise<Product | null> {
//  await prisma.product.update({
//    where: { id },
//    data: updateData,
//  });
//  return getOne(id);
//}

//export async function deleteOne(id: number): Promise<boolean> {
//  await prisma.product.delete({
//    where: { id },
//  });
//  return true;
//}
