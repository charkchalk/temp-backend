import Fastify from "fastify";
import fastifyPrismaClient from "fastify-prisma-client";

import IndexRoute from "./controllers/index";
import OrganizationRoute from "./controllers/organization";

const fastify = Fastify({ logger: true });

void fastify.register(fastifyPrismaClient);

void fastify.register(IndexRoute, { prefix: "/" });
void fastify.register(OrganizationRoute, { prefix: "/organizations" });

fastify.listen({ port: 3000 }, err => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`
  🚀 Server ready at: http://localhost:3000
  ⭐️ See sample requests: http://pris.ly/e/ts/rest-fastify#3-using-the-rest-api`);
});
