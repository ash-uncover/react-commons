"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _ShellContainer = require("./ShellContainer");
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
describe('ShellContainer', function () {
  // #region render
  describe('render', function () {
    test('renders a div with ap-shell-container class', function () {
      // Declaration
      // Execution
      var _render = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_ShellContainer.ShellContainer, null)),
        container = _render.container;
      // Assertions
      expect(container.firstChild).toHaveClass('ap-shell-container');
    });
    test('renders children', function () {
      // Declaration
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_ShellContainer.ShellContainer, null, /*#__PURE__*/_react["default"].createElement("span", {
        "data-testid": "child"
      }, "Content")));
      // Assertions
      expect(_react2.screen.getByTestId('child')).toBeInTheDocument();
    });
    test('applies custom className', function () {
      // Declaration
      // Execution
      var _render2 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_ShellContainer.ShellContainer, {
          className: "extra"
        })),
        container = _render2.container;
      // Assertions
      expect(container.firstChild).toHaveClass('extra');
    });
  });
  // #endregion

  // #region explicit level
  describe('explicit level prop', function () {
    test('applies level class when level is provided', function () {
      // Declaration
      // Execution
      var _render3 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_ShellContainer.ShellContainer, {
          level: 2
        })),
        container = _render3.container;
      // Assertions
      expect(container.firstChild).toHaveClass('ap-shell-container-2');
    });
    test('clamps level to 0 when negative', function () {
      // Declaration
      // Execution
      var _render4 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_ShellContainer.ShellContainer, {
          level: -5
        })),
        container = _render4.container;
      // Assertions
      expect(container.firstChild).toHaveClass('ap-shell-container-0');
    });
    test('clamps level to 10 when above max', function () {
      // Declaration
      // Execution
      var _render5 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_ShellContainer.ShellContainer, {
          level: 99
        })),
        container = _render5.container;
      // Assertions
      expect(container.firstChild).toHaveClass('ap-shell-container-10');
    });
    test('cleans up level class on unmount', function () {
      // Declaration
      var _render6 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_ShellContainer.ShellContainer, {
          level: 1
        })),
        unmount = _render6.unmount;
      // Execution + Assertions — no error
      unmount();
    });
  });
  // #endregion

  // #region auto level (no level prop)
  describe('auto level computation (no level prop)', function () {
    test('applies level 0 class when no parent ShellContainer', function () {
      // Declaration
      // Execution
      var _render7 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_ShellContainer.ShellContainer, null)),
        container = _render7.container;
      // Assertions
      expect(container.firstChild).toHaveClass('ap-shell-container-0');
    });
  });
  // #endregion
});
describe('computeContainerLevel', function () {
  test('returns 0 for a null element', function () {
    // Declaration
    // Execution
    var result = (0, _ShellContainer.computeContainerLevel)(null);
    // Assertions
    expect(result).toBe(0);
  });
  test('returns 0 for an element with no parent shell container', function () {
    // Declaration
    var el = document.createElement('div');
    document.body.appendChild(el);
    // Execution
    var result = (0, _ShellContainer.computeContainerLevel)(el);
    // Assertions
    expect(result).toBe(0);
    document.body.removeChild(el);
  });
  test('returns 1 when immediate parent has ap-shell-container class', function () {
    // Declaration
    var parent = document.createElement('div');
    parent.className = 'ap-shell-container';
    var child = document.createElement('div');
    parent.appendChild(child);
    document.body.appendChild(parent);
    // Execution
    var result = (0, _ShellContainer.computeContainerLevel)(child);
    // Assertions
    expect(result).toBe(1);
    document.body.removeChild(parent);
  });
  test('returns 2 when nested two levels deep', function () {
    // Declaration
    var grandparent = document.createElement('div');
    grandparent.className = 'ap-shell-container';
    var parent = document.createElement('div');
    parent.className = 'ap-shell-container';
    var child = document.createElement('div');
    grandparent.appendChild(parent);
    parent.appendChild(child);
    document.body.appendChild(grandparent);
    // Execution
    var result = (0, _ShellContainer.computeContainerLevel)(child);
    // Assertions
    expect(result).toBe(2);
    document.body.removeChild(grandparent);
  });
});
// #endregion

// #region validContainerLevel
describe('validContainerLevel', function () {
  test('returns the value unchanged when within 0-10', function () {
    expect((0, _ShellContainer.validContainerLevel)(5)).toBe(5);
  });
  test('clamps to 0 for negative values', function () {
    expect((0, _ShellContainer.validContainerLevel)(-1)).toBe(0);
  });
  test('clamps to 10 for values above 10', function () {
    expect((0, _ShellContainer.validContainerLevel)(11)).toBe(10);
  });
});
// #endregion

// #region getParentContainer
describe('getParentContainer', function () {
  test('returns null when element has no parentElement', function () {
    // Declaration
    var el = document.createElement('div');
    // Execution
    var result = (0, _ShellContainer.getParentContainer)(el);
    // Assertions
    expect(result).toBeNull();
  });
  test('returns parent when parent has ap-shell-container class', function () {
    // Declaration
    var parent = document.createElement('div');
    parent.className = 'ap-shell-container';
    var child = document.createElement('div');
    parent.appendChild(child);
    document.body.appendChild(parent);
    // Execution
    var result = (0, _ShellContainer.getParentContainer)(child);
    // Assertions
    expect(result).toBe(parent);
    document.body.removeChild(parent);
  });
  test('walks up the tree to find an ancestor with ap-shell-container class', function () {
    // Declaration
    var ancestor = document.createElement('div');
    ancestor.className = 'ap-shell-container';
    var middle = document.createElement('div');
    var child = document.createElement('div');
    ancestor.appendChild(middle);
    middle.appendChild(child);
    document.body.appendChild(ancestor);
    // Execution
    var result = (0, _ShellContainer.getParentContainer)(child);
    // Assertions
    expect(result).toBe(ancestor);
    document.body.removeChild(ancestor);
  });
  test('returns null when no ancestor has ap-shell-container class', function () {
    // Declaration
    var parent = document.createElement('div');
    var child = document.createElement('div');
    parent.appendChild(child);
    document.body.appendChild(parent);
    // Execution
    var result = (0, _ShellContainer.getParentContainer)(child);
    // Assertions
    expect(result).toBeNull();
    document.body.removeChild(parent);
  });
});
// #endregion