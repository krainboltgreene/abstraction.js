import {abstract} from "abstraction"
import validation from "abstraction-validations"

export default abstract({
  name: "accounts",
  validations: {
    name: validation(({name}) => name.length >= 1)
  }
})
