const { src, dest, parallel, series, watch } = require('gulp')
var ts = require('gulp-typescript')
var concat = require('gulp-concat')
var ujs = require('gulp-terser')
var ucss = require('gulp-uglifycss')
var rename = require("gulp-rename")
var merge = require('merge2')
var fs = require('file-system')
var del = require('del')
var gzip = require('gulp-gzip')
var wp = require('webpack')
var webpacks = require('webpack-stream')
var browserSync = require('browser-sync').create()
var argv = require('yargs').argv

var paths = {
  src: './src/',
  tsbuild: './src/ts/build/',
  build: './build/'
}

var files = {
  css: 'rslidy.css',
  mincss: 'rslidy.min.css',
  mainjs: 'js/ts/rslidy.js',
  js: 'rslidy.js',
  minjs: 'rslidy.min.js'
}


function cleantsc() {
  return del([paths.tsbuild])
}
function clean() {
  return del([paths.tsbuild , paths.build])
}
exports.clean = clean
exports.clean.description = 'Cleans the project'

function transpile() {
  var tsResult = src(paths.src + '**/*.ts')
    .pipe(ts.createProject(require('./tsconfig').compilerOptions)())

  return merge([
    tsResult.dts.pipe(dest(paths.tsbuild + 'd/')),
    tsResult.js.pipe(dest(paths.tsbuild + 'js/'))
  ])
}
exports.transpile = series(clean, transpile)
exports.transpile.description = 'Transpiles .ts files using tsconfig.json'

function webpack() {
  return src(paths.tsbuild + files.mainjs)
    .pipe(webpacks({
      output: { filename: files.js },
      plugins: [
        new wp.NoEmitOnErrorsPlugin()
      ],
      devtool: 'source-map',
      mode: 'none'
    }))
    .pipe(dest(paths.build))
    .pipe(browserSync.stream())
}
exports.webpack = series(clean, transpile, webpack)
exports.webpack.description = 'Bundles the main JavaScript file'

function minifyjs() {
  return src(paths.build + files.js)
    .pipe(ujs())
    .pipe(rename(files.minjs))
    .pipe(dest(paths.build))
}

function minifycss() {
  return src(paths.build + files.css)
    .pipe(ucss())
    .pipe(rename(files.mincss))
    .pipe(dest(paths.build))
}

function compress() {
  return src([paths.build + '*.min.js', paths.build + '*.min.css'])
  .pipe(gzip())
  .pipe(dest(paths.build))
}
exports.minify = series(parallel(minifyjs, minifycss), compress)
exports.minify.description = 'Produces .min and .gz files'

function css() {
  return src(paths.src + 'css/*.css')
    .pipe(concat(files.css))
    .pipe(dest(paths.build))
}
exports.css = css
exports.css.description = 'Bundles CSS source files into rslidy.css'


// Generate icon-definitions.ts from optimized icons
// This removes stoke and fill colors since we set them with css to save space
function icon_definitions() {
  var data = ''
  fs.recurseSync(paths.src+'icons', function(filepath, relative, filename) {
    if (!filename) return
    data += 'export const ' + filename.slice(0, -4).replace('-','_') + '_icon = '
    data += '`' + fs.fs.readFileSync(filepath) + '`;'
    data += '\n\n'
  })
  data = data.replace(/ ?stroke="#?[0-9A-Za-z]+"/g,'').replace(/ ?fill="#?[0-9A-Za-z]+"/g,'')
  data = data.replace(/style="([^"]*)"/g, (match, styleAttr) => {
    const cleanedStyle = styleAttr.replace(/\b(?:fill|stroke):\s*([^;]*);?/gi, (match, value) => {
        // Preserve 'none' values for fill and stroke
        return value.toLowerCase() === 'none' ? `${match};` : '';
    });
    return `style="${cleanedStyle}"`;
});
  data = data.replace(/ ?style=" *" ?/g,'').replace(/;;/g,';')
  fs.writeFile(paths.src + "ts/icon-definitions.ts", data)
  return Promise.resolve('')
}
exports.icons = series(icon_definitions)
exports.icons.description = 'Optimises SVG files and writes icon-definitions.ts'

function html() {
  src(paths.src + 'examples/**/*.*')
    .pipe(dest(paths.build + 'examples/'))
  return src(paths.src + 'tests/**/*.*')
    .pipe(dest(paths.build + 'tests/'))
}
exports.assemble = parallel(exports.webpack, html, css)
exports.assemble.description = 'Assembles HTML, CSS, and JS output files'

function copy() {
  fs.recurseSync(paths.build + 'examples', function(filepath, relative, filename) {
    //if filename is undefined, it's a directory
    if(filename == undefined && (filepath.match(/\\/g) || []).length == 2) {
      src(paths.build + files.minjs)
        .pipe(dest(filepath))
      src(paths.build + files.mincss)
        .pipe(dest(filepath))
    }
  })
  src(paths.build + files.minjs)
    .pipe(dest(paths.build + 'tests/'))
  src(paths.build + files.mincss)
    .pipe(dest(paths.build + 'tests/'))
  return Promise.resolve('')
}

exports.build = series(clean, exports.assemble, exports.minify, copy)
exports.build.description = 'Cleans and builds the project'

function stream() {
  return browserSync.stream()
}
const buildnc = series(parallel(series(cleantsc, transpile, webpack), html, css), exports.minify, copy, stream)

function loop() {
  var arg = (argv.slide || argv.s);
  var dir = 'tests/';
  var file = 'notes.html';
  if(arg) {
    if(arg.lastIndexOf('/'))
      dir = arg.substring(0, arg.lastIndexOf('/')+1);
    file = arg.substring(arg.lastIndexOf('/')+1);
  }

  browserSync.init({
    server: {
      index: dir + file,
      baseDir: [paths.build, paths.build + dir],
    }
  })
  watch(paths.src + '**/*.*', buildnc)
}
const gwatch = series(exports.build, loop)
exports.watch = gwatch
exports.watch.description = 'Automatically triggers build whenever a source file is changed and updates the browser'
exports.watch.flags = { '--slide | -s': 'Pass a custom slide deck to display (e.g. examples/rslidy-intro/index.html)' };

exports.default = exports.build