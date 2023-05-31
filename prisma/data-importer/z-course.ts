import { Prisma, PrismaClient } from "@prisma/client";
import FileSystem from "fs";
import Path from "path";

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
    console.log(JSON.stringify(course));

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

const path = Path.resolve(__dirname, "./data/courses.json");
const file = FileSystem.readFileSync(path, "utf8");

const courses = JSON.parse(file) as Prisma.CourseCreateInput[];
