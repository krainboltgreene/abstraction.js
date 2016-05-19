import {abstract} from "abstraction"
import {hasMany} from "abstraction"
import {through} from "abstraction"
import {postgresKnex} from "~/remote"

export default abstract({
  name: "accounts",
  source: postgresKnex,
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
