"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useIsPhone = void 0;
var _reactResponsive = require("react-responsive");
var _ResponsiveBreakpoint = require("../lib/constants/ResponsiveBreakpoint");
var useIsPhone = exports.useIsPhone = function useIsPhone() {
  var isSmallWidth = (0, _reactResponsive.useMediaQuery)({
    query: "(max-width: ".concat(_ResponsiveBreakpoint.ResponsiveBreakpoints.S, "px)")
  });
  var isSmallHeight = (0, _reactResponsive.useMediaQuery)({
    query: "(max-height: ".concat(_ResponsiveBreakpoint.ResponsiveBreakpoints.S, "px)")
  });
  var isPortrait = (0, _reactResponsive.useMediaQuery)({
    query: '(orientation: portrait)'
  });
  return isPortrait && isSmallWidth || !isPortrait && isSmallHeight;
};