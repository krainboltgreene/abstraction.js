import {forEachObjIndexed} from "ramda"
import {is} from "ramda"
import {isNil} from "ramda"
import {anyPass} from "ramda"
import {map} from "ramda"
import {any} from "ramda"
import {and} from "ramda"
import {isArrayLike} from "ramda"
import {compact} from "ramda-extra"

function correctlyTyped (as: Array<any> | any): Function {
  return function correctlyTypedAs (data: any): boolean {
    if (isArrayLike(as)) {
      return and(isNil(data), any(isNil, as)) || anyPass(map(is, compact(as)))(data)
    }

    return and(isNil(data), any(isNil, as)) || is(as, data)
  }
}

function applySchemas (raw: Object): Function {
  return function applySchemasSchema (abstraction: Object): Function {
    const application = forEachObjIndexed(function applySchema (configuration: Object, name: string) {
      const {as} = configuration
      const {source} = configuration
      const {coercion} = configuration
      const typed = correctlyTyped(as)
      const data = source(raw)
      const coerced = isNil(coercion) ? data : coercion(data)

      if (typed(coerced)) {
        abstraction[name] = coerced
      }

      throw new Error(`AttributeInvalidTypeError the attribute ${name} requires type(s) ${JSON.stringify(as)} but was given ${is(coerced)}`)
    })

    return function applySchemasSchemaAbstraction (schema: Object) {
      application(schema)
    }
  }
}

function applyVirtuals (virtual): Function {
  return function applyVirtualsVirtual (abstraction) {

  }
}

export default class Abstraction {
  constructor (raw: any) {
    applySchemas(raw)(this.constructor.schema)(this)
    applyVirtuals(this.constructor.virtuals)(this)
    applyValidations(this.constructor.validations)(this)
  }
}


// TODO: Instead of mutating, return a reduced object that can be assigned to this
