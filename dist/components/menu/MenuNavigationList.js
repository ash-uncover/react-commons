"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuNavigationList = void 0;
var _react = _interopRequireDefault(require("react"));
var _ = require("../..");
require("./MenuNavigationList.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } //
// CSS
// #region Declaration

// #endregion

// #region Component
var MenuNavigationList = exports.MenuNavigationList = function MenuNavigationList(_ref) {
  var className = _ref.className,
    items = _ref.items;
  // #region > Hooks
  var _useClasses = (0, _.useClasses)(['ap-menu-navigation-list', className]),
    classBuilder = _useClasses.classBuilder,
    classes = _useClasses.classes;
  // #endregion

  // #region > Events
  // #endregion

  // #region > Render
  return /*#__PURE__*/_react["default"].createElement("ul", {
    className: classes
  }, items.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement(_.MenuNavigationItem, _extends({
      key: item.name
    }, item));
  }));
  // #endregion
};
// #endregion