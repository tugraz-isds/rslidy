// Rslidy version 1.1 ESM

;// ./src/ts/build/js/ts/utils.js
// Class Utils
// Implements utility functions.
class Utils {
    // ---
    // Description: Returns the width of the slide.
    // aspect_ratio: The desired aspect ratio (or 0 for dynamic calculation).
    // custom_width: The custom width.
    // ---
    getSlideWidth(aspect_ratio, custom_width) {
        aspect_ratio = aspect_ratio || 0;
        if (aspect_ratio == 0)
            return window.outerWidth;
        var width = custom_width; // ...
        return width;
    }
    // ---
    // Description: Returns the height of the slide.
    // aspect_ratio: The desired aspect ratio (or 0 for dynamic calculation).
    // custom_width: The custom width.
    // ---
    getSlideHeight(aspect_ratio, custom_width) {
        aspect_ratio = aspect_ratio || 0;
        if (aspect_ratio == 0)
            return window.outerHeight;
        var width = custom_width;
        var height = width / aspect_ratio;
        return height;
    }
    // ---
    // Description: Returns the current aspect ratio.
    // ---
    getCurrentAspectRatio() {
        var window_width = window.innerWidth;
        var window_height = window.innerHeight;
        var current_aspect_ratio = window_width / window_height;
        return current_aspect_ratio;
    }
    // ---
    // Description: Gets the relative width of an element, with respect to the
    // whole window.
    // element: Specifies the element to consider.
    // aspect_ratio: The desired aspect ratio (or 0 for dynamic calculation).
    // custom_width: The custom width.
    // ---
    getRelativeWidth(element_width, aspect_ratio, custom_width) {
        var window_width = aspect_ratio == 0 ? window.outerWidth : custom_width;
        var relative_width = element_width / window_width;
        return relative_width;
    }
    // ---
    // Description: Returns the integer representation of a character.
    // character: Specifies the character to convert.
    // ---
    toInt(character) {
        return 1 * character;
    }
    // ---
    // Description: Returns a 2-digit-representation of a number (e.g. "6"
    // becomes "06", but "11" will still be "11").
    // num: Specify the number.
    // ---
    toTwoDigits(num) {
        return ("0" + num).slice(-2);
    }
    // ---
    // Description: Switches the existence of a class of each element in a
    // specified list (ignores elements with class "ignore").
    // element_list: The list of elements.
    // class_name: The name of the class.
    // ---
    switchElementsClass(element_list, class_name) {
        for (var i = 0; i < element_list.length; i++) {
            if (element_list[i].classList.contains("ignore") == true)
                continue;
            if (element_list[i].classList.contains(class_name) == true)
                element_list[i].classList.remove(class_name);
            else
                element_list[i].classList.add(class_name);
        }
    }
    // ---
    // Description: Adds a class to an element if not already present
    // element_list: The list of elements.
    // class_name: The name of the class.
    // ---
    addElementsClass(element_list, class_name) {
        for (var i = 0; i < element_list.length; i++) {
            if (element_list[i].classList.length == 0 ||
                element_list[i].classList.contains(class_name) == false) {
                element_list[i].classList.add(class_name);
            }
        }
    }
    // ---
    // Description: Inverts the color attribute of all elements in the specified
    // list.
    // element_list: The list of elements.
    // low_light_mode: Specified whether colors should be inverted or reset.
    // ---
    invertElementsColor(element_list, low_light_mode) {
        low_light_mode = low_light_mode || false;
        for (var i = 0; i < element_list.length; i++) {
            // Continue if night mode is to be disabled
            if (low_light_mode == true) {
                element_list[i].style.color = "";
                continue;
            }
            // Invert color
            var color_rgb = getComputedStyle(element_list[i]).getPropertyValue("color");
            var color_hex = "#";
            var rgx = /\d+/g;
            var match;
            while ((match = rgx.exec(color_rgb)) != null) {
                var inverted = 255 - match[0];
                if (inverted < 16)
                    color_hex += "0";
                color_hex += inverted.toString(16);
            }
            element_list[i].style.color = color_hex;
        }
    }
    // ---
    // Description: Returns the font size in em for a specific CSS query
    // query: the CSS query
    // ---
    getEM(query) {
        return parseFloat(window.getComputedStyle(document.querySelectorAll(query)[0]).getPropertyValue("font-size")) / parseFloat(window.getComputedStyle(document.body).getPropertyValue("font-size"));
    }
    // ---
    // Description: Converts rem to pixel count
    // rem: the rem input
    // ---
    remToPixel(rem) {
        return parseFloat(window.getComputedStyle(document.body).getPropertyValue("font-size")) * rem;
    }
    // ---
    // Description: Applies a regex to keyboard input, only allowing specific keys
    // textbox: The textbox to filter.
    // inputFilter: Function returning the filtered input
    //              Example: function(value) {return /^\d*$/.test(value);}
    // Source: https://jsfiddle.net/emkey08/zgvtjc51
    // ---
    setInputFilter(textbox, inputFilter) {
        ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
            textbox.addEventListener(event, function () {
                if (inputFilter(this.value)) {
                    this.oldValue = this.value;
                    this.oldSelectionStart = this.selectionStart;
                    this.oldSelectionEnd = this.selectionEnd;
                }
                else if (this.hasOwnProperty("oldValue")) {
                    this.value = this.oldValue;
                    this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                }
            });
        });
    }
    // ---
    // Description: Creates an html element from a given input string
    // htmlstr: The html string
    // ---
    htmlParse(htmlstr) {
        const template = document.createElement("div");
        template.innerHTML = htmlstr;
        return template.firstElementChild;
    }
    // ---
    // Description: Insterts an html element at the start of another one
    // parent: The html element that gets modified
    // html: The new html element as string
    // ---
    prependHtmlString(parent, html) {
        const view = this.htmlParse(html);
        parent.insertBefore(view, parent.firstChild);
        return view;
    }
    // ---
    // Description: Inserts an html element at the end of another one
    // parent: The html element that gets modified
    // html: The new html element as string
    // ---
    appendHtmlString(parent, html) {
        const view = this.htmlParse(html);
        parent.appendChild(view);
        return view;
    }
    // ---
    // Description: Get the slide with the specified index
    // index: slide index
    // ---
    getSlide(index) {
        return window.rslidy.content.slideTransition.slides[index];
    }
    // ---
    // Description: True if an element is visible on screen
    // elm: the html element to check
    // ---
    checkVisible(elm) {
        var rect = elm.getBoundingClientRect();
        var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    }
}

;// ./src/ts/build/js/ts/icon-definitions.js
const all_slides_icon = `<svg viewBox="0 0 100 100"  xmlns="http://www.w3.org/2000/svg"><line x1="5" y1="5" x2="5" y2="95" style="stroke-width:8"/><line x1="95" y1="5" x2="95" y2="95" style="stroke-width:8"/><text x="50" y="50" dominant-baseline="middle" text-anchor="middle" font-size="100">n</text></svg>`;
const font_minus_icon = `<svg viewBox="0 0 100 100"  xmlns="http://www.w3.org/2000/svg"><text x="50" y="95" text-anchor="middle" font-size="80">A</text><text x="60" y="45" font-weight="bold" font-size="55">-</text></svg>`;
const font_plus_icon = `<svg viewBox="0 0 100 100"  xmlns="http://www.w3.org/2000/svg"><text x="50" y="95" text-anchor="middle" font-size="100">A</text><text x="55" y="40" font-weight="bold" font-size="55">+</text></svg>`;
const font_reset_icon = `<svg viewBox="0 0 100 100"  xmlns="http://www.w3.org/2000/svg"><text x="50" y="95" text-anchor="middle" font-size="90">A</text></svg>`;
const help_icon = `<svg viewBox="0 0 100 100"  xmlns="http://www.w3.org/2000/svg"><g transform="scale(0.7)"><path fill="none" stroke-width="20" d="M45,67c0-13 1-19 8-26c7-9 18-10 28-8c10,2 22,12 22,26c0,14-11,19-15,22c-7,2-10,6-11,11v20m0,12v16"/></g></svg>`;
const hide_icon = `<svg viewBox="0 0 100 100"  xmlns="http://www.w3.org/2000/svg"><line stroke-linecap="round" x1="20" y1="15" x2="50" y2="45" stroke-width="10"/><line stroke-linecap="round" x1="50" y1="45" x2="80" y2="15" stroke-width="10"/><line stroke-linecap="round" x1="20" y1="55" x2="50" y2="85" stroke-width="10"/><line stroke-linecap="round" x1="50" y1="85" x2="80" y2="55" stroke-width="10"/></svg>`;
const last_icon = `<svg viewBox="0 0 100 100"  xmlns="http://www.w3.org/2000/svg"><polygon points="5,5 5,95 70,50"  stroke-width="1"/><line x1="85" y1="5" x2="85" y2="95" style="stroke-width:15"/></svg>`;
const next_icon = `<svg viewBox="0 0 100 100"  xmlns="http://www.w3.org/2000/svg"><polygon points="15,5 15,95 85,50"  stroke-width="1"/></svg>`;
const next_pointer_icon = `<svg viewBox="0 0 100 100"     xmlns="http://www.w3.org/2000/svg" width="15" height="15">    <polygon points="0,1 0,99 99,50" fill="none" stroke="black" stroke-width="5"/></svg>`;
const one_slide_icon = `<svg viewBox="0 0 100 100"  xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="90" height="90" fill="none" style="stroke-width:6;" /><text x="50" y="50" dominant-baseline="central" text-anchor="middle" font-size="80">1</text></svg>`;
const overview_icon = `<svg viewBox="0 0 100 100"  xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="100" height="100" style="fill:none;stroke-width:8;" /><line x1="48" y1="0" x2="48" y2="100" style="stroke-width:4"/><rect x="8" y="7" width="33" height="25"/><rect x="8" y="37.5" width="33" height="25"/><rect x="8" y="68" width="33" height="25"/></svg>`;
const previous_pointer_icon = `<svg viewBox="0 0 100 100"     xmlns="http://www.w3.org/2000/svg" width="15" height="15">    <polygon points="99,1 99,99 1,50" fill="none" stroke="black" stroke-width="5" stroke-linejoin="miter"/></svg>`;
const print_icon = `<svg viewBox="0 0 100 100"  xmlns="http://www.w3.org/2000/svg"><line x1="6" y1="30" x2="94" y2="30" style="stroke-width:8"/><line x1="10" y1="30" x2="10" y2="80" style="stroke-width:8"/><line x1="22" y1="23" x2="30" y2="23" style="stroke-width:8"/><line x1="70" y1="23" x2="78" y2="23" style="stroke-width:8"/><line x1="90" y1="30" x2="90" y2="80" style="stroke-width:8"/><line x1="6" y1="80" x2="30" y2="80" style="stroke-width:8"/><line x1="94" y1="80" x2="70" y2="80" style="stroke-width:8"/><line x1="6" y1="33" x2="94" y2="33" style="stroke-width:8"/><line x1="6" y1="40" x2="20" y2="40" style="stroke-width:12"/><line x1="33" y1="40" x2="94" y2="40" style="stroke-width:12"/><line x1="6" y1="55" x2="94" y2="55" style="stroke-width:24"/><line x1="6" y1="75" x2="30" y2="75" style="stroke-width:24"/><line x1="94" y1="75" x2="70" y2="75" style="stroke-width:24"/><line x1="35" y1="73" x2="65" y2="73" style="stroke-width:4"/><line x1="35" y1="83" x2="65" y2="83" style="stroke-width:4"/><rect x="30" y="5" width="40" height="25" rx="5" ry="5" style="fill:none;stroke-width:4;"/><rect x="30" y="65" width="40" height="30" rx="5" ry="5" style="fill:none;stroke-width:4;"/></svg>`;
const settings_icon = `<svg viewBox="0 0 100 100"  xmlns:xlink="http://www.w3.org/1999/xlink"  xmlns="http://www.w3.org/2000/svg"><defs><g id="gear"><polygon points="40,75 43,95 57,95 60,75"/><polygon points="40,25 43,5 57,5 60,25"/><polygon points="25,40 5,43 5,57 25,60"/><polygon points="75,40 95,43 95,57 75,60"/></g></defs><circle cx="50" cy="50" r="25" fill="none" style="stroke-width:15" /><use xlink:href="#gear"/><use xlink:href="#gear" transform="rotate(45 50 50)"/></svg>`;
const slider_icon = `<svg viewBox="0 0 100 50"  xmlns="http://www.w3.org/2000/svg"><line stroke-linecap="round" x1="20" y1="25" x2="80" y2="25" stroke-width="30"/><circle cx="25" cy="25" r="23" stroke-width="3"/></svg>`;
const toc_icon = `<svg viewBox="0 0 100 100"  xmlns="http://www.w3.org/2000/svg"><line x1="5" y1="10" x2="5" y2="95" stroke-dasharray="15, 15" style="stroke-width:20"/><line x1="25" y1="17.5" x2="100" y2="17.5" style="stroke-width:10"/><line x1="25" y1="47.5" x2="100" y2="47.5" style="stroke-width:10"/><line x1="25" y1="77.5" x2="100" y2="77.5" style="stroke-width:10"/></svg>`;

;// ./src/ts/build/js/ts/text.en.js
// English text definitions
const help = [
    `Interface Controls`,
    `Function`,
    `Button`,
    `Key`,
    `Gesture`,
    `Description`,
    `Slide Overview`,
    `O`,
    `Toggle the Overview of all slides.`,
    `Toolbar`,
    `T`,
    `Toggle the visibility of the toolbar.`,
    `All Slides`,
    `A`,
    `Toggle display of all slides on one page.`,
    `First Slide`,
    `Home`,
    `Shake`,
    `Navigate to first slide.`,
    `Previous Slide`,
    `←, Page Up`,
    `Swipe right, Tap/click left margin, Tilt left, Tip left`,
    `Navigate to previous slide.`,
    `Next Slide`,
    `→, Page Down, Space`,
    `Swipe left, Tap/click right margin, Tilt right, Tip right`,
    `Advance to next slide.`,
    `Last Slide`,
    `End`,
    `Navigate to last slide.`,
    `Print Settings`,
    `P`,
    `Toggle the Print Settings Panel.
   Print settings are preserved in browser local storage.`,
    `Settings`,
    `S`,
    `Toggle the Settings Panel.
   Settings are preserved in browser local storage.`,
    `Help`,
    `H`,
    `Toggle the Help Panel.`,
    `Table of Contents`,
    `C`,
    `Toggle the Table of Contents (slide titles).`,
    `Decrease Font Size`,
    `-`,
    `Decrease slide font size.
   With Shift, decrease interface font size.`,
    `Reset Font Size`,
    `R`,
    `Reset slide font size.
   With Shift, reset interface font size.`,
    `Increase Font Size`,
    `+`,
    `Increase slide font size.
   With Shift, increase interface font size.`,
    `Jump to Slide`,
    `[J] 0-99 Return`,
    `Jump to a specific slide.`,
    `Close all Panels`,
    `Escape`,
    `Close all open panels.`,
];
const settings = [
    `Tilt`,
    `Shake`,
    `Space To Advance`,
    `Margin Tap Nav`,
    `Low Light Mode`,
    `Slide Fonts`,
    `UI Fonts`,
    `Make Slide Fonts Smaller (-)`,
    `Reset Slide Fonts (R)`,
    `Make Slide Fonts Larger (+)`,
    `Make UI Fonts Smaller (Shift -)`,
    `Reset UI Fonts (Shift R)`,
    `Make UI Fonts Larger (Shift +)`
];
const print_settings = [
    `Show Slide Numbers`,
    `Show Frame`,
    `Show Link Destinations`,
    `Sildes to Print:`,
    `Font Size:`,
    `Orientation:`,
    `Page Size:`,
    `Print`,
];
const toolbar = [
    `Show Toolbar (T)`,
    `Slide Overview (O)`,
    `Hide Toolbar (T)`,
    `First Slide (Home)`,
    `Previous Slide (←)`,
    `Next Slide (→)`,
    `Last Slide (End)`,
    `Table of Contents (C)`,
    `Settings (S)`,
    `Print (P)`,
    `Help (H)`,
    `Display All Slides (A)`,
    `Display Single Slides (A)`
];
const imageviewer = [
    `Reset Zoom (R)`,
    `Zoom In (+)`,
    `Zoom Out (-)`,
    `Close (Esc)`
];

;// ./src/ts/build/js/ts/html-definitions.js


