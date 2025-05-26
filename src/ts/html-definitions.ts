import * as i from "./icon-definitions";
import * as t from "./text.en";


export const spinner_html = `
<div id="rslidy-spinner" class="rslidy-spinner-overlay">
<div class="rslidy-spinner"></div></div>`;

export const help_text = `
<div id="rslidy-help" class="rslidy-help-overlay rslidy-ui"
role="region" aria-label="Help" tabindex="0">
  <div id="rslidy-help-popup">
  <h1>
    Rslidy Version 1.0.1
    <a target="_blank" href="https://github.com/tugraz-isds/rslidy">GitHub</a>
  </h1>
  <a class="rslidy-help-close" title="`+t.imageviewer[3]+`" href="#">&times;</a>
  <h2>`+t.help[0]+`</h2>
    <div class="rslidy-help-content">
    <table id="rslidy-help-table">
      <tr>
        <th>`+t.help[1]+`</th>
        <th>`+t.help[2]+`</th>
        <th>`+t.help[3]+`</th>
        <th>`+t.help[4]+`</th>
        <th>`+t.help[5]+`</th>
      </tr>
      <tr>
        <td>`+t.help[6]+`</td>
        <td>
          <span class="rslidy-icon">`+i.overview_icon+`</span>
        </td>
        <td>`+t.help[7]+`</td>
        <td></td>
        <td>`+t.help[8]+`</td>
      </tr>
      <tr>
        <td>`+t.help[9]+`</td>
        <td>
          <span class="rslidy-icon">`+i.hide_icon+`</span>
        </td>
        <td>`+t.help[10]+`</td>
        <td></td>
        <td>`+t.help[11]+`</td>
      </tr>
      <tr>
        <td>`+t.help[12]+`</td>
        <td>
          <span class="rslidy-icon">`+i.all_slides_icon+`</span>
          <span class="rslidy-icon">`+i.one_slide_icon+`</span>
        </td>
        <td>`+t.help[13]+`</td>
        <td></td>
        <td>`+t.help[14]+`</td>
      </tr>
      <tr>
        <td>`+t.help[15]+`</td>
        <td>
          <span class="rslidy-icon rslidy-mirror">`+i.last_icon+`</span>
        </td>
        <td>`+t.help[16]+`</td>
        <td>`+t.help[17]+`</td>
        <td>`+t.help[18]+`</td>
      </tr>
      <tr>
        <td>`+t.help[19]+`</td>
        <td>
          <span class="rslidy-icon rslidy-mirror">`+i.next_icon+`</span>
        </td>
        <td>`+t.help[20]+`</td>
        <td>`+t.help[21]+`</td>
        <td>`+t.help[22]+`</td>
      </tr>
      <tr>
        <td>`+t.help[23]+`</td>
        <td>
          <span class="rslidy-icon">`+i.next_icon+`</span>
        </td>
        <td>`+t.help[24]+`</td>
        <td>`+t.help[25]+`</td>
        <td>`+t.help[26]+`</td>
      </tr>
      <tr>
        <td>`+t.help[27]+`</td>
        <td>
          <span class="rslidy-icon">`+i.last_icon+`</span>
        </td>
        <td>`+t.help[28]+`</td>
        <td></td>
        <td>`+t.help[29]+`</td>
      </tr>
      <tr>
        <td>`+t.help[30]+`</td>
        <td>
          <span class="rslidy-icon">`+i.print_icon+`</span>
        </td>
        <td>`+t.help[31]+`</td>
        <td></td>
        <td>`+t.help[32]+`</td>
      </tr>
      <tr>
        <td>`+t.help[33]+`</td>
        <td>
          <span class="rslidy-icon">`+i.settings_icon+`</span>
        </td>
        <td>`+t.help[34]+`</td>
        <td></td>
        <td>`+t.help[35]+`</td>
      </tr>
      <tr>
        <td>`+t.help[36]+`</td>
        <td>
          <span class="rslidy-icon">`+i.help_icon+`</span>
        </td>
        <td>`+t.help[37]+`</td>
        <td></td>
        <td>`+t.help[38]+`</td>
      </tr>
      <tr>
        <td>`+t.help[39]+`</td>
        <td>
          <span class="rslidy-icon">`+i.toc_icon+`</span>
        </td>
        <td>`+t.help[40]+`</td>
        <td></td>
        <td>`+t.help[41]+`</td>
      </tr>
      <tr>
        <td>`+t.help[42]+`</td>
        <td>
          <span class="rslidy-icon">`+i.font_minus_icon+`</span>
        </td>
        <td>`+t.help[43]+`</td>
        <td></td>
        <td>`+t.help[44]+`</td>
      </tr>
      <tr>
        <td>`+t.help[45]+`</td>
        <td>
          <span class="rslidy-icon">`+i.font_reset_icon+`</span>
        </td>
        <td>`+t.help[46]+`</td>
        <td></td>
        <td>`+t.help[47]+`</td>
      </tr>
      <tr>
        <td>`+t.help[48]+`</td>
        <td>
          <span class="rslidy-icon">`+i.font_plus_icon+`</span>
        </td>
        <td>`+t.help[49]+`</td>
        <td></td>
        <td>`+t.help[50]+`</td>
      </tr>
      <tr>
        <td>`+t.help[51]+`</td>
        <td></td>
        <td>`+t.help[52]+`</td>
        <td></td>
        <td>`+t.help[53]+`</td>
      </tr>
      <tr>
        <td>`+t.help[54]+`</td>
        <td></td>
        <td>`+t.help[55]+`</td>
        <td></td>
        <td>`+t.help[56]+`</td>
      </tr>
    </table>
    </div>
  </div>
</div>`;

