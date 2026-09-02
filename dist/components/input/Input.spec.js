"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _Input = require("./Input");
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
        onMouseDown = _ref.onMouseDown,
        onMouseLeave = _ref.onMouseLeave,
        onMouseUp = _ref.onMouseUp,
        onClick = _ref.onClick;
      return require('react').createElement('span', {
        'data-testid': 'mock-fa-icon',
        className: className,
        onMouseDown: onMouseDown,
        onMouseLeave: onMouseLeave,
        onMouseUp: onMouseUp,
        onClick: onClick
      });
    }
  };
});
jest.mock('@fortawesome/free-solid-svg-icons', function () {
  return {
    faRemove: 'faRemove'
  };
});
jest.mock('@fortawesome/free-regular-svg-icons', function () {
  return {
    faEye: 'faEye'
  };
});
describe('Input', function () {
  // #region render
  describe('render', function () {
    test('renders an input element', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      var _render = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Input.Input, {
          onChange: onChange
        })),
        container = _render.container;
      // Assertions
      expect(container.querySelector('input')).toBeInTheDocument();
    });
    test('passes name to input', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      var _render2 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Input.Input, {
          name: "username",
          onChange: onChange
        })),
        container = _render2.container;
      // Assertions
      expect(container.querySelector('input')).toHaveAttribute('name', 'username');
    });
    test('passes placeholder to input', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      var _render3 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Input.Input, {
          placeholder: "Enter text",
          onChange: onChange
        })),
        container = _render3.container;
      // Assertions
      expect(container.querySelector('input')).toHaveAttribute('placeholder', 'Enter text');
    });
    test('passes disabled to input', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      var _render4 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Input.Input, {
          disabled: true,
          onChange: onChange
        })),
        container = _render4.container;
      // Assertions
      expect(container.querySelector('input')).toBeDisabled();
    });
    test('passes value to input', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      var _render5 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Input.Input, {
          value: "hello",
          onChange: onChange
        })),
        container = _render5.container;
      // Assertions
      expect(container.querySelector('input')).toHaveValue('hello');
    });
    test('renders type=password on the input', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      var _render6 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Input.Input, {
          type: "password",
          value: "secret",
          onChange: onChange
        })),
        container = _render6.container;
      // Assertions
      expect(container.querySelector('input')).toHaveAttribute('type', 'password');
    });
  });
  // #endregion

  // #region onChange
  describe('onChange', function () {
    test('calls onChange with new value when input changes', function () {
      // Declaration
      var onChange = jest.fn();
      var _render7 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Input.Input, {
          value: "old",
          onChange: onChange
        })),
        container = _render7.container;
      // Execution
      _react2.fireEvent.change(container.querySelector('input'), {
        target: {
          value: 'new'
        }
      });
      // Assertions
      expect(onChange).toHaveBeenCalledWith({
        value: 'new'
      });
    });
  });
  // #endregion

  // #region focus / blur
  describe('focus and blur', function () {
    test('sets tabIndex to -1 on wrapper div when focused', function () {
      // Declaration
      var onChange = jest.fn();
      var _render8 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Input.Input, {
          onChange: onChange
        })),
        container = _render8.container;
      var wrapper = container.firstChild;
      // Execution
      _react2.fireEvent.focus(wrapper);
      // Assertions
      expect(wrapper).toHaveAttribute('tabindex', '-1');
    });
    test('sets tabIndex back to 0 when blurred', function () {
      // Declaration
      var onChange = jest.fn();
      var _render9 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Input.Input, {
          onChange: onChange
        })),
        container = _render9.container;
      var wrapper = container.firstChild;
      _react2.fireEvent.focus(wrapper);
      // Execution
      _react2.fireEvent.blur(container.querySelector('input'));
      // Assertions
      expect(wrapper).toHaveAttribute('tabindex', '0');
    });
    test('calls select() on focus when autoSelect is true', function () {
      // Declaration
      var onChange = jest.fn();
      var _render0 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Input.Input, {
          autoSelect: true,
          value: "hello",
          onChange: onChange
        })),
        container = _render0.container;
      var wrapper = container.firstChild;
      var inputEl = container.querySelector('input');
      var selectSpy = jest.spyOn(inputEl, 'select');
      // Execution
      _react2.fireEvent.focus(wrapper);
      // Assertions
      expect(selectSpy).toHaveBeenCalled();
    });
    test('calls focus() on focus when autoFocus is true (and autoSelect is false)', function () {
      // Declaration
      var onChange = jest.fn();
      var _render1 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Input.Input, {
          autoFocus: true,
          value: "hello",
          onChange: onChange
        })),
        container = _render1.container;
      var wrapper = container.firstChild;
      var inputEl = container.querySelector('input');
      var focusSpy = jest.spyOn(inputEl, 'focus');
      // Execution
      _react2.fireEvent.focus(wrapper);
      // Assertions
      expect(focusSpy).toHaveBeenCalled();
    });
  });
  // #endregion

  // #region password icon
  describe('password icon', function () {
    test('shows password icon when showPasswordIcon=true, type=password, and value is not empty', function () {
      // Declaration
      var onChange = jest.fn();
      var _render10 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Input.Input, {
          showPasswordIcon: true,
          type: "password",
          value: "secret",
          onChange: onChange
        })),
        getAllByTestId = _render10.getAllByTestId;
      // Execution + Assertions
      var icons = getAllByTestId('mock-fa-icon');
      expect(icons.some(function (i) {
        return i.classList.contains('ap-input__action-password');
      })).toBe(true);
    });
    test('does not show password icon when value is empty', function () {
      // Declaration
      var onChange = jest.fn();
      var _render11 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Input.Input, {
          showPasswordIcon: true,
          type: "password",
          value: "",
          onChange: onChange
        })),
        queryAllByTestId = _render11.queryAllByTestId;
      // Execution + Assertions
      var icons = queryAllByTestId('mock-fa-icon');
      expect(icons.every(function (i) {
        return !i.classList.contains('ap-input__action-password');
      })).toBe(true);
    });
    test('toggles show-password class when password icon is mousedown', function () {
      // Declaration
      var onChange = jest.fn();
      var _render12 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Input.Input, {
          showPasswordIcon: true,
          type: "password",
          value: "secret",
          onChange: onChange
        })),
        container = _render12.container,
        getAllByTestId = _render12.getAllByTestId;
      var icon = getAllByTestId('mock-fa-icon').find(function (i) {
        return i.classList.contains('ap-input__action-password');
      });
      // Execution
      _react2.fireEvent.mouseDown(icon);
      // Assertions
      expect(container.firstChild).toHaveClass('ap-input--show-password');
    });
    test('removes show-password class on mouseLeave', function () {
      // Declaration
      var onChange = jest.fn();
      var _render13 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Input.Input, {
          showPasswordIcon: true,
          type: "password",
          value: "secret",
          onChange: onChange
        })),
        container = _render13.container,
        getAllByTestId = _render13.getAllByTestId;
      var icon = getAllByTestId('mock-fa-icon').find(function (i) {
        return i.classList.contains('ap-input__action-password');
      });
      _react2.fireEvent.mouseDown(icon); // toggle on
      // Execution
      _react2.fireEvent.mouseLeave(icon);
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-input--show-password');
    });
    test('removes show-password class on mouseUp', function () {
      // Declaration
      var onChange = jest.fn();
      var _render14 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Input.Input, {
          showPasswordIcon: true,
          type: "password",
          value: "secret",
          onChange: onChange
        })),
        container = _render14.container,
        getAllByTestId = _render14.getAllByTestId;
      var icon = getAllByTestId('mock-fa-icon').find(function (i) {
        return i.classList.contains('ap-input__action-password');
      });
      _react2.fireEvent.mouseDown(icon); // toggle on
      // Execution
      _react2.fireEvent.mouseUp(icon);
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-input--show-password');
    });
    test('passes empty type to input when showPassword is active', function () {
      // Declaration
      var onChange = jest.fn();
      var _render15 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Input.Input, {
          showPasswordIcon: true,
          type: "password",
          value: "secret",
          onChange: onChange
        })),
        container = _render15.container,
        getAllByTestId = _render15.getAllByTestId;
      var icon = getAllByTestId('mock-fa-icon').find(function (i) {
        return i.classList.contains('ap-input__action-password');
      });
      // Execution
      _react2.fireEvent.mouseDown(icon);
      // Assertions — type becomes '' (show password)
      expect(container.querySelector('input')).not.toHaveAttribute('type', 'password');
    });
    test('cleans up show-password class on unmount', function () {
      // Declaration
      var onChange = jest.fn();
      var _render16 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Input.Input, {
          showPasswordIcon: true,
          type: "password",
          value: "secret",
          onChange: onChange
        })),
        unmount = _render16.unmount,
        getAllByTestId = _render16.getAllByTestId;
      var icon = getAllByTestId('mock-fa-icon').find(function (i) {
        return i.classList.contains('ap-input__action-password');
      });
      _react2.fireEvent.mouseDown(icon);
      // Execution + Assertions — no error
      unmount();
    });
  });
  // #endregion

  // #region clear icon
  describe('clear icon', function () {
    test('shows clear icon when showClearIcon=true and value is not empty', function () {
      // Declaration
      var onChange = jest.fn();
      var _render17 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Input.Input, {
          showClearIcon: true,
          value: "hello",
          onChange: onChange
        })),
        getAllByTestId = _render17.getAllByTestId;
      // Execution + Assertions
      expect(getAllByTestId('mock-fa-icon').length).toBeGreaterThan(0);
    });
    test('does not show clear icon when value is empty', function () {
      // Declaration
      var onChange = jest.fn();
      var _render18 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Input.Input, {
          showClearIcon: true,
          value: "",
          onChange: onChange
        })),
        queryAllByTestId = _render18.queryAllByTestId;
      // Execution + Assertions
      expect(queryAllByTestId('mock-fa-icon')).toHaveLength(0);
    });
    test('calls onChange with empty string when clear icon is clicked', function () {
      // Declaration
      var onChange = jest.fn();
      var _render19 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Input.Input, {
          showClearIcon: true,
          value: "hello",
          onChange: onChange
        })),
        getAllByTestId = _render19.getAllByTestId;
      var icon = getAllByTestId('mock-fa-icon')[0];
      // Execution
      _react2.fireEvent.click(icon);
      // Assertions
      expect(onChange).toHaveBeenCalledWith({
        value: ''
      });
    });
  });
  // #endregion
});