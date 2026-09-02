"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _Panel = require("./Panel");
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
    ButtonSemantics: {
      TRANSPARENT: 'TRANSPARENT'
    },
    Button: function Button(_ref) {
      var children = _ref.children,
        onClick = _ref.onClick;
      return require('react').createElement('button', {
        'data-testid': 'mock-button',
        onClick: onClick
      }, children);
    },
    ShellContainer: function ShellContainer(_ref2) {
      var children = _ref2.children,
        className = _ref2.className,
        style = _ref2.style;
      return require('react').createElement('div', {
        'data-testid': 'mock-shell-container',
        className: className,
        style: style
      }, children);
    },
    Title: function Title(_ref3) {
      var children = _ref3.children,
        className = _ref3.className,
        level = _ref3.level;
      return require('react').createElement('div', {
        'data-testid': 'mock-title',
        className: className,
        'data-level': level
      }, children);
    },
    TitleLevels: {
      H1: 'H1',
      H2: 'H2',
      H3: 'H3',
      H4: 'H4',
      H5: 'H5',
      H6: 'H6'
    }
  };
});
jest.mock('@fortawesome/react-fontawesome', function () {
  return {
    FontAwesomeIcon: function FontAwesomeIcon(_ref4) {
      var icon = _ref4.icon;
      return require('react').createElement('span', {
        'data-testid': 'mock-chevron',
        'data-icon': String(icon)
      });
    }
  };
});
jest.mock('@fortawesome/free-solid-svg-icons', function () {
  return {
    faChevronDown: 'faChevronDown',
    faChevronUp: 'faChevronUp'
  };
});
describe('Panel', function () {
  // #region render
  describe('render', function () {
    test('renders the title', function () {
      // Declaration
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Panel.Panel, {
        title: "My Panel"
      }));
      // Assertions
      expect(_react2.screen.getByTestId('mock-title')).toBeInTheDocument();
    });
    test('renders children when provided', function () {
      // Declaration
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Panel.Panel, {
        title: "Panel"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        "data-testid": "child"
      }, "Content")));
      // Assertions
      expect(_react2.screen.getByTestId('child')).toBeInTheDocument();
    });
    test('does not render content area when no children', function () {
      // Declaration
      // Execution
      var _render = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Panel.Panel, {
          title: "Empty Panel"
        })),
        container = _render.container;
      // Assertions
      expect(container.querySelector('.ap-panel__content')).not.toBeInTheDocument();
    });
    test('does not render expand button when expandable=false (default)', function () {
      // Declaration
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Panel.Panel, {
        title: "Panel"
      }, /*#__PURE__*/_react["default"].createElement("span", null, "Content")));
      // Assertions
      expect(_react2.screen.queryByTestId('mock-button')).not.toBeInTheDocument();
    });
    test('renders expand button when expandable=true', function () {
      // Declaration
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Panel.Panel, {
        title: "Panel",
        expandable: true
      }, /*#__PURE__*/_react["default"].createElement("span", null, "Content")));
      // Assertions
      expect(_react2.screen.getByTestId('mock-button')).toBeInTheDocument();
    });
  });
  // #endregion

  // #region expand / collapse classes
  describe('expand / collapse classes', function () {
    test('adds expanded class when children exist and not expandable', function () {
      // Declaration
      // Execution
      var _render2 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Panel.Panel, {
          title: "Panel"
        }, /*#__PURE__*/_react["default"].createElement("span", null, "Content"))),
        container = _render2.container;
      // Assertions
      expect(_react2.screen.getByTestId('mock-shell-container')).toHaveClass('ap-panel--expanded');
    });
    test('adds collapsed class when no children', function () {
      // Declaration
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Panel.Panel, {
        title: "Empty"
      }));
      // Assertions
      expect(_react2.screen.getByTestId('mock-shell-container')).toHaveClass('ap-panel--collapsed');
    });
    test('adds collapsed class initially when expandable=true and expanded=false', function () {
      // Declaration
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Panel.Panel, {
        title: "Panel",
        expandable: true,
        expanded: false
      }, /*#__PURE__*/_react["default"].createElement("span", null, "Content")));
      // Assertions
      expect(_react2.screen.getByTestId('mock-shell-container')).toHaveClass('ap-panel--collapsed');
    });
    test('adds expanded class when expandable=true and expanded=true (default)', function () {
      // Declaration
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Panel.Panel, {
        title: "Panel",
        expandable: true
      }, /*#__PURE__*/_react["default"].createElement("span", null, "Content")));
      // Assertions
      expect(_react2.screen.getByTestId('mock-shell-container')).toHaveClass('ap-panel--expanded');
    });
    test('cleans up expand/collapse class on unmount', function () {
      // Declaration
      var _render3 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Panel.Panel, {
          title: "Panel"
        }, /*#__PURE__*/_react["default"].createElement("span", null, "Content"))),
        unmount = _render3.unmount;
      // Execution + Assertions — no error
      unmount();
    });
  });
  // #endregion

  // #region expand / collapse toggle
  describe('expand / collapse toggle', function () {
    test('shows chevron-up icon when expanded', function () {
      // Declaration
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Panel.Panel, {
        title: "Panel",
        expandable: true
      }, /*#__PURE__*/_react["default"].createElement("span", null, "Content")));
      // Assertions
      expect(_react2.screen.getByTestId('mock-chevron')).toHaveAttribute('data-icon', 'faChevronUp');
    });
    test('shows chevron-down icon when collapsed (expanded=false)', function () {
      // Declaration
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Panel.Panel, {
        title: "Panel",
        expandable: true,
        expanded: false
      }, /*#__PURE__*/_react["default"].createElement("span", null, "Content")));
      // Assertions
      expect(_react2.screen.getByTestId('mock-chevron')).toHaveAttribute('data-icon', 'faChevronDown');
    });
    test('clicking expand button collapses the panel', function () {
      // Declaration
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Panel.Panel, {
        title: "Panel",
        expandable: true
      }, /*#__PURE__*/_react["default"].createElement("span", null, "Content")));
      var button = _react2.screen.getByTestId('mock-button');
      // Mock getBoundingClientRect on the content div
      var panelContent = document.querySelector('.ap-panel__content');
      if (panelContent) {
        jest.spyOn(panelContent, 'getBoundingClientRect').mockReturnValue({
          height: 200,
          width: 0,
          x: 0,
          y: 0,
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          toJSON: function toJSON() {}
        });
      }
      (0, _react2.act)(function () {
        _react2.fireEvent.click(button);
      });
      // Assertions — chevron changes to down
      expect(_react2.screen.getByTestId('mock-chevron')).toHaveAttribute('data-icon', 'faChevronDown');
    });
    test('clicking expand button twice expands the panel again', function () {
      // Declaration
      jest.useFakeTimers();
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Panel.Panel, {
        title: "Panel",
        expandable: true
      }, /*#__PURE__*/_react["default"].createElement("span", null, "Content")));
      var button = _react2.screen.getByTestId('mock-button');
      var panelContent = document.querySelector('.ap-panel__content');
      if (panelContent) {
        jest.spyOn(panelContent, 'getBoundingClientRect').mockReturnValue({
          height: 200,
          width: 0,
          x: 0,
          y: 0,
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          toJSON: function toJSON() {}
        });
      }
      (0, _react2.act)(function () {
        _react2.fireEvent.click(button);
      }); // collapse
      (0, _react2.act)(function () {
        jest.runAllTimers();
      }); // run the setTimeout
      // Execution
      (0, _react2.act)(function () {
        _react2.fireEvent.click(button);
      }); // expand
      // Assertions
      expect(_react2.screen.getByTestId('mock-chevron')).toHaveAttribute('data-icon', 'faChevronUp');
      jest.useRealTimers();
    });
    test('setTimeout callback handles null content.current gracefully (unmount before timeout)', function () {
      // Declaration
      jest.useFakeTimers();
      var _render4 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Panel.Panel, {
          title: "Panel",
          expandable: true
        }, /*#__PURE__*/_react["default"].createElement("span", null, "Content"))),
        unmount = _render4.unmount;
      var button = _react2.screen.getByTestId('mock-button');
      var panelContent = document.querySelector('.ap-panel__content');
      if (panelContent) {
        jest.spyOn(panelContent, 'getBoundingClientRect').mockReturnValue({
          height: 200,
          width: 0,
          x: 0,
          y: 0,
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          toJSON: function toJSON() {}
        });
      }
      // click to collapse (schedules setTimeout)
      (0, _react2.act)(function () {
        _react2.fireEvent.click(button);
      });
      // unmount before timeout fires
      unmount();
      // now run the timer — content.current is null since component unmounted
      (0, _react2.act)(function () {
        jest.runAllTimers();
      });
      // Assertions — no error thrown
      jest.useRealTimers();
      expect(true).toBe(true);
    });
  });
  // #region handleExpandClick null guard
  describe('handleExpandClick — null content ref', function () {
    test('does not throw when expand button is clicked with no children (content ref is null)', function () {
      // Declaration — expandable with no children: button renders but content div does not
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Panel.Panel, {
        title: "No Children",
        expandable: true
      }));
      var button = _react2.screen.getByTestId('mock-button');
      // Assertions — clicking should not throw even though content.current is null
      expect(function () {
        return _react2.fireEvent.click(button);
      }).not.toThrow();
    });
  });
  // #endregion
});