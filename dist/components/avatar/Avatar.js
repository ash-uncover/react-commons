"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Avatar = void 0;
var _react = _interopRequireDefault(require("react"));
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _ = require("../..");
require("./Avatar.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
//

// CSS

// #region Declaration

// #endregion

// #region Component
var Avatar = exports.Avatar = function Avatar(_ref) {
  var className = _ref.className,
    style = _ref.style,
    icon = _ref.icon,
    image = _ref.image,
    initials = _ref.initials,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? _.AvatarSizes.S : _ref$size,
    title = _ref.title,
    onClick = _ref.onClick;
  // #region > Hooks
  var _useClasses = (0, _.useClasses)(['ap-avatar']),
    classBuilder = _useClasses.classBuilder,
    classes = _useClasses.classes;
  (0, _.useClasseName)(classBuilder, className);
  _react["default"].useEffect(function () {
    classBuilder.add("ap-avatar--".concat(size.toLowerCase()));
    return function () {
      classBuilder.remove("ap-avatar--".concat(size.toLowerCase()));
    };
  }, [size]);
  _react["default"].useEffect(function () {
    if (onClick) {
      classBuilder.add("ap-avatar--interactive");
    }
    return function () {
      classBuilder.remove("ap-avatar--interactive");
    };
  }, [onClick]);
  // #endregion

  // #region > Events
  // #endregion

  // #region > Render
  var content = /*#__PURE__*/_react["default"].createElement("span", null);
  if (image) {
    classBuilder.add("ap-avatar--image");
    content = /*#__PURE__*/_react["default"].createElement("img", {
      className: "ap-avatar__content",
      src: image
    });
  } else if (icon) {
    classBuilder.add("ap-avatar--icon");
    content = /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
      className: "ap-avatar__content",
      icon: icon
    });
  } else if (initials) {
    classBuilder.add("ap-avatar--initials");
    content = /*#__PURE__*/_react["default"].createElement("span", {
      className: "ap-avatar__content"
    }, initials.substring(0, 2).toUpperCase());
  } else {
    // Default to user icon
    classBuilder.add("ap-avatar--icon");
    content = /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
      className: "ap-avatar__content",
      icon: _freeSolidSvgIcons.faUser
    });
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes,
    style: style,
    title: title,
    onClick: onClick
  }, content);
  // #endregion
};
// #endregion