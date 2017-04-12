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

Lets say you have some data from a server that you want to display to the user:

``` javascript
const incomingData = {
  id: "1",
  type: "accounts",
  attributes: {
    name: "Kurtis Rainbolt-Greene",
    age: "27",
    email: "kurtis@amazon.com",
    "created-at": "2013-02-04T10:35:24-08:00",
  }
}
```

The age is a string, the timestamp for created at is also a string, and created at isn't camel case. We can fix this:

``` javascript
const accountResource = abstraction({
  attributes: {
    id: {source: prop("id")},
    type: {source: prop("type")},
    attributes: {
      source: prop("attributes"),
      coerce: accountAttributes,
    }
  }
}
```

There's a lot happening here so lets break it down:

``` javascript
const accountResource = abstraction({
  attributes: {
    ...
  }
}
```

Every abstraction has a set of attributes. These are properties that'll be exposed on the returning abstract object.

Lets take the `id` and `type` attributes for a moment:

``` javascript
const accountResource = abstraction({
  attributes: {
    id: {source: prop("id")},
    type: {source: prop("type")},
  }
}
```

For these we're just defining a `source`. The `source` is a function that tells us how to get to our data for `id` and `type`. This is easy for us, so we'll just use `path()`. Now it's time to get a little more complicated with `attributes`.

``` javascript
const accountResource = abstraction({
  attributes: {
    id: {source: prop("id")},
    type: {source: prop("type")},
    attributes: {
      source: prop("attributes"),
      coerce: accountAttributes,
    },
  },
}
```

So here we're not only sourcing from the raw data, but also using a fun little `coerce` function. This function should take the data from source and convert it to what you need. In this case we're doing something really cool in that we're actually coercing the data into another abstraction!

``` javascript
const accountAttributes = abstraction({
  attributes: {
    username: {source: pipe(prop("email"), split("@"), head)},
    email: {source: prop("email")},
    name: {source: prop("name")},
    age: {
      source: prop("age"),
      coerce: (value) => parseInt(value, 10),
    },
    createdAt: {
      source: prop("created-at"),
      coerce: moment,
    },
  },
}
```

There's some interesting things going on here as well, specifically in `username`'s source and `createdAt`'s `coerce` function. Notice that there is no username on the raw data and is instead really a derived value. In addition, your final property name *doesn't have to be* the same as your raw property.

Finally we also give a built in validations logic:

``` javascript
const accountResource = abstraction({
  attributes: {
    id: {source: prop("id")},
    type: {source: prop("type")},
    attributes: {
      source: prop("attributes"),
      coerce: accountAttributes,
    }
  },
  validations: {
    id: {
      "Must have an id": propSatisfies(isPresent, "id"),
      "Must be an string": propSatisfies(isType("String"), "id"),
      "Must have characters": propSatisfies(isPopulated, "id"),
    },
    type: {
      "Must have an type": propSatisfies(isPresent, "type"),
      "Must be an string": propSatisfies(isType("String"), "type"),
      "Must have characters": propSatisfies(isPopulated, "type"),
    },
    attributes: {
      "Must have attributes": propSatisfies(isPresent, "attributes"),
      "Must have properties": propSatisfies(isPopulated, "attributes"),
      "Must be an Object": propSatisfies(isType("Object"), "attributes"),
    }
  }
})
```

Each validation is a group, so you have a group of `id` validations. The keys can be messages, like above, or slugs (regular property names). You can read more about it in the [validus.js documentation][https://github.com/krainboltgreene/validus.js].

Now time to talk about what you'll get back when you run this:

``` javascript
const account = accountResource(incomingData)
```

Here's the return value:

``` javascript
{
  id: "1",
  type: "accounts",
  attributes: {
    name: "Kurtis Rainbolt-Greene",
    age: 27,
    email: "kurtis@amazon.com",
    username: "kurtis",
    createdAt: 2013-02-04T18:35:24.000Z,
    __abstraction__: {
      ...
    }
  },
  __abstraction__: {
    ...
  }
}
```

Okay, wait, what's this `__abstraction__` nonsense? Well, that's where we keep the validations. Lets say `id` was missing, here's what you'd see from:

``` javascript
account._errors
```

It would return:

``` javascript
{
  id: [
    "Must have an id",
    "Must be an string",
    "Must have characters",
  ],
  ...
}
```

Isn't that great? You can also ask for individual validations using validus.js directly:

``` javascript
import {validate} from "validus"

validate(account._validations)("id")(account)
```

And that would return:

``` javascript
[
  "Must have an id",
  "Must be an string",
  "Must have characters",
]
```

Again, assuming `id` was missing. The initial validations are done when you pass in the data, and the `validate` is for later validation.


[BADGE_TRAVIS]: https://img.shields.io/travis/krainboltgreene/abstraction.js.svg?maxAge=2592000&style=flat-square
[BADGE_VERSION]: https://img.shields.io/npm/v/abstraction.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/krainboltgreene/abstraction.js.svg?maxAge=2592000&style=flat-square
