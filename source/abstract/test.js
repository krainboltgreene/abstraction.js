import {describe, it} from "mocha"
import {expect} from "chai"
import {last} from "ramda"
import {split} from "ramda"
import {path} from "ramda"
import {text} from "../schema"
import {defaultIn} from "../schema"
import {passNull} from "../schema"
import {number} from "../schema"

import abstract from "./index"

describe("abstract()", () => {
  const definition = {
    name: "accounts",
    source: path(["data", "attributes"]),
    schema: {
      name: passNull(text),
      email: text,
      currentCount: number,
      previousCount: defaultIn(0, number)
    },
    virtuals: {
      emailDomain ({email}) {
        return last(split("@", email))
      }
    }
  }
  const raw = {
    data: {
      attributes: {
        name: null,
        email: "me@kurtisrainboltgreene.name",
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
})
