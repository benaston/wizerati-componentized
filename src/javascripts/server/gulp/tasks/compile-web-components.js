/* globals module, require */
'use strict';

const merge = require('merge-stream');
const streamqueue = require('streamqueue');
const getDirectories = require('../../utils/get-directories');
const jsTask = require('./sub-tasks/compile-web-components-js');
const cssTask = require('./sub-tasks/compile-web-components-css');
const htmlTask = require('./sub-tasks/compile-web-components-html');

module.exports = function(options) {

	/**
	 * Responsible for enumerating all the web 
	 * components, processing their less and js 
	 * and then inlining into a template, ready 
	 * to be imported into the main index.html 
	 * of the application.
	 */
	return {
		name: 'compileWebComponents',
		task: function(sharedMemory) {

			var tasks = getDirectories(options.dirAbs.webComponents)
			.map(function(dir) {
				// Used as a holding location for 
				// the JavaScript and CSS generated
				// by each sub task. Using a bare 
				// non-object variable will not 
				// work due to pass-by-value 
				// semantics of non-objects.
				var temp = {
					js: null,
					css: null
				};

				// `streamqueue` will run the streams to completion in order.
				// `merge` was attempted for js and css, but I couldn't get 
				// it to work due to incompatible stream types.
				return streamqueue(
					jsTask.call(this, dir, temp, options), 
					cssTask.call(this, dir, temp, options), 
					htmlTask.call(this, dir, temp, sharedMemory, options));
			}.bind(this));

			return merge(tasks);
		},
	};

};