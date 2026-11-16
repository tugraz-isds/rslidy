
import { settings_html } from "./html-definitions";

interface Data {
  slidefont: number;
  uifont: number;
  tilt: boolean;
  shake: boolean;
  space: boolean;
  margintap: boolean;
  showslidenumbers: boolean;
  pinslidenumbers?: boolean;
}

export class SettingsComponent {
  private view: HTMLElement;
  private default: number;
  private default_ui: number;
  private default_footer: number;
  private slidefont: number = 0;
  private uifont: number = 0;

  // Shared sort state (desktop <-> mobile)
  private sortStateByKey = new Map<
      string,
      { columnIndex: number | null; direction: "asc" | "desc" | null }
  >();

  constructor() {
    window.addEventListener("resize", () => {
      requestAnimationFrame(() => {
        this.updateSlideNumberPosition();
      });
    });

    this.view =
        window.rslidy.utils.prependHtmlString(document.body, settings_html);

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
        .addEventListener("change", () => {
          this.toggleSlideNumbers();
          window.rslidy.toolbar.closeMenuOnSelection();
        });
    this.view
        .querySelector("#rslidy-checkbox-pinslidenumbers")
        .addEventListener("change", () => {
          const pinCheckbox = this.view.querySelector(
              "#rslidy-checkbox-pinslidenumbers"
          ) as HTMLInputElement;

          window.rslidy.pin_slide_numbers = pinCheckbox.checked;
          this.toggleSlideNumbers();
          window.rslidy.toolbar.closeMenuOnSelection();
        });

    this.setupTableSorting();
    this.applyResponsiveTableLabels();
  }

  // Load settings from localStorage
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

      const pinCheckbox = this.view.querySelector(
          "#rslidy-checkbox-pinslidenumbers"
      ) as HTMLInputElement;

      pinCheckbox.checked = window.rslidy.pin_slide_numbers ?? false;

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

    const pinCheckbox = this.view.querySelector(
        "#rslidy-checkbox-pinslidenumbers"
    ) as HTMLInputElement;

    pinCheckbox.checked =
        data.pinslidenumbers !== undefined
            ? data.pinslidenumbers
            : window.rslidy.pin_slide_numbers ?? false;

