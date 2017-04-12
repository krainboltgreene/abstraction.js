import {identity} from "ramda"

export default function asForgedAttribute (rawAttributes: RawAttributesType): Function {
  return function asForgedAttributeRawAttributes (attributeConfiguration: AttributeConfigurationType): ForgedAttributeType {
    const {source} = attributeConfiguration
    const {coerce = identity} = attributeConfiguration

    return coerce(source(rawAttributes))
  }
}
