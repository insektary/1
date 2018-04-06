const gulp = require('gulp');
const less = require('gulp-less');
const path = require('path');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
const browserSync = require('browser-sync');
const concat = require('gulp-concat');

gulp.task('less', function () {
    return gulp.src('./src/less/*.less')
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./src/css'))
        .pipe(browserSync.reload({stream: true}))
});


gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './'
        },
        notify: false
    });
});

gulp.task('watch', ['browser-sync', 'less'], function() {
    gulp.watch('src/less/*.less', ['less']);
    gulp.watch('index.html', browserSync.reload);
});

gulp.task('default', ['watch']);