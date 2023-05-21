import type { Prisma, TimeRange } from "@prisma/client";
import type { FastifyInstance } from "fastify";

import type PaginateOptions from "../types/paginate-options";
import type Paginated from "../types/paginated";
import { getTime } from "../utils/date-time";

const TimeRangeService = { getAll, getOne, toPublic };
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
  options: PaginateOptions,
): Promise<Paginated<PublicTimeRange[]>> {
  const page = Number(options.page || 1);
  const size = Number(options.size || 25);

  const totalAmount = await fastify.prisma.timeRange.count();
  const timeRanges = await fastify.prisma.timeRange.findMany({
    skip: (page - 1) * size,
    take: size,
  });

  const exposedTimeRanges = timeRanges.map(toPublic);

  return {
    total: Math.ceil(totalAmount / size) || 1,
    current: page,
    data: await Promise.all(exposedTimeRanges),
  };
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
