import { settings_html } from "./html-definitions";

interface Data {
  slidefont: number;
  uifont: number;
  tilt:  boolean;
  shake: boolean;
  space: boolean;
  margintap: boolean;
  lowlightmode: boolean;
}

export class SettingsComponent {
  private view: HTMLElement;
  private default: number;
  private default_ui: number;
  private default_footer: number;
  private slidefont: number = 0;
  private uifont: number = 0;

  constructor() {
    this.view =
      window.rslidy.utils.prependHtmlString(document.body, settings_html);

    // Parse default font sizes, in case the slide creator changes them
    this.default = window.rslidy.utils.getEM("#rslidy-content-section .slide");
    this.default_ui = window.rslidy.utils.getEM(".rslidy-ui");
    this.default_footer = window.rslidy.utils.getEM("#rslidy-footer");

    this.view
      .querySelector("#rslidy-button-font-plus")
      .addEventListener("click", e => this.changeSlideFont(e, 1));
    this.view
      .querySelector("#rslidy-button-font-reset")
      .addEventListener("click", e => this.changeSlideFont(e, 0));
    this.view
      .querySelector("#rslidy-button-font-minus")
      .addEventListener("click", e => this.changeSlideFont(e, -1));
    this.view
      .querySelector("#rslidy-button-font-plus-ui")
      .addEventListener("click", e => this.changeUIFont(e, 1));
    this.view
      .querySelector("#rslidy-button-font-reset-ui")
      .addEventListener("click", e => this.changeUIFont(e, 0));
    this.view
      .querySelector("#rslidy-button-font-minus-ui")
      .addEventListener("click", e => this.changeUIFont(e, -1));
    this.view
      .querySelector("#rslidy-checkbox-tilt")
      .addEventListener("click", e => window.rslidy.toolbar.closeMenuOnSelection());
    this.view
      .querySelector("#rslidy-checkbox-shake")
      .addEventListener("click", e => window.rslidy.toolbar.closeMenuOnSelection());
    this.view
      .querySelector("#rslidy-checkbox-space")
      .addEventListener("click", e => window.rslidy.toolbar.closeMenuOnSelection());
    this.view
      .querySelector("#rslidy-checkbox-margintap")
      .addEventListener("click", e => window.rslidy.toolbar.closeMenuOnSelection());
    this.view
      .querySelector("#rslidy-checkbox-lowlightmode")
      .addEventListener("click", e =>
      window.rslidy.toolbar.closeMenuOnSelection(
        () => window.rslidy.toggleLowLightMode()
      ));
      this.setupTableSorting();
      this.applyResponsiveTableLabels();
  }

  // ---
  // Description: Load settings from the localStorage
  // ---
  loadSettings(): void {
    try {
      var item = localStorage.getItem("rslidy");
    } catch(e) {
      console.log(e);
      return;
    }
    if (item === null || item === undefined) return;

    var data: Data = JSON.parse(item);
    if(data.slidefont != undefined)
      while(data.slidefont != this.slidefont)
        this.changeSlideFont(null, data.slidefont > 0 ? 1 : -1);
    if(data.uifont != undefined)
      while(data.uifont != this.uifont)
        this.changeUIFont(null, data.uifont > 0 ? 1 : -1);
    (<HTMLInputElement>this.view.querySelector("#rslidy-checkbox-tilt")).checked = data.tilt;
    (<HTMLInputElement>this.view.querySelector("#rslidy-checkbox-shake")).checked = data.shake;
    (<HTMLInputElement>this.view.querySelector("#rslidy-checkbox-space")).checked = data.space;
    (<HTMLInputElement>this.view.querySelector("#rslidy-checkbox-margintap")).checked = data.margintap;
    (<HTMLInputElement>this.view.querySelector("#rslidy-checkbox-lowlightmode")).checked = data.lowlightmode;
    if (data.lowlightmode)
      window.rslidy.toggleLowLightMode();
  }

