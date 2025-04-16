import { PrismaClient } from "../lib/generated/prisma";
import sampleData from "./sample-data";

async function main() {
  try {
    const prisma = new PrismaClient();
    await prisma.product.deleteMany({});
    await prisma.product.createMany({
      data: sampleData.products,
    });
    console.log("Sample data seeded successfully.");
  } catch (error) {
    console.log("main" + error);
  }
}

main();
