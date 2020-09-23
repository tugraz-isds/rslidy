import { toolbar_html } from "./html-definitions";

export class ToolbarComponent {
  private view: HTMLElement;
  public allslides: HTMLStyleElement;
  private printstyle: HTMLStyleElement;
  private enableiv: boolean = false;

  constructor() {
    this.view =
      window.rslidy.utils.appendHtmlString(document.querySelector('#rslidy-column-flex'), toolbar_html);

    this.view
      .querySelector("#rslidy-button-overview")
      .addEventListener("click", () => this.closeMenuOnBlur(
        () => this.overviewToggleClicked()
      ));

    this.view
      .querySelector("#rslidy-button-toc")
      .addEventListener("click", () => this.closeMenuOnBlur(
        () => this.tocToggleClicked()
      ));

    this.view
      .querySelector("#rslidy-button-help")
      .addEventListener("click", () => this.closeMenuOnBlur(
        () => this.helpToggleClicked()
      ));

    this.view
      .querySelector("#rslidy-button-first")
      .addEventListener("click", () => this.closeMenuOnBlur(
        () => window.rslidy.content.navFirst()
      ));

    this.view
      .querySelector("#rslidy-button-previous")
      .addEventListener("click", () => this.closeMenuOnBlur(
        () => window.rslidy.content.navPrevious(true)
      ));

    this.view
      .querySelector("#rslidy-button-next")
      .addEventListener("click", () => this.closeMenuOnBlur(
        () => window.rslidy.content.navNext(true)
      ));

    this.view
      .querySelector("#rslidy-button-last")
      .addEventListener("click", () => this.closeMenuOnBlur(
        () => window.rslidy.content.navLast()
      ));

    this.view
      .querySelector("#rslidy-button-hide")
      .addEventListener("click", () => this.closeMenuOnBlur(
        () => this.showHideToggleClicked()
      ));

    this.view
      .querySelector("#rslidy-button-show")
      .addEventListener("click", () => this.showHideToggleClicked());

    this.view
      .querySelector("#rslidy-button-all")
      .addEventListener("click", () => this.displayToggleClicked());

    this.view
      .querySelector("#rslidy-timer")
      .addEventListener("click", () => this.closeMenuOnBlur(
        () => window.rslidy.toggleTimer()
      ));

    this.view
      .querySelector("#rslidy-slide-caption")
      .addEventListener("click", () => this.closeMenuOnBlur(
        () => this.tocToggleClicked()
      ));

    this.view
      .querySelector("#rslidy-button-menu")
      .addEventListener("click", () => this.menuToggleClicked(window.rslidy.MENU));

    this.view
      .querySelector("#rslidy-button-print")
      .addEventListener("click", () => this.menuToggleClicked(window.rslidy.PRINT_MENU));

    this.view
      .querySelector("#rslidy-slide-input")
      .addEventListener("keyup", e => this.closeMenuOnBlur(
        () => window.rslidy.slideInputKeyPressed(e)
      ));

    // Only allow numbers for slide input
    window.rslidy.utils.setInputFilter(
      document.getElementById("rslidy-slide-input"),
      function(value) {return /^\d*$/.test(value);}
    );

    document.getElementById("rslidy-help")
      .addEventListener("mouseup", e => this.closeHelpOnBlur(e));

    if(window.rslidy.start_with_toolbar_minimized)
      this.showHideToggleClicked();
  }

  // ---
  // Description: Called whenever the overview button is clicked.
  // ---
  public overviewToggleClicked(): void {
    window.rslidy.utils.switchElementsClass(
      [document.getElementById("rslidy-overview-slides")],
      "rslidy-overview-visible"
    );
    window.rslidy.utils.switchElementsClass(
      [document.getElementById("rslidy-overview-slides")],
      "rslidy-invisible"
    );
    window.rslidy.overview.adjustOverviewPanel();
    let visible = document.getElementById("rslidy-overview-slides").classList.contains("rslidy-overview-visible");
    document.getElementById("rslidy-button-overview").setAttribute("aria-expanded", String(visible));
    setTimeout(()=>document.getElementById("rslidy-overview-slides").focus(),100);
  }

