'use strict';

const gulp    = require('gulp');
const sass    = require('./build/sass');        // your sass task module
const scripts = require('./build/scripts');     // your scripts task module
const images  = require('./build/images');      // your images task module
const sync    = require('./build/browsersync'); // your browsersync & jekyll tasks module

// Register tasks by calling each module with gulp
[sass, scripts, images, sync].forEach(task => {
  task(gulp);
});

// Define 'build' task that runs sass, scripts, images, and jekyll-build in parallel
gulp.task('build', gulp.series(
  gulp.parallel('sass', 'scripts', 'images', 'jekyll-build')
));
