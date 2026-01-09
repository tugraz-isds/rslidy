
# Rslidy Developer Guide

This guide provides developers with details on how to build, test, and
contribute to Rslidy, the lightweight HTML presentation framework.


## 1 Development Setup

Clone the repository and install dependencies:
```
git clone https://github.com/tugraz-isds/rslidy.git
cd rslidy
npm install
```

Rslidy uses Gulp as a task runner and Webpack as a module bundler.
Together, these tools define a reproducible build pipeline that covers
TypeScript compilation, asset processing, bundling, optimisation,
minification, and local development support. All build logic is defined 
in the `gulpfile.js` file.

All Gulp tasks should be executed via PNPM using `pnpm exec gulp <task>`.

## 2 Gulp Tasks Overview

While using the `build` and `watch` tasks is usually sufficient during
development, these tasks are composed of several smaller steps. The
complete set of Gulp tasks defined in the `gulpfile.js` is as follows:

- `clean`  
  Removes build artifacts, including the TypeScript output in
  `src/ts/build/` and the compiled `build/` directory.

- `transpile`  
  Transpiles all TypeScript source files into JavaScript and generates
  corresponding declaration files.

- `webpack`  
  Bundles the transpiled JavaScript into the `rslidy.js` file and
  generates distributable builds for ESM, CommonJS, and UMD
  formats.

- `css`  
  Concatenates all CSS source files into a single `rslidy.css` file.

- `icons`  
  Optimises SVG files located in `src/icons/` and generates the
  corresponding `icon-definitions.ts` file used by the TypeScript
  codebase.

- `html`  
  Copies example and test HTML files, including stress tests, into the
  build directory.

- `minifyjs`  
  Produces minified JavaScript bundles for all module formats.

- `minifycss`  
  Produces a minified version of the main CSS file and streams updates
  into BrowserSync during development.

- `compress`  
  Generates compressed variants of the minified JavaScript files to
  evaluate distribution size.

- `copy`  
  Copies the default ESM build and CSS files into all example and test
  folders.

- `build`  
  Executes the full build pipeline in a defined order and produces all
  distributable artifacts.

- `watch`  
  Starts a local development server using BrowserSync and automatically
  rebuilds and reloads the browser when source files change. A specific
  slide deck can be served using the `--slide` (or `-s`) flag.


## 3 Build Output

After building, artifacts are stored in the `build/library/` directory:

- `esm/rslidy.js` and `esm/rslidy.min.js` → ES Modules
- `cjs/rslidy.js` and `cjs/rslidy.min.js` → CommonJS Modules
- `umd/rslidy.js` and `umd/rslidy.min.js` → Universal Module Definition

Additionally, `rslidy.css` and `rslidy.min.css` are placed in the
`library/` folder.



Also, the `rslidy.min.js` file from the ESM build is automatically
copied into every example and test folder, since it is the 
recommended standard.

ESM modules must be served over HTTP(S) (for example via a local 
server or live-server) and will not work if opened directly from a 
folder in a browser.
You can quickly start a local server in any directory using Python:
```
python3 -m http.server 8000
```

Then open your browser at:
```
http://localhost:8000
```



## 4 Development Dependencies

Rslidy does not rely on external runtime dependencies. The presentation
framework itself is distributed as prebuilt JavaScript and CSS files.
All additional packages are required exclusively for development,
building, and testing, and are defined in the `package.json` file.

These development dependencies support the build pipeline and can be
categorised by their primary purpose:

- **Node.js, PNPM, and Gulp**  
  Provide the execution environment and task runner used to define and
  orchestrate the build pipeline.

- **TypeScript and gulp-typescript**  
  Used to transpile the TypeScript source code into JavaScript and to
  generate declaration files for development and tooling support.

- **Webpack and webpack-stream**  
  Bundle the transpiled JavaScript modules into distributable builds in
  ESM, CommonJS, and UMD formats.

- **BrowserSync**  
  Provides a local development server and enables live reloading during
  the `watch` task whenever source files are modified.

- **File system and utility tools**  
  Packages such as `del`, `merge2`, `gulp-concat`, `gulp-rename`, and
  `gulp-replace` support file management tasks, including cleaning build
  directories, concatenating assets, renaming outputs, and applying
  textual transformations.

- **Minification and compression tools**  
  `gulp-terser` and `gulp-uglifycss` are used to generate minified
  JavaScript and CSS files. `gulp-gzip` and `gulp-brotli` are used to
  create compressed versions and to evaluate compressed file sizes.

- **Icon and encoding utilities**  
  `utf-8-validate` supports validation of encoded assets used in the
  build process.

- **Command-line argument handling**  
  `yargs` is used to parse command-line arguments passed to Gulp tasks,
  for example when specifying a custom slide deck via the `--slide`
  option.**



