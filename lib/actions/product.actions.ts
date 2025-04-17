"use server";
import { Product } from "@/types";
// import { prisma } from "@/db/prisma";
import { LATEST_PRODUCTS_LIMIT } from "../constants";

import { PrismaClient } from "../generated/prisma";

import { convertToPlainObject } from "../utils";

export async function getLatestProducts(): Promise<Product[]> {
  const prisma = new PrismaClient();
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: LATEST_PRODUCTS_LIMIT,
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      rating: true,
      numReviews: true,
      category: true,
      brand: true,
      stock: true,
      images: true,
      slug: true,
      isFeatured: true,
      banner: true,
      createdAt: true,
    },
  });

  const formattedProducts = products.map((product) => ({
    ...product,
    rating: product.rating.toString(),
    price: product.price.toString(),
  }));

  return convertToPlainObject(formattedProducts) as Product[];
}

export async function getProductBySlug(slug: string) {
  const prisma = new PrismaClient();
  const product = await prisma.product.findFirst({
    where: {
      slug,
    },
  });
  return convertToPlainObject(product);
}
