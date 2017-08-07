const gulp = require('gulp'),
		del = require('del'), // Usuwanie plików/folderów.
		browserSync = require('browser-sync').create(),
		runSequence = require('run-sequence'), // Sunchronicznie wykonywanie zadań.
		gulpif = require('gulp-if'), // Instrukcja if do gulpa.
		svgmin = require('gulp-svgmin'), // Minifikacja SVG.
		concat = require('gulp-concat'), // Łaczenie plików.
		uglify = require('gulp-uglify'), // Minifikacja JS.
		babel = require('gulp-babel'), // Babel.
		sass = require('gulp-sass'), // Kompilacja sass do css.
		sourcemaps = require('gulp-sourcemaps'), // Dodaje źródła przy minifikacji.
		cleanCSS = require('gulp-clean-css'), // Minifikacja CSS.
		autoprefixer = require('gulp-autoprefixer'), // Dodanie prefixów do css.
		stripCssComments = require('gulp-strip-css-comments'), // Usunięcie komentarzy z css.
		htmlmin = require('gulp-htmlmin'), // Minifikacja html.
		fileinclude = require('gulp-file-include'), // Importowanie html.
		rename = require("gulp-rename"), // Zmiana nazwy pliku wyjściowego.
		plumber = require('gulp-plumber'),
		reload = function(){setTimeout(browserSync.reload, 1000)};

let production = false;

// Tworzy wersję deweloperską.
gulp.task('default', function(callback) {
	runSequence('clean-build', 'create-build', 'watch', 'browser-sync',  callback);
});

// Usuwa istniejący build.
gulp.task('clean-build', function() {
	return del(['./dist'], {
		force: true
	});
});

// Tworzy build deweloperski.
gulp.task('create-build', function(callback){
	runSequence('copy', 'concatenate',  callback);
});

// Kopiuje częśc zasobów.
gulp.task('copy', ['copy-fonts', 'copy-img', 'copy-json']);

// Kopiuje czcionki.
gulp.task('copy-fonts', function() {
	return gulp.src('./src/fonts/**/*.*')
		.pipe(gulp.dest('./dist/fonts/'));
});

// Sprawdzenie czy zdjęcie jest typu svg.
let imageCheck = function(file){
	return file.path.includes('.svg');
}

// Kopiuje obrazy główne (edytowane).
gulp.task('copy-img', function() {
	return gulp.src('./src/img/**/*.*')
		.pipe(gulpif(imageCheck, svgmin()))
		.pipe(gulp.dest('./dist/img/'));
});

// Kopiuje pliki json.
gulp.task('copy-json', function() {
	return gulp.src('./src/json/**/*.json')
		.pipe(gulp.dest('./dist/json/'));
});

// Konkatenacja i minifikacja zasobów (development).
gulp.task('concatenate', ['concatenate-scripts', 'concatenate-styles', 'concatenate-html']);

// Konkatenacja i minifikacja skryptów - development.
gulp.task('concatenate-scripts', function() {
	return gulp.src(['./src/main.js', './src/utils/smoothscroll.js', './src/utils/zepto.js', './src/components/**/*.js'])
		.pipe(gulpif(!production, sourcemaps.init()))
		.pipe(babel({
			presets: ['env'],
			compact: false
		}))
		.pipe(concat('main.js'))
		.pipe(gulpif(production, uglify({
			parse: {
				html5_comments: false
			},
			compress: {
				dead_code: true,
				unused: true,
				join_vars: true,
				passes: 3
			}
		})))
		.pipe(gulpif(!production, sourcemaps.write()))
		.pipe(gulp.dest('./dist/'));
});

// Konkatenacja i minifikacja stylów (development).
gulp.task('concatenate-styles', function() {
	return gulp.src('./src/main.scss')
		.pipe(gulpif(!production, sourcemaps.init()))
		.pipe(sass().on('error', sass.logError))
		.pipe(stripCssComments({preserve: false}))
		.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false,
				grid: true
        }))
		.pipe(gulpif(production, cleanCSS({
			level: 2
		})))
		.pipe(gulpif(!production, sourcemaps.write()))
		.pipe(gulp.dest('./dist/'));
});

// Konkatenacja i minifikacja html (development).
gulp.task('concatenate-html', function() {
	return gulp.src('./src/main.html')
		.pipe(fileinclude({
      	prefix: '@@',
      	basepath: '@file'
    	}))
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true
		}))
		.pipe(rename('index.html'))
		.pipe(gulp.dest('./dist/'));
});

// Livereload
gulp.task('browser-sync', function() {
	browserSync.init({
		 server: "./dist/"
	});
});

gulp.task('watch', function() {
	gulp.watch('./src/**/*.js', ['concatenate-scripts']).on('change', reload);
	gulp.watch('./src/**/*.scss', ['concatenate-styles']).on('change', reload);
	gulp.watch('./src/**/*.html', ['concatenate-html']).on('change', reload);
});
