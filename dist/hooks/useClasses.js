"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useClasses = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var useClasses = exports.useClasses = function useClasses(classes) {
  var classArray = toClassArray(classes);
  var _React$useState = _react["default"].useState(classArray.join(' ')),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    classesString = _React$useState2[0],
    setClassesString = _React$useState2[1];
  var _React$useState3 = _react["default"].useState(new ClassBuilder(classArray, setClassesString)),
    _React$useState4 = _slicedToArray(_React$useState3, 1),
    classBuilder = _React$useState4[0];
  return {
    classBuilder: classBuilder,
    classes: classesString
  };
};
function toClassArray(arg) {
  if (Array.isArray(arg)) {
    return arg.reduce(function (acc, s) {
      acc.push.apply(acc, _toConsumableArray(toClassArray(s)));
      return acc;
    }, []);
  }
  return (arg || '').split(' ').filter(function (s) {
    return s;
  });
}

// #region ClassBuilder
var _classMap = /*#__PURE__*/new WeakMap();
var _listener = /*#__PURE__*/new WeakMap();
var ClassBuilder = /*#__PURE__*/function () {
  // #endregion

  // #region > Constructor
  function ClassBuilder(classBase, listener) {
    var _this = this;
    _classCallCheck(this, ClassBuilder);
    // #region > Attributes
    _classPrivateFieldInitSpec(this, _classMap, {});
    _classPrivateFieldInitSpec(this, _listener, void 0);
    toClassArray(classBase).forEach(function (c) {
      _classPrivateFieldGet(_classMap, _this)[c] = true;
    });
    _classPrivateFieldSet(_listener, this, listener);
  }
  // #endregion

  // #region > Public Methods
  return _createClass(ClassBuilder, [{
    key: "add",
    value: function add(className) {
      var _this2 = this;
      toClassArray(className).forEach(function (c) {
        _classPrivateFieldGet(_classMap, _this2)[c] = true;
      });
      this.notify();
    }
  }, {
    key: "remove",
    value: function remove(className) {
      var _this3 = this;
      toClassArray(className).forEach(function (c) {
        delete _classPrivateFieldGet(_classMap, _this3)[c];
      });
      this.notify();
    }
  }, {
    key: "toggle",
    value: function toggle(className) {
      var _this4 = this;
      toClassArray(className).forEach(function (c) {
        if (_classPrivateFieldGet(_classMap, _this4)[c]) {
          _this4.remove(c);
        } else {
          _this4.add(c);
        }
      });
    }
  }, {
    key: "set",
    value: function set(className, active) {
      var _this5 = this;
      toClassArray(className).forEach(function (c) {
        if (active) {
          _this5.add(c);
        } else {
          _this5.remove(c);
        }
      });
    }
    // #endregion

    // #region > Private Methods
  }, {
    key: "getClassName",
    value: function getClassName() {
      return Object.keys(_classPrivateFieldGet(_classMap, this)).join(' ');
    }
  }, {
    key: "notify",
    value: function notify() {
      _classPrivateFieldGet(_listener, this).call(this, this.getClassName());
    }
    // #endregion
  }]);
}(); // #endregion