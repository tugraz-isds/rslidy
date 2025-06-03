# Rslidy Slide Creator Guide

This guide demonstrates how to create slides using Rslidy, focusing 
on common use cases: responsive images, responsive tables, multiple 
columns, source code highlighting, and live code integration.
# RSlidy CSS Framework

RSlidy is a lightweight CSS framework for creating responsive slideshows and presentations. It leverages modern CSS features like `@layer`, `@scope`, and custom properties (CSS variables) to provide a flexible and maintainable styling system.

## CSS Variables

RSlidy defines a set of CSS custom properties in `rslidy/src/css/_variables.css` to enable theming and customization. These variables are organized into global and component-scoped variables.

### Global Variables
Defined on the `:root` selector in the `base` layer, these variables are accessible throughout the document:

- **Breakpoints**:
  - `--large`: Large screen breakpoint (default: `44rem`).
  - `--medium`: Medium screen breakpoint (default: `40rem`).
  - `--small`: Small screen breakpoint (default: `36rem`).
  - `--tiny`: Tiny screen breakpoint (default: `32rem`).
  - `--mini`: Mini screen breakpoint (default: `28rem`).
  - `--nano`: Nano screen breakpoint (default: `24rem`).
  - `--pico`: Pico screen breakpoint (default: `20rem`).
- **Shared**:
  - `--overview-width`: Overview width (default: `18rem`).
  - `--overview-width-small-screen`: Overview width on small screens (default: `50%`).
  - `--slide-input-width`: Slide input width (default: `2.60em`).
- **Toolbar**:
  - `--toolbar-bg-color`: Toolbar background (default: `#e1e7ea`).
  - `--toolbar-button-bg-color`: Button background (default: `#e1e7ea`).
  - `--toolbar-button-color`: Button text color (default: `#4b4b4b`).
  - `--button-border-color`: Button border color (default: `#848484`).
  - `--button-hover-color`: Button hover background (default: `#c1c7ca`).
  - `--button-active-color`: Button active background (default: `#fff`).
  - `--button-disabled-color`: Button disabled text color (default: `#aaa`).
  - `--progressbar-bg-color-reached`: Progress bar reached color (default: `#003399`).
  - `--progressbar-bg-color-unreached`: Progress bar unreached color (default: `#4d88ff`).
  - `--toolbar-height`: Toolbar height (default: `3.20em`).
  - `--progressbar-height`: Progress bar height (default: `0.50em`).
- **Settings**:
  - `--slider-fill-off`: Slider off fill color (default: `#ececec`).
  - `--slider-stroke-off`: Slider off stroke color (default: `#bdbdbd`).
  - `--slider-fill-on`: Slider on fill color (default: `#3498db`).
  - `--slider-stroke-on`: Slider on stroke color (default: `#85c1e9`).

### CSS Layers
RSlidy organizes styles into three layers:
- `base`: Contains global variables for theming.
- `components`: Includes styles for components like `.toolbar` and `.settings`.
- `utilities`: Provides responsive utility classes for breakpoints.

Example layer declaration:
```css
@layer base, components, utilities;
```

User-defined layers (e.g., `my-styles`) declared after RSlidy’s layers will override them due to higher precedence.

### CSS Scope
RSlidy uses `@scope` to limit styles to specific components (e.g., `.toolbar`, `.settings`, `.rslidy-container`), preventing style leakage to other elements.

Example:
```css
@scope (.toolbar) {
  :scope {
    background-color: var(--toolbar-bg-color);
  }
}
```

