import mapValues from "@unction/mapvalues"
import {isEmpty} from "ramda"
import {reject} from "ramda"
import {validates} from "validus"

import asForgedAttribute from "./asForgedAttribute"

const removeEmpty = reject(isEmpty)

export default function abstraction (configuration: ConfigurationType): Function {
  const {attributes} = configuration
  const {validations = {}} = configuration
  const validateValidations = validates(validations)

  return function abstractionConfiguration (rawAttributes: RawAttributesType): AbstractionInstanceType {
    const data = mapValues(asForgedAttribute(rawAttributes))(attributes)
    const errors = removeEmpty(validateValidations(data))
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
