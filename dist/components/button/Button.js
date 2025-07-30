"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _ComponentUtil = require("../ComponentUtil");
require("./Button.css");
var _ButtonSemantic = require("./ButtonSemantic");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Button = exports.Button = function Button(_ref) {
  var className = _ref.className,
    style = _ref.style,
    disabled = _ref.disabled,
    icon = _ref.icon,
    iconEnd = _ref.iconEnd,
    _ref$semantic = _ref.semantic,
    semantic = _ref$semantic === void 0 ? _ButtonSemantic.ButtonSemantics.DEFAULT : _ref$semantic,
    text = _ref.text,
    title = _ref.title,
    type = _ref.type,
    onClick = _ref.onClick,
    children = _ref.children;
  // Hooks //

  // Events //

  // Rendering //

  var classes = new _ComponentUtil.ClassBuilder(['ap-button', className]);
  classes.add("ap-button--".concat(semantic.toLowerCase()));
  if (!children && !text && (!icon && iconEnd || icon && !iconEnd)) {
    classes.add('ap-button--icon-only');
  }
  return /*#__PURE__*/_react["default"].createElement("button", {
    className: classes.className,
    disabled: disabled,
    style: style,
    title: title,
    type: type,
    onClick: onClick
  }, icon ? /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    className: "ap-button__icon-start",
    icon: icon
  }) : null, text, children, iconEnd ? /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    className: "ap-button__icon-end",
    icon: iconEnd
  }) : null);
};