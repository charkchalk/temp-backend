import { Prisma, PrismaClient } from "@prisma/client";
import FileSystem from "fs";
import Path from "path";

export default async function main() {
  const prisma = new PrismaClient();
  dateRangeSeeder(prisma)
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async e => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}

export async function dateRangeSeeder(prisma: PrismaClient) {
  console.log(`Start seeding date-range...`);
  await prisma.dateRange.deleteMany();
  for (const dateRange of dateRanges) {
    const createdDateRange = await prisma.dateRange.create({
      data: dateRange,
    });
    console.log(
      `Created date-range with uuid: ${createdDateRange.uuid}`,
      createdDateRange,
    );
  }
  console.log(`Seeding date-range finished.`);
}

const path = Path.resolve(__dirname, "./data/dateRanges.json");
const file = FileSystem.readFileSync(path, "utf8");

const dateRanges = JSON.parse(file) as (Prisma.DateRangeCreateInput & {
  id: number;
})[];
