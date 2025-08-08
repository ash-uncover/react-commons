"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Label = void 0;
var _react = _interopRequireDefault(require("react"));
var _ = require("../..");
require("./Label.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
//

// CSS

// #region Declaration

// #endregion

// #region Component
var Label = exports.Label = function Label(_ref) {
  var className = _ref.className,
    style = _ref.style,
    text = _ref.text,
    children = _ref.children;
  // #region > Hooks
  var _useClasses = (0, _.useClasses)(['ap-label']),
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
  }, children || text);
  // #endregion
};
// #endregion