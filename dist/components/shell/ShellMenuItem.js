"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShellMenuItem = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _ComponentUtil = require("../ComponentUtil");
require("./ShellMenuItem.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// ---------------------------------------------------
// Constants
// ---------------------------------------------------

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

var ShellMenuItem = exports.ShellMenuItem = function ShellMenuItem(_ref) {
  var className = _ref.className,
    style = _ref.style,
    expanded = _ref.expanded,
    icon = _ref.icon,
    selected = _ref.selected,
    text = _ref.text,
    to = _ref.to;
  // Hooks //

  // Events //

  // Rendering //

  var classes = new _ComponentUtil.ClassBuilder(['ap-shell-menu-item', className]);
  if (expanded) {
    classes.add('ap-shell-menu-item--expanded');
  } else {
    classes.add('ap-shell-menu-item--collapsed');
  }
  if (selected) {
    classes.add('ap-shell-menu-item--selected');
  }
  return /*#__PURE__*/_react["default"].createElement(_reactRouterDom.NavLink, {
    className: classes.className,
    style: style,
    to: to
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "ap-shell-menu-item__icon"
  }, icon ? /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: icon
  }) : null), /*#__PURE__*/_react["default"].createElement("span", {
    className: "ap-shell-menu-item__text"
  }, text));
};