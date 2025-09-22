# Rslidy CSS Variables

This document describes the available global CSS variables defined in
`rslidy/src/css/_variables.css`.

---

## Slide Size Variables

These variables define different slide widths (in `rem` units), 
allowing for responsive and consistent scaling of the presentations 
to different screen sizes:

| Variable            | Default | Description |
|---------------------|---------|-------------|
| `--rslidy-large`    | `44rem` | Largest slide size, typically used for wide or high-resolution displays. |
| `--rslidy-medium`   | `40rem` | Medium slide size, default for most use cases. |
| `--rslidy-small`    | `36rem` | Small slide size for narrower displays. |
| `--rslidy-tiny`     | `32rem` | Tiny slide size, suitable for compact layouts. |
| `--rslidy-mini`     | `28rem` | Even smaller slides, often for previews or constrained spaces. |
| `--rslidy-nano`     | `24rem` | Very small slide width, e.g., for thumbnails. |
| `--rslidy-pico`     | `20rem` | Smallest defined slide size, typically used in overview or navigation modes. |

---

## Shared Variables

These are variables used across multiple UI components:

| Variable                            | Default  | Description |
|-------------------------------------|----------|-------------|
| `--rslidy-overview-width`           | `18rem`  | Width of a slide in overview mode. |
| `--rslidy-overview-width-small-screen` | `50%` | Width of a slide in overview mode on smaller screens. |
| `--rslidy-slide-input-width`        | `2.60em` | Width of input fields in the slide toolbar (e.g., slide number input). |

---

## Toolbar Variables

These variables define the appearance of the toolbar and its controls:

| Variable                            | Default   | Description |
|-------------------------------------|-----------|-------------|
| `--rslidy-toolbar-bg-color`         | `#e1e7ea` | Background color of the toolbar. |
| `--rslidy-toolbar-button-bg-color`  | `#e1e7ea` | Default background color of toolbar buttons. |
| `--rslidy-toolbar-button-color`     | `#4b4b4b` | Foreground (text/icon) color of toolbar buttons. |
| `--rslidy-button-border-color`      | `#848484` | Border color for buttons. |
| `--rslidy-button-hover-color`       | `#c1c7ca` | Background color when hovering over buttons. |
| `--rslidy-button-active-color`      | `#fff`    | Background color for active/pressed buttons. |
| `--rslidy-button-disabled-color`    | `#aaa`    | Button color when disabled. |
| `--rslidy-progressbar-bg-color-reached`   | `#003399` | Color of the progress bar portion representing completed slides. |
| `--rslidy-progressbar-bg-color-unreached` | `#4d88ff` | Color of the progress bar portion for upcoming slides. |
| `--rslidy-toolbar-height`           | `3.20em`  | Height of the toolbar. |
| `--rslidy-progressbar-height`       | `0.50em`  | Height of the progress bar. |

---

## Settings Variables

These define the appearance of slider controls used in the settings 
panel:

| Variable                  | Default   | Description |
|---------------------------|-----------|-------------|
| `--rslidy-slider-fill-off`   | `#ececec` | Fill color when slider is off/inactive. |
| `--rslidy-slider-stroke-off` | `#bdbdbd` | Stroke (border/outline) color when slider is off. |
| `--rslidy-slider-fill-on`    | `#3498db` | Fill color when slider is on/active. |
| `--rslidy-slider-stroke-on`  | `#85c1e9` | Stroke color when slider is on. |

---

✅ With these variables, you can easily customise the **layout, 
toolbar appearance, progress bar, and settings controls** in your 
presentations.
