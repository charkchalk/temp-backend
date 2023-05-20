import type { FastifyInstance } from "fastify";

import PaginateOptions from "../types/paginate-options";
import Paginated from "../types/paginated";

export default async function PlaceRoute(fastify: FastifyInstance) {
  fastify.get<{
    Querystring: PaginateOptions;
  }>("/", async function getAll(req): Promise<Paginated> {
    const page = Number(req.query.page || 1);
    const size = Number(req.query.size || 25);

    const totalAmount = await fastify.prisma.place.count();
    const places = await fastify.prisma.place.findMany({
      skip: (page - 1) * size,
      take: size,
      include: {
        parent: true,
      },
    });

    const exposedPlaces = places.map(place => {
      return {
        uuid: place.uuid,
        name: place.name,
        description: place.description,
        parent: place.parent?.uuid ?? null,
      };
    });

    return {
      total: Math.ceil(totalAmount / size) || 1,
      current: page,
      data: exposedPlaces,
    };
  });

  fastify.get<{
    Params: {
      uuid: string;
    };
  }>("/:uuid", async function getOne(req, res) {
    const place = await fastify.prisma.place.findUnique({
      where: {
        uuid: req.params.uuid,
      },
      include: {
        parent: true,
      },
    });

    if (!place) {
      throw res.callNotFound();
    }

    return {
      uuid: place.uuid,
      name: place.name,
      description: place.description,
      parent: place.parent?.uuid ?? null,
    };
  });
}
