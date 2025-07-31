"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePrevious = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var usePrevious = exports.usePrevious = function usePrevious(value) {
  var ref = _react["default"].useRef(null);
  _react["default"].useEffect(function () {
    ref.current = value;
  }, [value]);
  return ref.current;
};