"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuInner = exports.Menu = void 0;
var _react = _interopRequireDefault(require("react"));
var _ = require("../..");
var _MenuUtil = require("./MenuUtil");
var _MenuProvider = require("./MenuProvider");
require("./Menu.css");
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
    style = _ref.style,
    collapsed = _ref.collapsed,
    container = _ref.container,
    containerLevel = _ref.containerLevel,
    menu = _ref.menu,
    onMenuToggle = _ref.onMenuToggle;
  // #region > Hooks
  var _React$useState = _react["default"].useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    menuDef = _React$useState2[0],
    setMenuDef = _React$useState2[1];
  _react["default"].useEffect(function () {
    if (menu) {
      var _menuDef = (0, _MenuUtil.flattenMenu)(menu);
      setMenuDef(_menuDef);
    } else {
      setMenuDef([]);
    }
  }, [menu]);

  // #endregion

  // #region > Events
  // #endregion

  // #region > Render
  if (menuDef !== null && menuDef !== void 0 && menuDef.length) {
    return /*#__PURE__*/_react["default"].createElement(_MenuProvider.MenuProvider, {
      items: menuDef
    }, /*#__PURE__*/_react["default"].createElement(MenuInner, {
      className: className,
      style: style,
      collapsed: collapsed,
      container: container,
      containerLevel: containerLevel,
      onMenuToggle: onMenuToggle
    }));
  }
  // #endregion
};
// #endregion

// #region Declaration

// #endregion

// #region Component
var MenuInner = exports.MenuInner = function MenuInner(_ref2) {
  var className = _ref2.className,
    style = _ref2.style,
    collapsed = _ref2.collapsed,
    container = _ref2.container,
    containerLevel = _ref2.containerLevel,
    onMenuToggle = _ref2.onMenuToggle;
  // #region > Hooks
  var itemSelected = (0, _MenuProvider.useMenuItemSelected)();
  var itemNavigation = (0, _MenuProvider.useMenuItemNavigation)();
  var itemComponent = (0, _MenuProvider.useMenuItemComponent)();
  var selectItem = (0, _MenuProvider.useSelectItem)();
  var goBack = (0, _MenuProvider.useGoBack)();
  var _useClasses = (0, _.useClasses)(['ap-menu', className]),
    classBuilder = _useClasses.classBuilder,
    classes = _useClasses.classes;
  _react["default"].useEffect(function () {
    if (collapsed) {
      classBuilder.add("ap-menu--collapsed");
    }
    return function () {
      classBuilder.remove("ap-menu--collapsed");
    };
  }, [collapsed]);
  // #endregion

  // #region > Events
  function handleItemClick(itemDef) {
    selectItem(itemDef);
  }
  function handleBackClick() {
    goBack();
  }
  // #endregion

  // #region > Render
  function buildMenuNavigationItem(itemDef) {
    if (itemDef !== null && itemDef !== void 0 && itemDef.items) {
      var items = itemDef.items.map(function (i) {
        return {
          container: container,
          description: i.description,
          icon: i.icon,
          name: i.name,
          selected: itemSelected === i,
          onClick: function onClick() {
            return handleItemClick(i);
          }
        };
      });
      var parent = (0, _MenuUtil.getParent)(itemDef);
      if (parent && itemNavigation) {
        items.push({
          container: container,
          name: 'back',
          description: 'back',
          icon: _.ICONS.FAS_RIGHT_FROM_BRACKET,
          selected: false,
          onClick: handleBackClick
        });
      }
      return items;
    }
    return [];
  }
  if (container) {
    return /*#__PURE__*/_react["default"].createElement(_.ShellContainer, {
      className: classes,
      style: style,
      level: containerLevel
    }, /*#__PURE__*/_react["default"].createElement(_.ShellPage, {
      className: "ap-menu__content"
    }, itemComponent ? itemComponent.component : null), /*#__PURE__*/_react["default"].createElement("nav", {
      className: "ap-menu__navigation"
    }, /*#__PURE__*/_react["default"].createElement(_.MenuNavigationList, {
      items: buildMenuNavigationItem(itemNavigation)
    })));
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes,
    style: style
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ap-menu__content"
  }, itemComponent ? itemComponent.component : null), /*#__PURE__*/_react["default"].createElement("nav", {
    className: "ap-menu__navigation"
  }, /*#__PURE__*/_react["default"].createElement(_.MenuNavigationList, {
    items: buildMenuNavigationItem(itemNavigation)
  })));
  // #endregion
};
// #endregion