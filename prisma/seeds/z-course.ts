import { Prisma, PrismaClient } from "@prisma/client";

export default async function main() {
  const prisma = new PrismaClient();
  courseSeeder(prisma)
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async e => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}

export async function courseSeeder(prisma: PrismaClient) {
  console.log(`Start seeding course...`);
  await prisma.course.deleteMany();

  for (const course of courses) {
    const createdCourse = await prisma.course.create({
      data: course,
    });
    console.log(
      `Created course with uuid: ${createdCourse.uuid}`,
      createdCourse,
    );
  }
  console.log(`Seeding course finished.`);
}

const courses: Prisma.CourseCreateInput[] = [
  {
    uuid: "92c7ce35-862d-4bdc-9180-33e9291e33f5",
    code: "3708",
    name: "VTuber 概論(一)",
    description: "一上必修",
    link: "https://zh.wikipedia.org/zh-tw/VTuber",
    credit: 2,
    organization: {
      connect: {
        uuid: "34de979d-3349-4125-a3d0-09ec53582efa",
      },
    },
    dateRange: {
      connect: {
        uuid: "1c8c9536-5543-415a-b9c4-850bc535ec05",
      },
    },
    hosts: {
      connect: [
        {
          uuid: "619b66ba-30f0-46e4-89a4-221b69ba7011",
        },
      ],
    },
    places: {
      connect: [
        {
          uuid: "ba04231e-958a-46c6-814a-ea68e2963780",
        },
      ],
    },
    tags: {
      connect: [
        {
          uuid: "151d3a4e-ab0f-4d42-ab92-5701fecccd1f",
        },
      ],
    },
    timeRanges: {
      connect: [
        {
          id: 82,
        },
        {
          id: 83,
        },
      ],
    },
  },
  {
    uuid: "7be1ca4b-5555-40f0-8c58-b3cd89607062",
    code: "",
    name: "VTuber 概論(一)（實習）",
    description: "一上必修",
    link: "",
    credit: 0,
    organization: {
      connect: {
        uuid: "34de979d-3349-4125-a3d0-09ec53582efa",
      },
    },
    dateRange: {
      connect: {
        uuid: "1c8c9536-5543-415a-b9c4-850bc535ec05",
      },
    },
    hosts: {
      connect: [
        {
          uuid: "c02bee04-7ef5-4221-ab43-24b857ca1fd2",
        },
      ],
    },
    places: {
      connect: [
        {
          uuid: "ba04231e-958a-46c6-814a-ea68e2963780",
        },
      ],
    },
    tags: {
      connect: [
        {
          uuid: "151d3a4e-ab0f-4d42-ab92-5701fecccd1f",
        },
        {
          uuid: "def3f68e-b945-43b6-b615-193a8300bb4b",
        },
      ],
    },
    timeRanges: {
      connect: [
        {
          id: 84,
        },
      ],
    },
  },
  {
    uuid: "6f59f18a-715d-4cfc-aec1-15b8d165a363",
    code: "8529",
    name: "基礎電腦概論(一)",
    description: "一上必修",
    link: "",
    credit: 2,
    organization: {
      connect: {
        uuid: "34de979d-3349-4125-a3d0-09ec53582efa",
      },
    },
    dateRange: {
      connect: {
        uuid: "1c8c9536-5543-415a-b9c4-850bc535ec05",
      },
    },
    hosts: {
      connect: [
        {
          uuid: "d5f32368-f005-4ba7-8577-9445d916f6ae",
        },
      ],
    },
    places: {
      connect: [
        {
          uuid: "60b6bb8c-470e-4ab2-96bc-cfb9ad69091f",
        },
      ],
    },
    tags: {
      connect: [
        {
          uuid: "151d3a4e-ab0f-4d42-ab92-5701fecccd1f",
        },
      ],
    },
    timeRanges: {
      connect: [
        {
          id: 11,
        },
        {
          id: 12,
        },
      ],
    },
  },
  {
    uuid: "5eb36c73-03c8-4ad7-8180-6a2ca8d382d4",
    code: "9789",
    name: "流行文化與創意",
    description: "一上選修",
    link: "",
    credit: 3,
    organization: {
      connect: {
        uuid: "34de979d-3349-4125-a3d0-09ec53582efa",
      },
    },
    dateRange: {
      connect: {
        uuid: "1c8c9536-5543-415a-b9c4-850bc535ec05",
      },
    },
    hosts: {
      connect: [
        {
          uuid: "9dea7f7d-776b-44dc-afdc-2e892ee3b111",
        },
      ],
    },
    places: {
      connect: [
        {
          uuid: "ab4a934f-c6fa-4198-92b1-266669564d15",
        },
      ],
    },
    tags: {
      connect: [
        {
          uuid: "e12f2335-5b59-4ac5-ba09-f830024fdbcc",
        },
      ],
    },
    timeRanges: {
      connect: [
        {
          id: 106,
        },
        {
          id: 107,
        },
        {
          id: 108,
        },
      ],
    },
  },
  {
    uuid: "5ec435e6-b82c-4b9b-94e3-3c74351d61f4",
    code: "8972",
    name: "VTuber 概論(二)",
    description: "一下必修",
    link: "https://zh.wikipedia.org/zh-tw/VTuber",
    credit: 2,
    organization: {
      connect: {
        uuid: "34de979d-3349-4125-a3d0-09ec53582efa",
      },
    },
    dateRange: {
      connect: {
        uuid: "e7f08291-9f24-4957-b499-e640b7af9bf1",
      },
    },
    hosts: {
      connect: [
        {
          uuid: "619b66ba-30f0-46e4-89a4-221b69ba7011",
        },
      ],
    },
    places: {
      connect: [
        {
          uuid: "ba04231e-958a-46c6-814a-ea68e2963780",
        },
      ],
    },
    tags: {
      connect: [
        {
          uuid: "151d3a4e-ab0f-4d42-ab92-5701fecccd1f",
        },
      ],
    },
    timeRanges: {
      connect: [
        {
          id: 82,
        },
        {
          id: 83,
        },
      ],
    },
  },
  {
    uuid: "8d6e857e-c99a-4341-974c-1f4af5c54c5e",
    code: "",
    name: "VTuber 概論(二)（實習）",
    description: "一下必修",
    link: "",
    credit: 0,
    organization: {
      connect: {
        uuid: "34de979d-3349-4125-a3d0-09ec53582efa",
      },
    },
    dateRange: {
      connect: {
        uuid: "e7f08291-9f24-4957-b499-e640b7af9bf1",
      },
    },
    hosts: {
      connect: [
        {
          uuid: "c02bee04-7ef5-4221-ab43-24b857ca1fd2",
        },
      ],
    },
    places: {
      connect: [
        {
          uuid: "ba04231e-958a-46c6-814a-ea68e2963780",
        },
      ],
    },
    tags: {
      connect: [
        {
          uuid: "151d3a4e-ab0f-4d42-ab92-5701fecccd1f",
        },
        {
          uuid: "def3f68e-b945-43b6-b615-193a8300bb4b",
        },
      ],
    },
    timeRanges: {
      connect: [
        {
          id: 84,
        },
      ],
    },
  },
  {
    uuid: "8098d020-e2bf-433e-a131-a80d9d91151d",
    code: "3180",
    name: "基礎電腦概論(二)",
    description: "一下必修",
    link: "",
    credit: 2,
    organization: {
      connect: {
        uuid: "34de979d-3349-4125-a3d0-09ec53582efa",
      },
    },
    dateRange: {
      connect: {
        uuid: "e7f08291-9f24-4957-b499-e640b7af9bf1",
      },
    },
    hosts: {
      connect: [
        {
          uuid: "d5f32368-f005-4ba7-8577-9445d916f6ae",
        },
      ],
    },
    places: {
      connect: [
        {
          uuid: "60b6bb8c-470e-4ab2-96bc-cfb9ad69091f",
        },
      ],
    },
    tags: {
      connect: [
        {
          uuid: "151d3a4e-ab0f-4d42-ab92-5701fecccd1f",
        },
      ],
    },
    timeRanges: {
      connect: [
        {
          id: 11,
        },
        {
          id: 12,
        },
      ],
    },
  },
  {
    uuid: "a7908fa5-53af-47ca-9d07-2334a2f88531",
    code: "6722",
    name: "溝通藝術",
    description: "一下選修",
    link: "",
    credit: 2,
    organization: {
      connect: {
        uuid: "34de979d-3349-4125-a3d0-09ec53582efa",
      },
    },
    dateRange: {
      connect: {
        uuid: "e7f08291-9f24-4957-b499-e640b7af9bf1",
      },
    },
    hosts: {
      connect: [
        {
          uuid: "a97fa252-8d22-4486-b752-564eb2bf83a5",
        },
      ],
    },
    places: {
      connect: [
        {
          uuid: "5d241195-25ff-4eb4-b853-1863d9ef708a",
        },
      ],
    },
    tags: {
      connect: [
        {
          uuid: "e12f2335-5b59-4ac5-ba09-f830024fdbcc",
        },
      ],
    },
    timeRanges: {
      connect: [
        {
          id: 9,
        },
        {
          id: 10,
        },
      ],
    },
  },
  {
    uuid: "9402484f-0642-404b-95a1-2d13ea37909d",
    code: "7725",
    name: "基礎攝影",
    description: "一下選修",
    link: "",
    credit: 2,
    organization: {
      connect: {
        uuid: "34de979d-3349-4125-a3d0-09ec53582efa",
      },
    },
    dateRange: {
      connect: {
        uuid: "e7f08291-9f24-4957-b499-e640b7af9bf1",
      },
    },
    hosts: {
      connect: [
        {
          uuid: "f09d7b59-fd3e-4253-99d7-2b5775171907",
        },
      ],
    },
    places: {
      connect: [
        {
          uuid: "046165d5-2ee1-4cda-bdf9-746ae36a2f6d",
        },
      ],
    },
    tags: {
      connect: [
        {
          uuid: "e12f2335-5b59-4ac5-ba09-f830024fdbcc",
        },
      ],
    },
    timeRanges: {
      connect: [
        {
          id: 86,
        },
        {
          id: 87,
        },
      ],
    },
  },
  {
    uuid: "1c2f557c-9229-460d-bc1b-4f913d9e7f6e",
    code: "2423",
    name: "雜談概論",
    description: "二上必修",
    link: "",
    credit: 2,
    organization: {
      connect: {
        uuid: "e3aa29de-eb1d-479e-acd5-cb092db3353b",
      },
    },
    dateRange: {
      connect: {
        uuid: "1c8c9536-5543-415a-b9c4-850bc535ec05",
      },
    },
    hosts: {
      connect: [
        {
          uuid: "566b1afc-6504-4168-9e49-22ac2d44bf41",
        },
      ],
    },
    places: {
      connect: [
        {
          uuid: "bef1a81b-cc39-4c02-935c-6ce62af67bec",
        },
      ],
    },
    tags: {
      connect: [
        {
          uuid: "151d3a4e-ab0f-4d42-ab92-5701fecccd1f",
        },
      ],
    },
    timeRanges: {
      connect: [
        {
          id: 38,
        },
        {
          id: 39,
        },
      ],
    },
  },
  {
    uuid: "dc554427-46eb-43fe-a903-ee2a8053dfb7",
    code: "",
    name: "雜談概論（實習）",
    description: "二上必修",
    link: "",
    credit: 0,
    organization: {
      connect: {
        uuid: "e3aa29de-eb1d-479e-acd5-cb092db3353b",
      },
    },
    dateRange: {
      connect: {
        uuid: "1c8c9536-5543-415a-b9c4-850bc535ec05",
      },
    },
    hosts: {
      connect: [
        {
          uuid: "5ce9cca1-7c28-4521-a918-17796a629cd7",
        },
      ],
    },
    places: {
      connect: [
        {
          uuid: "bef1a81b-cc39-4c02-935c-6ce62af67bec",
        },
      ],
    },
    tags: {
      connect: [
        {
          uuid: "151d3a4e-ab0f-4d42-ab92-5701fecccd1f",
        },
        {
          uuid: "def3f68e-b945-43b6-b615-193a8300bb4b",
        },
      ],
    },
    timeRanges: {
      connect: [
        {
          id: 40,
        },
      ],
    },
  },
  {
    uuid: "c83af154-4294-4ce2-b618-3839e8c338ab",
    code: "5106",
    name: "3D 電腦動畫",
    description: "二上選修",
    link: "",
    credit: 3,
    organization: {
      connect: {
        uuid: "e3aa29de-eb1d-479e-acd5-cb092db3353b",
      },
    },
    dateRange: {
      connect: {
        uuid: "1c8c9536-5543-415a-b9c4-850bc535ec05",
      },
    },
    hosts: {
      connect: [
        {
          uuid: "d84b4ff0-b310-4206-9044-93d6213b5398",
        },
      ],
    },
    places: {
      connect: [
        {
          uuid: "046165d5-2ee1-4cda-bdf9-746ae36a2f6d",
        },
      ],
    },
    tags: {
      connect: [
        {
          uuid: "e12f2335-5b59-4ac5-ba09-f830024fdbcc",
        },
      ],
    },
    timeRanges: {
      connect: [
        {
          id: 14,
        },
        {
          id: 15,
        },
        {
          id: 16,
        },
      ],
    },
  },
  {
    uuid: "7432ec9f-96d7-467e-970d-6cd878c96e72",
    code: "4662",
    name: "音樂初階實作",
    description: "二上選修",
    link: "",
    credit: 3,
    organization: {
      connect: {
        uuid: "e3aa29de-eb1d-479e-acd5-cb092db3353b",
      },
    },
    dateRange: {
      connect: {
        uuid: "1c8c9536-5543-415a-b9c4-850bc535ec05",
      },
    },
    hosts: {
      connect: [
        {
          uuid: "215daa53-4ab6-46ed-bee6-6dce4dbd372a",
        },
      ],
    },
    places: {
      connect: [
        {
          uuid: "458a20f9-5f3f-4ce4-83f8-d21cf1f1791a",
        },
      ],
    },
    tags: {
      connect: [
        {
          uuid: "e12f2335-5b59-4ac5-ba09-f830024fdbcc",
        },
      ],
    },
    timeRanges: {
      connect: [
        {
          id: 64,
        },
        {
          id: 65,
        },
        {
          id: 66,
        },
      ],
    },
  },
  {
    uuid: "1fbb6d1e-61da-4e0c-916c-210f21b85d70",
    code: "8645",
    name: "live2d 製作與實務",
    description: "二上選修",
    link: "",
    credit: 3,
    organization: {
      connect: {
        uuid: "e3aa29de-eb1d-479e-acd5-cb092db3353b",
      },
    },
    dateRange: {
      connect: {
        uuid: "1c8c9536-5543-415a-b9c4-850bc535ec05",
      },
    },
    hosts: {
      connect: [
        {
          uuid: "6689bc50-4aa5-43f4-863c-3aa4fc3f7849",
        },
      ],
    },
    places: {
      connect: [
        {
          uuid: "0593bbf1-2799-46b8-8202-6a0087dfa3a8",
        },
      ],
    },
    tags: {
      connect: [
        {
          uuid: "e12f2335-5b59-4ac5-ba09-f830024fdbcc",
        },
      ],
    },
    timeRanges: {
      connect: [
        {
          id: 14,
        },
        {
          id: 15,
        },
        {
          id: 16,
        },
      ],
    },
  },
  {
    uuid: "56e10e2c-dd15-4476-ac94-2782956e4ab2",
    code: "4519",
    name: "歌唱概論",
    description: "二下選修",
    link: "",
    credit: 3,
    organization: {
      connect: {
        uuid: "e3aa29de-eb1d-479e-acd5-cb092db3353b",
      },
    },
    dateRange: {
      connect: {
        uuid: "e7f08291-9f24-4957-b499-e640b7af9bf1",
      },
    },
    hosts: {
      connect: [
        {
          uuid: "b99e08dc-a6ae-49df-8496-7baa51cda0f6",
        },
        {
          uuid: "6689bc50-4aa5-43f4-863c-3aa4fc3f7849",
        },
      ],
    },
    places: {
      connect: [
        {
          uuid: "ba04231e-958a-46c6-814a-ea68e2963780",
        },
      ],
    },
    tags: {
      connect: [
        {
          uuid: "e12f2335-5b59-4ac5-ba09-f830024fdbcc",
        },
      ],
    },
    timeRanges: {
      connect: [
        {
          id: 64,
        },
        {
          id: 65,
        },
        {
          id: 66,
        },
      ],
    },
  },
  {
    uuid: "2d02dcfc-c520-4213-bf5a-e258d57408c8",
    code: "5881",
    name: "ASMR 實務",
    description: "二下選修",
    link: "https://youtu.be/Xf5NVgE-fpg",
    credit: 3,
    organization: {
      connect: {
        uuid: "aca714aa-ae63-4c9a-b3eb-8ff53cc2f888",
      },
    },
    dateRange: {
      connect: {
        uuid: "e7f08291-9f24-4957-b499-e640b7af9bf1",
      },
    },
    hosts: {
      connect: [
        {
          uuid: "e957031f-cdc8-4fad-ba2a-3f137954f4e6",
        },
        {
          uuid: "65f06a50-7dd4-4df4-a139-9a9c71fc30aa",
        },
      ],
    },
    places: {
      connect: [
        {
          uuid: "0593bbf1-2799-46b8-8202-6a0087dfa3a8",
        },
      ],
    },
    tags: {
      connect: [
        {
          uuid: "e12f2335-5b59-4ac5-ba09-f830024fdbcc",
        },
      ],
    },
    timeRanges: {
      connect: [
        {
          id: 38,
        },
        {
          id: 39,
        },
        {
          id: 40,
        },
      ],
    },
  },
  {
    uuid: "30e252de-c179-40f5-8a22-80de16c48fcf",
    code: "ASD5254GHEJK",
    name: "視覺傳達",
    description: "二下選修",
    link: "",
    credit: 3,
    organization: {
      connect: {
        uuid: "aca714aa-ae63-4c9a-b3eb-8ff53cc2f888",
      },
    },
    dateRange: {
      connect: {
        uuid: "e7f08291-9f24-4957-b499-e640b7af9bf1",
      },
    },
    hosts: {
      connect: [
        {
          uuid: "461ba7e7-53aa-48e0-a9f5-ec9dfef7bab7",
        },
      ],
    },
    places: {
      connect: [
        {
          uuid: "0393bcc0-75d9-40f7-819a-55dcd5f6d08a",
        },
      ],
    },
    tags: {
      connect: [
        {
          uuid: "e12f2335-5b59-4ac5-ba09-f830024fdbcc",
        },
      ],
    },
    timeRanges: {
      connect: [
        {
          id: 110,
        },
        {
          id: 111,
        },
        {
          id: 112,
        },
      ],
    },
  },
  {
    uuid: "58c15ef8-39fa-4d4f-b15a-6fdcf31eb9bd",
    code: "8394",
    name: "3D 模型製作與捕捉實務",
    description: "二下選修",
    link: "",
    credit: 3,
    organization: {
      connect: {
        uuid: "aca714aa-ae63-4c9a-b3eb-8ff53cc2f888",
      },
    },
    dateRange: {
      connect: {
        uuid: "e7f08291-9f24-4957-b499-e640b7af9bf1",
      },
    },
    hosts: {
      connect: [
        {
          uuid: "d84b4ff0-b310-4206-9044-93d6213b5398",
        },
      ],
    },
    places: {
      connect: [
        {
          uuid: "046165d5-2ee1-4cda-bdf9-746ae36a2f6d",
        },
      ],
    },
    tags: {
      connect: [
        {
          uuid: "e12f2335-5b59-4ac5-ba09-f830024fdbcc",
        },
      ],
    },
    timeRanges: {
      connect: [
        {
          id: 14,
        },
        {
          id: 15,
        },
        {
          id: 16,
        },
      ],
    },
  },
  {
    uuid: "390c0685-0742-4e50-b33e-29285e5d1096",
    code: "2937",
    name: "節目企劃與製作",
    description: "三上選修",
    link: "",
    credit: 3,
    organization: {
      connect: {
        uuid: "2c99eeea-acd7-4ae5-a476-db2b76a91a83",
      },
    },
    dateRange: {
      connect: {
        uuid: "1c8c9536-5543-415a-b9c4-850bc535ec05",
      },
    },
    hosts: {
      connect: [
        {
          uuid: "619b66ba-30f0-46e4-89a4-221b69ba7011",
        },
      ],
    },
    places: {
      connect: [
        {
          uuid: "25ff2976-ed27-4316-b3ad-fb6ab29b448c",
        },
      ],
    },
    tags: {
      connect: [
        {
          uuid: "e12f2335-5b59-4ac5-ba09-f830024fdbcc",
        },
      ],
    },
    timeRanges: {
      connect: [
        {
          id: 86,
        },
        {
          id: 87,
        },
        {
          id: 88,
        },
      ],
    },
  },
  {
    uuid: "75c613da-8fde-4f33-a1ec-9f8c6536a736",
    code: "1801",
    name: "公共關係",
    description: "三上選修",
    link: "",
    credit: 2,
    organization: {
      connect: {
        uuid: "2c99eeea-acd7-4ae5-a476-db2b76a91a83",
      },
    },
    dateRange: {
      connect: {
        uuid: "1c8c9536-5543-415a-b9c4-850bc535ec05",
      },
    },
    hosts: {
      connect: [
        {
          uuid: "9e533a83-4cb4-41b8-9cc0-961cc55cf004",
        },
      ],
    },
    places: {
      connect: [
        {
          uuid: "fcc9fb55-870a-44bf-8548-e9baf016f5d7",
        },
      ],
    },
    tags: {
      connect: [
        {
          uuid: "e12f2335-5b59-4ac5-ba09-f830024fdbcc",
        },
      ],
    },
    timeRanges: {
      connect: [
        {
          id: 9,
        },
        {
          id: 10,
        },
      ],
    },
  },
  {
    uuid: "b1f0a29e-e625-466f-9ad4-4871c0eedc18",
    code: "5571",
    name: "配樂與影像氛圍",
    description: "三上選修",
    link: "",
    credit: 3,
    organization: {
      connect: {
        uuid: "2c99eeea-acd7-4ae5-a476-db2b76a91a83",
      },
    },
    dateRange: {
      connect: {
        uuid: "1c8c9536-5543-415a-b9c4-850bc535ec05",
      },
    },
    hosts: {
      connect: [
        {
          uuid: "4966eac6-b929-4a51-b992-3c57abe4a565",
        },
      ],
    },
    places: {
      connect: [
        {
          uuid: "458a20f9-5f3f-4ce4-83f8-d21cf1f1791a",
        },
      ],
    },
    tags: {
      connect: [
        {
          uuid: "e12f2335-5b59-4ac5-ba09-f830024fdbcc",
        },
      ],
    },
    timeRanges: {
      connect: [
        {
          id: 34,
        },
        {
          id: 35,
        },
        {
          id: 36,
        },
      ],
    },
  },
  {
    uuid: "24b20a22-0498-44e1-ab8e-f40868792adb",
    code: "8648",
    name: "表演學",
    description: "三上選修",
    link: "",
    credit: 3,
    organization: {
      connect: {
        uuid: "2c99eeea-acd7-4ae5-a476-db2b76a91a83",
      },
    },
    dateRange: {
      connect: {
        uuid: "1c8c9536-5543-415a-b9c4-850bc535ec05",
      },
    },
    hosts: {
      connect: [
        {
          uuid: "d04dd8dd-7741-4be7-bdb1-83cedb5cefbe",
        },
        {
          uuid: "097648ba-6a56-44e3-a1f0-c240a26408bd",
        },
      ],
    },
    places: {
      connect: [
        {
          uuid: "046165d5-2ee1-4cda-bdf9-746ae36a2f6d",
        },
      ],
    },
    tags: {
      connect: [
        {
          uuid: "e12f2335-5b59-4ac5-ba09-f830024fdbcc",
        },
      ],
    },
    timeRanges: {
      connect: [
        {
          id: 58,
        },
        {
          id: 59,
        },
        {
          id: 60,
        },
      ],
    },
  },
  {
    uuid: "f597cdf0-3e40-401e-accd-ef73a928ad3b",
    code: "8102",
    name: "畢業專題(一)",
    description: "三下必修",
    link: "",
    credit: 2,
    organization: {
      connect: {
        uuid: "2c99eeea-acd7-4ae5-a476-db2b76a91a83",
      },
    },
    dateRange: {
      connect: {
        uuid: "e7f08291-9f24-4957-b499-e640b7af9bf1",
      },
    },
    hosts: {
      connect: [],
    },
    places: {
      connect: [],
    },
    tags: {
      connect: [
        {
          uuid: "151d3a4e-ab0f-4d42-ab92-5701fecccd1f",
        },
      ],
    },
    timeRanges: {
      connect: [
        {
          id: 88,
        },
        {
          id: 89,
        },
      ],
    },
  },
  {
    uuid: "63807970-b54f-466b-aaa1-805f0831631a",
    code: "6267",
    name: "數位媒體行銷與經營",
    description: "三下選修",
    link: "",
    credit: 3,
    organization: {
      connect: {
        uuid: "2c99eeea-acd7-4ae5-a476-db2b76a91a83",
      },
    },
    dateRange: {
      connect: {
        uuid: "e7f08291-9f24-4957-b499-e640b7af9bf1",
      },
    },
    hosts: {
      connect: [
        {
          uuid: "097648ba-6a56-44e3-a1f0-c240a26408bd",
        },
      ],
    },
    places: {
      connect: [
        {
          uuid: "8f7cd028-33fd-4d68-a998-ef07ed928f70",
        },
      ],
    },
    tags: {
      connect: [
        {
          uuid: "e12f2335-5b59-4ac5-ba09-f830024fdbcc",
        },
      ],
    },
    timeRanges: {
      connect: [
        {
          id: 58,
        },
        {
          id: 59,
        },
        {
          id: 60,
        },
      ],
    },
  },
  {
    uuid: "61a55593-a0bc-4f68-b298-53a8c17337d7",
    code: "0718",
    name: "直播室製作實務",
    description: "三下選修",
    link: "",
    credit: 2,
    organization: {
      connect: {
        uuid: "2c99eeea-acd7-4ae5-a476-db2b76a91a83",
      },
    },
    dateRange: {
      connect: {
        uuid: "e7f08291-9f24-4957-b499-e640b7af9bf1",
      },
    },
    hosts: {
      connect: [
        {
          uuid: "5ce9cca1-7c28-4521-a918-17796a629cd7",
        },
      ],
    },
    places: {
      connect: [
        {
          uuid: "1108ef5b-3a78-499e-8500-d22d9079a405",
        },
      ],
    },
    tags: {
      connect: [
        {
          uuid: "e12f2335-5b59-4ac5-ba09-f830024fdbcc",
        },
      ],
    },
    timeRanges: {
      connect: [
        {
          id: 62,
        },
        {
          id: 63,
        },
      ],
    },
  },
  {
    uuid: "dcf7434f-25de-4ad2-83b4-968d5f375c6d",
    code: "1635",
    name: "畢業專題(二)",
    description: "四上必修",
    link: "",
    credit: 2,
    organization: {
      connect: {
        uuid: "fd811ccf-b134-4a0a-9fc3-f753d3b5ba4e",
      },
    },
    dateRange: {
      connect: {
        uuid: "1c8c9536-5543-415a-b9c4-850bc535ec05",
      },
    },
    hosts: {
      connect: [],
    },
    places: {
      connect: [],
    },
    tags: {
      connect: [
        {
          uuid: "151d3a4e-ab0f-4d42-ab92-5701fecccd1f",
        },
      ],
    },
    timeRanges: {
      connect: [
        {
          id: 88,
        },
        {
          id: 89,
        },
      ],
    },
  },
  {
    uuid: "05640e8b-4989-45b1-968d-749ae7b7fbc0",
    code: "6022",
    name: "VTuber 實習",
    description: "四下選修",
    link: "https://audition.hololivepro.com/",
    credit: 9,
    organization: {
      connect: {
        uuid: "fd811ccf-b134-4a0a-9fc3-f753d3b5ba4e",
      },
    },
    dateRange: {
      connect: {
        uuid: "e7f08291-9f24-4957-b499-e640b7af9bf1",
      },
    },
    hosts: {
      connect: [
        {
          uuid: "097648ba-6a56-44e3-a1f0-c240a26408bd",
        },
        {
          uuid: "6689bc50-4aa5-43f4-863c-3aa4fc3f7849",
        },
        {
          uuid: "619b66ba-30f0-46e4-89a4-221b69ba7011",
        },
      ],
    },
    places: {
      connect: [
        {
          uuid: "507b9216-cccb-427c-b3c8-23b62f43ffd0",
        },
      ],
    },
    tags: {
      connect: [
        {
          uuid: "e12f2335-5b59-4ac5-ba09-f830024fdbcc",
        },
      ],
    },
    timeRanges: {
      connect: [],
    },
  },
];