*Note*: `@scope` is experimental in some browsers (as of June 2025). RSlidy includes fallback styles for compatibility. Check [MDN: @scope](https://developer.mozilla.org/en-US/docs/Web/CSS/@scope) for browser support.

## Customizing RSlidy

RSlidy’s variables can be customized globally or for specific components using `@layer`, `@scope`, inline styles, or JavaScript.

### 1. Global Customization with `@layer`
Override global variables by defining them in a custom layer with higher priority than `base`.

**Example**:
```css
@layer my-styles {
  :root {
    --toolbar-bg-color: #f0f0f0; /* Change toolbar background */
    --large: 48rem; /* Adjust large breakpoint */
    --slider-fill-on: #ff5733; /* Change slider on color */
  }
}
```

- **How to use**: Add this CSS after including `rslidy/src/css/_variables.css`.
- **Why it works**: The `my-styles` layer has higher precedence than RSlidy’s `base` layer.

### 2. Component-Specific Customization with `@scope`
Customize variables for specific components (e.g., `.toolbar`, `.settings`) by redefining them within a scoped selector.

**Example**:
```css
@scope (.toolbar) {
  :scope {
    --toolbar-bg-color: #d3d3d3; /* Custom toolbar background */
  }
  .button {
    --toolbar-button-color: #000000; /* Custom button text color */
  }
}
```

- **How to use**: Apply to specific components using `@scope` or a class selector.
- **Why it works**: Scoped styles only affect elements within the specified scope (e.g., `.toolbar`).

### 3. Inline Customization
Apply custom variable values directly on elements using inline CSS.

**Example**:
```html
<div class="toolbar" style="--toolbar-bg-color: #e0e0e0;">...</div>
```

- **How to use**: Add the `style` attribute to the desired element.
- **Why it works**: Inline styles have higher specificity than layered or scoped styles.

### 4. JavaScript Customization
Dynamically update variables for effects like theme switching.

**Example**:
```javascript
document.documentElement.style.setProperty('--toolbar-bg-color', '#c0c0c0');
```

- **How to use**: Run JavaScript to update `:root` variables.
- **Why it works**: Changes to `:root` variables propagate to all elements using them.

### Protecting Internal Styles
- **Layer Priority**: RSlidy’s `base` layer has low priority, ensuring user-defined layers (e.g., `my-styles`) override it only when intended.
- **Scoped Styles**: `@scope` rules (e.g., `@scope (.toolbar)`) limit styles to RSlidy components, preventing interference with other page elements.
- **Fallbacks**: RSlidy includes non-scoped fallback styles for browsers without `@scope` support, maintaining compatibility.
- **Naming**: Variables use descriptive names (e.g., `--toolbar-bg-color`) to avoid conflicts with user variables.

### Exposed Variables
All global variables on `:root` (e.g., `--toolbar-bg-color`, `--large`) are exposed for customization. Component-specific styles in `@scope` blocks rely on these variables, allowing targeted overrides.

## Example Usage
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="stylesheet" href="rslidy/src/css/_variables.css">
  <style>
    @layer my-styles {
      :root {
        --toolbar-bg-color: #f0f0f0; /* Custom toolbar background */
        --slider-fill-on: #ff5733; /* Custom slider on color */
      }
    }
    @scope (.settings) {
      .slider.on {
        --slider-fill-on: #e74c3c; /* Custom slider color for settings */
      }
    }
  </style>
</head>
<body>
  <div class="toolbar">
    <button class="button">Click me</button>
    <div class="progressbar">
      <div class="reached"></div>
      <div class="unreached"></div>
    </div>
  </div>
  <div class="settings">
    <div class="slider on"></div>
  </div>
  <div class="rslidy-container small">Content</div>
</body>
</html>
```

## Browser Compatibility
- **CSS Variables**: Supported in all modern browsers (post-April 2017).
- **@layer**: Supported in modern browsers.
- **@scope**: Experimental; use fallbacks for production. See [MDN: @scope](https://developer.mozilla.org/en-US/docs/Web/CSS/@scope).

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

## 2. Responsive Table
Create responsive tables using the `responsive-table` class with optional `squishing` and `stacking` classes for adaptive behaviour on smaller screens.
Include to container `<div class="table-container">` to also have 
scrolling on the table.

**Example ** (Comparison Table):
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
- Use `data-label` attributes for accessibility and `squishing stacking` classes for responsive behaviour. Add `<caption>` for table descriptions.

## 3. Multiple Columns
Use the `columns` or `columns-even` class to create multi-column layouts.

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
Use `language-html`, `language-css`, `language-javascript`, etc., for syntax highlighting. Include `prism.css` and `prism.js` in the `<head>`.

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
- External Libraries: For external libraries like Hypertree or 
  RespVis, review and adapt their CSS styling (e.g., d3-hypertree-light.css, respvis.css) to match your slide deck’s design and ensure compatibility with Rslidy’s layout.
- **Testing**: Host slides on a server for features like live code that require data loading. Test responsiveness across devices.

For more details, refer to the [Rslidy GitHub repository](https://github.com/tugraz-isds/rslidy).