import { PrismaClient } from "../lib/generated/prisma";
import sampleData from "./sample-data";

async function main() {
  try {
    const prisma = new PrismaClient();
    await prisma.product.deleteMany({});
    await prisma.account.deleteMany({});
    await prisma.session.deleteMany({});
    await prisma.verificationToken.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.product.createMany({
      data: sampleData.products,
    });
    await prisma.user.createMany({
      data: sampleData.users,
    });
    console.log("Sample data seeded successfully.");
  } catch (error) {
    console.log("main" + error);
  }
}

main();