export const content_section = `
<div id="rslidy-row-flex" aria-label="Rslidy slide deck, press h for help">
  <nav id="rslidy-overview-slides" class="rslidy-ui" tabindex="0" aria-label="slide overview"></nav>
  <main id="rslidy-content-section" role="region" aria-label="Slides">
    <div id="rslidy-trapezoid-wrapper-display" class="rslidy-ui">
      <div id="rslidy-tb-display-trapezoid">
        <button id="rslidy-button-current" class="rslidy-display-button" title="`+t.toolbar[12]+`">
          <span class="rslidy-tb-button rslidy-tb-display">`+i.one_slide_icon+`</span>
        </button>
      </div>
    </div>
  </main>
  <nav id="rslidy-overview-toc" class="rslidy-ui" tabindex="0" aria-label="table of contents"></nav>
</div>`;

export const notes_text = `
<div id="rslidy-speakernotes-overlay"></div>`

export const image_viewer = `
<div class="rslidy-image-viewer rslidy-ui">
  <div class="rslidy-image-viewer-container">
    <img draggable="false" class="rslidy-image-viewer-content">
  </div>

  <span title="`+t.imageviewer[0]+`" class="rslidy-iv-button rslidy-iv-zoom-reset">
    &#x25A2;
  </span>
  <span title="`+t.imageviewer[1]+`" class="rslidy-iv-button rslidy-iv-zoom-in">
    &plus;
  </span>
  <span title="`+t.imageviewer[2]+`" class="rslidy-iv-button rslidy-iv-zoom-out">
    &minus;
  </span>
  <span title="`+t.imageviewer[3]+`" class="rslidy-iv-button rslidy-iv-close">
    &times;
  </span>
</div>`;

export const thumbnail_html = (idx, xofy, slide, suffix) => `
<div class="rslidy-slide-thumbnail${suffix}" data-slideindex="${idx}" role="region">
<div class="rslidy-thumbnail-caption rslidy-noselect"><a class="rslidy-slide-link" aria-label="Slide ${xofy}" data-slideindex="${idx}" href="#${idx+1}">${xofy}</a></div>
  <div class="rslidy-slide-clickelement" data-slideindex="${idx}">
    <div class="rslidy-overview-item${suffix} rslidy-noselect" data-slideindex="${idx}">${slide}</div>
  </div>
</div>`;

