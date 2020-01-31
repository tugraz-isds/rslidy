import { image_viewer } from "./html-definitions";

export class ImageViewerComponent {
  private zoomFactor: number = 1.0;
  private initialZoomFactor: number;

  private imageWidth: number;
  private imageHeight: number;

  private containerWidth: number;
  private containerHeight: number;

  private mouseDragStartX: number = 0;
  private mouseDragStartY: number = 0;
  private imageOffsetX: number = 0;
  private imageOffsetY: number = 0;

  private isInsideContainer: boolean;
  private touch: boolean;
  public active: boolean = false;

  private view: HTMLElement;
  private images: HTMLCollection;
  private modalImg: HTMLImageElement;
  private container: Element;

  constructor() {
    this.setImageViewerClasses();

    this.view =
      window.rslidy.utils.prependHtmlString(document.body, image_viewer);
    this.images = document.getElementsByClassName("rslidy-slide-image");
    this.container = this.view.getElementsByClassName(
      "rslidy-image-viewer-container"
    )[0];
    this.modalImg = <HTMLImageElement>this.view.getElementsByClassName(
      "rslidy-image-viewer-content"
    )[0];

    this.addImageOnClickHandlers();
    this.addButtonHandlers();
    this.addMouseEventListeners();

    this.view.style.backgroundColor = window.rslidy.image_viewer_background;
  }

  // ---
  // Description: Closes the image viewer and resets values
  // ---
  public close() {
    this.modalImg.classList.add("rslidy-transition-enabled");
    this.modalImg.style.width = "";
    this.modalImg.style.height = "";
    this.modalImg.style.top = "";
    this.modalImg.style.left = "";
    this.view.style.display = "none";
    this.zoomFactor = 1.0;
    if(this.active) {
      history.replaceState({}, null, "#" + (window.rslidy.content.currentSlideIndex + 1));
      this.active = false;
    }
  }

  // ---
  // Description: Iterate over all slide images and set image viewer classes
  // ---
  setImageViewerClasses(): void {
    var slides: any = document.getElementsByClassName("slide");
    let imgs: Element[] = new Array();
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
      let image: HTMLImageElement = <HTMLImageElement>this.images.item(i);
      image.ontouchend = () => {
        this.touch = true;
      };
      image.onclick = () => {
        if (!window.rslidy.image_viewer) return;
        if (this.touch) {
          this.touch = false;
          return;
        }
        //setup browser back button to close image viewer
        history.pushState(null, null,
          window.location.href.replace(window.location.hash,"#"));

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
      if(image.parentNode.nodeName.toLowerCase() === 'a') {
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
    var spanClose = this.view.getElementsByClassName(
      "rslidy-iv-close"
    )[0];
    spanClose.addEventListener("click", () => {
      this.close();
    });

    var spanZoomIn = this.view.getElementsByClassName(
      "rslidy-iv-zoom-in"
    )[0];
    spanZoomIn.addEventListener("click", () => {
      this.zoomIn();
    });

    var spanZoomOut = this.view.getElementsByClassName(
      "rslidy-iv-zoom-out"
    )[0];
    spanZoomOut.addEventListener("click", () => {
      this.zoomOut();
    });

    var spanZoomReset = document.getElementsByClassName(
      "rslidy-iv-zoom-reset"
    )[0];
    spanZoomReset.addEventListener("click", () => {
      this.initialZoom();
    });
  }

  // ---
  // Description: Adds support for mouse events
  // ---
  addMouseEventListeners() {
    var mouseDown = false;

    this.container.addEventListener(
      "mouseenter",
      (mouseDownEvent: MouseEvent) => {
        this.isInsideContainer = true;
      }
    );
    this.container.addEventListener(
      "mouseleave",
      (mouseDownEvent: MouseEvent) => {
        this.isInsideContainer = false;
      }
    );
    window.addEventListener(
      "resize",
      () => {
        if(this.active) {
          this.containerWidth = this.container.clientWidth;
          this.containerHeight = this.container.clientHeight;
          this.applyOffset(true);
        }
      }
    );

    this.view.addEventListener("wheel", (mouseWheelEvent: WheelEvent) => {
      mouseWheelEvent.preventDefault();
      var delta = Math.max(
        -1,
        Math.min(1, mouseWheelEvent.wheelDelta || -mouseWheelEvent.deltaY)
      );
      if (delta > 0) {
        this.zoomIn();
        var factor = 1 - this.zoomFactor * 1.2 / this.zoomFactor;
        this.imageOffsetX +=
          (mouseWheelEvent.clientX - window.innerWidth / 2) * factor;
        this.imageOffsetY +=
          (mouseWheelEvent.clientY - window.innerHeight / 2) * factor;
        this.applyOffset(false);
      } else if (delta != 0) {
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
    }, {passive: true});

    this.view.addEventListener("mousedown", (mouseDownEvent: MouseEvent) => {
      mouseDownEvent.preventDefault();
      if (!this.isInsideContainer) {
        return;
      }
      this.mouseDragStartX = mouseDownEvent.clientX;
      this.mouseDragStartY = mouseDownEvent.clientY;
      this.modalImg.classList.remove("rslidy-transition-enabled");
      mouseDown = true;
    });

    this.view.addEventListener("mousemove", (mouseMoveEvent: MouseEvent) => {
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
  public zoomIn() {
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
  public zoomOut() {
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
  applyOffset(center: boolean) {
    var currentImageWidth = this.imageWidth * this.zoomFactor;
    var currentImageHeight = this.imageHeight * this.zoomFactor;

    if (center) {
      if (currentImageWidth <= this.containerWidth) {
        this.imageOffsetX = (this.containerWidth - currentImageWidth) / 2.0;
      } else {
        if (this.containerWidth - this.imageOffsetX >= currentImageWidth) {
          this.imageOffsetX = this.containerWidth - currentImageWidth;
        } else if (this.imageOffsetX > 0) {
          this.imageOffsetX = 0;
        }
      }

      if (currentImageHeight <= this.containerHeight) {
        this.imageOffsetY = (this.containerHeight - currentImageHeight) / 2.0;
      } else {
        if (this.containerHeight - this.imageOffsetY >= currentImageHeight) {
          this.imageOffsetY = this.containerHeight - currentImageHeight;
        } else if (this.imageOffsetY > 0) {
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
  public initialZoom() {
    var aspectImg = this.imageWidth / this.imageHeight;
    var aspectContainer = this.containerWidth / this.containerHeight;

    if (aspectContainer > aspectImg) {
      this.initialZoomFactor = this.containerHeight / this.imageHeight;
      this.imageOffsetX =
        (this.containerWidth - this.imageWidth * this.zoomFactor) / 2.0;
    } else {
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
