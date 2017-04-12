type AttributeConfigurationType = {
  source: (rawAttributes: RawAttributesType) => any,
  coercion: (value: any) => any,
}
