"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _PanelHeader = require("./PanelHeader");
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
describe('PanelHeader', function () {
  // #region render
  describe('render', function () {
    test('renders a div with ap-panel-header class', function () {
      // Declaration
      // Execution
      var _render = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_PanelHeader.PanelHeader, null)),
        container = _render.container;
      // Assertions
      expect(container.firstChild).toHaveClass('ap-panel-header');
    });
    test('renders children', function () {
      // Declaration
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_PanelHeader.PanelHeader, null, /*#__PURE__*/_react["default"].createElement("span", {
        "data-testid": "child"
      }, "Header content")));
      // Assertions
      expect(_react2.screen.getByTestId('child')).toBeInTheDocument();
    });
    test('applies custom className', function () {
      // Declaration
      // Execution
      var _render2 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_PanelHeader.PanelHeader, {
          className: "extra"
        })),
        container = _render2.container;
      // Assertions
      expect(container.firstChild).toHaveClass('extra');
    });
  });
  // #endregion
});