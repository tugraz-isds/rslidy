
# Rslidy Slide Viewer Guide

Navigating an Rslidy slide deck is similar to using conventional
presentation software, but differs in key aspects. Instead of
fixed slide dimensions, Rslidy dynamically adapts slide content and
user interface to the available screen size. Slides support vertical
scrolling when their content exceeds the viewport, ensuring that dense
or detailed material remains accessible on smaller devices.

The user interface is responsive and scales across desktop, tablet, and
smartphone displays. Keyboard and mouse interaction, touch gestures, and
optional motion-based input are supported depending on device
capabilities. First-time users are encouraged to open the Help Panel by
pressing the **H** key or by using the corresponding toolbar button.



## 1. Touch Interaction

On touch-enabled devices, slides can be navigated by swiping left or
right. In addition, tapping the left or right margin of a slide moves to
the previous or next slide respectively.
Standard browser-level multi-touch gestures, such as pinch-to-zoom and
scrolling, remain available for slide content including images, figures,
and long tables. If horizontal scrolling is unavoidable, some devices
may require a brief long press before scrolling is enabled.
The exact behaviour depends on the operating system and browser and may
vary between devices.





## 2. Keyboard and Mouse Controls

All on-screen controls can be activated using either the mouse or
keyboard shortcuts. Slides can be navigated using the arrow keys,
Page Up and Page Down, or by clicking on the slide margins. The **J** key
activates the slide number input field, allowing viewers to jump directly
to a specific slide by entering its number and pressing Return.

Slide font sizes can be decreased, reset, or increased using the **−**,
**R**, and **+** keys. When combined with the **Shift** key, the same
shortcuts adjust the font size of the user interface instead.

The following keyboard shortcuts are available:
- **← / →** – previous / next slide
- **Page Up / Page Down** – previous / next slide
- **Home / End** – first / last slide
- **J** – jump to a specific slide
- **− / R / +** – decrease, reset, increase content font size
- **Shift + (− / R / +)** – adjust user interface font size
- **O** – open Slide Overview panel
- **C** – open Table of Contents panel
- **S** – open Settings panel
- **P** – open Print Settings panel
- **H** – open Help panel
- **A** – toggle display of all slides
- **T** – toggle toolbar visibility
- **Esc** – close any open panel, menu, or image viewer

Extra mouse buttons may also be used for navigation if they are mapped
to the browser’s history functions.




## 3. Motion and Orientation Gestures

On supported devices, motion-based gestures can be enabled for slide
navigation. Tilting or tipping the device to the left or right advances
slides accordingly. A shake gesture can be used to return to the first
slide. To reduce accidental activation, multiple consecutive shakes with
sufficient intensity are required.
Rslidy automatically adapts to changes in device orientation
unless orientation is locked at the operating system level.



## 4. Image Viewer

Rslidy offers a built-in Image Viewer that is automatically attached
to all slide images. Selecting an image opens it in a fullscreen overlay,
where it is scaled to fit the viewport while preserving its aspect ratio.

The viewer provides the following controls:

- Mouse wheel – zoom in and out
- Drag – pan the image
- Zoom In / Zoom Out buttons – adjust zoom level
- Reset button – restore initial zoom and centre the image
- Close button or **Esc** – close the viewer

The viewer adapts automatically to viewport size changes and keeps the
image aligned within the visible area. The browser’s back action can
also be used to close the viewer.

Images can be excluded from the viewer by applying the
`disable-image-viewer` class.



## 5. Progress Bar

The Progress Bar provides a visual overview of the current position
within the slide deck. Previously visited slides are shown in a darker
colour, while upcoming slides are displayed in a lighter tone. Hovering
over a segment reveals a preview thumbnail, which can be clicked to
navigate directly to the corresponding slide.





## 6. Toolbar

The Toolbar is positioned at the bottom of the screen and provides
direct access to Rslidy’s main navigation and configuration features. It
can be hidden to maximise available screen space and restored at any
time.

The Toolbar provides the following controls:

- Slide Overview (**O**) – open thumbnail overview of all slides
- Hide Toolbar (**T**) – toggle toolbar visibility
- Display All Slides (**A**) – show all slides in a continuous view
- First Slide (**Home**) – jump to first slide
- Previous Slide (**←**) – navigate to previous slide
- Slide Input (**J**) – jump to a specific slide
- Next Slide (**→**) – navigate to next slide
- Last Slide (**End**) – jump to last slide
- Print Settings (**P**) – open print configuration
- Settings (**S**) – open viewer settings
- Help (**H**) – open help panel
- Table of Contents (**C**) – open slide structure overview




## 7. Panels

Rslidy provides several panels that appear in response to user
interaction. All panels can be opened either via the Toolbar or by using
their corresponding keyboard shortcuts. The **Esc** key closes any open
panel.

- Slide Overview Panel (**O**)  
  Displays thumbnails of all slides and allows quick navigation through
  the presentation. On smaller screens, its width is limited to preserve
  slide visibility.

- Table of Contents Panel (**C**)  
  Lists slide headings in document order and enables structured
  navigation. Slides without headings are represented by their slide
  number.

- Settings Panel (**S**)  
  Allows viewers to enable or disable interaction features, adjust slide
  and UI font sizes, and configure navigation behaviour. Settings are
  persisted using local storage where permitted.

- Print Settings Panel (**P**)  
  Provides control over print output, including slide selection, paper
  size and orientation, scaling behaviour, slide numbers, frames, and
  link display. Print-specific layout is applied dynamically using CSS,
  while final output options are handled by the browser’s print
  dialogue.

- Help Panel (**H**)  
  Displays an overview of available controls, gestures, and keyboard
  shortcuts.



## 8. Settings and Print Settings

Rslidy provides two configuration panels that allow viewers to adjust
interaction and output without modifying the slide deck files. Both
panels can be opened from the Toolbar and are intended for runtime use.
Where supported, choices are persisted in the browser’s local storage and
are restored automatically on subsequent visits.

### 8.1 Settings Panel

The Settings Panel focuses on interaction and readability options. It
offers controls for adjusting content and user interface font sizes and
for enabling or disabling selected interaction techniques.

- **Font size controls**
  Content font size and user interface font size can be increased,
  decreased, or reset to their defaults. The defaults are derived from
  the slide deck’s base CSS, so custom themes remain compatible.

- **Interaction toggles**
  Viewers can enable or disable gesture and navigation features,
  including tilt navigation, shake navigation, Space key navigation, and
  margin tapping. These options are applied immediately.

- **Persistence**
  Settings are stored under the rslidy key in local storage where
  permitted. If storage is unavailable, the settings remain active only
  for the current session.


### 8.2 Print Settings Panel

The Print Settings Panel determines how the slide deck is prepared for
printing and PDF export. It generates print-specific CSS rules and
injects them at runtime before invoking the browser’s print dialogue.

- **Slide selection**
  Printing can be restricted to the current slide or to a custom slide
  range. Custom ranges support single numbers and intervals.

- **Page format**
  Paper size and orientation can be chosen via drop-down lists. The
  panel translates these selections into an `@page` size rule for printing.

- **Scaling and positioning**
  This panel provides three print sizing modes: **Actual size** (actual
  size of the browser window), **Fit to Page Width** (slides scale to the
  printable  page width),
  and **Custom Zoom**(user-defined magnification, implemented
  via the browser’s zoom percentage).

- **Additional print options**
  Viewers can toggle whether link targets are appended in print output,
  enable or disable slide numbers, add an optional slide frame, and
  apply a global font-size multiplier for print.

- **Persistence**
  Print settings are stored under the rslidy-print key in local storage
  where permitted and are reapplied on load.


  





