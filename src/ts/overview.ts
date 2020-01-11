import { thumbnail_html, link_html, preview_html } from "./html-definitions";

export class OverviewComponent {
  private slide_view: HTMLElement;
  private toc_view: HTMLElement;
  private model: string[];
  private preview_width: number = 250;

  constructor(model: string[]) {
    this.model = model;
    this.slide_view = document.querySelector('#rslidy-overview-slides');
    this.toc_view = document.querySelector('#rslidy-overview-toc');
    var nubs = document.querySelector('#rslidy-progress-bar-nubs')

    // Iterate over all slides and set up the overview and toc
    for (var i: number = 0; i < window.rslidy.num_slides; i++) {
      const slideHtml = model[i];
      const title = i + 1 + ". " + this.getSlideHeading(slideHtml);
      const xofy = i + 1 + " / " + window.rslidy.num_slides;

      const thumbnail = window.rslidy.utils.appendHtmlString(
        this.slide_view,
        thumbnail_html(i, xofy, slideHtml, "")
      );
      thumbnail.addEventListener("click", e =>
        this.slideSelected(e)
      );

      var pv = window.rslidy.utils.appendHtmlString(
        nubs, preview_html(i)
      );
      pv.style.width = "calc(100%/" + window.rslidy.num_slides + ")";
      pv.style.left  = "calc((100%/"+ window.rslidy.num_slides + ")*"+i+")"
      if(!window.rslidy.show_slide_dividers)
        pv.classList.add("rslidy-nonubs")
      pv.addEventListener("click", e =>
        window.rslidy.content.showSlide(Number(e.target.dataset.slideindex), false)
      );
      pv.addEventListener("mouseover", e =>
        this.showPreview(e.target)
      );
      pv.addEventListener("mouseout", e =>
        this.removePreview(e.target)
      );

      const link = window.rslidy.utils.appendHtmlString(
        this.toc_view,
        link_html(i, title)
      );
      link.addEventListener("click", e =>
        this.slideSelected(e)
      );
    }
    this.slide_view.classList.add("rslidy-overview");
    this.toc_view.classList.add("rslidy-overview");
    this.adjustOverviewPanel();
    window.rslidy.utils.switchElementsClass(
      [this.toc_view],
      "rslidy-invisible"
    );
    window.rslidy.utils.switchElementsClass(
      [this.slide_view],
      "rslidy-invisible"
    );
  }

  // ---
  // Description: Adjust the overview panel
  // ---
  public adjustOverviewPanel(): void {
    this.adjustPanel("");
  }

  // ---
  // Description: Adjust the progressbar preview panels
  // ---
  public adjustPreviewPanel(): void {
    this.adjustPanel("-pv");
  }

  // ---
  // Description: Adjusts the aspect ratio and display sizes of the thumbnail
  // images in the overview menu.
  // suffix: used by the wrapper functions above
  // ---
  public adjustPanel(suffix: string): void {
    // Get items
    var thumbnail_wrappers: any = document.getElementsByClassName(
      "rslidy-slide-thumbnail" + suffix
    );
    var overview_items: any = document.getElementsByClassName(
      "rslidy-overview-item" + suffix
    );

    // Get the percentage of width pixels of the overview section with respect
    // to window.outerWidth
    var aspect_ratio: number =
      window.rslidy.custom_aspect_ratio != 0
        ? window.rslidy.custom_aspect_ratio
        : window.rslidy.utils.getCurrentAspectRatio();
    var overview_slide_zoom: number = window.rslidy.overview_slide_zoom;
    var custom_width: number = window.rslidy.custom_width;
    var final_width: number = custom_width / overview_slide_zoom;
    var overview_width = this.slide_view.clientWidth;
    if(suffix == "-pv")
      overview_width = this.preview_width;

    var relative_width: number = window.rslidy.utils.getRelativeWidth(
      overview_width,
      aspect_ratio,
      final_width
    );

    for (var i: number = 0; i < overview_items.length; i++) {
      // 1. Set width and height of the overview element to outerWidth and
      // outerHeight, respectively
      overview_items[i].style.width =
        window.rslidy.utils.getSlideWidth(aspect_ratio, final_width) + "px";
      overview_items[i].style.height =
        window.rslidy.utils.getSlideHeight(aspect_ratio, final_width) + "px";

      // 2. Do the transformation of the overview element now with
      // relative_width (browser compatibility)
      var scale_value: string = "scale3d(" +
        relative_width + ", " + relative_width + ", " + relative_width + ")";
      var origin_value: string = "0 0 0";
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
      const h =
        w /
        (window.rslidy.utils.getSlideWidth(aspect_ratio, final_width) /
          window.rslidy.utils.getSlideHeight(aspect_ratio, final_width));

      if(suffix == "-pv")
        thumbnail_wrappers[i].style.width = (w - 20) + "px";
      thumbnail_wrappers[i].style.height = (h - 20) + "px";
    }
  }

  // ---
  // Description: Returns the heading of a slide if available (or "slide" if
  // not found).
  // slide_element: The slide element to get the heading from.
  // ---
  private getSlideHeading(slide_element: string): string {
    if (slide_element.indexOf("<h1>") !== -1)
      return slide_element.substring(
        slide_element.indexOf("<h1>") + 4,
        slide_element.indexOf("</h1>")
      );
    else if (slide_element.indexOf("<h2>") !== -1)
      return slide_element.substring(
        slide_element.indexOf("<h2>") + 4,
        slide_element.indexOf("</h2>")
      );
    else if (slide_element.indexOf("<h3>") !== -1)
      return slide_element.substring(
        slide_element.indexOf("<h3>") + 4,
        slide_element.indexOf("</h3>")
      );
    else return "slide";
  }

  // ---
  // Description: Show a slide preview on the progressbar
  // e: the mouseover event
  // ---
  private showPreview(e: any): void {
    const i = Number(e.dataset.slideindex);
    const slideHtml = this.model[i];
    const xofy = i + 1 + " / " + window.rslidy.num_slides;
    const child = e.children[0];

    const thumbnail = window.rslidy.utils.appendHtmlString(
      child, thumbnail_html(i, xofy, slideHtml, "-pv")
    );
    thumbnail.addEventListener("touchstart", e2 => {
      this.slideSelected(e2);
      this.removePreview(e);
    });
    if(window.rslidy.low_light_mode) {
      let elements = child.getElementsByTagName("img");
      window.rslidy.utils.switchElementsClass(elements, "rslidy-color-invert");
    }
    var y = window.innerHeight - e.getBoundingClientRect().bottom + 20;
    var x = e.offsetLeft + e.offsetWidth / 2;
    x -= this.preview_width/2;
    if (x < 0)
      x = 0;
    if (x > window.innerWidth-this.preview_width+12)
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
  private removePreview(e: any): void {
    e.children[0].innerHTML = '';
  }

  // ---
  // Description: Called whenever a slide thumbnail in the overview gets
  // clicked.
  // e: Event.
  // ---
  private slideSelected(e: any): void {
    // Get the click target
    var target: any = e.target;

    // Fix for z-index bug on iOS
    while (
      target.className != "rslidy-slide-clickelement" &&
      target.className != "rslidy-slide-link"
    )
      target = target.parentElement;

    // Get the index of the slide
    var slide_index: number = Number(target.dataset.slideindex);

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
