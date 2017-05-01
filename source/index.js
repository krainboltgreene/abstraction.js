import mapValues from "@unction/mapvalues"
import {isEmpty} from "ramda"
import {reject} from "ramda"
import {validates} from "validus"

import asForgedAttribute from "./asForgedAttribute"

export default function abstraction (configuration: ConfigurationType): Function {
  const {attributes} = configuration
  const {validations = {}} = configuration

  return function abstractionConfiguration (rawAttributes: RawAttributesType): AbstractionInstanceType {
    const errors = reject(isEmpty, validates(validations)(data))
    const data = mapValues(asForgedAttribute(rawAttributes))(attributes)
    const isValid = isEmpty(errors)

    return {
      ...data,
      __abstraction__: {
        errors,
        isValid,
        validations,
      }
    }
  }
}
