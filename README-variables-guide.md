# Rslidy CSS Variables Guide

This document describes the available global CSS variables defined in
`rslidy/src/css/_variables.css`.

---

## Slide Size Variables

These variables define different slide widths (in `rem` units),
allowing for responsive and consistent scaling of the presentations
to different screen sizes:

| Variable          | Default | Description                                                                  |
| ----------------- | ------- | ---------------------------------------------------------------------------- |
| `--rslidy-large`  | `44rem` | Largest slide size, typically used for wide or high-resolution displays.     |
| `--rslidy-medium` | `40rem` | Medium slide size, default for most use cases.                               |
| `--rslidy-small`  | `36rem` | Small slide size for narrower displays.                                      |
| `--rslidy-tiny`   | `32rem` | Tiny slide size, suitable for compact layouts.                               |
| `--rslidy-mini`   | `28rem` | Even smaller slides, often for previews or constrained spaces.               |
| `--rslidy-nano`   | `24rem` | Very small slide width, e.g., for thumbnails.                                |
| `--rslidy-pico`   | `20rem` | Smallest defined slide size, typically used in overview or navigation modes. |

---

## Shared Variables

These are variables used across multiple UI components:

| Variable                               | Default  | Description                                                            |
| -------------------------------------- | -------- | ---------------------------------------------------------------------- |
| `--rslidy-overview-width`              | `18rem`  | Width of a slide in overview mode.                                     |
| `--rslidy-overview-width-small-screen` | `50%`    | Width of a slide in overview mode on smaller screens.                  |
| `--rslidy-slide-input-width`           | `2.60em` | Width of input fields in the slide toolbar (e.g., slide number input). |
| `--rslidy-slide-number-font-size`      | `1em`    | Font size of the current slide number display.                         |
| `--rslidy-slide-font-size`             | `1.5em`  | Default font size used for normal slide content.                       |

---

## Toolbar Variables

These variables define the appearance of the toolbar and its controls:

| Variable                                   | Default   | Description                                                       |
| ------------------------------------------ | --------- | ----------------------------------------------------------------- |
| `--rslidy-toolbar-bg-colour`               | `#e1e7ea` | Background colour of the toolbar.                                 |
| `--rslidy-toolbar-button-bg-colour`        | `#e1e7ea` | Default background colour of toolbar buttons.                     |
| `--rslidy-toolbar-button-colour`           | `#4b4b4b` | Foreground (text/icon) colour of toolbar buttons.                 |
| `--rslidy-button-border-colour`            | `#848484` | Border colour for buttons.                                        |
| `--rslidy-button-hover-colour`             | `#c1c7ca` | Background colour when hovering over buttons.                     |
| `--rslidy-button-active-colour`            | `#fff`    | Background colour for active/pressed buttons.                     |
| `--rslidy-button-disabled-colour`          | `#aaa`    | Button colour when disabled.                                      |
| `--rslidy-progressbar-bg-colour-reached`   | `#003399` | Colour of the progress bar portion representing completed slides. |
| `--rslidy-progressbar-bg-colour-unreached` | `#4d88ff` | Colour of the progress bar portion for upcoming slides.           |
| `--rslidy-toolbar-height`                  | `3.20em`  | Height of the toolbar.                                            |
| `--rslidy-progressbar-height`              | `0.50em`  | Height of the progress bar.                                       |

---

## Image Viewer Variables

These variables define the appearance of the image viewer:

| Variable                           | Default              | Description                                    |
| ---------------------------------- | -------------------- | ---------------------------------------------- |
| `--rslidy-image-viewer-bg-colour` | `rgba(0, 0, 0, 0.9)` | Background colour of the image viewer overlay. |

---

## Settings Variables

These define the appearance of slider controls used in the settings
panel:

| Variable                     | Default   | Description                                        |
| ---------------------------- | --------- | -------------------------------------------------- |
| `--rslidy-slider-fill-off`   | `#ececec` | Fill colour when slider is off/inactive.           |
| `--rslidy-slider-stroke-off` | `#bdbdbd` | Stroke (border/outline) colour when slider is off. |
| `--rslidy-slider-fill-on`    | `#3498db` | Fill colour when slider is on/active.              |
| `--rslidy-slider-stroke-on`  | `#85c1e9` | Stroke colour when slider is on.                   |

---

With these variables, you can easily customise the layout,
toolbar appearance, progress bar, image viewer, and settings controls
of your presentations.
