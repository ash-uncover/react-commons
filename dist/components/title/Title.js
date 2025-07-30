"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TitleLevels = exports.Title = void 0;
var _react = _interopRequireDefault(require("react"));
var _ComponentUtil = require("../ComponentUtil");
require("./Title.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// ---------------------------------------------------
// Constants
// ---------------------------------------------------

var TitleLevels = exports.TitleLevels = {
  H1: 'H1',
  H2: 'H2',
  H3: 'H3',
  H4: 'H4',
  H5: 'H5',
  H6: 'H6'
};
// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

var Title = exports.Title = function Title(_ref) {
  var className = _ref.className,
    style = _ref.style,
    _ref$level = _ref.level,
    level = _ref$level === void 0 ? TitleLevels.H1 : _ref$level,
    text = _ref.text,
    children = _ref.children;
  // Hooks //

  // Events //

  // Rendering //

  var classes = new _ComponentUtil.ClassBuilder('ap-title');
  classes.add(className);
  classes.add("ap-title--".concat(level.toLowerCase()));
  return /*#__PURE__*/_react["default"].createElement(level.toLowerCase(), {
    className: classes.className,
    style: style
  }, children || text);
};