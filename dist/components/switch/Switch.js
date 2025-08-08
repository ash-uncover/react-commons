"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Switch = void 0;
var _react = _interopRequireWildcard(require("react"));
var _ = require("../..");
require("./Switch.css");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
//

// CSS

// #region Declaration

// #endregion

// #region Component
var Switch = exports.Switch = function Switch(_ref) {
  var className = _ref.className,
    style = _ref.style,
    checked = _ref.checked,
    label = _ref.label,
    onChange = _ref.onChange;
  // #region Hooks
  var id = (0, _react.useId)();
  var _useClasses = (0, _.useClasses)(['ap-switch']),
    classBuilder = _useClasses.classBuilder,
    classes = _useClasses.classes;
  (0, _.useClasseName)(classBuilder, className);
  // #endregion

  // #region Events
  var handleChange = function handleChange(event) {
    var value = Boolean(event.currentTarget.checked);
    onChange({
      value: value
    });
  };
  // #endregion

  // #region Render
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes,
    style: style
  }, /*#__PURE__*/_react["default"].createElement("input", {
    id: id,
    className: "ap-switch__input",
    type: "checkbox",
    style: {
      display: 'none'
    },
    name: label,
    checked: checked,
    onChange: handleChange
  }), /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: id,
    className: "ap-switch__label"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ap-switch__control"
  }), label));
  // #endregion
};
// #endregion