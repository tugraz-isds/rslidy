import { print_settings_html } from "./html-definitions";
import html2canvas from "html2canvas"; // Correct way
import jsPDF  from "jspdf";
//import * as html2canvas from "../../html2canvas/html2canvas.min.js";
//import html2pdf from "html2pdf.js";

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
    this.view
      .querySelector("#rslidy-button-export-pdf")
      .addEventListener("click", e => this.exportPDF());

    const customRadio = <HTMLInputElement>document.getElementById("rslidy-checkbox-custom");
    const scalingInput = <HTMLInputElement>document.getElementById("custom-scaling-input");
    const transformOriginRadios = document.querySelectorAll('input[name="transform-origin"]');

    function toggleTransformOriginRadios() {
      transformOriginRadios.forEach(radio => {
        if (!customRadio.checked) {
          radio.addEventListener("click", preventSelection);
        } else {
          radio.removeEventListener("click", preventSelection);
        }
      });
    }

    function preventSelection(event) {
      event.preventDefault(); // Prevents selection
    }

// Attach event listener to customRadio
    customRadio.addEventListener("change", toggleTransformOriginRadios);

// Run once to initialize the correct state on page load
    toggleTransformOriginRadios();

// Attach event listener to customRadio
    customRadio.addEventListener("change", toggleTransformOriginRadios);