export const link_html = (idx, title) => `
<div class="rslidy-slide-link" data-slideindex="${idx}"><a href="#${idx+1}">${title}</a></div>`;

export const preview_html = (idx) => `
<div class="rslidy-preview" data-slideindex="${idx}">
  <div class="rslidy-preview-item"></div>
</div>`

export const settings_html = `
<div id="rslidy-menu" class="rslidy-hidden rslidy-ui" role="region"
aria-label="Settings" tabindex="0">
  <label id="rslidy-checkbox-tilt-text" class="rslidy-menu-content-settings rslidy-disabled" aria-disabled="true">
    `+t.settings[0]+`
    <input type="checkbox" value="Tilt" id="rslidy-checkbox-tilt" disabled>
    <label for="rslidy-checkbox-tilt">`+i.slider_icon+`</label>
  </label>
  <label id="rslidy-checkbox-shake-text" class="rslidy-menu-content-settings rslidy-disabled" aria-disabled="true">
    `+t.settings[1]+`
    <input type="checkbox" value="Shake" id="rslidy-checkbox-shake" disabled>
    <label for="rslidy-checkbox-shake">`+i.slider_icon+`</label>
  </label>
  <label id="rslidy-checkbox-space-text" class="rslidy-menu-content-settings">
    `+t.settings[2]+`
    <input type="checkbox" value="Tap" id="rslidy-checkbox-space" checked>
    <label for="rslidy-checkbox-space">`+i.slider_icon+`</label>
  </label>
  <label id="rslidy-checkbox-margintap-text" class="rslidy-menu-content-settings">
    `+t.settings[3]+`
    <input type="checkbox" value="Tap" id="rslidy-checkbox-margintap" checked>
    <label for="rslidy-checkbox-margintap">`+i.slider_icon+`</label>
  </label>
  <label id="rslidy-checkbox-lowlight-text" class="rslidy-menu-content-settings">
    `+t.settings[4]+`
    <input type="checkbox" value="Low Light Mode" id="rslidy-checkbox-lowlightmode">
    <label for="rslidy-checkbox-lowlightmode">`+i.slider_icon+`</label>
  </label>
  <div class="rslidy-menu-content-settings">
    <label>`+t.settings[5]+`</label>
    <a href="#" title="`+t.settings[7]+`" id="rslidy-button-font-minus"><span class="rslidy-menu-button">`+i.font_minus_icon+`</span></a>
    <a href="#" title="`+t.settings[8]+`" id="rslidy-button-font-reset"><span class="rslidy-menu-button">`+i.font_reset_icon+`</span></a>
    <a href="#" title="`+t.settings[9]+`" id="rslidy-button-font-plus"><span class="rslidy-menu-button">`+i.font_plus_icon+`</span></a>
  </div>
  <div class="rslidy-menu-content-settings">
    <label>`+t.settings[6]+`</label>
    <a href="#" title="`+t.settings[10]+`" id="rslidy-button-font-minus-ui"><span class="rslidy-menu-button">`+i.font_minus_icon+`</span></a>
    <a href="#" title="`+t.settings[11]+`" id="rslidy-button-font-reset-ui"><span class="rslidy-menu-button">`+i.font_reset_icon+`</span></a>
    <a href="#" title="`+t.settings[12]+`" id="rslidy-button-font-plus-ui"><span class="rslidy-menu-button">`+i.font_plus_icon+`</span></a>
  </div>
</div>`;



