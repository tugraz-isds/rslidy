import { print_settings_html } from "./html-definitions";

interface Data {
  links: boolean;
  slidenumbers: boolean;
  frame: boolean;
  font_size: string;
  layout: string;
  paperSize: string;
}

export class PrintSettingsComponent {
  private view: HTMLElement;
  public style: HTMLStyleElement;

  constructor() {
    this.view = window.rslidy.utils.prependHtmlString(document.body, print_settings_html);

    this.initializeSlideRangeToggle();

    // Set default values
    (<HTMLInputElement>this.view.querySelector("#rslidy-checkbox-snum")).checked = true;
    (<HTMLInputElement>this.view.querySelector("#rslidy-checkbox-frame")).checked = true;
    (<HTMLInputElement>this.view.querySelector("#rslidy-checkbox-link")).checked = false;

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
      this.view.querySelector(selector)?.addEventListener("click",
        e => window.rslidy.toolbar.closeMenuOnSelection());
    });

    // Print button handler
    this.view.querySelector("#rslidy-button-print-submit")
      ?.addEventListener("click", e => this.print());

    this.applyPrintSettings();
  }

  private initializeSlideRangeToggle() {
    const slideRadios = this.view.querySelectorAll('input[name="slide-print-option"]');
    const rangeInput = <HTMLInputElement>this.view.querySelector("#rslidy-slide-range-input");
    const positionRadios = this.view.querySelectorAll('input[name="transform-origin"]');
    //const customScaleRadio =
    // <HTMLInputElement>this.view.querySelector('#rslidy-checkbox-custom');
    const customZoomRadio = <HTMLInputElement>this.view.querySelector('#rslidy-checkbox-zoom');
    //const scalingInput =
    // <HTMLInputElement>this.view.querySelector('#custom-scaling-input');
    const zoomInput = <HTMLInputElement>this.view.querySelector('#custom-zoom-input');

    if (!slideRadios.length || !rangeInput) {
      console.error("Print settings elements not found!");
      return;
    }

    // Update all dependent states
    const updateStates = () => {
      // Fix: Properly type the checked radio button
      const checkedSlideRadio = this.view.querySelector(
        'input[name="slide-print-option"]:checked'
      ) as HTMLInputElement | null;

      const isCustomSlide = checkedSlideRadio?.value === "custom";
      //const isCustomScale = customScaleRadio.checked;
      const isCustomZoom = customZoomRadio.checked;

      // Slide range input
      rangeInput.disabled = !isCustomSlide;

      // Enable/disable scaling and zoom inputs
      //scalingInput.disabled = !isCustomScale;
      zoomInput.disabled = !isCustomZoom;

      // Handle position radios
    };

    // Initialize states
    updateStates();

    // Event listeners
    slideRadios.forEach(radio => {
      radio.addEventListener("change", updateStates);
    });


    // Print options changes
    document.querySelectorAll('input[name="print-options"]').forEach(radio => {
      radio.addEventListener("change", updateStates);
    });
  }

  private applyPrintSettings() {
    if (this.style) {
      document.head.removeChild(this.style);
    }

    // Get all settings values
        const link = <HTMLInputElement>this.view.querySelector("#rslidy-checkbox-link");
      const snum = <HTMLInputElement>this.view.querySelector("#rslidy-checkbox-snum");
      const frame = <HTMLInputElement>this.view.querySelector("#rslidy-checkbox-frame");
      const font_size = <HTMLInputElement>this.view.querySelector("#rslidy-input-font-size");
      const layout = <HTMLSelectElement>this.view.querySelector("#rslidy-select-orientation");
      const paperSize = <HTMLSelectElement>this.view.querySelector("#rslidy-select-paper-size");
      const selectedSlideOption = <HTMLInputElement>this.view.querySelector('input[name="slide-print-option"]:checked');
      const slideRangeInput = <HTMLInputElement>this.view.querySelector("#rslidy-slide-range-input");
      const selectedOrigin = this.view.querySelector(
        'input[name="transform-origin"]:checked'
      ) as HTMLInputElement | null;
      const origin = selectedOrigin?.value || "center";    const scalingInput = <HTMLInputElement>this.view.querySelector("#custom-scaling-input");

      let css = "@media print {\n";

      // Handle slide visibility
      if (selectedSlideOption.value === "custom") {
      const range = this.parseSlideRange(slideRangeInput.value);
      css += this.applyCustomSlideRange(range);
    } else if (selectedSlideOption.value === "current") {
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
      .slide { margin: auto !important; }
      #chart .window-rv { display: block; }
      #rslidy-content-section .slide { display: block; }
      .slide.animated { animation: none !important; }
      .unitdisk-nav { position: relative !important; height: 65vh !important; top: 15% !important; }
      #vorotree canvas { display: block; position: relative !important; max-width: 100% !important; height: auto !important; }
      @page { size: ${dimensions}; }
    `;
    if (window.innerWidth <= 640) {
      css += `
    @media print {
      .responsive-table tr {
        break-inside: avoid !important; /* Prevent row from breaking across pages */
        margin-bottom: 1em !important;
        display: block !important;
        width: 100% !important;
      }

      .responsive-table {
        align-items: center !important;
        display: flex !important;
        flex-direction: column !important;
        margin-left: auto !important;
        margin-right: 5.5em !important;
        text-align: center !important;
        width: auto !important;
        overflow-x: visible !important;
      }

      .responsive-table thead {
        display: none !important;
      }

      .responsive-table tbody,
      .responsive-table td {
        display: block !important;
        width: 100% !important;
      }

      .responsive-table td {
        min-width: 15em !important;
        padding-left: 10% !important;
        position: relative !important;
        text-align: right !important;
      }

      .responsive-table td:before {
        color: #000 !important;
        content: attr(data-label) !important;
        font-weight: 700 !important;
        left: 0 !important;
        padding-left: 0.5em !important;
        position: absolute !important;
        text-align: left !important;
      }

      .responsive-table td:first-of-type {
        background-color: #eaf1f5 !important;
        color: #2b2b2b !important;
        font-weight: 400 !important;
      }

      .responsive-table tr.text > td {
        text-align: right !important;
      }

      .responsive-table tr.numeric > td {
        text-align: right !important;
      }

      .responsive-table td:first-child {
        text-align: right !important;
      }

      .columns-even {
        flex-direction: column !important;
      }

      .columns-even > * {
        width: 100% !important;
      }
    }
  `;
    }


    // Handle print sizing options
    const selectedOption = this.view.querySelector(
      'input[name="print-options"]:checked'
    ) as HTMLInputElement | null;
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
                  max-width: 100% !important;
                  height: auto !important;
                  overflow: visible !important;
                  padding: 2rem !important;
              }
          `;
          break;


        case "shrink":
        /*const [pageWidth, pageHeight] = paperSize.value.split(" ");

        const mmToPx = mm => mm * 3.7795;
        const pageHeightPx1 = mmToPx(parseFloat(pageHeight));
        const slide = document.querySelector('.slide'); // or loop over all
        const slides = document.querySelectorAll('.slide');

        slides.forEach(slide => {
          if (!(slide instanceof HTMLElement)) return;

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
        break;*/
        case "fit":
          /*css += `
            @page {
              size: ${paperSize.value} ${layout.value};
              margin: 10mm;
            }

            #rslidy-content-section .slide {
              width: 100% !important;
              height: 100% !important;
              page-break-after: always !important;
              transform: scale(1) !important;
              transform-origin: top left !important;
              contain: size !important;
            }

            #rslidy-content-section .slide > div {
              transform: scale(calc(var(--print-scale-factor, 1))) !important;
              transform-origin: top left !important;
              width: 100% !important;
              height: 100% !important;
            }
          `;*/
          break;
        case "zoom":
          const zoomValueInput = <HTMLInputElement>this.view.querySelector("#custom-zoom-input");
          const zoomValue = parseFloat(zoomValueInput.value);
          if (!isNaN(zoomValue) && zoomValue > 0) {
            const scaleFactor = zoomValue / 100;
            const origin = selectedOrigin?.value || "center";
            css += `
              #rslidy-content-section .slide {
                bottom: 0 !important;
                left: 0 !important;
              
                zoom: ${zoomValue}% !important;
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

        case "custom":
          const scalingValue = parseFloat(scalingInput.value);
          if (!isNaN(scalingValue) && scalingValue > 0) {
            const scaleFactor = scalingValue / 100;
            const origin = selectedOrigin?.value || "center";
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
                break-inside: avoid;
                page-break-inside: avoid; /* for legacy browser support */+#
                box-sizing: border-box !important;
                overflow: visible !important;
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
        if (mql.matches) window.dispatchEvent(new Event('resize'));
      });
    }
  }

  private parseSlideRange(input: string): number[] {
      return input.split(',').reduce<number[]>((acc, part) => {
        if (part.includes('-')) {
          const [start, end] = part.split('-').map(Number);
          if (!isNaN(start) && !isNaN(end) && start <= end) {
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

  private applyCurrentSlideOnly(): string {
      const currentSlideIndex = window.rslidy.content.getCurrentSlideIndex();
      return `
      #rslidy-content-section .slide { display: none !important; }
      #rslidy-content-section .slide:nth-of-type(${currentSlideIndex + 1}) { display: block !important; }
    `;
    }

  public print() {
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
      } catch (e) {
        console.error("Print error:", e);
      }
    }

  public loadSettings(): void {
      try {
        const item = localStorage.getItem("rslidy-print");
        if (!item) return;

    const data: Data = JSON.parse(item);
    (<HTMLInputElement>this.view.querySelector("#rslidy-checkbox-link")).checked = data.links;
    (<HTMLInputElement>this.view.querySelector("#rslidy-checkbox-snum")).checked = data.slidenumbers;
    (<HTMLInputElement>this.view.querySelector("#rslidy-checkbox-frame")).checked = data.frame;

    if (data.font_size) {
      (<HTMLInputElement>this.view.querySelector("#rslidy-input-font-size")).value = data.font_size;
    }
    if (data.layout) {
      (<HTMLSelectElement>this.view.querySelector("#rslidy-select-orientation")).value = data.layout;
    }
    if (data.paperSize) {
      (<HTMLSelectElement>this.view.querySelector("#rslidy-select-paper-size")).value = data.paperSize;
    }

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
      return JSON.stringify({
        links: (<HTMLInputElement>this.view.querySelector("#rslidy-checkbox-link")).checked,
        slidenumbers: (<HTMLInputElement>this.view.querySelector("#rslidy-checkbox-snum")).checked,
      frame: (<HTMLInputElement>this.view.querySelector("#rslidy-checkbox-frame")).checked,
      font_size: (<HTMLInputElement>this.view.querySelector("#rslidy-input-font-size")).value,
      layout: (<HTMLSelectElement>this.view.querySelector("#rslidy-select-orientation")).value,
      paperSize: (<HTMLSelectElement>this.view.querySelector("#rslidy-select-paper-size")).value
    });
  }
}