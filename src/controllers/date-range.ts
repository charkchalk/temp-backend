import type { FastifyInstance } from "fastify";

import DateRangeService from "../services/date-range.service";
import type PaginateOptions from "../types/paginate-options";
import type Paginated from "../types/paginated";

export default async function DateRangeRoute(fastify: FastifyInstance) {
  fastify.get<{
    Querystring: PaginateOptions;
  }>("/", async function getAll(req): Promise<Paginated> {
    const page = Number(req.query.page || 1);
    const size = Number(req.query.size || 25);

    return DateRangeService.getAll(fastify, { page, size });
  });

  fastify.get<{
    Params: {
      uuid: string;
    };
  }>("/:uuid", async function getOne(req, res) {
    const dateRange = await DateRangeService.getOne(fastify, {
      uuid: req.params.uuid,
    });

    if (!dateRange) {
      throw res.callNotFound();
    }

    return dateRange;
  });
}
