import { Prisma, PrismaClient } from "@prisma/client";

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

const dateRanges: Prisma.DateRangeCreateInput[] = [
  {
    uuid: "e7f08291-9f24-4957-b499-e640b7af9bf1",
    name: "111-2",
    description: "PU 111-2",
    startDate: new Date("2023-02-13"),
    endDate: new Date("2023-06-16"),
  },
  {
    uuid: "1c8c9536-5543-415a-b9c4-850bc535ec05",
    name: "111-1",
    description: "PU 111-1",
    startDate: new Date("2022-09-05"),
    endDate: new Date("2023-01-06"),
  },
];
