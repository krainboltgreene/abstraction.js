# abstraction

A way of modeling your business logic or data structures in a compact and compose-able way.

  - Does one job
  - Functions, Records, and Arrays, that's it.
  - Works on multiple layers: ODM/ORM, Presenter, Serializer, Deserializer, Decorator, etc.

![Version][BADGE_VERSION]
![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]


## using

Features:

  - Property filtering
  - Type coercion
  - Validations
  - Virtual attributes
  - Scoping

Here's a simple abstraction:

``` javascript
import {abstract} from "abstraction"
import {text} from "abstraction"
import {timestamp} from "abstraction"

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

Here's a complex model (coercion + validation + source + virtuals):

``` javascript
import {abstract} from "abstraction"
import {ignoreNull} from "abstraction"
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
    name: ignoreNull(text),
    email: text,
    age: number,
    createdAt: defaultIn(new Date(), timestamp),
    updatedAt: defaultIn(new Date(), timestamp)
  },
  // NOTE: Virtual attributes are derived from the coerced dataset.
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

[BADGE_TRAVIS]: https://img.shields.io/travis/krainboltgreene/abstraction.js.svg?maxAge=2592000&style=flat-square
[BADGE_VERSION]: https://img.shields.io/npm/v/abstraction.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/krainboltgreene/abstraction.js.svg?maxAge=2592000&style=flat-square
