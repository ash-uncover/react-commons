"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Panel = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
var _ = require("../..");
require("./Panel.css");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var Panel = exports.Panel = function Panel(_ref) {
  var className = _ref.className,
    style = _ref.style,
    expandable = _ref.expandable,
    _ref$expanded = _ref.expanded,
    expanded = _ref$expanded === void 0 ? true : _ref$expanded,
    title = _ref.title,
    _ref$titleLevel = _ref.titleLevel,
    titleLevel = _ref$titleLevel === void 0 ? _.TitleLevels.H4 : _ref$titleLevel,
    children = _ref.children;
  // Hooks //

  var content = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(expanded),
    _useState2 = _slicedToArray(_useState, 2),
    isExpanded = _useState2[0],
    setIsExpanded = _useState2[1];
  var _useState3 = (0, _react.useState)(0),
    _useState4 = _slicedToArray(_useState3, 2),
    baseHeight = _useState4[0],
    setBaseHeight = _useState4[1];
  var _useState5 = (0, _react.useState)(''),
    _useState6 = _slicedToArray(_useState5, 2),
    baseOverflow = _useState6[0],
    setBaseOverflow = _useState6[1];

  // Events //

  function handleExpandClick() {
    if (content.current) {
      if (isExpanded) {
        var height = content.current.getBoundingClientRect().height;
        var overflow = content.current.style.overflow;
        content.current.style.height = "".concat(height, "px");
        setTimeout(function () {
          if (content.current) {
            content.current.style.height = '0';
          }
        }, 0);
        setBaseHeight(height);
        setBaseOverflow(overflow);
        setIsExpanded(false);
      } else {
        content.current.style.height = "".concat(baseHeight, "px");
        content.current.style.overflow = baseOverflow;
        setIsExpanded(true);
      }
    }
  }

  // Rendering //

  var classes = new _.ClassBuilder(['ap-panel', className]);
  if (!expandable || isExpanded) {
    classes.add('ap-panel--expanded');
  } else {
    classes.add('ap-panel--collapsed');
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.className,
    style: style
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ap-panel__header"
  }, /*#__PURE__*/_react["default"].createElement(_.Title, {
    className: "ap-panel__header__title",
    level: titleLevel
  }, title), expandable ? /*#__PURE__*/_react["default"].createElement(_.Button, {
    semantic: _.ButtonSemantics.TRANSPARENT,
    onClick: handleExpandClick
  }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: isExpanded ? _freeSolidSvgIcons.faChevronUp : _freeSolidSvgIcons.faChevronDown
  })) : null), /*#__PURE__*/_react["default"].createElement("div", {
    ref: content,
    className: "ap-panel__content"
  }, children));
};