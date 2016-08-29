import {keys} from "ramda"
import {merge} from "ramda"
import {identity} from "ramda"
import {reject} from "ramda"
import {isNil} from "ramda"
import {type} from "ramda"

import dataWithCoercions from "./dataWithCoercions"
import dataWithVirtuals from "./dataWithVirtuals"

const applicate = (...argument) => (ƒunction) => ƒunction(...argument)

// {...} -> f()
export default function abstract (configuration) {
  const {name} = configuration
  const {source = identity} = configuration
  const {schema = {}} = configuration
  const {virtuals = {}} = configuration
  const {validations = []} = configuration

  if (isNil(name)) {
    throw new Error("No name defined for this abstraction")
  }

  return (raw) => {
    if (type(raw) !== "Object") {
      throw new Error(`The incoming value was supposed to be an Object for the abstraction ${name}, it was actually ${type(raw)}`)
    }

    const data = source(raw)

    if (type(data) !== "Object") {
      throw new Error(`The source function was supposed to return an Object for the abstraction ${name}, it was actually ${type(data)}`)
    }

    const coercedAttributes = dataWithCoercions([schema, data])

    if (type(coercedAttributes) !== "Object") {
      throw new Error(`The coerced attributes mapping was supposed to return an Object for the abstraction ${name}, it was actually ${type(coercedAttributes)}`)
    }

    const virtualizedAttributes = dataWithVirtuals([virtuals, data])

    if (type(virtualizedAttributes) !== "Object") {
      throw new Error(`The virtualized attributes mapping was supposed to return an Object for the abstraction ${name}, it was actually ${type(virtualizedAttributes)}`)
    }

    const attributes = merge(coercedAttributes, virtualizedAttributes)

    if (type(attributes) !== "Object") {
      throw new Error(`The merging of coerced and virtualized attributes was supposed to return an Object for the abstraction ${name}, it was actually ${type(attributes)}`)
    }

    const errors = keys(reject(applicate(attributes), validations))

    return {
      name,
      raw,
      errors,
      attributes
    }
  }
}
