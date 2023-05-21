import type { DateRange, Prisma } from "@prisma/client";
import type { FastifyInstance } from "fastify";

import type PaginateOptions from "../types/paginate-options";
import type Paginated from "../types/paginated";
import { getDate } from "../utils/date-time";

const DateRangeService = { getAll, getOne };
export default DateRangeService;

async function getAll(
  fastify: FastifyInstance,
  options: PaginateOptions,
): Promise<Paginated<PublicDateRange[]>> {
  const page = Number(options.page || 1);
  const size = Number(options.size || 25);

  const totalAmount = await fastify.prisma.dateRange.count();
  const dateRanges = await fastify.prisma.dateRange.findMany({
    skip: (page - 1) * size,
    take: size,
  });

  const exposedDateRanges = dateRanges.map(dateRange => {
    return {
      uuid: dateRange.uuid,
      name: dateRange.name,
      description: dateRange.description,
      startDate: getDate(dateRange.startDate),
      endDate: getDate(dateRange.endDate),
    };
  });

  return {
    total: Math.ceil(totalAmount / size) || 1,
    current: page,
    data: exposedDateRanges,
  };
}

async function getOne(
  fastify: FastifyInstance,
  where: Prisma.DateRangeWhereUniqueInput,
): Promise<PublicDateRange | null> {
  const dateRange = await fastify.prisma.dateRange.findUnique({
    where: {
      uuid: where.uuid,
    },
  });

  if (!dateRange) {
    return null;
  }

  return {
    uuid: dateRange.uuid,
    name: dateRange.name,
    description: dateRange.description,
    startDate: getDate(dateRange.startDate),
    endDate: getDate(dateRange.endDate),
  };
}

export type PublicDateRange = Omit<
  DateRange,
  "id" | "startDate" | "endDate"
> & {
  startDate: string;
  endDate: string;
};
