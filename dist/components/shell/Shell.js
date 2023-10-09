"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Shell = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
require("./Shell.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// ---------------------------------------------------
// Create Component Shell
// ---------------------------------------------------

var Shell = exports.Shell = function Shell(_ref) {
  var children = _ref.children;
  // Hooks //

  var location = (0, _reactRouterDom.useLocation)();

  // Rendering //

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "ap-shell"
  });
};