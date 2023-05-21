import type { Organization, Prisma } from "@prisma/client";
import type { FastifyInstance } from "fastify";

import type PaginateOptions from "../types/paginate-options";
import type Paginated from "../types/paginated";

const OrganizationService = { getAll, getOne };
export default OrganizationService;

async function getAll(
  fastify: FastifyInstance,
  options: PaginateOptions,
): Promise<Paginated<PublicOrganization[]>> {
  const page = Number(options.page || 1);
  const size = Number(options.size || 25);

  const totalAmount = await fastify.prisma.organization.count();
  const organizations = await fastify.prisma.organization.findMany({
    skip: (page - 1) * size,
    take: size,
    include: {
      parent: true,
    },
  });

  const exposedOrganizations = await Promise.all(
    organizations.map(async organization => {
      return {
        uuid: organization.uuid,
        name: organization.name,
        description: organization.description,
        parent: await getOne(fastify, {
          uuid: organization.parent?.uuid,
        }),
      };
    }),
  );

  return {
    total: Math.ceil(totalAmount / size) || 1,
    current: page,
    data: exposedOrganizations,
  };
}

async function getOne(
  fastify: FastifyInstance,
  where: Prisma.OrganizationWhereUniqueInput,
): Promise<PublicOrganization | null> {
  if (!where.uuid) return null;

  const organization = await fastify.prisma.organization.findUnique({
    where: {
      uuid: where.uuid,
    },
    include: {
      parent: true,
    },
  });

  if (!organization) return null;

  const parent = await getOne(fastify, {
    uuid: organization.parent?.uuid,
  });

  return {
    uuid: organization.uuid,
    name: organization.name,
    description: organization.description,
    parent: parent,
  };
}

export type PublicOrganization = Pick<
  Organization,
  "uuid" | "name" | "description"
> & {
  parent: PublicOrganization | null;
};
