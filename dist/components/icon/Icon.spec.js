"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _Icon = require("./Icon");
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
jest.mock('@fortawesome/react-fontawesome', function () {
  return {
    FontAwesomeIcon: function FontAwesomeIcon(_ref) {
      var className = _ref.className,
        style = _ref.style,
        icon = _ref.icon;
      return require('react').createElement('span', {
        'data-testid': 'mock-fa-icon',
        'data-icon': String(icon),
        className: className,
        style: style
      });
    }
  };
});
describe('Icon', function () {
  // #region render
  describe('render', function () {
    test('renders a FontAwesomeIcon', function () {
      // Declaration
      // Execution
      var _render = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Icon.Icon, {
          icon: ['fas', 'star']
        })),
        getByTestId = _render.getByTestId;
      // Assertions
      expect(getByTestId('mock-fa-icon')).toBeInTheDocument();
    });
    test('passes the icon prop to FontAwesomeIcon', function () {
      // Declaration
      // Execution
      var _render2 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Icon.Icon, {
          icon: ['fas', 'star']
        })),
        getByTestId = _render2.getByTestId;
      // Assertions
      expect(getByTestId('mock-fa-icon')).toHaveAttribute('data-icon', 'fas,star');
    });
    test('applies the ap-icon base class', function () {
      // Declaration
      // Execution
      var _render3 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Icon.Icon, {
          icon: ['fas', 'star']
        })),
        getByTestId = _render3.getByTestId;
      // Assertions
      expect(getByTestId('mock-fa-icon')).toHaveClass('ap-icon');
    });
  });
  // #endregion

  // #region className passthrough
  describe('className passthrough', function () {
    test('applies custom className', function () {
      // Declaration
      // Execution
      var _render4 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Icon.Icon, {
          className: "my-icon",
          icon: ['fas', 'star']
        })),
        getByTestId = _render4.getByTestId;
      // Assertions
      expect(getByTestId('mock-fa-icon')).toHaveClass('my-icon');
    });
  });
  // #endregion
});