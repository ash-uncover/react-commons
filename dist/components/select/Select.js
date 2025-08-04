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
var Select = exports.Select = function Select(_ref) {
  var className = _ref.className,
    style = _ref.style,
    disabled = _ref.disabled,
    value = _ref.value,
    values = _ref.values,
    onChange = _ref.onChange;
  // #region > Hooks
  var _React$useState = _react["default"].useState(value),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    valueSelected = _React$useState2[0],
    setValueSelected = _React$useState2[1];
  _react["default"].useEffect(function () {
    var newValue = values.find(function (v) {
      return v.id === value;
    });
    if (newValue) {
      setValueSelected(newValue.text);
    } else {
      setValueSelected(null);
    }
  }, [value, values]);
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
    if (value && values !== null && values !== void 0 && values.length) {
      var currentValueIndex = values.findIndex(function (v) {
        return v.id === value;
      });
      var newValueIndex = (currentValueIndex + values.length - 1) % values.length;
      var newValue = values[newValueIndex];
      onChange({
        value: newValue.id
      });
    }
  }
  function handleValueNext() {
    if (value && values !== null && values !== void 0 && values.length) {
      var currentValueIndex = values.findIndex(function (v) {
        return v.id === value;
      });
      var newValueIndex = (currentValueIndex + values.length + 1) % values.length;
      var newValue = values[newValueIndex];
      onChange({
        value: newValue.id
      });
    }
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
  }, valueSelected), /*#__PURE__*/_react["default"].createElement(_.Button, {
    disabled: disabled,
    onClick: handleValueNext
  }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _.ICONS.FAS_CHEVRON_RIGHT
  })));
  // #endregion
};
// #endregion