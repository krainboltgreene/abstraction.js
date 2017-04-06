# abstraction

A way of modeling your business logic or data structures in a compact and compose-able way.

  - Does one job
  - Functions, Records, and Arrays, that's it.
  - Works for many uses: ODM/ORM, Presenter, Serializer, Deserializer, Decorator, etc.

![Version][BADGE_VERSION]
![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]


## using

Lets say you want to ensure the data your user enters is correct before going to the server:

``` javascript
export default class Account extends Abstract {
  static schema = {
    id: {
      type: String,
      source: prop("id")
    },
    attributes: {
      type: AccountAttributes,
      source: prop("attributes"),
      coerce: AccountAttributes,
    }
  }
}
```


``` javascript
export default class AccountAttributes extends Abstract {
  static schema = {
    name: {
      as: [String, null],
      source: prop("name"),
    },
    email: {
      as: String,
      source: prop("email"),
    },
    age: {
      as: Number,
      source: prop("age"),
    },
    createdAt: {
      as: Date,
      source: prop("created-at"),
      coercion: moment,
    },
    updatedAt: {
      as: Date,
      source: prop("updated-at"),
      coercion: moment,
    },
  }

  static virtual = {
    emailDomain: pipe(prop("email"), split("@"), last)
  }

  static validations = {
    emailMatchesPattern: propSatisfies(contains("@"), "email")),
    oldEnough: propSatisfies(lte(MINIMUM_AGE), "age")),
  }
}
```


Here's a simple abstraction:

``` javascript
import {abstract} from "abstraction"
import {text} from "abstraction"
import moment from "moment"

export default abstract({
  name: "accounts",
  schema: {
    name: text,
    email: text,
    createdAt: moment,
    updatedAt: moment
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
import moment from "moment"
import {propSatisfies} from "ramda"
import {prop} from "ramda"
import {pipe} from "ramda"
import {split} from "ramda"
import {last} from "ramda"
import {lte} from "ramda"
import {path} from "ramda"

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
    createdAt: defaultIn(new Date(), moment),
    updatedAt: defaultIn(new Date(), moment)
  },
  // NOTE: Virtual attributes are derived from the coerced dataset.
  virtuals: {
    emailDomain: pipe(prop("email"), split("@"), last)
  },
  // NOTE: Validations receive the final attributes and should return true. the
  // key should be used as a slug to the correct message.
  validations: {
    emailMatchesPattern: propSatisfies(contains("@"), "email")),
    oldEnough: propSatisfies(lte(MINIMUM_AGE), "age"))
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
//   name: "Kurtis Rainbolt-Greene",
//   email: "me@kurtisrainboltgreene.name",
//   createdAt: 2016-05-23T07:02:06.195Z,
//   updatedAt: 2016-05-23T07:02:06.195Z,
//   __abstraction__: {
//     name: "accounts",
//     errors: Function,
//     raw: {
//       name: "Kurtis Rainbolt-Greene",
//       email: "me@kurtisrainboltgreene.name"
//     }
//   }
// }
```

Here's validation:

``` javascript
import {model} from "~/application/accounts"

const raw = {
  name: null,
  email: null
}
console.log(model(raw)).errors()
// ["emailMatchesPattern"]
```

Here's type coercion in action:

``` javascript
import {model} from "~/application/accounts"

const raw = {
  name: "Kurtis Rainbolt-Greene",
  email: "me@kurtisrainboltgreene.name",
  createdAt: "2016/01/01"
}
console.log(model(raw))
// {
//   name: "Kurtis Rainbolt-Greene",
//   email: "me@kurtisrainboltgreene.name",
//   createdAt: 2016-01-01T00:00:00.000Z,
//   updatedAt: 2016-05-23T07:02:06.195Z,
//   __abstraction__: {
//     name: "accounts",
//     errors: Function,
//     raw: {
//       name: "Kurtis Rainbolt-Greene",
//       email: "me@kurtisrainboltgreene.name"
//     }
//   }
// }
```

[BADGE_TRAVIS]: https://img.shields.io/travis/krainboltgreene/abstraction.js.svg?maxAge=2592000&style=flat-square
[BADGE_VERSION]: https://img.shields.io/npm/v/abstraction.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/krainboltgreene/abstraction.js.svg?maxAge=2592000&style=flat-square