const spinner_html = `
<div id="rslidy-spinner" class="rslidy-spinner-overlay">
<div class="rslidy-spinner"></div></div>`;
const help_text = `
<div id="rslidy-help" class="rslidy-help-overlay rslidy-ui"
role="region" aria-label="Help" tabindex="0">
  <div id="rslidy-help-popup">
  <h1>
    Rslidy Version 1.0.1
    <a target="_blank" href="https://github.com/tugraz-isds/rslidy">GitHub</a>
  </h1>
  <a class="rslidy-help-close" title="` + imageviewer[3] + `" href="#">&times;</a>
  <h2>` + help[0] + `</h2>
    <div class="rslidy-help-content">
    <table id="rslidy-help-table">
      <tr>
        <th>` + help[1] + `</th>
        <th>` + help[2] + `</th>
        <th>` + help[3] + `</th>
        <th>` + help[4] + `</th>
        <th>` + help[5] + `</th>
      </tr>
      <tr>
        <td>` + help[6] + `</td>
        <td>
          <span class="rslidy-icon">` + overview_icon + `</span>
        </td>
        <td>` + help[7] + `</td>
        <td></td>
        <td>` + help[8] + `</td>
      </tr>
      <tr>
        <td>` + help[9] + `</td>
        <td>
          <span class="rslidy-icon">` + hide_icon + `</span>
        </td>
        <td>` + help[10] + `</td>
        <td></td>
        <td>` + help[11] + `</td>
      </tr>
      <tr>
        <td>` + help[12] + `</td>
        <td>
          <span class="rslidy-icon">` + all_slides_icon + `</span>
          <span class="rslidy-icon">` + one_slide_icon + `</span>
        </td>
        <td>` + help[13] + `</td>
        <td></td>
        <td>` + help[14] + `</td>
      </tr>
      <tr>
        <td>` + help[15] + `</td>
        <td>
          <span class="rslidy-icon rslidy-mirror">` + last_icon + `</span>
        </td>
        <td>` + help[16] + `</td>
        <td>` + help[17] + `</td>
        <td>` + help[18] + `</td>
      </tr>
      <tr>
        <td>` + help[19] + `</td>
        <td>
          <span class="rslidy-icon rslidy-mirror">` + next_icon + `</span>
        </td>
        <td>` + help[20] + `</td>
        <td>` + help[21] + `</td>
        <td>` + help[22] + `</td>
      </tr>
      <tr>
        <td>` + help[23] + `</td>
        <td>
          <span class="rslidy-icon">` + next_icon + `</span>
        </td>
        <td>` + help[24] + `</td>
        <td>` + help[25] + `</td>
        <td>` + help[26] + `</td>
      </tr>
      <tr>
        <td>` + help[27] + `</td>
        <td>
          <span class="rslidy-icon">` + last_icon + `</span>
        </td>
        <td>` + help[28] + `</td>
        <td></td>
        <td>` + help[29] + `</td>
      </tr>
      <tr>
        <td>` + help[30] + `</td>
        <td>
          <span class="rslidy-icon">` + print_icon + `</span>
        </td>
        <td>` + help[31] + `</td>
        <td></td>
        <td>` + help[32] + `</td>
      </tr>
      <tr>
        <td>` + help[33] + `</td>
        <td>
          <span class="rslidy-icon">` + settings_icon + `</span>
        </td>
        <td>` + help[34] + `</td>
        <td></td>
        <td>` + help[35] + `</td>
      </tr>
      <tr>
        <td>` + help[36] + `</td>
        <td>
          <span class="rslidy-icon">` + help_icon + `</span>
        </td>
        <td>` + help[37] + `</td>
        <td></td>
        <td>` + help[38] + `</td>
      </tr>
      <tr>
        <td>` + help[39] + `</td>
        <td>
          <span class="rslidy-icon">` + toc_icon + `</span>
        </td>
        <td>` + help[40] + `</td>
        <td></td>
        <td>` + help[41] + `</td>
      </tr>
      <tr>
        <td>` + help[42] + `</td>
        <td>
          <span class="rslidy-icon">` + font_minus_icon + `</span>
        </td>
        <td>` + help[43] + `</td>
        <td></td>
        <td>` + help[44] + `</td>
      </tr>
      <tr>
        <td>` + help[45] + `</td>
        <td>
          <span class="rslidy-icon">` + font_reset_icon + `</span>
        </td>
        <td>` + help[46] + `</td>
        <td></td>
        <td>` + help[47] + `</td>
      </tr>
      <tr>
        <td>` + help[48] + `</td>
        <td>
          <span class="rslidy-icon">` + font_plus_icon + `</span>
        </td>
        <td>` + help[49] + `</td>
        <td></td>
        <td>` + help[50] + `</td>
      </tr>
      <tr>
        <td>` + help[51] + `</td>
        <td></td>
        <td>` + help[52] + `</td>
        <td></td>
        <td>` + help[53] + `</td>
      </tr>
      <tr>
        <td>` + help[54] + `</td>
        <td></td>
        <td>` + help[55] + `</td>
        <td></td>
        <td>` + help[56] + `</td>
      </tr>
    </table>
    </div>
  </div>
</div>`;
const content_section = `
<div id="rslidy-row-flex" aria-label="Rslidy slide deck, press h for help">
  <nav id="rslidy-overview-slides" class="rslidy-ui" tabindex="0" aria-label="slide overview"></nav>
  <main id="rslidy-content-section" role="region" aria-label="Slides">
    <div id="rslidy-trapezoid-wrapper-display" class="rslidy-ui">
      <div id="rslidy-tb-display-trapezoid">
        <button id="rslidy-button-current" class="rslidy-display-button" title="` + toolbar[12] + `">
          <span class="rslidy-tb-button rslidy-tb-display">` + one_slide_icon + `</span>
        </button>
      </div>
    </div>
  </main>
  <nav id="rslidy-overview-toc" class="rslidy-ui" tabindex="0" aria-label="table of contents"></nav>
</div>`;
const notes_text = `
<div id="rslidy-speakernotes-overlay"></div>`;
const image_viewer = `
<div class="rslidy-image-viewer rslidy-ui">
  <div class="rslidy-image-viewer-container">
    <img draggable="false" class="rslidy-image-viewer-content">
  </div>

  <span title="` + imageviewer[0] + `" class="rslidy-iv-button rslidy-iv-zoom-reset">
    &#x25A2;
  </span>
  <span title="` + imageviewer[1] + `" class="rslidy-iv-button rslidy-iv-zoom-in">
    &plus;
  </span>
  <span title="` + imageviewer[2] + `" class="rslidy-iv-button rslidy-iv-zoom-out">
    &minus;
  </span>
  <span title="` + imageviewer[3] + `" class="rslidy-iv-button rslidy-iv-close">
    &times;
  </span>
</div>`;
const thumbnail_html = (idx, xofy, slide, suffix) => `
<div class="rslidy-slide-thumbnail${suffix}" data-slideindex="${idx}" role="region">
<div class="rslidy-thumbnail-caption rslidy-noselect"><a class="rslidy-slide-link" aria-label="Slide ${xofy}" data-slideindex="${idx}" href="#${idx + 1}">${xofy}</a></div>
  <div class="rslidy-slide-clickelement" data-slideindex="${idx}">
    <div class="rslidy-overview-item${suffix} rslidy-noselect" data-slideindex="${idx}">${slide}</div>
  </div>
</div>`;
const link_html = (idx, title) => `
<div class="rslidy-slide-link" data-slideindex="${idx}"><a href="#${idx + 1}">${title}</a></div>`;
const preview_html = (idx) => `
<div class="rslidy-preview" data-slideindex="${idx}">
  <div class="rslidy-preview-item"></div>
</div>`;
const settings_html = `
<div id="rslidy-menu" class="rslidy-hidden rslidy-ui" role="region"
aria-label="Settings" tabindex="0">
  <label id="rslidy-checkbox-tilt-text" class="rslidy-menu-content-settings rslidy-disabled" aria-disabled="true">
    ` + settings[0] + `
    <input type="checkbox" value="Tilt" id="rslidy-checkbox-tilt" disabled>
    <label for="rslidy-checkbox-tilt">` + slider_icon + `</label>
  </label>
  <label id="rslidy-checkbox-shake-text" class="rslidy-menu-content-settings rslidy-disabled" aria-disabled="true">
    ` + settings[1] + `
    <input type="checkbox" value="Shake" id="rslidy-checkbox-shake" disabled>
    <label for="rslidy-checkbox-shake">` + slider_icon + `</label>
  </label>
  <label id="rslidy-checkbox-space-text" class="rslidy-menu-content-settings">
    ` + settings[2] + `
    <input type="checkbox" value="Tap" id="rslidy-checkbox-space" checked>
    <label for="rslidy-checkbox-space">` + slider_icon + `</label>
  </label>
  <label id="rslidy-checkbox-margintap-text" class="rslidy-menu-content-settings">
    ` + settings[3] + `
    <input type="checkbox" value="Tap" id="rslidy-checkbox-margintap" checked>
    <label for="rslidy-checkbox-margintap">` + slider_icon + `</label>
  </label>
  <label id="rslidy-checkbox-lowlight-text" class="rslidy-menu-content-settings">
    ` + settings[4] + `
    <input type="checkbox" value="Low Light Mode" id="rslidy-checkbox-lowlightmode">
    <label for="rslidy-checkbox-lowlightmode">` + slider_icon + `</label>
  </label>
  <div class="rslidy-menu-content-settings">
    <label>` + settings[5] + `</label>
    <a href="#" title="` + settings[7] + `" id="rslidy-button-font-minus"><span class="rslidy-menu-button">` + font_minus_icon + `</span></a>
    <a href="#" title="` + settings[8] + `" id="rslidy-button-font-reset"><span class="rslidy-menu-button">` + font_reset_icon + `</span></a>
    <a href="#" title="` + settings[9] + `" id="rslidy-button-font-plus"><span class="rslidy-menu-button">` + font_plus_icon + `</span></a>
  </div>
  <div class="rslidy-menu-content-settings">
    <label>` + settings[6] + `</label>
    <a href="#" title="` + settings[10] + `" id="rslidy-button-font-minus-ui"><span class="rslidy-menu-button">` + font_minus_icon + `</span></a>
    <a href="#" title="` + settings[11] + `" id="rslidy-button-font-reset-ui"><span class="rslidy-menu-button">` + font_reset_icon + `</span></a>
    <a href="#" title="` + settings[12] + `" id="rslidy-button-font-plus-ui"><span class="rslidy-menu-button">` + font_plus_icon + `</span></a>
  </div>
</div>`;
const print_settings_html = `
<div id="rslidy-print-menu" class="rslidy-hidden rslidy-ui"
role="region" aria-label="Print Settings" tabindex="0">
  <label id="rslidy-checkbox-snum-text" class="rslidy-menu-content">
    ` + print_settings[0] + `
    <input type="checkbox" value="Numbers" id="rslidy-checkbox-snum">
    <label for="rslidy-checkbox-snum">` + slider_icon + `</label>
  </label>
  <label id="rslidy-checkbox-frame-text" class="rslidy-menu-content">
    ` + print_settings[1] + `
    <input type="checkbox" value="Numbers" id="rslidy-checkbox-frame">
    <label for="rslidy-checkbox-frame">` + slider_icon + `</label>
  </label>
  <label id="rslidy-checkbox-link-text" class="rslidy-menu-content">
    ` + print_settings[2] + `
    <input type="checkbox" value="Links" id="rslidy-checkbox-link">
    <label for="rslidy-checkbox-link">` + slider_icon + `</label>
  </label>
 <fieldset id="rslidy-slide-print-options">` + print_settings[3] + `
    <label class="rslidy-print-slides">
      <input type="radio" name="slide-print-option" value="all" checked class="rslidy-print-slide-input"> All
    </label>
    <label class="rslidy-print-slides">
      <input type="radio" name="slide-print-option" value="current" class="rslidy-print-slide-input"> Current
    </label>
    <label class="rslidy-print-slides">
      <input type="radio" name="slide-print-option" value="custom" class="rslidy-print-slide-input"> Slides:
      <input type="text" id="rslidy-slide-range-input" placeholder="1-5,8,10" disabled style="width: 4rem;">
    </label>
  </fieldset>
  <label id="rslidy-input-font-size-text" class="rslidy-menu-content">
    ` + print_settings[4] + `
    <input type="number" id="rslidy-input-font-size" value="100" min="0" max="100">
  <span class="percent">%</span>
  </label>
  <label id="rslidy-select-orientation-text" class="rslidy-menu-content">
    ` + print_settings[5] + `
    <select id="rslidy-select-orientation">
      <option value="portrait">Portrait</option>
      <option selected="selected" value="landscape">Landscape</option>
    </select>
  </label>
   <label id="rslidy-select-paper-size-text" class="rslidy-menu-content">
    ` + print_settings[6] + `
    <select id="rslidy-select-paper-size">
    <option value="216mm 356mm">Legal</option>
    <option value="216mm 279mm">Letter</option>
    <option value="279mm 432mm">Tabloid</option>
    <option value="841mm 1189mm">A0</option>
    <option value="594mm 841mm">A1</option>
    <option value="420mm 594mm">A2</option>
    <option value="297mm 420mm">A3</option>
    <option selected="selected" value="210mm 297mm">A4</option>
    <option value="148mm 210mm">A5</option>
    </select>
  </label>
  <fieldset id="rslidy-exclusive-checkboxes" style="margin-top: 1.5em;">
  <h4 style="margin-bottom: 1.5em;">Print Sizing</h4>
   <label id="rslidy-checkbox-actual-size-text" class="rslidy-print-sizing">
      <input type="radio" name="print-options" value="actual" id="rslidy-checkbox-actual" class="print-checkbox" checked> Actual Size
    </label>
    <br>
    <label id="rslidy-checkbox-scale-text" class="rslidy-print-sizing">
      <input type="radio" name="print-options" value="fit" id="rslidy-checkbox-fit" class="print-checkbox"> Fit
    </label>
    <br>
    <label id="rslidy-checkbox-scale-text" class="rslidy-print-sizing">
      <input type="radio" name="print-options" value="shrink" id="rslidy-checkbox-fit" class="print-checkbox"> Shrink
    </label>
    <br>
    <label id="rslidy-checkbox-shrink-text" class="rslidy-print-sizing">
      <input type="radio" name="print-options" value="fit-width" id="rslidy-checkbox-shrink" class="print-checkbox"> Fit to Width
    </label>
    <br>
    <label id="rslidy-checkbox-custom-text" class="rslidy-print-sizing">
      <input type="radio" name="print-options" value="custom" id="rslidy-checkbox-custom" class="print-checkbox"> Custom Scale:
      <input type="number" id="custom-scaling-input" value="100" class="scaling-input" min="1" max="100" disabled placeholder="100">
      <span class="percent">%</span>
    </label>
    <div id="rslidy-transform-origin-subsection">
  <h4>Position of Page:</h4>
  <div class="button-container">
    <label class="rslidy-print-position" data-tooltip="Top Left">
      <input type="radio" name="transform-origin" value="top left" class="print-checkbox">
      <svg width="25" height="25" viewBox="0 0 25 25">
        <rect width="25" height="25" fill="grey" />
        <circle cx="5" cy="5" r="3.5" fill="lightblue" />
      </svg>
    </label>

    <label class="rslidy-print-position" data-tooltip="Top Center">
      <input type="radio" name="transform-origin" value="top center" class="print-checkbox">
      <svg width="25" height="25" viewBox="0 0 25 25">
        <rect width="25" height="25" fill="grey" />
        <circle cx="12.5" cy="5" r="3.5" fill="lightblue" />
      </svg>
    </label>

    <label class="rslidy-print-position" data-tooltip="Top Right">
      <input type="radio" name="transform-origin" value="top right" class="print-checkbox">
      <svg width="25" height="25" viewBox="0 0 25 25">
        <rect width="25" height="25" fill="grey" />
        <circle cx="20" cy="5" r="3.5" fill="lightblue" />
      </svg>
    </label>
  </div>
      <div class="button-container">
        <label class="rslidy-print-position" data-tooltip="Center Left">
          <input type="radio" name="transform-origin" value="center left" class="print-checkbox">
          <svg width="25" height="25" viewBox="0 0 25 25">
            <rect width="25" height="25" fill="grey" />
            <circle cx="5" cy="12.5" r="3.5" fill="lightblue" />
          </svg>
        </label>
    
        <label class="rslidy-print-position" data-tooltip="Center Center">
          <input type="radio" name="transform-origin" value="center" class="print-checkbox" checked>
          <svg width="25" height="25" viewBox="0 0 25 25">
            <rect width="25" height="25" fill="grey" />
            <circle cx="12.5" cy="12.5" r="3.5" fill="lightblue" />
          </svg>
        </label>
    
        <label class="rslidy-print-position" data-tooltip="Center Right">
          <input type="radio" name="transform-origin" value="center right" class="print-checkbox">
          <svg width="25" height="25" viewBox="0 0 25 25">
            <rect width="25" height="25" fill="grey" />
            <circle cx="20" cy="12.5" r="3.5" fill="lightblue" />
          </svg>
        </label>
      </div>
    
      <div class="button-container">
        <label class="rslidy-print-position" data-tooltip="Bottom Left">
          <input type="radio" name="transform-origin" value="left bottom" class="print-checkbox">
          <svg width="25" height="25" viewBox="0 0 25 25">
            <rect width="25" height="25" fill="grey" />
            <circle cx="5" cy="20" r="3.5" fill="lightblue" />
          </svg>
        </label>
    
        <label class="rslidy-print-position" data-tooltip="Bottom Center">
          <input type="radio" name="transform-origin" value="center bottom" class="print-checkbox">
          <svg width="25" height="25" viewBox="0 0 25 25">
            <rect width="25" height="25" fill="grey" />
            <circle cx="12.5" cy="20" r="3.5" fill="lightblue" />
          </svg>
        </label>
    
        <label class="rslidy-print-position" data-tooltip="Bottom Right">
          <input type="radio" name="transform-origin" value="right bottom" class="print-checkbox">
          <svg width="25" height="25" viewBox="0 0 25 25">
            <rect width="25" height="25" fill="grey" />
            <circle cx="20" cy="20" r="3.5" fill="lightblue" />
          </svg>
        </label>
      </div>
    </div>
  </fieldset>
  <div class="rslidy-menu-content">
    <button id="rslidy-button-print-submit">` + print_settings[7] + `</button>
  </div>
</div>`;
const toolbar_html = `
<div id="rslidy-footer" class="rslidy-ui">
  <div id="rslidy-progress-bar-area">
    <div id="rslidy-trapezoid-wrapper">
      <div id="rslidy-tb-show-trapezoid" class="rslidy-hidden">
        <button id="rslidy-button-show" class="rslidy-show-button" title="` + toolbar[0] + `">
          <i class="rslidy-tb-button rslidy-tb-show">` + hide_icon + `</i>
        </button>
      </div>
    </div>
    <div id="rslidy-progress-bar"></div>
    <div id="rslidy-progress-bar-bg"></div>
    <div id="rslidy-progress-bar-nubs"></div>
  </div>
  <div id="rslidy-toolbar-area">
    <div id="rslidy-toolbar" role="region" aria-label="Toolbar">
      <div id="rslidy-toolbar-content">
        <div class="rslidy-float-left">
          <button id="rslidy-button-overview" aria-expanded="false" class="rslidy-toolbar-button" title="` + toolbar[1] + `">
            <i class="rslidy-tb-button">` + overview_icon + `</i>
          </button>
          <button id="rslidy-button-hide" class="rslidy-toolbar-button" title="` + toolbar[2] + `">
            <i class="rslidy-tb-button">` + hide_icon + `</i>
          </button>
          <button id="rslidy-button-all" class="rslidy-toolbar-button" title="` + toolbar[11] + `">
            <span class="rslidy-tb-button">` + all_slides_icon + `</span>
          </button>
        </div>

        <div id="rslidy-toolbar-button-nav">
          <button id="rslidy-button-first" class="rslidy-toolbar-button" title="` + toolbar[3] + `">
              <i class="rslidy-tb-button rslidy-mirror">` + last_icon + `</i>
          </button>

          <button id="rslidy-button-previous" class="rslidy-toolbar-button" title="` + toolbar[4] + `">
              <i class="rslidy-tb-button rslidy-mirror">` + next_icon + `</i>
          </button>
          <div class="rslidy-toolbar-slide"><input value="1" id="rslidy-slide-input" type="textbox" aria-label="Jump to slide" maxlength="3"></div>
          <div class="rslidy-toolbar-slide" id="rslidy-slide-caption"></div>
          <button id="rslidy-button-next" class="rslidy-toolbar-button"  title="` + toolbar[5] + `">
              <i class="rslidy-tb-button">` + next_icon + `</i>
          </button>
          <button id="rslidy-button-last" class="rslidy-toolbar-button" title="` + toolbar[6] + `">
              <i class="rslidy-tb-button">` + last_icon + `</i>
          </button>
        </div>

        <div class="rslidy-float-right">
          <button id="rslidy-button-print" aria-expanded="false" class="rslidy-toolbar-button" title="` + toolbar[9] + `">
            <i class="rslidy-tb-button">` + print_icon + `</i>
          </button>
          <button id="rslidy-button-menu" aria-expanded="false" class="rslidy-toolbar-button" title="` + toolbar[8] + `">
            <i class="rslidy-tb-button">` + settings_icon + `</i>
          </button>
          <button id="rslidy-button-help" class="rslidy-toolbar-button" title="` + toolbar[10] + `">
            <i class="rslidy-tb-button">` + help_icon + `</i>
          </button>
          <button id="rslidy-button-toc" aria-expanded="false" class="rslidy-toolbar-button" title="` + toolbar[7] + `">
            <i class="rslidy-tb-button">` + toc_icon + `</i>
          </button>
        </div>

        <div class="rslidy-float-right" id="rslidy-timer">00:00</div>
      </div>
    </div>
  </div>
</div>`;

