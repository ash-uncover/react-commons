"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelFooter = void 0;
var _react = _interopRequireDefault(require("react"));
var _ComponentUtil = require("../ComponentUtil");
require("./PanelFooter.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var PanelFooter = exports.PanelFooter = function PanelFooter(_ref) {
  var className = _ref.className,
    style = _ref.style,
    children = _ref.children;
  // Hooks //

  // Events //

  // Rendering //

  var classes = new _ComponentUtil.ClassBuilder(['ap-panel-footer', className]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.className,
    style: style
  }, children);
};