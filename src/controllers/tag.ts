import type { FastifyInstance } from "fastify";

import TagService from "../services/tag.service";
import type PaginateOptions from "../types/paginate-options";
import type Paginated from "../types/paginated";

export default async function TagRoute(fastify: FastifyInstance) {
  fastify.get<{
    Querystring: PaginateOptions;
  }>("/", async function getAll(req): Promise<Paginated> {
    const page = Number(req.query.page || 1);
    const size = Number(req.query.size || 25);

    return TagService.getAll(fastify, { page, size });
  });

  fastify.get<{
    Params: {
      uuid: string;
    };
  }>("/:uuid", async function getOne(req, res) {
    const tag = await TagService.getOne(fastify, {
      uuid: req.params.uuid,
    });

    if (!tag) {
      throw res.callNotFound();
    }

    return tag;
  });
}
