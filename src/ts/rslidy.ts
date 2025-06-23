import { Utils } from "./utils";
import { SettingsComponent } from "./settings";
import { PrintSettingsComponent } from "./print-settings";
import { ToolbarComponent } from "./toolbar";
import { OverviewComponent } from "./overview";
import { ContentComponent } from "./content";
import { ImageViewerComponent } from "./image-viewer";
import { help_text, content_section, notes_text, spinner_html } from './html-definitions';

// The main class, including events and style injections.

// Custom interface entries
interface Node {
  classList: DOMTokenList;
  // Gives error "Property classList does not exist on type Node" otherwise
}

interface CSSStyleDeclaration {
  MozTransform: any;
  MozTransformOrigin: any;
  msTransform: any;
  msTransformOrigin: any;
}

// Implements the core functionality.
export class Rslidy {
  overview;
  content;
  imageViewer;
  settings;
  printSettings;
  toolbar;

  // Members
  utils: any = new Utils();
  running: boolean = false;
  num_slides: number = 0;
  shift_pressed: boolean = false;
  /*ctrl_pressed: boolean = false;
  alt_pressed: boolean = false;
  meta_pressed: boolean = false;*/

  low_light_mode: boolean = false;
  shortcuts_disabled: boolean = false;
  timer_enabled: boolean = false;
  timer_time: number = 0;
  timer_thread: any = null;

  //Custom settings
  image_viewer: boolean = true;
  // Presentation time in seconds. 0 to disable (hides timer).
  presentation_time: number = 0;
  close_menu_on_selection: boolean = false;
  close_menu_on_blur: boolean = true;
  close_navigation_on_selection: boolean = false;
  show_slide_dividers: boolean = true;
  start_in_low_light_mode: boolean = false;
  start_with_toolbar_minimized: boolean = false;
  block_slide_text_selection: boolean = false;

  // Advanced custom settings
  /* Use of custom aspect ratio for slides. Possible values are e.g. 4/3 or
  16/9. 0 disables it and makes it calculate dynamically. */
  custom_aspect_ratio: number = 4/3;
  // Used when custom_aspect_ratio is set to a value greater than zero.
  custom_width: number = 1000;
  overview_slide_zoom: number = 1.2;
  doubletap_delay: number = 200; // Double tap delay in ms
  min_slide_font: number = 0.1; // in em
  max_slide_font: number = 5.0; // in em
  font_step: number = 0.1; // in em
  swipe_max_duration: number = 400; // maximum duration of swipe in ms
  swipe_threshold: number = 3.75; // swipe distance in rem
  /* how many times the x distance should be greater than the y distance (1.0
  means x has to be > y, 2.0 means x has to be > 2 * y, 0.0 means disabled) */
  swipe_y_limiter: number = 1.0;
  print_frame: string = "0.05rem solid black";
  image_viewer_background: string = "rgba(0, 0, 0, 0.9)";

  // Members storing relevant data for touch gestures
  tap_last: number = 0;
  start_x: number = 0;
  start_y: number = 0;
  delta_x: number = 0;
  delta_y: number = 0;

  // Members storing relevant data for TILT/SHAKE gestures
  // Shake sensitivity, smaller number = more shake required
  shake_sensitivity: number = 0.8;
  shakes: number = 0; // Current number of shakes
  required_shakes: number = 4; // Number of consecutive shakes required
  last_shake: number = 0; // Time of last shake (in ms)
  // Timeframe for reaching required_shakes, resets with each shake
  shake_time_limit: number = 500;
  // Only accept shakes after a certain interval
  // Prevents false positives for devices with high refresh rates
  min_shake_interval: number = 50;

  // An action will be performed after returning to tilt_center from an angle
  // between tilt_lower and tilt_upper
  tilt: number = 0; // Current tilt angle
  tilt_center: number = 10;
  tilt_lower: number = 15; // Range ~ 15-40
  tilt_upper: number = 35;
  tilt_allowed: boolean = false; // If true, perform a tilt action when possible
  tilt_action: ()=>any = null; // Gets set to either navPrevious or navNext

  // Constants
  readonly MENU = 0;
  readonly PRINT_MENU = 1;

