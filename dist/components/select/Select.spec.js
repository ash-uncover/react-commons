"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _Select = require("./Select");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } /**
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
    ICONS: {
      FAS_CHEVRON_LEFT: ['fas', 'chevron-left'],
      FAS_CHEVRON_RIGHT: ['fas', 'chevron-right']
    },
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
        'data-testid': 'mock-icon',
        'data-icon': String(icon)
      });
    }
  };
});
var VALUES = [{
  id: 'a',
  text: 'Apple'
}, {
  id: 'b',
  text: 'Banana'
}, {
  id: 'c',
  text: 'Cherry'
}];
describe('Select', function () {
  // #region render
  describe('render', function () {
    test('renders two buttons (prev/next)', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Select.Select, {
        value: "a",
        values: VALUES,
        onChange: onChange
      }));
      // Assertions
      expect(_react2.screen.getAllByTestId('mock-button')).toHaveLength(2);
    });
    test('displays the text of the selected value', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      var _render = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Select.Select, {
          value: "b",
          values: VALUES,
          onChange: onChange
        })),
        container = _render.container;
      // Assertions
      expect(container.querySelector('.ap-select__value')).toHaveTextContent('Banana');
    });
    test('displays null text when value is not in values list', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      var _render2 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Select.Select, {
          value: "z",
          values: VALUES,
          onChange: onChange
        })),
        container = _render2.container;
      // Assertions
      expect(container.querySelector('.ap-select__value')).toBeEmptyDOMElement();
    });
    test('disables buttons when disabled=true', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Select.Select, {
        disabled: true,
        value: "a",
        values: VALUES,
        onChange: onChange
      }));
      // Assertions
      var buttons = _react2.screen.getAllByTestId('mock-button');
      expect(buttons[0]).toBeDisabled();
      expect(buttons[1]).toBeDisabled();
    });
  });
  // #endregion

  // #region disabled modifier
  describe('disabled modifier', function () {
    test('adds disabled class when disabled=true', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      var _render3 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Select.Select, {
          disabled: true,
          value: "a",
          values: VALUES,
          onChange: onChange
        })),
        container = _render3.container;
      // Assertions
      expect(container.firstChild).toHaveClass('ap-select--disabled');
    });
    test('does not add disabled class when disabled is falsy', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      var _render4 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Select.Select, {
          value: "a",
          values: VALUES,
          onChange: onChange
        })),
        container = _render4.container;
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-select--disabled');
    });
    test('removes disabled class when disabled changes from true to false', function () {
      // Declaration
      var onChange = jest.fn();
      var _render5 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Select.Select, {
          disabled: true,
          value: "a",
          values: VALUES,
          onChange: onChange
        })),
        container = _render5.container,
        rerender = _render5.rerender;
      // Execution
      rerender(/*#__PURE__*/_react["default"].createElement(_Select.Select, {
        value: "a",
        values: VALUES,
        onChange: onChange
      }));
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-select--disabled');
    });
    test('cleans up disabled class on unmount', function () {
      // Declaration
      var onChange = jest.fn();
      var _render6 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Select.Select, {
          disabled: true,
          value: "a",
          values: VALUES,
          onChange: onChange
        })),
        unmount = _render6.unmount;
      // Execution + Assertions — no error
      unmount();
    });
  });
  // #endregion

  // #region previous value
  describe('previous value navigation', function () {
    test('calls onChange with previous value when prev button is clicked', function () {
      // Declaration
      var onChange = jest.fn();
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Select.Select, {
        value: "b",
        values: VALUES,
        onChange: onChange
      }));
      var _screen$getAllByTestI = _react2.screen.getAllByTestId('mock-button'),
        _screen$getAllByTestI2 = _slicedToArray(_screen$getAllByTestI, 1),
        prevBtn = _screen$getAllByTestI2[0];
      // Execution
      _react2.fireEvent.click(prevBtn);
      // Assertions
      expect(onChange).toHaveBeenCalledWith({
        value: 'a'
      });
    });
    test('wraps around to last value when at first value', function () {
      // Declaration
      var onChange = jest.fn();
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Select.Select, {
        value: "a",
        values: VALUES,
        onChange: onChange
      }));
      var _screen$getAllByTestI3 = _react2.screen.getAllByTestId('mock-button'),
        _screen$getAllByTestI4 = _slicedToArray(_screen$getAllByTestI3, 1),
        prevBtn = _screen$getAllByTestI4[0];
      // Execution
      _react2.fireEvent.click(prevBtn);
      // Assertions
      expect(onChange).toHaveBeenCalledWith({
        value: 'c'
      });
    });
    test('does not call onChange for prev when values is empty', function () {
      // Declaration
      var onChange = jest.fn();
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Select.Select, {
        value: "",
        values: [],
        onChange: onChange
      }));
      var _screen$getAllByTestI5 = _react2.screen.getAllByTestId('mock-button'),
        _screen$getAllByTestI6 = _slicedToArray(_screen$getAllByTestI5, 1),
        prevBtn = _screen$getAllByTestI6[0];
      // Execution
      _react2.fireEvent.click(prevBtn);
      // Assertions
      expect(onChange).not.toHaveBeenCalled();
    });
    test('does not call onChange for prev when value is set but values is empty', function () {
      // Declaration
      var onChange = jest.fn();
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Select.Select, {
        value: "a",
        values: [],
        onChange: onChange
      }));
      var _screen$getAllByTestI7 = _react2.screen.getAllByTestId('mock-button'),
        _screen$getAllByTestI8 = _slicedToArray(_screen$getAllByTestI7, 1),
        prevBtn = _screen$getAllByTestI8[0];
      // Execution
      _react2.fireEvent.click(prevBtn);
      // Assertions
      expect(onChange).not.toHaveBeenCalled();
    });
    test('does not call onChange for prev when value is empty string', function () {
      // Declaration
      var onChange = jest.fn();
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Select.Select, {
        value: "",
        values: VALUES,
        onChange: onChange
      }));
      var _screen$getAllByTestI9 = _react2.screen.getAllByTestId('mock-button'),
        _screen$getAllByTestI0 = _slicedToArray(_screen$getAllByTestI9, 1),
        prevBtn = _screen$getAllByTestI0[0];
      // Execution
      _react2.fireEvent.click(prevBtn);
      // Assertions
      expect(onChange).not.toHaveBeenCalled();
    });
  });
  // #endregion

  // #region next value
  describe('next value navigation', function () {
    test('calls onChange with next value when next button is clicked', function () {
      // Declaration
      var onChange = jest.fn();
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Select.Select, {
        value: "a",
        values: VALUES,
        onChange: onChange
      }));
      var _screen$getAllByTestI1 = _react2.screen.getAllByTestId('mock-button'),
        _screen$getAllByTestI10 = _slicedToArray(_screen$getAllByTestI1, 2),
        nextBtn = _screen$getAllByTestI10[1];
      // Execution
      _react2.fireEvent.click(nextBtn);
      // Assertions
      expect(onChange).toHaveBeenCalledWith({
        value: 'b'
      });
    });
    test('wraps around to first value when at last value', function () {
      // Declaration
      var onChange = jest.fn();
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Select.Select, {
        value: "c",
        values: VALUES,
        onChange: onChange
      }));
      var _screen$getAllByTestI11 = _react2.screen.getAllByTestId('mock-button'),
        _screen$getAllByTestI12 = _slicedToArray(_screen$getAllByTestI11, 2),
        nextBtn = _screen$getAllByTestI12[1];
      // Execution
      _react2.fireEvent.click(nextBtn);
      // Assertions
      expect(onChange).toHaveBeenCalledWith({
        value: 'a'
      });
    });
    test('does not call onChange for next when values is empty', function () {
      // Declaration
      var onChange = jest.fn();
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Select.Select, {
        value: "",
        values: [],
        onChange: onChange
      }));
      var _screen$getAllByTestI13 = _react2.screen.getAllByTestId('mock-button'),
        _screen$getAllByTestI14 = _slicedToArray(_screen$getAllByTestI13, 2),
        nextBtn = _screen$getAllByTestI14[1];
      // Execution
      _react2.fireEvent.click(nextBtn);
      // Assertions
      expect(onChange).not.toHaveBeenCalled();
    });
    test('does not call onChange for next when value is set but values is empty', function () {
      // Declaration
      var onChange = jest.fn();
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Select.Select, {
        value: "a",
        values: [],
        onChange: onChange
      }));
      var _screen$getAllByTestI15 = _react2.screen.getAllByTestId('mock-button'),
        _screen$getAllByTestI16 = _slicedToArray(_screen$getAllByTestI15, 2),
        nextBtn = _screen$getAllByTestI16[1];
      // Execution
      _react2.fireEvent.click(nextBtn);
      // Assertions
      expect(onChange).not.toHaveBeenCalled();
    });
  });
  // #endregion

  // #region value change from outside
  describe('value updated from outside', function () {
    test('updates displayed text when value prop changes', function () {
      // Declaration
      var onChange = jest.fn();
      var _render7 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Select.Select, {
          value: "a",
          values: VALUES,
          onChange: onChange
        })),
        container = _render7.container,
        rerender = _render7.rerender;
      // Execution
      rerender(/*#__PURE__*/_react["default"].createElement(_Select.Select, {
        value: "c",
        values: VALUES,
        onChange: onChange
      }));
      // Assertions
      expect(container.querySelector('.ap-select__value')).toHaveTextContent('Cherry');
    });
  });
  // #endregion
});