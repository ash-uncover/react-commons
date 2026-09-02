"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _MenuNavigationList = require("./MenuNavigationList");
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
    MenuNavigationItem: function MenuNavigationItem(_ref) {
      var name = _ref.name,
        onClick = _ref.onClick;
      return require('react').createElement('li', {
        'data-testid': 'mock-nav-item',
        'data-name': name,
        onClick: onClick
      });
    }
  };
});
describe('MenuNavigationList', function () {
  // #region render
  describe('render', function () {
    test('renders a ul element', function () {
      // Declaration
      // Execution
      var _render = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_MenuNavigationList.MenuNavigationList, {
          items: []
        })),
        container = _render.container;
      // Assertions
      expect(container.querySelector('ul')).toBeInTheDocument();
    });
    test('renders a MenuNavigationItem for each item', function () {
      // Declaration
      var items = [{
        name: 'Item 1',
        onClick: jest.fn()
      }, {
        name: 'Item 2',
        onClick: jest.fn()
      }];
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_MenuNavigationList.MenuNavigationList, {
        items: items
      }));
      // Assertions
      expect(_react2.screen.getAllByTestId('mock-nav-item')).toHaveLength(2);
    });
    test('passes the name prop to each MenuNavigationItem', function () {
      // Declaration
      var items = [{
        name: 'Settings',
        onClick: jest.fn()
      }];
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_MenuNavigationList.MenuNavigationList, {
        items: items
      }));
      // Assertions
      expect(_react2.screen.getByTestId('mock-nav-item')).toHaveAttribute('data-name', 'Settings');
    });
    test('renders an empty list when items is empty', function () {
      // Declaration
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_MenuNavigationList.MenuNavigationList, {
        items: []
      }));
      // Assertions
      expect(_react2.screen.queryAllByTestId('mock-nav-item')).toHaveLength(0);
    });
  });
  // #endregion

  // #region className passthrough
  describe('className passthrough', function () {
    test('applies custom className to ul', function () {
      // Declaration
      // Execution
      var _render2 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_MenuNavigationList.MenuNavigationList, {
          className: "my-list",
          items: []
        })),
        container = _render2.container;
      // Assertions
      expect(container.querySelector('ul')).toHaveClass('my-list');
    });
  });
  // #endregion
});