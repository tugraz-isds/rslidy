
# Rslidy

Rslidy: Lightweight, accessible, and responsive HTML5 slide decks.


## 1 Introduction

Rslidy is a presentation tool using HTML5, CSS3, and TypeScript which
runs directly inside the web browser. Slides are created within sections
inside the HTML5 body element and are presented one at a time with
transitions.


## 2 Features

- Use standard HTML5 elements to create slides.
For an introduction to HTML5, see
[HTML Dog](https://htmldog.com/)
or
[HTML5 Intro](https://w3schools.com/html/html5_intro.asp).

- Slide navigation.
- Slide overview.
- Table of contents.
- Responsive design.
- Responsive interactions (incl. shake and tilt).
- Image viewer (incl. zoom and pan).
- Support for CSS styles:
  - Animations
  - Fonts
  - Colours
- Accessibility through ARIA roles.
- Live code can be embedded.



## 3 Installation and Setup

Download the latest binary release
[here](https://github.com/tugraz-isds/rslidy/releases/latest).


To install and build Rslidy from source, use the following commands:

```bash
git clone "https://github.com/tugraz-isds/rslidy.git"
```
Then, in the rslidy folder, run:

```bash
npm i -g gulp
npm i
gulp
```

The `rslidy/build` folder will then contain Rslidy's main files, as
well as some example presentations, which can be copied and adapted to
create new slide decks.



### 3.1 For Slide Viewers

The Help Panel in an Rslidy presentation contains an overview of
Rslidy's interface controls.



### 3.2 For Slide Creators

#### How to create a Presentation

To create a new slide deck with Rslidy, a HTML file is constructed
containing the set of slides. Rslidy's own code is contained within
two files: JavaScript code in rslidy.js (or rslidy.min.js) and CSS
code in rslidy.css (or rslidy.min.css) which must both be included in
the HTML file:

```html
<link rel="stylesheet" href="rslidy.min.css" />
<script src="rslidy.min.js" />
```

Rslidy is self-contained, there are no additional dependencies.



##### Creating a Slide

Slide content is placed within the HTML body, each slide
inside either a `<section>` or `<div class="slide">` element:

```html
<section>
<h1>Characteristics of Software</h1>
<p>
Three characteristics of software:
</p>
<ul>
<li>fast</li>
<li>cheap</li>
<li>good</li>
</ul>
<p>
Choose any two!
</p>
</section>
```

```html
<div class="slide">
<h1>Further Information</h1>
<p>
A paragraph of text.
</p>
</div>
```


##### Lists

```html
<section>
<h1>Slide Heading</h1>
<ul>
<li>First point</li>
<li>Second point</li>
<li>Third point</li>
</ul>
</section>
```
To make list items appear one at a time, use the
`<ul class="incremental">` instead of `<ul>`.


##### Animated Slide Transitions

There are currently four transition types between slides:
- `slidein` (default)
- `fade`
- `zoom`
- `unanimated`

The desired transition type is added to the body element:

```html
<body class="fade">
```

```html
<body class="unanimated">
```


##### Images

Images can be included within slides using the standard HTML `<img>`
element:

```html
<section>
<h1>Image Demo</h1>
<img width="30em" src="images/collage.svg" />
</section>
```

Rslidy's image viewer is automatically associated with every image.



#### Custom Settings

A number of internal Rslidy settings can be directly overridden using
JavaScript, as shown below:

```html
<script>
  window.rslidy.close_menu_on_selection = true;
  window.rslidy.close_navigation_on_selection = true;
  window.rslidy.start_with_status_bar_minimized = true;
  window.rslidy.image_viewer = false;
  window.rslidy.start_in_low_light_mode = true;
  window.rslidy.block_slide_text_selection = true;
  window.rslidy.show_slide_dividers = false;
</script>
```

For more information, see the example file `overrides.html`.



### 3.3 For Developers


#### The Build System
To build the project use:

```bash
gulp build
```
Build may be omitted, since it is the default gulp task.
There is also a gulp task using `Browsersync` and `gulp watch`
for more convenient development.

```bash
gulp watch
```
This task will initialise a build and synchronise the
browser content every time a source files changes.

`notes.html` will be shown as default presentation, however, with
`--slide <file>` a specific file can be synchronised. The file has to
be in the `examples/tests` directory.

```bash
gulp watch --slide <file>
```

#### Updating Icons

To commit changes from the icons located in `src/icons` to Rslidy, the
following gulp task has to be run:

```bash
gulp icons
```

This creates or updates the file `src/ts/icon-definitions.ts` with
optimised SVG icon strings.




## 4 Rslidy Team

The following people have contributed to Rslidy:

- Keith Andrews
  [kandrews@iicm.edu](mailto:kandrews@iicm.edu?subject=Rslidy)  
  Project Leader

- Patrick Hipp  
  Master's Thesis, main developer

- Christopher Kopel  

- Angelika Droisner, Ana Korotaj  
  IAweb WS 2018 G1a

- Thomas Eibl, Michael Glatzhofer, Christoph Heidenreich, Verena Schiffer  
  IAweb WS 2017 G1

- Rok Kogovšek, Alexei Kruglov, Fernando Pulido Ruiz, Helmut Zöhrer  
  IAweb WS 2016 G5

- Markus Schofnegger  
  BSc 02 Nov 2015

- Filippo Garolla, Sabine Lukas, Matthias Schlesinger, Karin Wilding  
  IAweb WS 2014 G1

- Elias Zeitfogel, Patrick Kasper, Karina Priebernig, Clemens Meinhart  
  IAweb WS 2013 G4


