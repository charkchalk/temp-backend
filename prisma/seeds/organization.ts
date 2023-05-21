import { Prisma, PrismaClient } from "@prisma/client";

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

const organizations: Prisma.OrganizationCreateInput[] = [
  {
    uuid: "c922d7cb-a28a-4e65-b981-e3bfb909bc60",
    name: "VTuber 系",
  },
  {
    uuid: "b50e89d6-e984-4b90-9456-c0d1ae855e55",
    name: "VTuber 系一年級",
    parent: {
      connect: {
        uuid: "c922d7cb-a28a-4e65-b981-e3bfb909bc60",
      },
    },
  },
  {
    uuid: "34de979d-3349-4125-a3d0-09ec53582efa",
    name: "VTuber 系一年級Ａ班",
    parent: {
      connect: {
        uuid: "b50e89d6-e984-4b90-9456-c0d1ae855e55",
      },
    },
  },
  {
    uuid: "9c8e6819-a609-4030-9794-bb9e78cc3c34",
    name: "VTuber 系一年級Ｂ班",
    parent: {
      connect: {
        uuid: "b50e89d6-e984-4b90-9456-c0d1ae855e55",
      },
    },
  },
  {
    uuid: "4416141a-5301-4f33-ba28-830ba0aebc79",
    name: "VTuber 系二年級",
    parent: {
      connect: {
        uuid: "c922d7cb-a28a-4e65-b981-e3bfb909bc60",
      },
    },
  },
  {
    uuid: "e3aa29de-eb1d-479e-acd5-cb092db3353b",
    name: "VTuber 系二年級Ａ班",
    parent: {
      connect: {
        uuid: "4416141a-5301-4f33-ba28-830ba0aebc79",
      },
    },
  },
  {
    uuid: "8f76250d-2a3e-4387-a1e5-a9ff845bdf1a",
    name: "VTuber 系二年級Ｂ班",
    parent: {
      connect: {
        uuid: "4416141a-5301-4f33-ba28-830ba0aebc79",
      },
    },
  },
  {
    uuid: "ac78dd74-a0d0-4d17-9aca-bf9dea9492c5",
    name: "VTuber 系三年級",
    parent: {
      connect: {
        uuid: "c922d7cb-a28a-4e65-b981-e3bfb909bc60",
      },
    },
  },
  {
    uuid: "2c99eeea-acd7-4ae5-a476-db2b76a91a83",
    name: "VTuber 系三年級Ａ班",
    parent: {
      connect: {
        uuid: "ac78dd74-a0d0-4d17-9aca-bf9dea9492c5",
      },
    },
  },
  {
    uuid: "aca714aa-ae63-4c9a-b3eb-8ff53cc2f888",
    name: "VTuber 系三年級Ｂ班",
    parent: {
      connect: {
        uuid: "ac78dd74-a0d0-4d17-9aca-bf9dea9492c5",
      },
    },
  },
  {
    uuid: "0014576f-e5cd-40e2-98dc-8b919a9abf3c",
    name: "VTuber 系四年級",
    parent: {
      connect: {
        uuid: "c922d7cb-a28a-4e65-b981-e3bfb909bc60",
      },
    },
  },
  {
    uuid: "fd811ccf-b134-4a0a-9fc3-f753d3b5ba4e",
    name: "VTuber 系四年級Ａ班",
    parent: {
      connect: {
        uuid: "0014576f-e5cd-40e2-98dc-8b919a9abf3c",
      },
    },
  },
  {
    uuid: "0631c845-54de-428e-a3c3-269f0bed4034",
    name: "VTuber 系四年級Ｂ班",
    parent: {
      connect: {
        uuid: "0014576f-e5cd-40e2-98dc-8b919a9abf3c",
      },
    },
  },
];
