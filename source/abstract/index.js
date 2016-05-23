import query from "./query"
import create from "./create"
import build from "./build"

// {...} -> f()
export default function abstract (configuration) {
  const {name} = configuration
  const {source} = configuration
  const {schema} = configuration
  const {relationships} = configuration
  const {scopes} = configuration

  const argumentsForQuery = {
    name,
    source,
    schema,
    scopes,
    relationships
  }
  const argumentsForNew = {
    name,
    source,
    schema,
    relationships
  }

  return {
    ...configuration,
    query: (conditions) => query({...argumentsForQuery, conditions}),
    create: (attributes) => create({...argumentsForNew, attributes}),
    build: (attributes) => build({...argumentsForNew, attributes})
  }
}