    this.toggleSlideNumbers();
  }

  // Save settings to localStorage
  public saveSettings(): void {
    try {
      localStorage.removeItem("rslidy");
      localStorage.setItem("rslidy", this.generateJSON());
    } catch(e) {
      console.log(e);
    }
  }

  private toggleSlideNumbers(): void {
    const showCheckbox = this.view.querySelector(
        "#rslidy-checkbox-showslidenumbers"
    ) as HTMLInputElement;

    const pinCheckbox = this.view.querySelector(
        "#rslidy-checkbox-pinslidenumbers"
    ) as HTMLInputElement;

    const pinLabel = this.view.querySelector(
        "#rslidy-checkbox-pinslidenumbers-text"
    ) as HTMLElement;

    const slideContainer = document.getElementById(
        "rslidy-slide-container"
    );

    if (!slideContainer) return;

    const showSlideNumbers = showCheckbox.checked;

    pinCheckbox.disabled = !showSlideNumbers;
    pinLabel.classList.toggle("rslidy-disabled", !showSlideNumbers);
    pinLabel.setAttribute("aria-disabled", String(!showSlideNumbers));

    window.rslidy.pin_slide_numbers = pinCheckbox.checked;

    slideContainer.classList.toggle(
        "rslidy-show-slide-numbers",
        showSlideNumbers
    );

    slideContainer.classList.toggle(
        "rslidy-pin-slide-numbers",
        showSlideNumbers && pinCheckbox.checked
    );

    this.updateSlideNumberPosition(
        window.rslidy.content.getCurrentSlideIndex()
    );
  }

  generateJSON(): string {
    const themeSelect = this.view.querySelector<HTMLSelectElement>(
        "#rslidy-select-theme"
    );

    const data: Data = {
      slidefont: this.slidefont,
      uifont: this.uifont,
      tilt: (<HTMLInputElement>this.view.querySelector("#rslidy-checkbox-tilt")).checked,
      shake: (<HTMLInputElement>this.view.querySelector("#rslidy-checkbox-shake")).checked,
      space: (<HTMLInputElement>this.view.querySelector("#rslidy-checkbox-space")).checked,
      margintap: (<HTMLInputElement>this.view.querySelector("#rslidy-checkbox-margintap")).checked,
      showslidenumbers: (<HTMLInputElement>this.view.querySelector("#rslidy-checkbox-showslidenumbers")).checked,
      pinslidenumbers: (this.view.querySelector("#rslidy-checkbox-pinslidenumbers") as HTMLInputElement).checked
    };

    return JSON.stringify(data);
  }

  doCustomSettingAdaptions(): void {
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

  public updateSlideNumberPosition(slideIndex?: number): void {
    const container = document.getElementById(
        "rslidy-slide-container"
    );
    const contentSection = document.getElementById(
        "rslidy-content-section"
    );
    const strip = document.getElementById(
        "rslidy-slide-number-strip"
    );
    const display = document.querySelector<HTMLElement>(
        ".rslidy-slide-number-display"
    );
    const showCheckbox = this.view.querySelector<HTMLInputElement>(
        "#rslidy-checkbox-showslidenumbers"
    );

    if (
        !container ||
        !contentSection ||
        !strip ||
        !display ||
        !showCheckbox
    ) {
      return;
    }

    const currentIndex =
        slideIndex ?? window.rslidy.content.getCurrentSlideIndex();

    const showNumbers = showCheckbox.checked;
    const pinned = showNumbers && window.rslidy.pin_slide_numbers;

    const slides = Array.from(
        contentSection.querySelectorAll<HTMLElement>(".slide")
    );

    container.classList.toggle(
        "rslidy-active-titleslide",
        slides[currentIndex]?.classList.contains(
            "rslidy-titleslide"
        ) ?? false
    );

    display.textContent = `${currentIndex + 1} / ${slides.length}`;

    container.classList.toggle(
        "rslidy-show-slide-numbers",
        showNumbers
    );

    container.classList.toggle(
        "rslidy-pin-slide-numbers",
        pinned
    );

    slides.forEach((slide, index) => {
      slide.classList.toggle(
          "rslidy-unpinned-active-slide",
          showNumbers && !pinned && index === currentIndex
      );
    });

    if (display.parentElement !== strip) {
      strip.appendChild(display);
    }

    if (pinned || !showNumbers) {
      if (strip.parentElement !== container) {
        container.appendChild(strip);
      }
    } else {
      if (strip.parentElement !== contentSection) {
        contentSection.appendChild(strip);
      }
    }

    document.getElementById(
        "rslidy-slide-scroll-spacer"
    )?.remove();

    contentSection.style.removeProperty(
        "--rslidy-slide-number-strip-height"
    );
  }

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

    this.updateSlideNumberFontScale();

    if(e) e.preventDefault();
  }

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

    if(this.default_footer < 1 &&
        parseFloat((<HTMLElement>footer).style.fontSize) > this.default_footer)
      (<HTMLElement>footer).style.fontSize = this.default_footer + "em";

    setTimeout(() => { this.checkToolbarOverflow(); }, 1000);

    if(e) e.preventDefault();
  }

  public checkToolbarOverflow(): void {
    var ov = document.querySelector("#rslidy-button-overview").getBoundingClientRect();
    var toc = document.querySelector("#rslidy-button-toc").getBoundingClientRect();

    console.log(ov.top + " - " + toc.top);

    if(ov.top == toc.top)
      return;
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
    return this.sortStateByKey.get(key) ?? {
      columnIndex: null,
      direction: null
    };
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
      th.classList.remove("rslidy-sorted-asc", "rslidy-sorted-desc");

      if (columnIndex !== null && idx === columnIndex && direction) {
        th.classList.add(
            direction === "asc"
                ? "rslidy-sorted-asc"
                : "rslidy-sorted-desc"
        );
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
    sortIcon.classList.toggle(
        "rslidy-active-sort",
        state.direction !== null
    );

    if (direction === "asc") {
      sortIcon.setAttribute("aria-label", "Sort descending");
      sortIcon.title =
          "Sorted ascending. Click the lower half to sort descending.";
    } else if (direction === "desc") {
      sortIcon.setAttribute("aria-label", "Restore original order");
      sortIcon.title =
          "Sorted descending. Click the lower half again to restore original order.";
    } else {
      sortIcon.setAttribute("aria-label", "Sort ascending or descending");
      sortIcon.title =
          "Click upper half for ascending, lower half for descending.";
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
    if (columnIndex === null || direction === null) {
      tbody.innerHTML = "";
      originalRows.forEach(row => tbody.appendChild(row));

      this.setSortState(table, {
        columnIndex: null,
        direction: null
      });

      this.updateDesktopSortIndicators(table, null, null);
      this.syncMobileSortUIFromState(table);
      return;
    }

    sortTable(tbody, columnIndex, direction);

    this.setSortState(table, { columnIndex, direction });
    this.updateDesktopSortIndicators(table, columnIndex, direction);
    this.syncMobileSortUIFromState(table);
  }

  private setupTableSorting(): void {
    const tables = document.querySelectorAll("table.rslidy-responsive-table");

    const normalize = (text: string) => {
      text = text.trim();

      if (/^-?\d+(\.\d+)?$/.test(text)) return parseFloat(text);

      if (text.includes("✔")) return 1;
      if (text.includes("✘")) return 0;

      const timestamp = Date.parse(text);
      if (!isNaN(timestamp)) return timestamp;

      return text.toLowerCase();
    };

    const sortTable = (
        tbody: Element,
        columnIndex: number,
        direction: "asc" | "desc"
    ) => {
      const rows = Array.from(tbody.querySelectorAll("tr"));

      rows.sort((a, b) => {
        const cellA = a.children[columnIndex]?.textContent || "";
        const cellB = b.children[columnIndex]?.textContent || "";

        const valA = normalize(cellA);
        const valB = normalize(cellB);

        if (typeof valA === "number" && typeof valB === "number") {
          return direction === "asc"
              ? valA - valB
              : valB - valA;
        }

        return direction === "asc"
            ? String(valA).localeCompare(String(valB))
            : String(valB).localeCompare(String(valA));
      });

      tbody.innerHTML = "";
      rows.forEach(row => tbody.appendChild(row));
    };

    tables.forEach((tableEl) => {
      const table = tableEl as HTMLTableElement;

      // Always create the responsive wrapper
      this.ensureResponsiveTableWrapper(table);

      const headers = Array.from(
          table.querySelectorAll<HTMLTableCellElement>("thead th")
      );

      // Wrap header text without changing the sort icons
      headers.forEach((header) => {
        const fullText = header.textContent?.trim() || "";

        if (!fullText) return;

        if (!header.querySelector(".rslidy-header-text")) {
          const textSpan = document.createElement("span");
          textSpan.className = "rslidy-header-text";

          while (header.firstChild) {
            textSpan.appendChild(header.firstChild);
          }

          header.appendChild(textSpan);

          // Show full text only when truncated
          textSpan.addEventListener("mouseenter", () => {
            if (textSpan.scrollWidth > textSpan.clientWidth) {
              textSpan.title = fullText;
            } else {
              textSpan.removeAttribute("title");
            }
          });

          textSpan.addEventListener("mouseleave", () => {
            textSpan.removeAttribute("title");
          });
        }

        // Invisible hover target over the existing ::before icon
        // Does not replace or modify the icon itself
        if (
            !table.classList.contains("rslidy-disable-sorting") &&
            !header.classList.contains("rslidy-no-sort") &&
            !header.querySelector(".rslidy-sort-icon-hover")
        ) {
          const iconHover = document.createElement("span");
          iconHover.className = "rslidy-sort-icon-hover";
          iconHover.title = "Click to sort";
          iconHover.setAttribute("aria-hidden", "true");
          header.appendChild(iconHover);
        }
      });

      // Preserve non-sortable table behaviour
      if (table.classList.contains("rslidy-disable-sorting")) return;

      const tbody = table.querySelector("tbody") as HTMLElement | null;
      if (!tbody) return;

      const originalRows = Array.from(tbody.querySelectorAll("tr"));

      this.createMobileSortUI(table);
      this.setupMobileSortingUI(table, tbody, originalRows, sortTable);

      this.setSortState(table, {
        columnIndex: null,
        direction: null
      });
      this.syncMobileSortUIFromState(table);

      headers.forEach((header, columnIndex) => {
        const headerText = (header.textContent || "").trim();

        if (!headerText) {
          header.classList.add("rslidy-no-sort");
          return;
        }

        if (header.classList.contains("rslidy-no-sort")) return;

        // Existing click handler: leave sorting behaviour unchanged
        header.addEventListener("click", (evt: MouseEvent) => {
          evt.preventDefault();
          evt.stopPropagation();
          (evt as any).stopImmediatePropagation?.();

          const rect = header.getBoundingClientRect();
          const cs = getComputedStyle(header);
          const fontSize = parseFloat(cs.fontSize) || 16;

          const leftIconLeft = rect.left + 0.3125 * fontSize;
          const leftIconRight = leftIconLeft + 1.1 * fontSize;
          const rightIconRight = rect.right - 0.3125 * fontSize;
          const rightIconLeft = rightIconRight - 1.1 * fontSize;

          const x = evt.clientX;
          const y = evt.clientY;

          const clickedLeftIcon =
              x >= leftIconLeft && x <= leftIconRight;

          const clickedRightIcon =
              x >= rightIconLeft && x <= rightIconRight;

          const iconHeight = 1.1 * fontSize;
          const iconTop =
              rect.top + rect.height / 2 - iconHeight / 2;

          const clickedUpperHalf =
              y < iconTop + iconHeight / 2;

          const clickedLowerHalf =
              y >= iconTop + iconHeight / 2;

          const current = this.getSortState(table);

          if (clickedLeftIcon || clickedRightIcon) {
            evt.stopPropagation();

            if (clickedUpperHalf) {
              if (
                  current.columnIndex === columnIndex &&
                  current.direction === "asc"
              ) {
                this.applySortAndSync(
                    table, tbody, originalRows, sortTable, null, null
                );
              } else {
                this.applySortAndSync(
                    table, tbody, originalRows, sortTable,
                    columnIndex, "asc"
                );
              }
            } else if (clickedLowerHalf) {
              if (
                  current.columnIndex === columnIndex &&
                  current.direction === "desc"
              ) {
                this.applySortAndSync(
                    table, tbody, originalRows, sortTable, null, null
                );
              } else {
                this.applySortAndSync(
                    table, tbody, originalRows, sortTable,
                    columnIndex, "desc"
                );
              }
            }

            return;
          }

          let nextDir: "asc" | "desc" | null;

          if (current.columnIndex !== columnIndex) {
            nextDir = "asc";
          } else if (current.direction === null) {
            nextDir = "asc";
          } else if (current.direction === "asc") {
            nextDir = "desc";
          } else {
            nextDir = null;
          }

          if (nextDir === null) {
            this.applySortAndSync(
                table, tbody, originalRows, sortTable, null, null
            );
          } else {
            this.applySortAndSync(
                table, tbody, originalRows, sortTable,
                columnIndex, nextDir
            );
          }
        });
      });
    });

    window.addEventListener("resize", () => {
      document
          .querySelectorAll<HTMLTableElement>("table.rslidy-responsive-table")
          .forEach(table => this.syncMobileSortUIFromState(table));
    });
  }

  private ensureResponsiveTableWrapper(
      table: HTMLTableElement
  ): HTMLElement {
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

  private updateSlideNumberFontScale(): void {
    const firstSlide = document.querySelector<HTMLElement>(
        "#rslidy-content-section .slide"
    );

    const currentFontSize = firstSlide
        ? parseFloat(firstSlide.style.fontSize)
        : this.default;

    const slideFontSize = Number.isNaN(currentFontSize)
        ? this.default
        : currentFontSize;

    document.documentElement.style.setProperty(
        "--rslidy-slide-number-font-scale",
        String(slideFontSize / this.default)
    );
  }

  private createMobileSortUI(table: HTMLTableElement): void {
    if (
        table.previousElementSibling?.classList.contains(
            "rslidy-table-sort-mobile"
        )
    ) {
      return;
    }

    const headers = Array.from(table.querySelectorAll("th"));
    if (headers.length === 0) return;

    const wrapper = this.ensureResponsiveTableWrapper(table);

    const sortUI = document.createElement("div");
    sortUI.className =
        "rslidy-table-sort-mobile rslidy-responsive-table-text-scaling";

    const label = document.createElement("div");
    label.textContent = "Sort by:";
    label.className = "rslidy-sort-label";

    const controlsContainer = document.createElement("div");
    controlsContainer.className = "rslidy-controls-container";

    const selectContainer = document.createElement("div");
    selectContainer.className = "rslidy-select-container";

    const select = document.createElement("select");
    select.className = "rslidy-compact-select";

    headers.forEach((header, index) => {
      const headerText = header.textContent?.trim() || "";
      if (!headerText) return;

      const option = document.createElement("option");
      option.value = String(index);
      option.textContent = headerText;
      select.appendChild(option);
    });

    const iconContainer = document.createElement("div");
    iconContainer.className = "rslidy-icon-container";

    const sortIcon = document.createElement("span");
    sortIcon.className = "rslidy-mobile-sort-icon";
    sortIcon.dataset.dir = "none";
    sortIcon.setAttribute("role", "button");
    sortIcon.setAttribute("tabindex", "0");
    sortIcon.setAttribute("aria-label", "Sort ascending or descending");
    sortIcon.title =
        "Click upper half for ascending, lower half for descending.";

    iconContainer.appendChild(sortIcon);
    selectContainer.appendChild(select);
    controlsContainer.appendChild(selectContainer);
    controlsContainer.appendChild(iconContainer);
    sortUI.appendChild(label);
    sortUI.appendChild(controlsContainer);

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

    (["click", "pointerup", "touchend", "mousedown"] as const)
        .forEach(type => {
          wrapper.addEventListener(type, swallowBubble, {
            capture: false
          });
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
      const clickedUpperHalf =
          e.clientY < rect.top + rect.height / 2;
      const clickedLowerHalf =
          e.clientY >= rect.top + rect.height / 2;

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

      if (
          current.columnIndex !== columnIndex ||
          current.direction === null
      ) {
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
    const tables = document.querySelectorAll(
        "table.rslidy-responsive-table"
    );

    tables.forEach((table) => {
      const headers = Array.from(
          table.querySelectorAll("thead th")
      );

      const rows = table.querySelectorAll("tbody tr");

      // Numeric is the default type
      headers.forEach((header) => {
        if (
            !header.classList.contains("rslidy-text") &&
            !header.classList.contains("rslidy-numeric") &&
            !header.classList.contains("rslidy-symbol") &&
            !header.classList.contains("rslidy-date")
        ) {
          header.classList.add("rslidy-numeric");
        }
      });

      rows.forEach((row) => {
        const cells = row.querySelectorAll("td");

        cells.forEach((cell, index) => {
          const header = headers[index];
          if (!header) return;

          const headerText = header.textContent?.trim() || "";

          if (!cell.hasAttribute("data-label") && headerText) {
            cell.setAttribute("data-label", headerText);
          }

          cell.classList.remove(
              "rslidy-text",
              "rslidy-numeric",
              "rslidy-symbol",
              "rslidy-date"
          );

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
