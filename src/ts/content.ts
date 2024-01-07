import { SlideTransition } from "./slide-transition";

export class ContentComponent {
  private view: HTMLElement;
  private progress_bar: HTMLElement;
  private slide_caption: HTMLElement;
  private slide_input: HTMLElement;
  public slideTransition: SlideTransition;
  private currentSlideIndex: number = -1;
  private marginTapLeftDown: boolean = false;
  private marginTapRightDown: boolean = false;

  constructor(view) {
    this.view = view;
    this.slideTransition = new SlideTransition();
    this.progress_bar = document.getElementById("rslidy-progress-bar");
    this.slide_caption = document.getElementById("rslidy-slide-caption");
    this.slide_input = document.getElementById("rslidy-slide-input");

    this.view.addEventListener("mousedown", e => {
      window.rslidy.start_x = e.clientX;
      window.rslidy.start_y = e.clientY;
    });

    this.view.addEventListener("mousemove", (e) => {
        this.marginTap(e,
            () => {
                if (this.currentSlideIndex > 0)
                    this.view.style.cursor = "url(https://upload.wikimedia.org/wikipedia/commons/c/c5/U%2B2190.svg), w-resize"
                else 
                    this.view.style.cursor = "auto"},
            () => {
                if (this.currentSlideIndex < window.rslidy.num_slides - 1)
                    this.view.style.cursor = "url(https://upload.wikimedia.org/wikipedia/commons/8/8d/U%2B2192.svg), e-resize"
                else
                    this.view.style.cursor = "auto"
            },
            () => { this.view.style.cursor = "auto"}
        );
    });

    this.view.addEventListener("mousedown", (e) => {
      //prevent double click selection
      this.marginTapBoth(e,
        () => {if(e.detail > 1) e.preventDefault()},
        () => {}
      );
      //set booleans for mouseup
      this.marginTap(e,
        () => {this.marginTapLeftDown = true},
        () => {this.marginTapRightDown = true},
        () => {
          this.marginTapLeftDown = false;
          this.marginTapRightDown = false;
        }
      );
    });

    this.view.addEventListener("mouseup", (e) => {
      this.marginTap(e,
        () => {
          if(this.marginTapLeftDown) this.navPrevious(true);
          this.marginTapLeftDown = false;
        },
        () => {
          if(this.marginTapRightDown) this.navNext(true);
          this.marginTapRightDown = false;
        },
        () => {}
      );
      window.rslidy.toolbar.closeMenuOnBlur();
    });

    this.view.addEventListener("touchstart", e => this.onTouchstart(e),
      {passive: true});
    this.view.addEventListener("touchmove", e => this.onTouchmove(e),
      {passive: true});
    this.view.addEventListener("touchend", e => this.onTouchend(e));

    this.view.querySelector("#rslidy-button-current").addEventListener(
      "click", () => window.rslidy.toolbar.displayToggleClicked()
    );
  }

  // ---
  // Description: calculation logic for margin tap
  // e: Event.
  // left, right, center: function callbacks for the left and right
  // click areas as well as center (& disabled).
  // Use the both function wrapper to set left = right
  // ---
  marginTap(e: any, left: any, right: any, center: any): void {
    if ((<HTMLInputElement>document.getElementById("rslidy-checkbox-margintap")).checked) {
      var l = e.pageX - this.view.getBoundingClientRect().left;
      var r = -(e.pageX - this.view.getBoundingClientRect().right);
      var scrollBarWidth = this.view.offsetWidth - this.view.clientWidth;
      if(l<60)
        left();
      else if(r<60+scrollBarWidth && r>scrollBarWidth)
        right();
      else
        center();
    }
    else center();
  }

  marginTapBoth(e: any, both: any, center: any): void {
    this.marginTap(e, both, both, center);
  }

