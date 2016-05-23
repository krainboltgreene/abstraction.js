// {defaultTo} -> f() -> true | false | Error
export default function json (options = {}) {
  const {defaultTo} = options

  if (defaultTo) {
    return (value = defaultTo) => JSON.parse(value)
  }

  return (value) => JSON.parse(value)
}
