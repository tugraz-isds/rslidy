# Rslidy Slide Creator Guide

Rslidy is distributed as a JavaScript file and a CSS file. Both must be
included in the `<head>` of your slide deck. You may use either the
regular (unminified) files or the minified variants. The unminified
variants are preferable during development because they are easier to
inspect and debug, while the minified variants reduce file size for
deployment.




## 1. Overall Structure

To create a presentation with Rslidy, include the CSS and JavaScript and
write each slide as a `<section>` (recommended) or as a
`<div class="slide">` element.
The JavaScript is typically loaded as an ES module (ESM).

```html
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>

  <title>Rslidy deck</title>

  <link rel="stylesheet" href="rslidy.min.css"/>
  <script type="module" src="rslidy.min.js"></script>
</head>
```

A minimal slide deck containing two slides:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Rslidy deck</title>

  <link rel="stylesheet" href="rslidy.min.css"/>
  <script type="module" src="rslidy.min.js"></script>
</head>

<body>

<section>
  <h1>Welcome!</h1>
</section>

<section>
  <h1>Slide Heading</h1>
  <ul class="rslidy-incremental">
    <li>First point</li>
    <li>Second point</li>
    <li>Third point</li>
  </ul>
</section>

</body>
</html>
```





## 2. Incremental Display of List Items

To reveal list items one at a time, apply the class
`rslidy-incremental` to an unordered (`<ul>`) or ordered (`<ol>`) list.

```html
<section>
  <h1>Incremental List</h1>
  <ul class="rslidy-incremental">
    <li>First point</li>
    <li>Second point</li>
    <li>Third point</li>
  </ul>
</section>
```






## 3. Slide Transitions

Rslidy supports four different slide transition styles. The chosen
transition is set by adding a class to the `<body>` element and applies
to the entire slide deck.
```html
<body class="unanimated">
```

The animation classes are:

- `slidein` (default)
- `zoom`
- `fade`
- `unanimated`

If you provide your own theme, ensure it does not override or conflict
with these animation classes.






## 4. Images and the Image Viewer

Images can be included using the 
`<img>` element. Rslidy attaches an image viewer to images by
default, enabling pan and zoom interactions via mouse, keyboard, or
on-screen controls.

A typical figure pattern:

```html
<section>
  <h1>Image Example</h1>
  <figure>
    <div class="rslidy-large-images">
      <img src="images/example.png" alt="Descriptive alternative text"/>
    </div>
    <figcaption>
      Keep captions concise and include credits where required.
    </figcaption>
  </figure>
</section>
```






## 5. Responsive Images

Rslidy supports responsive slide layouts, but the slide creator remains
responsible for providing responsive media assets. Two common patterns
are art direction with the `<picture>` element and resolution switching 
with the `srcset`/`sizes` attributes.




### 5.1 Responsive Image Art Direction

Use the `<picture>` element to deliver different crops for different 
viewport sizes.

```html
<section>
  <h1>Responsive Image (Art Direction)</h1>

  <figure>
    <div class="rslidy-large-images">
      <picture>
        <source media="(max-width: 40rem)"
                srcset="images/graz-uhrturm-narrow.jpg">
        <source media="(max-width: 80rem)"
                srcset="images/graz-uhrturm-medium.jpg">
        <img src="images/graz-uhrturm.jpg"
             alt="Graz Clock Tower in multiple crops.">
      </picture>
    </div>

    <figcaption>
      This example uses <code><picture></code> element to switch crops by viewport width.
    </figcaption>
  </figure>
</section>
```



### 5.2 Responsive Image Resolution Switching

Use the `srcset` and `sizes` attributes so the browser selects an 
appropriate image  resolution based on viewport size and display 
density.

```html
<section>
  <h1>Responsive Image (Resolution Switching)</h1>

  <figure>
    <div class="rslidy-large-images">
      <img
        src="images/graz-uhrturm.jpg"
        srcset="
          images/graz-uhrturm-480.jpg 480w,
          images/graz-uhrturm-800.jpg 800w,
          images/graz-uhrturm-1200.jpg 1200w
        "
        sizes="
          (max-width: 40rem) 25vw,
          (max-width: 60rem) 75vw,
          100vw
        "
        alt="The clock tower overlooking the city of Graz.">
    </div>

    <figcaption>
      This example uses the attributes <code>srcset</code> and 
      <code>sizes</code> for resolution switching.
    </figcaption>
  </figure>
