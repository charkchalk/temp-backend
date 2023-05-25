import { Prisma, PrismaClient } from "@prisma/client";
import FileSystem from "fs";
import Path from "path";

export default async function main() {
  const prisma = new PrismaClient();
  organizationSeeder(prisma)
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async e => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}

export async function organizationSeeder(prisma: PrismaClient) {
  console.log(`Start seeding organization...`);
  await prisma.organization.deleteMany();
  for (const organization of organizations) {
    const createdOrganization = await prisma.organization.create({
      data: organization,
    });
    console.log(
      `Created organization with uuid: ${createdOrganization.uuid}`,
      createdOrganization,
    );
  }
  console.log(`Seeding organization finished.`);
}

const path = Path.resolve(__dirname, "./data/organizations.json");
const file = FileSystem.readFileSync(path, "utf8");

const organizations = JSON.parse(file) as (Prisma.OrganizationCreateInput & {
  id: any;
})[];
