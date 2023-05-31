import { Prisma, PrismaClient } from "@prisma/client";
import FileSystem from "fs";
import Path from "path";

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

const path = Path.resolve(__dirname, "./data/tags.json");
const file = FileSystem.readFileSync(path, "utf8");

const tags = JSON.parse(file) as (Prisma.TagCreateInput & { id: any })[];
