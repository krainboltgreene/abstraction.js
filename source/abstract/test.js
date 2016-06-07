import {describe, it} from "mocha"
import {expect} from "chai"
import {last} from "ramda"
import {split} from "ramda"
import {text} from "../schema"
import {number} from "../schema"

import abstract from "./index"

describe("abstract()", () => {
  const definition = {
    name: "accounts",
    schema: {
      name: text,
      email: text,
      count: number
    },
    virtuals: {
      emailDomain ({email}) {
        return last(split("@", email))
      }
    }
  }
  const attributes = {
    name: "Kurtis Rainbolt-Greene",
    email: "me@kurtisrainboltgreene.name",
    count: "4"
  }

  it("returns a record with raw attributes", () => {
    expect(abstract(definition)(attributes)).to.have.deep.property("raw.name", "Kurtis Rainbolt-Greene")
  })

  it("returns a record with coerced attributes", () => {
    expect(abstract(definition)(attributes)).to.have.deep.property("attributes.count", 4)
  })

  it("returns a record with virtual attributes", () => {
    expect(abstract(definition)(attributes)).to.have.deep.property("attributes.emailDomain", "kurtisrainboltgreene.name")
  })
})
