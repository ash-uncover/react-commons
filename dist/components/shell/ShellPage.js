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
    level = _ref.level,
    children = _ref.children;
  // #region > Hooks
  var _useClasses = (0, _.useClasses)(['ap-shell-page']),
    classBuilder = _useClasses.classBuilder,
    classes = _useClasses.classes;
  (0, _.useClasseName)(classBuilder, className);
  // #endregion

  // #region > Render
  return /*#__PURE__*/_react["default"].createElement(_.ShellContainer, {
    className: classes,
    style: style,
    level: level
  }, children);
  // #endregion
};
// #endregion