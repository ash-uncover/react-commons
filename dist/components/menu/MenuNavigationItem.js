"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuNavigationItem = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _ = require("../..");
require("./MenuNavigationItem.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
//

// CSS

// #region Declaration

// #endregion

// #region Component
var MenuNavigationItem = exports.MenuNavigationItem = function MenuNavigationItem(_ref) {
  var className = _ref.className,
    container = _ref.container,
    description = _ref.description,
    icon = _ref.icon,
    name = _ref.name,
    selected = _ref.selected,
    onClick = _ref.onClick;
  // #region Hooks
  var _useClasses = (0, _.useClasses)(['ap-menu-navigation-item', className]),
    classBuilder = _useClasses.classBuilder,
    classes = _useClasses.classes;
  _react["default"].useEffect(function () {
    if (selected) {
      classBuilder.add("ap-menu-navigation-item--selected");
    }
    return function () {
      classBuilder.remove("ap-menu-navigation-item--selected");
    };
  }, [selected]);
  _react["default"].useEffect(function () {
    if (!container) {
      classBuilder.add("ap-menu-navigation-item--container");
    }
    return function () {
      classBuilder.remove("ap-menu-navigation-item--container");
    };
  }, [container]);
  // #endregion

  // #region > Events
  function handleClick() {
    onClick();
  }
  // #endregion

  // #region > Render
  if (container) {
    return /*#__PURE__*/_react["default"].createElement("li", {
      className: classes,
      title: description,
      onClick: handleClick
    }, /*#__PURE__*/_react["default"].createElement(_.ShellContainer, {
      className: "ap-menu-navigation-item--container"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "ap-menu-navigation-item__content"
    }, icon ? /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
      className: "ap-menu-navigation-item__icon",
      icon: icon
    }) : null, /*#__PURE__*/_react["default"].createElement("div", {
      className: "ap-menu-navigation-item__text"
    }, name))));
  }
  return /*#__PURE__*/_react["default"].createElement("li", {
    className: classes,
    title: description,
    onClick: handleClick
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ap-menu-navigation-item__content"
  }, icon ? /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    className: "ap-menu-navigation-item__icon",
    icon: icon
  }) : null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ap-menu-navigation-item__text"
  }, name)));
  // #endregion
};
// #endregion