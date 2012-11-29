/**
 *
 */
(function(j){

	window.org = window.org || {};
	window.org.athem = window.org.athem || {};
	window.org.athem.html = window.org.athem.html || {};

	window.org.athem.html.Element = Class.create(window.org.athem.Object, {

		_input : ['text', 'radio', 'checkbox', 'hidden'],

		/**
		 * Constructor.
		 * @var Object o
		 */
		initialize: function($super, o) {
			$super.init(o);
			this.$e = this._render(this.options);
		},

		_preCreateElement : function(o) {},
		_postCreateElement : function(o) {},

		/**

{
	type : 'p',
	html : 'html text'
}
<p>html text</p>

{
	type : 'p',
	'class' : 'myClass'
	html : 'html text'
}
<p class="myClass">html text</p>

{
	type : 'text',
	name : 'myInputName',
	placeholder : 'Input Placeholder'
}
<input type="text" name="myInputName" placeholder="Input Placeholder">

{
	type : 'div',
	'class' : 'divClass',
	html : {
		type : 'p',
		html : 'text html'
	}
}
<div class="divClass"><p>text html</p></div>

		 * @param o
		 * @private
		 */
		_render: function(o) {
			var $elem = null, html = null, call = '_render';
			if (!o.type) {
				throw Error(''); // @TODO Add translated error
			}
			/* initialize object as jQuery object */
			call += o.type.replace(/^([a-z])/i, function($1){ return $1.toUpperCase(); });
			$elem = (this._input.indexOf(o.type) > -1) ? this._renderInput(o) :
				this[call] ? this[call](o) : this._renderElement(o);

			/* keep and destroy html element */
			if (o.html) {
				html = o.html;
				delete o['html'];
			}
			for (i in o) {
				$elem.attr(i, o[i]);
			}
			if (html) {
				$elem.append((Object.getType(html) === 'string') ? html : this._render(html));
			}
			return $elem;
		},

		_renderInput : function(o) {
			return j('<input type="' + o.type + '">');
		},

		_renderElement : function(o) {
			return j(document.createElement(o.type));
		},

		/**
		 *
		 * @return HTMLElement
		 */
		getAsHTMLElement : function() {
			return this.$e.get(0);
		},

		/**
		 *
		 * @return Object
		 */
		getAsJQuery : function() {
			return this.$e;
		},

		/**
		 *
		 * @return String
		 */
		getAsString : function() {
			return this.toString();
		},

		/**
		 *
		 * @return String
		 */
		toString : function() {
			var $e = $('<div></div>');
			$e.append(this.$e);
			return $e.html();
		}

	})


})(jQuery);