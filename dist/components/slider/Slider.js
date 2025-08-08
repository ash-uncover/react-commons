"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slider = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _ = require("../..");
require("./Slider.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } //
// CSS
// #region Declaration
var DEFAULT_STEPS = 10;
var TOOLTIP_TIMEOUT;
var TOOLTIP_TIMEOUT_DELAY = 1000;
// #endregion

// #region Component
var Slider = exports.Slider = function Slider(_ref) {
  var className = _ref.className,
    disabled = _ref.disabled,
    min = _ref.min,
    max = _ref.max,
    step = _ref.step,
    value = _ref.value,
    onChange = _ref.onChange;
  // #region > Hooks
  var sliderBar = _react["default"].useRef(null);
  var _React$useState = _react["default"].useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    dragMode = _React$useState2[0],
    setDragMode = _React$useState2[1];
  var _React$useState3 = _react["default"].useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    showTooltip = _React$useState4[0],
    setShowTooltip = _React$useState4[1];
  var _React$useState5 = _react["default"].useState(value || min || 0),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    currentValue = _React$useState6[0],
    setCurrentValue = _React$useState6[1];
  _react["default"].useEffect(function () {
    if (value !== currentValue) {
      updateValue(value);
    }
  }, [value]);
  var updateValue = function updateValue(newValue) {
    var tmpValue = newValue;
    if (!isNaN(min) && tmpValue < min) {
      tmpValue = min;
    }
    if (!isNaN(max) && tmpValue > max) {
      tmpValue = max;
    }
    setCurrentValue(tmpValue);
    onChange({
      value: tmpValue
    });
    startTooltipTimeout();
  };
  var startTooltipTimeout = function startTooltipTimeout() {
    setShowTooltip(true);
    clearTimeout(TOOLTIP_TIMEOUT);
    TOOLTIP_TIMEOUT = setTimeout(function () {
      return setShowTooltip(false);
    }, TOOLTIP_TIMEOUT_DELAY);
  };
  var _useClasses = (0, _.useClasses)(['ap-slider']),
    classBuilder = _useClasses.classBuilder,
    classes = _useClasses.classes;
  (0, _.useClasseName)(classBuilder, className);
  _react["default"].useEffect(function () {
    if (disabled) {
      classBuilder.add("ap-slider--disabled");
    }
    return function () {
      classBuilder.remove("ap-slider--disabled");
    };
  }, [disabled]);
  // #endregion

  // #region > Events
  var getStep = function getStep() {
    var realStep = step;
    if (!realStep) {
      realStep = Math.max(Math.round((max - min) / DEFAULT_STEPS), 1);
    }
    return realStep;
  };
  var moveSlider = function moveSlider(x) {
    if (sliderBar !== null && sliderBar !== void 0 && sliderBar.current) {
      var rectBar = sliderBar.current.getBoundingClientRect();
      var clientWidth = rectBar.width;
      var relativePosition = x - rectBar.left;
      var newValue = Math.round(min + relativePosition / clientWidth * (max - min));
      updateValue(newValue);
    }
  };
  var handleTouchStart = function handleTouchStart() {
    startTouch();
  };
  var handleMouseDown = function handleMouseDown() {
    startDrag();
  };
  var startTouch = function startTouch() {
    setShowTooltip(true);
    setDragMode(true);
    document.addEventListener('touchend', _stopTouch);
    document.addEventListener('touchcancel', _stopTouch);
    document.addEventListener('touchmove', doTouch);
  };
  var doTouch = function doTouch(event) {
    moveSlider(event.touches[0].clientX);
  };
  var _stopTouch = function stopTouch(event) {
    startTooltipTimeout();
    moveSlider(event.changedTouches[0].clientX);
    setDragMode(false);
    document.removeEventListener('touchend', _stopTouch);
    document.removeEventListener('touchcancel', _stopTouch);
    document.removeEventListener('touchmove', doTouch);
  };
  var startDrag = function startDrag() {
    setShowTooltip(true);
    setDragMode(true);
    document.addEventListener('mouseleave', _stopDrag);
    document.addEventListener('mouseup', _stopDrag);
    document.addEventListener('mousemove', doDrag);
  };
  var doDrag = function doDrag(event) {
    moveSlider(event.clientX);
  };
  var _stopDrag = function stopDrag(event) {
    startTooltipTimeout();
    moveSlider(event.clientX);
    setDragMode(false);
    document.removeEventListener('mouseleave', _stopDrag);
    document.removeEventListener('mouseup', _stopDrag);
    document.removeEventListener('mousemove', doDrag);
  };
  var handleMouseEnter = function handleMouseEnter() {
    setShowTooltip(true);
  };
  var handleMouseLeave = function handleMouseLeave() {
    startTooltipTimeout();
  };
  var handleValueDown = function handleValueDown() {
    var realStep = getStep();
    var newValue = (Math.floor(currentValue / realStep) - 1) * realStep;
    if (currentValue % realStep) {
      newValue = Math.floor(currentValue / realStep) * realStep;
    }
    updateValue(newValue);
  };
  var handleValueUp = function handleValueUp() {
    var realStep = getStep();
    var newValue = (Math.floor(currentValue / realStep) + 1) * realStep;
    updateValue(newValue);
  };
  var handleSliderClick = function handleSliderClick(event) {
    moveSlider(event.clientX);
  };
  var handleChange = function handleChange(event) {
    updateValue(Number(event.target.value));
  };
  // #endregion

  // #region > Render
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes
  }, /*#__PURE__*/_react["default"].createElement("input", {
    style: {
      display: 'none'
    },
    type: "number",
    min: min,
    max: max,
    value: currentValue,
    onChange: handleChange
  }), /*#__PURE__*/_react["default"].createElement(_.Button, {
    disabled: disabled,
    onClick: handleValueDown
  }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: ['fas', 'chevron-left']
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "ap-slider__control",
    onClick: handleSliderClick,
    onTouchStart: handleTouchStart,
    onMouseDown: handleMouseDown,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ap-slider__control--bar",
    ref: sliderBar
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ap-slider__control--bar ap-slider__control--bar-active",
    style: {
      width: "".concat((currentValue - min) * 100 / (max - min), "%"),
      transition: dragMode ? 'none' : 'width 0.05s'
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ap-slider__control--indicator",
    tabIndex: 0
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "ap-slider__control--toolip",
    style: {
      pointerEvents: 'none',
      opacity: showTooltip ? 1 : 0,
      transition: 'opacity 0.5s'
    }
  }, currentValue, "%")))), /*#__PURE__*/_react["default"].createElement(_.Button, {
    disabled: disabled,
    onClick: handleValueUp
  }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: ['fas', 'chevron-right']
  })));
  // #endregion
};