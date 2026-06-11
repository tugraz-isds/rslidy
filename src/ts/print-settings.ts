import { print_settings_html } from "./html-definitions";

interface Data {
  links: boolean;
  slidenumbers: boolean;
  frame: boolean;
  font_size: string;
  layout: string;
  paperSize: string;
  slideOption: string;
  slideRange: string;
  printOption: string;
  customZoom: string;
  customScaling: string;
  transformOrigin: string;
}

export class PrintSettingsComponent {
  private view: HTMLElement;
  public style: HTMLStyleElement | null = null;

  constructor() {
    this.view = window.rslidy.utils.prependHtmlString(
        document.body,
        print_settings_html
    );

    this.initializeSlideRangeToggle();

    // Set default values.
    (this.view.querySelector("#rslidy-checkbox-snum") as HTMLInputElement).checked = true;
    (this.view.querySelector("#rslidy-checkbox-frame") as HTMLInputElement).checked = true;
    (this.view.querySelector("#rslidy-checkbox-link") as HTMLInputElement).checked = false;

    const inputs = this.view.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].onchange = () => {
        this.updatePrintInputStates();
        this.applyPrintSettings();
        this.saveSettings();
      };
    }

    const selects = this.view.getElementsByTagName("select");
    for (let i = 0; i < selects.length; i++) {
      selects[i].onchange = () => {
        this.updatePrintInputStates();
        this.applyPrintSettings();
        this.saveSettings();
      };
    }

    const elementsToCloseOn = [
      "#rslidy-checkbox-link",
      "#rslidy-checkbox-snum",
      "#rslidy-checkbox-frame",
      "#rslidy-input-font-size",
      "#rslidy-button-print-submit"
    ];

    elementsToCloseOn.forEach(selector => {
      this.view.querySelector(selector)?.addEventListener("click", () =>
          window.rslidy.toolbar.closeMenuOnSelection()
      );
    });

    this.view.querySelector("#rslidy-button-print-submit")
        ?.addEventListener("click", () => this.print());

    this.loadSettings();
  }

  private initializeSlideRangeToggle(): void {
    const slideRadios = this.view.querySelectorAll('input[name="slide-print-option"]');
    const printOptions = this.view.querySelectorAll('input[name="print-options"]');

    if (!slideRadios.length) {
      console.error("Print settings elements not found!");
      return;
    }

    this.updatePrintInputStates();

    slideRadios.forEach(radio => {
      radio.addEventListener("change", () => this.updatePrintInputStates());
    });

    printOptions.forEach(radio => {
      radio.addEventListener("change", () => this.updatePrintInputStates());
    });
  }

  private updatePrintInputStates(): void {
    const checkedSlideRadio = this.view.querySelector('input[name="slide-print-option"]:checked') as HTMLInputElement | null;
    const rangeInput = this.view.querySelector("#rslidy-slide-range-input") as HTMLInputElement | null;
    const customZoomRadio = this.view.querySelector("#rslidy-checkbox-zoom") as HTMLInputElement | null;
    const zoomInput = this.view.querySelector("#custom-zoom-input") as HTMLInputElement | null;

    const isCustomSlide = checkedSlideRadio?.value === "custom";
    const isCustomZoom = customZoomRadio?.checked === true;

    if (rangeInput) rangeInput.disabled = !isCustomSlide;
    if (zoomInput) zoomInput.disabled = !isCustomZoom;
  }

  private applyPrintSettings(): void {
    // Remove existing style by ID to ensure clean re-injection
    const existingStyle = document.getElementById("rslidy-print-style");
    if (existingStyle) {
      existingStyle.remove();
    }

    const link = this.view.querySelector("#rslidy-checkbox-link") as HTMLInputElement;
    const snum = this.view.querySelector("#rslidy-checkbox-snum") as HTMLInputElement;
    const frame = this.view.querySelector("#rslidy-checkbox-frame") as HTMLInputElement;
    const font_size = this.view.querySelector("#rslidy-input-font-size") as HTMLInputElement;
    const layout = this.view.querySelector("#rslidy-select-orientation") as HTMLSelectElement;
    const paperSize = this.view.querySelector("#rslidy-select-paper-size") as HTMLSelectElement;

    const selectedSlideOption = this.view.querySelector('input[name="slide-print-option"]:checked') as HTMLInputElement | null;
    const slideRangeInput = this.view.querySelector("#rslidy-slide-range-input") as HTMLInputElement | null;
    const selectedOrigin = this.view.querySelector('input[name="transform-origin"]:checked') as HTMLInputElement | null;
    const scalingInput = this.view.querySelector("#custom-scaling-input") as HTMLInputElement | null;

    let css = "@media print {\n";
      css += `
      *, *::before, *::after {
        animation: none !important;
        animation-delay: 0s !important;
        animation-duration: 0s !important;
        animation-fill-mode: forwards !important;
        transition: none !important;
        transition-delay: 0s !important;
        transition-duration: 0s !important;
        scroll-behavior: auto !important;
      }
  
      .slide,
      .slide * {
        opacity: 1 !important;
        visibility: visible !important;
      }
  `;
    // 1. Handle Slide Visibility
    if (selectedSlideOption?.value === "custom" && slideRangeInput) {
      const range = this.parseSlideRange(slideRangeInput.value);
      css += this.applyCustomSlideRange(range);
    } else if (selectedSlideOption?.value === "current") {
      css += this.applyCurrentSlideOnly();
    }

    // 2. Handle Page Size and Orientation
    let pageSize = paperSize.value;
    const orientation = layout.value;
    const pageSizeSyntax = `${pageSize} ${orientation}`;

    const paperSizes: Record<string, { width: string; height: string }> = {
      A0: { width: "841mm", height: "1189mm" },
      A1: { width: "594mm", height: "841mm" },
      A2: { width: "420mm", height: "594mm" },
      A3: { width: "297mm", height: "420mm" },
      A4: { width: "210mm", height: "297mm" },
      A5: { width: "148mm", height: "210mm" },
      letter: { width: "8.5in", height: "11in" },
      legal: { width: "8.5in", height: "14in" },
      tabloid: { width: "11in", height: "17in" }
    };

    const selectedPaperSize = paperSizes[pageSize];
    const pageHeight =
        orientation === "landscape"
            ? selectedPaperSize.width
            : selectedPaperSize.height;

    css += `
    @page { 
      size: ${pageSizeSyntax};
    }
    html, body {
      width: 100% !important;
      height: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    #rslidy-content-section {
      transform: none !important;
      width: 100% !important;
    }
    .slide { 
      margin: auto !important; 
      display: block !important;
      page-break-after: always !important;
      break-after: page !important;
      position: relative !important;
      min-height: calc(${pageHeight} - 20mm) !important;
    }
    .slide.rslidy-sectionslide {
      align-items: center;
      justify-content: center;
      display: flex !important;        
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    svg,
    canvas {
      animation: none !important;
      transition: none !important;
    }

    svg *,
    canvas * {
      animation: none !important;
      transition: none !important;
    }
  `;

    // 3. Handle Scaling Options
    const selectedOption = this.view.querySelector('input[name="print-options"]:checked') as HTMLInputElement | null;
    const origin = selectedOrigin?.value || "center";

    if (selectedOption) {
      switch (selectedOption.value) {
        case "actual-size":
          css += `
            #rslidy-content-section .slide {
              height: auto !important;
              max-width: ${window.innerWidth}px !important;
            }
          `;
          break;
        case "fit-page-width":
          css += `
            #rslidy-content-section .slide {
              width: 100vw !important;
              box-sizing: border-box !important;
            }
          `;
          break;
        case "custom-zoom":
          const zoomValue = parseFloat((this.view.querySelector("#custom-zoom-input") as HTMLInputElement)?.value || "");
          if (!isNaN(zoomValue)) {
            css += `
              #rslidy-content-section .slide {
                zoom: ${zoomValue}% !important;
                transform-origin: ${origin} !important;
                width: 100% !important;
              }
            `;
          }
          break;
        case "custom":
          const scaleFactor = parseFloat(scalingInput?.value || "") / 100;
          if (!isNaN(scaleFactor)) {
            css += `
              #rslidy-content-section .slide {
                transform: scale(${scaleFactor}) !important;
                transform-origin: ${origin} !important;
                width: 100% !important;
              }
            `;
          }
          break;
      }
    }

    // 4. Extras (Links, Slide Numbers, Frames, Fonts)
    if (!link.checked) {
      css += `a[href^="http"]:after { content: "" !important; }`;
    }
    if (snum.checked) {
      css += `
      #rslidy-content-section { counter-reset: slide-counter; }
    
      #rslidy-content-section .slide:after {
        counter-increment: slide-counter;
        content: counter(slide-counter) " / ${window.rslidy.num_slides}";
        position: absolute;
        right: 0.8rem;
        bottom: 0.8rem;
        font: 60% Sans-Serif;
      }
    `;
    }
    if (frame.checked) {
      css += `.slide { border: ${window.rslidy.print_frame || '1px solid #eee'}; }`;
    }
    if (font_size.value !== "") {
      css += `body { font-size: ${font_size.value}%; }`;
    }

    css += "\n}";

    // 5. Screen Mask Styling (Prevents layout/unhide flashes on the active workspace)
    css += `
      @media screen {
        html.rslidy-printing-in-progress body {
          background-color: #ffffff !important;
          opacity: 0 !important;
          transition: none !important;
        }
      }
    `;

    const style = document.createElement("style");
    style.id = "rslidy-print-style";
    style.innerHTML = css;
    document.head.appendChild(style);
    this.style = style;
  }

  private parseSlideRange(input: string): number[] {
    return input.split(",").reduce<number[]>((acc, part) => {
      if (part.includes("-")) {
        const [start, end] = part.split("-").map(Number);
        if (!isNaN(start) && !isNaN(end)) {
          for (let i = start; i <= end; i++) acc.push(i);
        }
      } else {
        const num = Number(part);
        if (!isNaN(num)) acc.push(num);
      }
      return acc;
    }, []);
  }

  private applyCustomSlideRange(range: number[]): string {
    const slides = document.querySelectorAll("#rslidy-content-section .slide");
    const visibleSlides = range
        .filter(num => num >= 1 && num <= slides.length)
        .map(num => `#rslidy-content-section .slide:nth-of-type(${num}) { display: block !important; }`)
        .join("\n");
    return `#rslidy-content-section .slide { display: none !important; }\n${visibleSlides}`;
  }

  private applyCurrentSlideOnly(): string {
    const currentSlideIndex = window.rslidy.content.getCurrentSlideIndex();
    return `
      #rslidy-content-section .slide { display: none !important; }
      #rslidy-content-section .slide:nth-of-type(${currentSlideIndex + 1}) { display: block !important; }
    `;
  }

  public print(): void {
    try {
      this.applyPrintSettings();

      // Trigger the background screen mask before updating slide classes
      document.documentElement.classList.add("rslidy-printing-in-progress");

      // Force the browser to recalculate layout before print
      void document.body.offsetHeight;

      const slides = document.querySelectorAll("#rslidy-content-section .slide");
      const hiddenSlides: Element[] = [];

      slides.forEach(slide => {
        if (slide.classList.contains("rslidy-hidden")) {
          hiddenSlides.push(slide);
          slide.classList.remove("rslidy-hidden");
        }
      });

      // Give Chrome structural time to recalculate the @page orientation bounds
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimeout(() => {
            window.print();

            document.documentElement.classList.remove("rslidy-printing-in-progress");
            hiddenSlides.forEach(slide => slide.classList.add("rslidy-hidden"));
          }, 100);
        });
      });
    } catch (e) {
      // Emergency fall-through cleanup if the engine drops execution
      document.documentElement.classList.remove("rslidy-printing-in-progress");
      console.error("Print error:", e);
    }
  }

  public loadSettings(): void {
    try {
      const item = localStorage.getItem("rslidy-print");
      if (!item) {
        this.updatePrintInputStates();
        this.applyPrintSettings();
        return;
      }

      const data: Data = JSON.parse(item);
      (this.view.querySelector("#rslidy-checkbox-link") as HTMLInputElement).checked = data.links;
      (this.view.querySelector("#rslidy-checkbox-snum") as HTMLInputElement).checked = data.slidenumbers;
      (this.view.querySelector("#rslidy-checkbox-frame") as HTMLInputElement).checked = data.frame;

      if (data.font_size) (this.view.querySelector("#rslidy-input-font-size") as HTMLInputElement).value = data.font_size;
      if (data.layout) (this.view.querySelector("#rslidy-select-orientation") as HTMLSelectElement).value = data.layout;
      if (data.paperSize) (this.view.querySelector("#rslidy-select-paper-size") as HTMLSelectElement).value = data.paperSize;

      if (data.slideOption) {
        const radio = this.view.querySelector(`input[name="slide-print-option"][value="${data.slideOption}"]`) as HTMLInputElement | null;
        if (radio) radio.checked = true;
      }
      if (data.slideRange) (this.view.querySelector("#rslidy-slide-range-input") as HTMLInputElement).value = data.slideRange;

      if (data.printOption) {
        const radio = this.view.querySelector(`input[name="print-options"][value="${data.printOption}"]`) as HTMLInputElement | null;
        if (radio) radio.checked = true;
      }
      if (data.customZoom) (this.view.querySelector("#custom-zoom-input") as HTMLInputElement).value = data.customZoom;
      if (data.customScaling) (this.view.querySelector("#custom-scaling-input") as HTMLInputElement).value = data.customScaling;

      if (data.transformOrigin) {
        const radio = this.view.querySelector(`input[name="transform-origin"][value="${data.transformOrigin}"]`) as HTMLInputElement | null;
        if (radio) radio.checked = true;
      }

      this.updatePrintInputStates();
      this.applyPrintSettings();
    } catch (e) {
      console.error("Error loading settings:", e);
    }
  }

  public saveSettings(): void {
    try {
      localStorage.setItem("rslidy-print", this.generateJSON());
    } catch (e) {
      console.error("Error saving settings:", e);
    }
  }

  private generateJSON(): string {
    const checkedValue = (s: string) => (this.view.querySelector(s) as HTMLInputElement | null)?.value || "";
    const inputValue = (s: string) => (this.view.querySelector(s) as HTMLInputElement | null)?.value || "";
    const isChecked = (s: string) => (this.view.querySelector(s) as HTMLInputElement | null)?.checked || false;

    return JSON.stringify({
      links: isChecked("#rslidy-checkbox-link"),
      slidenumbers: isChecked("#rslidy-checkbox-snum"),
      frame: isChecked("#rslidy-checkbox-frame"),
      font_size: inputValue("#rslidy-input-font-size"),
      layout: inputValue("#rslidy-select-orientation"),
      paperSize: inputValue("#rslidy-select-paper-size"),
      slideOption: checkedValue('input[name="slide-print-option"]:checked'),
      slideRange: inputValue("#rslidy-slide-range-input"),
      printOption: checkedValue('input[name="print-options"]:checked'),
      customZoom: inputValue("#custom-zoom-input"),
      customScaling: inputValue("#custom-scaling-input"),
      transformOrigin: checkedValue('input[name="transform-origin"]:checked')
    });
  }
}