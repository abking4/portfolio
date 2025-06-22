const browserSync  = require('browser-sync').create();
const cp           = require('child_process');
const gulp         = require('gulp');

const jekyll       = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

const scssPath     = '_scss/**/*.scss';
const jsPath       = '_scripts/*.js';
const templatePath = ['*.html', '+(_includes|_layouts)/*.html', '*.yml', '_data/*.yml', '_posts/*'];

// Run `jekyll build`
function jekyllBuild(done) {
  return cp.spawn(jekyll, ['build'], {stdio: 'inherit'})
    .on('close', done);
}

// Run `jekyll build` with _config_dev.yml
function jekyllDev(done) {
  return cp.spawn(jekyll, ['build', '--config', '_config.yml,_config_dev.yml'], {stdio: 'inherit'})
    .on('close', done);
}

// Rebuild Jekyll then reload the page
const jekyllRebuild = gulp.series(jekyllDev, done => {
  browserSync.reload();
  done();
});

// Serve with browserSync and watch for changes
function serve() {
  browserSync.init({
    server: {
      baseDir: '_site'
    }
  });

  gulp.watch(scssPath, gulp.series('sass', done => { browserSync.reload(); done(); }));
  gulp.watch(jsPath, gulp.series('scripts', done => { browserSync.reload(); done(); }));
  gulp.watch(templatePath, jekyllRebuild);
}

// Export tasks so they can be used in gulpfile.js
module.exports = gulp => {
  gulp.task('jekyll-build', jekyllBuild);
  gulp.task('jekyll-dev', jekyllDev);
  gulp.task('jekyll-rebuild', jekyllRebuild);
  gulp.task('serve', gulp.series('jekyll-dev', serve));
};
