import type { FastifyInstance } from "fastify";

import PaginateOptions from "../types/paginate-options";
import Paginated from "../types/paginated";
import { getDate } from "../utils/date-time";

export default async function DateRangeRoute(fastify: FastifyInstance) {
  fastify.get<{
    Querystring: PaginateOptions;
  }>("/", async function getAll(req): Promise<Paginated> {
    const page = Number(req.query.page || 1);
    const size = Number(req.query.size || 25);

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
  });

  fastify.get<{
    Params: {
      uuid: string;
    };
  }>("/:uuid", async function getOne(req, res) {
    const dateRange = await fastify.prisma.dateRange.findUnique({
      where: {
        uuid: req.params.uuid,
      },
    });

    if (!dateRange) {
      throw res.callNotFound();
    }

    return {
      uuid: dateRange.uuid,
      name: dateRange.name,
      description: dateRange.description,
      startDate: getDate(dateRange.startDate),
      endDate: getDate(dateRange.endDate),
    };
  });
}
