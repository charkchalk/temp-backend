import { PrismaClient } from "@prisma/client";

import { dateRangeSeeder } from "./date-range";
import { organizationSeeder } from "./organization";
import { personSeeder } from "./person";
import { placeSeeder } from "./place";
import { tagSeeder } from "./tag";
import { timeRangeSeeder } from "./time-range";
import { courseSeeder } from "./z-course";

export default async function main() {
  const prisma = new PrismaClient();

  try {
    await dateRangeSeeder(prisma);
    await organizationSeeder(prisma);
    await personSeeder(prisma);
    await placeSeeder(prisma);
    await tagSeeder(prisma);
    await timeRangeSeeder(prisma);
    await courseSeeder(prisma);
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }

  await prisma.$disconnect();
}
