"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormGroup = void 0;
var _react = _interopRequireDefault(require("react"));
var _ = require("../..");
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
    direction = _ref$direction === void 0 ? _.FormGroupDirections.VERTICAL : _ref$direction,
    children = _ref.children;
  // #region > Hooks
  var _useClasses = (0, _.useClasses)(['ap-form-group', className]),
    classBuilder = _useClasses.classBuilder,
    classes = _useClasses.classes;
  _react["default"].useEffect(function () {
    classBuilder.add("ap-form-group--".concat(direction.toLowerCase()));
    return function () {
      classBuilder.remove("ap-form-group--".concat(direction.toLowerCase()));
    };
  }, [direction]);
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