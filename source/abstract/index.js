import {keys} from "ramda"
import {merge} from "ramda"
import {identity} from "ramda"
import {reject} from "ramda"
import {isNil} from "ramda"

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
    if (isNil(raw)) {
      throw new Error(`No raw data provided to the abstraction ${name}`)
    }

    const data = source(raw)

    if (isNil(data)) {
      throw new Error(`No sourced data was derived from the source function for the abstraction ${name}`)
    }

    const coercedAttributes = dataWithCoercions([schema, data])
    const virtualizedAttributes = dataWithVirtuals([virtuals, data])
    const attributes = merge(coercedAttributes, virtualizedAttributes)
    const errors = keys(reject(applicate(attributes), validations))

    return {
      name,
      raw,
      errors,
      attributes
    }
  }
}
