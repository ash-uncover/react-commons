"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextArea = void 0;
var _react = _interopRequireWildcard(require("react"));
var _ = require("../..");
require("./TextArea.css");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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
var TextArea = exports.TextArea = function TextArea(_ref) {
  var className = _ref.className,
    style = _ref.style,
    autoFocus = _ref.autoFocus,
    disabled = _ref.disabled,
    name = _ref.name,
    placeholder = _ref.placeholder,
    required = _ref.required,
    rows = _ref.rows,
    value = _ref.value,
    onChange = _ref.onChange;
  // #region > Hooks
  var textarea = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    focused = _useState2[0],
    setFocused = _useState2[1];
  var _useClasses = (0, _.useClasses)(['ap-text-area', className]),
    classBuilder = _useClasses.classBuilder,
    classes = _useClasses.classes;
  // #endregion

  // #region >  Events
  function handleFocus() {
    setFocused(true);
    if (textarea.current) {
      console.log('focus');
      textarea.current.focus();
    }
  }
  function handleBlur() {
    setFocused(false);
  }
  function handleTextAreaChange(event) {
    onChange({
      value: event.target.value
    });
  }
  // #endregion

  // #region > Render
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes,
    style: style,
    tabIndex: focused ? -1 : 0,
    onFocus: handleFocus
  }, /*#__PURE__*/_react["default"].createElement("textarea", {
    ref: textarea,
    className: "ap-text-area__textarea",
    style: style,
    autoFocus: autoFocus,
    disabled: disabled,
    name: name,
    placeholder: placeholder,
    required: required,
    rows: rows,
    tabIndex: -1,
    value: value,
    onBlur: handleBlur,
    onChange: handleTextAreaChange
  }));
  // #endregion
};
// #endregion