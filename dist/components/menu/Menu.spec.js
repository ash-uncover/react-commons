"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _Menu = require("./Menu");
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
  return {
    __esModule: true,
    useClasses: useClasses,
    useClasseName: useClasseName,
    ICONS: {
      FAS_RIGHT_FROM_BRACKET: ['fas', 'right-from-bracket']
    },
    ShellContainer: function ShellContainer(_ref) {
      var children = _ref.children,
        className = _ref.className,
        style = _ref.style,
        level = _ref.level;
      return require('react').createElement('div', {
        'data-testid': 'mock-shell-container',
        className: className,
        style: style,
        'data-level': level
      }, children);
    },
    ShellPage: function ShellPage(_ref2) {
      var children = _ref2.children,
        className = _ref2.className;
      return require('react').createElement('div', {
        'data-testid': 'mock-shell-page',
        className: className
      }, children);
    },
    MenuNavigationList: function MenuNavigationList(_ref3) {
      var items = _ref3.items;
      return require('react').createElement('ul', {
        'data-testid': 'mock-nav-list',
        'data-count': items.length
      }, items.map(function (item, i) {
        return require('react').createElement('li', {
          key: i,
          'data-name': item.name,
          onClick: item.onClick
        });
      }));
    }
  };
});

// Mock the entire MenuProvider module so we can control hook return values
var mockUseMenuItemSelected = jest.fn().mockReturnValue(null);
var mockUseMenuItemNavigation = jest.fn().mockReturnValue(null);
var mockUseMenuItemComponent = jest.fn().mockReturnValue(null);
var mockUseSelectItem = jest.fn().mockReturnValue(jest.fn());
var mockUseGoBack = jest.fn().mockReturnValue(jest.fn());
jest.mock('./MenuProvider', function () {
  var React = require('react');
  return {
    MenuProvider: function MenuProvider(_ref4) {
      var children = _ref4.children;
      return require('react').createElement(React.Fragment, null, children);
    },
    useMenuItemSelected: function useMenuItemSelected() {
      return mockUseMenuItemSelected();
    },
    useMenuItemNavigation: function useMenuItemNavigation() {
      return mockUseMenuItemNavigation();
    },
    useMenuItemComponent: function useMenuItemComponent() {
      return mockUseMenuItemComponent();
    },
    useSelectItem: function useSelectItem() {
      return mockUseSelectItem();
    },
    useGoBack: function useGoBack() {
      return mockUseGoBack();
    },
    MenuDispatchContext: React.createContext(function () {})
  };
});
function buildItem() {
  var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _objectSpread({
    parents: [],
    name: 'item',
    items: []
  }, overrides);
}
describe('Menu', function () {
  beforeEach(function () {
    jest.clearAllMocks();
    mockUseMenuItemSelected.mockReturnValue(null);
    mockUseMenuItemNavigation.mockReturnValue(null);
    mockUseMenuItemComponent.mockReturnValue(null);
    mockUseSelectItem.mockReturnValue(jest.fn());
    mockUseGoBack.mockReturnValue(jest.fn());
  });

  // #region renders nothing when menu changes to falsy
  describe('menu becoming falsy', function () {
    test('sets menuDef to empty when menu prop is null-like (re-render)', function () {
      // Declaration
      var MockComp = function MockComp() {
        return require('react').createElement('div', null);
      };
      var menu = {
        items: [{
          name: 'root',
          component: require('react').createElement(MockComp)
        }]
      };
      var _render = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Menu.Menu, {
          menu: menu
        })),
        rerender = _render.rerender;
      // Execution — re-render with a falsy menu (null cast as IMenu)
      rerender(/*#__PURE__*/_react["default"].createElement(_Menu.Menu, {
        menu: null
      }));
      // Assertions — should not crash
      expect(true).toBe(true);
    });
  });
  // #endregion

  // #region renders MenuProvider when menu has items
  describe('renders when menu has items', function () {
    test('renders content when menu has items', function () {
      // Declaration
      var MockComp = function MockComp() {
        return require('react').createElement('div', {
          'data-testid': 'page-content'
        });
      };
      var menu = {
        items: [{
          name: 'root',
          component: require('react').createElement(MockComp)
        }]
      };
      // Execution
      var _render2 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Menu.Menu, {
          menu: menu
        })),
        container = _render2.container;
      // Assertions
      expect(container.firstChild).not.toBeNull();
    });
  });
  // #endregion
});
describe('MenuInner', function () {
  beforeEach(function () {
    jest.clearAllMocks();
    mockUseMenuItemSelected.mockReturnValue(null);
    mockUseMenuItemNavigation.mockReturnValue(null);
    mockUseMenuItemComponent.mockReturnValue(null);
    mockUseSelectItem.mockReturnValue(jest.fn());
    mockUseGoBack.mockReturnValue(jest.fn());
  });

  // #region non-container render
  describe('non-container render (div layout)', function () {
    test('renders a div with ap-menu class', function () {
      // Declaration
      // Execution
      var _render3 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Menu.MenuInner, null)),
        container = _render3.container;
      // Assertions
      expect(container.firstChild).toHaveClass('ap-menu');
    });
    test('renders itemComponent.component when itemComponent is set', function () {
      // Declaration
      var MockComp = function MockComp() {
        return require('react').createElement('div', {
          'data-testid': 'inner-comp'
        });
      };
      var item = buildItem({
        component: require('react').createElement(MockComp)
      });
      mockUseMenuItemComponent.mockReturnValue(item);
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Menu.MenuInner, null));
      // Assertions
      expect(_react2.screen.getByTestId('inner-comp')).toBeInTheDocument();
    });
    test('renders null content when itemComponent is null', function () {
      // Declaration
      mockUseMenuItemComponent.mockReturnValue(null);
      // Execution
      var _render4 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Menu.MenuInner, null)),
        queryByTestId = _render4.queryByTestId;
      // Assertions
      expect(queryByTestId('inner-comp')).toBeNull();
    });
    test('adds collapsed class when collapsed=true', function () {
      // Declaration
      // Execution
      var _render5 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Menu.MenuInner, {
          collapsed: true
        })),
        container = _render5.container;
      // Assertions
      expect(container.firstChild).toHaveClass('ap-menu--collapsed');
    });
    test('removes collapsed class when collapsed changes to false', function () {
      // Declaration
      var _render6 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Menu.MenuInner, {
          collapsed: true
        })),
        container = _render6.container,
        rerender = _render6.rerender;
      // Execution
      rerender(/*#__PURE__*/_react["default"].createElement(_Menu.MenuInner, {
        collapsed: false
      }));
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-menu--collapsed');
    });
    test('cleans up collapsed class on unmount', function () {
      // Declaration
      var _render7 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Menu.MenuInner, {
          collapsed: true
        })),
        unmount = _render7.unmount;
      // Execution + Assertions — no error
      unmount();
    });
  });
  // #endregion

  // #region container render
  describe('container render (ShellContainer layout)', function () {
    test('renders ShellContainer when container=true', function () {
      // Declaration
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Menu.MenuInner, {
        container: true,
        containerLevel: 2
      }));
      // Assertions
      expect(_react2.screen.getByTestId('mock-shell-container')).toBeInTheDocument();
    });
    test('renders itemComponent.component in ShellPage when container=true and itemComponent is set', function () {
      // Declaration
      var MockComp = function MockComp() {
        return require('react').createElement('div', {
          'data-testid': 'container-page-comp'
        });
      };
      var item = buildItem({
        component: require('react').createElement(MockComp)
      });
      mockUseMenuItemComponent.mockReturnValue(item);
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Menu.MenuInner, {
        container: true
      }));
      // Assertions
      expect(_react2.screen.getByTestId('container-page-comp')).toBeInTheDocument();
    });
    test('renders null content in ShellPage when container=true and itemComponent is null', function () {
      // Declaration
      mockUseMenuItemComponent.mockReturnValue(null);
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Menu.MenuInner, {
        container: true
      }));
      // Assertions — ShellPage renders but with no component content
      expect(_react2.screen.getByTestId('mock-shell-page')).toBeInTheDocument();
    });
  });
  // #endregion

  // #region navigation item click
  describe('navigation — item click calls selectItem', function () {
    test('calls selectItem when a navigation item is clicked', function () {
      // Declaration
      var selectItemFn = jest.fn();
      mockUseSelectItem.mockReturnValue(selectItemFn);
      var child = buildItem({
        name: 'child'
      });
      var navItem = buildItem({
        name: 'nav',
        items: [child]
      });
      mockUseMenuItemNavigation.mockReturnValue(navItem);
      // Execution
      var _render8 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Menu.MenuInner, null)),
        container = _render8.container;
      var li = container.querySelector('li[data-name="child"]');
      _react2.fireEvent.click(li);
      // Assertions
      expect(selectItemFn).toHaveBeenCalledWith(child);
    });
  });
  // #endregion

  // #region back button
  describe('navigation — back button', function () {
    test('adds back item when navigation item has a parent', function () {
      // Declaration
      var child = buildItem({
        name: 'child'
      });
      var parent = buildItem({
        name: 'parent',
        items: [child]
      });
      child.parents = [parent];
      var navItem = buildItem({
        name: 'nav',
        items: [child],
        parents: [parent]
      });
      mockUseMenuItemNavigation.mockReturnValue(navItem);
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Menu.MenuInner, null));
      // Assertions
      var navList = _react2.screen.getByTestId('mock-nav-list');
      // navigation items = children + 1 back
      expect(Number(navList.getAttribute('data-count'))).toBeGreaterThan(1);
    });
    test('calls goBack when back item is clicked', function () {
      // Declaration
      var goBackFn = jest.fn();
      mockUseGoBack.mockReturnValue(goBackFn);
      var child = buildItem({
        name: 'child'
      });
      var parent = buildItem({
        name: 'parent',
        items: [child]
      });
      child.parents = [parent];
      var navItem = buildItem({
        name: 'nav',
        items: [child],
        parents: [parent]
      });
      mockUseMenuItemNavigation.mockReturnValue(navItem);
      // Execution
      var _render9 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Menu.MenuInner, null)),
        container = _render9.container;
      var backLi = container.querySelector('li[data-name="back"]');
      _react2.fireEvent.click(backLi);
      // Assertions
      expect(goBackFn).toHaveBeenCalled();
    });
  });
  // #endregion

  // #region buildMenuNavigationItem returns empty for null
  describe('buildMenuNavigationItem returns empty for null itemNavigation', function () {
    test('passes empty items to MenuNavigationList when navigation is null', function () {
      // Declaration
      mockUseMenuItemNavigation.mockReturnValue(null);
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Menu.MenuInner, null));
      // Assertions
      var navList = _react2.screen.getByTestId('mock-nav-list');
      expect(Number(navList.getAttribute('data-count'))).toBe(0);
    });
  });
  // #endregion

  // #region navigation item with no items returns empty array
  describe('buildMenuNavigationItem with itemNavigation having no items', function () {
    test('returns empty items when itemNavigation has undefined items', function () {
      // Declaration
      var navItem = buildItem({
        name: 'nav'
      })
      // Override items to be undefined to test the else branch
;
      navItem.items = undefined;
      mockUseMenuItemNavigation.mockReturnValue(navItem);
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Menu.MenuInner, null));
      // Assertions
      var navList = _react2.screen.getByTestId('mock-nav-list');
      expect(Number(navList.getAttribute('data-count'))).toBe(0);
    });
  });
  // #endregion
});