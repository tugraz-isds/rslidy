export class SlideTransition {
  private readonly animationTypeFade: string = "fade";
  private readonly animationTypeSlideIn: string = "slidein";
  private readonly animationTypeZoom: string = "zoom";

  private isSlidein: boolean = false;

  private contentSection: HTMLElement;
  public slides: HTMLCollectionOf<Element>;
  private slideThumbnails: HTMLCollectionOf<Element>;
  private hideTimeout: number = 500;
  private slideTimeouts: number[];

  constructor() {
    this.contentSection = document.getElementById("rslidy-content-section");
    this.slides = this.contentSection.getElementsByClassName("slide");
    this.slideThumbnails = document.getElementsByClassName(
      "rslidy-slide-thumbnail"
    );

    let bodyClasses: DOMTokenList = document.getElementsByTagName("body")[0]
      .classList;
    if (!bodyClasses.contains("unanimated")) {
      if (bodyClasses.contains(this.animationTypeFade)) {
        this.setSlideTransitionClass(this.animationTypeFade);
      } else if (bodyClasses.contains(this.animationTypeZoom)) {
        this.setSlideTransitionClass(this.animationTypeZoom);
      } else {
        document
          .getElementsByTagName("body")[0]
          .classList.add(this.animationTypeSlideIn);
        this.setSlideTransitionClass(this.animationTypeSlideIn);
        this.isSlidein = true;
      }
    } else this.hideTimeout = 0;

    this.slideTimeouts = new Array(this.slides.length);

    // Hide all slides and remove selected effect
    for (let i: number = 0; i < this.slides.length; i++) {
      this.slides[i].classList.add("rslidy-hidden");
      this.slideThumbnails[i].classList.remove("rslidy-slide-selected");
    }
  }

  // ---
  // Description: Adds classes to the slides for proper slide transitions.
  // ---
  setSlideTransitionClass(transitionClass: string) {
    for (let i: number = 0; i < this.slides.length; i++) {
      this.slides[i].classList.add(transitionClass);
    }
  }

  // ---
  // Description: Handles a slide transition
  // currentSlideIndex: The current slide
  // targetSlideIndex: The target slide
  // animate: boolean to enable/disable animation
  // ---
  doSlideTransition(currentSlideIndex: number, targetSlideIndex: number,
    animate: boolean) {
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
      } else {
        target_slide_classes.add("animated");
        setTimeout(() => {
          // restarts the animation
          current_slide_classes.add("animated");
        }, 10);

        this.slideTimeouts[currentSlideIndex] = setTimeout(() => {
          current_slide_classes.add("rslidy-hidden");
        }, this.hideTimeout);
      }
      this.slideThumbnails[currentSlideIndex].classList.remove(
        "rslidy-slide-selected"
      );
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
    this.slideThumbnails[targetSlideIndex].classList.add(
      "rslidy-slide-selected"
    );

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
