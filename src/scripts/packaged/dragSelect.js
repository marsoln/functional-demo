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

	var _dragSelect = __webpack_require__(1);

	var _dragSelect2 = _interopRequireDefault(_dragSelect);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var arr = Array(10).fill('');
	for (var i in arr) {
	    var _item = document.createElement('li');
	    _item.innerText = 'list item [' + ++i + ']';
	    list.appendChild(_item);
	}

	(0, _dragSelect2.default)(document, document.querySelectorAll('#list li'), document.querySelector('.selectRange'), 'selected');

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (_container, _list, _rangeCover, chosenClassName) {
	  var onPressed = false;
	  var touchPoint;
	  /*
	    判断两线段在坐标轴上的投影是否重叠
	  */
	  var isProjectionLapped = function isProjectionLapped(p_1, p_2, len_1, len_2) {
	    if (p_2 > p_1) {
	      return p_2 - p_1 <= len_1;
	    } else {
	      return p_1 - p_2 <= len_2;
	    }
	  };

	  /**
	    判断两个矩形是否相交
	  */
	  var isRectLapped = function isRectLapped(p_1_x, p_1_y, width_1, height_1, p_2_x, p_2_y, width_2, height_2) {
	    return isProjectionLapped(p_1_x, p_2_x, width_1, width_2) && isProjectionLapped(p_1_y, p_2_y, height_1, height_2);
	  };

	  // 取消拖拽
	  var cancelDrag = function cancelDrag() {
	    onPressed = false;
	    // 注销事件监听
	    _container.removeEventListener('mousemove', mouseMove);
	    _container.removeEventListener('mouseup', cancelDrag);
	    touchPoint = undefined;
	    _rangeCover.style.display = 'none';
	  };
	  // 鼠标移动事件
	  var mouseMove = function mouseMove(e) {
	    if (onPressed) {
	      _rangeCover.style.display = 'block';
	      var _cover_y = Math.min(touchPoint.y, e.clientY);
	      var _cover_h = Math.abs(touchPoint.y - e.clientY);
	      var _cover_x = Math.min(touchPoint.x, e.clientX);
	      var _cover_w = Math.abs(touchPoint.x - e.clientX);
	      _rangeCover.style.top = _cover_y + 'px';
	      _rangeCover.style.left = _cover_x + 'px';
	      _rangeCover.style.width = _cover_w + 'px';
	      _rangeCover.style.height = _cover_h + 'px';
	      for (var i = 0; i < _list.length; i++) {
	        var t = _list[i];
	        // var _y = t.offsetTop // 对象左上角的纵坐标
	        // var _x = t.offsetLeft // 对象左上角的横坐标
	        // var _h = t.clientHeight // 对象右下角的纵坐标
	        // var _w = t.clientWidth // 对象右下角的横坐标
	        if (isRectLapped(_cover_x, _cover_y, _cover_w, _cover_h, t.offsetLeft, t.offsetTop, t.clientWidth, t.clientHeight)) {
	          t.classList.add(chosenClassName);
	        } else {
	          t.classList.remove(chosenClassName);
	        }
	      }
	    } else {
	      cancelDrag();
	    }
	  };

	  // 右键菜单
	  _container.addEventListener('contextmenu', function (e) {
	    // 取消系统默认菜单
	    e.preventDefault();
	    e.stopPropagation();
	    e.returnValue = false;
	    var _tar = e.target || e.srcElement;
	    if (_tar.nodeName === 'LI' && _tar.className.indexOf(chosenClassName) > -1) {
	      // classList 不是数组对象 如果要使用 也是Array.prototype.indexOf.call(_tar.classList) > -1
	      // 选中项显示菜单
	      console.log('显示右键菜单');
	    } else {
	      // 取消选中
	      Array.prototype.forEach.call(_list, function (item) {
	        return item.classList.remove(chosenClassName);
	      });
	    }
	  });

	  // 注册鼠标按下的事件
	  _container.addEventListener('mousedown', function (e) {
	    e.preventDefault();
	    // e.buttons为1代表鼠标左键 是chrome下的 我记得IE里不是这样的 不过再说吧...
	    if (e.buttons == 1) {
	      _container.addEventListener('mouseup', cancelDrag);
	      onPressed = true;
	      touchPoint = {
	        x: e.clientX,
	        y: e.clientY
	      };
	      _container.addEventListener('mousemove', mouseMove);
	    }
	  });
	};

/***/ }
/******/ ]);