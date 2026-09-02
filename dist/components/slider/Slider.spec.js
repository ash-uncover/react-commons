"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _Slider = require("./Slider");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * @jest-environment jsdom
 */
jest.mock('../..', function () {
  var _require = require('../../hooks/useClasses'),
    useClasses = _require.useClasses,
    useClasseName = _require.useClasseName;
  return {
    __esModule: true,
    useClasses: useClasses,
    useClasseName: useClasseName,
    Button: function Button(_ref) {
      var children = _ref.children,
        disabled = _ref.disabled,
        onClick = _ref.onClick;
      return require('react').createElement('button', {
        'data-testid': 'mock-button',
        disabled: disabled,
        onClick: onClick
      }, children);
    }
  };
});
jest.mock('@fortawesome/react-fontawesome', function () {
  return {
    FontAwesomeIcon: function FontAwesomeIcon(_ref2) {
      var icon = _ref2.icon;
      return require('react').createElement('span', {
        'data-icon': String(icon)
      });
    }
  };
});

// jsdom does not implement Touch; provide a minimal polyfill
if (typeof global.Touch === 'undefined') {
  ;
  global.Touch = /*#__PURE__*/_createClass(function Touch(init) {
    var _init$clientX, _init$clientY;
    _classCallCheck(this, Touch);
    _defineProperty(this, "identifier", void 0);
    _defineProperty(this, "target", void 0);
    _defineProperty(this, "clientX", void 0);
    _defineProperty(this, "clientY", void 0);
    this.identifier = init.identifier;
    this.target = init.target;
    this.clientX = (_init$clientX = init.clientX) !== null && _init$clientX !== void 0 ? _init$clientX : 0;
    this.clientY = (_init$clientY = init.clientY) !== null && _init$clientY !== void 0 ? _init$clientY : 0;
  });
}
describe('Slider', function () {
  beforeEach(function () {
    jest.useFakeTimers();
  });
  afterEach(function () {
    (0, _react2.act)(function () {
      return jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  // #region render
  describe('render', function () {
    test('renders a number input (hidden)', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      var _render = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Slider.Slider, {
          min: 0,
          max: 100,
          value: 50,
          onChange: onChange
        })),
        container = _render.container;
      // Assertions
      var input = container.querySelector('input[type="number"]');
      expect(input).toBeInTheDocument();
    });
    test('renders two buttons (down/up)', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Slider.Slider, {
        min: 0,
        max: 100,
        value: 50,
        onChange: onChange
      }));
      // Assertions
      expect(_react2.screen.getAllByTestId('mock-button')).toHaveLength(2);
    });
    test('disables buttons when disabled=true', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Slider.Slider, {
        disabled: true,
        min: 0,
        max: 100,
        value: 50,
        onChange: onChange
      }));
      // Assertions
      var buttons = _react2.screen.getAllByTestId('mock-button');
      expect(buttons[0]).toBeDisabled();
      expect(buttons[1]).toBeDisabled();
    });
    test('shows current value in the tooltip', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      var _render2 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Slider.Slider, {
          min: 0,
          max: 100,
          value: 30,
          onChange: onChange
        })),
        container = _render2.container;
      // Assertions
      expect(container.querySelector('.ap-slider__control--toolip')).toHaveTextContent('30%');
    });
    test('bar active width reflects current value', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      var _render3 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Slider.Slider, {
          min: 0,
          max: 100,
          value: 50,
          onChange: onChange
        })),
        container = _render3.container;
      // Assertions
      var activeBar = container.querySelector('.ap-slider__control--bar-active');
      expect(activeBar.style.width).toBe('50%');
    });
  });
  // #endregion

  // #region disabled modifier
  describe('disabled modifier', function () {
    test('adds disabled class when disabled=true', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      var _render4 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Slider.Slider, {
          disabled: true,
          min: 0,
          max: 100,
          value: 50,
          onChange: onChange
        })),
        container = _render4.container;
      // Assertions
      expect(container.firstChild).toHaveClass('ap-slider--disabled');
    });
    test('does not add disabled class when disabled=false', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      var _render5 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Slider.Slider, {
          min: 0,
          max: 100,
          value: 50,
          onChange: onChange
        })),
        container = _render5.container;
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-slider--disabled');
    });
    test('removes disabled class when disabled changes to false', function () {
      // Declaration
      var onChange = jest.fn();
      var _render6 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Slider.Slider, {
          disabled: true,
          min: 0,
          max: 100,
          value: 50,
          onChange: onChange
        })),
        container = _render6.container,
        rerender = _render6.rerender;
      // Execution
      rerender(/*#__PURE__*/_react["default"].createElement(_Slider.Slider, {
        min: 0,
        max: 100,
        value: 50,
        onChange: onChange
      }));
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-slider--disabled');
    });
    test('cleans up disabled class on unmount', function () {
      // Declaration
      var onChange = jest.fn();
      var _render7 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Slider.Slider, {
          disabled: true,
          min: 0,
          max: 100,
          value: 50,
          onChange: onChange
        })),
        unmount = _render7.unmount;
      // Execution + Assertions — no error
      unmount();
    });
  });
  // #endregion

  // #region value down button
  describe('value down button', function () {
    test('decrements value by step when down button is clicked', function () {
      // Declaration
      var onChange = jest.fn();
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Slider.Slider, {
        min: 0,
        max: 100,
        step: 10,
        value: 50,
        onChange: onChange
      }));
      var _screen$getAllByTestI = _react2.screen.getAllByTestId('mock-button'),
        _screen$getAllByTestI2 = _slicedToArray(_screen$getAllByTestI, 1),
        downBtn = _screen$getAllByTestI2[0];
      // Execution
      _react2.fireEvent.click(downBtn);
      // Assertions
      expect(onChange).toHaveBeenCalledWith({
        value: 40
      });
    });
    test('uses computed step when step is not provided', function () {
      // Declaration
      var onChange = jest.fn();
      // max-min=100, DEFAULT_STEPS=10, step=10
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Slider.Slider, {
        min: 0,
        max: 100,
        value: 50,
        onChange: onChange
      }));
      var _screen$getAllByTestI3 = _react2.screen.getAllByTestId('mock-button'),
        _screen$getAllByTestI4 = _slicedToArray(_screen$getAllByTestI3, 1),
        downBtn = _screen$getAllByTestI4[0];
      // Execution
      _react2.fireEvent.click(downBtn);
      // Assertions
      expect(onChange).toHaveBeenCalledWith({
        value: 40
      });
    });
    test('floors to current step boundary when value is not on a step boundary', function () {
      // Declaration
      var onChange = jest.fn();
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Slider.Slider, {
        min: 0,
        max: 100,
        step: 10,
        value: 55,
        onChange: onChange
      }));
      var _screen$getAllByTestI5 = _react2.screen.getAllByTestId('mock-button'),
        _screen$getAllByTestI6 = _slicedToArray(_screen$getAllByTestI5, 1),
        downBtn = _screen$getAllByTestI6[0];
      // Execution
      _react2.fireEvent.click(downBtn);
      // Assertions — floors to 50 (current step boundary)
      expect(onChange).toHaveBeenCalledWith({
        value: 50
      });
    });
    test('clamps to min when decremented below min', function () {
      // Declaration — start at min value so down goes below min
      var onChange = jest.fn();
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Slider.Slider, {
        min: 0,
        max: 100,
        step: 10,
        value: 0,
        onChange: onChange
      }));
      var _screen$getAllByTestI7 = _react2.screen.getAllByTestId('mock-button'),
        _screen$getAllByTestI8 = _slicedToArray(_screen$getAllByTestI7, 1),
        downBtn = _screen$getAllByTestI8[0];
      // Execution — trying to go below 0
      _react2.fireEvent.click(downBtn);
      // Assertions — clamped to min=0
      expect(onChange).toHaveBeenCalledWith({
        value: 0
      });
    });
  });
  // #endregion

  // #region value up button
  describe('value up button', function () {
    test('increments value by step when up button is clicked', function () {
      // Declaration
      var onChange = jest.fn();
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Slider.Slider, {
        min: 0,
        max: 100,
        step: 10,
        value: 50,
        onChange: onChange
      }));
      var _screen$getAllByTestI9 = _react2.screen.getAllByTestId('mock-button'),
        _screen$getAllByTestI0 = _slicedToArray(_screen$getAllByTestI9, 2),
        upBtn = _screen$getAllByTestI0[1];
      // Execution
      _react2.fireEvent.click(upBtn);
      // Assertions
      expect(onChange).toHaveBeenCalledWith({
        value: 60
      });
    });
    test('clamps to max when incremented above max', function () {
      // Declaration — start at max value so up goes above max
      var onChange = jest.fn();
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Slider.Slider, {
        min: 0,
        max: 100,
        step: 10,
        value: 100,
        onChange: onChange
      }));
      var _screen$getAllByTestI1 = _react2.screen.getAllByTestId('mock-button'),
        _screen$getAllByTestI10 = _slicedToArray(_screen$getAllByTestI1, 2),
        upBtn = _screen$getAllByTestI10[1];
      // Execution — trying to go above 100
      _react2.fireEvent.click(upBtn);
      // Assertions — clamped to max=100
      expect(onChange).toHaveBeenCalledWith({
        value: 100
      });
    });
  });
  // #endregion

  // #region value updated from outside
  describe('value updated from outside', function () {
    test('updates currentValue when value prop changes', function () {
      // Declaration
      var onChange = jest.fn();
      var _render8 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Slider.Slider, {
          min: 0,
          max: 100,
          value: 30,
          onChange: onChange
        })),
        container = _render8.container,
        rerender = _render8.rerender;
      // Execution
      rerender(/*#__PURE__*/_react["default"].createElement(_Slider.Slider, {
        min: 0,
        max: 100,
        value: 70,
        onChange: onChange
      }));
      // Assertions
      var activeBar = container.querySelector('.ap-slider__control--bar-active');
      expect(activeBar.style.width).toBe('70%');
    });
  });
  // #endregion

  // #region hidden input change
  describe('hidden input change', function () {
    test('calls onChange when the hidden number input changes', function () {
      // Declaration
      var onChange = jest.fn();
      var _render9 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Slider.Slider, {
          min: 0,
          max: 100,
          value: 50,
          onChange: onChange
        })),
        container = _render9.container;
      var input = container.querySelector('input[type="number"]');
      // Execution
      _react2.fireEvent.change(input, {
        target: {
          value: '75'
        }
      });
      // Assertions
      expect(onChange).toHaveBeenCalledWith({
        value: 75
      });
    });
  });
  // #endregion

  // #region mouse events on control
  describe('mouse events on control', function () {
    test('shows tooltip on mouseEnter', function () {
      // Declaration
      var onChange = jest.fn();
      var _render0 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Slider.Slider, {
          min: 0,
          max: 100,
          value: 50,
          onChange: onChange
        })),
        container = _render0.container;
      var control = container.querySelector('.ap-slider__control');
      // Execution
      _react2.fireEvent.mouseEnter(control);
      // Assertions
      var tooltip = container.querySelector('.ap-slider__control--toolip');
      expect(tooltip.style.opacity).toBe('1');
    });
    test('starts tooltip timeout on mouseLeave', function () {
      // Declaration
      var onChange = jest.fn();
      var _render1 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Slider.Slider, {
          min: 0,
          max: 100,
          value: 50,
          onChange: onChange
        })),
        container = _render1.container;
      var control = container.querySelector('.ap-slider__control');
      _react2.fireEvent.mouseEnter(control);
      // Execution
      _react2.fireEvent.mouseLeave(control);
      // Run timeout to hide tooltip
      (0, _react2.act)(function () {
        return jest.runAllTimers();
      });
      // Assertions
      var tooltip = container.querySelector('.ap-slider__control--toolip');
      expect(tooltip.style.opacity).toBe('0');
    });
    test('mouseDown starts drag mode (transition becomes none)', function () {
      // Declaration
      var onChange = jest.fn();
      var _render10 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Slider.Slider, {
          min: 0,
          max: 100,
          value: 50,
          onChange: onChange
        })),
        container = _render10.container;
      var control = container.querySelector('.ap-slider__control');
      // Execution
      _react2.fireEvent.mouseDown(control);
      // Assertions — drag mode = true means transition is 'none'
      var activeBar = container.querySelector('.ap-slider__control--bar-active');
      expect(activeBar.style.transition).toBe('none');
    });
    test('mouseUp stops drag', function () {
      // Declaration
      var onChange = jest.fn();
      var _render11 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Slider.Slider, {
          min: 0,
          max: 100,
          value: 50,
          onChange: onChange
        })),
        container = _render11.container;
      var sliderBar = container.querySelector('.ap-slider__control--bar');
      jest.spyOn(sliderBar, 'getBoundingClientRect').mockReturnValue({
        left: 0,
        width: 100,
        height: 0,
        top: 0,
        right: 100,
        bottom: 0,
        x: 0,
        y: 0,
        toJSON: function toJSON() {}
      });
      var control = container.querySelector('.ap-slider__control');
      _react2.fireEvent.mouseDown(control);
      // Execution
      (0, _react2.act)(function () {
        var mouseUpEvent = new MouseEvent('mouseup', {
          bubbles: true,
          clientX: 75
        });
        document.dispatchEvent(mouseUpEvent);
      });
      // Assertions — drag mode off
      var activeBar = container.querySelector('.ap-slider__control--bar-active');
      expect(activeBar.style.transition).not.toBe('none');
    });
    test('mousemove updates slider position during drag', function () {
      // Declaration
      var onChange = jest.fn();
      var _render12 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Slider.Slider, {
          min: 0,
          max: 100,
          value: 50,
          onChange: onChange
        })),
        container = _render12.container;
      var sliderBar = container.querySelector('.ap-slider__control--bar');
      jest.spyOn(sliderBar, 'getBoundingClientRect').mockReturnValue({
        left: 0,
        width: 100,
        height: 0,
        top: 0,
        right: 100,
        bottom: 0,
        x: 0,
        y: 0,
        toJSON: function toJSON() {}
      });
      var control = container.querySelector('.ap-slider__control');
      _react2.fireEvent.mouseDown(control);
      // Execution
      (0, _react2.act)(function () {
        var mouseMoveEvent = new MouseEvent('mousemove', {
          bubbles: true,
          clientX: 30
        });
        document.dispatchEvent(mouseMoveEvent);
      });
      // Assertions
      expect(onChange).toHaveBeenCalledWith({
        value: 30
      });
    });
    test('mouseleave on document stops drag', function () {
      // Declaration
      var onChange = jest.fn();
      var _render13 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Slider.Slider, {
          min: 0,
          max: 100,
          value: 50,
          onChange: onChange
        })),
        container = _render13.container;
      var sliderBar = container.querySelector('.ap-slider__control--bar');
      jest.spyOn(sliderBar, 'getBoundingClientRect').mockReturnValue({
        left: 0,
        width: 100,
        height: 0,
        top: 0,
        right: 100,
        bottom: 0,
        x: 0,
        y: 0,
        toJSON: function toJSON() {}
      });
      var control = container.querySelector('.ap-slider__control');
      _react2.fireEvent.mouseDown(control);
      // Execution
      (0, _react2.act)(function () {
        var mouseLeaveEvent = new MouseEvent('mouseleave', {
          bubbles: true,
          clientX: 50
        });
        document.dispatchEvent(mouseLeaveEvent);
      });
      // Assertions — drag stops
      var activeBar = container.querySelector('.ap-slider__control--bar-active');
      expect(activeBar.style.transition).not.toBe('none');
    });
  });
  // #endregion

  // #region touch events
  describe('touch events on control', function () {
    test('touchStart starts drag mode', function () {
      // Declaration
      var onChange = jest.fn();
      var _render14 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Slider.Slider, {
          min: 0,
          max: 100,
          value: 50,
          onChange: onChange
        })),
        container = _render14.container;
      var control = container.querySelector('.ap-slider__control');
      // Execution
      _react2.fireEvent.touchStart(control);
      // Assertions — dragMode active => transition none
      var activeBar = container.querySelector('.ap-slider__control--bar-active');
      expect(activeBar.style.transition).toBe('none');
    });
    test('touchend stops drag and calls onChange', function () {
      // Declaration
      var onChange = jest.fn();
      var _render15 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Slider.Slider, {
          min: 0,
          max: 100,
          value: 50,
          onChange: onChange
        })),
        container = _render15.container;
      var sliderBar = container.querySelector('.ap-slider__control--bar');
      jest.spyOn(sliderBar, 'getBoundingClientRect').mockReturnValue({
        left: 0,
        width: 100,
        height: 0,
        top: 0,
        right: 100,
        bottom: 0,
        x: 0,
        y: 0,
        toJSON: function toJSON() {}
      });
      var control = container.querySelector('.ap-slider__control');
      _react2.fireEvent.touchStart(control);
      // Execution
      (0, _react2.act)(function () {
        var touchEndEvent = new TouchEvent('touchend', {
          changedTouches: [new Touch({
            identifier: 1,
            target: sliderBar,
            clientX: 40
          })]
        });
        document.dispatchEvent(touchEndEvent);
      });
      // Assertions
      expect(onChange).toHaveBeenCalledWith({
        value: 40
      });
    });
    test('touchcancel stops drag', function () {
      // Declaration
      var onChange = jest.fn();
      var _render16 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Slider.Slider, {
          min: 0,
          max: 100,
          value: 50,
          onChange: onChange
        })),
        container = _render16.container;
      var sliderBar = container.querySelector('.ap-slider__control--bar');
      jest.spyOn(sliderBar, 'getBoundingClientRect').mockReturnValue({
        left: 0,
        width: 100,
        height: 0,
        top: 0,
        right: 100,
        bottom: 0,
        x: 0,
        y: 0,
        toJSON: function toJSON() {}
      });
      var control = container.querySelector('.ap-slider__control');
      _react2.fireEvent.touchStart(control);
      // Execution
      (0, _react2.act)(function () {
        var touchCancelEvent = new TouchEvent('touchcancel', {
          changedTouches: [new Touch({
            identifier: 1,
            target: sliderBar,
            clientX: 20
          })]
        });
        document.dispatchEvent(touchCancelEvent);
      });
      // Assertions — drag stopped
      var activeBar = container.querySelector('.ap-slider__control--bar-active');
      expect(activeBar.style.transition).not.toBe('none');
    });
    test('touchmove during drag calls onChange', function () {
      // Declaration
      var onChange = jest.fn();
      var _render17 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Slider.Slider, {
          min: 0,
          max: 100,
          value: 50,
          onChange: onChange
        })),
        container = _render17.container;
      var sliderBar = container.querySelector('.ap-slider__control--bar');
      jest.spyOn(sliderBar, 'getBoundingClientRect').mockReturnValue({
        left: 0,
        width: 100,
        height: 0,
        top: 0,
        right: 100,
        bottom: 0,
        x: 0,
        y: 0,
        toJSON: function toJSON() {}
      });
      var control = container.querySelector('.ap-slider__control');
      _react2.fireEvent.touchStart(control);
      // Execution
      (0, _react2.act)(function () {
        var touchMoveEvent = new TouchEvent('touchmove', {
          touches: [new Touch({
            identifier: 1,
            target: sliderBar,
            clientX: 60
          })]
        });
        document.dispatchEvent(touchMoveEvent);
      });
      // Assertions
      expect(onChange).toHaveBeenCalledWith({
        value: 60
      });
    });
  });
  // #endregion

  // #region NaN min/max
  describe('NaN min or max', function () {
    test('does not clamp when min is NaN', function () {
      // Declaration
      var onChange = jest.fn();
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Slider.Slider, {
        min: NaN,
        max: 100,
        step: 10,
        value: 50,
        onChange: onChange
      }));
      var _screen$getAllByTestI11 = _react2.screen.getAllByTestId('mock-button'),
        _screen$getAllByTestI12 = _slicedToArray(_screen$getAllByTestI11, 1),
        downBtn = _screen$getAllByTestI12[0];
      // Execution — down from 50 with step 10 => 40, min NaN => no clamping
      _react2.fireEvent.click(downBtn);
      // Assertions
      expect(onChange).toHaveBeenCalledWith({
        value: 40
      });
    });
    test('does not clamp when max is NaN', function () {
      // Declaration
      var onChange = jest.fn();
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Slider.Slider, {
        min: 0,
        max: NaN,
        step: 10,
        value: 50,
        onChange: onChange
      }));
      var _screen$getAllByTestI13 = _react2.screen.getAllByTestId('mock-button'),
        _screen$getAllByTestI14 = _slicedToArray(_screen$getAllByTestI13, 2),
        upBtn = _screen$getAllByTestI14[1];
      // Execution
      _react2.fireEvent.click(upBtn);
      // Assertions
      expect(onChange).toHaveBeenCalledWith({
        value: 60
      });
    });
  });
  // #endregion
  describe('slider click', function () {
    test('handleSliderClick moves slider to click position', function () {
      // Declaration
      var onChange = jest.fn();
      var _render18 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Slider.Slider, {
          min: 0,
          max: 100,
          value: 50,
          onChange: onChange
        })),
        container = _render18.container;
      var sliderBar = container.querySelector('.ap-slider__control--bar');
      jest.spyOn(sliderBar, 'getBoundingClientRect').mockReturnValue({
        left: 0,
        width: 100,
        height: 0,
        top: 0,
        right: 100,
        bottom: 0,
        x: 0,
        y: 0,
        toJSON: function toJSON() {}
      });
      var control = container.querySelector('.ap-slider__control');
      // Execution
      _react2.fireEvent.click(control, {
        clientX: 80
      });
      // Assertions
      expect(onChange).toHaveBeenCalledWith({
        value: 80
      });
    });
  });
  // #endregion
});