;// ./src/ts/build/js/ts/settings.js

class SettingsComponent {
    constructor() {
        this.slidefont = 0;
        this.uifont = 0;
        this.view =
            window.rslidy.utils.prependHtmlString(document.body, settings_html);
        // Parse default font sizes, in case the slide creator changes them
        this.default = window.rslidy.utils.getEM("#rslidy-content-section .slide");
        this.default_ui = window.rslidy.utils.getEM(".rslidy-ui");
        this.default_footer = window.rslidy.utils.getEM("#rslidy-footer");
        this.view
            .querySelector("#rslidy-button-font-plus")
            .addEventListener("click", e => this.changeSlideFont(e, 1));
        this.view
            .querySelector("#rslidy-button-font-reset")
            .addEventListener("click", e => this.changeSlideFont(e, 0));
        this.view
            .querySelector("#rslidy-button-font-minus")
            .addEventListener("click", e => this.changeSlideFont(e, -1));
        this.view
            .querySelector("#rslidy-button-font-plus-ui")
            .addEventListener("click", e => this.changeUIFont(e, 1));
        this.view
            .querySelector("#rslidy-button-font-reset-ui")
            .addEventListener("click", e => this.changeUIFont(e, 0));
        this.view
            .querySelector("#rslidy-button-font-minus-ui")
            .addEventListener("click", e => this.changeUIFont(e, -1));
        this.view
            .querySelector("#rslidy-checkbox-tilt")
            .addEventListener("click", e => window.rslidy.toolbar.closeMenuOnSelection());
        this.view
            .querySelector("#rslidy-checkbox-shake")
            .addEventListener("click", e => window.rslidy.toolbar.closeMenuOnSelection());
        this.view
            .querySelector("#rslidy-checkbox-space")
            .addEventListener("click", e => window.rslidy.toolbar.closeMenuOnSelection());
        this.view
            .querySelector("#rslidy-checkbox-margintap")
            .addEventListener("click", e => window.rslidy.toolbar.closeMenuOnSelection());
        this.view
            .querySelector("#rslidy-checkbox-lowlightmode")
            .addEventListener("click", e => window.rslidy.toolbar.closeMenuOnSelection(() => window.rslidy.toggleLowLightMode()));
    }
    // ---
    // Description: Load settings from the localStorage
    // ---
    loadSettings() {
        try {
            var item = localStorage.getItem("rslidy");
        }
        catch (e) {
            console.log(e);
            return;
        }
        if (item === null || item === undefined)
            return;
        var data = JSON.parse(item);
        if (data.slidefont != undefined)
            while (data.slidefont != this.slidefont)
                this.changeSlideFont(null, data.slidefont > 0 ? 1 : -1);
        if (data.uifont != undefined)
            while (data.uifont != this.uifont)
                this.changeUIFont(null, data.uifont > 0 ? 1 : -1);
        this.view.querySelector("#rslidy-checkbox-tilt").checked = data.tilt;
        this.view.querySelector("#rslidy-checkbox-shake").checked = data.shake;
        this.view.querySelector("#rslidy-checkbox-space").checked = data.space;
        this.view.querySelector("#rslidy-checkbox-margintap").checked = data.margintap;
        this.view.querySelector("#rslidy-checkbox-lowlightmode").checked = data.lowlightmode;
        if (data.lowlightmode)
            window.rslidy.toggleLowLightMode();
    }
    // ---
    // Description: Save settings to the localStorage
    // ---
    saveSettings() {
        try {
            localStorage.removeItem("rslidy");
            localStorage.setItem("rslidy", this.generateJSON());
        }
        catch (e) {
            console.log(e);
        }
    }
    // ---
    // Description: Generate a JSON string for the localStorage
    // ---
    generateJSON() {
        const data = {
            slidefont: this.slidefont,
            uifont: this.uifont,
            tilt: this.view.querySelector("#rslidy-checkbox-tilt").checked,
            shake: this.view.querySelector("#rslidy-checkbox-shake").checked,
            space: this.view.querySelector("#rslidy-checkbox-space").checked,
            margintap: this.view.querySelector("#rslidy-checkbox-margintap").checked,
            lowlightmode: this.view.querySelector("#rslidy-checkbox-lowlightmode").checked
        };
        return JSON.stringify(data);
    }
    // ---
    // Description: Used for final style adaptions.
    // ---
    doCustomSettingAdaptions() {
        // Start in night mode if set or user prefers it
        // Currently low light mode is broken in firefox mobile
        // filter:invert() causes the page to overflow
        // add "|| window.matchMedia("(prefers-color-scheme: dark)").matches"
        // to auto-enable low light mode once its fixed
        if (window.rslidy.start_in_low_light_mode) {
            var lowlightbtn = document.getElementById("rslidy-checkbox-lowlightmode");
            if (!lowlightbtn.checked) {
                window.rslidy.toggleLowLightMode();
                lowlightbtn.checked = true;
            }
        }
        // Block slide text selection if set
        if (window.rslidy.block_slide_text_selection) {
            var content_section = document.getElementById("rslidy-content-section");
            var original_slides = content_section.getElementsByClassName("slide");
            for (var i = 0; i < original_slides.length; i++)
                original_slides[i].classList.add("rslidy-noselect");
        }
    }
    // ---
    // Description: Called whenever one of the text size buttons is clicked.
    // e: The event.
    // value: Specifies the size modifier (1 = more, -1 = less).
    // ---
    changeSlideFont(e, value) {
        if (value == 0)
            this.slidefont = 0;
        else
            this.slidefont += value;
        var slides_large = document.querySelectorAll("#rslidy-content-section .slide");
        for (var i = 0; i < slides_large.length; i++) {
            if (value == 0)
                slides_large[i].style.fontSize = this.default + "em";
            var current_font_size = parseFloat(slides_large[i].style.fontSize);
            if ((current_font_size > window.rslidy.min_slide_font && value == -1) ||
                (current_font_size < window.rslidy.max_slide_font && value == 1))
                slides_large[i].style.fontSize =
                    current_font_size + window.rslidy.font_step * value + "em";
            else if (isNaN(current_font_size))
                slides_large[i].style.fontSize =
                    this.default + window.rslidy.font_step * value + "em";
        }
        // Prevent default actions after event handling
        if (e)
            e.preventDefault();
    }
    // ---
    // Description: Called whenever one of the text size buttons is clicked.
    // e: The event.
    // value: Specifies the size modifier (1 = more, -1 = less).
    // ---
    changeUIFont(e, value) {
        if (value == 0)
            this.uifont = 0;
        else
            this.uifont += value;
        var ui = document.querySelectorAll(".rslidy-ui");
        var footer = document.querySelector("#rslidy-footer");
        for (var i = 0; i < ui.length; i++) {
            if (value == 0)
                ui[i].style.fontSize = this.default_ui + "em";
            var current_font_size = parseFloat(ui[i].style.fontSize);
            if ((current_font_size > window.rslidy.min_slide_font && value == -1) ||
                (current_font_size < window.rslidy.max_slide_font && value == 1))
                ui[i].style.fontSize =
                    current_font_size + window.rslidy.font_step * value + "em";
            else if (isNaN(current_font_size))
                ui[i].style.fontSize =
                    this.default_ui + window.rslidy.font_step * value + "em";
        }
        // Prevent footer from overflowing, if on smaller screens
        if (this.default_footer < 1 &&
            parseFloat(footer.style.fontSize) > this.default_footer)
            footer.style.fontSize = this.default_footer + "em";
        setTimeout(() => { this.checkToolbarOverflow(); }, 1000);
        // Prevent default actions after event handling
        if (e)
            e.preventDefault();
    }
    // ---
    // Description: Checks the toolbar for overflow and scales it down if needed.
    // ---
    checkToolbarOverflow() {
        // check if footer is still on the same line
        var ov = document.querySelector("#rslidy-button-overview").getBoundingClientRect();
        var toc = document.querySelector("#rslidy-button-toc").getBoundingClientRect();
        console.log(ov.top + " - " + toc.top);
        if (ov.top == toc.top)
            return;
        else
            this.changeUIFont(null, -1);
    }
}

;// ./src/ts/build/js/ts/print-settings.js

