"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isPersisted;

var _ramda = require("ramda");

// {id, n} -> true | false
function isPersisted(record) {
  return (0, _ramda.pipe)((0, _ramda.prop)("id"), _ramda.isNil, _ramda.not)(record);
}