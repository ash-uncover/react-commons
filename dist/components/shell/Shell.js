"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Shell = void 0;
var _react = _interopRequireDefault(require("react"));
var _ComponentUtil = require("../ComponentUtil");
require("./Shell.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// ---------------------------------------------------
// Create Component Shell
// ---------------------------------------------------

var Shell = exports.Shell = function Shell(_ref) {
  var className = _ref.className,
    style = _ref.style,
    children = _ref.children;
  // Rendering //

  var classes = new _ComponentUtil.ClassBuilder(['ap-shell', className]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.className,
    style: style
  }, children);
};