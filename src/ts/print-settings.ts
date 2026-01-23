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
    const customZoomRadio = <HTMLInputElement>this.view.querySelector('#rslidy-checkbox-zoom');
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
    .rslidy-responsive-table {
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-right: 5.5em;
    text-align: center;
    width: auto !important;
    overflow-x: visible;
   }
  
   .rslidy-responsive-table thead {
    display: none;
   }
  
   .rslidy-responsive-table tbody,
   .rslidy-responsive-table td,
   .rslidy-responsive-table tr {
    display: block;
    width: 100%;
   }
  
   .rslidy-responsive-table tr {
    margin-bottom: 1em;
   }
  
   .rslidy-responsive-table td {
    min-width: 15em;
    padding-left: 10%;
    position: relative;
    text-align: right;
    white-space: nowrap;
   }
  
   .rslidy-responsive-table td:before {
    color: #000;
    content: attr(data-label);
    font-weight: 700;
    left: 0;
    padding-left: 0.5em;
    position: absolute;
    text-align: left;
   }
  
   .rslidy-responsive-table td:first-of-type {
    background-color: gainsboro;
    color: #2b2b2b;
    font-weight: 400;
    text-align: right !important;
   }
  
   .rslidy-responsive-table td.rslidy-text {
    text-align: right !important;
   }
   .rslidy-responsive-table td.rslidy-date {
    text-align: right !important;
   }
  
   .rslidy-responsive-table th.rslidy-date {
    text-align: right !important;
   }
   .rslidy-responsive-table th.rslidy-text {
    text-align: right !important;
   }
  
   .rslidy-responsive-table td.rslidy-symbol,
   .rslidy-responsive-table th.rslidy-symbol {
    text-align: right;
   }
  
   .rslidy-responsive-table tr.rslidy-symbol > td {
    text-align: right;
   }
  
   .rslidy-responsive-table td.rslidy-numeric,
   .rslidy-responsive-table th.rslidy-numeric {
    text-align: right;
   }
  
   .rslidy-responsive-table tr.rslidy-text > td {
    text-align: right;
   }
  
   .rslidy-responsive-table tr.rslidy-numeric > td {
    text-align: right;
   }
   .rslidy-responsive-table-text-scaling {
    font-size: clamp(0.7rem, 2.2vw, 1rem);
    width: 100%; /* let table expand */
    table-layout: auto; /* allow dynamic resizing */
    word-wrap: break-word; /* break long words */
   }
  
   /* Make sure table cells shrink properly */
   .rslidy-responsive-table-text-scaling td,
   .rslidy-responsive-table-text-scaling th {
    white-space: normal; /* allow wrapping */
    overflow: hidden;
    text-overflow: ellipsis;
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
        case "actual-size":
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

        case "fit-page-width":
          css += `
              #rslidy-content-section .slide {
                  max-width: 100% !important;
                  height: auto !important;
                  overflow: visible !important;
                  padding: 2rem !important;
              }
          `;
          break;
        case "custom-zoom":
          const zoomValueInput = <HTMLInputElement>this.view.querySelector("#custom-zoom-input");
          const zoomValue = parseFloat(zoomValueInput.value);
          if (!isNaN(zoomValue) && zoomValue > 0) {
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