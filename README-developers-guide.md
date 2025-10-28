
# Rslidy Developer's Guide

This guide provides developers with details on how to build, test, and
contribute to Rslidy, the lightweight HTML presentation framework.


## 1 Development Setup

Clone the repository and install dependencies:
```
git clone https://github.com/tugraz-isds/rslidy.git
cd rslidy
npm install
```

Rslidy uses Gulp and Webpack for building and managing tasks. All
relevant tasks are defined in the `gulpfile.js`.



## 2 Gulp Tasks Overview

The `gulpfile.js` defines eight main tasks.


### 2.1 Cleaning

`gulp clean`: Removes the TypeScript build output (`src/ts/build/`)
and the compiled build folder (`build/`).


### 2.2 TypeScript Compilation

`transpile`: Compiles `.ts` files into JavaScript and generates
declaration files in `src/ts/build/`.


### 2.3 Webpack Bundling

`webpack`: Creates three library builds from the transpiled sources:
  - ESM → `build/library/esm/rslidy.js`
  - CommonJS → `build/library/cjs/rslidy.js`
  - UMD → `build/library/umd/rslidy.js`

Each build includes a version banner and source maps.


### 2.4 Minification & Compression

- `minifyjs`: Minifies ESM, CJS, and UMD bundles, appending `.min.js`.
- `minifycss`: Minifies `rslidy.css` into `rslidy.min.css` and streams changes into BrowserSync.
- `compress`: Gzips all `.min.js` bundles to check their size.


### 2.5 CSS & Icons

`css`: Concatenates all CSS files into `rslidy.css` and writes it into the library folder.
`gulp icons`: Reads all SVG files in `src/icons`, optimises them, and generates `src/ts/icon-definitions.ts`.


### 2.6 HTML & Copy

`html`: Copies example and test HTML files (including stress tests) into the build folder.
`copy`: Places the default **ESM `rslidy.min.js`** and `rslidy.min.css` into every example and test folder, since ESM is the standard format.


### 2.7 Build Task

`gulp build`: Runs the full pipeline:  
`clean → transpile & webpack → html & css → minifyjs & minifycss → compress → copy`.

### 2.8 Watch & Serve

`gulp watch`: Builds the project, starts a local BrowserSync server,
and automatically reloads on file changes.
  - Watches `.ts`, `.css`, `.svg`, and example/test files.
  - Supports a custom slide deck with:
    ```
    gulp watch --slide examples/rslidy-intro/index.html
    ```


## 3 Build Output

After building, artifacts are stored in the `build/library/` directory:

- `esm/rslidy.js` and `esm/rslidy.min.js` → ES Modules
- `cjs/rslidy.js` and `cjs/rslidy.min.js` → CommonJS Modules
- `umd/rslidy.js` and `umd/rslidy.min.js` → Universal Module Definition

Additionally, `rslidy.css` and `rslidy.min.css` are placed in the
`library/` folder.



The ESM build is the default and recommended standard, as it is the 
most modern format supported by browsers and bundlers.

ESM modules must be served over HTTP(S) (for example via a local 
server or live-server) and will not work if opened directly from a 
folder in a browser.
You can quickly start a local server in any directory using Python:
```
# For Python 3.x
python3 -m http.server 8000
```

Then open your browser at:
```
http://localhost:8000
```

Also, the `rslidy.min.js` file from the ESM build is automatically
copied into every example and test folder, since it is the standard
for Rslidy.



