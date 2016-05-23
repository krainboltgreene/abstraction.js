import moment from "moment"

// {defaultTo} -> f() -> true | false | Error
export default function timestamp (options = {}) {
  const {defaultTo} = options

  if (defaultTo) {
    return (value = defaultTo) => moment(new Date(value))
  }

  return (value) => moment(new Date(value))
}
