/*global module, require*/
'use strict';

const path = require('path');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const tap = require('gulp-tap');

/**
 * Encapsulates the logic for the assignment of 
 * the the 'js' property on the object shared
 * by the sub-tasks for a given web-component 
 * directory.
 */
module.exports = function(dir, sharedMemory, options) {
	return this.src(path.join(dir, options.dir.javascripts, '*.js'))
		.pipe(concat('unused'))
		.pipe(uglify())
		.pipe(tap(file => sharedMemory.js = file.contents.toString()));
}