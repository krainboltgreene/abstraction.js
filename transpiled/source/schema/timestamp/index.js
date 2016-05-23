"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = timestamp;

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function timestamp(value) {
  return (0, _moment2["default"])(new Date(value));
}