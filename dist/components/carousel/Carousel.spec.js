"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _Carousel = require("./Carousel");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
jest.mock('../..', function () {
  var _require = require('../../hooks/usePrevious'),
    usePrevious = _require.usePrevious;
  return {
    __esModule: true,
    usePrevious: usePrevious
  };
});
describe('Carousel', function () {
  // #region getClassName
  describe('getClassName', function () {
    test('returns base class when no className provided', function () {
      // Declaration
      // Execution
      // Assertions
      expect((0, _Carousel.getClassName)()).toBe('carousel');
    });
    test('appends extra className', function () {
      // Declaration
      // Execution
      // Assertions
      expect((0, _Carousel.getClassName)('my-class')).toBe('carousel my-class');
    });
  });
  // #endregion

  // #region render
  describe('render', function () {
    test('renders a div with carousel class', function () {
      // Declaration
      // Execution
      var _render = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Carousel.Carousel, null)),
        container = _render.container;
      // Assertions
      expect(container.firstChild).toHaveClass('carousel');
    });
    test('applies custom className', function () {
      // Declaration
      // Execution
      var _render2 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Carousel.Carousel, {
          className: "custom"
        })),
        container = _render2.container;
      // Assertions
      expect(container.firstChild).toHaveClass('custom');
    });
    test('renders children in the current slide', function () {
      // Declaration
      // Execution
      var _render3 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Carousel.Carousel, null, /*#__PURE__*/_react["default"].createElement("span", null, "content"))),
        container = _render3.container;
      // Assertions
      expect(container.querySelector('.carousel-current')).toHaveTextContent('content');
    });
    test('renders the previous slide container', function () {
      // Declaration
      // Execution
      var _render4 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Carousel.Carousel, null)),
        container = _render4.container;
      // Assertions
      expect(container.querySelector('.carousel-previous')).toBeInTheDocument();
    });
    test('moves previous children to the previous slide on rerender', function () {
      // Declaration
      var _render5 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Carousel.Carousel, null, /*#__PURE__*/_react["default"].createElement("span", null, "first"))),
        container = _render5.container,
        rerender = _render5.rerender;
      // Execution
      rerender(/*#__PURE__*/_react["default"].createElement(_Carousel.Carousel, null, /*#__PURE__*/_react["default"].createElement("span", null, "second")));
      // Assertions
      expect(container.querySelector('.carousel-current')).toHaveTextContent('second');
      expect(container.querySelector('.carousel-previous')).toHaveTextContent('first');
    });
  });
  // #endregion

  // #region prepare class
  describe('prepare class', function () {
    afterEach(function () {
      jest.useRealTimers();
    });
    test('adds prepare class to container when children change', function () {
      // Declaration
      var _render6 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Carousel.Carousel, null, /*#__PURE__*/_react["default"].createElement("span", null, "first"))),
        container = _render6.container,
        rerender = _render6.rerender;
      // Execution
      rerender(/*#__PURE__*/_react["default"].createElement(_Carousel.Carousel, null, /*#__PURE__*/_react["default"].createElement("span", null, "second")));
      // Assertions
      expect(container.firstChild).toHaveClass('prepare');
    });
    test('removes prepare class after timeout fires', function () {
      // Declaration
      jest.useFakeTimers();
      var _render7 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Carousel.Carousel, null, /*#__PURE__*/_react["default"].createElement("span", null, "first"))),
        container = _render7.container,
        rerender = _render7.rerender;
      // Execution
      rerender(/*#__PURE__*/_react["default"].createElement(_Carousel.Carousel, null, /*#__PURE__*/_react["default"].createElement("span", null, "second")));
      (0, _react2.act)(function () {
        jest.runAllTimers();
      });
      // Assertions
      expect(container.firstChild).not.toHaveClass('prepare');
    });
    test('cleanClass is a no-op when component unmounts before timer fires', function () {
      // Declaration
      jest.useFakeTimers();
      var _render8 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Carousel.Carousel, null, /*#__PURE__*/_react["default"].createElement("span", null, "first"))),
        rerender = _render8.rerender,
        unmount = _render8.unmount;
      rerender(/*#__PURE__*/_react["default"].createElement(_Carousel.Carousel, null, /*#__PURE__*/_react["default"].createElement("span", null, "second")));
      // Execution
      unmount();
      // Assertions — no error when timer fires after unmount
      expect(function () {
        return (0, _react2.act)(function () {
          jest.runAllTimers();
        });
      }).not.toThrow();
    });
  });
  // #endregion
});