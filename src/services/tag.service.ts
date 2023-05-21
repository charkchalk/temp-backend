import type { Prisma, Tag } from "@prisma/client";
import type { FastifyInstance } from "fastify";

import type PaginateOptions from "../types/paginate-options";
import type Paginated from "../types/paginated";

const TagService = { getAll, getOne };
export default TagService;

async function getAll(
  fastify: FastifyInstance,
  options: PaginateOptions,
): Promise<Paginated<PublicTag[]>> {
  const page = Number(options.page || 1);
  const size = Number(options.size || 25);

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
}

async function getOne(
  fastify: FastifyInstance,
  where: Prisma.TagWhereUniqueInput,
): Promise<PublicTag | null> {
  const tag = await fastify.prisma.tag.findUnique({
    where: {
      uuid: where.uuid,
    },
  });

  if (!tag) {
    return null;
  }

  return {
    uuid: tag.uuid,
    name: tag.name,
    description: tag.description,
  };
}

export type PublicTag = Omit<Tag, "id">;
