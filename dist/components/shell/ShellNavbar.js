"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShellNavbar = void 0;
var _react = _interopRequireDefault(require("react"));
var _ = require("../..");
require("./ShellNavbar.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// ---------------------------------------------------
// Create Component ShellNavbar
// ---------------------------------------------------

var ShellNavbar = exports.ShellNavbar = function ShellNavbar(_ref) {
  var className = _ref.className,
    style = _ref.style,
    appLogo = _ref.appLogo,
    appTitle = _ref.appTitle,
    children = _ref.children;
  // Hooks //

  // Rendering //

  var classes = new _.ClassBuilder(['ap-shell-navbar', className]);
  return /*#__PURE__*/_react["default"].createElement(_.ShellElement, {
    className: classes.className,
    style: style
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ap-shell-navbar--left"
  }, appLogo ? /*#__PURE__*/_react["default"].createElement("span", null, "LOGO") : null, /*#__PURE__*/_react["default"].createElement(_.Title, {
    className: "ap-shell-navbar__title",
    level: _.TitleLevels.H3
  }, appTitle)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "ap-shell-navbar--right"
  }, children));
};