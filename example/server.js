import {model} from "~/application/account"
import {serializer} from "~/application/account"

export default (server) => {
  server.route({
    method: "GET",
    path: "/v1/accounts",
    handler (request, reply) {
      // NOTE: Here you see we're getting all account models
      return reply(
        serializer(model())
      )
    }
  })

  server.route({
    method: "GET",
    path: "/v1/accounts",
    query: {
      filter: {
        active: true
      }
    },
    handler (request, reply) {
      // NOTE: We can use knex.js's querying directly in this function
      return reply(
        model({
          where: {active: request.query.filter.active},
          orderBy: "createdAt"
        })
      )
    }
  })

  server.route({
    method: "GET",
    path: "/v1/accounts",
    query: {
      search: {
        name: true
      }
    },
    handler (request, reply) {
      // NOTE: We an even use functions defined on the model, each one adding to the last
      return reply(
        model({
          scopes: [
            {nameLike: request.query.search.name},
            "activated"
          ]
        })
      )
    }
  })
}
