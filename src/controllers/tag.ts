import type { FastifyInstance } from "fastify";

import PaginateOptions from "../types/paginate-options";
import Paginated from "../types/paginated";

export default async function TagRoute(fastify: FastifyInstance) {
  fastify.get<{
    Querystring: PaginateOptions;
  }>("/", async function getAll(req): Promise<Paginated> {
    const page = Number(req.query.page || 1);
    const size = Number(req.query.size || 25);

    const totalAmount = await fastify.prisma.tag.count();
    const tags = await fastify.prisma.tag.findMany({
      skip: (page - 1) * size,
      take: size,
    });

    const exposedTags = tags.map(tag => {
      return {
        uuid: tag.uuid,
        name: tag.name,
        description: tag.description,
      };
    });

    return {
      total: Math.ceil(totalAmount / size) || 1,
      current: page,
      data: exposedTags,
    };
  });

  fastify.get<{
    Params: {
      uuid: string;
    };
  }>("/:uuid", async function getOne(req, res) {
    const tag = await fastify.prisma.tag.findUnique({
      where: {
        uuid: req.params.uuid,
      },
    });

    if (!tag) {
      throw res.callNotFound();
    }

    return {
      uuid: tag.uuid,
      name: tag.name,
      description: tag.description,
    };
  });
}
