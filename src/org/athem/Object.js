/**
 *
 */

(function(j){

	window.org = window.org || {};
	window.org.athem = window.org.athem || {};

	/**
	 * All JavaScript Classes will extend this one.
	 *
	 * <code>
	 * // Usage:
	 * config = {}
	 * (new org.athem.Loader(config[, ...])).run();
	 * </code>
	 */
	window.org.athem.Object = Class.create({
		/**
		 * Constructor.
		 * @var Object o
		 */
		initialize: function(o) {
			this.options = this.options || {};
			this.options = jQuery.fn.extend(true, o, this.options);
		}
	});

	/**
	 * Extensions of current JavaScript classes based on evolution of javascript
	 * on most of the existent browsers and more.
	 *
	 * @category org.athem
	 * @link https://developer.mozilla.org/en/JavaScript/Reference
	 * @copyright  Copyright (c) 2011 IT Media Connect, Romania (http://www.itmediaconnect.ro)
	 * @license http://itmediaconnect.ro/products/jajax/licence
	 */

	/**
	 * @TODO: Add documentation
	 * @type {*|Function}
	 */
	Array.isArray = Array.isArray || function (vArg) {
		return Object.prototype.toString.call(vArg) === "[object Array]";
	};

	/**
	 * @TODO: Add documentation
	 * @type {*|Function}
	 */
	Array.prototype.indexOf = Array.prototype.indexOf || function (searchElement /*, fromIndex */ ) {
		"use strict";
		if (this == null) {
			throw new TypeError();
		}
		var t = Object(this);
		var len = t.length >>> 0;
		if (len === 0) {
			return -1;
		}
		var n = 0;
		if (arguments.length > 1) {
			n = Number(arguments[1]);
			if (n != n) { // shortcut for verifying if it's NaN
				n = 0;
			} else if (n != 0 && n != Infinity && n != -Infinity) {
				n = (n > 0 || -1) * Math.floor(Math.abs(n));
			}
		}
		if (n >= len) {
			return -1;
		}
		var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
		for (; k < len; k++) {
			if (k in t && t[k] === searchElement) {
				return k;
			}
		}
		return -1;
	};

	/**
	 * @TODO: Add documentation
	 * @type {*|Function}
	 */
	Array.prototype.lastIndexOf = Array.prototype.lastIndexOf || function(searchElement /*, fromIndex*/)
	{
		"use strict";

		if (this == null)
			throw new TypeError();

		var t = Object(this);
		var len = t.length >>> 0;
		if (len === 0)
			return -1;

		var n = len;
		if (arguments.length > 1)
		{
			n = Number(arguments[1]);
			if (n != n)
				n = 0;
			else if (n != 0 && n != (1 / 0) && n != -(1 / 0))
				n = (n > 0 || -1) * Math.floor(Math.abs(n));
		}

		var k = n >= 0
			? Math.min(n, len - 1)
			: len - Math.abs(n);

		for (; k >= 0; k--)
		{
			if (k in t && t[k] === searchElement)
				return k;
		}
		return -1;
	};

	/**
	 * Executes a provided function once for each array element.
	 * This function has been added in version 1.6 but is not supported by all browsers.
	 *
	 * <code>
	 * [2, 5, 9].forEach(function print(element, index, array) {
	 *		document.write("[" + index + "] is " + element);
	 * 	});
	 * // Prints:
	 * // [0] is 2
	 * // [1] is 5
	 * // [2] is 9
	 * </code>
	 *
	 * @category Array
	 * @link https://developer.mozilla.org/en/JavaScript/Reference
	 * @copyright  Copyright (c) 2011 IT Media Connect, Romania (http://www.itmediaconnect.ro)
	 * @copyright Mozilla Developer Network and individual contributors https://developer.mozilla.org/en-US/docs/Project:Copyrights
	 *
	 * @param Function callBack
	 *
	 */
	Array.prototype.forEach = Array.prototype.forEach || function(callBack/*, thisp*/){
		var len = this.length >>> 0;
		if (typeof callBack != "function") {
			throw new TypeError();
		}
		var thisp = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in this)
				callBack.call(thisp, this[i], i, this);
		}
	};

	Array.prototype.each = Array.prototype.each || function(callBack/*, thisp*/) {
		return this.forEach(callBack);
	}

	/**
	 * Creates a new array with all elements that pass the test implemented by
	 * the provided function.
	 * This function has been added in version 1.6 but is not supported by all browsers.
	 *
	 * <code>
	 * var odd = [6, 5, 10, 151].filter(function isOdd(element, index, array) {
	 * 		return (element % 2);
	 * 	});
	 * // will return
	 * // [5, 151]
	 * </code>
	 *
	 * @category Array
	 * @link https://developer.mozilla.org/en/JavaScript/Reference
	 * @copyright  Copyright (c) 2011 IT Media Connect, Romania (http://www.itmediaconnect.ro)
	 * @copyright Mozilla Developer Network and individual contributors https://developer.mozilla.org/en-US/docs/Project:Copyrights
	 *
	 * @param Function callBack
	 * @return Array
	 */
	Array.prototype.filter = Array.prototype.filter || function(callBack/*, thisp*/) {
		var len = this.length >>> 0;
		if (typeof callBack != "function") {
			throw new TypeError();
		}
		var res = new Array();
		var thisp = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in this) {
				var val = this[i]; // in case fun mutates this
				if (callBack.call(thisp, val, i, this))
					res.push(val);
			}
		}

		return res;
	};

	/**
	 * Tests whether all elements in the array pass the test implemented by the provided function.
	 * This function has been added in version 1.6 but is not supported by all browsers.
	 *
	 * @memberOf Array
	 * @param Function callBack
	 * @param Object thisObject
	 *
	 * @return Boolean
	 */
	Array.prototype.every = Array.prototype.every || function(callBack/*, thisp*/) {
		var len = this.length >>> 0;
		if (typeof callBack != "function") {
			throw new TypeError();
		}
		var thisp = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in this && !callBack.call(thisp, this[i], i, this)) {
				return false;
			}
		}

		return true;
	};

	/**
	 * Creates a new array with the results of calling a provided function on every element in this array.
	 * This function has been added in version 1.6 but is not supported by all browsers.
	 *
	 * @category Array
	 * @link https://developer.mozilla.org/en/JavaScript/Reference
	 * @copyright  Copyright (c) 2011 IT Media Connect, Romania (http://www.itmediaconnect.ro)
	 * @copyright Mozilla Developer Network and individual contributors https://developer.mozilla.org/en-US/docs/Project:Copyrights
	 *
	 * @param Function callBack
	 * @return Array
	 */
	Array.prototype.map = Array.prototype.map || function(callBack /*, thisp*/) {
		var len = this.length >>> 0;
		if (typeof callBack != "function") {
			throw new TypeError();
		}
		var res = new Array(len);
		var thisp = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in this) {
				res[i] = callBack.call(thisp, this[i], i, this);
			}
		}
		return res;
	};

	/**
	 * Tests whether some element in the array passes the test implemented by the provided function.
	 * This function has been added in version 1.6 but is not supported by all browsers.
	 *
	 * @category Array
	 * @link https://developer.mozilla.org/en/JavaScript/Reference
	 * @copyright  Copyright (c) 2011 IT Media Connect, Romania (http://www.itmediaconnect.ro)
	 * @copyright Mozilla Developer Network and individual contributors https://developer.mozilla.org/en-US/docs/Project:Copyrights
	 *
	 * @param Function callBack
	 * @return Boolean
	 */
	Array.prototype.some = Array.prototype.some || function(callBack /*, thisp*/) {
		var i = 0,
			len = this.length >>> 0;
		if (typeof callBack != "function") {
			throw new TypeError();
		}
		var thisp = arguments[1];
		for (; i < len; i++) {
			if (i in this && callBack.call(thisp, this[i], i, this)) {
				return true;
			}
		}
		return false;
	};

	/**
	 * Apply a function against an accumulator and each value of the array (from left-to-right) as to reduce it to a single value.
	 * This function has been added in version 1.6 but is not supported by all browsers.
	 *
	 * @category Array
	 * @link https://developer.mozilla.org/en/JavaScript/Reference
	 * @copyright  Copyright (c) 2011 IT Media Connect, Romania (http://www.itmediaconnect.ro)
	 * @copyright Mozilla Developer Network and individual contributors https://developer.mozilla.org/en-US/docs/Project:Copyrights
	 *
	 * @param Function callBack
	 * @return Array
	 */
	Array.prototype.reduce = Array.prototype.reduce || function(callBack /*, initial*/) {
		var len = this.length >>> 0;
		if (typeof callBack != "function") {
			throw new TypeError();
		}
		// no value to return if no initial value and an empty array
		if (len == 0 && arguments.length == 1) {
			throw new TypeError();
		}
		var i = 0;
		var rv;
		if (arguments.length >= 2) {
			rv = arguments[1];
		} else {
			do {
				if (i in this) {
					rv = this[i++];
					break;
				}
				// if array contains no values, no initial value to return
				if (++i >= len) {
					throw new TypeError();
				}
			} while (true);
		}
		for (; i < len; i++) {
			if (i in this) {
				rv = callBack.call(null, rv, this[i], i, this);
			}
		}
		return rv;
	};

	/**
	 * Apply a function simultaneously against two values of the array (from right-to-left) as to reduce it to a single value.
	 * This function has been added in version 1.8 but is not supported by all browsers.
	 *
	 * @category Array
	 * @link https://developer.mozilla.org/en/JavaScript/Reference
	 * @copyright  Copyright (c) 2011 IT Media Connect, Romania (http://www.itmediaconnect.ro)
	 * @copyright Mozilla Developer Network and individual contributors https://developer.mozilla.org/en-US/docs/Project:Copyrights
	 *
	 * @param Function callBack
	 * @return Array
	 */
	Array.prototype.reduceRight = Array.prototype.reduceRight || function(callBack /*, initial*/) {
		var len = this.length >>> 0;
		if (typeof callBack != "function") {
			throw new TypeError();
		}
		// no value to return if no initial value, empty array
		if (len == 0 && arguments.length == 1) {
			throw new TypeError();
		}
		var i = len - 1;
		var rv;
		if (arguments.length >= 2) {
			rv = arguments[1];
		} else {
			do {
				if (i in this) {
					rv = this[i--];
					break;
				}
				// if array contains no values, no initial value to return
				if (--i < 0) {
					throw new TypeError();
				}
			} while (true);
		}
		for (; i >= 0; i--) {
			if (i in this)
				rv = callBack.call(null, rv, this[i], i, this);
		}
		return rv;
	};

	/**
	 * Transform a decimal into base 16 number.
	 *
	 * @category Number
	 * @link https://developer.mozilla.org/en/JavaScript/Reference
	 * @copyright  Copyright (c) 2011 IT Media Connect, Romania (http://www.itmediaconnect.ro)
	 * @copyright Mozilla Developer Network and individual contributors https://developer.mozilla.org/en-US/docs/Project:Copyrights
	 *
	 * @param Number value
	 * @return String
	 */
	Number.prototype.toHexa = Number.prototype.toHexa || function() {
		return this.valueOf().toString(16).toUpperCase();
	};

	/**
	 * Transform a decimal into a base 8 number.
	 *
	 * @category Number
	 * @link https://developer.mozilla.org/en/JavaScript/Reference
	 * @copyright  Copyright (c) 2011 IT Media Connect, Romania (http://www.itmediaconnect.ro)
	 * @copyright Mozilla Developer Network and individual contributors https://developer.mozilla.org/en-US/docs/Project:Copyrights
	 *
	 * @param Number value
	 * @return String
	 */
	Number.prototype.toOctal = Number.prototype.toOctal || function() {
		return this.valueOf().toString(8).toUpperCase();
	};

	/**
	 * Transform a decimal into a base 2 number.
	 *
	 * @category Number
	 * @link https://developer.mozilla.org/en/JavaScript/Reference
	 * @copyright  Copyright (c) 2011 IT Media Connect, Romania (http://www.itmediaconnect.ro)
	 * @copyright Mozilla Developer Network and individual contributors https://developer.mozilla.org/en-US/docs/Project:Copyrights
	 *
	 * @param Number value
	 * @return String
	 */
	Number.prototype.toBinary = Number.prototype.toBinary || function() {
		return this.valueOf().toString(2).toUpperCase();
	};

	/**
	 * Transform a decimal into a certain base base.
	 *
	 * @category Number
	 * @link https://developer.mozilla.org/en/JavaScript/Reference
	 * @copyright  Copyright (c) 2011 IT Media Connect, Romania (http://www.itmediaconnect.ro)
	 * @copyright Mozilla Developer Network and individual contributors https://developer.mozilla.org/en-US/docs/Project:Copyrights
	 *
	 * @param Number value
	 * @return String
	 */
	Number.prototype.toBase = Number.prototype.toBase || function(base) {
		base = base || 10;
		return this.valueOf().toString(base).toUpperCase();
	};

	/**
	 * Decodes a string from BASE64
	 *
	 * @memberOf String
	 * @param String value
	 * @return String
	 */
	String.prototype.fromBase64 = String.prototype.fromBase64 || function(){
		var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, dec = "", tmp_arr = [];
		var string = this.valueOf();
		if (!string) {
			return string;
		}
		string += '';
		do { // unpack four hexets into three octets using index points in b64
			h1 = b64.indexOf(string.charAt(i++));
			h2 = b64.indexOf(string.charAt(i++));
			h3 = b64.indexOf(string.charAt(i++));
			h4 = b64.indexOf(string.charAt(i++));
			bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
			o1 = bits >> 16 & 0xff;
			o2 = bits >> 8 & 0xff;
			o3 = bits & 0xff;
			if (h3 == 64) {
				tmp_arr[ac++] = String.fromCharCode(o1);
			}
			else {
				if (h4 == 64) {
					tmp_arr[ac++] = String.fromCharCode(o1, o2);
				}
				else {
					tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
				}
			}
		}
		while (i < string.length);
		dec = tmp_arr.join('');
		dec = dec.fromUTF8();
		return dec;
	};

	/**
	 * Converts from Camel Case to different forms
	 * @return String
	 */
	String.prototype.fromCamelCase = String.prototype.fromCamelCase || String.prototype.fromCamelCase || function (to){
		to = to ? to : '_';
		return this.replace(/([A-Z])/g, (function(to){ return function($1){return to+$1.toLowerCase();} })(to));
	}

	/**
	 * Decodes a string from UTF8
	 *
	 * @memberOf String
	 * @param String value
	 * @return String
	 */
	String.prototype.fromUTF8 = String.prototype.fromUTF8 || function(value){
		var string = this.valueOf();
		var tmp_arr = [], i = 0, ac = 0, c1 = 0, c2 = 0, c3 = 0;
		string += '';
		while (i < string.length) {
			c1 = string.charCodeAt(i);
			if (c1 < 128) {
				tmp_arr[ac++] = String.fromCharCode(c1);
				i++;
			}
			else
			if ((c1 > 191) && (c1 < 224)) {
				c2 = string.charCodeAt(i + 1);
				tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = string.charCodeAt(i + 1);
				c3 = string.charCodeAt(i + 2);
				tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return tmp_arr.join('');
	};

	/**
	 * Encodes all HTML tags found in a string
	 *
	 * <code>
	 * (new String('<span style="color: red;">text</span>')).htmlEncode()
	 * // returns %3Cspan%20style%3D%22color%3A%20red%3B%22%3Etext%3C/span%3E
	 * </code>
	 *
	 * @memberOf String
	 * @param String value
	 * @return String
	 */
	String.prototype.htmlEncode = String.prototype.htmlEncode || function(value){
		return escape(value || this);
	};

	/**
	 * Decodes all HTML tags found in a string
	 *
	 * <code>
	 * (new String('%3Cspan%20style%3D%22color%3A%20red%3B%22%3Etext%3C/span%3E')).htmlDencode()
	 * returns //&lt;span style="color: red;"&gt;text&lt;/span&gt;
	 * </code>
	 *
	 * @memberOf String
	 * @param String value
	 * @return String
	 */
	String.prototype.htmlDecode = String.prototype.htmlDecode || function(value){
		return unescape(value || this);
	};

	/**
	 * Checks if string represents a float number
	 *
	 * @memberOf String
	 * @param String value
	 * @return Boolean
	 */
	String.prototype.isFloat = String.prototype.isFloat || function(value){
		//	n = parseFloat(value || this);
		//	return ((!isNaN(n) && n.toString() == this) ? true : false);
		return (this.match(/^-?\d+(\.\d*)?([eE][-+]\d+)?$/) ? true : false);
	};

	/**
	 * Checks if string represents an integer number
	 *
	 * @memberOf String
	 * @param String value
	 * @return Boolean
	 */
	String.prototype.isInt = String.prototype.isInt || function(value){
		var n = parseInt(value || this);
		return ((!isNaN(n) && n.toString() == this) ? true : false);
		//	return (this.match(/^-?(\d|[1-9]\d+)([eE]+\d+)?$/) ? true: false);
	};

	/**
	 * Checks if string represents a number
	 *
	 * @memberOf String
	 * @param String value
	 * @return Boolean
	 */
	String.prototype.isNumber = String.prototype.isNumber || function(value){
		return (this.isInt(value) || this.isFloat(value));
	};

	/**
	 * Converts 1st char of a string to lower case
	 * @see http://php.net/manual/en/function.ucfirst.php
	 * @return String
	 */
	String.prototype.lcfirst = String.prototype.lcfirst || function () {
		return (this.length > 1) ?
			this.replace(/^([A-Z])/g, function($1){return $1.toLowerCase();}) :
			((this.length == 1) ? this.toLowerCase() : this);
	}

	/**
	 * Finds all matches of a given pattern.
	 *
	 * <code>
	 * (new String('Hello World!')).matchAll(/l/)
	 * // returns ['l', 'l', 'l']
	 * (new String('Hello World!')).matchAll(/x/)
	 * // returns false
	 * </code>
	 *
	 * @memberOf String
	 * @param RegExp|String pattern
	 * @return Boolean|Array
	 */
	String.prototype.matchAll = String.prototype.matchAll || function(pattern){
		var s = pattern.toString();
		if (s.indexOf("/") != 0)
			throw "String.mathAll(pattern): pattern is not RegExp";
		if (s.match(/\/[imy]*g[imy]*$/)) {
			return this.match(pattern);
		}
		else {
			s += 'g';
		}
		var r = new RegExp(s.substr(1, s.lastIndexOf("/") - 1), s.substr(s.lastIndexOf("/") + 1, s.length));
		return this.match(r);
	};

	/**
	 * Replaces all the matches with a given value.
	 *
	 * <code>
	 * (new String('Hello World!')).replaceAll(/l/, 'r')
	 * // returns 'Herro Worrd!'
	 * </code>
	 *
	 * @memberOf String
	 * @param RegExp pattern
	 * @param String value
	 * @return String
	 */
	String.prototype.replaceAll = String.prototype.replaceAll || function(pattern, value) {
		var s = pattern.toString();
		if (s.indexOf("/") != 0)
			throw "String.replaceAll(pattern, value): " + s + " is not RegExp";
		if (s.match(/\/[imy]*g[imy]*$/)) {
			return this.replace(pattern, value);
		}
		else {
			s += 'g';
		}
		//def: new RegExp(pattern, flags)
		var r = new RegExp(s.substr(1, s.lastIndexOf("/") - 1), s.substr(s.lastIndexOf("/") + 1, s.length));
		return this.replace(r, value);
	};

	/**
	 * Trim function.
	 * @return String
	 */
	String.prototype.trim = String.prototype.trim || function(c) { return this.trimLeft(c).trimRight(c); }
	/**
	 * Trim Left function.
	 * @return String
	 */
	String.prototype.trimLeft = String.prototype.trimLeft || function(c) { c = c || '\s'; var r = new RegExp('^[' + c + ']+','g'); return this.replace(r, ''); }

	/**
	 * Trim Right function.
	 * @return String
	 */
	String.prototype.trimRight = String.prototype.trimRight || function(c) { c = c || '\s'; var r = new RegExp('[' + c + ']+$','g'); return this.replace(r, ''); }

	/**
	 * Encodes a string to BASE64
	 *
	 * @memberOf String
	 * @param String value
	 * @return String
	 */
	String.prototype.toBase64 = String.prototype.toBase64 || function(){
		var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, enc = "", tmp_arr = [];
		var string = this.valueOf();
		if (!string) {
			return string;
		}
		string += '';
		string = string.toUTF8();
		do { // pack three octets into four hexets
			o1 = string.charCodeAt(i++);
			o2 = string.charCodeAt(i++);
			o3 = string.charCodeAt(i++);
			bits = o1 << 16 | o2 << 8 | o3;
			h1 = bits >> 18 & 0x3f;
			h2 = bits >> 12 & 0x3f;
			h3 = bits >> 6 & 0x3f;
			h4 = bits & 0x3f;
			// use hexets to index into b64, and append result to encoded string
			tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
		}
		while (i < string.length);
		enc = tmp_arr.join('');
		switch (string.length % 3) {
			case 1:
				enc = enc.slice(0, -2) + '==';
				break;
			case 2:
				enc = enc.slice(0, -1) + '=';
				break;
		}
		return enc;
	};

	/**
	 * To CamelCase
	 *
	 * @memberOf Number
	 * @return Number
	 */
	String.prototype.toCamel = String.prototype.toCamel || function() { return this.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');}); };

	/**
	 * From CamelCase to Dashed
	 */
	String.prototype.toDash = String.prototype.toDash || function() { return this.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();}); };

	/**
	 * Converts string to Camel Case from different forms
	 * @return String
	 */
	String.prototype.toCamelCase = String.prototype.toCamelCase || function (from) {
		from = from ? from : '_';
		var r = new RegExp(from + '([a-z])', 'g');
		return this.replace(r, function($1){ return $1.toUpperCase().replace(from, ''); });
	}

	/**
	 * Converts a string to a HTMLElement
	 *
	 * @memberOf String
	 * @param String value
	 * @return HTMLElement
	 */
	String.prototype.toElement = String.prototype.toElement || function(){
		var div = document.createElement('div');
		div.innerHTML = this.valueOf();
		var el = div.firstChild;
		return div.removeChild(el);
	};

	/**
	 * Converts a JSON string to an Object
	 * @return Object
	 */
	String.prototype.fromJSON = String.prototype.fromJSON || function() {
		if (window.JSON && window.JSON.parse && typeof window.JSON.parse === 'function') {
			return window.JSON.parse(this.valueOf());
		}
		var f = new Function("return " + this.valueOf())
		return f();
	}

	/**
	 * Transform to decimal from a certain base.
	 *
	 * @memberOf Number
	 * @param Number value
	 * @return Number
	 */
	String.prototype.toNumberfromBase = String.prototype.toNumberfromBase || function(base){
		/** @TODO Must try & check string before converting */
		return parseInt(this.valueOf(), base);
	};

	/**
	 * Transform to decimal from base 2 number.
	 *
	 * @memberOf Number
	 * @param Number value
	 * @return Number
	 */
	String.prototype.toNumberFromBinary = String.prototype.toNumberFromBinary || function(){
		if (!/^[01]+$/.test(this.valueOf())) {
			throw Error('Cannot convert ' + this.valueOf() + ' from binary to number. Invalid binary value.');
		}
		return parseInt(this.valueOf(), 2);
	};

	/**
	 * Transform to decimal from base 16 number.
	 *
	 * @memberOf Number
	 * @param String value
	 * @return Number
	 */
	String.prototype.toNumberfromHexa = String.prototype.toNumberfromHexa || function(){
		if (!/^[0-9A-F]+$/.test(this.valueOf().toUpperCase())) {
			throw Error('Cannot convert ' + this.valueOf() + ' from hexa to number. Invalid hexa value.');
		}
		return parseInt(this.valueOf(), 16);
	};

	/**
	 * Transform to decimal from base 8 number.
	 *
	 * @memberOf Number
	 * @param String value
	 * @return Number
	 */
	String.prototype.toNumberFromOctal = String.prototype.toNumberFromOctal || function(){
		if (!/^[0-7]+$/.test(this.valueOf())) {
			throw Error('Cannot convert ' + this.valueOf() + ' from octal to number. Invalid octal value.');
		}
		return parseInt(this.valueOf(), 8);
	};

	/**
	 * From CamelCase to Underscore
	 */
	String.prototype.toUnderscore = String.prototype.toUnderscore || function() { return this.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();}); };

	/**
	 * Encodes a string to UTF8
	 *
	 * @memberOf String
	 * @param String value
	 * @return String
	 */
	String.prototype.toUTF8 = String.prototype.toUTF8 || function(){
		var string = this.valueOf();
		string = (string + '').replace(/\r\n/g, "\n").replace(/\r/g, "\n");
		var utftext = "";
		var start = 0, end = 0;
		var stringl = string.length;
		for (var n = 0; n < stringl; n++) {
			var c1 = string.charCodeAt(n);
			var enc = null;

			if (c1 < 128) {
				end++;
			}
			else
			if ((c1 > 127) && (c1 < 2048)) {
				enc = String.fromCharCode((c1 >> 6) | 192) + String.fromCharCode((c1 & 63) | 128);
			}
			else {
				enc = String.fromCharCode((c1 >> 12) | 224) + String.fromCharCode(((c1 >> 6) & 63) | 128) + String.fromCharCode((c1 & 63) | 128);
			}
			if (enc != null) {
				if (end > start) {
					utftext += string.substring(start, end);
				}
				utftext += enc;
				start = end = n + 1;
			}
		}
		if (end > start) {
			utftext += string.substring(start, string.length);
		}
		return utftext;
	};

	/**
	 * Converts an XML string to Object
	 *
	 */
	String.prototype.fromXML = String.prototype.fromXML || function(ns) {
		var tag = null, value = null, i, node;
		if (window.DOMParser) {
			node = (new DOMParser()).parseFromString(this.valueOf(), "text/xml");
		} else  {
			node = new ActiveXObject("Microsoft.XMLDOM");
			node.async = "false";
			node.loadXML(this.valueOf());
		}
		return Object.fromXML(node, ns);
	}

	/**
	 * Converts first char to Upper case
	 * @see http://php.net/manual/en/function.ucfirst.php
	 * @return String
	 */
	String.prototype.ucfirst = String.prototype.ucfirst || function() {
		return (this.length > 1) ?
			this.replace(/^([a-z])/g, function($1){return $1.toUpperCase();}) :
			((this.length == 1) ? this.toUpperCase() : this);
	}

	var ObjectExtend = ObjectExtend || {
		TYPE_BOOLEAN : 'boolean',
		TYPE_NUMBER : 'number',
		TYPE_NULL : 'null',
		TYPE_OBJECT : 'object',
		TYPE_STRING : 'string',
		TYPE_UNDEFINED : 'undefined',

		TYPE_ARRAY_CLASS : '[object Array]',
		TYPE_BOOLEAN_CLASS : '[object Boolean]',
		TYPE_DATE_CLASS : '[object Date]',
		TYPE_FUNCTION_CLASS : '[object Function]',
		TYPE_NUMBER_CLASS : '[object Number]',
		TYPE_OBJECT_CLASS : '[object Object]',
		TYPE_STRING_CLASS : '[object String]',

		TYPE_DOCUMENT_CLASS : '[object Document]',
		TYPE_UNSERIALIZABLE_CLASS : '[object Unserializable]',
		TYPE_HTMLELEMENT_CLASS : '[object HTMLElement]',
		TYPE_ELEMENT_CLASS : '[object Element]',
		TYPE_XHTTPREQUEST_CLASS : '[object XMLHttpRequest]',
		TYPE_XHTTPREQUESTUPLOAD_CLASS : '[object XMLHttpRequestUpload]',

		/**
		 * Obtain a very limited obect type. Will return a string representing the object type
		 * limited to the string name of the object (i.e. boolean, string, number, undefined).
		 *
		 * @param Object object
		 *
		 * @return String
		 */
		getType : function(object) {
			if (typeof object === 'undefined' || object === null) {
				return 'null';
			}
			return typeof object.valueOf();
		},

		/**
		 * Obtain a "limited" object type. Will return a string like [object Type] for all
		 * JSON convertible data types and [object Unserializable] for the rest.
		 *
		 * @param Object object
		 *
		 * @return String
		 */
		getObjectType : function(object) {
			if (typeof object === 'undefined' || object === null) {
				return 'null';
			}
			if (object.nodeType || object.setInterval && typeof object.setInterval === 'function') {
				return Object.TYPE_UNSERIALIZABLE_CLASS;
			}
			// var hasOwn = Object.prototype.hasOwnProperty;
			// try {
			// if (object.constructor &&
			// !hasOwn.call(object, "constructor") &&
			// !hasOwn.call(object.constructor.prototype, "isPrototypeOf")
			// ) {
			// return Object.TYPE_UNSERIALIZABLE_CLASS;
			// }
			// } catch (e) {
			// return Object.TYPE_UNSERIALIZABLE_CLASS;
			// }
			// var key;
			// for ( key in object ) {}
			// if (key === undefined || hasOwn.call( object, key )) {
			return Object.getRealObjectType(object);
			// }
			// return Object.TYPE_UNSERIALIZABLE_CLASS;
		},

		/**
		 * Obtain the real object type. Will always return a string like [object Type], without any limitation.
		 *
		 * @param Object object
		 *
		 * @return String
		 */
		getRealObjectType : function(object) {
			return Object.prototype.toString.apply(object);
		},

		/**
		 * Returns a string shaped like this <ns:tag p>
		 *
		 * @param Object object
		 * @param String ns
		 * @param Object p
		 * @param Boolean c
		 *
		 * @return String
		 */
		xmlTagFromString : function(tag, ns, p, c) {
			return '<' + (c ? '/' : '') + (ns ? (ns + ':') : '') + tag + ((p && p.length) ? (' ' + p.join(' ')) : '') + '>';
		},

		/**
		 * Returns a xml string tag, by checking the object type.
		 * @see Object.xmlTagFromString
		 *
		 * @param Object object
		 * @param String ns
		 * @param Object p
		 * @param Boolean c
		 *
		 * @return String
		 */
		xmlTagFromObject : function(object, ns, p, c) {
			var tag = Object.getObjectType(object).replace(/(\[|object |\])/g, '').toLowerCase();
			return Object.xmlTagFromString(tag, ns, p, c);
		}
	};

	/**
	 * Converts a string of DOM Document to a javascript object
	 *
	 * @param String|Document nodeName
	 * @param String ns
	 *
	 * @return mixed
	 */
	ObjectExtend.fromXML = function(node, ns) {
		if (Object.getRealObjectType(node) === Object.TYPE_STRING ||
			Object.getRealObjectType(node) === Object.TYPE_STRING_CLASS) {
			return node.fromXML(ns);
		}
		if (Object.getRealObjectType(node) === Object.TYPE_DOCUMENT_CLASS) {
			return Object.fromXML(node.documentElement.childNodes[0]);
		}
//		if (node.documentElement && node.documentElement.tagName &&
//				node.documentElement.tagName.toLowerCase() === 'jsobject') {
//			return Object.fromXML(node.documentElement.childNodes[0]);
//		}
		var tag = node.nodeName.replace(ns + ':', '');
		var value = [];
		var val = node.nodeValue ? node.nodeValue : (
			node.childNodes.length ? node.childNodes[0].nodeValue : null
			);
// 		console.log([node, node.nodeName, val, node.childNodes, node.attributes ])
		switch (tag) {
			case 'object':
				value = {};
			case 'array' :
				if (node.childNodes && node.childNodes.length) {
					for (var i = 0; i < node.childNodes.length; i++) {
						if (node.childNodes[i].attributes && node.childNodes[i].attributes.length == 1) {
							value[node.childNodes[i].attributes[0].nodeValue] = Object.fromXML(node.childNodes[i], ns);
						} else {
							value.push(Object.fromXML(node.childNodes.item(i), ns));
						}
					}
				}
				break;
			case 'date' :
				value = new Date(val);
				break;
			case 'string' :
			case 'number' :
			case 'boolean' :
				value = val;
				break;
			case 'null' :
				value = null;
		}
		return value;
	},


	/**
	 * Converts a javascript Object to a XML stringl
	 *
	 * @param Object object
	 * @param String ns XML Namespace
	 * @param Object p Map of parameters for the XMLtag
	 * @param Boolean nss if nss is not null or false, wrap everything with <jobject> tag.
	 *
	 * @return String
	 */
		ObjectExtend.toXML = function(object, ns, p, nss) {
			var a = [], i, f = function (n) {return n < 10 ? '0' + n : n;}, result = null;
			p = (p && p.length) ? p : [];
			switch(Object.getObjectType(object)) {
				case Object.TYPE_DATE_CLASS :
					result = Object.xmlTagFromObject(object, ns, p) + "<![CDATA[" +
						object.getUTCFullYear()   + '-' +
						f(object.getUTCMonth() + 1) + '-' +
						f(object.getUTCDate())      + 'T' +
						f(object.getUTCHours())     + ':' +
						f(object.getUTCMinutes())   + ':' +
						f(object.getUTCSeconds())   + 'Z' +
						"]]>" + Object.xmlTagFromObject(object, ns, p, true);
					break;
				case Object.TYPE_STRING :
				case Object.TYPE_STRING_CLASS :
					result = Object.xmlTagFromObject(object, ns, p) + "<![CDATA[" +
						String(object) + "]]>" +
						Object.xmlTagFromObject(object, ns, p, true);
					break;
				case Object.TYPE_NUMBER :
				case Object.TYPE_NUMBER_CLASS :
				case Object.TYPE_BOOLEAN :
				case Object.TYPE_BOOLEAN_CLASS :
					result = Object.xmlTagFromObject(object, ns, p) +
						String(object) +
						Object.xmlTagFromObject(object, ns, p, true);
					break;
				case Object.TYPE_ARRAY_CLASS :
					for (i = 0; i < object.length; i++) {
						if (typeof object[i] !== 'undefined' && object[i] !== null){
							a.push(Object.toXML(object[i], ns, p, false))
						} else {
							a.push(Object.xmlTagFromString('null', ns, p) + Object.xmlTagFromString('null', ns, p, true));
						}

					}
					result = Object.xmlTagFromObject(object, ns, p) + a.join('') +
						Object.xmlTagFromObject(object, ns, p, true);
					break;
				case Object.TYPE_OBJECT_CLASS :
					for (i in object) {
						if (typeof object[i] === 'function') {
							continue;
						}
						p = ['name="' + i + '"'];
						a.push(
							(object[i] != null) ?
								Object.toXML(object[i], ns, p, false) :
								(Object.xmlTagFromString('null', ns, p) + Object.xmlTagFromString('null', ns, p, true))
						);
						p = [];
					}
					result = Object.xmlTagFromObject(object, ns, p) + a.join('') + Object.xmlTagFromObject(object, ns, p, true);
					break;
				case Object.TYPE_UNSERIALIZABLE_CLASS :
					throw new TypeError('Converting circular structure to XML');
					break;
				default:
					result = null;
			}
			if (nss !== false && nss !== null) {
				return Object.xmlTagFromString('jsobject', nss) + result + Object.xmlTagFromString('jsobject', nss, [], true);
			}
			return result;
		}

	Object = Object.extend(Object, ObjectExtend);

})(jQuery);
