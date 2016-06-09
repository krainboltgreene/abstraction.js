import {describe, it} from "mocha"
import {expect} from "chai"
import {last} from "ramda"
import {split} from "ramda"
import {path} from "ramda"
import {pipe} from "ramda"
import {prop} from "ramda"
import {contains} from "ramda"
import {lte} from "ramda"
import {text} from "../schema"
import {defaultIn} from "../schema"
import {ignoreNull} from "../schema"
import {number} from "../schema"

import abstract from "./index"

describe("abstract()", () => {
  const MINIMUM_AGE = 21
  const definition = {
    name: "accounts",
    source: path(["data", "attributes"]),
    schema: {
      name: ignoreNull(text),
      email: text,
      age: number,
      currentCount: number,
      previousCount: defaultIn(0, number)
    },
    virtuals: {
      emailDomain ({email}) {
        return last(split("@", email))
      }
    },
    validations: {
      emailMatchesPattern: pipe(prop("email"), contains("@")),
      oldEnough: pipe(prop("age"), lte(MINIMUM_AGE))
    }
  }
  const raw = {
    data: {
      attributes: {
        name: null,
        email: "me@kurtisrainboltgreene.name",
        age: 19,
        currentCount: "4",
        previousCount: null
      }
    }
  }

  it("returns a record with raw attributes", () => {
    expect(abstract(definition)(raw)).to.have.deep.property("raw.data.attributes.email", "me@kurtisrainboltgreene.name")
  })

  it("returns a record with coerced attributes", () => {
    expect(abstract(definition)(raw)).to.have.deep.property("attributes.currentCount", 4)
  })

  it("returns a record with defaulted attributes", () => {
    expect(abstract(definition)(raw)).to.have.deep.property("attributes.previousCount", 0)
  })

  it("returns a record with null attributes", () => {
    expect(abstract(definition)(raw)).to.have.deep.property("attributes.name", null)
  })

  it("returns a record with virtual attributes", () => {
    expect(abstract(definition)(raw)).to.have.deep.property("attributes.emailDomain", "kurtisrainboltgreene.name")
  })

  it("returns a record with an error field", () => {
    expect(abstract(definition)(raw)).to.have.deep.property("errors.0", "oldEnough")
  })
})
