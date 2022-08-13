"use strict";

const Fastify = require("fastify");
const mercurius = require("mercurius");

const fastify = Fastify({ logger: true });

const schema = `
  type Query {
    add(x: Int, y: Int): Int
  }
`;

const resolvers = {
  Query: {
    add: async (_, { x, y }) => x + y,
  },
};

fastify.register(mercurius, {
  schema,
  resolvers,
});

fastify.get("/", async function (_req, reply) {
  const query = "{ add(x: 2, y: 2) }";
  return reply.graphql(query);
});

fastify.listen({ port: 3000 }, (err) => {
  if (err) throw err;
  console.log(`server listening on ${fastify.server.address().port}`);
});
