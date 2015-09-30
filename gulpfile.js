/* globals require */
'use strict';

const gulp = require('gulp');
const requireDir = require('require-dir');
const partial = require('partial-application').partial;
const options = require('./src/javascripts/server/gulp/config');

const tasks = requireDir(options.dirAbs.gulpTasks, { recurse: false });
const sharedMemory = { css: null, js: null, webComponents: {} };

/**
 * 1. Supply the options object to each 
 * of the gulp tasks individually
 * via closure (the tasks are not 
 * registered with gulp yet)...
 */
var configuredTasks = Object.keys(tasks)
	.map(k => tasks[k](options))
	.reduce((p, c) => (p[c.name] = c.task, p), {});

/**
 * 2. registered the configured tasks
 * with gulp, with their dependencies being 
 * defined too. In this way the definition of 
 * the tasks remains separate from their 
 * registration with gulp.
 */
gulp.task('jsHint', partial(configuredTasks.jsHint, sharedMemory));
gulp.task('css', partial(configuredTasks.css, sharedMemory));
gulp.task('js', partial(configuredTasks.js, sharedMemory));
gulp.task('compileWebComponents', ['css', 'js'], partial(configuredTasks.compileWebComponents, sharedMemory));
gulp.task('replace', [/*'jsHint',*/ 'css', 'js', 'compileWebComponents'], partial(configuredTasks.replace, sharedMemory));
gulp.task('build', ['replace']);
gulp.task('default', ['build']);