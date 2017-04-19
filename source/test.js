/* eslint-disable flowtype/require-parameter-type, flowtype/require-return-type, no-magic-numbers */
import {test} from "tap"
import {prop} from "ramda"
import {propSatisfies} from "ramda"
import {both} from "ramda"
import {lt} from "ramda"
import {type} from "ramda"
import {pipe} from "ramda"
import {split} from "ramda"
import {head} from "ramda"
import isPresent from "@unction/isPresent"
import isPopulated from "@unction/isPopulated"
import endsWith from "@unction/endsWith"
import lacksText from "@unction/lacksText"

import abstraction from "./"

const isType = (signature: string) => (value: any) => type(value) === signature

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
      coerce: (value) => new Date(value),
    },
  },
  validations: {
    email: {
      presenceRequired: propSatisfies(isPresent, "email"),
      stringRequired: propSatisfies(isType("String"), "age"),
      googleEmailRequired: propSatisfies(both(isPopulated, endsWith("@gmail.com")), "email"),
      noSuffixUsername: propSatisfies(both(isPopulated, lacksText("+")), "email"),
    },
    name: {
      presenceRequired: propSatisfies(isPresent, "name"),
      stringRequired: propSatisfies(isType("String"), "age"),
    },
    age: {
      presenceRequired: propSatisfies(isPresent, "age"),
      numberRequired: propSatisfies(isType("Number"), "age"),
      olderThanMaximumAge: propSatisfies(both(isPresent, lt(30)), "age"),
    }
  }
})
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
      presenceRequired: propSatisfies(isPresent, "id"),
      stringType: propSatisfies(isType("String"), "id"),
      bePopulated: propSatisfies(both(isPresent, isPopulated), "id"),
    },
    type: {
      presenceRequired: propSatisfies(isPresent, "type"),
      stringType: propSatisfies(isType("String"), "type"),
      bePopulated: propSatisfies(both(isPresent, isPopulated), "type"),
    },
    attributes: {
      presenceRequired: propSatisfies(isPresent, "attributes"),
      objectType: propSatisfies(isType("Object"), "attributes"),
      bePopulated: propSatisfies(both(isPresent, isPopulated), "attributes"),
    }
  }
})

test(({include, end}) => {
  const raw = {
    id: "1",
    type: "accounts",
    attributes: {
      "name": "Kurtis Rainbolt-Greene",
      "age": "27",
      "email": "kurtis@amazon.com",
      "created-at": "2013-02-04T10:35:24-08:00",
    }
  }

  include(
    accountResource(raw),
    {
      id: "1",
      type: "accounts",
      attributes: {
        username: "kurtis",
        email: "kurtis@amazon.com",
        name: "Kurtis Rainbolt-Greene",
        age: 27,
        createdAt: new Date("2013-02-04T10:35:24-08:00"),
      },
    }
  )
  end()
})
