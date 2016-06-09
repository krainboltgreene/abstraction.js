import {describe, it} from "mocha"
import {expect} from "chai"

import isPersisted from "./index"

describe("isPersisted()", () => {
  describe("when the record has a id", () => {
    const record = {
      attributes: {
        id: 1
      }
    }

    it("returns true", () => {
      expect(isPersisted(record)).to.equal(true)
    })
  })

  describe("when the record id property is null", () => {
    const record = {
      attributes: {
        id: null
      }
    }

    it("returns false", () => {
      expect(isPersisted(record)).to.equal(false)
    })
  })

  describe("when the record id property is undefined", () => {
    const record = {}

    it("returns false", () => {
      expect(isPersisted(record)).to.equal(false)
    })
  })
})
