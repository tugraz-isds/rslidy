# Slide Viewer Guide

Navigating an Rslidy slide deck is similar to using conventional
presentation software, but differs in key aspects. Instead of
fixed slide dimensions, Rslidy dynamically adapts both slide content and
the user interface to the available screen size. Slides support vertical
scrolling when their content exceeds the viewport, ensuring that dense
or detailed material remains accessible on smaller devices.

The user interface is responsive and scales across desktop, tablet, and
smartphone displays. Keyboard and mouse interaction, touch gestures, and
optional motion-based input are supported depending on device
capabilities. First-time users are encouraged to open the Help Panel by
pressing the **H** key or by using the corresponding toolbar button.


---

## 1. Touch Interaction

On touch-enabled devices, slides can be navigated by swiping left or
right. In addition, tapping the left or right margin of a slide moves to
the previous or next slide respectively, enabling one-handed navigation
similar to e-reader applications.

Standard browser-level multi-touch gestures, such as pinch-to-zoom and
scrolling, remain available for slide content including images, figures,
and long tables. If horizontal scrolling is unavoidable, some devices
may require a brief long press before horizontal movement is enabled.
The exact behaviour depends on the operating system and browser and may
vary between devices.

---

## 2. Keyboard and Mouse Controls

All on-screen controls can be activated using either the mouse or
keyboard shortcuts. Slides can be navigated using the arrow keys,
Page Up and Page Down, or by clicking on the slide margins. The **J** key
activates the slide number input field, allowing viewers to jump directly
to a specific slide by entering its number and pressing Return.

Slide font sizes can be decreased, reset, or increased using the **−**,
**R**, and **+** keys. When combined with the **Shift** key, the same
shortcuts adjust the font size of the user interface instead. The
**Esc** key closes all open panels. Extra mouse buttons may also be used
for navigation if they are mapped to the browser’s history functions.

---

## 3. Motion and Orientation Gestures

On supported devices, motion-based gestures can be enabled for slide
navigation. Tilting or tipping the device to the left or right advances
slides accordingly. A shake gesture can be used to return to the first
slide. To reduce accidental activation, multiple consecutive shakes with
sufficient intensity are required.

Access to motion and orientation sensors may be restricted by the
browser for security and privacy reasons. If these gestures are not
available, the necessary permissions can be granted via the Settings
Panel. Rslidy automatically adapts to changes in device orientation
unless orientation is locked at the operating system level.

---

## 4. Progress Bar

The Progress Bar provides a visual overview of the current position
within the slide deck. Previously visited slides are shown in a darker
colour, while upcoming slides are displayed in a lighter tone. Hovering
over a segment reveals a preview thumbnail, which can be clicked to
navigate directly to the corresponding slide.

---

## 5. Toolbar

The Toolbar is positioned at the bottom of the screen and provides
direct access to Rslidy’s main navigation and configuration features. It
can be hidden to maximise available screen space and restored at any
time. All toolbar functions are also accessible via keyboard shortcuts.

The Toolbar includes controls for slide navigation, slide overview,
displaying all slides as a single scrollable page, accessing settings
and print options, opening the help panel, and toggling the table of
contents.

---

## 6. Toolbar
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

---

## 7. Image Viewer

Rslidy includes a built-in Image Viewer that is automatically attached
to all slide images. It enables zooming and panning using mouse,
keyboard, or on-screen controls.
Images can be zoomed using the mouse wheel, on-screen controls, or
keyboard shortcuts. Dragging pans the image, and a reset control
restores the default view. The Image Viewer can be closed using the
on-screen control, the **Esc** key, or the browser’s back action.

---

## 8. Accessibility

Rslidy is designed to be fully operable using a keyboard alone. All
interactive elements are reachable via tab navigation, and the Return
key can be used as a substitute for mouse clicks. Both slide content and
user interface font sizes are adjustable to accommodate individual
accessibility requirements.

ARIA roles and properties are applied dynamically to reflect the current
state of interface elements such as sliders and toggles. Semantic HTML
elements are used to distinguish slide content from navigational
controls, enabling assistive technologies to interpret and navigate the
presentation structure effectively.