  // ---
  // Description: Save settings to the localStorage
  // ---
  public saveSettings(): void {
    try {
      localStorage.removeItem("rslidy");
      localStorage.setItem("rslidy", this.generateJSON());
    } catch(e) {
      console.log(e);
    }
  }

  // ---
  // Description: Generate a JSON string for the localStorage
  // ---
  generateJSON(): string {
    const themeSelect = this.view.querySelector<HTMLSelectElement>("#rslidy-select-theme"); // declare it here

    const data: Data = {
      slidefont: this.slidefont,
      uifont: this.uifont,
      tilt: (<HTMLInputElement>this.view.querySelector("#rslidy-checkbox-tilt")).checked,
      shake: (<HTMLInputElement>this.view.querySelector("#rslidy-checkbox-shake")).checked,
      space: (<HTMLInputElement>this.view.querySelector("#rslidy-checkbox-space")).checked,
      margintap: (<HTMLInputElement>this.view.querySelector("#rslidy-checkbox-margintap")).checked,
      lowlightmode: (<HTMLInputElement>this.view.querySelector("#rslidy-checkbox-lowlightmode")).checked
    }
    return JSON.stringify(data);
  }

  // ---
  // Description: Used for final style adaptions.
  // ---
  doCustomSettingAdaptions(): void {
    // Start in night mode if set or user prefers it
    // Currently low light mode is broken in firefox mobile
    // filter:invert() causes the page to overflow
    // add "|| window.matchMedia("(preferslidy-color-scheme: dark)").matches"
    // to auto-enable low light mode once its fixed
    if (window.rslidy.start_in_low_light_mode) {
      var lowlightbtn = (<HTMLInputElement>document.getElementById(
        "rslidy-checkbox-lowlightmode"
      ));
      if(!lowlightbtn.checked) {
        window.rslidy.toggleLowLightMode();
        lowlightbtn.checked = true;
      }
    }

    // Block slide text selection if set
    if (window.rslidy.block_slide_text_selection) {
      var content_section: any = document.getElementById(
        "rslidy-content-section"
      );
      var original_slides: any = content_section.getElementsByClassName(
        "slide"
      );
      for (var i: number = 0; i < original_slides.length; i++)
        original_slides[i].classList.add("rslidy-noselect");
    }
  }

  // ---
  // Description: Called whenever one of the text size buttons is clicked.
  // e: The event.
  // value: Specifies the size modifier (1 = more, -1 = less).
  // ---
  public changeSlideFont(e: any, value: number): void {
    if (value == 0)
      this.slidefont = 0;
    else
      this.slidefont += value;

    var slides_large = document.querySelectorAll(
      "#rslidy-content-section .slide"
    );

    for (var i = 0; i < slides_large.length; i++) {
      if (value == 0)
        (<HTMLElement>slides_large[i]).style.fontSize = this.default + "em";

      var current_font_size = parseFloat(
        (<HTMLElement>slides_large[i]).style.fontSize
      );
      if (
        (current_font_size > window.rslidy.min_slide_font && value == -1) ||
        (current_font_size < window.rslidy.max_slide_font && value == 1)
      )
        (<HTMLElement>slides_large[i]).style.fontSize =
          current_font_size + window.rslidy.font_step * value + "em";
      else if (isNaN(current_font_size))
        (<HTMLElement>slides_large[i]).style.fontSize =
          this.default + window.rslidy.font_step * value + "em";
    }

    // Prevent default actions after event handling
    if(e) e.preventDefault();
  }

