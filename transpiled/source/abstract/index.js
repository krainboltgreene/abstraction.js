"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = abstract;

var _ramda = require("ramda");

const coerce = schema => (value, key) => schema[key](value);

// {...} -> f()
function abstract(configuration) {
  const name = configuration.name;
  const schema = configuration.schema;


  return raw => {
    return {
      type: name,
      raw,
      attributes: (0, _ramda.mapObjIndexed)(coerce(schema), raw)
    };
  };
}