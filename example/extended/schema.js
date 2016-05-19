import {abstract} from "abstraction"
import {text} from "abstraction-schema"
import {timestamp} from "abstraction-schema"
import {index} from "abstraction-schema"

export default abstract({
  name: "accounts",
  schema: {
    fields: {
      name: text({nullAllowed: false}),
      email: text({nullAllowed: false, unique: true}),
      createdAt: timestamp({index: true})
    },
    indexes: [
      index({name: "indexOnNameEmail", nullFirst: true})
    ]
  }
})
