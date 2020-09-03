const gulp         	= require('gulp'),
    sass         	= require('gulp-sass'),
    browserSync  	= require('browser-sync').create(),
    concat       	= require('gulp-concat'),
    uglify       	= require('gulp-uglifyjs'),
    cssnano      	= require('gulp-cssnano'),
    rename       	= require('gulp-rename'),
    autoprefixer 	= require('gulp-autoprefixer'),
	sourcemaps 	 	= require('gulp-sourcemaps'),
	spritesmith  	= require('gulp.spritesmith'),
	plumber 		= require('gulp-plumber'),
	notify 			= require("gulp-notify"),
    babel           = require('gulp-babel');

const dirs = {
    libs: 'assets/js/libs/',
    scss: 'assets/scss',
    css: 'assets/css',
    es6: 'assets/es6',
    js: 'assets/js'
};

gulp.task('browser-sync', function(){
    browserSync.init({
        //proxy: 'http://localhost:8888/',
        //notify: false
         server: {
          baseDir: "./"
      }
    });
});

gulp.task('sass', function(){
    return gulp.src(dirs.scss + '/**/*.+(scss|sass)')
	.pipe(sourcemaps.init())
	.pipe(plumber({errorHandler: notify.onError((error) => {
		return {
			title: 'Error',
			message: error.message
		}
	})}))
	.pipe(sass())
    .pipe(autoprefixer(['last 50 versions']))
	.pipe(cssnano({zindex: false}))
    .pipe(rename({suffix: '.min'}))
	.pipe(sourcemaps.write('/maps'))
    .pipe(gulp.dest(dirs.css))
	.pipe(browserSync.stream())
});

gulp.task('es6', () => {
    return gulp.src(dirs.es6 + '/**/*.js')
	.pipe(sourcemaps.init())
    .pipe(plumber({errorHandler: notify.onError((error) => {
		return {
			title: 'Error',
			message: error.message
		}
	})}))
    .pipe(babel({
        presets: ['es2015', 'babili']
    }))
    .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
	.pipe(sourcemaps.write('/maps'))
    .pipe(gulp.dest(dirs.js));
});

gulp.task('scripts', function() {
    return gulp.src(dirs.libs + '/**/*.js')
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dirs.js));
});

gulp.task('css:libs', function(){
    return gulp.src(dirs.css + '/libs/**/*.css')
    .pipe(concat('libs.min.css'))
    .pipe(cssnano({zindex: false}))
    .pipe(gulp.dest(dirs.css));
});

gulp.task('watch', function(){
	gulp.watch(dirs.scss + '/**/*.+(scss|sass)', gulp.parallel('sass'));
    gulp.watch(dirs.es6 + '/**/*.js', gulp.parallel('es6'));
    gulp.watch(dirs.js + '/**/*.js', browserSync.reload);
});
//
gulp.task('default', gulp.series('css:libs', 'scripts', gulp.parallel('browser-sync', 'watch')));
