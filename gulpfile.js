var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    browserSync = require('browser-sync').create(),
    env = require('gulp-env'),
    gutil = require('gulp-util'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream');

gulp.task('default', ['watch:react', 'browser-sync']);

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

gulp.task('build:react', function(){
    return browserify({
            entries: './client_src/react/index.jsx',
            extensions: ['.jsx'],
            debug: true
        })
        .transform('babelify', {
            presets: ['es2015', 'react'],
            plugins: ['transform-class-properties']
        })
        .bundle()
        .on('error', function(err){
            gutil.log(gutil.colors.red.bold('[browserify error]'));
            gutil.log(err.message);
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./public/app'));
});

gulp.task('watch:react', ['build:react'], function() {
    gulp.watch('./client_src/react/**/*.jsx', ['build:react']);
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
