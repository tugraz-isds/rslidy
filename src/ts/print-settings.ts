import { print_settings_html } from "./html-definitions";

interface Data {
  links: boolean;
  slidenumbers: boolean;
  frame: boolean;
  scale: boolean;
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
      .querySelector("#rslidy-checkbox-scale")
      .addEventListener("click", e => window.rslidy.toolbar.closeMenuOnSelection());
    this.view
      .querySelector("#rslidy-button-print-submit")
      .addEventListener("click", e => this.print());

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
    var scale =
      <HTMLInputElement>(this.view.querySelector("#rslidy-checkbox-scale"));

    var css = "@media print {\n";

    if(!link.checked) {
      css += `a[href^="http://"]:after, a[href^="https://"]:after {
        content: "" !important;
      }`;
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


    if (scale.checked) {
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

    }



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
      this.applyPrintSettings();
      window.print();
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
    (<HTMLInputElement>this.view.querySelector("#rslidy-checkbox-scale")).checked = data.scale;
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
      scale: (<HTMLInputElement>this.view.querySelector("#rslidy-checkbox-scale")).checked
    }
    return JSON.stringify(data);
  }
}