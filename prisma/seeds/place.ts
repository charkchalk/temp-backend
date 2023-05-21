import { Prisma, PrismaClient } from "@prisma/client";

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

const places: Prisma.PlaceCreateInput[] = [
  {
    uuid: "eb565fd2-0e6b-421e-a65a-ddb7b9336456",
    name: "線上",
  },
  {
    uuid: "507b9216-cccb-427c-b3c8-23b62f43ffd0",
    name: "ホロライブ　本社",
  },
  {
    uuid: "ebec1925-4706-4e03-b180-0f9aeb817007",
    name: "VTuber 館",
  },
  {
    uuid: "ab4a934f-c6fa-4198-92b1-266669564d15",
    name: "VTuber 館 103 室",
    parent: {
      connect: {
        uuid: "ebec1925-4706-4e03-b180-0f9aeb817007",
      },
    },
  },
  {
    uuid: "5d241195-25ff-4eb4-b853-1863d9ef708a",
    name: "VTuber 館 105 室",
    parent: {
      connect: {
        uuid: "ebec1925-4706-4e03-b180-0f9aeb817007",
      },
    },
  },
  {
    uuid: "ba04231e-958a-46c6-814a-ea68e2963780",
    name: "VTuber 館 115 視聽教室",
    parent: {
      connect: {
        uuid: "ebec1925-4706-4e03-b180-0f9aeb817007",
      },
    },
  },
  {
    uuid: "458a20f9-5f3f-4ce4-83f8-d21cf1f1791a",
    name: "VTuber 館錄音電腦教室",
    parent: {
      connect: {
        uuid: "ebec1925-4706-4e03-b180-0f9aeb817007",
      },
    },
  },
  {
    uuid: "0593bbf1-2799-46b8-8202-6a0087dfa3a8",
    name: "VTuber 館 ASMR 電腦教室",
    parent: {
      connect: {
        uuid: "ebec1925-4706-4e03-b180-0f9aeb817007",
      },
    },
  },
  {
    uuid: "046165d5-2ee1-4cda-bdf9-746ae36a2f6d",
    name: "VTuber 館 3D 捕捉舞台教室",
    parent: {
      connect: {
        uuid: "ebec1925-4706-4e03-b180-0f9aeb817007",
      },
    },
  },
  {
    uuid: "25ff2976-ed27-4316-b3ad-fb6ab29b448c",
    name: "VTuber 館 320 電腦教室",
    parent: {
      connect: {
        uuid: "ebec1925-4706-4e03-b180-0f9aeb817007",
      },
    },
  },
  {
    uuid: "60b6bb8c-470e-4ab2-96bc-cfb9ad69091f",
    name: "VTuber 館 322 電腦教室",
    parent: {
      connect: {
        uuid: "ebec1925-4706-4e03-b180-0f9aeb817007",
      },
    },
  },
  {
    uuid: "0393bcc0-75d9-40f7-819a-55dcd5f6d08a",
    name: "VTuber 館 324 電腦教室",
    parent: {
      connect: {
        uuid: "ebec1925-4706-4e03-b180-0f9aeb817007",
      },
    },
  },
  {
    uuid: "bef1a81b-cc39-4c02-935c-6ce62af67bec",
    name: "VTuber 館 107 室",
    parent: {
      connect: {
        uuid: "ebec1925-4706-4e03-b180-0f9aeb817007",
      },
    },
  },
  {
    uuid: "fcc9fb55-870a-44bf-8548-e9baf016f5d7",
    name: "VTuber 館 109 室",
    parent: {
      connect: {
        uuid: "ebec1925-4706-4e03-b180-0f9aeb817007",
      },
    },
  },
  {
    uuid: "8f7cd028-33fd-4d68-a998-ef07ed928f70",
    name: "VTuber 館 318 電腦教室",
    parent: {
      connect: {
        uuid: "ebec1925-4706-4e03-b180-0f9aeb817007",
      },
    },
  },
  {
    uuid: "1108ef5b-3a78-499e-8500-d22d9079a405",
    name: "VTuber 館 Maker 空間",
    parent: {
      connect: {
        uuid: "ebec1925-4706-4e03-b180-0f9aeb817007",
      },
    },
  },
];
