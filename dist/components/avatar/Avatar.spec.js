"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _Avatar = require("./Avatar");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * @jest-environment jsdom
 */
jest.mock('../..', function () {
  var _require = require('../../hooks/useClasses'),
    useClasses = _require.useClasses,
    useClasseName = _require.useClasseName;
  return _objectSpread({
    __esModule: true,
    useClasses: useClasses,
    useClasseName: useClasseName
  }, require('./AvatarSize'));
});
jest.mock('@fortawesome/react-fontawesome', function () {
  return {
    FontAwesomeIcon: function FontAwesomeIcon(_ref) {
      var className = _ref.className;
      return require('react').createElement('span', {
        'data-testid': 'mock-fa-icon',
        className: className
      });
    }
  };
});
jest.mock('@fortawesome/free-solid-svg-icons', function () {
  return {
    faUser: 'faUser'
  };
});
describe('Avatar', function () {
  // #region render variants
  describe('render content variants', function () {
    test('renders an img element when image prop is provided', function () {
      // Declaration
      // Execution
      var _render = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Avatar.Avatar, {
          image: "http://example.com/avatar.png"
        })),
        container = _render.container;
      // Assertions
      expect(container.querySelector('img')).toBeInTheDocument();
    });
    test('renders FontAwesomeIcon with provided icon when icon prop is given', function () {
      // Declaration
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Avatar.Avatar, {
        icon: ['fas', 'user']
      }));
      // Assertions
      expect(_react2.screen.getByTestId('mock-fa-icon')).toBeInTheDocument();
    });
    test('renders initials span (max 2 chars, uppercased) when initials prop is given', function () {
      // Declaration
      // Execution
      var _render2 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Avatar.Avatar, {
          initials: "abc"
        })),
        container = _render2.container;
      // Assertions
      var span = container.querySelector('.ap-avatar__content');
      expect(span).toHaveTextContent('AB');
    });
    test('renders default FontAwesomeIcon when no image/icon/initials provided', function () {
      // Declaration
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Avatar.Avatar, null));
      // Assertions
      expect(_react2.screen.getByTestId('mock-fa-icon')).toBeInTheDocument();
    });
  });
  // #endregion

  // #region size modifier
  describe('size modifier', function () {
    test('applies size class for S (default)', function () {
      // Declaration
      // Execution
      var _render3 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Avatar.Avatar, null)),
        container = _render3.container;
      // Assertions
      expect(container.firstChild).toHaveClass('ap-avatar--s');
    });
    test('applies size class for provided size XL', function () {
      // Declaration
      // Execution
      var _render4 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Avatar.Avatar, {
          size: "XL"
        })),
        container = _render4.container;
      // Assertions
      expect(container.firstChild).toHaveClass('ap-avatar--xl');
    });
    test('removes old size class and adds new when size prop changes', function () {
      // Declaration
      var _render5 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Avatar.Avatar, {
          size: "S"
        })),
        container = _render5.container,
        rerender = _render5.rerender;
      // Execution
      rerender(/*#__PURE__*/_react["default"].createElement(_Avatar.Avatar, {
        size: "L"
      }));
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-avatar--s');
      expect(container.firstChild).toHaveClass('ap-avatar--l');
    });
  });
  // #endregion

  // #region interactive modifier
  describe('interactive modifier', function () {
    test('adds interactive class when onClick is provided', function () {
      // Declaration
      var onClick = jest.fn();
      // Execution
      var _render6 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Avatar.Avatar, {
          onClick: onClick
        })),
        container = _render6.container;
      // Assertions
      expect(container.firstChild).toHaveClass('ap-avatar--interactive');
    });
    test('does not add interactive class when onClick is absent', function () {
      // Declaration
      // Execution
      var _render7 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Avatar.Avatar, null)),
        container = _render7.container;
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-avatar--interactive');
    });
    test('removes interactive class when onClick changes to undefined', function () {
      // Declaration
      var onClick = jest.fn();
      var _render8 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Avatar.Avatar, {
          onClick: onClick
        })),
        container = _render8.container,
        rerender = _render8.rerender;
      // Execution
      rerender(/*#__PURE__*/_react["default"].createElement(_Avatar.Avatar, null));
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-avatar--interactive');
    });
    test('calls onClick handler when clicked', function () {
      // Declaration
      var onClick = jest.fn();
      var _render9 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Avatar.Avatar, {
          onClick: onClick
        })),
        container = _render9.container;
      // Execution
      _react2.fireEvent.click(container.firstChild);
      // Assertions
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
  // #endregion

  // #region content-type modifier
  describe('content-type modifier', function () {
    test('adds image class when image is provided', function () {
      // Declaration
      // Execution
      var _render0 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Avatar.Avatar, {
          image: "img.png"
        })),
        container = _render0.container;
      // Assertions
      expect(container.firstChild).toHaveClass('ap-avatar--image');
    });
    test('adds icon class when icon is provided (no image)', function () {
      // Declaration
      // Execution
      var _render1 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Avatar.Avatar, {
          icon: ['fas', 'user']
        })),
        container = _render1.container;
      // Assertions
      expect(container.firstChild).toHaveClass('ap-avatar--icon');
    });
    test('adds initials class when initials is provided (no image/icon)', function () {
      // Declaration
      // Execution
      var _render10 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Avatar.Avatar, {
          initials: "AB"
        })),
        container = _render10.container;
      // Assertions
      expect(container.firstChild).toHaveClass('ap-avatar--initials');
    });
    test('adds icon class when nothing is provided (fallback)', function () {
      // Declaration
      // Execution
      var _render11 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Avatar.Avatar, null)),
        container = _render11.container;
      // Assertions
      expect(container.firstChild).toHaveClass('ap-avatar--icon');
    });
    test('removes old content classes when switching from image to icon', function () {
      // Declaration
      var _render12 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Avatar.Avatar, {
          image: "img.png"
        })),
        container = _render12.container,
        rerender = _render12.rerender;
      // Execution
      rerender(/*#__PURE__*/_react["default"].createElement(_Avatar.Avatar, {
        icon: ['fas', 'star']
      }));
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-avatar--image');
      expect(container.firstChild).toHaveClass('ap-avatar--icon');
    });
  });
  // #endregion

  // #region className and style passthrough
  describe('className and style passthrough', function () {
    test('applies custom className', function () {
      // Declaration
      // Execution
      var _render13 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Avatar.Avatar, {
          className: "my-avatar"
        })),
        container = _render13.container;
      // Assertions
      expect(container.firstChild).toHaveClass('my-avatar');
    });
    test('sets title attribute', function () {
      // Declaration
      // Execution
      var _render14 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Avatar.Avatar, {
          title: "Profile picture"
        })),
        container = _render14.container;
      // Assertions
      expect(container.firstChild).toHaveAttribute('title', 'Profile picture');
    });
  });
  // #endregion
});