import { Prisma } from '@prisma/client';

export type ProductType = {
  id: string;
  itemId: string;
  name: string;
  category: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;

  details: ProductDetailsType[];
};

export type ProductDetailsType = {
  id: string;
  namespaceId: string;
  category: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: Prisma.JsonValue;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera?: string;
  zoom?: string;
  cell: string[];
};