export const print_settings_html = `
<div id="rslidy-print-menu" class="rslidy-hidden rslidy-ui"
role="region" aria-label="Print Settings" tabindex="0">
  <label id="rslidy-checkbox-snum-text" class="rslidy-menu-content">
    `+t.print_settings[0]+`
    <input type="checkbox" value="Numbers" id="rslidy-checkbox-snum">
    <label for="rslidy-checkbox-snum">`+i.slider_icon+`</label>
  </label>
  <label id="rslidy-checkbox-frame-text" class="rslidy-menu-content">
    `+t.print_settings[1]+`
    <input type="checkbox" value="Numbers" id="rslidy-checkbox-frame">
    <label for="rslidy-checkbox-frame">`+i.slider_icon+`</label>
  </label>
  <label id="rslidy-checkbox-link-text" class="rslidy-menu-content">
    `+t.print_settings[2]+`
    <input type="checkbox" value="Links" id="rslidy-checkbox-link">
    <label for="rslidy-checkbox-link">`+i.slider_icon+`</label>
  </label>
 <fieldset id="rslidy-slide-print-options">`+t.print_settings[3]+`
    <label class="rslidy-print-slides">
      <input type="radio" name="slide-print-option" value="all" checked class="rslidy-print-slide-input"> All
    </label>
    <label class="rslidy-print-slides">
      <input type="radio" name="slide-print-option" value="current" class="rslidy-print-slide-input"> Current
    </label>
    <label class="rslidy-print-slides">
      <input type="radio" name="slide-print-option" value="custom" class="rslidy-print-slide-input"> Slides:
      <input type="text" id="rslidy-slide-range-input" placeholder="1-5,8,10" disabled style="width: 4rem;">
    </label>
  </fieldset>
  <label id="rslidy-input-font-size-text" class="rslidy-menu-content">
    `+t.print_settings[4]+`
    <input type="number" id="rslidy-input-font-size" value="100" min="0" max="100">
  <span class="percent">%</span>
  </label>
  <label id="rslidy-select-orientation-text" class="rslidy-menu-content">
    `+t.print_settings[5]+`
    <select id="rslidy-select-orientation">
      <option value="portrait">Portrait</option>
      <option selected="selected" value="landscape">Landscape</option>
    </select>
  </label>
   <label id="rslidy-select-paper-size-text" class="rslidy-menu-content">
    `+t.print_settings[6]+`
    <select id="rslidy-select-paper-size">
    <option value="216mm 356mm">Legal</option>
    <option value="216mm 279mm">Letter</option>
    <option value="279mm 432mm">Tabloid</option>
    <option value="841mm 1189mm">A0</option>
    <option value="594mm 841mm">A1</option>
    <option value="420mm 594mm">A2</option>
    <option value="297mm 420mm">A3</option>
    <option selected="selected" value="210mm 297mm">A4</option>
    <option value="148mm 210mm">A5</option>
    </select>
  </label>
  <fieldset id="rslidy-exclusive-checkboxes" style="margin-top: 1.5em;">
  <h4 style="margin-bottom: 0.8em; font-weight: 600;">Print Sizing</h4>
   <label id="rslidy-checkbox-actual-size-text" class="rslidy-print-sizing">
      <input type="radio" name="print-options" value="actual" id="rslidy-checkbox-actual" class="print-checkbox" checked> Actual Size
    </label>
     <!--
    <label id="rslidy-checkbox-scale-text" class="rslidy-print-sizing">
      <input type="radio" name="print-options" value="fit" id="rslidy-checkbox-fit" class="print-checkbox"> Fit
    </label>
    <br>
     -->
    <!--
    <label id="rslidy-checkbox-scale-text" class="rslidy-print-sizing">
      <input type="radio" name="print-options" value="shrink" id="rslidy-checkbox-fit" class="print-checkbox"> Shrink
    </label>
    <br>
    -->
    <label id="rslidy-checkbox-shrink-text" class="rslidy-print-sizing">
      <input type="radio" name="print-options" value="fit-width" id="rslidy-checkbox-shrink" class="print-checkbox"> Fit to Width
    </label> 
    <!--
    <label id="rslidy-checkbox-zoom-text" class="rslidy-print-sizing">
      <input type="radio" name="print-options" value="zoom" id="rslidy-checkbox-zoom" class="print-checkbox"> Custom Zoom:
      <input type="number" id="custom-zoom-input" value="100" class="scaling-input" min="1" max="100" disabled placeholder="100">
      <span class="percent">%</span>
    </label>
     -->
    <label id="rslidy-checkbox-zoom-text" class="rslidy-print-sizing">
      <input type="radio" name="print-options" value="custom" id="rslidy-checkbox-custom" class="print-checkbox"> Custom Scale:
      <input type="number" id="custom-scaling-input" value="100" class="scaling-input" min="1" max="100" disabled placeholder="100">
      <span class="percent">%</span>
    </label>
    <div id="rslidy-transform-origin-subsection">
  <h4>Position of Page:</h4>
  <div class="button-container">
    <label class="rslidy-print-position" data-tooltip="Top Left">
      <input type="radio" name="transform-origin" value="top left" class="print-checkbox">
      <svg width="25" height="25" viewBox="0 0 25 25">
        <rect width="25" height="25" fill="grey" />
        <circle cx="5" cy="5" r="3.5" fill="lightblue" />
      </svg>
    </label>

    <label class="rslidy-print-position" data-tooltip="Top Center">
      <input type="radio" name="transform-origin" value="top center" class="print-checkbox">
      <svg width="25" height="25" viewBox="0 0 25 25">
        <rect width="25" height="25" fill="grey" />
        <circle cx="12.5" cy="5" r="3.5" fill="lightblue" />
      </svg>
    </label>

    <label class="rslidy-print-position" data-tooltip="Top Right">
      <input type="radio" name="transform-origin" value="top right" class="print-checkbox">
      <svg width="25" height="25" viewBox="0 0 25 25">
        <rect width="25" height="25" fill="grey" />
        <circle cx="20" cy="5" r="3.5" fill="lightblue" />
      </svg>
    </label>
  </div>
      <div class="button-container">
        <label class="rslidy-print-position" data-tooltip="Center Left">
          <input type="radio" name="transform-origin" value="center left" class="print-checkbox">
          <svg width="25" height="25" viewBox="0 0 25 25">
            <rect width="25" height="25" fill="grey" />
            <circle cx="5" cy="12.5" r="3.5" fill="lightblue" />
          </svg>
        </label>
    
        <label class="rslidy-print-position" data-tooltip="Center Center">
          <input type="radio" name="transform-origin" value="center" class="print-checkbox" checked>
          <svg width="25" height="25" viewBox="0 0 25 25">
            <rect width="25" height="25" fill="grey" />
            <circle cx="12.5" cy="12.5" r="3.5" fill="lightblue" />
          </svg>
        </label>
    
        <label class="rslidy-print-position" data-tooltip="Center Right">
          <input type="radio" name="transform-origin" value="center right" class="print-checkbox">
          <svg width="25" height="25" viewBox="0 0 25 25">
            <rect width="25" height="25" fill="grey" />
            <circle cx="20" cy="12.5" r="3.5" fill="lightblue" />
          </svg>
        </label>
      </div>
    
      <div class="button-container">
        <label class="rslidy-print-position" data-tooltip="Bottom Left">
          <input type="radio" name="transform-origin" value="left bottom" class="print-checkbox">
          <svg width="25" height="25" viewBox="0 0 25 25">
            <rect width="25" height="25" fill="grey" />
            <circle cx="5" cy="20" r="3.5" fill="lightblue" />
          </svg>
        </label>
    
        <label class="rslidy-print-position" data-tooltip="Bottom Center">
          <input type="radio" name="transform-origin" value="center bottom" class="print-checkbox">
          <svg width="25" height="25" viewBox="0 0 25 25">
            <rect width="25" height="25" fill="grey" />
            <circle cx="12.5" cy="20" r="3.5" fill="lightblue" />
          </svg>
        </label>
    
        <label class="rslidy-print-position" data-tooltip="Bottom Right">
          <input type="radio" name="transform-origin" value="right bottom" class="print-checkbox">
          <svg width="25" height="25" viewBox="0 0 25 25">
            <rect width="25" height="25" fill="grey" />
            <circle cx="20" cy="20" r="3.5" fill="lightblue" />
          </svg>
        </label>
      </div>
    </div>
  </fieldset>
  <div class="rslidy-menu-content">
    <button id="rslidy-button-print-submit">`+t.print_settings[7]+`</button>
  </div>
</div>`;

