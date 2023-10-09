"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShellMainArea = void 0;
var _react = _interopRequireDefault(require("react"));
var _ComponentUtil = require("../ComponentUtil");
var _Title = require("../title/Title");
require("./ShellMainArea.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ShellMainArea = exports.ShellMainArea = function ShellMainArea(_ref) {
  var className = _ref.className,
    style = _ref.style,
    title = _ref.title,
    children = _ref.children;
  // Rendering //

  var classes = new _ComponentUtil.ClassBuilder(['ap-shell-main-area', className]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.className,
    style: style
  }, title ? /*#__PURE__*/_react["default"].createElement(_Title.Title, {
    level: _Title.TitleLevels.H1
  }, title) : null, children);
};