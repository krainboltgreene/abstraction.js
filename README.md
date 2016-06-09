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
import {passNull} from "abstraction"
import {defaultIn} from "abstraction"
import {number} from "abstraction"
import {text} from "abstraction"
import {timestamp} from "abstraction"
import ... from "ramda"

const MINIMUM_AGE = 21

export default abstract({
  name: "accounts",
  // NOTE: `source` lets you write a function to get your values. It could be
  // a digging function like below, or a SQL query.
  source: path(["data", "attributes"]),
  // NOTE: `schema` enforce type coercion and filter values from the raw dataset.
  // If `invitedAt` was a raw dataset property, it won't be in `attributes` due
  // to it not being listed in schema.
  schema: {
    name: passNull(text),
    email: text,
    age: number,
    createdAt: defaultIn(new Date(), timestamp),
    updatedAt: defaultIn(new Date(), timestamp)
  },
  // NOTE: Virtual attributes are derived from the raw dataset.
  virtuals: {
    emailDomain ({email}) {
      return last(split("@", email))
    }
  },
  // NOTE: Validations receive the final attributes and should return true. the
  // key should be used as a slug to the correct message.
  validations: {
    emailMatchesPattern: pipe(prop("email"), contains("@")),
    oldEnough: pipe(prop("age"), lte(MINIMUM_AGE))
  }
})
```

Here's an example of modeling the attributes:

``` javascript
import {model} from "~/application/accounts"

const raw = {
  name: "Kurtis Rainbolt-Greene",
  email: "me@kurtisrainboltgreene.name"
}
console.log(model(raw))
// {
//   name: "accounts",
//   raw: {
//     name: "Kurtis Rainbolt-Greene",
//     email: "me@kurtisrainboltgreene.name"
//   },
//   errors: [],
//   attributes: {
//     name: "Kurtis Rainbolt-Greene",
//     email: "me@kurtisrainboltgreene.name",
//     createdAt: 2016-05-23T07:02:06.195Z,
//     createdAt: 2016-05-23T07:02:06.195Z
//   }
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
// {
//   name: "accounts",
//   raw: {
//     name: null,
//     email: "null"
//   },
//   errors: [
//     "emailMatchesPattern"
//   ],
//   attributes: {
//     name: "Kurtis Rainbolt-Greene",
//     email: "me@kurtisrainboltgreene.name",
//     createdAt: 2016-05-23T07:02:06.195Z,
//     createdAt: 2016-05-23T07:02:06.195Z
//   }
// }
```

Here's type coercion in action:

``` javascript
import {model} from "~/application/accounts"

const attributes = {
  name: "Kurtis Rainbolt-Greene",
  email: "me@kurtisrainboltgreene.name",
  createdAt: "2016/01/01"
}
console.log(model(attributes))
// {
//   name: "accounts",
//   raw: {
//     name: "Kurtis Rainbolt-Greene",
//     email: "me@kurtisrainboltgreene.name"
//   },
//   errors: [],
//   attributes: {
//     name: "Kurtis Rainbolt-Greene",
//     email: "me@kurtisrainboltgreene.name",
//     createdAt: 2016-01-01T08:00:00.000Z,
//     createdAt: 2016-05-23T07:02:06.195Z
//   }
// }
```
