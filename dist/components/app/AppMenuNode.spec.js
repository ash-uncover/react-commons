"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _AppMenuNode = require("./AppMenuNode");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * @jest-environment jsdom
 */
var mockNavigate = jest.fn();
var mockPathname = {
  value: '/'
};
jest.mock('react-router', function () {
  return {
    useLocation: function useLocation() {
      return {
        pathname: mockPathname.value
      };
    },
    useNavigate: function useNavigate() {
      return mockNavigate;
    }
  };
});
jest.mock('./AppMenuItem', function () {
  return {
    AppMenuItem: function AppMenuItem(_ref) {
      var name = _ref.name,
        active = _ref.active,
        group = _ref.group,
        depth = _ref.depth,
        onClick = _ref.onClick;
      return require('react').createElement('div', {
        'data-testid': 'mock-app-menu-item',
        'data-name': name,
        'data-active': String(active),
        'data-group': String(group),
        'data-depth': String(depth),
        onClick: onClick
      });
    }
  };
});
var buildDef = function buildDef() {
  var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _objectSpread({
    name: 'Test',
    path: '/test',
    parents: [],
    items: []
  }, overrides);
};
describe('AppMenuNode', function () {
  beforeEach(function () {
    mockNavigate.mockClear();
    mockPathname.value = '/';
  });

  // #region leaf node
  describe('leaf node (no items)', function () {
    test('renders AppMenuItem', function () {
      // Declaration
      var def = buildDef();
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_AppMenuNode.AppMenuNode, {
        def: def
      }));
      // Assertions
      expect(_react2.screen.getByTestId('mock-app-menu-item')).toBeInTheDocument();
    });
    test('passes name to AppMenuItem', function () {
      // Declaration
      var def = buildDef({
        name: 'Avatar'
      });
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_AppMenuNode.AppMenuNode, {
        def: def
      }));
      // Assertions
      expect(_react2.screen.getByTestId('mock-app-menu-item')).toHaveAttribute('data-name', 'Avatar');
    });
    test('is active when pathname matches path exactly', function () {
      // Declaration
      mockPathname.value = '/components/avatar';
      var def = buildDef({
        path: '/components/avatar'
      });
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_AppMenuNode.AppMenuNode, {
        def: def
      }));
      // Assertions
      expect(_react2.screen.getByTestId('mock-app-menu-item')).toHaveAttribute('data-active', 'true');
    });
    test('is not active when pathname does not match', function () {
      // Declaration
      mockPathname.value = '/components/button';
      var def = buildDef({
        path: '/components/avatar'
      });
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_AppMenuNode.AppMenuNode, {
        def: def
      }));
      // Assertions
      expect(_react2.screen.getByTestId('mock-app-menu-item')).toHaveAttribute('data-active', 'false');
    });
    test('derives depth 0 from single parent (the root)', function () {
      // Declaration
      var rootDef = buildDef({
        path: '/'
      });
      var def = buildDef({
        path: '/test',
        parents: [rootDef]
      });
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_AppMenuNode.AppMenuNode, {
        def: def
      }));
      // Assertions
      expect(_react2.screen.getByTestId('mock-app-menu-item')).toHaveAttribute('data-depth', '0');
    });
    test('navigates to own path on click when no items', function () {
      // Declaration
      var def = buildDef({
        path: '/components/avatar'
      });
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_AppMenuNode.AppMenuNode, {
        def: def
      }));
      // Execution
      _react2.fireEvent.click(_react2.screen.getByTestId('mock-app-menu-item'));
      // Assertions
      expect(mockNavigate).toHaveBeenCalledWith('/components/avatar');
    });
    test('navigates to own path on click when component is present', function () {
      // Declaration
      var def = buildDef({
        path: '/components/avatar',
        component: function component() {
          return null;
        }
      });
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_AppMenuNode.AppMenuNode, {
        def: def
      }));
      // Execution
      _react2.fireEvent.click(_react2.screen.getByTestId('mock-app-menu-item'));
      // Assertions
      expect(mockNavigate).toHaveBeenCalledWith('/components/avatar');
    });
  });
  // #endregion

  // #region group node
  describe('group node (has items)', function () {
    test('renders AppMenuItem with group flag', function () {
      // Declaration
      var child = buildDef({
        path: '/section/page'
      });
      var def = buildDef({
        path: '/section',
        items: [child]
      });
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_AppMenuNode.AppMenuNode, {
        def: def
      }));
      // Assertions
      expect(_react2.screen.getAllByTestId('mock-app-menu-item')[0]).toHaveAttribute('data-group', 'true');
    });
    test('renders child nodes', function () {
      // Declaration
      var child = buildDef({
        name: 'Child',
        path: '/section/child'
      });
      var def = buildDef({
        path: '/section',
        items: [child]
      });
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_AppMenuNode.AppMenuNode, {
        def: def
      }));
      // Assertions
      expect(_react2.screen.getAllByTestId('mock-app-menu-item')).toHaveLength(2);
    });
    test('group header is active ancestor when pathname starts with path/', function () {
      // Declaration
      mockPathname.value = '/section/page';
      var child = buildDef({
        path: '/section/page'
      });
      var def = buildDef({
        path: '/section',
        items: [child]
      });
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_AppMenuNode.AppMenuNode, {
        def: def
      }));
      // Assertions
      expect(_react2.screen.getAllByTestId('mock-app-menu-item')[0]).toHaveAttribute('data-active', 'true');
    });
    test('active ancestor check handles root path correctly', function () {
      // Declaration
      mockPathname.value = '/page';
      var child = buildDef({
        path: '/page'
      });
      var def = buildDef({
        path: '/',
        items: [child]
      });
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_AppMenuNode.AppMenuNode, {
        def: def
      }));
      // Assertions
      expect(_react2.screen.getAllByTestId('mock-app-menu-item')[0]).toHaveAttribute('data-active', 'true');
    });
    test('group header is not active when pathname is unrelated', function () {
      // Declaration
      mockPathname.value = '/other';
      var child = buildDef({
        path: '/section/page'
      });
      var def = buildDef({
        path: '/section',
        items: [child]
      });
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_AppMenuNode.AppMenuNode, {
        def: def
      }));
      // Assertions
      expect(_react2.screen.getAllByTestId('mock-app-menu-item')[0]).toHaveAttribute('data-active', 'false');
    });
    test('navigates to first child path on click when group has no component', function () {
      // Declaration
      var child = buildDef({
        path: '/section/page'
      });
      var def = buildDef({
        path: '/section',
        items: [child]
      });
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_AppMenuNode.AppMenuNode, {
        def: def
      }));
      // Execution
      _react2.fireEvent.click(_react2.screen.getAllByTestId('mock-app-menu-item')[0]);
      // Assertions
      expect(mockNavigate).toHaveBeenCalledWith('/section/page');
    });
    test('navigates to own path on click when group has a component', function () {
      // Declaration
      var child = buildDef({
        path: '/section/page'
      });
      var def = buildDef({
        path: '/section',
        component: function component() {
          return null;
        },
        items: [child]
      });
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_AppMenuNode.AppMenuNode, {
        def: def
      }));
      // Execution
      _react2.fireEvent.click(_react2.screen.getAllByTestId('mock-app-menu-item')[0]);
      // Assertions
      expect(mockNavigate).toHaveBeenCalledWith('/section');
    });
  });
  // #endregion
});