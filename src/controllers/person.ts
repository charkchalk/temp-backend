import type { FastifyInstance } from "fastify";

import PersonService from "../services/person.service";
import type PaginateOptions from "../types/paginate-options";
import type Paginated from "../types/paginated";

export default async function PersonRoute(fastify: FastifyInstance) {
  fastify.get<{
    Querystring: PaginateOptions & {
      keyword?: string;
    };
  }>("/", async function getAll(req): Promise<Paginated> {
    const page = Number(req.query.page || 1);
    const size = Number(req.query.size || 25);
    const keyword = req.query.keyword || "";

    return PersonService.getAll(fastify, {
      page,
      size,
      where: {
        OR: [
          {
            name: {
              contains: keyword,
            },
          },
          {
            description: {
              contains: keyword,
            },
          },
        ],
      },
    });
  });

  fastify.get<{
    Params: {
      uuid: string;
    };
  }>("/:uuid", async function getOne(req, res) {
    const person = await PersonService.getOne(fastify, {
      uuid: req.params.uuid,
    });

    if (!person) {
      throw res.callNotFound();
    }

    return person;
  });
}