  // ---
  // Description: Called whenever the help button is clicked.
  // ---
  public helpToggleClicked(): void {
    if(window.location.hash.match("#rslidy-help"))
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
  public closeHelpOnBlur(e): void {
    if(e.target.id == "rslidy-help")
      window.location.hash = "#";
  }

  // ---
  // Description: Called whenever the toc button is clicked.
  // ---
  public tocToggleClicked(): void {
    window.rslidy.utils.switchElementsClass(
      [document.getElementById("rslidy-overview-toc")],
      "rslidy-overview-visible"
    );
    window.rslidy.utils.switchElementsClass(
      [document.getElementById("rslidy-overview-toc")],
      "rslidy-invisible"
    );
    let visible = document.getElementById("rslidy-overview-toc").classList.contains("rslidy-overview-visible");
    document.getElementById("rslidy-button-toc").setAttribute("aria-expanded", String(visible));
    setTimeout(()=>document.getElementById("rslidy-overview-toc").focus(),100);
  }

  // ---
  // Description: Called whenever the all slides button is clicked.
  // ---
  public displayToggleClicked(): void {
    if (this.allslides) {

      //find first visible slide
      var num = window.rslidy.content.currentSlideIndex;
      for (let i: number = 0; i < window.rslidy.num_slides; i++) {
        var slide = window.rslidy.utils.getSlide(i);

        if(window.rslidy.utils.checkVisible(slide)) {
          num = i;
          break;
        }
      }

      document.getElementsByTagName('head')[0].removeChild(this.allslides);
      this.allslides = null;
      if(this.enableiv)
        window.rslidy.image_viewer = true;
      if(this.printstyle)
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
        border: `+window.rslidy.print_frame+`;
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
      if(window.rslidy.image_viewer) {
        this.enableiv = true;
        window.rslidy.image_viewer = false;
      }
      if(window.rslidy.printSettings.style) {
        this.printstyle = window.rslidy.printSettings.style;
        document.getElementsByTagName('head')[0].removeChild(this.printstyle);
      }
      //scroll to current slide
      var slide = window.rslidy.utils.getSlide(window.rslidy.content.currentSlideIndex);
      slide.scrollIntoView();
    }
  }

  // ---
  // Description: Wrapper for the custom settings close_menu_on_blur and
  // close_menu_on_selection
  // fun: An optional function to execute before closing menues
  // condition: The condition for closing the menues
  // ---
  closeMenuWrapper(fun: () => void = null, condition: boolean) {
    if (fun) fun();
    if (condition) this.closeMenues();
  }

  // ---
  // Description: Close open menues on blur
  // ---
  public closeMenuOnBlur(fun: () => void = null) {
    this.closeMenuWrapper(fun, window.rslidy.close_menu_on_blur);
  }

  // ---
  // Description: Close open menues on selection
  // ---
  public closeMenuOnSelection(fun: () => void = null) {
    this.closeMenuWrapper(fun, window.rslidy.close_menu_on_selection);
  }

  // ---
  // Description: Closes all menues
  // ---
  public closeMenues(): void {
    document.getElementById("rslidy-menu").classList.add("rslidy-hidden");
    document.getElementById("rslidy-print-menu").classList.add("rslidy-hidden");
    document.getElementById("rslidy-button-menu").setAttribute("aria-expanded","false");
    document.getElementById("rslidy-button-print").setAttribute("aria-expanded","false");
  }

  // ---
  // Description: Called whenever a menu button is clicked.
  // index: The index of the menu (See constants in rslidy.ts)
  // ---
  public menuToggleClicked(index: number): void {
    const menues = ["rslidy-menu", "rslidy-print-menu"];
    const buttons = ["rslidy-button-menu", "rslidy-button-print"];

    // Close other menu if open
    var close = document.getElementById(menues[(index+1)%2]);
    var closebtn = document.getElementById(buttons[(index+1)%2]);
    close.classList.add("rslidy-hidden");
    closebtn.setAttribute("aria-expanded","false");

    // Toggle menu show status
    var menu = document.getElementById(menues[index]);
    var button = document.getElementById(buttons[index]);
    if (menu.classList.contains("rslidy-hidden")) {
      menu.classList.remove("rslidy-hidden");
      button.setAttribute("aria-expanded","true");
    }
    else {
      menu.classList.add("rslidy-hidden");
      button.setAttribute("aria-expanded","false");
    }
    menu.focus();

    // iOS13 requires permissions for both event handlers (workaround)
    // needs to come from a user fired event (e.g click)
    // the page needs to be https
    if(index == window.rslidy.MENU) {
      if (typeof window.DeviceMotionEvent.requestPermission === 'function') {
        window.DeviceMotionEvent.requestPermission()
          .then(permissionState => {
            if (permissionState === 'granted') {
              window.addEventListener(
                "devicemotion",
                function(e) {
                  window.rslidy.onDeviceMotion(e);
                }.bind(window.rslidy)
              );
            }
          })
          .catch(console.error);
      }

      if (typeof window.DeviceOrientationEvent.requestPermission === 'function') {
        window.DeviceOrientationEvent.requestPermission()
          .then(permissionState => {
            if (permissionState === 'granted') {
              window.addEventListener(
                "deviceorientation",
                function(e) {
                  window.rslidy.onDeviceOrientation(e);
                }.bind(window.rslidy)
              );
            }
          })
          .catch(console.error);
      }
    }
  }

  // ---
  // Description: Called whenever the show/hide toolbar button is clicked.
  // ---
  private showHideToggleClicked(): void {
    window.rslidy.utils.switchElementsClass(
      [document.getElementById("rslidy-tb-show-trapezoid")],
      "rslidy-hidden"
    );
    window.rslidy.utils.switchElementsClass(
      [document.getElementById("rslidy-toolbar-area")],
      "rslidy-bar-hidden"
    );
  }
}
