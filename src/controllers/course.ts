import type { FastifyInstance } from "fastify";

import CourseService from "../services/course.service";
import type PaginateOptions from "../types/paginate-options";
import type Paginated from "../types/paginated";

export default async function CourseRoute(fastify: FastifyInstance) {
  fastify.get<{
    Querystring: PaginateOptions;
  }>("/", async function getAll(req): Promise<Paginated> {
    const page = Number(req.query.page || 1);
    const size = Number(req.query.size || 25);

    return CourseService.getAll(fastify, { page, size });
  });

  fastify.get<{
    Params: {
      uuid: string;
    };
  }>("/:uuid", async function getOne(req, res) {
    const course = await CourseService.getOne(fastify, {
      uuid: req.params.uuid,
    });

    if (!course) {
      throw res.callNotFound();
    }

    return course;
  });
}
