import type { Prisma, Tag } from "@prisma/client";
import type { FastifyInstance } from "fastify";

import type PaginateOptions from "../types/paginate-options";
import type Paginated from "../types/paginated";

const TagService = { getAll, getOne, toPublic };
export default TagService;

export async function toPublic(tag: Tag): Promise<PublicTag> {
  return {
    uuid: tag.uuid,
    name: tag.name,
    description: tag.description,
  };
}

async function getAll(
  fastify: FastifyInstance,
  options: PaginateOptions & { where?: Prisma.TagWhereInput } = {},
): Promise<Paginated<PublicTag[]>> {
  const { where } = options;
  const page = Number(options.page || 1);
  const size = Number(options.size || 25);

  const totalAmount = await fastify.prisma.tag.count({ where });
  const tags = await fastify.prisma.tag.findMany({
    skip: (page - 1) * size,
    take: size,
    where,
  });

  const exposedTags = tags.map(toPublic);

  return {
    totalPages: Math.ceil(totalAmount / size) || 1,
    currentPage: page,
    content: await Promise.all(exposedTags),
  };
}

async function getOne(
  fastify: FastifyInstance,
  where: Prisma.TagWhereUniqueInput,
): Promise<PublicTag | null> {
  if (!where.id && !where.uuid) return null;

  const tag = await fastify.prisma.tag.findUnique({
    where: {
      id: where.id,
      uuid: where.uuid,
    },
  });

  if (!tag) return null;

  return await toPublic(tag);
}

export type PublicTag = Omit<Tag, "id">;
