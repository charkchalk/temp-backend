import { Prisma, PrismaClient } from "@prisma/client";
import FileSystem from "fs";
import Path from "path";

export default async function main() {
  const prisma = new PrismaClient();
  timeRangeSeeder(prisma)
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async e => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}

export async function timeRangeSeeder(prisma: PrismaClient) {
  console.log(`Start seeding time-range...`);
  await prisma.timeRange.deleteMany();
  for (const timeRange of timeRanges) {
    timeRange.startTime = `2023-01-01T${timeRange.startTime as string}:00.000Z`;
    timeRange.endTime = `2023-01-01T${timeRange.endTime as string}:00.000Z`;

    console.log(`Created time-range with id: ${timeRange.id}`, timeRange);
    const createdTimeRange = await prisma.timeRange.create({
      data: timeRange,
    });
  }
  console.log(`Seeding time-range finished.`);
}

const path = Path.join(__dirname, "./data/timeRanges.json");
const file = FileSystem.readFileSync(path, "utf-8");
const timeRanges = JSON.parse(file) as (Prisma.TimeRangeCreateInput & {
  id: number;
})[];
