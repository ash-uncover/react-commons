"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TYPES_EXT = exports.TYPES_ACCEPT = exports.TYPES = exports.MAX_SIZE = exports.ImageUploader = void 0;
var _react = _interopRequireWildcard(require("react"));
var _jsUtils = require("@uncover/js-utils");
require("./ImageUploader.css");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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
        var extOk = _jsUtils.FileUtils.checkExtension(file, TYPES_EXT);
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