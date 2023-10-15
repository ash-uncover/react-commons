"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slider = void 0;
var _react = _interopRequireWildcard(require("react"));
var _ = require("../..");
require("./Slider.css");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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