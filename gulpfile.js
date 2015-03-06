var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var es = require('event-stream');
var _ = require('lodash');


// static dependencies for Angular2
var angularDeps = [
    'node_modules/systemjs/node_modules/es6-module-loader/node_modules/traceur/bin/traceur.js',
    'node_modules/systemjs/node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.js',
    'node_modules/systemjs/dist/system.js',
    'node_modules/zone.js/zone.js',
    'node_modules/zone.js/long-stack-trace-zone.js',
    './traceurOptions.js'
];

var vendorScripts = [
    { 'jquery': [ 'node_modules/jquery/dist/jquery.js' ] },
    { 'lodash': [ 'node_modules/lodash/index.js' ] }
];

// Angular2 AtScript to ES5
gulp.task('build:ng2', $.shell.task(['sh ng2build.sh']));

// strip off the sourceMaps.
gulp.task('build:strip_maps', $.shell.task(["sh strip_maps.sh"]));

// Concat all static dependencies for Angular2
gulp.task('build:shim', function() {
  return gulp.src(angularDeps)
    .pipe($.concat('es6-shim.js'))
    .pipe(gulp.dest('./app/libs'));
});

gulp.task('scripts:vendor', function () {

    var streams = _.map(vendorScripts, function(vendor) {
    var name = _.keys(vendor);
    var scripts = vendor[name];
    var target = 'app/libs'

    return gulp.src(scripts)
        .pipe($.concat(name + '.js'))
        .pipe(gulp.dest(target));
    });

    return es.merge.apply(null, streams);
});

// Compile Any Other Sass Files You Added (app/styles)
gulp.task('styles:scss', function () {
  return gulp.src(['app/styles/*.scss'])
    .pipe($.rubySass({
      style: 'expanded',
      precision: 10,
      loadPath: ['app/styles', 'node_modules/bootstrap-sass/assets/stylesheets'],
      sourcemap: false
    }))
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('app/styles'))
    .pipe($.size({title: 'styles:scss'}));
});

// Clean Output Directory
gulp.task('clean', function (cb) {
    return gulp.src(['app/libs/*', 'app/styles/*.css'])
      .pipe($.clean());
});

gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: ['app']
    },
    notify: false
  });

  gulp.watch(['app/styles/**/*.scss'], ['styles:scss']);
});

// Synchronous build
//  1. clean
//  2. ng2build
//  3. concat es6 shim file
gulp.task('default', function(cb) {
  runSequence('clean',
      'build:ng2',
      'build:shim',
      'build:strip_maps',
      'scripts:vendor',
      'styles:scss',
      cb);
});
