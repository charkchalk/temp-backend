import type { Organization, Prisma } from "@prisma/client";
import type { FastifyInstance } from "fastify";

import type PaginateOptions from "../types/paginate-options";
import type Paginated from "../types/paginated";

const OrganizationService = { getAll, getOne, toPublic };
export default OrganizationService;

export async function toPublic(
  organization: Organization,
  fastify: FastifyInstance,
): Promise<PublicOrganization> {
  return {
    uuid: organization.uuid,
    name: organization.name,
    description: organization.description,
    parent: await getOne(fastify, {
      id: organization.parentId ?? undefined,
    }),
  };
}

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
  });

  const exposedOrganizations = organizations.map(organization =>
    toPublic(organization, fastify),
  );

  return {
    total: Math.ceil(totalAmount / size) || 1,
    current: page,
    data: await Promise.all(exposedOrganizations),
  };
}

async function getOne(
  fastify: FastifyInstance,
  where: Prisma.OrganizationWhereUniqueInput,
): Promise<PublicOrganization | null> {
  if (!where.id && !where.uuid) return null;

  const organization = await fastify.prisma.organization.findUnique({
    where: {
      id: where.id,
      uuid: where.uuid,
    },
  });

  if (!organization) return null;

  return await toPublic(organization, fastify);
}

export type PublicOrganization = Pick<
  Organization,
  "uuid" | "name" | "description"
> & {
  parent: PublicOrganization | null;
};
