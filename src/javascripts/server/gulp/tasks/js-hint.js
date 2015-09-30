/* globals module, require */
'use strict';

const jsHint = require('gulp-jshint');

module.exports = function(options) {

	return {
		name: 'jsHint',
		task: function() {
			return this.src(options.glob.js)
				.pipe(jsHint(options.fileAbs.jsHintRC))
				.pipe(jsHint.reporter('default'))
				.pipe(jsHint.reporter('fail')); // Stops the pipeline if errors.
		},
	};

};