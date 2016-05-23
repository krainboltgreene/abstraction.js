// {defaultTo} -> f() -> true | false | Error
export default function date (options = {}) {
  const {defaultTo} = options

  if (defaultTo) {
    return (value = defaultTo) => new Date(value)
  }

  return (value) => new Date(value)
}
