"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.through = exports.hasOne = exports.hasMany = exports.belongsTo = exports.abstract = undefined;

var _abstract = require("./abstract");

var _abstract2 = _interopRequireDefault(_abstract);

var _belongsTo = require("./belongsTo");

var _belongsTo2 = _interopRequireDefault(_belongsTo);

var _hasMany = require("./hasMany");

var _hasMany2 = _interopRequireDefault(_hasMany);

var _hasOne = require("./hasOne");

var _hasOne2 = _interopRequireDefault(_hasOne);

var _through = require("./through");

var _through2 = _interopRequireDefault(_through);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.abstract = _abstract2["default"];
exports.belongsTo = _belongsTo2["default"];
exports.hasMany = _hasMany2["default"];
exports.hasOne = _hasOne2["default"];
exports.through = _through2["default"];