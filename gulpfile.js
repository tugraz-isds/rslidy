const { src, dest, parallel, series, watch } = require('gulp');


const replace = require('gulp-replace');
const ts = require('gulp-typescript');
const concat = require('gulp-concat');
const ujs = require('gulp-terser');
const ucss = require('gulp-uglifycss');
const rename = require('gulp-rename');
const merge = require('merge2');
const pkg = require('./package.json');
const version = pkg.version;
const fs = require('fs');
const del = require('del');
const gzip = require('gulp-gzip');
const wp = require('webpack');
const webpacks = require('webpack-stream');
const browserSync = require('browser-sync').create();
const argv = require('yargs').argv;
const header = require('gulp-header');

console.log('[Gulp] Using version:', version);

const paths = {
  src: './src/',
  tsbuild: './src/ts/build/',
  build: './build/',
  library: './build/library/'
};

const files = {
  css: 'rslidy.css',
  mincss: 'rslidy.min.css',
  mainjs: 'js/ts/rslidy.js',
  js: 'rslidy.js',
  minjs: 'rslidy.min.js'
};

// Clean tasks
function clean() {
  return del([paths.tsbuild, paths.build]);
}
exports.clean = clean;
exports.clean.description = 'Cleans the project';

// Transpile TypeScript
function transpile() {
  const tsResult = src(paths.src + '**/*.ts')
    .pipe(ts.createProject(require('./tsconfig').compilerOptions)());
  return merge([
    tsResult.dts.pipe(dest(paths.tsbuild + 'd/')),
    tsResult.js.pipe(dest(paths.tsbuild + 'js/'))
  ]);
}

