"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Menu = void 0;
var _react = _interopRequireDefault(require("react"));
var _MenuUtil = require("./MenuUtil");
var _MenuNavigationList = require("./MenuNavigationList");
var _IconUtils = require("../icon/IconUtils");
require("./Menu.css");
var _ComponentUtil = require("../ComponentUtil");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } // Local Stuff
// CSS
// #region Declaration

// #endregion

// #region Component
var Menu = exports.Menu = function Menu(_ref) {
  var className = _ref.className,
    collapsed = _ref.collapsed,
    menu = _ref.menu,
    onMenuToggle = _ref.onMenuToggle;
  // #region > Hooks
  var _React$useState = _react["default"].useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    itemsDef = _React$useState2[0],
    setItemsDef = _React$useState2[1];
  _react["default"].useEffect(function () {
    if (menu) {
      var _itemsDef = (0, _MenuUtil.flattenMenu)(menu);
      setItemsDef(_itemsDef);
    } else {
      setItemsDef([]);
    }
  }, [menu]);
  var _React$useState3 = _react["default"].useState(null),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    itemSelection = _React$useState4[0],
    setItemSelection = _React$useState4[1];
  _react["default"].useEffect(function () {
    if (itemsDef.length) {
      setItemSelection(itemsDef[0]);
    }
  }, [itemsDef]);
  var _React$useState5 = _react["default"].useState(null),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    itemSelected = _React$useState6[0],
    setItemSelected = _React$useState6[1];
  _react["default"].useEffect(function () {
    if (itemSelection) {
      var _itemSelection$items;
      if (itemSelection.component) {
        setItemSelected(itemSelection);
      } else if ((_itemSelection$items = itemSelection.items) !== null && _itemSelection$items !== void 0 && _itemSelection$items.length) {
        setItemSelected(itemSelection.items[0]);
      }
    } else {
      setItemSelected(null);
    }
  }, [itemSelection]);
  var _React$useState7 = _react["default"].useState(null),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    itemNavigation = _React$useState8[0],
    setItemNavigation = _React$useState8[1];
  _react["default"].useEffect(function () {
    if (itemSelection) {
      var _itemSelection$items2;
      var parent = (0, _MenuUtil.getParent)(itemSelection);
      if ((_itemSelection$items2 = itemSelection.items) !== null && _itemSelection$items2 !== void 0 && _itemSelection$items2.length) {
        setItemNavigation(itemSelection);
      } else if (parent) {
        setItemNavigation(parent);
      }
    } else {
      setItemNavigation(null);
    }
  }, [itemSelection]);
  var _React$useState9 = _react["default"].useState(null),
    _React$useState0 = _slicedToArray(_React$useState9, 2),
    itemComponent = _React$useState0[0],
    setItemComponent = _React$useState0[1];
  _react["default"].useEffect(function () {
    if (itemSelection) {
      if (itemSelection.component) {
        setItemComponent(itemSelection);
      } else if (itemSelection.items) {
        setItemComponent((0, _MenuUtil.findItemDefinition)(itemsDef, itemSelection.items[0]));
      }
    } else {
      setItemComponent(null);
    }
  }, [itemSelection]);
  // #endregion

  // #region > Events
  function selectItem(itemDef) {
    var _itemSelection$items3;
    // Resolve Selection
    if (itemSelection !== null && itemSelection !== void 0 && (_itemSelection$items3 = itemSelection.items) !== null && _itemSelection$items3 !== void 0 && _itemSelection$items3.length) {}
    // Resolve Navigation
    // Resolve Component
    if (itemDef.component) {
      setItemComponent(itemDef);
    } else if (itemSelection !== null && itemSelection !== void 0 && itemSelection.items) {
      setItemComponent((0, _MenuUtil.findItemDefinition)(itemsDef, itemSelection.items[0]));
    }
  }
  // #endregion

  // #region > Render
  function buildMenuNavigationItem(itemDef) {
    if (itemDef !== null && itemDef !== void 0 && itemDef.items) {
      var items = itemDef.items.map(function (i) {
        return {
          name: i.name,
          icon: i.icon,
          description: i.description,
          selected: itemSelected === i,
          onClick: function onClick() {
            return setItemSelection(i);
          }
        };
      });
      var parent = (0, _MenuUtil.getParent)(itemDef);
      if (parent && itemNavigation) {
        items.push({
          name: 'back',
          description: 'back',
          icon: _IconUtils.ICONS.FAS_RIGHT_FROM_BRACKET,
          selected: false,
          onClick: function onClick() {
            return setItemSelection((0, _MenuUtil.getParent)(itemNavigation));
          }
        });
      }
      return items;
    }
    return [];
  }
  var classes = new _ComponentUtil.ClassBuilder(['ap-menu', className]);
  if (collapsed) classes.add('ap-menu--collapsed');
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.className
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ap-menu__content"
  }, itemComponent ? itemComponent.component : null), /*#__PURE__*/_react["default"].createElement("nav", {
    className: "ap-menu__navigation"
  }, /*#__PURE__*/_react["default"].createElement(_MenuNavigationList.MenuNavigationList, {
    items: buildMenuNavigationItem(itemNavigation)
  })));
  // #endregion
};
// #endregion