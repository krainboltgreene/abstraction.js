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
import {schema} from "abstraction"
import moment from "moment"

export default abstract({
  name: "accounts",
  schema: {
    name: schema.text,
    email: schema.text,
    createdAt: schema.timestamp,
    updatedAt: schema.timestamp
  }
})
```

Here's a complex model (coercion + validation + scopes + queries + relationships):

``` javascript
import {abstract} from "abstraction"
import {relations} from "abstraction"
import {schema} from "abstraction"
import {validation} from "abstraction"
import moment from "moment"
import {postgresKnex} from "~/remote"

const MINIMUM_NAME_LENGTH = 1

export default abstract({
  name: "accounts",
  source: postgresKnex,
  schema: {
    name: schema.text,
    email: schema.stopNull(schema.text),
    createdAt: schema.defaultIn(schema.timestamp, new Date()),
    updatedAt: schema.defaultIn(schema.timestamp, new Date())
  },
  validations: {
    name: validation(({name}) => name.length >= MINIMUM_NAME_LENGTH)
  },
  scopes: {
    nameMatches: (partial) => ({where: ["name", "like", partial]})
  },
  relationships: {
    posts: ({id}) => relations.hasMany({
      name: "posts",
      foreignKey: ["authorId", id],
      countCache: true
    }),
    comments: ({id}) => relations.through({
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
// Error: email can't be null
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
