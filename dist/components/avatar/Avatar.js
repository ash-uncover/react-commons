"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AvatarSizes = exports.Avatar = void 0;
var _react = _interopRequireDefault(require("react"));
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _ComponentUtil = require("../ComponentUtil");
require("./Avatar.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// ---------------------------------------------------
// Constants
// ---------------------------------------------------

var AvatarSizes = exports.AvatarSizes = {
  XS: 'XS',
  S: 'S',
  M: 'M',
  L: 'L',
  XL: 'XL'
};

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

var Avatar = exports.Avatar = function Avatar(_ref) {
  var className = _ref.className,
    style = _ref.style,
    icon = _ref.icon,
    image = _ref.image,
    initials = _ref.initials,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? AvatarSizes.S : _ref$size,
    title = _ref.title,
    onClick = _ref.onClick;
  // Hooks //

  // Events //

  // Rendering //

  var classes = new _ComponentUtil.ClassBuilder(['ap-avatar', className]);
  classes.add("ap-avatar--".concat(size.toLowerCase()));
  if (onClick) {
    classes.add("ap-avatar--interactive");
  }
  var content = /*#__PURE__*/_react["default"].createElement("span", null);
  if (image) {
    classes.add("ap-avatar--image");
    content = /*#__PURE__*/_react["default"].createElement("img", {
      className: "ap-avatar__content",
      src: image
    });
  } else if (icon) {
    classes.add("ap-avatar--icon");
    content = /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
      className: "ap-avatar__content",
      icon: icon
    });
  } else if (initials) {
    classes.add("ap-avatar--initials");
    content = /*#__PURE__*/_react["default"].createElement("span", {
      className: "ap-avatar__content"
    }, initials.substring(0, 2).toUpperCase());
  } else {
    // Default to user icon
    classes.add("ap-avatar--icon");
    content = /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
      className: "ap-avatar__content",
      icon: _freeSolidSvgIcons.faUser
    });
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.className,
    style: style,
    title: title,
    onClick: onClick
  }, content);
};