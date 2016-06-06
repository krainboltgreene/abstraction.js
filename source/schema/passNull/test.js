import {describe, it} from "mocha"
import {expect} from "chai"

import passNull from "./index"

const unknown = (raw) => raw

describe("schema/passNull()", () => {
  const coerce = passNull(unknown)

  context("if raw is null", () => {
    const raw = null

    it("returns null", () => {
      expect(coerce(raw)).to.equal(null)
    })
  })

  context("if raw is not null", () => {
    const raw = "x"

    it("returns the coerced value", () => {
      expect(coerce(raw)).to.equal("x")
    })
  })
})
