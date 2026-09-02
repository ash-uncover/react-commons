"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _ShellPage = require("./ShellPage");
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
    useClasseName: useClasseName,
    ShellContainer: function ShellContainer(_ref) {
      var children = _ref.children,
        className = _ref.className,
        level = _ref.level,
        style = _ref.style;
      return require('react').createElement('div', {
        'data-testid': 'mock-shell-container',
        className: className,
        'data-level': String(level),
        style: style
      }, children);
    }
  };
});
describe('ShellPage', function () {
  // #region render
  describe('render', function () {
    test('renders ShellContainer', function () {
      // Declaration
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_ShellPage.ShellPage, null));
      // Assertions
      expect(_react2.screen.getByTestId('mock-shell-container')).toBeInTheDocument();
    });
    test('applies ap-shell-page class', function () {
      // Declaration
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_ShellPage.ShellPage, null));
      // Assertions
      expect(_react2.screen.getByTestId('mock-shell-container')).toHaveClass('ap-shell-page');
    });
    test('passes level to ShellContainer', function () {
      // Declaration
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_ShellPage.ShellPage, {
        level: 3
      }));
      // Assertions
      expect(_react2.screen.getByTestId('mock-shell-container')).toHaveAttribute('data-level', '3');
    });
    test('renders children', function () {
      // Declaration
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_ShellPage.ShellPage, null, /*#__PURE__*/_react["default"].createElement("span", {
        "data-testid": "child"
      }, "Page content")));
      // Assertions
      expect(_react2.screen.getByTestId('child')).toBeInTheDocument();
    });
    test('applies custom className', function () {
      // Declaration
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_ShellPage.ShellPage, {
        className: "page-extra"
      }));
      // Assertions
      expect(_react2.screen.getByTestId('mock-shell-container')).toHaveClass('page-extra');
    });
  });
  // #endregion
});