"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelFooter = void 0;
var _react = _interopRequireDefault(require("react"));
var _ = require("../..");
require("./PanelFooter.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
//

// CSS

// #region Declaration

// #endregion

// #region Component
var PanelFooter = exports.PanelFooter = function PanelFooter(_ref) {
  var className = _ref.className,
    style = _ref.style,
    children = _ref.children;
  // #region > Hooks
  var _useClasses = (0, _.useClasses)(['ap-panel-footer']),
    classBuilder = _useClasses.classBuilder,
    classes = _useClasses.classes;
  (0, _.useClasseName)(classBuilder, className);
  // #endregion

  // #region > Events
  // #endregion

  // #region > Render
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes,
    style: style
  }, children);
  // #endregion
};
// #endregion