"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _AppMenuItem = require("./AppMenuItem");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * @jest-environment jsdom
 */

jest.mock('../..', function () {
  var ReactLib = require('react');
  var _require = require('../../hooks/useClasses'),
    useClasses = _require.useClasses,
    useClasseName = _require.useClasseName;
  return {
    __esModule: true,
    useClasses: useClasses,
    useClasseName: useClasseName,
    Icon: function Icon(_ref) {
      var className = _ref.className;
      return ReactLib.createElement('span', {
        'data-testid': 'mock-icon',
        className: className
      });
    },
    Label: function Label(_ref2) {
      var text = _ref2.text,
        className = _ref2.className;
      return ReactLib.createElement('span', {
        'data-testid': 'mock-label',
        className: className
      }, text);
    }
  };
});
describe('AppMenuItem', function () {
  // #region render
  describe('render', function () {
    test('renders label with provided name', function () {
      // Declaration
      var onClick = jest.fn();
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_AppMenuItem.AppMenuItem, {
        name: "Avatar",
        onClick: onClick
      }));
      // Assertions
      expect(_react2.screen.getByTestId('mock-label')).toHaveTextContent('Avatar');
    });
    test('renders icon when icon prop is provided', function () {
      // Declaration
      var onClick = jest.fn();
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_AppMenuItem.AppMenuItem, {
        icon: ['fas', 'user'],
        onClick: onClick
      }));
      // Assertions
      expect(_react2.screen.getByTestId('mock-icon')).toBeInTheDocument();
    });
    test('does not render icon when icon prop is absent', function () {
      // Declaration
      var onClick = jest.fn();
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_AppMenuItem.AppMenuItem, {
        onClick: onClick
      }));
      // Assertions
      expect(_react2.screen.queryByTestId('mock-icon')).not.toBeInTheDocument();
    });
    test('sets title from description prop', function () {
      // Declaration
      var onClick = jest.fn();
      // Execution
      var _render = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_AppMenuItem.AppMenuItem, {
          description: "My description",
          onClick: onClick
        })),
        container = _render.container;
      // Assertions
      expect(container.firstChild).toHaveAttribute('title', 'My description');
    });
    test('applies depth-based padding — depth defaults to 0 giving level 1', function () {
      // Declaration
      var onClick = jest.fn();
      // Execution
      var _render2 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_AppMenuItem.AppMenuItem, {
          onClick: onClick
        })),
        container = _render2.container;
      // Assertions
      expect(container.firstChild.style.paddingLeft).toBe('calc(var(--ap-padding-l) * 1)');
    });
    test('applies depth-based padding — explicit depth', function () {
      // Declaration
      var onClick = jest.fn();
      // Execution
      var _render3 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_AppMenuItem.AppMenuItem, {
          depth: 2,
          onClick: onClick
        })),
        container = _render3.container;
      // Assertions
      expect(container.firstChild.style.paddingLeft).toBe('calc(var(--ap-padding-l) * 3)');
    });
  });
  // #endregion

  // #region active
  describe('active modifier', function () {
    test('adds active class when active is true', function () {
      // Declaration
      var onClick = jest.fn();
      // Execution
      var _render4 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_AppMenuItem.AppMenuItem, {
          active: true,
          onClick: onClick
        })),
        container = _render4.container;
      // Assertions
      expect(container.firstChild).toHaveClass('ap-app-menu-item--active');
    });
    test('does not add active class when active is false', function () {
      // Declaration
      var onClick = jest.fn();
      // Execution
      var _render5 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_AppMenuItem.AppMenuItem, {
          active: false,
          onClick: onClick
        })),
        container = _render5.container;
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-app-menu-item--active');
    });
    test('removes active class when active changes from true to false', function () {
      // Declaration
      var onClick = jest.fn();
      var _render6 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_AppMenuItem.AppMenuItem, {
          active: true,
          onClick: onClick
        })),
        container = _render6.container,
        rerender = _render6.rerender;
      // Execution
      rerender(/*#__PURE__*/_react["default"].createElement(_AppMenuItem.AppMenuItem, {
        active: false,
        onClick: onClick
      }));
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-app-menu-item--active');
    });
    test('cleans up active class on unmount', function () {
      // Declaration
      var onClick = jest.fn();
      var _render7 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_AppMenuItem.AppMenuItem, {
          active: true,
          onClick: onClick
        })),
        unmount = _render7.unmount;
      // Execution + Assertions — no error, cleanup ran
      unmount();
    });
  });
  // #endregion

  // #region group
  describe('group modifier', function () {
    test('adds group class when group is true', function () {
      // Declaration
      var onClick = jest.fn();
      // Execution
      var _render8 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_AppMenuItem.AppMenuItem, {
          group: true,
          onClick: onClick
        })),
        container = _render8.container;
      // Assertions
      expect(container.firstChild).toHaveClass('ap-app-menu-item--group');
    });
    test('does not add group class when group is false', function () {
      // Declaration
      var onClick = jest.fn();
      // Execution
      var _render9 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_AppMenuItem.AppMenuItem, {
          group: false,
          onClick: onClick
        })),
        container = _render9.container;
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-app-menu-item--group');
    });
    test('removes group class when group changes from true to false', function () {
      // Declaration
      var onClick = jest.fn();
      var _render0 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_AppMenuItem.AppMenuItem, {
          group: true,
          onClick: onClick
        })),
        container = _render0.container,
        rerender = _render0.rerender;
      // Execution
      rerender(/*#__PURE__*/_react["default"].createElement(_AppMenuItem.AppMenuItem, {
        group: false,
        onClick: onClick
      }));
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-app-menu-item--group');
    });
    test('cleans up group class on unmount', function () {
      // Declaration
      var onClick = jest.fn();
      var _render1 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_AppMenuItem.AppMenuItem, {
          group: true,
          onClick: onClick
        })),
        unmount = _render1.unmount;
      // Execution + Assertions — no error, cleanup ran
      unmount();
    });
  });
  // #endregion

  // #region onClick
  describe('onClick', function () {
    test('calls onClick when the item is clicked', function () {
      // Declaration
      var onClick = jest.fn();
      var _render10 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_AppMenuItem.AppMenuItem, {
          name: "Avatar",
          onClick: onClick
        })),
        container = _render10.container;
      // Execution
      _react2.fireEvent.click(container.firstChild);
      // Assertions
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
  // #endregion
});