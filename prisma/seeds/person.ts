import { Prisma, PrismaClient } from "@prisma/client";

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

const people: Prisma.PersonCreateInput[] = [
  {
    uuid: "90f0203d-d35f-46bd-b433-9a4d27d84bff",
    name: "ときのそら",
    description: "Tokino Sora",
    link: "https://hololive.hololivepro.com/talents/tokino-sora/",
  },
  {
    uuid: "a3dcdff2-3b2a-4bf2-8a4a-f5773308e3b3",
    name: "ロボ子さん",
    description: "Robocosan",
    link: "https://hololive.hololivepro.com/talents/roboco-san/",
  },
  {
    uuid: "0fa07025-d4b4-40c2-aee3-247307a3a218",
    name: "夜空メル",
    description: "Yozora Mel",
    link: "https://hololive.hololivepro.com/talents/yozora-mel/",
  },
  {
    uuid: "6ff88557-ef5c-4949-83e5-06311804e46d",
    name: "アキ・ローゼンタール",
    description: "Aki Rosenthal",
    link: "https://hololive.hololivepro.com/talents/aki-rosenthal/",
  },
  {
    uuid: "2aab51d3-ca35-45ee-9a52-c247d381d2e8",
    name: "赤井はあと",
    description: "Akai Haato",
    link: "https://hololive.hololivepro.com/talents/akai-haato/",
  },
  {
    uuid: "097648ba-6a56-44e3-a1f0-c240a26408bd",
    name: "白上フブキ",
    description: "Shirakami Fubuki",
    link: "https://hololive.hololivepro.com/talents/shirakami-fubuki/",
  },
  {
    uuid: "231af467-a0c3-4fae-bfcd-cc12569e8ae0",
    name: "夏色まつり",
    description: "Natsuiro Matsuri",
    link: "https://hololive.hololivepro.com/talents/natsuiro-matsuri/",
  },
  {
    uuid: "29b412b0-437f-47d4-a98a-272684435d92",
    name: "湊あくあ",
    description: "Minato Aqua",
    link: "https://hololive.hololivepro.com/talents/minato-aqua/",
  },
  {
    uuid: "351effb9-f5f3-4e44-84d4-008c48c6ce1c",
    name: "紫咲シオン",
    description: "Murasaki Shion",
    link: "https://hololive.hololivepro.com/talents/murasaki-shion/",
  },
  {
    uuid: "461ba7e7-53aa-48e0-a9f5-ec9dfef7bab7",
    name: "百鬼あやめ",
    description: "Nakiri Ayame",
    link: "https://hololive.hololivepro.com/talents/nakiri-ayame/",
  },
  {
    uuid: "e957031f-cdc8-4fad-ba2a-3f137954f4e6",
    name: "癒月ちょこ",
    description: "Yuzuki Choco",
    link: "https://hololive.hololivepro.com/talents/yuzuki-choco/",
  },
  {
    uuid: "5ce9cca1-7c28-4521-a918-17796a629cd7",
    name: "大空スバル",
    description: "Oozora Subaru",
    link: "https://hololive.hololivepro.com/talents/oozora-subaru/",
  },
  {
    uuid: "b99e08dc-a6ae-49df-8496-7baa51cda0f6",
    name: "AZKi",
    description: "",
    link: "https://hololive.hololivepro.com/talents/azki/",
  },
  {
    uuid: "6135ed79-0d9f-47c3-bc09-bf1905299172",
    name: "大神ミオ",
    description: "Ookami Mio",
    link: "https://hololive.hololivepro.com/talents/ookami-mio/",
  },
  {
    uuid: "d04dd8dd-7741-4be7-bdb1-83cedb5cefbe",
    name: "さくらみこ",
    description: "Sakura Miko",
    link: "https://hololive.hololivepro.com/talents/sakuramiko/",
  },
  {
    uuid: "d0a3c031-940a-4103-94ff-634796fee49e",
    name: "猫又おかゆ",
    description: "Nekomata Okayu",
    link: "https://hololive.hololivepro.com/talents/nekomata-okayu/",
  },
  {
    uuid: "c37f01c1-7806-41fd-841a-e37e65a1734a",
    name: "戌神ころね",
    description: "Inugami Korone",
    link: "https://hololive.hololivepro.com/talents/inugami-korone/",
  },
  {
    uuid: "6689bc50-4aa5-43f4-863c-3aa4fc3f7849",
    name: "星街すいせい",
    description: "Hoshimachi Suisei",
    link: "https://hololive.hololivepro.com/talents/hoshimachi-suisei/",
  },
  {
    uuid: "9dea7f7d-776b-44dc-afdc-2e892ee3b111",
    name: "兎田ぺこら",
    description: "Usada Pekora",
    link: "https://hololive.hololivepro.com/talents/usada-pekora/",
  },
  {
    uuid: "17fec31b-aab9-4ccf-b256-1d81bad0a377",
    name: "不知火フレア",
    description: "Shiranui Flare",
    link: "https://hololive.hololivepro.com/talents/shiranui-flare/",
  },
  {
    uuid: "65f06a50-7dd4-4df4-a139-9a9c71fc30aa",
    name: "白銀ノエル",
    description: "Shirogane Noel",
    link: "https://hololive.hololivepro.com/talents/shirogane-noel/",
  },
  {
    uuid: "a97fa252-8d22-4486-b752-564eb2bf83a5",
    name: "宝鐘マリン",
    description: "Houshou Marine",
    link: "https://hololive.hololivepro.com/talents/houshou-marine/",
  },
  {
    uuid: "215daa53-4ab6-46ed-bee6-6dce4dbd372a",
    name: "天音かなた",
    description: "Amane Kanata",
    link: "https://hololive.hololivepro.com/talents/amane-kanata/",
  },
  {
    uuid: "566b1afc-6504-4168-9e49-22ac2d44bf41",
    name: "角巻わため",
    description: "Tsunomaki Watame",
    link: "https://hololive.hololivepro.com/talents/tsunomaki-watame/",
  },
  {
    uuid: "9e92d96d-7ac2-4125-ba48-509ec3b2d4bd",
    name: "常闇トワ",
    description: "Tokoyami Towa",
    link: "https://hololive.hololivepro.com/talents/tokoyami-towa/",
  },
  {
    uuid: "4966eac6-b929-4a51-b992-3c57abe4a565",
    name: "姫森ルーナ",
    description: "Himemori Luna",
    link: "https://hololive.hololivepro.com/talents/himemori-luna/",
  },
  {
    uuid: "0cc52672-e085-438b-972d-e5d89ce70298",
    name: "雪花ラミィ",
    description: "Yukihana Lamy",
    link: "https://hololive.hololivepro.com/talents/yukihana-lamy/",
  },
  {
    uuid: "f09d7b59-fd3e-4253-99d7-2b5775171907",
    name: "桃鈴ねね",
    description: "Momosuzu Nene",
    link: "https://hololive.hololivepro.com/talents/momosuzu-nene/",
  },
  {
    uuid: "d5f32368-f005-4ba7-8577-9445d916f6ae",
    name: "獅白ぼたん",
    description: "Shishiro Botan",
    link: "https://hololive.hololivepro.com/talents/shishiro-botan/",
  },
  {
    uuid: "e2f6c7a1-c542-4837-87e6-3a9e23705242",
    name: "尾丸ポルカ",
    description: "Omaru Polka",
    link: "https://hololive.hololivepro.com/talents/omaru-polka/",
  },
  {
    uuid: "3e47a34f-050d-4c38-ac77-17dacf4afa78",
    name: "ラプラス・ダークネス",
    description: "La+ Darknesss",
    link: "https://hololive.hololivepro.com/talents/la-darknesss/",
  },
  {
    uuid: "8d1c990e-b832-4540-bad3-6551596c42f0",
    name: "鷹嶺ルイ",
    description: "Takane Lui",
    link: "https://hololive.hololivepro.com/talents/takane-lui/",
  },
  {
    uuid: "829dfb7e-ef43-468f-b32e-8d84bb56924c",
    name: "博衣こより",
    description: "Hakui Koyori",
    link: "https://hololive.hololivepro.com/talents/hakui-koyori/",
  },
  {
    uuid: "b7a70c28-aff5-4f22-9923-3b04e39eb67c",
    name: "沙花叉クロヱ",
    description: "Sakamata Chloe",
    link: "https://hololive.hololivepro.com/talents/sakamata-chloe/",
  },
  {
    uuid: "8392a4d0-112b-4e40-9e93-bfe8516b180d",
    name: "風真いろは",
    description: "Kazama Iroha",
    link: "https://hololive.hololivepro.com/talents/kazama-iroha/",
  },
  {
    uuid: "a210933c-0a3b-4618-9ce5-a556737c2a6f",
    name: "アユンダ・リス",
    description: "Ayunda Risu",
    link: "https://hololive.hololivepro.com/talents/ayunda-risu/",
  },
  {
    uuid: "606153c0-050b-4658-b17f-138692a43d3d",
    name: "ムーナ・ホシノヴァ",
    description: "Moona Hoshinova",
    link: "https://hololive.hololivepro.com/talents/moona-hoshinova/",
  },
  {
    uuid: "b686c2ad-c7b4-4059-a4c9-9d7248525389",
    name: "アイラニ・イオフィフティーン",
    description: "Airani Iofifteen",
    link: "https://hololive.hololivepro.com/talents/airani-iofifteen/",
  },
  {
    uuid: "23ea9b41-53d9-48d9-ac18-e7eebb16afed",
    name: "クレイジー・オリー",
    description: "Kureiji Ollie",
    link: "https://hololive.hololivepro.com/talents/kureiji-ollie/",
  },
  {
    uuid: "f080db5a-5e91-4280-b23c-d6fa9452f411",
    name: "アーニャ・メルフィッサ",
    description: "Anya Melfissa",
    link: "https://hololive.hololivepro.com/talents/anya-melfissa/",
  },
  {
    uuid: "a3e02d9d-b27c-477f-886b-9f41597d4dab",
    name: "パヴォリア・レイネ",
    description: "Pavolia Reine",
    link: "https://hololive.hololivepro.com/talents/pavolia-reine/",
  },
  {
    uuid: "34f3e1a1-40d2-4a26-8b27-0fa1dfaec6d0",
    name: "ベスティア・ゼータ",
    description: "Vestia Zeta",
    link: "https://hololive.hololivepro.com/talents/vestia-zeta/",
  },
  {
    uuid: "3490e1e6-fc2d-4e4d-885f-b955f6014300",
    name: "カエラ・コヴァルスキア",
    description: "Kaela Kovalskia",
    link: "https://hololive.hololivepro.com/talents/kaela-kovalskia/",
  },
  {
    uuid: "00a69090-f20b-4e89-ba5b-b346b225a3dc",
    name: "こぼ・かなえる",
    description: "Kobo Kanaeru",
    link: "https://hololive.hololivepro.com/talents/kobo-kanaeru/",
  },
  {
    uuid: "03c5eb6b-1075-4644-b4a2-34c9b1b4af1d",
    name: "森カリオペ",
    description: "Mori Calliope",
    link: "https://hololive.hololivepro.com/talents/mori-calliope/",
  },
  {
    uuid: "e5797e7a-ee86-4ebe-84d1-289b6d67433d",
    name: "小鳥遊キアラ",
    description: "Takanashi Kiara",
    link: "https://hololive.hololivepro.com/talents/takanashi-kiara/",
  },
  {
    uuid: "a4c08c16-7a66-4fdd-8c5c-c37be4e95c27",
    name: "一伊那尓栖",
    description: "Ninomae Ina'nis",
    link: "https://hololive.hololivepro.com/talents/ninomae-inanis/",
  },
  {
    uuid: "cadd9fec-63e1-4fb0-a281-1138859ac129",
    name: "がうる・ぐら",
    description: "Gawr Gura",
    link: "https://hololive.hololivepro.com/talents/gawr-gura/",
  },
  {
    uuid: "d84b4ff0-b310-4206-9044-93d6213b5398",
    name: "ワトソン・アメリア",
    description: "Watson Amelia",
    link: "https://hololive.hololivepro.com/talents/watson-amelia/",
  },
  {
    uuid: "8f665a93-c16f-4415-97fe-213ec587d89c",
    name: "IRyS",
    description: "IRyS",
    link: "https://hololive.hololivepro.com/talents/irys/",
  },
  {
    uuid: "3962f998-f133-4651-a699-275324a08bbf",
    name: "セレス・ファウナ",
    description: "Ceres Fauna",
    link: "https://hololive.hololivepro.com/talents/ceres-fauna/",
  },
  {
    uuid: "3faa5913-c449-4df3-8a70-342699788fe0",
    name: "オーロ・クロニー",
    description: "Ouro Kronii",
    link: "https://hololive.hololivepro.com/talents/ouro-kronii/",
  },
  {
    uuid: "442a8fcf-a2e7-4a01-9a10-5a310513904a",
    name: "七詩ムメイ",
    description: "Nanashi Mumei",
    link: "https://hololive.hololivepro.com/talents/nanashi-mumei/",
  },
  {
    uuid: "7ec73c97-8148-4c76-9d61-3b1b45c816ab",
    name: "ハコス・ベールズ",
    description: "Hakos Baelz",
    link: "https://hololive.hololivepro.com/talents/hakos-baelz/",
  },
  {
    uuid: "9e533a83-4cb4-41b8-9cc0-961cc55cf004",
    name: "【卒業生】桐生ココ",
    description: "Kiryu Coco",
    link: "https://hololive.hololivepro.com/talents/kiryu-coco/",
  },
  {
    uuid: "4b1390c3-8190-4bd5-b3ab-e56ac257f16b",
    name: "【卒業生】九十九佐命",
    description: "Tsukumo Sana",
    link: "https://hololive.hololivepro.com/talents/tsukumo-sana/",
  },
  {
    uuid: "619b66ba-30f0-46e4-89a4-221b69ba7011",
    name: "友人A（えーちゃん）",
    description: "Friend-A",
    link: "https://hololive.hololivepro.com/talents/friend-a/",
  },
  {
    uuid: "c02bee04-7ef5-4221-ab43-24b857ca1fd2",
    name: "春先のどか",
    description: "Harusaki Nodoka",
    link: "https://hololive.hololivepro.com/talents/harusaki-nodoka/",
  },
];
