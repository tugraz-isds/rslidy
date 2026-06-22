import { settings_html } from "./html-definitions";

interface Data {
  slidefont: number;
  uifont: number;
  tilt:  boolean;
  shake: boolean;
  space: boolean;
  margintap: boolean;
  showslidenumbers: boolean;
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
    this.view
        .querySelector("#rslidy-checkbox-showslidenumbers")
        .addEventListener("click", e => {
          this.toggleSlideNumbers();
          window.rslidy.toolbar.closeMenuOnSelection();
        });

    // Enable table sorting + keep desktop & mobile in sync
    this.setupTableSorting();
    // If you already call this elsewhere, you can remove it here.
    this.applyResponsiveTableLabels();
  }

  // ---
  // Description: Load settings from the localStorage
  // ---
  loadSettings(): void {
    let item: string | null;

    try {
      item = localStorage.getItem("rslidy");
    } catch(e) {
      console.log(e);
      return;
    }

    if (item === null || item === undefined) {
      const slideNumbersCheckbox = this.view.querySelector(
          "#rslidy-checkbox-showslidenumbers"
      ) as HTMLInputElement;

      slideNumbersCheckbox.checked = window.rslidy.show_slide_numbers ?? true;
      this.toggleSlideNumbers();

      return;
    }

    const data: Data = JSON.parse(item);

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

    const slideNumbersCheckbox =
        this.view.querySelector("#rslidy-checkbox-showslidenumbers") as HTMLInputElement;

    slideNumbersCheckbox.checked =
        data.showslidenumbers !== undefined
            ? data.showslidenumbers
            : window.rslidy.show_slide_numbers ?? true;

    this.toggleSlideNumbers();
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

  private toggleSlideNumbers(): void {
    const showSlideNumbers = (
        this.view.querySelector("#rslidy-checkbox-showslidenumbers") as HTMLInputElement
    ).checked;

    const contentSection = document.querySelector<HTMLElement>(
        "#rslidy-content-section"
    );

    if (!contentSection) return;

    contentSection.classList.toggle(
        "rslidy-show-slide-numbers",
        showSlideNumbers
    );

    let slideNumberDisplay = contentSection.querySelector<HTMLElement>(
        ".rslidy-slide-number-display"
    );

    if (!slideNumberDisplay) {
      slideNumberDisplay = document.createElement("div");
      slideNumberDisplay.className = "rslidy-slide-number-display";
      contentSection.appendChild(slideNumberDisplay);
    }

    const slides = document.querySelectorAll<HTMLElement>(
        "#rslidy-content-section .slide"
    );

    slideNumberDisplay.textContent = `1 / ${slides.length}`;
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
      showslidenumbers: (<HTMLInputElement>this.view.querySelector("#rslidy-checkbox-showslidenumbers")).checked
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
      th.classList.remove("rslidy-sorted-asc", "rslidy-sorted-desc")
      if (columnIndex !== null && idx === columnIndex && direction) {
        th.classList.add(direction === "asc" ? "rslidy-sorted-asc" : "rslidy-sorted-desc");
      }
    });
  }

  private syncMobileSortUIFromState(table: HTMLTableElement): void {
    const wrapper = table.previousElementSibling as HTMLElement | null;
    if (!wrapper?.classList.contains("rslidy-table-sort-mobile")) return;

    const select = wrapper.querySelector<HTMLSelectElement>("select");
    const sortIcon = wrapper.querySelector<HTMLElement>(
        ".rslidy-mobile-sort-icon"
    );

    if (!select || !sortIcon) return;

    const state = this.getSortState(table);

    if (state.columnIndex !== null) {
      select.value = String(state.columnIndex);
    } else if (!select.value && select.options.length > 0) {
      select.selectedIndex = 0;
    }

    const direction = state.direction ?? "none";

    sortIcon.dataset.dir = direction;
    sortIcon.classList.toggle("rslidy-active-sort", state.direction !== null);

    if (direction === "asc") {
      sortIcon.setAttribute("aria-label", "Sort descending");
      sortIcon.title = "Sorted ascending. Click the lower half to sort descending.";
    } else if (direction === "desc") {
      sortIcon.setAttribute("aria-label", "Restore original order");
      sortIcon.title = "Sorted descending. Click the lower half again to restore original order.";
    } else {
      sortIcon.setAttribute("aria-label", "Sort ascending or descending");
      sortIcon.title = "Click upper half for ascending, lower half for descending.";
    }
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

      // Always create the responsive wrapper, even when sorting is disabled.
      this.ensureResponsiveTableWrapper(table);

      // Still allow stacked responsive layout, but skip all sorting behaviour.
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

  private ensureResponsiveTableWrapper(table: HTMLTableElement): HTMLElement {
    let wrapper = table.parentElement;

    if (!wrapper?.classList.contains("rslidy-responsive-table-wrapper")) {
      wrapper = document.createElement("div");
      wrapper.className = "rslidy-responsive-table-wrapper";
      table.parentNode?.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    } else {
      wrapper.classList.add("rslidy-responsive-table-wrapper");
    }

    return wrapper;
  }

  private createMobileSortUI(table: HTMLTableElement): void {
    // Don't create if already exists
    if (
        table.previousElementSibling?.classList.contains(
            "rslidy-table-sort-mobile"
        )
    ) {
      return;
    }

    // Get headers from the table
    const headers = Array.from(table.querySelectorAll("th"));
    if (headers.length === 0) return;

    const wrapper = this.ensureResponsiveTableWrapper(table);

    // Create mobile sort UI
    const sortUI = document.createElement("div");
    sortUI.className =
        "rslidy-table-sort-mobile rslidy-responsive-table-text-scaling";

    // Create "Sort by:" label
    const label = document.createElement("div");
    label.textContent = "Sort by:";
    label.className = "rslidy-sort-label";

    // Create controls container
    const controlsContainer = document.createElement("div");
    controlsContainer.className = "rslidy-controls-container";

    // Create select container
    const selectContainer = document.createElement("div");
    selectContainer.className = "rslidy-select-container";

    // Create select
    const select = document.createElement("select");
    select.className = "rslidy-compact-select";

    // Add options from actual headers only.
    // There is no "Original order" option anymore.
    headers.forEach((header, index) => {
      const headerText = header.textContent?.trim() || "";
      if (!headerText) return;

      const option = document.createElement("option");
      option.value = String(index);
      option.textContent = headerText;
      select.appendChild(option);
    });

    // Create one sort button.
    // It cycles through: original -> ascending -> descending -> original.
    const iconContainer = document.createElement("div");
    iconContainer.className = "rslidy-icon-container";

    const sortIcon = document.createElement("span");
    sortIcon.className = "rslidy-mobile-sort-icon";
    sortIcon.dataset.dir = "none";
    sortIcon.setAttribute("role", "button");
    sortIcon.setAttribute("tabindex", "0");
    sortIcon.setAttribute("aria-label", "Sort ascending or descending");
    sortIcon.title = "Click upper half for ascending, lower half for descending.";

    iconContainer.appendChild(sortIcon);

    // Add select to its container
    selectContainer.appendChild(select);

    // Assemble controls container
    controlsContainer.appendChild(selectContainer);
    controlsContainer.appendChild(iconContainer);
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
    const sortIcon = wrapper.querySelector<HTMLElement>(
        ".rslidy-mobile-sort-icon"
    );

    if (!select || !sortIcon) return;

    const swallowBubble = (e: Event) => {
      e.stopPropagation();
    };

    (["click", "pointerup", "touchend", "mousedown"] as const).forEach(type => {
      wrapper.addEventListener(type, swallowBubble, { capture: false });
    });

    const getSelectedColumnIndex = (): number | null => {
      const selectedValue = select.value;

      if (selectedValue === "") return null;

      const columnIndex = Number(selectedValue);
      return Number.isNaN(columnIndex) ? null : columnIndex;
    };

    const restoreOriginalOrder = () => {
      tbody.innerHTML = "";
      originalRows.forEach(row => tbody.appendChild(row));

      const selectedColumnIndex = getSelectedColumnIndex();

      this.setSortState(table, {
        columnIndex: selectedColumnIndex,
        direction: null
      });

      this.updateDesktopSortIndicators(table, null, null);
      this.syncMobileSortUIFromState(table);
    };

    const applyDirection = (direction: "asc" | "desc") => {
      const columnIndex = getSelectedColumnIndex();
      if (columnIndex === null) return;

      this.applySortAndSync(
          table,
          tbody,
          originalRows,
          sortTable,
          columnIndex,
          direction
      );

      setTimeout(() => {
        sortIcon.blur();
        }, 10);
    };

    sortIcon.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();

      const columnIndex = getSelectedColumnIndex();
      if (columnIndex === null) return;

      const rect = sortIcon.getBoundingClientRect();
      const clickedUpperHalf = e.clientY < rect.top + rect.height / 2;
      const clickedLowerHalf = e.clientY >= rect.top + rect.height / 2;

      const current = this.getSortState(table);

      if (clickedUpperHalf) {
        if (
            current.columnIndex === columnIndex &&
            current.direction === "asc"
        ) {
          restoreOriginalOrder();
        } else {
          applyDirection("asc");
        }

        return;
      }

      if (clickedLowerHalf) {
        if (
            current.columnIndex === columnIndex &&
            current.direction === "desc"
        ) {
          restoreOriginalOrder();
        } else {
          applyDirection("desc");
        }
      }
    });

    sortIcon.addEventListener("keydown", e => {
      if (e.key !== "Enter" && e.key !== " ") return;

      e.preventDefault();
      e.stopPropagation();

      const columnIndex = getSelectedColumnIndex();
      if (columnIndex === null) return;

      const current = this.getSortState(table);

      if (current.columnIndex !== columnIndex || current.direction === null) {
        applyDirection("asc");
      } else if (current.direction === "asc") {
        applyDirection("desc");
      } else {
        restoreOriginalOrder();
      }
    });

    const onSelectUpdated = () => {
      const columnIndex = getSelectedColumnIndex();
      if (columnIndex === null) return;

      const state = this.getSortState(table);

      if (state.direction) {
        this.applySortAndSync(
            table,
            tbody,
            originalRows,
            sortTable,
            columnIndex,
            state.direction
        );
      } else {
        this.setSortState(table, {
          columnIndex,
          direction: null
        });

        this.updateDesktopSortIndicators(table, null, null);
        this.syncMobileSortUIFromState(table);
      }
    };

    select.addEventListener("input", onSelectUpdated);

    select.addEventListener("change", () => {
      setTimeout(() => select.blur(), 10);
      onSelectUpdated();
    });

    this.syncMobileSortUIFromState(table);
  }


  applyResponsiveTableLabels(): void {
    const tables = document.querySelectorAll("table.rslidy-responsive-table");

    tables.forEach((table) => {
      const headers = Array.from(table.querySelectorAll("thead th"));

      const rows = table.querySelectorAll("tbody tr");

      rows.forEach((row) => {
        const cells = row.querySelectorAll("td");

        cells.forEach((cell, index) => {
          const header = headers[index];
          if (!header) return;

          const headerText = header.textContent?.trim() || "";

          // Set mobile label
          if (!cell.hasAttribute("data-label") && headerText) {
            cell.setAttribute("data-label", headerText);
          }

          // Copy alignment/type class from header to cell
          cell.classList.remove("rslidy-text", "rslidy-numeric", "rslidy-symbol", "rslidy-date");

          if (header.classList.contains("rslidy-text")) {
            cell.classList.add("rslidy-text");
          } else if (header.classList.contains("rslidy-numeric")) {
            cell.classList.add("rslidy-numeric");
          } else if (header.classList.contains("rslidy-symbol")) {
            cell.classList.add("rslidy-symbol");
          } else if (header.classList.contains("rslidy-date")) {
            cell.classList.add("rslidy-date");
          }
        });
      });
    });
  }
}
