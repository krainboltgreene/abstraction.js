import {describe, it} from "mocha"
import {expect} from "chai"

import isNewRecord from "./index"

describe("isNewRecord()", () => {
  describe("when the record has a a createdAt and updatedAt that are the same", () => {
    const timestamp = new Date()
    const record = {
      createdAt: timestamp,
      updatedAt: timestamp
    }

    it("returns true", () => {
      expect(isNewRecord(record)).to.equal(true)
    })
  })

  describe("when the record has a a createdAt and updatedAt that are the different", () => {
    const record = {
      createdAt: new Date("2016/01/01"),
      updatedAt: new Date("2017/01/01")
    }

    it("returns false", () => {
      expect(isNewRecord(record)).to.equal(false)
    })
  })
})
