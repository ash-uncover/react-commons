"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Icon = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _ = require("../..");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
//

// #region Declaration

// #endregion

// #region Component
var Icon = exports.Icon = function Icon(_ref) {
  var className = _ref.className,
    style = _ref.style,
    icon = _ref.icon;
  // #region > Hooks
  var _useClasses = (0, _.useClasses)(['ap-icon']),
    classBuilder = _useClasses.classBuilder,
    classes = _useClasses.classes;
  (0, _.useClasseName)(classBuilder, className);
  // #endregion

  // #region > Render
  return /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    className: classes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ,
    style: style,
    icon: icon
  });
  // #endregion
};
// #endregion