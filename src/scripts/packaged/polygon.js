/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _polygonCalculator = __webpack_require__(1);

	var _polygonCalculator2 = _interopRequireDefault(_polygonCalculator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var $angleAmount = angleAmount;
	var $polygon = polygon;
	var $container = container;
	var _forEach = [].forEach;
	var _reduce = [].reduce;

	// amount of the angles changed
	$angleAmount.addEventListener('change', function () {
	    var _newAmount = this.value;
	    amountDisplay.innerText = _newAmount;
	    generateThePointRangeBars(_newAmount);
	});

	// some value changed
	barsContainer.addEventListener('change', function (ev) {
	    var $target = ev.target || ev.srcElement;
	    if (~$target.className.indexOf('whatever')) {
	        reDraw();
	    }
	}, true);

	var generateThePointRangeBars = function generateThePointRangeBars(amount) {
	    while (barsContainer.childElementCount) {
	        _forEach.call(barsContainer.children, function (c) {
	            return c.remove();
	        });
	    }while (amount-- > 0) {
	        var item = document.createElement('li');
	        var input = document.createElement('input');
	        input.className = 'whatever';
	        input.setAttribute('type', 'number');
	        input.setAttribute('value', 3);
	        input.setAttribute('min', 1);
	        input.setAttribute('max', 10);
	        item.appendChild(input);
	        barsContainer.appendChild(item);
	    }
	    reDraw();
	};

	var reDraw = function reDraw() {
	    try {
	        var _ref;

	        $polygon.setAttribute('points', (_ref = new _polygonCalculator2.default($container.clientWidth / 2, $container.clientHeight / 2, +$angleAmount.value, 10, 40)).generatePointsPath.apply(_ref, _toConsumableArray(_reduce.call(document.getElementsByClassName('whatever'), function (p, n) {
	            p[p.length] = n.value;
	            return p;
	        }, []))));
	    } catch (e) {
	        alert(e.message);
	    }
	};

	generateThePointRangeBars(5);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DEFAULT_RADIANS_RANGE = 2 * Math.PI; // 整个扇形的弧度
	var DEFAULT_ORIGIN_RADIANS = 0; // 默认初始弧度
	var DEFAULT_BASE_LENGTH = 40;
	var SIN = Math.sin;
	var COS = Math.cos;
	var FORMAT_POINT = function FORMAT_POINT(p) {
	    return p.X + ',' + p.Y;
	};

	var Point = function Point(x, y) {
	    _classCallCheck(this, Point);

	    this.X = x;
	    this.Y = y;
	};

	var PolygonCalculator = function () {
	    function PolygonCalculator(originX, originY, angleAmount, unitLength, baseLength, radiansRange, originRadians) {
	        var _this = this;

	        _classCallCheck(this, PolygonCalculator);

	        this.originOfCoordinate = new Point(originX, originY);
	        this.angleAmount = angleAmount; // 角的数量
	        this.unitLength = unitLength; // 单位长度
	        this.pointsCollection = {}; // 历史point计算的记录
	        this.unitRadians = (radiansRange || DEFAULT_RADIANS_RANGE) / angleAmount; // 单位角度
	        this.baseLength = baseLength || DEFAULT_BASE_LENGTH; // 基础长度
	        this.originRadians = originRadians || DEFAULT_ORIGIN_RADIANS; // 基准角度
	        this.radians = new Array(angleAmount).fill().reduce(function (prev, n, index) {
	            prev[prev.length] = _this.originRadians + _this.unitRadians * index;
	            return prev;
	        }, []); // 旋转的角度数组
	    }

	    _createClass(PolygonCalculator, [{
	        key: 'generatePoints',
	        value: function generatePoints(handler) {
	            var _this2 = this;

	            for (var _len = arguments.length, unitAmount = Array(_len > 1 ? _len - 1 : 0), _key2 = 1; _key2 < _len; _key2++) {
	                unitAmount[_key2 - 1] = arguments[_key2];
	            }

	            if (unitAmount.length !== this.angleAmount) {
	                throw new RangeError('传入的单位数量和初始的边角数量不一致.');
	            }
	            var ret = [];
	            unitAmount.forEach(function (amount, index) {
	                var _key = amount + '_' + index;
	                if (!_this2.pointsCollection[_key]) {
	                    var _radian = _this2.radians[index];
	                    _this2.pointsCollection[_key] = new Point(_this2.originOfCoordinate.X + SIN(_radian) * (amount * _this2.unitLength + _this2.baseLength), _this2.originOfCoordinate.Y - COS(_radian) * (amount * _this2.unitLength + _this2.baseLength));
	                }
	                ret[ret.length] = handler ? handler.call(_this2, _this2.pointsCollection[_key]) : _this2.pointsCollection[_key];
	            });
	            return ret.join(' ');
	        }
	    }, {
	        key: 'generatePointsPath',
	        value: function generatePointsPath() {
	            for (var _len2 = arguments.length, args = Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
	                args[_key3] = arguments[_key3];
	            }

	            return this.generatePoints.apply(this, [FORMAT_POINT].concat(args));
	        }
	    }]);

	    return PolygonCalculator;
	}();

	exports.default = PolygonCalculator;

/***/ }
/******/ ]);