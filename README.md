# abstraction

A way of modeling your business logic in a compact and compose-able way.

  - Completely promise-based
  - Does one job
  - Works with `knex`
  - Functions & Objects, that's it.


## using

Here's a simple abstraction:

``` javascript
import {abstract} from "abstraction"
import {text} from "abstraction"
import {timestamp} from "abstraction"
import moment from "moment"

export default abstract({
  name: "accounts",
  schema: {
    name: text,
    email: text,
    createdAt: timestamp,
    updatedAt: timestamp
  }
})
```

Here's a complex model (coercion + validation + scopes + queries + relationships):

``` javascript
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
    createdAt: timestamp({defaultTo: moment}),
    updatedAt: timestamp({defaultTo: moment})
  },
  validations: {
    name: validation(({name}) => name.length >= MINIMUM_NAME_LENGTH)
  },
  scopes: {
    nameMatches: (partial) => ({where: ["name", "like", partial]})
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

Here's an example of modeling the attributes:

``` javascript
import {model} from "~/application/accounts"

const attributes = {
  name: "Kurtis Rainbolt-Greene",
  email: "me@kurtisrainboltgreene.name"
}
console.log(model(attributes))
// {
//   name: "Kurtis Rainbolt-Greene",
//   email: "me@kurtisrainboltgreene.name",
//   createdAt: 2016-05-23T07:02:06.195Z,
//   createdAt: 2016-05-23T07:02:06.195Z
// }
```

Here's validation:

``` javascript
import {model} from "~/application/accounts"

const attributes = {
  name: null,
  email: null
}
console.log(model(attributes))
// Error: name can't be null
```

Here's coercion:

``` javascript
import {model} from "~/application/accounts"

const attributes = {
  name: "Kurtis Rainbolt-Greene",
  email: "me@kurtisrainboltgreene.name",
  createdAt: "2016/01/01"
}
console.log(model(attributes))
// {
//   name: "Kurtis Rainbolt-Greene",
//   email: "me@kurtisrainboltgreene.name",
//   createdAt: 2016-01-01T08:00:00.000Z,
//   createdAt: 2016-05-23T07:02:06.195Z
// }
```
