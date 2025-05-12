const { src, dest, parallel, series, watch } = require('gulp');
var ts = require('gulp-typescript');
var concat = require('gulp-concat');
var ujs = require('gulp-terser');
var ucss = require('gulp-uglifycss');
var rename = require('gulp-rename');
var merge = require('merge2');
var fs = require('fs');
var del = require('del');
var gzip = require('gulp-gzip');
var wp = require('webpack');
var webpacks = require('webpack-stream');
var browserSync = require('browser-sync').create();
var argv = require('yargs').argv;
var BannerPlugin = require('webpack').BannerPlugin; // Add BannerPlugin
var header = require('gulp-header');
var bannerText = (type) => `// Rslidy version 2.0 ${type}\n`;

var paths = {
  src: './src/',
  tsbuild: './src/ts/build/',
  build: './build/',
  library: './build/library/' // New path for library
};

var files = {
  css: 'rslidy.css',
  mincss: 'rslidy.min.css',
  mainjs: 'js/ts/rslidy.js',
  js: 'rslidy.js',
  minjs: 'rslidy.min.js'
};

// Clean tasks
function cleantsc() {
  return del([paths.tsbuild]);
}
function clean() {
  return del([paths.tsbuild, paths.build]);
}
function cleanNodeModules() {
  return del('node_modules', { force: true,  dot: true });
}
function cleanPackageLock() {
  return del('yarn.lock', { force: true });
}
exports.clean = clean;
exports.clean.description = 'Cleans the project';

// Transpile TypeScript
function transpile() {
  var tsResult = src(paths.src + '**/*.ts')
    .pipe(ts.createProject(require('./tsconfig').compilerOptions)());

  return merge([
    tsResult.dts.pipe(dest(paths.tsbuild + 'd/')),
    tsResult.js.pipe(dest(paths.tsbuild + 'js/'))
  ]);
}
exports.transpile = series(clean, transpile);
exports.transpile.description = 'Transpiles .ts files using tsconfig.json';

// Webpack task for ESM and CJS outputs
function webpack() {
  const configs = [
    {
      output: { filename: files.js, library: { type: 'module' } },
      experiments: { outputModule: true },
      mode: 'production',
      devtool: 'source-map',
      optimization: { minimize: false }, // Disable minification
      plugins: [
        new BannerPlugin({
          banner: '// Rslidy version 2.0.0 ESM', // Add comment for ESM
          raw: true
        })
      ]
    },
    {
      output: { filename: files.js, library: { type: 'commonjs' } },
      mode: 'production',
      devtool: 'source-map',
      optimization: { minimize: false }, // Disable minification
      plugins: [
        new BannerPlugin({
          banner: '// Rslidy version 2.0.0 CommonJS', // Add comment
          // for CJS
          raw: true
        })
      ]
    }
  ];

  return merge(
    configs.map(config =>
      src(paths.tsbuild + files.mainjs)
        .pipe(webpacks({
          ...config,
          plugins: [new wp.NoEmitOnErrorsPlugin(), ...config.plugins], // Include BannerPlugin
          module: {
            rules: [
              {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
              }
            ]
          },
          resolve: {
            extensions: ['.ts', '.js']
          }
        }))
        .pipe(dest(paths.library + (config.output.library.type === 'module' ? 'esm' : 'cjs'))) // Output to library folder
        .pipe(browserSync.stream())
    )
  );
}
exports.webpack = series(clean, transpile, webpack);
exports.webpack.description = 'Bundles the main JavaScript file into ESM and CJS formats';

// Minify and compress tasks
function minifyjs() {
  return merge([
    // Minify ESM version
    src(paths.library + 'esm/**/*.js')
      .pipe(ujs()) // Minify JS
      .pipe(header(bannerText('ESM'))) // Add ESM banner
      .pipe(rename({ suffix: '.min' }))
      .pipe(dest(paths.library + 'esm')),

    // Minify CJS version
    src(paths.library + 'cjs/**/*.js')
      .pipe(ujs()) // Minify JS
      .pipe(header(bannerText('CommonJS'))) // Add CJS banner
      .pipe(rename({ suffix: '.min' }))
      .pipe(dest(paths.library + 'cjs'))
  ]);
}

function minifycss() {
  return src(paths.build + files.css)
    .pipe(ucss())
    .pipe(rename(files.mincss))
    .pipe(dest(paths.build));
}