class PrintSettingsComponent {
    constructor() {
        var _a;
        this.view = window.rslidy.utils.prependHtmlString(document.body, print_settings_html);
        this.initializeSlideRangeToggle();
        // Set default values
        this.view.querySelector("#rslidy-checkbox-snum").checked = true;
        this.view.querySelector("#rslidy-checkbox-link").checked = true;
        // Apply print settings on change
        const inputs = this.view.getElementsByTagName("input");
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].onchange = () => this.applyPrintSettings();
        }
        // Close menu on selection
        const elementsToCloseOn = [
            "#rslidy-checkbox-link",
            "#rslidy-checkbox-snum",
            "#rslidy-checkbox-frame",
            "#rslidy-input-font-size",
            "#rslidy-button-print-submit"
        ];
        elementsToCloseOn.forEach(selector => {
            var _a;
            (_a = this.view.querySelector(selector)) === null || _a === void 0 ? void 0 : _a.addEventListener("click", e => window.rslidy.toolbar.closeMenuOnSelection());
        });
        // Print button handler
        (_a = this.view.querySelector("#rslidy-button-print-submit")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", e => this.print());
        this.applyPrintSettings();
    }
    initializeSlideRangeToggle() {
        const slideRadios = this.view.querySelectorAll('input[name="slide-print-option"]');
        const rangeInput = this.view.querySelector("#rslidy-slide-range-input");
        const positionRadios = this.view.querySelectorAll('input[name="transform-origin"]');
        const customScaleRadio = this.view.querySelector('#rslidy-checkbox-custom');
        const scalingInput = this.view.querySelector('#custom-scaling-input');
        if (!slideRadios.length || !rangeInput || !customScaleRadio) {
            console.error("Print settings elements not found!");
            return;
        }
        // Update all dependent states
        const updateStates = () => {
            var _a, _b;
            // Fix: Properly type the checked radio button
            const checkedSlideRadio = this.view.querySelector('input[name="slide-print-option"]:checked');
            const isCustomSlide = (checkedSlideRadio === null || checkedSlideRadio === void 0 ? void 0 : checkedSlideRadio.value) === "custom";
            const isCustomScale = customScaleRadio.checked;
            // Slide range input
            rangeInput.disabled = !isCustomSlide;
            // Rest of the method remains the same...
            scalingInput.disabled = !isCustomScale;
            positionRadios.forEach(radio => {
                radio.disabled = !isCustomScale;
                const label = radio.closest('label');
                if (label) {
                    label.style.opacity = isCustomScale ? "1" : "0.5";
                    label.style.cursor = isCustomScale ? "pointer" : "not-allowed";
                }
            });
            // Update position visual feedback
            document.querySelectorAll(".rslidy-print-position svg rect").forEach(rect => {
                rect.setAttribute("fill", "grey");
            });
            if (isCustomScale) {
                const selectedPosition = this.view.querySelector('input[name="transform-origin"]:checked');
                if (selectedPosition) {
                    (_b = (_a = selectedPosition.closest('label')) === null || _a === void 0 ? void 0 : _a.querySelector('rect')) === null || _b === void 0 ? void 0 : _b.setAttribute("fill", "#4D4D4D");
                }
            }
        };
        // Initialize states
        updateStates();
        // Event listeners
        slideRadios.forEach(radio => {
            radio.addEventListener("change", updateStates);
        });
        customScaleRadio.addEventListener("change", updateStates);
        // Position selection highlighting
        positionRadios.forEach(radio => {
            radio.addEventListener("change", function () {
                var _a, _b;
                if (!customScaleRadio.checked)
                    return;
                document.querySelectorAll(".rslidy-print-position svg rect").forEach(rect => {
                    rect.setAttribute("fill", "grey");
                });
                (_b = (_a = this.closest('label')) === null || _a === void 0 ? void 0 : _a.querySelector('rect')) === null || _b === void 0 ? void 0 : _b.setAttribute("fill", "#4D4D4D");
            });
        });
        // Print options changes
        document.querySelectorAll('input[name="print-options"]').forEach(radio => {
            radio.addEventListener("change", updateStates);
        });
    }
    applyPrintSettings() {
        if (this.style) {
            document.head.removeChild(this.style);
        }
        // Get all settings values
        const link = this.view.querySelector("#rslidy-checkbox-link");
        const snum = this.view.querySelector("#rslidy-checkbox-snum");
        const frame = this.view.querySelector("#rslidy-checkbox-frame");
        const font_size = this.view.querySelector("#rslidy-input-font-size");
        const layout = this.view.querySelector("#rslidy-select-orientation");
        const paperSize = this.view.querySelector("#rslidy-select-paper-size");
        const selectedSlideOption = this.view.querySelector('input[name="slide-print-option"]:checked');
        const slideRangeInput = this.view.querySelector("#rslidy-slide-range-input");
        const selectedOrigin = this.view.querySelector('input[name="transform-origin"]:checked');
        const origin = (selectedOrigin === null || selectedOrigin === void 0 ? void 0 : selectedOrigin.value) || "center";
        const scalingInput = this.view.querySelector("#custom-scaling-input");
        let css = "@media print {\n";
        // Handle slide visibility
        if (selectedSlideOption.value === "custom") {
            const range = this.parseSlideRange(slideRangeInput.value);
            css += this.applyCustomSlideRange(range);
        }
        else if (selectedSlideOption.value === "current") {
            css += this.applyCurrentSlideOnly();
        }
        // Paper size and orientation
        const isValidFormat = /^\d+(mm|in)\s\d+(mm|in)$/.test(paperSize.value);
        if (!isValidFormat) {
            console.error("Invalid paper size format");
            return;
        }
        let dimensions = paperSize.value;
        if (layout.value === "landscape") {
            const [width, height] = dimensions.split(" ");
            dimensions = `${height} ${width}`;
        }
        css += `
      #chart .window-rv { display: block; }
      #rslidy-content-section .slide { display: block; }
      .slide.animated { animation: none !important; }
      .unitdisk-nav { position: relative !important; height: 65vh !important; top: 15% !important; }
      #vorotree canvas { display: block; position: relative !important; max-width: 100% !important; height: auto !important; }
      @page { size: ${dimensions}; }
    `;
        // Handle print sizing options
        const selectedOption = this.view.querySelector('input[name="print-options"]:checked');
        if (selectedOption) {
            switch (selectedOption.value) {
                case "actual":
                    css += `
            body {
                transform: none !important;
                max-height: 100% !important;
                text-size-adjust: none !important;
                -webkit-text-size-adjust: none !important;
                print-color-adjust: exact !important;
                width: 100% !important;
            }
            #rslidy-content-section .slide {
                height: auto !important;
                max-width: ${window.innerWidth}px !important;
                overflow: visible !important;
                page-break-after: always !important;
                padding: 2rem !important;
            }
                `;
                    break;
                case "fit-width":
                    css += `
              #rslidy-content-section .slide {
                  width: 100%%! important;
                  max-width: 100% !important;
                  height: auto !important;
                  overflow: visible !important;
                  padding: 2rem !important;
              }
          `;
                    break;
                case "shrink":
                    const [pageWidth, pageHeight] = paperSize.value.split(" ");
                    const mmToPx = mm => mm * 3.7795;
                    const pageHeightPx1 = mmToPx(parseFloat(pageHeight));
                    const slide = document.querySelector('.slide'); // or loop over all
                    const slides = document.querySelectorAll('.slide');
                    slides.forEach(slide => {
                        if (!(slide instanceof HTMLElement))
                            return;
                        const rawHeight = pageHeight.replace("mm", ""); // removes 'mm'
                        const rect = slide.getBoundingClientRect();
                        const height = rect.height;
                        const scale = Math.min(mmToPx(parseFloat('210')) / height, 1);
                        slide.style.transform = `scale(${scale})`;
                        slide.style.transformOrigin = 'top left';
                    });
                    css += `
              #rslidy-content-section .slide {
                  margin: 0 auto;
                  overflow: visible;
                  page-break-after: always;
              }
          `;
                    break;
                case "fit":
                    const [widthStr, heightStr] = paperSize.value.split(" ");
                    const width = parseFloat(widthStr);
                    const height = parseFloat(heightStr);
                    const isLandscape = layout.value === "landscape";
                    // Convert paper dimensions from mm/in to pixels (assuming 96dpi)
                    const unit = widthStr.replace(/[0-9.]/g, ''); // Extract unit (mm or in)
                    let pageWidthPx, pageHeightPx;
                    if (unit === "mm") {
                        pageWidthPx = (isLandscape ? height : width) / 25.4 * 96;
                        pageHeightPx = (isLandscape ? width : height) / 25.4 * 96;
                    }
                    else {
                        pageWidthPx = (isLandscape ? height : width) * 96;
                        pageHeightPx = (isLandscape ? width : height) * 96;
                    }
                    const marginPx = 10 / 25.4 * 96;
                    const printableWidth = pageWidthPx - (2 * marginPx);
                    const printableHeight = pageHeightPx - (2 * marginPx);
                    css += `
    #rslidy-content-section .slide {
      width: ${printableWidth}px !important;
      height: ${printableHeight}px !important;
      transform-origin: top left !important;
     transform: scale(var(--slide-scale-factor)) !important;
      page-break-after: always !important;
      overflow: visible !important;
      position: relative !important;
      padding: 2rem !important;
      display: block !important; /* Ensure slides are visible for calculation */
    }
    
    #rslidy-content-section .slide > div {
     
      transform-origin: top left !important;
      width: 100% !important;
      height: 100% !important;
    }
  `;
                    const script = document.createElement('script');
                    script.textContent = `
    // Force reflow
    document.body.offsetHeight;
    
    setTimeout(() => {
      document.querySelectorAll('#rslidy-content-section .slide').forEach(slide => {
        // Save original style
        const originalDisplay = slide.style.display;
        const originalVisibility = slide.style.visibility;
        const originalPosition = slide.style.position;

        // Force visibility for measurement
        slide.style.display = 'block';
        slide.style.visibility = 'hidden';
        slide.style.position = 'absolute';

        // Trigger reflow and get slide dimensions
        const rect = slide.getBoundingClientRect();
        const slideWidth = rect.width;
        const slideHeight = rect.height;

        // Restore original styles
        slide.style.display = originalDisplay;
        slide.style.visibility = originalVisibility;
        slide.style.position = originalPosition;

        if (slideWidth <= 0 || slideHeight <= 0) {
          console.warn('Skipping slide with invalid dimensions');
          return;
        }

        // Calculate dynamic scaling for each slide
        const scaleX = ${printableWidth} / slideWidth;
        const scaleY = ${printableHeight} / slideHeight;

        // Apply the smaller scale factor to fit the slide on the page
        const scaleFactor = Math.min(scaleX, scaleY);

        if (!isFinite(scaleFactor)) {
          console.error('Invalid scale factor calculated:', scaleFactor);
          return;
        }

        // Apply the dynamic scale factor for each slide
        slide.style.setProperty('--slide-scale-factor', scaleFactor);
      });
    }, 100);
  `;
                    document.head.appendChild(script);
                    break;
                case "custom":
                    const scalingValue = parseFloat(scalingInput.value);
                    if (!isNaN(scalingValue) && scalingValue > 0) {
                        const scaleFactor = scalingValue / 100;
                        const origin = (selectedOrigin === null || selectedOrigin === void 0 ? void 0 : selectedOrigin.value) || "center";
                        css += `
              #rslidy-content-section .slide {
                bottom: 0 !important;
                left: 0 !important;
              
                transform: scale(${scaleFactor}) !important;
                transform-origin: ${origin} !important;
                width: auto !important;
                height: auto !important;
                overflow: visible !important;
                margin: 0;
                box-sizing: border-box;
              }
            `;
                    }
                    break;
            }
        }
        // Additional print settings
        if (!link.checked) {
            css += `a[href^="http://"]:after, a[href^="https://"]:after { content: "" !important; }`;
        }
        if (snum.checked) {
            css += `
        #rslidy-content-section { counter-reset: slide-counter; }
        #rslidy-content-section .slide:after {
          content: counter(slide-counter);
          counter-increment: slide-counter;
          position: absolute;
          right: 0.8rem;
          bottom: 0.8rem;
          font: 60% Sans-Serif;
        }
      `;
        }
        if (frame.checked) {
            css += `.slide { border: ${window.rslidy.print_frame}; }`;
        }
        if (font_size.value != "") {
            css += `body { font-size: ${font_size.value}%; }`;
        }
        css += "\n}";
        // Inject CSS
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        document.head.appendChild(style);
        this.style = style;
        // Print media support
        if (window.matchMedia) {
            const mediaQueryList = window.matchMedia('print');
            mediaQueryList.addListener(mql => {
                if (mql.matches)
                    window.dispatchEvent(new Event('resize'));
            });
        }
    }
    parseSlideRange(input) {
        return input.split(',').reduce((acc, part) => {
            if (part.includes('-')) {
                const [start, end] = part.split('-').map(Number);
                if (!isNaN(start) && !isNaN(end) && start <= end) {
                    for (let i = start; i <= end; i++)
                        acc.push(i);
                }
            }
            else {
                const num = Number(part);
                if (!isNaN(num))
                    acc.push(num);
            }
            return acc;
        }, []);
    }
    applyCustomSlideRange(range) {
        const slides = document.querySelectorAll("#rslidy-content-section .slide");
        const totalSlides = slides.length;
        const validRange = range.filter(num => num >= 1 && num <= totalSlides);
        const visibleSlides = validRange
            .map(num => `#rslidy-content-section .slide:nth-of-type(${num}) { display: block !important; }`)
            .join("\n");
        return `
      #rslidy-content-section .slide { display: none !important; }
      ${visibleSlides}
    `;
    }
    applyCurrentSlideOnly() {
        const currentSlideIndex = window.rslidy.content.getCurrentSlideIndex();
        return `
      #rslidy-content-section .slide { display: none !important; }
      #rslidy-content-section .slide:nth-of-type(${currentSlideIndex + 1}) { display: block !important; }
    `;
    }
    print() {
        try {
            this.applyPrintSettings();
            const slides = document.querySelectorAll("#rslidy-content-section .slide");
            const originalHiddenSlides = new Set();
            slides.forEach(slide => {
                if (slide.classList.contains("rslidy-hidden")) {
                    originalHiddenSlides.add(slide);
                    slide.classList.remove("rslidy-hidden");
                }
            });
            setTimeout(() => {
                window.print();
                slides.forEach(slide => {
                    if (originalHiddenSlides.has(slide)) {
                        slide.classList.add("rslidy-hidden");
                    }
                });
            }, 200);
        }
        catch (e) {
            console.error("Print error:", e);
        }
    }
    loadSettings() {
        try {
            const item = localStorage.getItem("rslidy-print");
            if (!item)
                return;
            const data = JSON.parse(item);
            this.view.querySelector("#rslidy-checkbox-link").checked = data.links;
            this.view.querySelector("#rslidy-checkbox-snum").checked = data.slidenumbers;
            this.view.querySelector("#rslidy-checkbox-frame").checked = data.frame;
            if (data.font_size) {
                this.view.querySelector("#rslidy-input-font-size").value = data.font_size;
            }
            if (data.layout) {
                this.view.querySelector("#rslidy-select-orientation").value = data.layout;
            }
            if (data.paperSize) {
                this.view.querySelector("#rslidy-select-paper-size").value = data.paperSize;
            }
            this.applyPrintSettings();
        }
        catch (e) {
            console.error("Error loading settings:", e);
        }
    }
    saveSettings() {
        try {
            localStorage.setItem("rslidy-print", this.generateJSON());
        }
        catch (e) {
            console.error("Error saving settings:", e);
        }
    }
    generateJSON() {
        return JSON.stringify({
            links: this.view.querySelector("#rslidy-checkbox-link").checked,
            slidenumbers: this.view.querySelector("#rslidy-checkbox-snum").checked,
            frame: this.view.querySelector("#rslidy-checkbox-frame").checked,
            font_size: this.view.querySelector("#rslidy-input-font-size").value,
            layout: this.view.querySelector("#rslidy-select-orientation").value,
            paperSize: this.view.querySelector("#rslidy-select-paper-size").value
        });
    }
}

;// ./src/ts/build/js/ts/toolbar.js