// Webpack task for ESM and CJS outputs
function webpack() {
  const configs = [
    {
      output: { filename: files.js, library: { type: 'module' } },
      experiments: { outputModule: true },
      mode: 'production',
      devtool: 'source-map',
      optimization: { minimize: false },
      plugins: [
        new wp.BannerPlugin({
          banner: `// Rslidy version ${version} ESM`,
          raw: true
        })
      ]
    },
    {
      output: { filename: files.js, library: { type: 'commonjs' } },
      mode: 'production',
      devtool: 'source-map',
      optimization: { minimize: false },
      plugins: [
        new wp.BannerPlugin({
          banner: `// Rslidy version ${version} CommonJS`,
          raw: true
        })
      ]
    },
    {
      output: {
        filename: files.js,
        library: 'Rslidy', // Name of the UMD library
        libraryTarget: 'umd',
        umdNamedDefine: true
      },
      mode: 'production',
      devtool: 'source-map',
      optimization: { minimize: false },
      plugins: [
        new wp.BannerPlugin({
          banner: `// Rslidy version ${version} UMD`,
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
        .pipe(dest(paths.library +
          (config.output.library?.type === 'module'
            ? 'esm'
            : config.output.library?.type === 'commonjs'
              ? 'cjs'
              : 'umd')
        ))
    )
  );
}

// Minify and compress tasks
function minifyjs() {
  return merge([
    src(paths.library + 'esm/**/*.js')
      .pipe(ujs())
      .pipe(header(`// Rslidy version ${version} ESM\n`))
      .pipe(rename({ suffix: '.min' }))
      .pipe(dest(paths.library + 'esm')),

    src(paths.library + 'cjs/**/*.js')
      .pipe(ujs())
      .pipe(header(`// Rslidy version ${version} CommonJS\n`))
      .pipe(rename({ suffix: '.min' }))
      .pipe(dest(paths.library + 'cjs')),

    src(paths.library + 'umd/**/*.js')
      .pipe(ujs())
      .pipe(header(`// Rslidy version ${version} UMD\n`))
      .pipe(rename({ suffix: '.min' }))
      .pipe(dest(paths.library + 'umd'))
  ]);
}

function minifycss() {
  return src(paths.library + files.css)
    .pipe(ucss())
    .pipe(rename(files.mincss))
    .pipe(dest(paths.library))
    .pipe(browserSync.stream()); // Stream CSS changes directly
}

function compress() {
  return src(paths.library + '**/*.min.js')
    .pipe(gzip())
    .pipe(dest(paths.library));
}

// CSS task
function css() {
  // Basis-Rslidy CSS
  const base = src(paths.src + 'css/*.css')
    .pipe(concat(files.css))
    .pipe(dest(paths.library));

  // Themes (z. B. tu-graz)
  const themes = src(paths.src + 'themes/**/*.css')
    .pipe(dest(paths.library + 'themes/'));

  // Theme-Bilder (z. B. Logos, Hintergründe)
  const themeAssets = src(paths.src + 'themes/**/*.{png,jpg,jpeg,svg,gif}')
    .pipe(dest(paths.library + 'themes/'));

  return merge([base, themes, themeAssets]);
}

// Icon definitions task
function icon_definitions() {
  let data = '';
  fs.readdirSync(paths.src + 'icons').forEach(file => {
    if (!file) return;
    const fileContent = fs.readFileSync(paths.src + 'icons/' + file).toString().replace(/\n/g, '');
    data += `export const ${file.slice(0, -4).replace('-', '_')}_icon = \`${fileContent}\`;\n\n`;
  });
  data = data.replace(/ ?(?:stroke|fill)="(none|#?[0-9A-Za-z]+)"/g, (match, value) => {
    return value.toLowerCase() === 'none' ? match : '';
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

// HTML task
function html() {
  src(paths.src + 'examples/**/*.*')
    .pipe(dest(paths.build + 'examples/'));
  src(paths.src + 'examples/stress-test/**/*.*')
    .pipe(dest(paths.build + 'tests/stress-test/'));
  return src(paths.src + 'tests/**/*.*')
    .pipe(dest(paths.build + 'tests/'));
}

// Copy task
function copy() {
  // Standardverhalten: JS + CSS kopieren
  fs.readdirSync(paths.build + 'examples').forEach(file => {
    const filePath = paths.build + 'examples/' + file;
    if (fs.statSync(filePath).isDirectory()) {
      src(paths.library + 'esm/' + files.minjs).pipe(dest(filePath));
      src(paths.library + files.mincss).pipe(dest(filePath));
      // Themes nicht mehr in Example-Ordner kopieren
      // src(paths.library + 'themes/**/*').pipe(dest(filePath + '/themes/'));
    }
  });

  src(paths.library + 'esm/' + files.minjs)
    .pipe(dest(paths.build + 'tests/stress-test/'));
  src(paths.library + files.mincss)
    .pipe(dest(paths.build + 'tests/stress-test/'));
  // Themes ebenfalls nur einmal global in library belassen
  // src(paths.library + 'themes/**/*')
  //   .pipe(dest(paths.build + 'tests/stress-test/themes/'));

  return Promise.resolve('');
}


// Build task
const build = series(clean,
  updateVersionStrings,
  parallel(series(transpile, webpack), html, css),
  parallel(minifyjs, minifycss), compress, copy);
exports.build = build;

// Watch task
function watchTask() {
  const arg = argv.slide || argv.s;
  let dir = 'examples/rslidy/'; // Updated to match your output
  let file = 'index.html'; // Default file, adjust if needed

  if (arg) {
    if (arg.includes('/')) {
      dir = arg.substring(0, arg.lastIndexOf('/') + 1);
      file = arg.substring(arg.lastIndexOf('/') + 1);
    } else {
      file = arg;
    }
  }

  browserSync.init({
    server: {
      index: file,
      baseDir: [paths.build, paths.build + dir],
    },
    notify: false,
    reloadDebounce: 500 // Debounce reloads to prevent buffering
  });

  // Watch specific file types with debounce
  watch(paths.src + '**/*.ts', { delay: 500 }, series(transpile, webpack, minifyjs, compress, copy)).on('change', () => browserSync.reload());
  watch(paths.src + 'css/*.css', { delay: 500 }, series(css, minifycss, copy)); // CSS uses stream, no reload needed
  watch([paths.src + 'examples/**/*.*', paths.src + 'tests/**/*.*'], { delay: 500 }, series(html, copy)).on('change', () => browserSync.reload());
  watch(paths.src + 'icons/*.svg', { delay: 500 }, series(icon_definitions, transpile, webpack, minifyjs, compress, copy)).on('change', () => browserSync.reload());
}

function updateVersionStrings() {
  return src(['src/**/*.ts', 'src/**/*.js', 'src/**/*.html', 'src/**/*.md'], { base: './' })
    // Replace version number patterns like: "Rslidy Version 2.0.1"
    .pipe(replace(/Rslidy Version [0-9]+\.[0-9]+\.[0-9]+/g, `Rslidy Version ${version}`))
    // Optional: also replace generic placeholders like __VERSION__
    .pipe(replace(/__VERSION__/g, version))
    .pipe(dest('./'));
}
exports.updateVersionStrings = updateVersionStrings;

exports.watch = series(build, watchTask);
exports.watch.description = 'Builds and watches for changes, reloading the browser as needed';
exports.watch.flags = { '--slide | -s': 'Pass a custom slide deck (e.g., examples/rslidy-intro/index.html)' };

exports.default = build;