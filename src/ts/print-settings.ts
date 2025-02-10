import { print_settings_html } from "./html-definitions";

interface Data {
  links: boolean;
  slidenumbers: boolean;
  frame: boolean;
  font_size: string;
  layout: string;
}

export class PrintSettingsComponent {
  private view: HTMLElement;
  public style: HTMLStyleElement;

  constructor() {
    this.view =
      window.rslidy.utils.prependHtmlString(document.body,  print_settings_html);

    //set slide numbering and links default to true
    (<HTMLInputElement>this.view.querySelector("#rslidy-checkbox-snum")).checked = true;
    (<HTMLInputElement>this.view.querySelector("#rslidy-checkbox-link")).checked = true;

    // apply print settings whenever changed, in case the user wants
    // to preview it on firefox
    var inputs = this.view.getElementsByTagName("input");
    for (let i=0; i<inputs.length; i++){
      inputs[i].onchange = ()=>this.applyPrintSettings();
    }
    this.view
      .querySelector("#rslidy-checkbox-link")
      .addEventListener("click", e => window.rslidy.toolbar.closeMenuOnSelection());
    this.view
      .querySelector("#rslidy-checkbox-snum")
      .addEventListener("click", e => window.rslidy.toolbar.closeMenuOnSelection());
    this.view
      .querySelector("#rslidy-checkbox-frame")
      .addEventListener("click", e => window.rslidy.toolbar.closeMenuOnSelection());
    this.view
      .querySelector("#rslidy-input-font-size")
      .addEventListener("click", e => window.rslidy.toolbar.closeMenuOnSelection());
    this.view
      .querySelector("#rslidy-button-print-submit")
      .addEventListener("click", e => this.print());

    const customRadio = <HTMLInputElement>document.getElementById("rslidy-checkbox-custom");
    const scalingInput = <HTMLInputElement>document.getElementById("custom-scaling-input");
    for (let i = 0; i < document.querySelectorAll('input[name="print-options"]').length; i++){
      const radio = document.querySelectorAll('input[name="print-options"]')[i];
      radio.addEventListener("change", function () {
        scalingInput.disabled = !customRadio.checked;
      });
    }
    this.applyPrintSettings();

  }

