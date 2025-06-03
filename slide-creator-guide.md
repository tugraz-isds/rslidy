# Rslidy Slide Creator Guide

This guide demonstrates how to create slides using Rslidy, focusing on common use cases: responsive images, responsive tables, multiple columns, source code highlighting, and live code. Examples are drawn from the provided HTML slide deck, adapted for British English.

## 1. Responsive Images
Rslidy supports responsive images that scale with the viewport. Use 
`<img>` tags within a `<figure>` element and apply classes like `large-images` for styling.

**Example**:
```html
<section>
  <h2>Image Viewer</h2>
  <figure>
    <div class="large-images">
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
- **Tip**: Use the `large-images` class for proper scaling. Ensure image paths are correct and include `alt` text for accessibility.

## 2. Responsive Table
Create responsive tables using the `responsive-table` class with optional `squishing` and `stacking` classes for adaptive behaviour on smaller screens.

**Example 1** (Comparison Table):
```html
<section>
  <h1>Responsive Tables with CSS Styling</h1>
  <div class="table-container">
    <table class="responsive-table squishing stacking">
      <thead>
        <tr>
          <th scope="col">Feature</th>
          <th scope="col">Shower</th>
          <th scope="col">Reveal.js</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text">
          <td data-label="Feature">Collaborative</td>
          <td data-label="Shower"><span class="table-cross">✘</span></td>
          <td data-label="Reveal.js"><span class="table-cross">✘</span></td>
        </tr>
        <tr class="text">
          <td data-label="Feature">SVG Inclusion</td>
          <td data-label="Shower"><span class="table-tick">✔</span></td>
          <td data-label="Reveal.js"><span class="table-tick">✔</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
```

**Example 2** (File Sizes Table):
```html
<section>
  <h2>Rslidy File Sizes</h2>
  <table class="responsive-table squishing stacking">
    <caption>Rslidy File Sizes</caption>
    <thead>
      <tr>
        <th scope="col">File</th>
        <th scope="col" class="numeric">Size (Bytes)</th>
        <th scope="col" class="numeric">Minified Size (Bytes)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="Filename" class="text">rslidy.js</td>
        <td data-label="Regular" class="numeric">149,083</td>
        <td data-label="Minified" class="numeric">84,163</td>
      </tr>
      <tr>
        <td data-label="Filename" class="text">rslidy.css</td>
        <td data-label="Regular" class="numeric">37,043</td>
        <td data-label="Minified" class="numeric">24,339</td>
      </tr>
    </tbody>
  </table>
</section>
```
- **Tip**: Use `data-label` attributes for accessibility and `squishing stacking` classes for responsive behaviour. Add `<caption>` for table descriptions.

## 3. Multiple Columns
Use the `columns` or `columns-even` class to create multi-column layouts for balanced content presentation.

**Example**:
```html
<section>
  <h2>Gesture Support</h2>
  <div class="columns-even">
    <div class="left-column">
      <ul class="item-auto">
        <li>Swipe.</li>
        <li>Margin tap (similar to that of e-readers).</li>
        <li>Tilt/Tip.</li>
        <li>Shake.</li>
      </ul>
    </div>
    <div class="right-column">
      <figure>
        <div class="images">
          <img src="images/tilt-tip-gestures.svg" alt="Tilt and tip gestures in Rslidy." />
        </div>
        <figcaption>
          Tilt and tip gestures can be used for navigation.<br/>
          <span class="credit">Illustration created by the author using Inkscape.</span>
        </figcaption>
      </figure>
    </div>
  </div>
</section>
```
- **Tip**: Use `columns-even` for equal-width columns or `columns` for custom widths. Assign classes like `left-column` and `right-column` for clarity.

## 4. Source Code Highlighting
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
- **Tip**: Use `language-html`, `language-css`, `language-javascript`, etc., for syntax highlighting. Include `prism.css` and `prism.js` in the `<head>`.

## 5. Live Code
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
- **Tip**: Include external scripts (e.g., `d3-hypertree.js`, `grouped-barchart.js`) and CSS files. Host on a server to load data files correctly. Use `type="module"` for ES modules.

## Additional Notes
- **Slide Structure**: Define slides using `<section>` elements. Use `<div class="slide">` as an alternative.
- **Dependencies**: Include `rslidy.min.css`, `rslidy.min.js`, and Prism.js for code highlighting in the `<head>`.
- **Accessibility**: Use semantic HTML (e.g., `<figure>`, `<figcaption>`, `data-label`) and ARIA roles for better accessibility.
- **Testing**: Host slides on a server for features like live code that require data loading. Test responsiveness across devices.

For more details, refer to the [Rslidy GitHub repository](https://github.com/tugraz-isds/rslidy).