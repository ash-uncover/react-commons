"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _AppMenu = require("./AppMenu");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * @jest-environment jsdom
 */

jest.mock('../..', function () {
  var _require = require('../../hooks/useClasses'),
    useClasses = _require.useClasses,
    useClasseName = _require.useClasseName;
  return {
    __esModule: true,
    useClasses: useClasses,
    useClasseName: useClasseName
  };
});
jest.mock('./AppMenuNode', function () {
  return {
    AppMenuNode: function AppMenuNode(_ref) {
      var def = _ref.def;
      return require('react').createElement('div', {
        'data-testid': 'mock-app-menu-node',
        'data-path': def.path
      });
    }
  };
});
var mockResolveApp = jest.fn();
jest.mock('./AppUtils', function () {
  return {
    resolveApp: function resolveApp(node) {
      return mockResolveApp(node);
    }
  };
});
var buildNodeDef = function buildNodeDef(path) {
  var items = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return {
    name: path,
    path: path,
    parents: [],
    items: items
  };
};
var ROOT_NODE = {
  name: 'App',
  path: '/'
};
describe('AppMenu', function () {
  beforeEach(function () {
    mockResolveApp.mockClear();
  });

  // #region render
  describe('render', function () {
    test('returns null when resolveApp returns an empty list', function () {
      // Declaration
      mockResolveApp.mockReturnValue([]);
      // Execution
      var _render = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_AppMenu.AppMenu, {
          node: ROOT_NODE
        })),
        container = _render.container;
      // Assertions
      expect(container.firstChild).toBeNull();
    });
    test('renders one AppMenuNode per root child', function () {
      // Declaration
      var childA = buildNodeDef('/a');
      var childB = buildNodeDef('/b');
      var rootDef = buildNodeDef('/', [childA, childB]);
      mockResolveApp.mockReturnValue([rootDef, childA, childB]);
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_AppMenu.AppMenu, {
        node: ROOT_NODE
      }));
      // Assertions
      expect(_react2.screen.getAllByTestId('mock-app-menu-node')).toHaveLength(2);
    });
    test('passes the correct def to each AppMenuNode', function () {
      // Declaration
      var child = buildNodeDef('/components');
      var rootDef = buildNodeDef('/', [child]);
      mockResolveApp.mockReturnValue([rootDef, child]);
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_AppMenu.AppMenu, {
        node: ROOT_NODE
      }));
      // Assertions
      expect(_react2.screen.getByTestId('mock-app-menu-node')).toHaveAttribute('data-path', '/components');
    });
    test('calls resolveApp with the provided node', function () {
      // Declaration
      var rootDef = buildNodeDef('/');
      mockResolveApp.mockReturnValue([rootDef]);
      // Execution
      (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_AppMenu.AppMenu, {
        node: ROOT_NODE
      }));
      // Assertions
      expect(mockResolveApp).toHaveBeenCalledWith(ROOT_NODE);
    });
  });
  // #endregion
});