import type {
  Course,
  DateRange,
  Organization,
  Person,
  Place,
  Prisma,
  Tag,
  TimeRange,
} from "@prisma/client";
import type { FastifyInstance } from "fastify";

import type PaginateOptions from "../types/paginate-options";
import type Paginated from "../types/paginated";
import type { PublicDateRange } from "./date-range.service";
import DateRangeService from "./date-range.service";
import type { PublicOrganization } from "./organization.service";
import OrganizationService from "./organization.service";
import type { PublicPerson } from "./person.service";
import PersonService from "./person.service";
import type { PublicPlace } from "./place.service";
import PlaceService from "./place.service";
import type { PublicTag } from "./tag.service";
import TagService from "./tag.service";
import type { PublicTimeRange } from "./time-range.service";
import TimeRangeService from "./time-range.service";

const CourseService = { getAll, getOne, toPublic };
export default CourseService;

export async function toPublic(
  course: FullCourse,
  fastify: FastifyInstance,
): Promise<PublicCourse | Course> {
  const organization = course.organization
    ? await OrganizationService.toPublic(course.organization, fastify)
    : null;

  const dateRange = course.dateRange
    ? await DateRangeService.toPublic(course.dateRange)
    : null;

  const timeRanges = await Promise.all(
    course.timeRanges.map(timeRange => TimeRangeService.toPublic(timeRange)),
  );

  const hosts = await Promise.all(
    course.hosts.map(host => PersonService.toPublic(host)),
  );

  const places = await Promise.all(
    course.places.map(place => PlaceService.toPublic(place, fastify)),
  );

  const tags = await Promise.all(
    course.tags.map(tag => TagService.toPublic(tag)),
  );

  return {
    uuid: course.uuid,
    name: course.name,
    description: course.description,
    organization,
    dateRange,
    timeRanges,
    hosts,
    places,
    tags,
  };
}

async function getAll(
  fastify: FastifyInstance,
  options: PaginateOptions,
): Promise<Paginated> {
  const page = Number(options.page || 1);
  const size = Number(options.size || 25);

  const totalAmount = await fastify.prisma.course.count();
  const courses = await fastify.prisma.course.findMany({
    skip: (page - 1) * size,
    take: size,
    include: {
      organization: true,
      dateRange: true,
      timeRanges: true,
      hosts: true,
      places: true,
      tags: true,
    },
  });

  const exposedCourses = courses.map(course => toPublic(course, fastify));

  return {
    total: Math.ceil(totalAmount / size) || 1,
    current: page,
    data: await Promise.all(exposedCourses),
  };
}

async function getOne(
  fastify: FastifyInstance,
  where: Prisma.OrganizationWhereUniqueInput,
) {
  if (!where.id && !where.uuid) return null;

  const course = await fastify.prisma.course.findUnique({
    where: {
      id: where.id,
      uuid: where.uuid,
    },
    include: {
      organization: true,
      dateRange: true,
      timeRanges: true,
      hosts: true,
      places: true,
      tags: true,
    },
  });

  if (!course) return null;

  return await toPublic(course, fastify);
}

type PublicCourse = Pick<Course, "uuid" | "name" | "description"> & {
  organization: PublicOrganization | null;
  dateRange: PublicDateRange | null;
  timeRanges: PublicTimeRange[];
  hosts: PublicPerson[];
  places: PublicPlace[];
  tags: PublicTag[];
};

type FullCourse = Course & {
  organization: Organization;
  dateRange: DateRange;
  timeRanges: TimeRange[];
  hosts: Person[];
  places: Place[];
  tags: Tag[];
};
