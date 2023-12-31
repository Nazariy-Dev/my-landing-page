const gulp = require("gulp")
const browserSync = require( 'browser-sync' ).create();
const pug = require("gulp-pug")
const sass = require('gulp-sass')(require('sass'));
const spritesmith = require('gulp.spritesmith');
const rimraf = require('gulp-rimraf');
const rename = require("gulp-rename")
const autoprefixer = require('autoprefixer')
const postcss = require('gulp-postcss')
const sourcemaps= require('gulp-sourcemaps')


// ------------------ Server ------------------
gulp.task("server", function (){
    browserSync.init({
        server: {
            port: 9000,
            baseDir: "build",
        },
        browser: "google chrome"
    })

    gulp.watch("build/**/*").on("change", browserSync.reload)
})

// ------------------ Pug Compile ------------------
gulp.task("templates:compile", function buildHTML(){
    return gulp.src('source/templates/index.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest("build"))
})

// ------------------ SASS to CSS ------------------
gulp.task('styles:compile', function (){
    return gulp.src('source/styles/main.scss')
        .pipe(sass({outputStyle: "compressed"}).on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer()]))
        .pipe(sourcemaps.write('.'))
        .pipe(rename("main.min.css"))
        .pipe(gulp.dest("build/css"))
})

// ------------------ Sprite ------------------
gulp.task('sprite', function (cb) {
    let spriteData = gulp.src('images/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.scss'
    }));

    spriteData.img.pipe(gulp.dest("build/images/"))
    spriteData.css.pipe(gulp.dest("build/styles/global"))
    cb()
});

// ------------------ Delete ------------------
gulp.task('clean', function del(cb) {
    return rimraf("build", cb())
});


// ------------------ Copy fonts------------------
gulp.task('copy:fonts', function() {
    return gulp.src('./source/fonts/**/*') // much faster
        .pipe(gulp.dest("build/fonts"))
});

// ------------------ Copy images------------------
gulp.task('copy:images', function() {
    return gulp.src('./source/images/**/*') // much faster
        .pipe(gulp.dest("build/images"))
});

// ------------------ Copy------------------
gulp.task("copy", gulp.parallel('copy:fonts', 'copy:images'));


// ------------------ Watchers ------------------
gulp.task("watch", function (){
    gulp.watch("source/templates/**/*.pug", gulp.series("templates:compile"))
    gulp.watch("source/styles/**/*.scss", gulp.series("styles:compile"))
})

gulp.task("default", gulp.series(
    "clean",
    gulp.parallel("templates:compile" , "styles:compile", "sprite", "copy"),
    gulp.parallel("watch", "server")
))


