import Fastify from "fastify";
import fastifyPrismaClient from "fastify-prisma-client";

import DateRangeRoute from "./controllers/date-range";
import IndexRoute from "./controllers/index";
import OrganizationRoute from "./controllers/organization";
import PersonRoute from "./controllers/person";
import PlaceRoute from "./controllers/place";
import TagRoute from "./controllers/tag";
import TimeRangeRoute from "./controllers/time-range";

const fastify = Fastify({ logger: true });

void fastify.register(fastifyPrismaClient);

void fastify.register(IndexRoute, { prefix: "/" });
void fastify.register(OrganizationRoute, { prefix: "/organizations" });
void fastify.register(TagRoute, { prefix: "/tags" });
void fastify.register(PlaceRoute, { prefix: "/places" });
void fastify.register(PersonRoute, { prefix: "/persons" });
void fastify.register(DateRangeRoute, { prefix: "/range/date" });
void fastify.register(TimeRangeRoute, { prefix: "/range/time" });

fastify.listen({ port: 3000 }, err => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`
  🚀 Server ready at: http://localhost:3000
  ⭐️ See sample requests: http://pris.ly/e/ts/rest-fastify#3-using-the-rest-api`);
});
