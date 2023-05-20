import type { FastifyInstance } from "fastify";

import PaginateOptions from "../types/paginate-options";
import Paginated from "../types/paginated";

export default async function OrganizationRoute(fastify: FastifyInstance) {
  fastify.get<{
    Querystring: PaginateOptions;
  }>("/", async function getAll(req): Promise<Paginated> {
    const page = Number(req.query.page || 1);
    const size = Number(req.query.size || 25);

    const totalAmount = await fastify.prisma.organization.count();
    const organizations = await fastify.prisma.organization.findMany({
      skip: (page - 1) * size,
      take: size,
      include: {
        parent: true,
      },
    });

    const exposedOrganizations = organizations.map(organization => {
      return {
        uuid: organization.uuid,
        name: organization.name,
        description: organization.description,
        parent: organization.parent?.uuid ?? null,
      };
    });

    return {
      total: Math.ceil(totalAmount / size) || 1,
      current: page,
      data: exposedOrganizations,
    };
  });

  fastify.get<{
    Params: {
      uuid: string;
    };
  }>("/:uuid", async function getOne(req, res) {
    const organization = await fastify.prisma.organization.findUnique({
      where: {
        uuid: req.params.uuid,
      },
      include: {
        parent: true,
      },
    });

    if (!organization) {
      throw res.callNotFound();
    }

    return {
      uuid: organization.uuid,
      name: organization.name,
      description: organization.description,
      parent: organization.parent?.uuid ?? null,
    };
  });
}