class ToolbarComponent {
    constructor() {
        this.enableiv = false;
        this.view =
            window.rslidy.utils.appendHtmlString(document.querySelector('#rslidy-column-flex'), toolbar_html);
        this.view
            .querySelector("#rslidy-button-overview")
            .addEventListener("click", () => this.closeMenuOnBlur(() => this.overviewToggleClicked()));
        this.view
            .querySelector("#rslidy-button-toc")
            .addEventListener("click", () => this.closeMenuOnBlur(() => this.tocToggleClicked()));
        this.view
            .querySelector("#rslidy-button-help")
            .addEventListener("click", () => this.closeMenuOnBlur(() => this.helpToggleClicked()));
        this.view
            .querySelector("#rslidy-button-first")
            .addEventListener("click", () => this.closeMenuOnBlur(() => window.rslidy.content.navFirst()));
        this.view
            .querySelector("#rslidy-button-previous")
            .addEventListener("click", () => this.closeMenuOnBlur(() => window.rslidy.content.navPrevious(true)));
        this.view
            .querySelector("#rslidy-button-next")
            .addEventListener("click", () => this.closeMenuOnBlur(() => window.rslidy.content.navNext(true)));
        this.view
            .querySelector("#rslidy-button-last")
            .addEventListener("click", () => this.closeMenuOnBlur(() => window.rslidy.content.navLast()));
        this.view
            .querySelector("#rslidy-button-hide")
            .addEventListener("click", () => this.closeMenuOnBlur(() => this.showHideToggleClicked()));
        this.view
            .querySelector("#rslidy-button-show")
            .addEventListener("click", () => this.showHideToggleClicked());
        this.view
            .querySelector("#rslidy-button-all")
            .addEventListener("click", () => this.displayToggleClicked());
        this.view
            .querySelector("#rslidy-timer")
            .addEventListener("click", () => this.closeMenuOnBlur(() => window.rslidy.toggleTimer()));
        this.view
            .querySelector("#rslidy-slide-caption")
            .addEventListener("click", () => this.closeMenuOnBlur(() => this.tocToggleClicked()));
        this.view
            .querySelector("#rslidy-button-menu")
            .addEventListener("click", () => this.menuToggleClicked(window.rslidy.MENU));
        this.view
            .querySelector("#rslidy-button-print")
            .addEventListener("click", () => this.menuToggleClicked(window.rslidy.PRINT_MENU));
        this.view
            .querySelector("#rslidy-slide-input")
            .addEventListener("keyup", e => this.closeMenuOnBlur(() => window.rslidy.slideInputKeyPressed(e)));
        // Only allow numbers for slide input
        window.rslidy.utils.setInputFilter(document.getElementById("rslidy-slide-input"), function (value) { return /^\d*$/.test(value); });
        document.getElementById("rslidy-help")
            .addEventListener("mouseup", e => this.closeHelpOnBlur(e));
        if (window.rslidy.start_with_toolbar_minimized)
            this.showHideToggleClicked();
    }
    // ---
    // Description: Called whenever the overview button is clicked.
    // ---
    overviewToggleClicked() {
        window.rslidy.utils.switchElementsClass([document.getElementById("rslidy-overview-slides")], "rslidy-overview-visible");
        window.rslidy.utils.switchElementsClass([document.getElementById("rslidy-overview-slides")], "rslidy-invisible");
        window.rslidy.overview.adjustOverviewPanel();
        let visible = document.getElementById("rslidy-overview-slides").classList.contains("rslidy-overview-visible");
        document.getElementById("rslidy-button-overview").setAttribute("aria-expanded", String(visible));
        setTimeout(() => document.getElementById("rslidy-overview-slides").focus(), 100);
    }
    // ---
    // Description: Called whenever the help button is clicked.
    // ---
    helpToggleClicked() {
        if (window.location.hash.match("#rslidy-help"))
            window.location.hash = "#";
        else {
            window.location.hash = "#rslidy-help";
            document.getElementById("rslidy-help-popup").scrollTop = 0;
            document.getElementById("rslidy-help").focus();
        }
    }
    // ---
    // Description: Called when clicking on the help overlay and closes the help
    // panel when clicking outside of the popup.
    // e: The click event
    // ---
    closeHelpOnBlur(e) {
        if (e.target.id == "rslidy-help")
            window.location.hash = "#";
    }
    // ---
    // Description: Called whenever the toc button is clicked.
    // ---
    tocToggleClicked() {
        window.rslidy.utils.switchElementsClass([document.getElementById("rslidy-overview-toc")], "rslidy-overview-visible");
        window.rslidy.utils.switchElementsClass([document.getElementById("rslidy-overview-toc")], "rslidy-invisible");
        let visible = document.getElementById("rslidy-overview-toc").classList.contains("rslidy-overview-visible");
        document.getElementById("rslidy-button-toc").setAttribute("aria-expanded", String(visible));
        setTimeout(() => document.getElementById("rslidy-overview-toc").focus(), 100);
    }
    // ---
    // Description: Called whenever the all slides button is clicked.
    // ---
    displayToggleClicked() {
        if (this.allslides) {
            //find first visible slide
            var num = window.rslidy.content.currentSlideIndex;
            for (let i = 0; i < window.rslidy.num_slides; i++) {
                var slide = window.rslidy.utils.getSlide(i);
                if (window.rslidy.utils.checkVisible(slide)) {
                    num = i;
                    break;
                }
            }
            document.getElementsByTagName('head')[0].removeChild(this.allslides);
            this.allslides = null;
            if (this.enableiv)
                window.rslidy.image_viewer = true;
            if (this.printstyle)
                document.getElementsByTagName('head')[0].appendChild(this.printstyle);
            window.rslidy.content.showSlide(num, false);
        }
        else {
            var css = `
      body {
        background-color: white !important;
      }
      .rslidy-ui {
        display: none !important;
      }
      a[href^="http://"]:after, a[href^="https://"]:after {
        content: "" !important;
      }
      .slide.animated {
        animation: none !important;
      }
      .slide, #rslidy-column-flex, #rslidy-row-flex {
        display: block !important;
        page-break-after: avoid !important;
        page-break-inside: always !important;
        -webkit-region-break-inside: always !important;
        position: relative !important;
      }
      html,
      body,
      #rslidy-content-section, #rslidy-row-flex {
        left: 0em !important;
        right: 0em !important;
        max-height: 100% !important;
      }
      img {
        max-width: 100% !important;
        max-height: 100% !important;
      }
      #rslidy-content-section {
        counter-reset: slide-counter;
      }
      #rslidy-content-section .slide:after {
        display: block;
        content: counter(slide-counter);
        counter-increment: slide-counter;
        margin-top: 0.5em;
        text-align: right;
        font: 80% Sans-Serif;
      }
      .slide {
        border: ` + window.rslidy.print_frame + `;
      }
      #rslidy-trapezoid-wrapper-display {
        display: block !important;
      }`;
            // inject CSS
            var style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = css;
            document.getElementsByTagName('head')[0].appendChild(style);
            this.allslides = style;
            if (window.rslidy.image_viewer) {
                this.enableiv = true;
                window.rslidy.image_viewer = false;
            }
            if (window.rslidy.printSettings.style) {
                this.printstyle = window.rslidy.printSettings.style;
                document.getElementsByTagName('head')[0].removeChild(this.printstyle);
            }
            //scroll to current slide
            var slide = window.rslidy.utils.getSlide(window.rslidy.content.currentSlideIndex);
            slide.scrollIntoView();
        }
        window.dispatchEvent(new Event('resize'));
    }
    // ---
    // Description: Wrapper for the custom settings close_menu_on_blur and
    // close_menu_on_selection
    // fun: An optional function to execute before closing menues
    // condition: The condition for closing the menues
    // ---
    closeMenuWrapper(fun = null, condition) {
        if (fun)
            fun();
        if (condition)
            this.closeMenues();
    }
    // ---
    // Description: Close open menues on blur
    // ---
    closeMenuOnBlur(fun = null) {
        this.closeMenuWrapper(fun, window.rslidy.close_menu_on_blur);
    }
    // ---
    // Description: Close open menues on selection
    // ---
    closeMenuOnSelection(fun = null) {
        this.closeMenuWrapper(fun, window.rslidy.close_menu_on_selection);
    }
    // ---
    // Description: Closes all menues
    // ---
    closeMenues() {
        document.getElementById("rslidy-menu").classList.add("rslidy-hidden");
        document.getElementById("rslidy-print-menu").classList.add("rslidy-hidden");
        document.getElementById("rslidy-button-menu").setAttribute("aria-expanded", "false");
        document.getElementById("rslidy-button-print").setAttribute("aria-expanded", "false");
    }
    // ---
    // Description: Called whenever a menu button is clicked.
    // index: The index of the menu (See constants in rslidy.ts)
    // ---
    menuToggleClicked(index) {
        const menues = ["rslidy-menu", "rslidy-print-menu"];
        const buttons = ["rslidy-button-menu", "rslidy-button-print"];
        // Close other menu if open
        var close = document.getElementById(menues[(index + 1) % 2]);
        var closebtn = document.getElementById(buttons[(index + 1) % 2]);
        close.classList.add("rslidy-hidden");
        closebtn.setAttribute("aria-expanded", "false");
        // Toggle menu show status
        var menu = document.getElementById(menues[index]);
        var button = document.getElementById(buttons[index]);
        if (menu.classList.contains("rslidy-hidden")) {
            menu.classList.remove("rslidy-hidden");
            button.setAttribute("aria-expanded", "true");
        }
        else {
            menu.classList.add("rslidy-hidden");
            button.setAttribute("aria-expanded", "false");
        }
        menu.focus();
        // iOS13 requires permissions for both event handlers (workaround)
        // needs to come from a user fired event (e.g click)
        // the page needs to be https
        if (index == window.rslidy.MENU) {
            if (typeof window.DeviceMotionEvent.requestPermission === 'function') {
                window.DeviceMotionEvent.requestPermission()
                    .then(permissionState => {
                    if (permissionState === 'granted') {
                        window.addEventListener("devicemotion", function (e) {
                            window.rslidy.onDeviceMotion(e);
                        }.bind(window.rslidy));
                    }
                })
                    .catch(console.error);
            }
            if (typeof window.DeviceOrientationEvent.requestPermission === 'function') {
                window.DeviceOrientationEvent.requestPermission()
                    .then(permissionState => {
                    if (permissionState === 'granted') {
                        window.addEventListener("deviceorientation", function (e) {
                            window.rslidy.onDeviceOrientation(e);
                        }.bind(window.rslidy));
                    }
                })
                    .catch(console.error);
            }
        }
    }
    // ---
    // Description: Called whenever the show/hide toolbar button is clicked.
    // ---
    showHideToggleClicked() {
        window.rslidy.utils.switchElementsClass([document.getElementById("rslidy-tb-show-trapezoid")], "rslidy-hidden");
        window.rslidy.utils.switchElementsClass([document.getElementById("rslidy-toolbar-area")], "rslidy-bar-hidden");
    }
}

;// ./src/ts/build/js/ts/overview.js

class OverviewComponent {
    constructor(model) {
        this.preview_width = 250;
        this.model = model;
        this.slide_view = document.querySelector('#rslidy-overview-slides');
        this.toc_view = document.querySelector('#rslidy-overview-toc');
        var nubs = document.querySelector('#rslidy-progress-bar-nubs');
        // Iterate over all slides and set up the overview and toc
        for (var i = 0; i < window.rslidy.num_slides; i++) {
            const slideHtml = model[i];
            const title = i + 1 + ". " + this.getSlideHeading(slideHtml);
            const xofy = i + 1 + " / " + window.rslidy.num_slides;
            const thumbnail = window.rslidy.utils.appendHtmlString(this.slide_view, thumbnail_html(i, xofy, slideHtml, ""));
            thumbnail.addEventListener("click", e => this.slideSelected(e));
            var pv = window.rslidy.utils.appendHtmlString(nubs, preview_html(i));
            pv.style.width = "calc(100%/" + window.rslidy.num_slides + ")";
            pv.style.left = "calc((100%/" + window.rslidy.num_slides + ")*" + i + ")";
            if (!window.rslidy.show_slide_dividers)
                pv.classList.add("rslidy-nonubs");
            pv.addEventListener("click", e => window.rslidy.content.showSlide(Number(e.target.dataset.slideindex), false));
            pv.addEventListener("mouseover", e => this.showPreview(e.target));
            pv.addEventListener("mouseout", e => this.removePreview(e.target));
            const link = window.rslidy.utils.appendHtmlString(this.toc_view, link_html(i, title));
            link.addEventListener("click", e => this.slideSelected(e));
        }
        this.slide_view.classList.add("rslidy-overview");
        this.toc_view.classList.add("rslidy-overview");
        this.adjustOverviewPanel();
        window.rslidy.utils.switchElementsClass([this.toc_view], "rslidy-invisible");
        window.rslidy.utils.switchElementsClass([this.slide_view], "rslidy-invisible");
    }
    // ---
    // Description: Adjust the overview panel
    // ---
    adjustOverviewPanel() {
        this.adjustPanel("");
    }
    // ---
    // Description: Adjust the progressbar preview panels
    // ---
    adjustPreviewPanel() {
        this.adjustPanel("-pv");
    }
    // ---
    // Description: Adjusts the aspect ratio and display sizes of the thumbnail
    // images in the overview menu.
    // suffix: used by the wrapper functions above
    // ---
    adjustPanel(suffix) {
        // Get items
        var thumbnail_wrappers = document.getElementsByClassName("rslidy-slide-thumbnail" + suffix);
        var overview_items = document.getElementsByClassName("rslidy-overview-item" + suffix);
        // Get the percentage of width pixels of the overview section with respect
        // to window.outerWidth
        var aspect_ratio = window.rslidy.custom_aspect_ratio != 0
            ? window.rslidy.custom_aspect_ratio
            : window.rslidy.utils.getCurrentAspectRatio();
        var overview_slide_zoom = window.rslidy.overview_slide_zoom;
        var custom_width = window.rslidy.custom_width;
        var final_width = custom_width / overview_slide_zoom;
        var overview_width = this.slide_view.clientWidth;
        if (suffix == "-pv")
            overview_width = this.preview_width;
        var relative_width = window.rslidy.utils.getRelativeWidth(overview_width, aspect_ratio, final_width);
        for (var i = 0; i < overview_items.length; i++) {
            // 1. Set width and height of the overview element to outerWidth and
            // outerHeight, respectively
            overview_items[i].style.width =
                window.rslidy.utils.getSlideWidth(aspect_ratio, final_width) + "px";
            overview_items[i].style.height =
                window.rslidy.utils.getSlideHeight(aspect_ratio, final_width) + "px";
            // 2. Do the transformation of the overview element now with
            // relative_width (browser compatibility)
            var scale_value = "scale3d(" +
                relative_width + ", " + relative_width + ", " + relative_width + ")";
            var origin_value = "0 0 0";
            overview_items[i].style.transform = scale_value; // safety first
            overview_items[i].style.transformOrigin = origin_value; // safety first
            overview_items[i].style.MozTransform = scale_value;
            overview_items[i].style.MozTransformOrigin = origin_value;
            overview_items[i].style.webkitTransform = scale_value;
            overview_items[i].style.webkitTransformOrigin = origin_value;
            overview_items[i].style.msTransform = scale_value;
            overview_items[i].style.msTransformOrigin = origin_value;
            // 3. Now, set the width pixels of the wrapper element to the overview
            // width pixels and calculate its height with the aspect ratio
            const w = overview_width;
            const h = w /
                (window.rslidy.utils.getSlideWidth(aspect_ratio, final_width) /
                    window.rslidy.utils.getSlideHeight(aspect_ratio, final_width));
            if (suffix == "-pv")
                thumbnail_wrappers[i].style.width = (w - 20) + "px";
            thumbnail_wrappers[i].style.height = (h - 20) + "px";
        }
    }
    // ---
    // Description: Returns the heading of a slide if available (or "slide" if
    // not found).
    // slide_element: The slide element to get the heading from.
    // ---
    getSlideHeading(slide_element) {
        if (slide_element.indexOf("<h1>") !== -1)
            return slide_element.substring(slide_element.indexOf("<h1>") + 4, slide_element.indexOf("</h1>"));
        else if (slide_element.indexOf("<h2>") !== -1)
            return slide_element.substring(slide_element.indexOf("<h2>") + 4, slide_element.indexOf("</h2>"));
        else if (slide_element.indexOf("<h3>") !== -1)
            return slide_element.substring(slide_element.indexOf("<h3>") + 4, slide_element.indexOf("</h3>"));
        else
            return "slide";
    }
    // ---
    // Description: Show a slide preview on the progressbar
    // e: the mouseover event
    // ---
    showPreview(e) {
        const i = Number(e.dataset.slideindex);
        const slideHtml = this.model[i];
        const xofy = i + 1 + " / " + window.rslidy.num_slides;
        const child = e.children[0];
        const thumbnail = window.rslidy.utils.appendHtmlString(child, thumbnail_html(i, xofy, slideHtml, "-pv"));
        thumbnail.addEventListener("touchstart", e2 => {
            this.slideSelected(e2);
            this.removePreview(e);
        });
        if (window.rslidy.low_light_mode) {
            let elements = child.getElementsByTagName("img");
            window.rslidy.utils.switchElementsClass(elements, "rslidy-color-invert");
        }
        var y = window.innerHeight - e.getBoundingClientRect().bottom + 20;
        var x = e.offsetLeft + e.offsetWidth / 2;
        x -= this.preview_width / 2;
        if (x < 0)
            x = 0;
        if (x > window.innerWidth - this.preview_width + 12)
            child.style.right = "0px";
        else
            child.style.left = x + "px";
        child.style.bottom = y + "px";
        this.adjustPreviewPanel();
    }
    // ---
    // Description: Remove a slide preview from the progressbar
    // e: the mouseout event
    // ---
    removePreview(e) {
        e.children[0].innerHTML = '';
    }
    // ---
    // Description: Called whenever a slide thumbnail in the overview gets
    // clicked.
    // e: Event.
    // ---
    slideSelected(e) {
        // Get the click target
        var target = e.target;
        // Fix for z-index bug on iOS
        while (target.className != "rslidy-slide-clickelement" &&
            target.className != "rslidy-slide-link")
            target = target.parentElement;
        // Get the index of the slide
        var slide_index = Number(target.dataset.slideindex);
        // Switch to this slide
        window.rslidy.content.showSlide(slide_index, false);
        // Close overview menu if desired
        if (window.rslidy.close_navigation_on_selection == true) {
            if (this.slide_view.classList.contains("rslidy-overview-visible"))
                window.rslidy.toolbar.overviewToggleClicked();
            if (this.toc_view.classList.contains("rslidy-overview-visible"))
                window.rslidy.toolbar.tocToggleClicked();
        }
        // Prevent link clicking (iOS)
        e.preventDefault();
    }
}

