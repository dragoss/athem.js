/**
 *
 */

//if (typeof jQuery === 'undefined') {
//	throw Error('Could not find jQuery library. Please include jQuery to project.');
//}
//if (typeof $ === 'undefined') {
//	throw Error('Could not find Prototype Js library. Please include Prototype Js to project.');
//}

//(function(j){

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
	window.org.athem.Klass = Class.create({
		/**
		 * Constructor.
		 *
		 * @var Object o
		 */
		initialize: function(o) {
			this.options = this.options || {};
			this.options = this._parseOptions(o, this.options);
		},

		/**
		 * Function for parsing options & merging them with the class instance.
		 *
		 * @var Object o
		 * @var Object ob
		 */
		_parseOptions: function(o, op) {
			if (!op) {
				op = {};
			}
			for (var i in o) {
				if (typeof o[i] !== 'object' || Object.isArray(o[i])) {
					if (typeof o[i] === 'string') {
						try {
							o[i] = (new Function('return ' + o[i]))();
						} catch (e) {}
					}
					op[i] = o[i];
				} else {
					op[i] = this._parseOptions(o[i], op[i]);
				}
			}
			return op;
		}
	});

//})(jQuery);



//org.athem.Loader = Class.create(org.athem.Klass, {
//
//	/** Scripts that are in loading stage */
//	loading : {},
//	/** Scripts that are loaded already */
//	loaded : {},
//
//	/** Call methods for loader */
//	methods : {
//		AJAX : 'ajax',
//		SCRIPT : 'script'
//	},
//
//	/**
//	 * Constructor
//	 *
//	 * @param Object $super Super class
//	 * @param Object o Instance options
//	 */
//	initialize: function($super, o) {
//		/* init options */
//		this.options = {
//			// klass : [], // namespaces
//			jsPath : '', // namespaces path
//			// files : [], // file to load
//			wait : 10,
//			timeout : 5000,
//			onSuccess : function() {},
//			onFailure : function() {},
//			onTimeout : function() {},
//			method : 'ajax',
//			loadAsync : false // load all the files at once
//		};
//		/* parent init */
//		$super(o);
//		/* scripts to load in this instance */
//		this.load = [];
//		var a = [], j;
//		for (var i = 2; i < arguments.length; i++) {
//			a.push(arguments[i]);
//			j = i - 2;
//			if (!this._isKlassPackage(a[j])) {
//				this.load.push(a[j]);
//			} else {
//				if (a.length == 1) {
//					a[j] = [a[j], null];
//				}
//				this.load.push(this._getKlassPath(a[j][0], a[j][1]));
//			}
//		}
//	},
//
//
//
//	/**
//	 * Load js files for a specific class namespace
//	 */
//	run : function() {
//		if (this.options.method == this.methods.AJAX) {
//			if (this.options.loadAsync) {
//				this._loadWithAjaxAsync();
//			} else {
//				this._loadWithAjax();
//			}
//		} else {
//			// console.log(this)
//			if (this.options.loadAsync) {
//				this._loadWithScriptAsync();
//			} else {
//				this._loadWithScript();
//			}
//		}
//	},
//
//	/**
//	 * Tests if an object is a klass package
//	 * @param String|Array object
//	 * @return Boolean true if is klass
//	 */
//	_isKlassPackage : function(object) {
//		var type = Object.prototype.toString.apply(object);
//		return (type !== '[object String]' && type !== 'string');
//	},
//
//	/**
//	 * Checks if a script is still in loading status.
//	 * @param String object
//	 * @return Boolean/Object/XMLHttpObject
//	 */
//	_loading : function(object) {
//		if (!Object.isString(object)) {
//			throw Error('Not a string index.');
//		}
//		return Jajax_Loader.status.loading[object];
//	},
//
//	/**
//	 * Checks if a script/set of scripts is/are loaded
//	 * @param String|Array object
//	 * @return Boolean
//	 */
//	_loaded : function(object) {
//		if (Object.isString(object)) {
//			return Jajax_Loader.status.loaded[object];
//		} else {
//			for (var i = 0; i < object.length; i++) {
//				if (!Jajax_Loader.status.loaded[object[i]]) {
//					return false;
//				}
//			}
//		}
//		return true;
//	},
//
//	/**
//	 * Used for sync loading (using AJAX) to finish
//	 * than executes the onSuccess option event.
//	 */
//	_waitAjax : function() {
//		window.setTimeout((function(api){return function(){
//			if (!api._loaded(api.load)) {
//				api._loadWithAjax();
//				return;
//			}
//			api.options.onSuccess(api);
//		}})(this), this.options.wait, this);
//		return this;
//	},
//
//	/**
//	 * Used for async loading (using AJAX) to finish
//	 * than executes the onSuccess option event.
//	 */
//	_waitAjaxAsync : function() {
//		window.setTimeout((function(api){return function(){
//			if (!api._loaded(api.load)) {
//				api._waitAjax();
//				return;
//			}
//			for (var i = 0; i < api.load.length; i++) {
//				(new Function(Jajax_Loader.status.loading[i]))();
//				Jajax_Loader.status.loading[i] = null;
//			}
//			api.options.onSuccess(api);
//		}})(this), this.options.wait, this);
//		return this;
//	},
//
//	/**
//	 * Used for sync loading (using <script> HTML Tag) to finish
//	 * than executes the onSuccess option event.
//	 */
//	_waitScript : function() {
//		window.setTimeout((function(api){return function(){
//			if (!api._loaded(api.load)) {
//				api._loadWithScript();
//				return;
//			}
//			api.options.onSuccess(api);
//		}})(this), this.options.wait, this);
//		return this;
//	},
//
//	/**
//	 * Used for async loading (using <script> HTML Tag) to finish
//	 * than executes the onSuccess option event.
//	 */
//	_waitScriptAsync : function() {
//		window.setTimeout((function(api){return function(){
//			if (!api._loaded(api.load)) {
//				api._waitScript();
//				return;
//			}
//			for (var i = 0; i < api.load.length; i++) {
//				(new Function(Jajax_Loader.status.loading[i]))();
//				Jajax_Loader.status.loading[i] = null;
//			}
//			api.options.onSuccess(api);
//		}})(this), this.options.wait, this);
//		return this;
//	},
//
//	/**
//	 * Sets up a timeout for async loading. Uses onTimeout
//	 * optional event.
//	 */
//	_timeout : function() {
//		window.setTimeout((function(api){ return function(){
//			if (api._loaded(api.load)) {
//				return;
//			}
//			for (var i = 0; i < api.load.length; i++) {
//				if (!api._loaded[api.load[i]] && api._loading[api.load[i]]) {
//					if (!Object.isString(Jajax_Loader.status.loading[api.load[i]]) &&
//						Jajax_Loader.method == Jajax_Loader.method.AJAX) {
//						Jajax_Loader.status.loading[api.load[i]].stop();
//					}
//					Jajax_Loader.status.loading[api.load[i]] = null;
//				}
//			}
//			api.options.onTimeout(api);
//		}})(this), this.options.timeout, this);
//		return this;
//	},
//
//	/**
//	 * Sets up a timeout for async loading. Uses onTimeout
//	 * optional event.
//	 */
//	_timeoutAsync : function() {
//		this._timeout();
//		// window.setTimeout((function(api){ return function(){
//		// if (api._loaded(api.load)) {
//		// return;
//		// }
//		// for (var i = 0; i < api.load.length; i++) {
//		// if (!api._loaded(api.load[i]) && api._loading(api.load[i])) {
//		// if (!Object.isString(Jajax_Loader.status.loading[api.load[i]]) &&
//		// Jajax_Loader.method == Jajax_Loader.method.AJAX) {
//		// Jajax_Loader.status.loading[api.load[i]].stop();
//		// }
//		// Jajax_Loader.status.loading[api.load[i]] = null;
//		// }
//		// }
//		// api.options.onTimeout(api);
//		// }})(this), this.options.timeout, this);
//		// return this;
//	},
//
//	/**
//	 * Setup a syncronous loading of all the scripts
//	 * by using AJAX technology.
//	 */
//	_loadWithAjax : function() {
//		var step = 0;
//		for (var i = 0; i < this.load.length; i++) {
//			// if it is in loading stage (from another loader instance)
//			// just jumt to wait
//			if (this._loading(this.load[i])) {
//				break;
//			}
//			// if it is loaded, go to the next script
//			if (this._loaded(this.load[i])) {
//				continue;
//			}
//			// console.log("Ajax Loading " + this.load[i]);
//			Jajax_Loader.status.loading[this.load[i]] = new Ajax.Request(this.load[i], {
//				onComplete : (function(api, j){return function(data){
//					(new Function(data.responseText))();
//					Jajax_Loader.status.loaded[api.load[j]] = true;
//					Jajax_Loader.status.loading[api.load[j]] = null;
//					// console.log("Loaded " + api.load[j]);
//				};})(this, i),
//				onFailure : (function(api){return function(data){ api.options.onFailure(data); };})(this)
//			});
//			break;
//		}
//		this._waitAjax(step)._timeout();
//	},
//
//	/**
//	 * Setup a asyncronous loading of all the scripts
//	 * by using AJAX technology.
//	 *
//	 * Pretty safe for any type of script loading since
//	 * all the scripts are executed after all are loaded
//	 * in the order found in the load queue.
//	 */
//	_loadWithAjaxAsync : function() {
//		var step = 0;
//		for (var i = 0; i < this.load.length; i++) {
//			if (this._loaded(this.load[i]) || this._loading(this.load[i])) {
//				continue;
//			}
//			// console.log("Async Ajax Loading " + this.load[i]);
//			Jajax_Loader.status.loading[this.load[i]] = new Ajax.Request(this.load[i], {
//				onComplete : (function(api, j){return function(data){
//					Jajax_Loader.status.loaded[api.load[j]] = true;
//					Jajax_Loader.status.loading[api.load[j]] = data.resonseText;
//					// console.log("Loaded " + api.load[j]);
//				};})(this, i),
//				onFailure : (function(api){return function(data){ api.options.onFailure(data); };})(this)
//			});
//		}
//		this._waitAjaxAsync(step)._timeoutAsync();
//	},
//
//	/**
//	 * Setup a syncronous loading of all the scripts
//	 * by using <script> HTML tag.
//	 *
//	 * Each script will be loaded when the script before
//	 * him (in a queue) finised loading.
//	 */
//	_loadWithScript : function() {
//		var step = 0;
//		// console.log(this.load)
//		for (var i = 0; i < this.load.length; i++) {
//			if (this._loading(this.load[i])) {
//				break;
//			}
//			if (this._loaded(this.load[i])) {
//				continue;
//			}
//			// console.log("Script Loading " + this.load[i]);
//			Jajax_Loader.status.loading[this.load[i]] = document.createElement('script');
//			Jajax_Loader.status.loading[this.load[i]].src = this.load[i];
//			Jajax_Loader.status.loading[this.load[i]].onload = (function(api, j){return function(){
//				Jajax_Loader.status.loaded[api.load[j]] = true;
//				Jajax_Loader.status.loading[api.load[j]] = null;
//				// console.log("Loaded " + api.load[j]);
//				// console.log(api.options.method);
//			};})(this, i);
//			document.getElementsByTagName('head')[0].appendChild(Jajax_Loader.status.loading[this.load[i]]);
//			break;
//		}
//		this._waitScript(step)._timeout();
//	},
//
//	/**
//	 * Setup the asyncronous loading of all the scripts
//	 * by using <script> HTML tag.
//	 *
//	 * NOT recomended when using Jajax or other scripts which
//	 * have dependencies. Better use syncronous loading.
//	 */
//	_loadWithScriptAsync : function() {
//		var step = 0;
//		for (var i = 0; i < this.load.length; i++) {
//			if (this._loaded(this.load[i]) || this._loading(this.load[i])) {
//				continue;
//			}
//			// console.log("Async Script Loading " + this.load[i]);
//			Jajax_Loader.status.loading[this.load[i]] = document.createElement('script');
//			Jajax_Loader.status.loading[this.load[i]].src = this.load[i];
//			Jajax_Loader.status.loading[this.load[i]].onload = (function(api, j){return function(){
//				Jajax_Loader.status.loaded[api.load[j]] = true;
//				Jajax_Loader.status.loading[api.load[j]] = null;
//				// console.log("Loaded " + api.load[j]);
//			};})(this, i);
//			document.getElementsByTagName('head')[0].appendChild(Jajax_Loader.status.loading[this.load[i]]);
//		}
//		this._waitScriptAsync(step)._timeoutAsync();
//	},
//
//	/**
//	 * Returns the namespace of a klass
//	 * @param String object
//	 * @param String namespace (default null)
//	 * @return String
//	 */
//	_getKlassNamespace: function(object, namespace) {
//		object = (new String(object)).replace(/_/g, '/').toLowerCase();
//		if (object.indexOf('jajax') == 0) {
//			return object;
//		}
//		namespace = namespace ? namespace : 'jajax';
//		return namespace + '/' + object;
//	},
////
//	/**
//	 * Returns a klass javascript file path.
//	 * @param String object
//	 * @param String namespace (default null)
//	 * @return String
//	 */
//	_getKlassPath: function(object, namespace) {
//		return (this.options.jsPath ? this.options.jsPath.replace(/\/$/, '') + '/' : '') + this._getKlassNamespace(object, namespace) + '.js';
//	}
//
//});
//
//Jajax_Loader.methods = {
//	AJAX : 'ajax',
//	SCRIPT : 'script'
//};
//
//Jajax_Loader.status = {
//	/** Scripts that are in loading stage */
//	loading : {},
//	/** Scripts that are loaded already */
//	loaded : {}
//};
//
///**
// *
// */
//Jajax_Loader.loadKlass = function(object, namespace) {
//	if (namespace && namespace.indexOf('jajax/xhrpc') === 0 && object.indexOf('jajax/xhrpc') === 0) {
//		namespace = null;
//	}
//	if (namespace) {
//		object = namespace.replace(/\/$/, '') + '/' + object;
//	}
//	object = object
//		.replace(/\/[a-z]/g, function($1){ return '_' + $1.substr(1).toUpperCase() })
//		.replace(/^([a-z])/, function($1){ return $1.toUpperCase() });
//	var f = new Function('return ' + object + ';');
//	return f();
//}
//
///**
// *
// */
//Jajax_Loader.loadKlassInstance = function(object, namespace, options) {
//	if (namespace) {
//		object = namespace.replace(/\/$/, '') + '/' + object;
//	}
//	object = object
//		.replace(/\/[a-z]/g, function($1){ return '_' + $1.substr(1).toUpperCase() })
//		.replace(/^([a-z])/, function($1){ return $1.toUpperCase() });
//	var f = new Function('o', 'if (o) { return new ' + object + '(o) } return new ' + object + '()');
//	return f(o);
//}