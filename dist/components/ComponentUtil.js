"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClassBuilder = void 0;
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function transform(arg) {
  if (Array.isArray(arg)) {
    return arg.reduce(function (acc, s) {
      acc.push.apply(acc, _toConsumableArray(transform(s)));
      return acc;
    }, []);
  }
  return (arg || '').split(' ').filter(function (s) {
    return s;
  });
}
var _classArray = /*#__PURE__*/new WeakMap();
var ClassBuilder = exports.ClassBuilder = /*#__PURE__*/function () {
  // Constructor //

  function ClassBuilder(classBase) {
    var _this = this;
    _classCallCheck(this, ClassBuilder);
    // Attributes //

    _classPrivateFieldInitSpec(this, _classArray, {});
    transform(classBase).forEach(function (c) {
      _classPrivateFieldGet(_classArray, _this)[c] = true;
    });
  }

  // Getters & Setters //
  return _createClass(ClassBuilder, [{
    key: "className",
    get: function get() {
      return Object.keys(_classPrivateFieldGet(_classArray, this)).join(' ');
    }

    // Methods //
  }, {
    key: "add",
    value: function add(className) {
      var _this2 = this;
      transform(className).forEach(function (c) {
        _classPrivateFieldGet(_classArray, _this2)[c] = true;
      });
    }
  }, {
    key: "remove",
    value: function remove(className) {
      var _this3 = this;
      transform(className).forEach(function (c) {
        delete _classPrivateFieldGet(_classArray, _this3)[c];
      });
    }
  }, {
    key: "toggle",
    value: function toggle(className) {
      var _this4 = this;
      transform(className).forEach(function (c) {
        if (_classPrivateFieldGet(_classArray, _this4)[c]) {
          _this4.remove(c);
        } else {
          _this4.add(c);
        }
      });
    }
  }]);
}();