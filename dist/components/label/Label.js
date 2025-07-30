"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Label = void 0;
var _react = _interopRequireDefault(require("react"));
var _ComponentUtil = require("../ComponentUtil");
require("./Label.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// ---------------------------------------------------
// Constants
// ---------------------------------------------------

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

var Label = exports.Label = function Label(_ref) {
  var className = _ref.className,
    style = _ref.style,
    text = _ref.text,
    children = _ref.children;
  // Hooks //

  // Events //

  // Rendering //

  var classes = new _ComponentUtil.ClassBuilder(['ap-label', className]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.className,
    style: style
  }, children || text);
};