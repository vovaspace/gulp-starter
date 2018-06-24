'use strict';

const fs = require('fs'),
      rimraf = require('rimraf'),
      notify = require('gulp-notify'),
      browserSync = require('browser-sync').create();

const gulp = require('gulp'),
      pug = require('gulp-pug'),
      sass = require('gulp-sass'),
      sassGlob = require('gulp-sass-glob'),
      concatCss = require('gulp-concat-css'),
      concat = require('gulp-concat'),
      autoprefixer = require('gulp-autoprefixer'),
      csso = require('gulp-csso'),
      sourcemaps = require('gulp-sourcemaps'),
      rename = require("gulp-rename"),
      spritesmith = require('gulp.spritesmith'),
      svgSprite = require("gulp-svg-sprites"),
      flatten = require('gulp-flatten'),
      ghPages = require('gulp-gh-pages'),
      replace = require('gulp-string-replace'),
      addsrc = require('gulp-add-src');




// PATHS

const SRC_DIR = 'src/',
      BUILD_DIR = 'build/',
      GH_PAGES_DIR = 'gulp-starter'; // Without '/' on the end

const path = {
  pug : {
		src : SRC_DIR + 'views/**/*.pug',
    pages : SRC_DIR + 'views/_pages/**/*.pug',
    locals : './content.json',
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

  jsFoundation : {
    src : [
      /* './node_modules/jquery/dist/jquery.js' */
    ],
    build : BUILD_DIR + 'js/'
  },
  
  imgs : {
    src : [
      SRC_DIR + 'img/**/*.*',
      SRC_DIR + 'sections/**/img/*.*',
      '!' + SRC_DIR + 'img/icons/*.+(svg|png|ico)',
      '!' + SRC_DIR + 'img/**/*.md'
    ],
    build : BUILD_DIR + 'img/'
  },
  
  pngSprite : {
    src : SRC_DIR + '/img/icons/*.png',
    retinaSrcFilter : SRC_DIR + '/img/icons/*@2x.png',
    buildImg : BUILD_DIR + 'img/',
    imgLocation : '../img/sprite.png',
    retinaImgLocation : '../img/sprite@2x.png',
    buildFile: SRC_DIR + 'style/'
  },
  
  svgSprite : {
    src : SRC_DIR + '/img/icons/*.svg',
    build : BUILD_DIR
  },
  
  fonts : {
    src : [
      SRC_DIR + 'fonts/**/*.*',
      '!' + SRC_DIR + 'fonts/*.md'
    ],
    build : BUILD_DIR + 'fonts/'
  },

  deploy : {
    replaceFiles : BUILD_DIR + '**/*.+(html|css|js)',
    otherFiles : [
      BUILD_DIR + '**/*.*',
      '!' + BUILD_DIR + '**/*.+(html|css|js)'
    ]
  }
};




// TASKS

gulp.task('pug', function() {
  return gulp.src(path.pug.pages)
    .pipe(pug({
      locals: JSON.parse(fs.readFileSync(path.pug.locals, 'utf-8')),
      pretty : '\t'
    }))
    .on('error', notify.onError(function(error) {
      return {
        title: 'Pug',
        message : error.message
      };
    }))
    .pipe(gulp.dest(path.pug.build));
});


gulp.task('sass', function () {
  return gulp.src(path.scss.entry)
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({outputStyle: 'expanded'})).on('error', notify.onError({ title: 'Sass' }))
    .pipe(autoprefixer({ browsers :
      ['last 3 version', '> 1%', 'ie 8', 'ie 9', 'Opera 12.1']
    }))
    .pipe(rename('style.css'))
    .pipe(gulp.dest(path.scss.build))
    .pipe(rename({suffix: ".min"}))
    .pipe(csso())
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest(path.scss.build))
    .pipe(browserSync.stream());
});


gulp.task('cssFoundation', function() {
  return gulp.src(path.cssFoundation.src)
    .pipe(concatCss('foundation.css'))
    .pipe(csso())
    .pipe(gulp.dest(path.cssFoundation.build));
})


gulp.task('copyImages', function() {
  return gulp.src(path.imgs.src, { since : gulp.lastRun('copyImages') })
    .pipe(flatten())
    .pipe(gulp.dest(path.imgs.build));
});


gulp.task('pngSprite', function () {
  let spriteData = gulp.src(path.pngSprite.src)
    .pipe(spritesmith({
      imgName : 'sprite.png',
      retinaSrcFilter: path.pngSprite.retinaSrcFilter,
      retinaImgName: 'sprite@2x.png',
      cssName : 'spritesmith.scss',
      imgPath : path.pngSprite.imgLocation,
      retinaImgPath : path.pngSprite.retinaImgLocation,
      padding : 60,
      cssVarMap : function(sprite) {
        sprite.name = 'png-icon_' + sprite.name;
      }
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


gulp.task('copyFonts', function() {
  return gulp.src(path.fonts.src, { since : gulp.lastRun('copyFonts') })
    .pipe(flatten())
    .pipe(gulp.dest(path.fonts.build));
});


gulp.task('js', function() {
  return gulp.src(path.js.src)
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.js.build));
});


gulp.task('jsFoundation', function() {
  return gulp.src([path.jsFoundation.src])
    .pipe(concat('foundation.js'))
    .pipe(gulp.dest(path.jsFoundation.build));
});


gulp.task('clean', function(cb) {
  return rimraf(BUILD_DIR, cb);
});


gulp.task('watch', function() {
  gulp.watch([path.pug.src, path.pug.locals], gulp.series('pug'));
  gulp.watch(path.scss.src, gulp.series('sass'));
  gulp.watch(path.js.src, gulp.series('js'));
  gulp.watch(path.imgs.src, gulp.series('copyImages'));
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




// BUILD: 'gulp build'

gulp.task('build', gulp.series(
  'clean',
  gulp.parallel(
    'cssFoundation',
    // 'jsFoundation',
    'copyImages',
    'copyFonts',
    'pngSprite',
    'svgSprite'
  ),
  gulp.parallel(
    'sass',
    'pug',
    'js'
  )
));


// DEPLOY: 'gulp deploy' to deploying build into GitHub Pages
// DON'T FORGET to build before deploy!
gulp.task('deploy', function() {
  return gulp.src(path.deploy.replaceFiles)
    // Replays paths like 'src = "/img/pic.jpg"'
    .pipe(replace(/['"]\/[A-Za-z0-9\._\/]+\.[A-Za-z]+['"]/g, function(replacement) {
      // Save quote format
      if (replacement[0] == '"') {
        return '"/' + GH_PAGES_DIR + replacement.replace(/["]+/g, '') + '"'
      }
      return "'/" + GH_PAGES_DIR + replacement.replace(/[']+/g, '') + "'";
    }))
    .pipe(addsrc(path.deploy.otherFiles)) 
    .pipe(ghPages());
});


// DEFAULT: build and serve

gulp.task('default', gulp.series(
  'build',
  gulp.parallel(
    'watch',
    'serve'
  )
));