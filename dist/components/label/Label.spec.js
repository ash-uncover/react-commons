"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _Label = require("./Label");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * @jest-environment jsdom
 */

jest.mock('../..', function () {
  var _require = require('../../hooks/useClasses'),
    useClasses = _require.useClasses,
    useClasseName = _require.useClasseName;
  return {
    __esModule: true,
    useClasses: useClasses,
    useClasseName: useClasseName
  };
});
describe('Label', function () {
  // #region default (div) render
  describe('default render (div)', function () {
    test('renders a div when preferSpan is not set', function () {
      // Declaration
      // Execution
      var _render = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Label.Label, {
          text: "Hello"
        })),
        container = _render.container;
      // Assertions
      expect(container.querySelector('div')).toBeInTheDocument();
      expect(container.querySelector('span')).not.toBeInTheDocument();
    });
    test('renders text content in div', function () {
      // Declaration
      // Execution
      var _render2 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Label.Label, {
          text: "Hello"
        })),
        container = _render2.container;
      // Assertions
      expect(container.firstChild).toHaveTextContent('Hello');
    });
    test('renders children over text when both are provided', function () {
      // Declaration
      // Execution
      var _render3 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Label.Label, {
          text: "Ignored"
        }, /*#__PURE__*/_react["default"].createElement("span", {
          "data-testid": "child"
        }, "Child content"))),
        getByTestId = _render3.getByTestId;
      // Assertions
      expect(getByTestId('child')).toBeInTheDocument();
    });
  });
  // #endregion

  // #region span render
  describe('span render (preferSpan)', function () {
    test('renders a span when preferSpan is true', function () {
      // Declaration
      // Execution
      var _render4 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Label.Label, {
          preferSpan: true,
          text: "Hello"
        })),
        container = _render4.container;
      // Assertions
      expect(container.querySelector('span')).toBeInTheDocument();
      expect(container.querySelector('div')).not.toBeInTheDocument();
    });
    test('renders text content in span', function () {
      // Declaration
      // Execution
      var _render5 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Label.Label, {
          preferSpan: true,
          text: "Hello"
        })),
        container = _render5.container;
      // Assertions
      expect(container.firstChild).toHaveTextContent('Hello');
    });
    test('renders children over text when preferSpan is true', function () {
      // Declaration
      // Execution
      var _render6 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Label.Label, {
          preferSpan: true,
          text: "Ignored"
        }, /*#__PURE__*/_react["default"].createElement("span", {
          "data-testid": "child"
        }, "Child content"))),
        getByTestId = _render6.getByTestId;
      // Assertions
      expect(getByTestId('child')).toBeInTheDocument();
    });
  });
  // #endregion

  // #region className passthrough
  describe('className passthrough', function () {
    test('applies custom className', function () {
      // Declaration
      // Execution
      var _render7 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Label.Label, {
          className: "my-label",
          text: "Hi"
        })),
        container = _render7.container;
      // Assertions
      expect(container.firstChild).toHaveClass('my-label');
    });
  });
  // #endregion
});