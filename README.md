# abstraction

A way of modeling your business logic in a compact and compose-able way.

  - Completely promise-based
  - Does one job
  - Works with `knex`
  - Functions & Objects, that's it.


## using

Here we'll model an account, it's relationships, scopes, and where the data comes from:

``` javascript
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
```

abstract [forwards query functionality](/exmaple/server.js) to the underlying source library, like knex.

Since we always return common Javascript types it is [easy to use with other libraries like ramda's `map()` and react's `PropTypes`](/example/FullAccountList.jsx)

You can also use some of the extra modules for extended functionality:

  - [Validations][/example/extended/validations.js]
  - [Schemas][/example/extended/schema.js]
