import type { Person, Prisma } from "@prisma/client";
import type { FastifyInstance } from "fastify";

import type PaginateOptions from "../types/paginate-options";
import type Paginated from "../types/paginated";

const PersonService = { getAll, getOne, toPublic };
export default PersonService;

export async function toPublic(person: Person): Promise<PublicPerson> {
  return {
    uuid: person.uuid,
    name: person.name,
    description: person.description,
    link: person.link,
  };
}

async function getAll(
  fastify: FastifyInstance,
  options: PaginateOptions,
): Promise<Paginated<PublicPerson[]>> {
  const page = Number(options.page || 1);
  const size = Number(options.size || 25);

  const totalAmount = await fastify.prisma.person.count();
  const persons = await fastify.prisma.person.findMany({
    skip: (page - 1) * size,
    take: size,
  });

  const exposedPersons = persons.map(toPublic);

  return {
    totalPages: Math.ceil(totalAmount / size) || 1,
    currentPage: page,
    content: await Promise.all(exposedPersons),
  };
}

async function getOne(
  fastify: FastifyInstance,
  where: Prisma.PersonWhereUniqueInput,
): Promise<PublicPerson | null> {
  if (!where.id && !where.uuid) return null;

  const person = await fastify.prisma.person.findUnique({
    where: {
      id: where.id,
      uuid: where.uuid,
    },
  });

  if (!person) return null;

  return await toPublic(person);
}

export type PublicPerson = Omit<Person, "id">;
