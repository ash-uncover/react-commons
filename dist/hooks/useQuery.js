"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useQuery = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouter = require("react-router");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var useQuery = exports.useQuery = function useQuery() {
  var _useLocation = (0, _reactRouter.useLocation)(),
    search = _useLocation.search;
  return _react["default"].useMemo(function () {
    return new URLSearchParams(search);
  }, [search]);
};