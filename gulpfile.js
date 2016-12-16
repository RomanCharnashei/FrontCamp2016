var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    browserSync = require('browser-sync').create();

gulp.task('default', ['browser-sync'], function () {
});

gulp.task('browser-sync', ['nodemon'], function(cb) {
	browserSync.init(null, {
		proxy: "http://localhost:3000",
        files: ["public/**/*.*", "views"],
        port: 8181,
	}, function() {
        if (cb) {
            cb();
        }
    });
});

gulp.task('nodemon', function (cb) {
    var started = false;
    return nodemon({
        script: './bin/www',
        watch: ['./bin/www', 'app.js', './routes'],
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
