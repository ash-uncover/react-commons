"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Select = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _ = require("../..");
require("./Select.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
//

// CSS

// #region Declaration

// #endregion

// #region Component
var Select = exports.Select = function Select(_ref) {
  var className = _ref.className,
    style = _ref.style,
    disabled = _ref.disabled,
    value = _ref.value,
    values = _ref.values,
    onChange = _ref.onChange;
  // #region > Hooks
  var _useClasses = (0, _.useClasses)(['ap-select', className]),
    classBuilder = _useClasses.classBuilder,
    classes = _useClasses.classes;
  _react["default"].useEffect(function () {
    if (disabled) {
      classBuilder.add("ap-select--disabled");
    }
    return function () {
      classBuilder.remove("ap-select--disabled");
    };
  }, [disabled]);
  // #endregion

  // #region > Events
  function handleValuePrevious() {
    var currentValueIndex = values.findIndex(function (v) {
      return v.id === value;
    });
    var newValueIndex = (currentValueIndex + values.length - 1) % values.length;
    var newValue = values[newValueIndex];
    onChange({
      value: newValue.id
    });
  }
  function handleValueNext() {
    var currentValueIndex = values.findIndex(function (v) {
      return v.id === value;
    });
    var newValueIndex = (currentValueIndex + values.length + 1) % values.length;
    var newValue = values[newValueIndex];
    onChange({
      value: newValue.id
    });
  }
  // #endregion

  // #region > Render
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes,
    style: style
  }, /*#__PURE__*/_react["default"].createElement(_.Button, {
    disabled: disabled,
    onClick: handleValuePrevious
  }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _.ICONS.FAS_CHEVRON_LEFT
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "ap-select__value"
  }, values.find(function (v) {
    return v.id === value;
  }).text), /*#__PURE__*/_react["default"].createElement(_.Button, {
    disabled: disabled,
    onClick: handleValueNext
  }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _.ICONS.FAS_CHEVRON_RIGHT
  })));
  // #endregion
};
// #endregion