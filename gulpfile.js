var gulp = require('gulp')
var sass = require('gulp-sass')
var webpack = require('webpack-stream')
var uglify = require('gulp-uglify')
var cssMinify = require('gulp-minify-css')
var RevAll = require('gulp-rev-all')
var filter = require('gulp-filter')
var through = require('through2')

const PATHS = {
    SASS: ['./src/styles/scss/**/*'],
    SCRIPTS: ['./src/scripts/entrances/**/*']
}

gulp.task('compileSass', () => {
    gulp.src(PATHS.SASS)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/styles/css'))
})

gulp.task('packagedScripts', () => {

    gulp.src(PATHS.SCRIPTS)
        .pipe(through.obj(function (file, enc, cb) {
            var __filename = file.path.split('\\').reverse()[0]
            gulp.src(file.path)
                .pipe(webpack({
                    output: {
                        filename: __filename
                    },
                    module: {
                        loaders: [
                            {
                                test: /\.js$/,
                                exclude: /node_modules/,
                                loader: 'babel',
                                query: {
                                    presets: ['es2015']
                                }
                            }
                        ]
                    }
                }))
                .pipe(gulp.dest('./src/scripts/packaged'))
            cb()
        }))
})

gulp.task('build', ['compileSass', 'packagedScripts'], () => {
    var jsFilter = filter('**/packaged/*.js')
    var htmlFilter = filter('**/*.html')
    var cssFilter = filter('**/*.css')

    var revAll = RevAll({
        dontGlobal: ['.scss'],
        dontRenameFile: ['index.html']
    })

    var v = gulp.src('src/**/*')
        .pipe(revAll.revision())

    v.pipe(jsFilter)
        .pipe(uglify())
        .pipe(gulp.dest('./dist'))

    v.pipe(cssFilter)
        .pipe(cssMinify())
        .pipe(gulp.dest('./dist'))

    v.pipe(htmlFilter)
        .pipe(gulp.dest('./dist'))
})

gulp.task('default', ['compileSass', 'packagedScripts'], () => {
    gulp.watch(PATHS.SASS, ['compileSass'])
    gulp.watch(PATHS.SCRIPTS, ['packagedScripts'])
})