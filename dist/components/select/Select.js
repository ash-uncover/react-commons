"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Select = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _Button = require("../button/Button");
var _ComponentUtil = require("../ComponentUtil");
var _IconUtils = require("../icon/IconUtils");
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
  // #region Hooks
  // #endregion

  // #region Events
  function handleValuePrevious() {
    var currentValueIndex = values.findIndex(function (v) {
      return v.id === value;
    });
    var newValueIndex = (currentValueIndex + values.length - 1) % values.length;
    var newValue = values[newValueIndex];
    onChange(newValue.id);
  }
  function handleValueNext() {
    var currentValueIndex = values.findIndex(function (v) {
      return v.id === value;
    });
    var newValueIndex = (currentValueIndex + values.length + 1) % values.length;
    var newValue = values[newValueIndex];
    onChange(newValue.id);
  }
  // #endregion

  // #region Render
  var classes = new _ComponentUtil.ClassBuilder(['ap-select', className]);
  if (disabled) classes.add('ap-select--disabled');
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.className,
    style: style
  }, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    disabled: disabled,
    onClick: handleValuePrevious
  }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _IconUtils.ICONS.FAS_CHEVRON_LEFT
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "ap-select__value"
  }, values.find(function (v) {
    return v.id === value;
  }).text), /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    disabled: disabled,
    onClick: handleValueNext
  }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _IconUtils.ICONS.FAS_CHEVRON_RIGHT
  })));
  // #endregion
};
// #endregion