import type { FastifyInstance } from "fastify";

import TimeRangeService from "../services/time-range.service";
import PaginateOptions from "../types/paginate-options";
import Paginated from "../types/paginated";

export default async function TimeRangeRoute(fastify: FastifyInstance) {
  fastify.get<{
    Querystring: PaginateOptions;
  }>("/", async function getAll(req): Promise<Paginated> {
    const page = Number(req.query.page || 1);
    const size = Number(req.query.size || 25);

    return await TimeRangeService.getAll(this, {
      page,
      size,
    });
  });
}
