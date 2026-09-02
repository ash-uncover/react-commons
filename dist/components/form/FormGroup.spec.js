"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _FormGroup = require("./FormGroup");
var _ = require("../..");
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
  }, require('./FormGroupDirection'));
});
describe('FormGroup', function () {
  // #region render
  describe('render', function () {
    test('renders a div', function () {
      // Declaration
      // Execution
      var _render = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_FormGroup.FormGroup, null)),
        container = _render.container;
      // Assertions
      expect(container.querySelector('div')).toBeInTheDocument();
    });
    test('renders children inside the div', function () {
      // Declaration
      // Execution
      var _render2 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_FormGroup.FormGroup, null, /*#__PURE__*/_react["default"].createElement("span", {
          "data-testid": "child"
        }, "Child"))),
        getByTestId = _render2.getByTestId;
      // Assertions
      expect(getByTestId('child')).toBeInTheDocument();
    });
  });
  // #endregion

  // #region direction modifier
  describe('direction modifier', function () {
    test('adds vertical class when direction is VERTICAL (default)', function () {
      // Declaration
      // Execution
      var _render3 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_FormGroup.FormGroup, null)),
        container = _render3.container;
      // Assertions
      expect(container.firstChild).toHaveClass('ap-form-group--vertical');
    });
    test('adds horizontal class when direction is HORIZONTAL', function () {
      // Declaration
      // Execution
      var _render4 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_FormGroup.FormGroup, {
          direction: _.FormGroupDirections.HORIZONTAL
        })),
        container = _render4.container;
      // Assertions
      expect(container.firstChild).toHaveClass('ap-form-group--horizontal');
    });
    test('removes old direction class and adds new when direction changes', function () {
      // Declaration
      var _render5 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_FormGroup.FormGroup, {
          direction: _.FormGroupDirections.VERTICAL
        })),
        container = _render5.container,
        rerender = _render5.rerender;
      // Execution
      rerender(/*#__PURE__*/_react["default"].createElement(_FormGroup.FormGroup, {
        direction: _.FormGroupDirections.HORIZONTAL
      }));
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-form-group--vertical');
      expect(container.firstChild).toHaveClass('ap-form-group--horizontal');
    });
    test('cleans up direction class on unmount', function () {
      // Declaration
      var _render6 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_FormGroup.FormGroup, {
          direction: _.FormGroupDirections.HORIZONTAL
        })),
        unmount = _render6.unmount;
      // Execution + Assertions — no error
      unmount();
    });
  });
  // #endregion

  // #region className passthrough
  describe('className passthrough', function () {
    test('applies custom className', function () {
      // Declaration
      // Execution
      var _render7 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_FormGroup.FormGroup, {
          className: "my-group"
        })),
        container = _render7.container;
      // Assertions
      expect(container.firstChild).toHaveClass('my-group');
    });
  });
  // #endregion
});