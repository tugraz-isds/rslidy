// Class Utils
// Implements utility functions.
export class Utils {

  // ---
  // Description: Returns the width of the slide.
  // aspect_ratio: The desired aspect ratio (or 0 for dynamic calculation).
  // custom_width: The custom width.
  // ---
  getSlideWidth(aspect_ratio: number, custom_width: number): number {
    aspect_ratio = aspect_ratio || 0;

    if (aspect_ratio == 0) return window.outerWidth;

    var width: number = custom_width; // ...
    return width;
  }

  // ---
  // Description: Returns the height of the slide.
  // aspect_ratio: The desired aspect ratio (or 0 for dynamic calculation).
  // custom_width: The custom width.
  // ---
  getSlideHeight(aspect_ratio: number, custom_width: number): number {
    aspect_ratio = aspect_ratio || 0;

    if (aspect_ratio == 0) return window.outerHeight;

    var width: number = custom_width;
    var height: number = width / aspect_ratio;
    return height;
  }

  // ---
  // Description: Returns the current aspect ratio.
  // ---
  getCurrentAspectRatio(): number {
    var window_width: number = window.innerWidth;
    var window_height: number = window.innerHeight;
    var current_aspect_ratio: number = window_width / window_height;
    return current_aspect_ratio;
  }

  // ---
  // Description: Gets the relative width of an element, with respect to the
  // whole window.
  // element: Specifies the element to consider.
  // aspect_ratio: The desired aspect ratio (or 0 for dynamic calculation).
  // custom_width: The custom width.
  // ---
  getRelativeWidth(element_width: number, aspect_ratio: number, custom_width: number)
  : number {
    var window_width: number =
      aspect_ratio == 0 ? window.outerWidth : custom_width;
    var relative_width: number = element_width / window_width;
    return relative_width;
  }

  // ---
  // Description: Returns the integer representation of a character.
  // character: Specifies the character to convert.
  // ---
  toInt(character: any): any {
    return 1 * character;
  }

  // ---
  // Description: Returns a 2-digit-representation of a number (e.g. "6"
  // becomes "06", but "11" will still be "11").
  // num: Specify the number.
  // ---
  toTwoDigits(num: number): any {
    return ("0" + num).slice(-2);
  }

  // ---
  // Description: Switches the existence of a class of each element in a
  // specified list (ignores elements with class "ignore").
  // element_list: The list of elements.
  // class_name: The name of the class.
  // ---
  switchElementsClass(element_list: any, class_name: string): void {
    for (var i: number = 0; i < element_list.length; i++) {
      if (element_list[i].classList.contains("ignore") == true) continue;
      if (element_list[i].classList.contains(class_name) == true)
        element_list[i].classList.remove(class_name);
      else element_list[i].classList.add(class_name);
    }
  }

  // ---
  // Description: Adds a class to an element if not already present
  // element_list: The list of elements.
  // class_name: The name of the class.
  // ---
  addElementsClass(element_list: any, class_name: string): void {
    for (var i: number = 0; i < element_list.length; i++) {
      if (
        element_list[i].classList.length == 0 ||
        element_list[i].classList.contains(class_name) == false
      ) {
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
  invertElementsColor(element_list: any, low_light_mode: boolean): void {
    low_light_mode = low_light_mode || false;

    for (var i: number = 0; i < element_list.length; i++) {
      // Continue if night mode is to be disabled
      if (low_light_mode == true) {
        element_list[i].style.color = "";
        continue;
      }

      // Invert color
      var color_rgb: string = getComputedStyle(
        element_list[i]
      ).getPropertyValue("color");
      var color_hex: string = "#";
      var rgx: any = /\d+/g;
      var match: any;
      while ((match = rgx.exec(color_rgb)) != null) {
        var inverted: number = 255 - match[0];
        if (inverted < 16) color_hex += "0";
        color_hex += inverted.toString(16);
      }

      element_list[i].style.color = color_hex;
    }
  }

  // ---
  // Description: Returns the font size in em for a specific CSS query
  // query: the CSS query
  // ---
  getEM(query: string): number {
    return parseFloat(window.getComputedStyle(
      document.querySelectorAll(query)[0]
    ).getPropertyValue("font-size")) / parseFloat(
    window.getComputedStyle(
      document.body
    ).getPropertyValue("font-size"));
  }

  // ---
  // Description: Converts rem to pixel count
  // rem: the rem input
  // ---
  remToPixel(rem: number): number {
    return parseFloat(window.getComputedStyle(
      document.body
    ).getPropertyValue("font-size")) * rem;
  }

  // ---
  // Description: Applies a regex to keyboard input, only allowing specific keys
  // textbox: The textbox to filter.
  // inputFilter: Function returning the filtered input
  //              Example: function(value) {return /^\d*$/.test(value);}
  // Source: https://jsfiddle.net/emkey08/zgvtjc51
  // ---
  setInputFilter(textbox: any, inputFilter: any): void {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
      textbox.addEventListener(event, function() {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
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
  htmlParse(htmlstr: string) {
    const template = document.createElement("div");
    template.innerHTML = htmlstr;
    return template.firstElementChild;
  }

  // ---
  // Description: Insterts an html element at the start of another one
  // parent: The html element that gets modified
  // html: The new html element as string
  // ---
  prependHtmlString(parent: HTMLElement, html: string) {
    const view = this.htmlParse(html);
    parent.insertBefore(view, parent.firstChild);
    return view;
  }

  // ---
  // Description: Inserts an html element at the end of another one
  // parent: The html element that gets modified
  // html: The new html element as string
  // ---
  appendHtmlString(parent: HTMLElement, html: string) {
    const view = this.htmlParse(html);
    parent.appendChild(view);
    return view;
  }

  // ---
  // Description: Get the slide with the specified index
  // index: slide index
  // ---
  getSlide(index: number) {
    return window.rslidy.content.slideTransition.slides[index];
  }

  // ---
  // Description: True if an element is visible on screen
  // elm: the html element to check
  // ---
  checkVisible(elm: HTMLElement) {
    var rect = elm.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
  }
}
