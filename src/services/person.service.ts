import type { Person, Prisma } from "@prisma/client";
import type { FastifyInstance } from "fastify";

import type PaginateOptions from "../types/paginate-options";
import type Paginated from "../types/paginated";

const PersonService = { getAll, getOne };
export default PersonService;

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

  const exposedPersons = persons.map(person => {
    return {
      uuid: person.uuid,
      name: person.name,
      description: person.description,
      link: person.link,
    };
  });

  return {
    total: Math.ceil(totalAmount / size) || 1,
    current: page,
    data: exposedPersons,
  };
}

async function getOne(
  fastify: FastifyInstance,
  where: Prisma.PersonWhereUniqueInput,
): Promise<PublicPerson | null> {
  const person = await fastify.prisma.person.findUnique({
    where: {
      uuid: where.uuid,
    },
  });

  if (!person) {
    return null;
  }

  return {
    uuid: person.uuid,
    name: person.name,
    description: person.description,
    link: person.link,
  };
}

export type PublicPerson = Omit<Person, "id">;
