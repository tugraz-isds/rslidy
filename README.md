
# Rslidy

Rslidy: Lightweight, Accessible, and Responsive HTML5 Slide Decks


## 1 Introduction

Rslidy is a presentation tool using HTML5, CSS3, and Typescript running
directly in your browser. Slides are contained within the HTML5
body and are decorated with typical presentation tools.


## 2 Features

- Use the power of HTML5 for your slides.
For further information see w3schools'
[HTML5 Into](https://www.w3schools.com/html/html5_intro.asp)
- Navigation
- Slide overview
- Table of contents
- Responsive design
- Responsive interactions (incl. shake & tilt)
- Image viewer (incl. zoom & pan)
- Support for CSS styles
    - Animations
    - Fonts
    - Colors
- Accessibility
- Runnable code


## 3 Installation & Setup

To install and build Rslidy, use the following commands:

```bash
git clone "<repo url>"
npm i -g gulp
npm i
gulp
```

Go into the `rslidy/build` folder to find Rslidy's main files, as well
as some examples. Feel free to copy, rename, and adapt one of the
example files to quickly create your own presentation.

### 3.1 For Slide Viewers

Instructions on how to navigate Rslidy can be read on the help panel.

### 3.2 For Slide Creators

#### How to create a Presentation
This section explains how to create a presentation with Rslidy.

To use Rslidy for a presentation, the rslidy.js file and the corresponding
CSS file have to be included in your HTML file, which should also
contain the presentation itself.

The following HTML head tags are necessary to include Rslidy:
```html
<link  href="rslidy.min.css" rel="stylesheet"/>
<script src="rslidy.min.js"/>
```

##### Creating a Slide
Slide content is placed within the HTML body, using either
`<div class="slide">` or `<section>`.


```html
<div class="slide">
  <h1>Hello Slide World!</h1>
  <p>Add more text to your responsive HTML5 slide</p>
</div>
```

```html
<section>
  <h1>Hello Slide World!</h1>
  <p>Add more text to your responsive HTML5 slide</p>
</section>
```

##### Lists
```html
<div class="slide">
  <h1>Slide Heading</h1>
  <ul>
    <li>First point</li>
    <li>Second point</li>
    <li>Third point</li>
  </ul>
</div>
```
To make list items appear one at a time, use the
`<ul class="incremental">` instead of `<ul>`.

##### Animated Slide Transitions
Currently there are three different transition types:
- `slidein` (default)
- `fade`
- `zoom`

To enable them, add your desired transition type to the body like so:

```html
<body class="fade">
```

To disable all animations add the class `unanimated` instead:

```html
<body class="unanimated">
```

##### Images

Images can simply be included into slides as shown in the code below.
The image viewer component of Rslidy is automatically attached.

```html
<div class="slide">
  <h1>Image Demo</h1>
  <img width="300px" src="images/collage-object.svg" />
</div>
```

#### Custom Settings

A number of internal Rslidy settings can be directly overridden using
JavaScript, as shown below.

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

For more information see the `overrides.html` example file.



### 3.3 For Developers


#### The Build System
To build the project use:

```bash
gulp build
```
Build may be omitted since it's the default gulp task.
There is also a gulp task using `Browsersync` and `gulp watch`
for more convenient development.

```bash
gulp watch
```
This task will initialize a build and synchronise the
browser content every time any of the source files changes.

`notes.html` will be shown as default presentation, however, with
`--slide <file>` a specific file can be synchronized. The file has to
be in the `examples/tests` directory.

```bash
gulp watch --slide <file>
```

#### Updating Icons

To commit changes from the icons located in `src/icons` to Rslidy, the
following gulp task has to be run.

```bash
gulp icons
```

This creates or updates the file `src/ts/icon-definitions.ts` with
optimised svg icon strings.



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


