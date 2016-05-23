"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = json;
// {defaultTo} -> f() -> true | false | Error
function json() {
  let options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  const defaultTo = options.defaultTo;


  if (defaultTo) {
    return function () {
      let value = arguments.length <= 0 || arguments[0] === undefined ? defaultTo : arguments[0];
      return JSON.parse(value);
    };
  }

  return value => JSON.parse(value);
}