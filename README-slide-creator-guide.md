# Rslidy Slide Creator Guide

Rslidy is distributed as a JavaScript file and a CSS file. Both must be
included in the `<head>` of your slide deck. You may use either the
regular (unminified) files or the minified variants. The unminified
variants are preferable during development because they are easier to
inspect and debug, while the minified variants reduce file size for
deployment.

---



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

A minimal deck containing two slides:

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

---




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

---




## 3. Slide Transitions

Rslidy supports multiple transition styles for slide changes. The chosen
transition is set by adding a class to the `<body>` element and applies
to the entire slide deck.
```html
<body class="unanimated">
```

Transition classes include:

- `slidein` (default)
- `zoom`
- `fade`
- `unanimated`

If you provide your own theme, ensure it does not override or conflict
with these animation classes.

---




## 4. Images and the Image Viewer

Images can be included like in any standard web page using the 
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

---




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
      This example uses <code>&lt;picture&gt;</code> to switch crops by
      viewport width.
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
      This example uses <code>srcset</code> and <code>sizes</code> for
      resolution switching.
    </figcaption>
  </figure>
</section>
```
---



## 6. Executable Content

Because Rslidy runs in the browser, it can execute JavaScript at runtime.
This enables integrations such as syntax highlighting, interactive
graphics, or live demos. Be aware that dynamic content may not render
well in slide thumbnails and may require special handling for printing.

Example using [highlight.js](https://highlightjs.org/)

```html
<head>
  <link rel="stylesheet" href="rslidy.min.css"/>
  <script type="module" src="rslidy.min.js"></script>

  <link rel="stylesheet" href="highlight/default.min.css">
  <script src="highlight/highlight.min.js"></script>
  <script>
    hljs.highlightAll();
  </script>
</head>

<body>
<section>
  <h1>Source Code Highlighting</h1>
  <pre><code class="language-html">&lt;section&gt;
  &lt;h1&gt;Hello&lt;/h1&gt;
&lt;/section&gt;</code></pre>
</section>
</body>
```

---



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

---



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
---




## 9. Custom Settings

Rslidy exposes configuration through `window.rslidy`. These settings 
can be overridden in the `<head>` before the deck is shown.

```html
<head>
  <link rel="stylesheet" href="rslidy.min.css"/>
  <script type="module" src="rslidy.min.js"></script>

  <script>
    window.rslidy.close_menu_on_selection = true;
    window.rslidy.close_navigation_on_selection = true;
    window.rslidy.image_viewer = false;
    window.rslidy.block_slide_text_selection = true;
    window.rslidy.show_slide_dividers = false;
  </script>
</head>
```
Common settings include:

- `image_viewer`: enables or disables the image viewer
- `close_menu_on_selection`: closes menus after selecting a menu item
- `close_menu_on_blur`: closes menus when the menu loses focus
- `close_navigation_on_selection`: closes overview/TOC after selecting an
  entry
- `show_slide_dividers`: shows or hides dividers in the progress bar
- `block_slide_text_selection`: disables text selection on slides

---



## 10. Responsive Content

Rslidy defines the responsive infrastructure for slide decks, including
viewport handling, scalable layout patterns, and responsive UI
components. However, it is the responsibility of the slide creator to
ensure that the actual slide content is authored in a responsive manner.

This includes applying the appropriate Rslidy classes to content
elements (for example responsive tables or images), avoiding custom CSS
rules that override responsive behaviour, and ensuring that layouts
remain usable across different screen sizes.

An overview of the various layout options for creating slide 
decks in Rslidy can be seen in the [Rslidy Layouts](README-layouts.md) guide.:


