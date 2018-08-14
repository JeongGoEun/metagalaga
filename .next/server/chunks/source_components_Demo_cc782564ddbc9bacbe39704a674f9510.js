exports.ids = [3];
exports.modules = {

/***/ "./source/components/Demo.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Demo; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_unity_webgl__ = __webpack_require__("react-unity-webgl");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_unity_webgl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_unity_webgl__);
var _jsxFileName = "/Users/jeong-go-eun/Desktop/META_Galaga/source/components/Demo.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var Demo =
/*#__PURE__*/
function (_Component) {
  _inherits(Demo, _Component);

  function Demo(props) {
    var _this;

    _classCallCheck(this, Demo);

    _this = _possibleConstructorReturn(this, (Demo.__proto__ || Object.getPrototypeOf(Demo)).call(this, props));
    _this.state = {
      rotation: 0
    };
    _this.speed = 30;
    _this.unityContent = new __WEBPACK_IMPORTED_MODULE_1_react_unity_webgl__["UnityContent"]("/static/unity/Build/Build.json", "/static/unity/Build/UnityLoader.js");

    _this.unityContent.on("Say", function (message) {
      console.log("Wow Unity said: " + message);
    });

    _this.unityContent.on("SendRotation", function (rotation) {
      _this.setState({
        rotation: Math.round(rotation)
      });
    });

    _this.unityContent.on("progress", function (progression) {
      console.log("Unity progress", progression);
    });

    _this.unityContent.on("loaded", function () {
      console.log("Yay! Unity is loaded!");
    });

    return _this;
  }

  _createClass(Demo, [{
    key: "onClickStart",
    value: function onClickStart() {
      this.unityContent.send("mesh-crate", "StartRotation");
    }
  }, {
    key: "onClickStop",
    value: function onClickStop() {
      this.unityContent.send("mesh-crate", "StopRotation");
    }
  }, {
    key: "onClickUpdateSpeed",
    value: function onClickUpdateSpeed(speed) {
      this.speed += speed;
      this.unityContent.send("mesh-crate", "SetRotationSpeed", this.speed);
    }
  }, {
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 50
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h1", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 51
        }
      }, "React Unity WebGL Test"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        }
      }, "Rotation: ", this.state.rotation, "deg"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("button", {
        onClick: this.onClickStart.bind(this),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 53
        }
      }, "Start"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("button", {
        onClick: this.onClickStop.bind(this),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 54
        }
      }, "Stop"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("button", {
        onClick: this.onClickUpdateSpeed.bind(this, 10),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 55
        }
      }, "Faster"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("button", {
        onClick: this.onClickUpdateSpeed.bind(this, -10),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 58
        }
      }, "Slower"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_unity_webgl___default.a, {
        unityContent: this.unityContent,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 61
        }
      }));
    }
  }]);

  return Demo;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);



/***/ })

};;
//# sourceMappingURL=source_components_Demo_cc782564ddbc9bacbe39704a674f9510.js.map