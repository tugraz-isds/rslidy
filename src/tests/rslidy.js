/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
// Class Utils
// Implements utility functions.
var Utils = /** @class */ (function () {
    function Utils() {
    }
    // ---
    // Description: Returns the width of the slide.
    // aspect_ratio: The desired aspect ratio (or 0 for dynamic calculation).
    // custom_width: The custom width.
    // ---
    Utils.prototype.getSlideWidth = function (aspect_ratio, custom_width) {
        aspect_ratio = aspect_ratio || 0;
        if (aspect_ratio == 0)
            return window.outerWidth;
        var width = custom_width; // ...
        return width;
    };
    // ---
    // Description: Returns the height of the slide.
    // aspect_ratio: The desired aspect ratio (or 0 for dynamic calculation).
    // custom_width: The custom width.
    // ---
    Utils.prototype.getSlideHeight = function (aspect_ratio, custom_width) {
        aspect_ratio = aspect_ratio || 0;
        if (aspect_ratio == 0)
            return window.outerHeight;
        var width = custom_width;
        var height = width / aspect_ratio;
        return height;
    };
    // ---
    // Description: Returns the current aspect ratio.
    // ---
    Utils.prototype.getCurrentAspectRatio = function () {
        var window_width = window.innerWidth;
        var window_height = window.innerHeight;
        var current_aspect_ratio = window_width / window_height;
        return current_aspect_ratio;
    };
    // ---
    // Description: Gets the relative width of an element, with respect to the
    // whole window.
    // element: Specifies the element to consider.
    // aspect_ratio: The desired aspect ratio (or 0 for dynamic calculation).
    // custom_width: The custom width.
    // ---
    Utils.prototype.getRelativeWidth = function (element_width, aspect_ratio, custom_width) {
        var window_width = aspect_ratio == 0 ? window.outerWidth : custom_width;
        var relative_width = element_width / window_width;
        return relative_width;
    };
    // ---
    // Description: Returns the integer representation of a character.
    // character: Specifies the character to convert.
    // ---
    Utils.prototype.toInt = function (character) {
        return 1 * character;
    };
    // ---
    // Description: Returns a 2-digit-representation of a number (e.g. "6"
    // becomes "06", but "11" will still be "11").
    // num: Specify the number.
    // ---
    Utils.prototype.toTwoDigits = function (num) {
        return ("0" + num).slice(-2);
    };
    // ---
    // Description: Switches the existence of a class of each element in a
    // specified list (ignores elements with class "ignore").
    // element_list: The list of elements.
    // class_name: The name of the class.
    // ---
    Utils.prototype.switchElementsClass = function (element_list, class_name) {
        for (var i = 0; i < element_list.length; i++) {
            if (element_list[i].classList.contains("ignore") == true)
                continue;
            if (element_list[i].classList.contains(class_name) == true)
                element_list[i].classList.remove(class_name);
            else
                element_list[i].classList.add(class_name);
        }
    };
    // ---
    // Description: Adds a class to an element if not already present
    // element_list: The list of elements.
    // class_name: The name of the class.
    // ---
    Utils.prototype.addElementsClass = function (element_list, class_name) {
        for (var i = 0; i < element_list.length; i++) {
            if (element_list[i].classList.length == 0 ||
                element_list[i].classList.contains(class_name) == false) {
                element_list[i].classList.add(class_name);
            }
        }
    };
    // ---
    // Description: Inverts the color attribute of all elements in the specified
    // list.
    // element_list: The list of elements.
    // low_light_mode: Specified whether colors should be inverted or reset.
    // ---
    Utils.prototype.invertElementsColor = function (element_list, low_light_mode) {
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
    };
    // ---
    // Description: Returns the font size in em for a specific CSS query
    // query: the CSS query
    // ---
    Utils.prototype.getEM = function (query) {
        return parseFloat(window.getComputedStyle(document.querySelectorAll(query)[0]).getPropertyValue("font-size")) / parseFloat(window.getComputedStyle(document.body).getPropertyValue("font-size"));
    };
    // ---
    // Description: Converts rem to pixel count
    // rem: the rem input
    // ---
    Utils.prototype.remToPixel = function (rem) {
        return parseFloat(window.getComputedStyle(document.body).getPropertyValue("font-size")) * rem;
    };
    // ---
    // Description: Applies a regex to keyboard input, only allowing specific keys
    // textbox: The textbox to filter.
    // inputFilter: Function returning the filtered input
    //              Example: function(value) {return /^\d*$/.test(value);}
    // Source: https://jsfiddle.net/emkey08/zgvtjc51
    // ---
    Utils.prototype.setInputFilter = function (textbox, inputFilter) {
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
    };
    // ---
    // Description: Creates an html element from a given input string
    // htmlstr: The html string
    // ---
    Utils.prototype.htmlParse = function (htmlstr) {
        var template = document.createElement("div");
        template.innerHTML = htmlstr;
        return template.firstElementChild;
    };
    // ---
    // Description: Insterts an html element at the start of another one
    // parent: The html element that gets modified
    // html: The new html element as string
    // ---
    Utils.prototype.prependHtmlString = function (parent, html) {
        var view = this.htmlParse(html);
        parent.insertBefore(view, parent.firstChild);
        return view;
    };
    // ---
    // Description: Inserts an html element at the end of another one
    // parent: The html element that gets modified
    // html: The new html element as string
    // ---
    Utils.prototype.appendHtmlString = function (parent, html) {
        var view = this.htmlParse(html);
        parent.appendChild(view);
        return view;
    };
    // ---
    // Description: Get the slide with the specified index
    // index: slide index
    // ---
    Utils.prototype.getSlide = function (index) {
        return window.rslidy.content.slideTransition.slides[index];
    };
    // ---
    // Description: True if an element is visible on screen
    // elm: the html element to check
    // ---
    Utils.prototype.checkVisible = function (elm) {
        var rect = elm.getBoundingClientRect();
        var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    };
    return Utils;
}());
exports.Utils = Utils;


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var html_definitions_1 = __webpack_require__(3);
var SettingsComponent = /** @class */ (function () {
    function SettingsComponent() {
        var _this = this;
        this.slidefont = 0;
        this.uifont = 0;
        this.view =
            window.rslidy.utils.prependHtmlString(document.body, html_definitions_1.settings_html);
        // Parse default font sizes, in case the slide creator changes them
        this.default = window.rslidy.utils.getEM("#rslidy-content-section .slide");
        this.default_ui = window.rslidy.utils.getEM(".rslidy-ui");
        this.default_footer = window.rslidy.utils.getEM("#rslidy-footer");
        this.view
            .querySelector("#rslidy-button-font-plus")
            .addEventListener("click", function (e) { return _this.changeSlideFont(e, 1); });
        this.view
            .querySelector("#rslidy-button-font-reset")
            .addEventListener("click", function (e) { return _this.changeSlideFont(e, 0); });
        this.view
            .querySelector("#rslidy-button-font-minus")
            .addEventListener("click", function (e) { return _this.changeSlideFont(e, -1); });
        this.view
            .querySelector("#rslidy-button-font-plus-ui")
            .addEventListener("click", function (e) { return _this.changeUIFont(e, 1); });
        this.view
            .querySelector("#rslidy-button-font-reset-ui")
            .addEventListener("click", function (e) { return _this.changeUIFont(e, 0); });
        this.view
            .querySelector("#rslidy-button-font-minus-ui")
            .addEventListener("click", function (e) { return _this.changeUIFont(e, -1); });
        this.view
            .querySelector("#rslidy-checkbox-tilt")
            .addEventListener("click", function (e) { return window.rslidy.toolbar.closeMenuOnSelection(); });
        this.view
            .querySelector("#rslidy-checkbox-shake")
            .addEventListener("click", function (e) { return window.rslidy.toolbar.closeMenuOnSelection(); });
        this.view
            .querySelector("#rslidy-checkbox-space")
            .addEventListener("click", function (e) { return window.rslidy.toolbar.closeMenuOnSelection(); });
        this.view
            .querySelector("#rslidy-checkbox-margintap")
            .addEventListener("click", function (e) { return window.rslidy.toolbar.closeMenuOnSelection(); });
        this.view
            .querySelector("#rslidy-checkbox-lowlightmode")
            .addEventListener("click", function (e) {
            return window.rslidy.toolbar.closeMenuOnSelection(function () { return window.rslidy.toggleLowLightMode(); });
        });
    }
    // ---
    // Description: Load settings from the localStorage
    // ---
    SettingsComponent.prototype.loadSettings = function () {
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
    };
    // ---
    // Description: Save settings to the localStorage
    // ---
    SettingsComponent.prototype.saveSettings = function () {
        try {
            localStorage.removeItem("rslidy");
            localStorage.setItem("rslidy", this.generateJSON());
        }
        catch (e) {
            console.log(e);
        }
    };
    // ---
    // Description: Generate a JSON string for the localStorage
    // ---
    SettingsComponent.prototype.generateJSON = function () {
        var data = {
            slidefont: this.slidefont,
            uifont: this.uifont,
            tilt: this.view.querySelector("#rslidy-checkbox-tilt").checked,
            shake: this.view.querySelector("#rslidy-checkbox-shake").checked,
            space: this.view.querySelector("#rslidy-checkbox-space").checked,
            margintap: this.view.querySelector("#rslidy-checkbox-margintap").checked,
            lowlightmode: this.view.querySelector("#rslidy-checkbox-lowlightmode").checked
        };
        return JSON.stringify(data);
    };
    // ---
    // Description: Used for final style adaptions.
    // ---
    SettingsComponent.prototype.doCustomSettingAdaptions = function () {
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
    };
    // ---
    // Description: Called whenever one of the text size buttons is clicked.
    // e: The event.
    // value: Specifies the size modifier (1 = more, -1 = less).
    // ---
    SettingsComponent.prototype.changeSlideFont = function (e, value) {
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
    };
    // ---
    // Description: Called whenever one of the text size buttons is clicked.
    // e: The event.
    // value: Specifies the size modifier (1 = more, -1 = less).
    // ---
    SettingsComponent.prototype.changeUIFont = function (e, value) {
        var _this = this;
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
        setTimeout(function () { _this.checkToolbarOverflow(); }, 1000);
        // Prevent default actions after event handling
        if (e)
            e.preventDefault();
    };
    // ---
    // Description: Checks the toolbar for overflow and scales it down if needed.
    // ---
    SettingsComponent.prototype.checkToolbarOverflow = function () {
        // check if footer is still on the same line
        var ov = document.querySelector("#rslidy-button-overview").getBoundingClientRect();
        var toc = document.querySelector("#rslidy-button-toc").getBoundingClientRect();
        console.log(ov.top + " - " + toc.top);
        if (ov.top == toc.top)
            return;
        else
            this.changeUIFont(null, -1);
    };
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var i = __webpack_require__(4);
var t = __webpack_require__(5);
exports.spinner_html = "\n<div id=\"rslidy-spinner\" class=\"rslidy-spinner-overlay\">\n<div class=\"rslidy-spinner\"></div></div>";
exports.help_text = "\n<div id=\"rslidy-help\" class=\"rslidy-help-overlay rslidy-ui\"\nrole=\"region\" aria-label=\"Help\" tabindex=\"0\">\n  <div id=\"rslidy-help-popup\">\n  <h1>\n    Rslidy Version 1.0.1\n    <a target=\"_blank\" href=\"https://github.com/tugraz-isds/rslidy\">GitHub</a>\n  </h1>\n  <a class=\"rslidy-help-close\" title=\"" + t.imageviewer[3] + "\" href=\"#\">&times;</a>\n  <h2>" + t.help[0] + "</h2>\n    <div class=\"rslidy-help-content\">\n    <table id=\"rslidy-help-table\">\n      <tr>\n        <th>" + t.help[1] + "</th>\n        <th>" + t.help[2] + "</th>\n        <th>" + t.help[3] + "</th>\n        <th>" + t.help[4] + "</th>\n        <th>" + t.help[5] + "</th>\n      </tr>\n      <tr>\n        <td>" + t.help[6] + "</td>\n        <td>\n          <span class=\"rslidy-icon\">" + i.overview_icon + "</span>\n        </td>\n        <td>" + t.help[7] + "</td>\n        <td></td>\n        <td>" + t.help[8] + "</td>\n      </tr>\n      <tr>\n        <td>" + t.help[9] + "</td>\n        <td>\n          <span class=\"rslidy-icon\">" + i.hide_icon + "</span>\n        </td>\n        <td>" + t.help[10] + "</td>\n        <td></td>\n        <td>" + t.help[11] + "</td>\n      </tr>\n      <tr>\n        <td>" + t.help[12] + "</td>\n        <td>\n          <span class=\"rslidy-icon\">" + i.all_slides_icon + "</span>\n          <span class=\"rslidy-icon\">" + i.one_slide_icon + "</span>\n        </td>\n        <td>" + t.help[13] + "</td>\n        <td></td>\n        <td>" + t.help[14] + "</td>\n      </tr>\n      <tr>\n        <td>" + t.help[15] + "</td>\n        <td>\n          <span class=\"rslidy-icon rslidy-mirror\">" + i.last_icon + "</span>\n        </td>\n        <td>" + t.help[16] + "</td>\n        <td>" + t.help[17] + "</td>\n        <td>" + t.help[18] + "</td>\n      </tr>\n      <tr>\n        <td>" + t.help[19] + "</td>\n        <td>\n          <span class=\"rslidy-icon rslidy-mirror\">" + i.next_icon + "</span>\n        </td>\n        <td>" + t.help[20] + "</td>\n        <td>" + t.help[21] + "</td>\n        <td>" + t.help[22] + "</td>\n      </tr>\n      <tr>\n        <td>" + t.help[23] + "</td>\n        <td>\n          <span class=\"rslidy-icon\">" + i.next_icon + "</span>\n        </td>\n        <td>" + t.help[24] + "</td>\n        <td>" + t.help[25] + "</td>\n        <td>" + t.help[26] + "</td>\n      </tr>\n      <tr>\n        <td>" + t.help[27] + "</td>\n        <td>\n          <span class=\"rslidy-icon\">" + i.last_icon + "</span>\n        </td>\n        <td>" + t.help[28] + "</td>\n        <td></td>\n        <td>" + t.help[29] + "</td>\n      </tr>\n      <tr>\n        <td>" + t.help[30] + "</td>\n        <td>\n          <span class=\"rslidy-icon\">" + i.print_icon + "</span>\n        </td>\n        <td>" + t.help[31] + "</td>\n        <td></td>\n        <td>" + t.help[32] + "</td>\n      </tr>\n      <tr>\n        <td>" + t.help[33] + "</td>\n        <td>\n          <span class=\"rslidy-icon\">" + i.settings_icon + "</span>\n        </td>\n        <td>" + t.help[34] + "</td>\n        <td></td>\n        <td>" + t.help[35] + "</td>\n      </tr>\n      <tr>\n        <td>" + t.help[36] + "</td>\n        <td>\n          <span class=\"rslidy-icon\">" + i.help_icon + "</span>\n        </td>\n        <td>" + t.help[37] + "</td>\n        <td></td>\n        <td>" + t.help[38] + "</td>\n      </tr>\n      <tr>\n        <td>" + t.help[39] + "</td>\n        <td>\n          <span class=\"rslidy-icon\">" + i.toc_icon + "</span>\n        </td>\n        <td>" + t.help[40] + "</td>\n        <td></td>\n        <td>" + t.help[41] + "</td>\n      </tr>\n      <tr>\n        <td>" + t.help[42] + "</td>\n        <td>\n          <span class=\"rslidy-icon\">" + i.font_minus_icon + "</span>\n        </td>\n        <td>" + t.help[43] + "</td>\n        <td></td>\n        <td>" + t.help[44] + "</td>\n      </tr>\n      <tr>\n        <td>" + t.help[45] + "</td>\n        <td>\n          <span class=\"rslidy-icon\">" + i.font_reset_icon + "</span>\n        </td>\n        <td>" + t.help[46] + "</td>\n        <td></td>\n        <td>" + t.help[47] + "</td>\n      </tr>\n      <tr>\n        <td>" + t.help[48] + "</td>\n        <td>\n          <span class=\"rslidy-icon\">" + i.font_plus_icon + "</span>\n        </td>\n        <td>" + t.help[49] + "</td>\n        <td></td>\n        <td>" + t.help[50] + "</td>\n      </tr>\n      <tr>\n        <td>" + t.help[51] + "</td>\n        <td></td>\n        <td>" + t.help[52] + "</td>\n        <td></td>\n        <td>" + t.help[53] + "</td>\n      </tr>\n      <tr>\n        <td>" + t.help[54] + "</td>\n        <td></td>\n        <td>" + t.help[55] + "</td>\n        <td></td>\n        <td>" + t.help[56] + "</td>\n      </tr>\n    </table>\n    </div>\n  </div>\n</div>";
exports.content_section = "\n<div id=\"rslidy-row-flex\" aria-label=\"Rslidy slide deck, press h for help\">\n  <nav id=\"rslidy-overview-slides\" class=\"rslidy-ui\" tabindex=\"0\" aria-label=\"slide overview\"></nav>\n  <main id=\"rslidy-content-section\" role=\"region\" aria-label=\"Slides\">\n    <div id=\"rslidy-trapezoid-wrapper-display\" class=\"rslidy-ui\">\n      <div id=\"rslidy-tb-display-trapezoid\">\n        <button id=\"rslidy-button-current\" class=\"rslidy-display-button\" title=\"" + t.toolbar[12] + "\">\n          <span class=\"rslidy-tb-button rslidy-tb-display\">" + i.one_slide_icon + "</span>\n        </button>\n      </div>\n    </div>\n  </main>\n  <nav id=\"rslidy-overview-toc\" class=\"rslidy-ui\" tabindex=\"0\" aria-label=\"table of contents\"></nav>\n</div>";
exports.notes_text = "\n<div id=\"rslidy-speakernotes-overlay\"></div>";
exports.image_viewer = "\n<div class=\"rslidy-image-viewer rslidy-ui\">\n  <div class=\"rslidy-image-viewer-container\">\n    <img draggable=\"false\" class=\"rslidy-image-viewer-content\">\n  </div>\n\n  <span title=\"" + t.imageviewer[0] + "\" class=\"rslidy-iv-button rslidy-iv-zoom-reset\">\n    &#x25A2;\n  </span>\n  <span title=\"" + t.imageviewer[1] + "\" class=\"rslidy-iv-button rslidy-iv-zoom-in\">\n    &plus;\n  </span>\n  <span title=\"" + t.imageviewer[2] + "\" class=\"rslidy-iv-button rslidy-iv-zoom-out\">\n    &minus;\n  </span>\n  <span title=\"" + t.imageviewer[3] + "\" class=\"rslidy-iv-button rslidy-iv-close\">\n    &times;\n  </span>\n</div>";
exports.thumbnail_html = function (idx, xofy, slide, suffix) { return "\n<div class=\"rslidy-slide-thumbnail" + suffix + "\" data-slideindex=\"" + idx + "\" role=\"region\">\n<div class=\"rslidy-thumbnail-caption rslidy-noselect\"><a class=\"rslidy-slide-link\" aria-label=\"Slide " + xofy + "\" data-slideindex=\"" + idx + "\" href=\"#" + (idx + 1) + "\">" + xofy + "</a></div>\n  <div class=\"rslidy-slide-clickelement\" data-slideindex=\"" + idx + "\">\n    <div class=\"rslidy-overview-item" + suffix + " rslidy-noselect\" data-slideindex=\"" + idx + "\">" + slide + "</div>\n  </div>\n</div>"; };
exports.link_html = function (idx, title) { return "\n<div class=\"rslidy-slide-link\" data-slideindex=\"" + idx + "\"><a href=\"#" + (idx + 1) + "\">" + title + "</a></div>"; };
exports.preview_html = function (idx) { return "\n<div class=\"rslidy-preview\" data-slideindex=\"" + idx + "\">\n  <div class=\"rslidy-preview-item\"></div>\n</div>"; };
exports.settings_html = "\n<div id=\"rslidy-menu\" class=\"rslidy-hidden rslidy-ui\" role=\"region\"\naria-label=\"Settings\" tabindex=\"0\">\n  <label id=\"rslidy-checkbox-tilt-text\" class=\"rslidy-menu-content rslidy-disabled\" aria-disabled=\"true\">\n    " + t.settings[0] + "\n    <input type=\"checkbox\" value=\"Tilt\" id=\"rslidy-checkbox-tilt\" disabled>\n    <label for=\"rslidy-checkbox-tilt\">" + i.slider_icon + "</label>\n  </label>\n  <label id=\"rslidy-checkbox-shake-text\" class=\"rslidy-menu-content rslidy-disabled\" aria-disabled=\"true\">\n    " + t.settings[1] + "\n    <input type=\"checkbox\" value=\"Shake\" id=\"rslidy-checkbox-shake\" disabled>\n    <label for=\"rslidy-checkbox-shake\">" + i.slider_icon + "</label>\n  </label>\n  <label id=\"rslidy-checkbox-space-text\" class=\"rslidy-menu-content\">\n    " + t.settings[2] + "\n    <input type=\"checkbox\" value=\"Tap\" id=\"rslidy-checkbox-space\" checked>\n    <label for=\"rslidy-checkbox-space\">" + i.slider_icon + "</label>\n  </label>\n  <label id=\"rslidy-checkbox-margintap-text\" class=\"rslidy-menu-content\">\n    " + t.settings[3] + "\n    <input type=\"checkbox\" value=\"Tap\" id=\"rslidy-checkbox-margintap\" checked>\n    <label for=\"rslidy-checkbox-margintap\">" + i.slider_icon + "</label>\n  </label>\n  <label id=\"rslidy-checkbox-lowlight-text\" class=\"rslidy-menu-content\">\n    " + t.settings[4] + "\n    <input type=\"checkbox\" value=\"Low Light Mode\" id=\"rslidy-checkbox-lowlightmode\">\n    <label for=\"rslidy-checkbox-lowlightmode\">" + i.slider_icon + "</label>\n  </label>\n  <div class=\"rslidy-menu-content\">\n    <label>" + t.settings[5] + "</label>\n    <a href=\"#\" title=\"" + t.settings[7] + "\" id=\"rslidy-button-font-minus\"><span class=\"rslidy-menu-button\">" + i.font_minus_icon + "</span></a>\n    <a href=\"#\" title=\"" + t.settings[8] + "\" id=\"rslidy-button-font-reset\"><span class=\"rslidy-menu-button\">" + i.font_reset_icon + "</span></a>\n    <a href=\"#\" title=\"" + t.settings[9] + "\" id=\"rslidy-button-font-plus\"><span class=\"rslidy-menu-button\">" + i.font_plus_icon + "</span></a>\n  </div>\n  <div class=\"rslidy-menu-content\">\n    <label>" + t.settings[6] + "</label>\n    <a href=\"#\" title=\"" + t.settings[10] + "\" id=\"rslidy-button-font-minus-ui\"><span class=\"rslidy-menu-button\">" + i.font_minus_icon + "</span></a>\n    <a href=\"#\" title=\"" + t.settings[11] + "\" id=\"rslidy-button-font-reset-ui\"><span class=\"rslidy-menu-button\">" + i.font_reset_icon + "</span></a>\n    <a href=\"#\" title=\"" + t.settings[12] + "\" id=\"rslidy-button-font-plus-ui\"><span class=\"rslidy-menu-button\">" + i.font_plus_icon + "</span></a>\n  </div>\n</div>";
exports.print_settings_html = "\n<div id=\"rslidy-print-menu\" class=\"rslidy-hidden rslidy-ui\"\nrole=\"region\" aria-label=\"Print Settings\" tabindex=\"0\">\n  <label id=\"rslidy-checkbox-link-text\" class=\"rslidy-menu-content\">\n    " + t.print_settings[0] + "\n    <input type=\"checkbox\" value=\"Links\" id=\"rslidy-checkbox-link\">\n    <label for=\"rslidy-checkbox-link\">" + i.slider_icon + "</label>\n  </label>\n  <label id=\"rslidy-checkbox-snum-text\" class=\"rslidy-menu-content\">\n    " + t.print_settings[1] + "\n    <input type=\"checkbox\" value=\"Numbers\" id=\"rslidy-checkbox-snum\">\n    <label for=\"rslidy-checkbox-snum\">" + i.slider_icon + "</label>\n  </label>\n  <label id=\"rslidy-checkbox-frame-text\" class=\"rslidy-menu-content\">\n    " + t.print_settings[2] + "\n    <input type=\"checkbox\" value=\"Numbers\" id=\"rslidy-checkbox-frame\">\n    <label for=\"rslidy-checkbox-frame\">" + i.slider_icon + "</label>\n  </label>\n  <div class=\"rslidy-menu-content\">\n    <button id=\"rslidy-button-print-submit\">" + t.print_settings[3] + "</button>\n  </div>\n</div>";
exports.toolbar_html = "\n<div id=\"rslidy-footer\" class=\"rslidy-ui\">\n  <div id=\"rslidy-progress-bar-area\">\n    <div id=\"rslidy-trapezoid-wrapper\">\n      <div id=\"rslidy-tb-show-trapezoid\" class=\"rslidy-hidden\">\n        <button id=\"rslidy-button-show\" class=\"rslidy-show-button\" title=\"" + t.toolbar[0] + "\">\n          <i class=\"rslidy-tb-button rslidy-tb-show\">" + i.hide_icon + "</i>\n        </button>\n      </div>\n    </div>\n    <div id=\"rslidy-progress-bar\"></div>\n    <div id=\"rslidy-progress-bar-bg\"></div>\n    <div id=\"rslidy-progress-bar-nubs\"></div>\n  </div>\n  <div id=\"rslidy-toolbar-area\">\n    <div id=\"rslidy-toolbar\" role=\"region\" aria-label=\"Toolbar\">\n      <div id=\"rslidy-toolbar-content\">\n        <div class=\"rslidy-float-left\">\n          <button id=\"rslidy-button-overview\" aria-expanded=\"false\" class=\"rslidy-toolbar-button\" title=\"" + t.toolbar[1] + "\">\n            <i class=\"rslidy-tb-button\">" + i.overview_icon + "</i>\n          </button>\n          <button id=\"rslidy-button-hide\" class=\"rslidy-toolbar-button\" title=\"" + t.toolbar[2] + "\">\n            <i class=\"rslidy-tb-button\">" + i.hide_icon + "</i>\n          </button>\n          <button id=\"rslidy-button-all\" class=\"rslidy-toolbar-button\" title=\"" + t.toolbar[11] + "\">\n            <span class=\"rslidy-tb-button\">" + i.all_slides_icon + "</span>\n          </button>\n        </div>\n\n        <div id=\"rslidy-toolbar-button-nav\">\n          <button id=\"rslidy-button-first\" class=\"rslidy-toolbar-button\" title=\"" + t.toolbar[3] + "\">\n              <i class=\"rslidy-tb-button rslidy-mirror\">" + i.last_icon + "</i>\n          </button>\n\n          <button id=\"rslidy-button-previous\" class=\"rslidy-toolbar-button\" title=\"" + t.toolbar[4] + "\">\n              <i class=\"rslidy-tb-button rslidy-mirror\">" + i.next_icon + "</i>\n          </button>\n          <div class=\"rslidy-toolbar-slide\"><input value=\"1\" id=\"rslidy-slide-input\" type=\"textbox\" aria-label=\"Jump to slide\" maxlength=\"3\"></div>\n          <div class=\"rslidy-toolbar-slide\" id=\"rslidy-slide-caption\"></div>\n          <button id=\"rslidy-button-next\" class=\"rslidy-toolbar-button\"  title=\"" + t.toolbar[5] + "\">\n              <i class=\"rslidy-tb-button\">" + i.next_icon + "</i>\n          </button>\n          <button id=\"rslidy-button-last\" class=\"rslidy-toolbar-button\" title=\"" + t.toolbar[6] + "\">\n              <i class=\"rslidy-tb-button\">" + i.last_icon + "</i>\n          </button>\n        </div>\n\n        <div class=\"rslidy-float-right\">\n          <button id=\"rslidy-button-print\" aria-expanded=\"false\" class=\"rslidy-toolbar-button\" title=\"" + t.toolbar[9] + "\">\n            <i class=\"rslidy-tb-button\">" + i.print_icon + "</i>\n          </button>\n          <button id=\"rslidy-button-menu\" aria-expanded=\"false\" class=\"rslidy-toolbar-button\" title=\"" + t.toolbar[8] + "\">\n            <i class=\"rslidy-tb-button\">" + i.settings_icon + "</i>\n          </button>\n          <button id=\"rslidy-button-help\" class=\"rslidy-toolbar-button\" title=\"" + t.toolbar[10] + "\">\n            <i class=\"rslidy-tb-button\">" + i.help_icon + "</i>\n          </button>\n          <button id=\"rslidy-button-toc\" aria-expanded=\"false\" class=\"rslidy-toolbar-button\" title=\"" + t.toolbar[7] + "\">\n            <i class=\"rslidy-tb-button\">" + i.toc_icon + "</i>\n          </button>\n        </div>\n\n        <div class=\"rslidy-float-right\" id=\"rslidy-timer\">00:00</div>\n      </div>\n    </div>\n  </div>\n</div>";


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.all_slides_icon = "<svg viewBox=\"0 0 100 100\" baseProfile=\"full\" xmlns=\"http://www.w3.org/2000/svg\"><path stroke-width=\"8\" d=\"M5 5v90M95 5v90\"/><text x=\"50\" y=\"50\" dominant-baseline=\"middle\" text-anchor=\"middle\" font-size=\"100\">n</text></svg>";
exports.font_minus_icon = "<svg viewBox=\"0 0 100 100\" baseProfile=\"full\" xmlns=\"http://www.w3.org/2000/svg\"><text x=\"50\" y=\"95\" text-anchor=\"middle\" font-size=\"80\">A</text><text x=\"60\" y=\"45\" font-weight=\"bold\" font-size=\"55\">-</text></svg>";
exports.font_plus_icon = "<svg viewBox=\"0 0 100 100\" baseProfile=\"full\" xmlns=\"http://www.w3.org/2000/svg\"><text x=\"50\" y=\"95\" text-anchor=\"middle\" font-size=\"100\">A</text><text x=\"55\" y=\"40\" font-weight=\"bold\" font-size=\"55\">+</text></svg>";
exports.font_reset_icon = "<svg viewBox=\"0 0 100 100\" baseProfile=\"full\" xmlns=\"http://www.w3.org/2000/svg\"><text x=\"50\" y=\"95\" text-anchor=\"middle\" font-size=\"90\">A</text></svg>";
exports.help_icon = "<svg viewBox=\"0 0 100 100\" baseProfile=\"full\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"none\" stroke-width=\"14\" d=\"M31.5 46.9c0-9.1.7-13.3 5.6-18.2 4.9-6.3 12.6-7 19.6-5.6 7 1.4 15.4 8.4 15.4 18.2 0 9.8-7.7 13.3-10.5 15.4-4.9 1.4-7 4.2-7.7 7.7v14m0 8.4V98\"/></svg>";
exports.hide_icon = "<svg viewBox=\"0 0 100 100\" baseProfile=\"full\" xmlns=\"http://www.w3.org/2000/svg\"><path stroke-linecap=\"round\" stroke-width=\"10\" d=\"M20 15l30 30M50 45l30-30M20 55l30 30M50 85l30-30\"/></svg>";
exports.last_icon = "<svg viewBox=\"0 0 100 100\" baseProfile=\"full\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 5v90l65-45z\"/><path stroke-width=\"15\" d=\"M85 5v90\"/></svg>";
exports.next_icon = "<svg viewBox=\"0 0 100 100\" baseProfile=\"full\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M15 5v90l70-45z\"/></svg>";
exports.one_slide_icon = "<svg viewBox=\"0 0 100 100\" baseProfile=\"full\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"transparent\" stroke-width=\"6\" d=\"M5 5h90v90H5z\"/><text x=\"50\" y=\"50\" dominant-baseline=\"central\" text-anchor=\"middle\" font-size=\"80\">1</text></svg>";
exports.overview_icon = "<svg viewBox=\"0 0 100 100\" baseProfile=\"full\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"none\" stroke-width=\"8\" d=\"M0 0h100v100H0z\"/><path stroke-width=\"4\" d=\"M48 0v100\"/><path d=\"M8 7h33v25H8zM8 37.5h33v25H8zM8 68h33v25H8z\"/></svg>";
exports.print_icon = "<svg viewBox=\"0 0 100 100\" baseProfile=\"full\" xmlns=\"http://www.w3.org/2000/svg\"><path stroke-width=\"8\" d=\"M6 30h88M10 30v50M22 23h8M70 23h8M90 30v50M6 80h24M94 80H70M6 33h88\"/><path stroke-width=\"12\" d=\"M6 40h14M33 40h61\"/><path stroke-width=\"24\" d=\"M6 55h88M6 75h24M94 75H70\"/><path stroke-width=\"4\" d=\"M35 73h30M35 83h30\"/><rect x=\"30\" y=\"5\" width=\"40\" height=\"25\" rx=\"5\" ry=\"5\" fill=\"none\" stroke-width=\"4\"/><rect x=\"30\" y=\"65\" width=\"40\" height=\"30\" rx=\"5\" ry=\"5\" fill=\"none\" stroke-width=\"4\"/></svg>";
exports.settings_icon = "<svg viewBox=\"0 0 100 100\" baseProfile=\"full\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><defs><g id=\"a\"><path d=\"M40 75l3 20h14l3-20zM40 25l3-20h14l3 20zM25 40L5 43v14l20 3zM75 40l20 3v14l-20 3z\"/></g></defs><circle cx=\"50\" cy=\"50\" r=\"25\" fill=\"none\" stroke-width=\"15\"/><use xlink:href=\"#a\"/><use xlink:href=\"#a\" transform=\"rotate(45 50 50)\"/></svg>";
exports.slider_icon = "<svg viewBox=\"0 0 100 50\" baseProfile=\"full\" xmlns=\"http://www.w3.org/2000/svg\"><path stroke-linecap=\"round\" stroke-width=\"30\" d=\"M20 25h60\"/><circle cx=\"25\" cy=\"25\" r=\"23\"/></svg>";
exports.toc_icon = "<svg viewBox=\"0 0 100 100\" baseProfile=\"full\" xmlns=\"http://www.w3.org/2000/svg\"><path stroke-dasharray=\"15, 15\" stroke-width=\"20\" d=\"M5 10v85\"/><path stroke-width=\"10\" d=\"M25 17.5h75M25 47.5h75M25 77.5h75\"/></svg>";


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports) => {


// English text definitions
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.help = [
    "Interface Controls",
    "Function",
    "Button",
    "Key",
    "Gesture",
    "Description",
    "Slide Overview",
    "O",
    "Toggle the Overview of all slides.",
    "Toolbar",
    "T",
    "Toggle the visibility of the toolbar.",
    "All Slides",
    "A",
    "Toggle display of all slides on one page.",
    "First Slide",
    "Home",
    "Shake",
    "Navigate to first slide.",
    "Previous Slide",
    "\u2190, Page Up",
    "Swipe right, Tap/click left margin, Tilt left, Tip left",
    "Navigate to previous slide.",
    "Next Slide",
    "\u2192, Page Down, Space",
    "Swipe left, Tap/click right margin, Tilt right, Tip right",
    "Advance to next slide.",
    "Last Slide",
    "End",
    "Navigate to last slide.",
    "Print Settings",
    "P",
    "Toggle the Print Settings Panel.\n   Print settings are preserved in browser local storage.",
    "Settings",
    "S",
    "Toggle the Settings Panel.\n   Settings are preserved in browser local storage.",
    "Help",
    "H",
    "Toggle the Help Panel.",
    "Table of Contents",
    "C",
    "Toggle the Table of Contents (slide titles).",
    "Decrease Font Size",
    "-",
    "Decrease slide font size.\n   With Shift, decrease interface font size.",
    "Reset Font Size",
    "R",
    "Reset slide font size.\n   With Shift, reset interface font size.",
    "Increase Font Size",
    "+",
    "Increase slide font size.\n   With Shift, increase interface font size.",
    "Jump to Slide",
    "[J] 0-99 Return",
    "Jump to a specific slide.",
    "Close all Panels",
    "Escape",
    "Close all open panels.",
];
exports.settings = [
    "Tilt",
    "Shake",
    "Space To Advance",
    "Margin Tap Nav",
    "Low Light Mode",
    "Slide Fonts",
    "UI Fonts",
    "Make Slide Fonts Smaller (-)",
    "Reset Slide Fonts (R)",
    "Make Slide Fonts Larger (+)",
    "Make UI Fonts Smaller (Shift -)",
    "Reset UI Fonts (Shift R)",
    "Make UI Fonts Larger (Shift +)"
];
exports.print_settings = [
    "Show Link Destinations",
    "Show Slide Numbers",
    "Show Frame",
    "Print"
];
exports.toolbar = [
    "Show Toolbar (T)",
    "Slide Overview (O)",
    "Hide Toolbar (T)",
    "First Slide (Home)",
    "Previous Slide (\u2190)",
    "Next Slide (\u2192)",
    "Last Slide (End)",
    "Table of Contents (C)",
    "Settings (S)",
    "Print (P)",
    "Help (H)",
    "Display All Slides (A)",
    "Display Single Slides (A)"
];
exports.imageviewer = [
    "Reset Zoom (R)",
    "Zoom In (+)",
    "Zoom Out (-)",
    "Close (Esc)"
];


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var html_definitions_1 = __webpack_require__(3);
var PrintSettingsComponent = /** @class */ (function () {
    function PrintSettingsComponent() {
        var _this = this;
        this.view =
            window.rslidy.utils.prependHtmlString(document.body, html_definitions_1.print_settings_html);
        // apply print settings whenever changed, in case the user wants
        // to preview it on firefox
        var inputs = this.view.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].onchange = function () { return _this.applyPrintSettings(); };
        }
        this.view
            .querySelector("#rslidy-checkbox-link")
            .addEventListener("click", function (e) { return window.rslidy.toolbar.closeMenuOnSelection(); });
        this.view
            .querySelector("#rslidy-checkbox-snum")
            .addEventListener("click", function (e) { return window.rslidy.toolbar.closeMenuOnSelection(); });
        this.view
            .querySelector("#rslidy-checkbox-frame")
            .addEventListener("click", function (e) { return window.rslidy.toolbar.closeMenuOnSelection(); });
        this.view
            .querySelector("#rslidy-button-print-submit")
            .addEventListener("click", function (e) { return _this.print(); });
        this.applyPrintSettings();
    }
    // ---
    // Description: Set the CSS from print settings
    // ---
    PrintSettingsComponent.prototype.applyPrintSettings = function () {
        // remove old settings
        if (this.style)
            document.getElementsByTagName('head')[0].removeChild(this.style);
        var link = (this.view.querySelector("#rslidy-checkbox-link"));
        var snum = (this.view.querySelector("#rslidy-checkbox-snum"));
        var frame = (this.view.querySelector("#rslidy-checkbox-frame"));
        var css = "@media print {\n";
        if (!link.checked) {
            css += "a[href^=\"http://\"]:after, a[href^=\"https://\"]:after {\n        content: \"\" !important;\n      }";
        }
        if (snum.checked) {
            css += "#rslidy-content-section {\n        counter-reset: slide-counter;\n      }\n      #rslidy-content-section .slide:after {\n        content: counter(slide-counter);\n        counter-increment: slide-counter;\n        position: absolute;\n        right: 0.8rem;\n        bottom: 0.8rem;\n        font: 60% Sans-Serif;\n      }";
        }
        if (frame.checked) {
            css += ".slide {\n        border: " + window.rslidy.print_frame + ";\n      }";
        }
        css += "\n}";
        // inject CSS
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        document.getElementsByTagName('head')[0].appendChild(style);
        this.style = style;
        // print support for RespVis (Webkit only), not supported by Firefox
        // https://bugzilla.mozilla.org/show_bug.cgi?id=774398
        if (window.matchMedia) {
            var mediaQueryList = window.matchMedia('print');
            // non-deprecated version: .addEventListener("change", () => {});
            // deprecated version gives Safari support for now
            mediaQueryList.addListener(function (mql) {
                if (mql.matches) {
                    window.dispatchEvent(new Event('resize'));
                }
            });
        }
    };
    // ---
    // Description: Called whenever the print button is clicked
    // ---
    PrintSettingsComponent.prototype.print = function () {
        this.applyPrintSettings();
        window.print();
    };
    // ---
    // Description: Load print settings from the localStorage
    // ---
    PrintSettingsComponent.prototype.loadSettings = function () {
        try {
            var item = localStorage.getItem("rslidy-print");
        }
        catch (e) {
            console.log(e);
            return;
        }
        if (item === null || item === undefined)
            return;
        var data = JSON.parse(item);
        this.view.querySelector("#rslidy-checkbox-link").checked = data.links;
        this.view.querySelector("#rslidy-checkbox-snum").checked = data.slidenumbers;
        this.view.querySelector("#rslidy-checkbox-frame").checked = data.frame;
        this.applyPrintSettings();
    };
    // ---
    // Description: Save print settings to the localStorage
    // ---
    PrintSettingsComponent.prototype.saveSettings = function () {
        try {
            localStorage.removeItem("rslidy-print");
            localStorage.setItem("rslidy-print", this.generateJSON());
        }
        catch (e) {
            console.log(e);
        }
    };
    // ---
    // Description: Generate a JSON string for the localStorage
    // ---
    PrintSettingsComponent.prototype.generateJSON = function () {
        var data = {
            links: this.view.querySelector("#rslidy-checkbox-link").checked,
            slidenumbers: this.view.querySelector("#rslidy-checkbox-snum").checked,
            frame: this.view.querySelector("#rslidy-checkbox-frame").checked
        };
        return JSON.stringify(data);
    };
    return PrintSettingsComponent;
}());
exports.PrintSettingsComponent = PrintSettingsComponent;


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var html_definitions_1 = __webpack_require__(3);
var ToolbarComponent = /** @class */ (function () {
    function ToolbarComponent() {
        var _this = this;
        this.enableiv = false;
        this.view =
            window.rslidy.utils.appendHtmlString(document.querySelector('#rslidy-column-flex'), html_definitions_1.toolbar_html);
        this.view
            .querySelector("#rslidy-button-overview")
            .addEventListener("click", function () { return _this.closeMenuOnBlur(function () { return _this.overviewToggleClicked(); }); });
        this.view
            .querySelector("#rslidy-button-toc")
            .addEventListener("click", function () { return _this.closeMenuOnBlur(function () { return _this.tocToggleClicked(); }); });
        this.view
            .querySelector("#rslidy-button-help")
            .addEventListener("click", function () { return _this.closeMenuOnBlur(function () { return _this.helpToggleClicked(); }); });
        this.view
            .querySelector("#rslidy-button-first")
            .addEventListener("click", function () { return _this.closeMenuOnBlur(function () { return window.rslidy.content.navFirst(); }); });
        this.view
            .querySelector("#rslidy-button-previous")
            .addEventListener("click", function () { return _this.closeMenuOnBlur(function () { return window.rslidy.content.navPrevious(true); }); });
        this.view
            .querySelector("#rslidy-button-next")
            .addEventListener("click", function () { return _this.closeMenuOnBlur(function () { return window.rslidy.content.navNext(true); }); });
        this.view
            .querySelector("#rslidy-button-last")
            .addEventListener("click", function () { return _this.closeMenuOnBlur(function () { return window.rslidy.content.navLast(); }); });
        this.view
            .querySelector("#rslidy-button-hide")
            .addEventListener("click", function () { return _this.closeMenuOnBlur(function () { return _this.showHideToggleClicked(); }); });
        this.view
            .querySelector("#rslidy-button-show")
            .addEventListener("click", function () { return _this.showHideToggleClicked(); });
        this.view
            .querySelector("#rslidy-button-all")
            .addEventListener("click", function () { return _this.displayToggleClicked(); });
        this.view
            .querySelector("#rslidy-timer")
            .addEventListener("click", function () { return _this.closeMenuOnBlur(function () { return window.rslidy.toggleTimer(); }); });
        this.view
            .querySelector("#rslidy-slide-caption")
            .addEventListener("click", function () { return _this.closeMenuOnBlur(function () { return _this.tocToggleClicked(); }); });
        this.view
            .querySelector("#rslidy-button-menu")
            .addEventListener("click", function () { return _this.menuToggleClicked(window.rslidy.MENU); });
        this.view
            .querySelector("#rslidy-button-print")
            .addEventListener("click", function () { return _this.menuToggleClicked(window.rslidy.PRINT_MENU); });
        this.view
            .querySelector("#rslidy-slide-input")
            .addEventListener("keyup", function (e) { return _this.closeMenuOnBlur(function () { return window.rslidy.slideInputKeyPressed(e); }); });
        // Only allow numbers for slide input
        window.rslidy.utils.setInputFilter(document.getElementById("rslidy-slide-input"), function (value) { return /^\d*$/.test(value); });
        document.getElementById("rslidy-help")
            .addEventListener("mouseup", function (e) { return _this.closeHelpOnBlur(e); });
        if (window.rslidy.start_with_toolbar_minimized)
            this.showHideToggleClicked();
    }
    // ---
    // Description: Called whenever the overview button is clicked.
    // ---
    ToolbarComponent.prototype.overviewToggleClicked = function () {
        window.rslidy.utils.switchElementsClass([document.getElementById("rslidy-overview-slides")], "rslidy-overview-visible");
        window.rslidy.utils.switchElementsClass([document.getElementById("rslidy-overview-slides")], "rslidy-invisible");
        window.rslidy.overview.adjustOverviewPanel();
        var visible = document.getElementById("rslidy-overview-slides").classList.contains("rslidy-overview-visible");
        document.getElementById("rslidy-button-overview").setAttribute("aria-expanded", String(visible));
        setTimeout(function () { return document.getElementById("rslidy-overview-slides").focus(); }, 100);
    };
    // ---
    // Description: Called whenever the help button is clicked.
    // ---
    ToolbarComponent.prototype.helpToggleClicked = function () {
        if (window.location.hash.match("#rslidy-help"))
            window.location.hash = "#";
        else {
            window.location.hash = "#rslidy-help";
            document.getElementById("rslidy-help-popup").scrollTop = 0;
            document.getElementById("rslidy-help").focus();
        }
    };
    // ---
    // Description: Called when clicking on the help overlay and closes the help
    // panel when clicking outside of the popup.
    // e: The click event
    // ---
    ToolbarComponent.prototype.closeHelpOnBlur = function (e) {
        if (e.target.id == "rslidy-help")
            window.location.hash = "#";
    };
    // ---
    // Description: Called whenever the toc button is clicked.
    // ---
    ToolbarComponent.prototype.tocToggleClicked = function () {
        window.rslidy.utils.switchElementsClass([document.getElementById("rslidy-overview-toc")], "rslidy-overview-visible");
        window.rslidy.utils.switchElementsClass([document.getElementById("rslidy-overview-toc")], "rslidy-invisible");
        var visible = document.getElementById("rslidy-overview-toc").classList.contains("rslidy-overview-visible");
        document.getElementById("rslidy-button-toc").setAttribute("aria-expanded", String(visible));
        setTimeout(function () { return document.getElementById("rslidy-overview-toc").focus(); }, 100);
    };
    // ---
    // Description: Called whenever the all slides button is clicked.
    // ---
    ToolbarComponent.prototype.displayToggleClicked = function () {
        if (this.allslides) {
            //find first visible slide
            var num = window.rslidy.content.currentSlideIndex;
            for (var i = 0; i < window.rslidy.num_slides; i++) {
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
            var css = "\n      body {\n        background-color: white !important;\n      }\n      .rslidy-ui {\n        display: none !important;\n      }\n      a[href^=\"http://\"]:after, a[href^=\"https://\"]:after {\n        content: \"\" !important;\n      }\n      .slide.animated {\n        animation: none !important;\n      }\n      .slide, #rslidy-column-flex, #rslidy-row-flex {\n        display: block !important;\n        page-break-after: avoid !important;\n        page-break-inside: always !important;\n        -webkit-region-break-inside: always !important;\n        position: relative !important;\n      }\n      html,\n      body,\n      #rslidy-content-section, #rslidy-row-flex {\n        left: 0em !important;\n        right: 0em !important;\n        max-height: 100% !important;\n      }\n      img {\n        max-width: 100% !important;\n        max-height: 100% !important;\n      }\n      #rslidy-content-section {\n        counter-reset: slide-counter;\n      }\n      #rslidy-content-section .slide:after {\n        display: block;\n        content: counter(slide-counter);\n        counter-increment: slide-counter;\n        margin-top: 0.5em;\n        text-align: right;\n        font: 80% Sans-Serif;\n      }\n      .slide {\n        border: " + window.rslidy.print_frame + ";\n      }\n      #rslidy-trapezoid-wrapper-display {\n        display: block !important;\n      }";
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
    };
    // ---
    // Description: Wrapper for the custom settings close_menu_on_blur and
    // close_menu_on_selection
    // fun: An optional function to execute before closing menues
    // condition: The condition for closing the menues
    // ---
    ToolbarComponent.prototype.closeMenuWrapper = function (fun, condition) {
        if (fun === void 0) { fun = null; }
        if (fun)
            fun();
        if (condition)
            this.closeMenues();
    };
    // ---
    // Description: Close open menues on blur
    // ---
    ToolbarComponent.prototype.closeMenuOnBlur = function (fun) {
        if (fun === void 0) { fun = null; }
        this.closeMenuWrapper(fun, window.rslidy.close_menu_on_blur);
    };
    // ---
    // Description: Close open menues on selection
    // ---
    ToolbarComponent.prototype.closeMenuOnSelection = function (fun) {
        if (fun === void 0) { fun = null; }
        this.closeMenuWrapper(fun, window.rslidy.close_menu_on_selection);
    };
    // ---
    // Description: Closes all menues
    // ---
    ToolbarComponent.prototype.closeMenues = function () {
        document.getElementById("rslidy-menu").classList.add("rslidy-hidden");
        document.getElementById("rslidy-print-menu").classList.add("rslidy-hidden");
        document.getElementById("rslidy-button-menu").setAttribute("aria-expanded", "false");
        document.getElementById("rslidy-button-print").setAttribute("aria-expanded", "false");
    };
    // ---
    // Description: Called whenever a menu button is clicked.
    // index: The index of the menu (See constants in rslidy.ts)
    // ---
    ToolbarComponent.prototype.menuToggleClicked = function (index) {
        var menues = ["rslidy-menu", "rslidy-print-menu"];
        var buttons = ["rslidy-button-menu", "rslidy-button-print"];
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
                    .then(function (permissionState) {
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
                    .then(function (permissionState) {
                    if (permissionState === 'granted') {
                        window.addEventListener("deviceorientation", function (e) {
                            window.rslidy.onDeviceOrientation(e);
                        }.bind(window.rslidy));
                    }
                })
                    .catch(console.error);
            }
        }
    };
    // ---
    // Description: Called whenever the show/hide toolbar button is clicked.
    // ---
    ToolbarComponent.prototype.showHideToggleClicked = function () {
        window.rslidy.utils.switchElementsClass([document.getElementById("rslidy-tb-show-trapezoid")], "rslidy-hidden");
        window.rslidy.utils.switchElementsClass([document.getElementById("rslidy-toolbar-area")], "rslidy-bar-hidden");
    };
    return ToolbarComponent;
}());
exports.ToolbarComponent = ToolbarComponent;


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var html_definitions_1 = __webpack_require__(3);
var OverviewComponent = /** @class */ (function () {
    function OverviewComponent(model) {
        var _this = this;
        this.preview_width = 250;
        this.model = model;
        this.slide_view = document.querySelector('#rslidy-overview-slides');
        this.toc_view = document.querySelector('#rslidy-overview-toc');
        var nubs = document.querySelector('#rslidy-progress-bar-nubs');
        // Iterate over all slides and set up the overview and toc
        for (var i = 0; i < window.rslidy.num_slides; i++) {
            var slideHtml = model[i];
            var title = i + 1 + ". " + this.getSlideHeading(slideHtml);
            var xofy = i + 1 + " / " + window.rslidy.num_slides;
            var thumbnail = window.rslidy.utils.appendHtmlString(this.slide_view, html_definitions_1.thumbnail_html(i, xofy, slideHtml, ""));
            thumbnail.addEventListener("click", function (e) {
                return _this.slideSelected(e);
            });
            var pv = window.rslidy.utils.appendHtmlString(nubs, html_definitions_1.preview_html(i));
            pv.style.width = "calc(100%/" + window.rslidy.num_slides + ")";
            pv.style.left = "calc((100%/" + window.rslidy.num_slides + ")*" + i + ")";
            if (!window.rslidy.show_slide_dividers)
                pv.classList.add("rslidy-nonubs");
            pv.addEventListener("click", function (e) {
                return window.rslidy.content.showSlide(Number(e.target.dataset.slideindex), false);
            });
            pv.addEventListener("mouseover", function (e) {
                return _this.showPreview(e.target);
            });
            pv.addEventListener("mouseout", function (e) {
                return _this.removePreview(e.target);
            });
            var link = window.rslidy.utils.appendHtmlString(this.toc_view, html_definitions_1.link_html(i, title));
            link.addEventListener("click", function (e) {
                return _this.slideSelected(e);
            });
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
    OverviewComponent.prototype.adjustOverviewPanel = function () {
        this.adjustPanel("");
    };
    // ---
    // Description: Adjust the progressbar preview panels
    // ---
    OverviewComponent.prototype.adjustPreviewPanel = function () {
        this.adjustPanel("-pv");
    };
    // ---
    // Description: Adjusts the aspect ratio and display sizes of the thumbnail
    // images in the overview menu.
    // suffix: used by the wrapper functions above
    // ---
    OverviewComponent.prototype.adjustPanel = function (suffix) {
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
            var w = overview_width;
            var h = w /
                (window.rslidy.utils.getSlideWidth(aspect_ratio, final_width) /
                    window.rslidy.utils.getSlideHeight(aspect_ratio, final_width));
            if (suffix == "-pv")
                thumbnail_wrappers[i].style.width = (w - 20) + "px";
            thumbnail_wrappers[i].style.height = (h - 20) + "px";
        }
    };
    // ---
    // Description: Returns the heading of a slide if available (or "slide" if
    // not found).
    // slide_element: The slide element to get the heading from.
    // ---
    OverviewComponent.prototype.getSlideHeading = function (slide_element) {
        if (slide_element.indexOf("<h1>") !== -1)
            return slide_element.substring(slide_element.indexOf("<h1>") + 4, slide_element.indexOf("</h1>"));
        else if (slide_element.indexOf("<h2>") !== -1)
            return slide_element.substring(slide_element.indexOf("<h2>") + 4, slide_element.indexOf("</h2>"));
        else if (slide_element.indexOf("<h3>") !== -1)
            return slide_element.substring(slide_element.indexOf("<h3>") + 4, slide_element.indexOf("</h3>"));
        else
            return "slide";
    };
    // ---
    // Description: Show a slide preview on the progressbar
    // e: the mouseover event
    // ---
    OverviewComponent.prototype.showPreview = function (e) {
        var _this = this;
        var i = Number(e.dataset.slideindex);
        var slideHtml = this.model[i];
        var xofy = i + 1 + " / " + window.rslidy.num_slides;
        var child = e.children[0];
        var thumbnail = window.rslidy.utils.appendHtmlString(child, html_definitions_1.thumbnail_html(i, xofy, slideHtml, "-pv"));
        thumbnail.addEventListener("touchstart", function (e2) {
            _this.slideSelected(e2);
            _this.removePreview(e);
        });
        if (window.rslidy.low_light_mode) {
            var elements = child.getElementsByTagName("img");
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
    };
    // ---
    // Description: Remove a slide preview from the progressbar
    // e: the mouseout event
    // ---
    OverviewComponent.prototype.removePreview = function (e) {
        e.children[0].innerHTML = '';
    };
    // ---
    // Description: Called whenever a slide thumbnail in the overview gets
    // clicked.
    // e: Event.
    // ---
    OverviewComponent.prototype.slideSelected = function (e) {
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
    };
    return OverviewComponent;
}());
exports.OverviewComponent = OverviewComponent;


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var slide_transition_1 = __webpack_require__(10);
var ContentComponent = /** @class */ (function () {
    function ContentComponent(view) {
        var _this = this;
        this.currentSlideIndex = -1;
        this.marginTapLeftDown = false;
        this.marginTapRightDown = false;
        this.view = view;
        this.slideTransition = new slide_transition_1.SlideTransition();
        this.progress_bar = document.getElementById("rslidy-progress-bar");
        this.slide_caption = document.getElementById("rslidy-slide-caption");
        this.slide_input = document.getElementById("rslidy-slide-input");
        this.view.addEventListener("mousedown", function (e) {
            window.rslidy.start_x = e.clientX;
            window.rslidy.start_y = e.clientY;
        });
        this.view.addEventListener("mousemove", function (e) {
            _this.marginTapBoth(e, function () { _this.view.style.cursor = "pointer"; }, function () { _this.view.style.cursor = "auto"; });
        });
        this.view.addEventListener("mousedown", function (e) {
            //prevent double click selection
            _this.marginTapBoth(e, function () { if (e.detail > 1)
                e.preventDefault(); }, function () { });
            //set booleans for mouseup
            _this.marginTap(e, function () { _this.marginTapLeftDown = true; }, function () { _this.marginTapRightDown = true; }, function () {
                _this.marginTapLeftDown = false;
                _this.marginTapRightDown = false;
            });
        });
        this.view.addEventListener("mouseup", function (e) {
            _this.marginTap(e, function () {
                if (_this.marginTapLeftDown)
                    _this.navPrevious(true);
                _this.marginTapLeftDown = false;
            }, function () {
                if (_this.marginTapRightDown)
                    _this.navNext(true);
                _this.marginTapRightDown = false;
            }, function () { });
            window.rslidy.toolbar.closeMenuOnBlur();
        });
        this.view.addEventListener("touchstart", function (e) { return _this.onTouchstart(e); }, { passive: true });
        this.view.addEventListener("touchmove", function (e) { return _this.onTouchmove(e); }, { passive: true });
        this.view.addEventListener("touchend", function (e) { return _this.onTouchend(e); });
        this.view.querySelector("#rslidy-button-current").addEventListener("click", function () { return window.rslidy.toolbar.displayToggleClicked(); });
    }
    // ---
    // Description: calculation logic for margin tap
    // e: Event.
    // left, right, center: function callbacks for the left and right
    // click areas as well as center (& disabled).
    // Use the both function wrapper to set left = right
    // ---
    ContentComponent.prototype.marginTap = function (e, left, right, center) {
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
    };
    ContentComponent.prototype.marginTapBoth = function (e, both, center) {
        this.marginTap(e, both, both, center);
    };
    // ---
    // Description: Called whenever the user begins to touch the body area.
    // e: Event.
    // ---
    ContentComponent.prototype.onTouchstart = function (e) {
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
    };
    // ---
    // Description: Called whenever the user moves the finger while touching the
    // body area.
    // e: Event.
    // ---
    ContentComponent.prototype.onTouchmove = function (e) {
        // Update values
        var touch = e.touches[0];
        var delta_x_old = window.rslidy.delta_x;
        window.rslidy.delta_x = touch.pageX - window.rslidy.start_x;
        window.rslidy.delta_y = touch.pageY - window.rslidy.start_y;
        // If the delta_x position has changed a lot, the user is swiping and the
        // content does not need to be scrolled!
        if (Math.abs(window.rslidy.delta_x - delta_x_old) > 10)
            e.preventDefault();
    };
    // ---
    // Description: Called whenever the stops touching the body area.
    // e: Event.
    // ---
    ContentComponent.prototype.onTouchend = function (e) {
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
    };
    // ---
    // Description: Returns the number of incremental list items on a slide.
    // slide_index: The index of the slide (0-indexed).
    // only_visible: Returns only the number of currently visible items (optional)
    // ---
    ContentComponent.prototype.getNumIncrItems = function (slide_index, only_visible) {
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
    };
    // ---
    // Description: Jumps to the next slide (or next bullet point).
    // animate: boolean to enable/disable animation
    // ---
    ContentComponent.prototype.navNext = function (animate) {
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
    };
    // ---
    // Description: Jumps to the last slide.
    // ---
    ContentComponent.prototype.navLast = function () {
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
    };
    // ---
    // Description: Jumps to the previous slide (or previous bullet point).
    // animate: boolean to enable/disable animation
    // ---
    ContentComponent.prototype.navPrevious = function (animate) {
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
    };
    // ---
    // Description: Jumps to the first slide.
    // ---
    ContentComponent.prototype.navFirst = function () {
        var new_index = 0;
        this.showSlide(new_index, false);
        // Check for incremental items on previous slide
        if (this.getNumIncrItems(new_index, false) > 0) {
            var num_incr_items = this.getNumIncrItems(new_index, false);
            this.showItemsUpToN(num_incr_items);
        }
    };
    // ---
    // Description: Shows the first n bullet points and hides the rest.
    // n: Specifies the last incremental item to show.
    // ---
    ContentComponent.prototype.showItemsUpToN = function (n) {
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
    };
    //
    // Slide navigation methods
    //
    // ---
    // Description: Hides all slides and shows specified slide then.
    // slide_index: The index of the slide (0-indexed).
    // animate: boolean to enable/disable animation
    // ---
    ContentComponent.prototype.showSlide = function (targetSlideIndex, animate) {
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
    };
    // ---
    // Description: Returns the currently displayed slide index (0-indexed).
    // ---
    ContentComponent.prototype.getCurrentSlideIndex = function () {
        var url_parts = window.location.href.split("#");
        if (url_parts.length > 1) {
            var hash = parseInt(url_parts[1]);
            if (hash > 0)
                return hash - 1;
        }
        return 0;
    };
    return ContentComponent;
}());
exports.ContentComponent = ContentComponent;


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var SlideTransition = /** @class */ (function () {
    function SlideTransition() {
        this.animationTypeFade = "fade";
        this.animationTypeSlideIn = "slidein";
        this.animationTypeZoom = "zoom";
        this.isSlidein = false;
        this.hideTimeout = 500;
        this.contentSection = document.getElementById("rslidy-content-section");
        this.slides = this.contentSection.getElementsByClassName("slide");
        this.slideThumbnails = document.getElementsByClassName("rslidy-slide-thumbnail");
        var bodyClasses = document.getElementsByTagName("body")[0]
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
        for (var i = 0; i < this.slides.length; i++) {
            this.slides[i].classList.add("rslidy-hidden");
            this.slideThumbnails[i].classList.remove("rslidy-slide-selected");
        }
    }
    // ---
    // Description: Adds classes to the slides for proper slide transitions.
    // ---
    SlideTransition.prototype.setSlideTransitionClass = function (transitionClass) {
        for (var i = 0; i < this.slides.length; i++) {
            this.slides[i].classList.add(transitionClass);
        }
    };
    // ---
    // Description: Handles a slide transition
    // currentSlideIndex: The current slide
    // targetSlideIndex: The target slide
    // animate: boolean to enable/disable animation
    // ---
    SlideTransition.prototype.doSlideTransition = function (currentSlideIndex, targetSlideIndex, animate) {
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
                setTimeout(function () {
                    // restarts the animation
                    current_slide_classes.add("animated");
                }, 10);
                this.slideTimeouts[currentSlideIndex] = setTimeout(function () {
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
    };
    return SlideTransition;
}());
exports.SlideTransition = SlideTransition;


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var html_definitions_1 = __webpack_require__(3);
var ImageViewerComponent = /** @class */ (function () {
    function ImageViewerComponent() {
        this.zoomFactor = 1.0;
        this.mouseDragStartX = 0;
        this.mouseDragStartY = 0;
        this.imageOffsetX = 0;
        this.imageOffsetY = 0;
        this.active = false;
        this.setImageViewerClasses();
        this.view =
            window.rslidy.utils.prependHtmlString(document.body, html_definitions_1.image_viewer);
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
    ImageViewerComponent.prototype.close = function () {
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
    };
    // ---
    // Description: Iterate over all slide images and set image viewer classes
    // ---
    ImageViewerComponent.prototype.setImageViewerClasses = function () {
        var slides = document.getElementsByClassName("slide");
        var imgs = new Array();
        for (var _i = 0, slides_1 = slides; _i < slides_1.length; _i++) {
            var slide = slides_1[_i];
            var imgsThisSlide = slide.getElementsByTagName("img");
            for (var _a = 0, imgsThisSlide_1 = imgsThisSlide; _a < imgsThisSlide_1.length; _a++) {
                var img = imgsThisSlide_1[_a];
                imgs.push(img);
            }
        }
        window.rslidy.utils.addElementsClass(imgs, "rslidy-slide-image");
    };
    // ---
    // Description: Add the onclick handler to all slide images
    // ---
    ImageViewerComponent.prototype.addImageOnClickHandlers = function () {
        var _this = this;
        var _loop_1 = function () {
            var image = this_1.images.item(i);
            image.ontouchend = function () {
                _this.touch = true;
            };
            image.onclick = function () {
                if (!window.rslidy.image_viewer)
                    return;
                if (_this.touch) {
                    _this.touch = false;
                    return;
                }
                //setup browser back button to close image viewer
                history.pushState(null, null, window.location.href.replace(window.location.hash, "#"));
                _this.view.style.display = "block";
                _this.modalImg.src = image.src;
                var theImage = new Image();
                theImage.src = image.src;
                _this.imageWidth = theImage.width;
                _this.imageHeight = theImage.height;
                // fix for firefox
                if (_this.imageWidth == 0) {
                    _this.imageWidth = _this.modalImg.width;
                }
                if (_this.imageHeight == 0) {
                    _this.imageHeight = _this.modalImg.height;
                }
                _this.containerWidth = _this.container.clientWidth;
                _this.containerHeight = _this.container.clientHeight;
                _this.initialZoom();
                _this.isInsideContainer = true;
                _this.active = true;
            };
            // prevent links around images, they can still be used with
            // right click -> open link in ...
            if (image.parentNode.nodeName.toLowerCase() === 'a') {
                image.parentElement.onclick = function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                };
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.images.length; i++) {
            _loop_1();
        }
    };
    // ---
    // Description: Adds handlers for the image viewer buttons
    // ---
    ImageViewerComponent.prototype.addButtonHandlers = function () {
        var _this = this;
        var spanClose = this.view.getElementsByClassName("rslidy-iv-close")[0];
        spanClose.addEventListener("click", function () {
            _this.close();
        });
        var spanZoomIn = this.view.getElementsByClassName("rslidy-iv-zoom-in")[0];
        spanZoomIn.addEventListener("click", function () {
            _this.zoomIn();
        });
        var spanZoomOut = this.view.getElementsByClassName("rslidy-iv-zoom-out")[0];
        spanZoomOut.addEventListener("click", function () {
            _this.zoomOut();
        });
        var spanZoomReset = document.getElementsByClassName("rslidy-iv-zoom-reset")[0];
        spanZoomReset.addEventListener("click", function () {
            _this.initialZoom();
        });
    };
    // ---
    // Description: Adds support for mouse events
    // ---
    ImageViewerComponent.prototype.addMouseEventListeners = function () {
        var _this = this;
        var mouseDown = false;
        this.container.addEventListener("mouseenter", function (mouseDownEvent) {
            _this.isInsideContainer = true;
        });
        this.container.addEventListener("mouseleave", function (mouseDownEvent) {
            _this.isInsideContainer = false;
        });
        window.addEventListener("resize", function () {
            if (_this.active) {
                _this.containerWidth = _this.container.clientWidth;
                _this.containerHeight = _this.container.clientHeight;
                _this.applyOffset(true);
            }
        });
        this.view.addEventListener("wheel", function (mouseWheelEvent) {
            mouseWheelEvent.preventDefault();
            var delta = Math.max(-1, Math.min(1, mouseWheelEvent.wheelDelta || -mouseWheelEvent.deltaY));
            if (delta > 0) {
                _this.zoomIn();
                var factor = 1 - _this.zoomFactor * 1.2 / _this.zoomFactor;
                _this.imageOffsetX +=
                    (mouseWheelEvent.clientX - window.innerWidth / 2) * factor;
                _this.imageOffsetY +=
                    (mouseWheelEvent.clientY - window.innerHeight / 2) * factor;
                _this.applyOffset(false);
            }
            else if (delta != 0) {
                _this.zoomOut();
                var factor = 1 - _this.zoomFactor / 1.2 / _this.zoomFactor;
                if (_this.zoomFactor / 1.2 > _this.initialZoomFactor / 10) {
                    _this.imageOffsetX +=
                        (mouseWheelEvent.clientX - window.innerWidth / 2) * factor;
                    _this.imageOffsetY +=
                        (mouseWheelEvent.clientY - window.innerHeight / 2) * factor;
                    _this.applyOffset(false);
                }
            }
        }, { passive: true });
        this.view.addEventListener("mousedown", function (mouseDownEvent) {
            mouseDownEvent.preventDefault();
            if (!_this.isInsideContainer) {
                return;
            }
            _this.mouseDragStartX = mouseDownEvent.clientX;
            _this.mouseDragStartY = mouseDownEvent.clientY;
            _this.modalImg.classList.remove("rslidy-transition-enabled");
            mouseDown = true;
        });
        this.view.addEventListener("mousemove", function (mouseMoveEvent) {
            mouseMoveEvent.preventDefault();
            if (!mouseDown) {
                return;
            }
            _this.imageOffsetX =
                _this.imageOffsetX + mouseMoveEvent.clientX - _this.mouseDragStartX;
            _this.imageOffsetY =
                _this.imageOffsetY + mouseMoveEvent.clientY - _this.mouseDragStartY;
            _this.mouseDragStartX = mouseMoveEvent.clientX;
            _this.mouseDragStartY = mouseMoveEvent.clientY;
            _this.applyOffset(false);
        });
        this.view.addEventListener("mouseup", function (mouseUpEvent) {
            mouseDown = false;
        });
    };
    // ---
    // Description: Zoom in on the image
    // ---
    ImageViewerComponent.prototype.zoomIn = function () {
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
    };
    // ---
    // Description: Zoom out of the image
    // ---
    ImageViewerComponent.prototype.zoomOut = function () {
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
    };
    // ---
    // Description: Offset the image
    // center: set true to re-center the image, used for initialZoom()
    // ---
    ImageViewerComponent.prototype.applyOffset = function (center) {
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
    };
    // ---
    // Description: Setup or revert to the initial zoom level
    // ---
    ImageViewerComponent.prototype.initialZoom = function () {
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
    };
    return ImageViewerComponent;
}());
exports.ImageViewerComponent = ImageViewerComponent;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
var utils_1 = __webpack_require__(1);
var settings_1 = __webpack_require__(2);
var print_settings_1 = __webpack_require__(6);
var toolbar_1 = __webpack_require__(7);
var overview_1 = __webpack_require__(8);
var content_1 = __webpack_require__(9);
var image_viewer_1 = __webpack_require__(11);
var html_definitions_1 = __webpack_require__(3);
// Implements the core functionality.
var Rslidy = /** @class */ (function () {
    function Rslidy() {
        // Members
        this.utils = new utils_1.Utils();
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
    Rslidy.prototype.init = function () {
        var _this = this;
        // check for section over div slide and add classes for compatibility
        var sections = document.getElementsByTagName("section");
        for (var i = 0; i < sections.length; i++)
            if (sections[i].parentElement.nodeName == "BODY")
                sections[i].classList.add("slide");
        // generate html from slides for overview thumbnails, and add aria tags
        var slides = document.querySelectorAll(".slide");
        this.num_slides = slides.length;
        if (this.num_slides == 0)
            return;
        var slides_html = new Array(this.num_slides);
        for (var i = 0; i < this.num_slides; i++) {
            slides_html[i] = slides[i].outerHTML.replace(/id=\"*\"/g, "");
            slides_html[i] = slides_html[i].replace(/href=\"*\"/g, "class=\"rslidy-link\"");
            slides[i].setAttribute("role", "region");
            slides[i].setAttribute("aria-label", "Slide " + (i + 1));
        }
        // create a wrapper for the new body
        var wrapper = document.createElement("div");
        wrapper.id = "rslidy-column-flex";
        // add content section to the wrapper
        this.utils.appendHtmlString(wrapper, html_definitions_1.content_section);
        var cs = wrapper.querySelector('#rslidy-content-section');
        // move the old body's children into the content section
        while (document.body.firstChild)
            cs.appendChild(document.body.firstChild);
        // Append the wrapper to the body
        document.body.appendChild(wrapper);
        this.imageViewer = new image_viewer_1.ImageViewerComponent();
        this.utils.prependHtmlString(document.body, html_definitions_1.notes_text);
        this.utils.prependHtmlString(document.body, html_definitions_1.help_text);
        this.toolbar = new toolbar_1.ToolbarComponent();
        this.settings = new settings_1.SettingsComponent();
        this.printSettings = new print_settings_1.PrintSettingsComponent();
        this.overview = new overview_1.OverviewComponent(slides_html);
        this.content = new content_1.ContentComponent(cs);
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
        window.onbeforeunload = function () {
            _this.settings.saveSettings();
            _this.printSettings.saveSettings();
        };
        // Disable keyboard shortcuts on right click menu open
        window.oncontextmenu = function (e) {
            _this.shortcuts_disabled = true;
            setTimeout(function () { return _this.shortcuts_disabled = false; }, 3000);
        };
        this.running = true;
    };
    // ---
    // Description: Sets tabindex, aria tags and callbacks for checkboxes
    // ---
    Rslidy.prototype.setTabindexAndCallbacks = function () {
        var _this = this;
        var labels = document.querySelectorAll("label[id*=\"checkbox\"]");
        var _loop_1 = function (i) {
            var l = labels[i];
            l.setAttribute("tabindex", "0");
            input = l.querySelector("input");
            l.setAttribute("role", "checkbox");
            l.setAttribute("aria-checked", String(input.checked));
            input.addEventListener("change", function () {
                l.setAttribute("aria-checked", String(this.checked));
            });
            l.addEventListener("keyup", function (e) { return _this.checkboxCallback(e, l); });
        };
        var input;
        for (var i = 0; i < labels.length; i++) {
            _loop_1(i);
        }
    };
    // ---
    // Description: Handles keyup for checkboxes
    // e: event
    // l: the label of the checkbox
    // ---
    Rslidy.prototype.checkboxCallback = function (e, l) {
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
    };
    // ---
    // Description: Adds event listeners like left/right keys.
    // ---
    Rslidy.prototype.addListeners = function () {
        var _this = this;
        // Key listeners
        window.onkeyup = function (e) { return _this.keyPressed(e); };
        // Window listeners
        window.addEventListener("hashchange", function () {
            this.onHashchange();
        }.bind(this));
        // Allow simple touch events on speaker notes overlay (double tap -> hide)
        var speaker_notes_overlay = document.getElementById("rslidy-speakernotes-overlay");
        speaker_notes_overlay.addEventListener("touchstart", function (e) {
            return _this.content.onTouchstart(e);
        }, { passive: true });
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
    };
    // ---
    // Description: Initializes the timer.
    // ---
    Rslidy.prototype.initTimer = function () {
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
    };
    // ---
    // Description: Toggles the timer. Works only if this.presentation_time > 0.
    // ---
    Rslidy.prototype.toggleTimer = function () {
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
    };
    // ---
    // Description: Called whenever a key is pressed.
    // e: Event.
    // ---
    Rslidy.prototype.keyPressed = function (e) {
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
    };
    // ---
    // Description: Focus the rslidy-slide-input for Jump to Slide
    // n (optional): Adds the number to the input field
    // ---
    Rslidy.prototype.focusJumpText = function (n) {
        var j = document.getElementById("rslidy-slide-input");
        if (n == undefined)
            j.value = "";
        else
            j.value = "" + n;
        j.focus();
    };
    // ---
    // Description: Called whenever a key in the slide input text box was pressed.
    // e: The event.
    // ---
    Rslidy.prototype.slideInputKeyPressed = function (e) {
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
    };
    // ---
    // Description: Called whenever the night mode button is clicked.
    // ---
    Rslidy.prototype.toggleLowLightMode = function () {
        // Inverts everything, then reverts individual elements again after "html"
        // which should stay the same (e.g. images)
        var invert = ["html", "img"];
        for (var i = 0; i < invert.length; i++) {
            var elements = document.getElementsByTagName(invert[i]);
            this.utils.switchElementsClass(elements, "rslidy-color-invert");
        }
        // Add custom classes to h1, h2, h3, p, span, li, ul, ol, pre and a
        var custom_classes = [
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
        for (var i = 0; i < custom_classes.length; i++) {
            var elements = document.getElementsByTagName(custom_classes[i]);
            this.utils.switchElementsClass(elements, "rslidy-night-mode");
            this.utils.invertElementsColor(elements, this.low_light_mode);
        }
        this.low_light_mode = !this.low_light_mode;
    };
    // ---
    // Description: Called whenever the address field content changes.
    // ---
    Rslidy.prototype.onHashchange = function () {
        if (window.location.hash.match(/#[0-9]+/))
            this.content.showSlide(this.content.getCurrentSlideIndex(), false);
    };
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
    Rslidy.prototype.onDeviceOrientation = function (e) {
        var _this = this;
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
            this.tilt_action = function () { return _this.content.navNext(true); };
        if (value <= -this.tilt_lower * tilt_multiplier &&
            value >= -this.tilt_upper * tilt_multiplier)
            this.tilt_action = function () { return _this.content.navPrevious(true); };
        if (value >= this.tilt_upper * tilt_multiplier ||
            value <= -this.tilt_upper * tilt_multiplier) {
            this.tilt_action = null;
            this.tilt_allowed = false;
        }
    };
    // ---
    // Description: Called whenever the acceleration of the device changes.
    // e: Event.
    //
    // The shake gesture fires when the number of consecutive shakes (stored in
    // the variable shakes) exceeds the value of the variable required_shakes
    // within a certain time limit (defined by the variable shake_time_limit)
    // ---
    Rslidy.prototype.onDeviceMotion = function (e) {
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
    };
    // ---
    // Description: Toggles speaker nodes for current slide if available.
    // e: Event coming from double tap, null otherwise.
    // always_hide: If true, speaker nodes are hidden regardless of the current
    // status.
    // ---
    Rslidy.prototype.toggleSpeakerNotes = function (e, always_hide) {
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
    };
    return Rslidy;
}());
exports.Rslidy = Rslidy;
function start() {
    var t0 = performance.now();
    //inject loading spinner and hide body overflowing behind the spinner
    document.body.insertAdjacentHTML('afterbegin', html_definitions_1.spinner_html);
    document.body.style.overflow = 'hidden';
    //timeout allows the browser to repaint and display the spinner
    setTimeout(function () {
        window.rslidy.init();
        //hide the spinner again after rslidy is done
        document.getElementById('rslidy-spinner').classList.add('rslidy-hidden');
        var t1 = performance.now();
        console.log("Time to first slide: " + (t1 - t0) + " milliseconds.");
    }, 1);
}
window.rslidy = new Rslidy();
document.addEventListener("DOMContentLoaded", start);

})();

/******/ })()
;
//# sourceMappingURL=rslidy.js.map