import { Prisma, PrismaClient } from "@prisma/client";
import FileSystem from "fs";
import Path from "path";

export default async function main() {
  const prisma = new PrismaClient();
  personSeeder(prisma)
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async e => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}

export async function personSeeder(prisma: PrismaClient) {
  console.log(`Start seeding person...`);
  await prisma.person.deleteMany();
  for (const person of people) {
    const createdPerson = await prisma.person.create({
      data: person,
    });
    console.log(
      `Created person with uuid: ${createdPerson.uuid}`,
      createdPerson,
    );
  }
  console.log(`Seeding person finished.`);
}

const path = Path.resolve(__dirname, "./data/persons.json");
const file = FileSystem.readFileSync(path, "utf8");

const people = JSON.parse(file) as (Prisma.PersonCreateInput & {
  id: number;
})[];
