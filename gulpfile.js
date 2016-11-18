var gulp = require('gulp');
var pump = require('pump');

var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('build', function (cb) {
	pump([
			gulp.src([
				'bower_components/qwest/qwest.min.js',
				'src/google-page-speed-scores.js'
			]),
			uglify(),
			concat('google-page-speed-scores.package.min.js'),
			gulp.dest('')
		],
		cb
	);
});
gulp.task('compress', function (cb) {
	pump([
			gulp.src([
				'src/google-page-speed-scores.js'
			]),
			uglify(),
			concat('google-page-speed-scores.min.js'),
			gulp.dest('')
		],
		cb
	);
});

gulp.task('default', [
	'build',
	'compress'
]);