  // ---
  // Description: Handles the initialization of rslidy, e.g. setting up the
  // menus.
  // ---
  init(): void {
    // check for section over div slide and add classes for compatibility
    const sections = document.getElementsByTagName("section");
    for (let i = 0; i < sections.length; i++)
      if (sections[i].parentElement.nodeName == "BODY")
        sections[i].classList.add("slide");

    // generate html from slides for overview thumbnails, and add aria tags
    const slides = document.querySelectorAll(".slide");
    this.num_slides = slides.length;
    if (this.num_slides == 0) return;
    const slides_html: string[] = new Array(this.num_slides);
    for (let i = 0; i < this.num_slides; i++) {
      slides_html[i] = slides[i].outerHTML.replace(/id=\"*\"/g, "");
      slides_html[i] = slides_html[i].replace(/href=\"*\"/g, "class=\"rslidy-link\"");
      slides[i].setAttribute("role","region");
      slides[i].setAttribute("aria-label","Slide " + (i+1));
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
    if(window.location.hash.match("#rslidy-help")) {
      this.content.showSlide(0, false);
      this.toolbar.helpToggleClicked();
    }
    // Show first slide with bad or no hash
    else if(!window.location.hash.match(/#[0-9]+/))
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
    }
    // Disable keyboard shortcuts on right click menu open
    window.oncontextmenu = (e) => {
      this.shortcuts_disabled = true;
      setTimeout(()=>this.shortcuts_disabled=false, 3000);
    }
    this.running = true;
  }

  // ---
  // Description: Sets tabindex, aria tags and callbacks for checkboxes
  // ---
  setTabindexAndCallbacks() {
    var labels = document.querySelectorAll(`label[id*="checkbox"]`);

    for(let i = 0; i<labels.length; i++) {
      let l = labels[i];
      l.setAttribute("tabindex","0");
      var input = (<HTMLInputElement>l.querySelector("input"));
      l.setAttribute("role","checkbox");
      l.setAttribute("aria-checked", String(input.checked));
      input.addEventListener("change", function() {
        l.setAttribute("aria-checked", String(this.checked));
      });
      l.addEventListener("keyup", e=>this.checkboxCallback(e,l));
    }
  }

  // ---
  // Description: Handles keyup for checkboxes
  // e: event
  // l: the label of the checkbox
  // ---
  checkboxCallback(e: any, l: Element) {
    if(l != document.activeElement)
      return;
    var key: number = e.keyCode ? e.keyCode : e.which;

    if(key == 13 || key == 32) { //return and space
      var i = (<HTMLInputElement>l.querySelector("input"));
      if(!i.disabled) {
        i.checked = !i.checked;
        l.setAttribute("aria-checked", String(i.checked));
        i.dispatchEvent(new Event("click"));
      }
    }
  }

  // ---
  // Description: Adds event listeners like left/right keys.
  // ---
  addListeners(): void {
    // Key listeners
    window.onkeyup = e => this.keyPressed(e);

    // Window listeners
    window.addEventListener(
      "hashchange",
      function() {
        this.onHashchange();
      }.bind(this)
    );

    // Allow simple touch events on speaker notes overlay (double tap -> hide)
    var speaker_notes_overlay: any = document.getElementById(
      "rslidy-speakernotes-overlay"
    );
    speaker_notes_overlay.addEventListener("touchstart", e =>
      this.content.onTouchstart(e)
    , {passive: true});

    // Window listeners
    window.onresize = function(e) {
      this.overview.adjustOverviewPanel();
    }.bind(this);

    // Device listeners used for TILT and SHAKE
    // add only if possible without permissions
    if (window.DeviceMotionEvent &&
    !(typeof window.DeviceMotionEvent.requestPermission === 'function')) {
      window.addEventListener(
        "devicemotion",
        function(e) {
          this.onDeviceMotion(e);
        }.bind(this)
      );
    }
    if (window.DeviceOrientationEvent&&
    !(typeof window.DeviceOrientationEvent.requestPermission === 'function')) {
      window.addEventListener(
        "deviceorientation",
        function(e) {
          this.onDeviceOrientation(e);
        }.bind(this)
      );
    }
  }

  // ---
  // Description: Initializes the timer.
  // ---
  initTimer(): void {
    // Initialize the timer or hide it if this.presentation_time <= 0
    var timer: any = document.getElementById("rslidy-timer");

    // Hide timer or set time
    if (this.presentation_time <= 0) timer.classList.add("rslidy-hidden");
    else {
      var minutes: number = Math.floor(this.presentation_time / 60);
      var seconds: number = this.presentation_time % 60;
      timer.innerHTML =
        this.utils.toTwoDigits(minutes) + ":" + this.utils.toTwoDigits(seconds);
      this.timer_time = this.presentation_time;
    }
  }

  // ---
  // Description: Toggles the timer. Works only if this.presentation_time > 0.
  // ---
  toggleTimer(): void {
    // Return if this.presentation_time <= 0
    if (this.presentation_time <= 0) return;

    // Reset and return if this.timer_time <= 0
    if (this.timer_time <= 0) {
      this.initTimer();
      return;
    }

    if (this.timer_enabled == false) {
      // Run
      this.timer_thread = setInterval(
        function() {
          // Break out if this.presentation_time is <= 0
          if (this.timer_time <= 0) {
            clearInterval(this.timer_thread);
            this.timer_enabled = false;
            return;
          }
          this.timer_time -= 1;
          var timer: any = document.getElementById("rslidy-timer");
          var minutes: number = Math.floor(this.timer_time / 60);
          var seconds: number = this.timer_time % 60;
          timer.innerHTML =
            this.utils.toTwoDigits(minutes) +
            ":" +
            this.utils.toTwoDigits(seconds);
        }.bind(this),
        1000
      );
      this.timer_enabled = true;
    } else {
      // Stop
      clearInterval(this.timer_thread);
      this.timer_enabled = false;
    }
  }

  // ---
  // Description: Called whenever a key is pressed.
  // e: Event.
  // ---
  keyPressed(e: any): void {
    var key: number = e.keyCode ? e.keyCode : e.which;

    // Check if input or textarea has focus, if so, cancel
    var n = document.activeElement.nodeName;
    if(n === "INPUT" || n === "TEXTAREA")
      return;

    // If flag is set, disable it and ignore current input
    if(this.shortcuts_disabled) {
      this.shortcuts_disabled = false;
      return;
    }

    // Ignore keys when viewing all slides, except toggle back and fonts
    if(this.toolbar.allslides && !(key == 65 || key == 82 || key > 100))
      return;

    // Ignore unused modifiers (to allow ctrl+c etc.)
    if(e.ctrlKey || e.altKey || e.metaKey)
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
        if ((<HTMLInputElement>document.getElementById("rslidy-checkbox-space")).checked)
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
        if(this.imageViewer.active)
          this.imageViewer.zoomIn();
        else if(this.shift_pressed)
          this.settings.changeUIFont(null, 1);
        else
          this.settings.changeSlideFont(null, 1);
        break;
      case 109: //-
      case 173: //-
      case 189: //- (chrome)
        if(this.imageViewer.active)
          this.imageViewer.zoomOut();
        else if(this.shift_pressed)
          this.settings.changeUIFont(null, -1);
        else
          this.settings.changeSlideFont(null, -1);
        break;
      case 82: //R
        if(this.imageViewer.active)
          this.imageViewer.initialZoom();
        else if(this.shift_pressed)
          this.settings.changeUIFont(null, 0);
        else
          this.settings.changeSlideFont(null, 0);
        break;
      case 27: //escape
        this.imageViewer.close();
        this.toolbar.closeMenues();
        break;
      default:
        if(key >= 48 && key <= 57) //48-57 -> 0-9
          this.focusJumpText(key-48);
    }
  }

  // ---
  // Description: Focus the rslidy-slide-input for Jump to Slide
  // n (optional): Adds the number to the input field
  // ---
  focusJumpText(n?: number): void {
    var j = (<HTMLInputElement>document.getElementById("rslidy-slide-input"));
    if(n == undefined)
      j.value = "";
    else
      j.value = ""+n;
    j.focus();
  }

  // ---
  // Description: Called whenever a key in the slide input text box was pressed.
  // e: The event.
  // ---
  slideInputKeyPressed(e: any): void {
    var key: number = e.keyCode ? e.keyCode : e.which;
    var slide_input: any = document.getElementById("rslidy-slide-input");
    var value: any = slide_input.value;
    if (key == 13 /*enter*/) {
      var is_number: boolean = /^[0-9]+$/.test(value);
      if (is_number == true)
        this.content.showSlide(this.utils.toInt(value) - 1, false);
      else slide_input.value = this.content.getCurrentSlideIndex() + 1;
      // Take away focus
      slide_input.blur();
    }
  }

  // ---
  // Description: Called whenever the night mode button is clicked.
  // ---
  toggleLowLightMode(): void {
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
  onHashchange(): void {
    if(window.location.hash.match(/#[0-9]+/))
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
  onDeviceOrientation(e: any): void {
    //chrome fires this event with all values being null on all devices
    if (e.alpha == null && e.beta == null && e.gamma == null) return;
    // Init if event was fired and necessary
    var checkbox_tilt: any = document.getElementById("rslidy-checkbox-tilt");
    if (checkbox_tilt.disabled == true) {
      checkbox_tilt.disabled = false;
      checkbox_tilt.checked = true;
      document
        .getElementById("rslidy-checkbox-tilt-text")
        .setAttribute("aria-disabled","false");
      document
        .getElementById("rslidy-checkbox-tilt-text")
        .setAttribute("aria-checked","true");
      document
        .getElementById("rslidy-checkbox-tilt-text")
        .classList.remove("rslidy-disabled");
    }

    // Return if not activated
    if (checkbox_tilt.checked == false) return;

    // Store values
    var value: number = 0;
    var tilt_multiplier: number = 1;
    var safari = /.*Version.*Safari.*/.test(navigator.userAgent);
    if (window.innerHeight > window.innerWidth) {
      // Portrait mode
      value = Math.round(e.gamma);
      tilt_multiplier = 1.75;
      // safari has -180 and 180, others -90 and 90
      if(safari) {
        value /= 1.5;
        tilt_multiplier = 1;
      }
    } else {
      // Landscape mode
      value = Math.round(e.beta);
      // safari has -90 and 90, others -180 and 180
      if(safari)
        value *= 2;
    }
    // Upside down Portrait/Landscape mode
    if ("orientation" in screen) {
      // @ts-ignore
      var orientation = screen.msOrientation || screen.mozOrientation || (screen.orientation || {}).type;
      if(!(orientation === undefined) && orientation.includes("secondary"))
        value = -value;
    } // safari
    else if (window.orientation < 0 || window.orientation >= 180)
        value = -value;

    this.tilt = value;

    // Only allow tilt gestures after holding the device upright again
    if (value > -this.tilt_center && value < this.tilt_center) {
      if(this.tilt_allowed && this.tilt_action != null) {
        this.shift_pressed = true;
        this.tilt_action();
        this.tilt_action = null;
        this.shift_pressed = false;
      }
      this.tilt_allowed = true;
    }

    if (value >= this.tilt_lower*tilt_multiplier &&
        value <= this.tilt_upper*tilt_multiplier)
          this.tilt_action = ()=>this.content.navNext(true);
    if (value <= -this.tilt_lower*tilt_multiplier &&
        value >= -this.tilt_upper*tilt_multiplier)
          this.tilt_action = ()=>this.content.navPrevious(true);

    if (value >= this.tilt_upper*tilt_multiplier ||
        value <= -this.tilt_upper*tilt_multiplier) {
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
  onDeviceMotion(e: any): void {
    //chrome fires this event with all values being null on all devices
    if (
      e.acceleration.x == null &&
      e.acceleration.y == null &&
      e.acceleration.z == null
    )
      return;
    // Init if event was fired and necessary
    var checkbox_shake: any = document.getElementById("rslidy-checkbox-shake");
    if (checkbox_shake.disabled == true) {
      checkbox_shake.disabled = false;
      checkbox_shake.checked = true;
      document
        .getElementById("rslidy-checkbox-shake-text")
        .setAttribute("aria-disabled","false");
      document
        .getElementById("rslidy-checkbox-shake-text")
        .setAttribute("aria-checked","true");
      document
        .getElementById("rslidy-checkbox-shake-text")
        .classList.remove("rslidy-disabled");
    }

    // Return if not activated
    if (checkbox_shake.checked == false) return;

    var acc_threshold: number = 10.0 / this.shake_sensitivity;
    var now: number = (new Date).getTime();
    var shake_interval: number = Math.abs(now - this.last_shake);

    // Reset shake counter when past the time limit
    if(shake_interval > this.shake_time_limit) {
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
          if(this.shakes >= this.required_shakes)
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
  toggleSpeakerNotes(e: any, always_hide: boolean): number {
    always_hide = always_hide || false;

    // Get current status
    var speaker_notes_overlay: any = document.getElementById(
      "rslidy-speakernotes-overlay"
    );
    var hidden: boolean = speaker_notes_overlay.classList.contains(
      "rslidy-hidden"
    );

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
    var content_section: any = document.getElementById(
      "rslidy-content-section"
    );
    var current_slide: any = content_section.getElementsByClassName("slide")[
      this.content.getCurrentSlideIndex()
    ];
    var speaker_notes: any =
      current_slide.getElementsByClassName("speakernotes").length == 1
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

declare global {
  interface Window {
    rslidy: Rslidy;
    DeviceOrientationEvent: any;
    DeviceMotionEvent: any;
  }
}

function start() {
  var t0 = performance.now();
  //inject loading spinner and hide body overflowing behind the spinner
  document.body.insertAdjacentHTML('afterbegin',spinner_html);
  document.body.style.overflow = 'hidden';
  //timeout allows the browser to repaint and display the spinner
  setTimeout(()=>{
    window.rslidy.init();
    //hide the spinner again after rslidy is done
    document.getElementById('rslidy-spinner').classList.add('rslidy-hidden');
    var t1 = performance.now();
    console.log("Time to first slide: " + (t1 - t0) + " milliseconds.");
  },1);
}
window.rslidy = new Rslidy();
document.addEventListener("DOMContentLoaded", start);
