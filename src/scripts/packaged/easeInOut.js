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

	var _easeInOut = __webpack_require__(1);

	var _easeInOut2 = _interopRequireDefault(_easeInOut);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var frame = 60;
	var $bar = document.querySelector('.bar');
	var $btn = document.querySelector('.start');
	var itv = -1;

	$btn.addEventListener('click', function () {
	    var easeInOut = (0, _easeInOut2.default)(3, frame, 0, 100);
	    $bar.style.width = 0;
	    clearInterval(itv);
	    itv = setInterval(function () {
	        $bar.style.width = easeInOut() + '%';
	    }, 1000 / frame);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * 获取easeInOut函数
	 * 
	 * @param {number} duration 整体时间(秒)
	 * @param {number} frame 帧数(每秒)
	 * @param {number} start 起始值
	 * @param {number} increase 增长值
	 * 
	 * @return {Function} 返回ease-in-out线性函数
	 */
	var EaseInOutGenerator = function EaseInOutGenerator(duration, frame, start, increase) {
	    var time_span = 1 / frame;
	    var curr_time = 0;
	    return function () {
	        var ret = void 0;
	        var time = curr_time;
	        if (time == 0) {
	            ret = start;
	        } else if (time >= duration) {
	            ret = start + increase;
	        } else if ((time /= duration / 2) < 1) {
	            ret = increase / 2 * Math.pow(2, 10 * (time - 1)) + start;
	        } else {
	            ret = increase / 2 * (-Math.pow(2, -10 * (time - 1)) + 2) + start;
	        }
	        curr_time += time_span;
	        return ret;
	    };
	};

	exports.default = EaseInOutGenerator;

/***/ }
/******/ ]);