  // ---
  // Description: Set the CSS from print settings
  // ---
  applyPrintSettings() {
    // remove old settings
    if (this.style)
      document.getElementsByTagName('head')[0].removeChild(this.style);

    var link =
      <HTMLInputElement>(this.view.querySelector("#rslidy-checkbox-link"));
    var snum =
      <HTMLInputElement>(this.view.querySelector("#rslidy-checkbox-snum"));
    var frame =
      <HTMLInputElement>(this.view.querySelector("#rslidy-checkbox-frame"));
    var font_size =
      <HTMLInputElement>(this.view.querySelector("#rslidy-input-font-size"));
    var layout =
      <HTMLInputElement>(this.view.querySelector("#rslidy-select-orientation"));

    var css = "@media print {\n";

    // Select the fieldset
    const fieldset = document.getElementById("rslidy-exclusive-checkboxes");

  // Find the selected radio button within the fieldset
    const selectedOption = fieldset.querySelector('input[name="print-options"]:checked');
    css += `
        #chart .window-rv  {
        display: block;
       }
       #rslidy-content-section .slide {
         display:block;
       }
    `;
    if (selectedOption && selectedOption instanceof HTMLInputElement) {
      console.log("Selected value:", selectedOption.value);

      if(selectedOption.value === "actual") {
        css += `
        body {
        transform: none !important; /* No scaling */
        margin: 0 !important; /* Optional: Remove unintended margins */
        padding: 0 !important; /* Optional: Remove unintended padding */
        max-height: 100% !important;
      }
      #rslidy-content-section .slide {
        width: ${window.innerWidth}px !important;  /* Use current viewport width */
        height: auto !important; /* Maintain aspect ratio */
        max-width: 85% !important;
        overflow: visible !important; /* Ensure nothing is clipped */
        page-break-after: always !important; /* Ensure slides break correctly */
      }
    `;
      }
      else if(selectedOption.value  === "fit-width") {
        css += `
        body {
          margin: 0 !important;
          padding: 0 !important;
          transform: none !important;
        }
        
        #rslidy-content-section .slide {
          width: 794px !important;  /* Fit A4 width */
          max-width: 100% !important;
          height: auto !important;
          overflow: visible !important;
          display: block !important;
        }
      `;
      }
      else if(selectedOption.value === "fit2") {
        const pageWidth = 794;  // Approx A4 width in px at 96 DPI
        const pageHeight = 1123; // Approx A4 height in px at 96 DPI

        // Select all slides
        const slides = document.querySelectorAll("#rslidy-content-section .slide");

        // @ts-ignore
        slides.forEach(slide => {
          const rect = slide.getBoundingClientRect();  // Get slide size
          const scaleX = pageWidth / rect.width;
          const scaleY = pageHeight / rect.height;
          const scaleFactor = Math.min(scaleX, scaleY); // Maintain aspect ratio

          slide.style.transform = `scale(${scaleFactor})`;
          slide.style.transformOrigin = "top left"; // Scale from top-left corner
          slide.style.width = `${rect.width * scaleFactor}px`; // Ensure proper sizing
          slide.style.height = `${rect.height * scaleFactor}px`;
          slide.style.overflow = "hidden"; // Prevent overflow issues
        });
      }

      else if (selectedOption.value == "fit") {

      }
      else {
        var scalingInput = <HTMLInputElement>(this.view.querySelector("#custom-scaling-input"));
        // Check if the element exists and retrieve its value
        console.log("scalingInput");
        if (scalingInput) {
          const scalingValue = parseFloat(scalingInput.value); // Parse the input as a number
          console.log("Scaling Input Value:", scalingValue);

          // Ensure scalingValue is a valid percentage and apply scaling
          if (!isNaN(scalingValue) && scalingValue > 0) {
            const scaleFactor = scalingValue / 100; // Convert percentage to scale factor (e.g., 50% -> 0.5)
            css += `
            #rslidy-content-section .slide {
                transform: scale(${scaleFactor}) !important;
                transform-origin: center !important; /* Optional: Define the scaling origin */
                width: auto !important;
                height: auto !important;
                overflow: visible !important;
            }
        `;

            // Apply the CSS dynamically (depending on your setup, you might need a style element or similar logic)
            console.log(css);
          } else {
            console.error("Invalid scaling value:", scalingValue);
          }
        }
      }
    }

    if(!link.checked) {
      css += `a[href^="http://"]:after, a[href^="https://"]:after {
        content: "" !important;
      }`;
    }
    const chart = document.querySelector('#responsive-bar-chart');
    console.log(chart);
    if (chart) {
      // Make sure the chart is visible during printing
      css += `
      #responsive-bar-chart {
        visibility: visible !important;  /* Ensure the chart is visible */
        display: block !important;       /* Ensure the chart is displayed */
        opacity: 1 !important;           /* Ensure it's fully opaque */
        isAnimationActive={false}
      }
    `;
    }

    if(snum.checked) {
      css += `#rslidy-content-section {
        counter-reset: slide-counter;
      }
      #rslidy-content-section .slide:after {
        content: counter(slide-counter);
        counter-increment: slide-counter;
        position: absolute;
        right: 0.8rem;
        bottom: 0.8rem;
        font: 60% Sans-Serif;
      }`;
    }

    if(frame.checked) {
      css += `.slide {
        border: `+window.rslidy.print_frame+`;
      }`;
    }
    if(layout.value == "portrait") {
      css += ` @page {
        size: ${layout.value};
      }`;
    }

    if(font_size.value != "") {
      css += ` body {
       font-size: ${font_size.value}%;
      }`;
    }



    /*if (scale.checked) {
      const mediaQueryList = window.matchMedia('print');
      let pageWidthPx, pageHeightPx;

      // Detect current page size in pixels (based on DPI)
      if (mediaQueryList.matches) {
        pageWidthPx = window.innerWidth;
        pageHeightPx = window.innerHeight;
      } else {
        // Fallback for typical A4 settings
        pageWidthPx = 210 * (96 / 25.4);
        pageHeightPx = 297 * (96 / 25.4);
      }

      // Find the maximum dimensions of any slide
      const sections = document.querySelectorAll('.slide');
      let maxWidth = 0, maxHeight = 0;

      // @ts-ignore
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        maxWidth = Math.max(maxWidth, rect.width);
        maxHeight = Math.max(maxHeight, rect.height);
      }

      // Compute the scaling factor based on the largest dimensions
      const scaleX = pageWidthPx / maxWidth;
      const scaleY = pageHeightPx / maxHeight;
      const scaleFactor = Math.min(scaleX, scaleY);

      // Apply a single zoom factor for all slides
      css += `
      body {
        font-size: 100% !important;
      }
      .slide {
        zoom: ${scaleFactor * 1.5};
        page-break-after: always;
        page-break-inside: avoid;
      }
      img {
        max-width: 100vh !important;
        max-height: 100vh !important;
      }`;

    }*/


    css += "\n}";

    // inject CSS
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    document.getElementsByTagName('head')[0].appendChild(style);
    this.style = style;


    // print support for RespVis (Webkit only), not supported by Firefox
    // https://bugzilla.mozilla.org/show_bug.cgi?id=774398
    if (window.matchMedia) {
      var mediaQueryList = window.matchMedia('print');
      // non-deprecated version: .addEventListener("change", () => {});
      // deprecated version gives Safari support for now
      mediaQueryList.addListener(function (mql) {
        if (mql.matches) {
          window.dispatchEvent(new Event('resize'));
        }
      });
    }
  }

