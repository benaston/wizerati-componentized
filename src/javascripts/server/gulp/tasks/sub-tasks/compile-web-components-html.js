/*global module, require*/
'use strict';

const path = require('path');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const toBase64 = require('../../../utils/to-base-64');
const tap = require('gulp-tap');

/**
 * Encapsulates the logic for the assignment of 
 * the the 'js' property on the object shared
 * by the sub-tasks for a given web-component 
 * directory.
 */
module.exports = function(dir, sharedMemory, gulpSharedMemory, options) {
	return this.src(path.join(dir, options.dir.templates, options.fileName.indexTemplate))
		.pipe(replace('{{css}}', () => sharedMemory.css))
		.pipe(replace('{{javascript}}', () => sharedMemory.js))
		.pipe(rename('index.html'))
		.pipe(this.dest(path.join(dir, options.dir.dist)))
		.pipe(tap(function(file) {
			gulpSharedMemory.webComponents[dir.substr(dir.lastIndexOf('/'))] =
				toBase64(file.contents.toString());
		}));
};