;// ./src/ts/build/js/ts/slide-transition.js
class SlideTransition {
    constructor() {
        this.animationTypeFade = "fade";
        this.animationTypeSlideIn = "slidein";
        this.animationTypeZoom = "zoom";
        this.isSlidein = false;
        this.hideTimeout = 500;
        this.contentSection = document.getElementById("rslidy-content-section");
        this.slides = this.contentSection.getElementsByClassName("slide");
        this.slideThumbnails = document.getElementsByClassName("rslidy-slide-thumbnail");
        let bodyClasses = document.getElementsByTagName("body")[0]
            .classList;
        if (!bodyClasses.contains("unanimated")) {
            if (bodyClasses.contains(this.animationTypeFade)) {
                this.setSlideTransitionClass(this.animationTypeFade);
            }
            else if (bodyClasses.contains(this.animationTypeZoom)) {
                this.setSlideTransitionClass(this.animationTypeZoom);
            }
            else {
                document
                    .getElementsByTagName("body")[0]
                    .classList.add(this.animationTypeSlideIn);
                this.setSlideTransitionClass(this.animationTypeSlideIn);
                this.isSlidein = true;
            }
        }
        else
            this.hideTimeout = 0;
        this.slideTimeouts = new Array(this.slides.length);
        // Hide all slides and remove selected effect
        for (let i = 0; i < this.slides.length; i++) {
            this.slides[i].classList.add("rslidy-hidden");
            this.slideThumbnails[i].classList.remove("rslidy-slide-selected");
        }
    }
    // ---
    // Description: Adds classes to the slides for proper slide transitions.
    // ---
    setSlideTransitionClass(transitionClass) {
        for (let i = 0; i < this.slides.length; i++) {
            this.slides[i].classList.add(transitionClass);
        }
    }
    // ---
    // Description: Handles a slide transition
    // currentSlideIndex: The current slide
    // targetSlideIndex: The target slide
    // animate: boolean to enable/disable animation
    // ---
    doSlideTransition(currentSlideIndex, targetSlideIndex, animate) {
        if (currentSlideIndex == targetSlideIndex) {
            return;
        }
        var current_slide_classes;
        var target_slide_classes = this.slides[targetSlideIndex].classList;
        if (currentSlideIndex >= 0) {
            current_slide_classes = this.slides[currentSlideIndex].classList;
            current_slide_classes.remove("animated");
            // Don't animate when skipping slides
            if (!animate) {
                target_slide_classes.remove("animated");
                current_slide_classes.add("rslidy-hidden");
            }
            else {
                target_slide_classes.add("animated");
                setTimeout(() => {
                    // restarts the animation
                    current_slide_classes.add("animated");
                }, 10);
                this.slideTimeouts[currentSlideIndex] = setTimeout(() => {
                    current_slide_classes.add("rslidy-hidden");
                }, this.hideTimeout);
            }
            this.slideThumbnails[currentSlideIndex].classList.remove("rslidy-slide-selected");
        }
        if (this.isSlidein) {
            // Fix classes
            if (currentSlideIndex >= 0) {
                if (current_slide_classes.contains("slideout")) {
                    current_slide_classes.remove("slideout");
                    current_slide_classes.add("slidein");
                }
            }
            if (target_slide_classes.contains("slideout")) {
                target_slide_classes.remove("slideout");
                target_slide_classes.add("slidein");
            }
            // We move backwards, so change from slidein to slideout
            if (currentSlideIndex > targetSlideIndex) {
                current_slide_classes.remove("slidein");
                current_slide_classes.add("slideout");
                target_slide_classes.remove("slidein");
                target_slide_classes.add("slideout");
            }
        }
        if (currentSlideIndex >= 0) {
            current_slide_classes.remove("forwards");
            current_slide_classes.add("backwards");
        }
        target_slide_classes.remove("backwards");
        target_slide_classes.add("forwards");
        // Show specified slide and add selected effect
        if (this.slideTimeouts[targetSlideIndex] > 0) {
            clearTimeout(this.slideTimeouts[targetSlideIndex]);
        }
        target_slide_classes.remove("rslidy-hidden");
        this.slideThumbnails[targetSlideIndex].classList.add("rslidy-slide-selected");
        // Scroll to the top of this slide
        this.contentSection.scrollTop = 0;
        // Scroll to it in the overview and center it if possible
        // If this is not called after scrollTop it somehow fails in chrome only
        this.slideThumbnails[targetSlideIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
        });
    }
}

;// ./src/ts/build/js/ts/content.js


class ContentComponent {
    constructor(view) {
        this.currentSlideIndex = -1;
        this.marginTapLeftDown = false;
        this.marginTapRightDown = false;
        this.view = view;
        this.slideTransition = new SlideTransition();
        this.progress_bar = document.getElementById("rslidy-progress-bar");
        this.slide_caption = document.getElementById("rslidy-slide-caption");
        this.slide_input = document.getElementById("rslidy-slide-input");
        this.view.addEventListener("mousedown", e => {
            window.rslidy.start_x = e.clientX;
            window.rslidy.start_y = e.clientY;
        });
        const prev_url = btoa(previous_pointer_icon);
        const next_url = btoa(next_pointer_icon);
        this.view.addEventListener("mousemove", (e) => {
            this.marginTap(e, () => {
                if (this.currentSlideIndex > 0)
                    this.view.style.cursor = "url(data:image/svg+xml;base64," + prev_url + "), w-resize";
                else
                    this.view.style.cursor = "auto";
            }, () => {
                if (this.currentSlideIndex < window.rslidy.num_slides - 1)
                    this.view.style.cursor = "url(data:image/svg+xml;base64," + next_url + "), e-resize";
                else
                    this.view.style.cursor = "auto";
            }, () => { this.view.style.cursor = "auto"; });
        });
        this.view.addEventListener("mousedown", (e) => {
            //prevent double click selection
            this.marginTapBoth(e, () => { if (e.detail > 1)
                e.preventDefault(); }, () => { });
            //set booleans for mouseup
            this.marginTap(e, () => { this.marginTapLeftDown = true; }, () => { this.marginTapRightDown = true; }, () => {
                this.marginTapLeftDown = false;
                this.marginTapRightDown = false;
            });
        });
        this.view.addEventListener("mouseup", (e) => {
            this.marginTap(e, () => {
                if (this.marginTapLeftDown)
                    this.navPrevious(true);
                this.marginTapLeftDown = false;
            }, () => {
                if (this.marginTapRightDown)
                    this.navNext(true);
                this.marginTapRightDown = false;
            }, () => { });
            window.rslidy.toolbar.closeMenuOnBlur();
        });
        this.view.addEventListener("touchstart", e => this.onTouchstart(e), { passive: true });
        this.view.addEventListener("touchmove", e => this.onTouchmove(e), { passive: true });
        this.view.addEventListener("touchend", e => this.onTouchend(e));
        this.view.querySelector("#rslidy-button-current").addEventListener("click", () => window.rslidy.toolbar.displayToggleClicked());
    }
    // ---
    // Description: calculation logic for margin tap
    // e: Event.
    // left, right, center: function callbacks for the left and right
    // click areas as well as center (& disabled).
    // Use the both function wrapper to set left = right
    // ---
    marginTap(e, left, right, center) {
        if (document.getElementById("rslidy-checkbox-margintap").checked) {
            var l = e.pageX - this.view.getBoundingClientRect().left;
            var r = -(e.pageX - this.view.getBoundingClientRect().right);
            var scrollBarWidth = this.view.offsetWidth - this.view.clientWidth;
            if (l < 60)
                left();
            else if (r < 60 + scrollBarWidth && r > scrollBarWidth)
                right();
            else
                center();
        }
        else
            center();
    }
    marginTapBoth(e, both, center) {
        this.marginTap(e, both, both, center);
    }
    // ---
    // Description: Called whenever the user begins to touch the body area.
    // e: Event.
    // ---
    onTouchstart(e) {
        // Register last tap
        var tap_previous = window.rslidy.tap_last;
        window.rslidy.tap_last = new Date().getTime();
        var tap_delay = window.rslidy.tap_last - tap_previous;
        // Toggle speaker notes on double tap
        if (tap_delay <= window.rslidy.doubletap_delay) {
            window.rslidy.toggleSpeakerNotes(e, false);
        }
        // Register touch event
        var touch = e.touches[0];
        // Set new values and reset old values
        window.rslidy.start_x = touch.pageX;
        window.rslidy.start_y = touch.pageY;
        window.rslidy.delta_x = 0;
        window.rslidy.delta_y = 0;
    }
    // ---
    // Description: Called whenever the user moves the finger while touching the
    // body area.
    // e: Event.
    // ---
    onTouchmove(e) {
        // Update values
        var touch = e.touches[0];
        var delta_x_old = window.rslidy.delta_x;
        window.rslidy.delta_x = touch.pageX - window.rslidy.start_x;
        window.rslidy.delta_y = touch.pageY - window.rslidy.start_y;
        // If the delta_x position has changed a lot, the user is swiping and the
        // content does not need to be scrolled!
        if (Math.abs(window.rslidy.delta_x - delta_x_old) > 10)
            e.preventDefault();
    }
    // ---
    // Description: Called whenever the stops touching the body area.
    // e: Event.
    // ---
    onTouchend(e) {
        // Register old values and calculate absolutes
        var touch_duration = new Date().getTime() - window.rslidy.tap_last;
        var delta_x = window.rslidy.delta_x;
        var delta_y = window.rslidy.delta_y;
        var delta_x_abs = Math.abs(delta_x);
        var delta_y_abs = Math.abs(delta_y);
        var swipe_threshold = window.rslidy.utils.remToPixel(window.rslidy.swipe_threshold);
        /* Handle the swipe event if the touch duration was shorter than a
        specified threshold. Also, the movement should be mainly on the x axis
        (x_movement > window.rslidy.swipe_y_limiter * y_movement) */
        if (touch_duration < window.rslidy.swipe_max_duration &&
            (delta_x_abs > swipe_threshold || delta_y_abs > swipe_threshold)) {
            if (delta_x_abs > window.rslidy.swipe_y_limiter * delta_y_abs) {
                window.rslidy.shift_pressed = true;
                if (delta_x < 0)
                    this.navNext(true);
                else
                    this.navPrevious(true);
                window.rslidy.shift_pressed = false;
                // Seems to improve scrolling experience on iOS devices somehow
                e.preventDefault();
            }
        }
    }
    // ---
    // Description: Returns the number of incremental list items on a slide.
    // slide_index: The index of the slide (0-indexed).
    // only_visible: Returns only the number of currently visible items (optional)
    // ---
    getNumIncrItems(slide_index, only_visible) {
        only_visible = only_visible || false;
        // Out of bounds check
        if (slide_index < 0 || slide_index >= window.rslidy.num_slides)
            return -1;
        var content_section = document.getElementById("rslidy-content-section");
        var slide = content_section.getElementsByClassName("slide")[slide_index];
        var incremental_items = slide.querySelectorAll("ul.incremental li");
        if (only_visible == false)
            return incremental_items.length;
        else {
            var counter = 0;
            for (var i = 0; i < incremental_items.length; i++) {
                if (incremental_items[i].classList.contains("rslidy-invisible") == false)
                    counter++;
            }
            return counter;
        }
    }
    // ---
    // Description: Jumps to the next slide (or next bullet point).
    // animate: boolean to enable/disable animation
    // ---
    navNext(animate) {
        if (window.rslidy.toolbar.allslides)
            return;
        var current_index = this.currentSlideIndex;
        window.rslidy.imageViewer.close();
        // Check for incremental items on current slide
        if (this.getNumIncrItems(current_index, false) > 0) {
            var num_incr_items = this.getNumIncrItems(current_index, false);
            var num_incr_items_shown = this.getNumIncrItems(current_index, true);
            if (num_incr_items > num_incr_items_shown) {
                if (window.rslidy.shift_pressed == false)
                    this.showItemsUpToN(num_incr_items_shown + 1);
                else
                    this.showItemsUpToN(num_incr_items);
                return;
            }
        }
        // Change slide
        var new_index = current_index + 1;
        this.showSlide(new_index, animate);
        // Check for incremental items on next slide
        if (this.getNumIncrItems(new_index, false) > 0) {
            var num_incr_items = this.getNumIncrItems(new_index, false);
            if (window.rslidy.shift_pressed == false)
                this.showItemsUpToN(1);
            else
                this.showItemsUpToN(num_incr_items);
        }
    }
    // ---
    // Description: Jumps to the last slide.
    // ---
    navLast() {
        // Change slide
        var new_index = window.rslidy.num_slides - 1;
        this.showSlide(new_index, false);
        // Check for incremental items on next slide
        if (this.getNumIncrItems(new_index, false) > 0) {
            var num_incr_items = this.getNumIncrItems(new_index, false);
            if (window.rslidy.shift_pressed == false)
                this.showItemsUpToN(1);
            else
                this.showItemsUpToN(num_incr_items);
        }
    }
    // ---
    // Description: Jumps to the previous slide (or previous bullet point).
    // animate: boolean to enable/disable animation
    // ---
    navPrevious(animate) {
        if (window.rslidy.toolbar.allslides)
            return;
        var current_index = this.currentSlideIndex;
        // Check for incremental items on current slide
        var num_incr_items_shown = this.getNumIncrItems(current_index, true);
        if (this.getNumIncrItems(current_index, false) > 0 &&
            num_incr_items_shown > 1) {
            if (window.rslidy.shift_pressed == false) {
                this.showItemsUpToN(num_incr_items_shown - 1);
                return;
            }
        }
        // Change slide
        var new_index = current_index - 1;
        this.showSlide(new_index, animate);
        // Check for incremental items on previous slide
        if (this.getNumIncrItems(new_index, false) > 0) {
            var num_incr_items = this.getNumIncrItems(new_index, false);
            this.showItemsUpToN(num_incr_items);
        }
    }
    // ---
    // Description: Jumps to the first slide.
    // ---
    navFirst() {
        var new_index = 0;
        this.showSlide(new_index, false);
        // Check for incremental items on previous slide
        if (this.getNumIncrItems(new_index, false) > 0) {
            var num_incr_items = this.getNumIncrItems(new_index, false);
            this.showItemsUpToN(num_incr_items);
        }
    }
    // ---
    // Description: Shows the first n bullet points and hides the rest.
    // n: Specifies the last incremental item to show.
    // ---
    showItemsUpToN(n) {
        var content_section = document.getElementById("rslidy-content-section");
        var current_slide = content_section.getElementsByClassName("slide")[this.currentSlideIndex];
        var incr_items = current_slide.querySelectorAll("ul.incremental li");
        // Show items with index < n, hide items with index >= n
        var counter = 0;
        for (var i = 0; i < incr_items.length; i++) {
            if (counter < n)
                incr_items[i].classList.remove("rslidy-invisible");
            else
                incr_items[i].classList.add("rslidy-invisible");
            counter++;
        }
    }
    //
    // Slide navigation methods
    //
    // ---
    // Description: Hides all slides and shows specified slide then.
    // slide_index: The index of the slide (0-indexed).
    // animate: boolean to enable/disable animation
    // ---
    showSlide(targetSlideIndex, animate) {
        window.rslidy.imageViewer.close();
        window.rslidy.toolbar.closeMenuOnSelection();
        if (targetSlideIndex < 0 && this.currentSlideIndex < 0)
            targetSlideIndex = 0;
        if (targetSlideIndex >= window.rslidy.num_slides)
            targetSlideIndex = window.rslidy.num_slides - 1;
        if (targetSlideIndex < 0 ||
            targetSlideIndex >= window.rslidy.num_slides ||
            this.currentSlideIndex == targetSlideIndex) {
            var j = document.getElementById("rslidy-slide-input");
            j.value = "" + (this.currentSlideIndex + 1);
            return;
        }
        this.slideTransition.doSlideTransition(this.currentSlideIndex, targetSlideIndex, animate);
        this.progress_bar.style.width =
            "calc(100%*" + (targetSlideIndex + 1) / window.rslidy.num_slides + ")";
        var pvs = document.getElementById("rslidy-progress-bar-nubs").children;
        for (var i = 0; i < pvs.length; i++) {
            if (i < targetSlideIndex)
                pvs[i].classList.add("rslidy-preview-reached");
            else
                pvs[i].classList.remove("rslidy-preview-reached");
        }
        // Hide speaker nodes
        window.rslidy.toggleSpeakerNotes(null, true);
        // Set 1-indexed value and new url
        if (window.rslidy.running)
            window.location.hash = "#" + (targetSlideIndex + 1);
        else
            history.replaceState({}, null, "#" + (targetSlideIndex + 1));
        // Update slide caption
        this.slide_caption.innerHTML = " /" + window.rslidy.num_slides;
        this.slide_input.value = "" + (targetSlideIndex + 1);
        this.currentSlideIndex = targetSlideIndex;
        // RespVis Support
        window.dispatchEvent(new Event('resize'));
        // Disable toolbar stuff on first / last slide
        this.enableFirstButtons();
        this.enableLastButtons();
        if (this.currentSlideIndex == 0)
            this.disableFirstButtons();
        if (this.currentSlideIndex + 1 == window.rslidy.num_slides)
            this.disableLastButtons();
    }
    disableFirstButtons() {
        document.getElementById("rslidy-button-first").setAttribute("disabled", "true");
        document.getElementById("rslidy-button-previous").setAttribute("disabled", "true");
    }
    enableFirstButtons() {
        document.getElementById("rslidy-button-first").removeAttribute("disabled");
        document.getElementById("rslidy-button-previous").removeAttribute("disabled");
    }
    disableLastButtons() {
        document.getElementById("rslidy-button-last").setAttribute("disabled", "true");
        document.getElementById("rslidy-button-next").setAttribute("disabled", "true");
    }
    enableLastButtons() {
        document.getElementById("rslidy-button-last").removeAttribute("disabled");
        document.getElementById("rslidy-button-next").removeAttribute("disabled");
    }
    // ---
    // Description: Returns the currently displayed slide index (0-indexed).
    // ---
    getCurrentSlideIndex() {
        var url_parts = window.location.href.split("#");
        if (url_parts.length > 1) {
            var hash = parseInt(url_parts[1]);
            if (hash > 0)
                return hash - 1;
        }
        return 0;
    }
}

;// ./src/ts/build/js/ts/image-viewer.js

