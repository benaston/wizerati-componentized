/* globals require, __dirname */
'use strict';

const path = require('path');
const packageJson = require('../../../../package.json');

/**
 * First the options object containing 
 * globally useful information is 
 * intantiated...
 */
const options = {
	packageName: packageJson.name,
	basePath: path.dirname(module.parent.filename), // basePath taken to be location of gulpfile.
	dir: {
		src: 'src',
		javascripts: 'javascripts',
		stylesheets: 'stylesheets',
		templates: 'templates',
		webComponents: 'web-components',
		dist: 'dist',
		server: 'server',
	},
	dirRel: {
		dist: 'dist',
		src: 'src',
		fonts: 'src/fonts',
		images: 'src/images',
		webComponents: 'src/web-components',
		tests: 'src/javascripts/tests',
		gulpTasks: 'src/javascripts/server/gulp/tasks',
	},
	dirAbs: {},
	glob: {},
	fileName: {
		mainLess: 'main.less',
		indexTemplate: 'index.template.html',
		webComponentExample: 'example.html',
		jsHintRC: '.jshintrc',
	},
	fileAbs: {},
};

options.dirRel.javascripts = path.join(options.dir.src, options.dir.javascripts);
options.dirRel.stylesheets = path.join(options.dir.src, options.dir.stylesheets);
options.dirRel.templates = path.join(options.dir.src, options.dir.templates);

options.dirAbs.src = path.join(options.basePath, options.dirRel.src);
options.dirAbs.dist = path.join(options.basePath, options.dirRel.dist);
options.dirAbs.stylesheets = path.join(options.basePath, options.dirRel.stylesheets);
options.dirAbs.templates = path.join(options.basePath, options.dirRel.templates);
options.dirAbs.webComponents = path.join(options.basePath, options.dirRel.webComponents);
options.dirAbs.gulpTasks = path.join(options.basePath, options.dirRel.gulpTasks);

options.glob.less = path.join(options.basePath, options.dirRel.stylesheets, '**', '*.less');
options.glob.js = path.join(options.basePath, options.dirRel.javascripts, '**', '*.js');
options.glob.gulpFiles = path.join(options.basePath, options.dirRel.gulpTasks, '**');
options.glob.testFiles = path.join(options.basePath, options.dirRel.tests, '**');
options.glob.serverFiles = path.join(options.basePath, options.dirRel.javascripts, options.dir.server, '**');

options.fileAbs.mainLess = path.join(options.dirAbs.stylesheets, 'application', options.fileName.mainLess);
options.fileAbs.jsHintRC = path.join(options.basePath, options.fileName.jsHintRC);

module.exports = options;