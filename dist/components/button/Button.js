"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _ = require("../..");
require("./Button.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
//

// CSS

// #region Declaration

// #endregion

// #region Component
var Button = exports.Button = function Button(_ref) {
  var className = _ref.className,
    style = _ref.style,
    disabled = _ref.disabled,
    icon = _ref.icon,
    iconEnd = _ref.iconEnd,
    _ref$semantic = _ref.semantic,
    semantic = _ref$semantic === void 0 ? _.ButtonSemantics.DEFAULT : _ref$semantic,
    text = _ref.text,
    title = _ref.title,
    type = _ref.type,
    onClick = _ref.onClick,
    children = _ref.children;
  // #region > Hooks
  var _useClasses = (0, _.useClasses)(['ap-button']),
    classBuilder = _useClasses.classBuilder,
    classes = _useClasses.classes;
  (0, _.useClasseName)(classBuilder, className);
  _react["default"].useEffect(function () {
    classBuilder.add("ap-button--".concat(semantic.toLowerCase()));
    return function () {
      classBuilder.remove("ap-button--".concat(semantic.toLowerCase()));
    };
  }, [semantic]);
  _react["default"].useEffect(function () {
    if (!children && !text && (!icon && iconEnd || icon && !iconEnd)) {
      classBuilder.add('ap-button--icon-only');
    }
    return function () {
      classBuilder.remove('ap-button--icon-only');
    };
  }, [children, text, icon, iconEnd]);
  // #endregion

  // #region > Events
  // #endregion

  // #region > Render
  return /*#__PURE__*/_react["default"].createElement("button", {
    className: classes,
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
  // #endregion
};
// #endregion