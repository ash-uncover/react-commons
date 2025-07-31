"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuNavigationList = void 0;
var _react = _interopRequireDefault(require("react"));
var _ComponentUtil = require("../ComponentUtil");
var _MenuNavigationItem = require("./MenuNavigationItem");
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
  // #region Hooks
  // #endregion

  // #region Events
  // #endregion

  // #region > Render
  var classes = new _ComponentUtil.ClassBuilder(['ap-menu-navigation-list', className]);
  return /*#__PURE__*/_react["default"].createElement("ul", {
    className: classes.className
  }, items.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement(_MenuNavigationItem.MenuNavigationItem, _extends({
      key: item.name
    }, item));
  }));
  // #endregion
};
// #endregion