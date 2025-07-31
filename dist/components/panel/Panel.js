"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Panel = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
var _ = require("../..");
require("./Panel.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } //
// CSS
// #region Declaration

// #endregion

// #region Component
var Panel = exports.Panel = function Panel(_ref) {
  var className = _ref.className,
    style = _ref.style,
    _ref$expandable = _ref.expandable,
    expandable = _ref$expandable === void 0 ? false : _ref$expandable,
    _ref$expanded = _ref.expanded,
    expanded = _ref$expanded === void 0 ? true : _ref$expanded,
    title = _ref.title,
    _ref$titleLevel = _ref.titleLevel,
    titleLevel = _ref$titleLevel === void 0 ? _.TitleLevels.H4 : _ref$titleLevel,
    children = _ref.children;
  // #region > Hooks
  var content = _react["default"].useRef(null);
  var _React$useState = _react["default"].useState(expanded && children),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    isExpanded = _React$useState2[0],
    setIsExpanded = _React$useState2[1];
  var _React$useState3 = _react["default"].useState(0),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    baseHeight = _React$useState4[0],
    setBaseHeight = _React$useState4[1];
  var _React$useState5 = _react["default"].useState(''),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    baseOverflow = _React$useState6[0],
    setBaseOverflow = _React$useState6[1];
  // #endregion

  // #region > Events
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
  // #endregion

  // #region > Render
  var classes = new _.ClassBuilder(['ap-panel', className]);
  if (children && (!expandable || isExpanded)) {
    classes.add('ap-panel--expanded');
  } else {
    classes.add('ap-panel--collapsed');
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.className,
    style: style
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ap-panel__header"
  }, expandable ? /*#__PURE__*/_react["default"].createElement(_.Button, {
    semantic: _.ButtonSemantics.TRANSPARENT,
    onClick: handleExpandClick
  }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: isExpanded ? _freeSolidSvgIcons.faChevronUp : _freeSolidSvgIcons.faChevronDown
  })) : null, /*#__PURE__*/_react["default"].createElement(_.Title, {
    className: "ap-panel__header__title",
    level: titleLevel
  }, title)), children ? /*#__PURE__*/_react["default"].createElement("div", {
    ref: content,
    className: "ap-panel__content"
  }, children) : null);
  // #endregion
};
// #endregion