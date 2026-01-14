import { settings_html } from "./html-definitions";

interface Data {
  slidefont: number;
  uifont: number;
  tilt:  boolean;
  shake: boolean;
  space: boolean;
  margintap: boolean;
}

export class SettingsComponent {
  private view: HTMLElement;
  private default: number;
  private default_ui: number;
  private default_footer: number;
  private slidefont: number = 0;
  private uifont: number = 0;

  // ---------------------------------------------------------------------------
  // Shared sort state (desktop <-> mobile) per table instance
  // ---------------------------------------------------------------------------
  private sortStateByKey = new Map<
    string,
    { columnIndex: number | null; direction: "asc" | "desc" | null }
  >();

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

    // Enable table sorting + keep desktop & mobile in sync
    this.setupTableSorting();
    // If you already call this elsewhere, you can remove it here.
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
      margintap: (<HTMLInputElement>this.view.querySelector("#rslidy-checkbox-margintap")).checked
    }
    return JSON.stringify(data);
  }

  // ---
  // Description: Used for final style adaptions.
  // ---
  doCustomSettingAdaptions(): void {

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

  // ---------------------------------------------------------------------------
  // Table sorting (desktop + mobile) with shared state
  // ---------------------------------------------------------------------------

  private getTableKey(table: HTMLTableElement): string {
    if (table.id) return `id:${table.id}`;

    const existing = (table as any).dataset?.rslidyTableKey as string | undefined;
    if (existing) return existing;

    const key = `auto:${Math.random().toString(36).slice(2)}${Date.now()}`;
    (table as any).dataset.rslidyTableKey = key;
    return key;
  }

  private getSortState(table: HTMLTableElement): {
    columnIndex: number | null;
    direction: "asc" | "desc" | null;
  } {
    const key = this.getTableKey(table);
    return this.sortStateByKey.get(key) ?? { columnIndex: null, direction: null };
  }

  private setSortState(
    table: HTMLTableElement,
    next: { columnIndex: number | null; direction: "asc" | "desc" | null }
  ): void {
    const key = this.getTableKey(table);
    this.sortStateByKey.set(key, next);
  }

  private updateDesktopSortIndicators(
    table: HTMLTableElement,
    columnIndex: number | null,
    direction: "asc" | "desc" | null
  ): void {
    const headers = Array.from(table.querySelectorAll("th"));
    headers.forEach((th, idx) => {
      th.classList.remove("sorted-asc", "sorted-desc");
      if (columnIndex !== null && idx === columnIndex && direction) {
        th.classList.add(direction === "asc" ? "sorted-asc" : "sorted-desc");
      }
    });
  }

  private syncMobileSortUIFromState(table: HTMLTableElement): void {
    const wrapper = table.previousElementSibling as HTMLElement | null;
    if (!wrapper?.classList.contains("rslidy-table-sort-mobile")) return;

    const select = wrapper.querySelector<HTMLSelectElement>("select");
    if (!select) return;

    const buttons = Array.from(wrapper.querySelectorAll<HTMLButtonElement>("button"));
    if (buttons.length < 2) return;

    const ascBtn = buttons[0];
    const descBtn = buttons[1];

    const state = this.getSortState(table);

    // Select: "" is original order
    if (state.columnIndex === null) {
      select.value = "";
    } else {
      select.value = String(state.columnIndex);
    }

    // Active button highlight
    ascBtn.classList.toggle("active-sort", state.direction === "asc");
    descBtn.classList.toggle("active-sort", state.direction === "desc");
  }

  private applySortAndSync(
    table: HTMLTableElement,
    tbody: HTMLElement,
    originalRows: HTMLTableRowElement[],
    sortTable: (
      tbody: Element,
      columnIndex: number,
      direction: "asc" | "desc"
    ) => void,
    columnIndex: number | null,
    direction: "asc" | "desc" | null
  ): void {
    // Restore original order
    if (columnIndex === null || direction === null) {
      tbody.innerHTML = "";
      originalRows.forEach(row => tbody.appendChild(row));
      this.setSortState(table, { columnIndex: null, direction: null });
      this.updateDesktopSortIndicators(table, null, null);
      this.syncMobileSortUIFromState(table);
      return;
    }

    // Apply sort
    sortTable(tbody, columnIndex, direction);

    // Save + sync UIs
    this.setSortState(table, { columnIndex, direction });
    this.updateDesktopSortIndicators(table, columnIndex, direction);
    this.syncMobileSortUIFromState(table);
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
    tables.forEach((tableEl) => {
      const table = tableEl as HTMLTableElement;
      if (table.classList.contains("rslidy-disable-sorting")) return;

      const headers = Array.from(table.querySelectorAll<HTMLTableCellElement>("th"));
      const tbody = table.querySelector("tbody") as HTMLElement | null;
      if (!tbody) return;

      const originalRows = Array.from(tbody.querySelectorAll("tr"));

      // Create mobile sort UI if it doesn't exist
      this.createMobileSortUI(table);

      // Setup mobile sorting (now synced)
      this.setupMobileSortingUI(table, tbody, originalRows, sortTable);

      // Track desktop state per table (synced to mobile)
      // Start with "no sort" and let UI drive it.
      this.setSortState(table, { columnIndex: null, direction: null });
      this.syncMobileSortUIFromState(table);

      headers.forEach((header, columnIndex) => {
        const headerText = (header.textContent || "").trim();
        if (!headerText) {
          header.classList.add("rslidy-no-sort");
          return;
        }
        if (header.classList.contains("rslidy-no-sort")) return;

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
        header.addEventListener(
          "click",
          (evt: MouseEvent) => {
            // Prevent slide navigation handlers from receiving this click
            evt.preventDefault();
            evt.stopPropagation();
            (evt as any).stopImmediatePropagation?.();
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

          const current = this.getSortState(table);

          // --- Handle direct clicks on icons ---
          if (clickedLeftIcon || clickedRightIcon) {
            evt.stopPropagation();

            if (clickedUpperHalf) {
              // ▲ clicked → toggle ASC / default
              if (current.columnIndex === columnIndex && current.direction === "asc") {
                // reset
                this.applySortAndSync(table, tbody, originalRows, sortTable, null, null);
              } else {
                this.applySortAndSync(table, tbody, originalRows, sortTable, columnIndex, "asc");
              }
            } else if (clickedLowerHalf) {
              // ▼ clicked → toggle DESC / default
              if (current.columnIndex === columnIndex && current.direction === "desc") {
                // reset
                this.applySortAndSync(table, tbody, originalRows, sortTable, null, null);
              } else {
                this.applySortAndSync(table, tbody, originalRows, sortTable, columnIndex, "desc");
              }
            }

            return;
          }

          // --- Default header click (outside icons): cycle none -> asc -> desc -> none ---
          let nextDir: "asc" | "desc" | null;

          if (current.columnIndex !== columnIndex) {
            nextDir = "asc";
          } else {
            if (current.direction === null) nextDir = "asc";
            else if (current.direction === "asc") nextDir = "desc";
            else nextDir = null;
          }

          if (nextDir === null) {
            this.applySortAndSync(table, tbody, originalRows, sortTable, null, null);
          } else {
            this.applySortAndSync(table, tbody, originalRows, sortTable, columnIndex, nextDir);
          }
        });
      });
    });

    // Sync mobile UI after resizes (desktop sort should be visible on mobile UI)
    window.addEventListener("resize", () => {
      document
        .querySelectorAll<HTMLTableElement>("table.rslidy-responsive-table")
        .forEach(t => this.syncMobileSortUIFromState(t));
    });
  }

  private createMobileSortUI(table: HTMLTableElement): void {
    // Don't create if already exists
    if (table.previousElementSibling?.classList.contains('rslidy-table-sort-mobile')) {
      return;
    }

    // Get headers from the table
    const headers = Array.from(table.querySelectorAll('th'));
    if (headers.length === 0) return;

    // Create wrapper if needed
    let wrapper = table.parentElement;
    if (!wrapper?.classList.contains('rslidy-responsive-table-wrapper')) {
      wrapper = document.createElement('div');
      wrapper.className = 'rslidy-responsive-table-wrapper';
      table.parentNode?.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    }

    // Create mobile sort UI
    const sortUI = document.createElement('div');
    sortUI.className = 'rslidy-table-sort-mobile rslidy-responsive-table-text-scaling';

    // Create "Sort by:" label
    const label = document.createElement('div');
    label.textContent = 'Sort by:';
    label.className = 'sort-label';

    // Create controls container
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'controls-container';

    // Create select container
    const selectContainer = document.createElement('div');
    selectContainer.className = 'select-container';

    // Create select
    const select = document.createElement('select');
    select.className = 'compact-select';

    // Add "Original order" option
    const resetOption = document.createElement('option');
    resetOption.value = "";
    resetOption.textContent = "Original order";
    select.appendChild(resetOption);

    // Add options from actual headers (full text)
    headers.forEach((header, index) => {
      const headerText = header.textContent?.trim() || "";
      if (!headerText) return;

      const option = document.createElement('option');
      option.value = String(index);
      option.textContent = headerText;
      select.appendChild(option);
    });

    // Create direction buttons container (ALWAYS 2 buttons)
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'buttons-container';

    // Create direction buttons (ALWAYS 2 buttons)
    const ascButton = document.createElement('button');
    ascButton.type = 'button';
    ascButton.dataset.dir = 'asc';
    ascButton.setAttribute('aria-label', 'Sort ascending');
    ascButton.textContent = '▲';

    const descButton = document.createElement('button');
    descButton.type = 'button';
    descButton.dataset.dir = 'desc';
    descButton.setAttribute('aria-label', 'Sort descending');
    descButton.textContent = '▼';

    // ALWAYS add both buttons
    buttonsContainer.appendChild(ascButton);
    buttonsContainer.appendChild(descButton);

    // Add select to its container
    selectContainer.appendChild(select);

    // Assemble controls container
    controlsContainer.appendChild(selectContainer);
    controlsContainer.appendChild(buttonsContainer);

    // Assemble sort UI
    sortUI.appendChild(label);
    sortUI.appendChild(controlsContainer);

    // Insert before table
    wrapper.insertBefore(sortUI, table);
  }

  private setupMobileSortingUI(
    table: HTMLTableElement,
    tbody: HTMLElement,
    originalRows: HTMLTableRowElement[],
    sortTable: (
      tbody: Element,
      columnIndex: number,
      direction: "asc" | "desc"
    ) => void
  ): void {
    const wrapper = table.previousElementSibling as HTMLElement | null;
    if (!wrapper?.classList.contains("rslidy-table-sort-mobile")) return;

    const select = wrapper.querySelector<HTMLSelectElement>("select");
    if (!select) return;

    const buttons = Array.from(
      wrapper.querySelectorAll<HTMLButtonElement>("button")
    );
    if (buttons.length < 2) return;

    const ascBtn = buttons[0];
    const descBtn = buttons[1];

    // -------------------------------------------------------------------------
    // Event shield: prevent slide navigation from taps inside the sort UI
    // (Firefox can trigger navigation on pointer/touch when the native select
    // picker closes, even if you stop only "click" on the select).
    // -------------------------------------------------------------------------
    const swallow = (e: Event) => {
      // Do NOT preventDefault() here globally, otherwise the select might not open.

      e.stopPropagation();
      (e as any).stopImmediatePropagation?.();
    };

    const swallowBubble = (e: Event) => {
      e.stopPropagation();
    };

    (["click", "pointerup", "touchend", "mousedown"] as const).forEach(type => {
      wrapper.addEventListener(type, swallowBubble, { capture: false });
    });

    const restoreOriginalOrder = () => {
      this.applySortAndSync(table, tbody, originalRows, sortTable, null, null);
    };

    const applyDir = (dir: "asc" | "desc") => {
      let selectedValue = select.value;

      // Firefox mobile: value may not yet be committed
      if (selectedValue === "" && select.selectedIndex > 0) {
        selectedValue = select.options[select.selectedIndex].value;
      }

      if (selectedValue === "") return;

      const columnIndex = Number(selectedValue);
      if (Number.isNaN(columnIndex)) return;

      const current = this.getSortState(table);

      // Same column + same direction → reset
      if (current.columnIndex === columnIndex && current.direction === dir) {
        select.value = "";
        restoreOriginalOrder();
        return;
      }

      this.applySortAndSync(
        table,
        tbody,
        originalRows,
        sortTable,
        columnIndex,
        dir
      );

      // Remove focus ring on mobile
      setTimeout(() => {
        ascBtn.blur();
        descBtn.blur();
      }, 10);
    };

    // -------------------------------------------------------------------------
    // Button handling (▲ / ▼)
    // -------------------------------------------------------------------------
    ascBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      applyDir("asc");
    });

    descBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      applyDir("desc");
    });

    // -------------------------------------------------------------------------
    // Select handling
    // -------------------------------------------------------------------------
    const onSelectUpdated = () => {
      if (select.value === "") {
        restoreOriginalOrder();
        return;
      }

      const state = this.getSortState(table);

      if (state.direction) {
        this.applySortAndSync(
          table,
          tbody,
          originalRows,
          sortTable,
          Number(select.value),
          state.direction
        );
      } else {
        ascBtn.classList.remove("active-sort");
        descBtn.classList.remove("active-sort");
        this.setSortState(table, {
          columnIndex: Number(select.value),
          direction: null
        });
      }
    };

    // Eager update (important for Firefox)
    select.addEventListener("input", onSelectUpdated);

    select.addEventListener("change", () => {
      // Do NOT stopPropagation here; wrapper already shields the event.
      setTimeout(() => select.blur(), 10);
      onSelectUpdated();
    });

    // Initial sync so mobile UI reflects desktop state
    this.syncMobileSortUIFromState(table);
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
