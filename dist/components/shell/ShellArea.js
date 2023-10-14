"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShellArea = void 0;
var _react = _interopRequireDefault(require("react"));
var _ = require("../..");
require("./ShellArea.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

var ShellArea = exports.ShellArea = function ShellArea(_ref) {
  var className = _ref.className,
    style = _ref.style,
    children = _ref.children;
  // Rendering //

  var classes = new _.ClassBuilder(['ap-shell-area', className]);
  return /*#__PURE__*/_react["default"].createElement(_.ShellElement, {
    className: classes.className,
    style: style
  }, children);
};