function compress() {
  return src(paths.library + '**/*.min.js') // Look for minified JS in library folder
    .pipe(gzip())
    .pipe(dest(paths.library)); // Output compressed files to the library folder
}
exports.minify = series(parallel(minifyjs, minifycss), compress);
exports.minify.description = 'Produces .min and .gz files';

// CSS task
function css() {
  return src(paths.src + 'css/*.css')
    .pipe(concat(files.css))
    .pipe(dest(paths.build));
}
exports.css = css;
exports.css.description = 'Bundles CSS source files into rslidy.css';

// Icon definitions task
function icon_definitions() {
  var data = '';
  fs.readdirSync(paths.src + 'icons').forEach(file => {
    if (!file) return;
    const fileContent = fs.readFileSync(paths.src + 'icons/' + file).toString().replace(/\n/g, '');
    data += 'export const ' + file.slice(0, -4).replace('-', '_') + '_icon = ';
    data += '`' + fileContent + '`;';
    data += '\n\n';
  });
  data = data.replace(/ ?(?:stroke|fill)="(none|#?[0-9A-Za-z]+)"/g, (match, value) => {
    return value.toLowerCase() === 'none' ? `${match}` : '';
  });
  data = data.replace(/style="([^"]*)"/g, (match, styleAttr) => {
    const cleanedStyle = styleAttr.replace(/\b(?:fill|stroke):\s*([^;]*);?/gi, (match, value) => {
      return value.toLowerCase() === 'none' ? `${match};` : '';
    });
    return `style="${cleanedStyle}"`;
  });
  data = data.replace(/ ?style=" *" ?/g, '').replace(/;;+/g, ';');
  fs.writeFileSync(paths.src + 'ts/icon-definitions.ts', data);
  return Promise.resolve('');
}
exports.icons = series(icon_definitions);
exports.icons.description = 'Optimises SVG files and writes icon-definitions.ts';

// HTML task
function html() {
  src(paths.src + 'examples/**/*.*')
    .pipe(dest(paths.build + 'examples/'));

  src(paths.src + 'examples/stress-test/**/*.*')
    .pipe(dest(paths.build + 'tests/stress-test/'));

  return src(paths.src + 'tests/**/*.*')
    .pipe(dest(paths.build + 'tests/'));
}
exports.assemble = parallel(exports.webpack, html, css);
exports.assemble.description = 'Assembles HTML, CSS, and JS output files';

// Copy task
function copy() {
  // Copy rslidy.min.js (ESM) to every folder in examples
  fs.readdirSync(paths.build + 'examples').forEach(file => {
    const filePath = paths.build + 'examples/' + file;
    if (fs.statSync(filePath).isDirectory()) {
      src(paths.library + 'esm/' + files.minjs) // Copy minified JS
        .pipe(dest(filePath));
    }
  });

  // Copy minified CSS to examples and tests folders
  fs.readdirSync(paths.build + 'examples').forEach(file => {
    if (fs.statSync(paths.build + 'examples/' + file).isDirectory()) {
      src(paths.build + files.mincss)
        .pipe(dest(paths.build + 'examples/' + file));
    }
  });

  // Copy rslidy.min.js and rslidy.min.css to tests/stress-test folder
  src(paths.library + 'esm/' + files.minjs)
    .pipe(dest(paths.build + 'tests/stress-test/'));
  src(paths.build + files.mincss)
    .pipe(dest(paths.build + 'tests/stress-test/'));

  return Promise.resolve('');
}

// Build task
exports.build = series(clean, exports.assemble, exports.minify, copy);
exports.build.description = 'Cleans and builds the project';

// Clean all task
exports.cleanAll = parallel(clean, cleanNodeModules, cleanPackageLock);
exports.cleanAll.description = 'Cleans the build folder and the node_modules folder';

// Watch task
function loop() {
  var arg = (argv.slide || argv.s);
  var dir = 'tests/';
  var file = 'notes.html';
  if (arg) {
    if (arg.lastIndexOf('/'))
      dir = arg.substring(0, arg.lastIndexOf('/') + 1);
    file = arg.substring(arg.lastIndexOf('/') + 1);
  }

  browserSync.init({
    server: {
      index: dir + file,
      baseDir: [paths.build, paths.build + dir],
    }
  });
  watch(paths.src + '**/*.*', buildnc);
}
const gwatch = series(exports.build, loop);
exports.watch = gwatch;
exports.watch.description = 'Automatically triggers build whenever a source file is changed and updates the browser';
exports.watch.flags = { '--slide | -s': 'Pass a custom slide deck to display (e.g. examples/rslidy-intro/index.html)' };

exports.default = exports.build;