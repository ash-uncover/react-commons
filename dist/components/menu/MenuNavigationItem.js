"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuNavigationItem = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _ComponentUtil = require("../ComponentUtil");
require("./MenuNavigationItem.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
//

// CSS

// #region Declaration

// #endregion

// #region Component
var MenuNavigationItem = exports.MenuNavigationItem = function MenuNavigationItem(_ref) {
  var className = _ref.className,
    name = _ref.name,
    description = _ref.description,
    icon = _ref.icon,
    selected = _ref.selected,
    onClick = _ref.onClick;
  // #region Hooks
  // #endregion

  // #region > Events
  function handleClick() {
    onClick();
  }
  // #endregion

  // #region > Render
  var classes = new _ComponentUtil.ClassBuilder(['ap-menu-navigation-item', className]);
  if (selected) classes.add('ap-menu-navigation-item--selected');
  return /*#__PURE__*/_react["default"].createElement("li", {
    className: classes.className,
    title: description,
    onClick: handleClick
  }, icon ? /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    className: "ap-menu-navigation-item__icon",
    icon: icon
  }) : null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ap-menu-navigation-item__text"
  }, name));
  // #endregion
};
// #endregion