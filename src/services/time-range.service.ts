import type { Prisma, TimeRange } from "@prisma/client";
import { Weekday } from "@prisma/client";
import type { FastifyInstance } from "fastify";

import { ITimeRange } from "../controllers/course";
import type PaginateOptions from "../types/paginate-options";
import type Paginated from "../types/paginated";
import { getTime } from "../utils/date-time";

const TimeRangeService = { getAll, getOne, toPublic, destructRange, getRanges };
export default TimeRangeService;

export async function toPublic(timeRange: TimeRange): Promise<PublicTimeRange> {
  return {
    weekday: timeRange.weekday,
    startTime: getTime(timeRange.startTime),
    endTime: getTime(timeRange.endTime),
  };
}

async function getAll(
  fastify: FastifyInstance,
  options: PaginateOptions & { where?: Prisma.TimeRangeWhereInput } = {},
): Promise<Paginated<PublicTimeRange[]>> {
  const { where } = options;
  const page = Number(options.page || 1);
  const size = Number(options.size || 25);

  const totalAmount = await fastify.prisma.timeRange.count({ where });
  const timeRanges = await fastify.prisma.timeRange.findMany({
    skip: (page - 1) * size,
    take: size,
    where,
  });

  const exposedTimeRanges = timeRanges.map(toPublic);

  return {
    totalPages: Math.ceil(totalAmount / size) || 1,
    currentPage: page,
    content: await Promise.all(exposedTimeRanges),
  };
}

const Weekdays = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
] as Weekday[];

interface RawTimeRange {
  weekday: Weekday;
  startTime: string;
  endTime: string;
}

function destructRange(range: ITimeRange) {
  const ranges: RawTimeRange[] = [];

  if (range.start.day < range.end.day) {
    for (let i = range.start.day; i <= range.end.day; i++) {
      if (i === range.start.day) {
        ranges.push({
          weekday: Weekdays[i - 1],
          startTime: range.start.time,
          endTime: "23:59",
        });
      } else if (i === range.end.day) {
        ranges.push({
          weekday: Weekdays[i - 1],
          startTime: "00:00",
          endTime: range.end.time,
        });
      } else {
        ranges.push({
          weekday: Weekdays[i - 1],
          startTime: "00:00",
          endTime: "23:59",
        });
      }
    }
  } else if (range.start.day > range.end.day) {
    for (let i = range.start.day; i <= 7; i++) {
      if (i === range.start.day) {
        ranges.push({
          weekday: Weekdays[i - 1],
          startTime: range.start.time,
          endTime: "23:59",
        });
      } else {
        ranges.push({
          weekday: Weekdays[i - 1],
          startTime: "00:00",
          endTime: "23:59",
        });
      }
    }

    for (let i = 1; i <= range.end.day; i++) {
      if (i === range.end.day) {
        ranges.push({
          weekday: Weekdays[i - 1],
          startTime: "00:00",
          endTime: range.end.time,
        });
      } else {
        ranges.push({
          weekday: Weekdays[i - 1],
          startTime: "00:00",
          endTime: "23:59",
        });
      }
    }
  } else {
    ranges.push({
      weekday: Weekdays[range.start.day - 1],
      startTime: range.start.time,
      endTime: range.end.time,
    });
  }

  return ranges;
}

async function getRanges(fastify: FastifyInstance, range: RawTimeRange[]) {
  const allTimeRanges: TimeRange[] = [];

  for await (const { weekday, startTime, endTime } of range) {
    const timeRanges = await fastify.prisma.$queryRawUnsafe<TimeRange[]>(
      "SELECT * FROM `TimeRange` WHERE (`weekday` = ? AND `startTime` >= ? AND `endTime` <= ?)",
      weekday,
      `1970-01-01T${startTime}:00.000Z`,
      `1970-01-01T${endTime}:00.000Z`,
    );

    allTimeRanges.push(...timeRanges);
  }

  const r = allTimeRanges.filter(
    (value, index, array) => array.indexOf(value) === index,
  );

  return r;
}

async function getOne(
  fastify: FastifyInstance,
  where: Prisma.TimeRangeWhereUniqueInput,
): Promise<PublicTimeRange | null> {
  if (!where.id) return null;

  const timeRange = await fastify.prisma.timeRange.findUnique({
    where: {
      id: where.id,
    },
  });

  if (!timeRange) return null;

  return await toPublic(timeRange);
}

export type PublicTimeRange = Omit<
  TimeRange,
  "id" | "startTime" | "endTime"
> & {
  startTime: string;
  endTime: string;
};
