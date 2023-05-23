import type { DateRange, Prisma } from "@prisma/client";
import type { FastifyInstance } from "fastify";

import type PaginateOptions from "../types/paginate-options";
import type Paginated from "../types/paginated";
import { getDate } from "../utils/date-time";

const DateRangeService = { getAll, getOne, toPublic };
export default DateRangeService;

export async function toPublic(dateRange: DateRange): Promise<PublicDateRange> {
  return {
    uuid: dateRange.uuid,
    name: dateRange.name,
    description: dateRange.description,
    startDate: getDate(dateRange.startDate),
    endDate: getDate(dateRange.endDate),
  };
}

async function getAll(
  fastify: FastifyInstance,
  options: PaginateOptions & { where?: Prisma.DateRangeWhereInput } = {},
): Promise<Paginated<PublicDateRange[]>> {
  const { where } = options;
  const page = Number(options.page || 1);
  const size = Number(options.size || 25);

  const totalAmount = await fastify.prisma.dateRange.count({ where });
  const dateRanges = await fastify.prisma.dateRange.findMany({
    skip: (page - 1) * size,
    take: size,
    where,
  });

  const exposedDateRanges = dateRanges.map(toPublic);

  return {
    totalPages: Math.ceil(totalAmount / size) || 1,
    currentPage: page,
    content: await Promise.all(exposedDateRanges),
  };
}

async function getOne(
  fastify: FastifyInstance,
  where: Prisma.DateRangeWhereUniqueInput,
): Promise<PublicDateRange | null> {
  if (!where.id && !where.uuid) return null;

  const dateRange = await fastify.prisma.dateRange.findUnique({
    where: {
      id: where.id,
      uuid: where.uuid,
    },
  });

  if (!dateRange) {
    return null;
  }

  return await toPublic(dateRange);
}

export type PublicDateRange = Omit<
  DateRange,
  "id" | "startDate" | "endDate"
> & {
  startDate: string;
  endDate: string;
};