  // ---
  // Description: Called whenever the print button is clicked
  // ---
  print() {
    try {
      this.applyPrintSettings(); // Apply print-specific styles

      // Trigger the print dialog
      setTimeout(() => {
        window.print();
      }, 100);

    } catch (e) {
      console.error("Error during print operation:", e);
    }
  }

  // ---
  // Description: Load print settings from the localStorage
  // ---
  loadSettings(): void {
    try {
      var item = localStorage.getItem("rslidy-print");
    } catch(e) {
      console.log(e);
      return;
    }
    if (item === null || item === undefined) return;

    var data: Data = JSON.parse(item);
    (<HTMLInputElement>this.view.querySelector("#rslidy-checkbox-link")).checked = data.links;
    (<HTMLInputElement>this.view.querySelector("#rslidy-checkbox-snum")).checked = data.slidenumbers;
    (<HTMLInputElement>this.view.querySelector("#rslidy-checkbox-frame")).checked = data.frame;
    console.log((<HTMLInputElement>this.view.querySelector("#rslidy-input-font-size")).value)
    console.log(data.font_size)

    if(data.font_size != null && data.font_size != "") {
      (<HTMLInputElement>this.view.querySelector("#rslidy-input-font-size")).value = data.font_size;
      console.log("hier");
    }
    if(data.layout != null && data.layout != "") {
      (<HTMLInputElement>this.view.querySelector("#rslidy-select-orientation")).value = data.layout;
    }
    this.applyPrintSettings();
  }

  // ---<
  // Description: Save print settings to the localStorage
  // ---
  public saveSettings(): void {
    try {
      localStorage.removeItem("rslidy-print");
      localStorage.setItem("rslidy-print", this.generateJSON());
    } catch(e) {
      console.log(e);
    }
  }

  // ---
  // Description: Generate a JSON string for the localStorage
  // ---
  generateJSON(): string {
    const data: Data = {
      links: (<HTMLInputElement>this.view.querySelector("#rslidy-checkbox-link")).checked,
      slidenumbers: (<HTMLInputElement>this.view.querySelector("#rslidy-checkbox-snum")).checked,
      frame: (<HTMLInputElement>this.view.querySelector("#rslidy-checkbox-frame")).checked,
      font_size: (<HTMLInputElement>this.view.querySelector("#rslidy-input-font-size")).value,
      layout: (<HTMLInputElement>this.view.querySelector("#rslidy-select-orientation")).value,
    }
    return JSON.stringify(data);
  }
}