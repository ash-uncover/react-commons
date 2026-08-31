"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findNodeDef = findNodeDef;
exports.getParent = getParent;
exports.resolveApp = resolveApp;
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function resolveApp(root) {
  return resolveNode([], root, null);
}
function resolveNode(parents, node, parentPath) {
  var path = parentPath === null ? node.path : parentPath === '/' ? "/".concat(node.path) : "".concat(parentPath, "/").concat(node.path);
  var nodeDef = {
    name: node.name,
    path: path,
    description: node.description,
    icon: node.icon,
    component: node.component,
    confirmBack: node.confirmBack,
    parents: parents,
    items: []
  };
  var result = [nodeDef];
  var children = node.items || [];
  children.forEach(function (child) {
    result.push.apply(result, _toConsumableArray(resolveNode([].concat(_toConsumableArray(parents), [nodeDef]), child, path)));
  });
  nodeDef.items = children.map(function (child) {
    return findNodeDef(result, buildPath(path, child.path));
  });
  return result;
}
function buildPath(parentPath, segment) {
  return parentPath === '/' ? "/".concat(segment) : "".concat(parentPath, "/").concat(segment);
}
function getParent(nodeDef) {
  var parents = nodeDef.parents;
  return parents.length ? parents[parents.length - 1] : null;
}
function findNodeDef(nodeDefs, path) {
  return nodeDefs.find(function (def) {
    return def.path === path;
  }) || null;
}