class ImageViewerComponent {
    constructor() {
        this.zoomFactor = 1.0;
        this.mouseDragStartX = 0;
        this.mouseDragStartY = 0;
        this.imageOffsetX = 0;
        this.imageOffsetY = 0;
        this.active = false;
        this.setImageViewerClasses();
        this.view =
            window.rslidy.utils.prependHtmlString(document.body, image_viewer);
        this.images = document.getElementsByClassName("rslidy-slide-image");
        this.container = this.view.getElementsByClassName("rslidy-image-viewer-container")[0];
        this.modalImg = this.view.getElementsByClassName("rslidy-image-viewer-content")[0];
        this.addImageOnClickHandlers();
        this.addButtonHandlers();
        this.addMouseEventListeners();
        this.view.style.backgroundColor = window.rslidy.image_viewer_background;
    }
    // ---
    // Description: Closes the image viewer and resets values
    // ---
    close() {
        this.modalImg.classList.add("rslidy-transition-enabled");
        this.modalImg.style.width = "";
        this.modalImg.style.height = "";
        this.modalImg.style.top = "";
        this.modalImg.style.left = "";
        this.view.style.display = "none";
        this.zoomFactor = 1.0;
        if (this.active) {
            history.replaceState({}, null, "#" + (window.rslidy.content.currentSlideIndex + 1));
            this.active = false;
        }
    }
    // ---
    // Description: Iterate over all slide images and set image viewer classes
    // ---
    setImageViewerClasses() {
        var slides = document.getElementsByClassName("slide");
        let imgs = new Array();
        for (let slide of slides) {
            var imgsThisSlide = slide.getElementsByTagName("img");
            for (let img of imgsThisSlide) {
                imgs.push(img);
            }
        }
        window.rslidy.utils.addElementsClass(imgs, "rslidy-slide-image");
    }
    // ---
    // Description: Add the onclick handler to all slide images
    // ---
    addImageOnClickHandlers() {
        for (var i = 0; i < this.images.length; i++) {
            let image = this.images.item(i);
            if (image.classList.contains('disable-image-viewer'))
                continue;
            image.ontouchend = () => {
                this.touch = true;
            };
            image.onclick = () => {
                if (!window.rslidy.image_viewer)
                    return;
                if (this.touch) {
                    this.touch = false;
                    return;
                }
                //setup browser back button to close image viewer
                history.pushState(null, null, window.location.href.replace(window.location.hash, "#"));
                this.view.style.display = "block";
                this.modalImg.src = image.src;
                var theImage = new Image();
                theImage.src = image.src;
                this.imageWidth = theImage.width;
                this.imageHeight = theImage.height;
                // fix for firefox
                if (this.imageWidth == 0) {
                    this.imageWidth = this.modalImg.width;
                }
                if (this.imageHeight == 0) {
                    this.imageHeight = this.modalImg.height;
                }
                this.containerWidth = this.container.clientWidth;
                this.containerHeight = this.container.clientHeight;
                this.initialZoom();
                this.isInsideContainer = true;
                this.active = true;
            };
            // prevent links around images, they can still be used with
            // right click -> open link in ...
            if (image.parentNode.nodeName.toLowerCase() === 'a') {
                image.parentElement.onclick = e => {
                    e.preventDefault();
                    e.stopPropagation();
                };
            }
        }
    }
    // ---
    // Description: Adds handlers for the image viewer buttons
    // ---
    addButtonHandlers() {
        var spanClose = this.view.getElementsByClassName("rslidy-iv-close")[0];
        spanClose.addEventListener("click", () => {
            this.close();
        });
        var spanZoomIn = this.view.getElementsByClassName("rslidy-iv-zoom-in")[0];
        spanZoomIn.addEventListener("click", () => {
            this.zoomIn();
        });
        var spanZoomOut = this.view.getElementsByClassName("rslidy-iv-zoom-out")[0];
        spanZoomOut.addEventListener("click", () => {
            this.zoomOut();
        });
        var spanZoomReset = document.getElementsByClassName("rslidy-iv-zoom-reset")[0];
        spanZoomReset.addEventListener("click", () => {
            this.initialZoom();
        });
    }
    // ---
    // Description: Adds support for mouse events
    // ---
    addMouseEventListeners() {
        var mouseDown = false;
        this.container.addEventListener("mouseenter", (mouseDownEvent) => {
            this.isInsideContainer = true;
        });
        this.container.addEventListener("mouseleave", (mouseDownEvent) => {
            this.isInsideContainer = false;
        });
        window.addEventListener("resize", () => {
            if (this.active) {
                this.containerWidth = this.container.clientWidth;
                this.containerHeight = this.container.clientHeight;
                this.applyOffset(true);
            }
        });
        this.view.addEventListener("wheel", (mouseWheelEvent) => {
            mouseWheelEvent.preventDefault();
            var delta = Math.max(-1, Math.min(1, mouseWheelEvent.deltaY || -mouseWheelEvent.deltaY));
            if (delta > 0) {
                this.zoomIn();
                var factor = 1 - this.zoomFactor * 1.2 / this.zoomFactor;
                this.imageOffsetX +=
                    (mouseWheelEvent.clientX - window.innerWidth / 2) * factor;
                this.imageOffsetY +=
                    (mouseWheelEvent.clientY - window.innerHeight / 2) * factor;
                this.applyOffset(false);
            }
            else if (delta != 0) {
                this.zoomOut();
                var factor = 1 - this.zoomFactor / 1.2 / this.zoomFactor;
                if (this.zoomFactor / 1.2 > this.initialZoomFactor / 10) {
                    this.imageOffsetX +=
                        (mouseWheelEvent.clientX - window.innerWidth / 2) * factor;
                    this.imageOffsetY +=
                        (mouseWheelEvent.clientY - window.innerHeight / 2) * factor;
                    this.applyOffset(false);
                }
            }
        }, { passive: true });
        this.view.addEventListener("mousedown", (mouseDownEvent) => {
            mouseDownEvent.preventDefault();
            if (!this.isInsideContainer) {
                return;
            }
            this.mouseDragStartX = mouseDownEvent.clientX;
            this.mouseDragStartY = mouseDownEvent.clientY;
            this.modalImg.classList.remove("rslidy-transition-enabled");
            mouseDown = true;
        });
        this.view.addEventListener("mousemove", (mouseMoveEvent) => {
            mouseMoveEvent.preventDefault();
            if (!mouseDown) {
                return;
            }
            this.imageOffsetX =
                this.imageOffsetX + mouseMoveEvent.clientX - this.mouseDragStartX;
            this.imageOffsetY =
                this.imageOffsetY + mouseMoveEvent.clientY - this.mouseDragStartY;
            this.mouseDragStartX = mouseMoveEvent.clientX;
            this.mouseDragStartY = mouseMoveEvent.clientY;
            this.applyOffset(false);
        });
        this.view.addEventListener("mouseup", mouseUpEvent => {
            mouseDown = false;
        });
    }
    // ---
    // Description: Zoom in on the image
    // ---
    zoomIn() {
        this.modalImg.classList.add("rslidy-transition-enabled");
        this.zoomFactor *= 1.2;
        this.imageOffsetX =
            this.containerWidth / 2.0 -
                (-this.imageOffsetX + this.containerWidth / 2.0) * 1.2;
        this.imageOffsetY =
            this.containerHeight / 2.0 -
                (-this.imageOffsetY + this.containerHeight / 2.0) * 1.2;
        this.modalImg.style.width = this.imageWidth * this.zoomFactor + "px";
        this.modalImg.style.height = this.imageHeight * this.zoomFactor + "px";
        this.applyOffset(false);
    }
    // ---
    // Description: Zoom out of the image
    // ---
    zoomOut() {
        this.modalImg.classList.add("rslidy-transition-enabled");
        var zoomBefore = this.zoomFactor;
        this.zoomFactor /= 1.2;
        if (this.zoomFactor < this.initialZoomFactor / 10) {
            this.zoomFactor = this.initialZoomFactor / 10;
        }
        this.imageOffsetX =
            this.containerWidth / 2.0 -
                (-this.imageOffsetX + this.containerWidth / 2.0) /
                    (zoomBefore / this.zoomFactor);
        this.imageOffsetY =
            this.containerHeight / 2.0 -
                (-this.imageOffsetY + this.containerHeight / 2.0) /
                    (zoomBefore / this.zoomFactor);
        this.modalImg.style.width = this.imageWidth * this.zoomFactor + "px";
        this.modalImg.style.height = this.imageHeight * this.zoomFactor + "px";
        this.applyOffset(false);
    }
    // ---
    // Description: Offset the image
    // center: set true to re-center the image, used for initialZoom()
    // ---
    applyOffset(center) {
        var currentImageWidth = this.imageWidth * this.zoomFactor;
        var currentImageHeight = this.imageHeight * this.zoomFactor;
        if (center) {
            if (currentImageWidth <= this.containerWidth) {
                this.imageOffsetX = (this.containerWidth - currentImageWidth) / 2.0;
            }
            else {
                if (this.containerWidth - this.imageOffsetX >= currentImageWidth) {
                    this.imageOffsetX = this.containerWidth - currentImageWidth;
                }
                else if (this.imageOffsetX > 0) {
                    this.imageOffsetX = 0;
                }
            }
            if (currentImageHeight <= this.containerHeight) {
                this.imageOffsetY = (this.containerHeight - currentImageHeight) / 2.0;
            }
            else {
                if (this.containerHeight - this.imageOffsetY >= currentImageHeight) {
                    this.imageOffsetY = this.containerHeight - currentImageHeight;
                }
                else if (this.imageOffsetY > 0) {
                    this.imageOffsetY = 0;
                }
            }
        }
        this.modalImg.style.left = this.imageOffsetX + "px";
        this.modalImg.style.top = this.imageOffsetY + "px";
    }
    // ---
    // Description: Setup or revert to the initial zoom level
    // ---
    initialZoom() {
        var aspectImg = this.imageWidth / this.imageHeight;
        var aspectContainer = this.containerWidth / this.containerHeight;
        if (aspectContainer > aspectImg) {
            this.initialZoomFactor = this.containerHeight / this.imageHeight;
            this.imageOffsetX =
                (this.containerWidth - this.imageWidth * this.zoomFactor) / 2.0;
        }
        else {
            this.initialZoomFactor = this.containerWidth / this.imageWidth;
            this.imageOffsetY =
                (this.containerHeight - this.imageHeight * this.zoomFactor) / 2.0;
        }
        this.zoomFactor = this.initialZoomFactor;
        this.modalImg.style.width = this.imageWidth * this.zoomFactor + "px";
        this.modalImg.style.height = this.imageHeight * this.zoomFactor + "px";
        this.applyOffset(true);
    }
}

;// ./src/ts/build/js/ts/rslidy.js








