import {abstract} from "abstraction"
import {hasMany} from "abstraction"
import {through} from "abstraction"
import {text} from "abstraction"
import {timestamp} from "abstraction"
import {validation} from "abstraction"
import moment from "moment"
import {postgresKnex} from "~/remote"

const MINIMUM_NAME_LENGTH = 1

export default abstract({
  name: "accounts",
  source: postgresKnex,
  schema: {
    name: text({nullAllowed: false}),
    email: text({nullAllowed: false}),
    createdAt: timestamp({defaultTo: moment})
  },
  validations: {
    name: validation(({name}) => name.length >= MINIMUM_NAME_LENGTH)
  },
  scopes: {
    nameMatches: (partial) => {
      return {
        where: ["name", "like", partial]
      }
    }
  },
  relationships: {
    posts: ({id}) => hasMany({
      name: "posts",
      foreignKey: ["authorId", id],
      countCache: true
    }),
    comments: ({id}) => through({
      source: "posts",
      foreignKey: ["authorId", id]
    })
  }
})
