"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Input = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
var _freeRegularSvgIcons = require("@fortawesome/free-regular-svg-icons");
var _ComponentUtil = require("../ComponentUtil");
require("./Input.css");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
// ---------------------------------------------------
// Constants
// ---------------------------------------------------

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

var Input = exports.Input = function Input(_ref) {
  var className = _ref.className,
    style = _ref.style,
    autoFocus = _ref.autoFocus,
    autoSelect = _ref.autoSelect,
    disabled = _ref.disabled,
    name = _ref.name,
    placeholder = _ref.placeholder,
    required = _ref.required,
    showClearIcon = _ref.showClearIcon,
    showPasswordIcon = _ref.showPasswordIcon,
    type = _ref.type,
    value = _ref.value,
    onChange = _ref.onChange;
  // Hooks //

  var input = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    focused = _useState2[0],
    setFocused = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    showPassword = _useState4[0],
    setShowPassword = _useState4[1];

  // Events //

  function handleFocus() {
    setFocused(true);
    if (input.current) {
      if (autoSelect) {
        input.current.select();
      } else if (autoFocus) {
        input.current.focus();
      }
    }
  }
  function handleBlur() {
    setFocused(false);
  }
  function handleInputChange(event) {
    onChange({
      value: event.target.value
    });
  }
  function handleToggleShowPassword() {
    setShowPassword(!showPassword);
  }
  function handleResetShowPassword() {
    setShowPassword(false);
  }
  function handleResetValue() {
    onChange({
      value: ''
    });
  }

  // Rendering //

  var classes = new _ComponentUtil.ClassBuilder(['ap-input', className]);
  if (showPassword) {
    classes.add('ap-input--show-password');
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.className,
    style: style,
    tabIndex: focused ? -1 : 0,
    onFocus: handleFocus
  }, /*#__PURE__*/_react["default"].createElement("input", {
    ref: input,
    className: "ap-input__input",
    autoFocus: autoFocus,
    disabled: disabled,
    name: name,
    placeholder: placeholder,
    required: required,
    tabIndex: -1,
    type: type === 'password' && showPassword ? '' : type,
    value: value,
    onBlur: handleBlur,
    onChange: handleInputChange
  }), showPasswordIcon && type === 'password' && value !== null && value !== void 0 && value.length ? /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    className: "ap-input__action ap-input__action-password",
    icon: _freeRegularSvgIcons.faEye,
    onMouseDown: handleToggleShowPassword,
    onMouseLeave: handleResetShowPassword,
    onMouseUp: handleResetShowPassword
  }) : null, showClearIcon && value !== null && value !== void 0 && value.length ? /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    className: "ap-input__action",
    icon: _freeSolidSvgIcons.faRemove,
    onClick: handleResetValue
  }) : null);
};