export const toolbar_html = `
<div id="rslidy-footer" class="rslidy-ui">
  <div id="rslidy-progress-bar-area">
    <div id="rslidy-trapezoid-wrapper">
      <div id="rslidy-tb-show-trapezoid" class="rslidy-hidden">
        <button id="rslidy-button-show" class="rslidy-show-button" title="`+t.toolbar[0]+`">
          <i class="rslidy-tb-button rslidy-tb-show">`+i.hide_icon+`</i>
        </button>
      </div>
    </div>
    <div id="rslidy-progress-bar"></div>
    <div id="rslidy-progress-bar-bg"></div>
    <div id="rslidy-progress-bar-nubs"></div>
  </div>
  <div id="rslidy-toolbar-area">
    <div id="rslidy-toolbar" role="region" aria-label="Toolbar">
      <div id="rslidy-toolbar-content">
        <div class="rslidy-float-left">
          <button id="rslidy-button-overview" aria-expanded="false" class="rslidy-toolbar-button" title="`+t.toolbar[1]+`">
            <i class="rslidy-tb-button">`+i.overview_icon+`</i>
          </button>
          <button id="rslidy-button-hide" class="rslidy-toolbar-button" title="`+t.toolbar[2]+`">
            <i class="rslidy-tb-button">`+i.hide_icon+`</i>
          </button>
          <button id="rslidy-button-all" class="rslidy-toolbar-button" title="`+t.toolbar[11]+`">
            <span class="rslidy-tb-button">`+i.all_slides_icon+`</span>
          </button>
        </div>

        <div id="rslidy-toolbar-button-nav">
          <button id="rslidy-button-first" class="rslidy-toolbar-button" title="`+t.toolbar[3]+`">
              <i class="rslidy-tb-button rslidy-mirror">`+i.last_icon+`</i>
          </button>

          <button id="rslidy-button-previous" class="rslidy-toolbar-button" title="`+t.toolbar[4]+`">
              <i class="rslidy-tb-button rslidy-mirror">`+i.next_icon+`</i>
          </button>
          <div class="rslidy-toolbar-slide"><input value="1" id="rslidy-slide-input" type="textbox" aria-label="Jump to slide" maxlength="3"></div>
          <div class="rslidy-toolbar-slide" id="rslidy-slide-caption"></div>
          <button id="rslidy-button-next" class="rslidy-toolbar-button"  title="`+t.toolbar[5]+`">
              <i class="rslidy-tb-button">`+i.next_icon +`</i>
          </button>
          <button id="rslidy-button-last" class="rslidy-toolbar-button" title="`+t.toolbar[6]+`">
              <i class="rslidy-tb-button">`+i.last_icon+`</i>
          </button>
        </div>

        <div class="rslidy-float-right">
          <button id="rslidy-button-print" aria-expanded="false" class="rslidy-toolbar-button" title="`+t.toolbar[9]+`">
            <i class="rslidy-tb-button">`+i.print_icon+`</i>
          </button>
          <button id="rslidy-button-menu" aria-expanded="false" class="rslidy-toolbar-button" title="`+t.toolbar[8]+`">
            <i class="rslidy-tb-button">`+i.settings_icon+`</i>
          </button>
          <button id="rslidy-button-help" class="rslidy-toolbar-button" title="`+t.toolbar[10]+`">
            <i class="rslidy-tb-button">`+i.help_icon+`</i>
          </button>
          <button id="rslidy-button-toc" aria-expanded="false" class="rslidy-toolbar-button" title="`+t.toolbar[7]+`">
            <i class="rslidy-tb-button">`+i.toc_icon+`</i>
          </button>
        </div>

        <div class="rslidy-float-right" id="rslidy-timer">00:00</div>
      </div>
    </div>
  </div>
</div>`;
