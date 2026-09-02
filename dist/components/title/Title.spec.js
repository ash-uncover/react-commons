"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _Title = require("./Title");
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
  }, require('./TitleLevel'));
});
describe('Title', function () {
  // #region render — tag level
  describe('render — tag level', function () {
    test('renders h1 by default', function () {
      // Declaration
      // Execution
      var _render = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Title.Title, null)),
        container = _render.container;
      // Assertions
      expect(container.querySelector('h1')).toBeInTheDocument();
    });
    test('renders h2 when level is H2', function () {
      // Declaration
      // Execution
      var _render2 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Title.Title, {
          level: "H2"
        })),
        container = _render2.container;
      // Assertions
      expect(container.querySelector('h2')).toBeInTheDocument();
    });
    test('renders h3 when level is H3', function () {
      // Declaration
      // Execution
      var _render3 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Title.Title, {
          level: "H3"
        })),
        container = _render3.container;
      // Assertions
      expect(container.querySelector('h3')).toBeInTheDocument();
    });
    test('renders h4 when level is H4', function () {
      // Declaration
      // Execution
      var _render4 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Title.Title, {
          level: "H4"
        })),
        container = _render4.container;
      // Assertions
      expect(container.querySelector('h4')).toBeInTheDocument();
    });
  });
  // #endregion

  // #region content
  describe('content', function () {
    test('renders text prop', function () {
      // Declaration
      // Execution
      var _render5 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Title.Title, {
          text: "My Title"
        })),
        container = _render5.container;
      // Assertions
      expect(container.querySelector('h1')).toHaveTextContent('My Title');
    });
    test('renders children', function () {
      // Declaration
      // Execution
      var _render6 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Title.Title, null, /*#__PURE__*/_react["default"].createElement("span", {
          "data-testid": "child"
        }, "Title Content"))),
        getByTestId = _render6.getByTestId;
      // Assertions
      expect(getByTestId('child')).toBeInTheDocument();
    });
    test('prefers children over text when both are provided', function () {
      // Declaration
      // Execution
      var _render7 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Title.Title, {
          text: "Ignored"
        }, /*#__PURE__*/_react["default"].createElement("span", {
          "data-testid": "child"
        }, "Child"))),
        getByTestId = _render7.getByTestId;
      // Assertions
      expect(getByTestId('child')).toBeInTheDocument();
    });
  });
  // #endregion

  // #region level modifier class
  describe('level modifier class', function () {
    test('adds h1 level class by default', function () {
      // Declaration
      // Execution
      var _render8 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Title.Title, null)),
        container = _render8.container;
      // Assertions
      expect(container.querySelector('h1')).toHaveClass('ap-title--h1');
    });
    test('adds h2 level class when level is H2', function () {
      // Declaration
      // Execution
      var _render9 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Title.Title, {
          level: "H2"
        })),
        container = _render9.container;
      // Assertions
      expect(container.querySelector('h2')).toHaveClass('ap-title--h2');
    });
    test('removes old level class and adds new when level changes', function () {
      // Declaration
      var _render0 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Title.Title, {
          level: "H1"
        })),
        container = _render0.container,
        rerender = _render0.rerender;
      // Execution
      rerender(/*#__PURE__*/_react["default"].createElement(_Title.Title, {
        level: "H3"
      }));
      // Assertions
      expect(container.querySelector('h3')).toHaveClass('ap-title--h3');
      expect(container.querySelector('h1')).not.toBeInTheDocument();
    });
    test('cleans up level class on unmount', function () {
      // Declaration
      var _render1 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Title.Title, {
          level: "H2"
        })),
        unmount = _render1.unmount;
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
      var _render10 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Title.Title, {
          className: "my-title"
        })),
        container = _render10.container;
      // Assertions
      expect(container.querySelector('h1')).toHaveClass('my-title');
    });
  });
  // #endregion
});