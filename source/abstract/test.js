import {describe, it} from "mocha"
import {expect} from "chai"
import moment from "moment"
import {text} from "../schema"
import {timestamp} from "../schema"

import abstract from "./index"

describe("abstract()", () => {
  const definition = {
    name: "accounts",
    schema: {
      name: text(),
      email: text(),
      createdAt: timestamp(),
      updatedAt: timestamp()
    }
  }

  describe("build()", () => {
    const attributes = {
      name: "Kurtis Rainbolt-Greene",
      email: "me@kurtisrainboltgreene.name",
      createdAt: new Date(),
      updatedAt: new Date()
    }

    it("returns a record with raw attributes", () => {
      expect(abstract(definition)(attributes)).to.have.property("raw").that.deep.equal({
        name: "Kurtis Rainbolt-Greene",
        email: "me@kurtisrainboltgreene.name",
        createdAt: attributes.createdAt,
        updatedAt: attributes.updatedAt
      })
    })

    it("returns a record with coerced attributes", () => {
      expect(abstract(definition)(attributes)).to.have.property("attributes").that.deep.equal({
        name: "Kurtis Rainbolt-Greene",
        email: "me@kurtisrainboltgreene.name",
        createdAt: moment(attributes.createdAt),
        updatedAt: moment(attributes.updatedAt)
      })
    })
  })
})
