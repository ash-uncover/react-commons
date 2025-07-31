"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildMenuItemDef = buildMenuItemDef;
exports.equals = equals;
exports.findItemDefinition = findItemDefinition;
exports.flattenMenu = flattenMenu;
exports.flattenMenuItem = flattenMenuItem;
exports.getParent = getParent;
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function flattenMenu(menu) {
  return flattenMenuItem([], menu);
}
function flattenMenuItem(parents, menuItem) {
  var itemDef = buildMenuItemDef(parents, menuItem);
  var result = [itemDef];
  var items = menuItem.items || [];
  items.forEach(function (itemChild) {
    result.push.apply(result, _toConsumableArray(flattenMenuItem([].concat(_toConsumableArray(parents), [itemDef]), itemChild)));
  });
  itemDef.items = (menuItem.items || []).map(function (i) {
    return findItemDefinition(result, i);
  });
  return result;
}
function buildMenuItemDef(parents, item) {
  return {
    parents: parents,
    name: item.name,
    description: item.description,
    confirmBack: item.confirmBack,
    icon: item.icon,
    component: item.component,
    items: []
  };
}
function getParent(item) {
  if (item && item.parents.length) {
    var parent = item.parents[item.parents.length - 1];
    return parent;
  }
  return null;
}
function findItemDefinition(itemDefinitions, item) {
  return itemDefinitions.find(function (itemDef) {
    return equals(itemDef, item);
  }) || null;
}
function equals(itemDefinition, item) {
  return itemDefinition.name === item.name && itemDefinition.description === item.description && itemDefinition.icon === item.icon && itemDefinition.component === item.component;
}