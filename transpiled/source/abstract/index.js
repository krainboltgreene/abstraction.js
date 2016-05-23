"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

exports["default"] = abstract;

var _query2 = require("./query");

var _query3 = _interopRequireDefault(_query2);

var _create2 = require("./create");

var _create3 = _interopRequireDefault(_create2);

var _build2 = require("./build");

var _build3 = _interopRequireDefault(_build2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// {...} -> f()
function abstract(configuration) {
  const name = configuration.name;
  const source = configuration.source;
  const schema = configuration.schema;
  const relationships = configuration.relationships;
  const scopes = configuration.scopes;


  const argumentsForQuery = {
    name,
    source,
    schema,
    scopes,
    relationships
  };
  const argumentsForNew = {
    name,
    source,
    schema,
    relationships
  };

  return (0, _extends3["default"])({}, configuration, {
    query: conditions => (0, _query3["default"])((0, _extends3["default"])({}, argumentsForQuery, { conditions })),
    create: attributes => (0, _create3["default"])((0, _extends3["default"])({}, argumentsForNew, { attributes })),
    build: attributes => (0, _build3["default"])((0, _extends3["default"])({}, argumentsForNew, { attributes }))
  });
}