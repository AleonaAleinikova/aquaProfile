(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = auth;

var _input = _interopRequireDefault(require("input.numbered"));

var _nanoajax = _interopRequireDefault(require("nanoajax"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function who() {
  return document.querySelector('.login');
}

function initMask() {
  return new _input.default('#tel', {
    mask: '+7 (###) ### - ## - ##',
    numbered: '#',
    empty: '_',
    placeholder: true
  });
}

function validatePhone(phoneMask, target) {
  var result = phoneMask.validate();
  if (result < 0) target.classList.add('field-has-error');
  return result > 0;
}

function validatePassword(target) {
  var result = target.value !== '';
  if (!result) target.classList.add('field-has-error');
  return result;
}

function activeteButton(element) {
  element.removeAttribute('disabled');
}

function disactiveteButton(element) {
  element.setAttribute('disabled', 'disabled');
}

function auth() {
  var form;
  var next;
  var isPhone;
  var isPassword;
  var isActive = true;
  var phoneMask;
  var button;

  function findElements() {
    form = document.querySelector('.login');
    next = form.dataset.next;
    button = document.querySelector('.submit');
  }

  function collectData() {
    return new FormData(form);
  }

  function sendData(data) {
    return new Promise(function (resolve, reject) {
      _nanoajax.default.ajax({
        url: form.action,
        method: 'POST',
        body: data
      }, function (code, response) {
        if (code === 200) resolve();
      });
    });
  }

  function changeURL() {
    window.location.pathname = "".concat(next);
  }

  function checkField(target) {
    if (target.name === 'tel') isPhone = validatePhone(phoneMask, target);else if (target.name === 'password') isPassword = validatePassword(target);
    isActive = isPhone && isPassword;
  }

  function onSubmit(event) {
    event.preventDefault();
    sendData(collectData()).then(changeURL);
  }

  function onFocusout(event) {
    var target = event.target;
    checkField(target);
    if (isActive) activeteButton(button);else disactiveteButton(button);
  }

  function onFocus(event) {
    var target = event.target;
    target.classList.remove('field-has-error');
  }

  function subscribe() {
    form.addEventListener('submit', onSubmit);
    form.addEventListener('focusout', onFocusout);
    form.addEventListener('focusin', onFocus);
  }

  function init() {
    if (who()) {
      phoneMask = initMask();
      findElements();
      subscribe();
    }
  }

  init();
}

},{"input.numbered":7,"nanoajax":8}],2:[function(require,module,exports){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = balance;

var _nanoajax = _interopRequireDefault(require("nanoajax"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function who() {
  return document.querySelector('#balance');
}

function checkValue(input) {
  var field = input;
  field.value = field.value.replace(/\D/g, '');
}

function balance() {
  var form;
  var field;
  var next;

  function findElements() {
    form = document.querySelector('.profileForm');
    field = document.querySelector('#balance');
    next = form.dataset.next;
  }

  function changeURL() {
    window.location.pathname = "".concat(next);
  }

  function collectData() {
    return new FormData(form);
  }

  function sendData(data) {
    return new Promise(function (resolve, reject) {
      _nanoajax.default.ajax({
        url: form.action,
        method: 'POST',
        body: data
      }, function (code, response) {
        if (code === 200) resolve();
      });
    });
  }

  function onSubmit(event) {
    event.preventDefault();
    sendData(collectData()).then(changeURL);
  }

  function onInput(event) {
    checkValue(field);
  }

  function subscribe() {
    form.addEventListener('submit', onSubmit);
    field.addEventListener('input', onInput);
  }

  function init() {
    if (who()) {
      findElements();
      subscribe();
    }
  }

  init();
}

},{"nanoajax":8}],3:[function(require,module,exports){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = logout;

var _nanoajax = _interopRequireDefault(require("nanoajax"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global Promise */
function who() {
  return document.querySelector('.logout');
}

function logout() {
  var link;
  var url;
  var next;

  function findElements() {
    link = document.querySelector('.logout');
    url = link.dataset.url;
    next = link.dataset.next;
  }

  function sendRequest() {
    return new Promise(function (resolve, reject) {
      _nanoajax.default.ajax({
        url: url,
        method: 'POST'
      }, function (code, response) {
        if (code === 200) resolve();
      });
    });
  }

  function changeURL() {
    window.location.pathname = "".concat(next);
  }

  function onClick(event) {
    event.preventDefault();
    sendRequest().then(changeURL);
  }

  function subscribe() {
    link.addEventListener('click', onClick);
  }

  function init() {
    if (who()) {
      findElements();
      subscribe();
    }
  }

  init();
}

},{"nanoajax":8}],4:[function(require,module,exports){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _fontfaceobserver = _interopRequireDefault(require("fontfaceobserver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOADED_PREFIX = 'font-';
var LOADED_SUFFIX = '-is-loaded';

function getFontClassName(fontName) {
  var noSpaces = fontName.replace(/ /g, '');
  return "".concat(LOADED_PREFIX).concat(noSpaces).concat(LOADED_SUFFIX);
}

function fontPromise(font) {
  var rest = new _fontfaceobserver.default(font);
  rest.load().then(function (loadedFont) {
    document.body.classList.add(getFontClassName(loadedFont.family));
  });
}

function init(fontCritical, fontsRest) {
  var critical = new _fontfaceobserver.default(fontCritical);
  critical.load().then(function (loadedFont) {
    document.body.classList.add(getFontClassName(loadedFont.family));

    if (fontsRest) {
      fontsRest.forEach(fontPromise);
    }
  });
}

;

},{"fontfaceobserver":6}],5:[function(require,module,exports){

"use strict";

var _fontLoad = _interopRequireDefault(require("patterns/fontLoad"));

var _logout = _interopRequireDefault(require("logout"));

var _balance = _interopRequireDefault(require("balance"));

var _auth = _interopRequireDefault(require("auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _fontLoad.default)('Roboto', ['Bebas Neue']);
(0, _logout.default)();
(0, _balance.default)();
(0, _auth.default)();

},{"auth":1,"balance":2,"logout":3,"patterns/fontLoad":4}],6:[function(require,module,exports){
/* Font Face Observer v2.1.0 - © Bram Stein. License: BSD-3-Clause */(function(){function l(a,b){document.addEventListener?a.addEventListener("scroll",b,!1):a.attachEvent("scroll",b)}function m(a){document.body?a():document.addEventListener?document.addEventListener("DOMContentLoaded",function c(){document.removeEventListener("DOMContentLoaded",c);a()}):document.attachEvent("onreadystatechange",function k(){if("interactive"==document.readyState||"complete"==document.readyState)document.detachEvent("onreadystatechange",k),a()})};function t(a){this.a=document.createElement("div");this.a.setAttribute("aria-hidden","true");this.a.appendChild(document.createTextNode(a));this.b=document.createElement("span");this.c=document.createElement("span");this.h=document.createElement("span");this.f=document.createElement("span");this.g=-1;this.b.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.c.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
this.f.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.h.style.cssText="display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;";this.b.appendChild(this.h);this.c.appendChild(this.f);this.a.appendChild(this.b);this.a.appendChild(this.c)}
function u(a,b){a.a.style.cssText="max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;white-space:nowrap;font-synthesis:none;font:"+b+";"}function z(a){var b=a.a.offsetWidth,c=b+100;a.f.style.width=c+"px";a.c.scrollLeft=c;a.b.scrollLeft=a.b.scrollWidth+100;return a.g!==b?(a.g=b,!0):!1}function A(a,b){function c(){var a=k;z(a)&&a.a.parentNode&&b(a.g)}var k=a;l(a.b,c);l(a.c,c);z(a)};function B(a,b){var c=b||{};this.family=a;this.style=c.style||"normal";this.weight=c.weight||"normal";this.stretch=c.stretch||"normal"}var C=null,D=null,E=null,F=null;function G(){if(null===D)if(J()&&/Apple/.test(window.navigator.vendor)){var a=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(window.navigator.userAgent);D=!!a&&603>parseInt(a[1],10)}else D=!1;return D}function J(){null===F&&(F=!!document.fonts);return F}
function K(){if(null===E){var a=document.createElement("div");try{a.style.font="condensed 100px sans-serif"}catch(b){}E=""!==a.style.font}return E}function L(a,b){return[a.style,a.weight,K()?a.stretch:"","100px",b].join(" ")}
B.prototype.load=function(a,b){var c=this,k=a||"BESbswy",r=0,n=b||3E3,H=(new Date).getTime();return new Promise(function(a,b){if(J()&&!G()){var M=new Promise(function(a,b){function e(){(new Date).getTime()-H>=n?b(Error(""+n+"ms timeout exceeded")):document.fonts.load(L(c,'"'+c.family+'"'),k).then(function(c){1<=c.length?a():setTimeout(e,25)},b)}e()}),N=new Promise(function(a,c){r=setTimeout(function(){c(Error(""+n+"ms timeout exceeded"))},n)});Promise.race([N,M]).then(function(){clearTimeout(r);a(c)},
b)}else m(function(){function v(){var b;if(b=-1!=f&&-1!=g||-1!=f&&-1!=h||-1!=g&&-1!=h)(b=f!=g&&f!=h&&g!=h)||(null===C&&(b=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent),C=!!b&&(536>parseInt(b[1],10)||536===parseInt(b[1],10)&&11>=parseInt(b[2],10))),b=C&&(f==w&&g==w&&h==w||f==x&&g==x&&h==x||f==y&&g==y&&h==y)),b=!b;b&&(d.parentNode&&d.parentNode.removeChild(d),clearTimeout(r),a(c))}function I(){if((new Date).getTime()-H>=n)d.parentNode&&d.parentNode.removeChild(d),b(Error(""+
n+"ms timeout exceeded"));else{var a=document.hidden;if(!0===a||void 0===a)f=e.a.offsetWidth,g=p.a.offsetWidth,h=q.a.offsetWidth,v();r=setTimeout(I,50)}}var e=new t(k),p=new t(k),q=new t(k),f=-1,g=-1,h=-1,w=-1,x=-1,y=-1,d=document.createElement("div");d.dir="ltr";u(e,L(c,"sans-serif"));u(p,L(c,"serif"));u(q,L(c,"monospace"));d.appendChild(e.a);d.appendChild(p.a);d.appendChild(q.a);document.body.appendChild(d);w=e.a.offsetWidth;x=p.a.offsetWidth;y=q.a.offsetWidth;I();A(e,function(a){f=a;v()});u(e,
L(c,'"'+c.family+'",sans-serif'));A(p,function(a){g=a;v()});u(p,L(c,'"'+c.family+'",serif'));A(q,function(a){h=a;v()});u(q,L(c,'"'+c.family+'",monospace'))})})};"object"===typeof module?module.exports=B:(window.FontFaceObserver=B,window.FontFaceObserver.prototype.load=B.prototype.load);}());

},{}],7:[function(require,module,exports){
/*! numbered v1.0.6 | pavel-yagodin | MIT License | https://github.com/CSSSR/jquery.numbered */
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.Numbered = factory();
	}
}(this, function () {
	'use strict';

	var defaults = {
		mask: '+7 (###) ### - ## - ##',
		numbered: '#',
		empty: '_',
		placeholder: false
	};

	var Numbered = function (target, params) {
		var self = this;

		if (typeof target !== 'object') {
			self.inputs = document.querySelectorAll(target);
		} else if (typeof target.length !== 'undefined') {
			self.inputs = target;
		} else {
			self.inputs = [target];
		}
		self.inputs = Array.prototype.slice.call(self.inputs);

		params = params || (typeof self.inputs[0].numbered !== 'undefined' ? self.inputs[0].numbered.params : {});

		for (var def in defaults) {
			if (typeof params[def] === 'undefined') {
				params[def] = defaults[def];
			}
		}

		self.params = params;
		self.config = {};

		self.config.placeholder = self.params.mask.replace(new RegExp(self.params.numbered, 'g'), self.params.empty);
		self.config.numbered    = self.params.numbered.replace(/([()[\]\.^\#$|?+-])/g, '\\\\$1');
		self.config.numberedCol = self.params.mask.split(self.params.numbered).length -1;
		self.config.empty       = self.params.empty.replace(/([()[\]\.^\#$|?+-])/g, '\\$1');
		self.config.mask        = self.params.mask.replace(/([()[\]\.^\#$|?+-])/g, '\\$1').replace(new RegExp(self.config.numbered, 'g'), '(\\d)');
		self.config.maskNums    = self.params.mask.replace(/[^\d]/gi, '').split('');
		self.config.maskNumsCol = self.config.maskNums.length;
		self.config.regexp      = new RegExp('^' + self.config.mask + '$');
		self.config.events      = ['input', 'change', 'click', 'focusin', 'blur'];

		// console.log(self.config);


		self._eventFire = function(el, etype){
			if (el.fireEvent) {
				el.fireEvent('on' + etype);
			} else {
				var evObj = document.createEvent('Events');
				evObj.initEvent(etype, true, false);
				el.dispatchEvent(evObj);
			}
		};

		self._getSelectionRange = function (oElm) {
			var r = { text: '', start: 0, end: 0, length: 0 };
			if (oElm.setSelectionRange) {
				r.start= oElm.selectionStart;
				r.end = oElm.selectionEnd;
				r.text = (r.start != r.end) ? oElm.value.substring(r.start, r.end): '';
			} else if (document.selection) {
				var oR;
				if (oElm.tagName && oElm.tagName === 'TEXTAREA') {
					var oS = document.selection.createRange().duplicate();
					oR = oElm.createTextRange();
					var sB = oS.getBookmark();
					oR.moveToBookmark(sB);
				} else {
					oR = document.selection.createRange().duplicate();
				}

				r.text = oR.text;
				for (; oR.moveStart('character', -1) !== 0; r.start++);
				r.end = r.text.length + r.start;
			}
			r.length = r.text.length;
			return r;
		};


		self.magic = function (event) {
			var numbered = this.numbered;
			var value = numbered.input.value || ' ';
			var valueFormatted = value.replace(/[^\d]/gi, '').split('').join('');
			var valueFormattedArr = valueFormatted.split('');
			var valueFormattedCol = valueFormattedArr.length;
			var valueFormattedIndex = 0;
			var positionStart = -1;
			var positionEnd = -1;
			var positionOld = self._getSelectionRange(numbered.input);
			var maskNumsIndex = 0;
			var valueFormattedRes = [];
			var maskSplit = numbered.params.mask.split('');
			// console.log(valueFormatted);

			for (var key in maskSplit) {
				var val = maskSplit[key];
				key = parseInt(key);
				if (maskNumsIndex <= numbered.config.maskNumsCol && val == numbered.config.maskNums[maskNumsIndex] && val == valueFormattedArr[valueFormattedIndex]) {
					valueFormattedRes.push(val);
					maskNumsIndex++;
					valueFormattedIndex++;
				} else if(val == numbered.params.numbered) {
					if (positionStart < 0) {
						positionStart = key;
					}
					if(valueFormattedIndex < valueFormattedCol) {
						valueFormattedRes.push(valueFormattedArr[valueFormattedIndex]);
						valueFormattedIndex++;
						positionEnd = key;
					} else {
						valueFormattedRes.push(numbered.params.empty);
					}
				} else {
					valueFormattedRes.push(val);
				}
			}
			value = valueFormattedRes.join('');

			var position = (positionEnd >= 0 ? positionEnd + 1 : positionStart);
			if (event.type !== 'click') {
				if ((event.type === 'blur' || event.type === 'change') && valueFormattedIndex - maskNumsIndex === 0 && !numbered.params.placeholder) {
					this.value = '';
				} else if (numbered.oldValue !== numbered.input.value || event.type === 'focusin') {
					this.value = value;
				}
			}

			if(event.type !== 'change' && event.type !== 'blur' && (event.type !== 'click' || (numbered.lastEvent === 'focusin' && event.type === 'click'))) {
				if (numbered.input.setSelectionRange) {
					numbered.input.setSelectionRange(position, position);
				} else if (numbered.input.createTextRange) {
					var range = numbered.input.createTextRange();
					range.collapse(true);
					range.moveEnd('character', position);
					range.moveStart('character', position);
					range.select();
				}
			}

			numbered.oldValue = this.value;
			numbered.lastEvent = event.type;
			return event.target;
		};

		for (var index in self.inputs) {
			var $input = self.inputs[index];
			var is = false;
			if (typeof $input.numbered === 'оbject' || typeof $input.numbered !== 'undefined') {
				is = true;
			}
			$input.numbered = {
				input: self.inputs[index],
				config: self.config,
				params: self.params,
				oldValue: false
			};

			if (!is) {
				for (var key in self.config.events) {
					$input.addEventListener(self.config.events[key], self.magic);
				}
				self._eventFire($input, 'blur');
			}
			self.inputs[index] = $input;
		}

		self.destroy = function () {
			var self = this;
			for (var index in self.inputs) {
				var $input = self.inputs[index];

				for (var key in self.config.events) {
					$input.removeEventListener(self.config.events[key], self.magic);
					$input.numbered = null;
				}
			}
			return null;
		};

		self.validate = function (i) {
			var input = i || false;
			var self = this;
			var res = self.inputs.length > 1 ? [] : false;
			var inputs = input !== false ? [input] : self.inputs;
			for (var index in inputs) {
				var $input = inputs[index];
				var validate;

				if (inputs[index].numbered.config.regexp.test(inputs[index].numbered.input.value)) {
					validate = 1;
				} else if (inputs[index].numbered.input.value === '' || inputs[index].numbered.input.value === inputs[index].numbered.config.placeholder) {
					validate = 0;
				} else {
					validate = -1;
				}

				if (inputs.length > 1) {
					res.push(validate);
				} else {
					res = validate;
				}
			}
			return res;
		};

		self.reInit = function () {
			var self = this;
			var res = self.inputs.length > 1 ? [] : false;
			for (var index in self.inputs) {
				var $input = self.inputs[index];
				self._eventFire($input, 'blur');
			}
			return res;
		};

		self.setVal = function (value) {
			var self = this;
			var res = self.inputs.length > 1 ? [] : false;
			for (var index in self.inputs) {
				var $input = self.inputs[index];
				$input.value = value;
				self._eventFire($input, 'blur');
			}
			return res;
		};

		self.getVal = function (r) {
			var raw = r || false;
			var values = [];
			for (var index in this.inputs) {
				var $input = this.inputs[index];
				var value = $input.value;

				if (raw) {
					if (this.validate($input) > 0) {
						var arr = value.match(this.config.regexp);
						value = arr.slice(1, arr.length).join('');
					} else {
						value = $input.value.replace(/[^\d]/gi, '');
					}
				}
				values.push(value);
			}
			return values.length>1?values:values[0];
		};

		return self;
	};

	return Numbered;
}));

},{}],8:[function(require,module,exports){
(function (global){
// Best place to find information on XHR features is:
// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest

var reqfields = [
  'responseType', 'withCredentials', 'timeout', 'onprogress'
]

// Simple and small ajax function
// Takes a parameters object and a callback function
// Parameters:
//  - url: string, required
//  - headers: object of `{header_name: header_value, ...}`
//  - body:
//      + string (sets content type to 'application/x-www-form-urlencoded' if not set in headers)
//      + FormData (doesn't set content type so that browser will set as appropriate)
//  - method: 'GET', 'POST', etc. Defaults to 'GET' or 'POST' based on body
//  - cors: If your using cross-origin, you will need this true for IE8-9
//
// The following parameters are passed onto the xhr object.
// IMPORTANT NOTE: The caller is responsible for compatibility checking.
//  - responseType: string, various compatability, see xhr docs for enum options
//  - withCredentials: boolean, IE10+, CORS only
//  - timeout: long, ms timeout, IE8+
//  - onprogress: callback, IE10+
//
// Callback function prototype:
//  - statusCode from request
//  - response
//    + if responseType set and supported by browser, this is an object of some type (see docs)
//    + otherwise if request completed, this is the string text of the response
//    + if request is aborted, this is "Abort"
//    + if request times out, this is "Timeout"
//    + if request errors before completing (probably a CORS issue), this is "Error"
//  - request object
//
// Returns the request object. So you can call .abort() or other methods
//
// DEPRECATIONS:
//  - Passing a string instead of the params object has been removed!
//
exports.ajax = function (params, callback) {
  // Any variable used more than once is var'd here because
  // minification will munge the variables whereas it can't munge
  // the object access.
  var headers = params.headers || {}
    , body = params.body
    , method = params.method || (body ? 'POST' : 'GET')
    , called = false

  var req = getRequest(params.cors)

  function cb(statusCode, responseText) {
    return function () {
      if (!called) {
        callback(req.status === undefined ? statusCode : req.status,
                 req.status === 0 ? "Error" : (req.response || req.responseText || responseText),
                 req)
        called = true
      }
    }
  }

  req.open(method, params.url, true)

  var success = req.onload = cb(200)
  req.onreadystatechange = function () {
    if (req.readyState === 4) success()
  }
  req.onerror = cb(null, 'Error')
  req.ontimeout = cb(null, 'Timeout')
  req.onabort = cb(null, 'Abort')

  if (body) {
    setDefault(headers, 'X-Requested-With', 'XMLHttpRequest')

    if (!global.FormData || !(body instanceof global.FormData)) {
      setDefault(headers, 'Content-Type', 'application/x-www-form-urlencoded')
    }
  }

  for (var i = 0, len = reqfields.length, field; i < len; i++) {
    field = reqfields[i]
    if (params[field] !== undefined)
      req[field] = params[field]
  }

  for (var field in headers)
    req.setRequestHeader(field, headers[field])

  req.send(body)

  return req
}

function getRequest(cors) {
  // XDomainRequest is only way to do CORS in IE 8 and 9
  // But XDomainRequest isn't standards-compatible
  // Notably, it doesn't allow cookies to be sent or set by servers
  // IE 10+ is standards-compatible in its XMLHttpRequest
  // but IE 10 can still have an XDomainRequest object, so we don't want to use it
  if (cors && global.XDomainRequest && !/MSIE 1/.test(navigator.userAgent))
    return new XDomainRequest
  if (global.XMLHttpRequest)
    return new XMLHttpRequest
}

function setDefault(obj, key, value) {
  obj[key] = obj[key] || value
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[5]);
