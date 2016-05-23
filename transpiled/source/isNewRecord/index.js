"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isNewRecord;

var _ramda = require("ramda");

// {created, updated, n} -> true | false
function isNewRecord(record) {
  return (0, _ramda.pipe)((0, _ramda.props)(["createdAt", "updatedAt"]), (0, _ramda.apply)(_ramda.equals))(record);
}