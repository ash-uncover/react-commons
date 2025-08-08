"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelHeader = void 0;
var _react = _interopRequireDefault(require("react"));
var _ = require("../..");
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
  var _useClasses = (0, _.useClasses)(['ap-panel-header']),
    classBuilder = _useClasses.classBuilder,
    classes = _useClasses.classes;
  (0, _.useClasseName)(classBuilder, className);
  // #endregion

  // #region > Events
  // #endregion

  // #region Render
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes,
    style: style
  }, children);
  // #endregion
};
// #endregion