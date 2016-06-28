// import gulpLoadPlugins from 'gulp-load-plugins';
// var gulpLoadPlugins = require('gulp-load-plugins');
var gulp = require('gulp');
var sass = require('gulp-sass');
var htmlmin = require('gulp-htmlmin');
var extname = require('gulp-extname');
var assemble = require('assemble');
var frontMatter = require('gulp-front-matter');
var hb = require('gulp-hb');
var rename = require('gulp-rename');
var hbLayouts = require('handlebars-layouts');
var app = assemble();
var browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const $ = require('gulp-load-plugins')();

var markupInputFiles = {
  pages: 'src/pages/**/*.hbs',
  data: 'data/**/*.{json,yml}',
  templates: 'src/partials/**/*.hbs',
  helpers: 'helpers/*.js'
};


gulp.task('hello', function(){
	console.log('Hello Zell');
});


gulp.task('styles', function(){
	return gulp.src('src/assets/scss/**/*.scss').pipe(sass()).pipe(gulp.dest('.tmp/styles')).pipe(browserSync.reload({stream: true }))
});

gulp.task('browserSync', function(){
browserSync.init({
	server: {
		baseDir: '.'
},
})
});

// gulp.task('load', function(cb) {
//   app.partials('src/partials/*.hbs');
//   app.layouts('src/layouts/*.hbs');
//   app.pages('src/pages/*.hbs');
//   cb();
// });

// gulp.task('assemble', ['load'], function() {
//   return app.toStream('pages')
//     .pipe(app.renderFile())
//     .pipe(htmlmin())
//     .pipe(extname())
//     .pipe(app.dest('site'));
// });



gulp.task('scripts', () => {
  return gulp.src('src/assets/js/**/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    // .pipe($.babel())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(reload({stream: true}));
});



// gulp.task('html', ['styles', 'scripts'], () => {
//   return gulp
//     .src('src/partials/**/*.hbs')
//     .pipe(frontMatter({
//       property: 'data.fm',
//       remove: true
//     }))
//     .pipe(hb({ cwd: process.cwd() })
//       .data(markupInputFiles.data)
//       .partials(markupInputFiles.templates)
//       .helpers(markupInputFiles.helpers)
//       .helpers(hbLayouts)
//     )
//     .pipe(rename({ extname: '.html' }))
//     .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
//     .pipe($.if('*.js', $.uglify()))
//     .pipe($.if('*.css', $.cssnano()))
//     .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
//     .pipe(gulp.dest('build'));
// });


gulp.task('build', ['html'], () => {
  return gulp.src('tmp/**/*').pipe($.size({title: 'build', gzip: true}));
});

// app.task('default', ['assemble']);
gulp.task('watch', ['browserSync', 'sass'], function(){
gulp.watch('src/assets/scss/**/*.scss', ['sass']);
gulp.watch('**/*.html', reload);

});



