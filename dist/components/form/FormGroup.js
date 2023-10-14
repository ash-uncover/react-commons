"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormGroupDirections = exports.FormGroup = void 0;
var _react = _interopRequireDefault(require("react"));
var _ = require("../..");
require("./FormGroup.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

var FormGroupDirections = exports.FormGroupDirections = {
  HORIZONTAL: 'Horizontal',
  VERTICAL: 'Vertical'
};
var FormGroup = exports.FormGroup = function FormGroup(_ref) {
  var className = _ref.className,
    style = _ref.style,
    _ref$direction = _ref.direction,
    direction = _ref$direction === void 0 ? FormGroupDirections.VERTICAL : _ref$direction,
    children = _ref.children;
  // Events //

  // Rendering //

  var classes = new _.ClassBuilder(['ap-form-group', className]);
  classes.add("ap-form-group--".concat(direction.toLowerCase()));
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.className,
    style: style
  }, children);
};