  // ---
  // Description: Called whenever the user begins to touch the body area.
  // e: Event.
  // ---
  onTouchstart(e: any): void {
    // Register last tap
    var tap_previous: number = window.rslidy.tap_last;
    window.rslidy.tap_last = new Date().getTime();

    var tap_delay: number = window.rslidy.tap_last - tap_previous;

    // Toggle speaker notes on double tap
    if (tap_delay <= window.rslidy.doubletap_delay) {
      window.rslidy.toggleSpeakerNotes(e, false);
    }

    // Register touch event
    var touch: any = e.touches[0];

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
  onTouchmove(e: any): void {
    // Update values
    var touch: any = e.touches[0];
    var delta_x_old: number = window.rslidy.delta_x;

    window.rslidy.delta_x = touch.pageX - window.rslidy.start_x;
    window.rslidy.delta_y = touch.pageY - window.rslidy.start_y;

    // If the delta_x position has changed a lot, the user is swiping and the
    // content does not need to be scrolled!
    if (Math.abs(window.rslidy.delta_x - delta_x_old) > 10) e.preventDefault();
  }

  // ---
  // Description: Called whenever the stops touching the body area.
  // e: Event.
  // ---
  onTouchend(e: any): void {
    // Register old values and calculate absolutes
    var touch_duration: number = new Date().getTime() - window.rslidy.tap_last;
    var delta_x: number = window.rslidy.delta_x;
    var delta_y: number = window.rslidy.delta_y;
    var delta_x_abs: number = Math.abs(delta_x);
    var delta_y_abs: number = Math.abs(delta_y);

    var swipe_threshold: number = window.rslidy.utils.remToPixel(
      window.rslidy.swipe_threshold
    );

    /* Handle the swipe event if the touch duration was shorter than a
    specified threshold. Also, the movement should be mainly on the x axis
    (x_movement > window.rslidy.swipe_y_limiter * y_movement) */
    if (
      touch_duration < window.rslidy.swipe_max_duration &&
      (delta_x_abs > swipe_threshold || delta_y_abs > swipe_threshold)
    ) {
      if (delta_x_abs > window.rslidy.swipe_y_limiter * delta_y_abs) {
        window.rslidy.shift_pressed = true;
        if (delta_x < 0) this.navNext(true);
        else this.navPrevious(true);
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
  getNumIncrItems(slide_index: number, only_visible: boolean): number {
    only_visible = only_visible || false;
    // Out of bounds check
    if (slide_index < 0 || slide_index >= window.rslidy.num_slides) return -1;

    var content_section: any = document.getElementById(
      "rslidy-content-section"
    );
    var slide: any = content_section.getElementsByClassName("slide")[
      slide_index
    ];
    var incremental_items: any = (<HTMLElement>slide).querySelectorAll(
      "ul.incremental li"
    );
    if (only_visible == false) return incremental_items.length;
    else {
      var counter: number = 0;
      for (var i: number = 0; i < incremental_items.length; i++) {
        if (
          incremental_items[i].classList.contains("rslidy-invisible") == false
        )
          counter++;
      }
      return counter;
    }
  }

  // ---
  // Description: Jumps to the next slide (or next bullet point).
  // animate: boolean to enable/disable animation
  // ---
  navNext(animate: boolean): void {
    if(window.rslidy.toolbar.allslides) return;
    var current_index: number = this.currentSlideIndex;
    window.rslidy.imageViewer.close();
    // Check for incremental items on current slide
    if (this.getNumIncrItems(current_index, false) > 0) {
      var num_incr_items: number = this.getNumIncrItems(current_index, false);
      var num_incr_items_shown: number = this.getNumIncrItems(
        current_index,
        true
      );
      if (num_incr_items > num_incr_items_shown) {
        if (window.rslidy.shift_pressed == false)
          this.showItemsUpToN(num_incr_items_shown + 1);
        else this.showItemsUpToN(num_incr_items);
        return;
      }
    }

    // Change slide
    var new_index: number = current_index + 1;
    this.showSlide(new_index, animate);

    // Check for incremental items on next slide
    if (this.getNumIncrItems(new_index, false) > 0) {
      var num_incr_items: number = this.getNumIncrItems(new_index, false);
      if (window.rslidy.shift_pressed == false) this.showItemsUpToN(1);
      else this.showItemsUpToN(num_incr_items);
    }
  }

  // ---
  // Description: Jumps to the last slide.
  // ---
  navLast(): void {
    // Change slide
    var new_index: number = window.rslidy.num_slides - 1;
    this.showSlide(new_index, false);

    // Check for incremental items on next slide
    if (this.getNumIncrItems(new_index, false) > 0) {
      var num_incr_items: number = this.getNumIncrItems(new_index, false);
      if (window.rslidy.shift_pressed == false) this.showItemsUpToN(1);
      else this.showItemsUpToN(num_incr_items);
    }
  }

  // ---
  // Description: Jumps to the previous slide (or previous bullet point).
  // animate: boolean to enable/disable animation
  // ---
  navPrevious(animate: boolean): void {
    if(window.rslidy.toolbar.allslides) return;
    var current_index: number = this.currentSlideIndex;
    // Check for incremental items on current slide
    var num_incr_items_shown: number = this.getNumIncrItems(
      current_index,
      true
    );
    if (
      this.getNumIncrItems(current_index, false) > 0 &&
      num_incr_items_shown > 1
    ) {
      if (window.rslidy.shift_pressed == false) {
        this.showItemsUpToN(num_incr_items_shown - 1);
        return;
      }
    }

    // Change slide
    var new_index: number = current_index - 1;
    this.showSlide(new_index, animate);

    // Check for incremental items on previous slide
    if (this.getNumIncrItems(new_index, false) > 0) {
      var num_incr_items: number = this.getNumIncrItems(new_index, false);
      this.showItemsUpToN(num_incr_items);
    }
  }

  // ---
  // Description: Jumps to the first slide.
  // ---
  navFirst(): void {
    var new_index: number = 0;
    this.showSlide(new_index, false);

    // Check for incremental items on previous slide
    if (this.getNumIncrItems(new_index, false) > 0) {
      var num_incr_items: number = this.getNumIncrItems(new_index, false);
      this.showItemsUpToN(num_incr_items);
    }
  }

  // ---
  // Description: Shows the first n bullet points and hides the rest.
  // n: Specifies the last incremental item to show.
  // ---
  showItemsUpToN(n: number): void {
    var content_section: any = document.getElementById(
      "rslidy-content-section"
    );
    var current_slide: any = content_section.getElementsByClassName("slide")[
      this.currentSlideIndex
    ];
    var incr_items: any = (<HTMLElement>current_slide).querySelectorAll(
      "ul.incremental li"
    );

    // Show items with index < n, hide items with index >= n
    var counter: number = 0;
    for (var i: number = 0; i < incr_items.length; i++) {
      if (counter < n) incr_items[i].classList.remove("rslidy-invisible");
      else incr_items[i].classList.add("rslidy-invisible");
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
  showSlide(targetSlideIndex: number, animate: boolean): void {
    window.rslidy.imageViewer.close();
    window.rslidy.toolbar.closeMenuOnSelection();

    if (targetSlideIndex < 0 && this.currentSlideIndex < 0)
      targetSlideIndex = 0;

    if (targetSlideIndex >= window.rslidy.num_slides)
      targetSlideIndex = window.rslidy.num_slides-1;

    if (
      targetSlideIndex < 0 ||
      targetSlideIndex >= window.rslidy.num_slides ||
      this.currentSlideIndex == targetSlideIndex
    ) {
      var j = (<HTMLInputElement>document.getElementById("rslidy-slide-input"));
      j.value = "" + (this.currentSlideIndex+1);
      return;
    }

    this.slideTransition.doSlideTransition(
      this.currentSlideIndex,
      targetSlideIndex,
      animate
    );

    this.progress_bar.style.width =
      "calc(100%*" + (targetSlideIndex + 1) / window.rslidy.num_slides + ")";

    var pvs = document.getElementById("rslidy-progress-bar-nubs").children;
    for (var i = 0; i < pvs.length; i++) {
      if(i < targetSlideIndex)
        pvs[i].classList.add("rslidy-preview-reached");
      else
        pvs[i].classList.remove("rslidy-preview-reached");
    }

    // Hide speaker nodes
    window.rslidy.toggleSpeakerNotes(null, true);

    // Set 1-indexed value and new url
    if(window.rslidy.running)
        if(targetSlideIndex == 0) 
            window.location.hash = "";
        else
            window.location.hash = "#" + (targetSlideIndex + 1);
    else
      history.replaceState({}, null, "#" + (targetSlideIndex + 1));

    // Update slide caption
    this.slide_caption.innerHTML = " /" + window.rslidy.num_slides;
    (<HTMLInputElement>this.slide_input).value = "" + (targetSlideIndex + 1);

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

  public disableFirstButtons(): void {
    document.getElementById("rslidy-button-first").setAttribute("hidden", "true");
    document.getElementById("rslidy-button-previous").setAttribute("hidden", "true");
  }

  public enableFirstButtons(): void {
    document.getElementById("rslidy-button-first").removeAttribute("hidden");
    document.getElementById("rslidy-button-previous").removeAttribute("hidden");
  }

  public disableLastButtons(): void {
    document.getElementById("rslidy-button-last").setAttribute("hidden", "true");
    document.getElementById("rslidy-button-next").setAttribute("hidden", "true");
  }

  public enableLastButtons(): void {
    document.getElementById("rslidy-button-last").removeAttribute("hidden");
    document.getElementById("rslidy-button-next").removeAttribute("hidden");
  }



  // ---
  // Description: Returns the currently displayed slide index (0-indexed).
  // ---
  getCurrentSlideIndex(): number {
    var url_parts = window.location.href.split("#");
    if (url_parts.length > 1) {
      var hash = parseInt(url_parts[1]);
      if(hash > 0)
      return hash - 1;
    }
    return 0;
  }
}
