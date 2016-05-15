var browserSync = require('browser-sync'),
	gulp = require('gulp'),
	source = require('vinyl-source-stream'),
	babelify = require('babelify'),
	browserify = require('browserify'),
	reactify = require('reactify'),
	ejs = require("gulp-ejs");

gulp.task('bundle',function(){
	return browserify({
		entries:'app/main.jsx',
		debug:true
	})
	.transform(babelify)
	.transform(reactify)
	.transform(babelify.configure({
		stage:0,
		sourceMaps:true
	}))
	.bundle()
	.pipe(source('app.js'))
	.pipe(gulp.dest('./.tmp'));
});

gulp.task('temp',function(){
	gulp.src(['app/index.html','app/*.css'])
		.pipe(gulp.dest('./.tmp'));

	gulp.src(['bower_components/**'])
		.pipe(gulp.dest('./.tmp/bower_components'));
});

gulp.task('bundle-n-reload',['bundle'],browserSync.reload);

gulp.task('observe-all',function(){
	gulp.watch('app/**/*.*',['bundle-n-reload']);
	gulp.watch('app/*.*',['temp']);
});


gulp.task('serve', ['template', 'bundle','temp','observe-all'], function() {
	browserSync({
		open: true,
		port: 9001,
		server: {
			baseDir: './.tmp'
		}
	});
});

gulp.task('template',function(){
	gulp.src("app/*.ejs")
		.pipe(ejs({
			msg: "Hello Gulp!"
		}))
		.pipe(gulp.dest("./.tmp"));
});