"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppMenuItem = void 0;
var _react = _interopRequireDefault(require("react"));
var _ = require("../..");
require("./AppMenuItem.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
//

// CSS

// #region Declaration

// #endregion

// #region Component
var AppMenuItem = exports.AppMenuItem = function AppMenuItem(_ref) {
  var className = _ref.className,
    active = _ref.active,
    _ref$depth = _ref.depth,
    depth = _ref$depth === void 0 ? 0 : _ref$depth,
    description = _ref.description,
    group = _ref.group,
    icon = _ref.icon,
    name = _ref.name,
    onClick = _ref.onClick;
  // #region > Hooks
  var _useClasses = (0, _.useClasses)(['ap-app-menu-item']),
    classBuilder = _useClasses.classBuilder,
    classes = _useClasses.classes;
  (0, _.useClasseName)(classBuilder, className);
  _react["default"].useEffect(function () {
    if (active) {
      classBuilder.add('ap-app-menu-item--active');
    }
    return function () {
      classBuilder.remove('ap-app-menu-item--active');
    };
  }, [active]);
  _react["default"].useEffect(function () {
    if (group) {
      classBuilder.add('ap-app-menu-item--group');
    }
    return function () {
      classBuilder.remove('ap-app-menu-item--group');
    };
  }, [group]);
  // #endregion

  // #region > Render
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes,
    title: description,
    style: {
      paddingLeft: "calc(var(--ap-padding-l) * ".concat(depth + 1, ")")
    },
    onClick: onClick
  }, icon ? /*#__PURE__*/_react["default"].createElement(_.Icon, {
    className: "ap-app-menu-item__icon",
    icon: icon
  }) : null, /*#__PURE__*/_react["default"].createElement(_.Label, {
    className: "ap-app-menu-item__label",
    text: name
  }));
  // #endregion
};
// #endregion