</section>
```




## 6. Interactive Content


Because Rslidy runs in the browser, it can execute JavaScript at runtime.
This enables integrations such as syntax highlighting, interactive
graphics, or live code. Be aware that dynamic content may not render
well in slide thumbnails and may require special handling for printing.

Source Code Highlighting using [Prism.js](https://prismjs.com/):

```html
<head>
<link rel="stylesheet" href="rslidy.min.css"/>
<script type="module" src="rslidy.min.js"></script>

<!-- Prism.js -->
<link rel="stylesheet" href="prism/prism.css"/>
<script src="prism/prism.js"></script>
</head>

<body>
<section>
<h1>Source Code Highlighting</h1>

<pre>
  <code class="language-html">
    <section>
      <h1>Hello</h1>
    </section>
  </code>
</pre>
</section>
</body>
```
For this Prism.js integration to work, the slide deck must include the
Prism assets (for example as `prism/prism.css` and `prism/prism.js`)
relative to the HTML file. The `<code>` elements must declare a language
class such as language-html, language-javascript, or language-css.
If additional languages or plugins are required, the corresponding Prism
components must be included as well.





Including live JS code using [D3-Hypertree](https://github.com/glouwa/d3-hypertree):
```html
<script src="hypertree/d3-hypertree.js"></script>

<link rel="stylesheet" href="hypertree/d3-hypertree-light.css"/>
<link rel="stylesheet" href="hypertree/d3-hypertree-config.css"/>


<section>
<h1>Including Live Code for Interactive Content</h1>
<div id="tree"></div>
</section>
<script>
document.addEventListener('DOMContentLoaded', function() {
const ht = new hyt.Hypertree(
{
parent: document.querySelector('#tree')
},
{
dataloader: hyt.loaders.fromFile('hypertree/products.d3.json'),
langInitBFS: (ht, n) => n.precalc.label = n.data.name,

layout: {
rootWedge: {
angle: 6.283184,
}
},

filter: {
maxlabels: 55
},

geometry: {
layerOptions: {
'stem-arc': {
invisible: true,
hideOnDrag: true,
},
'center-node': {
invisible: true,
hideOnDrag: true,
},
'labels-force':
{
invisible: true,
hideOnDrag: true,
},
'labels':
{
invisible: false,
hideOnDrag: false,
}

},
},

interaction: {
λbounds: [.3, .84],
onNodeClick: (n, m, l) => {
ht.api.goto({ re: -n.layout.z.re, im: -n.layout.z.im }, null)
.then(() => ht.drawDetailFrame())
}
}
}
)

ht.initPromise
.then(() => new Promise((ok, err) => ht.animateUp(ok, err)))
.then(() => ht.drawDetailFrame())
.then(() => {
document.documentElement.classList.add('rslidy-ready');
});
});
</script>
```

For the Hypertree to work, the assets must be available locally at the 
referenced paths.
The JSON data file must also be reachable at
`hypertree/products.d3.json`.

The slide deck has to be served over HTTP(S) (not opened via file://),
because the data loader needs to fetch the JSON file.




## 7. Responsive Tables

Use the `rslidy-responsive-table` class to create responsive, sortable
tables that adapt to any screen size. Sorting is provided **only** for
tables that use this class. On wide screens, tables are sorted via
clickable column headers, while on narrow screens a mobile sorting
heading with a column selector and direction buttons is shown.

The active sort column and direction are shared between desktop and
mobile interfaces. Sorting can be disabled explicitly by adding
the `rslidy-disable-sorting` class to the table element.

For improved readability, combine `rslidy-responsive-table` with
`rslidy-responsive-table-text-scaling` for automatic font-size scaling
and with the `zebra` class for alternating row colours. The
`rslidy-text` class left-aligns textual content, while
`rslidy-numeric` right-aligns numeric values for easier comparison.

On narrow viewports, tables switch to a stacked layout. If table headers
are declared using `scope="col"`, Rslidy automatically derives and
injects the corresponding `data-label` attributes for each table cell,
ensuring that table content remains clearly labelled on mobile devices.

```html
<section>
  <h1>Responsive Table</h1>

  <table class="rslidy-responsive-table rslidy-responsive-table-text-scaling">
    <thead>
      <tr>
        <th scope="col" class="rslidy-text">Name</th>
        <th scope="col" class="rslidy-numeric">Value</th>
        <th scope="col" class="rslidy-text">Date</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td class="rslidy-text">Example A</td>
        <td class="rslidy-numeric">42</td>
        <td class="rslidy-text">2026-01-05</td>
      </tr>
    </tbody>
  </table>
