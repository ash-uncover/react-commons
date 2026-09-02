"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _ImageUploader = require("./ImageUploader");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * @jest-environment jsdom
 */

var mockCheckExtention = jest.fn();
var mockCheckSize = jest.fn();
jest.mock('@sol.ac/js-utils', function () {
  return {
    FileUtils: {
      checkExtention: function checkExtention(file, types) {
        return mockCheckExtention(file, types);
      },
      checkSize: function checkSize(file, size) {
        return mockCheckSize(file, size);
      }
    }
  };
});

// Stub URL.createObjectURL and URL.revokeObjectURL
var mockCreateObjectURL = jest.fn(function () {
  return 'blob:mock-url';
});
var mockRevokeObjectURL = jest.fn();
Object.defineProperty(window, 'URL', {
  writable: true,
  value: {
    createObjectURL: mockCreateObjectURL,
    revokeObjectURL: mockRevokeObjectURL
  }
});
function createFile(name, size, type) {
  var file = new File(['x'.repeat(size)], name, {
    type: type
  });
  return file;
}
describe('ImageUploader', function () {
  beforeEach(function () {
    mockCheckExtention.mockReset();
    mockCheckSize.mockReset();
    mockCreateObjectURL.mockClear();
    mockRevokeObjectURL.mockClear();
  });

  // #region constants
  describe('exported constants', function () {
    test('MAX_SIZE is a positive number', function () {
      // Declaration + Execution + Assertions
      expect(_ImageUploader.MAX_SIZE).toBeGreaterThan(0);
    });
    test('TYPES has expected entries', function () {
      // Declaration + Execution + Assertions
      expect(_ImageUploader.TYPES.map(function (t) {
        return t.ext;
      })).toContain('png');
      expect(_ImageUploader.TYPES.map(function (t) {
        return t.ext;
      })).toContain('jpeg');
    });
    test('TYPES_ACCEPT contains ext and template entries', function () {
      // Declaration + Execution + Assertions
      expect(_ImageUploader.TYPES_ACCEPT).toContain('png');
      expect(_ImageUploader.TYPES_ACCEPT).toContain('image/png');
    });
    test('TYPES_EXT contains only extensions', function () {
      // Declaration + Execution + Assertions
      expect(_ImageUploader.TYPES_EXT).toContain('png');
      expect(_ImageUploader.TYPES_EXT).not.toContain('image/png');
    });
  });
  // #endregion

  // #region render
  describe('render', function () {
    test('renders the image uploader container', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      var _render = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_ImageUploader.ImageUploader, {
          name: "avatar",
          onChange: onChange
        })),
        container = _render.container;
      // Assertions
      expect(container.querySelector('.image-uploader')).toBeInTheDocument();
    });
    test('renders label with correct htmlFor', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      var _render2 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_ImageUploader.ImageUploader, {
          name: "my-uploader",
          onChange: onChange
        })),
        container = _render2.container;
      // Assertions
      expect(container.querySelector('label')).toHaveAttribute('for', 'my-uploader');
    });
    test('renders a file input with correct id', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      var _render3 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_ImageUploader.ImageUploader, {
          name: "my-uploader",
          onChange: onChange
        })),
        container = _render3.container;
      // Assertions
      expect(container.querySelector('input[type="file"]')).toHaveAttribute('id', 'my-uploader');
    });
    test('renders with initial src in images', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      var _render4 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_ImageUploader.ImageUploader, {
          name: "avatar",
          src: "http://example.com/img.png",
          onChange: onChange
        })),
        container = _render4.container;
      // Assertions
      var images = container.querySelectorAll('img');
      expect(images[0]).toHaveAttribute('src', 'http://example.com/img.png');
    });
    test('does not render error initially', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      var _render5 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_ImageUploader.ImageUploader, {
          name: "avatar",
          onChange: onChange
        })),
        container = _render5.container;
      // Assertions
      expect(container.querySelector('.error')).not.toBeInTheDocument();
    });
  });
  // #endregion

  // #region file validation — type error
  describe('file validation — bad extension', function () {
    test('shows type error and does not call onChange when extension is invalid', function () {
      // Declaration
      var onChange = jest.fn();
      mockCheckExtention.mockReturnValue(false);
      var _render6 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_ImageUploader.ImageUploader, {
          name: "avatar",
          onChange: onChange
        })),
        container = _render6.container;
      var input = container.querySelector('input[type="file"]');
      var file = createFile('test.txt', 100, 'text/plain');
      // Execution
      Object.defineProperty(input, 'files', {
        value: [file],
        configurable: true
      });
      _react2.fireEvent.change(input);
      // Assertions
      expect(container.querySelector('.error')).toBeInTheDocument();
      expect(onChange).not.toHaveBeenCalled();
    });
  });
  // #endregion

  // #region file validation — size error
  describe('file validation — file too large', function () {
    test('shows size error and does not call onChange when file is too large', function () {
      // Declaration
      var onChange = jest.fn();
      mockCheckExtention.mockReturnValue(true);
      mockCheckSize.mockReturnValue(false);
      var _render7 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_ImageUploader.ImageUploader, {
          name: "avatar",
          onChange: onChange
        })),
        container = _render7.container;
      var input = container.querySelector('input[type="file"]');
      var file = createFile('test.png', _ImageUploader.MAX_SIZE + 1, 'image/png');
      // Execution
      Object.defineProperty(input, 'files', {
        value: [file],
        configurable: true
      });
      _react2.fireEvent.change(input);
      // Assertions
      expect(container.querySelector('.error')).toBeInTheDocument();
      expect(onChange).not.toHaveBeenCalled();
    });
  });
  // #endregion

  // #region successful upload
  describe('successful upload', function () {
    test('calls onChange with file and updates preview when file is valid', function () {
      // Declaration
      var onChange = jest.fn();
      mockCheckExtention.mockReturnValue(true);
      mockCheckSize.mockReturnValue(true);
      var _render8 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_ImageUploader.ImageUploader, {
          name: "avatar",
          onChange: onChange
        })),
        container = _render8.container;
      var input = container.querySelector('input[type="file"]');
      var file = createFile('test.png', 100, 'image/png');
      // Execution
      Object.defineProperty(input, 'files', {
        value: [file],
        configurable: true
      });
      _react2.fireEvent.change(input);
      // Assertions
      expect(onChange).toHaveBeenCalledWith({
        file: file
      });
      expect(mockCreateObjectURL).toHaveBeenCalledWith(file);
      expect(mockRevokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
    });
    test('clears error on a valid file after a previous error', function () {
      // Declaration
      var onChange = jest.fn();
      var _render9 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_ImageUploader.ImageUploader, {
          name: "avatar",
          onChange: onChange
        })),
        container = _render9.container;
      var input = container.querySelector('input[type="file"]');
      // First: bad file
      mockCheckExtention.mockReturnValueOnce(false);
      var badFile = createFile('bad.txt', 100, 'text/plain');
      Object.defineProperty(input, 'files', {
        value: [badFile],
        configurable: true
      });
      _react2.fireEvent.change(input);
      expect(container.querySelector('.error')).toBeInTheDocument();
      // Then: good file
      mockCheckExtention.mockReturnValueOnce(true);
      mockCheckSize.mockReturnValueOnce(true);
      var goodFile = createFile('good.png', 100, 'image/png');
      Object.defineProperty(input, 'files', {
        value: [goodFile],
        configurable: true
      });
      _react2.fireEvent.change(input);
      // Assertions
      expect(container.querySelector('.error')).not.toBeInTheDocument();
    });
  });
  // #endregion

  // #region webkitURL fallback
  describe('webkitURL fallback (no window.URL)', function () {
    test('uses webkitURL.createObjectURL when window.URL is undefined', function () {
      // Declaration
      var onChange = jest.fn();
      mockCheckExtention.mockReturnValue(true);
      mockCheckSize.mockReturnValue(true);
      var mockWebkitCreateObjectURL = jest.fn(function () {
        return 'blob:webkit-url';
      });
      var mockWebkitRevokeObjectURL = jest.fn();
      // Remove window.URL temporarily
      var originalURL = window.URL;
      window.URL = undefined;
      window.webkitURL = {
        createObjectURL: mockWebkitCreateObjectURL,
        revokeObjectURL: mockWebkitRevokeObjectURL
      };
      var _render0 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_ImageUploader.ImageUploader, {
          name: "avatar",
          onChange: onChange
        })),
        container = _render0.container;
      var input = container.querySelector('input[type="file"]');
      var file = createFile('test.png', 100, 'image/png');
      // Execution
      Object.defineProperty(input, 'files', {
        value: [file],
        configurable: true
      });
      _react2.fireEvent.change(input);
      // Assertions
      expect(mockWebkitCreateObjectURL).toHaveBeenCalledWith(file);
      expect(mockWebkitRevokeObjectURL).toHaveBeenCalledWith('blob:webkit-url')
      // Restore
;
      window.URL = originalURL;
      window.webkitURL = undefined;
    });
  });
  // #endregion

  // #region files null or first item falsy
  describe('files null or first item falsy', function () {
    test('does nothing when files property is null', function () {
      // Declaration
      var onChange = jest.fn();
      var _render1 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_ImageUploader.ImageUploader, {
          name: "avatar",
          onChange: onChange
        })),
        container = _render1.container;
      var input = container.querySelector('input[type="file"]');
      // Execution — set files to null to cover files?.length false branch
      Object.defineProperty(input, 'files', {
        value: null,
        configurable: true
      });
      _react2.fireEvent.change(input);
      // Assertions
      expect(onChange).not.toHaveBeenCalled();
    });
    test('does nothing when files[0] is falsy', function () {
      // Declaration
      var onChange = jest.fn();
      var _render10 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_ImageUploader.ImageUploader, {
          name: "avatar",
          onChange: onChange
        })),
        container = _render10.container;
      var input = container.querySelector('input[type="file"]');
      // Execution — set files to array with null element
      Object.defineProperty(input, 'files', {
        value: [null],
        configurable: true
      });
      _react2.fireEvent.change(input);
      // Assertions
      expect(onChange).not.toHaveBeenCalled();
    });
  });
  // #endregion

  // #region empty files list
  describe('empty files list', function () {
    test('does nothing when files list is empty', function () {
      // Declaration
      var onChange = jest.fn();
      var _render11 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_ImageUploader.ImageUploader, {
          name: "avatar",
          onChange: onChange
        })),
        container = _render11.container;
      var input = container.querySelector('input[type="file"]');
      // Execution — no files
      Object.defineProperty(input, 'files', {
        value: [],
        configurable: true
      });
      _react2.fireEvent.change(input);
      // Assertions
      expect(onChange).not.toHaveBeenCalled();
    });
  });
  // #endregion
  describe('name fallback to "file-upload"', function () {
    test('uses "file-upload" as htmlFor and id when name is empty string', function () {
      // Declaration
      var onChange = jest.fn();
      // Execution
      var _render12 = (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_ImageUploader.ImageUploader, {
          name: "",
          onChange: onChange
        })),
        container = _render12.container;
      // Assertions
      expect(container.querySelector('label')).toHaveAttribute('for', 'file-upload');
      expect(container.querySelector('input[type="file"]')).toHaveAttribute('id', 'file-upload');
    });
  });
  // #endregion
});