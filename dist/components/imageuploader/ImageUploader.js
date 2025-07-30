"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TYPES_EXT = exports.TYPES_ACCEPT = exports.TYPES = exports.MAX_SIZE = exports.ImageUploader = void 0;
var _react = _interopRequireWildcard(require("react"));
var _jsUtils = require("@sol.ac/js-utils");
require("./ImageUploader.css");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var createObjectURL = function createObjectURL(object) {
  return window.URL ? window.URL.createObjectURL(object) : window.webkitURL.createObjectURL(object);
};
var revokeObjectURL = function revokeObjectURL(url) {
  return window.URL ? window.URL.revokeObjectURL(url) : window.webkitURL.revokeObjectURL(url);
};
var MAX_SIZE = exports.MAX_SIZE = 2100000;
var TYPES = exports.TYPES = [{
  ext: 'bmp',
  template: 'image/bmp'
}, {
  ext: 'jpeg',
  template: 'image/jpeg'
}, {
  ext: 'jpg',
  template: 'image/jpg'
}, {
  ext: 'png',
  template: 'image/png'
}];
var TYPES_ACCEPT = exports.TYPES_ACCEPT = TYPES.reduce(function (acc, type) {
  acc.push(type.ext);
  acc.push(type.template);
  return acc;
}, []);
var TYPES_EXT = exports.TYPES_EXT = TYPES.map(function (type) {
  return type.ext;
});

// ---------------------------------------------------
// Create Component ImageUploader
// ---------------------------------------------------

var ImageUploader = exports.ImageUploader = function ImageUploader(_ref) {
  var name = _ref.name,
    src = _ref.src,
    onChange = _ref.onChange;
  // Hooks //

  var _useState = (0, _react.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    error = _useState2[0],
    setError = _useState2[1];
  var _useState3 = (0, _react.useState)(src),
    _useState4 = _slicedToArray(_useState3, 2),
    source = _useState4[0],
    setSource = _useState4[1];
  var fileInput = (0, _react.useRef)(null);

  // Callbacks //

  var onFileChange = function onFileChange(event) {
    event.preventDefault();
    if (fileInput.current) {
      var files = fileInput.current.files;
      if (files !== null && files !== void 0 && files.length && files[0]) {
        var file = files[0];
        var extOk = _jsUtils.FileUtils.checkExtention(file, TYPES_EXT);
        if (!extOk) {
          setError('Type de fichier non supporté');
          return;
        }
        var sizeOk = _jsUtils.FileUtils.checkSize(file, MAX_SIZE);
        if (!sizeOk) {
          setError('Le fichier sélectionné est trop gros (taille max: 2Mo)');
          return;
        }
        setError('');
        var url = createObjectURL(file);
        setSource(url);
        revokeObjectURL(url);
        onChange({
          file: file
        });
      }
    }
  };

  // Rendering //

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "image-uploader"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "images"
  }, /*#__PURE__*/_react["default"].createElement("img", {
    className: "image l",
    src: source
  }), /*#__PURE__*/_react["default"].createElement("img", {
    className: "image m",
    src: source
  }), /*#__PURE__*/_react["default"].createElement("img", {
    className: "image s",
    src: source
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "controls"
  }, error && /*#__PURE__*/_react["default"].createElement("div", {
    className: "error"
  }, error), /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: name || 'file-upload',
    className: "label"
  }, "S\xE9lectionnez un fichier"), /*#__PURE__*/_react["default"].createElement("input", {
    id: name || 'file-upload',
    className: "input",
    type: "file",
    ref: fileInput
    //accept={TYPES_ACCEPT}
    ,
    onChange: onFileChange
  })));
};