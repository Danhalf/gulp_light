
const { src, dest, watch, parallel, series } = require('gulp')
const stylus = require('gulp-stylus')
const scss = require('gulp-sass')(require('sass'))
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const imagemin = require('gulp-imagemin')
const htmlmin = require('gulp-htmlmin')
const fileinclude = require('gulp-file-include')
const gulppug = require('gulp-pug')
const newer = require('gulp-newer')
const browserSync = require('browser-sync').create()
const del = require('del')

const { srcPath, destPath } = require('./config/paths')

const clean = () => del(['dist/*', '!dist/img'])


const html = () => (
   src(srcPath.html)
      .pipe(fileinclude())
      .pipe(gulppug())
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(dest(destPath.html))
      .pipe(browserSync.stream())
)

const styles = () => (
   src(srcPath.styles)
      .pipe(sourcemaps.init())
      .pipe(stylus())
      .pipe(scss().on('error', scss.logError))
      .pipe(autoprefixer({
         cascade: false
      }))
      .pipe(cleanCSS({
         level: 2
      }))
      .pipe(rename({
         basename: 'style',
         suffix: '.min'
      }))
      .pipe(sourcemaps.write('.'))
      .pipe(dest(destPath.styles))
      .pipe(browserSync.stream()))

const scripts = () => (
   src(srcPath.scripts)
      .pipe(sourcemaps.init())
      .pipe(babel({
         presets: ['@babel/env']
      }))
      .pipe(uglify())
      .pipe(concat('main.min.js'))
      .pipe(sourcemaps.write('.'))
      .pipe(dest(destPath.scripts))
      .pipe(browserSync.stream()))

const img = () => (
   src(srcPath.images)
      .pipe(newer(destPath.images))
      .pipe(imagemin({
         progressive: true
      }))
      .pipe(dest(destPath.images)))

const syncWatch = () => (
   browserSync.init({
      open: false,
      server: {
         baseDir: "./dist"
      },
   }))

watch(destPath.html).on('change', browserSync.reload)
watch(srcPath.html, html)
watch(srcPath.styles, styles)
watch(srcPath.scripts, scripts)
watch(srcPath.images, img)

exports.clean = clean

exports.html = html
exports.styles = styles
exports.scripts = scripts
exports.img = img
exports.watch = watch

exports.default = series(clean, html, parallel(styles, scripts, img), syncWatch)