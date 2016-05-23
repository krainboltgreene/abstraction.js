"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = build;

var _ramda = require("ramda");

const coerce = schema => (value, key) => schema[key](value);

function build(_ref) {
  let schema = _ref.schema;
  let attributes = _ref.attributes;

  return (0, _ramda.mapObjIndexed)(coerce(schema), attributes);
}