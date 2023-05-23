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
  options: PaginateOptions & { where?: Prisma.OrganizationWhereInput } = {},
): Promise<Paginated<PublicOrganization[]>> {
  const { where } = options;
  const page = Number(options.page || 1);
  const size = Number(options.size || 25);

  const totalAmount = await fastify.prisma.organization.count({ where });
  const organizations = await fastify.prisma.organization.findMany({
    skip: (page - 1) * size,
    take: size,
    where,
  });

  const exposedOrganizations = organizations.map(organization =>
    toPublic(organization, fastify),
  );

  return {
    totalPages: Math.ceil(totalAmount / size) || 1,
    currentPage: page,
    content: await Promise.all(exposedOrganizations),
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