  // ---
  // Description: Called whenever one of the text size buttons is clicked.
  // e: The event.
  // value: Specifies the size modifier (1 = more, -1 = less).
  // ---
  public changeUIFont(e: any, value: number): void {
    if (value == 0)
      this.uifont = 0;
    else
      this.uifont += value;

    var ui = document.querySelectorAll(".rslidy-ui");
    var footer = document.querySelector("#rslidy-footer");

    for (var i = 0; i < ui.length; i++) {
      if (value == 0)
        (<HTMLElement>ui[i]).style.fontSize = this.default_ui + "em";

      var current_font_size = parseFloat(
        (<HTMLElement>ui[i]).style.fontSize
      );
      if (
        (current_font_size > window.rslidy.min_slide_font && value == -1) ||
        (current_font_size < window.rslidy.max_slide_font && value == 1)
      )
        (<HTMLElement>ui[i]).style.fontSize =
          current_font_size + window.rslidy.font_step * value + "em";
      else if (isNaN(current_font_size))
        (<HTMLElement>ui[i]).style.fontSize =
          this.default_ui + window.rslidy.font_step * value + "em";
    }

    // Prevent footer from overflowing, if on smaller screens
    if(this.default_footer < 1 &&
      parseFloat((<HTMLElement>footer).style.fontSize) > this.default_footer)
      (<HTMLElement>footer).style.fontSize = this.default_footer + "em";

    setTimeout(()=>{this.checkToolbarOverflow();}, 1000)

    // Prevent default actions after event handling
    if(e) e.preventDefault();
  }

  // ---
  // Description: Checks the toolbar for overflow and scales it down if needed.
  // ---
  public checkToolbarOverflow(): void {
    // check if footer is still on the same line
    var ov = document.querySelector("#rslidy-button-overview").getBoundingClientRect();
    var toc = document.querySelector("#rslidy-button-toc").getBoundingClientRect();

    console.log(ov.top + " - " + toc.top);

    if(ov.top == toc.top)
      return
    else
      this.changeUIFont(null, -1);
  }

