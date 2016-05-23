"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = timestamp;

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// {defaultTo} -> f() -> true | false | Error
function timestamp() {
  let options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  const defaultTo = options.defaultTo;


  if (defaultTo) {
    return function () {
      let value = arguments.length <= 0 || arguments[0] === undefined ? defaultTo : arguments[0];
      return (0, _moment2["default"])(new Date(value));
    };
  }

  return value => (0, _moment2["default"])(new Date(value));
}