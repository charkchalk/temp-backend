import type { Prisma } from "@prisma/client";
import type { FastifyInstance } from "fastify";

import CourseService from "../services/course.service";
import TimeRangeService from "../services/time-range.service";
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

  fastify.post<{
    Querystring: PaginateOptions;
    Body: SerachBody[];
  }>("/search", async function search(req, res) {
    const page = Number(req.query.page || 1);
    const size = Number(req.query.size || 25);
    const where = {
      AND: [],
    };

    await Promise.all(
      req.body.map(async ({ key, method, value: values }) => {
        const OR: Prisma.CourseWhereInput["OR"] = [];

        switch (key) {
          case "code":
            values.forEach(value => {
              if (method === "=")
                OR.push({
                  code: {
                    contains: value,
                  },
                });
              else if (method === "!=")
                OR.push({
                  code: {
                    not: {
                      contains: value,
                    },
                  },
                });
            });
            break;
          case "credit":
            values.forEach(value => {
              if (method === "=")
                OR.push({
                  credit: {
                    equals: Number(value),
                  },
                });
              else if (method === "!=")
                OR.push({
                  credit: {
                    not: {
                      equals: Number(value),
                    },
                  },
                });
            });
            break;
          case "dateRange":
            values.forEach(value => {
              if (method === "=")
                OR.push({
                  dateRange: {
                    uuid: value,
                  },
                });
              else if (method === "!=")
                OR.push({
                  dateRange: {
                    isNot: {
                      uuid: value,
                    },
                  },
                });
            });
            break;
          case "host":
            values.forEach(value => {
              if (method === "=")
                OR.push({
                  hosts: {
                    some: {
                      uuid: value,
                    },
                  },
                });
              else if (method === "!=")
                OR.push({
                  hosts: {
                    none: {
                      uuid: value,
                    },
                  },
                });
            });
            break;
          case "keyword":
            values.forEach(value => {
              if (method === "=") {
                OR.push({
                  name: {
                    contains: value,
                  },
                });
                OR.push({
                  description: {
                    contains: value,
                  },
                });
              } else if (method === "!=") {
                OR.push({
                  NOT: {
                    name: {
                      contains: value,
                    },
                  },
                });
                OR.push({
                  NOT: {
                    description: {
                      contains: value,
                    },
                  },
                });
              }
            });
            break;
          case "organization":
            values.forEach(value => {
              if (method === "=")
                OR.push({
                  organization: {
                    uuid: value,
                  },
                });
              else if (method === "!=")
                OR.push({
                  organization: {
                    NOT: {
                      uuid: value,
                    },
                  },
                });
            });
            break;
          case "place":
            values.forEach(value => {
              if (method === "=")
                OR.push({
                  places: {
                    some: {
                      uuid: value,
                    },
                  },
                });
              else if (method === "!=")
                OR.push({
                  places: {
                    none: {
                      uuid: value,
                    },
                  },
                });
            });
            break;
          case "timeRange":
            await Promise.all(
              values.map(async value => {
                const destructedTimeRanges =
                  TimeRangeService.destructRange(value);
                const timeRanges = await TimeRangeService.getRanges(
                  fastify,
                  destructedTimeRanges,
                );

                if (method === "=") {
                  OR.push({
                    timeRanges: {
                      some: {
                        id: {
                          in: timeRanges.map(({ id }) => id),
                        },
                      },
                    },
                  });
                } else if (method === "!=") {
                  OR.push({
                    timeRanges: {
                      none: {
                        id: {
                          in: timeRanges.map(({ id }) => id),
                        },
                      },
                    },
                  });
                }
              }),
            );
            break;
        }

        (where.AND as Prisma.CourseWhereInput[]).push({ OR });
      }),
    );

    const courses = await CourseService.getAll(fastify, {
      page,
      size,
      where,
    });

    return courses;
  });
}

type SerachBody =
  | CodeSearchBody
  | CreditSearchBody
  | DateRangeSearchBody
  | HostSearchBody
  | KeywordSearchBody
  | OrganizationSearchBody
  | PlaceSearchBody
  | TimeRangeSearchBody;

interface BasicSearchBody<Key extends string, Value = string[]> {
  key: Key;
  method: "=" | "!=";
  value: Value;
}

type CodeSearchBody = BasicSearchBody<"code", string[]>;
type CreditSearchBody = BasicSearchBody<"credit", string[]>;
type DateRangeSearchBody = BasicSearchBody<"dateRange", string[]>;
type HostSearchBody = BasicSearchBody<"host", string[]>;
type KeywordSearchBody = BasicSearchBody<"keyword", string[]>;
type OrganizationSearchBody = BasicSearchBody<"organization", string[]>;
type PlaceSearchBody = BasicSearchBody<"place", string[]>;
type TimeRangeSearchBody = BasicSearchBody<"timeRange", ITimeRange[]>;

export interface ITimeRange {
  start: {
    day: number;
    time: string;
  };
  end: {
    day: number;
    time: string;
  };
}
