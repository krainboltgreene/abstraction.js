/* eslint-disable flowtype/require-parameter-type, flowtype/require-return-type, no-magic-numbers */
import {test} from "tap"
import {path} from "ramda"
import {prop} from "ramda"

import asForgedAttribute from "./"

const rawAttributes = {
  name: {
    first: "Kurtis",
    full: "Kurtis Rainbolt-Greene",
    last: "Rainbolt-Greene",
  },
  age: "27",
}

test(({equal, end}) => {
  const attributeConfiguration = {source: path(["name", "full"])}

  equal(
    asForgedAttribute(rawAttributes)(attributeConfiguration),
    "Kurtis Rainbolt-Greene"
  )
  end()
})

test(({equal, end}) => {
  const attributeConfiguration = {
    source: prop("age"),
    coerce: (value) => parseInt(value, 10),
  }

  equal(
    asForgedAttribute(rawAttributes)(attributeConfiguration),
    27
  )
  end()
})
