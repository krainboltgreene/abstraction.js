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
import {passNull} from "abstraction"
import {defaultIn} from "abstraction"
import {text} from "abstraction"
import {timestamp} from "abstraction"
import {validation} from "abstraction"
import {path} from "ramda"
import {last} from "ramda"
import {split} from "ramda"
import moment from "moment"

const MINIMUM_NAME_LENGTH = 1

export default abstract({
  name: "accounts",
  source: path(["data", "attributes"]),
  schema: {
    name: passNull(text),
    email: text,
    createdAt: defaultIn(new Date(), timestamp),
    updatedAt: defaultIn(new Date(), timestamp)
  },
  virtuals: {
    emailDomain ({email}) {
      return last(split("@", email))
    }
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
