"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClassBuilder = void 0;
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
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
    _classPrivateFieldInitSpec(this, _classArray, {
      writable: true,
      value: {}
    });
    transform(classBase).forEach(function (c) {
      _classPrivateFieldGet(_this, _classArray)[c] = true;
    });
  }

  // Getters & Setters //
  _createClass(ClassBuilder, [{
    key: "className",
    get: function get() {
      return Object.keys(_classPrivateFieldGet(this, _classArray)).join(' ');
    }

    // Methods //
  }, {
    key: "add",
    value: function add(className) {
      var _this2 = this;
      transform(className).forEach(function (c) {
        _classPrivateFieldGet(_this2, _classArray)[c] = true;
      });
    }
  }, {
    key: "remove",
    value: function remove(className) {
      var _this3 = this;
      transform(className).forEach(function (c) {
        delete _classPrivateFieldGet(_this3, _classArray)[c];
      });
    }
  }, {
    key: "toggle",
    value: function toggle(className) {
      var _this4 = this;
      transform(className).forEach(function (c) {
        if (_classPrivateFieldGet(_this4, _classArray)[c]) {
          _this4.remove(c);
        } else {
          _this4.add(c);
        }
      });
    }
  }]);
  return ClassBuilder;
}();