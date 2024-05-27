import prisma from '../utils/db';

interface ProductCountByCategory {
  category: string;
  count: number;
}

async function getCountByCategory(): Promise<ProductCountByCategory[]> {
  const result = await prisma.product.groupBy({
    by: ['category'],
    _count: {
      category: true,
    },
  });

  return result.map(item => ({
    category: item.category,
    count: item._count.category,
  }));
}

export { getCountByCategory };
