"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = boolean;
// {defaultTo, nullAllowed} -> f() -> true | false | Error
function boolean() {
  let options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  const defaultTo = options.defaultTo;


  if (defaultTo) {
    return function () {
      let value = arguments.length <= 0 || arguments[0] === undefined ? defaultTo : arguments[0];
      return Boolean(value);
    };
  }

  return value => Boolean(value);
}