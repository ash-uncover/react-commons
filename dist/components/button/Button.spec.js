"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _Button = require("./Button");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * @jest-environment jsdom
 */
jest.mock('../..', function () {
  var _require = require('../../hooks/useClasses'),
    useClasses = _require.useClasses,
    useClasseName = _require.useClasseName;
  return _objectSpread({
    __esModule: true,
    useClasses: useClasses,
    useClasseName: useClasseName
  }, require('./ButtonSemantic'));
});
jest.mock('@fortawesome/react-fontawesome', function () {
  return {
    FontAwesomeIcon: function FontAwesomeIcon(_ref) {
      var className = _ref.className;
      return require('react').createElement('span', {
        'data-testid': 'mock-fa-icon',
        className: className
      });
    }
  };
});
describe('Button', function () {
  // #region render
  describe('render', function () {
    test('renders a button element', function () {
      // Declaration
      // Execution
      var _render = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Button.Button, null)),
        container = _render.container;
      // Assertions
      expect(container.querySelector('button')).toBeInTheDocument();
    });
    test('renders text when text prop is provided', function () {
      // Declaration
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Button.Button, {
        text: "Click me"
      }));
      // Assertions
      expect(_react2.screen.getByText('Click me')).toBeInTheDocument();
    });
    test('renders children', function () {
      // Declaration
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Button.Button, null, /*#__PURE__*/_react["default"].createElement("span", {
        "data-testid": "child"
      }, "Child")));
      // Assertions
      expect(_react2.screen.getByTestId('child')).toBeInTheDocument();
    });
    test('renders icon when icon prop is provided', function () {
      // Declaration
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Button.Button, {
        icon: ['fas', 'star']
      }));
      // Assertions
      var icons = _react2.screen.getAllByTestId('mock-fa-icon');
      expect(icons.some(function (i) {
        return i.classList.contains('ap-button__icon-start');
      })).toBe(true);
    });
    test('does not render icon-start when icon prop is absent', function () {
      // Declaration
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Button.Button, {
        text: "Save"
      }));
      // Assertions
      expect(_react2.screen.queryByTestId('mock-fa-icon')).toBeNull();
    });
    test('renders iconEnd when iconEnd prop is provided', function () {
      // Declaration
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Button.Button, {
        iconEnd: ['fas', 'arrow-right']
      }));
      // Assertions
      var icons = _react2.screen.getAllByTestId('mock-fa-icon');
      expect(icons.some(function (i) {
        return i.classList.contains('ap-button__icon-end');
      })).toBe(true);
    });
    test('passes type to the native button element', function () {
      // Declaration
      // Execution
      var _render2 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Button.Button, {
          type: "submit"
        })),
        container = _render2.container;
      // Assertions
      expect(container.querySelector('button')).toHaveAttribute('type', 'submit');
    });
    test('passes disabled to the native button element', function () {
      // Declaration
      // Execution
      var _render3 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Button.Button, {
          disabled: true
        })),
        container = _render3.container;
      // Assertions
      expect(container.querySelector('button')).toBeDisabled();
    });
    test('passes title to the native button element', function () {
      // Declaration
      // Execution
      var _render4 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Button.Button, {
          title: "My title"
        })),
        container = _render4.container;
      // Assertions
      expect(container.querySelector('button')).toHaveAttribute('title', 'My title');
    });
  });
  // #endregion

  // #region semantic modifier
  describe('semantic modifier', function () {
    test('adds default semantic class when semantic is DEFAULT', function () {
      // Declaration
      // Execution
      var _render5 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Button.Button, {
          semantic: "DEFAULT"
        })),
        container = _render5.container;
      // Assertions
      expect(container.firstChild).toHaveClass('ap-button--default');
    });
    test('adds positive semantic class', function () {
      // Declaration
      // Execution
      var _render6 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Button.Button, {
          semantic: "POSITIVE"
        })),
        container = _render6.container;
      // Assertions
      expect(container.firstChild).toHaveClass('ap-button--positive');
    });
    test('removes old semantic class and adds new when semantic changes', function () {
      // Declaration
      var _render7 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Button.Button, {
          semantic: "POSITIVE"
        })),
        container = _render7.container,
        rerender = _render7.rerender;
      // Execution
      rerender(/*#__PURE__*/_react["default"].createElement(_Button.Button, {
        semantic: "NEGATIVE"
      }));
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-button--positive');
      expect(container.firstChild).toHaveClass('ap-button--negative');
    });
    test('cleans up semantic class on unmount', function () {
      // Declaration
      var _render8 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Button.Button, {
          semantic: "POSITIVE"
        })),
        unmount = _render8.unmount;
      // Execution + Assertions — no error
      unmount();
    });
  });
  // #endregion

  // #region icon-only modifier
  describe('icon-only modifier', function () {
    test('adds icon-only class when only icon is present (no iconEnd, no text, no children)', function () {
      // Declaration
      // Execution
      var _render9 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Button.Button, {
          icon: ['fas', 'star']
        })),
        container = _render9.container;
      // Assertions
      expect(container.firstChild).toHaveClass('ap-button--icon-only');
    });
    test('adds icon-only class when only iconEnd is present (no icon, no text, no children)', function () {
      // Declaration
      // Execution
      var _render0 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Button.Button, {
          iconEnd: ['fas', 'star']
        })),
        container = _render0.container;
      // Assertions
      expect(container.firstChild).toHaveClass('ap-button--icon-only');
    });
    test('does not add icon-only class when both icon and iconEnd are present', function () {
      // Declaration
      // Execution
      var _render1 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Button.Button, {
          icon: ['fas', 'star'],
          iconEnd: ['fas', 'arrow-right']
        })),
        container = _render1.container;
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-button--icon-only');
    });
    test('does not add icon-only class when text is also present', function () {
      // Declaration
      // Execution
      var _render10 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Button.Button, {
          icon: ['fas', 'star'],
          text: "Save"
        })),
        container = _render10.container;
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-button--icon-only');
    });
    test('does not add icon-only class when children are present', function () {
      // Declaration
      // Execution
      var _render11 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Button.Button, {
          icon: ['fas', 'star']
        }, /*#__PURE__*/_react["default"].createElement("span", null, "content"))),
        container = _render11.container;
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-button--icon-only');
    });
    test('removes icon-only class when text is added', function () {
      // Declaration
      var _render12 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Button.Button, {
          icon: ['fas', 'star']
        })),
        container = _render12.container,
        rerender = _render12.rerender;
      // Execution
      rerender(/*#__PURE__*/_react["default"].createElement(_Button.Button, {
        icon: ['fas', 'star'],
        text: "Label"
      }));
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-button--icon-only');
    });
    test('cleans up icon-only class on unmount', function () {
      // Declaration
      var _render13 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Button.Button, {
          icon: ['fas', 'star']
        })),
        unmount = _render13.unmount;
      // Execution + Assertions — no error
      unmount();
    });
  });
  // #endregion

  // #region onClick
  describe('onClick', function () {
    test('calls onClick handler when button is clicked', function () {
      // Declaration
      var onClick = jest.fn();
      var _render14 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Button.Button, {
          onClick: onClick
        })),
        container = _render14.container;
      // Execution
      _react2.fireEvent.click(container.querySelector('button'));
      // Assertions
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
  // #endregion
});