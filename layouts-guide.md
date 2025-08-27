# Rslidy Slide Layout Guide

This guide demonstrates how to create slides using Rslidy, focusing 
on common use cases: responsive images, responsive tables, multiple 
columns, source code highlighting, and live code integration.



## 1. Title Slide
Use the `titleslide` class for a well-structured introduction slide. 
Add titles, subtitles, author information, and copyright/license.

**Example**:
```html
<section class="titleslide">
  <h1>Rslidy Layouts</h1>
  <h2>Titleslide</h2>
  <h4>Graz University of Technology, Austria</h4>
  <div id="licence">
    <p>
      © Copyright 2024 by the author(s).<br/>
      Licensed under
      <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.
    </p>
  </div>
</section>
```

## 2. Simple Bullet Points
```html
<section>
  <h1>Simple Bullet Points</h1>
  <ul>
    <li>Example Bullet Point 1</li>
    <li>Example Bullet Point 2</li>
    <li>Example Bullet Point 3</li>
    <li>Example Bullet Point 4</li>
    <li>Example Bullet Point 5</li>
  </ul>
</section>
```

## 3. Responsive Images
Rslidy supports responsive images that scale with the viewport. Use 
`<img>` tags within a `<figure>` element and apply classes like `rslidy-large-images` for styling.

**Example**:
```html
<section>
  <h2>Image Viewer</h2>
  <figure>
    <div class="rslidy-rslidy-large-images">
      <img src="images/image_viewer_example_slide.png" alt="Rslidy Image Viewer"/>
    </div>
    <figcaption>
      The image viewer is automatically attached to every image.<br/>
      Pan and zoom via mouse, keyboard, or on-screen controls.<br/>
      <span class="credit">Screen capture taken from Rslidy.</span>
    </figcaption>
  </figure>
</section>
```


## 4. Video Layouts
Embed videos using `<video>` within a figure.
**Example**:
```html
<section>
  <h2>Single Video Layout</h2>
  <figure>
    <div class="rslidy-large-images">
      <video controls autoplay muted loop poster="images/all-slides.gif">
        <source src="images/image-viewer.mp4" type="video/mp4"/>
        <img src="images/image-viewer.gif" alt="Fallback preview image"/>
      </video>
    </div>
    <figcaption>
      Showing the image viewer as an mp4 video.<br/>
      <span class="credit">Screen capture taken from Rslidy.</span>
    </figcaption>
  </figure>
</section>
```

## 5. Responsive Table
Create responsive tables using the `rslidy-responsive-table` class.

**Example ** (Comparison Table):
```html
<section>
  <h1>Responsive Tables with CSS Styling</h1>
    <table class="rslidy-responsive-table">
      <thead>
        <tr>
          <th scope="col">Feature</th>
          <th scope="col">Shower</th>
          <th scope="col">Reveal.js</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text">
          <td>Collaborative</td>
          <td><span class="table-cross">✘</span></td>
          <td><span class="table-cross">✘</span></td>
        </tr>
        <tr class="text">
          <td>SVG Inclusion</td>
          <td><span class="table-tick">✔</span></td>
          <td><span class="table-tick">✔</span></td>
        </tr>
      </tbody>
    </table>
</section>
```
The `data-label` values are automatically added via JavaScript assuming 
your table includes a proper `<thead>` with `<th scope="col">` headers. 
You can also add a `<caption>` element for table descriptions.

Adding the class `rslidy-disable-sorting` to 
`rslidy-responsive-table` disables the sorting feature.

## 6. Two Columns
Use the `rslidy-rslidy-columns-even` class and the classes 
`rslidy-rslidy-left-column` and `rslidy-rslidy-right-column` to 
create two-column layouts.

**Example**:
```html
<section>
  <h1>Two-Columns Bullet Points</h1>
  <div class="rslidy-rslidy-columns-even">
    <div class="rslidy-rslidy-left-column">
      <ul>
        <li>Example Bullet Point 1</li>
        <li>Example Bullet Point 2</li>
        <li>Example Bullet Point 3</li>
        <li>Example Bullet Point 4</li>
        <li>Example Bullet Point 5</li>
      </ul>
    </div>
    <div class="rslidy-right-column">
      <ul>
        <li>Example Bullet Point 1</li>
        <li>Example Bullet Point 2</li>
        <li>Example Bullet Point 3</li>
        <li>Example Bullet Point 4</li>
        <li>Example Bullet Point 5</li>
      </ul>
    </div>
  </div>
</section>
```


