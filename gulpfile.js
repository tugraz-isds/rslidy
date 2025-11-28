const { src, dest, parallel, series, watch } = require('gulp');

const brotli = require('gulp-brotli');
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

// Transpile TypeScript (fixed)
function transpile() {
  const tsProject = ts.createProject('tsconfig.json');
  const tsResult = src(paths.src + '**/*.ts').pipe(tsProject());
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
        library: 'Rslidy',
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
          resolve: { extensions: ['.ts', '.js'] }
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
    .pipe(browserSync.stream());
}

function compress() {
  // --- JS compression ---
  const gzipJS = src(paths.library + '**/*.min.js')
    .pipe(gzip())
    .pipe(dest(paths.library));

  const brotliJS = src(paths.library + '**/*.min.js')
    .pipe(brotli.compress({
      extension: 'br',
      quality: 11
    }))
    .pipe(dest(paths.library));

  // --- CSS compression ---
  const gzipCSS = src(paths.library + '**/*.min.css')
    .pipe(gzip())
    .pipe(dest(paths.library));

  const brotliCSS = src(paths.library + '**/*.min.css')
    .pipe(brotli.compress({
      extension: 'br',
      quality: 11
    }))
    .pipe(dest(paths.library));

  // --- Merge all ---
  return merge([gzipJS, brotliJS, gzipCSS, brotliCSS]);
}

// CSS task
function css() {
  const base = src(paths.src + 'css/*.css')
    .pipe(concat(files.css))
    .pipe(dest(paths.library));

  const themes = src(paths.src + 'themes/**/*.css')
    .pipe(dest(paths.library + 'themes/'));

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
  fs.readdirSync(paths.build + 'examples').forEach(folder => {
    const full = paths.build + 'examples/' + folder;
    if (fs.statSync(full).isDirectory()) {
      src(paths.library + 'esm/' + files.minjs, { allowEmpty: true })
        .pipe(dest(full));
      src(paths.library + files.mincss, { allowEmpty: true })
        .pipe(dest(full));
      src(paths.library + 'themes/**/*.*', { allowEmpty: true })
        .pipe(dest(full + '/themes/'));
    }
  });

  src(paths.library + 'esm/' + files.minjs, { allowEmpty: true })
    .pipe(dest(paths.build + 'tests/stress-test/'));
  src(paths.library + files.mincss, { allowEmpty: true })
    .pipe(dest(paths.build + 'tests/stress-test/'));
  src(paths.library + 'themes/**/*.*', { allowEmpty: true })
    .pipe(dest(paths.build + 'tests/stress-test/themes/'));

  fs.readdirSync(paths.build + 'tests').forEach(folder => {
    const full = paths.build + 'tests/' + folder;
    if (fs.statSync(full).isDirectory() && folder !== 'stress-test') {
      src(paths.library + 'esm/' + files.minjs, { allowEmpty: true })
        .pipe(dest(full));
      src(paths.library + files.mincss, { allowEmpty: true })
        .pipe(dest(full));
      src(paths.library + 'themes/**/*.*', { allowEmpty: true })
        .pipe(dest(full + '/themes/'));
    }
  });
  return Promise.resolve();
}

// Helper: reload BrowserSync safely
function reloadBrowser(done) {
  browserSync.reload();
  done();
}

// Build task
const build = series(
  clean,
  updateVersionStrings,
  parallel(series(transpile, webpack), html, css),
  parallel(minifyjs, minifycss),
  compress,
  copy
);
exports.build = build;

// Watch task (fixed and improved)
function watchTask() {
  const arg = argv.slide || argv.s;
  let dir = 'examples/rslidy/';
  let file = 'index.html';

  if (arg) {
    // Normalize argument (remove leading/trailing slashes)
    const slideArg = arg.replace(/^\/+|\/+$/g, '');

    // If user only provides a folder (e.g. "layouts"),
    // use it as examples/<folder>/index.html
    if (!slideArg.includes('/')) {
      dir = `examples/${slideArg}/`;
      file = 'index.html';
    }
    // If user provides a partial path (e.g. "layouts/custom.html")
    else if (!slideArg.endsWith('.html')) {
      dir = `examples/${slideArg}/`;
      file = 'index.html';
    } else {
      dir = slideArg.substring(0, slideArg.lastIndexOf('/') + 1);
      file = slideArg.substring(slideArg.lastIndexOf('/') + 1);
      // Prepend "examples/" if user omitted it
      if (!dir.startsWith('examples/')) dir = `examples/${dir}`;
    }
  }

  console.log(`[Watch] Serving ${paths.build}${dir}${file}`);

  browserSync.init({
    server: {
      index: file,
      baseDir: [paths.build, paths.build + dir],
    },
    notify: false,
    reloadDebounce: 500
  });

  // --- Watchers ---
  watch(paths.src + '**/*.ts', { delay: 500 },
    series(transpile, webpack, minifyjs, compress, copy, reloadBrowser)
  );

  watch(paths.src + 'css/*.css', { delay: 500 },
    series(css, minifycss, copy)
  );

  watch([paths.src + 'examples/**/*.*', paths.src + 'tests/**/*.*'], { delay: 500 },
    series(html, copy, reloadBrowser)
  );

  watch(paths.src + 'icons/*.svg', { delay: 500 },
    series(icon_definitions, transpile, webpack, minifyjs, compress, copy, reloadBrowser)
  );
}



function updateVersionStrings() {
  return src(['src/**/*.ts', 'src/**/*.js', 'src/**/*.html', 'src/**/*.md'], { base: './' })
    .pipe(replace(/Rslidy Version [0-9]+\.[0-9]+\.[0-9]+/g, `Rslidy Version ${version}`))
    .pipe(replace(/__VERSION__/g, version))
    .pipe(dest('./'));
}
exports.updateVersionStrings = updateVersionStrings;

exports.watch = series(build, watchTask);
exports.watch.description = 'Builds and watches for changes, reloading the browser as needed';
exports.watch.flags = { '--slide | -s': 'Pass a custom slide deck (e.g., examples/rslidy-intro/index.html)' };

exports.default = build;
