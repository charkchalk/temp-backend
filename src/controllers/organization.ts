import type { FastifyInstance } from "fastify";

import OrganizationService from "../services/organization.service";
import type PaginateOptions from "../types/paginate-options";
import type Paginated from "../types/paginated";

export default async function OrganizationRoute(fastify: FastifyInstance) {
  fastify.get<{
    Querystring: PaginateOptions & {
      keyword?: string;
    };
  }>("/", async function getAll(req): Promise<Paginated> {
    const page = Number(req.query.page || 1);
    const size = Number(req.query.size || 25);
    const keyword = req.query.keyword || "";

    return OrganizationService.getAll(fastify, {
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
    const organization = await OrganizationService.getOne(fastify, {
      uuid: req.params.uuid,
    });

    if (!organization) {
      throw res.callNotFound();
    }

    return organization;
  });
}
