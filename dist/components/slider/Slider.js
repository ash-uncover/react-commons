"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slider = void 0;
var _react = _interopRequireWildcard(require("react"));
var _ = require("../..");
require("./Slider.css");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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