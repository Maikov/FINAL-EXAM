var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    rigger = require('gulp-rigger'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    plumber = require('gulp-plumber'),
    webserver = require('gulp-webserver');
    spritesmith = require('gulp.spritesmith');

// Path variables to chenge it once

var path = {

    src: { // Editing location
        html:'src/*.html',
        scss:'src/scss/*.scss',
        js:'src/js/*.js',
        img:'src/img/*',
        sprites:'src/img/sprites/*.png'
    },

    build: { // Ready materials location
        html: '',
        css:  'build/css/',
        js:   'build/js/',
        img:  'build/img/',
        spritesImg:'build/img/',
        spritesCSS:'build/css/'
    }
};

// Server
// gulp.task('webserver', function() {
//     gulp.src('')
//         .pipe(webserver({
//             livereload: true,
//             open: true,
//             port: 8080
//         }));
// });

// Sprites maker
gulp.task('sprite', function() {
    var spriteData =
    gulp.src(path.src.sprites)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css',
        padding: 2
    }));
    spriteData.img.pipe(gulp.dest(path.build.spritesImg));
    spriteData.css.pipe(gulp.dest(path.build.spritesCSS));
});

// Html glue task
gulp.task('html', function () {
    gulp.src(path.src.html)
        .pipe(plumber())
        .pipe(rigger())
        .pipe(rename('index.html'))
        .pipe(gulp.dest(path.build.html))
        .pipe(notify({ message: 'Html task succesfull complete' }));
});

// Styles compile task
gulp.task('styles', function() {
    gulp.src(path.src.scss)
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest(path.build.css))
        .pipe(rename({suffix: '.min'}))
        .pipe(autoprefixer('last 2 version'))
        .pipe(cssnano())
        .pipe(gulp.dest(path.build.css))
        .pipe(notify({ message: 'Styles task succesfull complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src(path.src.js)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(path.build.js))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(path.build.js))
    .pipe(notify({ message: 'Scripts task succesfull complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src(path.src.img)
    .pipe(plumber())
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(path.build.img))
    .pipe(notify({ message: 'Images task succesfull  complete' }));
});

// Clean
gulp.task('clean', function() {
  return del([path.build.css]);
});

// Watch
gulp.task('watch', function() {
  
  // Create LiveReload server
  // livereload.listen();

  // Watch .scss files
  gulp.watch('src/scss/**/*.scss', ['styles']).on('change', livereload.changed);
  // gulp.watch('src/**/*.html', ['html']);

  // Watch .js files
  gulp.watch('src/js/**/*.js', ['scripts']).on('change', livereload.changed);

  // Watch image files
  // gulp.watch('src/img/**/*', ['images']).on('change', livereload.changed);

  // Watch any files in dist/, reload on change
  gulp.watch('src/**/*.html', ['html']).on('change', livereload.changed);

});

// Default task
gulp.task('default', function() {
  gulp.start('clean', 'html', 'styles', 'scripts', 'watch');
});