## 7. Source Code Highlighting
Rslidy uses Prism.js for syntax highlighting. Wrap code in `<pre><code>` tags with the appropriate `language-<lang>` class for displayed code, or use `<code>` for inline snippets.

**Example 1** (HTML Code):
```html
<section>
  <h1>Source Code Highlighting using Prism.js</h1>
  <p>Displayed code snippets:</p>
  <pre><code class="language-html"><body>
    <section id="code-example">
      <h1>Source Code Highlighting!</h1>
      <h2>Or through third-party tools.</h2>
    </section>
  </body></code></pre>
  <p>Inline code snippets:
    <code class="language-css">background-colour: rgba(0, 0, 0, 0.9);</code></p>
</section>
```

**Example 2** (JavaScript Code):
```html
<section>
  <h2>JavaScript Example</h2>
  <pre><code class="language-javascript">function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}</code></pre>
</section>
```
Use `language-html`, `language-css`, `language-javascript`, etc., for syntax highlighting. Include `prism.css` and `prism.js` in the `<head>`.

## 8. Live Code with Hypertree or RespVis charts
Embed interactive content using `<script>` tags. Examples include visualisations like D3-based hypertrees or RespVis charts, which require external scripts and data files.

**Example 1** (D3 Hypertree):
```html
<section>
  <h1>Including Live Code for Interactive Content</h1>
  <div id="tree"></div>
  <script src="hypertree/d3-hypertree.js"></script>
  <link rel="stylesheet" href="hypertree/d3-hypertree-light.css">
  <link rel="stylesheet" href="hypertree/d3-hypertree-config.css"/>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const ht = new hyt.Hypertree(
        { parent: document.querySelector('#tree') },
        {
          dataloader: hyt.loaders.fromFile('hypertree/products.d3.json'),
          langInitBFS: (ht, n) => n.precalc.label = n.data.name,
          layout: { rootWedge: { angle: 6.283184 } },
          filter: { maxlabels: 55 },
          interaction: {
            λbounds: [.3, .84],
            onNodeClick: (n, m, l) => {
              ht.api.goto({ re: -n.layout.z.re, im: -n.layout.z.im }, null)
                .then(() => ht.drawDetailFrame())
            }
          }
        }
      );
      ht.initPromise.then(() => new Promise((ok, err) => ht.animateUp(ok, err)))
        .then(() => ht.drawDetailFrame());
    });
  </script>
  <footer class="footer">
    [Requires a server to load data files.]
  </footer>
</section>
```

**Example 2** (RespVis Bar Chart):
```html
<section class="bar-chart">
  <h1>Responsive Charts using RespVis</h1>
  <div id="chart"></div>
  <link rel="stylesheet" href="respvis/respvis.css"/>
  <link rel="stylesheet" href="respvis/grouped-barchart.css"/>
  <script type="module">
    import { renderGroupedBarChart } from "./respvis/grouped-barchart.js";
    document.addEventListener('DOMContentLoaded', () => {
      const chartElement = document.querySelector('#chart');
      if (chartElement) {
        renderGroupedBarChart('#chart');
      } else {
        console.error('#chart element not found');
      }
    });
  </script>
  <div class="credits">
    <p>Adapted from RespVis example<br/>
      <a href="https://respvis-dev.netlify.app/barcharts/grouped-barchart/grouped-barchart">
        <code>https://respvis-dev.netlify.app/barcharts/grouped-barchart/grouped-barchart</code></a>
    </p>
  </div>
</section>
```
## Additional Notes
- **Slide Structure**: Define slides using `<section>` elements. Use `<div class="slide">` as an alternative.
- **Dependencies**: Include `rslidy.min.css`, `rslidy.min.js`, and Prism.js for code highlighting in the `<head>`.
- **Accessibility**: Use semantic HTML (e.g., `<figure>`, `<figcaption>`, `data-label`) and ARIA roles for better accessibility.
- External Libraries: For external libraries like Hypertree or 
  RespVis, review and adapt their CSS styling (e.g., d3-hypertree-light.css, respvis.css) to match your slide deck’s design and ensure compatibility with Rslidy’s layout.
- **Testing**: Host slides on a server for features like live code that require data loading. Test responsiveness across devices.

Back to the [Rslidy GitHub repository](https://github.com/tugraz-isds/rslidy).