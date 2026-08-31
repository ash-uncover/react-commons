"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppMenu = void 0;
var _react = _interopRequireDefault(require("react"));
var _ = require("../..");
var _AppMenuNode = require("./AppMenuNode");
var _AppUtils = require("./AppUtils");
require("./AppMenu.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
//

// CSS

// #region Declaration

// #endregion

// #region Component
var AppMenu = exports.AppMenu = function AppMenu(_ref) {
  var className = _ref.className,
    style = _ref.style,
    node = _ref.node;
  // #region > Hooks
  var _useClasses = (0, _.useClasses)(['ap-app-menu']),
    classBuilder = _useClasses.classBuilder,
    classes = _useClasses.classes;
  (0, _.useClasseName)(classBuilder, className);
  var nodeDefs = _react["default"].useMemo(function () {
    return (0, _AppUtils.resolveApp)(node);
  }, [node]);
  var rootDef = nodeDefs[0];
  // #endregion

  // #region > Render
  if (!rootDef) {
    return null;
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes,
    style: style
  }, rootDef.items.map(function (child) {
    return /*#__PURE__*/_react["default"].createElement(_AppMenuNode.AppMenuNode, {
      key: child.path,
      def: child
    });
  }));
  // #endregion
};
// #endregion