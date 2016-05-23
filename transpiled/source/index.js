"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _abstract = require("./abstract");

Object.defineProperty(exports, "abstract", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_abstract)["default"];
  }
});

var _isPersisted = require("./isPersisted");

Object.defineProperty(exports, "isPersisted", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isPersisted)["default"];
  }
});

var _isNewRecord = require("./isNewRecord");

Object.defineProperty(exports, "isNewRecord", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isNewRecord)["default"];
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }