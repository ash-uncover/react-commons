"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Input = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
var _freeRegularSvgIcons = require("@fortawesome/free-regular-svg-icons");
var _ = require("../..");
require("./Input.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } //
// CSS
// #region Declaration

// #endregion

// #region Component
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
  // #region > Hooks
  var input = _react["default"].useRef(null);
  var _React$useState = _react["default"].useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    focused = _React$useState2[0],
    setFocused = _React$useState2[1];
  var _React$useState3 = _react["default"].useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    showPassword = _React$useState4[0],
    setShowPassword = _React$useState4[1];
  var _useClasses = (0, _.useClasses)(['ap-input', className]),
    classBuilder = _useClasses.classBuilder,
    classes = _useClasses.classes;
  _react["default"].useEffect(function () {
    if (showPassword) {
      classBuilder.add("ap-input--show-password");
    }
    return function () {
      classBuilder.remove("ap-input--show-password");
    };
  }, [showPassword]);
  // #endregion

  // #region > Events
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
  // #endregion

  // #region > Render
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes,
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
  // #endregion
};
// #endregion