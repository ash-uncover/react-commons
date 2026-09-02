"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _Switch = require("./Switch");
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
describe('Switch', function () {
  // #region render
  describe('render', function () {
    test('renders a checkbox input', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      var _render = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Switch.Switch, {
          checked: false,
          label: "Toggle",
          onChange: onChange
        })),
        container = _render.container;
      // Assertions
      expect(container.querySelector('input[type="checkbox"]')).toBeInTheDocument();
    });
    test('renders a label element', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      var _render2 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Switch.Switch, {
          checked: false,
          label: "Toggle",
          onChange: onChange
        })),
        container = _render2.container;
      // Assertions
      expect(container.querySelector('label')).toBeInTheDocument();
    });
    test('renders label text', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      var _render3 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Switch.Switch, {
          checked: false,
          label: "Dark mode",
          onChange: onChange
        })),
        container = _render3.container;
      // Assertions
      expect(container.querySelector('label')).toHaveTextContent('Dark mode');
    });
    test('sets checked on the input', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      var _render4 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Switch.Switch, {
          checked: true,
          label: "Toggle",
          onChange: onChange
        })),
        container = _render4.container;
      // Assertions
      expect(container.querySelector('input[type="checkbox"]')).toBeChecked();
    });
    test('input and label share the same id (htmlFor)', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      var _render5 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Switch.Switch, {
          checked: false,
          label: "Toggle",
          onChange: onChange
        })),
        container = _render5.container;
      var input = container.querySelector('input[type="checkbox"]');
      var label = container.querySelector('label');
      // Assertions
      expect(label).toHaveAttribute('for', input.id);
    });
    test('sets name attribute to label value', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      var _render6 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Switch.Switch, {
          checked: false,
          label: "my-switch",
          onChange: onChange
        })),
        container = _render6.container;
      // Assertions
      expect(container.querySelector('input[type="checkbox"]')).toHaveAttribute('name', 'my-switch');
    });
    test('applies custom className', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      var _render7 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Switch.Switch, {
          className: "extra",
          checked: false,
          label: "Toggle",
          onChange: onChange
        })),
        container = _render7.container;
      // Assertions
      expect(container.firstChild).toHaveClass('extra');
    });
  });
  // #endregion

  // #region onChange
  describe('onChange', function () {
    test('calls onChange with true when checkbox is checked via click', function () {
      // Declaration
      var onChange = jest.fn();
      var _render8 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Switch.Switch, {
          checked: false,
          label: "Toggle",
          onChange: onChange
        })),
        container = _render8.container;
      var input = container.querySelector('input[type="checkbox"]');
      // Execution — fireEvent.click toggles the checked value and fires onChange
      _react2.fireEvent.click(input);
      // Assertions
      expect(onChange).toHaveBeenCalledWith({
        value: true
      });
    });
    test('calls onChange with false when checked checkbox is clicked', function () {
      // Declaration
      var onChange = jest.fn();
      var _render9 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Switch.Switch, {
          checked: true,
          label: "Toggle",
          onChange: onChange
        })),
        container = _render9.container;
      var input = container.querySelector('input[type="checkbox"]');
      // Execution
      _react2.fireEvent.click(input);
      // Assertions
      expect(onChange).toHaveBeenCalledWith({
        value: false
      });
    });
  });
  // #endregion
});