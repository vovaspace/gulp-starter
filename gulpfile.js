const fs = require('fs');
const rimraf = require('rimraf');
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();

const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const concatCss = require('gulp-concat-css');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const csscomb = require('gulp-csscomb');
const csso = require('gulp-csso');
const sourcemaps = require('gulp-sourcemaps');
const rename = require("gulp-rename");
const spritesmith = require('gulp.spritesmith');
const svgSprite = require("gulp-svg-sprites");
const flatten = require('gulp-flatten');




// PATHS

const SRC_DIR = 'src/'
const BUILD_DIR = 'build/'

const path = {
    pug : {
		src : SRC_DIR + 'template/**/*.pug',
        pages : SRC_DIR + 'template/_pages/**/*.pug',
		build : BUILD_DIR
	},
    
    scss : {
        src : [SRC_DIR + 'style/**/*.scss', SRC_DIR + 'sections/**/*.scss'],
        entry : SRC_DIR + 'style/main.scss',
		build : BUILD_DIR + 'css/'
    },
    
    cssFoundation : {
        src : [
                './node_modules/normalize.css/normalize.css'
            ],
        build : BUILD_DIR + 'css/'
    },
    
    js : {
        src: [SRC_DIR + 'js/**/*.js', SRC_DIR + 'sections/**/*.js'],
        build: BUILD_DIR + 'js/'
    },
    
    img : {
        src : [
            SRC_DIR + 'img/**/*.*',
            SRC_DIR + 'sections/**/img/*.*',
            '!' + SRC_DIR + 'img/icons/*.+(svg|png|ico)',
            ],
        build : BUILD_DIR + 'img/'
    },
    
    pngSprite : {
        src : SRC_DIR + '/img/icons/*.png',
        buildImg : BUILD_DIR + 'img/',
        imgLocation : '../img/sprite.png',
        buildFile: SRC_DIR + 'style/'
    },
    
    svgSprite : {
        src : SRC_DIR + '/img/icons/*.svg',
        build : BUILD_DIR
    },
    
    font : {
        src : SRC_DIR + 'fonts/**/*.*',
        build : BUILD_DIR + 'fonts/'
    }
}




// TASKS

gulp.task('pug', function() {
//	var YOUR_LOCALS = './content.json';

	return gulp.src(path.pug.pages)
		.pipe(pug({
			/*locals: JSON.parse(fs.readFileSync(YOUR_LOCALS, 'utf-8')),*/
			pretty : '\t'
		}))
        .on('error', notify.onError(function(error) {
        return {
          title: 'Pug',
          message : error.message
        }
        }))
		.pipe(gulp.dest(path.pug.build))
});


gulp.task('sass', function () {
  return gulp.src(path.scss.entry)
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass()).on('error', notify.onError({ title: 'Sass' }))
    .pipe(autoprefixer({ browsers :
            ['last 3 version', '> 1%', 'ie 9', 'Opera 12.1']
    }))
    .pipe(csscomb())
    .pipe(rename('style.css'))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest(path.scss.build))
    .pipe(browserSync.stream());
});


gulp.task('cssFoundation', function() {
  return gulp.src(path.cssFoundation.src)
    .pipe(concatCss('foundation.css'))
    .pipe(csso())
    .pipe(gulp.dest(path.cssFoundation.build))
})


gulp.task('copyImage', function() {
    return gulp.src(path.img.src, { since : gulp.lastRun('copyImage') })
    .pipe(flatten())
    .pipe(gulp.dest(path.img.build));
});


gulp.task('pngSprite', function () {
    var spriteData = gulp.src(path.pngSprite.src)
    .pipe(spritesmith({
        imgName : 'sprite.png',
        cssName : 'sprite.scss',
        cssFormat : 'css',
        imgPath : path.pngSprite.imgLocation,
        padding : 60
    }));
    
    spriteData.img.pipe(gulp.dest(path.pngSprite.buildImg));
    return spriteData.css.pipe(gulp.dest(path.pngSprite.buildFile));
});


gulp.task('svgSprite', function () {
    return gulp.src(path.svgSprite.src)
        .pipe(svgSprite({
            mode : 'symbols',
            preview : false,
            selector : 'icon-%f',
            svg : {
                symbols : 'symbol_sprite.html'
            }
        }))
        .pipe(gulp.dest(path.svgSprite.build));
});


gulp.task('copyFont', function() {
    return gulp.src(path.font.src, { since : gulp.lastRun('copyFont') })
    .pipe(flatten())
    .pipe(gulp.dest(path.font.build));
});

gulp.task('js', function() {
    return gulp.src(path.js.src)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(path.js.build));
});


gulp.task('clean', function(cb) {
    return rimraf(BUILD_DIR, cb);
});


gulp.task('watch', function() {
    gulp.watch(path.pug.src, gulp.series('pug'));
    gulp.watch(path.scss.src, gulp.series('sass'));
    gulp.watch(path.js.src, gulp.series('js'));
    gulp.watch(path.img.src, gulp.series('copyImage'));
    gulp.watch(path.pngSprite.src, gulp.series('pngSprite'));
    gulp.watch(path.svgSprite.src, gulp.series('svgSprite'));
});


gulp.task('serve', function() {
    browserSync.init({
      open : false,
      server : BUILD_DIR
    });

    browserSync.watch([BUILD_DIR + '/**/*.*', '!**/*.css'], browserSync.reload);
});




// BUILD

gulp.task('default', gulp.series(
  'clean',
  gulp.parallel(
    'cssFoundation',
    'copyImage',
    'copyFont',
    'pngSprite',
    'svgSprite',
    'sass',
    'pug',
    'js'
  ),
  gulp.parallel(
    'watch',
    'serve'
  )
));