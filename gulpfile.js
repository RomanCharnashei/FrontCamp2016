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
    sourcemaps = require('gulp-sourcemaps'),
    watch = require('gulp-watch'),
    stringify = require('stringify');

const client_src = './client_src';

const client_dest = './public';
const client_views_dest = client_dest + '/views';
const client_js_dest = client_dest + '/js';


let libs = [
    'angular',
    'angular-ui-router'
];

gulp.task('default', ['nodemon', 'browser-sync', 'build:libs', 'build:js', 'watch:html']);

gulp.task( 'watch:html', ['copy:html'], function() {
    return watch(client_src + '/index.html', { ignoreInitial: false })
        .pipe(gulp.dest(client_dest))
        .on('error', gutil.log);    
});

gulp.task('copy:html', function(){
    return gulp.src(client_src + '/index.html')
        .pipe(gulp.dest(client_dest));
});

gulp.task('build:libs', function(){
    var b = browserify({
        debug: true
    });

    libs.forEach(function(lib) {
        b.require(lib);
    });

    return b.bundle()            
        .pipe(source('libs.js'))                     
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(client_js_dest));
});

gulp.task('build:js', function(){
    let b = browserify({
        basedir: client_src,
        debug: true,
        entries: ['app.js']
    })
    .transform(stringify, {
      appliesTo: { includeExtensions: ['.html'] },
      minify: true
    });

    libs.forEach(function(lib) {
        b.external(lib);
    });

    let watchedBrowserify = watchify(b);

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
            .pipe(gulp.dest(client_js_dest));
    };

    return bundle();
});


gulp.task('browser-sync', function(cb) {
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
