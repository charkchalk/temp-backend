import type { FastifyInstance } from "fastify";

import PlaceService from "../services/place.service";
import type PaginateOptions from "../types/paginate-options";
import type Paginated from "../types/paginated";

export default async function PlaceRoute(fastify: FastifyInstance) {
  fastify.get<{
    Querystring: PaginateOptions;
  }>("/", async function getAll(req): Promise<Paginated> {
    const page = Number(req.query.page || 1);
    const size = Number(req.query.size || 25);

    return PlaceService.getAll(fastify, { page, size });
  });

  fastify.get<{
    Params: {
      uuid: string;
    };
  }>("/:uuid", async function getOne(req, res) {
    const place = await PlaceService.getOne(fastify, {
      uuid: req.params.uuid,
    });

    if (!place) {
      throw res.callNotFound();
    }

    return place;
  });
}
