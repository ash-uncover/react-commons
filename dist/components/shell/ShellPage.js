"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShellPage = void 0;
var _react = _interopRequireDefault(require("react"));
var _ = require("../..");
require("./ShellPage.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
//

// CSS

// #region Declaration

// #endregion

// #region Component
var ShellPage = exports.ShellPage = function ShellPage(_ref) {
  var className = _ref.className,
    style = _ref.style,
    children = _ref.children;
  // #region > Hooks
  var _useClasses = (0, _.useClasses)(['ap-shell-page', className]),
    classes = _useClasses.classes;
  // #endregion

  // #region > Render
  return /*#__PURE__*/_react["default"].createElement(_.ShellContainer, {
    className: classes,
    style: style
  }, children);
  // #endregion
};
// #endregion