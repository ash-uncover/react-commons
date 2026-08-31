"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppMenuNode = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouter = require("react-router");
var _AppMenuItem = require("./AppMenuItem");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
//

// #region Declaration

// #endregion

// #region Component
var _AppMenuNode = exports.AppMenuNode = function AppMenuNode(_ref) {
  var def = _ref.def;
  // #region > Hooks
  var _useLocation = (0, _reactRouter.useLocation)(),
    pathname = _useLocation.pathname;
  var navigate = (0, _reactRouter.useNavigate)();
  var depth = Math.max(def.parents.length - 1, 0);
  var isActive = pathname === def.path;
  var isActiveAncestor = pathname.startsWith(def.path === '/' ? def.path : "".concat(def.path, "/"));
  // #endregion

  // #region > Events
  var handleClick = function handleClick() {
    if (def.component || def.items.length === 0) {
      navigate(def.path);
    } else {
      navigate(def.items[0].path);
    }
  };
  // #endregion

  // #region > Render
  if (def.items.length > 0) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "ap-app-menu__group"
    }, /*#__PURE__*/_react["default"].createElement(_AppMenuItem.AppMenuItem, {
      group: true,
      active: isActive || isActiveAncestor,
      depth: depth,
      description: def.description,
      icon: def.icon,
      name: def.name,
      onClick: handleClick
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "ap-app-menu__group-items"
    }, def.items.map(function (child) {
      return /*#__PURE__*/_react["default"].createElement(_AppMenuNode, {
        key: child.path,
        def: child
      });
    })));
  }
  return /*#__PURE__*/_react["default"].createElement(_AppMenuItem.AppMenuItem, {
    active: isActive,
    depth: depth,
    description: def.description,
    icon: def.icon,
    name: def.name,
    onClick: handleClick
  });
  // #endregion
};
// #endregion