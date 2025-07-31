"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelHeader = void 0;
var _react = _interopRequireDefault(require("react"));
var _ComponentUtil = require("../ComponentUtil");
require("./PanelHeader.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
//

// CSS

// #region Declaration

// #endregion

// #region Component
var PanelHeader = exports.PanelHeader = function PanelHeader(_ref) {
  var className = _ref.className,
    style = _ref.style,
    children = _ref.children;
  // #region > Hooks
  // #endregion

  // #region > Events
  // #endregion

  // #region Render
  var classes = new _ComponentUtil.ClassBuilder(['ap-panel-header', className]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.className,
    style: style
  }, children);
  // #endregion
};
// #endregion