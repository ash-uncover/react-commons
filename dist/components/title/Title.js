"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Title = void 0;
var _react = _interopRequireDefault(require("react"));
var _ = require("../..");
require("./Title.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
//

// CSS

// #region Declaration

// #endregion

// #region Component
var Title = exports.Title = function Title(_ref) {
  var className = _ref.className,
    style = _ref.style,
    _ref$level = _ref.level,
    level = _ref$level === void 0 ? _.TitleLevels.H1 : _ref$level,
    text = _ref.text,
    children = _ref.children;
  // #region >  Hooks
  var _useClasses = (0, _.useClasses)(['ap-title']),
    classBuilder = _useClasses.classBuilder,
    classes = _useClasses.classes;
  (0, _.useClasseName)(classBuilder, className);
  _react["default"].useEffect(function () {
    classBuilder.add("ap-title--".concat(level.toLowerCase()));
    return function () {
      classBuilder.remove("ap-title--".concat(level.toLowerCase()));
    };
  }, [level]);
  // #endregion

  // #region > Events
  // #endregion

  // #region > Render
  return /*#__PURE__*/_react["default"].createElement(level.toLowerCase(), {
    className: classes,
    style: style
  }, children || text);
  // #endregion
};
// #endregion