</section>
```





## 8. Themes and Colour Schemes

Rslidy supports themes via additional CSS files. Themes are applied by
including the theme stylesheet after `rslidy.min.css`, allowing it to
override the default styles. Example themes are provided in the
`build/library/themes/` directory.

```html
<link rel="stylesheet" href="rslidy.min.css"/>
<link rel="stylesheet" href="themes/tu-graz/theme.css"/>
<script type="module" src="rslidy.min.js"></script>

```html
<link rel="stylesheet" href="rslidy.min.css"/>
<link rel="stylesheet" href="themes/tu-graz/theme.css"/>
<script type="module" src="rslidy.min.js"></script>
```





## 9. Custom Settings

Rslidy exposes configuration through `window.rslidy`. These settings can
be overridden in the `<head>` before the deck is shown. Custom settings
offer a way of tweaking Rslidy’s internal behaviour.

```html
<head>
  <link rel="stylesheet" href="rslidy.min.css"/>
  <script type="module" src="rslidy.min.js"></script>

  <script>
    window.rslidy.close_menu_on_selection = true;
    window.rslidy.close_navigation_on_selection = true;
    window.rslidy.start_with_status_bar_minimized = true;
    window.rslidy.image_viewer = false;
    window.rslidy.block_slide_text_selection = true;
    window.rslidy.show_slide_dividers = false;
  </script>
</head>
```
These are the available settings:

- `image_viewer`:  
  If set to `false`, disables the image viewer component.  
  The default value is `true`.

- `close_menu_on_selection`:  
  If set to `true`, menus are closed automatically after a menu item has
  been selected.  
  The default value is `false`.

- `close_menu_on_blur`:  
  If set to `true`, menus are closed when they lose focus.  
  The default value is `true`.

- `close_navigation_on_selection`:  
  If set to `true`, the Slide Overview Panel and the Table of Contents
  Panel are closed after a slide has been selected.  
  The default value is `false`.

- `show_slide_dividers`:  
  If set to `true`, visual dividers between slides are shown in the
  progress bar.  
  The default value is `true`.


- `start_with_toolbar_minimized`:  
  If set to `true`, Rslidy starts with the toolbar minimised.  
  The default value is `false`.

---

## 10. Advanced Custom Settings
Advanced custom settings allow direct adjustment of internal variables
that affect scaling, interaction thresholds, and gesture handling. They
must also be overridden using JavaScript. These are the settings:

- `custom_aspect_ratio`:  
  Sets the aspect ratio for slide thumbnails. The default is `4:3`.  
  A value of `0` enables automatic calculation, which may cause scaling
  issues. Values greater than zero use `custom_width` for scaling.

- `overview_slide_zoom`:  
  Sets a zoom factor for slide thumbnails in the Slide Overview Panel.
  A value of `1` disables zooming.

- `doubletap_delay`:  
  Maximum delay between taps for a double-tap gesture, in milliseconds.
  The default value is `200`.

- `min_slide_font`:  
  Minimum font size allowed by the internal font scaling mechanism.
  The default value is `0.1em`.

- `max_slide_font`:  
  Maximum font size allowed by the internal font scaling mechanism.
  The default value is `5em`.

- `font_step`:  
  Step size used by the internal font scaling mechanism.
  The default value is `0.1em`.

- `swipe_max_duration`:  
  Maximum duration of a swipe gesture in milliseconds.
  The default value is `400`.

- `swipe_threshold`:  
  Minimum swipe distance, in `rem`, required to trigger a swipe.
  The default value is `3.75rem`.

- `swipe_y_limiter`:  
  Ratio between horizontal and vertical swipe distance required for a
  gesture to count as a swipe. The default value is `1`.

- `shake_sensitivity`:  
  Sensitivity of the shake gesture detection.
  The default value is `0.8`.

- `required_shakes`:  
  Number of consecutive shakes required to trigger the shake gesture.
  The default value is `4`.

- `print_frame`:  
  CSS definition of the slide frame used when printing.
  The default value is `0.05rem solid black`.



## 11. Responsive Content

Rslidy defines the responsive infrastructure for slide decks, including
viewport handling, scalable layout patterns, and responsive UI
components. However, it is the responsibility of the slide creator to
ensure that the actual slide content is authored in a responsive manner.

This includes applying the appropriate Rslidy classes to content
elements (for example responsive tables or images), avoiding custom CSS
rules that override responsive behaviour, and ensuring that layouts
remain usable across different screen sizes.

An overview of various layout options for creating slide 
decks in Rslidy can be seen in the [Rslidy Layouts](README-layouts.md) guide.:


