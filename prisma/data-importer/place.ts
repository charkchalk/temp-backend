import { Prisma, PrismaClient } from "@prisma/client";
import FileSystem from "fs";
import Path from "path";

export default async function main() {
  const prisma = new PrismaClient();
  placeSeeder(prisma)
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async e => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}

export async function placeSeeder(prisma: PrismaClient) {
  console.log(`Start seeding place...`);
  await prisma.place.deleteMany();
  for (const place of places) {
    const createdPlace = await prisma.place.create({
      data: place,
    });
    console.log(`Created place with uuid: ${createdPlace.uuid}`, createdPlace);
  }
  console.log(`Seeding place finished.`);
}

const path = Path.resolve(__dirname, "./data/places.json");
const file = FileSystem.readFileSync(path, "utf8");
const places = JSON.parse(file) as (Prisma.PlaceCreateInput & { id: any })[];
