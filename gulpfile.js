const gulp = require('gulp');
const {src, dest, watch} = gulp;
const less = require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions', 'ie >= 9'] });
const browserSync = require('browser-sync');
const {reload} = browserSync;
const concat = require('gulp-concat');

gulp.task('less', () => {
    return src('./src/less/*.less')
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(concat('styles.css'))
        .pipe(dest('./src/css'))
        .pipe(reload({stream: true}))
});


gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: './'
        },
        notify: false
    });
});

gulp.task('watch', ['browser-sync', 'less'], () => {
    watch('src/less/*.less', ['less']);
    watch('index.html', reload);
    watch('src/js/script.js', reload);
});

gulp.task('default', ['watch']);