import type { FastifyInstance } from "fastify";

import PaginateOptions from "../types/paginate-options";
import Paginated from "../types/paginated";

export default async function PersonRoute(fastify: FastifyInstance) {
  fastify.get<{
    Querystring: PaginateOptions;
  }>("/", async function getAll(req): Promise<Paginated> {
    const page = Number(req.query.page || 1);
    const size = Number(req.query.size || 25);

    const totalAmount = await fastify.prisma.person.count();
    const persons = await fastify.prisma.person.findMany({
      skip: (page - 1) * size,
      take: size,
    });

    const exposedPersons = persons.map(person => {
      return {
        uuid: person.uuid,
        name: person.name,
        description: person.description,
        link: person.link,
      };
    });

    return {
      total: Math.ceil(totalAmount / size) || 1,
      current: page,
      data: exposedPersons,
    };
  });

  fastify.get<{
    Params: {
      uuid: string;
    };
  }>("/:uuid", async function getOne(req, res) {
    const person = await fastify.prisma.person.findUnique({
      where: {
        uuid: req.params.uuid,
      },
    });

    if (!person) {
      throw res.callNotFound();
    }

    return {
      uuid: person.uuid,
      name: person.name,
      description: person.description,
      link: person.link,
    };
  });
}
