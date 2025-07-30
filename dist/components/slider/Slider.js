"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slider = void 0;
var _react = _interopRequireWildcard(require("react"));
var _ = require("../..");
require("./Slider.css");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

var Slider = exports.Slider = function Slider(_ref) {
  var className = _ref.className,
    style = _ref.style,
    max = _ref.max,
    _ref$min = _ref.min,
    min = _ref$min === void 0 ? 0 : _ref$min,
    value = _ref.value,
    onChange = _ref.onChange;
  // Hooks //

  var rail = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    return unregisterEvents;
  }, []);

  // Events //

  function onRailClick(event) {
    var mouseX = event.pageX;
    changeFromX(mouseX);
  }
  function onSpotMouseDown() {
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);
  }
  function onMouseUp() {
    unregisterEvents();
  }
  function onMouseMove(event) {
    var mouseX = event.pageX;
    changeFromX(mouseX);
  }
  function changeFromX(x) {
    if (rail.current) {
      var container = rail.current.getBoundingClientRect();
      var containerWidth = container.width;
      var containerX = container.x;
      var delta = Math.min(Math.max(0, x - containerX), containerWidth);
      var deltaPerc = delta * 100 / containerWidth;
      var newValue = min + deltaPerc * (max - min) / 100;
      onChange({
        value: newValue
      });
    }
  }
  function unregisterEvents() {
    window.removeEventListener('mouseup', onMouseUp);
    window.removeEventListener('mousemove', onMouseMove);
  }

  // Rendering //

  var classes = new _.ClassBuilder(['ap-slider', className]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.className,
    style: style
  }, /*#__PURE__*/_react["default"].createElement("div", {
    ref: rail,
    className: "ap-slider_rail",
    onClick: onRailClick
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ap-slider_pusher",
    style: {
      width: "".concat((value - min) * 100 / (max - min), "%")
    }
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "ap-slider_spot",
    title: String(value),
    onMouseDown: onSpotMouseDown
  })));
};