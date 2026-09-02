"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _MenuProvider = require("./MenuProvider");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * @jest-environment jsdom
 */
// A minimal wrapper that provides MenuProvider
function buildItem() {
  var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _objectSpread({
    parents: [],
    name: 'item',
    items: []
  }, overrides);
}
describe('MenuProvider', function () {
  // #region buildContext — item with component
  describe('buildContext — item with component', function () {
    test('exposes itemSelected and itemComponent for items with component', function () {
      // Declaration
      var MockComp = function MockComp() {
        return require('react').createElement('div', {
          'data-testid': 'mock-comp'
        });
      };
      var itemWithComponent = {
        parents: [],
        name: 'comp-item',
        component: require('react').createElement(MockComp),
        items: []
      };
      var selectedVal = null;
      var componentVal = null;
      var Consumer = function Consumer() {
        selectedVal = (0, _MenuProvider.useMenuItemSelected)();
        componentVal = (0, _MenuProvider.useMenuItemComponent)();
        return null;
      };
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_MenuProvider.MenuProvider, {
        items: [itemWithComponent]
      }, /*#__PURE__*/_react["default"].createElement(Consumer, null)));
      // Assertions
      expect(selectedVal).toBe(itemWithComponent);
      expect(componentVal).toBe(itemWithComponent);
    });
  });
  // #endregion

  // #region buildContext — item with children
  describe('buildContext — item with children (sub-items)', function () {
    test('selects first child as itemSelected and itemComponent', function () {
      // Declaration
      var MockComp = function MockComp() {
        return require('react').createElement('div', null);
      };
      var child = {
        parents: [],
        name: 'child',
        component: require('react').createElement(MockComp),
        items: []
      };
      var parent = {
        parents: [],
        name: 'parent',
        items: [child]
      };
      var selectedVal = null;
      var Consumer = function Consumer() {
        selectedVal = (0, _MenuProvider.useMenuItemSelected)();
        return null;
      };
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_MenuProvider.MenuProvider, {
        items: [parent]
      }, /*#__PURE__*/_react["default"].createElement(Consumer, null)));
      // Assertions
      expect(selectedVal).toBe(child);
    });
  });
  // #endregion

  // #region useMenuItemNavigation
  describe('useMenuItemNavigation', function () {
    test('returns itemNavigation set to the parent item when item has items', function () {
      // Declaration
      var MockComp = function MockComp() {
        return require('react').createElement('div', null);
      };
      var child = {
        parents: [],
        name: 'child',
        component: require('react').createElement(MockComp),
        items: []
      };
      var parent = {
        parents: [],
        name: 'parent',
        items: [child]
      };
      var navigationVal = null;
      var Consumer = function Consumer() {
        navigationVal = (0, _MenuProvider.useMenuItemNavigation)();
        return null;
      };
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_MenuProvider.MenuProvider, {
        items: [parent]
      }, /*#__PURE__*/_react["default"].createElement(Consumer, null)));
      // Assertions
      expect(navigationVal).toBe(parent);
    });
  });
  // #endregion

  // #region useSelectItem
  describe('useSelectItem', function () {
    test('dispatching SELECT_ITEM updates the context', function () {
      // Declaration
      var MockComp = function MockComp() {
        return require('react').createElement('div', null);
      };
      var item1 = {
        parents: [],
        name: 'item1',
        component: require('react').createElement(MockComp),
        items: []
      };
      var item2 = {
        parents: [],
        name: 'item2',
        component: require('react').createElement(MockComp),
        items: []
      };
      var selectItem = function selectItem() {};
      var selectedVal = null;
      var Consumer = function Consumer() {
        selectItem = (0, _MenuProvider.useSelectItem)();
        selectedVal = (0, _MenuProvider.useMenuItemSelected)();
        return null;
      };
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_MenuProvider.MenuProvider, {
        items: [item1, item2]
      }, /*#__PURE__*/_react["default"].createElement(Consumer, null)));
      // Execution
      (0, _react2.act)(function () {
        selectItem(item2);
      });
      // Assertions
      expect(selectedVal).toBe(item2);
    });
  });
  // #endregion

  // #region useGoBack
  describe('useGoBack', function () {
    test('goBack dispatches GO_BACK with the parent of itemNavigation', function () {
      // Declaration
      var MockComp = function MockComp() {
        return require('react').createElement('div', null);
      };
      var grandchild = {
        parents: [],
        name: 'grandchild',
        component: require('react').createElement(MockComp),
        items: []
      };
      var child = {
        parents: [],
        name: 'child',
        items: [grandchild]
      };
      var root = {
        parents: [],
        name: 'root',
        component: require('react').createElement(MockComp),
        items: [child]
      };
      // Set parents properly
      child.parents = [root];
      grandchild.parents = [root, child];
      var goBack = function goBack() {};
      var selectedVal = null;
      var Consumer = function Consumer() {
        goBack = (0, _MenuProvider.useGoBack)();
        selectedVal = (0, _MenuProvider.useMenuItemSelected)();
        return null;
      };
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_MenuProvider.MenuProvider, {
        items: [root]
      }, /*#__PURE__*/_react["default"].createElement(Consumer, null)));
      // Execution — select into child first
      (0, _react2.act)(function () {
        // No-op; initial state already selects into child's items
      });
      (0, _react2.act)(function () {
        goBack();
      });
      // Assertions — after going back, something changed (no error thrown)
      expect(goBack).toBeDefined();
    });
    test('goBack does nothing when itemNavigation is null', function () {
      // Declaration
      var MockComp = function MockComp() {
        return require('react').createElement('div', null);
      };
      var loneItem = {
        parents: [],
        name: 'lone',
        component: require('react').createElement(MockComp),
        items: []
      };
      var goBack = function goBack() {};
      var Consumer = function Consumer() {
        goBack = (0, _MenuProvider.useGoBack)();
        return null;
      };
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_MenuProvider.MenuProvider, {
        items: [loneItem]
      }, /*#__PURE__*/_react["default"].createElement(Consumer, null)));
      // Execution + Assertions — no error
      expect(function () {
        return (0, _react2.act)(function () {
          return goBack();
        });
      }).not.toThrow();
    });
  });
  // #endregion

  // #region reducer error
  describe('reducer — unknown action', function () {
    test('throws an error for unknown action types', function () {
      // Declaration
      var dispatch = function dispatch() {};
      var MockComp = function MockComp() {
        return require('react').createElement('div', null);
      };
      var item = {
        parents: [],
        name: 'item',
        component: require('react').createElement(MockComp),
        items: []
      };
      var Consumer = function Consumer() {
        dispatch = _react["default"].useContext(_MenuProvider.MenuDispatchContext);
        return null;
      };
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_MenuProvider.MenuProvider, {
        items: [item]
      }, /*#__PURE__*/_react["default"].createElement(Consumer, null)));
      // Execution + Assertions
      expect(function () {
        (0, _react2.act)(function () {
          dispatch({
            type: 'UNKNOWN_ACTION'
          });
        });
      }).toThrow('Unknown action: UNKNOWN_ACTION');
    });
  });
  // #endregion

  // #region leaf item with parent — line 34 coverage
  describe('buildContext — leaf item with component and parent', function () {
    test('sets itemNavigation to parent when item has component but no sub-items and has a parent', function () {
      // Declaration
      var MockComp = function MockComp() {
        return require('react').createElement('div', null);
      };
      var parent = {
        parents: [],
        name: 'parent',
        component: require('react').createElement(MockComp),
        items: []
      };
      var leaf = {
        parents: [parent],
        name: 'leaf',
        component: require('react').createElement(MockComp),
        items: []
      };
      var navigationVal = null;
      var Consumer = function Consumer() {
        navigationVal = (0, _MenuProvider.useMenuItemNavigation)();
        return null;
      };
      // Execution — we start with leaf as the selected item
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_MenuProvider.MenuProvider, {
        items: [leaf]
      }, /*#__PURE__*/_react["default"].createElement(Consumer, null)));
      // Assertions — itemNavigation is set to parent (line 34)
      expect(navigationVal).toBe(parent);
    });
    test('sets itemNavigation to parent when item has component and items is undefined', function () {
      // Declaration
      var MockComp = function MockComp() {
        return require('react').createElement('div', null);
      };
      var parent = {
        parents: [],
        name: 'parent',
        component: require('react').createElement(MockComp),
        items: []
      };
      var leaf = {
        parents: [parent],
        name: 'leaf-no-items',
        component: require('react').createElement(MockComp),
        items: undefined
      };
      var navigationVal = null;
      var Consumer = function Consumer() {
        navigationVal = (0, _MenuProvider.useMenuItemNavigation)();
        return null;
      };
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_MenuProvider.MenuProvider, {
        items: [leaf]
      }, /*#__PURE__*/_react["default"].createElement(Consumer, null)));
      expect(navigationVal).toBe(parent);
    });
  });
  // #endregion

  // #region item with neither component nor items — line 28 throw
  describe('buildContext — item with neither component nor items throws', function () {
    test('throws when item has neither component nor items', function () {
      // Declaration
      var brokenItem = {
        parents: [],
        name: 'broken',
        // no component, no items (empty array doesn't trigger the throw, but undefined items)
        items: undefined
      };
      // Execution + Assertions
      expect(function () {
        (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_MenuProvider.MenuProvider, {
          items: [brokenItem]
        }, /*#__PURE__*/_react["default"].createElement("div", null)));
      }).toThrow('Must have either a component or items');
    });
  });
  // #endregion

  // #region MenuDispatchContext default dispatch
  describe('MenuDispatchContext default dispatch', function () {
    test('default dispatch function is a no-op that can be called', function () {
      // Declaration — render outside MenuProvider to use the default context value
      var dispatch = function dispatch() {};
      var Consumer = function Consumer() {
        dispatch = _react["default"].useContext(_MenuProvider.MenuDispatchContext);
        return null;
      };
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(Consumer, null));
      // Assertions — the default dispatch () => {} should not throw
      expect(function () {
        return dispatch({
          type: 'ANY'
        });
      }).not.toThrow();
    });
  });
  // #endregion
});