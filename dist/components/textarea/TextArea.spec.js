"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _TextArea = require("./TextArea");
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
describe('TextArea', function () {
  // #region render
  describe('render', function () {
    test('renders a textarea element', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      var _render = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_TextArea.TextArea, {
          onChange: onChange
        })),
        container = _render.container;
      // Assertions
      expect(container.querySelector('textarea')).toBeInTheDocument();
    });
    test('passes name prop to textarea', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      var _render2 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_TextArea.TextArea, {
          name: "bio",
          onChange: onChange
        })),
        container = _render2.container;
      // Assertions
      expect(container.querySelector('textarea')).toHaveAttribute('name', 'bio');
    });
    test('passes placeholder prop to textarea', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      var _render3 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_TextArea.TextArea, {
          placeholder: "Enter bio",
          onChange: onChange
        })),
        container = _render3.container;
      // Assertions
      expect(container.querySelector('textarea')).toHaveAttribute('placeholder', 'Enter bio');
    });
    test('passes disabled prop to textarea', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      var _render4 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_TextArea.TextArea, {
          disabled: true,
          onChange: onChange
        })),
        container = _render4.container;
      // Assertions
      expect(container.querySelector('textarea')).toBeDisabled();
    });
    test('passes rows prop to textarea', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      var _render5 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_TextArea.TextArea, {
          rows: 5,
          onChange: onChange
        })),
        container = _render5.container;
      // Assertions
      expect(container.querySelector('textarea')).toHaveAttribute('rows', '5');
    });
    test('passes value prop to textarea', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      var _render6 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_TextArea.TextArea, {
          value: "hello",
          onChange: onChange
        })),
        container = _render6.container;
      // Assertions
      expect(container.querySelector('textarea')).toHaveValue('hello');
    });
    test('applies custom className', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      var _render7 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_TextArea.TextArea, {
          className: "my-area",
          onChange: onChange
        })),
        container = _render7.container;
      // Assertions
      expect(container.firstChild).toHaveClass('my-area');
    });
  });
  // #endregion

  // #region onChange
  describe('onChange', function () {
    test('calls onChange with new value when textarea changes', function () {
      // Declaration
      var onChange = jest.fn();
      var _render8 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_TextArea.TextArea, {
          value: "old",
          onChange: onChange
        })),
        container = _render8.container;
      // Execution
      _react2.fireEvent.change(container.querySelector('textarea'), {
        target: {
          value: 'new value'
        }
      });
      // Assertions
      expect(onChange).toHaveBeenCalledWith({
        value: 'new value'
      });
    });
  });
  // #endregion

  // #region focus / blur
  describe('focus and blur', function () {
    test('sets tabIndex to -1 on wrapper div when focused', function () {
      // Declaration
      var onChange = jest.fn();
      var _render9 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_TextArea.TextArea, {
          onChange: onChange
        })),
        container = _render9.container;
      var wrapper = container.firstChild;
      // Execution
      _react2.fireEvent.focus(wrapper);
      // Assertions
      expect(wrapper).toHaveAttribute('tabindex', '-1');
    });
    test('sets tabIndex back to 0 on blur', function () {
      // Declaration
      var onChange = jest.fn();
      var _render0 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_TextArea.TextArea, {
          onChange: onChange
        })),
        container = _render0.container;
      var wrapper = container.firstChild;
      _react2.fireEvent.focus(wrapper);
      // Execution
      _react2.fireEvent.blur(container.querySelector('textarea'));
      // Assertions
      expect(wrapper).toHaveAttribute('tabindex', '0');
    });
    test('calls focus() on the textarea when wrapper is focused', function () {
      // Declaration
      var onChange = jest.fn();
      var _render1 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_TextArea.TextArea, {
          onChange: onChange
        })),
        container = _render1.container;
      var wrapper = container.firstChild;
      var textarea = container.querySelector('textarea');
      var focusSpy = jest.spyOn(textarea, 'focus');
      // Execution
      _react2.fireEvent.focus(wrapper);
      // Assertions
      expect(focusSpy).toHaveBeenCalled();
    });
  });
  // #endregion
});