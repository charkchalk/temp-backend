import type { Place, Prisma } from "@prisma/client";
import type { FastifyInstance } from "fastify";

import type PaginateOptions from "../types/paginate-options";
import type Paginated from "../types/paginated";

const PlaceService = { getAll, getOne, toPublic };
export default PlaceService;

export async function toPublic(
  place: Place,
  fastify: FastifyInstance,
): Promise<PublicPlace> {
  return {
    uuid: place.uuid,
    name: place.name,
    description: place.description,
    parent: await getOne(fastify, {
      id: place.parentId ?? undefined,
    }),
  };
}

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
  });

  const exposedPlaces = places.map(place => toPublic(place, fastify));

  return {
    totalPages: Math.ceil(totalAmount / size) || 1,
    currentPage: page,
    content: await Promise.all(exposedPlaces),
  };
}

async function getOne(
  fastify: FastifyInstance,
  where: Prisma.PlaceWhereUniqueInput,
): Promise<PublicPlace | null> {
  if (!where.id && !where.uuid) return null;

  const place = await fastify.prisma.place.findUnique({
    where: {
      id: where.id,
      uuid: where.uuid,
    },
  });

  if (!place) return null;

  return await toPublic(place, fastify);
}

export type PublicPlace = Pick<Place, "uuid" | "name" | "description"> & {
  parent: PublicPlace | null;
};
