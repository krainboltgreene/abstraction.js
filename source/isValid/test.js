import {describe, it} from "mocha"
import {expect} from "chai"

import isValid from "./index"

describe("isValid()", () => {
  describe("when the record has errors", () => {
    const record = {
      __abstraction__: {
        errors: () => ["a"]
      }
    }

    it("returns false", () => {
      expect(isValid(record)).to.equal(false)
    })
  })

  describe("when the record has no errors", () => {
    const record = {
      __abstraction__: {
        errors: () => []
      }
    }

    it("returns true", () => {
      expect(isValid(record)).to.equal(true)
    })
  })
})
