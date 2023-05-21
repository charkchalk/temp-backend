import { Prisma, PrismaClient } from "@prisma/client";

export default async function main() {
  const prisma = new PrismaClient();
  tagSeeder(prisma)
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async e => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}

export async function tagSeeder(prisma: PrismaClient) {
  console.log(`Start seeding tag...`);
  await prisma.tag.deleteMany();
  for (const tag of tags) {
    const createdTag = await prisma.tag.create({
      data: tag,
    });
    console.log(`Created tag with uuid: ${createdTag.uuid}`, createdTag);
  }
  console.log(`Seeding tag finished.`);
}

const tags: Prisma.TagCreateInput[] = [
  {
    uuid: "151d3a4e-ab0f-4d42-ab92-5701fecccd1f",
    name: "必修",
  },
  {
    uuid: "e12f2335-5b59-4ac5-ba09-f830024fdbcc",
    name: "選修",
  },
  {
    uuid: "def3f68e-b945-43b6-b615-193a8300bb4b",
    name: "實習",
  },
];
