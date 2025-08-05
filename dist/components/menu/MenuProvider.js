"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSelectItem = exports.useMenuItemSelected = exports.useMenuItemNavigation = exports.useMenuItemComponent = exports.useGoBack = exports.MenuProvider = exports.MenuDispatchContext = void 0;
var _react = _interopRequireDefault(require("react"));
var _MenuUtil = require("./MenuUtil");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// #region Context

function buildContext() {
  var menuItems = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var menuItemSelection = arguments.length > 1 ? arguments[1] : undefined;
  var items = menuItems || [];
  var itemSelection = menuItemSelection || null;
  var itemSelected = null;
  var itemNavigation = null;
  var itemComponent = null;
  if (items !== null && items !== void 0 && items.length) {
    itemSelection = itemSelection || items[0];
    if (itemSelection) {
      var _itemSelection$items, _itemSelection$items2;
      if (itemSelection.component) {
        itemSelected = itemSelection;
        itemComponent = itemSelection;
      } else if ((_itemSelection$items = itemSelection.items) !== null && _itemSelection$items !== void 0 && _itemSelection$items.length) {
        itemSelected = itemSelection.items[0];
        itemComponent = itemSelection.items[0];
      } else {
        throw Error('Must have either a component or items');
      }
      var parent = (0, _MenuUtil.getParent)(itemSelection);
      if ((_itemSelection$items2 = itemSelection.items) !== null && _itemSelection$items2 !== void 0 && _itemSelection$items2.length) {
        itemNavigation = itemSelection;
      } else if (parent) {
        itemNavigation = parent;
      }
    }
  }
  return {
    items: items,
    itemSelection: itemSelection,
    itemSelected: itemSelected,
    itemNavigation: itemNavigation,
    itemComponent: itemComponent
  };
}
var MenuContext = /*#__PURE__*/_react["default"].createContext(buildContext([]));
var MenuDispatchContext = exports.MenuDispatchContext = /*#__PURE__*/_react["default"].createContext(function () {});
// #endregion

// #region Provider

var MenuProvider = exports.MenuProvider = function MenuProvider(_ref) {
  var items = _ref.items,
    children = _ref.children;
  // #region > Hooks
  var _React$useReducer = _react["default"].useReducer(menuReducer, buildContext(items)),
    _React$useReducer2 = _slicedToArray(_React$useReducer, 2),
    context = _React$useReducer2[0],
    dispatch = _React$useReducer2[1];
  // #endregion

  // #region > Render
  return /*#__PURE__*/_react["default"].createElement(MenuContext.Provider, {
    value: context
  }, /*#__PURE__*/_react["default"].createElement(MenuDispatchContext.Provider, {
    value: dispatch
  }, children));
  // #endregion
};
// #endregion

var useMenuItemSelected = exports.useMenuItemSelected = function useMenuItemSelected() {
  var menuContext = _react["default"].useContext(MenuContext);
  return menuContext.itemSelected;
};
var useMenuItemComponent = exports.useMenuItemComponent = function useMenuItemComponent() {
  var menuContext = _react["default"].useContext(MenuContext);
  return menuContext.itemComponent;
};
var useMenuItemNavigation = exports.useMenuItemNavigation = function useMenuItemNavigation() {
  var menuContext = _react["default"].useContext(MenuContext);
  return menuContext.itemNavigation;
};
var SELECT_ITEM = 'SELECT_ITEM';
var useSelectItem = exports.useSelectItem = function useSelectItem() {
  var dispatch = _react["default"].useContext(MenuDispatchContext);
  return function (itemSelection) {
    dispatch({
      type: SELECT_ITEM,
      itemSelection: itemSelection
    });
  };
};
var GO_BACK = 'GO_BACK';
var useGoBack = exports.useGoBack = function useGoBack() {
  var dispatch = _react["default"].useContext(MenuDispatchContext);
  var itemNavigation = useMenuItemNavigation();
  return function () {
    if (itemNavigation) {
      var parent = (0, _MenuUtil.getParent)(itemNavigation);
      dispatch({
        type: GO_BACK,
        itemSelection: parent
      });
    }
  };
};
function menuReducer(context, action) {
  switch (action.type) {
    case GO_BACK:
    case SELECT_ITEM:
      {
        return buildContext(context.items, action.itemSelection);
      }
    default:
      {
        throw Error('Unknown action: ' + action.type);
      }
  }
}