  private setupTableSorting(): void {
    const tables = document.querySelectorAll("table.rslidy-responsive-table");

    // --- Normalize text values for comparison ---
    const normalize = (text: string) => {
      text = text.trim();

      // Numeric values
      if (/^-?\d+(\.\d+)?$/.test(text)) return parseFloat(text);

      // Checkmarks / Crosses
      if (text.includes("✔")) return 1;
      if (text.includes("✘")) return 0;

      // Dates
      const timestamp = Date.parse(text);
      if (!isNaN(timestamp)) return timestamp;

      // Default: lowercase string
      return text.toLowerCase();
    };

    // --- Helper: Sort table body ---
    const sortTable = (tbody: Element, columnIndex: number, direction: "asc" | "desc") => {
      const rows = Array.from(tbody.querySelectorAll("tr"));

      rows.sort((a, b) => {
        const cellA = a.children[columnIndex]?.textContent || "";
        const cellB = b.children[columnIndex]?.textContent || "";

        const valA = normalize(cellA);
        const valB = normalize(cellB);

        if (typeof valA === "number" && typeof valB === "number") {
          return direction === "asc" ? valA - valB : valB - valA;
        } else {
          return direction === "asc"
            ? String(valA).localeCompare(String(valB))
            : String(valB).localeCompare(String(valA));
        }
      });

      tbody.innerHTML = "";
      rows.forEach((r) => tbody.appendChild(r));
    };

    // --- Enable sorting for all responsive tables ---
    tables.forEach((table) => {
      if (table.classList.contains("rslidy-disable-sorting")) return;

      const headers = table.querySelectorAll("th");
      const tbody = table.querySelector("tbody");
      if (!tbody) return;

      const originalRows = Array.from(tbody.querySelectorAll("tr"));
      let currentSort = { column: -1, direction: "none" as "asc" | "desc" | "none" };

      headers.forEach((header, columnIndex) => {
        // --- Update cursor and tooltip dynamically ---
        const updateCursorAndTitle = (evt: MouseEvent) => {
          const rect = header.getBoundingClientRect();
          const cs = getComputedStyle(header);
          const fontSize = parseFloat(cs.fontSize) || 16;

          const leftIconLeft = rect.left + 0.3125 * fontSize;
          const leftIconRight = leftIconLeft + 1.1 * fontSize;
          const rightIconRight = rect.right - 0.3125 * fontSize;
          const rightIconLeft = rightIconRight - 1.1 * fontSize;
          const x = evt.clientX;

          const overIcon =
            (x >= leftIconLeft && x <= leftIconRight) || (x >= rightIconLeft && x <= rightIconRight);

          if (overIcon) {
            header.removeAttribute("title");
          } else {
            header.style.cursor = "pointer";
            header.title = "Click to sort";
          }
        };

        header.addEventListener("mousemove", updateCursorAndTitle);

        // --- Click handler for sorting ---
        header.addEventListener("click", (evt: MouseEvent) => {
          const rect = header.getBoundingClientRect();
          const cs = getComputedStyle(header);
          const fontSize = parseFloat(cs.fontSize) || 16;

          // Calculate clickable icon areas
          const leftIconLeft = rect.left + 0.3125 * fontSize;
          const leftIconRight = leftIconLeft + 1.1 * fontSize;
          const rightIconRight = rect.right - 0.3125 * fontSize;
          const rightIconLeft = rightIconRight - 1.1 * fontSize;

          const x = evt.clientX;
          const y = evt.clientY;

          const clickedLeftIcon = x >= leftIconLeft && x <= leftIconRight;
          const clickedRightIcon = x >= rightIconLeft && x <= rightIconRight;

          // Vertical split for top/bottom triangle detection
          const iconHeight = 1.1 * fontSize;
          const iconTop = rect.top + rect.height / 2 - iconHeight / 2;
          const clickedUpperHalf = y < iconTop + iconHeight / 2;
          const clickedLowerHalf = y >= iconTop + iconHeight / 2;

          // --- Handle direct clicks on icons ---
          if (clickedLeftIcon || clickedRightIcon) {
            evt.stopPropagation();

            // Reset all header states
            headers.forEach((h) => h.classList.remove("sorted-asc", "sorted-desc"));

            if (clickedUpperHalf) {
              // ▲ clicked → toggle ASC / default
              if (currentSort.column === columnIndex && currentSort.direction === "asc") {
                // Already ascending → reset to default
                originalRows.forEach((row) => tbody.appendChild(row));
                currentSort = { column: -1, direction: "none" };
              } else {
                // Sort ascending
                header.classList.add("sorted-asc");
                sortTable(tbody, columnIndex, "asc");
                currentSort = { column: columnIndex, direction: "asc" };
              }
            } else if (clickedLowerHalf) {
              // ▼ clicked → toggle DESC / default
              if (currentSort.column === columnIndex && currentSort.direction === "desc") {
                // Already descending → reset to default
                originalRows.forEach((row) => tbody.appendChild(row));
                currentSort = { column: -1, direction: "none" };
              } else {
                // Sort descending
                header.classList.add("sorted-desc");
                sortTable(tbody, columnIndex, "desc");
                currentSort = { column: columnIndex, direction: "desc" };
              }
            }

            return;
          }

          // --- Default header click (outside icons) ---
          headers.forEach((h) => h.classList.remove("sorted-asc", "sorted-desc"));

          let newDirection: "asc" | "desc" | "none";
          if (currentSort.column !== columnIndex) {
            newDirection = "asc";
          } else {
            if (currentSort.direction === "none") newDirection = "asc";
            else if (currentSort.direction === "asc") newDirection = "desc";
            else newDirection = "none";
          }

          currentSort = { column: columnIndex, direction: newDirection };

          if (newDirection === "none") {
            // Restore original order
            originalRows.forEach((row) => tbody.appendChild(row));
          } else {
            header.classList.add(newDirection === "asc" ? "sorted-asc" : "sorted-desc");
            sortTable(tbody, columnIndex, newDirection);
          }
        });
      });
    });
  }





  applyResponsiveTableLabels(): void {
    const tables = document.querySelectorAll("table.rslidy-responsive-table");
    tables.forEach((table) => {
      const headers = Array.from(table.querySelectorAll("thead th")).map(th =>
        th.textContent?.trim() || ""
      );
      const rows = table.querySelectorAll("tbody tr");

      rows.forEach((row) => {
        const cells = row.querySelectorAll("td");
        cells.forEach((cell, index) => {
          if (!cell.hasAttribute("data-label") && headers[index]) {
            cell.setAttribute("data-label", headers[index]);
          }
        });
      });
    });
  }
}


