"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getClassName = exports.Carousel = void 0;
var _react = _interopRequireWildcard(require("react"));
var _ = require("../..");
require("./Carousel.css");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
// #region Declaration

// #endregion

var getClassName = exports.getClassName = function getClassName(className) {
  return ['carousel', className].filter(Boolean).join(' ');
};

// #region Component
var Carousel = exports.Carousel = function Carousel(_ref) {
  var className = _ref.className,
    children = _ref.children;
  var container = (0, _react.useRef)(null);
  var prevChildren = (0, _.usePrevious)(children);
  if (prevChildren) {
    container.current.classList.add('prepare');
  }
  var cleanClass = function cleanClass() {
    setTimeout(function () {
      if (container.current) {
        container.current.classList.remove('prepare');
      }
    }, 0);
  };
  (0, _react.useEffect)(function () {
    cleanClass();
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: getClassName(className),
    ref: container
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "carousel-slide carousel-current"
  }, children), /*#__PURE__*/_react["default"].createElement("div", {
    className: "carousel-slide carousel-previous"
  }, prevChildren));
};
// #endregion