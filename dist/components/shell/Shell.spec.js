"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _Shell = require("./Shell");
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
        'data-level': level,
        style: style
      }, children);
    }
  };
});
describe('Shell', function () {
  // #region render
  describe('render', function () {
    test('renders ShellContainer with level 0', function () {
      // Declaration
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Shell.Shell, null));
      // Assertions
      var container = _react2.screen.getByTestId('mock-shell-container');
      expect(container).toBeInTheDocument();
      expect(container).toHaveAttribute('data-level', '0');
    });
    test('renders children inside ShellContainer', function () {
      // Declaration
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Shell.Shell, null, /*#__PURE__*/_react["default"].createElement("span", {
        "data-testid": "child"
      }, "Content")));
      // Assertions
      expect(_react2.screen.getByTestId('child')).toBeInTheDocument();
    });
    test('applies ap-shell class to ShellContainer', function () {
      // Declaration
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Shell.Shell, null));
      // Assertions
      expect(_react2.screen.getByTestId('mock-shell-container')).toHaveClass('ap-shell');
    });
    test('applies custom className', function () {
      // Declaration
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Shell.Shell, {
        className: "my-shell"
      }));
      // Assertions
      expect(_react2.screen.getByTestId('mock-shell-container')).toHaveClass('my-shell');
    });
  });
  // #endregion
});