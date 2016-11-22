

// Load plugins
var gulp = require('gulp'),
    runSeq = require('run-sequence'),
    path = require('path'),
    express = require('express'),
    livereload = require('connect-livereload')(),
    tinylr  = require('tiny-lr')(),
    buildify = require('buildify'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    browserify = require('browserify'),
    ngAnnotate = require('browserify-ngannotate'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    ngHtml2Js = require('gulp-ng-html2js'),
    htmlmin = require('gulp-htmlmin'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    del = require('del');

process.env.DEBUG = process.env.DEBUG || 'tinylr*';

// Styles
gulp.task('styles', function() {
  return gulp.src('app/sass/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'))
    .on('end', function() {
      console.log('Styles task complete.');
    })
    .on('error', function(err) {
      console.log(err);
    });
});

// Fonts
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
    .on('end', function() {
      console.log('Fonts task complete.');
    })
    .on('error', function(err) {
      console.log(err);
    });
});

// Images
gulp.task('images', function() {
  return gulp.src('app/images/**'+'/'+'*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/images'))
    .on('end', function() {
      console.log('Images task complete.');
    })
    .on('error', function(err) {
      console.log(err);
    });
});

// Build Templates
gulp.task('build-templates', function() {
  return gulp.src("./app/js/myApp/**/*.html")
    .pipe(ngHtml2Js({
      moduleName: "htmlPartials",
      prefix: "/partials/"
    }))
    .pipe(concat("partials.js"))
    .pipe(gulp.dest("./.templateCache"))
    .on('end', function() {
      console.log('Build Templates task complete.');
    })
    .on('error', function(err) {
      console.log(err);
    });
});

// Vendor Scripts
gulp.task('vendor-js', function() {
  return gulp.src([
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/tether/dist/js/tether.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js'
  ])
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/js/'))
    .on('end', function() {
      console.log('Vendor Scripts task complete.');
    })
    .on('error', function(err) {
      console.log(err);
    });
});

// Build AngularJS
gulp.task('build-js', function () {
  var b = browserify({
    entries: './app/js/app.js',
    debug: true,
    transform: [ngAnnotate]
  });
  
  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/js'))
    .on('end', function() {
      console.log('Build AngularJS task complete.');
    })
    .on('error', function(err) {
      console.log(err);
    });
});

// HTML
gulp.task('html', function() {
  return gulp.src('app/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
    .on('end', function() {
      console.log('HTML task complete.');
    })
    .on('error', function(err) {
      console.log(err);
    });
});

// Clean
gulp.task('clean', function() {
    return (function() {
      del.sync(['dist/*', '.templateCache']);
      console.log('Clean task complete.');
    })();
});

// Generate
gulp.task('generate', ['styles', 'fonts', 'images', 'html'], function(callback) {
  runSeq('vendor-js', 'build-js', function() {
    console.log('Generate task complete');
    callback();
  });
});

// Express
gulp.task('express', function() {
    tinylr.listen(35729);
    var app = express();
    app
      .use(livereload)
      .use(express.static(__dirname + '/dist'))
      .use(function(req, res) {
        res.status(404);
        if (req.accepts('html')) {
          res.redirect('/');
          //res.render('404', {title: '404: File Not Found'});
          return;
        }
        res.type('txt').send('404: File Not Found');
      })
      .listen(3000,function() {
        console.log("Express is running on port 3000");
      });
});

// Watch
gulp.task('watch', function() {
    gulp.watch('app/**/*')
      .on('change', stackRebuild);
      var buildtimer = null;
      function stackRebuild() {
        if (buildtimer) clearTimeout(buildtimer);
        if (!gulp.isRunning) {
          buildtimer = setTimeout(function() {
            console.log('build triggered');
            runSeq('build-templates', 'generate');
          }, 1000);
        }
      }
    gulp.watch('dist/**/*')
      .on('change', stackReload);
      var reloadtimer = null;
      function stackReload() {
        if (reloadtimer) clearTimeout(reloadtimer);
        if (!gulp.isRunning) {
          reloadtimer = setTimeout(function() {
            console.log('reload triggered');
            tinylr.changed({
              body: {
                files: ['/']
              }
            });
          }, 1000);
        }
      }
});

// Default task
gulp.task('default', function(callback) {
    runSeq('clean', 'build-templates', 'generate', function() {
      console.log('default mode');
      callback();
    });
});

// Dev mode
gulp.task('dev', function(callback) {
    runSeq('clean', 'build-templates', 'generate', 'express', 'watch', function() {
      console.log('dev mode');
      callback();
    });
});


