const gulp = require("gulp"),
  livereload = require("gulp-livereload");

// gulp plugin to minify HTML.
const htmlmin = require("gulp-htmlmin"),
  // Using more than one function
  { parallel } = require("gulp"),
  //   gulp plugin to minify CSS, using clean-css.
  cleanCSS = require("gulp-clean-css");
//   to concat files
concat = require("gulp-concat");
// Enabling you to compile your Pug templates into HTML
const pug = require("gulp-pug");
// Enabling you to compile your SASS code into CSS
const sass = require("gulp-sass")(require("sass"));
// Autoprefix to sass code
const autoprefixer = require('gulp-autoprefixer');

function pugToHTML() {
  return (
    gulp
      .src(["src/*.pug"])
      .pipe(pug({ pretty: true }))
      // .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest("build"))
      .pipe(livereload())
  );
}

function minifyCSS() {
  return (
    gulp
      .src(["src/*.scss"])
      // .src("src/sass/**/*.scss")
      .pipe(sass().on("error", sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
      // .pipe(gulp.dest("build/css"))
      // .pipe(cleanCSS({ compatibility: "ie8" }))
      .pipe(concat("allmin.css"))
      .pipe(gulp.dest("build"))
      .pipe(livereload())
  );
}

exports.default = function () {
  require("./server.js");
  livereload.listen();

  // gulp.watch(["src/**/*.pug", "src/sass/**/*.scss"], parallel(pugToHTML, minifyCSS));
  gulp.watch(["src/**/*.pug", "src/**/*.scss"], parallel(pugToHTML, minifyCSS));
};
