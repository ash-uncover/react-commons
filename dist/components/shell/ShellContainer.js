"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShellContainer = void 0;
exports.computeContainerLevel = computeContainerLevel;
exports.getParentContainer = getParentContainer;
exports.validContainerLevel = validContainerLevel;
var _react = _interopRequireDefault(require("react"));
var _ = require("../..");
require("./ShellContainer.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
//

// CSS

// #region Declaration

// #endregion

// #region Component
var ShellContainer = exports.ShellContainer = function ShellContainer(_ref) {
  var className = _ref.className,
    level = _ref.level,
    style = _ref.style,
    children = _ref.children;
  // #region > Hooks
  var container = _react["default"].useRef(null);
  var _useClasses = (0, _.useClasses)(['ap-shell-container', className]),
    classBuilder = _useClasses.classBuilder,
    classes = _useClasses.classes;
  _react["default"].useEffect(function () {
    var containerLevel = 0;
    if (typeof level === 'undefined') {
      if (container.current) {
        containerLevel = computeContainerLevel(container.current);
      }
    } else {
      containerLevel = validContainerLevel(level);
    }
    classBuilder.add("ap-shell-container-".concat(containerLevel));
    return function () {
      classBuilder.remove("ap-shell-container-".concat(containerLevel));
    };
  }, [container, level]);
  // #endregion

  // #region > Events
  // #endregion

  // #region > Render
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes,
    style: style,
    ref: container
  }, children);
  // #endregion
};
// #endregion

// #region Internal
function computeContainerLevel(element) {
  var result = 0;
  if (element) {
    var parentContainer = getParentContainer(element);
    if (parentContainer) {
      result = 1 + computeContainerLevel(parentContainer);
    }
  }
  return validContainerLevel(result);
}
function validContainerLevel(level) {
  return Math.max(Math.min(level, 10), 0);
}
function getParentContainer(element) {
  if (element && element.parentElement) {
    if (element.parentElement.classList.contains('ap-shell-container')) {
      return element.parentElement;
    }
    return getParentContainer(element.parentElement);
  }
  return null;
}
// #endregion