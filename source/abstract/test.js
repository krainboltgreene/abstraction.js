import {describe, it} from "mocha"
import {expect} from "chai"
import moment from "moment"
import {text} from "../schema"
import {timestamp} from "../schema"

import abstract from "./index"

describe("abstract()", () => {
  const definition = {
    name: "accounts",
    source: {},
    schema: {
      name: text,
      email: text,
      createdAt: timestamp,
      updatedAt: timestamp
    },
    scopes: {
      nameMatches: (partial) => {
        return {
          where: ["name", "like", partial]
        }
      }
    },
    relationships: {}
  }

  it("returns a model defintion with the model's name", () => {
    expect(abstract(definition)).to.have.property("name", "accounts")
  })

  it("returns a model defintion with the model's schema", () => {
    expect(abstract(definition)).to.have.property("schema").that.deep.equals({
      name: text,
      email: text,
      createdAt: timestamp,
      updatedAt: timestamp
    })
  })

  describe("build()", () => {
    const attributes = {
      name: "Kurtis Rainbolt-Greene",
      email: "me@kurtisrainboltgreene.name",
      createdAt: new Date(),
      updatedAt: new Date()
    }

    expect(abstract(definition).build(attributes)).to.deep.equal({
      name: "Kurtis Rainbolt-Greene",
      email: "me@kurtisrainboltgreene.name",
      createdAt: moment(attributes.createdAt),
      updatedAt: moment(attributes.updatedAt)
    })
  })
})
