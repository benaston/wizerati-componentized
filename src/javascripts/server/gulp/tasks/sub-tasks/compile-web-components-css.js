/*global module, require*/
'use strict';

const path = require('path');
const less = require('gulp-less');
const minifyCss = require('gulp-minify-css');
const urlEmbed = require('gulp-css-base64');
const tap = require('gulp-tap');

/**
 * Encapsulates the logic for the assignment of 
 * the the 'js' property on the object shared
 * by the sub-tasks for a given web-component 
 * directory.
 */
module.exports = function(dir, sharedMemory, options) {
	return this.src(path.join(dir, options.dir.stylesheets, 'index.less'))
		.pipe(less())
		.pipe(urlEmbed({
			baseDir: dir,
			maxWeightResource: 40000,
		}))
		.pipe(minifyCss())
		.pipe(tap(file => sharedMemory.css = file.contents.toString()));
};