// Implements the core functionality.
class Rslidy {
    constructor() {
        // Members
        this.utils = new Utils();
        this.running = false;
        this.num_slides = 0;
        this.shift_pressed = false;
        /*ctrl_pressed: boolean = false;
        alt_pressed: boolean = false;
        meta_pressed: boolean = false;*/
        this.low_light_mode = false;
        this.shortcuts_disabled = false;
        this.timer_enabled = false;
        this.timer_time = 0;
        this.timer_thread = null;
        //Custom settings
        this.image_viewer = true;
        // Presentation time in seconds. 0 to disable (hides timer).
        this.presentation_time = 0;
        this.close_menu_on_selection = false;
        this.close_menu_on_blur = true;
        this.close_navigation_on_selection = false;
        this.show_slide_dividers = true;
        this.start_in_low_light_mode = false;
        this.start_with_toolbar_minimized = false;
        this.block_slide_text_selection = false;
        // Advanced custom settings
        /* Use of custom aspect ratio for slides. Possible values are e.g. 4/3 or
        16/9. 0 disables it and makes it calculate dynamically. */
        this.custom_aspect_ratio = 4 / 3;
        // Used when custom_aspect_ratio is set to a value greater than zero.
        this.custom_width = 1000;
        this.overview_slide_zoom = 1.2;
        this.doubletap_delay = 200; // Double tap delay in ms
        this.min_slide_font = 0.1; // in em
        this.max_slide_font = 5.0; // in em
        this.font_step = 0.1; // in em
        this.swipe_max_duration = 400; // maximum duration of swipe in ms
        this.swipe_threshold = 3.75; // swipe distance in rem
        /* how many times the x distance should be greater than the y distance (1.0
        means x has to be > y, 2.0 means x has to be > 2 * y, 0.0 means disabled) */
        this.swipe_y_limiter = 1.0;
        this.print_frame = "0.05rem solid black";
        this.image_viewer_background = "rgba(0, 0, 0, 0.9)";
        // Members storing relevant data for touch gestures
        this.tap_last = 0;
        this.start_x = 0;
        this.start_y = 0;
        this.delta_x = 0;
        this.delta_y = 0;
        // Members storing relevant data for TILT/SHAKE gestures
        // Shake sensitivity, smaller number = more shake required
        this.shake_sensitivity = 0.8;
        this.shakes = 0; // Current number of shakes
        this.required_shakes = 4; // Number of consecutive shakes required
        this.last_shake = 0; // Time of last shake (in ms)
        // Timeframe for reaching required_shakes, resets with each shake
        this.shake_time_limit = 500;
        // Only accept shakes after a certain interval
        // Prevents false positives for devices with high refresh rates
        this.min_shake_interval = 50;
        // An action will be performed after returning to tilt_center from an angle
        // between tilt_lower and tilt_upper
        this.tilt = 0; // Current tilt angle
        this.tilt_center = 10;
        this.tilt_lower = 15; // Range ~ 15-40
        this.tilt_upper = 35;
        this.tilt_allowed = false; // If true, perform a tilt action when possible
        this.tilt_action = null; // Gets set to either navPrevious or navNext
        // Constants
        this.MENU = 0;
        this.PRINT_MENU = 1;
    }
    // ---
    // Description: Handles the initialization of rslidy, e.g. setting up the
    // menus.
    // ---
    init() {
        // check for section over div slide and add classes for compatibility
        const sections = document.getElementsByTagName("section");
        for (let i = 0; i < sections.length; i++)
            if (sections[i].parentElement.nodeName == "BODY")
                sections[i].classList.add("slide");
        // generate html from slides for overview thumbnails, and add aria tags
        const slides = document.querySelectorAll(".slide");
        this.num_slides = slides.length;
        if (this.num_slides == 0)
            return;
        const slides_html = new Array(this.num_slides);
        for (let i = 0; i < this.num_slides; i++) {
            slides_html[i] = slides[i].outerHTML.replace(/id=\"*\"/g, "");
            slides_html[i] = slides_html[i].replace(/href=\"*\"/g, "class=\"rslidy-link\"");
            slides[i].setAttribute("role", "region");
            slides[i].setAttribute("aria-label", "Slide " + (i + 1));
        }
        // create a wrapper for the new body
        var wrapper = document.createElement("div");
        wrapper.id = "rslidy-column-flex";
        // add content section to the wrapper
        this.utils.appendHtmlString(wrapper, content_section);
        var cs = wrapper.querySelector('#rslidy-content-section');
        // move the old body's children into the content section
        while (document.body.firstChild)
            cs.appendChild(document.body.firstChild);
        // Append the wrapper to the body
        document.body.appendChild(wrapper);
        this.imageViewer = new ImageViewerComponent();
        this.utils.prependHtmlString(document.body, notes_text);
        this.utils.prependHtmlString(document.body, help_text);
        this.toolbar = new ToolbarComponent();
        this.settings = new SettingsComponent();
        this.printSettings = new PrintSettingsComponent();
        this.overview = new OverviewComponent(slides_html);
        this.content = new ContentComponent(cs);
        // If hash is on help, show the first slide and the help panel
        if (window.location.hash.match("#rslidy-help")) {
            this.content.showSlide(0, false);
            this.toolbar.helpToggleClicked();
        }
        // Show first slide with bad or no hash
        else if (!window.location.hash.match(/#[0-9]+/))
            this.content.showSlide(0, false);
        this.addListeners();
        this.initTimer();
        this.onHashchange();
        this.settings.loadSettings();
        this.settings.doCustomSettingAdaptions();
        this.printSettings.loadSettings();
        this.setTabindexAndCallbacks();
        window.onbeforeunload = () => {
            this.settings.saveSettings();
            this.printSettings.saveSettings();
        };
        // Disable keyboard shortcuts on right click menu open
        window.oncontextmenu = (e) => {
            this.shortcuts_disabled = true;
            setTimeout(() => this.shortcuts_disabled = false, 3000);
        };
        this.running = true;
    }
    // ---
    // Description: Sets tabindex, aria tags and callbacks for checkboxes
    // ---
    setTabindexAndCallbacks() {
        var labels = document.querySelectorAll(`label[id*="checkbox"]`);
        for (let i = 0; i < labels.length; i++) {
            let l = labels[i];
            l.setAttribute("tabindex", "0");
            var input = l.querySelector("input");
            l.setAttribute("role", "checkbox");
            l.setAttribute("aria-checked", String(input.checked));
            input.addEventListener("change", function () {
                l.setAttribute("aria-checked", String(this.checked));
            });
            l.addEventListener("keyup", e => this.checkboxCallback(e, l));
        }
    }
    // ---
    // Description: Handles keyup for checkboxes
    // e: event
    // l: the label of the checkbox
    // ---
    checkboxCallback(e, l) {
        if (l != document.activeElement)
            return;
        var key = e.keyCode ? e.keyCode : e.which;
        if (key == 13 || key == 32) { //return and space
            var i = l.querySelector("input");
            if (!i.disabled) {
                i.checked = !i.checked;
                l.setAttribute("aria-checked", String(i.checked));
                i.dispatchEvent(new Event("click"));
            }
        }
    }
    // ---
    // Description: Adds event listeners like left/right keys.
    // ---
    addListeners() {
        // Key listeners
        window.onkeyup = e => this.keyPressed(e);
        // Window listeners
        window.addEventListener("hashchange", function () {
            this.onHashchange();
        }.bind(this));
        // Allow simple touch events on speaker notes overlay (double tap -> hide)
        var speaker_notes_overlay = document.getElementById("rslidy-speakernotes-overlay");
        speaker_notes_overlay.addEventListener("touchstart", e => this.content.onTouchstart(e), { passive: true });
        // Window listeners
        window.onresize = function (e) {
            this.overview.adjustOverviewPanel();
        }.bind(this);
        // Device listeners used for TILT and SHAKE
        // add only if possible without permissions
        if (window.DeviceMotionEvent &&
            !(typeof window.DeviceMotionEvent.requestPermission === 'function')) {
            window.addEventListener("devicemotion", function (e) {
                this.onDeviceMotion(e);
            }.bind(this));
        }
        if (window.DeviceOrientationEvent &&
            !(typeof window.DeviceOrientationEvent.requestPermission === 'function')) {
            window.addEventListener("deviceorientation", function (e) {
                this.onDeviceOrientation(e);
            }.bind(this));
        }
    }
    // ---
    // Description: Initializes the timer.
    // ---
    initTimer() {
        // Initialize the timer or hide it if this.presentation_time <= 0
        var timer = document.getElementById("rslidy-timer");
        // Hide timer or set time
        if (this.presentation_time <= 0)
            timer.classList.add("rslidy-hidden");
        else {
            var minutes = Math.floor(this.presentation_time / 60);
            var seconds = this.presentation_time % 60;
            timer.innerHTML =
                this.utils.toTwoDigits(minutes) + ":" + this.utils.toTwoDigits(seconds);
            this.timer_time = this.presentation_time;
        }
    }
    // ---
    // Description: Toggles the timer. Works only if this.presentation_time > 0.
    // ---
    toggleTimer() {
        // Return if this.presentation_time <= 0
        if (this.presentation_time <= 0)
            return;
        // Reset and return if this.timer_time <= 0
        if (this.timer_time <= 0) {
            this.initTimer();
            return;
        }
        if (this.timer_enabled == false) {
            // Run
            this.timer_thread = setInterval(function () {
                // Break out if this.presentation_time is <= 0
                if (this.timer_time <= 0) {
                    clearInterval(this.timer_thread);
                    this.timer_enabled = false;
                    return;
                }
                this.timer_time -= 1;
                var timer = document.getElementById("rslidy-timer");
                var minutes = Math.floor(this.timer_time / 60);
                var seconds = this.timer_time % 60;
                timer.innerHTML =
                    this.utils.toTwoDigits(minutes) +
                        ":" +
                        this.utils.toTwoDigits(seconds);
            }.bind(this), 1000);
            this.timer_enabled = true;
        }
        else {
            // Stop
            clearInterval(this.timer_thread);
            this.timer_enabled = false;
        }
    }
    // ---
    // Description: Called whenever a key is pressed.
    // e: Event.
    // ---
    keyPressed(e) {
        var key = e.keyCode ? e.keyCode : e.which;
        // Check if input or textarea has focus, if so, cancel
        var n = document.activeElement.nodeName;
        if (n === "INPUT" || n === "TEXTAREA")
            return;
        // If flag is set, disable it and ignore current input
        if (this.shortcuts_disabled) {
            this.shortcuts_disabled = false;
            return;
        }
        // Ignore keys when viewing all slides, except toggle back and fonts
        if (this.toolbar.allslides && !(key == 65 || key == 82 || key > 100))
            return;
        // Ignore unused modifiers (to allow ctrl+c etc.)
        if (e.ctrlKey || e.altKey || e.metaKey)
            return;
        // Modifier keys (SHIFT, CTRL, ALT, META (WIN on Windows, CMD on Mac))
        this.shift_pressed = e.shiftKey;
        /*this.ctrl_pressed = e.ctrlKey;
        this.alt_pressed = e.altKey;
        this.meta_pressed = e.metaKey;*/
        //console.log("Key event: " + key + " " + String.fromCharCode(key));
        // Normal key codes
        switch (key) {
            case 32: //space
                if (document.getElementById("rslidy-checkbox-space").checked)
                    this.content.navNext(true);
                break;
            case 34: //page down
            case 39: //right
                this.content.navNext(true);
                break;
            case 33: //page up
            case 37: //left
                this.content.navPrevious(true);
                break;
            case 35: //end
                this.content.navLast();
                break;
            case 36: //home
                this.content.navFirst();
                break;
            case 78: //N
                this.toggleSpeakerNotes(null, false);
                break;
            case 65: //A
                this.toolbar.displayToggleClicked();
                break;
            case 67: //C
                this.toolbar.tocToggleClicked();
                break;
            case 79: //O
                this.toolbar.overviewToggleClicked();
                break;
            case 72: //H
                this.toolbar.helpToggleClicked();
                break;
            case 83: //S
                this.toolbar.menuToggleClicked(this.MENU);
                break;
            case 80: //P
                this.toolbar.menuToggleClicked(this.PRINT_MENU);
                break;
            case 84: //T
                this.toolbar.showHideToggleClicked();
                break;
            case 74: //J
                this.focusJumpText();
                break;
            case 107: //+
            case 171: //+
            case 187: //+ (chrome)
                if (this.imageViewer.active)
                    this.imageViewer.zoomIn();
                else if (this.shift_pressed)
                    this.settings.changeUIFont(null, 1);
                else
                    this.settings.changeSlideFont(null, 1);
                break;
            case 109: //-
            case 173: //-
            case 189: //- (chrome)
                if (this.imageViewer.active)
                    this.imageViewer.zoomOut();
                else if (this.shift_pressed)
                    this.settings.changeUIFont(null, -1);
                else
                    this.settings.changeSlideFont(null, -1);
                break;
            case 82: //R
                if (this.imageViewer.active)
                    this.imageViewer.initialZoom();
                else if (this.shift_pressed)
                    this.settings.changeUIFont(null, 0);
                else
                    this.settings.changeSlideFont(null, 0);
                break;
            case 27: //escape
                this.imageViewer.close();
                this.toolbar.closeMenues();
                break;
            default:
                if (key >= 48 && key <= 57) //48-57 -> 0-9
                    this.focusJumpText(key - 48);
        }
    }
    // ---
    // Description: Focus the rslidy-slide-input for Jump to Slide
    // n (optional): Adds the number to the input field
    // ---
    focusJumpText(n) {
        var j = document.getElementById("rslidy-slide-input");
        if (n == undefined)
            j.value = "";
        else
            j.value = "" + n;
        j.focus();
    }
    // ---
    // Description: Called whenever a key in the slide input text box was pressed.
    // e: The event.
    // ---
    slideInputKeyPressed(e) {
        var key = e.keyCode ? e.keyCode : e.which;
        var slide_input = document.getElementById("rslidy-slide-input");
        var value = slide_input.value;
        if (key == 13 /*enter*/) {
            var is_number = /^[0-9]+$/.test(value);
            if (is_number == true)
                this.content.showSlide(this.utils.toInt(value) - 1, false);
            else
                slide_input.value = this.content.getCurrentSlideIndex() + 1;
            // Take away focus
            slide_input.blur();
        }
    }
    // ---
    // Description: Called whenever the night mode button is clicked.
    // ---
    toggleLowLightMode() {
        // Inverts everything, then reverts individual elements again after "html"
        // which should stay the same (e.g. images)
        const invert = ["html", "img"];
        for (let i = 0; i < invert.length; i++) {
            let elements = document.getElementsByTagName(invert[i]);
            this.utils.switchElementsClass(elements, "rslidy-color-invert");
        }
        // Add custom classes to h1, h2, h3, p, span, li, ul, ol, pre and a
        const custom_classes = [
            "h1",
            "h2",
            "h3",
            "p",
            //"span",
            "li",
            "ul",
            "ol",
            "pre",
            "a"
        ];
        for (let i = 0; i < custom_classes.length; i++) {
            let elements = document.getElementsByTagName(custom_classes[i]);
            this.utils.switchElementsClass(elements, "rslidy-night-mode");
            this.utils.invertElementsColor(elements, this.low_light_mode);
        }
        this.low_light_mode = !this.low_light_mode;
    }
    // ---
    // Description: Called whenever the address field content changes.
    // ---
    onHashchange() {
        if (window.location.hash.match(/#[0-9]+/))
            this.content.showSlide(this.content.getCurrentSlideIndex(), false);
    }
    // ---
    // Description: Called whenever the orientation of a device changes.
    // e: Event.
    //
    // Tilt controls are implemented as follows: There are 3 angles, tilt_center
    // tilt_lower and tilt_upper. If the device is tilted above the lower angle
    // and back to the center, a tilt action is performed. If the devices is
    // tilted too far (above the upper angle), no action can be performed until
    // the device is tilted back to the center. With this switching from
    //  portrait to landscape mode causes no tilt action.
    // ---
    onDeviceOrientation(e) {
        //chrome fires this event with all values being null on all devices
        if (e.alpha == null && e.beta == null && e.gamma == null)
            return;
        // Init if event was fired and necessary
        var checkbox_tilt = document.getElementById("rslidy-checkbox-tilt");
        if (checkbox_tilt.disabled == true) {
            checkbox_tilt.disabled = false;
            checkbox_tilt.checked = true;
            document
                .getElementById("rslidy-checkbox-tilt-text")
                .setAttribute("aria-disabled", "false");
            document
                .getElementById("rslidy-checkbox-tilt-text")
                .setAttribute("aria-checked", "true");
            document
                .getElementById("rslidy-checkbox-tilt-text")
                .classList.remove("rslidy-disabled");
        }
        // Return if not activated
        if (checkbox_tilt.checked == false)
            return;
        // Store values
        var value = 0;
        var tilt_multiplier = 1;
        var safari = /.*Version.*Safari.*/.test(navigator.userAgent);
        if (window.innerHeight > window.innerWidth) {
            // Portrait mode
            value = Math.round(e.gamma);
            tilt_multiplier = 1.75;
            // safari has -180 and 180, others -90 and 90
            if (safari) {
                value /= 1.5;
                tilt_multiplier = 1;
            }
        }
        else {
            // Landscape mode
            value = Math.round(e.beta);
            // safari has -90 and 90, others -180 and 180
            if (safari)
                value *= 2;
        }
        // Upside down Portrait/Landscape mode
        if ("orientation" in screen) {
            // @ts-ignore
            var orientation = screen.msOrientation || screen.mozOrientation || (screen.orientation || {}).type;
            if (!(orientation === undefined) && orientation.includes("secondary"))
                value = -value;
        } // safari
        else if (window.orientation < 0 || window.orientation >= 180)
            value = -value;
        this.tilt = value;
        // Only allow tilt gestures after holding the device upright again
        if (value > -this.tilt_center && value < this.tilt_center) {
            if (this.tilt_allowed && this.tilt_action != null) {
                this.shift_pressed = true;
                this.tilt_action();
                this.tilt_action = null;
                this.shift_pressed = false;
            }
            this.tilt_allowed = true;
        }
        if (value >= this.tilt_lower * tilt_multiplier &&
            value <= this.tilt_upper * tilt_multiplier)
            this.tilt_action = () => this.content.navNext(true);
        if (value <= -this.tilt_lower * tilt_multiplier &&
            value >= -this.tilt_upper * tilt_multiplier)
            this.tilt_action = () => this.content.navPrevious(true);
        if (value >= this.tilt_upper * tilt_multiplier ||
            value <= -this.tilt_upper * tilt_multiplier) {
            this.tilt_action = null;
            this.tilt_allowed = false;
        }
    }
    // ---
    // Description: Called whenever the acceleration of the device changes.
    // e: Event.
    //
    // The shake gesture fires when the number of consecutive shakes (stored in
    // the variable shakes) exceeds the value of the variable required_shakes
    // within a certain time limit (defined by the variable shake_time_limit)
    // ---
    onDeviceMotion(e) {
        //chrome fires this event with all values being null on all devices
        if (e.acceleration.x == null &&
            e.acceleration.y == null &&
            e.acceleration.z == null)
            return;
        // Init if event was fired and necessary
        var checkbox_shake = document.getElementById("rslidy-checkbox-shake");
        if (checkbox_shake.disabled == true) {
            checkbox_shake.disabled = false;
            checkbox_shake.checked = true;
            document
                .getElementById("rslidy-checkbox-shake-text")
                .setAttribute("aria-disabled", "false");
            document
                .getElementById("rslidy-checkbox-shake-text")
                .setAttribute("aria-checked", "true");
            document
                .getElementById("rslidy-checkbox-shake-text")
                .classList.remove("rslidy-disabled");
        }
        // Return if not activated
        if (checkbox_shake.checked == false)
            return;
        var acc_threshold = 10.0 / this.shake_sensitivity;
        var now = (new Date).getTime();
        var shake_interval = Math.abs(now - this.last_shake);
        // Reset shake counter when past the time limit
        if (shake_interval > this.shake_time_limit) {
            this.shakes = 0;
            this.last_shake = now;
        }
        // Increase shake counter if shake is stronger than threshold
        if ((e.acceleration.x > acc_threshold ||
            e.acceleration.y > acc_threshold ||
            e.acceleration.z > acc_threshold) &&
            shake_interval < this.shake_time_limit &&
            shake_interval > this.min_shake_interval) {
            this.shakes += 1;
            if (this.shakes >= this.required_shakes)
                this.content.navFirst();
            this.last_shake = now;
        }
    }
    // ---
    // Description: Toggles speaker nodes for current slide if available.
    // e: Event coming from double tap, null otherwise.
    // always_hide: If true, speaker nodes are hidden regardless of the current
    // status.
    // ---
    toggleSpeakerNotes(e, always_hide) {
        always_hide = always_hide || false;
        // Get current status
        var speaker_notes_overlay = document.getElementById("rslidy-speakernotes-overlay");
        var hidden = speaker_notes_overlay.classList.contains("rslidy-hidden");
        // Hide speaker notes if necessary
        if (hidden == false || always_hide == true) {
            speaker_notes_overlay.classList.add("rslidy-hidden");
            // Prevent default double tap event if notes were visible
            if (e != null && hidden == false) {
                e.preventDefault();
                e.stopPropagation();
            }
            return;
        }
        // Get current speaker notes (if there are any)
        var content_section = document.getElementById("rslidy-content-section");
        var current_slide = content_section.getElementsByClassName("slide")[this.content.getCurrentSlideIndex()];
        var speaker_notes = current_slide.getElementsByClassName("speakernotes").length == 1
            ? current_slide.getElementsByClassName("speakernotes")[0]
            : null;
        // Show speaker notes and set new text if necessary
        if (speaker_notes != null) {
            speaker_notes_overlay.classList.remove("rslidy-hidden");
            speaker_notes_overlay.innerHTML =
                '<div class="rslidy-speakernotes-container">' +
                    speaker_notes.innerHTML +
                    "</div>";
            // Prevent default double tap event if notes were hidden
            if (e != null && hidden == true) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
    }
}
function start() {
    var t0 = performance.now();
    //inject loading spinner and hide body overflowing behind the spinner
    document.body.insertAdjacentHTML('afterbegin', spinner_html);
    document.body.style.overflow = 'hidden';
    //timeout allows the browser to repaint and display the spinner
    setTimeout(() => {
        window.rslidy.init();
        //hide the spinner again after rslidy is done
        document.getElementById('rslidy-spinner').classList.add('rslidy-hidden');
        var t1 = performance.now();
        console.log("Time to first slide: " + (t1 - t0) + " milliseconds.");
    }, 1);
}
window.rslidy = new Rslidy();
document.addEventListener("DOMContentLoaded", start);

export { Rslidy };

//# sourceMappingURL=rslidy.js.map