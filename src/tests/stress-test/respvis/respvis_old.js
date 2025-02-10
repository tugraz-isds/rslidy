// RespVis version 2.0 ESM
var backgroundSVGOnly = 'background-svgonly';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var LengthDimensions = ['width', 'height'];
var CSSBreakpointLengthRegex = /(\d+(?:\.\d+)?)(px|rem|em)/;
function isCSSBreakpointLengthValue(value) {
    return value.match(CSSBreakpointLengthRegex) !== null;
}
var CSSLengthRegex = /(\d+(?:\.\d+)?)(px|rem|em|%)/;
function isCSSLengthValue(value) {
    return value.match(CSSLengthRegex) !== null;
}
var Orientations = ['horizontal', 'vertical'];
var AxisLayoutsHorizontal = ['bottom', 'top'];
var AxisLayoutsVertical = ['left', 'right'];
var AxisLayouts = __spreadArray(__spreadArray([], __read(AxisLayoutsHorizontal), false), __read(AxisLayoutsVertical), false);
var categoryRegex = /^c-\d+$/;
function genKeyObjectFromObject(object) {
    return Object.keys(object).reduce(function (prev, accu) {
        prev[accu] = accu;
        return prev;
    }, {});
}

var maxBreakpointCount = 30;
var defaultExtrema = {
    min: 5,
    max: 30
};
var pxUpperLimit = '10000px';
var pxLowerLimit = '0px';
var defaultScope = 'chart';
var defaultLayoutIndex = 0;
var defaultStyleClass = 'categorical-0';
var noParentKey = 'no-parent';

var ErrorMessages = {
    categoricalValuesMismatch: 'Number of categorical values does not match with number of reference values!',
    sequentialColorValuesMismatch: 'Number of sequentially colored values does not match with number of reference values!',
    defaultError: 'An internal error occurred in RespVis!',
    invalidResponsiveValue: 'You passed an invalid responisve value object!',
    invalidExtremaCombination: 'You passed an invalid combination of minimum and maximum values!',
    elementNotExisting: 'An accessed element did not exist!',
    responsiveValueHasNoValues: 'A responsive value was not provided with any value!',
    invalidScaledValuesCombination: 'You passed an invalid scale for the corresponding domain of values!',
    invalidArgumentForSeries: 'You passed an invalid argument for a specific type of series!',
    missingArgumentForSeries: 'You did not pass a necessary argument for a specific type of series!',
    invalidWindowsSetting: 'Currently a setting is set to an invalid value!',
    evaluatingCSSUnitError: 'Evaluating CSS unit was not successful. Make sure to pass necessary context information!',
    convertingInvalidUnit: "Invalid unit cannot be converted!",
    emptyValueArrayProvided: "The array of values passed to RespVis was empty!",
    parcoordMinAxesCount: 'Parcoord Chart must have a minimal axis count of 2!'
};

var cssVarsDefaults = {
    // '--layout-width-factor': 0,
    // '--layout-height-factor': 0
    '--layout-width': 0,
    '--layout-width-pre-breakpoint': '0rem',
    '--layout-width-post-breakpoint': '0rem',
    '--layout-height': 0,
    '--layout-height-pre-breakpoint': '0rem',
    '--layout-height-post-breakpoint': '0rem',
    //LEGEND
    '--min-radius': '0',
    '--max-radius': '0'
};
var cssVarDefaultsKeys = genKeyObjectFromObject(cssVarsDefaults);
var cssVars = Object.keys(cssVarsDefaults);

var cursorClasses = [
    'cursor--invert-vertical',
    'cursor--invert-up',
    'cursor--invert-horizontal',
    'cursor--invert-right',
    'cursor--range-vertical',
    'cursor--range-up',
    'cursor--range-horizontal',
    'cursor--range-left',
    'cursor--range-rect',
    'cursor--range-rect-horizontal',
    'cursor--drag-horizontal',
    'cursor--drag-right-only',
    'cursor--drag-left-only',
    'cursor--drag-vertical',
    'cursor--drag-up-only',
    'cursor--drag-down-only',
];

function detectClassChange(element, onClassChange) {
    var observer = new MutationObserver(function (mutationsList) {
        var e_1, _a;
        try {
            for (var mutationsList_1 = __values(mutationsList), mutationsList_1_1 = mutationsList_1.next(); !mutationsList_1_1.done; mutationsList_1_1 = mutationsList_1.next()) {
                var mutation = mutationsList_1_1.value;
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    onClassChange();
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (mutationsList_1_1 && !mutationsList_1_1.done && (_a = mutationsList_1.return)) _a.call(mutationsList_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
    var config = { attributes: true, attributeFilter: ['class'] };
    observer.observe(element, config);
    return { observer: observer };
}

function splitKey(key) {
    return key.split(/[ ,]+/);
}
function combineKeys(keys) {
    var _a;
    return (_a = keys.reduce(function (prev, current) {
        return prev + (current ? ' ' + current : '');
    }, '')) === null || _a === void 0 ? void 0 : _a.trimStart();
}
function mergeKeys(keys) {
    return keys.reduce(function (prev, current) {
        return prev + '-' + current;
    });
}
function getActiveKeys(keysActive) {
    return Object.keys(keysActive).filter(function (key) { return keysActive[key]; });
}
var Key = /** @class */ (function () {
    function Key(rawKey) {
        this.rawKey = rawKey;
    }
    Key.prototype.getIndex = function () {
        var matchIndex = this.rawKey.match(/\bi-(\d+)\b/);
        if (!matchIndex)
            return undefined;
        return parseInt(matchIndex[1]);
    };
    Key.prototype.getSeries = function () {
        var matchIndex = this.rawKey.match(/\bs-(\d+)\b/);
        if (!matchIndex)
            return undefined;
        return parseInt(matchIndex[1]);
    };
    Key.prototype.getSeriesCategory = function () {
        var matchIndex = this.rawKey.match(/\bs-(\d+)-c-(\d+)\b/);
        if (!matchIndex)
            return undefined;
        return [parseInt(matchIndex[1]), parseInt(matchIndex[2])];
    };
    Key.prototype.getAxisCategories = function () {
        var regex = /\ba-(\d+)-c-(\d+)\b/g;
        var matchIndex;
        var pairs = [];
        while ((matchIndex = regex.exec(this.rawKey)) !== null) {
            pairs.push([parseInt(matchIndex[1]), parseInt(matchIndex[2])]);
        }
        return pairs;
    };
    return Key;
}());

//TODO: maybe add additional units like ch, vh, etc.
// export function cssLengthInPx(length: UnitValue<CSSAbsoluteLengthUnit>): number
// export function cssLengthInPx(length: UnitValue<CSSEMUnit>, element: Element): number
// export function cssLengthInPx(length: UnitValue<CSSPERUnit>, element: Element, dim: LengthDimension): number
function cssLengthInPx(length, element, dim) {
    var match = length.match(CSSLengthRegex);
    if (!match)
        return 0;
    var _a = __read(match, 3), value = _a[1], unit = _a[2];
    var valueNumber = typeof value === 'string' ? parseFloat(value) : value;
    if (unit === 'px')
        return valueNumber;
    if (unit === 'rem')
        return valueNumber * parseFloat(getComputedStyle(document.documentElement).fontSize);
    if (unit === 'em' && element)
        return valueNumber * parseFloat(getComputedStyle(element).fontSize);
    if (unit === 'em' && !element)
        throw new Error(ErrorMessages.evaluatingCSSUnitError);
    if (unit === '%' && element && dim)
        return valueNumber / 100 * element.getBoundingClientRect()[dim];
    if (unit === '%' && !(element && dim))
        throw new Error(ErrorMessages.evaluatingCSSUnitError);
    throw new Error(ErrorMessages.evaluatingCSSUnitError);
}
function getCSSVarLengthInPx(element, cssVar, defaultValue) {
    var val = getComputedStyle(element).getPropertyValue(cssVar);
    if (isCSSBreakpointLengthValue(val))
        return cssLengthInPx(val, element);
    return defaultValue;
}

function calcLimited(num, lowerLimit, upperLimit) {
    var overflow = num > upperLimit;
    var underflow = num < lowerLimit;
    return overflow ? upperLimit : underflow ? lowerLimit : num;
}

function ascending$1(a, b) {
  return a == null || b == null ? NaN : a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

function descending(a, b) {
  return a == null || b == null ? NaN
    : b < a ? -1
    : b > a ? 1
    : b >= a ? 0
    : NaN;
}

function bisector(f) {
  let compare1, compare2, delta;

  // If an accessor is specified, promote it to a comparator. In this case we
  // can test whether the search value is (self-) comparable. We can’t do this
  // for a comparator (except for specific, known comparators) because we can’t
  // tell if the comparator is symmetric, and an asymmetric comparator can’t be
  // used to test whether a single value is comparable.
  if (f.length !== 2) {
    compare1 = ascending$1;
    compare2 = (d, x) => ascending$1(f(d), x);
    delta = (d, x) => f(d) - x;
  } else {
    compare1 = f === ascending$1 || f === descending ? f : zero$1;
    compare2 = f;
    delta = f;
  }

  function left(a, x, lo = 0, hi = a.length) {
    if (lo < hi) {
      if (compare1(x, x) !== 0) return hi;
      do {
        const mid = (lo + hi) >>> 1;
        if (compare2(a[mid], x) < 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  }

  function right(a, x, lo = 0, hi = a.length) {
    if (lo < hi) {
      if (compare1(x, x) !== 0) return hi;
      do {
        const mid = (lo + hi) >>> 1;
        if (compare2(a[mid], x) <= 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  }

  function center(a, x, lo = 0, hi = a.length) {
    const i = left(a, x, lo, hi - 1);
    return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
  }

  return {left, center, right};
}

function zero$1() {
  return 0;
}

function number$3(x) {
  return x === null ? NaN : +x;
}

const ascendingBisect = bisector(ascending$1);
const bisectRight = ascendingBisect.right;
bisector(number$3).center;
var bisect = bisectRight;

class InternMap extends Map {
  constructor(entries, key = keyof) {
    super();
    Object.defineProperties(this, {_intern: {value: new Map()}, _key: {value: key}});
    if (entries != null) for (const [key, value] of entries) this.set(key, value);
  }
  get(key) {
    return super.get(intern_get(this, key));
  }
  has(key) {
    return super.has(intern_get(this, key));
  }
  set(key, value) {
    return super.set(intern_set(this, key), value);
  }
  delete(key) {
    return super.delete(intern_delete(this, key));
  }
}

function intern_get({_intern, _key}, value) {
  const key = _key(value);
  return _intern.has(key) ? _intern.get(key) : value;
}

function intern_set({_intern, _key}, value) {
  const key = _key(value);
  if (_intern.has(key)) return _intern.get(key);
  _intern.set(key, value);
  return value;
}

function intern_delete({_intern, _key}, value) {
  const key = _key(value);
  if (_intern.has(key)) {
    value = _intern.get(key);
    _intern.delete(key);
  }
  return value;
}

function keyof(value) {
  return value !== null && typeof value === "object" ? value.valueOf() : value;
}

const e10 = Math.sqrt(50),
    e5 = Math.sqrt(10),
    e2 = Math.sqrt(2);

function tickSpec(start, stop, count) {
  const step = (stop - start) / Math.max(0, count),
      power = Math.floor(Math.log10(step)),
      error = step / Math.pow(10, power),
      factor = error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1;
  let i1, i2, inc;
  if (power < 0) {
    inc = Math.pow(10, -power) / factor;
    i1 = Math.round(start * inc);
    i2 = Math.round(stop * inc);
    if (i1 / inc < start) ++i1;
    if (i2 / inc > stop) --i2;
    inc = -inc;
  } else {
    inc = Math.pow(10, power) * factor;
    i1 = Math.round(start / inc);
    i2 = Math.round(stop / inc);
    if (i1 * inc < start) ++i1;
    if (i2 * inc > stop) --i2;
  }
  if (i2 < i1 && 0.5 <= count && count < 2) return tickSpec(start, stop, count * 2);
  return [i1, i2, inc];
}

function ticks(start, stop, count) {
  stop = +stop, start = +start, count = +count;
  if (!(count > 0)) return [];
  if (start === stop) return [start];
  const reverse = stop < start, [i1, i2, inc] = reverse ? tickSpec(stop, start, count) : tickSpec(start, stop, count);
  if (!(i2 >= i1)) return [];
  const n = i2 - i1 + 1, ticks = new Array(n);
  if (reverse) {
    if (inc < 0) for (let i = 0; i < n; ++i) ticks[i] = (i2 - i) / -inc;
    else for (let i = 0; i < n; ++i) ticks[i] = (i2 - i) * inc;
  } else {
    if (inc < 0) for (let i = 0; i < n; ++i) ticks[i] = (i1 + i) / -inc;
    else for (let i = 0; i < n; ++i) ticks[i] = (i1 + i) * inc;
  }
  return ticks;
}

function tickIncrement(start, stop, count) {
  stop = +stop, start = +start, count = +count;
  return tickSpec(start, stop, count)[2];
}

function tickStep(start, stop, count) {
  stop = +stop, start = +start, count = +count;
  const reverse = stop < start, inc = reverse ? tickIncrement(stop, start, count) : tickIncrement(start, stop, count);
  return (reverse ? -1 : 1) * (inc < 0 ? 1 / -inc : inc);
}

function max(values, valueof) {
  let max;
  if (valueof === undefined) {
    for (const value of values) {
      if (value != null
          && (max < value || (max === undefined && value >= value))) {
        max = value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null
          && (max < value || (max === undefined && value >= value))) {
        max = value;
      }
    }
  }
  return max;
}

function min(values, valueof) {
  let min;
  if (valueof === undefined) {
    for (const value of values) {
      if (value != null
          && (min > value || (min === undefined && value >= value))) {
        min = value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null
          && (min > value || (min === undefined && value >= value))) {
        min = value;
      }
    }
  }
  return min;
}

function range(start, stop, step) {
  start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;

  var i = -1,
      n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
      range = new Array(n);

  while (++i < n) {
    range[i] = start + i * step;
  }

  return range;
}

function identity$4(x) {
  return x;
}

var top = 1,
    right = 2,
    bottom = 3,
    left = 4,
    epsilon = 1e-6;

function translateX(x) {
  return "translate(" + x + ",0)";
}

function translateY(y) {
  return "translate(0," + y + ")";
}

function number$2(scale) {
  return d => +scale(d);
}

function center(scale, offset) {
  offset = Math.max(0, scale.bandwidth() - offset * 2) / 2;
  if (scale.round()) offset = Math.round(offset);
  return d => +scale(d) + offset;
}

function entering() {
  return !this.__axis;
}

function axis(orient, scale) {
  var tickArguments = [],
      tickValues = null,
      tickFormat = null,
      tickSizeInner = 6,
      tickSizeOuter = 6,
      tickPadding = 3,
      offset = typeof window !== "undefined" && window.devicePixelRatio > 1 ? 0 : 0.5,
      k = orient === top || orient === left ? -1 : 1,
      x = orient === left || orient === right ? "x" : "y",
      transform = orient === top || orient === bottom ? translateX : translateY;

  function axis(context) {
    var values = tickValues == null ? (scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain()) : tickValues,
        format = tickFormat == null ? (scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : identity$4) : tickFormat,
        spacing = Math.max(tickSizeInner, 0) + tickPadding,
        range = scale.range(),
        range0 = +range[0] + offset,
        range1 = +range[range.length - 1] + offset,
        position = (scale.bandwidth ? center : number$2)(scale.copy(), offset),
        selection = context.selection ? context.selection() : context,
        path = selection.selectAll(".domain").data([null]),
        tick = selection.selectAll(".tick").data(values, scale).order(),
        tickExit = tick.exit(),
        tickEnter = tick.enter().append("g").attr("class", "tick"),
        line = tick.select("line"),
        text = tick.select("text");

    path = path.merge(path.enter().insert("path", ".tick")
        .attr("class", "domain")
        .attr("stroke", "currentColor"));

    tick = tick.merge(tickEnter);

    line = line.merge(tickEnter.append("line")
        .attr("stroke", "currentColor")
        .attr(x + "2", k * tickSizeInner));

    text = text.merge(tickEnter.append("text")
        .attr("fill", "currentColor")
        .attr(x, k * spacing)
        .attr("dy", orient === top ? "0em" : orient === bottom ? "0.71em" : "0.32em"));

    if (context !== selection) {
      path = path.transition(context);
      tick = tick.transition(context);
      line = line.transition(context);
      text = text.transition(context);

      tickExit = tickExit.transition(context)
          .attr("opacity", epsilon)
          .attr("transform", function(d) { return isFinite(d = position(d)) ? transform(d + offset) : this.getAttribute("transform"); });

      tickEnter
          .attr("opacity", epsilon)
          .attr("transform", function(d) { var p = this.parentNode.__axis; return transform((p && isFinite(p = p(d)) ? p : position(d)) + offset); });
    }

    tickExit.remove();

    path
        .attr("d", orient === left || orient === right
            ? (tickSizeOuter ? "M" + k * tickSizeOuter + "," + range0 + "H" + offset + "V" + range1 + "H" + k * tickSizeOuter : "M" + offset + "," + range0 + "V" + range1)
            : (tickSizeOuter ? "M" + range0 + "," + k * tickSizeOuter + "V" + offset + "H" + range1 + "V" + k * tickSizeOuter : "M" + range0 + "," + offset + "H" + range1));

    tick
        .attr("opacity", 1)
        .attr("transform", function(d) { return transform(position(d) + offset); });

    line
        .attr(x + "2", k * tickSizeInner);

    text
        .attr(x, k * spacing)
        .text(format);

    selection.filter(entering)
        .attr("fill", "none")
        .attr("font-size", 10)
        .attr("font-family", "sans-serif")
        .attr("text-anchor", orient === right ? "start" : orient === left ? "end" : "middle");

    selection
        .each(function() { this.__axis = position; });
  }

  axis.scale = function(_) {
    return arguments.length ? (scale = _, axis) : scale;
  };

  axis.ticks = function() {
    return tickArguments = Array.from(arguments), axis;
  };

  axis.tickArguments = function(_) {
    return arguments.length ? (tickArguments = _ == null ? [] : Array.from(_), axis) : tickArguments.slice();
  };

  axis.tickValues = function(_) {
    return arguments.length ? (tickValues = _ == null ? null : Array.from(_), axis) : tickValues && tickValues.slice();
  };

  axis.tickFormat = function(_) {
    return arguments.length ? (tickFormat = _, axis) : tickFormat;
  };

  axis.tickSize = function(_) {
    return arguments.length ? (tickSizeInner = tickSizeOuter = +_, axis) : tickSizeInner;
  };

  axis.tickSizeInner = function(_) {
    return arguments.length ? (tickSizeInner = +_, axis) : tickSizeInner;
  };

  axis.tickSizeOuter = function(_) {
    return arguments.length ? (tickSizeOuter = +_, axis) : tickSizeOuter;
  };

  axis.tickPadding = function(_) {
    return arguments.length ? (tickPadding = +_, axis) : tickPadding;
  };

  axis.offset = function(_) {
    return arguments.length ? (offset = +_, axis) : offset;
  };

  return axis;
}

function axisTop(scale) {
  return axis(top, scale);
}

function axisRight(scale) {
  return axis(right, scale);
}

function axisBottom(scale) {
  return axis(bottom, scale);
}

function axisLeft(scale) {
  return axis(left, scale);
}

var noop = {value: () => {}};

function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || (t in _) || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}

function Dispatch(_) {
  this._ = _;
}

function parseTypenames$1(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return {type: t, name: name};
  });
}

Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _ = this._,
        T = parseTypenames$1(typename + "", _),
        t,
        i = -1,
        n = T.length;

    // If no callback was specified, return the callback of the given type and name.
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get$1(_[t], typename.name))) return t;
      return;
    }

    // If a type was specified, set the callback for the given type and name.
    // Otherwise, if a null callback was specified, remove callbacks of the given name.
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type) _[t] = set$1(_[t], typename.name, callback);
      else if (callback == null) for (t in _) _[t] = set$1(_[t], typename.name, null);
    }

    return this;
  },
  copy: function() {
    var copy = {}, _ = this._;
    for (var t in _) copy[t] = _[t].slice();
    return new Dispatch(copy);
  },
  call: function(type, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function(type, that, args) {
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};

function get$1(type, name) {
  for (var i = 0, n = type.length, c; i < n; ++i) {
    if ((c = type[i]).name === name) {
      return c.value;
    }
  }
}

function set$1(type, name, callback) {
  for (var i = 0, n = type.length; i < n; ++i) {
    if (type[i].name === name) {
      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
      break;
    }
  }
  if (callback != null) type.push({name: name, value: callback});
  return type;
}

var xhtml = "http://www.w3.org/1999/xhtml";

var namespaces = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

function namespace(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name; // eslint-disable-line no-prototype-builtins
}

function creatorInherit(name) {
  return function() {
    var document = this.ownerDocument,
        uri = this.namespaceURI;
    return uri === xhtml && document.documentElement.namespaceURI === xhtml
        ? document.createElement(name)
        : document.createElementNS(uri, name);
  };
}

function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}

function creator(name) {
  var fullname = namespace(name);
  return (fullname.local
      ? creatorFixed
      : creatorInherit)(fullname);
}

function none() {}

function selector(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
}

function selection_select(select) {
  if (typeof select !== "function") select = selector(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }

  return new Selection$1(subgroups, this._parents);
}

// Given something array like (or null), returns something that is strictly an
// array. This is used to ensure that array-like objects passed to d3.selectAll
// or selection.selectAll are converted into proper arrays when creating a
// selection; we don’t ever want to create a selection backed by a live
// HTMLCollection or NodeList. However, note that selection.selectAll will use a
// static NodeList as a group, since it safely derived from querySelectorAll.
function array(x) {
  return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
}

function empty() {
  return [];
}

function selectorAll(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
}

function arrayAll(select) {
  return function() {
    return array(select.apply(this, arguments));
  };
}

function selection_selectAll(select) {
  if (typeof select === "function") select = arrayAll(select);
  else select = selectorAll(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }

  return new Selection$1(subgroups, parents);
}

function matcher(selector) {
  return function() {
    return this.matches(selector);
  };
}

function childMatcher(selector) {
  return function(node) {
    return node.matches(selector);
  };
}

var find = Array.prototype.find;

function childFind(match) {
  return function() {
    return find.call(this.children, match);
  };
}

function childFirst() {
  return this.firstElementChild;
}

function selection_selectChild(match) {
  return this.select(match == null ? childFirst
      : childFind(typeof match === "function" ? match : childMatcher(match)));
}

var filter = Array.prototype.filter;

function children() {
  return Array.from(this.children);
}

function childrenFilter(match) {
  return function() {
    return filter.call(this.children, match);
  };
}

function selection_selectChildren(match) {
  return this.selectAll(match == null ? children
      : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
}

function selection_filter(match) {
  if (typeof match !== "function") match = matcher(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new Selection$1(subgroups, this._parents);
}

function sparse(update) {
  return new Array(update.length);
}

function selection_enter() {
  return new Selection$1(this._enter || this._groups.map(sparse), this._parents);
}

function EnterNode(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}

EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
  querySelector: function(selector) { return this._parent.querySelector(selector); },
  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
};

function constant$3(x) {
  return function() {
    return x;
  };
}

function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0,
      node,
      groupLength = group.length,
      dataLength = data.length;

  // Put any non-null nodes that fit into update.
  // Put any null nodes into enter.
  // Put any remaining data into enter.
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  // Put any non-null nodes that don’t fit into exit.
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}

function bindKey(parent, group, enter, update, exit, data, key) {
  var i,
      node,
      nodeByKeyValue = new Map,
      groupLength = group.length,
      dataLength = data.length,
      keyValues = new Array(groupLength),
      keyValue;

  // Compute the key for each node.
  // If multiple nodes have the same key, the duplicates are added to exit.
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
      if (nodeByKeyValue.has(keyValue)) {
        exit[i] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }

  // Compute the key for each datum.
  // If there a node associated with this key, join and add it to update.
  // If there is not (or the key is a duplicate), add it to enter.
  for (i = 0; i < dataLength; ++i) {
    keyValue = key.call(parent, data[i], i, data) + "";
    if (node = nodeByKeyValue.get(keyValue)) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  // Add any remaining nodes that were not bound to data to exit.
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && (nodeByKeyValue.get(keyValues[i]) === node)) {
      exit[i] = node;
    }
  }
}

function datum(node) {
  return node.__data__;
}

function selection_data(value, key) {
  if (!arguments.length) return Array.from(this, datum);

  var bind = key ? bindKey : bindIndex,
      parents = this._parents,
      groups = this._groups;

  if (typeof value !== "function") value = constant$3(value);

  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j],
        group = groups[j],
        groupLength = group.length,
        data = arraylike(value.call(parent, parent && parent.__data__, j, parents)),
        dataLength = data.length,
        enterGroup = enter[j] = new Array(dataLength),
        updateGroup = update[j] = new Array(dataLength),
        exitGroup = exit[j] = new Array(groupLength);

    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

    // Now connect the enter nodes to their following update node, such that
    // appendChild can insert the materialized enter node before this node,
    // rather than at the end of the parent node.
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
        previous._next = next || null;
      }
    }
  }

  update = new Selection$1(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}

// Given some data, this returns an array-like view of it: an object that
// exposes a length property and allows numeric indexing. Note that unlike
// selectAll, this isn’t worried about “live” collections because the resulting
// array will only be used briefly while data is being bound. (It is possible to
// cause the data to change while iterating by using a key function, but please
// don’t; we’d rather avoid a gratuitous copy.)
function arraylike(data) {
  return typeof data === "object" && "length" in data
    ? data // Array, TypedArray, NodeList, array-like
    : Array.from(data); // Map, Set, iterable, string, or anything else
}

function selection_exit() {
  return new Selection$1(this._exit || this._groups.map(sparse), this._parents);
}

function selection_join(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  if (typeof onenter === "function") {
    enter = onenter(enter);
    if (enter) enter = enter.selection();
  } else {
    enter = enter.append(onenter + "");
  }
  if (onupdate != null) {
    update = onupdate(update);
    if (update) update = update.selection();
  }
  if (onexit == null) exit.remove(); else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}

function selection_merge(context) {
  var selection = context.selection ? context.selection() : context;

  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new Selection$1(merges, this._parents);
}

function selection_order() {

  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }

  return this;
}

function selection_sort(compare) {
  if (!compare) compare = ascending;

  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }

  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }

  return new Selection$1(sortgroups, this._parents).order();
}

function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

function selection_call() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}

function selection_nodes() {
  return Array.from(this);
}

function selection_node() {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }

  return null;
}

function selection_size() {
  let size = 0;
  for (const node of this) ++size; // eslint-disable-line no-unused-vars
  return size;
}

function selection_empty() {
  return !this.node();
}

function selection_each(callback) {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }

  return this;
}

function attrRemove$1(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS$1(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant$1(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}

function attrConstantNS$1(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}

function attrFunction$1(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);
    else this.setAttribute(name, v);
  };
}

function attrFunctionNS$1(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}

function selection_attr(name, value) {
  var fullname = namespace(name);

  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local
        ? node.getAttributeNS(fullname.space, fullname.local)
        : node.getAttribute(fullname);
  }

  return this.each((value == null
      ? (fullname.local ? attrRemoveNS$1 : attrRemove$1) : (typeof value === "function"
      ? (fullname.local ? attrFunctionNS$1 : attrFunction$1)
      : (fullname.local ? attrConstantNS$1 : attrConstant$1)))(fullname, value));
}

function defaultView(node) {
  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
      || (node.document && node) // node is a Window
      || node.defaultView; // node is a Document
}

function styleRemove$1(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant$1(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}

function styleFunction$1(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);
    else this.style.setProperty(name, v, priority);
  };
}

function selection_style(name, value, priority) {
  return arguments.length > 1
      ? this.each((value == null
            ? styleRemove$1 : typeof value === "function"
            ? styleFunction$1
            : styleConstant$1)(name, value, priority == null ? "" : priority))
      : styleValue(this.node(), name);
}

function styleValue(node, name) {
  return node.style.getPropertyValue(name)
      || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
}

function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}

function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}

function propertyFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];
    else this[name] = v;
  };
}

function selection_property(name, value) {
  return arguments.length > 1
      ? this.each((value == null
          ? propertyRemove : typeof value === "function"
          ? propertyFunction
          : propertyConstant)(name, value))
      : this.node()[name];
}

function classArray(string) {
  return string.trim().split(/^|\s+/);
}

function classList(node) {
  return node.classList || new ClassList(node);
}

function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}

ClassList.prototype = {
  add: function(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};

function classedAdd(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.add(names[i]);
}

function classedRemove(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.remove(names[i]);
}

function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}

function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}

function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}

function selection_classed(name, value) {
  var names = classArray(name + "");

  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }

  return this.each((typeof value === "function"
      ? classedFunction : value
      ? classedTrue
      : classedFalse)(names, value));
}

function textRemove() {
  this.textContent = "";
}

function textConstant$1(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction$1(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}

function selection_text(value) {
  return arguments.length
      ? this.each(value == null
          ? textRemove : (typeof value === "function"
          ? textFunction$1
          : textConstant$1)(value))
      : this.node().textContent;
}

function htmlRemove() {
  this.innerHTML = "";
}

function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}

function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}

function selection_html(value) {
  return arguments.length
      ? this.each(value == null
          ? htmlRemove : (typeof value === "function"
          ? htmlFunction
          : htmlConstant)(value))
      : this.node().innerHTML;
}

function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}

function selection_raise() {
  return this.each(raise);
}

function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}

function selection_lower() {
  return this.each(lower);
}

function selection_append(name) {
  var create = typeof name === "function" ? name : creator(name);
  return this.select(function() {
    return this.appendChild(create.apply(this, arguments));
  });
}

function constantNull() {
  return null;
}

function selection_insert(name, before) {
  var create = typeof name === "function" ? name : creator(name),
      select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
  return this.select(function() {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });
}

function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}

function selection_remove() {
  return this.each(remove);
}

function selection_cloneShallow() {
  var clone = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

function selection_cloneDeep() {
  var clone = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

function selection_clone(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}

function selection_datum(value) {
  return arguments.length
      ? this.property("__data__", value)
      : this.node().__data__;
}

function contextListener(listener) {
  return function(event) {
    listener.call(this, event, this.__data__);
  };
}

function parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return {type: t, name: name};
  });
}

function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;
    else delete this.__on;
  };
}

function onAdd(typename, value, options) {
  return function() {
    var on = this.__on, o, listener = contextListener(value);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
        this.addEventListener(o.type, o.listener = listener, o.options = options);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, options);
    o = {type: typename.type, name: typename.name, value: value, listener: listener, options: options};
    if (!on) this.__on = [o];
    else on.push(o);
  };
}

function selection_on(typename, value, options) {
  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }

  on = value ? onAdd : onRemove;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
  return this;
}

function dispatchEvent(node, type, params) {
  var window = defaultView(node),
      event = window.CustomEvent;

  if (typeof event === "function") {
    event = new event(type, params);
  } else {
    event = window.document.createEvent("Event");
    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
    else event.initEvent(type, false, false);
  }

  node.dispatchEvent(event);
}

function dispatchConstant(type, params) {
  return function() {
    return dispatchEvent(this, type, params);
  };
}

function dispatchFunction(type, params) {
  return function() {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}

function selection_dispatch(type, params) {
  return this.each((typeof params === "function"
      ? dispatchFunction
      : dispatchConstant)(type, params));
}

function* selection_iterator() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) yield node;
    }
  }
}

var root = [null];

function Selection$1(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}

function selection() {
  return new Selection$1([[document.documentElement]], root);
}

function selection_selection() {
  return this;
}

Selection$1.prototype = selection.prototype = {
  constructor: Selection$1,
  select: selection_select,
  selectAll: selection_selectAll,
  selectChild: selection_selectChild,
  selectChildren: selection_selectChildren,
  filter: selection_filter,
  data: selection_data,
  enter: selection_enter,
  exit: selection_exit,
  join: selection_join,
  merge: selection_merge,
  selection: selection_selection,
  order: selection_order,
  sort: selection_sort,
  call: selection_call,
  nodes: selection_nodes,
  node: selection_node,
  size: selection_size,
  empty: selection_empty,
  each: selection_each,
  attr: selection_attr,
  style: selection_style,
  property: selection_property,
  classed: selection_classed,
  text: selection_text,
  html: selection_html,
  raise: selection_raise,
  lower: selection_lower,
  append: selection_append,
  insert: selection_insert,
  remove: selection_remove,
  clone: selection_clone,
  datum: selection_datum,
  on: selection_on,
  dispatch: selection_dispatch,
  [Symbol.iterator]: selection_iterator
};

function select(selector) {
  return typeof selector === "string"
      ? new Selection$1([[document.querySelector(selector)]], [document.documentElement])
      : new Selection$1([[selector]], root);
}

function sourceEvent(event) {
  let sourceEvent;
  while (sourceEvent = event.sourceEvent) event = sourceEvent;
  return event;
}

function pointer(event, node) {
  event = sourceEvent(event);
  if (node === undefined) node = event.currentTarget;
  if (node) {
    var svg = node.ownerSVGElement || node;
    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint();
      point.x = event.clientX, point.y = event.clientY;
      point = point.matrixTransform(node.getScreenCTM().inverse());
      return [point.x, point.y];
    }
    if (node.getBoundingClientRect) {
      var rect = node.getBoundingClientRect();
      return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
    }
  }
  return [event.pageX, event.pageY];
}

function selectAll(selector) {
  return typeof selector === "string"
      ? new Selection$1([document.querySelectorAll(selector)], [document.documentElement])
      : new Selection$1([array(selector)], root);
}

// These are typically used in conjunction with noevent to ensure that we can
// preventDefault on the event.
const nonpassive = {passive: false};
const nonpassivecapture = {capture: true, passive: false};

function nopropagation$1(event) {
  event.stopImmediatePropagation();
}

function noevent$1(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}

function dragDisable(view) {
  var root = view.document.documentElement,
      selection = select(view).on("dragstart.drag", noevent$1, nonpassivecapture);
  if ("onselectstart" in root) {
    selection.on("selectstart.drag", noevent$1, nonpassivecapture);
  } else {
    root.__noselect = root.style.MozUserSelect;
    root.style.MozUserSelect = "none";
  }
}

function yesdrag(view, noclick) {
  var root = view.document.documentElement,
      selection = select(view).on("dragstart.drag", null);
  if (noclick) {
    selection.on("click.drag", noevent$1, nonpassivecapture);
    setTimeout(function() { selection.on("click.drag", null); }, 0);
  }
  if ("onselectstart" in root) {
    selection.on("selectstart.drag", null);
  } else {
    root.style.MozUserSelect = root.__noselect;
    delete root.__noselect;
  }
}

var constant$2 = x => () => x;

function DragEvent(type, {
  sourceEvent,
  subject,
  target,
  identifier,
  active,
  x, y, dx, dy,
  dispatch
}) {
  Object.defineProperties(this, {
    type: {value: type, enumerable: true, configurable: true},
    sourceEvent: {value: sourceEvent, enumerable: true, configurable: true},
    subject: {value: subject, enumerable: true, configurable: true},
    target: {value: target, enumerable: true, configurable: true},
    identifier: {value: identifier, enumerable: true, configurable: true},
    active: {value: active, enumerable: true, configurable: true},
    x: {value: x, enumerable: true, configurable: true},
    y: {value: y, enumerable: true, configurable: true},
    dx: {value: dx, enumerable: true, configurable: true},
    dy: {value: dy, enumerable: true, configurable: true},
    _: {value: dispatch}
  });
}

DragEvent.prototype.on = function() {
  var value = this._.on.apply(this._, arguments);
  return value === this._ ? this : value;
};

// Ignore right-click, since that should open the context menu.
function defaultFilter$1(event) {
  return !event.ctrlKey && !event.button;
}

function defaultContainer() {
  return this.parentNode;
}

function defaultSubject(event, d) {
  return d == null ? {x: event.x, y: event.y} : d;
}

function defaultTouchable$1() {
  return navigator.maxTouchPoints || ("ontouchstart" in this);
}

function drag() {
  var filter = defaultFilter$1,
      container = defaultContainer,
      subject = defaultSubject,
      touchable = defaultTouchable$1,
      gestures = {},
      listeners = dispatch("start", "drag", "end"),
      active = 0,
      mousedownx,
      mousedowny,
      mousemoving,
      touchending,
      clickDistance2 = 0;

  function drag(selection) {
    selection
        .on("mousedown.drag", mousedowned)
      .filter(touchable)
        .on("touchstart.drag", touchstarted)
        .on("touchmove.drag", touchmoved, nonpassive)
        .on("touchend.drag touchcancel.drag", touchended)
        .style("touch-action", "none")
        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }

  function mousedowned(event, d) {
    if (touchending || !filter.call(this, event, d)) return;
    var gesture = beforestart(this, container.call(this, event, d), event, d, "mouse");
    if (!gesture) return;
    select(event.view)
      .on("mousemove.drag", mousemoved, nonpassivecapture)
      .on("mouseup.drag", mouseupped, nonpassivecapture);
    dragDisable(event.view);
    nopropagation$1(event);
    mousemoving = false;
    mousedownx = event.clientX;
    mousedowny = event.clientY;
    gesture("start", event);
  }

  function mousemoved(event) {
    noevent$1(event);
    if (!mousemoving) {
      var dx = event.clientX - mousedownx, dy = event.clientY - mousedowny;
      mousemoving = dx * dx + dy * dy > clickDistance2;
    }
    gestures.mouse("drag", event);
  }

  function mouseupped(event) {
    select(event.view).on("mousemove.drag mouseup.drag", null);
    yesdrag(event.view, mousemoving);
    noevent$1(event);
    gestures.mouse("end", event);
  }

  function touchstarted(event, d) {
    if (!filter.call(this, event, d)) return;
    var touches = event.changedTouches,
        c = container.call(this, event, d),
        n = touches.length, i, gesture;

    for (i = 0; i < n; ++i) {
      if (gesture = beforestart(this, c, event, d, touches[i].identifier, touches[i])) {
        nopropagation$1(event);
        gesture("start", event, touches[i]);
      }
    }
  }

  function touchmoved(event) {
    var touches = event.changedTouches,
        n = touches.length, i, gesture;

    for (i = 0; i < n; ++i) {
      if (gesture = gestures[touches[i].identifier]) {
        noevent$1(event);
        gesture("drag", event, touches[i]);
      }
    }
  }

  function touchended(event) {
    var touches = event.changedTouches,
        n = touches.length, i, gesture;

    if (touchending) clearTimeout(touchending);
    touchending = setTimeout(function() { touchending = null; }, 500); // Ghost clicks are delayed!
    for (i = 0; i < n; ++i) {
      if (gesture = gestures[touches[i].identifier]) {
        nopropagation$1(event);
        gesture("end", event, touches[i]);
      }
    }
  }

  function beforestart(that, container, event, d, identifier, touch) {
    var dispatch = listeners.copy(),
        p = pointer(touch || event, container), dx, dy,
        s;

    if ((s = subject.call(that, new DragEvent("beforestart", {
        sourceEvent: event,
        target: drag,
        identifier,
        active,
        x: p[0],
        y: p[1],
        dx: 0,
        dy: 0,
        dispatch
      }), d)) == null) return;

    dx = s.x - p[0] || 0;
    dy = s.y - p[1] || 0;

    return function gesture(type, event, touch) {
      var p0 = p, n;
      switch (type) {
        case "start": gestures[identifier] = gesture, n = active++; break;
        case "end": delete gestures[identifier], --active; // falls through
        case "drag": p = pointer(touch || event, container), n = active; break;
      }
      dispatch.call(
        type,
        that,
        new DragEvent(type, {
          sourceEvent: event,
          subject: s,
          target: drag,
          identifier,
          active: n,
          x: p[0] + dx,
          y: p[1] + dy,
          dx: p[0] - p0[0],
          dy: p[1] - p0[1],
          dispatch
        }),
        d
      );
    };
  }

  drag.filter = function(_) {
    return arguments.length ? (filter = typeof _ === "function" ? _ : constant$2(!!_), drag) : filter;
  };

  drag.container = function(_) {
    return arguments.length ? (container = typeof _ === "function" ? _ : constant$2(_), drag) : container;
  };

  drag.subject = function(_) {
    return arguments.length ? (subject = typeof _ === "function" ? _ : constant$2(_), drag) : subject;
  };

  drag.touchable = function(_) {
    return arguments.length ? (touchable = typeof _ === "function" ? _ : constant$2(!!_), drag) : touchable;
  };

  drag.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? drag : value;
  };

  drag.clickDistance = function(_) {
    return arguments.length ? (clickDistance2 = (_ = +_) * _, drag) : Math.sqrt(clickDistance2);
  };

  return drag;
}

function define(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

function Color() {}

var darker = 0.7;
var brighter = 1 / darker;

var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex = /^#([0-9a-f]{3,8})$/,
    reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`),
    reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`),
    reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`),
    reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`),
    reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`),
    reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);

var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};

define(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor, this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex, // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});

function color_formatHex() {
  return this.rgb().formatHex();
}

function color_formatHex8() {
  return this.rgb().formatHex8();
}

function color_formatHsl() {
  return hslConvert(this).formatHsl();
}

function color_formatRgb() {
  return this.rgb().formatRgb();
}

function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
      : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
      : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
      : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
      : null) // invalid hex
      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
      : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
      : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb;
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}

function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

define(Rgb, rgb, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return (-0.5 <= this.r && this.r < 255.5)
        && (-0.5 <= this.g && this.g < 255.5)
        && (-0.5 <= this.b && this.b < 255.5)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex, // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));

function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}

function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}

function rgb_formatRgb() {
  const a = clampa(this.opacity);
  return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
}

function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}

function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}

function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl;
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;
    else if (g === max) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}

function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

define(Hsl, hsl, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.l && this.l <= 1)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
  }
}));

function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}

function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60
      : h < 180 ? m2
      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
      : m1) * 255;
}

var constant$1 = x => () => x;

function linear$1(a, d) {
  return function(t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}

function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : constant$1(isNaN(a) ? b : a);
  };
}

function nogamma(a, b) {
  var d = b - a;
  return d ? linear$1(a, d) : constant$1(isNaN(a) ? b : a);
}

var interpolateRgb = (function rgbGamma(y) {
  var color = gamma(y);

  function rgb$1(start, end) {
    var r = color((start = rgb(start)).r, (end = rgb(end)).r),
        g = color(start.g, end.g),
        b = color(start.b, end.b),
        opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb$1.gamma = rgbGamma;

  return rgb$1;
})(1);

function numberArray(a, b) {
  if (!b) b = [];
  var n = a ? Math.min(b.length, a.length) : 0,
      c = b.slice(),
      i;
  return function(t) {
    for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
    return c;
  };
}

function isNumberArray$1(x) {
  return ArrayBuffer.isView(x) && !(x instanceof DataView);
}

function genericArray(a, b) {
  var nb = b ? b.length : 0,
      na = a ? Math.min(nb, a.length) : 0,
      x = new Array(na),
      c = new Array(nb),
      i;

  for (i = 0; i < na; ++i) x[i] = interpolate$1(a[i], b[i]);
  for (; i < nb; ++i) c[i] = b[i];

  return function(t) {
    for (i = 0; i < na; ++i) c[i] = x[i](t);
    return c;
  };
}

function date$1(a, b) {
  var d = new Date;
  return a = +a, b = +b, function(t) {
    return d.setTime(a * (1 - t) + b * t), d;
  };
}

function interpolateNumber(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}

function object(a, b) {
  var i = {},
      c = {},
      k;

  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};

  for (k in b) {
    if (k in a) {
      i[k] = interpolate$1(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }

  return function(t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
}

var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    reB = new RegExp(reA.source, "g");

function zero(b) {
  return function() {
    return b;
  };
}

function one(b) {
  return function(t) {
    return b(t) + "";
  };
}

function interpolateString(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
      am, // current match in a
      bm, // current match in b
      bs, // string preceding current number in b, if any
      i = -1, // index in s
      s = [], // string constants and placeholders
      q = []; // number interpolators

  // Coerce inputs to strings.
  a = a + "", b = b + "";

  // Interpolate pairs of numbers in a & b.
  while ((am = reA.exec(a))
      && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) { // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else { // interpolate non-matching numbers
      s[++i] = null;
      q.push({i: i, x: interpolateNumber(am, bm)});
    }
    bi = reB.lastIndex;
  }

  // Add remains of b.
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  }

  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2 ? (q[0]
      ? one(q[0].x)
      : zero(b))
      : (b = q.length, function(t) {
          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
          return s.join("");
        });
}

function interpolate$1(a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? constant$1(b)
      : (t === "number" ? interpolateNumber
      : t === "string" ? ((c = color(b)) ? (b = c, interpolateRgb) : interpolateString)
      : b instanceof color ? interpolateRgb
      : b instanceof Date ? date$1
      : isNumberArray$1(b) ? numberArray
      : Array.isArray(b) ? genericArray
      : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object
      : interpolateNumber)(a, b);
}

function interpolateRound(a, b) {
  return a = +a, b = +b, function(t) {
    return Math.round(a * (1 - t) + b * t);
  };
}

var degrees = 180 / Math.PI;

var identity$3 = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};

function decompose(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX: scaleX,
    scaleY: scaleY
  };
}

var svgNode;

/* eslint-disable no-undef */
function parseCss(value) {
  const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m.isIdentity ? identity$3 : decompose(m.a, m.b, m.c, m.d, m.e, m.f);
}

function parseSvg(value) {
  if (value == null) return identity$3;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return identity$3;
  value = value.matrix;
  return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
}

function interpolateTransform(parse, pxComma, pxParen, degParen) {

  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }

  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }

  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
      q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: interpolateNumber(a, b)});
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }

  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: interpolateNumber(a, b)});
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }

  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }

  return function(a, b) {
    var s = [], // string constants and placeholders
        q = []; // number interpolators
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null; // gc
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}

var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

var epsilon2 = 1e-12;

function cosh(x) {
  return ((x = Math.exp(x)) + 1 / x) / 2;
}

function sinh(x) {
  return ((x = Math.exp(x)) - 1 / x) / 2;
}

function tanh(x) {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}

var interpolateZoom = (function zoomRho(rho, rho2, rho4) {

  // p0 = [ux0, uy0, w0]
  // p1 = [ux1, uy1, w1]
  function zoom(p0, p1) {
    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
        ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
        dx = ux1 - ux0,
        dy = uy1 - uy0,
        d2 = dx * dx + dy * dy,
        i,
        S;

    // Special case for u0 ≅ u1.
    if (d2 < epsilon2) {
      S = Math.log(w1 / w0) / rho;
      i = function(t) {
        return [
          ux0 + t * dx,
          uy0 + t * dy,
          w0 * Math.exp(rho * t * S)
        ];
      };
    }

    // General case.
    else {
      var d1 = Math.sqrt(d2),
          b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
          b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
          r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
          r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S = (r1 - r0) / rho;
      i = function(t) {
        var s = t * S,
            coshr0 = cosh(r0),
            u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
        return [
          ux0 + u * dx,
          uy0 + u * dy,
          w0 * coshr0 / cosh(rho * s + r0)
        ];
      };
    }

    i.duration = S * 1000 * rho / Math.SQRT2;

    return i;
  }

  zoom.rho = function(_) {
    var _1 = Math.max(1e-3, +_), _2 = _1 * _1, _4 = _2 * _2;
    return zoomRho(_1, _2, _4);
  };

  return zoom;
})(Math.SQRT2, 2, 4);

var frame = 0, // is an animation frame pending?
    timeout$1 = 0, // is a timeout pending?
    interval = 0, // are any timers active?
    pokeDelay = 1000, // how frequently we check for clock skew
    taskHead,
    taskTail,
    clockLast = 0,
    clockNow = 0,
    clockSkew = 0,
    clock = typeof performance === "object" && performance.now ? performance : Date,
    setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}

function clearNow() {
  clockNow = 0;
}

function Timer() {
  this._call =
  this._time =
  this._next = null;
}

Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;
      else taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};

function timer(callback, delay, time) {
  var t = new Timer;
  t.restart(callback, delay, time);
  return t;
}

function timerFlush() {
  now(); // Get the current time, if not already set.
  ++frame; // Pretend we’ve set an alarm, if we haven’t already.
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(undefined, e);
    t = t._next;
  }
  --frame;
}

function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout$1 = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}

function poke() {
  var now = clock.now(), delay = now - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
}

function nap() {
  var t0, t1 = taskHead, t2, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time) time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}

function sleep(time) {
  if (frame) return; // Soonest alarm already set, or will be.
  if (timeout$1) timeout$1 = clearTimeout(timeout$1);
  var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
  if (delay > 24) {
    if (time < Infinity) timeout$1 = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}

function timeout(callback, delay, time) {
  var t = new Timer;
  delay = delay == null ? 0 : +delay;
  t.restart(elapsed => {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
}

var emptyOn = dispatch("start", "end", "cancel", "interrupt");
var emptyTween = [];

var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;

function schedule(node, name, id, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules) node.__transition = {};
  else if (id in schedules) return;
  create(node, id, {
    name: name,
    index: index, // For context during callback.
    group: group, // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}

function init(node, id) {
  var schedule = get(node, id);
  if (schedule.state > CREATED) throw new Error("too late; already scheduled");
  return schedule;
}

function set(node, id) {
  var schedule = get(node, id);
  if (schedule.state > STARTED) throw new Error("too late; already running");
  return schedule;
}

function get(node, id) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
  return schedule;
}

function create(node, id, self) {
  var schedules = node.__transition,
      tween;

  // Initialize the self timer when the transition is created.
  // Note the actual delay is not known until the first callback!
  schedules[id] = self;
  self.timer = timer(schedule, 0, self.time);

  function schedule(elapsed) {
    self.state = SCHEDULED;
    self.timer.restart(start, self.delay, self.time);

    // If the elapsed delay is less than our first sleep, start immediately.
    if (self.delay <= elapsed) start(elapsed - self.delay);
  }

  function start(elapsed) {
    var i, j, n, o;

    // If the state is not SCHEDULED, then we previously errored on start.
    if (self.state !== SCHEDULED) return stop();

    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self.name) continue;

      // While this element already has a starting transition during this frame,
      // defer starting an interrupting transition until that transition has a
      // chance to tick (and possibly end); see d3/d3-transition#54!
      if (o.state === STARTED) return timeout(start);

      // Interrupt the active transition, if any.
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }

      // Cancel any pre-empted transitions.
      else if (+i < id) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }
    }

    // Defer the first tick to end of the current frame; see d3/d3#1576.
    // Note the transition may be canceled after start and before the first tick!
    // Note this must be scheduled before the start event; see d3/d3-transition#16!
    // Assuming this is successful, subsequent callbacks go straight to tick.
    timeout(function() {
      if (self.state === STARTED) {
        self.state = RUNNING;
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    });

    // Dispatch the start event.
    // Note this must be done before the tween are initialized.
    self.state = STARTING;
    self.on.call("start", node, node.__data__, self.index, self.group);
    if (self.state !== STARTING) return; // interrupted
    self.state = STARTED;

    // Initialize the tween, deleting null tween.
    tween = new Array(n = self.tween.length);
    for (i = 0, j = -1; i < n; ++i) {
      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }

  function tick(elapsed) {
    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
        i = -1,
        n = tween.length;

    while (++i < n) {
      tween[i].call(node, t);
    }

    // Dispatch the end event.
    if (self.state === ENDING) {
      self.on.call("end", node, node.__data__, self.index, self.group);
      stop();
    }
  }

  function stop() {
    self.state = ENDED;
    self.timer.stop();
    delete schedules[id];
    for (var i in schedules) return; // eslint-disable-line no-unused-vars
    delete node.__transition;
  }
}

function interrupt(node, name) {
  var schedules = node.__transition,
      schedule,
      active,
      empty = true,
      i;

  if (!schedules) return;

  name = name == null ? null : name + "";

  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
    active = schedule.state > STARTING && schedule.state < ENDING;
    schedule.state = ENDED;
    schedule.timer.stop();
    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i];
  }

  if (empty) delete node.__transition;
}

function selection_interrupt(name) {
  return this.each(function() {
    interrupt(this, name);
  });
}

function tweenRemove(id, name) {
  var tween0, tween1;
  return function() {
    var schedule = set(this, id),
        tween = schedule.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }

    schedule.tween = tween1;
  };
}

function tweenFunction(id, name, value) {
  var tween0, tween1;
  if (typeof value !== "function") throw new Error;
  return function() {
    var schedule = set(this, id),
        tween = schedule.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n) tween1.push(t);
    }

    schedule.tween = tween1;
  };
}

function transition_tween(name, value) {
  var id = this._id;

  name += "";

  if (arguments.length < 2) {
    var tween = get(this.node(), id).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }

  return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
}

function tweenValue(transition, name, value) {
  var id = transition._id;

  transition.each(function() {
    var schedule = set(this, id);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });

  return function(node) {
    return get(node, id).value[name];
  };
}

function interpolate(a, b) {
  var c;
  return (typeof b === "number" ? interpolateNumber
      : b instanceof color ? interpolateRgb
      : (c = color(b)) ? (b = c, interpolateRgb)
      : interpolateString)(a, b);
}

function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant(name, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function attrConstantNS(fullname, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function attrFunction(name, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

function attrFunctionNS(fullname, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

function transition_attr(name, value) {
  var fullname = namespace(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate;
  return this.attrTween(name, typeof value === "function"
      ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value))
      : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname)
      : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
}

function attrInterpolate(name, i) {
  return function(t) {
    this.setAttribute(name, i.call(this, t));
  };
}

function attrInterpolateNS(fullname, i) {
  return function(t) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
  };
}

function attrTweenNS(fullname, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
    return t0;
  }
  tween._value = value;
  return tween;
}

function attrTween(name, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
    return t0;
  }
  tween._value = value;
  return tween;
}

function transition_attrTween(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  var fullname = namespace(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}

function delayFunction(id, value) {
  return function() {
    init(this, id).delay = +value.apply(this, arguments);
  };
}

function delayConstant(id, value) {
  return value = +value, function() {
    init(this, id).delay = value;
  };
}

function transition_delay(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? delayFunction
          : delayConstant)(id, value))
      : get(this.node(), id).delay;
}

function durationFunction(id, value) {
  return function() {
    set(this, id).duration = +value.apply(this, arguments);
  };
}

function durationConstant(id, value) {
  return value = +value, function() {
    set(this, id).duration = value;
  };
}

function transition_duration(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? durationFunction
          : durationConstant)(id, value))
      : get(this.node(), id).duration;
}

function easeConstant(id, value) {
  if (typeof value !== "function") throw new Error;
  return function() {
    set(this, id).ease = value;
  };
}

function transition_ease(value) {
  var id = this._id;

  return arguments.length
      ? this.each(easeConstant(id, value))
      : get(this.node(), id).ease;
}

function easeVarying(id, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (typeof v !== "function") throw new Error;
    set(this, id).ease = v;
  };
}

function transition_easeVarying(value) {
  if (typeof value !== "function") throw new Error;
  return this.each(easeVarying(this._id, value));
}

function transition_filter(match) {
  if (typeof match !== "function") match = matcher(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new Transition(subgroups, this._parents, this._name, this._id);
}

function transition_merge(transition) {
  if (transition._id !== this._id) throw new Error;

  for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new Transition(merges, this._parents, this._name, this._id);
}

function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0) t = t.slice(0, i);
    return !t || t === "start";
  });
}

function onFunction(id, name, listener) {
  var on0, on1, sit = start(name) ? init : set;
  return function() {
    var schedule = sit(this, id),
        on = schedule.on;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

    schedule.on = on1;
  };
}

function transition_on(name, listener) {
  var id = this._id;

  return arguments.length < 2
      ? get(this.node(), id).on.on(name)
      : this.each(onFunction(id, name, listener));
}

function removeFunction(id) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition) if (+i !== id) return;
    if (parent) parent.removeChild(this);
  };
}

function transition_remove() {
  return this.on("end.remove", removeFunction(this._id));
}

function transition_select(select) {
  var name = this._name,
      id = this._id;

  if (typeof select !== "function") select = selector(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        schedule(subgroup[i], name, id, i, subgroup, get(node, id));
      }
    }
  }

  return new Transition(subgroups, this._parents, name, id);
}

function transition_selectAll(select) {
  var name = this._name,
      id = this._id;

  if (typeof select !== "function") select = selectorAll(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children = select.call(node, node.__data__, i, group), child, inherit = get(node, id), k = 0, l = children.length; k < l; ++k) {
          if (child = children[k]) {
            schedule(child, name, id, k, children, inherit);
          }
        }
        subgroups.push(children);
        parents.push(node);
      }
    }
  }

  return new Transition(subgroups, parents, name, id);
}

var Selection = selection.prototype.constructor;

function transition_selection() {
  return new Selection(this._groups, this._parents);
}

function styleNull(name, interpolate) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0 = styleValue(this, name),
        string1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, string10 = string1);
  };
}

function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant(name, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = styleValue(this, name);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function styleFunction(name, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0 = styleValue(this, name),
        value1 = value(this),
        string1 = value1 + "";
    if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

function styleMaybeRemove(id, name) {
  var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
  return function() {
    var schedule = set(this, id),
        on = schedule.on,
        listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : undefined;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);

    schedule.on = on1;
  };
}

function transition_style(name, value, priority) {
  var i = (name += "") === "transform" ? interpolateTransformCss : interpolate;
  return value == null ? this
      .styleTween(name, styleNull(name, i))
      .on("end.style." + name, styleRemove(name))
    : typeof value === "function" ? this
      .styleTween(name, styleFunction(name, i, tweenValue(this, "style." + name, value)))
      .each(styleMaybeRemove(this._id, name))
    : this
      .styleTween(name, styleConstant(name, i, value), priority)
      .on("end.style." + name, null);
}

function styleInterpolate(name, i, priority) {
  return function(t) {
    this.style.setProperty(name, i.call(this, t), priority);
  };
}

function styleTween(name, value, priority) {
  var t, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
    return t;
  }
  tween._value = value;
  return tween;
}

function transition_styleTween(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
}

function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}

function transition_text(value) {
  return this.tween("text", typeof value === "function"
      ? textFunction(tweenValue(this, "text", value))
      : textConstant(value == null ? "" : value + ""));
}

function textInterpolate(i) {
  return function(t) {
    this.textContent = i.call(this, t);
  };
}

function textTween(value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
    return t0;
  }
  tween._value = value;
  return tween;
}

function transition_textTween(value) {
  var key = "text";
  if (arguments.length < 1) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  return this.tween(key, textTween(value));
}

function transition_transition() {
  var name = this._name,
      id0 = this._id,
      id1 = newId();

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var inherit = get(node, id0);
        schedule(node, name, id1, i, group, {
          time: inherit.time + inherit.delay + inherit.duration,
          delay: 0,
          duration: inherit.duration,
          ease: inherit.ease
        });
      }
    }
  }

  return new Transition(groups, this._parents, name, id1);
}

function transition_end() {
  var on0, on1, that = this, id = that._id, size = that.size();
  return new Promise(function(resolve, reject) {
    var cancel = {value: reject},
        end = {value: function() { if (--size === 0) resolve(); }};

    that.each(function() {
      var schedule = set(this, id),
          on = schedule.on;

      // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }

      schedule.on = on1;
    });

    // The selection was empty, resolve end immediately
    if (size === 0) resolve();
  });
}

var id = 0;

function Transition(groups, parents, name, id) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id;
}

function newId() {
  return ++id;
}

var selection_prototype = selection.prototype;

Transition.prototype = {
  constructor: Transition,
  select: transition_select,
  selectAll: transition_selectAll,
  selectChild: selection_prototype.selectChild,
  selectChildren: selection_prototype.selectChildren,
  filter: transition_filter,
  merge: transition_merge,
  selection: transition_selection,
  transition: transition_transition,
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: transition_on,
  attr: transition_attr,
  attrTween: transition_attrTween,
  style: transition_style,
  styleTween: transition_styleTween,
  text: transition_text,
  textTween: transition_textTween,
  remove: transition_remove,
  tween: transition_tween,
  delay: transition_delay,
  duration: transition_duration,
  ease: transition_ease,
  easeVarying: transition_easeVarying,
  end: transition_end,
  [Symbol.iterator]: selection_prototype[Symbol.iterator]
};

function cubicOut(t) {
  return --t * t * t + 1;
}

function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}

var defaultTiming = {
  time: null, // Set on use.
  delay: 0,
  duration: 250,
  ease: cubicInOut
};

function inherit(node, id) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id])) {
    if (!(node = node.parentNode)) {
      throw new Error(`transition ${id} not found`);
    }
  }
  return timing;
}

function selection_transition(name) {
  var id,
      timing;

  if (name instanceof Transition) {
    id = name._id, name = name._name;
  } else {
    id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
  }

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        schedule(node, name, id, i, group, timing || inherit(node, id));
      }
    }
  }

  return new Transition(groups, this._parents, name, id);
}

selection.prototype.interrupt = selection_interrupt;
selection.prototype.transition = selection_transition;

function formatDecimal(x) {
  return Math.abs(x = Math.round(x)) >= 1e21
      ? x.toLocaleString("en").replace(/,/g, "")
      : x.toString(10);
}

// Computes the decimal coefficient and exponent of the specified number x with
// significant digits p, where x is positive and p is in [1, 21] or undefined.
// For example, formatDecimalParts(1.23) returns ["123", 0].
function formatDecimalParts(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
  var i, coefficient = x.slice(0, i);

  // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x.slice(i + 1)
  ];
}

function exponent(x) {
  return x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
}

function formatGroup(grouping, thousands) {
  return function(value, width) {
    var i = value.length,
        t = [],
        j = 0,
        g = grouping[0],
        length = 0;

    while (i > 0 && g > 0) {
      if (length + g + 1 > width) g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width) break;
      g = grouping[j = (j + 1) % grouping.length];
    }

    return t.reverse().join(thousands);
  };
}

function formatNumerals(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
}

// [[fill]align][sign][symbol][0][width][,][.precision][~][type]
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

function formatSpecifier(specifier) {
  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}

formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

function FormatSpecifier(specifier) {
  this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
  this.align = specifier.align === undefined ? ">" : specifier.align + "";
  this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === undefined ? undefined : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === undefined ? "" : specifier.type + "";
}

FormatSpecifier.prototype.toString = function() {
  return this.fill
      + this.align
      + this.sign
      + this.symbol
      + (this.zero ? "0" : "")
      + (this.width === undefined ? "" : Math.max(1, this.width | 0))
      + (this.comma ? "," : "")
      + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0))
      + (this.trim ? "~" : "")
      + this.type;
};

// Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
function formatTrim(s) {
  out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
    switch (s[i]) {
      case ".": i0 = i1 = i; break;
      case "0": if (i0 === 0) i0 = i; i1 = i; break;
      default: if (!+s[i]) break out; if (i0 > 0) i0 = 0; break;
    }
  }
  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}

var prefixExponent;

function formatPrefixAuto(x, p) {
  var d = formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1],
      i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
      n = coefficient.length;
  return i === n ? coefficient
      : i > n ? coefficient + new Array(i - n + 1).join("0")
      : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
      : "0." + new Array(1 - i).join("0") + formatDecimalParts(x, Math.max(0, p + i - 1))[0]; // less than 1y!
}

function formatRounded(x, p) {
  var d = formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
      : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
      : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}

var formatTypes = {
  "%": (x, p) => (x * 100).toFixed(p),
  "b": (x) => Math.round(x).toString(2),
  "c": (x) => x + "",
  "d": formatDecimal,
  "e": (x, p) => x.toExponential(p),
  "f": (x, p) => x.toFixed(p),
  "g": (x, p) => x.toPrecision(p),
  "o": (x) => Math.round(x).toString(8),
  "p": (x, p) => formatRounded(x * 100, p),
  "r": formatRounded,
  "s": formatPrefixAuto,
  "X": (x) => Math.round(x).toString(16).toUpperCase(),
  "x": (x) => Math.round(x).toString(16)
};

function identity$2(x) {
  return x;
}

var map = Array.prototype.map,
    prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

function formatLocale$1(locale) {
  var group = locale.grouping === undefined || locale.thousands === undefined ? identity$2 : formatGroup(map.call(locale.grouping, Number), locale.thousands + ""),
      currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "",
      currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "",
      decimal = locale.decimal === undefined ? "." : locale.decimal + "",
      numerals = locale.numerals === undefined ? identity$2 : formatNumerals(map.call(locale.numerals, String)),
      percent = locale.percent === undefined ? "%" : locale.percent + "",
      minus = locale.minus === undefined ? "−" : locale.minus + "",
      nan = locale.nan === undefined ? "NaN" : locale.nan + "";

  function newFormat(specifier) {
    specifier = formatSpecifier(specifier);

    var fill = specifier.fill,
        align = specifier.align,
        sign = specifier.sign,
        symbol = specifier.symbol,
        zero = specifier.zero,
        width = specifier.width,
        comma = specifier.comma,
        precision = specifier.precision,
        trim = specifier.trim,
        type = specifier.type;

    // The "n" type is an alias for ",g".
    if (type === "n") comma = true, type = "g";

    // The "" type, and any invalid type, is an alias for ".12~g".
    else if (!formatTypes[type]) precision === undefined && (precision = 12), trim = true, type = "g";

    // If zero fill is specified, padding goes after sign and before digits.
    if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";

    // Compute the prefix and suffix.
    // For SI-prefix, the suffix is lazily computed.
    var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
        suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";

    // What format function should we use?
    // Is this an integer type?
    // Can this type generate exponential notation?
    var formatType = formatTypes[type],
        maybeSuffix = /[defgprs%]/.test(type);

    // Set the default precision if not specified,
    // or clamp the specified precision to the supported range.
    // For significant precision, it must be in [1, 21].
    // For fixed precision, it must be in [0, 20].
    precision = precision === undefined ? 6
        : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
        : Math.max(0, Math.min(20, precision));

    function format(value) {
      var valuePrefix = prefix,
          valueSuffix = suffix,
          i, n, c;

      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;

        // Determine the sign. -0 is not less than 0, but 1 / -0 is!
        var valueNegative = value < 0 || 1 / value < 0;

        // Perform the initial formatting.
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);

        // Trim insignificant zeros.
        if (trim) value = formatTrim(value);

        // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
        if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;

        // Compute the prefix and suffix.
        valuePrefix = (valueNegative ? (sign === "(" ? sign : minus) : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");

        // Break the formatted value into the integer “value” part that can be
        // grouped, and fractional or exponential “suffix” part that is not.
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c = value.charCodeAt(i), 48 > c || c > 57) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }

      // If the fill character is not "0", grouping is applied before padding.
      if (comma && !zero) value = group(value, Infinity);

      // Compute the padding.
      var length = valuePrefix.length + value.length + valueSuffix.length,
          padding = length < width ? new Array(width - length + 1).join(fill) : "";

      // If the fill character is "0", grouping is applied after padding.
      if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

      // Reconstruct the final output based on the desired alignment.
      switch (align) {
        case "<": value = valuePrefix + value + valueSuffix + padding; break;
        case "=": value = valuePrefix + padding + value + valueSuffix; break;
        case "^": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;
        default: value = padding + valuePrefix + value + valueSuffix; break;
      }

      return numerals(value);
    }

    format.toString = function() {
      return specifier + "";
    };

    return format;
  }

  function formatPrefix(specifier, value) {
    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
        e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
        k = Math.pow(10, -e),
        prefix = prefixes[8 + e / 3];
    return function(value) {
      return f(k * value) + prefix;
    };
  }

  return {
    format: newFormat,
    formatPrefix: formatPrefix
  };
}

var locale$1;
var format;
var formatPrefix;

defaultLocale$1({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});

function defaultLocale$1(definition) {
  locale$1 = formatLocale$1(definition);
  format = locale$1.format;
  formatPrefix = locale$1.formatPrefix;
  return locale$1;
}

function precisionFixed(step) {
  return Math.max(0, -exponent(Math.abs(step)));
}

function precisionPrefix(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
}

function precisionRound(step, max) {
  step = Math.abs(step), max = Math.abs(max) - step;
  return Math.max(0, exponent(max) - exponent(step)) + 1;
}

function initRange(domain, range) {
  switch (arguments.length) {
    case 0: break;
    case 1: this.range(domain); break;
    default: this.range(range).domain(domain); break;
  }
  return this;
}

function initInterpolator(domain, interpolator) {
  switch (arguments.length) {
    case 0: break;
    case 1: {
      if (typeof domain === "function") this.interpolator(domain);
      else this.range(domain);
      break;
    }
    default: {
      this.domain(domain);
      if (typeof interpolator === "function") this.interpolator(interpolator);
      else this.range(interpolator);
      break;
    }
  }
  return this;
}

const implicit = Symbol("implicit");

function ordinal() {
  var index = new InternMap(),
      domain = [],
      range = [],
      unknown = implicit;

  function scale(d) {
    let i = index.get(d);
    if (i === undefined) {
      if (unknown !== implicit) return unknown;
      index.set(d, i = domain.push(d) - 1);
    }
    return range[i % range.length];
  }

  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [], index = new InternMap();
    for (const value of _) {
      if (index.has(value)) continue;
      index.set(value, domain.push(value) - 1);
    }
    return scale;
  };

  scale.range = function(_) {
    return arguments.length ? (range = Array.from(_), scale) : range.slice();
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function() {
    return ordinal(domain, range).unknown(unknown);
  };

  initRange.apply(scale, arguments);

  return scale;
}

function band() {
  var scale = ordinal().unknown(undefined),
      domain = scale.domain,
      ordinalRange = scale.range,
      r0 = 0,
      r1 = 1,
      step,
      bandwidth,
      round = false,
      paddingInner = 0,
      paddingOuter = 0,
      align = 0.5;

  delete scale.unknown;

  function rescale() {
    var n = domain().length,
        reverse = r1 < r0,
        start = reverse ? r1 : r0,
        stop = reverse ? r0 : r1;
    step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
    if (round) step = Math.floor(step);
    start += (stop - start - step * (n - paddingInner)) * align;
    bandwidth = step * (1 - paddingInner);
    if (round) start = Math.round(start), bandwidth = Math.round(bandwidth);
    var values = range(n).map(function(i) { return start + step * i; });
    return ordinalRange(reverse ? values.reverse() : values);
  }

  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };

  scale.range = function(_) {
    return arguments.length ? ([r0, r1] = _, r0 = +r0, r1 = +r1, rescale()) : [r0, r1];
  };

  scale.rangeRound = function(_) {
    return [r0, r1] = _, r0 = +r0, r1 = +r1, round = true, rescale();
  };

  scale.bandwidth = function() {
    return bandwidth;
  };

  scale.step = function() {
    return step;
  };

  scale.round = function(_) {
    return arguments.length ? (round = !!_, rescale()) : round;
  };

  scale.padding = function(_) {
    return arguments.length ? (paddingInner = Math.min(1, paddingOuter = +_), rescale()) : paddingInner;
  };

  scale.paddingInner = function(_) {
    return arguments.length ? (paddingInner = Math.min(1, _), rescale()) : paddingInner;
  };

  scale.paddingOuter = function(_) {
    return arguments.length ? (paddingOuter = +_, rescale()) : paddingOuter;
  };

  scale.align = function(_) {
    return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
  };

  scale.copy = function() {
    return band(domain(), [r0, r1])
        .round(round)
        .paddingInner(paddingInner)
        .paddingOuter(paddingOuter)
        .align(align);
  };

  return initRange.apply(rescale(), arguments);
}

function pointish(scale) {
  var copy = scale.copy;

  scale.padding = scale.paddingOuter;
  delete scale.paddingInner;
  delete scale.paddingOuter;

  scale.copy = function() {
    return pointish(copy());
  };

  return scale;
}

function point() {
  return pointish(band.apply(null, arguments).paddingInner(1));
}

function constants(x) {
  return function() {
    return x;
  };
}

function number$1(x) {
  return +x;
}

var unit = [0, 1];

function identity$1(x) {
  return x;
}

function normalize(a, b) {
  return (b -= (a = +a))
      ? function(x) { return (x - a) / b; }
      : constants(isNaN(b) ? NaN : 0.5);
}

function clamper(a, b) {
  var t;
  if (a > b) t = a, a = b, b = t;
  return function(x) { return Math.max(a, Math.min(b, x)); };
}

// normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
// interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].
function bimap(domain, range, interpolate) {
  var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
  if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
  else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
  return function(x) { return r0(d0(x)); };
}

function polymap(domain, range, interpolate) {
  var j = Math.min(domain.length, range.length) - 1,
      d = new Array(j),
      r = new Array(j),
      i = -1;

  // Reverse descending domains.
  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }

  while (++i < j) {
    d[i] = normalize(domain[i], domain[i + 1]);
    r[i] = interpolate(range[i], range[i + 1]);
  }

  return function(x) {
    var i = bisect(domain, x, 1, j) - 1;
    return r[i](d[i](x));
  };
}

function copy$1(source, target) {
  return target
      .domain(source.domain())
      .range(source.range())
      .interpolate(source.interpolate())
      .clamp(source.clamp())
      .unknown(source.unknown());
}

function transformer$1() {
  var domain = unit,
      range = unit,
      interpolate = interpolate$1,
      transform,
      untransform,
      unknown,
      clamp = identity$1,
      piecewise,
      output,
      input;

  function rescale() {
    var n = Math.min(domain.length, range.length);
    if (clamp !== identity$1) clamp = clamper(domain[0], domain[n - 1]);
    piecewise = n > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }

  function scale(x) {
    return x == null || isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate)))(transform(clamp(x)));
  }

  scale.invert = function(y) {
    return clamp(untransform((input || (input = piecewise(range, domain.map(transform), interpolateNumber)))(y)));
  };

  scale.domain = function(_) {
    return arguments.length ? (domain = Array.from(_, number$1), rescale()) : domain.slice();
  };

  scale.range = function(_) {
    return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
  };

  scale.rangeRound = function(_) {
    return range = Array.from(_), interpolate = interpolateRound, rescale();
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = _ ? true : identity$1, rescale()) : clamp !== identity$1;
  };

  scale.interpolate = function(_) {
    return arguments.length ? (interpolate = _, rescale()) : interpolate;
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  return function(t, u) {
    transform = t, untransform = u;
    return rescale();
  };
}

function continuous() {
  return transformer$1()(identity$1, identity$1);
}

function tickFormat(start, stop, count, specifier) {
  var step = tickStep(start, stop, count),
      precision;
  specifier = formatSpecifier(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start), Math.abs(stop));
      if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
      return formatPrefix(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
      break;
    }
  }
  return format(specifier);
}

function linearish(scale) {
  var domain = scale.domain;

  scale.ticks = function(count) {
    var d = domain();
    return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
  };

  scale.tickFormat = function(count, specifier) {
    var d = domain();
    return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
  };

  scale.nice = function(count) {
    if (count == null) count = 10;

    var d = domain();
    var i0 = 0;
    var i1 = d.length - 1;
    var start = d[i0];
    var stop = d[i1];
    var prestep;
    var step;
    var maxIter = 10;

    if (stop < start) {
      step = start, start = stop, stop = step;
      step = i0, i0 = i1, i1 = step;
    }
    
    while (maxIter-- > 0) {
      step = tickIncrement(start, stop, count);
      if (step === prestep) {
        d[i0] = start;
        d[i1] = stop;
        return domain(d);
      } else if (step > 0) {
        start = Math.floor(start / step) * step;
        stop = Math.ceil(stop / step) * step;
      } else if (step < 0) {
        start = Math.ceil(start * step) / step;
        stop = Math.floor(stop * step) / step;
      } else {
        break;
      }
      prestep = step;
    }

    return scale;
  };

  return scale;
}

function linear() {
  var scale = continuous();

  scale.copy = function() {
    return copy$1(scale, linear());
  };

  initRange.apply(scale, arguments);

  return linearish(scale);
}

function nice(domain, interval) {
  domain = domain.slice();

  var i0 = 0,
      i1 = domain.length - 1,
      x0 = domain[i0],
      x1 = domain[i1],
      t;

  if (x1 < x0) {
    t = i0, i0 = i1, i1 = t;
    t = x0, x0 = x1, x1 = t;
  }

  domain[i0] = interval.floor(x0);
  domain[i1] = interval.ceil(x1);
  return domain;
}

function transformPow(exponent) {
  return function(x) {
    return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
  };
}

function transformSqrt(x) {
  return x < 0 ? -Math.sqrt(-x) : Math.sqrt(x);
}

function transformSquare(x) {
  return x < 0 ? -x * x : x * x;
}

function powish(transform) {
  var scale = transform(identity$1, identity$1),
      exponent = 1;

  function rescale() {
    return exponent === 1 ? transform(identity$1, identity$1)
        : exponent === 0.5 ? transform(transformSqrt, transformSquare)
        : transform(transformPow(exponent), transformPow(1 / exponent));
  }

  scale.exponent = function(_) {
    return arguments.length ? (exponent = +_, rescale()) : exponent;
  };

  return linearish(scale);
}

function pow() {
  var scale = powish(transformer$1());

  scale.copy = function() {
    return copy$1(scale, pow()).exponent(scale.exponent());
  };

  initRange.apply(scale, arguments);

  return scale;
}

const t0 = new Date, t1 = new Date;

function timeInterval(floori, offseti, count, field) {

  function interval(date) {
    return floori(date = arguments.length === 0 ? new Date : new Date(+date)), date;
  }

  interval.floor = (date) => {
    return floori(date = new Date(+date)), date;
  };

  interval.ceil = (date) => {
    return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
  };

  interval.round = (date) => {
    const d0 = interval(date), d1 = interval.ceil(date);
    return date - d0 < d1 - date ? d0 : d1;
  };

  interval.offset = (date, step) => {
    return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
  };

  interval.range = (start, stop, step) => {
    const range = [];
    start = interval.ceil(start);
    step = step == null ? 1 : Math.floor(step);
    if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
    let previous;
    do range.push(previous = new Date(+start)), offseti(start, step), floori(start);
    while (previous < start && start < stop);
    return range;
  };

  interval.filter = (test) => {
    return timeInterval((date) => {
      if (date >= date) while (floori(date), !test(date)) date.setTime(date - 1);
    }, (date, step) => {
      if (date >= date) {
        if (step < 0) while (++step <= 0) {
          while (offseti(date, -1), !test(date)) {} // eslint-disable-line no-empty
        } else while (--step >= 0) {
          while (offseti(date, +1), !test(date)) {} // eslint-disable-line no-empty
        }
      }
    });
  };

  if (count) {
    interval.count = (start, end) => {
      t0.setTime(+start), t1.setTime(+end);
      floori(t0), floori(t1);
      return Math.floor(count(t0, t1));
    };

    interval.every = (step) => {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null
          : !(step > 1) ? interval
          : interval.filter(field
              ? (d) => field(d) % step === 0
              : (d) => interval.count(0, d) % step === 0);
    };
  }

  return interval;
}

const millisecond = timeInterval(() => {
  // noop
}, (date, step) => {
  date.setTime(+date + step);
}, (start, end) => {
  return end - start;
});

// An optimized implementation for this simple case.
millisecond.every = (k) => {
  k = Math.floor(k);
  if (!isFinite(k) || !(k > 0)) return null;
  if (!(k > 1)) return millisecond;
  return timeInterval((date) => {
    date.setTime(Math.floor(date / k) * k);
  }, (date, step) => {
    date.setTime(+date + step * k);
  }, (start, end) => {
    return (end - start) / k;
  });
};

millisecond.range;

const durationSecond = 1000;
const durationMinute = durationSecond * 60;
const durationHour = durationMinute * 60;
const durationDay = durationHour * 24;
const durationWeek = durationDay * 7;
const durationMonth = durationDay * 30;
const durationYear = durationDay * 365;

const second = timeInterval((date) => {
  date.setTime(date - date.getMilliseconds());
}, (date, step) => {
  date.setTime(+date + step * durationSecond);
}, (start, end) => {
  return (end - start) / durationSecond;
}, (date) => {
  return date.getUTCSeconds();
});

second.range;

const timeMinute = timeInterval((date) => {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond);
}, (date, step) => {
  date.setTime(+date + step * durationMinute);
}, (start, end) => {
  return (end - start) / durationMinute;
}, (date) => {
  return date.getMinutes();
});

timeMinute.range;

const utcMinute = timeInterval((date) => {
  date.setUTCSeconds(0, 0);
}, (date, step) => {
  date.setTime(+date + step * durationMinute);
}, (start, end) => {
  return (end - start) / durationMinute;
}, (date) => {
  return date.getUTCMinutes();
});

utcMinute.range;

const timeHour = timeInterval((date) => {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond - date.getMinutes() * durationMinute);
}, (date, step) => {
  date.setTime(+date + step * durationHour);
}, (start, end) => {
  return (end - start) / durationHour;
}, (date) => {
  return date.getHours();
});

timeHour.range;

const utcHour = timeInterval((date) => {
  date.setUTCMinutes(0, 0, 0);
}, (date, step) => {
  date.setTime(+date + step * durationHour);
}, (start, end) => {
  return (end - start) / durationHour;
}, (date) => {
  return date.getUTCHours();
});

utcHour.range;

const timeDay = timeInterval(
  date => date.setHours(0, 0, 0, 0),
  (date, step) => date.setDate(date.getDate() + step),
  (start, end) => (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay,
  date => date.getDate() - 1
);

timeDay.range;

const utcDay = timeInterval((date) => {
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCDate(date.getUTCDate() + step);
}, (start, end) => {
  return (end - start) / durationDay;
}, (date) => {
  return date.getUTCDate() - 1;
});

utcDay.range;

const unixDay = timeInterval((date) => {
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCDate(date.getUTCDate() + step);
}, (start, end) => {
  return (end - start) / durationDay;
}, (date) => {
  return Math.floor(date / durationDay);
});

unixDay.range;

function timeWeekday(i) {
  return timeInterval((date) => {
    date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
    date.setHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setDate(date.getDate() + step * 7);
  }, (start, end) => {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
  });
}

const timeSunday = timeWeekday(0);
const timeMonday = timeWeekday(1);
const timeTuesday = timeWeekday(2);
const timeWednesday = timeWeekday(3);
const timeThursday = timeWeekday(4);
const timeFriday = timeWeekday(5);
const timeSaturday = timeWeekday(6);

timeSunday.range;
timeMonday.range;
timeTuesday.range;
timeWednesday.range;
timeThursday.range;
timeFriday.range;
timeSaturday.range;

function utcWeekday(i) {
  return timeInterval((date) => {
    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
    date.setUTCHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setUTCDate(date.getUTCDate() + step * 7);
  }, (start, end) => {
    return (end - start) / durationWeek;
  });
}

const utcSunday = utcWeekday(0);
const utcMonday = utcWeekday(1);
const utcTuesday = utcWeekday(2);
const utcWednesday = utcWeekday(3);
const utcThursday = utcWeekday(4);
const utcFriday = utcWeekday(5);
const utcSaturday = utcWeekday(6);

utcSunday.range;
utcMonday.range;
utcTuesday.range;
utcWednesday.range;
utcThursday.range;
utcFriday.range;
utcSaturday.range;

const timeMonth = timeInterval((date) => {
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
}, (date, step) => {
  date.setMonth(date.getMonth() + step);
}, (start, end) => {
  return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
}, (date) => {
  return date.getMonth();
});

timeMonth.range;

const utcMonth = timeInterval((date) => {
  date.setUTCDate(1);
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCMonth(date.getUTCMonth() + step);
}, (start, end) => {
  return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
}, (date) => {
  return date.getUTCMonth();
});

utcMonth.range;

const timeYear = timeInterval((date) => {
  date.setMonth(0, 1);
  date.setHours(0, 0, 0, 0);
}, (date, step) => {
  date.setFullYear(date.getFullYear() + step);
}, (start, end) => {
  return end.getFullYear() - start.getFullYear();
}, (date) => {
  return date.getFullYear();
});

// An optimized implementation for this simple case.
timeYear.every = (k) => {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : timeInterval((date) => {
    date.setFullYear(Math.floor(date.getFullYear() / k) * k);
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setFullYear(date.getFullYear() + step * k);
  });
};

timeYear.range;

const utcYear = timeInterval((date) => {
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCFullYear(date.getUTCFullYear() + step);
}, (start, end) => {
  return end.getUTCFullYear() - start.getUTCFullYear();
}, (date) => {
  return date.getUTCFullYear();
});

// An optimized implementation for this simple case.
utcYear.every = (k) => {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : timeInterval((date) => {
    date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setUTCFullYear(date.getUTCFullYear() + step * k);
  });
};

utcYear.range;

function ticker(year, month, week, day, hour, minute) {

  const tickIntervals = [
    [second,  1,      durationSecond],
    [second,  5,  5 * durationSecond],
    [second, 15, 15 * durationSecond],
    [second, 30, 30 * durationSecond],
    [minute,  1,      durationMinute],
    [minute,  5,  5 * durationMinute],
    [minute, 15, 15 * durationMinute],
    [minute, 30, 30 * durationMinute],
    [  hour,  1,      durationHour  ],
    [  hour,  3,  3 * durationHour  ],
    [  hour,  6,  6 * durationHour  ],
    [  hour, 12, 12 * durationHour  ],
    [   day,  1,      durationDay   ],
    [   day,  2,  2 * durationDay   ],
    [  week,  1,      durationWeek  ],
    [ month,  1,      durationMonth ],
    [ month,  3,  3 * durationMonth ],
    [  year,  1,      durationYear  ]
  ];

  function ticks(start, stop, count) {
    const reverse = stop < start;
    if (reverse) [start, stop] = [stop, start];
    const interval = count && typeof count.range === "function" ? count : tickInterval(start, stop, count);
    const ticks = interval ? interval.range(start, +stop + 1) : []; // inclusive stop
    return reverse ? ticks.reverse() : ticks;
  }

  function tickInterval(start, stop, count) {
    const target = Math.abs(stop - start) / count;
    const i = bisector(([,, step]) => step).right(tickIntervals, target);
    if (i === tickIntervals.length) return year.every(tickStep(start / durationYear, stop / durationYear, count));
    if (i === 0) return millisecond.every(Math.max(tickStep(start, stop, count), 1));
    const [t, step] = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
    return t.every(step);
  }

  return [ticks, tickInterval];
}
const [timeTicks, timeTickInterval] = ticker(timeYear, timeMonth, timeSunday, timeDay, timeHour, timeMinute);

function localDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
    date.setFullYear(d.y);
    return date;
  }
  return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
}

function utcDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
    date.setUTCFullYear(d.y);
    return date;
  }
  return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
}

function newDate(y, m, d) {
  return {y: y, m: m, d: d, H: 0, M: 0, S: 0, L: 0};
}

function formatLocale(locale) {
  var locale_dateTime = locale.dateTime,
      locale_date = locale.date,
      locale_time = locale.time,
      locale_periods = locale.periods,
      locale_weekdays = locale.days,
      locale_shortWeekdays = locale.shortDays,
      locale_months = locale.months,
      locale_shortMonths = locale.shortMonths;

  var periodRe = formatRe(locale_periods),
      periodLookup = formatLookup(locale_periods),
      weekdayRe = formatRe(locale_weekdays),
      weekdayLookup = formatLookup(locale_weekdays),
      shortWeekdayRe = formatRe(locale_shortWeekdays),
      shortWeekdayLookup = formatLookup(locale_shortWeekdays),
      monthRe = formatRe(locale_months),
      monthLookup = formatLookup(locale_months),
      shortMonthRe = formatRe(locale_shortMonths),
      shortMonthLookup = formatLookup(locale_shortMonths);

  var formats = {
    "a": formatShortWeekday,
    "A": formatWeekday,
    "b": formatShortMonth,
    "B": formatMonth,
    "c": null,
    "d": formatDayOfMonth,
    "e": formatDayOfMonth,
    "f": formatMicroseconds,
    "g": formatYearISO,
    "G": formatFullYearISO,
    "H": formatHour24,
    "I": formatHour12,
    "j": formatDayOfYear,
    "L": formatMilliseconds,
    "m": formatMonthNumber,
    "M": formatMinutes,
    "p": formatPeriod,
    "q": formatQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatSeconds,
    "u": formatWeekdayNumberMonday,
    "U": formatWeekNumberSunday,
    "V": formatWeekNumberISO,
    "w": formatWeekdayNumberSunday,
    "W": formatWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatYear,
    "Y": formatFullYear,
    "Z": formatZone,
    "%": formatLiteralPercent
  };

  var utcFormats = {
    "a": formatUTCShortWeekday,
    "A": formatUTCWeekday,
    "b": formatUTCShortMonth,
    "B": formatUTCMonth,
    "c": null,
    "d": formatUTCDayOfMonth,
    "e": formatUTCDayOfMonth,
    "f": formatUTCMicroseconds,
    "g": formatUTCYearISO,
    "G": formatUTCFullYearISO,
    "H": formatUTCHour24,
    "I": formatUTCHour12,
    "j": formatUTCDayOfYear,
    "L": formatUTCMilliseconds,
    "m": formatUTCMonthNumber,
    "M": formatUTCMinutes,
    "p": formatUTCPeriod,
    "q": formatUTCQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatUTCSeconds,
    "u": formatUTCWeekdayNumberMonday,
    "U": formatUTCWeekNumberSunday,
    "V": formatUTCWeekNumberISO,
    "w": formatUTCWeekdayNumberSunday,
    "W": formatUTCWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatUTCYear,
    "Y": formatUTCFullYear,
    "Z": formatUTCZone,
    "%": formatLiteralPercent
  };

  var parses = {
    "a": parseShortWeekday,
    "A": parseWeekday,
    "b": parseShortMonth,
    "B": parseMonth,
    "c": parseLocaleDateTime,
    "d": parseDayOfMonth,
    "e": parseDayOfMonth,
    "f": parseMicroseconds,
    "g": parseYear,
    "G": parseFullYear,
    "H": parseHour24,
    "I": parseHour24,
    "j": parseDayOfYear,
    "L": parseMilliseconds,
    "m": parseMonthNumber,
    "M": parseMinutes,
    "p": parsePeriod,
    "q": parseQuarter,
    "Q": parseUnixTimestamp,
    "s": parseUnixTimestampSeconds,
    "S": parseSeconds,
    "u": parseWeekdayNumberMonday,
    "U": parseWeekNumberSunday,
    "V": parseWeekNumberISO,
    "w": parseWeekdayNumberSunday,
    "W": parseWeekNumberMonday,
    "x": parseLocaleDate,
    "X": parseLocaleTime,
    "y": parseYear,
    "Y": parseFullYear,
    "Z": parseZone,
    "%": parseLiteralPercent
  };

  // These recursive directive definitions must be deferred.
  formats.x = newFormat(locale_date, formats);
  formats.X = newFormat(locale_time, formats);
  formats.c = newFormat(locale_dateTime, formats);
  utcFormats.x = newFormat(locale_date, utcFormats);
  utcFormats.X = newFormat(locale_time, utcFormats);
  utcFormats.c = newFormat(locale_dateTime, utcFormats);

  function newFormat(specifier, formats) {
    return function(date) {
      var string = [],
          i = -1,
          j = 0,
          n = specifier.length,
          c,
          pad,
          format;

      if (!(date instanceof Date)) date = new Date(+date);

      while (++i < n) {
        if (specifier.charCodeAt(i) === 37) {
          string.push(specifier.slice(j, i));
          if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);
          else pad = c === "e" ? " " : "0";
          if (format = formats[c]) c = format(date, pad);
          string.push(c);
          j = i + 1;
        }
      }

      string.push(specifier.slice(j, i));
      return string.join("");
    };
  }

  function newParse(specifier, Z) {
    return function(string) {
      var d = newDate(1900, undefined, 1),
          i = parseSpecifier(d, specifier, string += "", 0),
          week, day;
      if (i != string.length) return null;

      // If a UNIX timestamp is specified, return it.
      if ("Q" in d) return new Date(d.Q);
      if ("s" in d) return new Date(d.s * 1000 + ("L" in d ? d.L : 0));

      // If this is utcParse, never use the local timezone.
      if (Z && !("Z" in d)) d.Z = 0;

      // The am-pm flag is 0 for AM, and 1 for PM.
      if ("p" in d) d.H = d.H % 12 + d.p * 12;

      // If the month was not specified, inherit from the quarter.
      if (d.m === undefined) d.m = "q" in d ? d.q : 0;

      // Convert day-of-week and week-of-year to day-of-year.
      if ("V" in d) {
        if (d.V < 1 || d.V > 53) return null;
        if (!("w" in d)) d.w = 1;
        if ("Z" in d) {
          week = utcDate(newDate(d.y, 0, 1)), day = week.getUTCDay();
          week = day > 4 || day === 0 ? utcMonday.ceil(week) : utcMonday(week);
          week = utcDay.offset(week, (d.V - 1) * 7);
          d.y = week.getUTCFullYear();
          d.m = week.getUTCMonth();
          d.d = week.getUTCDate() + (d.w + 6) % 7;
        } else {
          week = localDate(newDate(d.y, 0, 1)), day = week.getDay();
          week = day > 4 || day === 0 ? timeMonday.ceil(week) : timeMonday(week);
          week = timeDay.offset(week, (d.V - 1) * 7);
          d.y = week.getFullYear();
          d.m = week.getMonth();
          d.d = week.getDate() + (d.w + 6) % 7;
        }
      } else if ("W" in d || "U" in d) {
        if (!("w" in d)) d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
        day = "Z" in d ? utcDate(newDate(d.y, 0, 1)).getUTCDay() : localDate(newDate(d.y, 0, 1)).getDay();
        d.m = 0;
        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day + 5) % 7 : d.w + d.U * 7 - (day + 6) % 7;
      }

      // If a time zone is specified, all fields are interpreted as UTC and then
      // offset according to the specified time zone.
      if ("Z" in d) {
        d.H += d.Z / 100 | 0;
        d.M += d.Z % 100;
        return utcDate(d);
      }

      // Otherwise, all fields are in local time.
      return localDate(d);
    };
  }

  function parseSpecifier(d, specifier, string, j) {
    var i = 0,
        n = specifier.length,
        m = string.length,
        c,
        parse;

    while (i < n) {
      if (j >= m) return -1;
      c = specifier.charCodeAt(i++);
      if (c === 37) {
        c = specifier.charAt(i++);
        parse = parses[c in pads ? specifier.charAt(i++) : c];
        if (!parse || ((j = parse(d, string, j)) < 0)) return -1;
      } else if (c != string.charCodeAt(j++)) {
        return -1;
      }
    }

    return j;
  }

  function parsePeriod(d, string, i) {
    var n = periodRe.exec(string.slice(i));
    return n ? (d.p = periodLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function parseShortWeekday(d, string, i) {
    var n = shortWeekdayRe.exec(string.slice(i));
    return n ? (d.w = shortWeekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function parseWeekday(d, string, i) {
    var n = weekdayRe.exec(string.slice(i));
    return n ? (d.w = weekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function parseShortMonth(d, string, i) {
    var n = shortMonthRe.exec(string.slice(i));
    return n ? (d.m = shortMonthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function parseMonth(d, string, i) {
    var n = monthRe.exec(string.slice(i));
    return n ? (d.m = monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function parseLocaleDateTime(d, string, i) {
    return parseSpecifier(d, locale_dateTime, string, i);
  }

  function parseLocaleDate(d, string, i) {
    return parseSpecifier(d, locale_date, string, i);
  }

  function parseLocaleTime(d, string, i) {
    return parseSpecifier(d, locale_time, string, i);
  }

  function formatShortWeekday(d) {
    return locale_shortWeekdays[d.getDay()];
  }

  function formatWeekday(d) {
    return locale_weekdays[d.getDay()];
  }

  function formatShortMonth(d) {
    return locale_shortMonths[d.getMonth()];
  }

  function formatMonth(d) {
    return locale_months[d.getMonth()];
  }

  function formatPeriod(d) {
    return locale_periods[+(d.getHours() >= 12)];
  }

  function formatQuarter(d) {
    return 1 + ~~(d.getMonth() / 3);
  }

  function formatUTCShortWeekday(d) {
    return locale_shortWeekdays[d.getUTCDay()];
  }

  function formatUTCWeekday(d) {
    return locale_weekdays[d.getUTCDay()];
  }

  function formatUTCShortMonth(d) {
    return locale_shortMonths[d.getUTCMonth()];
  }

  function formatUTCMonth(d) {
    return locale_months[d.getUTCMonth()];
  }

  function formatUTCPeriod(d) {
    return locale_periods[+(d.getUTCHours() >= 12)];
  }

  function formatUTCQuarter(d) {
    return 1 + ~~(d.getUTCMonth() / 3);
  }

  return {
    format: function(specifier) {
      var f = newFormat(specifier += "", formats);
      f.toString = function() { return specifier; };
      return f;
    },
    parse: function(specifier) {
      var p = newParse(specifier += "", false);
      p.toString = function() { return specifier; };
      return p;
    },
    utcFormat: function(specifier) {
      var f = newFormat(specifier += "", utcFormats);
      f.toString = function() { return specifier; };
      return f;
    },
    utcParse: function(specifier) {
      var p = newParse(specifier += "", true);
      p.toString = function() { return specifier; };
      return p;
    }
  };
}

var pads = {"-": "", "_": " ", "0": "0"},
    numberRe = /^\s*\d+/, // note: ignores next directive
    percentRe = /^%/,
    requoteRe = /[\\^$*+?|[\]().{}]/g;

function pad(value, fill, width) {
  var sign = value < 0 ? "-" : "",
      string = (sign ? -value : value) + "",
      length = string.length;
  return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
}

function requote(s) {
  return s.replace(requoteRe, "\\$&");
}

function formatRe(names) {
  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}

function formatLookup(names) {
  return new Map(names.map((name, i) => [name.toLowerCase(), i]));
}

function parseWeekdayNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.w = +n[0], i + n[0].length) : -1;
}

function parseWeekdayNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.u = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.U = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberISO(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.V = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.W = +n[0], i + n[0].length) : -1;
}

function parseFullYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 4));
  return n ? (d.y = +n[0], i + n[0].length) : -1;
}

function parseYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000), i + n[0].length) : -1;
}

function parseZone(d, string, i) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
  return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
}

function parseQuarter(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.q = n[0] * 3 - 3, i + n[0].length) : -1;
}

function parseMonthNumber(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
}

function parseDayOfMonth(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.d = +n[0], i + n[0].length) : -1;
}

function parseDayOfYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
}

function parseHour24(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.H = +n[0], i + n[0].length) : -1;
}

function parseMinutes(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.M = +n[0], i + n[0].length) : -1;
}

function parseSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.S = +n[0], i + n[0].length) : -1;
}

function parseMilliseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.L = +n[0], i + n[0].length) : -1;
}

function parseMicroseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 6));
  return n ? (d.L = Math.floor(n[0] / 1000), i + n[0].length) : -1;
}

function parseLiteralPercent(d, string, i) {
  var n = percentRe.exec(string.slice(i, i + 1));
  return n ? i + n[0].length : -1;
}

function parseUnixTimestamp(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.Q = +n[0], i + n[0].length) : -1;
}

function parseUnixTimestampSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.s = +n[0], i + n[0].length) : -1;
}

function formatDayOfMonth(d, p) {
  return pad(d.getDate(), p, 2);
}

function formatHour24(d, p) {
  return pad(d.getHours(), p, 2);
}

function formatHour12(d, p) {
  return pad(d.getHours() % 12 || 12, p, 2);
}

function formatDayOfYear(d, p) {
  return pad(1 + timeDay.count(timeYear(d), d), p, 3);
}

function formatMilliseconds(d, p) {
  return pad(d.getMilliseconds(), p, 3);
}

function formatMicroseconds(d, p) {
  return formatMilliseconds(d, p) + "000";
}

function formatMonthNumber(d, p) {
  return pad(d.getMonth() + 1, p, 2);
}

function formatMinutes(d, p) {
  return pad(d.getMinutes(), p, 2);
}

function formatSeconds(d, p) {
  return pad(d.getSeconds(), p, 2);
}

function formatWeekdayNumberMonday(d) {
  var day = d.getDay();
  return day === 0 ? 7 : day;
}

function formatWeekNumberSunday(d, p) {
  return pad(timeSunday.count(timeYear(d) - 1, d), p, 2);
}

function dISO(d) {
  var day = d.getDay();
  return (day >= 4 || day === 0) ? timeThursday(d) : timeThursday.ceil(d);
}

function formatWeekNumberISO(d, p) {
  d = dISO(d);
  return pad(timeThursday.count(timeYear(d), d) + (timeYear(d).getDay() === 4), p, 2);
}

function formatWeekdayNumberSunday(d) {
  return d.getDay();
}

function formatWeekNumberMonday(d, p) {
  return pad(timeMonday.count(timeYear(d) - 1, d), p, 2);
}

function formatYear(d, p) {
  return pad(d.getFullYear() % 100, p, 2);
}

function formatYearISO(d, p) {
  d = dISO(d);
  return pad(d.getFullYear() % 100, p, 2);
}

function formatFullYear(d, p) {
  return pad(d.getFullYear() % 10000, p, 4);
}

function formatFullYearISO(d, p) {
  var day = d.getDay();
  d = (day >= 4 || day === 0) ? timeThursday(d) : timeThursday.ceil(d);
  return pad(d.getFullYear() % 10000, p, 4);
}

function formatZone(d) {
  var z = d.getTimezoneOffset();
  return (z > 0 ? "-" : (z *= -1, "+"))
      + pad(z / 60 | 0, "0", 2)
      + pad(z % 60, "0", 2);
}

function formatUTCDayOfMonth(d, p) {
  return pad(d.getUTCDate(), p, 2);
}

function formatUTCHour24(d, p) {
  return pad(d.getUTCHours(), p, 2);
}

function formatUTCHour12(d, p) {
  return pad(d.getUTCHours() % 12 || 12, p, 2);
}

function formatUTCDayOfYear(d, p) {
  return pad(1 + utcDay.count(utcYear(d), d), p, 3);
}

function formatUTCMilliseconds(d, p) {
  return pad(d.getUTCMilliseconds(), p, 3);
}

function formatUTCMicroseconds(d, p) {
  return formatUTCMilliseconds(d, p) + "000";
}

function formatUTCMonthNumber(d, p) {
  return pad(d.getUTCMonth() + 1, p, 2);
}

function formatUTCMinutes(d, p) {
  return pad(d.getUTCMinutes(), p, 2);
}

function formatUTCSeconds(d, p) {
  return pad(d.getUTCSeconds(), p, 2);
}

function formatUTCWeekdayNumberMonday(d) {
  var dow = d.getUTCDay();
  return dow === 0 ? 7 : dow;
}

function formatUTCWeekNumberSunday(d, p) {
  return pad(utcSunday.count(utcYear(d) - 1, d), p, 2);
}

function UTCdISO(d) {
  var day = d.getUTCDay();
  return (day >= 4 || day === 0) ? utcThursday(d) : utcThursday.ceil(d);
}

function formatUTCWeekNumberISO(d, p) {
  d = UTCdISO(d);
  return pad(utcThursday.count(utcYear(d), d) + (utcYear(d).getUTCDay() === 4), p, 2);
}

function formatUTCWeekdayNumberSunday(d) {
  return d.getUTCDay();
}

function formatUTCWeekNumberMonday(d, p) {
  return pad(utcMonday.count(utcYear(d) - 1, d), p, 2);
}

function formatUTCYear(d, p) {
  return pad(d.getUTCFullYear() % 100, p, 2);
}

function formatUTCYearISO(d, p) {
  d = UTCdISO(d);
  return pad(d.getUTCFullYear() % 100, p, 2);
}

function formatUTCFullYear(d, p) {
  return pad(d.getUTCFullYear() % 10000, p, 4);
}

function formatUTCFullYearISO(d, p) {
  var day = d.getUTCDay();
  d = (day >= 4 || day === 0) ? utcThursday(d) : utcThursday.ceil(d);
  return pad(d.getUTCFullYear() % 10000, p, 4);
}

function formatUTCZone() {
  return "+0000";
}

function formatLiteralPercent() {
  return "%";
}

function formatUnixTimestamp(d) {
  return +d;
}

function formatUnixTimestampSeconds(d) {
  return Math.floor(+d / 1000);
}

var locale;
var timeFormat;

defaultLocale({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});

function defaultLocale(definition) {
  locale = formatLocale(definition);
  timeFormat = locale.format;
  locale.parse;
  locale.utcFormat;
  locale.utcParse;
  return locale;
}

function date(t) {
  return new Date(t);
}

function number(t) {
  return t instanceof Date ? +t : +new Date(+t);
}

function calendar(ticks, tickInterval, year, month, week, day, hour, minute, second, format) {
  var scale = continuous(),
      invert = scale.invert,
      domain = scale.domain;

  var formatMillisecond = format(".%L"),
      formatSecond = format(":%S"),
      formatMinute = format("%I:%M"),
      formatHour = format("%I %p"),
      formatDay = format("%a %d"),
      formatWeek = format("%b %d"),
      formatMonth = format("%B"),
      formatYear = format("%Y");

  function tickFormat(date) {
    return (second(date) < date ? formatMillisecond
        : minute(date) < date ? formatSecond
        : hour(date) < date ? formatMinute
        : day(date) < date ? formatHour
        : month(date) < date ? (week(date) < date ? formatDay : formatWeek)
        : year(date) < date ? formatMonth
        : formatYear)(date);
  }

  scale.invert = function(y) {
    return new Date(invert(y));
  };

  scale.domain = function(_) {
    return arguments.length ? domain(Array.from(_, number)) : domain().map(date);
  };

  scale.ticks = function(interval) {
    var d = domain();
    return ticks(d[0], d[d.length - 1], interval == null ? 10 : interval);
  };

  scale.tickFormat = function(count, specifier) {
    return specifier == null ? tickFormat : format(specifier);
  };

  scale.nice = function(interval) {
    var d = domain();
    if (!interval || typeof interval.range !== "function") interval = tickInterval(d[0], d[d.length - 1], interval == null ? 10 : interval);
    return interval ? domain(nice(d, interval)) : scale;
  };

  scale.copy = function() {
    return copy$1(scale, calendar(ticks, tickInterval, year, month, week, day, hour, minute, second, format));
  };

  return scale;
}

function time() {
  return initRange.apply(calendar(timeTicks, timeTickInterval, timeYear, timeMonth, timeSunday, timeDay, timeHour, timeMinute, second, timeFormat).domain([new Date(2000, 0, 1), new Date(2000, 0, 2)]), arguments);
}

function transformer() {
  var x0 = 0,
      x1 = 1,
      t0,
      t1,
      k10,
      transform,
      interpolator = identity$1,
      clamp = false,
      unknown;

  function scale(x) {
    return x == null || isNaN(x = +x) ? unknown : interpolator(k10 === 0 ? 0.5 : (x = (transform(x) - t0) * k10, clamp ? Math.max(0, Math.min(1, x)) : x));
  }

  scale.domain = function(_) {
    return arguments.length ? ([x0, x1] = _, t0 = transform(x0 = +x0), t1 = transform(x1 = +x1), k10 = t0 === t1 ? 0 : 1 / (t1 - t0), scale) : [x0, x1];
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = !!_, scale) : clamp;
  };

  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };

  function range(interpolate) {
    return function(_) {
      var r0, r1;
      return arguments.length ? ([r0, r1] = _, interpolator = interpolate(r0, r1), scale) : [interpolator(0), interpolator(1)];
    };
  }

  scale.range = range(interpolate$1);

  scale.rangeRound = range(interpolateRound);

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  return function(t) {
    transform = t, t0 = t(x0), t1 = t(x1), k10 = t0 === t1 ? 0 : 1 / (t1 - t0);
    return scale;
  };
}

function copy(source, target) {
  return target
      .domain(source.domain())
      .interpolator(source.interpolator())
      .clamp(source.clamp())
      .unknown(source.unknown());
}

function sequential() {
  var scale = linearish(transformer()(identity$1));

  scale.copy = function() {
    return copy(scale, sequential());
  };

  return initInterpolator.apply(scale, arguments);
}

var constant = x => () => x;

function ZoomEvent(type, {
  sourceEvent,
  target,
  transform,
  dispatch
}) {
  Object.defineProperties(this, {
    type: {value: type, enumerable: true, configurable: true},
    sourceEvent: {value: sourceEvent, enumerable: true, configurable: true},
    target: {value: target, enumerable: true, configurable: true},
    transform: {value: transform, enumerable: true, configurable: true},
    _: {value: dispatch}
  });
}

function Transform(k, x, y) {
  this.k = k;
  this.x = x;
  this.y = y;
}

Transform.prototype = {
  constructor: Transform,
  scale: function(k) {
    return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
  },
  translate: function(x, y) {
    return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
  },
  apply: function(point) {
    return [point[0] * this.k + this.x, point[1] * this.k + this.y];
  },
  applyX: function(x) {
    return x * this.k + this.x;
  },
  applyY: function(y) {
    return y * this.k + this.y;
  },
  invert: function(location) {
    return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
  },
  invertX: function(x) {
    return (x - this.x) / this.k;
  },
  invertY: function(y) {
    return (y - this.y) / this.k;
  },
  rescaleX: function(x) {
    return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
  },
  rescaleY: function(y) {
    return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};

var identity = new Transform(1, 0, 0);

Transform.prototype;

function nopropagation(event) {
  event.stopImmediatePropagation();
}

function noevent(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}

// Ignore right-click, since that should open the context menu.
// except for pinch-to-zoom, which is sent as a wheel+ctrlKey event
function defaultFilter(event) {
  return (!event.ctrlKey || event.type === 'wheel') && !event.button;
}

function defaultExtent() {
  var e = this;
  if (e instanceof SVGElement) {
    e = e.ownerSVGElement || e;
    if (e.hasAttribute("viewBox")) {
      e = e.viewBox.baseVal;
      return [[e.x, e.y], [e.x + e.width, e.y + e.height]];
    }
    return [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];
  }
  return [[0, 0], [e.clientWidth, e.clientHeight]];
}

function defaultTransform() {
  return this.__zoom || identity;
}

function defaultWheelDelta(event) {
  return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) * (event.ctrlKey ? 10 : 1);
}

function defaultTouchable() {
  return navigator.maxTouchPoints || ("ontouchstart" in this);
}

function defaultConstrain(transform, extent, translateExtent) {
  var dx0 = transform.invertX(extent[0][0]) - translateExtent[0][0],
      dx1 = transform.invertX(extent[1][0]) - translateExtent[1][0],
      dy0 = transform.invertY(extent[0][1]) - translateExtent[0][1],
      dy1 = transform.invertY(extent[1][1]) - translateExtent[1][1];
  return transform.translate(
    dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1),
    dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1)
  );
}

function zoom() {
  var filter = defaultFilter,
      extent = defaultExtent,
      constrain = defaultConstrain,
      wheelDelta = defaultWheelDelta,
      touchable = defaultTouchable,
      scaleExtent = [0, Infinity],
      translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]],
      duration = 250,
      interpolate = interpolateZoom,
      listeners = dispatch("start", "zoom", "end"),
      touchstarting,
      touchfirst,
      touchending,
      touchDelay = 500,
      wheelDelay = 150,
      clickDistance2 = 0,
      tapDistance = 10;

  function zoom(selection) {
    selection
        .property("__zoom", defaultTransform)
        .on("wheel.zoom", wheeled, {passive: false})
        .on("mousedown.zoom", mousedowned)
        .on("dblclick.zoom", dblclicked)
      .filter(touchable)
        .on("touchstart.zoom", touchstarted)
        .on("touchmove.zoom", touchmoved)
        .on("touchend.zoom touchcancel.zoom", touchended)
        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }

  zoom.transform = function(collection, transform, point, event) {
    var selection = collection.selection ? collection.selection() : collection;
    selection.property("__zoom", defaultTransform);
    if (collection !== selection) {
      schedule(collection, transform, point, event);
    } else {
      selection.interrupt().each(function() {
        gesture(this, arguments)
          .event(event)
          .start()
          .zoom(null, typeof transform === "function" ? transform.apply(this, arguments) : transform)
          .end();
      });
    }
  };

  zoom.scaleBy = function(selection, k, p, event) {
    zoom.scaleTo(selection, function() {
      var k0 = this.__zoom.k,
          k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return k0 * k1;
    }, p, event);
  };

  zoom.scaleTo = function(selection, k, p, event) {
    zoom.transform(selection, function() {
      var e = extent.apply(this, arguments),
          t0 = this.__zoom,
          p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p,
          p1 = t0.invert(p0),
          k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);
    }, p, event);
  };

  zoom.translateBy = function(selection, x, y, event) {
    zoom.transform(selection, function() {
      return constrain(this.__zoom.translate(
        typeof x === "function" ? x.apply(this, arguments) : x,
        typeof y === "function" ? y.apply(this, arguments) : y
      ), extent.apply(this, arguments), translateExtent);
    }, null, event);
  };

  zoom.translateTo = function(selection, x, y, p, event) {
    zoom.transform(selection, function() {
      var e = extent.apply(this, arguments),
          t = this.__zoom,
          p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p;
      return constrain(identity.translate(p0[0], p0[1]).scale(t.k).translate(
        typeof x === "function" ? -x.apply(this, arguments) : -x,
        typeof y === "function" ? -y.apply(this, arguments) : -y
      ), e, translateExtent);
    }, p, event);
  };

  function scale(transform, k) {
    k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
    return k === transform.k ? transform : new Transform(k, transform.x, transform.y);
  }

  function translate(transform, p0, p1) {
    var x = p0[0] - p1[0] * transform.k, y = p0[1] - p1[1] * transform.k;
    return x === transform.x && y === transform.y ? transform : new Transform(transform.k, x, y);
  }

  function centroid(extent) {
    return [(+extent[0][0] + +extent[1][0]) / 2, (+extent[0][1] + +extent[1][1]) / 2];
  }

  function schedule(transition, transform, point, event) {
    transition
        .on("start.zoom", function() { gesture(this, arguments).event(event).start(); })
        .on("interrupt.zoom end.zoom", function() { gesture(this, arguments).event(event).end(); })
        .tween("zoom", function() {
          var that = this,
              args = arguments,
              g = gesture(that, args).event(event),
              e = extent.apply(that, args),
              p = point == null ? centroid(e) : typeof point === "function" ? point.apply(that, args) : point,
              w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]),
              a = that.__zoom,
              b = typeof transform === "function" ? transform.apply(that, args) : transform,
              i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
          return function(t) {
            if (t === 1) t = b; // Avoid rounding error on end.
            else { var l = i(t), k = w / l[2]; t = new Transform(k, p[0] - l[0] * k, p[1] - l[1] * k); }
            g.zoom(null, t);
          };
        });
  }

  function gesture(that, args, clean) {
    return (!clean && that.__zooming) || new Gesture(that, args);
  }

  function Gesture(that, args) {
    this.that = that;
    this.args = args;
    this.active = 0;
    this.sourceEvent = null;
    this.extent = extent.apply(that, args);
    this.taps = 0;
  }

  Gesture.prototype = {
    event: function(event) {
      if (event) this.sourceEvent = event;
      return this;
    },
    start: function() {
      if (++this.active === 1) {
        this.that.__zooming = this;
        this.emit("start");
      }
      return this;
    },
    zoom: function(key, transform) {
      if (this.mouse && key !== "mouse") this.mouse[1] = transform.invert(this.mouse[0]);
      if (this.touch0 && key !== "touch") this.touch0[1] = transform.invert(this.touch0[0]);
      if (this.touch1 && key !== "touch") this.touch1[1] = transform.invert(this.touch1[0]);
      this.that.__zoom = transform;
      this.emit("zoom");
      return this;
    },
    end: function() {
      if (--this.active === 0) {
        delete this.that.__zooming;
        this.emit("end");
      }
      return this;
    },
    emit: function(type) {
      var d = select(this.that).datum();
      listeners.call(
        type,
        this.that,
        new ZoomEvent(type, {
          sourceEvent: this.sourceEvent,
          target: zoom,
          type,
          transform: this.that.__zoom,
          dispatch: listeners
        }),
        d
      );
    }
  };

  function wheeled(event, ...args) {
    if (!filter.apply(this, arguments)) return;
    var g = gesture(this, args).event(event),
        t = this.__zoom,
        k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))),
        p = pointer(event);

    // If the mouse is in the same location as before, reuse it.
    // If there were recent wheel events, reset the wheel idle timeout.
    if (g.wheel) {
      if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {
        g.mouse[1] = t.invert(g.mouse[0] = p);
      }
      clearTimeout(g.wheel);
    }

    // If this wheel event won’t trigger a transform change, ignore it.
    else if (t.k === k) return;

    // Otherwise, capture the mouse point and location at the start.
    else {
      g.mouse = [p, t.invert(p)];
      interrupt(this);
      g.start();
    }

    noevent(event);
    g.wheel = setTimeout(wheelidled, wheelDelay);
    g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));

    function wheelidled() {
      g.wheel = null;
      g.end();
    }
  }

  function mousedowned(event, ...args) {
    if (touchending || !filter.apply(this, arguments)) return;
    var currentTarget = event.currentTarget,
        g = gesture(this, args, true).event(event),
        v = select(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true),
        p = pointer(event, currentTarget),
        x0 = event.clientX,
        y0 = event.clientY;

    dragDisable(event.view);
    nopropagation(event);
    g.mouse = [p, this.__zoom.invert(p)];
    interrupt(this);
    g.start();

    function mousemoved(event) {
      noevent(event);
      if (!g.moved) {
        var dx = event.clientX - x0, dy = event.clientY - y0;
        g.moved = dx * dx + dy * dy > clickDistance2;
      }
      g.event(event)
       .zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = pointer(event, currentTarget), g.mouse[1]), g.extent, translateExtent));
    }

    function mouseupped(event) {
      v.on("mousemove.zoom mouseup.zoom", null);
      yesdrag(event.view, g.moved);
      noevent(event);
      g.event(event).end();
    }
  }

  function dblclicked(event, ...args) {
    if (!filter.apply(this, arguments)) return;
    var t0 = this.__zoom,
        p0 = pointer(event.changedTouches ? event.changedTouches[0] : event, this),
        p1 = t0.invert(p0),
        k1 = t0.k * (event.shiftKey ? 0.5 : 2),
        t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, args), translateExtent);

    noevent(event);
    if (duration > 0) select(this).transition().duration(duration).call(schedule, t1, p0, event);
    else select(this).call(zoom.transform, t1, p0, event);
  }

  function touchstarted(event, ...args) {
    if (!filter.apply(this, arguments)) return;
    var touches = event.touches,
        n = touches.length,
        g = gesture(this, args, event.changedTouches.length === n).event(event),
        started, i, t, p;

    nopropagation(event);
    for (i = 0; i < n; ++i) {
      t = touches[i], p = pointer(t, this);
      p = [p, this.__zoom.invert(p), t.identifier];
      if (!g.touch0) g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;
      else if (!g.touch1 && g.touch0[2] !== p[2]) g.touch1 = p, g.taps = 0;
    }

    if (touchstarting) touchstarting = clearTimeout(touchstarting);

    if (started) {
      if (g.taps < 2) touchfirst = p[0], touchstarting = setTimeout(function() { touchstarting = null; }, touchDelay);
      interrupt(this);
      g.start();
    }
  }

  function touchmoved(event, ...args) {
    if (!this.__zooming) return;
    var g = gesture(this, args).event(event),
        touches = event.changedTouches,
        n = touches.length, i, t, p, l;

    noevent(event);
    for (i = 0; i < n; ++i) {
      t = touches[i], p = pointer(t, this);
      if (g.touch0 && g.touch0[2] === t.identifier) g.touch0[0] = p;
      else if (g.touch1 && g.touch1[2] === t.identifier) g.touch1[0] = p;
    }
    t = g.that.__zoom;
    if (g.touch1) {
      var p0 = g.touch0[0], l0 = g.touch0[1],
          p1 = g.touch1[0], l1 = g.touch1[1],
          dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp,
          dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
      t = scale(t, Math.sqrt(dp / dl));
      p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
      l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
    }
    else if (g.touch0) p = g.touch0[0], l = g.touch0[1];
    else return;

    g.zoom("touch", constrain(translate(t, p, l), g.extent, translateExtent));
  }

  function touchended(event, ...args) {
    if (!this.__zooming) return;
    var g = gesture(this, args).event(event),
        touches = event.changedTouches,
        n = touches.length, i, t;

    nopropagation(event);
    if (touchending) clearTimeout(touchending);
    touchending = setTimeout(function() { touchending = null; }, touchDelay);
    for (i = 0; i < n; ++i) {
      t = touches[i];
      if (g.touch0 && g.touch0[2] === t.identifier) delete g.touch0;
      else if (g.touch1 && g.touch1[2] === t.identifier) delete g.touch1;
    }
    if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;
    if (g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
    else {
      g.end();
      // If this was a dbltap, reroute to the (optional) dblclick.zoom handler.
      if (g.taps === 2) {
        t = pointer(t, this);
        if (Math.hypot(touchfirst[0] - t[0], touchfirst[1] - t[1]) < tapDistance) {
          var p = select(this).on("dblclick.zoom");
          if (p) p.apply(this, arguments);
        }
      }
    }
  }

  zoom.wheelDelta = function(_) {
    return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : constant(+_), zoom) : wheelDelta;
  };

  zoom.filter = function(_) {
    return arguments.length ? (filter = typeof _ === "function" ? _ : constant(!!_), zoom) : filter;
  };

  zoom.touchable = function(_) {
    return arguments.length ? (touchable = typeof _ === "function" ? _ : constant(!!_), zoom) : touchable;
  };

  zoom.extent = function(_) {
    return arguments.length ? (extent = typeof _ === "function" ? _ : constant([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
  };

  zoom.scaleExtent = function(_) {
    return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom) : [scaleExtent[0], scaleExtent[1]];
  };

  zoom.translateExtent = function(_) {
    return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
  };

  zoom.constrain = function(_) {
    return arguments.length ? (constrain = _, zoom) : constrain;
  };

  zoom.duration = function(_) {
    return arguments.length ? (duration = +_, zoom) : duration;
  };

  zoom.interpolate = function(_) {
    return arguments.length ? (interpolate = _, zoom) : interpolate;
  };

  zoom.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? zoom : value;
  };

  zoom.clickDistance = function(_) {
    return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom) : Math.sqrt(clickDistance2);
  };

  zoom.tapDistance = function(_) {
    return arguments.length ? (tapDistance = +_, zoom) : tapDistance;
  };

  return zoom;
}

function mapSelection(selection, mapper) {
    var nodes = [];
    selection.each(function (d, i, g) {
        var mappingNode = mapper(select(g[i])).node();
        if (mappingNode)
            nodes.push(mappingNode);
    });
    return selectAll(nodes);
}
function applyClassList(selection, classList, active) {
    classList.forEach(function (classToApply) { return selection.classed(classToApply, active); });
    return selection;
}
function elementFromSelection(selection) {
    var element = selection === null || selection === void 0 ? void 0 : selection.node();
    if (!element)
        throw new Error(ErrorMessages.elementNotExisting);
    return element;
}
function cssVarFromSelection(selection, cssVar) {
    var element = selection === null || selection === void 0 ? void 0 : selection.node();
    if (!element || !(element instanceof Element))
        return undefined;
    return getComputedStyle(element).getPropertyValue(cssVar);
}
function createSelectionClasses(classes, leadingSpace) {
    if (leadingSpace === void 0) { leadingSpace = false; }
    var selector = classes.map(function (currentClass) { return '.' + currentClass; }).join('');
    var classString = classes.map(function (currentClass) { return ' ' + currentClass; }).join('');
    if (!leadingSpace)
        classString.trimStart();
    return { selector: selector, classString: classString };
}

function relateDragWayToSelection(e, selection) {
    var _a, _b;
    var rect = (_a = selection.node()) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
    if (!rect || !e || (window.TouchEvent && e instanceof TouchEvent && ((_b = e.touches) === null || _b === void 0 ? void 0 : _b[0]) === undefined))
        return undefined;
    var pointerPositionX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
    var pointerPositionY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
    var fromLeftTotal = calcLimited(pointerPositionX - rect.left, 0, rect.width);
    var fromTopTotal = calcLimited(pointerPositionY - rect.top, 0, rect.height);
    var fromLeftPercent = fromLeftTotal / rect.width;
    var fromTopPercent = fromTopTotal / rect.height;
    return { fromLeftPercent: fromLeftPercent, fromTopPercent: fromTopPercent };
}
function relateDragWayToSelectionByDiff(e, selection) {
    var _a;
    var rect = (_a = selection.node()) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
    if (!rect)
        return undefined;
    var dyRelative = e.dy / rect.height;
    var dxRelative = e.dx / rect.width;
    return { dyRelative: dyRelative, dxRelative: dxRelative };
}
function hasDrag(s) {
    var _a, _b;
    return s.empty() ? false : !!((_b = (_a = elementFromSelection(s)) === null || _a === void 0 ? void 0 : _a['__on']) === null || _b === void 0 ? void 0 : _b.find(function (listener) { return 'name' in listener && listener.name === 'drag'; }));
}
function attachActiveCursorLocking(selection) {
    var activeCursorClasses = [];
    var mutationObserver;
    selection.on('pointerdown.fixCursor', function (event) {
        if (!(event.target instanceof Element))
            return;
        var nearestCursorElement = event.target.closest('.cursor');
        if (!nearestCursorElement)
            return;
        fillActiveClasses(nearestCursorElement);
        updateCursorClasses(nearestCursorElement);
        function fillActiveClasses(nearestCursorElement) {
            activeCursorClasses.length = 0;
            cursorClasses.forEach(function (cursorClass) {
                if (nearestCursorElement.classList.contains(cursorClass))
                    activeCursorClasses.push(cursorClass);
            });
        }
        //For e.g. detecting cursor change on dragging axis from center to edge
        function updateCursorClasses(nearestCursorElement) {
            var _a;
            selection.selectAll('.cursor').classed('cursor-disabled', true);
            activeCursorClasses.forEach(function (activeClass) { return selection.classed(activeClass, true); });
            selection.classed('cursor', true);
            mutationObserver = (_a = detectClassChange(nearestCursorElement, function () {
                // console.log('CHANGE!', nearestCursorElement)
                activeCursorClasses.forEach(function (activeClass) { return selection.classed(activeClass, false); });
                fillActiveClasses(nearestCursorElement);
                activeCursorClasses.forEach(function (activeClass) { return selection.classed(activeClass, true); });
            })) === null || _a === void 0 ? void 0 : _a.observer;
        }
    });
    function activateCursors() {
        selection.selectAll('.cursor').classed('cursor-disabled', false);
        activeCursorClasses.forEach(function (activeClass) { return selection.classed(activeClass, false); });
        selection.classed('cursor', false);
        mutationObserver === null || mutationObserver === void 0 ? void 0 : mutationObserver.disconnect();
    }
    document.removeEventListener('pointerup', activateCursors);
    document.addEventListener('pointerup', activateCursors);
    return selection;
}

function addD3TransitionClass(transition) {
    transition
        .each(function () {
        select(this).classed("mid-d3-transit", true);
    })
        .on('end', function () {
        select(this).classed("mid-d3-transit", false);
    });
}
function addD3TransitionClassForSelection(s) {
    s.each(function () {
        select(this).classed("mid-d3-transit", true);
    });
}
function removeD3TransitionClassSelection(s) {
    s.each(function () {
        select(this).classed("mid-d3-transit", false);
    });
}
function addCSSTransitionEnterClass(selection, delayMS) {
    if (delayMS === void 0) { delayMS = 250; }
    selection.classed('animated', true)
        .transition('entering')
        .duration(0)
        .on('end', function () {
        var finishedS = select(this);
        finishedS.classed('entering', true)
            .interrupt('enter-done')
            .interrupt('entering')
            .transition('enter-done')
            .delay(delayMS - 1)
            .on('end', function () {
            select(this).classed('entering', false);
            select(this).classed('enter-done', true);
        });
    });
}
function addCSSTransitionExitClass(selection, delayMS) {
    if (delayMS === void 0) { delayMS = 250; }
    return selection
        .classed('exiting', true)
        .classed("enter-done", false)
        .transition('exiting')
        .delay(delayMS)
        .on('end.Exit', function () {
        if (!select(this).classed('exiting'))
            return;
        select(this)
            .classed("exiting", false)
            .classed("exit-done", true);
    });
}
function cancelExitClassOnUpdate(selection) {
    return selection.each(function (d, i, g) {
        if (select(g[i]).classed('exiting')) {
            select(g[i]).classed('exiting', false);
            select(g[i]).classed('enter-done', true);
        }
    });
}

function throttle(func, delayMs) {
    return {
        lastTime: 0,
        func: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var currentTime = new Date().getTime();
            if (currentTime - this.lastTime >= delayMs) {
                // console.trace('Func Works!?', currentTime - this.lastTime)
                func.apply(this, args);
                this.lastTime = currentTime;
            }
        }
    };
}
var ThrottleScheduled = /** @class */ (function () {
    function ThrottleScheduled(func, delayMs) {
        this.lastTime = 0;
        this.func = func;
        this.delayMs = delayMs;
    }
    ThrottleScheduled.prototype.invokeScheduled = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var currentTime = new Date().getTime();
        var timeDiff = currentTime - this.lastTime;
        if (timeDiff < this.delayMs) {
            this.timeout = setTimeout(function () { return _this.invokeScheduled.apply(_this, __spreadArray([], __read(args), false)); }, timeDiff);
            return;
        }
        clearTimeout(this.timeout);
        this.func.apply(this, args);
        this.lastTime = currentTime;
    };
    return ThrottleScheduled;
}());

function formatWithDecimalZero(formatFunction) {
    return function (val) {
        if (val === 0)
            return '0';
        return formatFunction(val);
    };
}

function bboxDiffSVG(svgS1, svgS2) {
    var _a, _b;
    var bbox1 = (_a = svgS1.node()) === null || _a === void 0 ? void 0 : _a.getBBox();
    var bbox2 = (_b = svgS2.node()) === null || _b === void 0 ? void 0 : _b.getBBox();
    if (!bbox1 || !bbox2) {
        return { leftCornersXDiff: 0, horizontalDiff: 0, leftCornersYDiff: 0, verticalDiff: 0,
            bbox1: new DOMRect(0, 0, 0, 0), bbox2: new DOMRect(0, 0, 0, 0),
        };
    }
    return {
        leftCornersXDiff: bbox2.x - bbox1.x,
        horizontalDiff: bbox2.x - bbox1.x + bbox1.width,
        leftCornersYDiff: bbox2.y - bbox1.y,
        verticalDiff: bbox2.y - bbox1.y + bbox1.height,
        bbox1: bbox1,
        bbox2: bbox2
    };
}

function positionRound(position, decimals) {
    if (decimals === void 0) { decimals = 0; }
    var e = Math.pow(10, decimals);
    return {
        x: Math.round(position.x * e) / e,
        y: Math.round(position.y * e) / e,
    };
}
function positionEquals(positionA, positionB, epsilon) {
    if (epsilon === void 0) { epsilon = 0.001; }
    return (Math.abs(positionA.x - positionB.x) < epsilon && Math.abs(positionA.y - positionB.y) < epsilon);
}
function positionToString(position, decimals) {
    if (decimals === void 0) { decimals = 1; }
    position = positionRound(position, decimals);
    return "".concat(position.x, ", ").concat(position.y);
}
function positionFromString(str) {
    var parts = str.split(',').map(function (s) { return parseFloat(s.trim()); });
    return { x: parts[0], y: parts[1] };
}
function positionToAttrs(selectionOrTransition, position) {
    position = positionRound(position);
    selectionOrTransition.attr('x', position.x);
    selectionOrTransition.attr('y', position.y);
}
function positionFromAttrs(selectionOrTransition) {
    var s = selectionOrTransition.selection();
    return { x: parseFloat(s.attr('x') || '0'), y: parseFloat(s.attr('y') || '0') };
}
function positionToTransformAttr(selectionOrTransition, position) {
    selectionOrTransition.attr('transform', "translate(".concat(positionToString(positionRound(position)), ")"));
}

/**
 * Note that the SVG text element must have a dominant-baseline value of "central"
 * for this function to work properly.
 * @param svgS SVG text element
 * @param bounds Bounds of Layout Twin Element
 */
function positionSVGTextToLayoutCenter(svgS, bounds) {
    var textElement = svgS.node();
    if (!textElement)
        return;
    var textSVGWidth = textElement.getBBox().width;
    svgS
        .attr('x', function () { return -textSVGWidth / 2 + bounds.width / 2; })
        .attr('y', function () { return bounds.height / 2; })
        .call((function (s) { return positionToTransformAttr(s, bounds); }));
}
function wrapTextByTwinWidth(textS) {
    textS.each(function (d, i, g) {
        var singleTextS = select(g[i]);
        var el = singleTextS.node();
        var bounds = singleTextS.attr('bounds');
        var rect = bounds ? rectFromString(bounds) : undefined;
        var wrapTextActive = el ? getComputedStyle(el).getPropertyValue('--text-wrap') : 'false';
        if (!el || !rect || wrapTextActive !== 'true')
            return;
        wrapText(select(g[i]), rect.width);
    });
}
//based on https://gist.github.com/mbostock/7555321
function wrapText(textS, width) {
    textS.each(function () {
        var offset = 0.5; // due to baseline central
        var lineHeight = 1.1;
        var text = select(this);
        var words = text.text().split(/\s+/).reverse();
        var word = words.pop();
        if (!word)
            return;
        var line = [];
        var tspan = text.text('').append("tspan").attr("x", 0).attr("y", 0).attr("dy", offset + "em");
        while (word) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() <= width) {
                word = words.pop();
                continue;
            }
            if (line.length < 2) {
                word = words.pop();
            }
            else {
                word = line.pop();
                tspan.text(line.join(" "));
            }
            line = [];
            tspan = text.append("tspan")
                .attr("x", 0)
                .attr("dy", lineHeight + "em");
        }
        var textAlign = getComputedStyle(text.node()).textAlign;
        if (textAlign && textAlign === 'center')
            text.selectAll('tspan').each(function () {
                var diff = width - this.getComputedTextLength();
                select(this).attr('x', diff / 2);
            });
    });
}

function sizeRound(size, decimals) {
    if (decimals === void 0) { decimals = 0; }
    var e = Math.pow(10, decimals);
    return {
        width: Math.round(size.width * e) / e,
        height: Math.round(size.height * e) / e,
    };
}
function sizeEquals(a, b, epsilon) {
    if (epsilon === void 0) { epsilon = 0.001; }
    return Math.abs(a.width - b.width) < epsilon && Math.abs(a.height - b.height) < epsilon;
}
function sizeToString(size, decimals) {
    if (decimals === void 0) { decimals = 1; }
    size = sizeRound(size, decimals);
    return "".concat(size.width, ", ").concat(size.height);
}
function sizeFromString(str) {
    var parts = str.split(',').map(function (s) { return parseFloat(s.trim()); });
    return { width: parts[0], height: parts[1] };
}
function sizeToAttrs(selectionOrTransition, size) {
    size = sizeRound(size);
    selectionOrTransition.attr('width', size.width); //Typescript Problem on chaining?
    selectionOrTransition.attr('height', size.height);
}
function sizeFromAttrs(selectionOrTransition) {
    var s = selectionOrTransition.selection();
    return { width: parseFloat(s.attr('width') || '0'), height: parseFloat(s.attr('height') || '0') };
}

// inspired by https://stackoverflow.com/a/22909984
function elementComputedStyleWithoutDefaults(element, properties) {
    var dummy = document.createElement('style-dummy-tag');
    element.parentElement.appendChild(dummy);
    var defaultStyle = window.getComputedStyle(dummy);
    var style = window.getComputedStyle(element);
    var diff = {};
    properties.forEach(function (p) {
        var defaultValue = defaultStyle.getPropertyValue(p);
        var value = style.getPropertyValue(p);
        if (p === 'overflow' || defaultValue !== value) {
            diff[p] = value;
        }
    });
    dummy.remove();
    return diff;
}
function isElement(obj) {
    return obj instanceof Element || obj instanceof HTMLElement || obj instanceof SVGElement;
}
// extracted from the SVG specification
var elementSVGPresentationAttrs = [
    'fill',
    'alignment-baseline',
    'baseline-shift',
    'clip-path',
    'clip-rule',
    'color',
    'color-interpolation',
    'color-interpolation-filters',
    'color-rendering',
    'cursor',
    'direction',
    'display',
    'dominant-baseline',
    'fill-opacity',
    'fill-rule',
    'filter',
    'flood-color',
    'flood-opacity',
    'font-family',
    'font-size',
    'font-size-adjust',
    'font-stretch',
    'font-style',
    'font-variant',
    'font-weight',
    'glyph-orientation-horizontal',
    'glyph-orientation-vertical',
    'image-rendering',
    'letter-spacing',
    'lighting-color',
    'marker-end',
    'marker-mid',
    'marker-start',
    'mask',
    'opacity',
    'overflow',
    'paint-order',
    'pointer-events',
    'shape-rendering',
    'stop-color',
    'stop-opacity',
    'stroke',
    'stroke-dasharray',
    'stroke-dashoffset',
    'stroke-linecap',
    'stroke-linejoin',
    'stroke-miterlimit',
    'stroke-opacity',
    'stroke-width',
    'text-anchor',
    'text-decoration',
    'text-overflow',
    'text-rendering',
    'unicode-bidi',
    'vector-effect',
    'visibility',
    'white-space',
    'word-spacing',
    'writing-mode',
    'transform',
];
var elementSVGTransformStyles = [
    'transform-box',
    'transform-origin'
];

function rectRound(rect, decimals) {
    if (decimals === void 0) { decimals = 0; }
    return __assign(__assign({}, positionRound(rect, decimals)), sizeRound(rect, decimals));
}
function rectEquals(rectA, rectB, epsilon) {
    if (epsilon === void 0) { epsilon = 0.001; }
    return positionEquals(rectA, rectB, epsilon) && sizeEquals(rectA, rectB, epsilon);
}
function rectMinimized(rect) {
    return __assign(__assign({}, rectCenter(rect)), { width: 0, height: 0 });
}
function rectFitStroke(rect, stroke) {
    return {
        x: rect.x + stroke / 2,
        y: rect.y + stroke / 2,
        width: Math.max(0, rect.width - stroke),
        height: Math.max(0, rect.height - stroke),
    };
}
function rectPosition(rect, sizePercentageFromTopLeft) {
    return {
        x: rect.x + rect.width * sizePercentageFromTopLeft.x,
        y: rect.y + rect.height * sizePercentageFromTopLeft.y,
    };
}
function rectCenter(rect) {
    return rectPosition(rect, { x: 0.5, y: 0.5 });
}
function rectTop(rect) {
    return rectPosition(rect, { x: 0.5, y: 0 });
}
function rectBottom(rect) {
    return rectPosition(rect, { x: 0.5, y: 1 });
}
function rectLeft(rect) {
    return rectPosition(rect, { x: 0, y: 0.5 });
}
function rectRight(rect) {
    return rectPosition(rect, { x: 1, y: 0.5 });
}
function rectBottomLeft(rect) {
    return rectPosition(rect, { x: 0, y: 1 });
}
function rectBottomRight(rect) {
    return rectPosition(rect, { x: 1, y: 1 });
}
function rectTopRight(rect) {
    return rectPosition(rect, { x: 1, y: 0 });
}
function rectTopLeft(rect) {
    return rectPosition(rect, { x: 0, y: 0 });
}
function rectToString(rect, decimals) {
    if (decimals === void 0) { decimals = 0; }
    return "".concat(positionToString(rect, decimals), ", ").concat(sizeToString(rect, decimals));
}
function rectFromString(str) {
    var parts = str.split(',').map(function (s) { return parseFloat(s.trim()); });
    return { x: parts[0], y: parts[1], width: parts[2], height: parts[3] };
}
function rectToViewBox(selectionOrTransition, rect) {
    selectionOrTransition
        .call(function (s) {
        var _a = positionRound(rect), x = _a.x, y = _a.y;
        var _b = sizeRound(rect), width = _b.width, height = _b.height;
        s.attr('viewbox', "".concat(x, ", ").concat(y, ", ").concat(width, ", ").concat(height));
    });
}
function rectToAttrs(selectionOrTransition, rect) {
    selectionOrTransition
        .call(function (s) { return positionToAttrs(s, rect); })
        .call(function (s) { return sizeToAttrs(s, rect); });
}
function rectFromAttrs(selectionOrTransition) {
    return __assign(__assign({}, positionFromAttrs(selectionOrTransition)), sizeFromAttrs(selectionOrTransition));
}
function rectFromSize(size) {
    return __assign({ x: 0, y: 0 }, size);
}
function rectToPath(selectionOrTransition, rect) {
    var x = rect.x, y = rect.y, w = rect.width, h = rect.height;
    selectionOrTransition = isElement(selectionOrTransition)
        ? select(selectionOrTransition)
        : selectionOrTransition;
    selectionOrTransition.attr('d', "M ".concat(x, " ").concat(y, " h ").concat(w, " v ").concat(h, " h ").concat(-w, " v ").concat(-h));
}

function circleRound(circle, decimals) {
    if (decimals === void 0) { decimals = 0; }
    var e = Math.pow(10, decimals);
    return {
        center: positionRound(circle.center, decimals),
        radius: Math.round(circle.radius * e) / e,
    };
}
function circleEquals(a, b, epsilon) {
    if (epsilon === void 0) { epsilon = 0.001; }
    return positionEquals(a.center, b.center, epsilon) && Math.abs(a.radius - b.radius) < epsilon;
}
function circleToString(circle, decimals) {
    if (decimals === void 0) { decimals = 1; }
    circle = circleRound(circle, decimals);
    return "".concat(circle.center.x, ", ").concat(circle.center.y, ", ").concat(circle.radius);
}
function circleFromString(str) {
    var parts = str.split(',').map(function (s) { return parseFloat(s.trim()); });
    return { center: { x: parts[0], y: parts[1] }, radius: parts[2] };
}
function circleToAttrs(selectionOrTransition, circle) {
    var _a;
    selectionOrTransition.attr('cx', circle.center.x); //Typescript Problem on chaining?
    selectionOrTransition.attr('cy', circle.center.y);
    selectionOrTransition.attr('r', circle.radius);
    selectionOrTransition.attr('fill', (_a = circle.color) !== null && _a !== void 0 ? _a : null);
}
function circleToAttrsFromSelection(selectionOrTransition) {
    selectionOrTransition.attr('cx', function (d) { return d.center.x; }); //Typescript Problem on chaining?
    selectionOrTransition.attr('cy', function (d) { return d.center.y; });
    selectionOrTransition.attr('r', function (d) { return d.radius; });
    selectionOrTransition.attr('fill', function (d) { var _a; return (_a = d.color) !== null && _a !== void 0 ? _a : null; });
}
function circleFromAttrs(selectionOrTransition) {
    var s = selectionOrTransition.selection();
    return {
        center: { x: parseFloat(s.attr('cx') || '0'), y: parseFloat(s.attr('cy') || '0') },
        radius: parseFloat(s.attr('r') || '0'),
    };
}
function circleMinimized(circle) {
    return { center: circle.center, radius: 0 };
}
function circleFitStroke(circle, stroke) {
    return { center: circle.center, radius: circle.radius - stroke / 2 };
}
function circlePosition(circle, angleInDegrees, distancePercentage) {
    if (distancePercentage === void 0) { distancePercentage = 1; }
    var angleInRad = (angleInDegrees * Math.PI) / 180;
    return {
        x: circle.center.x + circle.radius * Math.cos(angleInRad) * distancePercentage,
        y: circle.center.y + circle.radius * Math.sin(angleInRad) * distancePercentage,
    };
}
function circleInsideRect(rect) {
    return { center: rectCenter(rect), radius: Math.min(rect.width, rect.height) / 2 };
}
function circleOutsideRect(rect) {
    return {
        center: rectCenter(rect),
        radius: Math.sqrt(Math.pow(rect.width, 2) + Math.pow(rect.height, 2)) / 2,
    };
}
function circleToPath(selectionOrTransition, circle) {
    var _a = circle.center, cx = _a.x, cy = _a.y, r = circle.radius;
    selectionOrTransition = isElement(selectionOrTransition)
        ? select(selectionOrTransition)
        : selectionOrTransition;
    selectionOrTransition.attr('d', "M ".concat(cx - r, " ").concat(cy, " \n    a ").concat(r, ",").concat(r, " 0 1,0 ").concat(r * 2, ",0 \n    a ").concat(r, ",").concat(r, " 0 1,0 -").concat(r * 2, ",0"));
}

function ellipseInsideRect(rect) {
    return { center: rectCenter(rect), rx: rect.width / 2, ry: rect.height / 2 };
}
function ellipseToAttrs(selectionOrTransition, ellipse) {
    var _a;
    selectionOrTransition.attr('cx', ellipse.center.x); //Typescript Problem on chaining?
    selectionOrTransition.attr('cy', ellipse.center.y);
    selectionOrTransition.attr('rx', ellipse.rx);
    selectionOrTransition.attr('ry', ellipse.ry);
    selectionOrTransition.attr('fill', (_a = ellipse.color) !== null && _a !== void 0 ? _a : null);
}

function lineToPath(selectionOrTransition, positions) {
    if (positions.length < 2)
        return;
    selectionOrTransition = isElement(selectionOrTransition)
        ? select(selectionOrTransition)
        : selectionOrTransition;
    selectionOrTransition.attr('d', "M".concat(positions.map(function (p) { return "".concat(p.x, ",").concat(p.y); }).join('L')));
}

function normalizeAngle(degrees) {
    degrees = degrees % 360;
    return degrees < 0 ? degrees + 360 : degrees;
}

var RVArray;
(function (RVArray) {
    function equalizeLengths(array1, array2) {
        if (!Array.isArray(array1) || !Array.isArray(array2))
            throw new Error('Wrong usage of array util!');
        var lowerLength = array1.length < array2.length ? array1.length : array2.length;
        return [array1.slice(0, lowerLength), array2.slice(0, lowerLength)];
    }
    RVArray.equalizeLengths = equalizeLengths;
    function sum(array) {
        return array.reduce(function (sum, val) { return sum + val; }, 0);
    }
    RVArray.sum = sum;
    function mapToRanks(arr) {
        var arrOrder = arr.map(function () { return 1; });
        for (var j = 0; j < arr.length; j++) {
            for (var i = j + 1; i < arr.length; i++) {
                if (arr[j] > arr[i])
                    arrOrder[j] = arrOrder[j] + 1;
                else if (arr[j] < arr[i])
                    arrOrder[i] = arrOrder[i] + 1;
            }
        }
        return arrOrder;
    }
    RVArray.mapToRanks = mapToRanks;
    function clearDuplicatedValues(array) {
        return array.reduce(function (prev, current) { return prev.includes(current) ? prev : __spreadArray(__spreadArray([], __read(prev), false), [current], false); }, []);
    }
    RVArray.clearDuplicatedValues = clearDuplicatedValues;
    function isNumberArray(arr) {
        return arr.length > 0 && arr.every(function (el) { return typeof el === 'number'; });
    }
    RVArray.isNumberArray = isNumberArray;
    function isDateArray(arr) {
        return arr.length > 0 && arr.every(function (el) { return el instanceof Date; });
    }
    RVArray.isDateArray = isDateArray;
    function hasValueOf(arr) {
        return arr.length > 0 && arr.every(function (el) { return typeof el.valueOf === "number"; });
    }
    RVArray.hasValueOf = hasValueOf;
    function isStringArray(arr) {
        return arr.length > 0 && arr.every(function (el) { return typeof el === 'string'; });
    }
    RVArray.isStringArray = isStringArray;
    // export function arrayIs2D(array: any): array is any[][] {
    //   return Array.isArray(array) && array.every((e) => Array.isArray(e));
    // }
    //
})(RVArray || (RVArray = {}));

function applyMixins(derivedCtor, constructors) {
    constructors.forEach(function (baseCtor) {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
            Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
                Object.create(null));
        });
    });
}

function uniqueId() {
    //@ts-ignore
    if (window.crypto && window.crypto.randomUUID)
        return crypto.randomUUID();
    //Taken from https://stackoverflow.com/questions/3231459/how-can-i-create-unique-ids-with-javascript
    // Tofandel Aug 14, 2023
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 12).padStart(12, '0');
}

function elementRelativeBounds(element) {
    console.assert(element.isConnected, 'Element needs to be attached to the DOM.');
    var bounds = element.getBoundingClientRect();
    var parentBounds = element.parentElement.getBoundingClientRect();
    return rectRound({
        x: bounds.x - parentBounds.x,
        y: bounds.y - parentBounds.y,
        width: bounds.width,
        height: bounds.height,
    }, 2);
}
function elementAbsoluteBounds(element) {
    var viewPortE = element.closest('svg');
    console.assert(element.isConnected && viewPortE, 'Element needs to be attached to the DOM and must have SVG Ancestor.');
    if (!viewPortE || !('getBBox' in element))
        return rectRound(element.getBoundingClientRect(), 2);
    var elementBoundsFromViewport = element.getBoundingClientRect();
    var elementBoundsBBox = element.getBBox();
    var finalBounds = {
        x: elementBoundsFromViewport.x - elementBoundsBBox.x,
        y: elementBoundsFromViewport.y - elementBoundsBBox.y,
        width: elementBoundsBBox.width,
        height: elementBoundsBBox.height
    };
    return rectRound(finalBounds, 2);
}

var Breakpoints = /** @class */ (function () {
    function Breakpoints(args) {
        var _a;
        this.values = args ? args.values : [];
        this.unit = args ? args.unit : 'rem';
        this.dimension = (_a = args === null || args === void 0 ? void 0 : args.dimension) !== null && _a !== void 0 ? _a : 'width';
    }
    Breakpoints.prototype.getLengthAt = function (breakPointIndex, defaultMinWidth, defaultMaxWidth) {
        if (breakPointIndex < 0)
            return defaultMinWidth;
        if (breakPointIndex >= this.values.length)
            return defaultMaxWidth;
        return "".concat(this.values[breakPointIndex]).concat(this.unit);
    };
    Breakpoints.prototype.getSurroundingLengths = function (layoutWidthIndex) {
        return [
            this.getLengthAt(layoutWidthIndex - 1, "0".concat(this.unit), pxUpperLimit),
            this.getLengthAt(layoutWidthIndex, "0".concat(this.unit), pxUpperLimit)
        ];
    };
    Breakpoints.prototype.getCurrentLayoutWidthIndex = function (element) {
        var rect = element.getBoundingClientRect();
        var referenceValue = rect[this.dimension];
        if (this.values.length === 0)
            return 0;
        for (var i = 0; i < this.values.length; i++) {
            var cssLength = (this.values[i].toString() + this.unit.toString());
            if (referenceValue < cssLengthInPx(cssLength, element))
                return i;
        }
        return this.values.length;
    };
    Breakpoints.prototype.getCurrentLayoutWidthIndexFromCSS = function (element) {
        var indexValueQueried = parseInt(getComputedStyle(element)
            .getPropertyValue("--layout-".concat(this.dimension)));
        return !isNaN(indexValueQueried) ? indexValueQueried : defaultLayoutIndex;
    };
    Breakpoints.prototype.getCSSFactors = function (element) {
        return {
            factor: parseFloat(getComputedStyle(element)
                .getPropertyValue("--layout-".concat(this.dimension, "-factor"))),
            offset: parseFloat(getComputedStyle(element)
                .getPropertyValue("--layout-".concat(this.dimension, "-factor-offset")))
        };
    };
    Breakpoints.prototype.getTransformed = function (element) {
        var _a = this.getCSSFactors(element), factor = _a.factor, offset = _a.offset;
        return new Breakpoints({
            dimension: this.dimension,
            unit: this.unit,
            values: this.values.map(function (value) {
                var factorValid = isNaN(factor) ? 1 : factor;
                var factorOffsetValid = isNaN(offset) ? 0 : offset;
                return value * factorValid + factorOffsetValid;
            })
        });
    };
    Breakpoints.prototype.updateLayoutCSSVars = function (element) {
        var transformedBreakpoints = this.getTransformed(element);
        var layoutWidthIndex = transformedBreakpoints.getCurrentLayoutWidthIndex(element);
        var _a = __read(transformedBreakpoints.getSurroundingLengths(layoutWidthIndex), 2), preBreakPointLength = _a[0], postBreakPointLength = _a[1];
        element.style.setProperty("--layout-".concat(this.dimension), layoutWidthIndex.toString());
        element.style.setProperty("--layout-".concat(this.dimension, "-pre-breakpoint"), preBreakPointLength);
        element.style.setProperty("--layout-".concat(this.dimension, "-post-breakpoint"), postBreakPointLength);
    };
    return Breakpoints;
}());

var ComponentBreakpoints = /** @class */ (function () {
    function ComponentBreakpoints(args) {
        this.width = new Breakpoints(args === null || args === void 0 ? void 0 : args.width);
        this.height = new Breakpoints((args === null || args === void 0 ? void 0 : args.height) ? __assign(__assign({}, args.height), { dimension: 'height' }) : {
            values: [], unit: 'rem', dimension: 'height'
        });
    }
    ComponentBreakpoints.prototype.updateCSSVars = function (element) {
        this.width.updateLayoutCSSVars(element);
        this.height.updateLayoutCSSVars(element);
    };
    return ComponentBreakpoints;
}());

function getLayoutWidthIndexFromCSS(element, dimension) {
    var indexValueQueried = parseInt(getComputedStyle(element).getPropertyValue("--layout-".concat(dimension)));
    return !isNaN(indexValueQueried) ? indexValueQueried : defaultLayoutIndex;
}

var ResponsivePropertyBase = /** @class */ (function () {
    function ResponsivePropertyBase(dependentOn, scope) {
        this.dependentOn = dependentOn;
        this.scope = scope;
    }
    ResponsivePropertyBase.prototype.getLayoutSelection = function (scopeMapping) {
        var selection = this.scope ? scopeMapping[this.scope] : undefined;
        return selection ? selection : scopeMapping[defaultScope];
    };
    ResponsivePropertyBase.prototype.getBreakpoints = function (scopeMapping) {
        var layoutSelection = this.getLayoutSelection(scopeMapping);
        return layoutSelection.datum().breakpoints[this.dependentOn];
    };
    ResponsivePropertyBase.prototype.getFirstValidPreLayoutIndex = function (layoutIndex) {
        for (var i = layoutIndex - 1; i >= 0; i--) {
            if (this.mapping[i] !== undefined)
                return i;
        }
        return null;
    };
    ResponsivePropertyBase.prototype.getFirstValidPostLayoutIndex = function (exactBreakpoint) {
        var keys = Object.keys(this.mapping);
        for (var i = 0; i < keys.length; i++) {
            var index = parseInt(keys[i]);
            if (index > exactBreakpoint)
                return index;
        }
        return null;
    };
    ResponsivePropertyBase.prototype.getFirstValidLayoutIndex = function () {
        var keys = Object.keys(this.mapping);
        for (var i = 0; i < keys.length; i++) {
            var index = parseInt(keys[i]);
            if (!isNaN(index))
                return index;
        }
        return 0;
    };
    ResponsivePropertyBase.prototype.getLastValidLayoutIndex = function (breakpointLength) {
        var indices = Object.keys(this.mapping)
            .map(function (key) { return parseInt(key); })
            .filter(function (key) { return !isNaN(key) && key < breakpointLength; });
        return Math.max.apply(Math, __spreadArray([], __read(indices), false));
    };
    ResponsivePropertyBase.prototype.getCurrentLayoutIndexFromCSS = function (mapping) {
        var layoutBreakpointsS = this.getLayoutSelection(mapping);
        var element = elementFromSelection(layoutBreakpointsS);
        return this.getBreakpoints(mapping).getCurrentLayoutWidthIndexFromCSS(element);
    };
    return ResponsivePropertyBase;
}());

function isResponsiveValueUserArgsResponsive(arg) {
    return typeof arg === 'object' && arg !== null && 'mapping' in arg && 'dependentOn' in arg && !('value' in arg);
}
function validateResponsiveValue(args) {
    if (!isResponsiveValueUserArgsResponsive(args)) {
        return args;
    }
    return new ResponsiveValue(args);
}
var ResponsiveValue = /** @class */ (function (_super) {
    __extends(ResponsiveValue, _super);
    function ResponsiveValue(args) {
        var _this = _super.call(this, args.dependentOn, args.scope) || this;
        _this.mapping = args.mapping;
        return _this;
    }
    ResponsiveValue.prototype.estimate = function (layoutIndex) {
        var value = undefined;
        for (var i = 0; i < maxBreakpointCount; i++) {
            if (this.mapping[i] !== undefined)
                value = this.mapping[i];
            if (value !== undefined && i >= layoutIndex)
                break;
        }
        if (value === undefined)
            throw new Error(ErrorMessages.responsiveValueHasNoValues);
        return value;
    };
    return ResponsiveValue;
}(ResponsivePropertyBase));
function getCurrentResponsiveValue(val, mapping) {
    if (!isResponsiveValueUserArgsResponsive(val))
        return val;
    var layoutIndex = val.getCurrentLayoutIndexFromCSS(mapping);
    return val.estimate(layoutIndex);
}

function isBreakpointPropertyUserArgsResponsive(arg) {
    return typeof arg === 'object' && arg !== null && 'breakpointValues' in arg && 'dependentOn' in arg && !('value' in arg);
}
function validateBreakpointProperty(args) {
    if (!isBreakpointPropertyUserArgsResponsive(args)) {
        return args;
    }
    return new BreakpointProperty(args);
}
var BreakpointProperty = /** @class */ (function (_super) {
    __extends(BreakpointProperty, _super);
    function BreakpointProperty(args) {
        var _this = _super.call(this, args.dependentOn, args.scope) || this;
        _this.mapping = args.breakpointValues;
        return _this;
    }
    BreakpointProperty.prototype.getRespValInterpolated = function (scopes) {
        var desiredElement = this.scope ? scopes[this.scope] : undefined;
        var layoutBreakpointsS = desiredElement ? desiredElement : scopes[defaultScope];
        var element = elementFromSelection(layoutBreakpointsS);
        var breakpointsTransformed = this.getBreakpoints(scopes).getTransformed(element);
        var respVal = this;
        var layout = this.dependentOn;
        var layoutWidthIndex = getLayoutWidthIndexFromCSS(elementFromSelection(layoutBreakpointsS), layout);
        var preBreakpointIndex = this.getFirstValidPreLayoutIndex(layoutWidthIndex);
        var preBreakpoint = getBreakpointData(preBreakpointIndex);
        var postBreakpointIndex = this.getFirstValidPostLayoutIndex(preBreakpointIndex !== null ? preBreakpointIndex : -1);
        var postBreakpoint = getBreakpointData(postBreakpointIndex);
        var firstBreakpoint = getBreakpointData(this.getFirstValidLayoutIndex());
        var lastBreakpoint = getBreakpointData(this.getLastValidLayoutIndex(breakpointsTransformed.values.length));
        function getBreakpointData(index) {
            if (index === null || index >= breakpointsTransformed.values.length || index < 0)
                return null;
            var defaultMaxLength = breakpointsTransformed.values[breakpointsTransformed.values.length - 1] + breakpointsTransformed.unit;
            return { index: index, value: respVal.mapping[index],
                length: cssLengthInPx(breakpointsTransformed.getLengthAt(index, '0px', defaultMaxLength), element)
            };
        }
        return { preBreakpoint: preBreakpoint, postBreakpoint: postBreakpoint, firstBreakpoint: firstBreakpoint, lastBreakpoint: lastBreakpoint, element: element };
    };
    BreakpointProperty.prototype.estimate = function (layoutIndex) {
        var value = undefined;
        for (var i = 0; i < maxBreakpointCount; i++) {
            if (this.mapping[i] !== undefined)
                value = this.mapping[i];
            if (value !== undefined && i >= layoutIndex)
                break;
        }
        if (value === undefined)
            throw new Error(ErrorMessages.responsiveValueHasNoValues);
        return value;
    };
    return BreakpointProperty;
}(ResponsivePropertyBase));

function validateCategories(args, referenceData) {
    var values = args.values, categoriesKey = args.categoriesKey, title = args.title, format = args.format;
    var _a = __read(RVArray.equalizeLengths(args.values, referenceData !== null && referenceData !== void 0 ? referenceData : args.values), 1), categoriesAligned = _a[0];
    var categoryOrder = RVArray.clearDuplicatedValues(categoriesAligned);
    var categoryMap = categoryOrder.reduce(function (acc, current, index) {
        acc[current] = {
            order: index,
            value: current,
            formatValue: (typeof format === "function") ? format(current) :
                (format && format[current]) ? format[current] : current,
            styleClass: "categorical-".concat(index),
            key: "c-".concat(index)
        };
        return acc;
    }, {});
    var categoryArray = Object.values(categoryMap).sort(function (a, b) { return a.order > b.order ? 1 : -1; });
    return {
        title: validateResponsiveValue(title),
        values: values,
        categoriesKey: categoriesKey,
        categoryMap: categoryMap,
        categoryArray: categoryArray
    };
}

function renderAxisTicksPreGeneration(axisS) {
    return axisS
        .selectAll('.ticks-transform')
        .data([null])
        .join('g')
        .classed('ticks-transform', true)
        .selectAll('.ticks')
        .data([null])
        .join('g')
        .classed('ticks', true)
        .attr('data-ignore-layout-children', true);
}
function modifyAxisTicksPostGeneration(ticksS) {
    ticksS
        .attr('fill', null)
        .attr('font-family', null)
        .attr('font-size', null)
        .attr('text-anchor', null)
        .selectAll('.tick')
        .attr('opacity', null)
        .attr('data-key', function (d) { return d; })
        .selectAll('.pivot')
        .data([null])
        .join('g')
        .classed('pivot', true);
}

function calculateTickAngles(axisS) {
    var _a = axisS.datum(), renderer = _a.renderer; _a.breakpoints; var restAxisD = __rest(_a, ["renderer", "breakpoints"]);
    var isFlipped = restAxisD.series.responsiveState.currentlyFlipped;
    var tickOrientation = isFlipped ? restAxisD.tickOrientationFlipped : restAxisD.tickOrientation;
    if (typeof tickOrientation === 'number') {
        return tickOrientation;
    }
    var axisDomainS = axisS
        .select('.domain')
        .datum(axisS.datum());
    var _b = tickOrientation.getRespValInterpolated({ chart: renderer.chartS, self: axisDomainS }), element = _b.element, postBreakpoint = _b.postBreakpoint, lastBreakpoint = _b.lastBreakpoint, firstBreakpoint = _b.firstBreakpoint, preBreakpoint = _b.preBreakpoint;
    if (postBreakpoint === null)
        return lastBreakpoint.value;
    if (preBreakpoint === null)
        return firstBreakpoint.value;
    var elementLength = element.getBoundingClientRect()[tickOrientation.dependentOn];
    var angleDiff = postBreakpoint.value - preBreakpoint.value;
    var lengthRatio = (elementLength - preBreakpoint.length) / (postBreakpoint.length - preBreakpoint.length);
    return preBreakpoint.value + lengthRatio * angleDiff;
}

function configureTickAngles(axisS, ticksS) {
    var angle = calculateTickAngles(axisS);
    ticksS.selectAll('.tick').each(function (d, i, g) {
        configureTickAngle(select(g[i]), angle, axisS);
    });
}
function configureTickAngle(tickS, angle, axisS) {
    var axisElement = elementFromSelection(axisS);
    var textS = tickS.select('text')
        .attr('x', null)
        .attr('y', null)
        .attr('dy', null);
    var textElement = elementFromSelection(textS);
    var axisLocation = axisElement.classList.contains('axis-bottom') ? 'bottom' :
        axisElement.classList.contains('axis-left') ? 'left' :
            axisElement.classList.contains('axis-top') ? 'top' : 'right';
    var pivotS = tickS.select('.pivot');
    pivotS.append(function () { return textS.node(); });
    var _a = tickAngleConfig(normalizeAngle(angle))[axisLocation], textAnchor = _a.textAnchor, dominantBaseline = _a.dominantBaseline, transformFixed = _a.transformFixed;
    var transformRelative = cssLengthInPx('0.5em', textElement);
    textS
        .style('text-anchor', textAnchor)
        .style('dominant-baseline', dominantBaseline);
    var normalizedAngle = normalizeAngle(angle);
    pivotS
        .attr("transform", axisLocation === 'bottom' ?
        "translate(0, ".concat(transformRelative + transformFixed, ") rotate(").concat(normalizedAngle, ")") : axisLocation === 'top' ?
        "translate(0, -".concat(transformRelative + transformFixed, ") rotate(").concat(normalizedAngle, ")") : axisLocation === 'left' ?
        "translate(-".concat(transformRelative + transformFixed, ", 0) rotate(").concat(normalizedAngle, ")") : //right
        "translate(".concat(transformRelative + transformFixed, ", 0) rotate(").concat(normalizedAngle, ")"));
}
var tickAngleConfig = function (angle) {
    return {
        bottom: bottomConfig(angle),
        left: bottomConfig(normalizeAngle(angle - 90)),
        right: bottomConfig(normalizeAngle(angle + 90)),
        top: topConfig(angle),
    };
};
var bottomConfig = function (angle) {
    var _a = getAngleState(angle), anchorInRotationFirstHalf = _a.anchorInRotationFirstHalf, anchorParallelToAxis = _a.anchorParallelToAxis, baseLineAround180Degree = _a.baseLineAround180Degree, baseLineAround0Degree = _a.baseLineAround0Degree, moreSpace = _a.moreSpace;
    return {
        textAnchor: anchorInRotationFirstHalf ? 'start' : anchorParallelToAxis ? 'middle' : 'end',
        dominantBaseline: baseLineAround0Degree ? 'hanging' : baseLineAround180Degree ? 'auto' : 'middle',
        transformFixed: moreSpace ? 6 : 4
    };
};
var topConfig = function (angle) {
    var _a = getAngleState(angle), anchorInRotationFirstHalf = _a.anchorInRotationFirstHalf, anchorParallelToAxis = _a.anchorParallelToAxis, baseLineAround180Degree = _a.baseLineAround180Degree, baseLineAround0Degree = _a.baseLineAround0Degree, moreSpace = _a.moreSpace;
    return {
        textAnchor: anchorInRotationFirstHalf ? 'end' : anchorParallelToAxis ? 'middle' : 'start',
        dominantBaseline: baseLineAround0Degree ? 'auto' : baseLineAround180Degree ? 'hanging' : 'middle',
        transformFixed: moreSpace ? 6 : 4
    };
};
var getAngleState = function (angle) {
    return {
        anchorInRotationFirstHalf: (angle > 15 && angle < 165),
        anchorParallelToAxis: (angle >= 345) || (angle >= 0 && angle <= 15) || (angle >= 165 && angle <= 195),
        baseLineAround0Degree: (angle >= 0 && angle <= 15) || (angle >= 345),
        baseLineAround180Degree: (angle >= 165 && angle <= 195),
        moreSpace: (angle >= 345) || (angle >= 0 && angle <= 15) || (angle >= 165 || angle <= 195)
    };
};

function renderBgSVGOnlyBBox(parentS, data, refS) {
    var backgroundS = parentS.selectChildren(".".concat(backgroundSVGOnly))
        .data(data !== null && data !== void 0 ? data : [{}])
        .join('rect')
        .classed(backgroundSVGOnly, true)
        .attr('fill', 'transparent') //transparent
        .attr('stroke', 'transparent')
        .attr('stroke-width', 0)
        .attr('data-ignore-layout', true)
        .attr('x', 0) //reset dimensions to not influence BBox()
        .attr('y', 0)
        .attr('width', 0)
        .attr('height', 0);
    var _a = (refS ? refS.node() : parentS.node()).getBBox(), width = _a.width, height = _a.height, x = _a.x, y = _a.y;
    return backgroundS.attr('x', function (d) { var _a; return Math.floor(d.scale ? x + (width * (1 - d.scale)) / 2 : x) + ((_a = d.offsetX) !== null && _a !== void 0 ? _a : 0); })
        .attr('y', function (d) { var _a; return Math.floor(d.scale ? y + (height * (1 - d.scale)) / 2 : y) + ((_a = d.offsetY) !== null && _a !== void 0 ? _a : 0); })
        .attr('width', function (d) { return Math.floor(d.scale ? width * d.scale : width); })
        .attr('height', function (d) { return Math.floor(d.scale ? height * d.scale : height); });
}
function renderBgSVGOnlyByRect(parentS, props) {
    return parentS.selectChildren(".".concat(backgroundSVGOnly))
        .data([props])
        .join('rect')
        .classed(backgroundSVGOnly, true)
        .attr('fill', 'transparent') //transparent
        .attr('stroke', 'transparent')
        .attr('stroke-width', 0)
        .attr('data-ignore-layout', true)
        .attr('x', function (d) { return d.x; }) //reset dimensions to not influence BBox()
        .attr('y', function (d) { return d.y; })
        .attr('width', function (d) { return d.width; })
        .attr('height', function (d) { return d.height; });
}

function renderAxisLayout(axisS, orientation) {
    if (orientation === void 0) { orientation = 'horizontal'; }
    resetTickLines(axisS);
    var _a = axisS.datum(), horizontalLayout = _a.horizontalLayout, verticalLayout = _a.verticalLayout;
    var layout = orientation === 'horizontal' ? horizontalLayout : verticalLayout;
    var generators = {
        'left': axisLeft,
        'right': axisRight,
        'bottom': axisBottom,
        'top': axisTop,
    };
    axisS.classed("axis axis-".concat(layout), true);
    var unusedLayouts = AxisLayouts.filter(function (axisLayout) { return axisLayout !== layout; });
    unusedLayouts.forEach(function (unusedLayout) { return axisS.classed("axis-".concat(unusedLayout), false); });
    return renderAxis(axisS, d3Axis(generators[layout], axisS));
}
function resetTickLines(axisS) {
    var tickLinesS = axisS.selectAll('.tick > line');
    ['x1', 'x2', 'y1', 'y2']
        .forEach(function (attr) { return tickLinesS.attr(attr, null); });
}
function renderAxisSequence(axisS, orientation) {
    renderBgSVGOnlyBBox(axisS);
    renderAxisLayout(axisS, orientation);
    axisS.classed('axis-sequence', true);
    axisS.selectAll('.title-wrapper')
        .classed('layout-container', true);
    return axisS.attr('data-key', function (d) { return d.key; });
}
function renderAxis(axisS, a) {
    var axisD = axisS.datum();
    var axisElement = elementFromSelection(axisS);
    var chartS = axisD.renderer.chartS;
    var titleWrapperS = axisS
        .selectAll('.title-wrapper')
        .data([null])
        .join('g')
        .classed('title-wrapper', true);
    titleWrapperS
        .selectAll('.title')
        .data([null])
        .join('g')
        .classed('title', true)
        .selectAll('text')
        .data([null])
        .join('text')
        .text(getCurrentResponsiveValue(axisD.title, { chart: chartS, self: axisS }));
    titleWrapperS.selectAll('.subtitle')
        .data(axisD.subTitle ? [null] : [])
        .join('g')
        .classed('subtitle', true)
        .selectAll('text')
        .data([null])
        .join('text')
        .text(getCurrentResponsiveValue(axisD.subTitle, { chart: chartS, self: axisS }));
    var ticksS = renderAxisTicksPreGeneration(axisS);
    a(ticksS);
    modifyAxisTicksPostGeneration(ticksS);
    axisD.breakpoints.updateCSSVars(axisElement);
    configureTickAngles(axisS, ticksS);
}
function d3Axis(axisGenerator, axisS) {
    var _a = axisS.datum(), scaledValues = _a.scaledValues, breakpoints = _a.breakpoints, configureAxis = _a.configureAxis, renderer = _a.renderer;
    var axisElement = elementFromSelection(axisS);
    breakpoints.updateCSSVars(axisElement);
    var configureAxisValid = getCurrentResponsiveValue(configureAxis, { chart: renderer.chartS, self: axisS
    });
    var filteredScaledValues = scaledValues.cloneFiltered();
    var axis = axisGenerator(filteredScaledValues.scale);
    configureAxisValid(axis);
    axisS.datum().d3Axis = axis;
    return axis;
}

function validateLightWeightAxis(args) {
    var _a, _b;
    var axis = {
        renderer: args.renderer,
        scaledValues: args.scaledValues,
        title: validateResponsiveValue(args.title || ''),
        subTitle: validateResponsiveValue(args.subTitle || ''),
        configureAxis: validateResponsiveValue(args.configureAxis || (function () {
        })),
        breakpoints: new ComponentBreakpoints(args.breakpoints),
        horizontalLayout: args.horizontalLayout && AxisLayoutsHorizontal.includes(args.horizontalLayout) ?
            args.horizontalLayout : 'bottom',
        verticalLayout: args.verticalLayout && AxisLayoutsVertical.includes(args.verticalLayout) ?
            args.verticalLayout : 'left',
        tickOrientation: validateBreakpointProperty((_a = args.tickOrientation) !== null && _a !== void 0 ? _a : 0),
        tickOrientationFlipped: validateBreakpointProperty((_b = args.tickOrientationFlipped) !== null && _b !== void 0 ? _b : 0),
    };
    return axis;
}

function validateBaseAxis(args) {
    return __assign(__assign({}, validateLightWeightAxis(args)), { series: args.series });
}

function isScale(arg) {
    return 'domain' in arg && 'range' in arg;
}
function isScaleNumeric(arg) {
    return isScale(arg) && typeof arg.domain()[0] === 'number';
}
function isScaleCategory(arg) {
    return isScale(arg) && typeof arg.domain()[0] === 'string';
}
function isScaleTime(arg) {
    return isScale(arg) && arg.domain()[0] instanceof Date;
}

var ScaledValuesSpatialBase = /** @class */ (function () {
    function ScaledValuesSpatialBase(args) {
        this.orientation = "horizontal";
        this.horizontalRange = [0, 1];
        this.verticalRange = [1, 0];
        this.parentKey = args.parentKey;
        this.inverted = false;
    }
    ScaledValuesSpatialBase.prototype.updateRange = function (horizontalRange, verticalRange, orientation) {
        this.verticalRange = verticalRange;
        this.horizontalRange = horizontalRange;
        this.orientation = orientation;
        this.scale.range(this.orientation === 'horizontal' ? horizontalRange : verticalRange);
    };
    ScaledValuesSpatialBase.prototype.getScaledValue = function (i) {
        return this.scale(this.values[i]);
    };
    ScaledValuesSpatialBase.prototype.getScaledValueStart = function (i) {
        return this.scale(this.values[i]);
    };
    ScaledValuesSpatialBase.prototype.getScaledValueEnd = function (i) {
        return this.scale(this.values[i]);
    };
    ScaledValuesSpatialBase.prototype.getRangeByPercent = function (percent, considerInverse, orientationArg) {
        if (considerInverse === void 0) { considerInverse = true; }
        var orientation = orientationArg !== null && orientationArg !== void 0 ? orientationArg : this.orientation;
        return considerInverse ? percentRangeFormulaWithInverse[orientation](percent, this) :
            percentRangeFormulaWithoutInverse[orientation](percent, this);
    };
    ScaledValuesSpatialBase.prototype.getRangeInverseUndone = function () {
        return this.inverted ? this.getCurrentRangeInversed() : this.scale.range();
    };
    ScaledValuesSpatialBase.prototype.getCurrentRangeMax = function () {
        var range = this.getRangeInverseUndone();
        return this.orientation === 'horizontal' ? range[1] : range[0];
    };
    ScaledValuesSpatialBase.prototype.getCurrentRangeInversed = function () {
        var originalRange = this.scale.range();
        return [originalRange[1], originalRange[0]];
    };
    ScaledValuesSpatialBase.prototype.isKeyActiveByKey = function (key) {
        return true;
    };
    ScaledValuesSpatialBase.prototype.setKeyActiveIfDefined = function (key, value) {
    };
    ScaledValuesSpatialBase.prototype.cloneFiltered = function () {
        return this.clone();
    };
    ScaledValuesSpatialBase.prototype.cloneZoomed = function (transform, axisType) {
        return this.clone();
    };
    ScaledValuesSpatialBase.prototype.cloneRangeInversed = function () {
        var clone = this.clone();
        clone.scale.range(this.getCurrentRangeInversed());
        clone.inverted = !this.inverted;
        return clone;
    };
    return ScaledValuesSpatialBase;
}());
var percentRangeFormulaWithInverse = {
    horizontal: function (percent, scaledValues) {
        return scaledValues.scale.range()[1] * percent;
    },
    vertical: function (percent, scaledValues) {
        return scaledValues.scale.range()[0] - scaledValues.scale.range()[0] * percent;
    }
};
var percentRangeFormulaWithoutInverse = {
    horizontal: function (percent, scaledValues) {
        return scaledValues.getRangeInverseUndone()[1] * percent;
    },
    vertical: function (percent, scaledValues) {
        return scaledValues.getRangeInverseUndone()[0] - scaledValues.getRangeInverseUndone()[0] * percent;
    }
};

var ScaledValuesCategorical = /** @class */ (function (_super) {
    __extends(ScaledValuesCategorical, _super);
    function ScaledValuesCategorical(args) {
        var _a;
        var _this = _super.call(this, args) || this;
        _this.tag = 'categorical';
        _this.values = args.values;
        _this.scale = (_a = args.scale) !== null && _a !== void 0 ? _a : band([0, 600]).domain(_this.values).padding(0.1);
        _this.flippedScale = _this.scale.copy();
        _this.title = 'tag' in args ? args.title : validateResponsiveValue(args.title);
        //TODO: this is no real alignment validation. Fix this!
        _this.categories = 'categories' in args ? args.categories : validateCategories({
            values: _this.values,
            title: args.title,
            categoriesKey: args.parentKey
        }, _this.values);
        _this.keysActive = 'keysActive' in args ? args.keysActive : _this.categories.categoryArray.reduce(function (prev, c) {
            prev["".concat(args.parentKey, "-").concat(c.key)] = true;
            return prev;
        }, {});
        if ('tag' in args) {
            _this.inverted = args.inverted;
        }
        return _this;
    }
    ScaledValuesCategorical.prototype.getOrder = function (i) {
        return this.categories.categoryMap[this.values[i]].order;
    };
    ScaledValuesCategorical.prototype.getStyleClass = function (i) {
        return this.categories.categoryMap[this.values[i]].styleClass;
    };
    ScaledValuesCategorical.prototype.getScaledValueStart = function (i) {
        return valByIndexFormula[this.orientation].start(i, this);
    };
    ScaledValuesCategorical.prototype.getScaledValue = function (i) {
        return valByIndexFormula[this.orientation].middle(i, this);
    };
    ScaledValuesCategorical.prototype.getScaledValueEnd = function (i) {
        return valByIndexFormula[this.orientation].end(i, this);
    };
    ScaledValuesCategorical.prototype.isKeyActiveByKey = function (key) {
        // noinspection PointlessBooleanExpressionJS
        return this.keysActive[key] !== false;
    };
    ScaledValuesCategorical.prototype.isValueActive = function (i) {
        return this.isKeyActiveByKey(this.getCombinedKey(i));
    };
    ScaledValuesCategorical.prototype.setKeyActiveIfDefined = function (key, value) {
        if (this.keysActive[key] !== undefined)
            this.keysActive[key] = value;
    };
    ScaledValuesCategorical.prototype.getCombinedKey = function (i) {
        var category = this.values[i];
        return this.parentKey + '-' + this.categories.categoryMap[category].key;
    };
    ScaledValuesCategorical.prototype.getCategoryData = function (i) {
        var rawCategory = this.values[i];
        var category = this.categories.categoryMap[rawCategory];
        var categoryKey = category.key;
        var parentKey = this.parentKey;
        var combinedKey = parentKey + '-' + categoryKey;
        var styleClass = category.styleClass;
        return { categoryKey: categoryKey, parentKey: parentKey, combinedKey: combinedKey, styleClass: styleClass };
    };
    ScaledValuesCategorical.prototype.cloneZoomed = function (transform, axisType) {
        return this.clone();
    };
    ScaledValuesCategorical.prototype.cloneFiltered = function () {
        var _this = this;
        var activeDomain = this.values.reduce(function (prev, current) {
            var key = "".concat(_this.parentKey, "-").concat(_this.categories.categoryMap[current].key);
            return _this.keysActive[key] ? __spreadArray(__spreadArray([], __read(prev), false), [current], false) : prev;
        }, []);
        var clone = this.clone();
        clone.scale.domain(activeDomain);
        return clone;
    };
    ScaledValuesCategorical.prototype.atScreenPosition = function (value) {
        var _a;
        var activeValues = this.cloneFiltered();
        var domain = activeValues.scale.domain();
        return (_a = domain.find(function (category) {
            var lower = activeValues.scale(category);
            var upper = lower + activeValues.scale.bandwidth();
            return value > lower && value < upper;
        })) !== null && _a !== void 0 ? _a : '';
    };
    ScaledValuesCategorical.prototype.getNearestValue = function (value) { return value; };
    ScaledValuesCategorical.prototype.clone = function () {
        return new ScaledValuesCategorical(__assign(__assign({}, this), { scale: this.scale.copy() }));
    };
    return ScaledValuesCategorical;
}(ScaledValuesSpatialBase));
var valByIndexFormulaCategoricalHorizontal = {
    start: function (index, scaledValues) {
        return scaledValues.scale(scaledValues.values[index]);
    },
    middle: function (index, scaledValues) {
        return scaledValues.scale(scaledValues.values[index]) + scaledValues.scale.bandwidth() / 2;
    },
    end: function (index, scaledValues) {
        return scaledValues.scale(scaledValues.values[index]) + scaledValues.scale.bandwidth();
    }
};
var valByIndexFormulaCategoricalVertical = {
    start: function (index, scaledValues) {
        return scaledValues.scale(scaledValues.values[index]) - scaledValues.scale.bandwidth();
    },
    middle: function (index, scaledValues) {
        return scaledValues.scale(scaledValues.values[index]) - scaledValues.scale.bandwidth() / 2;
    },
    end: function (index, scaledValues) {
        return scaledValues.scale(scaledValues.values[index]);
    }
};
var valByIndexFormula = {
    horizontal: valByIndexFormulaCategoricalHorizontal,
    vertical: valByIndexFormulaCategoricalVertical
};

var ScaledValuesTemporal = /** @class */ (function (_super) {
    __extends(ScaledValuesTemporal, _super);
    function ScaledValuesTemporal(args) {
        var _a;
        var _this = _super.call(this, args) || this;
        _this.tag = 'date';
        _this.values = args.values;
        var extentMin = min(_this.values);
        var extentMax = max(_this.values);
        if (!extentMin || !extentMax)
            throw new Error(ErrorMessages.invalidScaledValuesCombination);
        _this.scale = (_a = args.scale) !== null && _a !== void 0 ? _a : time([extentMin, extentMax], [0, 600]).nice();
        _this.flippedScale = _this.scale.copy();
        if ('tag' in args) {
            _this.filteredRanges = args.filteredRanges;
            _this.inverted = args.inverted;
        }
        else {
            _this.filteredRanges = [_this.scale.domain()];
        }
        return _this;
    }
    ScaledValuesTemporal.prototype.isValueActive = function (index) {
        for (var i = 0; i < this.filteredRanges.length; i++) {
            var range = this.filteredRanges[i];
            if (this.values[index] >= range[0] && this.values[index] <= range[1])
                return true;
        }
        return false;
    };
    ScaledValuesTemporal.prototype.cloneZoomed = function (transform, axisType) {
        var scale = axisType === 'x' ? transform.rescaleX(this.scale) : transform.rescaleY(this.scale);
        return new ScaledValuesTemporal(__assign(__assign({}, this), { scale: scale }));
    };
    ScaledValuesTemporal.prototype.cloneFiltered = function () {
        return this.clone();
    };
    ScaledValuesTemporal.prototype.atScreenPosition = function (value) {
        return this.scale.invert(value);
    };
    ScaledValuesTemporal.prototype.getNearestValue = function (estimate) {
        var nearest = this.values[0];
        for (var i = 1; i < this.values.length; i++) {
            var current = this.values[i];
            if (Math.abs(current.valueOf() - estimate.valueOf()) < Math.abs(nearest.valueOf() - estimate.valueOf()))
                nearest = current;
        }
        return nearest;
    };
    ScaledValuesTemporal.prototype.clone = function () {
        return new ScaledValuesTemporal(__assign(__assign({}, this), { scale: this.scale.copy() }));
    };
    return ScaledValuesTemporal;
}(ScaledValuesSpatialBase));

var ScaledValuesNumeric = /** @class */ (function (_super) {
    __extends(ScaledValuesNumeric, _super);
    function ScaledValuesNumeric(args) {
        var _a;
        var _this = _super.call(this, args) || this;
        _this.tag = 'linear';
        _this.values = args.values;
        var extent = [Math.min.apply(Math, __spreadArray([], __read(_this.values), false)), Math.max.apply(Math, __spreadArray([], __read(_this.values), false))];
        _this.scale = (_a = args.scale) !== null && _a !== void 0 ? _a : linear().domain(extent).nice();
        _this.flippedScale = _this.scale.copy();
        if ('tag' in args) {
            _this.filteredRanges = args.filteredRanges;
            _this.inverted = args.inverted;
        }
        else {
            _this.filteredRanges = [_this.scale.domain()];
        }
        return _this;
    }
    ScaledValuesNumeric.prototype.isValueActive = function (index) {
        for (var i = 0; i < this.filteredRanges.length; i++) {
            var range = this.filteredRanges[i];
            if (this.values[index] >= range[0] && this.values[index] <= range[1])
                return true;
        }
        return false;
    };
    ScaledValuesNumeric.prototype.cloneZoomed = function (transform, axisType) {
        var scale = axisType === 'x' ? transform.rescaleX(this.scale) : transform.rescaleY(this.scale);
        return new ScaledValuesNumeric(__assign(__assign({}, this), { scale: scale }));
    };
    ScaledValuesNumeric.prototype.cloneFiltered = function () {
        return this.clone();
    };
    ScaledValuesNumeric.prototype.atScreenPosition = function (value) {
        return this.scale.invert(value);
    };
    ScaledValuesNumeric.prototype.getNearestValue = function (estimate) {
        var nearest = this.values[0];
        for (var i = 1; i < this.values.length; i++) {
            var current = this.values[i];
            if (Math.abs(current - estimate) < Math.abs(nearest - estimate))
                nearest = current;
        }
        return nearest;
    };
    ScaledValuesNumeric.prototype.clone = function () {
        return new ScaledValuesNumeric(__assign(__assign({}, this), { scale: this.scale.copy() }));
    };
    return ScaledValuesNumeric;
}(ScaledValuesSpatialBase));

var equalizeLengths = RVArray.equalizeLengths, hasValueOf = RVArray.hasValueOf, isDateArray = RVArray.isDateArray, isNumberArray = RVArray.isNumberArray, isStringArray = RVArray.isStringArray;
function validateScaledValuesSpatial(axisScaleArgs, axisKey) {
    var values = axisScaleArgs.values, scale = axisScaleArgs.scale;
    if (values.length <= 0)
        throw new Error(ErrorMessages.responsiveValueHasNoValues);
    if (isDateArray(values)) {
        if (scale && !isScaleTime(scale))
            throw new Error(ErrorMessages.invalidScaledValuesCombination);
        return new ScaledValuesTemporal({ values: values, scale: scale, parentKey: axisKey });
    }
    if (isNumberArray(values) || hasValueOf(values)) {
        if (scale && !isScaleNumeric(scale)) {
            throw new Error(ErrorMessages.invalidScaledValuesCombination);
        }
        var valuesNum = isNumberArray(values) ?
            values.map(function (value) { return Number(value); }) :
            values.map(function (value) { return parseFloat(value.valueOf()); });
        return new ScaledValuesNumeric({ values: valuesNum, scale: scale, parentKey: axisKey });
    }
    if (isStringArray(values)) {
        if (scale && !isScaleCategory(scale))
            throw new Error(ErrorMessages.invalidScaledValuesCombination);
        return new ScaledValuesCategorical({ values: values, scale: scale, parentKey: axisKey, title: 'Axis ' + axisKey });
    }
    throw new Error(ErrorMessages.invalidScaledValuesCombination);
}
function alignScaledValuesLengths(vws1, vws2) {
    var _a = __read(equalizeLengths(vws1.values, vws2.values), 2), vws1Aligned = _a[0], vws2Aligned = _a[1];
    var newVws1 = __assign(__assign({}, vws1), { values: vws1Aligned });
    var newVws2 = __assign(__assign({}, vws2), { values: vws2Aligned });
    return [newVws1, newVws2];
}
function orderScaledValuesSpatial(values, wrappers) {
    var valuesOrdered = { linear: [], categorical: [], date: [] };
    values.forEach(function (val, index) {
        //@ts-ignore
        valuesOrdered[val.tag].push({ values: val, wrapper: wrappers[index] });
    });
    return valuesOrdered;
}

var ScaledValuesCumulativeSummation = /** @class */ (function () {
    function ScaledValuesCumulativeSummation(linearValues, categoricalValues, additionalCategories, aggregatedScale) {
        this.numericalValues = linearValues;
        this.categoricalValues = categoricalValues;
        this.additionalCategories = additionalCategories;
        this.aggregatedScale = aggregatedScale;
    }
    ScaledValuesCumulativeSummation.prototype.sumCached = function () {
        var _this = this;
        if (this.aggregationResult)
            return this.aggregationResult;
        var numberCategories = this.categoricalValues.categories.categoryArray.length;
        var groupedValues = new Array(numberCategories).fill(null).map(function () { return []; });
        var summedValues = new Array(numberCategories).fill(0);
        var numberValues = this.categoricalValues.values.length;
        var cumulativeValues = new Array(numberValues).fill(0);
        this.categoricalValues.values.forEach(function (_, i) {
            var categoryOrder = _this.categoricalValues.getOrder(i);
            var currentValue = _this.numericalValues.values[i];
            groupedValues[categoryOrder].push(currentValue);
            if (_this.additionalCategories && !_this.additionalCategories.isValueActive(i))
                return;
            cumulativeValues[i] = summedValues[categoryOrder];
            summedValues[categoryOrder] += _this.numericalValues.values[i];
        }, []);
        var aggregatedValuesOrder = groupedValues.map(function (vals) { return RVArray.sum(vals); });
        console.assert(aggregatedValuesOrder.length === this.categoricalValues.categories.categoryArray.length);
        var aggregatedDomain = [this.numericalValues.scale.domain()[0], Math.max.apply(Math, __spreadArray([], __read(aggregatedValuesOrder), false))];
        this.aggregationResult = new ScaledValuesNumeric({
            values: cumulativeValues,
            scale: this.aggregatedScale ? this.aggregatedScale : linear().domain(aggregatedDomain).nice(),
            parentKey: this.numericalValues.parentKey
        });
        return this.aggregationResult;
    };
    return ScaledValuesCumulativeSummation;
}());

function validateSequentialColor(arg) {
    var axis = arg.axis, renderer = arg.renderer, values = arg.values, scale = arg.scale, series = arg.series;
    var scaledValues = validateScaledValuesSpatial({ values: values }, 'ac-0');
    return { values: values, scale: scale, axis: validateBaseAxis(__assign(__assign({}, axis), { scaledValues: scaledValues, renderer: renderer, series: series }))
    };
}

function validateZoom(args) {
    return __assign(__assign({}, args), { currentIn: args.in, currentOut: args.out, currentTransform: identity, behaviour: zoom() });
}

var toolTipId = 'tooltip-rv';
var tooltipSelector = "#".concat(toolTipId);
var tooltipPositionStrategies = ['none', 'sticky'];
var Tooltip = /** @class */ (function () {
    function Tooltip(args) {
        var _a, _b, _c, _d, _e;
        this.active = true;
        this.seriesTooltipVisible = false;
        this.movableCrossTooltipVisible = false;
        this.positionStrategySeries = (_a = args === null || args === void 0 ? void 0 : args.positionStrategySeries) !== null && _a !== void 0 ? _a : 'sticky';
        this.positionStrategyInspect = (_b = args === null || args === void 0 ? void 0 : args.positionStrategyInspect) !== null && _b !== void 0 ? _b : 'sticky';
        this.autoOffset = (_c = args === null || args === void 0 ? void 0 : args.autoOffset) !== null && _c !== void 0 ? _c : 8;
        this.active = (_d = args === null || args === void 0 ? void 0 : args.active) !== null && _d !== void 0 ? _d : true;
        this.onInspectMove = (_e = args === null || args === void 0 ? void 0 : args.onInspectMove) !== null && _e !== void 0 ? _e : (function () { });
    }
    Tooltip.prototype.isVisible = function () {
        return this.seriesTooltipVisible || this.movableCrossTooltipVisible;
    };
    Tooltip.prototype.applyPositionStrategy = function (e, positionStrategy) {
        var tooltipS = select(tooltipSelector);
        var mousePosition = { x: e.clientX, y: e.clientY };
        switch (positionStrategy) {
            case 'sticky':
                {
                    updateTooltipPositionCSSVars(tooltipS, { position: mousePosition, offset: this.autoOffset });
                }
                break;
        }
        tooltipPositionStrategies.forEach(function (strategy) {
            tooltipS.classed("tooltip-position-".concat(strategy), false);
        });
        tooltipS.classed("tooltip-position-".concat(positionStrategy), true);
    };
    return Tooltip;
}());
function setTooltipVisibility(visibility) {
    select(tooltipSelector)
        .classed('tooltip--visible', visibility === 'visible')
        .classed('tooltip--hidden', visibility === 'hidden');
}
function updateTooltipPositionCSSVars(tooltipS, config) {
    var offset = config.offset || 8;
    var position = config.position;
    var windowSize = { width: window.innerWidth, height: window.innerHeight };
    var offsetDirection = {
        x: position.x <= windowSize.width / 2 ? 1 : -1,
        y: position.y <= windowSize.height / 2 ? 1 : -1,
    };
    var left = offsetDirection.x >= 0;
    var top = offsetDirection.y >= 0;
    var leftOffset = position.x + offsetDirection.x * offset;
    var rightOffset = windowSize.width - leftOffset;
    var topOffset = position.y + offsetDirection.y * offset;
    var bottomOffset = windowSize.height - topOffset;
    tooltipS
        .style('--place-left', left ? ' ' : 'initial')
        .style('--place-right', !left ? ' ' : 'initial')
        .style('--place-top', top ? ' ' : 'initial')
        .style('--place-bottom', !top ? ' ' : 'initial')
        .style('--left-offset', leftOffset + 'px')
        .style('--right-offset', rightOffset + 'px')
        .style('--top-offset', topOffset + 'px')
        .style('--bottom-offset', bottomOffset + 'px');
}

function renderDataSeriesTooltip(seriesS) {
    var tooltip = seriesS.datum().renderer.windowS.datum().tooltip;
    var seriesTooltipS = select(tooltipSelector)
        .selectAll('.item.tooltip--series')
        .data(tooltip.active ? [null] : [])
        .join('div')
        .classed('item tooltip--series', true);
    seriesS.on('pointermove.tooltip', function (e) {
        var positionStrategy = tooltip.positionStrategySeries;
        tooltip.applyPositionStrategy(e, positionStrategy);
    }).on('pointerover.tooltip', function (e, d) {
        var item = e.target;
        if (!d.renderData.markerTooltipGenerator || !item)
            return;
        var data = select(item).datum();
        tooltip.seriesTooltipVisible = true;
        select(tooltipSelector).html(d.renderData.markerTooltipGenerator(item, data));
    }).on('pointerout.tooltip', function () {
        tooltip.seriesTooltipVisible = false;
        select(tooltipSelector).html(null);
    });
    return seriesTooltipS;
}

function renderTooltip() {
    var bodyS = select('html > body');
    var windowS = bodyS.selectAll('.window-rv');
    var drawAreaS = windowS.selectAll('.draw-area');
    var tooltipS = bodyS.selectAll(tooltipSelector)
        .data([null])
        .join('div')
        .attr('id', 'tooltip-rv');
    drawAreaS.on('pointermove.tooltipVisibility', function () {
        var window = windowS.data().find(function (window) { return window.tooltip.isVisible(); });
        setTooltipVisibility(!!window ? 'visible' : 'hidden');
    }).on('pointerout.tooltipVisibility', function () {
        setTooltipVisibility('hidden');
    });
    select(window).on('pointermove.tooltipVisibility', function (e) {
        var windowHovered = windowS.data().find(function (window) {
            var rect = elementFromSelection(window.renderer.drawAreaBgS).getBoundingClientRect();
            return (!(e.clientX < rect.x || e.clientX > rect.x + rect.width ||
                e.clientY < rect.y || e.clientY > rect.y + rect.height));
        });
        if (windowHovered) {
            windowHovered.tooltip.movableCrossTooltipVisible = windowHovered.settings.get('movableCrossActive');
        }
        setTooltipVisibility((windowHovered === null || windowHovered === void 0 ? void 0 : windowHovered.tooltip.isVisible()) ? 'visible' : 'hidden');
    });
    return tooltipS;
}

function renderMovableCrossTooltip(series) {
    var renderer = series.renderer;
    var tooltipS = select(tooltipSelector);
    var tooltip = renderer.windowS.datum().tooltip;
    var renderContent = function (active) {
        var toolTipCrossStateS = tooltipS
            .selectAll('.item.tooltip--cross')
            .data(active ? [null] : [])
            .join('div')
            .classed('item tooltip--cross', true);
        var crossStateTextS = toolTipCrossStateS.selectAll('output')
            .data(active ? [null, null] : [])
            .join('output');
        renderer.drawAreaS.classed('cursor-cross', active);
        return { toolTipCrossStateS: toolTipCrossStateS, crossStateTextS: crossStateTextS };
    };
    var onDrawAreaMove = function (e, active) {
        var windowD = renderer.windowS.datum();
        tooltip.movableCrossTooltipVisible = windowD.settings.get('movableCrossActive');
        var crossStateTextS = renderContent(active).crossStateTextS;
        if (!active)
            return;
        var positionStrategy = windowD.tooltip.positionStrategyInspect;
        windowD.tooltip.applyPositionStrategy(e, positionStrategy);
        var backgroundE = elementFromSelection(renderer.drawAreaBgS);
        var rect = backgroundE.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var screenData = series.getScaledValuesAtScreenPosition(x, y);
        var horizontal = screenData.horizontal, horizontalName = screenData.horizontalName, vertical = screenData.vertical, verticalName = screenData.verticalName;
        var firstText = crossStateTextS.filter(function (d, i) { return i === 0; });
        var secondText = crossStateTextS.filter(function (d, i) { return i === 1; });
        if (firstText.size() > 0)
            firstText.text(horizontal ? "".concat(horizontalName, ": ").concat(horizontal) : firstText.text());
        if (secondText.size() > 0)
            secondText.text(vertical ? "".concat(verticalName, ": ").concat(vertical) : secondText.text());
        tooltip.onInspectMove(screenData);
    };
    var onDrawAreaLeave = function (active) {
        tooltip.movableCrossTooltipVisible = false;
        renderContent(active);
    };
    var onWindowMove = function (e) {
        var active = renderer.windowS.datum().settings.get('movableCrossActive')
            && tooltip.movableCrossTooltipVisible && !tooltip.seriesTooltipVisible;
        var rect = elementFromSelection(renderer.drawAreaBgS).getBoundingClientRect();
        if (!(e.clientX < rect.x || e.clientX > rect.x + rect.width ||
            e.clientY < rect.y || e.clientY > rect.y + rect.height)) {
            onDrawAreaMove(e, active);
            return;
        }
        onDrawAreaLeave(active);
    };
    renderer.windowS.on('pointermove.LeaveMovableCrossTooltip', onWindowMove);
}

function renderWindow(windowS) {
    var data = windowS.datum();
    windowS.classed('window-rv', true)
        .classed("window-rv-".concat(data.type), true);
    data.breakpoints.updateCSSVars(elementFromSelection(windowS));
    if (data.tooltip.active) {
        renderTooltip();
    }
    return windowS;
}

var defaultWindowSettings = {
    downloadStyleType: 'inline',
    downloadRemoveClasses: true,
    downloadRemoveDataKeys: true,
    downloadRemoveDataStyles: true,
    downloadRemoveBgElements: true,
    downloadPrettifyActive: true,
    downloadPrettifyIndentionSpaces: '2',
    downloadMarginLeft: '0',
    downloadMarginBottom: '0',
    downloadMarginRight: '0',
    downloadMarginTop: '0',
    movableCrossActive: false,
    downloadAttributeMaxDecimals: '1',
    downloadAttributeMaxDecimalsActive: true,
    parcoordEquidistantAxes: true
};
var windowSettingsKeys = genKeyObjectFromObject(defaultWindowSettings);
var Revertible = /** @class */ (function () {
    function Revertible(defaultState) {
        this.state = defaultState;
        this.snapshot = {};
    }
    Revertible.prototype.setImmediately = function (key, value) {
        this.state[key] = value;
    };
    Revertible.prototype.setDeferred = function (key, value) {
        this.snapshot[key] = value;
    };
    Revertible.prototype.get = function (key) { return this.state[key]; };
    Revertible.prototype.update = function () {
        var _a;
        for (var key in this.snapshot) {
            this.state[key] = (_a = this.snapshot[key]) !== null && _a !== void 0 ? _a : this.state[key];
        }
        this.reset();
    };
    Revertible.prototype.reset = function () {
        this.snapshot = {};
    };
    return Revertible;
}());

function validateWindow(args) {
    return __assign(__assign({}, args), { breakpoints: new ComponentBreakpoints(args.breakpoints), settings: new Revertible(__assign({}, defaultWindowSettings)), tooltip: new Tooltip(args.tooltip) });
}

function resizeEventListener(observeS, dispatchS) {
    var resizeEventDispatcher = new ResizeObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) {
            var finalDispatchS = dispatchS ? dispatchS : select(entries[i].target);
            finalDispatchS.dispatch('resize', {
                detail: { bounds: entries[i].target.getBoundingClientRect(), type: 'resize' }
            });
            if (dispatchS)
                return;
        }
    });
    observeS.each(function (d, i, g) {
        resizeEventDispatcher.observe(g[i]);
    });
    return resizeEventDispatcher;
}

function renderChart(parentS, data) {
    var classes = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        classes[_i - 2] = arguments[_i];
    }
    var _a = createSelectionClasses(classes), classString = _a.classString, selector = _a.selector;
    var chartS = parentS
        .selectAll("svg.chart".concat(selector, ".layout-container"))
        .data([data])
        .join('svg')
        .classed("chart ".concat(classString, " layout-container"), true)
        .attr('xmlns', 'http://www.w3.org/2000/svg');
    chartS.datum().breakpoints.updateCSSVars(elementFromSelection(chartS));
    var paddingWrapperS = renderPaddingWrapper(chartS);
    var _b = renderDrawArea(paddingWrapperS), drawArea = _b.drawArea, restDrawArea = __rest(_b, ["drawArea"]);
    var header = renderHeader(chartS);
    var title = renderTitle$1(header, chartS);
    var subTitle = renderSubtitle(header, chartS);
    return __assign({ chartS: chartS, paddingWrapperS: paddingWrapperS, header: header, title: title, subTitle: subTitle, drawArea: drawArea }, restDrawArea);
}
function renderPaddingWrapper(chartS) {
    return chartS
        .selectAll('.padding-wrapper')
        .data([chartS.datum()])
        .join('g')
        .classed('padding-wrapper', true);
}
function renderDrawArea(paddingS) {
    var drawArea = paddingS
        .selectAll('.draw-area')
        .data([paddingS.datum()])
        .join('g')
        .classed('draw-area', true)
        .attr('data-ignore-layout-children', true);
    var boundsAttr = rectFromString(drawArea.attr('bounds') || '0, 0, 0, 0');
    var background = renderBgSVGOnlyByRect(drawArea, __assign(__assign({}, boundsAttr), { x: 0, y: 0 }))
        .classed('background', true);
    var gridArea = drawArea.selectAll('.grid-area')
        .data([null])
        .join('g')
        .classed('grid-area', true);
    var orientations = ['left', 'top', 'right', 'bottom'];
    var containerSArr = orientations.map(function (orientation) { return renderPaddingContainers(paddingS, orientation); });
    var _a = __read(containerSArr, 4), paddingContainerBottomS = _a[0], paddingContainerTopS = _a[1], paddingContainerRightS = _a[2], paddingContainerLeftS = _a[3];
    var _b = __read(containerSArr.map(function (sel, index) {
        var element = elementFromSelection(sel);
        var orientation = orientations[index];
        // const dim = (orientation === 'top' || orientation === 'bottom') ? 'height' : 'width' //maybe in future
        var val = getComputedStyle(element).getPropertyValue("--chart-padding-".concat(orientation));
        if (isCSSBreakpointLengthValue(val))
            return cssLengthInPx(val, element);
        return 0;
    }), 4), paddingLeft = _b[0], paddingTop = _b[1], paddingRight = _b[2], paddingBottom = _b[3];
    var drawAreaClipPath = drawArea.selectAll('.draw-area__clip')
        .data([null])
        .join('clipPath')
        .classed('draw-area__clip', true);
    if (!drawAreaClipPath.attr('id'))
        drawAreaClipPath.attr('id', uniqueId());
    var clipPathRect = {
        x: -paddingLeft, y: -paddingTop,
        width: boundsAttr.width + paddingLeft + paddingRight,
        height: boundsAttr.height + paddingTop + paddingBottom
    };
    renderBgSVGOnlyByRect(drawAreaClipPath, clipPathRect);
    drawArea.attr('clip-path', "url(#".concat(drawAreaClipPath.attr('id'), ")"));
    return {
        drawArea: drawArea,
        background: background,
        gridArea: gridArea,
        drawAreaClipPath: drawAreaClipPath,
        paddingContainerBottomS: paddingContainerBottomS,
        paddingContainerTopS: paddingContainerTopS,
        paddingContainerRightS: paddingContainerRightS,
        paddingContainerLeftS: paddingContainerLeftS
    };
}
function renderPaddingContainers(paddingS, orientation) {
    return paddingS
        .selectAll(".padding-container--".concat(orientation))
        .data([null])
        .join('g')
        .classed("padding-container--".concat(orientation), true);
}
function renderHeader(selection) {
    return selection
        .selectAll('.header')
        .data(function (d) { return [d]; })
        .join('g')
        .classed('header', true);
}
function renderTitle$1(header, chart) {
    return header
        .selectAll('.title')
        .data(function (d) { return [getCurrentResponsiveValue(d.title, { chart: chart })]; })
        .join('g')
        .classed('title', true)
        .selectAll('text')
        .data(function (d) { return [d]; })
        .join('text')
        .text(function (d) { return d; })
        .call(function (s) { return wrapTextByTwinWidth(s); });
}
function renderSubtitle(header, chart) {
    return header
        .selectAll('.subtitle')
        .data(function (d) { return [getCurrentResponsiveValue(d.subTitle, { chart: chart })]; })
        .join('g')
        .classed('subtitle', true)
        .selectAll('text')
        .data(function (d) { return [d]; })
        .join('text')
        .text(function (d) { return d; });
}

function layoutNodeStyleAttr(selection) {
    selection.each(function (d, i, g) {
        var propTrue = function (p) { return p.trim() === 'true'; };
        var computedStyleHTMLElement = window.getComputedStyle(g[i]);
        var fitWidth = propTrue(computedStyleHTMLElement.getPropertyValue('--fit-width'));
        var fitHeight = propTrue(computedStyleHTMLElement.getPropertyValue('--fit-height'));
        if (fitWidth || fitHeight) {
            var bbox = d.element.getBoundingClientRect();
            if (fitWidth)
                g[i].style.setProperty('width', "".concat(bbox.width, "px"));
            if (fitHeight)
                g[i].style.setProperty('height', "".concat(bbox.height, "px"));
        }
        for (var varIndex = 0, len = cssVars.length; varIndex < len; varIndex++) {
            var prop = d.element.style.getPropertyValue(cssVars[varIndex]);
            if (prop !== undefined)
                g[i].style.setProperty(cssVars[varIndex], prop);
        }
    });
}
function layoutNodeClassAttr(selection) {
    selection.each(function (d, i, g) {
        select(g[i]).attr('class', d.element.getAttribute('class'))
            .each(function (_, i, g) { return select(g[i]).classed(d.element.tagName, true); })
            .classed('layout', true);
    });
    // Alternatively preserve classes method:
    // selection
    //   .each((d, i, g) => {
    //     const classList = d.element.getAttribute('class')?.split(/\s+/) ?? []
    //     g[i].classList.add(...classList)
    //     select(g[i]).classed(d.element.tagName, true)
    //   })
    //   .classed('layout', true);
}
function layoutNodeDataAttrs(selection) {
    selection.each(function (svgTwin, i, g) {
        var layoutE = g[i];
        var svgE = svgTwin.element;
        var dataAttrsToObj = function (attrs) {
            return Array.from(attrs)
                .filter(function (a) { return a.name.startsWith('data-'); })
                .reduce(function (obj, a) {
                var _a;
                return Object.assign(obj, (_a = {}, _a["".concat(a.name)] = a.value, _a));
            }, {});
        };
        var layoutAttrs = dataAttrsToObj(layoutE.attributes);
        var svgAttrs = dataAttrsToObj(svgE.attributes);
        // remove layoutE data attrs that don't exist on svgE
        Object.keys(layoutAttrs)
            .filter(function (attr) { return svgAttrs[attr] !== undefined; })
            .forEach(function (attr) { return layoutE.removeAttribute(attr); });
        // set svgE data attrs on layoutE
        Object.keys(svgAttrs).forEach(function (attr) { return layoutE.setAttribute(attr, svgAttrs[attr]); });
    });
}
function layoutNodeBounds(selection) {
    var anyChanged = false;
    selection.each(function (svgTwin) {
        var svgE = svgTwin.element;
        var svgS = select(svgE);
        if (this.classList.contains('layout-container-positioner'))
            return;
        var prevBounds = rectFromString(svgS.attr('bounds') || '0, 0, 0, 0');
        var bounds = elementRelativeBounds(this);
        var changed = !rectEquals(prevBounds, bounds, 1);
        // if (svgE.classList.contains('axis-y')) {
        //   const epsilon = 1
        //   const xAbs = Math.abs(bounds.x - prevBounds.x)
        //   const yAbs = Math.abs(bounds.y - prevBounds.y)
        //   const heightAbs = Math.abs(bounds.height - prevBounds.height)
        //   const widthAbs = Math.abs(bounds.width - prevBounds.width)
        //   if (xAbs > epsilon)  {
        //     console.log(svgE.classList, xAbs, 'X')
        //   }
        //   if (yAbs > epsilon)  {
        //     console.log(svgE.classList, yAbs, 'Y')
        //   }
        //   if (widthAbs > epsilon)  {
        //     console.log(svgE.classList, widthAbs, 'WIDTH')
        //   }
        //   if (heightAbs > epsilon)  {
        //     console.log(svgE.classList, heightAbs, 'Height')
        //   }
        // }
        anyChanged = anyChanged || changed;
        var svgParentE = svgE.parentElement;
        if (this.classList.contains('layout-container-positioner') && svgParentE instanceof SVGElement) {
            //TODO: maybe use css variables for this
            var parentBounds = elementAbsoluteBounds(svgParentE);
            select(this).style('top', parentBounds.y + 'px');
            select(this).style('left', parentBounds.x + 'px');
            return anyChanged;
        }
        if (changed) {
            svgS.attr('bounds', rectToString(bounds));
            switch (svgE.tagName) {
                case 'svg':
                case 'rect':
                    svgS.call(function (s) { return rectToAttrs(s, bounds); });
                    break;
                case 'circle':
                    svgS.call(function (s) { return circleToAttrs(s, circleInsideRect(bounds)); });
                    break;
                case 'ellipse':
                    svgS.call(function (s) { return ellipseToAttrs(s, ellipseInsideRect(bounds)); });
                    break;
                case 'text':
                    positionSVGTextToLayoutCenter(svgS, bounds);
                    break;
                default:
                    svgS.call(function (s) { return positionToTransformAttr(s, bounds); });
            }
        }
    });
    return anyChanged;
}

function layoutNodeChildren(selection) {
    var childS = selection
        .selectChildren('.layout')
        .data(function (d) { return layedOutChildren(d); })
        .join(function (enter) {
        var div = enter.append('div');
        div.each(function (d, i, g) {
            if (!d.element.classList.contains('layout-container'))
                return;
            select(g[i])
                .classed('layout layout-container-positioner', true)
                .style('position', 'fixed');
        });
        return div;
    })
        .each(function (d, i, g) {
        if (!select(g[i]).classed('layout layout-container-positioner'))
            return;
        select(g[i]).selectChildren('.layout.layout-container')
            .data([d])
            .join('div')
            .classed('layout layout-container', true);
    });
    var filteredChildS = childS.filter(':not(.layout-container-positioner)');
    var filteredChildPositionerS = childS.filter('.layout-container-positioner').selectChildren('*');
    return selectAll(__spreadArray(__spreadArray([], __read(filteredChildS.nodes()), false), __read(filteredChildPositionerS.nodes()), false));
}
function layedOutChildren(parent) {
    var parentIgnoresChildrenAttr = false;
    var parentSFiltered = select(parent.element).filter(function (d, i, g) {
        parentIgnoresChildrenAttr = !!select(g[i]).attr('data-ignore-layout-children');
        var hasNoLayoutContainerDescandant = select(g[i]).selectAll('.layout-container').empty();
        return !(parentIgnoresChildrenAttr && hasNoLayoutContainerDescandant);
    });
    var information = [];
    parentSFiltered.selectChildren(':not(.layout)')
        .each(function (d, i, g) {
        var isLayoutContainer = select(g[i]).classed('layout-container');
        var ignoreSelfAttr = select(g[i]).attr('data-ignore-layout');
        var hasNoLayoutContainerDescendant = select(g[i]).selectAll('.layout-container').empty();
        var ignoreBoundsBecauseOfParent = parentIgnoresChildrenAttr && !isLayoutContainer;
        var ignoreBoundsBecauseOfSelf = ignoreSelfAttr && !isLayoutContainer;
        var ignoreBoundsBecauseInBetween = parent.ignoredByAncestor && !isLayoutContainer;
        var ignoreBounds = ignoreBoundsBecauseOfParent || ignoreBoundsBecauseOfSelf || ignoreBoundsBecauseInBetween;
        if (ignoreBounds && hasNoLayoutContainerDescendant)
            return;
        information.push({
            element: this,
            ignoredByAncestor: (parentIgnoresChildrenAttr || ignoreSelfAttr) ? true :
                parent.ignoredByAncestor && !isLayoutContainer,
            ignoreBounds: ignoreBounds
        });
    });
    return information;
}

function renderLayouter(parentS) {
    var classes = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        classes[_i - 1] = arguments[_i];
    }
    var _a = createSelectionClasses(classes), classString = _a.classString, selector = _a.selector;
    return parentS.selectAll("".concat(selector, ".layouter"))
        .data([null])
        .join('div')
        .classed("".concat(classString, " layouter"), true);
}
function layouterCompute(layouterS) {
    if (!layouterS.node().isConnected)
        return;
    var layouterChildDivS = layoutLayouter(layouterS.node());
    return layoutContainerCompute(layouterChildDivS, layouterS);
}
function layoutLayouter(layouter) {
    return select(layouter)
        .selectChildren('.layout.layout-container')
        .data([{
            element: select(layouter).selectChildren('svg').node(),
            ignoredByAncestor: false,
            ignoreBounds: false
        }])
        .join('div');
    // .classed('layout layout-container', true)
}
function layoutContainerCompute(layoutContainerS, layouterS) {
    if (!layoutContainerS.node().isConnected)
        return false;
    var anyBoundsChanged = false;
    layoutContainerS.each(function () {
        var layoutRootS = select(this);
        var layoutS = layoutRootS;
        while (!layoutS.empty()) {
            layoutNodeClassAttr(layoutS);
            layoutNodeStyleAttr(layoutS);
            layoutNodeDataAttrs(layoutS);
            layoutS = layoutNodeChildren(layoutS);
        }
        layouterS.selectAll('.layout').each(function () {
            var layoutS = select(this);
            if (layoutS.datum().ignoreBounds)
                return;
            //TODO: synchronization phase! has also detection of bounds in it
            var boundsChanged = layoutNodeBounds(layoutS);
            anyBoundsChanged = anyBoundsChanged || boundsChanged;
        });
        if (anyBoundsChanged) {
            var bounds = rectFromString(select(layoutRootS.datum().element).attr('bounds'));
            layoutRootS
                .style('left', bounds.x)
                .style('top', bounds.y)
                .attr('x', null)
                .attr('y', null)
                .attr('width', null)
                .attr('height', null)
                .attr('viewBox', rectToString(__assign(__assign({}, bounds), { x: 0, y: 0 })));
            anyBoundsChanged = true;
        }
    });
    if (anyBoundsChanged) {
        layoutContainerS.dispatch('boundschange');
    }
    return anyBoundsChanged;
}

var Chart = /** @class */ (function () {
    function Chart() {
        this.addedListeners = false;
        this.initialRenderHappened = false;
        this.filterDispatch = dispatch('filter');
        this.subsequentRenderCount = 0;
        this.unmounted = false;
    }
    Object.defineProperty(Chart.prototype, "windowS", {
        get: function () {
            return (this._windowS && !this._windowS.empty()) ? this._windowS :
                this.windowS.selectAll('.window-rv');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Chart.prototype, "layouterS", {
        get: function () {
            return (this._layouterS && !this._layouterS.empty()) ? this._layouterS :
                this.windowS.selectAll('.layouter');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Chart.prototype, "chartS", {
        get: function () {
            return (this._chartS && !this._chartS.empty()) ? this._chartS :
                this.layouterS.selectAll('svg.chart');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Chart.prototype, "legendS", {
        get: function () {
            return (this._legendS && !this._legendS.empty()) ? this._legendS :
                this.chartS.selectAll('.legend');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Chart.prototype, "paddingWrapperS", {
        get: function () {
            return (this._paddingWrapperS && !this._paddingWrapperS.empty()) ? this._paddingWrapperS :
                this.chartS.selectAll('.padding-wrapper');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Chart.prototype, "drawAreaS", {
        get: function () {
            return (this._drawAreaS && !this._drawAreaS.empty()) ? this._drawAreaS :
                this.chartS.selectAll('.draw-area');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Chart.prototype, "drawAreaBgS", {
        get: function () {
            return (this._drawAreaBgS && !this._drawAreaBgS.empty()) ? this._drawAreaBgS :
                this.drawAreaS.selectChildren('.background');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Chart.prototype, "drawAreaClipPathS", {
        get: function () {
            return (this._drawAreaClipPathS && !this._drawAreaClipPathS.empty()) ? this._drawAreaClipPathS :
                this.drawAreaS.selectChildren('.draw-area__clip');
        },
        enumerable: false,
        configurable: true
    });
    Chart.prototype.exitEnterActive = function () {
        return this.windowS.selectAll('.entering, .exiting').size() > 0;
    };
    Chart.prototype.buildChart = function () {
        this.render();
        layouterCompute(this.layouterS);
        if (this.addedListeners)
            return;
        var chartDivS = this.layouterS.selectChild('div.chart');
        if (chartDivS)
            this.resizeObserver = resizeEventListener(chartDivS, this.windowS);
        this.addedListeners = true;
        this.render();
        layouterCompute(this.layouterS);
    };
    /**
     * Adds custom event listener. Be sure to add custom event listeners before calling {@link Chart.buildChart}
     * as the method also adds listeners and the order matters.
     */
    Chart.prototype.addCustomListener = function (name, callback) {
        this.windowS.on(name, callback);
    };
    Chart.prototype.addFinalListeners = function () {
        var _this = this;
        var onResize = function () {
            _this.subsequentRenderCount = 0;
            _this.onResizeRender();
        };
        var onStandardInteraction = function () {
            if (_this.windowS.selectAll('.mid-d3-transit').size() > 0)
                return;
            _this.subsequentRenderCount = 0;
            _this.onStandardInteractionRender();
        };
        var onImmediateInteraction = function () {
            _this.subsequentRenderCount = 0;
            _this.onImmediateInteractionRender();
        };
        if (!this.immediateInteractionThrottle) {
            //optimal values: //chrome zooming 55 //firefox zooming 30
            this.immediateInteractionThrottle = new ThrottleScheduled(onImmediateInteraction, 30);
        }
        if (!this.standardInteractionThrottle) {
            this.standardInteractionThrottle = new ThrottleScheduled(function () {
                return _this.windowS.dispatch('resize', { detail: { type: 'standard-interaction' } });
            }, 50);
        }
        this.windowS.on('pointermove.final pointerleave.final pointerdown.final pointerup.final', function () { var _a; return (_a = _this.standardInteractionThrottle) === null || _a === void 0 ? void 0 : _a.invokeScheduled(); });
        this.windowS.on('resize.final', function (context) {
            var _a, _b;
            clearTimeout(_this.rerenderAfterResizeScheduled);
            switch ((_a = context.detail) === null || _a === void 0 ? void 0 : _a.type) {
                case 'resize':
                    onResize();
                    break;
                case 'standard-interaction': {
                    onStandardInteraction();
                    break;
                }
                case 'immediate-interaction':
                default: {
                    (_b = _this.immediateInteractionThrottle) === null || _b === void 0 ? void 0 : _b.invokeScheduled();
                    break;
                }
            }
        });
    };
    Chart.prototype.inRenderLoop = function () {
        if (this.subsequentRenderCount > 3) {
            return true;
        }
        this.subsequentRenderCount++;
        return false;
    };
    Chart.prototype.onResizeRender = function () {
        var _this = this;
        if (this.inRenderLoop())
            return;
        this.render();
        if (!this.layouterS)
            return;
        if (!layouterCompute(this.layouterS))
            return;
        this.rerenderAfterResizeScheduled = setTimeout(function () {
            _this.onResizeRender();
        }, 20);
    };
    Chart.prototype.onStandardInteractionRender = function () {
        if (this.inRenderLoop())
            return;
        if (!this.layouterS)
            return;
        if (!layouterCompute(this.layouterS))
            return; //layoutercompute should return any style change?
        this.subsequentRenderCount++;
        this.render();
    };
    Chart.prototype.onImmediateInteractionRender = function () {
        if (this.inRenderLoop())
            return;
        this.render();
        if (!this.layouterS)
            return;
        if (!layouterCompute(this.layouterS))
            return; //layoutercompute should return any style change?
        this.subsequentRenderCount++;
        this.render();
        this.onResizeRender();
    };
    Chart.prototype.render = function () {
        if (!this.windowS.node().isConnected || this.unmounted)
            return;
        this.renderChart();
        this.renderContent();
        this.addFinalListeners();
        this.initialRenderHappened = true;
    };
    Chart.prototype.renderChart = function () {
        var data = this.windowS.datum();
        renderWindow(this.windowS);
        renderLayouter(this.windowS);
        renderChart(this.layouterS, data, "chart-".concat(data.type));
        attachActiveCursorLocking(this.chartS);
    };
    Chart.prototype.unmountChart = function () {
        this.unmounted = true;
        this.windowS.remove();
        // delete this
    };
    return Chart;
}());

function validateChart(args) {
    return {
        renderer: args.renderer,
        breakpoints: new ComponentBreakpoints(args.breakpoints),
        title: validateResponsiveValue(args.title || ''),
        subTitle: validateResponsiveValue(args.subTitle || ''),
    };
}

function addLegendHoverHighlighting(legendS) {
    var legend = legendS.datum();
    var chartS = legend.renderer.chartS;
    if (!chartS)
        throw new Error(ErrorMessages.elementNotExisting);
    var drawAreaS = chartS.selectAll('.draw-area');
    return legendS.on('pointerover.chartpointhighlight pointerout.chartpointhighlight', function (e) {
        highlightElements(drawAreaS, select(e.target.closest('.legend-item')), e.type.endsWith('over'));
    });
}
function highlightElements(chartS, legendItemS, hover) {
    legendItemS.each(function (_, i, g) {
        var key = g[i].getAttribute('data-key');
        var tokens = splitKey(key);
        tokens.reduce(function (sel, token, index) {
            if (index === 0)
                return sel.selectAll(".element[data-key~=\"".concat(token, "\"]"));
            return sel.filter(".element[data-key~=\"".concat(token, "\"]"));
        }, chartS).classed('highlight', hover);
    });
}

function createLegendItems(legend) {
    var series = legend.series, symbols = legend.symbols, reverse = legend.reverse;
    var categories = series.originalData.categories;
    if (!categories)
        return [];
    var items = categories.categories.categoryArray.map(function (c, i) {
        return {
            label: c.formatValue,
            styleClass: c.styleClass,
            symbol: Array.isArray(symbols) ? symbols[i] : symbols,
            key: mergeKeys([categories.parentKey, c.key]),
        };
    });
    return reverse ? items.reverse() : items;
}

function renderLegendCategories(legendS) {
    var legendCategoriesS = legendS.selectAll('.legend__categories')
        .data([legendS.datum()])
        .join('g')
        .classed('legend__categories', true);
    renderTitle(legendCategoriesS);
    var itemS = legendCategoriesS.selectAll('.items')
        .data([null])
        .join('g')
        .classed('items', true);
    itemS
        .selectAll('.legend-item')
        .data(createLegendItems(legendS.datum()), function (d) { return d.label; })
        .join(function (enter) {
        return enter
            .append('g')
            .classed('legend-item', true)
            .call(function (itemS) { return itemS.append('path').classed('symbol', true); })
            .call(function (itemS) { return itemS.append('text').classed('label', true); });
    }, undefined)
        .each(function (itemD, i, g) {
        var itemS = select(g[i]);
        itemS.selectAll('.label').text(itemD.label);
        itemS.selectAll('.symbol').call(function (symbolS) {
            var boundsAttr = symbolS.attr('bounds');
            if (!boundsAttr)
                return;
            //TODO: this is only a temporary fix as layouter does also apply translation which
            // would make it double
            itemD.symbol(symbolS.node(), __assign(__assign({}, rectFromString(boundsAttr)), { x: 0, y: 0 }));
        });
        renderBgSVGOnlyBBox(itemS);
    })
        .attr('data-style', function (d) { return d.styleClass; })
        .attr('data-key', function (d) { return d.key; })
        .classed('filter-out', function (d) { var _a; return ((_a = legendS.datum().series.originalData.categories) === null || _a === void 0 ? void 0 : _a.isKeyActiveByKey(d.key)) === false; })
        .on('click.filter', function (e, d) {
        if (legendS.datum().renderer.exitEnterActive())
            return;
        legendS.datum().renderer.filterDispatch
            .call('filter', { dataKey: d.key }, this);
    })
        .on('pointerover.legend-item pointerout.legend-item', function (e) {
        var item = e.currentTarget;
        if (item)
            item.classList.toggle('highlight', e.type.endsWith('over'));
    });
}
function renderTitle(legendS) {
    var _a = legendS.datum(), renderer = _a.renderer, title = _a.title;
    //TODO: add self to mapping when legend has breakpoints
    var text = getCurrentResponsiveValue(title, { chart: renderer.chartS });
    legendS
        .selectChildren('.title')
        .data([text])
        .join('text')
        .classed('title', true)
        .classed('empty', function (d) { return !d; })
        .text(function (d) { return d; });
}

function renderLegend(parentS, legend) {
    var legendS = parentS
        .selectAll('.legend')
        .data([legend])
        .join('g')
        .classed('legend', true)
        .each(function (legendD, i, g) {
        var legendS = select(g[i]);
        renderLegendCategories(legendS);
        renderLegendColorScale(legendS);
    });
    return legendS;
}
function renderLegendColorScale(legendS) {
    var _a = legendS.datum(), series = _a.series, renderer = _a.renderer;
    var color = series.originalData.color;
    if (!color)
        return;
    var defsS = renderer.chartS.selectAll('defs')
        .data([null])
        .join('defs');
    var colorScaleGradientS = defsS.selectAll('.color-scale-gradient')
        .data([color])
        .join('linearGradient')
        .classed('color-scale-gradient', true);
    if (!colorScaleGradientS.attr('id'))
        colorScaleGradientS.attr('id', "color-scale-gradient-".concat(uniqueId()));
    var _b = __read([Math.min.apply(Math, __spreadArray([], __read(color.scale.domain()), false)), Math.max.apply(Math, __spreadArray([], __read(color.scale.domain()), false))], 2), domainMin = _b[0], domainMax = _b[1];
    var domainDiff = domainMax - domainMin;
    // Set the color stops for the gradient
    if (colorScaleGradientS.selectAll("stop").empty()) {
        colorScaleGradientS.selectAll("stop")
            .data(range(0, 1.05, 0.05))
            .join("stop")
            .attr("offset", function (d) { return d; })
            .attr("stop-color", function (d) { var _a; return (_a = color === null || color === void 0 ? void 0 : color.scale(domainMin + d * domainDiff)) !== null && _a !== void 0 ? _a : null; });
    }
    // Draw the gradient rectangle
    var legendColorScaleS = legendS.selectAll(".legend__color-scale")
        .data([null])
        .join('g')
        .classed('legend__color-scale', true);
    legendColorScaleS.selectAll('rect')
        .data([null]).join('rect')
        .style("fill", "url(#".concat(colorScaleGradientS.attr('id'), ")"));
    var _c = rectFromString(legendColorScaleS.attr('bounds') || '0, 0, 600, 400'), width = _c.width; _c.height;
    color.axis.scaledValues.scale.range([0, width]);
    legendColorScaleS.selectAll('.axis')
        .data([color.axis])
        .join('g')
        .call(function (s) { return renderAxisLayout(s, 'horizontal'); })
        .classed('axis', true);
}

function validateLegend(data) {
    var _a;
    var renderer = data.renderer, series = data.series;
    return {
        renderer: renderer,
        series: series,
        title: validateResponsiveValue(data.title || ''),
        reverse: (_a = data.reverse) !== null && _a !== void 0 ? _a : false,
        symbols: data.symbols || (function (e, s) { return rectToPath(e, rectFromSize(s)); }),
    };
}

var downloadSVGRaw = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"#2c3e50\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\r\n    <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/>\r\n    <path d=\"M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2\" />\r\n    <path d=\"M7 11l5 5l5 -5\" />\r\n    <path d=\"M12 4l0 12\" />\r\n</svg>\r\n";

var cancelSVGRaw = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"15\" y1=\"9\" x2=\"9\" y2=\"15\"></line><line x1=\"9\" y1=\"9\" x2=\"15\" y2=\"15\"></line></svg>\r\n";

function renderDialog(parentS) {
    var classes = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        classes[_i - 1] = arguments[_i];
    }
    var _a = createSelectionClasses(classes), classString = _a.classString, selector = _a.selector;
    var dialogS = parentS.selectAll(selector);
    var toggleTimeout = dialogS.empty() ? undefined : dialogS.datum().toggleTimeout;
    return dialogS
        .data([{
            triggerEnter: function () { },
            triggerExit: function () { },
            onClickOutside: function () { },
            toggleTimeout: toggleTimeout
        }])
        .join('dialog')
        .classed(classString, true);
}
function bindOpenerToDialog(props) {
    var dialogOpenerS = props.dialogOpenerS, dialogS = props.dialogS, transitionMS = props.transitionMS, _a = props.type, type = _a === void 0 ? 'modeless' : _a;
    var dialogE = dialogS.node();
    dialogOpenerS.on('click.dialog', function () {
        var _a, _b;
        (_b = (_a = dialogS.datum()).onOpenerClick) === null || _b === void 0 ? void 0 : _b.call(_a);
        var currentTransition = dialogE.getAttribute('transition');
        if (currentTransition === 'enter')
            exit();
        else
            enter();
    });
    function enter() {
        clearTimeout(dialogS.datum().toggleTimeout);
        type === 'modal' ? dialogE.showModal() : dialogE.show();
        dialogS.attr('transition', 'enter');
        dialogS.datum().toggleTimeout = setTimeout(function () {
            dialogS.attr('transition-state', 'enter-done');
        }, transitionMS);
    }
    function exit() {
        clearTimeout(dialogS.datum().toggleTimeout);
        dialogS.attr('transition', 'exit');
        dialogS.datum().toggleTimeout = setTimeout(function () {
            dialogS.attr('transition-state', 'exit-done');
            dialogE.close();
        }, transitionMS);
    }
    dialogS.datum().triggerEnter = function () { return enter(); };
    dialogS.datum().triggerExit = function () { return exit(); };
    dialogS.datum().onClickOutside = function (e) {
        if (!e.target || !(e.target instanceof HTMLDialogElement))
            return;
        var rect = e.target.getBoundingClientRect();
        var clickedInDialog = rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
            rect.left <= e.clientX && e.clientX <= rect.left + rect.width;
        if (!clickedInDialog) {
            dialogS.datum().triggerExit();
        }
    };
    dialogS.on('click.Outside', function (e) {
        dialogS.datum().onClickOutside(e);
    });
}

function renderTool$1(parentS) {
    var additionalClasses = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        additionalClasses[_i - 1] = arguments[_i];
    }
    var selector = additionalClasses.map(function (additionalClass) { return '.' + additionalClass; }).join('');
    var names = additionalClasses.map(function (additionalClass) { return ' ' + additionalClass; }).join('');
    return parentS
        .selectAll(".tool".concat(selector))
        .data([null])
        .join('div')
        .classed("tool".concat(names), true);
}

function optimizeSVG(selection, renderer) {
    var _a = renderer.windowS.datum().settings.state, downloadAttributeMaxDecimals = _a.downloadAttributeMaxDecimals, downloadAttributeMaxDecimalsActive = _a.downloadAttributeMaxDecimalsActive, downloadRemoveBgElements = _a.downloadRemoveBgElements;
    if (downloadAttributeMaxDecimalsActive)
        roundSVGAttributes(selection, parseInt(downloadAttributeMaxDecimals));
    if (downloadRemoveBgElements)
        removeBackgrounds(selection);
}
function roundSVGAttributes(selection, decimals) {
    if (decimals === void 0) { decimals = 2; }
    selection.selectAll('*').each(function (d, i, g) {
        var elementS = select(g[i]);
        elementS.each(function () {
            for (var i_1 = 0; i_1 < this.attributes.length; i_1++) {
                var regex = /(\d+\.\d+)|(\.\d+)/g;
                var attribute = this.attributes[i_1];
                var modifiedValue = this.attributes[i_1].value.replace(regex, function (match) {
                    return parseFloat(match).toFixed(decimals);
                });
                elementS.attr(attribute.name, modifiedValue);
            }
        });
    });
}
function removeBackgrounds(selection) {
    selection.selectAll('.background, .background-svgonly')
        .filter(function () {
        return !(this.parentNode instanceof SVGClipPathElement); //clippath backgrounds must remain to give clippath bounds!
    }).remove();
}

function getUnrestrainedSelectors(root, cssStyleRule) {
    var selectors = cssStyleRule.selectorText.split(',');
    return selectors.map(function (selector) {
        //concat at ampersand places
        var selectorParts = selector.trim().split(/\s+/);
        selectorParts[0] = selectorParts[0] === '&' ? selectorParts[0].substring(1) : selectorParts[0];
        for (var i = 0; i <= selectorParts.length - 1; i++) {
            var unRestrainedSelector = selectorParts.slice(i).join(' ');
            try {
                if (root.querySelector(unRestrainedSelector)) {
                    return unRestrainedSelector;
                }
            }
            catch (e) {
                if (!(e instanceof DOMException))
                    throw e;
            }
        }
        return '';
    }).filter(function (selector) { return selector !== ''; });
}
function groundUnrestrainedSelectors(selectors) {
    return selectors.map(function (selector) { return '.chart ' + selector; }).join(',');
}

function getActiveCSSRulesForElement(target) {
    var cssRules = new Set();
    var targetClone = target.cloneNode(true);
    for (var i = 0; i < document.styleSheets.length; i++) {
        var styleSheet = document.styleSheets[i];
        if (!styleSheet.cssRules)
            continue;
        getActiveCSSRules(styleSheet.cssRules).forEach(function (rule) { return cssRules.add(rule); });
    }
    function getActiveCSSRules(rules) {
        var cssRules = new Set();
        for (var i = 0; i < rules.length; i++) {
            var cssRule = rules[i];
            switch (true) {
                case cssRule instanceof CSSMediaRule:
                    {
                        if (window.matchMedia(cssRule.media.mediaText).matches) {
                            var activeMediaRules = getActiveCSSRules(cssRule.cssRules);
                            activeMediaRules.forEach(function (rule) { return cssRules.add(rule); });
                        }
                    }
                    break;
                case cssRule instanceof CSSContainerRule:
                    {
                        //TODO: maybe replace this method as soon as there is global support for
                        //      checking container queries like for CSSMediaRule
                        var activeContainerRules = getActiveCSSRules(cssRule.cssRules);
                        activeContainerRules.forEach(function (rule) { return cssRules.add(rule); });
                    }
                    break;
                case cssRule instanceof CSSStyleRule:
                case cssRule instanceof CSSPageRule:
                    {
                        var styleRules = getStyleRules(cssRule);
                        styleRules.forEach(function (rule) { return cssRules.add(rule); });
                    }
                    break;
            }
        }
        return cssRules;
    }
    function getWholeSelector(cssRule) {
        var includeParentSelector = (cssRule.parentRule && (cssRule instanceof CSSStyleRule || cssRule instanceof CSSPageRule));
        return (includeParentSelector ? getWholeSelector(cssRule.parentRule) : '') + ' ' + cssRule.selectorText;
    }
    function getStyleRules(cssRule) {
        var selectorText = getWholeSelector(cssRule).replace('&', '');
        var activeElementSVGStandalone = targetClone.matches(selectorText) ? targetClone : targetClone.querySelector(selectorText);
        if (activeElementSVGStandalone) {
            return new Set().add(cssRule.cssText);
        }
        var activeElementInDOM = target.matches(selectorText) ? target : target.querySelector(selectorText);
        if (activeElementInDOM) {
            if (cssRule.parentRule instanceof CSSContainerRule && CSSRuleHasEffect(cssRule, activeElementInDOM))
                return new Set();
            var adaptedSelector = groundUnrestrainedSelectors(getUnrestrainedSelectors(targetClone, cssRule));
            return new Set().add(adaptedSelector.trim() + ' {' + cssRule.style.cssText + '}');
        }
        if (cssRule.cssRules && cssRule.cssRules.length > 0) {
            return getActiveCSSRules(cssRule.cssRules);
        }
        return new Set();
    }
    function CSSRuleHasEffect(rule, element) {
        var beforeStyleComputed = window.getComputedStyle(element);
        var beforeStyle = {};
        for (var prop in beforeStyleComputed) {
            beforeStyle[prop] = beforeStyleComputed[prop];
        }
        var styleElement = document.createElement('style');
        styleElement.appendChild(document.createTextNode(rule.cssText));
        document.head.appendChild(styleElement);
        var afterStyle = window.getComputedStyle(element);
        for (var prop in beforeStyle) {
            if (beforeStyle[prop] !== afterStyle[prop]) {
                document.head.removeChild(styleElement);
                return true;
            }
        }
        document.head.removeChild(styleElement);
        return false;
    }
    return cssRules;
}

function getActiveCSSVars(element) {
    var computedStyles = window.getComputedStyle(element);
    var cssVariables = {};
    for (var i = 0; i < computedStyles.length; i++) {
        var propertyName = computedStyles[i];
        if (!propertyName.startsWith('--'))
            continue;
        cssVariables[propertyName] = computedStyles.getPropertyValue(propertyName).trim();
    }
    return cssVariables;
}
function getRelevantCSSVars(cssVars, cssRules) {
    var entries = Object.entries(cssVars);
    var keys = entries.map(function (entry) { return entry[0]; });
    var values = entries.map(function (entry) { return entry[1]; });
    var relevantCSSVars = {};
    for (var i = 0; i < keys.length; i++) {
        for (var j = 0; j < cssRules.length; j++) {
            var cssVarKey = keys[i];
            var rule = cssRules[j];
            if (rule.includes(cssVarKey)) {
                relevantCSSVars[cssVarKey] = values[i];
                break;
            }
        }
    }
    return relevantCSSVars;
}
function cssContentFromEntries(entries) {
    return Object.entries(entries).reduce(function (prev, _a) {
        var _b = __read(_a, 2), key = _b[0], value = _b[1];
        return prev + "".concat(key, ": ").concat(value, ";");
    }, '');
}

function createCSSRule(selectorText, content) {
    return selectorText + ' {' + content + '}';
}

function applyDownloadStyle(original, clone, renderer) {
    var settings = renderer.windowS.datum().settings;
    switch (settings.get('downloadStyleType')) {
        case "embedded":
            embedCSS(original, clone);
            break;
        case "inline":
            attrsFromComputedStyle(clone, original);
            break;
        default: {
            attrsFromComputedStyle(clone, original);
        }
    }
}
function embedCSS(original, clone) {
    var activeCSSRules = Array.from(getActiveCSSRulesForElement(original));
    var activeCSSVars = getActiveCSSVars(original);
    var relevantCSSVars = getRelevantCSSVars(activeCSSVars, __spreadArray([], __read(activeCSSRules), false));
    var cssVarRule = createCSSRule('.chart', cssContentFromEntries(relevantCSSVars));
    var styleTag = document.createElement("style");
    __spreadArray(__spreadArray([], __read(activeCSSRules), false), [cssVarRule], false).forEach(function (rule) {
        var ruleXMLConform = rule.replace(/&/g, '&amp;');
        styleTag.appendChild(document.createTextNode(ruleXMLConform));
    });
    clone.appendChild(styleTag);
    copyInlineStyles(clone, original);
}
function copyInlineStyles(target, source) {
    var style = source.style.cssText;
    if (style) {
        target.style.cssText = style;
    }
    for (var i = 0; i < source.children.length; ++i) {
        copyInlineStyles(target.children[i], source.children[i]);
    }
}
function attrsFromComputedStyle(target, source) {
    var svgPresentationStyle = elementComputedStyleWithoutDefaults(source, elementSVGPresentationAttrs);
    for (var prop in svgPresentationStyle) {
        target.setAttribute(prop, svgPresentationStyle[prop]);
    }
    applyTransformOriginStyles(target, source);
    for (var i = 0; i < source.children.length; ++i) {
        var child = target.children[i];
        attrsFromComputedStyle(child, source.children[i]);
    }
}
//Check if text elements use 'transform-box' and 'transform-origin'. If so, apply to transform matrix attribute
function applyTransformOriginStyles(target, source) {
    // if (source.tagName !== 'text') return
    var matrixPrev = target.getAttribute('transform');
    var svgTransformStyles = elementComputedStyleWithoutDefaults(source, elementSVGTransformStyles);
    if (!('transform-origin' in svgTransformStyles) || !('transform-box' in svgTransformStyles) || !matrixPrev)
        return;
    var transformOriginRegex = /(-?\d*\.?\d+)px (-?\d*\.?\d+)px/;
    var match = transformOriginRegex.exec(svgTransformStyles['transform-origin']);
    if (!match)
        return;
    var _a = source.getBBox(), bboxX = _a.x, bboxY = _a.y;
    var xTrans = bboxX + parseFloat(match[1]);
    var yTrans = bboxY + parseFloat(match[2]);
    var baseMatrix = new DOMMatrix(matrixPrev);
    var transformToOriginMatrix = new DOMMatrix();
    transformToOriginMatrix.e = xTrans;
    transformToOriginMatrix.f = yTrans;
    var transformFromOriginMatrix = new DOMMatrix();
    transformFromOriginMatrix.e = -xTrans;
    transformFromOriginMatrix.f = -yTrans;
    var finalMatrix = transformToOriginMatrix.multiply(baseMatrix).multiply(transformFromOriginMatrix);
    var matrixString = "matrix(".concat(finalMatrix.a, ", ").concat(finalMatrix.b, ", ").concat(finalMatrix.c, ", ").concat(finalMatrix.d, ", ").concat(finalMatrix.e, ", ").concat(finalMatrix.f, ")");
    target.setAttribute('transform', matrixString);
}

function prettifySVG(code, renderer) {
    var propertiesToRemove = cssVars.map(function (cssVar) { return cssVar; })
        .filter(function (cssVar) { return cssVar !== '--layout-width' && cssVar !== '--layout-height'; });
    var prettifiedSVG = removePropertiesFromSVGStyle(code, propertiesToRemove);
    if (!renderer.windowS.datum().settings.get('downloadPrettifyActive'))
        return prettifiedSVG;
    prettifiedSVG = addNewLinesBeforeOpeningTags(prettifiedSVG);
    prettifiedSVG = addNewlineBeforeGroupCloseTag(prettifiedSVG);
    var indentationSpaces = ' '.repeat(parseInt(renderer.windowS.datum().settings.get('downloadPrettifyIndentionSpaces')));
    prettifiedSVG = addTabsPerNestingLevel(prettifiedSVG, indentationSpaces);
    prettifiedSVG = prettifyStyleTags(prettifiedSVG);
    return prettifiedSVG;
}
function addNewLinesBeforeOpeningTags(code) {
    return code.replace(/<([^\/\?])/g, "\n$&");
}
function addNewlineBeforeGroupCloseTag(code) {
    //text|tspan
    var regexGroupTags = /(<\/(svg|g|defs|symbol|marker|a|switch|mask|clipPath|pattern|filter|textPath|use)>)/g;
    return code.replace(regexGroupTags, "\n$1");
}
function addTabsPerNestingLevel(code, indentationChars) {
    //text|tspan
    var regexAllTags = /(<\/?(svg|g|defs|symbol|marker|a|switch|mask|clipPath|pattern|filter|use|rect|circle|ellipse|line|polyline|polygon|path|image|text|textPath|tspan|glyph|missing-glyph|foreignObject).*?>)/g;
    var regexNesting = /(<\/?(svg|g|defs|symbol|marker|a|switch|mask|clipPath|pattern|filter|textPath|use).*?>)/g;
    var regexNonNesting = /(<\/?(rect|circle|ellipse|line|polyline|polygon|path|image|text|textPath|tspan|glyph|missing-glyph|foreignObject).*?>)/g;
    var tabs = 0;
    return code.replace(regexAllTags, function (match, p1) {
        if (p1.startsWith('</') && match.match(regexNesting)) {
            tabs--;
        }
        var tabString = indentationChars.repeat(tabs);
        if (!p1.startsWith('</') && match.match(regexNesting)) {
            tabs++;
        }
        if (p1.startsWith('</') && match.match(regexNonNesting))
            return p1;
        return "".concat(tabString).concat(p1);
    });
}
function prettifyStyleTags(code) {
    var regexStyle = /<style[^>]*>([\s\S]*?)<\/style>/g;
    return code.replace(regexStyle, function (match, p1) {
        var cssCode = p1;
        cssCode = cssCode.replace(/{/g, "{\n");
        cssCode = cssCode.replace(/}/g, "}\n\n");
        // &amp
        var lines = cssCode.split(/(?<!&amp);/).map(function (line) { return line.trim(); });
        var prettifiedLines = new Array();
        var spacesPerTab = 4;
        var indentLevel = 0;
        lines.forEach(function (line, index) {
            if (line) {
                var indentation = ' '.repeat(spacesPerTab * indentLevel);
                prettifiedLines.push(indentation + line + (index < (lines.length - 1) ? ';' : ''));
            }
        });
        var prettifiedCSS = prettifiedLines.join('\n');
        return "<style>\n".concat(prettifiedCSS, "\n</style>");
    });
}
function removePropertiesFromSVGStyle(code, propertiesToRemove) {
    var styleRegex = /(\s)style\s*=\s*"([^"]*)"/g;
    function removePropertiesFromStyle(style) {
        var propertyRegex = /([^:]+)\s*:\s*([^;]+);?/g;
        var updatedStyle = '';
        var match;
        while ((match = propertyRegex.exec(style)) !== null) {
            if (match[0].endsWith("&quot;") || match[0].endsWith("&apos;")) {
                continue;
            }
            var propertyName = match[1].trim();
            var propertyValue = match[2].trim();
            if (!propertiesToRemove.includes(propertyName)) {
                updatedStyle += "".concat(propertyName, ":").concat(propertyValue, ";");
            }
        }
        return updatedStyle;
    }
    return code.replace(styleRegex, function (_match, whiteSpace, styleAttr) {
        var modifiedStyle = removePropertiesFromStyle(styleAttr);
        return " style=\"".concat(modifiedStyle, "\"");
    });
}

function downloadChart(chartSelection, fileName, renderer) {
    chartSelection.each(function (d, i, g) {
        var _a = renderer.windowS.datum().settings.state, downloadStyleType = _a.downloadStyleType, downloadRemoveClasses = _a.downloadRemoveClasses, downloadRemoveDataKeys = _a.downloadRemoveDataKeys, downloadRemoveDataStyles = _a.downloadRemoveDataStyles, downloadMarginLeft = _a.downloadMarginLeft, downloadMarginTop = _a.downloadMarginTop, downloadMarginRight = _a.downloadMarginRight, downloadMarginBottom = _a.downloadMarginBottom;
        var clonedChart = g[i].cloneNode(true);
        var width = clonedChart.getAttribute('width');
        var height = clonedChart.getAttribute('height');
        var finalX = "".concat(0 - parseInt(downloadMarginLeft));
        var finalY = "".concat(0 - parseInt(downloadMarginTop));
        var finalWidth = "".concat(parseInt(width !== null && width !== void 0 ? width : '0') + parseInt(downloadMarginLeft) + parseInt(downloadMarginRight));
        var finalHeight = "".concat(parseInt(height !== null && height !== void 0 ? height : '0') + parseInt(downloadMarginTop) + parseInt(downloadMarginBottom));
        clonedChart.setAttribute('viewBox', "".concat(finalX, ", ").concat(finalY, ", ").concat(finalWidth, ", ").concat(finalHeight));
        clonedChart.removeAttribute('width');
        clonedChart.removeAttribute('height');
        clonedChart.removeAttribute('x');
        clonedChart.removeAttribute('y');
        applyDownloadStyle(g[i], clonedChart, renderer);
        optimizeSVG(select(clonedChart), renderer);
        var cloneContainer = document.createElement('div');
        cloneContainer.append(clonedChart);
        //prev regex / (layout|bounds|data-ignore-layout|data-ignore-layout-children)=".*?"/g
        var classString = (downloadStyleType === 'inline' && downloadRemoveClasses) ? '|class' : '';
        var dataKeyString = (downloadRemoveDataKeys) ? '|data-key' : '';
        var dataStyleString = (downloadStyleType === 'inline' && downloadRemoveDataStyles) ? '|data-style' : '';
        var optionalAttrs = classString + dataKeyString + dataStyleString;
        var regex = new RegExp("\\s(layout|bounds|data-ignore-layout|data-ignore-layout-children".concat(optionalAttrs, ")=\".*?\""), 'g');
        var cloneHTML = cloneContainer.innerHTML.replace(regex, '');
        cloneHTML = prettifySVG(cloneHTML, renderer);
        var blobType = 'image/svg+xml;charset=utf-8';
        var blob = new Blob([cloneHTML], { type: blobType });
        var url = URL.createObjectURL(blob);
        var anchor = document.createElement('a');
        fileName = fileName instanceof Function ? fileName.call(g[i], d, i, g) : fileName;
        anchor.href = url;
        anchor.download = fileName;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    });
}

function renderButton(parentS) {
    var classes = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        classes[_i - 1] = arguments[_i];
    }
    var _a = createSelectionClasses(classes), classString = _a.classString, selector = _a.selector;
    return parentS.selectAll(selector)
        .data([null])
        .join('button')
        .classed(classString, true);
}

function renderSimpleTooltip(parentS, data) {
    var classes = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        classes[_i - 2] = arguments[_i];
    }
    var _a = createSelectionClasses(__spreadArray(['tooltip-simple'], __read(classes), false)), classString = _a.classString, selector = _a.selector;
    return parentS.selectAll(selector)
        .data([data])
        .join('div')
        .classed(classString, true)
        .text(data.text);
}

function renderInputLabels(itemsS) {
    itemsS.each(function (d, i, g) {
        var labelData = d.labelData;
        select(g[i]).selectChildren('label')
            .data(labelData)
            .join('label')
            .each(function (d, i, g) { return renderInputLabel(select(g[i])); });
    });
}
function renderInputLabel(labelS) {
    var _a, _b, _c;
    var d = labelS.datum();
    d.render(labelS);
    labelS.on('click.callback', function (e) { var _a, _b; (_b = (_a = d.data).onClick) === null || _b === void 0 ? void 0 : _b.call(_a, e, d.data.type); });
    labelS.selectAll('input')
        .attr('size', (_a = d.data.size) !== null && _a !== void 0 ? _a : null)
        .on('click.callback', function (e) { var _a, _b; (_b = (_a = d.data).onInputClick) === null || _b === void 0 ? void 0 : _b.call(_a, e, d.data.type); });
    applyClassList(labelS, (_b = d.data.activeClasses) !== null && _b !== void 0 ? _b : [], true);
    applyClassList(labelS, (_c = d.data.inactiveClasses) !== null && _c !== void 0 ? _c : [], false);
}

var InfoSVG = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"#000000\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\r\n    <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/>\r\n    <path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0\" />\r\n    <path d=\"M12 9h.01\" />\r\n    <path d=\"M11 12h1v4h1\" />\r\n</svg>\r\n";

function renderSVGSeries(parentS, rawSVGs) {
    var parser = new DOMParser();
    var svgElements = rawSVGs.map(function (rawSVG) {
        var svgDocument = parser.parseFromString(rawSVG, 'image/svg+xml');
        return svgDocument.documentElement.cloneNode(true);
    });
    parentS.selectAll('svg')
        .data(svgElements)
        .join(function (enter) { return enter.append(function () { return enter.datum(); }); }, undefined, function (exit) { return exit.remove(); });
    return parentS;
    // parentS.html(rawSVG) //alternative
}

var RadioLabel = /** @class */ (function () {
    function RadioLabel(data) {
        this.data = data;
        this.tag = 'radio';
    }
    RadioLabel.prototype.render = function (labelS) {
        var _a = this.data, value = _a.value, name = _a.name, defaultVal = _a.defaultVal, onChange = _a.onChange, label = _a.label, type = _a.type, info = _a.info;
        var inputS = labelS.selectAll('input[type="radio"]')
            .data([null])
            .join('input')
            .attr('type', 'radio')
            .attr('value', value)
            .attr('name', name)
            .on('change', function (e) { return onChange === null || onChange === void 0 ? void 0 : onChange(e, type); });
        if (defaultVal === value)
            inputS.attr('checked', true);
        labelS.selectAll('span')
            .data([null])
            .join('span')
            .text(label);
        if (info) {
            var infoButtonS = labelS.selectAll('.info__button')
                .data([null])
                .join('button')
                .classed('info__button', true);
            renderSVGSeries(infoButtonS, [InfoSVG]);
            renderSimpleTooltip(infoButtonS, { text: info });
        }
        return labelS;
    };
    return RadioLabel;
}());

var CollapseDownRAW = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"#2c3e50\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\r\n    <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/>\r\n    <path d=\"M15 11l-3 3l-3 -3\" />\r\n    <path d=\"M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0 -18z\" />\r\n</svg>\r\n";

function renderFieldset(parentS, data) {
    var classes = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        classes[_i - 2] = arguments[_i];
    }
    var _a = createSelectionClasses(classes), classString = _a.classString, selector = _a.selector;
    var itemS = parentS.selectAll(selector)
        .data(data)
        .join('fieldset')
        .classed(classString, true);
    itemS.each(function (d, i, g) {
        var currentItemS = select(g[i]);
        currentItemS.selectAll('legend')
            .data([null])
            .join('legend')
            .call(function (s) { return fieldsetLegendRender(s, d); });
        if (d.collapsable)
            fieldsetCollapseWrapperRender(currentItemS);
    });
    return mapSelection(itemS, function (currentS) {
        var collapsableS = currentS.selectAll('.collapsable');
        return !collapsableS.empty() ? collapsableS : itemS;
    });
}
function fieldsetLegendRender(legendS, data) {
    legendS.selectAll('.active')
        .data(data.filterable ? [data.filterable] : [])
        .join('label')
        .classed('active', true)
        .each(function (d, i, g) { return renderInputLabel(select(g[i])); });
    legendS.selectAll('.text')
        .data([data.legend])
        .join('span')
        .classed('text', true)
        .text(function (d) { return d; });
    legendS.selectAll(".collapse-icon")
        .data(data.collapsable ? [CollapseDownRAW] : [])
        .join('span')
        .classed('collapse-icon', true)
        .each(function (d, i, g) { return renderSVGSeries(select(g[i]), [CollapseDownRAW]); });
}
function fieldsetCollapseWrapperRender(fieldsetS) {
    fieldsetS.each(function (d, i, g) {
        var collapsableWrapperS = select(g[i]).selectAll('.collapsable-wrapper')
            .data([null])
            .join('div')
            .classed('collapsable-wrapper', true);
        collapsableWrapperS.selectAll('.collapsable').data([d])
            .join('div')
            .classed('collapsable', true);
    });
    fieldsetS.selectAll('legend')
        .classed('collapsable-opener', true)
        .each(function (d, i, g) {
        var collapsableWrapperS = select(g[i].parentElement).select('.collapsable-wrapper');
        var currentlyCollapsed = collapsableWrapperS.classed('collapsed');
        var legendS = select(g[i]);
        collapsableWrapperS.classed('expanded', function () { return !currentlyCollapsed; });
        legendS.selectChildren('.text, .collapse-icon').on('click.toggleCollapsable', function () {
            collapsableWrapperS.classed('expanded', function () { return !collapsableWrapperS.classed('expanded'); });
            collapsableWrapperS.classed('collapsed', function () { return !collapsableWrapperS.classed('collapsed'); });
        });
    });
    return fieldsetS;
}

function renderStyleTypeOptions(selection, renderer) {
    var currentSettings = renderer.windowS.datum().settings.state;
    var onChange = function (e, type) {
        currentSettings[type] = e.target.value;
        renderer.windowS.dispatch('resize');
    };
    var sharedData = {
        defaultVal: currentSettings.downloadStyleType,
        type: windowSettingsKeys.downloadStyleType,
        name: uniqueId(),
        onChange: onChange,
    };
    var data = [{
            legend: 'Style Type',
            labelData: [
                new RadioLabel(__assign(__assign({}, sharedData), { value: 'inline', label: 'Inline CSS (styles in elements)' })),
                new RadioLabel(__assign(__assign({}, sharedData), { value: 'embedded', label: 'Embedded CSS (styles in style block)', info: 'Success of this method is not guaranteed.' })),
            ]
        }];
    return renderFieldset(selection, data, 'item', 'item--radio');
}

var CheckBoxLabel = /** @class */ (function () {
    function CheckBoxLabel(data) {
        this.data = data;
        this.tag = 'checkbox';
    }
    CheckBoxLabel.prototype.render = function (labelS) {
        var data = this.data;
        var inputS = labelS.selectAll('input[type="checkbox"]')
            .data([data])
            .join('input')
            .attr('type', 'checkbox')
            .on('change', function (e) { var _a; (_a = data.onChange) === null || _a === void 0 ? void 0 : _a.call(data, e, data.type); });
        if (data.defaultVal !== undefined)
            inputS.property('checked', data.defaultVal);
        if (data.dataKey)
            inputS.attr('data-key', data.dataKey);
        labelS.selectAll('span')
            .data([data])
            .join('span')
            .text(function (d) { return d.label; });
        return labelS;
    };
    return CheckBoxLabel;
}());

function renderAttributeRemovalOptions(selection, renderer) {
    var currentSettings = renderer.windowS.datum().settings.state;
    var onChange = function (e, type) {
        currentSettings[type] = e.target.checked;
        renderer.windowS.dispatch('resize');
    };
    var data = [{
            legend: 'Removal of Attributes',
            labelData: [new CheckBoxLabel({
                    label: 'Remove Data Key Attributes',
                    type: windowSettingsKeys.downloadRemoveDataKeys,
                    defaultVal: currentSettings.downloadRemoveDataKeys,
                    onChange: onChange,
                }), new CheckBoxLabel({
                    label: 'Remove Class Attributes',
                    type: windowSettingsKeys.downloadRemoveClasses,
                    defaultVal: currentSettings.downloadRemoveClasses,
                    onChange: onChange,
                    activeClasses: currentSettings.downloadStyleType === 'embedded' ? ['disabled'] : [],
                    inactiveClasses: [currentSettings.downloadStyleType !== 'embedded' ? 'disabled' : ''],
                }), new CheckBoxLabel({
                    label: 'Remove Data Style Attributes',
                    type: windowSettingsKeys.downloadRemoveDataStyles,
                    defaultVal: currentSettings.downloadRemoveDataStyles,
                    onChange: onChange,
                    activeClasses: currentSettings.downloadStyleType === 'embedded' ? ['disabled'] : [],
                    inactiveClasses: [currentSettings.downloadStyleType !== 'embedded' ? 'disabled' : ''],
                })
            ]
        }];
    return renderFieldset(selection, data, 'item', 'item--removal-attributes');
}

var NumberLabel = /** @class */ (function () {
    function NumberLabel(data) {
        this.data = data;
    }
    NumberLabel.prototype.render = function (labelS) {
        var _this = this;
        var _a = this.data, value = _a.value, onChange = _a.onChange, onInput = _a.onInput, label = _a.label, min = _a.min, max = _a.max, step = _a.step;
        labelS.selectAll('input[type="number"]')
            .data([null])
            .join('input')
            .attr('type', 'number')
            .attr('value', value)
            .attr('min', min !== null && min !== void 0 ? min : null)
            .attr('max', max !== null && max !== void 0 ? max : null)
            .attr('step', step !== null && step !== void 0 ? step : null)
            .on('change', function (e) { return onChange === null || onChange === void 0 ? void 0 : onChange(e, _this); })
            .on('input', function (e) { return onInput === null || onInput === void 0 ? void 0 : onInput(e, _this); });
        labelS.selectAll('span')
            .data([null])
            .join('span')
            .text(label);
        return labelS;
    };
    NumberLabel.prototype.valueAsInt = function (e) {
        var target = e.target;
        return parseInt(target.value);
    };
    NumberLabel.prototype.valueAsFloat = function (e) {
        var target = e.target;
        return parseFloat(target.value);
    };
    NumberLabel.prototype.inMinMaxRange = function (value) {
        return (this.data.min && value >= this.data.min) || (this.data.max && value <= this.data.max);
    };
    return NumberLabel;
}());

function renderDecimalNumberOptions(selection, renderer) {
    var currentSettings = renderer.windowS.datum().settings.state;
    var onChangeActive = function (e, type) {
        currentSettings[type] = e.target.checked;
        renderer.windowS.dispatch('resize');
    };
    var onInputNumber = function (e, d) {
        var value = d.valueAsInt(e);
        if (isNaN(value))
            e.target.value = currentSettings[d.data.type];
    };
    var onChangeNumber = function (e, d) {
        var value = d.valueAsInt(e);
        if (isNaN(value) || !d.inMinMaxRange(value)) {
            e.target.value = currentSettings[d.data.type];
        }
        currentSettings[d.data.type] = e.target.value;
    };
    var data = [{
            legend: 'Number of Decimal Points',
            labelData: [new CheckBoxLabel({
                    label: 'Limit Decimal Points',
                    type: windowSettingsKeys.downloadAttributeMaxDecimalsActive,
                    defaultVal: currentSettings.downloadAttributeMaxDecimalsActive,
                    onChange: onChangeActive,
                }), new NumberLabel({
                    label: '',
                    type: windowSettingsKeys.downloadAttributeMaxDecimals,
                    value: currentSettings.downloadAttributeMaxDecimals,
                    min: 1, max: 20, step: 1, size: 2,
                    onInput: onInputNumber,
                    onChange: onChangeNumber,
                    activeClasses: !currentSettings.downloadAttributeMaxDecimalsActive ? ['disabled'] : [],
                    inactiveClasses: currentSettings.downloadAttributeMaxDecimalsActive ? ['disabled'] : [],
                })
            ]
        }];
    return renderFieldset(selection, data, 'item', 'item--decimal-options');
}

function renderPrettifyOptions(selection, renderer) {
    var currentSettings = renderer.windowS.datum().settings.state;
    var onChange = function (e, type) {
        currentSettings[type] = e.target.checked;
        renderer.windowS.dispatch('resize');
    };
    var onInputNumber = function (e, d) {
        var value = d.valueAsInt(e);
        if (isNaN(value))
            e.target.value = currentSettings[d.data.type];
    };
    var onChangeNumber = function (e, d) {
        var value = d.valueAsInt(e);
        if (isNaN(value) || !d.inMinMaxRange(value)) {
            e.target.value = currentSettings[d.data.type];
        }
        currentSettings[d.data.type] = e.target.value;
    };
    var data = [{
            legend: 'Prettify SVG',
            labelData: [new CheckBoxLabel({
                    label: 'Prettify SVG',
                    type: windowSettingsKeys.downloadPrettifyActive,
                    defaultVal: currentSettings.downloadPrettifyActive,
                    onChange: onChange,
                }), new NumberLabel({
                    label: 'Indentation spaces',
                    type: windowSettingsKeys.downloadPrettifyIndentionSpaces,
                    value: currentSettings.downloadPrettifyIndentionSpaces,
                    min: 1, max: 20, step: 1, size: 2,
                    onInput: onInputNumber,
                    onChange: onChangeNumber,
                    activeClasses: !currentSettings.downloadPrettifyActive ? ['disabled'] : [],
                    inactiveClasses: currentSettings.downloadPrettifyActive ? ['disabled'] : [],
                })]
        }];
    return renderFieldset(selection, data, 'item', 'item--prettify-svg');
}

function renderMarginOptions(selection, renderer) {
    var currentSettings = renderer.windowS.datum().settings;
    var options = [{
            settingKey: windowSettingsKeys.downloadMarginLeft,
            abbreviation: 'left'
        }, {
            settingKey: windowSettingsKeys.downloadMarginTop,
            abbreviation: 'top'
        }, {
            settingKey: windowSettingsKeys.downloadMarginRight,
            abbreviation: 'right'
        }, {
            settingKey: windowSettingsKeys.downloadMarginBottom,
            abbreviation: 'bottom'
        }
    ];
    var onInputNumber = function (e, d) {
        var value = d.valueAsInt(e);
        if (isNaN(value))
            e.target.value = currentSettings.state[d.data.type];
    };
    var onChangeNumber = function (e, d) {
        var value = d.valueAsInt(e);
        if (isNaN(value) || !d.inMinMaxRange(value)) {
            e.target.value = currentSettings.state[d.data.type];
        }
        currentSettings.state[d.data.type] = e.target.value;
    };
    var data = [{
            legend: 'Margin',
            labelData: options.map(function (option) {
                return new NumberLabel({
                    label: "Margin-".concat(option.abbreviation),
                    type: windowSettingsKeys[option.settingKey],
                    value: currentSettings.get(option.settingKey),
                    min: 0, max: 10000, step: 1, size: 5,
                    onInput: onInputNumber,
                    onChange: onChangeNumber,
                });
            })
        }];
    return renderFieldset(selection, data, 'item', 'item--margin-options');
}

function renderDownloadTool(toolbarS, renderer) {
    var contentS = toolbarS.selectAll('.toolbar__content');
    var downloadToolS = renderTool$1(contentS, 'tool--download');
    var dialogContainerS = toolbarS.selectAll('.toolbar__dialog-container');
    var dialogOpenerS = renderButton(downloadToolS, 'toolbar__btn');
    renderSVGSeries(dialogOpenerS, [downloadSVGRaw]);
    renderSimpleTooltip(dialogOpenerS, { text: 'Download' });
    var dialogS = renderDialog(dialogContainerS, 'dialog--center', 'dialog--download');
    bindOpenerToDialog({ dialogOpenerS: dialogOpenerS, dialogS: dialogS, transitionMS: 300, type: 'modal' });
    renderMarginOptions(dialogS, renderer).call(renderInputLabels);
    renderPrettifyOptions(dialogS, renderer).call(renderInputLabels);
    renderStyleTypeOptions(dialogS, renderer).call(renderInputLabels);
    renderAttributeRemovalOptions(dialogS, renderer).call(renderInputLabels);
    // renderElementRemovalOptions(dialogS, renderer).call(renderInputLabels)
    renderDecimalNumberOptions(dialogS, renderer).call(renderInputLabels);
    downloadButtonRender(dialogS, renderer);
    cancelButtonRender(dialogS);
}
function downloadButtonRender(selection, renderer) {
    var buttonS = selection
        .selectAll('.button--icon.button--download')
        .data([null])
        .join('button')
        .classed('button--icon button--download', true)
        .on('click', function () {
        var _a;
        select(this.closest('.window-rv'))
            .selectAll('.layouter > svg.chart')
            .call(function (s) { return downloadChart(s, 'chart.svg', renderer); });
        (_a = select(this.closest('dialog')).datum()) === null || _a === void 0 ? void 0 : _a.triggerExit();
    });
    buttonS.selectAll('span')
        .data([null])
        .join("span")
        .text('Download SVG');
    renderSVGSeries(buttonS, [downloadSVGRaw]);
}
function cancelButtonRender(selection) {
    var buttonS = selection
        .selectAll('.button--icon.button--cancel')
        .data([null])
        .join('button')
        .classed('button--icon button--cancel', true)
        .on('click.cancel', function () {
        var _a;
        (_a = select(this.closest('dialog')).datum()) === null || _a === void 0 ? void 0 : _a.triggerExit();
    });
    buttonS.selectAll('span')
        .data([null])
        .join("span")
        .text('Cancel');
    renderSVGSeries(buttonS, [cancelSVGRaw]);
}

function renderElementRemovalOptions(selection, renderer) {
    var currentSettings = renderer.windowS.datum().settings.state;
    var onChange = function (e, type) {
        currentSettings[type] = e.target.checked;
        renderer.windowS.dispatch('resize');
    };
    var data = [{
            legend: 'Removal of Elements',
            labelData: [new CheckBoxLabel({
                    label: 'Remove Interactive Elements',
                    type: windowSettingsKeys.downloadRemoveBgElements,
                    defaultVal: currentSettings.downloadRemoveBgElements,
                    onChange: onChange,
                })]
        }];
    return renderFieldset(selection, data, 'item', 'item--removal-elements');
}

var filterSVGRaw = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"#2c3e50\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\r\n    <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/>\r\n    <path d=\"M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z\" />\r\n</svg>\r\n";

var RangeLabel = /** @class */ (function () {
    function RangeLabel(data) {
        this.data = data;
    }
    RangeLabel.prototype.render = function (labelS) {
        var _this = this;
        var _a = this.data, value = _a.value, onChange = _a.onChange, onInput = _a.onInput, onDrag = _a.onDrag, label = _a.label, min = _a.min, max = _a.max, step = _a.step;
        labelS.selectAll('input[type="range"]')
            .data([null])
            .join('input')
            .attr('type', 'range')
            .attr('min', min !== null && min !== void 0 ? min : null)
            .attr('max', max !== null && max !== void 0 ? max : null)
            .attr('step', step !== null && step !== void 0 ? step : null)
            .attr('value', value)
            .on('change', function (e) { return onChange === null || onChange === void 0 ? void 0 : onChange(e, _this); })
            .on('input', function (e) { return onInput === null || onInput === void 0 ? void 0 : onInput(e, _this); })
            .on('drag', function (e) { return onDrag === null || onDrag === void 0 ? void 0 : onDrag(e, _this); });
        labelS.selectAll('span')
            .data([null])
            .join('span')
            .text(label);
        return labelS;
    };
    return RangeLabel;
}());

function renderFilterTool(toolbarS, args) {
    var seriesCollection = args.getSeries();
    var axes = args.getAxes();
    var contentS = toolbarS.selectAll('.toolbar__content');
    var dialogContainerS = toolbarS.selectAll('.toolbar__dialog-container');
    var filterToolS = renderTool$1(contentS, 'tool--filter');
    var dialogOpenerS = renderButton(filterToolS, 'toolbar__btn');
    renderSVGSeries(dialogOpenerS, [filterSVGRaw]);
    renderSimpleTooltip(dialogOpenerS, { text: 'Filter' });
    var dialogS = renderDialog(dialogContainerS, 'dialog--side', 'dialog--filter');
    bindOpenerToDialog({ dialogOpenerS: dialogOpenerS, dialogS: dialogS, transitionMS: 300 });
    seriesCollection.forEach(function (series) {
        if (seriesCollection.length > 1)
            renderSeriesControl(dialogS, series);
        renderCategoryControls(dialogS, series);
    });
    var axesOrdered = orderScaledValuesSpatial(axes.map(function (axis) { return axis.scaledValues; }), axes);
    __spreadArray(__spreadArray([], __read(axesOrdered.linear), false), __read(axesOrdered.date), false).forEach(function (axisOrdered) { return renderAxisLinearControls(dialogS, axisOrdered.wrapper, axisOrdered.values); });
    axesOrdered.categorical.forEach(function (axis) { return renderAxisControls(dialogS, axis.wrapper); });
    return filterToolS;
}
function renderSeriesControl(menuToolsItemsS, series) {
    var _this = this;
    var renderer = series.renderer;
    var _a = series.originalData, key = _a.key, keysActive = _a.keysActive;
    var onClick = function (e) {
        if (renderer.exitEnterActive()) {
            e.preventDefault();
            e.stopPropagation();
        }
    };
    var data = [{
            legend: 'Main Series',
            collapsable: true,
            labelData: [new CheckBoxLabel({
                    label: 'Series', type: 'series',
                    dataKey: key, defaultVal: keysActive[key] ? true : false,
                    onClick: onClick,
                    onChange: function () {
                        renderer.filterDispatch.call('filter', { dataKey: key }, _this);
                    }
                })
            ]
        }];
    var fieldSetS = renderFieldset(menuToolsItemsS, data, 'item', 'item--checkbox-series', 'filter-series');
    renderInputLabels(fieldSetS);
}
//TODO: Refactor Double Input Range in own file
function renderAxisLinearControls(menuToolsItemsS, axis, values) {
    var renderer = axis.renderer;
    var title = getCurrentResponsiveValue(axis.title, { chart: renderer.chartS });
    var domain = values.scale.domain().map(function (d) { return d.valueOf(); });
    var _a = __read([values.filteredRanges[0][0].valueOf(), values.filteredRanges[0][1].valueOf()], 2), minFilter = _a[0], maxFilter = _a[1];
    var _b = __read([Math.min.apply(Math, __spreadArray([], __read(domain), false)), Math.max.apply(Math, __spreadArray([], __read(domain), false))], 2), minDomain = _b[0], maxDomain = _b[1];
    var onNumberInput = function (e, labelD) {
        var target = e.target;
        var doubleRangeSliderS = select(target === null || target === void 0 ? void 0 : target.closest('.double-range-slider'));
        var inputMin = doubleRangeSliderS.selectAll('.min-range input');
        var inputMax = doubleRangeSliderS.selectAll('.max-range input');
        var type = labelD.data.type;
        var index = type.charAt(type.length - 1);
        var valueString = e.target.value;
        var valueNumber = parseFloat(valueString);
        if (isNaN(valueNumber))
            return;
        var dragMinOverMax = (type === "$range-0-0" && valueNumber >= maxFilter);
        var dragMaxBelowMin = (type === "$range-0-1" && valueNumber <= minFilter);
        var valueResult = dragMinOverMax ? maxFilter :
            dragMaxBelowMin ? minFilter : valueNumber;
        if (values.tag === 'linear')
            values.filteredRanges[0][index] = valueResult;
        else
            values.filteredRanges[0][index] = new Date(Math.floor(valueResult));
        if (dragMinOverMax || dragMaxBelowMin) {
            target.value = valueResult.toString();
        }
        inputMin.classed('dominant', labelD.data.type === "$range-0-0");
        inputMax.classed('dominant', labelD.data.type === "$range-0-1");
        renderer.windowS.dispatch('resize');
    };
    var data = [{
            legend: title,
            collapsable: true,
            filterable: 'key' in axis ? createKeyedAxisCheckboxLabel(axis) : undefined,
            labelData: values.filteredRanges.map(function (range) {
                var _a, _b;
                var axisFormatFunction = (_b = (_a = axis.d3Axis) === null || _a === void 0 ? void 0 : _a.tickFormat()) !== null && _b !== void 0 ? _b : values.scale.tickFormat();
                return [
                    new RangeLabel({
                        label: 'Min: ' + axisFormatFunction(range[0], 0),
                        type: "$range-0-0",
                        value: values.filteredRanges[0][0].valueOf().toString(),
                        min: minDomain, max: maxDomain,
                        step: 1,
                        activeClasses: ['min-range'],
                        onInput: onNumberInput,
                    }),
                    new RangeLabel({
                        label: 'Max: ' + axisFormatFunction(range[1], 0),
                        type: "$range-0-1",
                        value: values.filteredRanges[0][1].valueOf().toString(),
                        min: minDomain, max: maxDomain,
                        activeClasses: ['max-range'],
                        step: 1,
                        onInput: onNumberInput,
                    })
                ];
            }).flat()
        }];
    var fieldSetS = renderFieldset(menuToolsItemsS, data, 'item', 'item--double-range-filter', "filter-axis-".concat(values.parentKey));
    var doubleRangeSliderS = fieldSetS.selectAll('.double-range-slider')
        .data(function (d) { return [d]; }).join('div')
        .classed('double-range-slider', true)
        .style('--range-start', (Math.abs(minDomain - minFilter) / Math.abs(maxDomain - minDomain)) + '')
        .style('--range-end', ((maxFilter - minDomain) / (maxDomain - minDomain)) + '');
    doubleRangeSliderS.selectAll('.double-range-slider__track')
        .data([null]).join('div')
        .classed('double-range-slider__track', true);
    doubleRangeSliderS.selectAll('.double-range-slider__range')
        .data([null]).join('div')
        .classed('double-range-slider__range', true);
    renderInputLabels(doubleRangeSliderS);
    doubleRangeSliderS.selectAll('input').classed('double-range-slider__input', true);
}
function renderCategoryControls(menuToolsItemsS, series) {
    var _this = this;
    var renderer = series.renderer, originalData = series.originalData;
    var categories = originalData.categories;
    if (!categories)
        return;
    var categoriesTitle = categories.categories.title;
    var categoryText = getCurrentResponsiveValue(categoriesTitle, { chart: renderer.chartS });
    var categoryArray = categories.categories.categoryArray;
    var onClick = function (e) {
        if (renderer.exitEnterActive()) {
            e.preventDefault();
            e.stopPropagation();
        }
    };
    var data = [{
            legend: categoryText,
            collapsable: true,
            labelData: categoryArray.map(function (option) {
                var dataKey = mergeKeys([categories.parentKey, option.key]);
                return new CheckBoxLabel({
                    label: option.value, type: 'category',
                    dataKey: dataKey,
                    defaultVal: categories.isKeyActiveByKey(dataKey),
                    onClick: onClick,
                    onChange: function () {
                        if (renderer.exitEnterActive())
                            return;
                        renderer.filterDispatch.call('filter', { dataKey: dataKey }, _this);
                    }
                });
            })
        }];
    var fieldSetS = renderFieldset(menuToolsItemsS, data, 'item', 'item--checkbox-series', 'filter-categories');
    renderInputLabels(fieldSetS);
}
function renderAxisControls(menuToolsItemsS, axis) {
    var _this = this;
    var renderer = axis.renderer;
    var axisScaledValues = axis.scaledValues;
    var title = getCurrentResponsiveValue(axis.title, { chart: renderer.chartS });
    var _a = getAxisCategoryProps(axis), keys = _a.keys, options = _a.options;
    var onClick = function (e) {
        if (renderer.exitEnterActive()) {
            e.preventDefault();
            e.stopPropagation();
        }
    };
    var labelData = options.map(function (option, index) {
        return new CheckBoxLabel({
            label: option.value, type: 'category',
            dataKey: keys[index], defaultVal: axis.scaledValues.isKeyActiveByKey(keys[index]),
            onClick: onClick,
            onChange: function () {
                if (renderer.exitEnterActive())
                    return;
                renderer.filterDispatch.call('filter', { dataKey: keys[index] }, _this);
            }
        });
    });
    if (keys.length === 0 && !('key' in axis))
        return;
    var data = [{
            legend: getCurrentResponsiveValue("".concat(title !== null && title !== void 0 ? title : axisScaledValues.parentKey.toUpperCase()), { chart: renderer.chartS }),
            collapsable: (!('key' in axis) || keys.length > 1),
            filterable: 'key' in axis ? createKeyedAxisCheckboxLabel(axis) : undefined,
            labelData: labelData
        }];
    var fieldSetS = renderFieldset(menuToolsItemsS, data, 'item', 'item--checkbox-series', "filter-axis-".concat(axisScaledValues.parentKey));
    renderInputLabels(fieldSetS);
}
function getAxisCategoryProps(axis) {
    var axisScaledValues = axis.scaledValues;
    return {
        keys: axisScaledValues instanceof ScaledValuesCategorical ?
            axisScaledValues.categories.categoryArray.map(function (c) { return "".concat(axisScaledValues.parentKey, "-").concat(c.key); }) : [],
        options: axisScaledValues instanceof ScaledValuesCategorical ?
            axisScaledValues.categories.categoryArray : []
    };
}
function createKeyedAxisCheckboxLabel(axis) {
    var _this = this;
    var defaultVal = axis.keysActive[axis.key];
    var axisNecessary = (axis.series.renderData.axes.length <= 2 && defaultVal);
    // const axes = axis.series.originalData.axes //TODO: delete this if works without
    // const axisNecessar = axes.map((_, index) => index)
    //   .filter(index => axes[index].isKeyActiveByKey(axes[index].key)).length <= 2 && defaultVal
    return new CheckBoxLabel({
        activeClasses: axisNecessary ? ['disabled'] : undefined,
        inactiveClasses: !axisNecessary ? ['disabled'] : undefined,
        label: '', type: 'category',
        dataKey: axis.key,
        defaultVal: defaultVal,
        onChange: function () {
            axis.series.renderer.filterDispatch.call('filter', { dataKey: axis.key }, _this);
        }
    });
}

var crossSVGRaw = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"#2c3e50\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\r\n    <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/>\r\n    <path d=\"M18 9l3 3l-3 3\" />\r\n    <path d=\"M15 12h6\" />\r\n    <path d=\"M6 9l-3 3l3 3\" />\r\n    <path d=\"M3 12h6\" />\r\n    <path d=\"M9 18l3 3l3 -3\" />\r\n    <path d=\"M12 15v6\" />\r\n    <path d=\"M15 6l-3 -3l-3 3\" />\r\n    <path d=\"M12 3v6\" />\r\n</svg>\r\n";

function clickSAddEnterExitAttributes(clickS, refS, delayMs) {
    var refE = refS.node();
    var timeout;
    var triggerTransition = function () {
        var currentTransition = refE.getAttribute('transition');
        if (currentTransition === 'enter')
            exit();
        else
            enter();
    };
    clickS.on('click.transition', triggerTransition);
    function enter() {
        clearTimeout(timeout);
        refE.setAttribute('transition', 'enter');
        timeout = setTimeout(function () {
            refE.setAttribute('transition-state', 'enter-done');
        }, delayMs);
    }
    function exit() {
        clearTimeout(timeout);
        refE.setAttribute('transition', 'exit');
        timeout = setTimeout(function () {
            refE.setAttribute('transition-state', 'exit-done');
        }, delayMs);
    }
}

function renderCrossTool(toolbarS, seriesCollection) {
    if (seriesCollection.length <= 0)
        return;
    var renderer = seriesCollection[0].renderer;
    var contentS = toolbarS.selectAll('.toolbar__content');
    var crossToolS = renderTool$1(contentS, 'tool--cross');
    var crossActivatorS = renderButton(crossToolS, 'toolbar__btn');
    renderSVGSeries(crossActivatorS, [crossSVGRaw]);
    renderSimpleTooltip(crossActivatorS, { text: 'Inspect Chart' });
    clickSAddEnterExitAttributes(crossActivatorS, crossActivatorS, 600);
    crossActivatorS.on('click.settings', function () {
        var settings = renderer.windowS.datum().settings.state;
        settings.movableCrossActive = !settings.movableCrossActive;
        renderer.windowS.dispatch('resize');
    });
    seriesCollection.forEach(function (series) { return renderMovableCrossTooltip(series); });
}

var ChevronsRight = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\"\r\n     stroke-linejoin=\"round\" width=\"24\" height=\"24\" stroke-width=\"2\">\r\n    <path d=\"M7 7l5 5l-5 5\"></path>\r\n    <path d=\"M13 7l5 5l-5 5\"></path>\r\n</svg>\r\n";

var chartSVGRaw = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"#2c3e50\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\r\n    <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/>\r\n    <path d=\"M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z\" />\r\n    <path d=\"M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0\" />\r\n</svg>\r\n";

function renderChartTool(toolbarS, seriesCollection) {
    if (seriesCollection.filter(function (series) { return series.renderTool; }).length <= 0)
        return;
    var contentS = toolbarS.selectAll('.toolbar__content');
    var chartToolS = renderTool$1(contentS, 'tool--chart');
    var dialogContainerS = toolbarS.selectAll('.toolbar__dialog-container');
    var dialogOpenerS = renderButton(chartToolS, 'toolbar__btn');
    renderSVGSeries(dialogOpenerS, [chartSVGRaw]);
    renderSimpleTooltip(dialogOpenerS, { text: 'Chart Settings' });
    var dialogS = renderDialog(dialogContainerS, 'dialog--center', 'dialog--chart');
    bindOpenerToDialog({ dialogOpenerS: dialogOpenerS, dialogS: dialogS, transitionMS: 300, type: 'modal' });
    dialogS.on('close', function (e) {
        var _a, _b, _c;
        e.preventDefault();
        (_a = seriesCollection[0]) === null || _a === void 0 ? void 0 : _a.renderer.windowS.datum().settings.reset();
        (_b = select(this.closest('dialog')).datum()) === null || _b === void 0 ? void 0 : _b.triggerExit();
        (_c = seriesCollection[0]) === null || _c === void 0 ? void 0 : _c.renderer.windowS.dispatch('resize');
    });
    seriesCollection.forEach(function (series) {
        var _a;
        (_a = series.renderTool) === null || _a === void 0 ? void 0 : _a.call(series, toolbarS);
    });
}

function renderToolbar(windowS, args) {
    var toolbarS = windowS
        .selectAll('.toolbar')
        .data([null])
        .join('div')
        .classed('toolbar', true);
    var toolbarBarS = toolbarS
        .selectAll('.toolbar__bar')
        .data([null])
        .join('div')
        .classed('toolbar__bar', true);
    toolbarBarS
        .selectAll('.toolbar__content-wrapper')
        .data([null])
        .join('div')
        .classed('toolbar__content-wrapper', true)
        .selectAll('.toolbar__content')
        .data([null])
        .join('div')
        .classed('toolbar__content', true);
    var toolbarOpenerS = toolbarBarS
        .selectAll('.toolbar__opener')
        .data([null])
        .join('div')
        .classed('toolbar__opener', true);
    clickSAddEnterExitAttributes(toolbarOpenerS, toolbarS, 600);
    renderSVGSeries(toolbarOpenerS, [ChevronsRight]);
    toolbarS
        .selectAll('.toolbar__dialog-container')
        .data([null])
        .join('div')
        .classed('toolbar__dialog-container', true);
    renderFilterTool(toolbarS, args);
    renderDownloadTool(toolbarS, args.renderer);
    renderCrossTool(toolbarS, args.getSeries());
    renderChartTool(toolbarS, args.getSeries());
    var dialogS = toolbarS.selectAll('dialog');
    dialogS.each(function (d, i) {
        var otherElements = dialogS.filter(function (d, j) { return i !== j; });
        d.onOpenerClick = function () {
            otherElements.each(function (d) { return d.triggerExit(); });
        };
    });
    toolbarOpenerS.on('click.close', function () {
        dialogS.each(function (d) { return d.triggerExit(); });
    });
}

function addSeriesHighlighting(seriesS) {
    return seriesS.on('pointerover.seriespointhighlight pointerout.seriespointhighlight', function (e) {
        var target = e.target;
        var key = select(target).attr('data-key');
        var equalDataS = select(target.closest('.chart')).selectAll("[data-key='".concat(key, "']"));
        var toggleVal = e.type.endsWith('over');
        equalDataS.classed('highlight', toggleVal);
    });
}

function renderLabelSeries(parentS, series) {
    var elements = series.elements, classes = series.classes, orientation = series.orientation;
    var _a = createSelectionClasses(classes), selector = _a.selector, classString = _a.classString;
    var labels = elements.flatMap(function (element) { return element.getLabel(orientation); });
    return parentS.selectAll(selector)
        .data([null])
        .join('g')
        .classed(classString, true)
        .attr('data-ignore-layout-children', true)
        .call(function (s) { return renderLabels(s, labels); });
}
function renderLabels(seriesS, labels) {
    return seriesS.selectAll('text')
        .data(labels, function (d) { return d.marker.key.rawKey; })
        .call(function (s) { return joinLabelSeries(seriesS, s); });
}
function joinLabelSeries(seriesS, joinS) {
    var tDurationString = cssVarFromSelection(seriesS, '--transition-time-label-enter-ms');
    var tDuration = tDurationString ? parseInt(tDurationString) : 250;
    joinS
        .join(function (enter) {
        return enter
            .append('text')
            .classed('label', true)
            .each(function (d, i, g) { return positionToTransformAttr(select(g[i]), d); })
            .call(function (s) { return addCSSTransitionEnterClass(s, tDuration); })
            .call(function (s) { return seriesS.dispatch('enter', { detail: { selection: s } }); });
    }, function (update) { return update.call(function () {
        update.call(cancelExitClassOnUpdate);
    }); }, function (exit) {
        return exit.call(function (s) { return addCSSTransitionExitClass(s, tDuration)
            .on('end', function () {
            if (!select(this).classed('exit-done'))
                return;
            exit.remove().call(function (s) { return seriesS.dispatch('exit', { detail: { selection: s } }); });
        }); });
    })
        .each(function (d, i, g) {
        return select(g[i])
            .transition('position')
            .duration(250)
            .ease(cubicOut)
            .call(function (t) { return positionToTransformAttr(t, d); });
    })
        .text(function (d) { return d.text; })
        .attr('data-key', function (d) { return d.marker.key.rawKey; })
        .attr('data-polarity', function (d) { return d.marker.polarity ? d.marker.polarity : null; })
        .call(function (s) { return seriesS.dispatch('update', { detail: { selection: s } }); });
}

var DataSeriesChartMixin = /** @class */ (function (_super) {
    __extends(DataSeriesChartMixin, _super);
    function DataSeriesChartMixin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataSeriesChartMixin.prototype.addFilterListener = function () {
        var renderer = this;
        renderer.windowS;
        this.filterDispatch.on('filter', function () {
            var currentKey = this.dataKey;
            var chartD = renderer.windowS.datum();
            chartD.getAxes().forEach(function (axis) {
                if ('key' in axis) {
                    axis.setKeyActiveIfDefined(currentKey, !axis.isKeyActiveByKey(currentKey));
                }
                axis.scaledValues.setKeyActiveIfDefined(currentKey, !axis.scaledValues.isKeyActiveByKey(currentKey));
            });
            chartD.getSeries().forEach(function (series) {
                var _a = series.originalData, keysActive = _a.keysActive, categories = _a.categories;
                if (keysActive[currentKey] !== undefined) {
                    keysActive[currentKey] = !keysActive[currentKey];
                }
                categories === null || categories === void 0 ? void 0 : categories.setKeyActiveIfDefined(currentKey, !(categories === null || categories === void 0 ? void 0 : categories.keysActive[currentKey]));
            });
            renderer.windowS.dispatch('resize');
        });
    };
    DataSeriesChartMixin.prototype.renderSeriesChartComponents = function () {
        var _this = this;
        var chartSelection = this.chartS;
        var chartD = chartSelection.datum();
        chartD.getSeries().forEach(function (series) { return series.responsiveState.update(); });
        this.addFilterListener();
        renderLegend(chartSelection, chartD.legend).call(addLegendHoverHighlighting);
        chartD.getSeries().forEach(function (series) { var _a; return (_a = series.renderLegendInfo) === null || _a === void 0 ? void 0 : _a.call(series, _this.legendS); });
        renderToolbar(this.windowS, chartSelection.datum());
    };
    DataSeriesChartMixin.prototype.addSeriesLabels = function (seriesS) {
        var seriesElementsS = seriesS.selectAll('.element:not(.exiting):not(.exit-done)');
        renderLabelSeries(this.drawAreaS, {
            elements: seriesElementsS.data(),
            classes: ['series-label'],
            orientation: seriesS.datum().responsiveState.currentlyFlipped ? 'horizontal' : 'vertical'
        });
    };
    DataSeriesChartMixin.prototype.addAllSeriesFeatures = function (seriesS) {
        var _this = this;
        seriesS.call(addSeriesHighlighting)
            .call(renderDataSeriesTooltip)
            .call(function (s) { return _this.addSeriesLabels(s); });
    };
    return DataSeriesChartMixin;
}(Chart));

function validateDataSeriesArgs(args, series) {
    var key = args.key;
    var keysActive = {};
    keysActive[key] = true;
    return {
        //TODO: pass correct parameters here
        categories: args.categories ? new ScaledValuesCategorical(__assign(__assign({}, args.categories), { parentKey: key })) : undefined,
        color: args.color ? validateSequentialColor(__assign(__assign({}, args.color), { renderer: args.renderer, series: series })) : undefined,
        key: args.key,
        keysActive: keysActive,
        getMergedKeys: function () {
            var _this = this;
            if (this.categories) {
                return this.categories.categories.categoryArray.map(function (c) {
                    return mergeKeys([_this.key, c.key]);
                });
            }
            return [];
        },
        getCombinedKey: function (i) {
            throw new Error('Method not implemented.');
        }
    };
}

var ResponsiveState = /** @class */ (function () {
    function ResponsiveState(args) {
        var _a, _b, _c;
        this._series = args.series;
        this._flipped = args.flipped ? validateResponsiveValue(args.flipped) : false;
        this._currentlyFlipped = (_a = args.currentlyFlipped) !== null && _a !== void 0 ? _a : false;
        this._previouslyFlipped = this._currentlyFlipped;
        this._drawAreaWidth = (_b = args.drawAreaWidth) !== null && _b !== void 0 ? _b : 0;
        this._drawAreaHeight = (_c = args.drawAreaHeight) !== null && _c !== void 0 ? _c : 0;
    }
    Object.defineProperty(ResponsiveState.prototype, "flipped", {
        get: function () {
            return this._flipped;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ResponsiveState.prototype, "currentlyFlipped", {
        get: function () {
            return this._currentlyFlipped;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ResponsiveState.prototype, "drawAreaWidth", {
        get: function () {
            return this._drawAreaWidth;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ResponsiveState.prototype, "drawAreaHeight", {
        get: function () {
            return this._drawAreaHeight;
        },
        enumerable: false,
        configurable: true
    });
    ResponsiveState.prototype.drawAreaS = function () {
        return this._series.renderer.windowS.selectAll('.draw-area');
    };
    ResponsiveState.prototype.drawAreaRange = function () {
        return {
            horizontal: [0, this._drawAreaWidth],
            horizontalInverted: [this._drawAreaWidth, 0],
            vertical: [this._drawAreaHeight, 0],
            verticalInverted: [0, this._drawAreaHeight]
        };
    };
    ResponsiveState.prototype.update = function () {
        var drawArea = this.drawAreaS();
        var _a = rectFromString(drawArea.attr('bounds') || '0, 0, 600, 400'), width = _a.width, height = _a.height;
        this._drawAreaWidth = width;
        this._drawAreaHeight = height;
        this._previouslyFlipped = this._currentlyFlipped;
        this._currentlyFlipped = getCurrentResponsiveValue(this._flipped, { chart: this._series.renderer.chartS });
    };
    return ResponsiveState;
}());

var placeholder = 'empty-series';
var EmptySeries = /** @class */ (function () {
    function EmptySeries(args) {
        this.originalData = validateDataSeriesArgs(args, this);
        this.renderData = this.originalData;
        this.renderer = args.renderer;
        this.responsiveState = new ResponsiveState({
            series: this,
            flipped: ('flipped' in args) ? args.flipped : false
        });
    }
    EmptySeries.prototype.cloneToRenderData = function () {
        return this;
    };
    EmptySeries.prototype.applyFilter = function () {
        return this;
    };
    EmptySeries.prototype.applyZoom = function () {
        return this;
    };
    EmptySeries.prototype.applyInversion = function () {
        return this;
    };
    EmptySeries.prototype.getScaledValuesAtScreenPosition = function () {
        return {
            horizontal: placeholder,
            horizontalName: placeholder,
            horizontalNearestRealValue: placeholder,
            horizontalScreenValue: placeholder,
            vertical: placeholder,
            verticalName: placeholder,
            verticalNearestRealValue: placeholder,
            verticalScreenValue: placeholder
        };
    };
    return EmptySeries;
}());

function validateCartesianAxis(args) {
    var _a;
    var axis = __assign(__assign({}, validateBaseAxis(args)), { inverted: validateResponsiveValue((_a = args.inverted) !== null && _a !== void 0 ? _a : false), originalAxis: this, series: args.series, gridLineFactor: (typeof args.gridLineFactor === 'number' && args.gridLineFactor > 0.01) ?
            args.gridLineFactor : undefined });
    axis.originalAxis = axis;
    return axis;
}

function validateCartesianChart(args) {
    var renderer = args.renderer, series = args.series, x = args.x, y = args.y;
    return __assign({ series: series, x: validateCartesianAxis(__assign(__assign({}, (x !== null && x !== void 0 ? x : {})), { renderer: renderer, scaledValues: series.originalData.x, series: series })), y: validateCartesianAxis(__assign(__assign({}, (y !== null && y !== void 0 ? y : {})), { renderer: renderer, scaledValues: series.originalData.y, series: series })), getAxes: function () {
            return __spreadArray([this.x, this.y], __read((this.series.originalData.color ? [this.series.originalData.color.axis] : [])), false);
        }, getSeries: function () { return [this.series]; }, getMainSeries: function () { return this.series; }, legend: validateLegend(__assign(__assign({}, args.legend), { renderer: renderer, series: series })) }, validateChart(args));
}

function renderCartesianAxes(chartS) {
    var _a = chartS.datum(); _a.renderer; var series = _a.series, data = __rest(_a, ["renderer", "series"]);
    var flipped = series.responsiveState.currentlyFlipped;
    var _b = __read(flipped ? ['y', 'x'] : ['x', 'y'], 2), horizontalAxisType = _b[0], verticalAxisType = _b[1];
    var verticalAxisD = __assign(__assign({}, data[verticalAxisType]), { scaledValues: series.renderData[verticalAxisType] });
    var horizontalAxisD = __assign(__assign({}, data[horizontalAxisType]), { scaledValues: series.renderData[horizontalAxisType] });
    var paddingWrapperS = chartS.selectAll('.padding-wrapper');
    //TODO: clean this stacked bar chart mess up
    var aggScaledValues = ('aggScaledValues' in series && series.aggScaledValues instanceof ScaledValuesCumulativeSummation) ?
        series.aggScaledValues.sumCached() : undefined;
    var horizontalAxisDAgg = (aggScaledValues && horizontalAxisD.scaledValues instanceof ScaledValuesNumeric) ? __assign(__assign({}, horizontalAxisD), { scaledValues: aggScaledValues }) : horizontalAxisD;
    horizontalAxisDAgg.scaledValues.scale.range(horizontalAxisD.scaledValues.scale.range());
    var verticalAxisDAgg = (aggScaledValues && verticalAxisD.scaledValues instanceof ScaledValuesNumeric) ? __assign(__assign({}, verticalAxisD), { scaledValues: aggScaledValues }) : verticalAxisD;
    verticalAxisDAgg.scaledValues.scale.range(verticalAxisD.scaledValues.scale.range());
    paddingWrapperS.selectAll(".axis-".concat(verticalAxisType))
        .data([verticalAxisDAgg])
        .join('g')
        .call(function (s) { return renderAxisLayout(s, 'vertical'); })
        .classed("axis-".concat(verticalAxisType), true);
    data[verticalAxisType].d3Axis = verticalAxisD.d3Axis;
    paddingWrapperS.selectAll(".axis-".concat(horizontalAxisType))
        .data([horizontalAxisDAgg])
        .join('g')
        .call(function (s) { return renderAxisLayout(s, 'horizontal'); })
        .classed("axis-".concat(horizontalAxisType), true);
    data[horizontalAxisType].d3Axis = horizontalAxisD.d3Axis;
}

function renderGrid(chartS) {
    var series = chartS.datum().series;
    var drawAreaS = series.renderer.drawAreaS;
    var gridAreaS = drawAreaS.selectAll('.grid-area');
    var horizontalAxisS = series.renderer.horizontalAxisS;
    var verticalAxisS = series.renderer.verticalAxisS;
    var drawAreaBgE = series.renderer.drawAreaBgS.node();
    if (!drawAreaBgE)
        return;
    var drawAreaPos = drawAreaBgE.getBoundingClientRect();
    cartesianGridHorizontalLinesRender();
    cartesianGridVerticalLinesRender();
    function cartesianGridHorizontalLinesRender() {
        var gridLineFactor = verticalAxisS.datum().gridLineFactor;
        var ticks = verticalAxisS.selectAll(".tick line").filter(function () {
            var visibilityCheck = function (element) {
                var computedStyle = getComputedStyle(element);
                var isVisibleFallback = !(computedStyle.display === 'none' || computedStyle.visibility === 'hidden');
                return element.checkVisibility() && isVisibleFallback;
            };
            //Parent Check necessary because of chrome
            return visibilityCheck(this) && !!this.parentElement && visibilityCheck(this.parentElement);
        });
        var tickPositions = [];
        ticks.each(function () {
            var tickPos = this.getBoundingClientRect();
            tickPositions.splice(0, 0, tickPos.y + tickPos.height / 2 - drawAreaPos.y);
        });
        if (Math.min.apply(Math, __spreadArray([], __read(tickPositions), false)) > 0)
            tickPositions.splice(0, 0, 0);
        if (Math.max.apply(Math, __spreadArray([], __read(tickPositions), false)) < drawAreaPos.height)
            tickPositions.push(drawAreaPos.height);
        var linePositions = [];
        if (gridLineFactor !== undefined) {
            linePositions = linePositionsFromTickPositions(tickPositions, gridLineFactor);
            var maxPosition_1 = Math.max.apply(Math, __spreadArray([], __read(tickPositions), false));
            linePositions = linePositions.filter(function (position) { return position >= 1 && position <= maxPosition_1 - 1; });
            linePositions.splice(0, 0, 0);
        }
        var _a = __read(horizontalAxisS.datum().scaledValues.scale.range(), 2), x1 = _a[0], x2 = _a[1];
        gridAreaS.selectAll('.line.line--grid.line--horizontal')
            .data(linePositions)
            .join('path')
            .each(function (d, i, g) { return lineToPath(select(g[i]), [
            { x: x1, y: d }, { x: x2, y: d }
        ]); })
            .classed('line line--grid line--horizontal', true);
    }
    function cartesianGridVerticalLinesRender() {
        var gridLineFactor = horizontalAxisS.datum().gridLineFactor;
        var ticks = horizontalAxisS.selectAll(".tick line").filter(function () {
            var visibilityCheck = function (element) {
                var computedStyle = getComputedStyle(element);
                var isVisibleFallback = !(computedStyle.display === 'none' || computedStyle.visibility === 'hidden');
                return element.checkVisibility() && isVisibleFallback;
            };
            //Parent Check necessary because of chrome
            return visibilityCheck(this) && !!this.parentElement && visibilityCheck(this.parentElement);
        });
        var tickPositions = [0];
        ticks.each(function () {
            var tickPos = this.getBoundingClientRect();
            tickPositions.push(tickPos.x + tickPos.width / 2 - drawAreaPos.x);
        });
        if (Math.min.apply(Math, __spreadArray([], __read(tickPositions), false)) > 0)
            tickPositions.splice(0, 0, 0);
        if (Math.max.apply(Math, __spreadArray([], __read(tickPositions), false)) < drawAreaPos.width)
            tickPositions.push(drawAreaPos.width);
        var linePositions = [];
        if (gridLineFactor !== undefined) {
            linePositions = linePositionsFromTickPositions(tickPositions, gridLineFactor);
            var maxPosition_2 = drawAreaPos.width;
            linePositions = linePositions.filter(function (position) { return position >= 1 && position <= maxPosition_2 - 1; });
            linePositions.push(maxPosition_2);
        }
        var _a = __read(verticalAxisS.datum().scaledValues.scale.range(), 2), y1 = _a[0], y2 = _a[1];
        gridAreaS.selectAll('.line.line--grid.line--vertical')
            .data(linePositions)
            .join('path')
            .each(function (d, i, g) { return lineToPath(select(g[i]), [
            { x: d, y: y1 }, { x: d, y: y2 }
        ]); })
            .classed('line line--grid line--vertical', true);
    }
}
function linePositionsFromTickPositions(tickPositions, gridLineFactor) {
    var linePositions = [];
    var maxPosition = Math.max.apply(Math, __spreadArray([], __read(tickPositions), false));
    if (gridLineFactor < 1)
        factorSmaller1();
    if (gridLineFactor > 1)
        factorGreater1();
    if (gridLineFactor === 1)
        factorEquals1();
    function factorSmaller1() {
        linePositions.push(tickPositions[0]);
        for (var i = 0; i < tickPositions.length - 1; i++) {
            var lastPosition = linePositions[linePositions.length - 1];
            while (tickPositions[i] < lastPosition && i < tickPositions.length)
                i++;
            linePositions.push.apply(linePositions, __spreadArray([], __read(splitDistance(gridLineFactor, tickPositions[i], tickPositions[i + 1])), false));
        }
        linePositions.shift();
    }
    function factorGreater1() {
        var distances = tickPositions.slice(0, tickPositions.length - 1)
            .map(function (pos, index) { return Math.abs(tickPositions[index + 1] - pos); });
        var maxDistanceIndex = distances
            .reduce(function (pIndex, _, cIndex) { return distances[pIndex] > distances[cIndex] ? pIndex : cIndex; }, 0);
        var maxDistance = distances[maxDistanceIndex];
        var lastPosition = tickPositions[maxDistanceIndex] % maxDistance;
        do {
            linePositions.push(lastPosition);
            lastPosition = lastPosition + maxDistance * gridLineFactor;
        } while (lastPosition < maxPosition);
    }
    function factorEquals1() {
        linePositions.push(tickPositions[0]);
        for (var i = 0; i < tickPositions.length - 1; i++) {
            var lastPosition = linePositions[linePositions.length - 1];
            linePositions.push(lastPosition + Math.abs(tickPositions[i + 1] - tickPositions[i]) * gridLineFactor);
        }
        linePositions.shift();
    }
    return linePositions;
}
function splitDistance(gridLineFactor, position1, position2) {
    var positions = [];
    var distance = Math.abs(position1 - position2);
    var position = position1;
    do {
        positions.push(position);
        position += gridLineFactor * distance;
    } while (position < position2);
    return positions;
}

function renderOriginLine(chartS) {
    var _a = chartS.datum().series.renderer, horizontalAxisS = _a.horizontalAxisS, verticalAxisS = _a.verticalAxisS, drawAreaS = _a.drawAreaS;
    var gridAreaS = drawAreaS.selectAll('.grid-area');
    function needsBaseLine(values) {
        if (values.tag !== 'linear')
            return false;
        var hasNegativeVal = values.values.find(function (val) { return val < 0; });
        var hasPositiveVal = values.values.find(function (val) { return val > 0; });
        return hasNegativeVal && hasPositiveVal;
    }
    if (needsBaseLine(horizontalAxisS.datum().scaledValues)) {
        var vals = horizontalAxisS.datum().scaledValues;
        var x1_1 = vals.scale(0);
        var x2_1 = x1_1;
        var _b = __read(verticalAxisS.datum().scaledValues.scale.range(), 2), y1_1 = _b[0], y2_1 = _b[1];
        gridAreaS.selectAll('.line.line--origin.line--vertical')
            .data([null])
            .join('path')
            .call(function (s) { return lineToPath(s, [{ x: x1_1, y: y1_1 }, { x: x2_1, y: y2_1 }]); })
            .classed('line line--origin line--vertical', true);
    }
    else
        gridAreaS.selectAll('.line.line--origin.line--vertical').remove();
    if (needsBaseLine(verticalAxisS.datum().scaledValues)) {
        var vals = verticalAxisS.datum().scaledValues;
        var y1_2 = vals.scale(0);
        var y2_2 = y1_2;
        var _c = __read(horizontalAxisS.datum().scaledValues.scale.range(), 2), x1_2 = _c[0], x2_2 = _c[1];
        gridAreaS.selectAll('.line.line--origin.line--horizontal')
            .data([null])
            .join('path')
            .classed('line line--origin line--horizontal', true)
            .call(function (s) { return lineToPath(s, [{ x: x1_2, y: y1_2 }, { x: x2_2, y: y2_2 }]); });
    }
    else
        gridAreaS.selectAll('.line.line--origin.line--horizontal').remove();
}

var CartesianChartMixin = /** @class */ (function (_super) {
    __extends(CartesianChartMixin, _super);
    function CartesianChartMixin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CartesianChartMixin.prototype, "xAxisS", {
        get: function () {
            return this.chartS.selectAll('.axis-x');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CartesianChartMixin.prototype, "yAxisS", {
        get: function () {
            return this.chartS.selectAll('.axis-y');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CartesianChartMixin.prototype, "horizontalAxisS", {
        get: function () {
            return this.chartS.selectAll('.axis-bottom, .axis-top');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CartesianChartMixin.prototype, "verticalAxisS", {
        get: function () {
            return this.chartS.selectAll('.axis-left, .axis-right');
        },
        enumerable: false,
        configurable: true
    });
    CartesianChartMixin.prototype.getAxisInversionState = function () {
        return {
            horizontal: this.horizontalAxisS.empty() ? false : getCurrentResponsiveValue(this.horizontalAxisS.datum().inverted, { chart: this.chartS, self: this.horizontalAxisS }),
            vertical: this.verticalAxisS.empty() ? false : getCurrentResponsiveValue(this.verticalAxisS.datum().inverted, { chart: this.chartS, self: this.verticalAxisS }),
            x: this.xAxisS.empty() ? false : getCurrentResponsiveValue(this.xAxisS.datum().inverted, { chart: this.chartS, self: this.xAxisS }),
            y: this.yAxisS.empty() ? false : getCurrentResponsiveValue(this.yAxisS.datum().inverted, { chart: this.chartS, self: this.yAxisS })
        };
    };
    CartesianChartMixin.prototype.renderCartesianAxis = function () {
        var flipped = this.chartS.datum().series.responsiveState.currentlyFlipped;
        this.chartS.classed('chart-cartesian', true)
            .attr('data-flipped', flipped);
        renderCartesianAxes(this.chartS);
    };
    CartesianChartMixin.prototype.renderOriginLine = function () { renderOriginLine(this.chartS); };
    CartesianChartMixin.prototype.renderGrid = function () { renderGrid(this.chartS); };
    CartesianChartMixin.prototype.renderCartesianComponents = function () {
        this.renderCartesianAxis();
        this.renderOriginLine();
        this.renderGrid();
    };
    return CartesianChartMixin;
}(Chart));

var CartesianSeries = /** @class */ (function () {
    function CartesianSeries() {
    }
    CartesianSeries.prototype.getScaledValuesAtScreenPosition = function (x, y) {
        var getAxisData = function (axisS, position) {
            var _a, _b;
            var axis = axisS.datum();
            var scaleFormat = axis.scaledValues.tag !== 'categorical' ? axis.scaledValues.scale.tickFormat() : (function (h) { return h; });
            var appliedFormat = (_b = (_a = axis.d3Axis) === null || _a === void 0 ? void 0 : _a.tickFormat()) !== null && _b !== void 0 ? _b : scaleFormat;
            var screenValue = axis.scaledValues.atScreenPosition(position);
            var nearestRealValue = axis.scaledValues.getNearestValue(screenValue);
            return {
                appliedFormat: appliedFormat,
                formattedValue: appliedFormat(screenValue, 0),
                title: getCurrentResponsiveValue(axis.title, {
                    self: axisS,
                    chart: axis.renderer.chartS
                }),
                screenValue: screenValue,
                nearestRealValue: nearestRealValue
            };
        };
        var horizontal = getAxisData(this.renderer.horizontalAxisS, x);
        var vertical = getAxisData(this.renderer.verticalAxisS, y);
        return {
            horizontal: horizontal.formattedValue,
            horizontalName: horizontal.title,
            horizontalNearestRealValue: horizontal.nearestRealValue,
            horizontalScreenValue: horizontal.screenValue,
            vertical: vertical.formattedValue,
            verticalName: vertical.title,
            verticalNearestRealValue: vertical.nearestRealValue,
            verticalScreenValue: vertical.screenValue,
        };
    };
    CartesianSeries.prototype.applyFilter = function () {
        var _a = this.renderData, x = _a.x, y = _a.y, color = _a.color, categories = _a.categories;
        this.renderData = __assign(__assign({}, this.renderData), { x: x.cloneFiltered(), y: y.cloneFiltered() });
        if (color) {
            var colorFiltered = color.axis.scaledValues.cloneFiltered();
            var axis = __assign(__assign({}, color.axis), { scaledValues: colorFiltered });
            this.renderData.color = __assign(__assign({}, color), { axis: axis });
        }
        if (categories) {
            this.renderData.categories = categories.cloneFiltered();
        }
        return this;
    };
    CartesianSeries.prototype.applyZoom = function () {
        var _a = this.renderData, zoom = _a.zoom, x = _a.x, y = _a.y;
        if (!zoom)
            return this;
        var _b = __read(this.responsiveState.currentlyFlipped ? ['y', 'x'] : ['x', 'y'], 2), xDirection = _b[0], yDirection = _b[1];
        this.renderData = __assign(__assign({}, this.renderData), { x: x.cloneZoomed(zoom.currentTransform, xDirection), y: y.cloneZoomed(zoom.currentTransform, yDirection) });
        return this;
    };
    return CartesianSeries;
}());

function handleZoom(series) {
    var throttledZoom = throttle(function (e) { return onZoomDrawArea(e, series); }, 50);
    var onZoom = function (e) {
        throttledZoom.func(e);
        series.renderer.windowS.dispatch('resize');
    };
    var zoom = series.renderData.zoom;
    if (!zoom)
        return;
    series.renderer.drawAreaS.call(zoom.behaviour.on('zoom.zoom', onZoom));
}
function onZoomDrawArea(e, series) {
    var transform = e.transform;
    var zoom = series.originalData.zoom;
    if (!zoom)
        return;
    zoom.currentTransform = (e.transform.k === 1) ? identity : transform;
    var _a = series.responsiveState.drawAreaRange(), horizontal = _a.horizontal, verticalInverted = _a.verticalInverted;
    var extent = [
        [horizontal[0], verticalInverted[0]],
        [horizontal[1], verticalInverted[1]],
    ];
    zoom.behaviour.extent(extent).translateExtent(extent).scaleExtent([zoom.out, zoom.in]);
}

var CartesianResponsiveState = /** @class */ (function (_super) {
    __extends(CartesianResponsiveState, _super);
    function CartesianResponsiveState(args) {
        var _this = _super.call(this, args) || this;
        _this._inversionState = {
            horizontal: false, vertical: false, x: false, y: false
        };
        _this._series = args.series;
        return _this;
    }
    CartesianResponsiveState.prototype.horizontalVals = function () {
        return this.currentlyFlipped ? this._series.renderData.y : this._series.renderData.x;
    };
    CartesianResponsiveState.prototype.verticalVals = function () {
        return this.currentlyFlipped ? this._series.renderData.x : this._series.renderData.y;
    };
    CartesianResponsiveState.prototype.update = function () {
        _super.prototype.update.call(this);
        var _a = this.drawAreaRange(), horizontal = _a.horizontal, vertical = _a.vertical;
        this.updateInversionState();
        if (this._inversionState.horizontal)
            horizontal.reverse();
        if (this._inversionState.vertical)
            vertical.reverse();
        var _b = __read(this.currentlyFlipped ? ['vertical', 'horizontal'] : ['horizontal', 'vertical'], 2), xOrientation = _b[0], yOrientation = _b[1];
        this._series.originalData.x.updateRange(horizontal, vertical, xOrientation);
        this._series.originalData.y.updateRange(horizontal, vertical, yOrientation);
        handleZoom(this._series);
    };
    CartesianResponsiveState.prototype.updateInversionState = function () {
        var inversionState = this._series.renderer.getAxisInversionState();
        var horizontalAxisS = this._series.renderer.horizontalAxisS;
        var verticalAxisS = this._series.renderer.verticalAxisS;
        this._series.originalData.x.inverted = inversionState.x;
        this._series.originalData.y.inverted = inversionState.y;
        if (!horizontalAxisS.empty())
            horizontalAxisS.datum().scaledValues.inverted = inversionState.horizontal;
        if (!verticalAxisS.empty())
            verticalAxisS.datum().scaledValues.inverted = inversionState.vertical;
        this._inversionState = {
            horizontal: inversionState.horizontal,
            vertical: inversionState.vertical,
            x: this.currentlyFlipped ? inversionState.vertical : inversionState.horizontal,
            y: this.currentlyFlipped ? inversionState.horizontal : inversionState.vertical,
        };
    };
    return CartesianResponsiveState;
}(ResponsiveState));

function validateCartesianSeriesArgs(args, series) {
    var _a = __read(alignScaledValuesLengths(args.x, args.y), 2), xAligned = _a[0], yAligned = _a[1];
    var data = __assign(__assign({}, validateDataSeriesArgs(args, series)), { x: validateScaledValuesSpatial(xAligned, 'a-0'), y: validateScaledValuesSpatial(yAligned, 'a-1'), zoom: args.zoom ? validateZoom(args.zoom) : undefined, getCombinedKey: function (i) {
            var xKey = this.x instanceof ScaledValuesCategorical ? this.x.getCategoryData(i).combinedKey : undefined;
            var yKey = this.y instanceof ScaledValuesCategorical ? this.y.getCategoryData(i).combinedKey : undefined;
            var seriesCategoryKey = this.categories ? this.categories.getCategoryData(i).combinedKey : undefined;
            return combineKeys([this.key, seriesCategoryKey, xKey, yKey]);
        } });
    if (data.categories && data.categories.values.length !== data.x.values.length) {
        throw new Error(ErrorMessages.categoricalValuesMismatch);
    }
    if (data.color && data.color.values.length !== data.x.values.length) {
        throw new Error(ErrorMessages.sequentialColorValuesMismatch);
    }
    return data;
}
function cloneCartesianSeriesData(original) {
    return __assign(__assign({}, original), { x: original.x.clone(), y: original.y.clone() });
}

function createStackedBarRect(props) {
    var i = props.i, series = props.series;
    var responsiveState = series.responsiveState;
    var aggScaledValues = series.aggScaledValues.sumCached();
    var scaledValuesOriginalY = series.renderData.y;
    var flipped = responsiveState.currentlyFlipped;
    var wholeBarRect = responsiveState.getBarBaseRect(i);
    var scaledValuesOriginalYRange = scaledValuesOriginalY.scale.range();
    aggScaledValues.scale.range(scaledValuesOriginalYRange);
    if (!flipped) {
        var scaledValuesOriginalYRangeInverted = [scaledValuesOriginalYRange[1], scaledValuesOriginalYRange[0]];
        aggScaledValues.scale.range(scaledValuesOriginalYRangeInverted);
    }
    var innerValueStart = aggScaledValues.scale(aggScaledValues.values[i]);
    function getHorizontalStackedBar() {
        var x = series.renderData.y;
        return {
            x: wholeBarRect.x + innerValueStart,
            y: wholeBarRect.y,
            width: aggScaledValues.scale(x.values[i]),
            height: wholeBarRect.height
        };
    }
    function getVerticalStackedBar() {
        var y = series.renderData.y;
        return {
            x: wholeBarRect.x,
            y: aggScaledValues.scale.range()[1] - innerValueStart - aggScaledValues.scale(y.values[i]),
            width: wholeBarRect.width,
            height: aggScaledValues.scale(y.values[i])
        };
    }
    return flipped ? getHorizontalStackedBar() : getVerticalStackedBar();
}

var Bar = /** @class */ (function () {
    function Bar(args) {
        var _a;
        this.x = args.x;
        this.y = args.y;
        this.width = args.width;
        this.height = args.height;
        this.xValue = args.xValue;
        this.yValue = args.yValue;
        this.category = args.category;
        this.categoryFormatted = args.categoryFormatted;
        this.styleClass = args.styleClass;
        this.key = args.key;
        this.labelData = args.label;
        this.inverted = (_a = args.inverted) !== null && _a !== void 0 ? _a : false;
        this.polarity = this.positionOnTop() ? 'positive' : 'negative';
    }
    Bar.prototype.getLabel = function (orientation) {
        if (!this.labelData)
            return [];
        return __assign(__assign(__assign({}, this.labelData), (orientation === 'horizontal' ? this.getLabelPositionHorizontal() : this.getLabelPositionVertical())), { marker: this, text: this.labelData.format(this, this.labelData.value) });
    };
    Bar.prototype.getLabelPositionVertical = function () {
        var _a = this.labelData, offset = _a.offset, positionStrategy = _a.positionStrategy, offsetX = _a.offsetX, offsetY = _a.offsetY;
        return {
            x: offsetX + this.x + this.width / 2,
            y: offsetY + this.y + (positionStrategy === 'center' ? this.height / 2 :
                this.positionOnTop() ? (-1 * offset) : (this.height + offset)),
        };
    };
    Bar.prototype.getLabelPositionHorizontal = function () {
        var _a = this.labelData, offset = _a.offset, positionStrategy = _a.positionStrategy, offsetX = _a.offsetX, offsetY = _a.offsetY;
        return {
            x: offsetX + this.x + (positionStrategy === 'center' ? this.width / 2 :
                this.positionOnTop() ? (this.width + offset) : (-1 * offset)),
            y: offsetY + this.y + this.height / 2,
        };
    };
    Bar.prototype.positionOnTop = function () {
        var _a, _b;
        var positionStrategy = (_b = (_a = this.labelData) === null || _a === void 0 ? void 0 : _a.positionStrategy) !== null && _b !== void 0 ? _b : 'dynamic';
        var yPositive = this.yValue >= 0;
        return ((this.inverted !== yPositive) && positionStrategy === 'dynamic') ||
            (!this.inverted && positionStrategy === 'positive') ||
            (this.inverted && positionStrategy === 'negative');
    };
    return Bar;
}());

var BarBaseResponsiveState = /** @class */ (function (_super) {
    __extends(BarBaseResponsiveState, _super);
    function BarBaseResponsiveState(args) {
        var _this = _super.call(this, args) || this;
        _this._series = args.series;
        return _this;
    }
    BarBaseResponsiveState.prototype.update = function () {
        _super.prototype.update.call(this);
    };
    BarBaseResponsiveState.prototype.getBarBaseRect = function (i) {
        return this.currentlyFlipped ?
            this.getBarRectHorizontal(i, this.horizontalVals(), this.verticalVals()) :
            this.getBarRectVertical(i, this.verticalVals(), this.horizontalVals());
    };
    BarBaseResponsiveState.prototype.getBarRectVertical = function (i, linearVals, categoryVals) {
        return {
            x: barRectFormula.barCategoryStart(categoryVals, i),
            y: barRectFormula.barLinearStart(linearVals, i),
            width: barRectFormula.barCategoryLength(categoryVals, i),
            height: barRectFormula.barLinearLength(linearVals, i),
        };
    };
    BarBaseResponsiveState.prototype.getBarRectHorizontal = function (i, linearVals, categoryVals) {
        return {
            x: barRectFormula.barLinearStart(linearVals, i),
            y: barRectFormula.barCategoryStart(categoryVals, i),
            width: barRectFormula.barLinearLength(linearVals, i),
            height: barRectFormula.barCategoryLength(categoryVals, i),
        };
    };
    return BarBaseResponsiveState;
}(CartesianResponsiveState));
var barRectFormula = {
    barCategoryStart: function (vals, i) { return vals.getScaledValueStart(i); },
    barCategoryLength: function (vals, _) { return vals.scale.bandwidth(); },
    barLinearStart: function (vals, i) { return Math.min(vals.getScaledValueEnd(i), vals.scale(0)); },
    barLinearLength: function (vals, i) { return Math.abs(vals.scale(0) - vals.getScaledValue(i)); },
};

var BarBaseSeries = /** @class */ (function (_super) {
    __extends(BarBaseSeries, _super);
    function BarBaseSeries(args) {
        var _this = _super.call(this) || this;
        _this.responsiveState = new BarBaseResponsiveState({
            series: _this,
            flipped: ('flipped' in args) ? args.flipped : false
        });
        _this.renderer = args.renderer;
        return _this;
    }
    BarBaseSeries.prototype.getBars = function () {
        var _a, _b;
        var data = [];
        var _c = this.renderData, x = _c.x, y = _c.y, color = _c.color, keysActive = _c.keysActive, key = _c.key, categories = _c.categories, labels = _c.labels;
        var optionalColorValues = color === null || color === void 0 ? void 0 : color.axis.scaledValues;
        if (!keysActive[key])
            return data;
        for (var i = 0; i < y.values.length; ++i) {
            if (categories && !categories.isValueActive(i))
                continue;
            if (!x.isValueActive(i) || !y.isValueActive(i) || !((_a = optionalColorValues === null || optionalColorValues === void 0 ? void 0 : optionalColorValues.isValueActive(i)) !== null && _a !== void 0 ? _a : true))
                continue;
            var category = categories === null || categories === void 0 ? void 0 : categories.values[i];
            data.push(new Bar(__assign(__assign({}, this.getRect(i)), { xValue: x.values[i], yValue: y.values[i], styleClass: (_b = categories === null || categories === void 0 ? void 0 : categories.getStyleClass(i)) !== null && _b !== void 0 ? _b : defaultStyleClass, category: category, categoryFormatted: category ? categories === null || categories === void 0 ? void 0 : categories.categories.categoryMap[category].formatValue : undefined, label: labels === null || labels === void 0 ? void 0 : labels.at(i), key: new Key(this.renderData.getCombinedKey(i) + " i-".concat(i)), inverted: y.inverted })));
        }
        return data;
    };
    return BarBaseSeries;
}(CartesianSeries));

var BarLabelsDataCollection = /** @class */ (function () {
    function BarLabelsDataCollection(args) {
        var _a, _b, _c, _d, _e;
        this.values = args.values;
        this.offset = (_a = args.offset) !== null && _a !== void 0 ? _a : 0;
        this.offsetX = (_b = args.offsetX) !== null && _b !== void 0 ? _b : this.values.map(function () { return 0; });
        this.offsetY = (_c = args.offsetY) !== null && _c !== void 0 ? _c : this.values.map(function () { return 0; });
        this.positionStrategy = (_d = args.positionStrategy) !== null && _d !== void 0 ? _d : 'dynamic';
        this.format = (_e = args.format) !== null && _e !== void 0 ? _e : (function (bar, label) { return label; });
    }
    BarLabelsDataCollection.prototype.at = function (i) {
        return { value: this.values[i], offset: this.offset, positionStrategy: this.positionStrategy,
            offsetX: this.offsetX[i], offsetY: this.offsetY[i], format: this.format };
    };
    return BarLabelsDataCollection;
}());

function validateBarBaseSeriesArgs(args, series) {
    var cartesianData = validateCartesianSeriesArgs(args, series);
    if (!(cartesianData.x instanceof ScaledValuesCategorical))
        throw new Error(ErrorMessages.invalidScaledValuesCombination);
    return __assign(__assign({}, cartesianData), { markerTooltipGenerator: args.markerTooltipGenerator, labels: args.labels ? new BarLabelsDataCollection(args.labels) : undefined });
}

function validateBarStackedSeriesArgs(args, series) {
    var data = __assign(__assign({}, validateBarBaseSeriesArgs(args, series)), { aggregationScale: args.aggregationScale });
    if (!data.categories)
        throw new Error(ErrorMessages.missingArgumentForSeries);
    if (!(data.y instanceof ScaledValuesNumeric))
        throw new Error(ErrorMessages.missingArgumentForSeries);
    return data;
}
var BarStackedSeries = /** @class */ (function (_super) {
    __extends(BarStackedSeries, _super);
    function BarStackedSeries(args) {
        var _this = _super.call(this, args) || this;
        _this.originalData = validateBarStackedSeriesArgs(args, _this);
        _this.renderData = _this.originalData;
        _this.type = 'stacked';
        var _a = _this.originalData, x = _a.x, y = _a.y, categories = _a.categories, aggregationScale = _a.aggregationScale;
        _this.aggScaledValues = new ScaledValuesCumulativeSummation(y, x, categories, aggregationScale);
        return _this;
    }
    BarStackedSeries.prototype.getBars = function () {
        var _a = this.renderData, x = _a.x, y = _a.y, categories = _a.categories, aggregationScale = _a.aggregationScale;
        this.aggScaledValues = new ScaledValuesCumulativeSummation(y, x, categories, aggregationScale);
        return _super.prototype.getBars.call(this);
    };
    BarStackedSeries.prototype.getRect = function (i) {
        return createStackedBarRect({ series: this, i: i });
    };
    BarStackedSeries.prototype.cloneToRenderData = function () {
        this.renderData = cloneCartesianSeriesData(this.originalData);
        return this;
    };
    BarStackedSeries.prototype.applyZoom = function () {
        // TODO: make zooming work for stacked bar chart
        // super.applyZoom()
        return this;
    };
    BarStackedSeries.prototype.applyFilter = function () {
        _super.prototype.applyFilter.call(this);
        return this;
    };
    BarStackedSeries.prototype.applyInversion = function () {
        throw new Error('Method not implemented');
    };
    return BarStackedSeries;
}(BarBaseSeries));

function createGroupedBarRect(series, i) {
    var _a;
    var categories = series.renderData.categories;
    var flipped = series.responsiveState.currentlyFlipped;
    var categoryGroupValues = flipped ? series.responsiveState.verticalVals() : series.responsiveState.horizontalVals();
    var wholeBarRect = series.responsiveState.getBarBaseRect(i);
    var innerScaleDomain = getActiveKeys(categories.keysActive);
    var innerScale = band()
        .domain(innerScaleDomain)
        .range([0, categoryGroupValues.scale.bandwidth()])
        .padding(0.1); //TODO: create parameter for this
    var categoryKey = categories.getCombinedKey(i);
    var innerValue = (_a = innerScale(categoryKey)) !== null && _a !== void 0 ? _a : 0;
    return {
        x: flipped ? wholeBarRect.x : wholeBarRect.x + innerValue,
        y: flipped ? wholeBarRect.y + innerValue : wholeBarRect.y,
        width: flipped ? wholeBarRect.width : innerScale.bandwidth(),
        height: flipped ? innerScale.bandwidth() : wholeBarRect.height
    };
}

function validateBarGroupedSeriesArgs(args, series) {
    var data = validateBarBaseSeriesArgs(args, series);
    if (!data.categories)
        throw new Error(ErrorMessages.missingArgumentForSeries);
    return data;
}
var BarGroupedSeries = /** @class */ (function (_super) {
    __extends(BarGroupedSeries, _super);
    function BarGroupedSeries(args) {
        var _this = _super.call(this, args) || this;
        _this.type = 'grouped';
        _this.originalData = validateBarGroupedSeriesArgs(args, _this);
        _this.renderData = _this.originalData;
        return _this;
    }
    BarGroupedSeries.prototype.getRect = function (i) {
        return createGroupedBarRect(this, i);
    };
    BarGroupedSeries.prototype.cloneToRenderData = function () {
        this.renderData = cloneCartesianSeriesData(this.originalData);
        return this;
    };
    BarGroupedSeries.prototype.applyZoom = function () {
        _super.prototype.applyZoom.call(this);
        return this;
    };
    BarGroupedSeries.prototype.applyFilter = function () {
        _super.prototype.applyFilter.call(this);
        return this;
    };
    BarGroupedSeries.prototype.applyInversion = function () {
        throw new Error('Method not implemented');
    };
    return BarGroupedSeries;
}(BarBaseSeries));

var BarStandardSeries = /** @class */ (function (_super) {
    __extends(BarStandardSeries, _super);
    function BarStandardSeries(args) {
        var _a;
        var _this = _super.call(this, args) || this;
        _this.originalData = validateBarBaseSeriesArgs(args, _this);
        _this.renderData = _this.originalData;
        _this.type = (_a = args.type) !== null && _a !== void 0 ? _a : 'standard';
        return _this;
    }
    BarStandardSeries.prototype.getRect = function (i) {
        return this.responsiveState.getBarBaseRect(i);
    };
    BarStandardSeries.prototype.cloneToRenderData = function () {
        this.renderData = cloneCartesianSeriesData(this.originalData);
        return this;
    };
    BarStandardSeries.prototype.applyZoom = function () {
        _super.prototype.applyZoom.call(this);
        return this;
    };
    BarStandardSeries.prototype.applyFilter = function () {
        _super.prototype.applyFilter.call(this);
        return this;
    };
    BarStandardSeries.prototype.applyInversion = function () {
        throw new Error("Method not implemented.");
    };
    return BarStandardSeries;
}(BarBaseSeries));

function joinBarSeries(seriesSelection, joinSelection) {
    joinSelection.join(function (enter) {
        return enter
            .append('rect')
            .classed('element bar', true)
            .each(function (d, i, g) { return rectToAttrs(select(g[i]), rectMinimized(d)); })
            .call(function (s) { return seriesSelection.dispatch('enter', { detail: { selection: s } }); });
    }, undefined, function (exit) {
        return exit
            .classed('exiting', true)
            .each(function (d, i, g) {
            return select(g[i])
                .transition('minimize')
                .duration(250)
                .call(addD3TransitionClass)
                .call(function (t) { return rectToAttrs(t, rectMinimized(d)); })
                .remove();
        })
            .call(function (s) { return seriesSelection.dispatch('exit', { detail: { selection: s } }); });
    })
        .classed('exiting', false)
        .classed('exit-done', false)
        .attr('data-style', function (d) { return d.styleClass; })
        .attr('data-key', function (d) { return d.key.rawKey; })
        .each(function (d, i, g) {
        return select(g[i])
            .transition('position')
            .call(addD3TransitionClass)
            .duration(250)
            .ease(cubicOut)
            .call(function (t) {
            var cssLength = select(g[i]).style('stroke-width');
            var strokeSize = cssLengthInPx(cssLength, select(g[i]).node());
            return rectToAttrs(t, rectFitStroke(d, strokeSize));
        });
    })
        .call(function (s) { return seriesSelection.dispatch('update', { detail: { selection: s } }); });
}

function renderBarSeries(parentS, series) {
    var classes = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        classes[_i - 2] = arguments[_i];
    }
    var _a = createSelectionClasses(classes), classString = _a.classString, selector = _a.selector;
    var seriesS = parentS.selectAll("".concat(selector, ".series-bar"))
        .data(series)
        .join('g')
        .classed("".concat(classString, " series-bar"), true);
    var barS = seriesS.selectAll('rect')
        .data(function (d) { return d.getBars(); }, function (d) { return d.key.rawKey; })
        .call(function (s) { return joinBarSeries(seriesS, s); });
    return { seriesS: seriesS, barS: barS };
}

function validateBarChart(args) {
    var renderer = args.renderer, x = args.x, y = args.y, legend = args.legend, breakpoints = args.breakpoints, title = args.title, subTitle = args.subTitle;
    var series = args.series.type === 'stacked' ?
        new BarStackedSeries(__assign(__assign({}, args.series), { key: 's-0', renderer: renderer })) : args.series.type === 'grouped' ?
        new BarGroupedSeries(__assign(__assign({}, args.series), { key: 's-0', renderer: renderer })) :
        new BarStandardSeries(__assign(__assign({}, args.series), { key: 's-0', renderer: renderer }));
    var cartesianData = validateCartesianChart({ renderer: renderer, series: series, x: x, y: y, legend: legend, breakpoints: breakpoints, title: title, subTitle: subTitle });
    return __assign(__assign({}, cartesianData), { series: series });
}

var BarChart = /** @class */ (function (_super) {
    __extends(BarChart, _super);
    function BarChart(windowSelection, data) {
        var _this = _super.call(this) || this;
        _this._windowS = windowSelection;
        _this.revalidate(data);
        return _this;
    }
    Object.defineProperty(BarChart.prototype, "windowS", {
        get: function () { return this._windowS; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BarChart.prototype, "chartS", {
        get: function () {
            return ((this._chartS && !this._chartS.empty()) ? this._chartS :
                this.layouterS.selectAll('svg.chart'));
        },
        enumerable: false,
        configurable: true
    });
    BarChart.prototype.renderContent = function () {
        var _a, _b, _c, _d;
        this.renderSeriesChartComponents();
        var series = this.chartS.datum().series.cloneToRenderData().applyZoom().applyFilter();
        var _e = renderBarSeries(this.drawAreaS, [series]), seriesS = _e.seriesS, barS = _e.barS;
        this.addAllSeriesFeatures(seriesS);
        this.drawAreaS.selectAll('.series-label')
            .attr('layout-strategy', (_c = (_b = (_a = barS.data()[0]) === null || _a === void 0 ? void 0 : _a.labelData) === null || _b === void 0 ? void 0 : _b.positionStrategy) !== null && _c !== void 0 ? _c : null)
            .attr('data-inverted', ((_d = barS.data()[0]) === null || _d === void 0 ? void 0 : _d.inverted) ? 'true' : null);
        this.renderCartesianComponents();
    };
    BarChart.prototype.revalidate = function (data) {
        var initialWindowData = validateWindow(__assign(__assign({}, data), { type: 'bar', renderer: this }));
        var chartData = validateBarChart(__assign(__assign({}, data), { renderer: this }));
        this.windowS.datum(__assign(__assign({}, initialWindowData), chartData));
    };
    return BarChart;
}(Chart));
applyMixins(BarChart, [CartesianChartMixin, DataSeriesChartMixin]);

var PointResponsiveState = /** @class */ (function (_super) {
    __extends(PointResponsiveState, _super);
    function PointResponsiveState(args) {
        var _this = _super.call(this, args) || this;
        _this._series = args.series;
        return _this;
    }
    PointResponsiveState.prototype.update = function () {
        _super.prototype.update.call(this);
        var radii = this._series.originalData.radii;
        var chart = this._series.renderer.chartS;
        updateRadii();
        chart.style('--max-radius', this.getMaxRadius() + 'px');
        function updateRadii() {
            if (typeof radii === 'number')
                return;
            if (radii instanceof BreakpointProperty) {
                return;
            }
            interpolateBubbleRadius(radii);
        }
        function interpolateBubbleRadius(radii) {
            if (!(radii.extrema instanceof BreakpointProperty)) {
                radii.scale.range([radii.extrema.minimum, radii.extrema.maximum]);
                return;
            }
            var _a = radii.extrema.getRespValInterpolated({ chart: chart }), preBreakpoint = _a.preBreakpoint, postBreakpoint = _a.postBreakpoint, firstBreakpoint = _a.firstBreakpoint, lastBreakpoint = _a.lastBreakpoint;
            if (postBreakpoint === null) {
                radii.scale.range([lastBreakpoint.value.minimum, lastBreakpoint.value.maximum]);
                return;
            }
            if (preBreakpoint === null) {
                radii.scale.range([firstBreakpoint.value.minimum, firstBreakpoint.value.maximum]);
                return;
            }
            var elementLength = elementFromSelection(chart).getBoundingClientRect()[radii.extrema.dependentOn];
            var breakpointDiff = postBreakpoint.length - preBreakpoint.length;
            var currentDiff = elementLength - preBreakpoint.length;
            var minimumDiff = postBreakpoint.value.minimum - preBreakpoint.value.minimum;
            var maximumDiff = postBreakpoint.value.maximum - preBreakpoint.value.maximum;
            var minimum = preBreakpoint.value.minimum + currentDiff / breakpointDiff * minimumDiff;
            var maximum = preBreakpoint.value.maximum + currentDiff / breakpointDiff * maximumDiff;
            radii.scale.range([minimum, maximum]);
        }
    };
    PointResponsiveState.prototype.getRadius = function (i) {
        var radii = this._series.originalData.radii;
        var chart = this._series.renderer.chartS;
        if (typeof radii === 'number')
            return radii;
        if (radii instanceof BreakpointProperty) {
            return interpolateInterpolatedRadius(radii);
        }
        return radii.scale(radii.values[i]);
        function interpolateInterpolatedRadius(radii) {
            var _a = radii.getRespValInterpolated({ chart: chart }), preBreakpoint = _a.preBreakpoint, postBreakpoint = _a.postBreakpoint, firstBreakpoint = _a.firstBreakpoint, lastBreakpoint = _a.lastBreakpoint;
            if (postBreakpoint === null) {
                return lastBreakpoint.value;
            }
            if (preBreakpoint === null) {
                preBreakpoint = firstBreakpoint;
                preBreakpoint.length = 0;
            }
            var elementLength = elementFromSelection(chart).getBoundingClientRect()[radii.dependentOn];
            var breakpointLengthDiff = postBreakpoint.length - preBreakpoint.length;
            var currentLengthDiff = elementLength - preBreakpoint.length;
            var valueDiff = postBreakpoint.value - preBreakpoint.value;
            return preBreakpoint.value + currentLengthDiff / breakpointLengthDiff * valueDiff;
        }
    };
    PointResponsiveState.prototype.getMaxRadius = function () {
        var radii = this._series.originalData.radii;
        return (typeof radii === 'number') ? radii :
            radii instanceof BreakpointProperty ? this.getRadius(0) : Math.max.apply(Math, __spreadArray([], __read(radii.scale.range()), false));
    };
    PointResponsiveState.prototype.getRadiusValue = function (i) {
        var radii = this._series.renderData.radii;
        return typeof radii === 'number' ? radii :
            radii instanceof BreakpointProperty ? undefined :
                radii.values[i];
    };
    PointResponsiveState.prototype.getPointCircle = function (i) {
        var _a;
        return {
            center: {
                x: this.horizontalVals().getScaledValue(i),
                y: this.verticalVals().getScaledValue(i),
            },
            radius: (_a = this.getRadius(i)) !== null && _a !== void 0 ? _a : 5
        };
    };
    return PointResponsiveState;
}(CartesianResponsiveState));

function renderRadiusScale(legendS, series) {
    var radii = series.renderData.radii;
    if (typeof radii === 'number' || radii instanceof BreakpointProperty)
        return;
    var _a = __read(radii.scale.range(), 2), minRadius = _a[0], maxRadius = _a[1];
    legendS.style(cssVarDefaultsKeys["--min-radius"], "".concat(minRadius, "px"))
        .style(cssVarDefaultsKeys["--max-radius"], "".concat(maxRadius, "px"));
    var legendRadiusScaleS = legendS.selectAll(".legend__radius-scale")
        .data([null])
        .join('g')
        .classed('legend__radius-scale', true);
    legendRadiusScaleS
        .selectAll('.elements')
        .data([null])
        .join('g')
        .classed('elements', true)
        .selectAll('.element.point')
        .data([minRadius, maxRadius])
        .join('circle')
        .classed('element', true)
        .classed('point', true)
        .attr('r', function (d) { return d; });
    var _b = rectFromString(legendRadiusScaleS.attr('bounds') || '0, 0, 600, 400'), width = _b.width; _b.height;
    radii.axis.scaledValues.scale.range([0, width]);
    legendRadiusScaleS.selectAll('.axis')
        .data([radii.axis])
        .join('g')
        .call(function (s) { return renderAxisLayout(s, 'horizontal'); })
        .classed('axis', true);
}

function isBaseRadiusUserArgs(args) {
    return typeof args === 'number' || isBreakpointPropertyUserArgsResponsive(args);
}
function validateBaseRadius(args) {
    return validateBreakpointProperty(args || 5);
}

function isExtrema(args) {
    return typeof args.minimum === 'number' && typeof args.maximum === 'number';
}

function validateBubbleRadius(args) {
    var _a;
    var series = args.series, renderer = args.renderer, values = args.values;
    var extrema = validateBubbleRadiusExtrema(args.extrema);
    var scale = (_a = args.scale) !== null && _a !== void 0 ? _a : linear().domain([Math.min.apply(Math, __spreadArray([], __read(values), false)), Math.max.apply(Math, __spreadArray([], __read(values), false))]).nice();
    var axis = validateBaseAxis(__assign(__assign({}, args.axis), { renderer: renderer, series: series, scaledValues: validateScaledValuesSpatial({ values: values }, 'ar-0') }));
    return { extrema: extrema, values: values, scale: scale, axis: axis, tag: 'bubble' };
}
function validateBubbleRadiusExtrema(extremaArgs) {
    var extrema = validateBreakpointProperty(extremaArgs);
    if (extrema instanceof BreakpointProperty) {
        var mapping = extrema.mapping;
        Object.values(mapping).forEach(function (values) {
            if (values.minimum > values.maximum)
                throw new Error(ErrorMessages.invalidExtremaCombination);
        });
        return extrema;
    }
    if (!isExtrema(extrema))
        throw new Error(ErrorMessages.invalidResponsiveValue);
    return extrema;
}

var PointLabelsDataCollection = /** @class */ (function () {
    function PointLabelsDataCollection(args) {
        var _a, _b, _c, _d;
        this.values = args.values;
        this.offset = (_a = args.offset) !== null && _a !== void 0 ? _a : 0;
        this.positionStrategyHorizontal = (_b = args.positionStrategyHorizontal) !== null && _b !== void 0 ? _b : 'center';
        this.positionStrategyVertical = (_c = args.positionStrategyVertical) !== null && _c !== void 0 ? _c : 'top';
        this.format = (_d = args.format) !== null && _d !== void 0 ? _d : (function (point, label) { return label; });
    }
    PointLabelsDataCollection.prototype.getLabelData = function (i) {
        return { value: this.values[i], offset: this.offset,
            positionStrategyHorizontal: this.positionStrategyHorizontal, positionStrategyVertical: this.positionStrategyVertical,
            format: this.format
        };
    };
    return PointLabelsDataCollection;
}());

function validatePointSeriesArgs(args, series) {
    return __assign(__assign({}, validateCartesianSeriesArgs(args, series)), { radii: (isBaseRadiusUserArgs(args.radii) || !args.radii) ? validateBaseRadius(args.radii) :
            validateBubbleRadius(__assign(__assign({}, args.radii), { renderer: args.renderer, series: series })), markerTooltipGenerator: args.markerTooltipGenerator, labels: args.labels ? new PointLabelsDataCollection(args.labels) : undefined });
}
function clonePointSeriesData(original) {
    return cloneCartesianSeriesData(original);
}

var PointSeries = /** @class */ (function (_super) {
    __extends(PointSeries, _super);
    function PointSeries(args) {
        var _this = _super.call(this) || this;
        _this.originalData = validatePointSeriesArgs(args, _this);
        _this.renderData = _this.originalData;
        _this.renderer = args.renderer;
        _this.responsiveState = new PointResponsiveState({
            series: _this,
            flipped: ('flipped' in args) ? args.flipped : false
        });
        return _this;
    }
    PointSeries.prototype.renderLegendInfo = function (legendS) {
        renderRadiusScale(legendS, this);
    };
    PointSeries.prototype.cloneToRenderData = function () {
        this.renderData = clonePointSeriesData(this.originalData);
        return this;
    };
    PointSeries.prototype.applyZoom = function () {
        return _super.prototype.applyZoom.call(this);
    };
    PointSeries.prototype.applyFilter = function () {
        return _super.prototype.applyFilter.call(this);
        //TODO
        // if (typeof clone.radii === 'object' && 'tag' in clone.radii) {
        //   const scaledValues = clone.radii.axis.scaledValues.cloneFiltered()
        //   const axis: BaseAxis = {...clone.radii.axis, scaledValues}
        //   clone.radii = {...clone.radii, axis}
        // }
    };
    PointSeries.prototype.applyInversion = function () {
        throw new Error("Method not implemented.");
    };
    return PointSeries;
}(CartesianSeries));

function validateScatterPlot(scatterArgs) {
    var renderer = scatterArgs.renderer, x = scatterArgs.x, y = scatterArgs.y, legend = scatterArgs.legend, breakpoints = scatterArgs.breakpoints, title = scatterArgs.title, subTitle = scatterArgs.subTitle;
    var series = new PointSeries(__assign(__assign({}, scatterArgs.series), { key: 's-0', renderer: renderer }));
    var cartesianData = validateCartesianChart({ renderer: renderer, series: series, x: x, y: y, legend: legend, breakpoints: breakpoints, title: title, subTitle: subTitle });
    var _a = series.originalData, radii = _a.radii; _a.color;
    var hasBubbleRadius = typeof radii !== 'number' && !(radii instanceof BreakpointProperty);
    cartesianData.getAxes = !hasBubbleRadius ? cartesianData.getAxes : function () {
        return __spreadArray(__spreadArray([this.x, this.y], __read((this.series.originalData.color ? [this.series.originalData.color.axis] : [])), false), [this.series.originalData.radii.axis], false);
    };
    return __assign(__assign({}, cartesianData), { series: series });
}

//TODO: points size to css transition. Look at lines for reference!
//TODO: test use cases for scaling
function joinPointSeries(seriesS, joinS) {
    var tDurationString = cssVarFromSelection(seriesS, '--transition-time-line-enter-ms');
    var tDuration = tDurationString ? parseInt(tDurationString) : 250;
    joinS.join(function (enter) { return enter.append('circle')
        .classed('element point', true)
        .each(function (d, i, g) {
        var s = select(g[i]);
        circleToAttrs(s, circleMinimized(d));
    })
        .call(addD3TransitionClassForSelection)
        .call(update)
        .call(function (s) { return seriesS.dispatch('enter', { detail: { selection: s } }); }); }, undefined, function (exit) {
        return exit.classed('exiting', true)
            .transition().duration(tDuration)
            .call(addD3TransitionClass)
            .each(function (d, i, g) {
            var t = select(g[i])
                .transition('minimize')
                .duration(tDuration)
                .call(addD3TransitionClass);
            circleToAttrs(t, circleMinimized(d));
        }).on('end', function () {
            exit.remove();
        }).call(function (s) { return seriesS.dispatch('exit', { detail: { selection: s } }); });
    });
    joinS.call(update);
    function update(updateS) {
        updateS
            .attr('cx', function (d) { return d.center.x; })
            .attr('cy', function (d) { return d.center.y; })
            .attr('data-style', function (d) { return !d.color ? d.styleClass : null; })
            .attr('fill', function (d) { return d.color ? d.color : null; })
            .attr('data-key', function (d) { return d.key.rawKey; })
            .classed('exiting', false)
            .classed('exit-done', false)
            .call(function (s) { return seriesS.dispatch('update', { detail: { selection: s } }); })
            .each(function (d, i, g) {
            var s = select(g[i]);
            if (s.classed('mid-d3-transit')) {
                s.interrupt()
                    .transition('update-radius')
                    .duration(tDuration)
                    .attr('r', function (d) { return d.radius; })
                    .call(addD3TransitionClass);
            }
            else {
                s.attr('r', function (d) { return d.radius; });
            }
        });
    }
}

var Point = /** @class */ (function () {
    function Point(args) {
        this.xValue = args.xValue;
        this.yValue = args.yValue;
        this.category = args.category;
        this.categoryFormatted = args.categoryFormatted;
        this.radiusValue = args.radiusValue;
        this.styleClass = args.styleClass;
        this.key = args.key;
        this.center = args.center;
        this.radius = args.radius;
        this.color = args.color;
        this.colorValue = args.colorValue;
        this.labelData = args.label;
    }
    Point.prototype.getLabel = function () {
        if (!this.labelData)
            return [];
        return __assign(__assign({}, this.labelData), { x: this.getLabelX(), y: this.getLabelY(), marker: this, text: this.labelData.format(this, this.labelData.value) });
    };
    Point.prototype.getLabelX = function () {
        var _a = this.labelData, positionStrategyHorizontal = _a.positionStrategyHorizontal, offset = _a.offset;
        return positionStrategyHorizontal === 'left' ? this.center.x - this.radius - offset :
            positionStrategyHorizontal === 'right' ? this.center.x + this.radius + offset :
                this.center.x;
    };
    Point.prototype.getLabelY = function () {
        var _a = this.labelData, positionStrategyVertical = _a.positionStrategyVertical, offset = _a.offset;
        return positionStrategyVertical === 'top' ? this.center.y - this.radius - offset :
            positionStrategyVertical === 'bottom' ? this.center.y + this.radius + offset :
                this.center.y;
    };
    return Point;
}());

function createPoints(series, grouped) {
    var _a, _b;
    var _c = series.renderData, seriesKey = _c.key, keysActive = _c.keysActive, categories = _c.categories, x = _c.x, y = _c.y, color = _c.color, radii = _c.radii;
    var optionalColorValues = color === null || color === void 0 ? void 0 : color.axis.scaledValues;
    var optionalRadiiValues = typeof radii === 'object' && 'tag' in radii ? radii.axis.scaledValues : undefined;
    var pointsSingleGroup = [];
    var pointsGrouped = new Array(categories ? categories.categories.categoryArray.length : 1)
        .fill(0).map(function () { return []; });
    if (!keysActive[seriesKey] && !grouped)
        return pointsSingleGroup;
    if (!keysActive[seriesKey] && grouped)
        return pointsGrouped;
    for (var i = 0; i < x.values.length; i++) {
        if (categories && !categories.isValueActive(i))
            continue;
        if (!x.isValueActive(i) || !y.isValueActive(i) ||
            !((_a = optionalColorValues === null || optionalColorValues === void 0 ? void 0 : optionalColorValues.isValueActive(i)) !== null && _a !== void 0 ? _a : true) || !((_b = optionalRadiiValues === null || optionalRadiiValues === void 0 ? void 0 : optionalRadiiValues.isValueActive(i)) !== null && _b !== void 0 ? _b : true))
            continue;
        var point = createPoint(series, i);
        pointsSingleGroup.push(point);
        if (pointsGrouped && categories) {
            var category = categories.values[i];
            var order = categories.categories.categoryMap[category].order;
            pointsGrouped[order].push(point);
        }
        else
            pointsGrouped[0].push(point);
    }
    return (grouped === false) ? pointsSingleGroup : pointsGrouped;
}
function createPoint(series, i) {
    var _a;
    var renderData = series.renderData, responsiveState = series.responsiveState;
    var categories = renderData.categories, color = renderData.color, labels = renderData.labels;
    var category = categories === null || categories === void 0 ? void 0 : categories.values[i];
    return new Point(__assign(__assign({}, responsiveState.getPointCircle(i)), { xValue: responsiveState.horizontalVals().values[i], yValue: responsiveState.verticalVals().values[i], color: color === null || color === void 0 ? void 0 : color.scale(color === null || color === void 0 ? void 0 : color.values[i]), colorValue: color === null || color === void 0 ? void 0 : color.values[i], radiusValue: responsiveState.getRadiusValue(i), key: new Key(renderData.getCombinedKey(i) + " i-".concat(i)), styleClass: (_a = categories === null || categories === void 0 ? void 0 : categories.getStyleClass(i)) !== null && _a !== void 0 ? _a : defaultStyleClass, category: category, categoryFormatted: category ? categories === null || categories === void 0 ? void 0 : categories.categories.categoryMap[category].formatValue : undefined, label: labels === null || labels === void 0 ? void 0 : labels.getLabelData(i) }));
}

function renderPointSeries(parentS, series) {
    var classes = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        classes[_i - 2] = arguments[_i];
    }
    var _a = createSelectionClasses(classes), classString = _a.classString, selector = _a.selector;
    var seriesS = parentS.selectAll("".concat(selector, ".series-point"))
        .data(series)
        .join('g')
        .classed("".concat(classString, " series-point"), true)
        .attr('data-ignore-layout-children', true);
    var pointS = seriesS.selectAll('.point')
        .data(function (d) { return createPoints(d, false); }, function (d) { return d.key.rawKey; })
        .call(function (s) { return joinPointSeries(seriesS, s); });
    return { seriesS: seriesS, pointS: pointS };
}

var ScatterPlot = /** @class */ (function (_super) {
    __extends(ScatterPlot, _super);
    function ScatterPlot(windowSelection, data) {
        var _this = _super.call(this) || this;
        _this._windowS = windowSelection;
        _this.revalidate(data);
        return _this;
    }
    Object.defineProperty(ScatterPlot.prototype, "windowS", {
        get: function () {
            return this._windowS;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScatterPlot.prototype, "chartS", {
        get: function () {
            return ((this._chartS && !this._chartS.empty()) ? this._chartS :
                this.layouterS.selectAll('svg.chart'));
        },
        enumerable: false,
        configurable: true
    });
    ScatterPlot.prototype.renderContent = function () {
        var _a, _b, _c, _d, _e, _f;
        this.renderSeriesChartComponents();
        var series = this.chartS.datum().series.cloneToRenderData().applyFilter().applyZoom();
        var _g = renderPointSeries(this.drawAreaS, [series]), seriesS = _g.seriesS, pointS = _g.pointS;
        this.addAllSeriesFeatures(seriesS);
        seriesS.call(addSeriesHighlighting);
        this.drawAreaS.selectAll('.series-label')
            .attr('layout-strategy-horizontal', (_c = (_b = (_a = pointS.data()[0]) === null || _a === void 0 ? void 0 : _a.labelData) === null || _b === void 0 ? void 0 : _b.positionStrategyHorizontal) !== null && _c !== void 0 ? _c : null)
            .attr('layout-strategy-vertical', (_f = (_e = (_d = pointS.data()[0]) === null || _d === void 0 ? void 0 : _d.labelData) === null || _e === void 0 ? void 0 : _e.positionStrategyVertical) !== null && _f !== void 0 ? _f : null);
        this.renderCartesianComponents();
    };
    ScatterPlot.prototype.revalidate = function (data) {
        var initialWindowData = validateWindow(__assign(__assign({}, data), { type: 'point', renderer: this }));
        var chartData = validateScatterPlot(__assign(__assign({}, data), { renderer: this }));
        this.windowS.datum(__assign(__assign({}, initialWindowData), chartData));
    };
    return ScatterPlot;
}(Chart));
applyMixins(ScatterPlot, [CartesianChartMixin, DataSeriesChartMixin]);

var LineSeries = /** @class */ (function (_super) {
    __extends(LineSeries, _super);
    function LineSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LineSeries.prototype.cloneToRenderData = function () {
        this.renderData = clonePointSeriesData(this.originalData);
        return this;
    };
    LineSeries.prototype.applyZoom = function () {
        return _super.prototype.applyZoom.call(this);
    };
    LineSeries.prototype.applyFilter = function () {
        return _super.prototype.applyFilter.call(this);
    };
    LineSeries.prototype.applyInversion = function () {
        throw new Error("Method not implemented.");
    };
    return LineSeries;
}(PointSeries));

function validateLineChart(args) {
    var renderer = args.renderer, x = args.x, y = args.y, legend = args.legend, breakpoints = args.breakpoints, title = args.title, subTitle = args.subTitle;
    var series = new LineSeries(__assign(__assign({}, args.series), { key: 's-0', renderer: renderer }));
    var cartesianData = validateCartesianChart({ renderer: renderer, series: series, x: x, y: y, legend: legend, breakpoints: breakpoints, title: title, subTitle: subTitle });
    return __assign(__assign({}, cartesianData), { series: series });
}

function joinLineSeries(seriesS, joinS) {
    var tDurationString = cssVarFromSelection(seriesS, '--transition-time-line-enter-ms');
    var tDuration = tDurationString ? parseInt(tDurationString) : 250;
    joinS
        .join(function (enter) {
        return enter.append('path')
            .classed('element line', true)
            .call(function (s) {
            addCSSTransitionEnterClass(s, tDuration);
        })
            .call(function (s) { return seriesS.dispatch('enter', { detail: { selection: s } }); });
    }, function (update) { return update.call(function () {
        update.call(cancelExitClassOnUpdate);
    }); }, function (exit) {
        return exit.call(function (s) {
            addCSSTransitionExitClass(s, tDuration).on('end.Remove', function () {
                if (!select(this).classed('exit-done'))
                    return;
                exit.remove().call(function (s) { return seriesS.dispatch('exit', { detail: { selection: s } }); });
            });
        });
    })
        .each(function (line, i, g) { return lineToPath(g[i], line.positions); })
        .attr('data-style', function (d) { return d.styleClass; })
        .attr('data-key', function (d) { return d.key; })
        .call(function (s) { return seriesS.dispatch('update', { detail: { selection: s } }); })
        .on('pointerover.serieslinehighlight pointerout.serieslinehighlight', function (e) {
        return e.target.classList.toggle('highlight', e.type.endsWith('over'));
    });
}

function renderLineSeries(parentS, series) {
    var classes = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        classes[_i - 2] = arguments[_i];
    }
    var _a = createSelectionClasses(classes), classString = _a.classString, selector = _a.selector;
    var seriesS = parentS
        .selectAll("".concat(selector, ".series-line"))
        .data(series)
        .join('g')
        .classed("".concat(classString, " series-line"), true)
        .attr('data-ignore-layout-children', true);
    var createSelection = function (type) {
        return seriesS
            .selectAll(".series-".concat(type))
            .data(function (d) { return [d]; })
            .join('g')
            .classed("series-".concat(type), true);
    };
    seriesS.each(function (d) {
        var lineS = createSelection('line-line');
        var pointS = createSelection('line-point');
        var pointGroups = createPoints(d, true);
        renderPointSubSeries(pointS, pointGroups);
        renderLineSubSeries(lineS, pointGroups);
    });
    var lineSeriesS = seriesS.selectAll('.series-line-line');
    var lineS = lineSeriesS.selectAll('.line');
    var pointSeriesS = seriesS.selectAll('.series-line-point');
    var pointS = pointSeriesS.selectAll('.point');
    return { seriesS: seriesS, lineSeriesS: lineSeriesS, lineS: lineS, pointSeriesS: pointSeriesS, pointS: pointS };
}
function renderPointSubSeries(pointS, pointGroups) {
    pointS.selectAll('.point-category')
        .data(pointGroups)
        .join('g')
        .classed('point-category', true)
        .selectAll('.point')
        .data(function (d) { return d; }, function (d) { return d.key.rawKey; })
        .call(function (s) { return joinPointSeries(pointS, s); });
}
function renderLineSubSeries(seriesS, pointGroups) {
    var renderData = seriesS.datum().renderData;
    var categoryKeys = renderData.getMergedKeys();
    var keySelectors = categoryKeys.length > 0 ?
        categoryKeys.map(function (key) { return combineKeys([renderData.key, key]); }) : [renderData.key];
    var lines = keySelectors.map(function (key, i) {
        var _a, _b;
        return ({
            key: key,
            positions: pointGroups[i].map(function (point) { return point.center; }),
            styleClass: (_b = (_a = pointGroups[i][0]) === null || _a === void 0 ? void 0 : _a.styleClass) !== null && _b !== void 0 ? _b : defaultStyleClass
        });
    }).filter(function (line) { return line.positions.length !== 0; });
    seriesS.selectAll('path')
        .data(lines, function (d) { return d.key; })
        .call(function (s) { return joinLineSeries(seriesS, s); });
}

var LineChart = /** @class */ (function (_super) {
    __extends(LineChart, _super);
    function LineChart(windowSelection, data) {
        var _this = _super.call(this) || this;
        _this._windowS = windowSelection;
        _this.revalidate(data);
        return _this;
    }
    Object.defineProperty(LineChart.prototype, "windowS", {
        get: function () { return this._windowS; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LineChart.prototype, "chartS", {
        get: function () {
            return ((this._chartS && !this._chartS.empty()) ? this._chartS :
                this.layouterS.selectAll('svg.chart'));
        },
        enumerable: false,
        configurable: true
    });
    LineChart.prototype.renderContent = function () {
        var _a, _b, _c, _d, _e, _f;
        this.renderSeriesChartComponents();
        var series = this.chartS.datum().series.cloneToRenderData().applyFilter().applyZoom();
        var _g = renderLineSeries(this.drawAreaS, [series]), lineSeriesS = _g.lineSeriesS, pointSeriesS = _g.pointSeriesS, pointS = _g.pointS;
        this.addAllSeriesFeatures(pointSeriesS);
        lineSeriesS.call(addSeriesHighlighting);
        this.drawAreaS.selectAll('.series-label')
            .attr('layout-strategy-horizontal', (_c = (_b = (_a = pointS.data()[0]) === null || _a === void 0 ? void 0 : _a.labelData) === null || _b === void 0 ? void 0 : _b.positionStrategyHorizontal) !== null && _c !== void 0 ? _c : null)
            .attr('layout-strategy-vertical', (_f = (_e = (_d = pointS.data()[0]) === null || _d === void 0 ? void 0 : _d.labelData) === null || _e === void 0 ? void 0 : _e.positionStrategyVertical) !== null && _f !== void 0 ? _f : null);
        this.renderCartesianComponents();
    };
    LineChart.prototype.revalidate = function (data) {
        var initialWindowData = validateWindow(__assign(__assign({}, data), { type: 'line', renderer: this }));
        var chartData = validateLineChart(__assign(__assign({}, data), { renderer: this }));
        this.windowS.datum(__assign(__assign({}, initialWindowData), chartData));
    };
    return LineChart;
}(Chart));
applyMixins(LineChart, [DataSeriesChartMixin, CartesianChartMixin]);

var checkSVGRaw = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"#2c3e50\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\r\n    <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/>\r\n    <path d=\"M5 12l5 5l10 -10\" />\r\n</svg>\r\n";

function onDragAxisParcoord(e, d, drawAreaBackgroundS) {
    if (!(e.sourceEvent instanceof MouseEvent || e.sourceEvent instanceof TouchEvent))
        return;
    var dragWay = relateDragWayToSelection(e.sourceEvent, drawAreaBackgroundS);
    if (!dragWay)
        return;
    var originalData = d.series.originalData;
    var percentageDomain = originalData.axesPercentageScale.domain();
    var axisIndex = percentageDomain.indexOf(d.key);
    var percentageRange = originalData.axesPercentageScale.range();
    var oldPercentage = percentageRange[axisIndex];
    var newPercentage = d.series.responsiveState.currentlyFlipped ? 1 - dragWay.fromTopPercent : dragWay.fromLeftPercent;
    rearrangeAxesWithEqualPercentage();
    percentageRange[axisIndex] = newPercentage;
    originalData.axesPercentageScale.range(percentageRange);
    function rearrangeAxesWithEqualPercentage() {
        percentageRange.forEach(function (currP, currPI) {
            if (!(currP === newPercentage && currPI !== axisIndex))
                return;
            percentageRange[currPI] = currP + (oldPercentage > newPercentage ? 0.01 : -0.01);
        });
    }
}
function onDragEndAxisParcoord(d) {
    var _a = d.series, renderer = _a.renderer, originalData = _a.originalData;
    var axesPercentageScale = originalData.axesPercentageScale;
    var equidistantAxesActive = renderer.windowS.datum().settings.get('parcoordEquidistantAxes');
    if (!equidistantAxesActive)
        return;
    var percentageRange = axesPercentageScale.range();
    var order = RVArray.mapToRanks(percentageRange);
    var newPercentageRange = order.map(function (eOrder) { return (eOrder - 1) / (order.length - 1); });
    axesPercentageScale.range(newPercentageRange);
    renderer.windowS.dispatch('resize');
}

function renderTool(toolbarS, series) {
    var dialogS = toolbarS.selectAll('.dialog--center.dialog--chart');
    equidistantAxesOptionsRender(dialogS, series).call(renderInputLabels);
    confirmButtonRender(dialogS, series);
}
function equidistantAxesOptionsRender(selection, series) {
    var _a;
    var settings = series.renderer.windowS.datum().settings;
    var onChange = function (e, type) {
        settings.setDeferred(type, e.target.checked);
        // windowSettings[type] = (e.target as HTMLInputElement).checked
    };
    var defaultVal = (_a = settings.snapshot['parcoordEquidistantAxes']) !== null && _a !== void 0 ? _a : settings.get('parcoordEquidistantAxes');
    var data = [{
            legend: 'Parallel Coordinates Settings',
            labelData: [new CheckBoxLabel({
                    label: 'Equidistant Axes',
                    type: windowSettingsKeys.parcoordEquidistantAxes,
                    defaultVal: defaultVal,
                    onChange: onChange,
                })
            ]
        }];
    return renderFieldset(selection, data, 'item', 'item--parcoord-settings');
}
function confirmButtonRender(selection, series) {
    var buttonS = selection
        .selectAll('.button--icon.button--confirm')
        .data([null])
        .join('button')
        .classed('button--icon button--confirm', true)
        .on('click.confirm', function () {
        var _a;
        series.renderer.windowS.datum().settings.update();
        (_a = select(this.closest('dialog')).datum()) === null || _a === void 0 ? void 0 : _a.triggerExit();
        onDragEndAxisParcoord(series.renderData.axes[0]);
    });
    buttonS.selectAll('span')
        .data([null])
        .join("span")
        .text('Ok');
    renderSVGSeries(buttonS, [checkSVGRaw]);
}

function validateKeyedAxis(args) {
    var keysActive = {};
    keysActive[args.key] = true;
    var axis = __assign(__assign({}, validateBaseAxis(args)), { originalAxis: this, series: args.series, key: args.key, keysActive: keysActive, upperRangeLimitPercent: 1, lowerRangeLimitPercent: 0, setKeyActiveIfDefined: function (key, value) {
            if (this.keysActive[key] !== undefined)
                this.keysActive[key] = value;
        }, isKeyActiveByKey: function (key) {
            // noinspection PointlessBooleanExpressionJS
            return this.keysActive[key] !== false;
        }, isValueInRangeLimit: function (val) {
            var _this = this;
            var _a = this.series.renderData, axes = _a.axes, axesInverted = _a.axesInverted;
            var axisIndex = axes.findIndex(function (axis) { return axis.key === _this.key; });
            var flipped = this.series.responsiveState.currentlyFlipped;
            var inverted = axesInverted[axisIndex];
            var scaledValues = this.scaledValues;
            var range = scaledValues.scale.range();
            if (flipped) {
                var rangeMax_1 = inverted ? range[0] : range[1];
                var maxRangeGraphical_1 = rangeMax_1 * this.upperRangeLimitPercent;
                var minRangeGraphical_1 = rangeMax_1 * this.lowerRangeLimitPercent;
                return val >= minRangeGraphical_1 && val <= maxRangeGraphical_1;
            }
            var rangeMax = inverted ? range[1] : range[0];
            var maxRangeGraphical = rangeMax - rangeMax * this.upperRangeLimitPercent;
            var minRangeGraphical = rangeMax - rangeMax * this.lowerRangeLimitPercent;
            return val <= minRangeGraphical && val >= maxRangeGraphical;
        } });
    axis.originalAxis = axis;
    return axis;
}

function validateParcoordSeriesArgs(args, series) {
    var axes = args.dimensions.map(function (dimension, index) {
        return validateKeyedAxis(__assign(__assign({}, dimension.axis), { renderer: args.renderer, series: series, scaledValues: validateScaledValuesSpatial(dimension.scaledValues, "a-".concat(index)), key: "a-".concat(index) }));
    });
    if (axes.length === 1)
        throw new Error(ErrorMessages.parcoordMinAxesCount);
    var categories = undefined;
    if (args.categories) {
        var alignedCategories = __assign(__assign({}, args.categories), { values: RVArray.equalizeLengths(args.categories.values, axes[0].scaledValues.values)[0] });
        categories = new ScaledValuesCategorical(__assign(__assign({}, alignedCategories), { parentKey: 's-0' }));
    }
    if (categories && categories.values.length !== axes[0].scaledValues.values.length) {
        throw new Error(ErrorMessages.categoricalValuesMismatch);
    }
    var denominator = axes.length > 1 ? axes.length - 1 : 1;
    var data = __assign(__assign({}, validateDataSeriesArgs(args, series)), { axes: axes, axesPercentageScale: ordinal()
            .domain(axes.map(function (axis) { return axis.key; })).range(axes.map(function (axis, index) { return index / denominator; })), percentageScreenScale: linear().domain([0, 1]), zooms: args.dimensions.map(function (dimension) {
            return dimension.zoom ? validateZoom(dimension.zoom) : undefined;
        }), axesInverted: axes.map(function () { return false; }), getCombinedKey: function (i) {
            var seriesCategoryKey = this.categories ? this.categories.getCategoryData(i).combinedKey : undefined;
            return combineKeys([this.key, this.axes[i].key, seriesCategoryKey]);
        } });
    if (data.color && data.color.values.length !== axes[0].scaledValues.values.length) {
        throw new Error(ErrorMessages.sequentialColorValuesMismatch);
    }
    return data;
}
function cloneParcoordData(original) {
    return __assign(__assign({}, original), { axes: original.axes.map(function (axis) {
            return __assign(__assign({}, axis), { scaledValues: axis.scaledValues.clone() });
        }), axesPercentageScale: original.axesPercentageScale.copy(), percentageScreenScale: original.percentageScreenScale.copy() });
}

var ParcoordResponsiveState = /** @class */ (function (_super) {
    __extends(ParcoordResponsiveState, _super);
    function ParcoordResponsiveState(args) {
        var _this = _super.call(this, args) || this;
        _this._series = args.series;
        _this._axisLayout = _this.currentlyFlipped ? 'bottom' : 'left';
        return _this;
    }
    Object.defineProperty(ParcoordResponsiveState.prototype, "axisLayout", {
        get: function () {
            return this._axisLayout;
        },
        enumerable: false,
        configurable: true
    });
    ParcoordResponsiveState.prototype.getAxisPosition = function (key) {
        var _a;
        var _b = this._series.renderData, axesPercentageScale = _b.axesPercentageScale, percentageScreenScale = _b.percentageScreenScale;
        var percentage = (_a = axesPercentageScale(key)) !== null && _a !== void 0 ? _a : 0;
        return this.currentlyFlipped ? { x: 0, y: percentageScreenScale(percentage) } : {
            x: percentageScreenScale(percentage),
            y: 0
        };
    };
    ParcoordResponsiveState.prototype.update = function () {
        this.updateZoomOnFlip();
        _super.prototype.update.call(this);
        this.updateScales();
    };
    ParcoordResponsiveState.prototype.updateScales = function () {
        var _a = this.drawAreaRange(), horizontal = _a.horizontal, vertical = _a.vertical;
        var currentAxesSpaceRange = this.currentlyFlipped ? vertical : horizontal;
        this._axisLayout = this.currentlyFlipped ? 'bottom' : 'left';
        var orientation = this.currentlyFlipped ? 'horizontal' : 'vertical';
        var _b = this._series.originalData, axes = _b.axes, percentageScreenScale = _b.percentageScreenScale;
        axes.forEach(function (axis) { return axis.scaledValues.updateRange(horizontal, vertical, orientation); });
        percentageScreenScale.range(currentAxesSpaceRange);
    };
    ParcoordResponsiveState.prototype.updateZoomOnFlip = function () {
        if (this._previouslyFlipped === this._currentlyFlipped)
            return;
        this._series.originalData.zooms.forEach(function (zoom) {
            if (!(zoom === null || zoom === void 0 ? void 0 : zoom.currentTransform) || zoom.currentTransform.k === 1)
                return;
            // const t = zoom.currentTransform
            // reset zoom on flipping. TODO: Desired would be a rescaling from x to y and vice versa
            zoom.currentTransform = new Transform(1, 0, 0);
        });
    };
    return ParcoordResponsiveState;
}(ResponsiveState));

var ParcoordSeries = /** @class */ (function () {
    function ParcoordSeries(args) {
        this.renderer = args.renderer;
        this.originalData = validateParcoordSeriesArgs(args, this);
        this.renderData = this.originalData;
        this.responsiveState = new ParcoordResponsiveState({
            series: this,
            flipped: args.flipped,
        });
    }
    ParcoordSeries.prototype.getAxesDragDropOrdered = function () {
        var _a = this.renderData, axes = _a.axes, axesPercentageScale = _a.axesPercentageScale;
        return __spreadArray([], __read(axes), false).sort(function (axis1, axis2) {
            return axesPercentageScale(axis1.key) < axesPercentageScale(axis2.key) ? -1 : 1;
        });
    };
    ParcoordSeries.prototype.getScaledValuesAtScreenPosition = function (x, y) {
        var _a, _b;
        var activeSeries = this.applyFilter();
        var _c = activeSeries.renderData, axes = _c.axes, axesPercentageScale = _c.axesPercentageScale, percentageScreenScale = _c.percentageScreenScale;
        var chartS = axes[0].renderer.chartS;
        var flipped = this.responsiveState.currentlyFlipped;
        var axisPosition = flipped ? y : x;
        var dimensionPosition = flipped ? x : y;
        function axisDiff(axis) {
            var currentAxisPosition = percentageScreenScale(axesPercentageScale(axis.key));
            return Math.abs(currentAxisPosition - axisPosition);
        }
        var axis = axes.reduce(function (prev, current) {
            var currentDiff = axisDiff(current);
            return currentDiff < prev.diff ? {
                axis: current, diff: currentDiff
            } : prev;
        }, { axis: axes[0], diff: axisDiff(axes[0]) }).axis;
        var scaleFormat = axis.scaledValues.tag !== 'categorical' ? axis.scaledValues.scale.tickFormat() : (function (val) { return val; });
        var format = (_b = (_a = axis.d3Axis) === null || _a === void 0 ? void 0 : _a.tickFormat()) !== null && _b !== void 0 ? _b : scaleFormat;
        var axisName = getCurrentResponsiveValue(axis.title, { chart: chartS });
        var dimensionValue = axis.scaledValues.atScreenPosition(dimensionPosition);
        var dimensionValueFormatted = format(dimensionValue, 0);
        return {
            horizontal: flipped ? dimensionValueFormatted : axisName,
            horizontalName: flipped ? axisName : 'Dimension',
            horizontalNearestRealValue: flipped ? axis.scaledValues.getNearestValue(dimensionValue) : axisName,
            horizontalScreenValue: flipped ? dimensionValue : axisName,
            vertical: flipped ? axisName : dimensionValueFormatted,
            verticalName: flipped ? 'Dimension' : axisName,
            verticalNearestRealValue: flipped ? axisName : axis.scaledValues.getNearestValue(dimensionValue),
            verticalScreenValue: flipped ? axisName : dimensionValue,
        };
    };
    ParcoordSeries.prototype.renderTool = function (toolbarS) {
        renderTool(toolbarS, this);
    };
    ParcoordSeries.prototype.cloneToRenderData = function () {
        this.renderData = cloneParcoordData(this.originalData);
        return this;
    };
    ParcoordSeries.prototype.applyFilter = function () {
        var _a = this.renderData, axes = _a.axes, axesPercentageScale = _a.axesPercentageScale, zooms = _a.zooms, axesInverted = _a.axesInverted, keysActive = _a.keysActive, key = _a.key;
        var activeIndices = !keysActive[key] ? [] : axes.map(function (_, index) { return index; })
            .filter(function (index) { return axes[index].isKeyActiveByKey(axes[index].key); });
        var activeAxes = activeIndices.map(function (index) { return axes[index]; });
        activeAxes.forEach(function (axis) { return axis.scaledValues = axis.scaledValues.cloneFiltered(); });
        var activeDomain = activeAxes.map(function (axis) { return axis.key; });
        var activeRange = activeAxes.map(function (axis) { return axesPercentageScale(axis.key); });
        this.renderData = __assign(__assign({}, this.renderData), { axes: activeAxes, zooms: activeIndices.map(function (index) { return zooms[index]; }), axesInverted: activeIndices.map(function (index) { return axesInverted[index]; }) });
        this.renderData.axesPercentageScale
            .domain(activeDomain)
            .range(activeRange);
        if (this.renderData.axes.length === 1)
            throw new Error(ErrorMessages.parcoordMinAxesCount);
        return this;
    };
    ParcoordSeries.prototype.applyZoom = function () {
        var _a = this.renderData, axes = _a.axes, zooms = _a.zooms;
        var zoomDirection = this.responsiveState.currentlyFlipped ? 'x' : 'y';
        this.renderData.axes = axes.map(function (axis, index) {
            var zoom = zooms[index];
            if (!zoom)
                return axis;
            return __assign(__assign({}, axis), { scaledValues: axis.scaledValues.cloneZoomed(zoom.currentTransform, zoomDirection) });
        });
        return this;
    };
    ParcoordSeries.prototype.applyInversion = function () {
        var _a = this.renderData, axes = _a.axes, axesInverted = _a.axesInverted;
        this.renderData.axes = axes.map(function (axis, index) {
            if (!axesInverted[index])
                return axis;
            return __assign(__assign({}, axis), { scaledValues: axis.scaledValues.cloneRangeInversed() });
        });
        return this;
    };
    return ParcoordSeries;
}());

function validateParcoordChart(args) {
    var renderer = args.renderer;
    var series = new ParcoordSeries(__assign(__assign({}, args.series), { renderer: renderer, key: 's-0' }));
    return __assign({ getAxes: function () { return this.series.originalData.axes; }, getSeries: function () { return [this.series]; }, getMainSeries: function () { return this.series; }, series: series, legend: validateLegend(__assign(__assign({}, args.legend), { renderer: renderer, series: series })) }, validateChart(args));
}

function renderParcoordLineSeries(seriesS) {
    seriesS.selectAll('path')
        .data(function (d) { return createLines(d.getAxesDragDropOrdered()); }, function (d) { return d.key; })
        .call(function (s) { return joinLineSeries(seriesS, s); });
}
function createLines(activeAxes) {
    var lines = [];
    if (activeAxes.length === 0)
        return lines;
    var series = activeAxes[0].series;
    var _a = series.renderData, keysActive = _a.keysActive, categories = _a.categories, key = _a.key;
    var maxIndex = activeAxes[0].scaledValues.values.length;
    if (!keysActive[key])
        return lines;
    for (var valueIndex = 0; valueIndex < maxIndex; valueIndex++) {
        if (categories && !categories.isValueActive(valueIndex))
            continue;
        var positions = createLinePositions(activeAxes, valueIndex, series);
        if (positions.length === 0)
            continue;
        var categoryKey = categories === null || categories === void 0 ? void 0 : categories.getCombinedKey(valueIndex);
        lines.push({
            key: combineKeys(__spreadArray(__spreadArray([key], __read((categoryKey ? [categoryKey] : [])), false), ["i-".concat(valueIndex)], false)),
            styleClass: categories ? categories.getStyleClass(valueIndex) : defaultStyleClass,
            positions: positions
        });
    }
    return lines;
}
function createLinePositions(activeAxes, valueIndex, series) {
    var positions = [];
    var flipped = series.responsiveState.currentlyFlipped;
    for (var axisIndex = 0; axisIndex < activeAxes.length; axisIndex++) {
        var axis = activeAxes[axisIndex];
        var valPos = axis.scaledValues.getScaledValue(valueIndex);
        if (!axis.scaledValues.isValueActive(valueIndex) || !axis.isValueInRangeLimit(valPos))
            return [];
        var axisPosPercent = series.originalData.axesPercentageScale(axis.key);
        var axisPosReal = series.renderData.percentageScreenScale(axisPosPercent);
        //TODO: check if should be otherwise
        // const axisPosReal = series.percentageScreenScale(axisPosPercent)
        positions.push({
            y: flipped ? axisPosReal : valPos,
            x: flipped ? valPos : axisPosReal
        });
    }
    return positions;
}

function onZoomAxis(e, d) {
    var transform = e.transform;
    var _a = d.series.originalData, axes = _a.axes, zooms = _a.zooms;
    var axisIndex = axes.findIndex(function (axis) { return axis.key === d.key; });
    var zoom = zooms[axisIndex];
    if (!zoom)
        return;
    zoom.currentTransform = transform;
    zoom.currentTransform = (e.sourceEvent.type === "mousemove" && e.transform.k === 1) ? identity : transform;
    var _b = d.series.responsiveState.drawAreaRange(), horizontal = _b.horizontal, verticalInverted = _b.verticalInverted;
    var extent = [
        [horizontal[0], verticalInverted[0]],
        [horizontal[1], verticalInverted[1]],
    ];
    zoom.behaviour.extent(extent).translateExtent(extent);
}

function setUpAxisZoom(axisS, i) {
    var axisD = axisS.datum();
    var zoomB = axisD.series.renderData.zooms[i];
    if (!zoomB)
        return;
    var throttledZoom = throttle(function (e) { return onZoomAxis(e, axisD); }, 30);
    var onZoom = function (e) {
        if (e.sourceEvent.type === "dblclick")
            return;
        throttledZoom.func(e);
        axisD.series.renderer.windowS.dispatch('resize');
    };
    var onZoomEnd = function (e) {
        if (e.sourceEvent.type === "mouseup") {
            onDragEndAxisParcoord(axisD);
        }
    };
    axisS.call(zoomB.behaviour.scaleExtent([zoomB.out, zoomB.in])
        .on('zoom.zoomAndDrag', onZoom)
        .on('end.zoomAndDrag', onZoomEnd));
}

function pathChevronRender(selection, classes, data) {
    var _a = createSelectionClasses(classes), selector = _a.selector, classString = _a.classString;
    var group = selection.selectAll(selector)
        .data([null])
        .join('g')
        .classed(classString, true)
        .attr('data-ignore-layout-children', true);
    group.selectAll('path')
        .data(data !== null && data !== void 0 ? data : [{ type: "right", scale: 1 }])
        .join('path')
        .attr('d', function (d) { return d.type === 'right' ?
        pathScale("M0,0 l6,6 l-6,6 l0,-12", d.scale) :
        pathScale("M0,0 l6,6 l6,-6 l-12,0", d.scale); }).attr('stroke-width', 1.5)
        .attr('fill', 'none')
        .attr('stroke-linecap', 'round')
        .attr('stroke-linejoin', 'round')
        .attr('stroke', '#2c3e50')
        .attr('pointer-events', 'none');
    // M6,0.8 l6,6 l6,-6
    return group;
}
function pathScale(d, scale) {
    var numberPattern = /[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?/g;
    return d.replace(numberPattern, function (match) {
        return (parseFloat(match) * scale).toString();
    });
}

function renderAxisLimiter(axisS) {
    axisS.each(function (d, i, g) {
        select(g[i])
            .call(renderChevronLimiter)
            .call(renderRectLimiter)
            .call(alignLimiters)
            .call(addLimiterDrag);
    });
}
function renderChevronLimiter(axisS) {
    var flipped = axisS.datum().series.responsiveState.currentlyFlipped;
    var direction = (flipped ? 'right' : 'down');
    var upperChevronS = pathChevronRender(axisS, ['slider-up'], [{ type: direction, scale: 1 }]);
    renderBgSVGOnlyBBox(upperChevronS, [{ scale: 4 }], upperChevronS.select('path'))
        .classed('cursor', true)
        .classed('cursor--range-vertical', !flipped)
        .classed('cursor--range-horizontal cursor--range-left', flipped);
    var lowerChevronS = pathChevronRender(axisS, ['slider-down'], [{ type: direction, scale: 1 }]);
    renderBgSVGOnlyBBox(lowerChevronS, [{ scale: 4 }], lowerChevronS.select('path'))
        .classed('cursor', true)
        .classed('cursor--range-horizontal ', flipped)
        .classed('cursor--range-vertical cursor--range-up', !flipped);
}
function renderRectLimiter(axisS) {
    var axisD = axisS.datum();
    if (!axisD)
        return;
    var flipped = axisD.series.responsiveState.currentlyFlipped;
    var rectLimiterDragable = axisD.upperRangeLimitPercent < 1 || axisD.lowerRangeLimitPercent > 0;
    axisS.selectAll('.slider-rect')
        .data([null])
        .join('rect')
        .classed('slider-rect', true)
        .classed('cursor cursor--range-rect', rectLimiterDragable)
        .classed('cursor--range-rect-horizontal', flipped);
}
function alignLimiters(axisS) {
    var _a, _b;
    var _c = axisS.datum(), upperRangeLimitPercent = _c.upperRangeLimitPercent, lowerRangeLimitPercent = _c.lowerRangeLimitPercent, scaledValues = _c.scaledValues, series = _c.series;
    var upperChevronS = axisS.selectAll('.slider-up');
    var lowerChevronS = axisS.selectAll('.slider-down');
    var rectLimiterS = axisS.selectAll('.slider-rect');
    var domainS = axisS.select('.domain');
    var _d = bboxDiffSVG(domainS, upperChevronS.select('path')), leftCornersXDiff = _d.leftCornersXDiff, leftCornersYDiff = _d.leftCornersYDiff, bboxPath = _d.bbox2, bboxDomain = _d.bbox1;
    if (series.responsiveState.currentlyFlipped) {
        var upperRange = scaledValues.getRangeByPercent(upperRangeLimitPercent, false, 'horizontal');
        var lowerRange = scaledValues.getRangeByPercent(lowerRangeLimitPercent, false, 'horizontal');
        var translateAlign = "translate(".concat(-leftCornersXDiff - bboxPath.width, ", ").concat(-leftCornersYDiff - bboxPath.height / 2, ")");
        var mirrorXLower = "scale(-1, 1)";
        var translateXUpper = "translate(".concat(-upperRange, ")");
        var translateXLower = "translate(".concat(lowerRange, ")");
        upperChevronS.attr('transform', "".concat(mirrorXLower, " ").concat(translateAlign, " ").concat(translateXUpper));
        lowerChevronS.attr('transform', "".concat(translateAlign, " ").concat(translateXLower));
        var rectLimiterBreadthString = (_a = cssVarFromSelection(rectLimiterS, '--rect-slider-breadth')) !== null && _a !== void 0 ? _a : '30';
        var rectLimiterBreadth = parseInt(rectLimiterBreadthString);
        rectLimiterS
            .attr('x', lowerRange)
            .attr('width', upperRange - lowerRange)
            .attr('y', -1 * rectLimiterBreadth / 2)
            .attr('height', rectLimiterBreadth);
    }
    else {
        var translateX = -leftCornersXDiff + bboxDomain.width - bboxPath.width / 2;
        var upperRange = scaledValues.getRangeByPercent(upperRangeLimitPercent, false, 'vertical');
        var translateYUpper = upperRange - bboxPath.height;
        var lowerRange = scaledValues.getRangeByPercent(lowerRangeLimitPercent, false, 'vertical');
        var translateYLower = lowerRange + bboxPath.height;
        var mirrorYLower = "scale(1, -1)";
        upperChevronS.attr('transform', "translate(".concat(translateX, ", ").concat(translateYUpper, ")"));
        lowerChevronS.attr('transform', "translate(".concat(translateX, ", ").concat(translateYLower, ") ").concat(mirrorYLower));
        var rectLimiterBreadthString = (_b = cssVarFromSelection(rectLimiterS, '--rect-slider-breadth')) !== null && _b !== void 0 ? _b : '30';
        var rectLimiterBreadth = parseInt(rectLimiterBreadthString);
        rectLimiterS
            .attr('x', -1 * rectLimiterBreadth / 2)
            .attr('width', rectLimiterBreadth)
            .attr('y', upperRange)
            .attr('height', lowerRange - upperRange);
    }
}
function addLimiterDrag(axisS) {
    var _a = axisS.datum().series, originalData = _a.originalData, renderer = _a.renderer, responsiveState = _a.responsiveState;
    var axes = originalData.axes;
    var axisD = axes.find(function (axis) { return axis.key === axisS.datum().key; });
    if (!axisD)
        return;
    var upperChevronBackgroundS = axisS.selectAll('.slider-up').selectAll(".".concat(backgroundSVGOnly));
    var lowerChevronBackgroundS = axisS.selectAll('.slider-down').selectAll(".".concat(backgroundSVGOnly));
    var rectLimiterS = axisS.selectAll('.slider-rect');
    function getPercent(e) {
        if (!(e.sourceEvent instanceof MouseEvent || e.sourceEvent instanceof TouchEvent))
            return;
        var dragDown = relateDragWayToSelection(e.sourceEvent, renderer.drawAreaBgS);
        if (dragDown === undefined)
            return undefined;
        return responsiveState.currentlyFlipped ? dragDown.fromLeftPercent : 1 - dragDown.fromTopPercent;
    }
    function getPercentDiff(e) {
        var dragDown = relateDragWayToSelectionByDiff(e, renderer.drawAreaBgS);
        if (dragDown === undefined)
            return undefined;
        return responsiveState.currentlyFlipped ? dragDown.dxRelative : -dragDown.dyRelative;
    }
    var onDrag = function (e, limit) {
        var onUpperLower = function () {
            var percent = getPercent(e);
            if (percent === undefined)
                return;
            if (limit === 'upper') {
                axisD.upperRangeLimitPercent = calcLimited(percent, axisD.lowerRangeLimitPercent, 1);
            }
            if (limit === 'lower') {
                axisD.lowerRangeLimitPercent = calcLimited(percent, 0, axisD.upperRangeLimitPercent);
            }
        };
        var onRect = function () {
            var percentDiff = getPercentDiff(e);
            if (percentDiff === undefined)
                return;
            var appliedDiff = calcLimited(percentDiff, -axisD.lowerRangeLimitPercent, 1 - axisD.upperRangeLimitPercent);
            axisD.upperRangeLimitPercent += appliedDiff;
            axisD.lowerRangeLimitPercent += appliedDiff;
        };
        limit === 'rect' ? onRect() : onUpperLower();
        renderer.windowS.dispatch('resize');
    };
    var throttledDrag = throttle(onDrag, 25);
    function setUpUpperLimiterDrag() {
        if (hasDrag(upperChevronBackgroundS))
            return;
        upperChevronBackgroundS.call(drag()
            .on("drag.dragAxisLimitUpper", function (e) { return throttledDrag.func(e, 'upper'); })
            .on("end.dragAxisLimitUpper", function (e) { return onDrag(e, 'upper'); }));
    }
    function setUpLowerLimiterDrag() {
        if (hasDrag(lowerChevronBackgroundS))
            return;
        lowerChevronBackgroundS.call(drag()
            .on("drag.dragAxisLimitLower", function (e) { return throttledDrag.func(e, 'lower'); })
            .on("end.dragAxisLimitLower", function (e) { return onDrag(e, 'lower'); }));
    }
    function setUpRectLimiterDrag() {
        if (hasDrag(rectLimiterS))
            return;
        rectLimiterS.call(drag()
            .on("drag.dragAxisLimitRect", function (e) { return throttledDrag.func(e, 'rect'); })
            .on("end.dragAxisLimitRect", function (e) { return onDrag(e, 'rect'); }));
    }
    setUpUpperLimiterDrag();
    setUpLowerLimiterDrag();
    setUpRectLimiterDrag();
}

var ArrowUpNarrowSVG = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 12 19\" stroke-width=\"1.5\" stroke=\"#2c3e50\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\r\n    <path d=\"M1 7l5 -6l5 6l-10 0\" fill=\"#2c3e50\"/>\r\n    <path d=\"M6 8l0 10\" />\r\n</svg>\r\n";

function renderAxisInverter(axisS) {
    var series = axisS.datum().series;
    var flipped = series.responsiveState.currentlyFlipped;
    if (flipped)
        renderAxisInverterVerticalChart(axisS);
    else
        renderAxisInverterHorizontalChart(axisS);
}
function renderAxisInverterVerticalChart(axisS) {
    var _a = axisS.datum().series, renderer = _a.renderer, originalData = _a.originalData;
    var axes = originalData.axes, axesInverted = originalData.axesInverted;
    axisS.selectAll('.title-wrapper .axis-inverter').remove();
    var inverterIconS = renderSVGArrowNarrowUp(axisS, ['axis-inverter', 'axis-inverter-horizontal'])
        .classed('layout-container', true);
    var inverterIconBgS = renderBgSVGOnlyBBox(inverterIconS, [{ scale: 1.6 }], inverterIconS);
    var axisIndex = axes.findIndex(function (axis) { return axis.key === axisS.datum().key; });
    axisS.classed('axis-inverted', axesInverted[axisIndex]);
    inverterIconBgS
        .classed('cursor cursor--invert-horizontal', true)
        .classed('cursor--invert-right', axesInverted[axisIndex])
        .on('click', function () {
        var axisIndex = axes.findIndex(function (axis) { return axis.key === axisS.datum().key; });
        axesInverted[axisIndex] = !axesInverted[axisIndex];
        axisS.classed('axis-inverted', axesInverted[axisIndex]);
        inverterIconBgS.classed('cursor--invert-right', axesInverted[axisIndex]);
        renderer.windowS.dispatch('resize');
        setTimeout(function () {
            renderer.windowS.dispatch('resize');
        }, 500);
    });
}
function renderAxisInverterHorizontalChart(axisS) {
    var _a = axisS.datum().series, renderer = _a.renderer, originalData = _a.originalData;
    var axes = originalData.axes, axesInverted = originalData.axesInverted;
    axisS.selectChildren('.axis-inverter').remove();
    var titleWrapperS = axisS.selectAll('.title-wrapper');
    var subtitleS = titleWrapperS.selectAll('.subtitle');
    var inverterIconParentS = subtitleS.empty() ? titleWrapperS : subtitleS;
    var inverterIconS = renderSVGArrowNarrowUp(inverterIconParentS, ['axis-inverter']);
    var inverterIconBgS = renderBgSVGOnlyBBox(inverterIconS, [{ scale: 1.6 }], inverterIconS);
    var axisIndex = axes.findIndex(function (axis) { return axis.key === axisS.datum().key; });
    axisS.classed('axis-inverted', axesInverted[axisIndex]);
    inverterIconBgS
        .classed('cursor cursor--invert-vertical', true)
        .classed('cursor--invert-up', axesInverted[axisIndex])
        .on('click', function () {
        var axisIndex = axes.findIndex(function (axis) { return axis.key === axisS.datum().key; });
        axesInverted[axisIndex] = !axesInverted[axisIndex];
        axisS.classed('axis-inverted', axesInverted[axisIndex]);
        inverterIconBgS.classed('cursor--invert-up', axesInverted[axisIndex]);
        renderer.windowS.dispatch('resize');
        setTimeout(function () {
            renderer.windowS.dispatch('resize');
        }, 500);
    });
}
function renderSVGArrowNarrowUp(selection, classes) {
    var _a = createSelectionClasses(classes), selector = _a.selector, classString = _a.classString;
    var svgWrapperS = selection.selectAll('.svg-wrapper' + selector)
        .data([null])
        .join('g')
        .classed('svg-wrapper', true)
        .classed(classString, true);
    var transformWrapperS = svgWrapperS.selectAll('.transform-wrapper')
        .data([null])
        .join('g')
        .classed('transform-wrapper', true);
    var svgGroup = transformWrapperS.selectAll('svg');
    if (svgGroup.empty()) {
        renderSVGSeries(transformWrapperS, [ArrowUpNarrowSVG]);
        transformWrapperS.selectAll('svg')
            .attr('data-ignore-layout-children', true);
    }
    return svgWrapperS;
}

function setUpAxisDrag(axisS, i) {
    var axisD = axisS.datum();
    if (!hasDrag(axisS.selectAll('.title-wrapper'))) {
        applyDragListeners();
    }
    function applyDragListeners() {
        var throttledDrag = throttle(function (e) { return onDragAxisParcoord(e, axisD, axisD.renderer.drawAreaBgS); }, 30);
        var onDrag = function (e) {
            if (e.sourceEvent.type === "mousemove") {
                // console.log('MOUSEMOVEEVENT!', e)
                throttledDrag.func(e);
                axisD.series.renderer.windowS.dispatch('resize');
            }
            else if (e.sourceEvent.type === "touchmove") {
                // console.log('TOUCHMOVEEVENT!', e)
                throttledDrag.func(e);
                axisD.series.renderer.windowS.dispatch('resize');
            }
        };
        axisS.selectAll('.title-wrapper').call(drag().on("drag.dragAxis", onDrag)
            .on("end.dragAxis", function () { return onDragEndAxisParcoord(axisD); }));
    }
}

function updateAxisCursorClasses(axisS) {
    var _a = axisS.datum().series, responsiveState = _a.responsiveState, originalData = _a.originalData;
    var axes = originalData.axes, axesPercentageScale = originalData.axesPercentageScale;
    var flipped = responsiveState.currentlyFlipped;
    var axisIndex = axes.findIndex(function (axis) { return axis.key === axisS.datum().key; });
    var percentageRange = axesPercentageScale.range();
    var orderArray = RVArray.mapToRanks(percentageRange);
    var titleWrapperS = axisS.selectAll('.title-wrapper');
    titleWrapperS.classed('cursor', true)
        .classed('cursor--drag-horizontal', !flipped)
        .classed('cursor--drag-right-only', !flipped && orderArray[axisIndex] === 1)
        .classed('cursor--drag-left-only', !flipped && orderArray[axisIndex] === orderArray.length)
        .classed('cursor--drag-vertical', flipped)
        .classed('cursor--drag-up-only', flipped && orderArray[axisIndex] === 1)
        .classed('cursor--drag-down-only', flipped && orderArray[axisIndex] === orderArray.length);
}

function renderParcoordAxisSeries(seriesS) {
    seriesS
        .selectAll('.axis.axis-sequence')
        .data(function (d) { return d.renderData.axes; }, function (d) { return d.key; })
        .join('g')
        .each(function (d, i, g) {
        var axisS = select(g[i]);
        var orientation = d.series.responsiveState.currentlyFlipped ? 'horizontal' : 'vertical';
        renderAxisSequence(axisS, orientation);
        renderAxisLimiter(axisS);
        setUpAxisDrag(axisS);
        setUpAxisZoom(axisS, i);
        renderAxisInverter(axisS);
        updateAxisCursorClasses(axisS);
    })
        .attr('transform', function (d, i) {
        var _a = d.series.responsiveState.getAxisPosition(d.key), x = _a.x, y = _a.y;
        return "translate(".concat(x, ", ").concat(y, ")");
    })
        .each(function (d, i, g) { return seriesS.dispatch('enter', {
        detail: { selection: select(g[i]) }
    }); });
}

function renderParcoordSeries(parentS, series) {
    var classes = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        classes[_i - 2] = arguments[_i];
    }
    var _a = createSelectionClasses(classes), classString = _a.classString, selector = _a.selector;
    var seriesS = parentS
        .selectAll("".concat(selector, ".series-parcoord"))
        .data(series)
        .join('g')
        .classed("".concat(classString, " series-parcoord"), true)
        .attr('data-ignore-layout-children', true);
    var createSelection = function (type) {
        return seriesS
            .selectAll(".series-".concat(type))
            .data(function (d) { return [d]; })
            .join('g')
            .classed("series-".concat(type), true);
    };
    seriesS.each(function (d) {
        var lineS = createSelection('parcoord-line');
        var axisS = createSelection('parcoord-axis');
        renderParcoordLineSeries(lineS);
        renderParcoordAxisSeries(axisS);
    });
    var lineSeriesS = seriesS.selectAll('.series-parcoord-line');
    var lineS = lineSeriesS.selectAll('.line');
    var axisSeriesS = seriesS.selectAll('.series-parcoord-axis');
    var axisS = axisSeriesS.selectAll('.axis');
    return { seriesS: seriesS, lineSeriesS: lineSeriesS, lineS: lineS, axisSeriesS: axisSeriesS, axisS: axisS };
}

var ParcoordChart = /** @class */ (function (_super) {
    __extends(ParcoordChart, _super);
    function ParcoordChart(windowSelection, data) {
        var _this = _super.call(this) || this;
        _this._windowS = windowSelection;
        _this.revalidate(data);
        return _this;
    }
    Object.defineProperty(ParcoordChart.prototype, "windowS", {
        get: function () { return this._windowS; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParcoordChart.prototype, "chartS", {
        get: function () {
            return ((this._chartS && !this._chartS.empty()) ? this._chartS :
                this.layouterS.selectAll('svg.chart'));
        },
        enumerable: false,
        configurable: true
    });
    ParcoordChart.prototype.renderContent = function () {
        this.renderSeriesChartComponents();
        var series = this.chartS.datum().series
            .cloneToRenderData().applyFilter().applyZoom().applyInversion();
        var lineSeriesS = renderParcoordSeries(this.drawAreaS, [series]).lineSeriesS;
        lineSeriesS.call(addSeriesHighlighting);
    };
    ParcoordChart.prototype.revalidate = function (data) {
        var initialWindowData = validateWindow(__assign(__assign({}, data), { type: 'parcoord', renderer: this }));
        var chartData = validateParcoordChart(__assign(__assign({}, data), { renderer: this }));
        this.windowS.datum(__assign(__assign({}, initialWindowData), chartData));
    };
    return ParcoordChart;
}(Chart));
applyMixins(ParcoordChart, [DataSeriesChartMixin]);

export { AxisLayouts, AxisLayoutsHorizontal, AxisLayoutsVertical, Bar, BarChart, BarGroupedSeries, BarLabelsDataCollection, BarStackedSeries, BarStandardSeries, BreakpointProperty, Breakpoints, CSSBreakpointLengthRegex, CSSLengthRegex, CartesianChartMixin, CartesianResponsiveState, CartesianSeries, Chart, CheckBoxLabel, ComponentBreakpoints, DataSeriesChartMixin, EmptySeries, ErrorMessages, Key, LengthDimensions, LineChart, LineSeries, Orientations, ParcoordChart, ParcoordResponsiveState, ParcoordSeries, Point, PointLabelsDataCollection, PointSeries, RVArray, ResponsivePropertyBase, ResponsiveState, ResponsiveValue, Revertible, ScaledValuesCategorical, ScaledValuesCumulativeSummation, ScaledValuesNumeric, ScaledValuesSpatialBase, ScaledValuesTemporal, ScatterPlot, ThrottleScheduled, Tooltip, addCSSTransitionEnterClass, addCSSTransitionExitClass, addD3TransitionClass, addD3TransitionClassForSelection, addLegendHoverHighlighting, addSeriesHighlighting, alignScaledValuesLengths, applyClassList, applyMixins, attachActiveCursorLocking, backgroundSVGOnly, bboxDiffSVG, bindOpenerToDialog, calcLimited, cancelExitClassOnUpdate, categoryRegex, circleEquals, circleFitStroke, circleFromAttrs, circleFromString, circleInsideRect, circleMinimized, circleOutsideRect, circlePosition, circleRound, circleToAttrs, circleToAttrsFromSelection, circleToPath, circleToString, cloneCartesianSeriesData, cloneParcoordData, clonePointSeriesData, combineKeys, createLegendItems, createPoints, createSelectionClasses, cssLengthInPx, cssVarDefaultsKeys, cssVarFromSelection, cssVars, cssVarsDefaults, defaultExtrema, defaultLayoutIndex, defaultScope, defaultStyleClass, defaultWindowSettings, detectClassChange, elementAbsoluteBounds, elementComputedStyleWithoutDefaults, elementFromSelection, elementRelativeBounds, elementSVGPresentationAttrs, elementSVGTransformStyles, ellipseInsideRect, ellipseToAttrs, fieldsetCollapseWrapperRender, format, formatWithDecimalZero, genKeyObjectFromObject, getActiveKeys, getCSSVarLengthInPx, getCurrentResponsiveValue, getLayoutWidthIndexFromCSS, handleZoom, hasDrag, isBaseRadiusUserArgs, isBreakpointPropertyUserArgsResponsive, isCSSBreakpointLengthValue, isCSSLengthValue, isElement, isExtrema, isResponsiveValueUserArgsResponsive, isScale, isScaleCategory, isScaleNumeric, isScaleTime, joinBarSeries, joinLineSeries, joinPointSeries, layedOutChildren, layoutContainerCompute, layoutNodeChildren, layouterCompute, lineToPath, mapSelection, maxBreakpointCount, mergeKeys, noParentKey, normalizeAngle, orderScaledValuesSpatial, positionEquals, positionFromAttrs, positionFromString, positionRound, positionSVGTextToLayoutCenter, positionToAttrs, positionToString, positionToTransformAttr, pxLowerLimit, pxUpperLimit, rectBottom, rectBottomLeft, rectBottomRight, rectCenter, rectEquals, rectFitStroke, rectFromAttrs, rectFromSize, rectFromString, rectLeft, rectMinimized, rectPosition, rectRight, rectRound, rectToAttrs, rectToPath, rectToString, rectToViewBox, rectTop, rectTopLeft, rectTopRight, relateDragWayToSelection, relateDragWayToSelectionByDiff, removeD3TransitionClassSelection, renderAttributeRemovalOptions, renderAxisLayout, renderAxisSequence, renderBarSeries, renderBgSVGOnlyBBox, renderBgSVGOnlyByRect, renderCartesianAxes, renderChart, renderDataSeriesTooltip, renderDecimalNumberOptions, renderDialog, renderDownloadTool, renderElementRemovalOptions, renderFieldset, renderGrid, renderInputLabel, renderInputLabels, renderLabelSeries, renderLabels, renderLayouter, renderLegend, renderLegendCategories, renderLineSeries, renderMovableCrossTooltip, renderOriginLine, renderPointSeries, renderSVGSeries, renderStyleTypeOptions, renderToolbar, renderTooltip, renderWindow, resizeEventListener, band as scaleBand, linear as scaleLinear, ordinal as scaleOrdinal, point as scalePoint, pow as scalePow, sequential as scaleSequential, select, selectAll, setTooltipVisibility, sizeEquals, sizeFromAttrs, sizeFromString, sizeRound, sizeToAttrs, sizeToString, splitKey, throttle, timeFormat, timeYear, tooltipPositionStrategies, tooltipSelector, uniqueId, updateTooltipPositionCSSVars, validateBarChart, validateBaseAxis, validateBaseRadius, validateBreakpointProperty, validateBubbleRadius, validateCartesianAxis, validateCartesianChart, validateCartesianSeriesArgs, validateCategories, validateChart, validateDataSeriesArgs, validateKeyedAxis, validateLegend, validateLineChart, validateParcoordChart, validateParcoordSeriesArgs, validatePointSeriesArgs, validateResponsiveValue, validateScaledValuesSpatial, validateScatterPlot, validateSequentialColor, validateWindow, validateZoom, windowSettingsKeys };
//# sourceMappingURL=respvis_old.js.map
