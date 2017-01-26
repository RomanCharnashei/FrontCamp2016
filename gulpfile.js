var gulp = require('gulp'),
    gutil = require('gulp-util'),
    nodemon = require('gulp-nodemon'),
    browserSync = require('browser-sync').create(),
    env = require('gulp-env'),
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    watchify = require('watchify'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['build:js', 'browser-sync']);


gulp.task('build:js', function(){     
    var watchedBrowserify = watchify(browserify({
        basedir: './client_src',
        debug: true,
        entries: ['app.js']
    }));

    watchedBrowserify.on("update", bundle);
    watchedBrowserify.on("log", gutil.log);

    function bundle(){
        return watchedBrowserify            
            .bundle()            
            .pipe(source('bundle.js'))                     
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(ngAnnotate())            
            .pipe(uglify())            
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest('./public'));
    };

    return bundle();
});


gulp.task('browser-sync', ['nodemon'], function(cb) {
	browserSync.init(null, {
		proxy: "http://localhost:3000",
        files: ["public/**/*.*", "views/**/*.*"],
        port: 8181,
	}, function() {
        if (cb) {
            cb();
        }
    });
});

gulp.task('nodemon', function (cb) {
    var started = false;
    env({ file: '.env.json'});
    return nodemon({
        script: './bin/www',
        watch: ['./bin/www', 'app.js', './routes', './middlewares', './models'],
        debug: true,
        env: { 'NODE_ENV': 'dev' }
    }).on('start', function(ev) {
        if (!started) {
            cb();
            started = true;
        }
    }).on('restart', function(ev) {
        setTimeout(function() {
            browserSync.notify('reload now ...');
            browserSync.reload({ stream: false });
        }, 1000);
    });
});
