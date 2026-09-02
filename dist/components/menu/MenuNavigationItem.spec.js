"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _MenuNavigationItem = require("./MenuNavigationItem");
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
        className = _ref.className;
      return require('react').createElement('div', {
        'data-testid': 'mock-shell-container',
        className: className
      }, children);
    }
  };
});
jest.mock('@fortawesome/react-fontawesome', function () {
  return {
    FontAwesomeIcon: function FontAwesomeIcon(_ref2) {
      var className = _ref2.className;
      return require('react').createElement('span', {
        'data-testid': 'mock-fa-icon',
        className: className
      });
    }
  };
});
describe('MenuNavigationItem', function () {
  // #region non-container render
  describe('non-container render', function () {
    test('renders an li element', function () {
      // Declaration
      var onClick = jest.fn();
      // Execution
      var _render = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_MenuNavigationItem.MenuNavigationItem, {
          onClick: onClick
        })),
        container = _render.container;
      // Assertions
      expect(container.querySelector('li')).toBeInTheDocument();
    });
    test('renders the name text', function () {
      // Declaration
      var onClick = jest.fn();
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_MenuNavigationItem.MenuNavigationItem, {
        name: "Settings",
        onClick: onClick
      }));
      // Assertions
      expect(_react2.screen.getByText('Settings')).toBeInTheDocument();
    });
    test('renders a FontAwesomeIcon when icon is provided', function () {
      // Declaration
      var onClick = jest.fn();
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_MenuNavigationItem.MenuNavigationItem, {
        icon: ['fas', 'gear'],
        onClick: onClick
      }));
      // Assertions
      expect(_react2.screen.getByTestId('mock-fa-icon')).toBeInTheDocument();
    });
    test('does not render icon when icon prop is absent', function () {
      // Declaration
      var onClick = jest.fn();
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_MenuNavigationItem.MenuNavigationItem, {
        onClick: onClick
      }));
      // Assertions
      expect(_react2.screen.queryByTestId('mock-fa-icon')).not.toBeInTheDocument();
    });
    test('sets title attribute from description', function () {
      // Declaration
      var onClick = jest.fn();
      // Execution
      var _render2 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_MenuNavigationItem.MenuNavigationItem, {
          description: "My description",
          onClick: onClick
        })),
        container = _render2.container;
      // Assertions
      expect(container.querySelector('li')).toHaveAttribute('title', 'My description');
    });
    test('calls onClick when li is clicked', function () {
      // Declaration
      var onClick = jest.fn();
      var _render3 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_MenuNavigationItem.MenuNavigationItem, {
          onClick: onClick
        })),
        container = _render3.container;
      // Execution
      _react2.fireEvent.click(container.querySelector('li'));
      // Assertions
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
  // #endregion

  // #region container render
  describe('container render', function () {
    test('renders ShellContainer when container=true', function () {
      // Declaration
      var onClick = jest.fn();
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_MenuNavigationItem.MenuNavigationItem, {
        container: true,
        onClick: onClick
      }));
      // Assertions
      expect(_react2.screen.getByTestId('mock-shell-container')).toBeInTheDocument();
    });
    test('renders icon inside ShellContainer when container=true and icon is provided', function () {
      // Declaration
      var onClick = jest.fn();
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_MenuNavigationItem.MenuNavigationItem, {
        container: true,
        icon: ['fas', 'gear'],
        onClick: onClick
      }));
      // Assertions
      expect(_react2.screen.getByTestId('mock-fa-icon')).toBeInTheDocument();
    });
    test('does not render icon when container=true and icon is absent', function () {
      // Declaration
      var onClick = jest.fn();
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_MenuNavigationItem.MenuNavigationItem, {
        container: true,
        onClick: onClick
      }));
      // Assertions
      expect(_react2.screen.queryByTestId('mock-fa-icon')).not.toBeInTheDocument();
    });
  });
  // #endregion

  // #region selected modifier
  describe('selected modifier', function () {
    test('adds selected class when selected=true', function () {
      // Declaration
      var onClick = jest.fn();
      // Execution
      var _render4 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_MenuNavigationItem.MenuNavigationItem, {
          selected: true,
          onClick: onClick
        })),
        container = _render4.container;
      // Assertions
      expect(container.firstChild).toHaveClass('ap-menu-navigation-item--selected');
    });
    test('does not add selected class when selected=false', function () {
      // Declaration
      var onClick = jest.fn();
      // Execution
      var _render5 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_MenuNavigationItem.MenuNavigationItem, {
          selected: false,
          onClick: onClick
        })),
        container = _render5.container;
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-menu-navigation-item--selected');
    });
    test('removes selected class when selected changes from true to false', function () {
      // Declaration
      var onClick = jest.fn();
      var _render6 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_MenuNavigationItem.MenuNavigationItem, {
          selected: true,
          onClick: onClick
        })),
        container = _render6.container,
        rerender = _render6.rerender;
      // Execution
      rerender(/*#__PURE__*/_react["default"].createElement(_MenuNavigationItem.MenuNavigationItem, {
        selected: false,
        onClick: onClick
      }));
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-menu-navigation-item--selected');
    });
    test('cleans up selected class on unmount', function () {
      // Declaration
      var onClick = jest.fn();
      var _render7 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_MenuNavigationItem.MenuNavigationItem, {
          selected: true,
          onClick: onClick
        })),
        unmount = _render7.unmount;
      // Execution + Assertions — no error
      unmount();
    });
  });
  // #endregion

  // #region container modifier class
  describe('container modifier class', function () {
    test('adds container class when container is falsy (non-container mode)', function () {
      // Declaration
      var onClick = jest.fn();
      // Execution
      var _render8 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_MenuNavigationItem.MenuNavigationItem, {
          onClick: onClick
        })),
        container = _render8.container;
      // Assertions
      expect(container.firstChild).toHaveClass('ap-menu-navigation-item--container');
    });
    test('removes container class when container prop changes to true', function () {
      // Declaration
      var onClick = jest.fn();
      var _render9 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_MenuNavigationItem.MenuNavigationItem, {
          onClick: onClick
        })),
        container = _render9.container,
        rerender = _render9.rerender;
      // Execution
      rerender(/*#__PURE__*/_react["default"].createElement(_MenuNavigationItem.MenuNavigationItem, {
        container: true,
        onClick: onClick
      }));
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-menu-navigation-item--container');
    });
    test('cleans up container modifier class on unmount', function () {
      // Declaration
      var onClick = jest.fn();
      var _render0 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_MenuNavigationItem.MenuNavigationItem, {
          onClick: onClick
        })),
        unmount = _render0.unmount;
      // Execution + Assertions — no error
      unmount();
    });
  });
  // #endregion
});