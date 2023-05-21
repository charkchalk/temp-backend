import type { Place, Prisma } from "@prisma/client";
import type { FastifyInstance } from "fastify";

import type PaginateOptions from "../types/paginate-options";
import type Paginated from "../types/paginated";

const PlaceService = { getAll, getOne };
export default PlaceService;

async function getAll(
  fastify: FastifyInstance,
  options: PaginateOptions,
): Promise<Paginated<PublicPlace[]>> {
  const page = Number(options.page || 1);
  const size = Number(options.size || 25);

  const totalAmount = await fastify.prisma.place.count();
  const places = await fastify.prisma.place.findMany({
    skip: (page - 1) * size,
    take: size,
    include: {
      parent: true,
    },
  });

  const exposedPlaces = await Promise.all(
    places.map(async place => {
      return {
        uuid: place.uuid,
        name: place.name,
        description: place.description,
        parent: await getOne(fastify, {
          uuid: place.parent?.uuid,
        }),
      };
    }),
  );

  return {
    total: Math.ceil(totalAmount / size) || 1,
    current: page,
    data: exposedPlaces,
  };
}

async function getOne(
  fastify: FastifyInstance,
  where: Prisma.PlaceWhereUniqueInput,
): Promise<PublicPlace | null> {
  if (!where.uuid) return null;

  const place = await fastify.prisma.place.findUnique({
    where: {
      uuid: where.uuid,
    },
    include: {
      parent: true,
    },
  });

  if (!place) return null;

  const parent = await getOne(fastify, {
    uuid: place.parent?.uuid,
  });

  return {
    uuid: place.uuid,
    name: place.name,
    description: place.description,
    parent: parent,
  };
}

export type PublicPlace = Pick<Place, "uuid" | "name" | "description"> & {
  parent: PublicPlace | null;
};
