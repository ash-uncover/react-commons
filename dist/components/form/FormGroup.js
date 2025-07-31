"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormGroup = void 0;
var _react = _interopRequireDefault(require("react"));
var _ = require("../..");
var _FormGroupDirection = require("./FormGroupDirection");
require("./FormGroup.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
//

// CSS

// #region Declaration

// #endregion

// #region
var FormGroup = exports.FormGroup = function FormGroup(_ref) {
  var className = _ref.className,
    style = _ref.style,
    _ref$direction = _ref.direction,
    direction = _ref$direction === void 0 ? _FormGroupDirection.FormGroupDirections.VERTICAL : _ref$direction,
    children = _ref.children;
  // #region Hooks
  // #endregion

  // #region Events
  // #endregion

  // #region Render
  var classes = new _.ClassBuilder(['ap-form-group', className]);
  classes.add("ap-form-group--".concat(direction.toLowerCase()));
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.className,
    style: style
  }, children);
  // #endregion
};
// #endregion