// Run once to initialize the correct state on page load
    toggleTransformOriginRadios();

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
      <HTMLSelectElement>(this.view.querySelector("#rslidy-select-orientation"));
    var paperSize =
      <HTMLSelectElement>(this.view.querySelector("#rslidy-select-paper-size"));
    var css = "@media print {\n";

    // Select the fieldset
    const fieldset = document.getElementById("rslidy-exclusive-checkboxes");
    const selectedOrigin = <HTMLInputElement>fieldset.querySelector('input[name="transform-origin"]:checked');

  console.log("selectedORigin: ", selectedOrigin);
  // Find the selected radio button within the fieldset
    const selectedOption = fieldset.querySelector('input[name="print-options"]:checked');

    console.log("Layout: ", layout.value, "Size: ", paperSize.value);
    const isValidFormat = /^\d+(mm|in)\s\d+(mm|in)$/.test(paperSize.value);
    if (!isValidFormat) {
      console.error("Invalid paper size format. Use something like '210mm 297mm'.");
      return;
    }

    // Swap dimensions for landscape orientation
    let dimensions = paperSize.value;
    if (layout.value === "landscape") {
      const [width, height] = paperSize.value.split(" ");
      dimensions = `${height} ${width}`; // Swap width and height
    }
    css += `
        #chart .window-rv  {
        display: block;
       }
       #rslidy-content-section .slide {
         display:block;
       }
        .slide.animated {
        animation: none !important;
      }
        .unitdisk-nav {
        position: relative !important;
        height: 65vh !important;
        top: 15% !important;
      }
      #vorotree canvas {
        display: block; /* Prevent any inline element behavior */
        position: relative !important;
        max-width: 100% !important;
        height: auto !important;
      }
       @page {
        size: ${dimensions};
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

        // Extract the width (first part of the value)
        const pageWidth = paperSize.value.split(" ")[0]; // e.g., "210mm"

        css += `
        body {
        margin: 0 !important;
        padding: 0 !important;
        transform: none !important;
      }

      #rslidy-content-section .slide {
        width: ${pageWidth} !important;  /* Fit the chosen page width */
        max-width: 100% !important; /* Ensure it doesn't exceed the printable area */
        height: auto !important; /* Adjust height automatically */
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
          const htmlSlide = slide as HTMLElement;

          const rect = slide.getBoundingClientRect();  // Get slide size
          const scaleX = pageWidth / rect.width;
          const scaleY = pageHeight / rect.height;
          const scaleFactor = Math.min(scaleX, scaleY); // Maintain aspect ratio

          htmlSlide.style.transform = `scale(${scaleFactor})`;
          htmlSlide.style.transformOrigin = "top left"; // Scale from top-left corner
          htmlSlide.style.width = `${rect.width * scaleFactor}px`; // Ensure proper sizing
          htmlSlide.style.height = `${rect.height * scaleFactor}px`;
          htmlSlide.style.overflow = "hidden"; // Prevent overflow issues
        });
      }

      else if (selectedOption.value == "fit") {
        /*let dimensions = paperSize.value;
        if (layout.value === "landscape") {
          const [width, height] = paperSize.value.split(" ");
          dimensions = `${height} ${width}`; // Swap width and height for landscape
        }

        const pageWidth = parseFloat(dimensions.split(" ")[0].replace("mm", ""));
        const pageHeight = parseFloat(dimensions.split(" ")[1].replace("mm", ""));

        const slides = document.querySelectorAll("#rslidy-content-section .slide");

        slides.forEach(slide => {
          // Get the current slide's width and height (in pixels)
          const slideWidth = (slide as HTMLElement).offsetWidth;
          const slideHeight = (slide as HTMLElement).offsetHeight;

          // Calculate scale factors to make sure the slide fills the page but doesn't overflow
          const scaleX = pageWidth / slideWidth;
          const scaleY = pageHeight / slideHeight;

          // Use the larger scale factor to fill the page completely
          const scale = Math.max(scaleX, scaleY);

          // Apply scaling
          (slide as HTMLElement).style.transform = `scale(${scale})`;
          (slide as HTMLElement).style.transformOrigin = "top left"; // Scale from top-left corner
          (slide as HTMLElement).style.width = `${slideWidth}px`;  // Keep original width for reference
          (slide as HTMLElement).style.height = `${slideHeight}px`; // Keep original height for reference

          // Center the slide content by adjusting its position after scaling
          (slide as HTMLElement).style.position = "absolute";
          (slide as HTMLElement).style.top = "0";
          (slide as HTMLElement).style.left = "0";
        });
        css += `
         body {
            margin: 0 !important;
            padding: 0 !important;
            transform: none !important;
            width: 100% !important;
            height: 100% !important;
        }
    
        #rslidy-content-section {
            display: block;
            width: 100%;
            height: 100%;
            position: relative;
        }
    
        #rslidy-content-section .slide {
            max-width: 100% !important;  Ensure it doesn't exceed the printable area
            overflow: visible !important;
            display: block !important;
            position: absolute;  To position the slide properly
        }*/
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
                transform-origin: ${selectedOrigin.value} !important; /* Optional: Define the scaling origin */
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
    const slides = document.querySelectorAll("#rslidy-content-section .slide");

    try {

      this.applyPrintSettings(); // Apply print-specific styles

      const originalHiddenSlides = new Set();
      slides.forEach(slide => {
        if (slide.classList.contains("rslidy-hidden")) {
          originalHiddenSlides.add(slide);
        }
      });

      const showHiddenSlides = () => {
        slides.forEach(slide => {
          if (slide.classList.contains("rslidy-hidden")) {
            slide.classList.remove("rslidy-hidden");
          }
        });
      };
      console.log("here");
      showHiddenSlides();
      // Trigger the print dialog
      /*var css = ".rslidy-hidden { display: block !important; }";
       // Correct CSS syntax


      var style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = css;
      document.getElementsByTagName('head')[0].appendChild(style);
      this.style = style;*/
      setTimeout(() => {
        window.print();

        const restoreHiddenSlides = () => {
          slides.forEach(slide => {
            if (originalHiddenSlides.has(slide)) { // Only restore if it was initially hidden
              slide.classList.add("rslidy-hidden");
            }
          });
        };
        restoreHiddenSlides()
      }, 200);

    } catch (e) {
      console.error("Error during print operation:", e);
    }
  }

  exportPDF() {
    try {
      // Create and add the loading screen dynamically
      let loadingScreen = document.createElement("div");
      loadingScreen.id = "loading-screen";
      loadingScreen.innerHTML = `
            <div class="loading-content">
                <p>Exporting as PDF, please wait...</p>
                <div class="spinner"></div>
            </div>
        `;

      // Apply styles to fully cover the screen and block interactions
      Object.assign(loadingScreen.style, {
        position: "fixed", top: "0", left: "0",
        width: "100vw", height: "100vh",
        background: "rgba(0, 0, 0, 0.9)", display: "flex",
        justifyContent: "center", alignItems: "center",
        color: "white", fontSize: "20px", zIndex: "99999",
        flexDirection: "column"
      });

      let spinnerStyle = document.createElement("style");
      spinnerStyle.innerHTML = `
              .loading-content {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
            .spinner {
                width: 3em;
                height: 3em;
                border: 0.5em solid rgba(255, 255, 255, 0.3);
                border-top: 0.5em solid white;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                justify-content: "center";
                align-items: "center";
                text-align: "center";
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;

      document.head.appendChild(spinnerStyle);
      document.body.appendChild(loadingScreen);

      // Apply print-specific settings
      this.applyPrintSettings();

      const slides = document.querySelectorAll("#rslidy-content-section .slide");
      const originalHiddenSlides = new Set();

      slides.forEach(slide => {
        if (slide.classList.contains("rslidy-hidden")) {
          originalHiddenSlides.add(slide);
        }
      });

      const showHiddenSlides = () => {
        slides.forEach(slide => slide.classList.remove("rslidy-hidden"));
      };

      const restoreHiddenSlides = () => {
        slides.forEach(slide => {
          if (originalHiddenSlides.has(slide)) {
            slide.classList.add("rslidy-hidden");
          }
        });
      };

      console.log("Starting PDF export...");

      const pdf = new jsPDF("l", "mm", "a4");
      const pageWidth = 297;
      const pageHeight = 210;

      const addSlideToPDF = async (slide, index) => {
        const { width, height } = slide.getBoundingClientRect();
        console.log(`Slide ${index} dimensions:`, width, height);

        const canvas = await html2canvas(slide, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = pageWidth - 20;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (index > 0) pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, (pageHeight - imgHeight) / 2, imgWidth, imgHeight);
      };

      const processSlides = async () => {
        try {
          showHiddenSlides();

          const style = document.createElement('style');
          style.innerHTML = ".slide.animated { animation: none !important; }";
          document.head.appendChild(style);
          this.style = style;

          for (let i = 0; i < slides.length; i++) {
            await addSlideToPDF(slides[i], i);
          }

          pdf.save("slides.pdf");
          console.log("PDF exported successfully!");
        } catch (error) {
          console.error("Error during PDF generation:", error);
        } finally {
          restoreHiddenSlides();

          // Ensure the loading screen is removed after PDF export
          const loadingScreen = document.getElementById("loading-screen");
          if (loadingScreen) {
            document.body.removeChild(loadingScreen);
          }
        }
      };

      processSlides();

    } catch (e) {
      console.error("Error exporting PDF:", e.message || e);

      // Remove loading screen if an error occurs before processSlides() runs
      const loadingScreen = document.getElementById("loading-screen");
      if (loadingScreen) document.body.removeChild(loadingScreen);
    }
  }



  exportPDF2() {
    try {
      // Apply print-specific styles before export
      this.applyPrintSettings();

      // Get the container that holds all slides
      const slideDeck = document.querySelector("body"); // Use the body or a specific container for slides

      if (!slideDeck) {
        console.error("Slide deck not found!");
        return;
      }

      // Create a new PDF instance
      const pdf = new jsPDF("p", "mm", "a4"); // Portrait, A4 size
      const slides = slideDeck.querySelectorAll("#rslidy-content-section .slide"); // Select all slides (assuming each slide is a <section>)

      // Function to capture and add a slide to the PDF
      const addSlideToPDF = async (slide: HTMLElement, index: number) => {
        // Temporarily make the slide visible

        // Capture the slide as an image using html2canvas
        const canvas = await html2canvas(slide, {
          scale: 2, // Higher resolution
          useCORS: true, // Enable cross-origin images
          logging: true, // Enable logging for debugging
          allowTaint: true, // Allow tainted images
        });

        // Convert the canvas to an image data URL
        const imgData = canvas.toDataURL("image/png", 1.0);

        // Add a new page to the PDF (except for the first slide)
        if (index > 0) {
          pdf.addPage();
        }

        // Calculate dimensions to fit the slide into the PDF page
        const imgWidth = pdf.internal.pageSize.getWidth(); // A4 width (210mm)
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

        // Add the slide image to the PDF
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

        // Hide the slide again after capturing

        // Log the aria-label for debugging
        const ariaLabel = slide.getAttribute("aria-label");
        console.log(`Slide ${index + 1} captured: ${ariaLabel}`);
      };

      // Process all slides sequentially
      const processSlides = async () => {
        for (let i = 0; i < slides.length; i++) {
          await addSlideToPDF(slides[i] as HTMLElement, i);
        }
        pdf.save("rslidy-slide-deck.pdf"); // Save the PDF after all slides are processed
        console.log("PDF exported successfully!");
      };

      processSlides().catch((err) => {
        console.error("Error during PDF generation:", err);
      });
    } catch (e) {
      console.error("Error exporting PDF:", e.message || e);
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
    if(data.paperSize != null && data.paperSize != "") {
      (<HTMLInputElement>this.view.querySelector("#rslidy-select-paper-size")).value = data.paperSize;
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
      paperSize: (<HTMLInputElement>this.view.querySelector("#rslidy-select-paper-size")).value
    }
    return JSON.stringify(data);
  }
}