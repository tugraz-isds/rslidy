var respVis = (function (exports, d3Scale, d3Selection, d3Transition, d3Axis, d3Array, d3Brush, d3Zoom) {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var chroma = createCommonjsModule(function (module, exports) {
	/**
	 * chroma.js - JavaScript library for color conversions
	 *
	 * Copyright (c) 2011-2019, Gregor Aisch
	 * All rights reserved.
	 *
	 * Redistribution and use in source and binary forms, with or without
	 * modification, are permitted provided that the following conditions are met:
	 *
	 * 1. Redistributions of source code must retain the above copyright notice, this
	 * list of conditions and the following disclaimer.
	 *
	 * 2. Redistributions in binary form must reproduce the above copyright notice,
	 * this list of conditions and the following disclaimer in the documentation
	 * and/or other materials provided with the distribution.
	 *
	 * 3. The name Gregor Aisch may not be used to endorse or promote products
	 * derived from this software without specific prior written permission.
	 *
	 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
	 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
	 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
	 * DISCLAIMED. IN NO EVENT SHALL GREGOR AISCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
	 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
	 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
	 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
	 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
	 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
	 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 *
	 * -------------------------------------------------------
	 *
	 * chroma.js includes colors from colorbrewer2.org, which are released under
	 * the following license:
	 *
	 * Copyright (c) 2002 Cynthia Brewer, Mark Harrower,
	 * and The Pennsylvania State University.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing,
	 * software distributed under the License is distributed on an
	 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
	 * either express or implied. See the License for the specific
	 * language governing permissions and limitations under the License.
	 *
	 * ------------------------------------------------------
	 *
	 * Named colors are taken from X11 Color Names.
	 * http://www.w3.org/TR/css3-color/#svg-color
	 *
	 * @preserve
	 */

	(function (global, factory) {
	     module.exports = factory() ;
	}(commonjsGlobal, (function () {
	    var limit = function (x, min, max) {
	        if ( min === void 0 ) min=0;
	        if ( max === void 0 ) max=1;

	        return x < min ? min : x > max ? max : x;
	    };

	    var clip_rgb = function (rgb) {
	        rgb._clipped = false;
	        rgb._unclipped = rgb.slice(0);
	        for (var i=0; i<=3; i++) {
	            if (i < 3) {
	                if (rgb[i] < 0 || rgb[i] > 255) { rgb._clipped = true; }
	                rgb[i] = limit(rgb[i], 0, 255);
	            } else if (i === 3) {
	                rgb[i] = limit(rgb[i], 0, 1);
	            }
	        }
	        return rgb;
	    };

	    // ported from jQuery's $.type
	    var classToType = {};
	    for (var i = 0, list = ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Undefined', 'Null']; i < list.length; i += 1) {
	        var name = list[i];

	        classToType[("[object " + name + "]")] = name.toLowerCase();
	    }
	    var type = function(obj) {
	        return classToType[Object.prototype.toString.call(obj)] || "object";
	    };

	    var unpack = function (args, keyOrder) {
	        if ( keyOrder === void 0 ) keyOrder=null;

	    	// if called with more than 3 arguments, we return the arguments
	        if (args.length >= 3) { return Array.prototype.slice.call(args); }
	        // with less than 3 args we check if first arg is object
	        // and use the keyOrder string to extract and sort properties
	    	if (type(args[0]) == 'object' && keyOrder) {
	    		return keyOrder.split('')
	    			.filter(function (k) { return args[0][k] !== undefined; })
	    			.map(function (k) { return args[0][k]; });
	    	}
	    	// otherwise we just return the first argument
	    	// (which we suppose is an array of args)
	        return args[0];
	    };

	    var last = function (args) {
	        if (args.length < 2) { return null; }
	        var l = args.length-1;
	        if (type(args[l]) == 'string') { return args[l].toLowerCase(); }
	        return null;
	    };

	    var PI = Math.PI;

	    var utils = {
	    	clip_rgb: clip_rgb,
	    	limit: limit,
	    	type: type,
	    	unpack: unpack,
	    	last: last,
	    	PI: PI,
	    	TWOPI: PI*2,
	    	PITHIRD: PI/3,
	    	DEG2RAD: PI / 180,
	    	RAD2DEG: 180 / PI
	    };

	    var input = {
	    	format: {},
	    	autodetect: []
	    };

	    var last$1 = utils.last;
	    var clip_rgb$1 = utils.clip_rgb;
	    var type$1 = utils.type;


	    var Color = function Color() {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        var me = this;
	        if (type$1(args[0]) === 'object' &&
	            args[0].constructor &&
	            args[0].constructor === this.constructor) {
	            // the argument is already a Color instance
	            return args[0];
	        }

	        // last argument could be the mode
	        var mode = last$1(args);
	        var autodetect = false;

	        if (!mode) {
	            autodetect = true;
	            if (!input.sorted) {
	                input.autodetect = input.autodetect.sort(function (a,b) { return b.p - a.p; });
	                input.sorted = true;
	            }
	            // auto-detect format
	            for (var i = 0, list = input.autodetect; i < list.length; i += 1) {
	                var chk = list[i];

	                mode = chk.test.apply(chk, args);
	                if (mode) { break; }
	            }
	        }

	        if (input.format[mode]) {
	            var rgb = input.format[mode].apply(null, autodetect ? args : args.slice(0,-1));
	            me._rgb = clip_rgb$1(rgb);
	        } else {
	            throw new Error('unknown format: '+args);
	        }

	        // add alpha channel
	        if (me._rgb.length === 3) { me._rgb.push(1); }
	    };

	    Color.prototype.toString = function toString () {
	        if (type$1(this.hex) == 'function') { return this.hex(); }
	        return ("[" + (this._rgb.join(',')) + "]");
	    };

	    var Color_1 = Color;

	    var chroma = function () {
	    	var args = [], len = arguments.length;
	    	while ( len-- ) args[ len ] = arguments[ len ];

	    	return new (Function.prototype.bind.apply( chroma.Color, [ null ].concat( args) ));
	    };

	    chroma.Color = Color_1;
	    chroma.version = '2.1.0';

	    var chroma_1 = chroma;

	    var unpack$1 = utils.unpack;
	    var max = Math.max;

	    var rgb2cmyk = function () {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        var ref = unpack$1(args, 'rgb');
	        var r = ref[0];
	        var g = ref[1];
	        var b = ref[2];
	        r = r / 255;
	        g = g / 255;
	        b = b / 255;
	        var k = 1 - max(r,max(g,b));
	        var f = k < 1 ? 1 / (1-k) : 0;
	        var c = (1-r-k) * f;
	        var m = (1-g-k) * f;
	        var y = (1-b-k) * f;
	        return [c,m,y,k];
	    };

	    var rgb2cmyk_1 = rgb2cmyk;

	    var unpack$2 = utils.unpack;

	    var cmyk2rgb = function () {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        args = unpack$2(args, 'cmyk');
	        var c = args[0];
	        var m = args[1];
	        var y = args[2];
	        var k = args[3];
	        var alpha = args.length > 4 ? args[4] : 1;
	        if (k === 1) { return [0,0,0,alpha]; }
	        return [
	            c >= 1 ? 0 : 255 * (1-c) * (1-k), // r
	            m >= 1 ? 0 : 255 * (1-m) * (1-k), // g
	            y >= 1 ? 0 : 255 * (1-y) * (1-k), // b
	            alpha
	        ];
	    };

	    var cmyk2rgb_1 = cmyk2rgb;

	    var unpack$3 = utils.unpack;
	    var type$2 = utils.type;



	    Color_1.prototype.cmyk = function() {
	        return rgb2cmyk_1(this._rgb);
	    };

	    chroma_1.cmyk = function () {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['cmyk']) ));
	    };

	    input.format.cmyk = cmyk2rgb_1;

	    input.autodetect.push({
	        p: 2,
	        test: function () {
	            var args = [], len = arguments.length;
	            while ( len-- ) args[ len ] = arguments[ len ];

	            args = unpack$3(args, 'cmyk');
	            if (type$2(args) === 'array' && args.length === 4) {
	                return 'cmyk';
	            }
	        }
	    });

	    var unpack$4 = utils.unpack;
	    var last$2 = utils.last;
	    var rnd = function (a) { return Math.round(a*100)/100; };

	    /*
	     * supported arguments:
	     * - hsl2css(h,s,l)
	     * - hsl2css(h,s,l,a)
	     * - hsl2css([h,s,l], mode)
	     * - hsl2css([h,s,l,a], mode)
	     * - hsl2css({h,s,l,a}, mode)
	     */
	    var hsl2css = function () {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        var hsla = unpack$4(args, 'hsla');
	        var mode = last$2(args) || 'lsa';
	        hsla[0] = rnd(hsla[0] || 0);
	        hsla[1] = rnd(hsla[1]*100) + '%';
	        hsla[2] = rnd(hsla[2]*100) + '%';
	        if (mode === 'hsla' || (hsla.length > 3 && hsla[3]<1)) {
	            hsla[3] = hsla.length > 3 ? hsla[3] : 1;
	            mode = 'hsla';
	        } else {
	            hsla.length = 3;
	        }
	        return (mode + "(" + (hsla.join(',')) + ")");
	    };

	    var hsl2css_1 = hsl2css;

	    var unpack$5 = utils.unpack;

	    /*
	     * supported arguments:
	     * - rgb2hsl(r,g,b)
	     * - rgb2hsl(r,g,b,a)
	     * - rgb2hsl([r,g,b])
	     * - rgb2hsl([r,g,b,a])
	     * - rgb2hsl({r,g,b,a})
	     */
	    var rgb2hsl = function () {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        args = unpack$5(args, 'rgba');
	        var r = args[0];
	        var g = args[1];
	        var b = args[2];

	        r /= 255;
	        g /= 255;
	        b /= 255;

	        var min = Math.min(r, g, b);
	        var max = Math.max(r, g, b);

	        var l = (max + min) / 2;
	        var s, h;

	        if (max === min){
	            s = 0;
	            h = Number.NaN;
	        } else {
	            s = l < 0.5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
	        }

	        if (r == max) { h = (g - b) / (max - min); }
	        else if (g == max) { h = 2 + (b - r) / (max - min); }
	        else if (b == max) { h = 4 + (r - g) / (max - min); }

	        h *= 60;
	        if (h < 0) { h += 360; }
	        if (args.length>3 && args[3]!==undefined) { return [h,s,l,args[3]]; }
	        return [h,s,l];
	    };

	    var rgb2hsl_1 = rgb2hsl;

	    var unpack$6 = utils.unpack;
	    var last$3 = utils.last;


	    var round = Math.round;

	    /*
	     * supported arguments:
	     * - rgb2css(r,g,b)
	     * - rgb2css(r,g,b,a)
	     * - rgb2css([r,g,b], mode)
	     * - rgb2css([r,g,b,a], mode)
	     * - rgb2css({r,g,b,a}, mode)
	     */
	    var rgb2css = function () {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        var rgba = unpack$6(args, 'rgba');
	        var mode = last$3(args) || 'rgb';
	        if (mode.substr(0,3) == 'hsl') {
	            return hsl2css_1(rgb2hsl_1(rgba), mode);
	        }
	        rgba[0] = round(rgba[0]);
	        rgba[1] = round(rgba[1]);
	        rgba[2] = round(rgba[2]);
	        if (mode === 'rgba' || (rgba.length > 3 && rgba[3]<1)) {
	            rgba[3] = rgba.length > 3 ? rgba[3] : 1;
	            mode = 'rgba';
	        }
	        return (mode + "(" + (rgba.slice(0,mode==='rgb'?3:4).join(',')) + ")");
	    };

	    var rgb2css_1 = rgb2css;

	    var unpack$7 = utils.unpack;
	    var round$1 = Math.round;

	    var hsl2rgb = function () {
	        var assign;

	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];
	        args = unpack$7(args, 'hsl');
	        var h = args[0];
	        var s = args[1];
	        var l = args[2];
	        var r,g,b;
	        if (s === 0) {
	            r = g = b = l*255;
	        } else {
	            var t3 = [0,0,0];
	            var c = [0,0,0];
	            var t2 = l < 0.5 ? l * (1+s) : l+s-l*s;
	            var t1 = 2 * l - t2;
	            var h_ = h / 360;
	            t3[0] = h_ + 1/3;
	            t3[1] = h_;
	            t3[2] = h_ - 1/3;
	            for (var i=0; i<3; i++) {
	                if (t3[i] < 0) { t3[i] += 1; }
	                if (t3[i] > 1) { t3[i] -= 1; }
	                if (6 * t3[i] < 1)
	                    { c[i] = t1 + (t2 - t1) * 6 * t3[i]; }
	                else if (2 * t3[i] < 1)
	                    { c[i] = t2; }
	                else if (3 * t3[i] < 2)
	                    { c[i] = t1 + (t2 - t1) * ((2 / 3) - t3[i]) * 6; }
	                else
	                    { c[i] = t1; }
	            }
	            (assign = [round$1(c[0]*255),round$1(c[1]*255),round$1(c[2]*255)], r = assign[0], g = assign[1], b = assign[2]);
	        }
	        if (args.length > 3) {
	            // keep alpha channel
	            return [r,g,b,args[3]];
	        }
	        return [r,g,b,1];
	    };

	    var hsl2rgb_1 = hsl2rgb;

	    var RE_RGB = /^rgb\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/;
	    var RE_RGBA = /^rgba\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*([01]|[01]?\.\d+)\)$/;
	    var RE_RGB_PCT = /^rgb\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
	    var RE_RGBA_PCT = /^rgba\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
	    var RE_HSL = /^hsl\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
	    var RE_HSLA = /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;

	    var round$2 = Math.round;

	    var css2rgb = function (css) {
	        css = css.toLowerCase().trim();
	        var m;

	        if (input.format.named) {
	            try {
	                return input.format.named(css);
	            } catch (e) {
	                // eslint-disable-next-line
	            }
	        }

	        // rgb(250,20,0)
	        if ((m = css.match(RE_RGB))) {
	            var rgb = m.slice(1,4);
	            for (var i=0; i<3; i++) {
	                rgb[i] = +rgb[i];
	            }
	            rgb[3] = 1;  // default alpha
	            return rgb;
	        }

	        // rgba(250,20,0,0.4)
	        if ((m = css.match(RE_RGBA))) {
	            var rgb$1 = m.slice(1,5);
	            for (var i$1=0; i$1<4; i$1++) {
	                rgb$1[i$1] = +rgb$1[i$1];
	            }
	            return rgb$1;
	        }

	        // rgb(100%,0%,0%)
	        if ((m = css.match(RE_RGB_PCT))) {
	            var rgb$2 = m.slice(1,4);
	            for (var i$2=0; i$2<3; i$2++) {
	                rgb$2[i$2] = round$2(rgb$2[i$2] * 2.55);
	            }
	            rgb$2[3] = 1;  // default alpha
	            return rgb$2;
	        }

	        // rgba(100%,0%,0%,0.4)
	        if ((m = css.match(RE_RGBA_PCT))) {
	            var rgb$3 = m.slice(1,5);
	            for (var i$3=0; i$3<3; i$3++) {
	                rgb$3[i$3] = round$2(rgb$3[i$3] * 2.55);
	            }
	            rgb$3[3] = +rgb$3[3];
	            return rgb$3;
	        }

	        // hsl(0,100%,50%)
	        if ((m = css.match(RE_HSL))) {
	            var hsl = m.slice(1,4);
	            hsl[1] *= 0.01;
	            hsl[2] *= 0.01;
	            var rgb$4 = hsl2rgb_1(hsl);
	            rgb$4[3] = 1;
	            return rgb$4;
	        }

	        // hsla(0,100%,50%,0.5)
	        if ((m = css.match(RE_HSLA))) {
	            var hsl$1 = m.slice(1,4);
	            hsl$1[1] *= 0.01;
	            hsl$1[2] *= 0.01;
	            var rgb$5 = hsl2rgb_1(hsl$1);
	            rgb$5[3] = +m[4];  // default alpha = 1
	            return rgb$5;
	        }
	    };

	    css2rgb.test = function (s) {
	        return RE_RGB.test(s) ||
	            RE_RGBA.test(s) ||
	            RE_RGB_PCT.test(s) ||
	            RE_RGBA_PCT.test(s) ||
	            RE_HSL.test(s) ||
	            RE_HSLA.test(s);
	    };

	    var css2rgb_1 = css2rgb;

	    var type$3 = utils.type;




	    Color_1.prototype.css = function(mode) {
	        return rgb2css_1(this._rgb, mode);
	    };

	    chroma_1.css = function () {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['css']) ));
	    };

	    input.format.css = css2rgb_1;

	    input.autodetect.push({
	        p: 5,
	        test: function (h) {
	            var rest = [], len = arguments.length - 1;
	            while ( len-- > 0 ) rest[ len ] = arguments[ len + 1 ];

	            if (!rest.length && type$3(h) === 'string' && css2rgb_1.test(h)) {
	                return 'css';
	            }
	        }
	    });

	    var unpack$8 = utils.unpack;

	    input.format.gl = function () {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        var rgb = unpack$8(args, 'rgba');
	        rgb[0] *= 255;
	        rgb[1] *= 255;
	        rgb[2] *= 255;
	        return rgb;
	    };

	    chroma_1.gl = function () {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['gl']) ));
	    };

	    Color_1.prototype.gl = function() {
	        var rgb = this._rgb;
	        return [rgb[0]/255, rgb[1]/255, rgb[2]/255, rgb[3]];
	    };

	    var unpack$9 = utils.unpack;

	    var rgb2hcg = function () {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        var ref = unpack$9(args, 'rgb');
	        var r = ref[0];
	        var g = ref[1];
	        var b = ref[2];
	        var min = Math.min(r, g, b);
	        var max = Math.max(r, g, b);
	        var delta = max - min;
	        var c = delta * 100 / 255;
	        var _g = min / (255 - delta) * 100;
	        var h;
	        if (delta === 0) {
	            h = Number.NaN;
	        } else {
	            if (r === max) { h = (g - b) / delta; }
	            if (g === max) { h = 2+(b - r) / delta; }
	            if (b === max) { h = 4+(r - g) / delta; }
	            h *= 60;
	            if (h < 0) { h += 360; }
	        }
	        return [h, c, _g];
	    };

	    var rgb2hcg_1 = rgb2hcg;

	    var unpack$a = utils.unpack;
	    var floor = Math.floor;

	    /*
	     * this is basically just HSV with some minor tweaks
	     *
	     * hue.. [0..360]
	     * chroma .. [0..1]
	     * grayness .. [0..1]
	     */

	    var hcg2rgb = function () {
	        var assign, assign$1, assign$2, assign$3, assign$4, assign$5;

	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];
	        args = unpack$a(args, 'hcg');
	        var h = args[0];
	        var c = args[1];
	        var _g = args[2];
	        var r,g,b;
	        _g = _g * 255;
	        var _c = c * 255;
	        if (c === 0) {
	            r = g = b = _g;
	        } else {
	            if (h === 360) { h = 0; }
	            if (h > 360) { h -= 360; }
	            if (h < 0) { h += 360; }
	            h /= 60;
	            var i = floor(h);
	            var f = h - i;
	            var p = _g * (1 - c);
	            var q = p + _c * (1 - f);
	            var t = p + _c * f;
	            var v = p + _c;
	            switch (i) {
	                case 0: (assign = [v, t, p], r = assign[0], g = assign[1], b = assign[2]); break
	                case 1: (assign$1 = [q, v, p], r = assign$1[0], g = assign$1[1], b = assign$1[2]); break
	                case 2: (assign$2 = [p, v, t], r = assign$2[0], g = assign$2[1], b = assign$2[2]); break
	                case 3: (assign$3 = [p, q, v], r = assign$3[0], g = assign$3[1], b = assign$3[2]); break
	                case 4: (assign$4 = [t, p, v], r = assign$4[0], g = assign$4[1], b = assign$4[2]); break
	                case 5: (assign$5 = [v, p, q], r = assign$5[0], g = assign$5[1], b = assign$5[2]); break
	            }
	        }
	        return [r, g, b, args.length > 3 ? args[3] : 1];
	    };

	    var hcg2rgb_1 = hcg2rgb;

	    var unpack$b = utils.unpack;
	    var type$4 = utils.type;






	    Color_1.prototype.hcg = function() {
	        return rgb2hcg_1(this._rgb);
	    };

	    chroma_1.hcg = function () {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['hcg']) ));
	    };

	    input.format.hcg = hcg2rgb_1;

	    input.autodetect.push({
	        p: 1,
	        test: function () {
	            var args = [], len = arguments.length;
	            while ( len-- ) args[ len ] = arguments[ len ];

	            args = unpack$b(args, 'hcg');
	            if (type$4(args) === 'array' && args.length === 3) {
	                return 'hcg';
	            }
	        }
	    });

	    var unpack$c = utils.unpack;
	    var last$4 = utils.last;
	    var round$3 = Math.round;

	    var rgb2hex = function () {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        var ref = unpack$c(args, 'rgba');
	        var r = ref[0];
	        var g = ref[1];
	        var b = ref[2];
	        var a = ref[3];
	        var mode = last$4(args) || 'auto';
	        if (a === undefined) { a = 1; }
	        if (mode === 'auto') {
	            mode = a < 1 ? 'rgba' : 'rgb';
	        }
	        r = round$3(r);
	        g = round$3(g);
	        b = round$3(b);
	        var u = r << 16 | g << 8 | b;
	        var str = "000000" + u.toString(16); //#.toUpperCase();
	        str = str.substr(str.length - 6);
	        var hxa = '0' + round$3(a * 255).toString(16);
	        hxa = hxa.substr(hxa.length - 2);
	        switch (mode.toLowerCase()) {
	            case 'rgba': return ("#" + str + hxa);
	            case 'argb': return ("#" + hxa + str);
	            default: return ("#" + str);
	        }
	    };

	    var rgb2hex_1 = rgb2hex;

	    var RE_HEX = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
	    var RE_HEXA = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/;

	    var hex2rgb = function (hex) {
	        if (hex.match(RE_HEX)) {
	            // remove optional leading #
	            if (hex.length === 4 || hex.length === 7) {
	                hex = hex.substr(1);
	            }
	            // expand short-notation to full six-digit
	            if (hex.length === 3) {
	                hex = hex.split('');
	                hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	            }
	            var u = parseInt(hex, 16);
	            var r = u >> 16;
	            var g = u >> 8 & 0xFF;
	            var b = u & 0xFF;
	            return [r,g,b,1];
	        }

	        // match rgba hex format, eg #FF000077
	        if (hex.match(RE_HEXA)) {
	            if (hex.length === 5 || hex.length === 9) {
	                // remove optional leading #
	                hex = hex.substr(1);
	            }
	            // expand short-notation to full eight-digit
	            if (hex.length === 4) {
	                hex = hex.split('');
	                hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2]+hex[3]+hex[3];
	            }
	            var u$1 = parseInt(hex, 16);
	            var r$1 = u$1 >> 24 & 0xFF;
	            var g$1 = u$1 >> 16 & 0xFF;
	            var b$1 = u$1 >> 8 & 0xFF;
	            var a = Math.round((u$1 & 0xFF) / 0xFF * 100) / 100;
	            return [r$1,g$1,b$1,a];
	        }

	        // we used to check for css colors here
	        // if _input.css? and rgb = _input.css hex
	        //     return rgb

	        throw new Error(("unknown hex color: " + hex));
	    };

	    var hex2rgb_1 = hex2rgb;

	    var type$5 = utils.type;




	    Color_1.prototype.hex = function(mode) {
	        return rgb2hex_1(this._rgb, mode);
	    };

	    chroma_1.hex = function () {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['hex']) ));
	    };

	    input.format.hex = hex2rgb_1;
	    input.autodetect.push({
	        p: 4,
	        test: function (h) {
	            var rest = [], len = arguments.length - 1;
	            while ( len-- > 0 ) rest[ len ] = arguments[ len + 1 ];

	            if (!rest.length && type$5(h) === 'string' && [3,4,5,6,7,8,9].indexOf(h.length) >= 0) {
	                return 'hex';
	            }
	        }
	    });

	    var unpack$d = utils.unpack;
	    var TWOPI = utils.TWOPI;
	    var min = Math.min;
	    var sqrt = Math.sqrt;
	    var acos = Math.acos;

	    var rgb2hsi = function () {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        /*
	        borrowed from here:
	        http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/rgb2hsi.cpp
	        */
	        var ref = unpack$d(args, 'rgb');
	        var r = ref[0];
	        var g = ref[1];
	        var b = ref[2];
	        r /= 255;
	        g /= 255;
	        b /= 255;
	        var h;
	        var min_ = min(r,g,b);
	        var i = (r+g+b) / 3;
	        var s = i > 0 ? 1 - min_/i : 0;
	        if (s === 0) {
	            h = NaN;
	        } else {
	            h = ((r-g)+(r-b)) / 2;
	            h /= sqrt((r-g)*(r-g) + (r-b)*(g-b));
	            h = acos(h);
	            if (b > g) {
	                h = TWOPI - h;
	            }
	            h /= TWOPI;
	        }
	        return [h*360,s,i];
	    };

	    var rgb2hsi_1 = rgb2hsi;

	    var unpack$e = utils.unpack;
	    var limit$1 = utils.limit;
	    var TWOPI$1 = utils.TWOPI;
	    var PITHIRD = utils.PITHIRD;
	    var cos = Math.cos;

	    /*
	     * hue [0..360]
	     * saturation [0..1]
	     * intensity [0..1]
	     */
	    var hsi2rgb = function () {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        /*
	        borrowed from here:
	        http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/hsi2rgb.cpp
	        */
	        args = unpack$e(args, 'hsi');
	        var h = args[0];
	        var s = args[1];
	        var i = args[2];
	        var r,g,b;

	        if (isNaN(h)) { h = 0; }
	        if (isNaN(s)) { s = 0; }
	        // normalize hue
	        if (h > 360) { h -= 360; }
	        if (h < 0) { h += 360; }
	        h /= 360;
	        if (h < 1/3) {
	            b = (1-s)/3;
	            r = (1+s*cos(TWOPI$1*h)/cos(PITHIRD-TWOPI$1*h))/3;
	            g = 1 - (b+r);
	        } else if (h < 2/3) {
	            h -= 1/3;
	            r = (1-s)/3;
	            g = (1+s*cos(TWOPI$1*h)/cos(PITHIRD-TWOPI$1*h))/3;
	            b = 1 - (r+g);
	        } else {
	            h -= 2/3;
	            g = (1-s)/3;
	            b = (1+s*cos(TWOPI$1*h)/cos(PITHIRD-TWOPI$1*h))/3;
	            r = 1 - (g+b);
	        }
	        r = limit$1(i*r*3);
	        g = limit$1(i*g*3);
	        b = limit$1(i*b*3);
	        return [r*255, g*255, b*255, args.length > 3 ? args[3] : 1];
	    };

	    var hsi2rgb_1 = hsi2rgb;

	    var unpack$f = utils.unpack;
	    var type$6 = utils.type;






	    Color_1.prototype.hsi = function() {
	        return rgb2hsi_1(this._rgb);
	    };

	    chroma_1.hsi = function () {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['hsi']) ));
	    };

	    input.format.hsi = hsi2rgb_1;

	    input.autodetect.push({
	        p: 2,
	        test: function () {
	            var args = [], len = arguments.length;
	            while ( len-- ) args[ len ] = arguments[ len ];

	            args = unpack$f(args, 'hsi');
	            if (type$6(args) === 'array' && args.length === 3) {
	                return 'hsi';
	            }
	        }
	    });

	    var unpack$g = utils.unpack;
	    var type$7 = utils.type;






	    Color_1.prototype.hsl = function() {
	        return rgb2hsl_1(this._rgb);
	    };

	    chroma_1.hsl = function () {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['hsl']) ));
	    };

	    input.format.hsl = hsl2rgb_1;

	    input.autodetect.push({
	        p: 2,
	        test: function () {
	            var args = [], len = arguments.length;
	            while ( len-- ) args[ len ] = arguments[ len ];

	            args = unpack$g(args, 'hsl');
	            if (type$7(args) === 'array' && args.length === 3) {
	                return 'hsl';
	            }
	        }
	    });

	    var unpack$h = utils.unpack;
	    var min$1 = Math.min;
	    var max$1 = Math.max;

	    /*
	     * supported arguments:
	     * - rgb2hsv(r,g,b)
	     * - rgb2hsv([r,g,b])
	     * - rgb2hsv({r,g,b})
	     */
	    var rgb2hsl$1 = function () {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        args = unpack$h(args, 'rgb');
	        var r = args[0];
	        var g = args[1];
	        var b = args[2];
	        var min_ = min$1(r, g, b);
	        var max_ = max$1(r, g, b);
	        var delta = max_ - min_;
	        var h,s,v;
	        v = max_ / 255.0;
	        if (max_ === 0) {
	            h = Number.NaN;
	            s = 0;
	        } else {
	            s = delta / max_;
	            if (r === max_) { h = (g - b) / delta; }
	            if (g === max_) { h = 2+(b - r) / delta; }
	            if (b === max_) { h = 4+(r - g) / delta; }
	            h *= 60;
	            if (h < 0) { h += 360; }
	        }
	        return [h, s, v]
	    };

	    var rgb2hsv = rgb2hsl$1;

	    var unpack$i = utils.unpack;
	    var floor$1 = Math.floor;

	    var hsv2rgb = function () {
	        var assign, assign$1, assign$2, assign$3, assign$4, assign$5;

	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];
	        args = unpack$i(args, 'hsv');
	        var h = args[0];
	        var s = args[1];
	        var v = args[2];
	        var r,g,b;
	        v *= 255;
	        if (s === 0) {
	            r = g = b = v;
	        } else {
	            if (h === 360) { h = 0; }
	            if (h > 360) { h -= 360; }
	            if (h < 0) { h += 360; }
	            h /= 60;

	            var i = floor$1(h);
	            var f = h - i;
	            var p = v * (1 - s);
	            var q = v * (1 - s * f);
	            var t = v * (1 - s * (1 - f));

	            switch (i) {
	                case 0: (assign = [v, t, p], r = assign[0], g = assign[1], b = assign[2]); break
	                case 1: (assign$1 = [q, v, p], r = assign$1[0], g = assign$1[1], b = assign$1[2]); break
	                case 2: (assign$2 = [p, v, t], r = assign$2[0], g = assign$2[1], b = assign$2[2]); break
	                case 3: (assign$3 = [p, q, v], r = assign$3[0], g = assign$3[1], b = assign$3[2]); break
	                case 4: (assign$4 = [t, p, v], r = assign$4[0], g = assign$4[1], b = assign$4[2]); break
	                case 5: (assign$5 = [v, p, q], r = assign$5[0], g = assign$5[1], b = assign$5[2]); break
	            }
	        }
	        return [r,g,b,args.length > 3?args[3]:1];
	    };

	    var hsv2rgb_1 = hsv2rgb;

	    var unpack$j = utils.unpack;
	    var type$8 = utils.type;






	    Color_1.prototype.hsv = function() {
	        return rgb2hsv(this._rgb);
	    };

	    chroma_1.hsv = function () {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['hsv']) ));
	    };

	    input.format.hsv = hsv2rgb_1;

	    input.autodetect.push({
	        p: 2,
	        test: function () {
	            var args = [], len = arguments.length;
	            while ( len-- ) args[ len ] = arguments[ len ];

	            args = unpack$j(args, 'hsv');
	            if (type$8(args) === 'array' && args.length === 3) {
	                return 'hsv';
	            }
	        }
	    });

	    var labConstants = {
	        // Corresponds roughly to RGB brighter/darker
	        Kn: 18,

	        // D65 standard referent
	        Xn: 0.950470,
	        Yn: 1,
	        Zn: 1.088830,

	        t0: 0.137931034,  // 4 / 29
	        t1: 0.206896552,  // 6 / 29
	        t2: 0.12841855,   // 3 * t1 * t1
	        t3: 0.008856452,  // t1 * t1 * t1
	    };

	    var unpack$k = utils.unpack;
	    var pow = Math.pow;

	    var rgb2lab = function () {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        var ref = unpack$k(args, 'rgb');
	        var r = ref[0];
	        var g = ref[1];
	        var b = ref[2];
	        var ref$1 = rgb2xyz(r,g,b);
	        var x = ref$1[0];
	        var y = ref$1[1];
	        var z = ref$1[2];
	        var l = 116 * y - 16;
	        return [l < 0 ? 0 : l, 500 * (x - y), 200 * (y - z)];
	    };

	    var rgb_xyz = function (r) {
	        if ((r /= 255) <= 0.04045) { return r / 12.92; }
	        return pow((r + 0.055) / 1.055, 2.4);
	    };

	    var xyz_lab = function (t) {
	        if (t > labConstants.t3) { return pow(t, 1 / 3); }
	        return t / labConstants.t2 + labConstants.t0;
	    };

	    var rgb2xyz = function (r,g,b) {
	        r = rgb_xyz(r);
	        g = rgb_xyz(g);
	        b = rgb_xyz(b);
	        var x = xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / labConstants.Xn);
	        var y = xyz_lab((0.2126729 * r + 0.7151522 * g + 0.0721750 * b) / labConstants.Yn);
	        var z = xyz_lab((0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / labConstants.Zn);
	        return [x,y,z];
	    };

	    var rgb2lab_1 = rgb2lab;

	    var unpack$l = utils.unpack;
	    var pow$1 = Math.pow;

	    /*
	     * L* [0..100]
	     * a [-100..100]
	     * b [-100..100]
	     */
	    var lab2rgb = function () {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        args = unpack$l(args, 'lab');
	        var l = args[0];
	        var a = args[1];
	        var b = args[2];
	        var x,y,z, r,g,b_;

	        y = (l + 16) / 116;
	        x = isNaN(a) ? y : y + a / 500;
	        z = isNaN(b) ? y : y - b / 200;

	        y = labConstants.Yn * lab_xyz(y);
	        x = labConstants.Xn * lab_xyz(x);
	        z = labConstants.Zn * lab_xyz(z);

	        r = xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z);  // D65 -> sRGB
	        g = xyz_rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z);
	        b_ = xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z);

	        return [r,g,b_,args.length > 3 ? args[3] : 1];
	    };

	    var xyz_rgb = function (r) {
	        return 255 * (r <= 0.00304 ? 12.92 * r : 1.055 * pow$1(r, 1 / 2.4) - 0.055)
	    };

	    var lab_xyz = function (t) {
	        return t > labConstants.t1 ? t * t * t : labConstants.t2 * (t - labConstants.t0)
	    };

	    var lab2rgb_1 = lab2rgb;

	    var unpack$m = utils.unpack;
	    var type$9 = utils.type;






	    Color_1.prototype.lab = function() {
	        return rgb2lab_1(this._rgb);
	    };

	    chroma_1.lab = function () {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['lab']) ));
	    };

	    input.format.lab = lab2rgb_1;

	    input.autodetect.push({
	        p: 2,
	        test: function () {
	            var args = [], len = arguments.length;
	            while ( len-- ) args[ len ] = arguments[ len ];

	            args = unpack$m(args, 'lab');
	            if (type$9(args) === 'array' && args.length === 3) {
	                return 'lab';
	            }
	        }
	    });

	    var unpack$n = utils.unpack;
	    var RAD2DEG = utils.RAD2DEG;
	    var sqrt$1 = Math.sqrt;
	    var atan2 = Math.atan2;
	    var round$4 = Math.round;

	    var lab2lch = function () {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        var ref = unpack$n(args, 'lab');
	        var l = ref[0];
	        var a = ref[1];
	        var b = ref[2];
	        var c = sqrt$1(a * a + b * b);
	        var h = (atan2(b, a) * RAD2DEG + 360) % 360;
	        if (round$4(c*10000) === 0) { h = Number.NaN; }
	        return [l, c, h];
	    };

	    var lab2lch_1 = lab2lch;

	    var unpack$o = utils.unpack;



	    var rgb2lch = function () {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        var ref = unpack$o(args, 'rgb');
	        var r = ref[0];
	        var g = ref[1];
	        var b = ref[2];
	        var ref$1 = rgb2lab_1(r,g,b);
	        var l = ref$1[0];
	        var a = ref$1[1];
	        var b_ = ref$1[2];
	        return lab2lch_1(l,a,b_);
	    };

	    var rgb2lch_1 = rgb2lch;

	    var unpack$p = utils.unpack;
	    var DEG2RAD = utils.DEG2RAD;
	    var sin = Math.sin;
	    var cos$1 = Math.cos;

	    var lch2lab = function () {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        /*
	        Convert from a qualitative parameter h and a quantitative parameter l to a 24-bit pixel.
	        These formulas were invented by David Dalrymple to obtain maximum contrast without going
	        out of gamut if the parameters are in the range 0-1.

	        A saturation multiplier was added by Gregor Aisch
	        */
	        var ref = unpack$p(args, 'lch');
	        var l = ref[0];
	        var c = ref[1];
	        var h = ref[2];
	        if (isNaN(h)) { h = 0; }
	        h = h * DEG2RAD;
	        return [l, cos$1(h) * c, sin(h) * c]
	    };

	    var lch2lab_1 = lch2lab;

	    var unpack$q = utils.unpack;



	    var lch2rgb = function () {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        args = unpack$q(args, 'lch');
	        var l = args[0];
	        var c = args[1];
	        var h = args[2];
	        var ref = lch2lab_1 (l,c,h);
	        var L = ref[0];
	        var a = ref[1];
	        var b_ = ref[2];
	        var ref$1 = lab2rgb_1 (L,a,b_);
	        var r = ref$1[0];
	        var g = ref$1[1];
	        var b = ref$1[2];
	        return [r, g, b, args.length > 3 ? args[3] : 1];
	    };

	    var lch2rgb_1 = lch2rgb;

	    var unpack$r = utils.unpack;


	    var hcl2rgb = function () {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        var hcl = unpack$r(args, 'hcl').reverse();
	        return lch2rgb_1.apply(void 0, hcl);
	    };

	    var hcl2rgb_1 = hcl2rgb;

	    var unpack$s = utils.unpack;
	    var type$a = utils.type;






	    Color_1.prototype.lch = function() { return rgb2lch_1(this._rgb); };
	    Color_1.prototype.hcl = function() { return rgb2lch_1(this._rgb).reverse(); };

	    chroma_1.lch = function () {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['lch']) ));
	    };
	    chroma_1.hcl = function () {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['hcl']) ));
	    };

	    input.format.lch = lch2rgb_1;
	    input.format.hcl = hcl2rgb_1;

	    ['lch','hcl'].forEach(function (m) { return input.autodetect.push({
	        p: 2,
	        test: function () {
	            var args = [], len = arguments.length;
	            while ( len-- ) args[ len ] = arguments[ len ];

	            args = unpack$s(args, m);
	            if (type$a(args) === 'array' && args.length === 3) {
	                return m;
	            }
	        }
	    }); });

	    /**
	    	X11 color names

	    	http://www.w3.org/TR/css3-color/#svg-color
	    */

	    var w3cx11 = {
	        aliceblue: '#f0f8ff',
	        antiquewhite: '#faebd7',
	        aqua: '#00ffff',
	        aquamarine: '#7fffd4',
	        azure: '#f0ffff',
	        beige: '#f5f5dc',
	        bisque: '#ffe4c4',
	        black: '#000000',
	        blanchedalmond: '#ffebcd',
	        blue: '#0000ff',
	        blueviolet: '#8a2be2',
	        brown: '#a52a2a',
	        burlywood: '#deb887',
	        cadetblue: '#5f9ea0',
	        chartreuse: '#7fff00',
	        chocolate: '#d2691e',
	        coral: '#ff7f50',
	        cornflower: '#6495ed',
	        cornflowerblue: '#6495ed',
	        cornsilk: '#fff8dc',
	        crimson: '#dc143c',
	        cyan: '#00ffff',
	        darkblue: '#00008b',
	        darkcyan: '#008b8b',
	        darkgoldenrod: '#b8860b',
	        darkgray: '#a9a9a9',
	        darkgreen: '#006400',
	        darkgrey: '#a9a9a9',
	        darkkhaki: '#bdb76b',
	        darkmagenta: '#8b008b',
	        darkolivegreen: '#556b2f',
	        darkorange: '#ff8c00',
	        darkorchid: '#9932cc',
	        darkred: '#8b0000',
	        darksalmon: '#e9967a',
	        darkseagreen: '#8fbc8f',
	        darkslateblue: '#483d8b',
	        darkslategray: '#2f4f4f',
	        darkslategrey: '#2f4f4f',
	        darkturquoise: '#00ced1',
	        darkviolet: '#9400d3',
	        deeppink: '#ff1493',
	        deepskyblue: '#00bfff',
	        dimgray: '#696969',
	        dimgrey: '#696969',
	        dodgerblue: '#1e90ff',
	        firebrick: '#b22222',
	        floralwhite: '#fffaf0',
	        forestgreen: '#228b22',
	        fuchsia: '#ff00ff',
	        gainsboro: '#dcdcdc',
	        ghostwhite: '#f8f8ff',
	        gold: '#ffd700',
	        goldenrod: '#daa520',
	        gray: '#808080',
	        green: '#008000',
	        greenyellow: '#adff2f',
	        grey: '#808080',
	        honeydew: '#f0fff0',
	        hotpink: '#ff69b4',
	        indianred: '#cd5c5c',
	        indigo: '#4b0082',
	        ivory: '#fffff0',
	        khaki: '#f0e68c',
	        laserlemon: '#ffff54',
	        lavender: '#e6e6fa',
	        lavenderblush: '#fff0f5',
	        lawngreen: '#7cfc00',
	        lemonchiffon: '#fffacd',
	        lightblue: '#add8e6',
	        lightcoral: '#f08080',
	        lightcyan: '#e0ffff',
	        lightgoldenrod: '#fafad2',
	        lightgoldenrodyellow: '#fafad2',
	        lightgray: '#d3d3d3',
	        lightgreen: '#90ee90',
	        lightgrey: '#d3d3d3',
	        lightpink: '#ffb6c1',
	        lightsalmon: '#ffa07a',
	        lightseagreen: '#20b2aa',
	        lightskyblue: '#87cefa',
	        lightslategray: '#778899',
	        lightslategrey: '#778899',
	        lightsteelblue: '#b0c4de',
	        lightyellow: '#ffffe0',
	        lime: '#00ff00',
	        limegreen: '#32cd32',
	        linen: '#faf0e6',
	        magenta: '#ff00ff',
	        maroon: '#800000',
	        maroon2: '#7f0000',
	        maroon3: '#b03060',
	        mediumaquamarine: '#66cdaa',
	        mediumblue: '#0000cd',
	        mediumorchid: '#ba55d3',
	        mediumpurple: '#9370db',
	        mediumseagreen: '#3cb371',
	        mediumslateblue: '#7b68ee',
	        mediumspringgreen: '#00fa9a',
	        mediumturquoise: '#48d1cc',
	        mediumvioletred: '#c71585',
	        midnightblue: '#191970',
	        mintcream: '#f5fffa',
	        mistyrose: '#ffe4e1',
	        moccasin: '#ffe4b5',
	        navajowhite: '#ffdead',
	        navy: '#000080',
	        oldlace: '#fdf5e6',
	        olive: '#808000',
	        olivedrab: '#6b8e23',
	        orange: '#ffa500',
	        orangered: '#ff4500',
	        orchid: '#da70d6',
	        palegoldenrod: '#eee8aa',
	        palegreen: '#98fb98',
	        paleturquoise: '#afeeee',
	        palevioletred: '#db7093',
	        papayawhip: '#ffefd5',
	        peachpuff: '#ffdab9',
	        peru: '#cd853f',
	        pink: '#ffc0cb',
	        plum: '#dda0dd',
	        powderblue: '#b0e0e6',
	        purple: '#800080',
	        purple2: '#7f007f',
	        purple3: '#a020f0',
	        rebeccapurple: '#663399',
	        red: '#ff0000',
	        rosybrown: '#bc8f8f',
	        royalblue: '#4169e1',
	        saddlebrown: '#8b4513',
	        salmon: '#fa8072',
	        sandybrown: '#f4a460',
	        seagreen: '#2e8b57',
	        seashell: '#fff5ee',
	        sienna: '#a0522d',
	        silver: '#c0c0c0',
	        skyblue: '#87ceeb',
	        slateblue: '#6a5acd',
	        slategray: '#708090',
	        slategrey: '#708090',
	        snow: '#fffafa',
	        springgreen: '#00ff7f',
	        steelblue: '#4682b4',
	        tan: '#d2b48c',
	        teal: '#008080',
	        thistle: '#d8bfd8',
	        tomato: '#ff6347',
	        turquoise: '#40e0d0',
	        violet: '#ee82ee',
	        wheat: '#f5deb3',
	        white: '#ffffff',
	        whitesmoke: '#f5f5f5',
	        yellow: '#ffff00',
	        yellowgreen: '#9acd32'
	    };

	    var w3cx11_1 = w3cx11;

	    var type$b = utils.type;





	    Color_1.prototype.name = function() {
	        var hex = rgb2hex_1(this._rgb, 'rgb');
	        for (var i = 0, list = Object.keys(w3cx11_1); i < list.length; i += 1) {
	            var n = list[i];

	            if (w3cx11_1[n] === hex) { return n.toLowerCase(); }
	        }
	        return hex;
	    };

	    input.format.named = function (name) {
	        name = name.toLowerCase();
	        if (w3cx11_1[name]) { return hex2rgb_1(w3cx11_1[name]); }
	        throw new Error('unknown color name: '+name);
	    };

	    input.autodetect.push({
	        p: 5,
	        test: function (h) {
	            var rest = [], len = arguments.length - 1;
	            while ( len-- > 0 ) rest[ len ] = arguments[ len + 1 ];

	            if (!rest.length && type$b(h) === 'string' && w3cx11_1[h.toLowerCase()]) {
	                return 'named';
	            }
	        }
	    });

	    var unpack$t = utils.unpack;

	    var rgb2num = function () {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        var ref = unpack$t(args, 'rgb');
	        var r = ref[0];
	        var g = ref[1];
	        var b = ref[2];
	        return (r << 16) + (g << 8) + b;
	    };

	    var rgb2num_1 = rgb2num;

	    var type$c = utils.type;

	    var num2rgb = function (num) {
	        if (type$c(num) == "number" && num >= 0 && num <= 0xFFFFFF) {
	            var r = num >> 16;
	            var g = (num >> 8) & 0xFF;
	            var b = num & 0xFF;
	            return [r,g,b,1];
	        }
	        throw new Error("unknown num color: "+num);
	    };

	    var num2rgb_1 = num2rgb;

	    var type$d = utils.type;



	    Color_1.prototype.num = function() {
	        return rgb2num_1(this._rgb);
	    };

	    chroma_1.num = function () {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['num']) ));
	    };

	    input.format.num = num2rgb_1;

	    input.autodetect.push({
	        p: 5,
	        test: function () {
	            var args = [], len = arguments.length;
	            while ( len-- ) args[ len ] = arguments[ len ];

	            if (args.length === 1 && type$d(args[0]) === 'number' && args[0] >= 0 && args[0] <= 0xFFFFFF) {
	                return 'num';
	            }
	        }
	    });

	    var unpack$u = utils.unpack;
	    var type$e = utils.type;
	    var round$5 = Math.round;

	    Color_1.prototype.rgb = function(rnd) {
	        if ( rnd === void 0 ) rnd=true;

	        if (rnd === false) { return this._rgb.slice(0,3); }
	        return this._rgb.slice(0,3).map(round$5);
	    };

	    Color_1.prototype.rgba = function(rnd) {
	        if ( rnd === void 0 ) rnd=true;

	        return this._rgb.slice(0,4).map(function (v,i) {
	            return i<3 ? (rnd === false ? v : round$5(v)) : v;
	        });
	    };

	    chroma_1.rgb = function () {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['rgb']) ));
	    };

	    input.format.rgb = function () {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        var rgba = unpack$u(args, 'rgba');
	        if (rgba[3] === undefined) { rgba[3] = 1; }
	        return rgba;
	    };

	    input.autodetect.push({
	        p: 3,
	        test: function () {
	            var args = [], len = arguments.length;
	            while ( len-- ) args[ len ] = arguments[ len ];

	            args = unpack$u(args, 'rgba');
	            if (type$e(args) === 'array' && (args.length === 3 ||
	                args.length === 4 && type$e(args[3]) == 'number' && args[3] >= 0 && args[3] <= 1)) {
	                return 'rgb';
	            }
	        }
	    });

	    /*
	     * Based on implementation by Neil Bartlett
	     * https://github.com/neilbartlett/color-temperature
	     */

	    var log = Math.log;

	    var temperature2rgb = function (kelvin) {
	        var temp = kelvin / 100;
	        var r,g,b;
	        if (temp < 66) {
	            r = 255;
	            g = -155.25485562709179 - 0.44596950469579133 * (g = temp-2) + 104.49216199393888 * log(g);
	            b = temp < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (b = temp-10) + 115.67994401066147 * log(b);
	        } else {
	            r = 351.97690566805693 + 0.114206453784165 * (r = temp-55) - 40.25366309332127 * log(r);
	            g = 325.4494125711974 + 0.07943456536662342 * (g = temp-50) - 28.0852963507957 * log(g);
	            b = 255;
	        }
	        return [r,g,b,1];
	    };

	    var temperature2rgb_1 = temperature2rgb;

	    /*
	     * Based on implementation by Neil Bartlett
	     * https://github.com/neilbartlett/color-temperature
	     **/


	    var unpack$v = utils.unpack;
	    var round$6 = Math.round;

	    var rgb2temperature = function () {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        var rgb = unpack$v(args, 'rgb');
	        var r = rgb[0], b = rgb[2];
	        var minTemp = 1000;
	        var maxTemp = 40000;
	        var eps = 0.4;
	        var temp;
	        while (maxTemp - minTemp > eps) {
	            temp = (maxTemp + minTemp) * 0.5;
	            var rgb$1 = temperature2rgb_1(temp);
	            if ((rgb$1[2] / rgb$1[0]) >= (b / r)) {
	                maxTemp = temp;
	            } else {
	                minTemp = temp;
	            }
	        }
	        return round$6(temp);
	    };

	    var rgb2temperature_1 = rgb2temperature;

	    Color_1.prototype.temp =
	    Color_1.prototype.kelvin =
	    Color_1.prototype.temperature = function() {
	        return rgb2temperature_1(this._rgb);
	    };

	    chroma_1.temp =
	    chroma_1.kelvin =
	    chroma_1.temperature = function () {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['temp']) ));
	    };

	    input.format.temp =
	    input.format.kelvin =
	    input.format.temperature = temperature2rgb_1;

	    var type$f = utils.type;

	    Color_1.prototype.alpha = function(a, mutate) {
	        if ( mutate === void 0 ) mutate=false;

	        if (a !== undefined && type$f(a) === 'number') {
	            if (mutate) {
	                this._rgb[3] = a;
	                return this;
	            }
	            return new Color_1([this._rgb[0], this._rgb[1], this._rgb[2], a], 'rgb');
	        }
	        return this._rgb[3];
	    };

	    Color_1.prototype.clipped = function() {
	        return this._rgb._clipped || false;
	    };

	    Color_1.prototype.darken = function(amount) {
	    	if ( amount === void 0 ) amount=1;

	    	var me = this;
	    	var lab = me.lab();
	    	lab[0] -= labConstants.Kn * amount;
	    	return new Color_1(lab, 'lab').alpha(me.alpha(), true);
	    };

	    Color_1.prototype.brighten = function(amount) {
	    	if ( amount === void 0 ) amount=1;

	    	return this.darken(-amount);
	    };

	    Color_1.prototype.darker = Color_1.prototype.darken;
	    Color_1.prototype.brighter = Color_1.prototype.brighten;

	    Color_1.prototype.get = function(mc) {
	        var ref = mc.split('.');
	        var mode = ref[0];
	        var channel = ref[1];
	        var src = this[mode]();
	        if (channel) {
	            var i = mode.indexOf(channel);
	            if (i > -1) { return src[i]; }
	            throw new Error(("unknown channel " + channel + " in mode " + mode));
	        } else {
	            return src;
	        }
	    };

	    var type$g = utils.type;
	    var pow$2 = Math.pow;

	    var EPS = 1e-7;
	    var MAX_ITER = 20;

	    Color_1.prototype.luminance = function(lum) {
	        if (lum !== undefined && type$g(lum) === 'number') {
	            if (lum === 0) {
	                // return pure black
	                return new Color_1([0,0,0,this._rgb[3]], 'rgb');
	            }
	            if (lum === 1) {
	                // return pure white
	                return new Color_1([255,255,255,this._rgb[3]], 'rgb');
	            }
	            // compute new color using...
	            var cur_lum = this.luminance();
	            var mode = 'rgb';
	            var max_iter = MAX_ITER;

	            var test = function (low, high) {
	                var mid = low.interpolate(high, 0.5, mode);
	                var lm = mid.luminance();
	                if (Math.abs(lum - lm) < EPS || !max_iter--) {
	                    // close enough
	                    return mid;
	                }
	                return lm > lum ? test(low, mid) : test(mid, high);
	            };

	            var rgb = (cur_lum > lum ? test(new Color_1([0,0,0]), this) : test(this, new Color_1([255,255,255]))).rgb();
	            return new Color_1(rgb.concat( [this._rgb[3]]));
	        }
	        return rgb2luminance.apply(void 0, (this._rgb).slice(0,3));
	    };


	    var rgb2luminance = function (r,g,b) {
	        // relative luminance
	        // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
	        r = luminance_x(r);
	        g = luminance_x(g);
	        b = luminance_x(b);
	        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
	    };

	    var luminance_x = function (x) {
	        x /= 255;
	        return x <= 0.03928 ? x/12.92 : pow$2((x+0.055)/1.055, 2.4);
	    };

	    var interpolator = {};

	    var type$h = utils.type;


	    var mix = function (col1, col2, f) {
	        if ( f === void 0 ) f=0.5;
	        var rest = [], len = arguments.length - 3;
	        while ( len-- > 0 ) rest[ len ] = arguments[ len + 3 ];

	        var mode = rest[0] || 'lrgb';
	        if (!interpolator[mode] && !rest.length) {
	            // fall back to the first supported mode
	            mode = Object.keys(interpolator)[0];
	        }
	        if (!interpolator[mode]) {
	            throw new Error(("interpolation mode " + mode + " is not defined"));
	        }
	        if (type$h(col1) !== 'object') { col1 = new Color_1(col1); }
	        if (type$h(col2) !== 'object') { col2 = new Color_1(col2); }
	        return interpolator[mode](col1, col2, f)
	            .alpha(col1.alpha() + f * (col2.alpha() - col1.alpha()));
	    };

	    Color_1.prototype.mix =
	    Color_1.prototype.interpolate = function(col2, f) {
	    	if ( f === void 0 ) f=0.5;
	    	var rest = [], len = arguments.length - 2;
	    	while ( len-- > 0 ) rest[ len ] = arguments[ len + 2 ];

	    	return mix.apply(void 0, [ this, col2, f ].concat( rest ));
	    };

	    Color_1.prototype.premultiply = function(mutate) {
	    	if ( mutate === void 0 ) mutate=false;

	    	var rgb = this._rgb;
	    	var a = rgb[3];
	    	if (mutate) {
	    		this._rgb = [rgb[0]*a, rgb[1]*a, rgb[2]*a, a];
	    		return this;
	    	} else {
	    		return new Color_1([rgb[0]*a, rgb[1]*a, rgb[2]*a, a], 'rgb');
	    	}
	    };

	    Color_1.prototype.saturate = function(amount) {
	    	if ( amount === void 0 ) amount=1;

	    	var me = this;
	    	var lch = me.lch();
	    	lch[1] += labConstants.Kn * amount;
	    	if (lch[1] < 0) { lch[1] = 0; }
	    	return new Color_1(lch, 'lch').alpha(me.alpha(), true);
	    };

	    Color_1.prototype.desaturate = function(amount) {
	    	if ( amount === void 0 ) amount=1;

	    	return this.saturate(-amount);
	    };

	    var type$i = utils.type;

	    Color_1.prototype.set = function(mc, value, mutate) {
	        if ( mutate === void 0 ) mutate=false;

	        var ref = mc.split('.');
	        var mode = ref[0];
	        var channel = ref[1];
	        var src = this[mode]();
	        if (channel) {
	            var i = mode.indexOf(channel);
	            if (i > -1) {
	                if (type$i(value) == 'string') {
	                    switch(value.charAt(0)) {
	                        case '+': src[i] += +value; break;
	                        case '-': src[i] += +value; break;
	                        case '*': src[i] *= +(value.substr(1)); break;
	                        case '/': src[i] /= +(value.substr(1)); break;
	                        default: src[i] = +value;
	                    }
	                } else if (type$i(value) === 'number') {
	                    src[i] = value;
	                } else {
	                    throw new Error("unsupported value for Color.set");
	                }
	                var out = new Color_1(src, mode);
	                if (mutate) {
	                    this._rgb = out._rgb;
	                    return this;
	                }
	                return out;
	            }
	            throw new Error(("unknown channel " + channel + " in mode " + mode));
	        } else {
	            return src;
	        }
	    };

	    var rgb$1 = function (col1, col2, f) {
	        var xyz0 = col1._rgb;
	        var xyz1 = col2._rgb;
	        return new Color_1(
	            xyz0[0] + f * (xyz1[0]-xyz0[0]),
	            xyz0[1] + f * (xyz1[1]-xyz0[1]),
	            xyz0[2] + f * (xyz1[2]-xyz0[2]),
	            'rgb'
	        )
	    };

	    // register interpolator
	    interpolator.rgb = rgb$1;

	    var sqrt$2 = Math.sqrt;
	    var pow$3 = Math.pow;

	    var lrgb = function (col1, col2, f) {
	        var ref = col1._rgb;
	        var x1 = ref[0];
	        var y1 = ref[1];
	        var z1 = ref[2];
	        var ref$1 = col2._rgb;
	        var x2 = ref$1[0];
	        var y2 = ref$1[1];
	        var z2 = ref$1[2];
	        return new Color_1(
	            sqrt$2(pow$3(x1,2) * (1-f) + pow$3(x2,2) * f),
	            sqrt$2(pow$3(y1,2) * (1-f) + pow$3(y2,2) * f),
	            sqrt$2(pow$3(z1,2) * (1-f) + pow$3(z2,2) * f),
	            'rgb'
	        )
	    };

	    // register interpolator
	    interpolator.lrgb = lrgb;

	    var lab$1 = function (col1, col2, f) {
	        var xyz0 = col1.lab();
	        var xyz1 = col2.lab();
	        return new Color_1(
	            xyz0[0] + f * (xyz1[0]-xyz0[0]),
	            xyz0[1] + f * (xyz1[1]-xyz0[1]),
	            xyz0[2] + f * (xyz1[2]-xyz0[2]),
	            'lab'
	        )
	    };

	    // register interpolator
	    interpolator.lab = lab$1;

	    var _hsx = function (col1, col2, f, m) {
	        var assign, assign$1;

	        var xyz0, xyz1;
	        if (m === 'hsl') {
	            xyz0 = col1.hsl();
	            xyz1 = col2.hsl();
	        } else if (m === 'hsv') {
	            xyz0 = col1.hsv();
	            xyz1 = col2.hsv();
	        } else if (m === 'hcg') {
	            xyz0 = col1.hcg();
	            xyz1 = col2.hcg();
	        } else if (m === 'hsi') {
	            xyz0 = col1.hsi();
	            xyz1 = col2.hsi();
	        } else if (m === 'lch' || m === 'hcl') {
	            m = 'hcl';
	            xyz0 = col1.hcl();
	            xyz1 = col2.hcl();
	        }

	        var hue0, hue1, sat0, sat1, lbv0, lbv1;
	        if (m.substr(0, 1) === 'h') {
	            (assign = xyz0, hue0 = assign[0], sat0 = assign[1], lbv0 = assign[2]);
	            (assign$1 = xyz1, hue1 = assign$1[0], sat1 = assign$1[1], lbv1 = assign$1[2]);
	        }

	        var sat, hue, lbv, dh;

	        if (!isNaN(hue0) && !isNaN(hue1)) {
	            // both colors have hue
	            if (hue1 > hue0 && hue1 - hue0 > 180) {
	                dh = hue1-(hue0+360);
	            } else if (hue1 < hue0 && hue0 - hue1 > 180) {
	                dh = hue1+360-hue0;
	            } else {
	                dh = hue1 - hue0;
	            }
	            hue = hue0 + f * dh;
	        } else if (!isNaN(hue0)) {
	            hue = hue0;
	            if ((lbv1 == 1 || lbv1 == 0) && m != 'hsv') { sat = sat0; }
	        } else if (!isNaN(hue1)) {
	            hue = hue1;
	            if ((lbv0 == 1 || lbv0 == 0) && m != 'hsv') { sat = sat1; }
	        } else {
	            hue = Number.NaN;
	        }

	        if (sat === undefined) { sat = sat0 + f * (sat1 - sat0); }
	        lbv = lbv0 + f * (lbv1-lbv0);
	        return new Color_1([hue, sat, lbv], m);
	    };

	    var lch$1 = function (col1, col2, f) {
	    	return _hsx(col1, col2, f, 'lch');
	    };

	    // register interpolator
	    interpolator.lch = lch$1;
	    interpolator.hcl = lch$1;

	    var num$1 = function (col1, col2, f) {
	        var c1 = col1.num();
	        var c2 = col2.num();
	        return new Color_1(c1 + f * (c2-c1), 'num')
	    };

	    // register interpolator
	    interpolator.num = num$1;

	    var hcg$1 = function (col1, col2, f) {
	    	return _hsx(col1, col2, f, 'hcg');
	    };

	    // register interpolator
	    interpolator.hcg = hcg$1;

	    var hsi$1 = function (col1, col2, f) {
	    	return _hsx(col1, col2, f, 'hsi');
	    };

	    // register interpolator
	    interpolator.hsi = hsi$1;

	    var hsl$1 = function (col1, col2, f) {
	    	return _hsx(col1, col2, f, 'hsl');
	    };

	    // register interpolator
	    interpolator.hsl = hsl$1;

	    var hsv$1 = function (col1, col2, f) {
	    	return _hsx(col1, col2, f, 'hsv');
	    };

	    // register interpolator
	    interpolator.hsv = hsv$1;

	    var clip_rgb$2 = utils.clip_rgb;
	    var pow$4 = Math.pow;
	    var sqrt$3 = Math.sqrt;
	    var PI$1 = Math.PI;
	    var cos$2 = Math.cos;
	    var sin$1 = Math.sin;
	    var atan2$1 = Math.atan2;

	    var average = function (colors, mode, weights) {
	        if ( mode === void 0 ) mode='lrgb';
	        if ( weights === void 0 ) weights=null;

	        var l = colors.length;
	        if (!weights) { weights = Array.from(new Array(l)).map(function () { return 1; }); }
	        // normalize weights
	        var k = l / weights.reduce(function(a, b) { return a + b; });
	        weights.forEach(function (w,i) { weights[i] *= k; });
	        // convert colors to Color objects
	        colors = colors.map(function (c) { return new Color_1(c); });
	        if (mode === 'lrgb') {
	            return _average_lrgb(colors, weights)
	        }
	        var first = colors.shift();
	        var xyz = first.get(mode);
	        var cnt = [];
	        var dx = 0;
	        var dy = 0;
	        // initial color
	        for (var i=0; i<xyz.length; i++) {
	            xyz[i] = (xyz[i] || 0) * weights[0];
	            cnt.push(isNaN(xyz[i]) ? 0 : weights[0]);
	            if (mode.charAt(i) === 'h' && !isNaN(xyz[i])) {
	                var A = xyz[i] / 180 * PI$1;
	                dx += cos$2(A) * weights[0];
	                dy += sin$1(A) * weights[0];
	            }
	        }

	        var alpha = first.alpha() * weights[0];
	        colors.forEach(function (c,ci) {
	            var xyz2 = c.get(mode);
	            alpha += c.alpha() * weights[ci+1];
	            for (var i=0; i<xyz.length; i++) {
	                if (!isNaN(xyz2[i])) {
	                    cnt[i] += weights[ci+1];
	                    if (mode.charAt(i) === 'h') {
	                        var A = xyz2[i] / 180 * PI$1;
	                        dx += cos$2(A) * weights[ci+1];
	                        dy += sin$1(A) * weights[ci+1];
	                    } else {
	                        xyz[i] += xyz2[i] * weights[ci+1];
	                    }
	                }
	            }
	        });

	        for (var i$1=0; i$1<xyz.length; i$1++) {
	            if (mode.charAt(i$1) === 'h') {
	                var A$1 = atan2$1(dy / cnt[i$1], dx / cnt[i$1]) / PI$1 * 180;
	                while (A$1 < 0) { A$1 += 360; }
	                while (A$1 >= 360) { A$1 -= 360; }
	                xyz[i$1] = A$1;
	            } else {
	                xyz[i$1] = xyz[i$1]/cnt[i$1];
	            }
	        }
	        alpha /= l;
	        return (new Color_1(xyz, mode)).alpha(alpha > 0.99999 ? 1 : alpha, true);
	    };


	    var _average_lrgb = function (colors, weights) {
	        var l = colors.length;
	        var xyz = [0,0,0,0];
	        for (var i=0; i < colors.length; i++) {
	            var col = colors[i];
	            var f = weights[i] / l;
	            var rgb = col._rgb;
	            xyz[0] += pow$4(rgb[0],2) * f;
	            xyz[1] += pow$4(rgb[1],2) * f;
	            xyz[2] += pow$4(rgb[2],2) * f;
	            xyz[3] += rgb[3] * f;
	        }
	        xyz[0] = sqrt$3(xyz[0]);
	        xyz[1] = sqrt$3(xyz[1]);
	        xyz[2] = sqrt$3(xyz[2]);
	        if (xyz[3] > 0.9999999) { xyz[3] = 1; }
	        return new Color_1(clip_rgb$2(xyz));
	    };

	    // minimal multi-purpose interface

	    // @requires utils color analyze


	    var type$j = utils.type;

	    var pow$5 = Math.pow;

	    var scale = function(colors) {

	        // constructor
	        var _mode = 'rgb';
	        var _nacol = chroma_1('#ccc');
	        var _spread = 0;
	        // const _fixed = false;
	        var _domain = [0, 1];
	        var _pos = [];
	        var _padding = [0,0];
	        var _classes = false;
	        var _colors = [];
	        var _out = false;
	        var _min = 0;
	        var _max = 1;
	        var _correctLightness = false;
	        var _colorCache = {};
	        var _useCache = true;
	        var _gamma = 1;

	        // private methods

	        var setColors = function(colors) {
	            colors = colors || ['#fff', '#000'];
	            if (colors && type$j(colors) === 'string' && chroma_1.brewer &&
	                chroma_1.brewer[colors.toLowerCase()]) {
	                colors = chroma_1.brewer[colors.toLowerCase()];
	            }
	            if (type$j(colors) === 'array') {
	                // handle single color
	                if (colors.length === 1) {
	                    colors = [colors[0], colors[0]];
	                }
	                // make a copy of the colors
	                colors = colors.slice(0);
	                // convert to chroma classes
	                for (var c=0; c<colors.length; c++) {
	                    colors[c] = chroma_1(colors[c]);
	                }
	                // auto-fill color position
	                _pos.length = 0;
	                for (var c$1=0; c$1<colors.length; c$1++) {
	                    _pos.push(c$1/(colors.length-1));
	                }
	            }
	            resetCache();
	            return _colors = colors;
	        };

	        var getClass = function(value) {
	            if (_classes != null) {
	                var n = _classes.length-1;
	                var i = 0;
	                while (i < n && value >= _classes[i]) {
	                    i++;
	                }
	                return i-1;
	            }
	            return 0;
	        };

	        var tMapLightness = function (t) { return t; };
	        var tMapDomain = function (t) { return t; };

	        // const classifyValue = function(value) {
	        //     let val = value;
	        //     if (_classes.length > 2) {
	        //         const n = _classes.length-1;
	        //         const i = getClass(value);
	        //         const minc = _classes[0] + ((_classes[1]-_classes[0]) * (0 + (_spread * 0.5)));  // center of 1st class
	        //         const maxc = _classes[n-1] + ((_classes[n]-_classes[n-1]) * (1 - (_spread * 0.5)));  // center of last class
	        //         val = _min + ((((_classes[i] + ((_classes[i+1] - _classes[i]) * 0.5)) - minc) / (maxc-minc)) * (_max - _min));
	        //     }
	        //     return val;
	        // };

	        var getColor = function(val, bypassMap) {
	            var col, t;
	            if (bypassMap == null) { bypassMap = false; }
	            if (isNaN(val) || (val === null)) { return _nacol; }
	            if (!bypassMap) {
	                if (_classes && (_classes.length > 2)) {
	                    // find the class
	                    var c = getClass(val);
	                    t = c / (_classes.length-2);
	                } else if (_max !== _min) {
	                    // just interpolate between min/max
	                    t = (val - _min) / (_max - _min);
	                } else {
	                    t = 1;
	                }
	            } else {
	                t = val;
	            }

	            // domain map
	            t = tMapDomain(t);

	            if (!bypassMap) {
	                t = tMapLightness(t);  // lightness correction
	            }

	            if (_gamma !== 1) { t = pow$5(t, _gamma); }

	            t = _padding[0] + (t * (1 - _padding[0] - _padding[1]));

	            t = Math.min(1, Math.max(0, t));

	            var k = Math.floor(t * 10000);

	            if (_useCache && _colorCache[k]) {
	                col = _colorCache[k];
	            } else {
	                if (type$j(_colors) === 'array') {
	                    //for i in [0.._pos.length-1]
	                    for (var i=0; i<_pos.length; i++) {
	                        var p = _pos[i];
	                        if (t <= p) {
	                            col = _colors[i];
	                            break;
	                        }
	                        if ((t >= p) && (i === (_pos.length-1))) {
	                            col = _colors[i];
	                            break;
	                        }
	                        if (t > p && t < _pos[i+1]) {
	                            t = (t-p)/(_pos[i+1]-p);
	                            col = chroma_1.interpolate(_colors[i], _colors[i+1], t, _mode);
	                            break;
	                        }
	                    }
	                } else if (type$j(_colors) === 'function') {
	                    col = _colors(t);
	                }
	                if (_useCache) { _colorCache[k] = col; }
	            }
	            return col;
	        };

	        var resetCache = function () { return _colorCache = {}; };

	        setColors(colors);

	        // public interface

	        var f = function(v) {
	            var c = chroma_1(getColor(v));
	            if (_out && c[_out]) { return c[_out](); } else { return c; }
	        };

	        f.classes = function(classes) {
	            if (classes != null) {
	                if (type$j(classes) === 'array') {
	                    _classes = classes;
	                    _domain = [classes[0], classes[classes.length-1]];
	                } else {
	                    var d = chroma_1.analyze(_domain);
	                    if (classes === 0) {
	                        _classes = [d.min, d.max];
	                    } else {
	                        _classes = chroma_1.limits(d, 'e', classes);
	                    }
	                }
	                return f;
	            }
	            return _classes;
	        };


	        f.domain = function(domain) {
	            if (!arguments.length) {
	                return _domain;
	            }
	            _min = domain[0];
	            _max = domain[domain.length-1];
	            _pos = [];
	            var k = _colors.length;
	            if ((domain.length === k) && (_min !== _max)) {
	                // update positions
	                for (var i = 0, list = Array.from(domain); i < list.length; i += 1) {
	                    var d = list[i];

	                  _pos.push((d-_min) / (_max-_min));
	                }
	            } else {
	                for (var c=0; c<k; c++) {
	                    _pos.push(c/(k-1));
	                }
	                if (domain.length > 2) {
	                    // set domain map
	                    var tOut = domain.map(function (d,i) { return i/(domain.length-1); });
	                    var tBreaks = domain.map(function (d) { return (d - _min) / (_max - _min); });
	                    if (!tBreaks.every(function (val, i) { return tOut[i] === val; })) {
	                        tMapDomain = function (t) {
	                            if (t <= 0 || t >= 1) { return t; }
	                            var i = 0;
	                            while (t >= tBreaks[i+1]) { i++; }
	                            var f = (t - tBreaks[i]) / (tBreaks[i+1] - tBreaks[i]);
	                            var out = tOut[i] + f * (tOut[i+1] - tOut[i]);
	                            return out;
	                        };
	                    }

	                }
	            }
	            _domain = [_min, _max];
	            return f;
	        };

	        f.mode = function(_m) {
	            if (!arguments.length) {
	                return _mode;
	            }
	            _mode = _m;
	            resetCache();
	            return f;
	        };

	        f.range = function(colors, _pos) {
	            setColors(colors);
	            return f;
	        };

	        f.out = function(_o) {
	            _out = _o;
	            return f;
	        };

	        f.spread = function(val) {
	            if (!arguments.length) {
	                return _spread;
	            }
	            _spread = val;
	            return f;
	        };

	        f.correctLightness = function(v) {
	            if (v == null) { v = true; }
	            _correctLightness = v;
	            resetCache();
	            if (_correctLightness) {
	                tMapLightness = function(t) {
	                    var L0 = getColor(0, true).lab()[0];
	                    var L1 = getColor(1, true).lab()[0];
	                    var pol = L0 > L1;
	                    var L_actual = getColor(t, true).lab()[0];
	                    var L_ideal = L0 + ((L1 - L0) * t);
	                    var L_diff = L_actual - L_ideal;
	                    var t0 = 0;
	                    var t1 = 1;
	                    var max_iter = 20;
	                    while ((Math.abs(L_diff) > 1e-2) && (max_iter-- > 0)) {
	                        (function() {
	                            if (pol) { L_diff *= -1; }
	                            if (L_diff < 0) {
	                                t0 = t;
	                                t += (t1 - t) * 0.5;
	                            } else {
	                                t1 = t;
	                                t += (t0 - t) * 0.5;
	                            }
	                            L_actual = getColor(t, true).lab()[0];
	                            return L_diff = L_actual - L_ideal;
	                        })();
	                    }
	                    return t;
	                };
	            } else {
	                tMapLightness = function (t) { return t; };
	            }
	            return f;
	        };

	        f.padding = function(p) {
	            if (p != null) {
	                if (type$j(p) === 'number') {
	                    p = [p,p];
	                }
	                _padding = p;
	                return f;
	            } else {
	                return _padding;
	            }
	        };

	        f.colors = function(numColors, out) {
	            // If no arguments are given, return the original colors that were provided
	            if (arguments.length < 2) { out = 'hex'; }
	            var result = [];

	            if (arguments.length === 0) {
	                result = _colors.slice(0);

	            } else if (numColors === 1) {
	                result = [f(0.5)];

	            } else if (numColors > 1) {
	                var dm = _domain[0];
	                var dd = _domain[1] - dm;
	                result = __range__(0, numColors, false).map(function (i) { return f( dm + ((i/(numColors-1)) * dd) ); });

	            } else { // returns all colors based on the defined classes
	                colors = [];
	                var samples = [];
	                if (_classes && (_classes.length > 2)) {
	                    for (var i = 1, end = _classes.length, asc = 1 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
	                        samples.push((_classes[i-1]+_classes[i])*0.5);
	                    }
	                } else {
	                    samples = _domain;
	                }
	                result = samples.map(function (v) { return f(v); });
	            }

	            if (chroma_1[out]) {
	                result = result.map(function (c) { return c[out](); });
	            }
	            return result;
	        };

	        f.cache = function(c) {
	            if (c != null) {
	                _useCache = c;
	                return f;
	            } else {
	                return _useCache;
	            }
	        };

	        f.gamma = function(g) {
	            if (g != null) {
	                _gamma = g;
	                return f;
	            } else {
	                return _gamma;
	            }
	        };

	        f.nodata = function(d) {
	            if (d != null) {
	                _nacol = chroma_1(d);
	                return f;
	            } else {
	                return _nacol;
	            }
	        };

	        return f;
	    };

	    function __range__(left, right, inclusive) {
	      var range = [];
	      var ascending = left < right;
	      var end = !inclusive ? right : ascending ? right + 1 : right - 1;
	      for (var i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
	        range.push(i);
	      }
	      return range;
	    }

	    //
	    // interpolates between a set of colors uzing a bezier spline
	    //

	    // @requires utils lab




	    var bezier = function(colors) {
	        var assign, assign$1, assign$2;

	        var I, lab0, lab1, lab2;
	        colors = colors.map(function (c) { return new Color_1(c); });
	        if (colors.length === 2) {
	            // linear interpolation
	            (assign = colors.map(function (c) { return c.lab(); }), lab0 = assign[0], lab1 = assign[1]);
	            I = function(t) {
	                var lab = ([0, 1, 2].map(function (i) { return lab0[i] + (t * (lab1[i] - lab0[i])); }));
	                return new Color_1(lab, 'lab');
	            };
	        } else if (colors.length === 3) {
	            // quadratic bezier interpolation
	            (assign$1 = colors.map(function (c) { return c.lab(); }), lab0 = assign$1[0], lab1 = assign$1[1], lab2 = assign$1[2]);
	            I = function(t) {
	                var lab = ([0, 1, 2].map(function (i) { return ((1-t)*(1-t) * lab0[i]) + (2 * (1-t) * t * lab1[i]) + (t * t * lab2[i]); }));
	                return new Color_1(lab, 'lab');
	            };
	        } else if (colors.length === 4) {
	            // cubic bezier interpolation
	            var lab3;
	            (assign$2 = colors.map(function (c) { return c.lab(); }), lab0 = assign$2[0], lab1 = assign$2[1], lab2 = assign$2[2], lab3 = assign$2[3]);
	            I = function(t) {
	                var lab = ([0, 1, 2].map(function (i) { return ((1-t)*(1-t)*(1-t) * lab0[i]) + (3 * (1-t) * (1-t) * t * lab1[i]) + (3 * (1-t) * t * t * lab2[i]) + (t*t*t * lab3[i]); }));
	                return new Color_1(lab, 'lab');
	            };
	        } else if (colors.length === 5) {
	            var I0 = bezier(colors.slice(0, 3));
	            var I1 = bezier(colors.slice(2, 5));
	            I = function(t) {
	                if (t < 0.5) {
	                    return I0(t*2);
	                } else {
	                    return I1((t-0.5)*2);
	                }
	            };
	        }
	        return I;
	    };

	    var bezier_1 = function (colors) {
	        var f = bezier(colors);
	        f.scale = function () { return scale(f); };
	        return f;
	    };

	    /*
	     * interpolates between a set of colors uzing a bezier spline
	     * blend mode formulas taken from http://www.venture-ware.com/kevin/coding/lets-learn-math-photoshop-blend-modes/
	     */




	    var blend = function (bottom, top, mode) {
	        if (!blend[mode]) {
	            throw new Error('unknown blend mode ' + mode);
	        }
	        return blend[mode](bottom, top);
	    };

	    var blend_f = function (f) { return function (bottom,top) {
	            var c0 = chroma_1(top).rgb();
	            var c1 = chroma_1(bottom).rgb();
	            return chroma_1.rgb(f(c0, c1));
	        }; };

	    var each = function (f) { return function (c0, c1) {
	            var out = [];
	            out[0] = f(c0[0], c1[0]);
	            out[1] = f(c0[1], c1[1]);
	            out[2] = f(c0[2], c1[2]);
	            return out;
	        }; };

	    var normal = function (a) { return a; };
	    var multiply = function (a,b) { return a * b / 255; };
	    var darken$1 = function (a,b) { return a > b ? b : a; };
	    var lighten = function (a,b) { return a > b ? a : b; };
	    var screen = function (a,b) { return 255 * (1 - (1-a/255) * (1-b/255)); };
	    var overlay = function (a,b) { return b < 128 ? 2 * a * b / 255 : 255 * (1 - 2 * (1 - a / 255 ) * ( 1 - b / 255 )); };
	    var burn = function (a,b) { return 255 * (1 - (1 - b / 255) / (a/255)); };
	    var dodge = function (a,b) {
	        if (a === 255) { return 255; }
	        a = 255 * (b / 255) / (1 - a / 255);
	        return a > 255 ? 255 : a
	    };

	    // # add = (a,b) ->
	    // #     if (a + b > 255) then 255 else a + b

	    blend.normal = blend_f(each(normal));
	    blend.multiply = blend_f(each(multiply));
	    blend.screen = blend_f(each(screen));
	    blend.overlay = blend_f(each(overlay));
	    blend.darken = blend_f(each(darken$1));
	    blend.lighten = blend_f(each(lighten));
	    blend.dodge = blend_f(each(dodge));
	    blend.burn = blend_f(each(burn));
	    // blend.add = blend_f(each(add));

	    var blend_1 = blend;

	    // cubehelix interpolation
	    // based on D.A. Green "A colour scheme for the display of astronomical intensity images"
	    // http://astron-soc.in/bulletin/11June/289392011.pdf

	    var type$k = utils.type;
	    var clip_rgb$3 = utils.clip_rgb;
	    var TWOPI$2 = utils.TWOPI;
	    var pow$6 = Math.pow;
	    var sin$2 = Math.sin;
	    var cos$3 = Math.cos;


	    var cubehelix = function(start, rotations, hue, gamma, lightness) {
	        if ( start === void 0 ) start=300;
	        if ( rotations === void 0 ) rotations=-1.5;
	        if ( hue === void 0 ) hue=1;
	        if ( gamma === void 0 ) gamma=1;
	        if ( lightness === void 0 ) lightness=[0,1];

	        var dh = 0, dl;
	        if (type$k(lightness) === 'array') {
	            dl = lightness[1] - lightness[0];
	        } else {
	            dl = 0;
	            lightness = [lightness, lightness];
	        }

	        var f = function(fract) {
	            var a = TWOPI$2 * (((start+120)/360) + (rotations * fract));
	            var l = pow$6(lightness[0] + (dl * fract), gamma);
	            var h = dh !== 0 ? hue[0] + (fract * dh) : hue;
	            var amp = (h * l * (1-l)) / 2;
	            var cos_a = cos$3(a);
	            var sin_a = sin$2(a);
	            var r = l + (amp * ((-0.14861 * cos_a) + (1.78277* sin_a)));
	            var g = l + (amp * ((-0.29227 * cos_a) - (0.90649* sin_a)));
	            var b = l + (amp * (+1.97294 * cos_a));
	            return chroma_1(clip_rgb$3([r*255,g*255,b*255,1]));
	        };

	        f.start = function(s) {
	            if ((s == null)) { return start; }
	            start = s;
	            return f;
	        };

	        f.rotations = function(r) {
	            if ((r == null)) { return rotations; }
	            rotations = r;
	            return f;
	        };

	        f.gamma = function(g) {
	            if ((g == null)) { return gamma; }
	            gamma = g;
	            return f;
	        };

	        f.hue = function(h) {
	            if ((h == null)) { return hue; }
	            hue = h;
	            if (type$k(hue) === 'array') {
	                dh = hue[1] - hue[0];
	                if (dh === 0) { hue = hue[1]; }
	            } else {
	                dh = 0;
	            }
	            return f;
	        };

	        f.lightness = function(h) {
	            if ((h == null)) { return lightness; }
	            if (type$k(h) === 'array') {
	                lightness = h;
	                dl = h[1] - h[0];
	            } else {
	                lightness = [h,h];
	                dl = 0;
	            }
	            return f;
	        };

	        f.scale = function () { return chroma_1.scale(f); };

	        f.hue(hue);

	        return f;
	    };

	    var digits = '0123456789abcdef';

	    var floor$2 = Math.floor;
	    var random = Math.random;

	    var random_1 = function () {
	        var code = '#';
	        for (var i=0; i<6; i++) {
	            code += digits.charAt(floor$2(random() * 16));
	        }
	        return new Color_1(code, 'hex');
	    };

	    var log$1 = Math.log;
	    var pow$7 = Math.pow;
	    var floor$3 = Math.floor;
	    var abs = Math.abs;


	    var analyze = function (data, key) {
	        if ( key === void 0 ) key=null;

	        var r = {
	            min: Number.MAX_VALUE,
	            max: Number.MAX_VALUE*-1,
	            sum: 0,
	            values: [],
	            count: 0
	        };
	        if (type(data) === 'object') {
	            data = Object.values(data);
	        }
	        data.forEach(function (val) {
	            if (key && type(val) === 'object') { val = val[key]; }
	            if (val !== undefined && val !== null && !isNaN(val)) {
	                r.values.push(val);
	                r.sum += val;
	                if (val < r.min) { r.min = val; }
	                if (val > r.max) { r.max = val; }
	                r.count += 1;
	            }
	        });

	        r.domain = [r.min, r.max];

	        r.limits = function (mode, num) { return limits(r, mode, num); };

	        return r;
	    };


	    var limits = function (data, mode, num) {
	        if ( mode === void 0 ) mode='equal';
	        if ( num === void 0 ) num=7;

	        if (type(data) == 'array') {
	            data = analyze(data);
	        }
	        var min = data.min;
	        var max = data.max;
	        var values = data.values.sort(function (a,b) { return a-b; });

	        if (num === 1) { return [min,max]; }

	        var limits = [];

	        if (mode.substr(0,1) === 'c') { // continuous
	            limits.push(min);
	            limits.push(max);
	        }

	        if (mode.substr(0,1) === 'e') { // equal interval
	            limits.push(min);
	            for (var i=1; i<num; i++) {
	                limits.push(min+((i/num)*(max-min)));
	            }
	            limits.push(max);
	        }

	        else if (mode.substr(0,1) === 'l') { // log scale
	            if (min <= 0) {
	                throw new Error('Logarithmic scales are only possible for values > 0');
	            }
	            var min_log = Math.LOG10E * log$1(min);
	            var max_log = Math.LOG10E * log$1(max);
	            limits.push(min);
	            for (var i$1=1; i$1<num; i$1++) {
	                limits.push(pow$7(10, min_log + ((i$1/num) * (max_log - min_log))));
	            }
	            limits.push(max);
	        }

	        else if (mode.substr(0,1) === 'q') { // quantile scale
	            limits.push(min);
	            for (var i$2=1; i$2<num; i$2++) {
	                var p = ((values.length-1) * i$2)/num;
	                var pb = floor$3(p);
	                if (pb === p) {
	                    limits.push(values[pb]);
	                } else { // p > pb
	                    var pr = p - pb;
	                    limits.push((values[pb]*(1-pr)) + (values[pb+1]*pr));
	                }
	            }
	            limits.push(max);

	        }

	        else if (mode.substr(0,1) === 'k') { // k-means clustering
	            /*
	            implementation based on
	            http://code.google.com/p/figue/source/browse/trunk/figue.js#336
	            simplified for 1-d input values
	            */
	            var cluster;
	            var n = values.length;
	            var assignments = new Array(n);
	            var clusterSizes = new Array(num);
	            var repeat = true;
	            var nb_iters = 0;
	            var centroids = null;

	            // get seed values
	            centroids = [];
	            centroids.push(min);
	            for (var i$3=1; i$3<num; i$3++) {
	                centroids.push(min + ((i$3/num) * (max-min)));
	            }
	            centroids.push(max);

	            while (repeat) {
	                // assignment step
	                for (var j=0; j<num; j++) {
	                    clusterSizes[j] = 0;
	                }
	                for (var i$4=0; i$4<n; i$4++) {
	                    var value = values[i$4];
	                    var mindist = Number.MAX_VALUE;
	                    var best = (void 0);
	                    for (var j$1=0; j$1<num; j$1++) {
	                        var dist = abs(centroids[j$1]-value);
	                        if (dist < mindist) {
	                            mindist = dist;
	                            best = j$1;
	                        }
	                        clusterSizes[best]++;
	                        assignments[i$4] = best;
	                    }
	                }

	                // update centroids step
	                var newCentroids = new Array(num);
	                for (var j$2=0; j$2<num; j$2++) {
	                    newCentroids[j$2] = null;
	                }
	                for (var i$5=0; i$5<n; i$5++) {
	                    cluster = assignments[i$5];
	                    if (newCentroids[cluster] === null) {
	                        newCentroids[cluster] = values[i$5];
	                    } else {
	                        newCentroids[cluster] += values[i$5];
	                    }
	                }
	                for (var j$3=0; j$3<num; j$3++) {
	                    newCentroids[j$3] *= 1/clusterSizes[j$3];
	                }

	                // check convergence
	                repeat = false;
	                for (var j$4=0; j$4<num; j$4++) {
	                    if (newCentroids[j$4] !== centroids[j$4]) {
	                        repeat = true;
	                        break;
	                    }
	                }

	                centroids = newCentroids;
	                nb_iters++;

	                if (nb_iters > 200) {
	                    repeat = false;
	                }
	            }

	            // finished k-means clustering
	            // the next part is borrowed from gabrielflor.it
	            var kClusters = {};
	            for (var j$5=0; j$5<num; j$5++) {
	                kClusters[j$5] = [];
	            }
	            for (var i$6=0; i$6<n; i$6++) {
	                cluster = assignments[i$6];
	                kClusters[cluster].push(values[i$6]);
	            }
	            var tmpKMeansBreaks = [];
	            for (var j$6=0; j$6<num; j$6++) {
	                tmpKMeansBreaks.push(kClusters[j$6][0]);
	                tmpKMeansBreaks.push(kClusters[j$6][kClusters[j$6].length-1]);
	            }
	            tmpKMeansBreaks = tmpKMeansBreaks.sort(function (a,b){ return a-b; });
	            limits.push(tmpKMeansBreaks[0]);
	            for (var i$7=1; i$7 < tmpKMeansBreaks.length; i$7+= 2) {
	                var v = tmpKMeansBreaks[i$7];
	                if (!isNaN(v) && (limits.indexOf(v) === -1)) {
	                    limits.push(v);
	                }
	            }
	        }
	        return limits;
	    };

	    var analyze_1 = {analyze: analyze, limits: limits};

	    var contrast = function (a, b) {
	        // WCAG contrast ratio
	        // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
	        a = new Color_1(a);
	        b = new Color_1(b);
	        var l1 = a.luminance();
	        var l2 = b.luminance();
	        return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
	    };

	    var sqrt$4 = Math.sqrt;
	    var atan2$2 = Math.atan2;
	    var abs$1 = Math.abs;
	    var cos$4 = Math.cos;
	    var PI$2 = Math.PI;

	    var deltaE = function(a, b, L, C) {
	        if ( L === void 0 ) L=1;
	        if ( C === void 0 ) C=1;

	        // Delta E (CMC)
	        // see http://www.brucelindbloom.com/index.html?Eqn_DeltaE_CMC.html
	        a = new Color_1(a);
	        b = new Color_1(b);
	        var ref = Array.from(a.lab());
	        var L1 = ref[0];
	        var a1 = ref[1];
	        var b1 = ref[2];
	        var ref$1 = Array.from(b.lab());
	        var L2 = ref$1[0];
	        var a2 = ref$1[1];
	        var b2 = ref$1[2];
	        var c1 = sqrt$4((a1 * a1) + (b1 * b1));
	        var c2 = sqrt$4((a2 * a2) + (b2 * b2));
	        var sl = L1 < 16.0 ? 0.511 : (0.040975 * L1) / (1.0 + (0.01765 * L1));
	        var sc = ((0.0638 * c1) / (1.0 + (0.0131 * c1))) + 0.638;
	        var h1 = c1 < 0.000001 ? 0.0 : (atan2$2(b1, a1) * 180.0) / PI$2;
	        while (h1 < 0) { h1 += 360; }
	        while (h1 >= 360) { h1 -= 360; }
	        var t = (h1 >= 164.0) && (h1 <= 345.0) ? (0.56 + abs$1(0.2 * cos$4((PI$2 * (h1 + 168.0)) / 180.0))) : (0.36 + abs$1(0.4 * cos$4((PI$2 * (h1 + 35.0)) / 180.0)));
	        var c4 = c1 * c1 * c1 * c1;
	        var f = sqrt$4(c4 / (c4 + 1900.0));
	        var sh = sc * (((f * t) + 1.0) - f);
	        var delL = L1 - L2;
	        var delC = c1 - c2;
	        var delA = a1 - a2;
	        var delB = b1 - b2;
	        var dH2 = ((delA * delA) + (delB * delB)) - (delC * delC);
	        var v1 = delL / (L * sl);
	        var v2 = delC / (C * sc);
	        var v3 = sh;
	        return sqrt$4((v1 * v1) + (v2 * v2) + (dH2 / (v3 * v3)));
	    };

	    // simple Euclidean distance
	    var distance = function(a, b, mode) {
	        if ( mode === void 0 ) mode='lab';

	        // Delta E (CIE 1976)
	        // see http://www.brucelindbloom.com/index.html?Equations.html
	        a = new Color_1(a);
	        b = new Color_1(b);
	        var l1 = a.get(mode);
	        var l2 = b.get(mode);
	        var sum_sq = 0;
	        for (var i in l1) {
	            var d = (l1[i] || 0) - (l2[i] || 0);
	            sum_sq += d*d;
	        }
	        return Math.sqrt(sum_sq);
	    };

	    var valid = function () {
	        var args = [], len = arguments.length;
	        while ( len-- ) args[ len ] = arguments[ len ];

	        try {
	            new (Function.prototype.bind.apply( Color_1, [ null ].concat( args) ));
	            return true;
	        } catch (e) {
	            return false;
	        }
	    };

	    // some pre-defined color scales:




	    var scales = {
	    	cool: function cool() { return scale([chroma_1.hsl(180,1,.9), chroma_1.hsl(250,.7,.4)]) },
	    	hot: function hot() { return scale(['#000','#f00','#ff0','#fff']).mode('rgb') }
	    };

	    /**
	        ColorBrewer colors for chroma.js

	        Copyright (c) 2002 Cynthia Brewer, Mark Harrower, and The
	        Pennsylvania State University.

	        Licensed under the Apache License, Version 2.0 (the "License");
	        you may not use this file except in compliance with the License.
	        You may obtain a copy of the License at
	        http://www.apache.org/licenses/LICENSE-2.0

	        Unless required by applicable law or agreed to in writing, software distributed
	        under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
	        CONDITIONS OF ANY KIND, either express or implied. See the License for the
	        specific language governing permissions and limitations under the License.
	    */

	    var colorbrewer = {
	        // sequential
	        OrRd: ['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#b30000', '#7f0000'],
	        PuBu: ['#fff7fb', '#ece7f2', '#d0d1e6', '#a6bddb', '#74a9cf', '#3690c0', '#0570b0', '#045a8d', '#023858'],
	        BuPu: ['#f7fcfd', '#e0ecf4', '#bfd3e6', '#9ebcda', '#8c96c6', '#8c6bb1', '#88419d', '#810f7c', '#4d004b'],
	        Oranges: ['#fff5eb', '#fee6ce', '#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801', '#a63603', '#7f2704'],
	        BuGn: ['#f7fcfd', '#e5f5f9', '#ccece6', '#99d8c9', '#66c2a4', '#41ae76', '#238b45', '#006d2c', '#00441b'],
	        YlOrBr: ['#ffffe5', '#fff7bc', '#fee391', '#fec44f', '#fe9929', '#ec7014', '#cc4c02', '#993404', '#662506'],
	        YlGn: ['#ffffe5', '#f7fcb9', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#006837', '#004529'],
	        Reds: ['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d'],
	        RdPu: ['#fff7f3', '#fde0dd', '#fcc5c0', '#fa9fb5', '#f768a1', '#dd3497', '#ae017e', '#7a0177', '#49006a'],
	        Greens: ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b'],
	        YlGnBu: ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58'],
	        Purples: ['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#54278f', '#3f007d'],
	        GnBu: ['#f7fcf0', '#e0f3db', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#0868ac', '#084081'],
	        Greys: ['#ffffff', '#f0f0f0', '#d9d9d9', '#bdbdbd', '#969696', '#737373', '#525252', '#252525', '#000000'],
	        YlOrRd: ['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026'],
	        PuRd: ['#f7f4f9', '#e7e1ef', '#d4b9da', '#c994c7', '#df65b0', '#e7298a', '#ce1256', '#980043', '#67001f'],
	        Blues: ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b'],
	        PuBuGn: ['#fff7fb', '#ece2f0', '#d0d1e6', '#a6bddb', '#67a9cf', '#3690c0', '#02818a', '#016c59', '#014636'],
	        Viridis: ['#440154', '#482777', '#3f4a8a', '#31678e', '#26838f', '#1f9d8a', '#6cce5a', '#b6de2b', '#fee825'],

	        // diverging

	        Spectral: ['#9e0142', '#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#e6f598', '#abdda4', '#66c2a5', '#3288bd', '#5e4fa2'],
	        RdYlGn: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850', '#006837'],
	        RdBu: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#f7f7f7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac', '#053061'],
	        PiYG: ['#8e0152', '#c51b7d', '#de77ae', '#f1b6da', '#fde0ef', '#f7f7f7', '#e6f5d0', '#b8e186', '#7fbc41', '#4d9221', '#276419'],
	        PRGn: ['#40004b', '#762a83', '#9970ab', '#c2a5cf', '#e7d4e8', '#f7f7f7', '#d9f0d3', '#a6dba0', '#5aae61', '#1b7837', '#00441b'],
	        RdYlBu: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695'],
	        BrBG: ['#543005', '#8c510a', '#bf812d', '#dfc27d', '#f6e8c3', '#f5f5f5', '#c7eae5', '#80cdc1', '#35978f', '#01665e', '#003c30'],
	        RdGy: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#ffffff', '#e0e0e0', '#bababa', '#878787', '#4d4d4d', '#1a1a1a'],
	        PuOr: ['#7f3b08', '#b35806', '#e08214', '#fdb863', '#fee0b6', '#f7f7f7', '#d8daeb', '#b2abd2', '#8073ac', '#542788', '#2d004b'],

	        // qualitative

	        Set2: ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494', '#b3b3b3'],
	        Accent: ['#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0', '#f0027f', '#bf5b17', '#666666'],
	        Set1: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'],
	        Set3: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5', '#ffed6f'],
	        Dark2: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666'],
	        Paired: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928'],
	        Pastel2: ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4', '#e6f5c9', '#fff2ae', '#f1e2cc', '#cccccc'],
	        Pastel1: ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc', '#e5d8bd', '#fddaec', '#f2f2f2'],
	    };

	    // add lowercase aliases for case-insensitive matches
	    for (var i$1 = 0, list$1 = Object.keys(colorbrewer); i$1 < list$1.length; i$1 += 1) {
	        var key = list$1[i$1];

	        colorbrewer[key.toLowerCase()] = colorbrewer[key];
	    }

	    var colorbrewer_1 = colorbrewer;

	    // feel free to comment out anything to rollup
	    // a smaller chroma.js built

	    // io --> convert colors















	    // operators --> modify existing Colors










	    // interpolators










	    // generators -- > create new colors
	    chroma_1.average = average;
	    chroma_1.bezier = bezier_1;
	    chroma_1.blend = blend_1;
	    chroma_1.cubehelix = cubehelix;
	    chroma_1.mix = chroma_1.interpolate = mix;
	    chroma_1.random = random_1;
	    chroma_1.scale = scale;

	    // other utility methods
	    chroma_1.analyze = analyze_1.analyze;
	    chroma_1.contrast = contrast;
	    chroma_1.deltaE = deltaE;
	    chroma_1.distance = distance;
	    chroma_1.limits = analyze_1.limits;
	    chroma_1.valid = valid;

	    // scale
	    chroma_1.scales = scales;

	    // colors
	    chroma_1.colors = w3cx11_1;
	    chroma_1.brewer = colorbrewer_1;

	    var chroma_js = chroma_1;

	    return chroma_js;

	})));
	});

	// todo: remove chroma dependency or find a way to optimize tree shaking
	// chroma issue with tree shaking: https://github.com/gka/chroma.js/issues/138
	var categoricalColors = [
	    '#78b4c6',
	    '#1c9820',
	    '#ff0087',
	    '#9bb64b',
	    '#628df2',
	    '#0db293',
	    '#f14330',
	    '#b8949e',
	    '#e49c4f',
	    '#a665e4',
	];
	function brighten(hexColor, factor) {
	    return chroma.hex(hexColor).brighten(factor).hex();
	}
	function darken(hexColor, factor) {
	    return chroma.hex(hexColor).darken(factor).hex();
	}
	function desaturate(hexColor, factor) {
	    return chroma.hex(hexColor).desaturate(factor).hex();
	}

	/*! *****************************************************************************
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
	/* global Reflect, Promise */

	var extendStatics = function(d, b) {
	    extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return extendStatics(d, b);
	};

	function __extends(d, b) {
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

	function __spread() {
	    for (var ar = [], i = 0; i < arguments.length; i++)
	        ar = ar.concat(__read(arguments[i]));
	    return ar;
	}

	function nullFunction() { }
	// Code inspired by https://stackoverflow.com/a/22909984
	function getComputedStyleWithoutDefaults(element, properties) {
	    // creating an empty dummy object to compare with
	    var dummy = document.createElementNS('http://www.w3.org/2000/svg', 'element-' + new Date().getTime());
	    element.parentNode.appendChild(dummy);
	    // getting computed styles for both elements
	    var defaultStyles = getComputedStyle(dummy);
	    var elementStyles = getComputedStyle(element);
	    // calculating the difference
	    var diffObj = {};
	    for (var i = 0; i < properties.length; ++i) {
	        if (defaultStyles[properties[i]] !== elementStyles[properties[i]]) {
	            diffObj[properties[i]] = elementStyles[properties[i]];
	        }
	    }
	    // clear dom
	    dummy.remove();
	    return diffObj;
	}
	// TODO: Write unit tests for this function
	// TODO: This function would do well as its own npm module
	function calculateSpecificity(selector) {
	    // Calculates the specificity of a selector according to
	    // https://www.w3.org/TR/2018/REC-selectors-3-20181106/#specificity
	    selector = selector || '';
	    function numMatches(regex) {
	        return (selector.match(regex) || []).length;
	    }
	    var identifier = '[a-zA-Z][a-zA-Z0-9-_]+';
	    var numIds = numMatches(new RegExp("#" + identifier, 'g'));
	    var numClasses = numMatches(new RegExp("\\." + identifier, 'g'));
	    var numAttributes = numMatches(new RegExp("\\[.+=.+\\]", 'g'));
	    var numPseudoClasses = numMatches(new RegExp(":(?!not)" + identifier, 'g'));
	    var numTypes = numMatches(new RegExp("(?![^\\[]*\\])(^|[ +~>,]|:not\\()" + identifier, 'g'));
	    var numPseudoElements = numMatches(new RegExp("::" + identifier, 'g'));
	    var a = numIds;
	    var b = numClasses + numAttributes + numPseudoClasses;
	    var c = numTypes + numPseudoElements;
	    return 100 * a + 10 * b + c;
	}
	function deepExtend(target) {
	    var args = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        args[_i - 1] = arguments[_i];
	    }
	    return deepExtendWithConfig.apply(void 0, __spread([{ deleteUndefined: true, deleteNull: false }, target], args));
	}
	function deepExtendWithConfig(config, target) {
	    var args = [];
	    for (var _i = 2; _i < arguments.length; _i++) {
	        args[_i - 2] = arguments[_i];
	    }
	    target = target || {};
	    for (var i = 0; i < args.length; i++) {
	        var obj = args[i];
	        if (!obj)
	            continue;
	        for (var key in obj) {
	            if (obj.hasOwnProperty(key)) {
	                if ((config.deleteUndefined && obj[key] === undefined) ||
	                    (config.deleteNull && obj[key] === null)) {
	                    delete target[key];
	                }
	                else if (obj[key] === undefined || obj[key] === null) {
	                    target[key] = obj[key];
	                }
	                else if (typeof obj[key] === 'object') {
	                    if (obj[key] instanceof Array == true) {
	                        target[key] = obj[key].slice(0);
	                    }
	                    else {
	                        target[key] = deepExtendWithConfig(config, target[key], obj[key]);
	                    }
	                }
	                else {
	                    target[key] = obj[key];
	                }
	            }
	        }
	    }
	    return target;
	}

	var utils = /*#__PURE__*/Object.freeze({
		__proto__: null,
		nullFunction: nullFunction,
		getComputedStyleWithoutDefaults: getComputedStyleWithoutDefaults,
		calculateSpecificity: calculateSpecificity,
		deepExtend: deepExtend,
		deepExtendWithConfig: deepExtendWithConfig
	});

	// Unique ID creation requires a high quality random # generator. In the browser we therefore
	// require the crypto API and do not support built-in fallback to lower quality random number
	// generators (like Math.random()).
	// getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
	// find the complete implementation of crypto (msCrypto) on IE11.
	var getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);
	var rnds8 = new Uint8Array(16);
	function rng() {
	  if (!getRandomValues) {
	    throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
	  }

	  return getRandomValues(rnds8);
	}

	var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

	function validate(uuid) {
	  return typeof uuid === 'string' && REGEX.test(uuid);
	}

	/**
	 * Convert array of 16 byte values to UUID string format of the form:
	 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
	 */

	var byteToHex = [];

	for (var i = 0; i < 256; ++i) {
	  byteToHex.push((i + 0x100).toString(16).substr(1));
	}

	function stringify(arr) {
	  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  // Note: Be careful editing this code!  It's been tuned for performance
	  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
	  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
	  // of the following:
	  // - One or more input array values don't map to a hex octet (leading to
	  // "undefined" in the uuid)
	  // - Invalid input values for the RFC `version` or `variant` fields

	  if (!validate(uuid)) {
	    throw TypeError('Stringified UUID is invalid');
	  }

	  return uuid;
	}

	function v4(options, buf, offset) {
	  options = options || {};
	  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

	  rnds[6] = rnds[6] & 0x0f | 0x40;
	  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

	  if (buf) {
	    offset = offset || 0;

	    for (var i = 0; i < 16; ++i) {
	      buf[offset + i] = rnds[i];
	    }

	    return buf;
	  }

	  return stringify(rnds);
	}

	var BaseComponent = /** @class */ (function () {
	    function BaseComponent(tag) {
	        this._selection = d3Selection.create("svg:" + tag);
	        this.layout('grid-area', '1 / 1 / 2 / 2');
	        // can't access 'this' within the bounds calculator callback
	        var that = this;
	        this._selection.layoutBoundsCalculator(function () { return that.size(); });
	        this.init();
	    }
	    BaseComponent.prototype.init = function () { };
	    BaseComponent.prototype.mount = function (chart) {
	        return this;
	    };
	    BaseComponent.prototype.configure = function () {
	        return this;
	    };
	    BaseComponent.prototype.beforeLayout = function () {
	        return this;
	    };
	    BaseComponent.prototype.afterLayout = function () {
	        return this;
	    };
	    BaseComponent.prototype.render = function () {
	        return this;
	    };
	    BaseComponent.prototype.transition = function () {
	        return this;
	    };
	    BaseComponent.prototype.call = function (callback) {
	        var args = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            args[_i - 1] = arguments[_i];
	        }
	        callback.apply(void 0, __spread([this], args));
	        return this;
	    };
	    BaseComponent.prototype.selection = function () {
	        return this._selection;
	    };
	    BaseComponent.prototype.size = function () {
	        return this.node().getBoundingClientRect();
	    };
	    BaseComponent.prototype.attr = function (name, value, transitionDuration, transitionDelay) {
	        if (value === undefined)
	            return this._getAttr(name);
	        if (value === null)
	            this._removeAttr(name);
	        else if (transitionDuration === undefined)
	            this._setAttr(name, value);
	        else
	            this._transitionAttr(name, value, transitionDuration, transitionDelay || 0);
	        return this;
	    };
	    BaseComponent.prototype._getAttr = function (name) {
	        return this.selection().attr(name);
	    };
	    BaseComponent.prototype._removeAttr = function (name) {
	        this.selection().attr(name, null);
	    };
	    BaseComponent.prototype._setAttr = function (name, value) {
	        this.selection().attr(name, value);
	    };
	    BaseComponent.prototype._transitionAttr = function (name, value, transitionDuration, transitionDelay) {
	        this._selection
	            .transition(name)
	            .delay(transitionDelay)
	            .duration(transitionDuration)
	            .attr(name, value);
	    };
	    BaseComponent.prototype.layout = function (name, value) {
	        if (value === undefined)
	            return this._selection.layout(name);
	        if (value === null)
	            this._selection.layout(name, null);
	        else
	            this._selection.layout(name, value);
	        return this;
	    };
	    BaseComponent.prototype.classed = function (names, value) {
	        if (value === undefined)
	            return this._selection.classed(names);
	        this._selection.classed(names, value);
	        return this;
	    };
	    BaseComponent.prototype.style = function (name, value, priority) {
	        if (value === undefined)
	            return this._selection.style(name);
	        if (value === null)
	            this._selection.style(name, null);
	        else
	            this._selection.style(name, value, priority);
	        return this;
	    };
	    BaseComponent.prototype.property = function (name, value) {
	        if (value === undefined)
	            return this._selection.property(name);
	        this._selection.property(name, value);
	        return this;
	    };
	    BaseComponent.prototype.text = function (value, transitionDuration, transitionDelay) {
	        if (value === undefined)
	            return this._selection.text();
	        if (value === null)
	            this._selection.text(null);
	        else {
	            if (transitionDuration === undefined)
	                this._selection.text(value);
	            else {
	                this._selection
	                    .transition('text')
	                    .delay(transitionDelay || 0)
	                    .duration(transitionDuration)
	                    .text(value);
	            }
	        }
	        return this;
	    };
	    BaseComponent.prototype.html = function () {
	        return this.selection().html();
	    };
	    BaseComponent.prototype.raise = function () {
	        this.selection().raise();
	        return this;
	    };
	    BaseComponent.prototype.lower = function () {
	        this.selection().lower();
	        return this;
	    };
	    BaseComponent.prototype.node = function () {
	        return this.selection().node();
	    };
	    BaseComponent.prototype.on = function (typenames, callback) {
	        var _this = this;
	        if (callback === null)
	            this._selection.on(typenames, null);
	        else
	            this._selection.on(typenames, function (event) {
	                var data = _this.eventData(event);
	                if (data)
	                    callback(event, data);
	            });
	        return this;
	    };
	    BaseComponent.prototype.eventData = function (event) {
	        return { component: this };
	    };
	    BaseComponent.prototype.select = function (selector) {
	        return this._selection.selectAll(selector);
	    };
	    BaseComponent.prototype.selectAll = function (selector) {
	        return this._selection.selectAll(selector);
	    };
	    return BaseComponent;
	}());

	function ChildrenMixin(BaseComponent) {
	    return /** @class */ (function (_super) {
	        __extends(ChildrenMixin, _super);
	        function ChildrenMixin() {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            var _this = _super.apply(this, __spread(args)) || this;
	            _this._children = new Map();
	            return _this;
	        }
	        ChildrenMixin.prototype.child = function (name, component) {
	            if (component === undefined)
	                return this._children.get(name);
	            else if (component === null)
	                this._children["delete"](name);
	            else
	                this._children.set(name, component);
	            return this;
	        };
	        ChildrenMixin.prototype.children = function () {
	            return Array.from(this._children.values());
	        };
	        ChildrenMixin.prototype.mount = function (chart) {
	            var _this = this;
	            _super.prototype.mount.call(this, chart);
	            // todo: ordering of children
	            this._children.forEach(function (c) {
	                _this.selection().append(function () { return c.selection().node(); });
	                c.mount(chart);
	            });
	            return this;
	        };
	        ChildrenMixin.prototype.configure = function () {
	            _super.prototype.configure.call(this);
	            this._children.forEach(function (c) { return c.configure(); });
	            return this;
	        };
	        ChildrenMixin.prototype.beforeLayout = function () {
	            _super.prototype.beforeLayout.call(this);
	            this._children.forEach(function (c) { return c.beforeLayout(); });
	            return this;
	        };
	        ChildrenMixin.prototype.afterLayout = function () {
	            _super.prototype.afterLayout.call(this);
	            this._children.forEach(function (c) { return c.afterLayout(); });
	            return this;
	        };
	        ChildrenMixin.prototype.render = function () {
	            _super.prototype.render.call(this);
	            this._children.forEach(function (c) { return c.render(); });
	            return this;
	        };
	        ChildrenMixin.prototype.transition = function () {
	            _super.prototype.transition.call(this);
	            this._children.forEach(function (c) { return c.transition(); });
	            return this;
	        };
	        ChildrenMixin.prototype.eventData = function (event) {
	            var childElement = event.target;
	            while (childElement.parentNode !== event.currentTarget) {
	                childElement = childElement.parentNode;
	            }
	            var indexOf = Array.prototype.indexOf;
	            var childIndex = indexOf.call(childElement.parentNode.children, childElement);
	            return {
	                component: this,
	                childIndex: childIndex
	            };
	        };
	        return ChildrenMixin;
	    }(BaseComponent));
	}

	function rectFromString(str) {
	    var parts = str.split(',').map(function (s) { return parseFloat(s.trim()); });
	    return { x: parts[0], y: parts[1], width: parts[2], height: parts[3] };
	}
	function rectToString(rect) {
	    return rect.x + ", " + rect.y + ", " + rect.width + ", " + rect.height;
	}

	// prepends the translation that represents the layout to the transform attribute
	//
	// must be mixed-in on a higher level than e.g. the static clone mixin.
	function LayoutTransformMixin(BaseComponent) {
	    return /** @class */ (function (_super) {
	        __extends(LayoutTransformMixin, _super);
	        function LayoutTransformMixin() {
	            var _this = _super !== null && _super.apply(this, arguments) || this;
	            _this._transform = '';
	            return _this;
	        }
	        LayoutTransformMixin.prototype._removeAttr = function (name) {
	            if (name === 'transform') {
	                this._transform = '';
	                var layoutTransform = this._prependLayoutTransform('');
	                if (layoutTransform !== '') {
	                    _super.prototype._setAttr.call(this, name, layoutTransform);
	                    return;
	                }
	            }
	            _super.prototype._removeAttr.call(this, name);
	        };
	        LayoutTransformMixin.prototype._setAttr = function (name, value) {
	            if (name === 'transform') {
	                this._transform = value;
	                _super.prototype._setAttr.call(this, name, this._prependLayoutTransform(this._transform));
	            }
	            else
	                _super.prototype._setAttr.call(this, name, value);
	        };
	        LayoutTransformMixin.prototype._transitionAttr = function (name, value, transitionDuration, transitionDelay) {
	            if (name === 'transform') {
	                this._transform = value;
	                _super.prototype._transitionAttr.call(this, name, this._prependLayoutTransform(this._transform), transitionDuration, transitionDelay);
	            }
	            else
	                _super.prototype._transitionAttr.call(this, name, value, transitionDuration, transitionDelay);
	        };
	        LayoutTransformMixin.prototype.afterLayout = function () {
	            _super.prototype.afterLayout.call(this);
	            this._setAttr('transform', this._transform);
	            return this;
	        };
	        LayoutTransformMixin.prototype._prependLayoutTransform = function (transform) {
	            if (this.attr('laidOut') !== null) {
	                var layout = rectFromString(this.attr('layout'));
	                var layoutTransform = "translate(" + layout.x + ", " + layout.y + ")";
	                return "" + layoutTransform + transform;
	            }
	            return transform;
	        };
	        return LayoutTransformMixin;
	    }(BaseComponent));
	}

	function GridMixin(BaseComponent) {
	    return /** @class */ (function (_super) {
	        __extends(GridMixin, _super);
	        function GridMixin() {
	            var _this = _super !== null && _super.apply(this, arguments) || this;
	            _this._rowCount = 1;
	            _this._columnCount = 1;
	            return _this;
	        }
	        GridMixin.prototype.rowCount = function (count) {
	            if (count === undefined)
	                return this._rowCount;
	            this._rowCount = count;
	            return this;
	        };
	        GridMixin.prototype.columnCount = function (count) {
	            if (count === undefined)
	                return this._columnCount;
	            this._columnCount = count;
	            return this;
	        };
	        GridMixin.prototype.beforeLayout = function () {
	            var _this = this;
	            _super.prototype.beforeLayout.call(this);
	            var rows = Array(this._rowCount).fill('auto').join(' ');
	            var columns = Array(this._columnCount).fill('auto').join(' ');
	            this.layout('grid-template', rows + " / " + columns);
	            this.children().forEach(function (child, i) {
	                var row = Math.floor(i / _this._columnCount) + 1;
	                var column = (i % _this._columnCount) + 1;
	                child.layout('grid-area', row + " / " + column + " / " + (row + 1) + " / " + (column + 1));
	            });
	            return this;
	        };
	        return GridMixin;
	    }(BaseComponent));
	}

	function StaticSizeMixin(BaseComponent) {
	    return /** @class */ (function (_super) {
	        __extends(StaticSizeMixin, _super);
	        function StaticSizeMixin() {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            var _this = _super.apply(this, __spread(args)) || this;
	            _this._staticCloneSelection = d3Selection.create("svg:" + _this.node().tagName);
	            _this._combinedSelection = d3Selection.selectAll([
	                _this.selection().node(),
	                _this._staticCloneSelection.node(),
	            ]);
	            // can't access 'this' within the bounds calculator callback
	            var that = _this;
	            _this._combinedSelection.layoutBoundsCalculator(function () { return that.size(); });
	            return _this;
	        }
	        StaticSizeMixin.prototype._removeAttr = function (name) {
	            _super.prototype._removeAttr.call(this, name);
	            this._staticCloneSelection.attr(name, null);
	        };
	        StaticSizeMixin.prototype._setAttr = function (name, value) {
	            _super.prototype._setAttr.call(this, name, value);
	            this._staticCloneSelection.attr(name, value);
	        };
	        StaticSizeMixin.prototype._transitionAttr = function (name, value, transitionDuration, transitionDelay) {
	            // transition attribute
	            _super.prototype._transitionAttr.call(this, name, value, transitionDuration, transitionDelay);
	            // set attribute without transition on clone
	            this._staticCloneSelection.attr(name, value);
	        };
	        StaticSizeMixin.prototype.classed = function (names, value) {
	            if (value === undefined)
	                return this._combinedSelection.classed(names);
	            this._combinedSelection.classed(names, value);
	            return this;
	        };
	        StaticSizeMixin.prototype.style = function (name, value, priority) {
	            if (value === undefined)
	                return this._combinedSelection.style(name);
	            if (value === null)
	                this._combinedSelection.style(name, null);
	            else
	                this._combinedSelection.style(name, value, priority);
	            return this;
	        };
	        StaticSizeMixin.prototype.text = function (value, transitionDuration, transitionDelay) {
	            if (value === undefined)
	                return this._combinedSelection.text();
	            if (value === null)
	                this._combinedSelection.text(null);
	            else {
	                if (transitionDuration === undefined)
	                    this._combinedSelection.text(value);
	                else {
	                    this.selection()
	                        .transition('text')
	                        .delay(transitionDelay || 0)
	                        .duration(transitionDuration)
	                        .text(value);
	                    this._staticCloneSelection.text(value);
	                }
	            }
	            return this;
	        };
	        StaticSizeMixin.prototype.size = function () {
	            var _this = this;
	            d3Selection.select(this.node().parentElement).append(function () { return _this._staticCloneSelection.node(); });
	            var bounds = this._staticCloneSelection.node().getBoundingClientRect();
	            this._staticCloneSelection.remove();
	            return bounds;
	        };
	        StaticSizeMixin.prototype.staticCloneSelection = function () {
	            return this._staticCloneSelection;
	        };
	        return StaticSizeMixin;
	    }(BaseComponent));
	}

	function ConfiguratorsMixin(BaseComponent) {
	    return /** @class */ (function (_super) {
	        __extends(ConfiguratorsMixin, _super);
	        function ConfiguratorsMixin() {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            var _this = _super.apply(this, __spread(args)) || this;
	            _this._configurators = new Map();
	            _this._configuratorOrders = [];
	            return _this;
	        }
	        ConfiguratorsMixin.prototype.configurator = function (order, callback) {
	            if (callback === undefined)
	                return this._configurators.get(order);
	            else if (callback === null) {
	                this._configurators["delete"](order);
	                this._configuratorOrders.splice(this._configuratorOrders.indexOf(order), 1);
	            }
	            else {
	                this._configurators.set(order, callback);
	                this._configuratorOrders.push(order);
	                this._configuratorOrders.sort(function (a, b) { return a - b; });
	            }
	            return this;
	        };
	        ConfiguratorsMixin.prototype.configure = function () {
	            _super.prototype.configure.call(this);
	            for (var i = 0; i < this._configuratorOrders.length; ++i)
	                this._configurators.get(this._configuratorOrders[i])(this);
	            return this;
	        };
	        return ConfiguratorsMixin;
	    }(BaseComponent));
	}

	function MediaQueryConfiguratorsMixin(BaseComponent) {
	    return /** @class */ (function (_super) {
	        __extends(MediaQueryConfiguratorsMixin, _super);
	        function MediaQueryConfiguratorsMixin() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        MediaQueryConfiguratorsMixin.prototype.mediaQueryConfigurator = function (order, mediaQuery, callback) {
	            return this.configurator(order, function (component) { return window.matchMedia(mediaQuery).matches && callback(component); });
	        };
	        return MediaQueryConfiguratorsMixin;
	    }(BaseComponent));
	}

	var SVGComponent = /** @class */ (function (_super) {
	    __extends(SVGComponent, _super);
	    function SVGComponent() {
	        var _this = _super.call(this, 'svg') || this;
	        _this.layout('grid-template', '1fr / 1fr');
	        return _this;
	    }
	    SVGComponent.prototype.afterLayout = function () {
	        _super.prototype.afterLayout.call(this);
	        if (this.attr('laidOut') !== null) {
	            var layout = rectFromString(this.attr('layout'));
	            this.attr('viewBox', rectToString(__assign(__assign({}, layout), { x: 0, y: 0 })))
	                .attr('x', layout.x)
	                .attr('y', layout.y)
	                .attr('width', layout.width)
	                .attr('height', layout.height);
	        }
	        return this;
	    };
	    return SVGComponent;
	}(MediaQueryConfiguratorsMixin(ConfiguratorsMixin(ChildrenMixin(BaseComponent)))));
	function svg() {
	    return new SVGComponent();
	}

	// todo: needs the static clone mixin?
	//   probably better not to because it would clone the whole subtree 🤔
	var GroupComponent = /** @class */ (function (_super) {
	    __extends(GroupComponent, _super);
	    function GroupComponent() {
	        var _this = _super.call(this, 'g') || this;
	        _this.layout('grid-template', '1fr / 1fr');
	        return _this;
	    }
	    return GroupComponent;
	}(MediaQueryConfiguratorsMixin(ConfiguratorsMixin(ChildrenMixin(LayoutTransformMixin(BaseComponent))))));
	function group() {
	    return new GroupComponent();
	}

	var TextComponent = /** @class */ (function (_super) {
	    __extends(TextComponent, _super);
	    function TextComponent() {
	        var _this = _super.call(this, 'text') || this;
	        _this
	            // auto-size grid cell to text bounding box
	            .layout('width', 'min-content')
	            .layout('height', 'min-content')
	            // set origin to top-left corner
	            .attr('text-anchor', 'start')
	            .attr('dominant-baseline', 'hanging')
	            .attr('font-family', 'sans-serif');
	        return _this;
	    }
	    return TextComponent;
	}(MediaQueryConfiguratorsMixin(ConfiguratorsMixin(LayoutTransformMixin(StaticSizeMixin(BaseComponent))))));
	function text() {
	    return new TextComponent();
	}

	var RectComponent = /** @class */ (function (_super) {
	    __extends(RectComponent, _super);
	    function RectComponent() {
	        var _this = _super.call(this, 'rect') || this;
	        _this.layout('width', 'min-content').layout('height', 'min-content');
	        return _this;
	    }
	    return RectComponent;
	}(MediaQueryConfiguratorsMixin(ConfiguratorsMixin(LayoutTransformMixin(StaticSizeMixin(BaseComponent))))));
	function rect() {
	    return new RectComponent();
	}

	var GridComponent = /** @class */ (function (_super) {
	    __extends(GridComponent, _super);
	    function GridComponent() {
	        return _super.call(this, 'g') || this;
	    }
	    return GridComponent;
	}(MediaQueryConfiguratorsMixin(ConfiguratorsMixin(GridMixin(ChildrenMixin(LayoutTransformMixin(BaseComponent)))))));
	function grid() {
	    return new GridComponent();
	}

	var DefsComponent = /** @class */ (function (_super) {
	    __extends(DefsComponent, _super);
	    function DefsComponent() {
	        return _super.call(this, 'defs') || this;
	    }
	    return DefsComponent;
	}(MediaQueryConfiguratorsMixin(ConfiguratorsMixin(ChildrenMixin(LayoutTransformMixin(BaseComponent))))));
	function defs() {
	    return new DefsComponent();
	}

	var ClipPathComponent = /** @class */ (function (_super) {
	    __extends(ClipPathComponent, _super);
	    function ClipPathComponent() {
	        return _super.call(this, 'clipPath') || this;
	    }
	    return ClipPathComponent;
	}(MediaQueryConfiguratorsMixin(ConfiguratorsMixin(ChildrenMixin(LayoutTransformMixin(BaseComponent))))));
	function clipPath() {
	    return new ClipPathComponent();
	}

	var UseComponent = /** @class */ (function (_super) {
	    __extends(UseComponent, _super);
	    function UseComponent() {
	        return _super.call(this, 'use') || this;
	    }
	    return UseComponent;
	}(MediaQueryConfiguratorsMixin(ConfiguratorsMixin(ChildrenMixin(LayoutTransformMixin(BaseComponent))))));
	function use() {
	    return new UseComponent();
	}

	function titleTextAttributes(arg) {
	    return arg.attr('letter-spacing', '0.5em').attr('font-weight', 'bold');
	}

	function verticalTextAttributes(arg) {
	    return arg
	        .attr('transform', 'rotate(-90)')
	        .attr('dominant-baseline', 'hanging')
	        .attr('text-anchor', 'end');
	}

	/**
	 * Returns a function, that, as long as it continues to be invoked, will not
	 * be triggered. The function will be called after it stops being called for
	 * N milliseconds. If `immediate` is passed, trigger the function on the
	 * leading edge, instead of the trailing. The function also has a property 'clear' 
	 * that is a function which will clear the timer to prevent previously scheduled executions. 
	 *
	 * @source underscore.js
	 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
	 * @param {Function} function to wrap
	 * @param {Number} timeout in ms (`100`)
	 * @param {Boolean} whether to execute at the beginning (`false`)
	 * @api public
	 */
	function debounce(func, wait, immediate){
	  var timeout, args, context, timestamp, result;
	  if (null == wait) wait = 100;

	  function later() {
	    var last = Date.now() - timestamp;

	    if (last < wait && last >= 0) {
	      timeout = setTimeout(later, wait - last);
	    } else {
	      timeout = null;
	      if (!immediate) {
	        result = func.apply(context, args);
	        context = args = null;
	      }
	    }
	  }
	  var debounced = function(){
	    context = this;
	    args = arguments;
	    timestamp = Date.now();
	    var callNow = immediate && !timeout;
	    if (!timeout) timeout = setTimeout(later, wait);
	    if (callNow) {
	      result = func.apply(context, args);
	      context = args = null;
	    }

	    return result;
	  };

	  debounced.clear = function() {
	    if (timeout) {
	      clearTimeout(timeout);
	      timeout = null;
	    }
	  };
	  
	  debounced.flush = function() {
	    if (timeout) {
	      result = func.apply(context, args);
	      context = args = null;
	      
	      clearTimeout(timeout);
	      timeout = null;
	    }
	  };

	  return debounced;
	}
	// Adds compatibility for ES modules
	debounce.debounce = debounce;

	var debounce_1 = debounce;

	var constants = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports,"__esModule",{value:true});exports.ATOMIC_DATA_TYPE=exports.STRETCH=exports.END=exports.START=exports.CENTER=exports.DISPLAY_FLEX=exports.DISPLAY_GRID=void 0;var DISPLAY_GRID="grid",DISPLAY_FLEX="flex",CENTER="center",START="start",END="end",STRETCH="stretch",ATOMIC_DATA_TYPE=["string","number","function","boolean","undefined"];exports.ATOMIC_DATA_TYPE=ATOMIC_DATA_TYPE;exports.STRETCH=STRETCH;exports.END=END;exports.START=START;exports.CENTER=CENTER;exports.DISPLAY_FLEX=DISPLAY_FLEX;exports.DISPLAY_GRID=DISPLAY_GRID;
	});

	unwrapExports(constants);
	var constants_1 = constants.ATOMIC_DATA_TYPE;
	var constants_2 = constants.STRETCH;
	var constants_3 = constants.END;
	var constants_4 = constants.START;
	var constants_5 = constants.CENTER;
	var constants_6 = constants.DISPLAY_FLEX;
	var constants_7 = constants.DISPLAY_GRID;

	var utils$1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports,"__esModule",{value:true});exports.pluckNumber=exports.getDisplayProperty=exports.attachLayoutInformation=exports.cloneObject=void 0;function _typeof(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj};}else {_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj};}return _typeof(obj)}var UNDEF;var getDisplayProperty=function getDisplayProperty(domTree){return domTree.style&&domTree.style.display},cloneObject=function cloneObject(arg){if(constants.ATOMIC_DATA_TYPE.indexOf(_typeof(arg))>-1||arg===null){return arg}if(Array.isArray(arg)){var i,len,arr=[];for(i=0,len=arg.length;i<len;i++){arr.push(cloneObject(arg[i]));}return arr}else if(_typeof(arg)==="object"){var cloneObj={},key;for(key in arg){cloneObj[key]=cloneObject(arg[key]);}return cloneObj}},attachLayoutInformation=function attachLayoutInformation(){var baseTree=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var calculatedTree=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var i,len;baseTree.layout=calculatedTree.layout;for(i=0,len=(baseTree.children||[]).length;i<len;i++){attachLayoutInformation(baseTree.children[i],calculatedTree.children[i]);}},pluckNumber=function pluckNumber(){var arg,i,l;for(i=0,l=arguments.length;i<l;i+=1){arg=arguments[i];if(!arg&&arg!==false&&arg!==0){continue}else if(isNaN(arg=Number(arg))){continue}return arg}return UNDEF};exports.pluckNumber=pluckNumber;exports.attachLayoutInformation=attachLayoutInformation;exports.cloneObject=cloneObject;exports.getDisplayProperty=getDisplayProperty;
	});

	unwrapExports(utils$1);
	var utils_1 = utils$1.pluckNumber;
	var utils_2 = utils$1.getDisplayProperty;
	var utils_3 = utils$1.attachLayoutInformation;
	var utils_4 = utils$1.cloneObject;

	var trackSizing = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports,"__esModule",{value:true});exports["default"]=void 0;function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable});keys.push.apply(keys,symbols);}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){_defineProperty(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else {ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else {obj[key]=value;}return obj}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor}var getMultiplierOfFr=function getMultiplierOfFr(size){return +size.replace(/fr/,"")},_frSpaceDistributorHelper=function _frSpaceDistributorHelper(tracks,totalSpaceUsed,containerSize){var freeSpace,spacePerFrTrack,eligibleTracks,totalFrTrackRatio=0;if(!tracks.length){return}tracks.forEach(function(track){return totalFrTrackRatio+=track.multiplier});freeSpace=containerSize-totalSpaceUsed;spacePerFrTrack=freeSpace/totalFrTrackRatio;eligibleTracks=tracks.filter(function(track){return track.baseSize<=track.multiplier*spacePerFrTrack});if(eligibleTracks.length<tracks.length){tracks.filter(function(track){return track.baseSize>track.multiplier*spacePerFrTrack}).forEach(function(track){return totalSpaceUsed+=track.baseSize});return _frSpaceDistributorHelper(eligibleTracks,totalSpaceUsed,containerSize)}else {eligibleTracks.forEach(function(track){return track.baseSize=track.multiplier*spacePerFrTrack});}},_intrinsicSpaceDistributorHelper=function _intrinsicSpaceDistributorHelper(tracks,totalSpaceUsed,containerSize){var freeSpace,spacePerIntrinsicTrack,i,len,frozenTrack=0,minMaxTracks,growthLimit,baseSize;if(!tracks.length){return}minMaxTracks=tracks.filter(function(track){return track.type==="minmax"&&track.growthLimit!==Infinity});freeSpace=containerSize-totalSpaceUsed;minMaxTracks.sort(function(a,b){var gap1=a.growthLimit-a.baseSize,gap2=b.growthLimit-b.baseSize;return gap1-gap2});len=minMaxTracks.length;while(frozenTrack<len&&freeSpace){spacePerIntrinsicTrack=freeSpace/(minMaxTracks.length-frozenTrack||1);for(i=0,len=minMaxTracks.length;i<len;i++){growthLimit=minMaxTracks[i].growthLimit;baseSize=Math.min(spacePerIntrinsicTrack+minMaxTracks[i].baseSize,growthLimit);freeSpace-=baseSize-minMaxTracks[i].baseSize;minMaxTracks[i].baseSize=baseSize;if(growthLimit===baseSize&&!minMaxTracks[i].frozen){minMaxTracks[i].frozen=true;frozenTrack++;}}}tracks=tracks.filter(function(track){return track.type==="minmax"&&track.growthLimit===Infinity||track.type!=="minmax"});spacePerIntrinsicTrack=freeSpace/tracks.length;tracks.forEach(function(track){return track.baseSize+=spacePerIntrinsicTrack});};var TrackResolver=function(){function TrackResolver(){var tracks=arguments.length>0&&arguments[0]!==undefined?arguments[0]:[];var items=arguments.length>1&&arguments[1]!==undefined?arguments[1]:[];var containerSize=arguments.length>2&&arguments[2]!==undefined?arguments[2]:600;_classCallCheck(this,TrackResolver);this.clear();this.set("tracks",tracks);this.set("items",items);this.set("containerSize",containerSize);return this}_createClass(TrackResolver,[{key:"set",value:function set(key,info){this.props[key]=info;switch(key){case"tracks":this._initTrackSize();break;case"items":this._initItems();break;case"containerSize":this.props[key]=isNaN(+info)?0:+info;}return this}},{key:"get",value:function get(key){return this.props[key]}},{key:"_initTrackSize",value:function _initTrackSize(_tracks){var tracks=_tracks||this.props.tracks||[],config=this._config,trackAr=[{}],i,len,size,type,multiplier,baseSize,growthLimit;config.frTracks=[];config.intrinsicTracks=[];for(i=1,len=tracks.length;i<len;i++){size=tracks[i].size;multiplier=1;if(Array.isArray(size)){baseSize=+size[0]||0;if(size[1].indexOf("fr")>0||size[0].indexOf("fr")>0){growthLimit=Infinity;config.frTracks.push(i);type="minmax";}else if(size[1]==="auto"||size[0]==="auto"){growthLimit=Infinity;config.intrinsicTracks.push(i);type="minmax";}else if(!isNaN(+size[0])&&!isNaN(+size[1])){growthLimit=Math.max(+size[0],+size[1]);baseSize=Math.min(+size[0],+size[1]);config.intrinsicTracks.push(i);type="minmax";}}else if(!isNaN(+size)){baseSize=growthLimit=+size;type="fixed";}else if(size.indexOf("fr")>0){baseSize=0;growthLimit=Infinity;config.frTracks.push(i);type="flex";multiplier=getMultiplierOfFr(size);}else {baseSize=0;growthLimit=Infinity;type="intrinsic";config.intrinsicTracks.push(i);}trackAr.push(_objectSpread({},tracks[i],{type:type,multiplier:multiplier,baseSize:baseSize,growthLimit:growthLimit}));}return config.sanitizedTracks=trackAr}},{key:"_initItems",value:function _initItems(_items){var items=_items||this.props.items||[],config=this._config,sanitizedItems=[],nonSpanningItemStartIndex,item,validItems=0,i,len;for(i=0,len=items.length;i<len;i++){if(isNaN(items[i].start)||isNaN(items[i].end)){config.autoFlow.push(items[i]);continue}sanitizedItems.push(_objectSpread({},items[i]));item=sanitizedItems[validItems];validItems++;item.size=isNaN(item.size)?this._getParentSize(item):+item.size;}sanitizedItems.sort(function(a,b){var gap1=a.end-a.start,gap2=b.end-b.start;if(gap1===gap2){return a.start-b.start}else {return gap1-gap2}});for(i=0,nonSpanningItemStartIndex=len=sanitizedItems.length;i<len;i++){if(sanitizedItems[i].end-sanitizedItems[i].start>1){nonSpanningItemStartIndex=i;break}}this._config.nonSpanningItemStartIndex=nonSpanningItemStartIndex;return this._config.sanitizedItems=sanitizedItems}},{key:"_getParentSize",value:function _getParentSize(item){var sanitizedTracks=this._config.sanitizedTracks,parentTracks,widthOfParentTracks=0;parentTracks=sanitizedTracks.filter(function(track){return track.start>=item.start&&track.end<=item.end});parentTracks.forEach(function(track){return widthOfParentTracks+=track.baseSize});return widthOfParentTracks||0}},{key:"resolveTracks",value:function resolveTracks(){this._placeNonSpanningItems()._placeSpanningItems()._distributeFreeSpace();return this._config.sanitizedTracks}},{key:"_placeNonSpanningItems",value:function _placeNonSpanningItems(){var _this$_config=this._config,sanitizedItems=_this$_config.sanitizedItems,sanitizedTracks=_this$_config.sanitizedTracks,nonSpanningItemStartIndex=_this$_config.nonSpanningItemStartIndex,nonSpanningItems=sanitizedItems.slice(0,nonSpanningItemStartIndex),track,trackIndex;nonSpanningItems.forEach(function(item){trackIndex=item.start;track=sanitizedTracks[trackIndex];if(track.type!=="fixed"){track.baseSize=Math.max(track.baseSize,item.size);track.growthLimit=Math.max(track.growthLimit,track.baseSize);}});return this}},{key:"_placeSpanningItems",value:function _placeSpanningItems(){var _this$_config2=this._config,sanitizedItems=_this$_config2.sanitizedItems,sanitizedTracks=_this$_config2.sanitizedTracks,nonSpanningItemStartIndex=_this$_config2.nonSpanningItemStartIndex,frTracks=_this$_config2.frTracks,spanningItems=sanitizedItems.slice(nonSpanningItemStartIndex),trackSizedp=[0],sizeConsumed,sizeLeft,sizePerTrack,availableTracks,hasFrTrack,i,len;if(!spanningItems.length)return this;for(i=1,len=sanitizedTracks.length;i<len;i++){trackSizedp[i]=trackSizedp[i-1]+(sanitizedTracks[i].baseSize||0);}spanningItems.forEach(function(item){sizeConsumed=trackSizedp[item.end-1]-trackSizedp[item.start-1];sizeLeft=Math.max(0,item.size-sizeConsumed);if(!sizeLeft)return;for(i=item.start,hasFrTrack=false,availableTracks=0;i<item.end;i++){if(frTracks.indexOf(i)>=0){hasFrTrack=true;}if(sanitizedTracks[i].type!=="fixed"){availableTracks++;}}if(!availableTracks||hasFrTrack)return;sizePerTrack=sizeLeft/availableTracks;for(i=item.start;i<item.end;i++){if(sanitizedTracks[i].type!=="fixed"){sanitizedTracks[i].baseSize+=sizePerTrack;}}});return this}},{key:"_distributeFreeSpace",value:function _distributeFreeSpace(){var _this$_config3=this._config,frTracks=_this$_config3.frTracks,intrinsicTracks=_this$_config3.intrinsicTracks,sanitizedTracks=_this$_config3.sanitizedTracks,containerSize=this.props.containerSize,totalSpaceUsed=0;sanitizedTracks.forEach(function(track){return totalSpaceUsed+=track.baseSize||0});if(totalSpaceUsed<containerSize){if(frTracks.length){frTracks.forEach(function(trackId,index){frTracks[index]=sanitizedTracks[trackId];});frTracks.forEach(function(track){return totalSpaceUsed-=track.baseSize});_frSpaceDistributorHelper(frTracks,totalSpaceUsed,containerSize);}else if(intrinsicTracks.length){intrinsicTracks.forEach(function(trackId,index){intrinsicTracks[index]=sanitizedTracks[trackId];});_intrinsicSpaceDistributorHelper(intrinsicTracks,totalSpaceUsed,containerSize);}}return this}},{key:"clear",value:function clear(){this.props={};this._config={frTracks:[],intrinsicTracks:[],autoFlow:[]};return this}}]);return TrackResolver}();var _default=TrackResolver;exports["default"]=_default;
	});

	unwrapExports(trackSizing);

	var repeatResolver_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports,"__esModule",{value:true});exports.repeatResolver=repeatResolver;function repeatResolver(domTree,parentInfo){var children=domTree.children,rowWidth=0,numOfRows,itemInARow=0,newGridTemplateColumns="",newGridTemplateRows="",i,len,height=0,itemWidth=parentInfo.itemWidth,width=parentInfo.width;width=isNaN(+width)?0:+width;children.forEach(function(child){return height=Math.max(height,+child.style.height||0)});itemWidth=+itemWidth;{rowWidth+=itemWidth;newGridTemplateColumns+=itemWidth+" ";itemInARow=1;for(i=1,len=children.length;i<len;i++){if(rowWidth+itemWidth>width){break}rowWidth+=itemWidth;newGridTemplateColumns+=itemWidth+" ";}itemInARow=i;numOfRows=Math.ceil(len/itemInARow);while(numOfRows--){newGridTemplateRows+=height+" ";}}return {gridTemplateColumns:newGridTemplateColumns.trim(),gridTemplateRows:newGridTemplateRows.trim()}}
	});

	unwrapExports(repeatResolver_1);
	var repeatResolver_2 = repeatResolver_1.repeatResolver;

	var grid$1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports,"__esModule",{value:true});exports.computeGridLayout=computeGridLayout;var _trackSizing=_interopRequireDefault(trackSizing);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable});keys.push.apply(keys,symbols);}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){_defineProperty(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else {ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else {obj[key]=value;}return obj}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor}function _slicedToArray(arr,i){return _arrayWithHoles(arr)||_iterableToArrayLimit(arr,i)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(arr,i){if(!(Symbol.iterator in Object(arr)||Object.prototype.toString.call(arr)==="[object Arguments]")){return}var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"]!=null)_i["return"]();}finally{if(_d)throw _e}}return _arr}function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}var validSizes=["auto","none"],minmaxRegex=/minmax/,templateSplitRegex=/(?:[^\s[\]()]+|\[[^[\]]*\]|\([^()]*\))+/g,getUCFirstString=function getUCFirstString(str){return str.charAt(0).toUpperCase()+str.slice(1)},validNestedGrid=function validNestedGrid(tree){var _ref=tree.style||{},gridTemplateColumns=_ref.gridTemplateColumns,gridTemplateRows=_ref.gridTemplateRows;if(/repeat\(/g.test(gridTemplateColumns)||/repeat\(/g.test(gridTemplateRows)){return false}return true},parseRepeatFunction=function parseRepeatFunction(repeatStr){return repeatStr.split(/\(|\)/g)[1].split(",").map(function(arg){return arg&&arg.trim()})},getCleanSize=function getCleanSize(size){size=size.trim();if(size==="auto")return size;if(!isNaN(+size))return +size;if(minmaxRegex.test(size)){var sizeAr=size.split(/\(|\)/g)[1].split(",");return [sizeAr[0].trim(),sizeAr[1].trim()]}return size},getItemSize=function getItemSize(items,dimension){var filteredItems,templateCol,parsedDim=getUCFirstString(dimension),size,trackDir=dimension==="width"?"col":"row";filteredItems=items.map(function(item){templateCol=item.style["gridTemplate"+getUCFirstString(trackDir==="col"?"columns":"rows")];if((0, utils$1.getDisplayProperty)(item)==="grid"&&/repeat\(/g.test(templateCol)){size=parseRepeatFunction(templateCol)[1];}else {size=item.style["min"+parsedDim+"Contribution"]||item.style[dimension]||"auto";}return {start:item[trackDir+"Start"],end:item[trackDir+"End"],size:size}});return filteredItems},updateMatrix=function updateMatrix(grid,start,end){var i,j;for(i=start.x;i<end.x;i++){for(j=start.y;j<end.y;j++){grid[i][j]=true;}}},resolveItemStyle=function resolveItemStyle(itemStyle,mapping){var gridRowStart=itemStyle.gridRowStart,gridRowEnd=itemStyle.gridRowEnd,gridColumnStart=itemStyle.gridColumnStart,gridColumnEnd=itemStyle.gridColumnEnd;if(itemStyle.gridColumn){var _itemStyle$gridColumn=itemStyle.gridColumn.split("/").map(function(line){return line.trim()});var _itemStyle$gridColumn2=_slicedToArray(_itemStyle$gridColumn,2);gridColumnStart=_itemStyle$gridColumn2[0];gridColumnEnd=_itemStyle$gridColumn2[1];gridColumnStart=mapping?mapping.col.nameToLineMap[gridColumnStart]:1;if(/span\s+\d+/g.test(gridColumnEnd)){gridColumnEnd=gridColumnStart+ +gridColumnEnd.match(/span\s+(\d+)/)[1];}gridColumnEnd=mapping?mapping.col.nameToLineMap[gridColumnEnd]:1;}if(itemStyle.gridRow){var _itemStyle$gridRow$sp=itemStyle.gridRow.split("/").map(function(line){return line.trim()});var _itemStyle$gridRow$sp2=_slicedToArray(_itemStyle$gridRow$sp,2);gridRowStart=_itemStyle$gridRow$sp2[0];gridRowEnd=_itemStyle$gridRow$sp2[1];gridRowStart=mapping?mapping.row.nameToLineMap[gridRowStart]:1;if(/span\s\d+/g.test(gridRowEnd)){gridRowEnd=gridRowStart+ +gridRowEnd.match(/span\s(\d+)/)[1];}gridRowEnd=mapping?mapping.row.nameToLineMap[gridRowEnd]:1;}return {gridRowStart:gridRowStart,gridRowEnd:gridRowEnd,gridColumnStart:gridColumnStart,gridColumnEnd:gridColumnEnd}},getMaxRowColumn=function getMaxRowColumn(items){var maxRow=1,maxColumn=1,itemStyle;items.forEach(function(item){itemStyle=resolveItemStyle(item.style);maxColumn=Math.max(isNaN(+itemStyle.gridColumnStart)?0:+itemStyle.gridColumnStart,maxColumn,isNaN(+itemStyle.gridColumnEnd-1)?0:+itemStyle.gridColumnEnd-1);maxRow=Math.max(isNaN(+itemStyle.gridRowStart)?0:+itemStyle.gridRowStart,maxRow,isNaN(+itemStyle.gridRowEnd-1)?0:+itemStyle.gridRowEnd-1);});return {maxRow:maxRow,maxColumn:maxColumn}};var Grid=function(){function Grid(){_classCallCheck(this,Grid);this.setup();}_createClass(Grid,[{key:"setup",value:function setup(){this._tsa=new _trackSizing["default"];this.props={};this._config={mapping:{}};return this}},{key:"set",value:function set(key,value){this.props[key]=value;return this}},{key:"getProps",value:function getProps(key){return this.props[key]}},{key:"getConfig",value:function getConfig(key){return this._config[key]}},{key:"compute",value:function compute(_domTree){var domTree=_domTree||this.props.domTree;this._sanitizeTracks(domTree)._sanitizeItems(domTree)._inflateTracks()._assignCoordinatesToCells(domTree);}},{key:"_sanitizeTracks",value:function _sanitizeTracks(){var _domTree=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var style=_domTree.style,gridTemplateRows=style.gridTemplateRows,gridTemplateColumns=style.gridTemplateColumns,config=this._config,trackInfo,_getMaxRowColumn=getMaxRowColumn(_domTree.children),maxColumn=_getMaxRowColumn.maxColumn,maxRow=_getMaxRowColumn.maxRow;this.set("maxTracks",maxRow);trackInfo=this._fetchTrackInformation(gridTemplateRows);config.mapping.row={nameToLineMap:trackInfo.nameToLineMap,lineToNameMap:trackInfo.lineToNameMap};config.rowTracks=trackInfo.tracks;this.set("maxTracks",maxColumn);trackInfo=this._fetchTrackInformation(gridTemplateColumns);config.mapping.col={nameToLineMap:trackInfo.nameToLineMap,lineToNameMap:trackInfo.lineToNameMap};config.colTracks=trackInfo.tracks;return this}},{key:"_fetchTrackInformation",value:function _fetchTrackInformation(){var tracks=arguments.length>0&&arguments[0]!==undefined?arguments[0]:"none";var i,len,splittedTrackInfo=tracks.match(templateSplitRegex),nameList,sizeList,sanitizedTracks=[{}],startLineNames,endLineNames,nameToLineMap={},lineToNameMap={};nameList=splittedTrackInfo.filter(function(track){if(track&&typeof track==="string"&&track.length){len=track.length;if(track[0]==="["&&track[len-1]==="]"){return true}return false}return true});sizeList=splittedTrackInfo.filter(function(size){if(!size)return false;len=(size+"").toLowerCase().replace(/px|fr/,"");if(validSizes.indexOf(len)>=0||minmaxRegex.test(len)||!isNaN(len)){return true}return false}).map(function(size){return getCleanSize(size)});len=sizeList.length;if(tracks==="none"){len=this.getProps("maxTracks");}for(i=0;i<len;i++){startLineNames=nameList[i]&&nameList[i].replace(/\[|\]/g,"").split(" ").filter(function(name){return name.length}).map(function(name){return name.trim()})||[i+1+""];endLineNames=nameList[i+1]&&nameList[i+1].replace(/\[|\]/g,"").split(" ").filter(function(name){return name.length}).map(function(name){return name.trim()})||[i+2+""];sanitizedTracks.push({start:i+1,end:i+2,size:sizeList[i]||"auto"});lineToNameMap[i+1]=startLineNames;lineToNameMap[i+2]=endLineNames;startLineNames.forEach(function(name){return nameToLineMap[name]=i+1});endLineNames.forEach(function(name){return nameToLineMap[name]=i+2});nameToLineMap[i+1]=i+1;nameToLineMap[i+2]=i+2;}return {tracks:sanitizedTracks,nameToLineMap:nameToLineMap,lineToNameMap:lineToNameMap}}},{key:"_sanitizeItems",value:function _sanitizeItems(_domTree){var domTree=_domTree||this.props.domTree,items=domTree.children||[],mapping=this._config.mapping,gridAutoFlow=domTree.style.gridAutoFlow||"row",rowNum=Object.keys(mapping.row.lineToNameMap).length,colNum=Object.keys(mapping.col.lineToNameMap).length,sanitizedItems=[],autoFlowItems=[],itemStyle,gridMatrix=[[]],freeCells=[],cell,item,extraRows,i,j,len;for(i=1;i<=rowNum;i++){gridMatrix.push([]);}for(i=0,len=items.length;i<len;i++){itemStyle=resolveItemStyle(items[i].style,mapping);sanitizedItems.push(_objectSpread({},items[i],{rowStart:mapping.row.nameToLineMap[itemStyle.gridRowStart],rowEnd:mapping.row.nameToLineMap[itemStyle.gridRowEnd],colStart:mapping.col.nameToLineMap[itemStyle.gridColumnStart],colEnd:mapping.col.nameToLineMap[itemStyle.gridColumnEnd]}));item=sanitizedItems[i];updateMatrix(gridMatrix,{x:item.rowStart,y:item.colStart},{x:item.rowEnd,y:item.colEnd});}autoFlowItems=sanitizedItems.filter(function(sanitizedItem){return !sanitizedItem.colStart||!sanitizedItem.rowStart});if(autoFlowItems){if(gridAutoFlow==="row"){for(i=1;i<rowNum;i++){for(j=1;j<colNum;j++){if(!gridMatrix[i][j]){freeCells.push({row:i,col:j});}}}while(autoFlowItems.length&&freeCells.length){item=autoFlowItems.shift();cell=freeCells.shift();item.rowStart=cell.row;item.colStart=cell.col;item.rowEnd=cell.row+1;item.colEnd=cell.col+1;}extraRows=Math.ceil(autoFlowItems.length/colNum);if(extraRows){while(extraRows--){domTree.style.gridTemplateRows+="auto ";mapping.row.nameToLineMap[rowNum+1]=rowNum+1;mapping.row.nameToLineMap[rowNum+2]=rowNum+2;rowNum++;gridMatrix.push([]);}domTree.style.gridTemplateRows=domTree.style.gridTemplateRows.trim();freeCells=[];for(i=1;i<=rowNum;i++){for(j=1;j<=colNum;j++){if(!gridMatrix[i][j]){freeCells.push({row:i,col:j});}}}while(autoFlowItems.length){item=autoFlowItems.shift();cell=freeCells.shift();item.rowStart=cell.row;item.colStart=cell.col;item.rowEnd=cell.row+1;item.colEnd=cell.col+1;}}}}this._config.sanitizedItems=sanitizedItems;return this}},{key:"_inflateTracks",value:function _inflateTracks(){var _this$_config=this._config,sanitizedItems=_this$_config.sanitizedItems,colTracks=_this$_config.colTracks,rowTracks=_this$_config.rowTracks,sizedTracks,minHeightContribution=0,minWidthContribution=0,domTree=this.props.domTree,_ref2=domTree.style||{},paddingStart=_ref2.paddingStart,paddingEnd=_ref2.paddingEnd,paddingTop=_ref2.paddingTop,paddingBottom=_ref2.paddingBottom,width=_ref2.width,height=_ref2.height,tsa=new _trackSizing["default"];if(!isNaN(+width)){width-=paddingStart+paddingEnd;}sizedTracks=tsa.clear().set("tracks",colTracks).set("items",getItemSize(sanitizedItems,"width")).set("containerSize",width||"auto").resolveTracks();colTracks.forEach(function(track,index){track.calculatedStyle=sizedTracks[index];minWidthContribution+=sizedTracks[index].baseSize||0;});this._solveUnresolvedChildren();if(!isNaN(+height)){height-=paddingTop+paddingBottom;}sizedTracks=tsa.clear().set("tracks",rowTracks).set("items",getItemSize(sanitizedItems,"height")).set("containerSize",height||"auto").resolveTracks();rowTracks.forEach(function(track,index){track.calculatedStyle=sizedTracks[index];minHeightContribution+=sizedTracks[index].baseSize||0;});domTree.style.minHeightContribution=minHeightContribution;domTree.style.minWidthContribution=minWidthContribution;return this}},{key:"_solveUnresolvedChildren",value:function _solveUnresolvedChildren(_domTree){var domTree=_domTree||this.props.domTree,childrenWithRepeatConfiguration=(domTree.unResolvedChildren||[]).filter(function(child){return /repeat\(/g.test(child.style.gridTemplateColumns)||/repeat\(/g.test(child.style.gridTemplateRows)}),_this$_config2=this._config,colTracks=_this$_config2.colTracks,mapping=_this$_config2.mapping,parentReference=this.getProps("parent"),colTrackDp=[0],resolvedTracks,i,len,trackWidth,parentInfo,parsedWidthOfItem,colStart,colEnd;if(!childrenWithRepeatConfiguration.length){return this}for(i=1,len=colTracks.length;i<len;i++){colTrackDp[i]=colTrackDp[i-1]+colTracks[i].calculatedStyle.baseSize;}childrenWithRepeatConfiguration.forEach(function(child){parsedWidthOfItem=parseRepeatFunction(child.style.gridTemplateColumns)[1];colStart=mapping.col.nameToLineMap[child.style.gridColumnStart];colEnd=mapping.col.nameToLineMap[child.style.gridColumnEnd];trackWidth=colTrackDp[colEnd-1]-colTrackDp[colStart-1];parentInfo={itemWidth:parsedWidthOfItem,width:trackWidth};resolvedTracks=(0, repeatResolver_1.repeatResolver)(child,parentInfo);child.style.gridTemplateColumns=resolvedTracks.gridTemplateColumns;child.style.gridTemplateRows=resolvedTracks.gridTemplateRows;parentReference.gridLayoutEngine(child);});return this}},{key:"_assignCoordinatesToCells",value:function _assignCoordinatesToCells(_domTree){var domTree=_domTree||this.props.domTree,_this$_config3=this._config,sanitizedItems=_this$_config3.sanitizedItems,rowTracks=_this$_config3.rowTracks,colTracks=_this$_config3.colTracks,item,len,i,_domTree$style=domTree.style,justifyItems=_domTree$style.justifyItems,alignItems=_domTree$style.alignItems,paddingStart=_domTree$style.paddingStart,paddingTop=_domTree$style.paddingTop,trackWidth,trackHeight,width,height,x,y,rowTrackdp=[paddingStart],colTrackdp=[paddingTop];for(i=1,len=rowTracks.length;i<len;i++){rowTrackdp[i]=rowTrackdp[i-1]+rowTracks[i].calculatedStyle.baseSize;}for(i=1,len=colTracks.length;i<len;i++){colTrackdp[i]=colTrackdp[i-1]+colTracks[i].calculatedStyle.baseSize;}domTree.layout={x:0,y:0,width:isNaN(domTree.style.width)?colTrackdp[colTrackdp.length-1]:domTree.style.width,height:isNaN(domTree.style.height)?rowTrackdp[rowTrackdp.length-1]:domTree.style.height};(domTree.children||[]).forEach(function(child,index){item=sanitizedItems[index];trackWidth=colTrackdp[item.colEnd-1]-colTrackdp[item.colStart-1];trackHeight=rowTrackdp[item.rowEnd-1]-rowTrackdp[item.rowStart-1];width=isNaN(+child.style.width)?trackWidth:+child.style.width;height=isNaN(+child.style.height)?trackHeight:+child.style.height;switch(justifyItems||child.style.justifySelf){case constants.CENTER:x=colTrackdp[item.colStart-1]+trackWidth/2-width/2;break;case constants.END:x=colTrackdp[item.colEnd-1]-width;break;case constants.STRETCH:width=trackWidth;x=colTrackdp[item.colStart-1];break;default:x=colTrackdp[item.colStart-1];}switch(alignItems||child.style.alignSelf){case constants.CENTER:y=rowTrackdp[item.rowStart-1]+trackHeight/2-height/2;break;case constants.END:y=rowTrackdp[item.rowEnd-1]-height;break;case constants.STRETCH:height=trackHeight;y=rowTrackdp[item.rowStart-1];break;default:y=rowTrackdp[item.rowStart-1];}x+=(0, utils$1.pluckNumber)(item.style.paddingStart,item.style.padding,0);y+=(0, utils$1.pluckNumber)(item.style.paddingTop,item.style.padding,0);child.layout={x:x,y:y,x2:x+width,y2:y+height,width:width,height:height};});return this}}]);return Grid}();var replaceWithAbsValue=function replaceWithAbsValue(){var styleTrack=arguments.length>0&&arguments[0]!==undefined?arguments[0]:"";var calculatedTrack=arguments.length>1?arguments[1]:undefined;var trackSplitAr=(styleTrack.match(templateSplitRegex)||[]).filter(function(track){return track&&!!track.trim()}),trackWithAbsValue="",counter=1;if(trackSplitAr.length&&!/repeat\(/.test(styleTrack)){trackSplitAr.forEach(function(track){if(validSizes.indexOf(track)>-1||/[0-9]fr/.test(track)||minmaxRegex.test(track)||!isNaN(track)){trackWithAbsValue+=calculatedTrack[counter].calculatedStyle.baseSize+" ";counter++;}else {trackWithAbsValue+=track+" ";}});}else {calculatedTrack.forEach(function(track){if(isNaN(track.calculatedStyle.baseSize))return;trackWithAbsValue+=track.calculatedStyle.baseSize+" ";});}return trackWithAbsValue.trim()},updateDomTreeWithResolvedValues=function updateDomTreeWithResolvedValues(domTree,grid){var containerStyle=domTree.style,rowTracks=grid.getConfig("rowTracks"),colTracks=grid.getConfig("colTracks"),mapping=grid.getConfig("mapping"),gridTemplateRows=containerStyle.gridTemplateRows,gridTemplateColumns=containerStyle.gridTemplateColumns,child,i,j,len,rowTrackSum,colTrackSum,rowStart,rowEnd,colStart,colEnd;domTree.style.gridTemplateRows=replaceWithAbsValue(gridTemplateRows,rowTracks);domTree.style.gridTemplateColumns=replaceWithAbsValue(gridTemplateColumns,colTracks);for(i=0,len=(domTree.children||[]).length;i<len;i++){child=domTree.children[i];if((0, utils$1.getDisplayProperty)(child)){child.style.gridTemplateColumns=child.userGivenStyles.gridTemplateColumns;child.style.gridTemplateRows=child.userGivenStyles.gridTemplateRows;if(isNaN(child.userGivenStyles.width)){colStart=child.style.gridColumnStart;colEnd=child.style.gridColumnEnd;colStart=mapping.col.nameToLineMap[colStart];colEnd=mapping.col.nameToLineMap[colEnd];for(j=colStart,colTrackSum=0;j<colEnd;j++){colTrackSum+=colTracks[j].calculatedStyle.baseSize;}child.style.width=colTrackSum;}if(isNaN(child.userGivenStyles.height)){rowStart=child.style.gridRowStart;rowEnd=child.style.gridRowEnd;rowStart=mapping.row.nameToLineMap[rowStart];rowEnd=mapping.row.nameToLineMap[rowEnd];for(j=rowStart,rowTrackSum=0;j<rowEnd;j++){rowTrackSum+=rowTracks[j].calculatedStyle.baseSize;}child.style.height=rowTrackSum;}}}return domTree};function computeGridLayout(domTree){var count=arguments.length>1&&arguments[1]!==undefined?arguments[1]:1;var i,len,style=domTree.style,child,grid;if(!domTree||!domTree.style){return}if(!domTree.userGivenStyles){domTree.style.width=isNaN(domTree.style.width)?"auto":domTree.style.width;domTree.style.height=isNaN(domTree.style.height)?"auto":domTree.style.height;style.paddingStart=(0, utils$1.pluckNumber)(style.paddingStart,style.padding,0);style.paddingEnd=(0, utils$1.pluckNumber)(style.paddingEnd,style.padding,0);style.paddingTop=(0, utils$1.pluckNumber)(style.paddingTop,style.padding,0);style.paddingBottom=(0, utils$1.pluckNumber)(style.paddingBottom,style.padding,0);domTree.userGivenStyles={gridTemplateColumns:domTree.style.gridTemplateColumns,gridTemplateRows:domTree.style.gridTemplateRows,width:domTree.style.width,height:domTree.style.height};}domTree.unResolvedChildren=[];for(i=0,len=domTree.children&&domTree.children.length;i<len;i++){child=domTree.children[i];if((0, utils$1.getDisplayProperty)(child)){if(validNestedGrid(child)){this.compute(child);}else {domTree.unResolvedChildren.push(child);}}}grid=new Grid;grid.set("domTree",domTree).set("parent",this).compute();if(count<2){this.gridLayoutEngine(updateDomTreeWithResolvedValues(domTree,grid),2);}return domTree}
	});

	unwrapExports(grid$1);
	var grid_1 = grid$1.computeGridLayout;

	var faber = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, '__esModule', { value: true });
	exports.computeLayout = void 0;



	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}
	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ('value' in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}
	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}
	var LayoutEngine = (function () {
	  function LayoutEngine() {
	    _classCallCheck(this, LayoutEngine);
	    this.gridLayoutEngine = grid$1.computeGridLayout;
	  }
	  _createClass(LayoutEngine, [
	    {
	      key: 'compute',
	      value: function compute(domTree) {
	        switch ((0, utils$1.getDisplayProperty)(domTree)) {
	          case constants.DISPLAY_GRID:
	            return this.gridLayoutEngine(domTree);
	          case constants.DISPLAY_FLEX:
	            return this.gridLayoutEngine(domTree);
	          default:
	            return this.gridLayoutEngine(domTree);
	        }
	      },
	    },
	  ]);
	  return LayoutEngine;
	})();
	var computeLayout = function computeLayout(domTree) {
	  var faber = new LayoutEngine();
	  var clonedDomTree = (0, utils$1.cloneObject)(domTree),
	    calculatedTree;
	  clonedDomTree.root = true;
	  calculatedTree = faber.compute(clonedDomTree);
	  (0, utils$1.attachLayoutInformation)(domTree, calculatedTree);
	  return domTree;
	};
	exports.computeLayout = computeLayout;
	});

	unwrapExports(faber);
	var faber_1 = faber.computeLayout;

	var faberjs = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"computeLayout",{enumerable:true,get:function get(){return faber.computeLayout}});
	});

	unwrapExports(faberjs);
	var faberjs_1 = faberjs.computeLayout;

	d3Selection.selection.prototype.layout = function (name, value) {
	    var _a, _b;
	    if (value === undefined)
	        return (_b = (_a = this.node()) === null || _a === void 0 ? void 0 : _a.__layout) === null || _b === void 0 ? void 0 : _b[name];
	    this.each(function (d, i, groups) {
	        var layout = groups[i].__layout;
	        if (!layout)
	            layout = groups[i].__layout = {};
	        if (value === null)
	            delete layout[name];
	        else
	            layout[name] = value;
	    });
	    return this;
	};
	d3Selection.selection.prototype.layoutBoundsCalculator = function (callback) {
	    var _a, _b;
	    if (callback === undefined)
	        return (_b = (_a = this.node()) === null || _a === void 0 ? void 0 : _a.__layout) === null || _b === void 0 ? void 0 : _b.getBounds;
	    this.each(function (d, i, groups) {
	        var layout = groups[i].__layout;
	        if (!layout)
	            layout = groups[i].__layout = {};
	        if (callback === null)
	            delete layout.getBounds;
	        else
	            layout.getBounds = callback;
	    });
	    return this;
	};
	function computeLayout(element, size) {
	    // 1st Phase
	    var rootLayoutNode = parseElementHierarchy(element);
	    rootLayoutNode.style.width = size.width;
	    rootLayoutNode.style.height = size.height;
	    faberjs_1(rootLayoutNode);
	    // 2nd Phase
	    setCalculatedDimensions(rootLayoutNode);
	    faberjs_1(rootLayoutNode);
	    setLayoutAttributes(element, rootLayoutNode);
	}
	function parseLayoutStyle(element) {
	    var _a, _b, _c, _d, _e, _f, _g;
	    if (element.__layout === undefined)
	        return null;
	    var data = element.__layout;
	    // todo: enable toggling of debug attributes
	    for (var key in element.__layout) {
	        if (key === 'getBounds')
	            continue;
	        element.setAttribute("layout-" + key, element.__layout[key]);
	    }
	    var trim = function (s) { return s.trim(); };
	    var parse = function (s) { return parseInt(s); };
	    var template = (_a = data['grid-template']) === null || _a === void 0 ? void 0 : _a.split('/').map(trim), templateRows = data['grid-template-rows'], templateColumns = data['grid-template-columns'], area = (_b = data['grid-area']) === null || _b === void 0 ? void 0 : _b.split('/').map(trim).map(parse), row = (_c = data['grid-row']) === null || _c === void 0 ? void 0 : _c.split('/').map(trim).map(parse), column = (_d = data['grid-column']) === null || _d === void 0 ? void 0 : _d.split('/').map(trim).map(parse), rowStart = data['grid-row-start'], rowEnd = data['grid-row-end'], columnStart = data['grid-column-start'], columnEnd = data['grid-column-end'], placeItems = (_e = data['place-items']) === null || _e === void 0 ? void 0 : _e.split(' '), alignItems = data['align-items'], justifyItems = data['justify-items'], placeSelf = (_f = data['place-self']) === null || _f === void 0 ? void 0 : _f.split(' '), alignSelf = data['align-self'], justifySelf = data['justify-self'], width = data.width, height = data.height;
	    var bbox = undefined;
	    if (width === 'min-content' || height === 'min-content')
	        bbox = ((_g = data.getBounds) === null || _g === void 0 ? void 0 : _g.call(data, element)) || element.getBoundingClientRect();
	    var style = {
	        gridTemplateRows: templateRows || (template === null || template === void 0 ? void 0 : template[0]),
	        gridTemplateColumns: templateColumns || (template === null || template === void 0 ? void 0 : template[1]),
	        gridRowStart: rowStart || (row === null || row === void 0 ? void 0 : row[0]) || (area === null || area === void 0 ? void 0 : area[0]),
	        gridRowEnd: rowEnd || (row === null || row === void 0 ? void 0 : row[1]) || (area === null || area === void 0 ? void 0 : area[2]),
	        gridColumnStart: columnStart || (column === null || column === void 0 ? void 0 : column[0]) || (area === null || area === void 0 ? void 0 : area[1]),
	        gridColumnEnd: columnEnd || (column === null || column === void 0 ? void 0 : column[1]) || (area === null || area === void 0 ? void 0 : area[3]),
	        alignItems: alignItems || (placeItems === null || placeItems === void 0 ? void 0 : placeItems[0]),
	        justifyItems: justifyItems || (placeItems === null || placeItems === void 0 ? void 0 : placeItems[1]) || (placeItems === null || placeItems === void 0 ? void 0 : placeItems[0]),
	        alignSelf: alignSelf || (placeSelf === null || placeSelf === void 0 ? void 0 : placeSelf[0]),
	        justifySelf: justifySelf || (placeSelf === null || placeSelf === void 0 ? void 0 : placeSelf[1]) || (placeSelf === null || placeSelf === void 0 ? void 0 : placeSelf[0]),
	        width: (width === 'min-content' ? bbox.width : width) || undefined,
	        height: (height === 'min-content' ? bbox.height : height) || undefined
	    };
	    if (style.gridTemplateRows || style.gridTemplateColumns)
	        style.display = 'grid';
	    // delete undefined properties
	    Object.keys(style).forEach(function (key) { return style[key] === undefined && delete style[key]; });
	    if (Object.keys(style).length === 0)
	        return null;
	    return style;
	}
	function parseMargin(element) {
	    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
	    return {
	        left: ((_a = element.__layout) === null || _a === void 0 ? void 0 : _a['margin-left']) || ((_b = element.__layout) === null || _b === void 0 ? void 0 : _b['margin-horizontal']) || ((_c = element.__layout) === null || _c === void 0 ? void 0 : _c['margin']) ||
	            0,
	        right: ((_d = element.__layout) === null || _d === void 0 ? void 0 : _d['margin-right']) || ((_e = element.__layout) === null || _e === void 0 ? void 0 : _e['margin-horizontal']) || ((_f = element.__layout) === null || _f === void 0 ? void 0 : _f['margin']) ||
	            0,
	        top: ((_g = element.__layout) === null || _g === void 0 ? void 0 : _g['margin-top']) || ((_h = element.__layout) === null || _h === void 0 ? void 0 : _h['margin-vertical']) || ((_j = element.__layout) === null || _j === void 0 ? void 0 : _j['margin']) ||
	            0,
	        bottom: ((_k = element.__layout) === null || _k === void 0 ? void 0 : _k['margin-bottom']) || ((_l = element.__layout) === null || _l === void 0 ? void 0 : _l['margin-vertical']) || ((_m = element.__layout) === null || _m === void 0 ? void 0 : _m['margin']) ||
	            0
	    };
	}
	function parseContentPlacement(element) {
	    var _a, _b, _c, _d, _e, _f;
	    return {
	        align: ((_a = element.__layout) === null || _a === void 0 ? void 0 : _a['align-content']) ||
	            ((_c = (_b = element.__layout) === null || _b === void 0 ? void 0 : _b['place-content']) === null || _c === void 0 ? void 0 : _c.split(' ')[0]) ||
	            'stretch',
	        justify: ((_d = element.__layout) === null || _d === void 0 ? void 0 : _d['justify-content']) ||
	            ((_f = (_e = element.__layout) === null || _e === void 0 ? void 0 : _e['place-content']) === null || _f === void 0 ? void 0 : _f.split(' ')[1]) ||
	            'stretch'
	    };
	}
	function getPositionModifier(placement) {
	    var p = placement;
	    if (p === 'start' || p === 'stretch')
	        return function (position) { return position; };
	    if (p === 'center' || p === 'end')
	        return function (position) { return position + 1; };
	    if (p === 'space-around')
	        return function (position) { return 2 + (position - 1) * 3; };
	    if (p === 'space-between')
	        return function (position) { return 1 + (position - 1) * 2; };
	    if (p === 'space-evenly')
	        return function (position) { return position * 2; };
	    console.assert(false, 'should never reach this location');
	    return function (position) { return position; };
	}
	function getSpanModifier(placement) {
	    var p = placement;
	    if (p === 'start' || p === 'center' || p === 'end' || p === 'stretch')
	        return function (span) { return span; };
	    if (p === 'space-around')
	        return function (span) { return span + (span - 1) * 2; };
	    if (p === 'space-between' || p === 'space-evenly')
	        return function (span) { return span + (span - 1); };
	    console.assert(false, 'should never reach this location');
	    return function (span) { return span; };
	}
	function applyContentPlacementToGridTemplate(contentPlacement, template) {
	    var cells = template.split(' ');
	    var result = [];
	    if (contentPlacement === 'start')
	        result.push.apply(result, __spread(cells, ['1fr']));
	    if (contentPlacement === 'center')
	        result.push.apply(result, __spread(['1fr'], cells, ['1fr']));
	    if (contentPlacement === 'end')
	        result.push.apply(result, __spread(['1fr'], cells));
	    if (contentPlacement === 'stretch')
	        result.push.apply(result, __spread(cells));
	    if (contentPlacement === 'space-around')
	        cells.forEach(function (c) { return result.push('1fr', c, '1fr'); });
	    if (contentPlacement === 'space-between')
	        result.push.apply(result, __spread(cells.join(' 1fr ').split(' ')));
	    if (contentPlacement === 'space-evenly') {
	        result.push('1fr');
	        cells.forEach(function (c) { return result.push(c, '1fr'); });
	    }
	    return result.join(' ');
	}
	function parseElementHierarchy(element, rowModifier, rowSpanModifier, columnModifier, columnSpanModifier) {
	    var layoutStyle = parseLayoutStyle(element);
	    if (layoutStyle === null) {
	        element.removeAttribute('laidOut');
	        return null;
	    }
	    element.setAttribute('laidOut', '');
	    if (rowModifier && rowSpanModifier && layoutStyle.gridRowStart && layoutStyle.gridRowEnd) {
	        var start = layoutStyle.gridRowStart, end = layoutStyle.gridRowEnd;
	        layoutStyle.gridRowStart = rowModifier(start);
	        layoutStyle.gridRowEnd = layoutStyle.gridRowStart + rowSpanModifier(end - start);
	        // console.log('row', start, layoutStyle.gridRowStart, end, layoutStyle.gridRowEnd);
	    }
	    if (columnModifier &&
	        columnSpanModifier &&
	        layoutStyle.gridColumnStart &&
	        layoutStyle.gridColumnEnd) {
	        var start = layoutStyle.gridColumnStart, end = layoutStyle.gridColumnEnd;
	        layoutStyle.gridColumnStart = columnModifier(start);
	        layoutStyle.gridColumnEnd = layoutStyle.gridColumnStart + columnSpanModifier(end - start);
	        // console.log('col', start, layoutStyle.gridColumnStart, end, layoutStyle.gridColumnEnd);
	    }
	    var layoutNode = {
	        style: layoutStyle,
	        layout: { x: 0, y: 0, width: 0, height: 0 },
	        children: []
	    };
	    var contentPlacement = parseContentPlacement(element);
	    for (var i = 0; i < element.children.length; ++i) {
	        var childElement = element.children[i];
	        var childLayoutNode = parseElementHierarchy(childElement, getPositionModifier(contentPlacement.align), getSpanModifier(contentPlacement.align), getPositionModifier(contentPlacement.justify), getSpanModifier(contentPlacement.justify));
	        if (childLayoutNode)
	            layoutNode.children.push(childLayoutNode);
	    }
	    if (contentPlacement.align !== 'stretch' || contentPlacement.justify !== 'stretch') {
	        var style = layoutNode.style, rows = style.gridTemplateRows, columns = style.gridTemplateColumns, align = contentPlacement.align, justify = contentPlacement.justify;
	        style.gridTemplateRows = applyContentPlacementToGridTemplate(align, rows);
	        style.gridTemplateColumns = applyContentPlacementToGridTemplate(justify, columns);
	    }
	    var margin = parseMargin(element);
	    if (margin.left > 0 || margin.right > 0 || margin.top > 0 || margin.bottom > 0) {
	        var marginLayoutNode = {
	            style: __assign(__assign({}, layoutNode.style), { gridTemplateRows: margin.top + " 1fr " + margin.bottom, gridTemplateColumns: margin.left + " 1fr " + margin.right, display: 'grid' }),
	            layout: { x: 0, y: 0, width: 0, height: 0 },
	            children: [layoutNode]
	        };
	        delete marginLayoutNode.style.width;
	        delete marginLayoutNode.style.height;
	        layoutNode.style.gridRowStart = 2;
	        layoutNode.style.gridRowEnd = 3;
	        layoutNode.style.gridColumnStart = 2;
	        layoutNode.style.gridColumnEnd = 3;
	        layoutNode = marginLayoutNode;
	    }
	    return layoutNode;
	}
	function setCalculatedDimensions(layoutNode) {
	    layoutNode.style.width = layoutNode.layout.width;
	    layoutNode.style.height = layoutNode.layout.height;
	    for (var i = 0; i < layoutNode.children.length; ++i) {
	        setCalculatedDimensions(layoutNode.children[i]);
	    }
	}
	function setLayoutAttributes(element, layoutNode) {
	    if (element.getAttribute('laidOut') === null)
	        return false;
	    // todo: set layout as __layout property
	    var rect = layoutNode.layout;
	    var margin = parseMargin(element);
	    if (margin.left > 0 || margin.right > 0 || margin.top > 0 || margin.bottom > 0) {
	        layoutNode = layoutNode.children[0];
	        var childRect = layoutNode.layout;
	        rect.x += childRect.x;
	        rect.y += childRect.y;
	    }
	    element.setAttribute('layout', rectToString(rect));
	    var notLaidOutChildCount = 0;
	    for (var i = 0; i < element.children.length; ++i) {
	        var childElement = element.children[i];
	        var childLayoutNode = layoutNode.children[i - notLaidOutChildCount];
	        var childLaidOut = setLayoutAttributes(childElement, childLayoutNode);
	        notLaidOutChildCount += childLaidOut ? 0 : 1;
	    }
	    return true;
	}

	var Chart = /** @class */ (function () {
	    function Chart() {
	        this._svg = new SVGComponent()
	            .layout('grid-template', '1fr / 1fr')
	            .child('root', (this._rootGroup = new GroupComponent().layout('grid-area', '1 / 1 / 2 / 2')));
	        this._svg.selection().classed('chart', true).style('width', '100%').style('height', '100%');
	    }
	    Chart.prototype.mount = function (containerSelector) {
	        var _this = this;
	        d3Selection.select(containerSelector).append(function () { return _this._svg.selection().node(); });
	        this._svg.mount(this);
	        // first transition to initialize layout
	        // second transition to actually configure with correct layout
	        this.transition().transition();
	        window.addEventListener('resize', function () { return _this.render(); });
	        window.addEventListener('resize', debounce_1(function () { return _this.transition(); }, 250));
	        return this;
	    };
	    Chart.prototype.render = function () {
	        this._svg.beforeLayout();
	        var bbox = this._svg.selection().node().getBoundingClientRect();
	        computeLayout(this._svg.selection().node(), bbox);
	        this._svg.afterLayout().render();
	        return this;
	    };
	    Chart.prototype.transition = function () {
	        this._svg.configure().beforeLayout();
	        var bbox = this._svg.selection().node().getBoundingClientRect();
	        computeLayout(this._svg.selection().node(), bbox);
	        this._svg.afterLayout().transition();
	        return this;
	    };
	    Chart.prototype.svg = function () {
	        return this._svg;
	    };
	    Chart.prototype.root = function () {
	        return this._rootGroup;
	    };
	    return Chart;
	}());
	function chart() {
	    return new Chart();
	}

	var TicksComponent = /** @class */ (function (_super) {
	    __extends(TicksComponent, _super);
	    function TicksComponent() {
	        var _this = _super.call(this, 'g') || this;
	        _this._onConfigureAxis = function () { };
	        _this.classed('ticks', true);
	        _this._scale = d3Scale.scaleLinear().domain([0, 1]).range([0, 100]);
	        _this._transitionDelay = 0;
	        _this._transitionDuration = 250;
	        return _this;
	    }
	    TicksComponent.prototype.scale = function (scale) {
	        if (scale === undefined)
	            return this._scale;
	        this._scale = scale;
	        return this;
	    };
	    TicksComponent.prototype.transitionDuration = function (duration) {
	        if (duration === undefined)
	            return this._transitionDuration;
	        this._transitionDuration = duration;
	        return this;
	    };
	    TicksComponent.prototype.transitionDelay = function (delay) {
	        if (delay === undefined)
	            return this._transitionDelay;
	        this._transitionDelay = delay;
	        return this;
	    };
	    TicksComponent.prototype.onConfigureAxis = function (callback) {
	        if (callback === undefined)
	            return this._onConfigureAxis;
	        this._onConfigureAxis = callback;
	        return this;
	    };
	    TicksComponent.prototype.beforeLayout = function () {
	        _super.prototype.beforeLayout.call(this);
	        var axis = this.createAxis(this._scale);
	        this._onConfigureAxis(axis);
	        this.staticCloneSelection().call(axis);
	        return this;
	    };
	    TicksComponent.prototype.render = function () {
	        _super.prototype.render.call(this);
	        var axis = this.createAxis(this._scale);
	        this._onConfigureAxis(axis);
	        this.selection().call(axis);
	        return this;
	    };
	    TicksComponent.prototype.transition = function () {
	        _super.prototype.transition.call(this);
	        var axis = this.createAxis(this._scale);
	        this._onConfigureAxis(axis);
	        this.selection()
	            .transition()
	            .delay(this._transitionDelay)
	            .duration(this._transitionDuration)
	            // @ts-ignore the types for d3 axes are wrong and the following call is actually valid
	            .call(axis);
	        return this;
	    };
	    TicksComponent.prototype.eventData = function (event) {
	        if (event.target instanceof SVGLineElement || event.target instanceof SVGTextElement) {
	            var tickElement = event.target.parentNode;
	            var indexOf = Array.prototype.indexOf;
	            var tickIndex = indexOf.call(tickElement.parentNode.children, tickElement);
	            return {
	                component: this,
	                tickIndex: tickIndex - 1
	            };
	        }
	        else {
	            return null;
	        }
	    };
	    return TicksComponent;
	}(MediaQueryConfiguratorsMixin(ConfiguratorsMixin(LayoutTransformMixin(StaticSizeMixin(BaseComponent))))));

	var LeftTicksComponent = /** @class */ (function (_super) {
	    __extends(LeftTicksComponent, _super);
	    function LeftTicksComponent() {
	        var _this = _super.call(this) || this;
	        _this.layout('width', 'min-content');
	        return _this;
	    }
	    LeftTicksComponent.prototype.createAxis = function (scale) {
	        return d3Axis.axisLeft(scale);
	    };
	    LeftTicksComponent.prototype.beforeLayout = function () {
	        _super.prototype.beforeLayout.call(this);
	        this.attr('transform', "translate(" + this.size().width + ", 0)");
	        return this;
	    };
	    return LeftTicksComponent;
	}(TicksComponent));
	function leftTicks() {
	    return new LeftTicksComponent();
	}

	var RightTicksComponent = /** @class */ (function (_super) {
	    __extends(RightTicksComponent, _super);
	    function RightTicksComponent() {
	        var _this = _super.call(this) || this;
	        _this.layout('width', 'min-content');
	        return _this;
	    }
	    RightTicksComponent.prototype.createAxis = function (scale) {
	        return d3Axis.axisRight(scale);
	    };
	    return RightTicksComponent;
	}(TicksComponent));
	function rightTicks() {
	    return new RightTicksComponent();
	}

	var BottomTicksComponent = /** @class */ (function (_super) {
	    __extends(BottomTicksComponent, _super);
	    function BottomTicksComponent() {
	        var _this = _super.call(this) || this;
	        _this.layout('height', 'min-content');
	        return _this;
	    }
	    BottomTicksComponent.prototype.createAxis = function (scale) {
	        return d3Axis.axisBottom(scale);
	    };
	    return BottomTicksComponent;
	}(TicksComponent));
	function bottomTicks() {
	    return new BottomTicksComponent();
	}

	var TopTicksComponent = /** @class */ (function (_super) {
	    __extends(TopTicksComponent, _super);
	    function TopTicksComponent() {
	        var _this = _super.call(this) || this;
	        _this.layout('height', 'min-content');
	        return _this;
	    }
	    TopTicksComponent.prototype.createAxis = function (scale) {
	        return d3Axis.axisTop(scale);
	    };
	    TopTicksComponent.prototype.beforeLayout = function () {
	        this.attr('transform', "translate(0, " + this.size().height + ")");
	        return this;
	    };
	    return TopTicksComponent;
	}(TicksComponent));
	function topTicks() {
	    return new TopTicksComponent();
	}

	var LeftAxisComponent = /** @class */ (function (_super) {
	    __extends(LeftAxisComponent, _super);
	    function LeftAxisComponent() {
	        var _this = _super.call(this, 'g') || this;
	        _this.layout('grid-template', 'auto / auto auto')
	            .child('ticks', (_this._ticks = new LeftTicksComponent().layout('grid-area', '1 / 2 / 2 / 3')))
	            .child('title', (_this._title = verticalTextAttributes(titleTextAttributes(new TextComponent())
	            .layout('grid-area', '1 / 1 / 2 / 2')
	            .layout('place-self', 'center')
	            .layout('margin-right', 5))));
	        return _this;
	    }
	    LeftAxisComponent.prototype.ticks = function () {
	        return this._ticks;
	    };
	    LeftAxisComponent.prototype.title = function () {
	        return this._title;
	    };
	    return LeftAxisComponent;
	}(MediaQueryConfiguratorsMixin(ConfiguratorsMixin(ChildrenMixin(LayoutTransformMixin(BaseComponent))))));
	function leftAxis() {
	    return new LeftAxisComponent();
	}

	var BottomAxisComponent = /** @class */ (function (_super) {
	    __extends(BottomAxisComponent, _super);
	    function BottomAxisComponent() {
	        var _this = _super.call(this, 'g') || this;
	        _this.layout('grid-template', 'auto auto / auto')
	            .child('ticks', (_this._ticks = new BottomTicksComponent().layout('grid-area', '1 / 1 / 2 / 2')))
	            .child('title', (_this._title = titleTextAttributes(new TextComponent())
	            .layout('grid-area', '2 / 1 / 3 / 2')
	            .layout('place-self', 'center')
	            .layout('margin-top', 5)));
	        return _this;
	    }
	    BottomAxisComponent.prototype.ticks = function () {
	        return this._ticks;
	    };
	    BottomAxisComponent.prototype.title = function () {
	        return this._title;
	    };
	    return BottomAxisComponent;
	}(MediaQueryConfiguratorsMixin(ConfiguratorsMixin(ChildrenMixin(LayoutTransformMixin(BaseComponent))))));
	function bottomAxis() {
	    return new BottomAxisComponent();
	}

	var RightAxisComponent = /** @class */ (function (_super) {
	    __extends(RightAxisComponent, _super);
	    function RightAxisComponent() {
	        var _this = _super.call(this, 'g') || this;
	        _this.layout('grid-template', 'auto / auto auto')
	            .child('ticks', (_this._ticks = new RightTicksComponent().layout('grid-area', '1 / 1 / 2 / 2')))
	            .child('title', (_this._title = verticalTextAttributes(titleTextAttributes(new TextComponent()))
	            .layout('grid-area', '1 / 2 / 2 / 3')
	            .layout('place-self', 'center')
	            .layout('margin-left', 5)));
	        return _this;
	    }
	    RightAxisComponent.prototype.ticks = function () {
	        return this._ticks;
	    };
	    RightAxisComponent.prototype.title = function () {
	        return this._title;
	    };
	    return RightAxisComponent;
	}(MediaQueryConfiguratorsMixin(ConfiguratorsMixin(ChildrenMixin(LayoutTransformMixin(BaseComponent))))));
	function rightAxis() {
	    return new RightAxisComponent();
	}

	var TopAxisComponent = /** @class */ (function (_super) {
	    __extends(TopAxisComponent, _super);
	    function TopAxisComponent() {
	        var _this = _super.call(this, 'g') || this;
	        _this.layout('grid-template', 'auto auto / auto')
	            .child('ticks', (_this._ticks = new TopTicksComponent().layout('grid-area', '2 / 1 / 3 / 2')))
	            .child('title', (_this._title = titleTextAttributes(new TextComponent())
	            .layout('grid-area', '1 / 1 / 2 / 2')
	            .layout('place-self', 'center')
	            .layout('margin-bottom', 5)));
	        return _this;
	    }
	    TopAxisComponent.prototype.ticks = function () {
	        return this._ticks;
	    };
	    TopAxisComponent.prototype.title = function () {
	        return this._title;
	    };
	    return TopAxisComponent;
	}(MediaQueryConfiguratorsMixin(ConfiguratorsMixin(ChildrenMixin(LayoutTransformMixin(BaseComponent))))));

	(function (XAxisPosition) {
	    XAxisPosition[XAxisPosition["Bottom"] = 0] = "Bottom";
	    XAxisPosition[XAxisPosition["Top"] = 1] = "Top";
	})(exports.XAxisPosition || (exports.XAxisPosition = {}));
	(function (YAxisPosition) {
	    YAxisPosition[YAxisPosition["Left"] = 0] = "Left";
	    YAxisPosition[YAxisPosition["Right"] = 1] = "Right";
	})(exports.YAxisPosition || (exports.YAxisPosition = {}));

	(function (BarOrientation) {
	    BarOrientation[BarOrientation["Vertical"] = 0] = "Vertical";
	    BarOrientation[BarOrientation["Horizontal"] = 1] = "Horizontal";
	})(exports.BarOrientation || (exports.BarOrientation = {}));
	var BarsCalculator = /** @class */ (function () {
	    function BarsCalculator() {
	        this._mainValues = [];
	        this._mainScale = d3Scale.scaleBand();
	        this._crossValues = [];
	        this._crossScale = d3Scale.scaleLinear();
	        this._orientation = exports.BarOrientation.Vertical;
	        this._bars = [];
	    }
	    BarsCalculator.prototype.mainValues = function (values) {
	        if (values === undefined)
	            return this._mainValues;
	        this._mainValues = values;
	        this._mainScale.domain(this._mainValues);
	        return this;
	    };
	    BarsCalculator.prototype.mainScale = function (scale) {
	        if (scale === undefined)
	            return this._mainScale;
	        this._mainScale = scale;
	        this._mainScale.domain(this._mainValues);
	        return this;
	    };
	    BarsCalculator.prototype.crossValues = function (values) {
	        if (values === undefined)
	            return this._crossValues;
	        this._crossValues = values;
	        return this;
	    };
	    BarsCalculator.prototype.crossScale = function (scale) {
	        if (scale === undefined)
	            return this._crossScale;
	        this._crossScale = scale;
	        return this;
	    };
	    BarsCalculator.prototype.orientation = function (orientation) {
	        if (orientation === undefined)
	            return this._orientation;
	        this._orientation = orientation;
	        return this;
	    };
	    BarsCalculator.prototype.keys = function (keys) {
	        if (keys === undefined)
	            return this._keys;
	        if (keys === null)
	            this._keys = undefined;
	        else
	            this._keys = keys;
	        return this;
	    };
	    BarsCalculator.prototype.fitInSize = function (size) {
	        var _a, _b;
	        if (this._orientation === exports.BarOrientation.Vertical) {
	            this._mainScale.range([0, size.width]);
	            this._crossScale.range([size.height, 0]);
	        }
	        else if (this._orientation === exports.BarOrientation.Horizontal) {
	            this._mainScale.range([0, size.height]);
	            this._crossScale.range([0, size.width]);
	        }
	        this._bars = [];
	        for (var i = 0; i < this._crossValues.length; ++i) {
	            var mv = this._mainValues[i];
	            var cv = this._crossValues[i];
	            if (this._orientation === exports.BarOrientation.Vertical) {
	                this._bars.push({
	                    mainIndex: i,
	                    key: ((_a = this._keys) === null || _a === void 0 ? void 0 : _a[i]) || i.toString(),
	                    rect: {
	                        x: this._mainScale(mv),
	                        y: Math.min(this._crossScale(0), this._crossScale(cv)),
	                        width: this._mainScale.bandwidth(),
	                        height: Math.abs(this._crossScale(0) - this._crossScale(cv))
	                    }
	                });
	            }
	            else if (this._orientation === exports.BarOrientation.Horizontal) {
	                this._bars.push({
	                    mainIndex: i,
	                    key: ((_b = this._keys) === null || _b === void 0 ? void 0 : _b[i]) || i.toString(),
	                    rect: {
	                        x: Math.min(this._crossScale(0), this._crossScale(cv)),
	                        y: this._mainScale(mv),
	                        width: Math.abs(this._crossScale(0) - this._crossScale(cv)),
	                        height: this._mainScale.bandwidth()
	                    }
	                });
	            }
	        }
	        return this;
	    };
	    BarsCalculator.prototype.barData = function () {
	        return this._bars;
	    };
	    return BarsCalculator;
	}());
	function barsCalculator() {
	    return new BarsCalculator();
	}

	var BarsComponent = /** @class */ (function (_super) {
	    __extends(BarsComponent, _super);
	    function BarsComponent() {
	        var _this = _super.call(this, 'g') || this;
	        _this._barsCalculator = new BarsCalculator();
	        _this._transitionDuration = 250;
	        _this._transitionDelay = 250;
	        _this._onCreateBars = createBars;
	        _this._onRemoveBars = function (selection) { return removeBars(selection, _this._transitionDuration); };
	        _this._onUpdateBars = updateBars;
	        _this.classed('bars', true)
	            .attr('fill', BarsComponent.defaultColor)
	            .attr('layout', '0, 0, 600, 400');
	        return _this;
	    }
	    BarsComponent.prototype.mainValues = function (values) {
	        if (values === undefined)
	            return this._barsCalculator.mainValues();
	        this._barsCalculator.mainValues(values);
	        return this;
	    };
	    BarsComponent.prototype.mainScale = function (scale) {
	        if (scale === undefined)
	            return this._barsCalculator.mainScale();
	        this._barsCalculator.mainScale(scale);
	        return this;
	    };
	    BarsComponent.prototype.crossValues = function (values) {
	        if (values === undefined)
	            return this._barsCalculator.crossValues();
	        this._barsCalculator.crossValues(values);
	        return this;
	    };
	    BarsComponent.prototype.crossScale = function (scale) {
	        if (scale === undefined)
	            return this._barsCalculator.crossScale();
	        this._barsCalculator.crossScale(scale);
	        return this;
	    };
	    BarsComponent.prototype.orientation = function (orientation) {
	        if (orientation === undefined)
	            return this._barsCalculator.orientation();
	        this._barsCalculator.orientation(orientation);
	        return this;
	    };
	    BarsComponent.prototype.barData = function () {
	        return this._barsCalculator.barData();
	    };
	    BarsComponent.prototype.keys = function (keys) {
	        if (keys === undefined)
	            return this._barsCalculator.keys();
	        if (keys === null)
	            this._barsCalculator.keys(null);
	        else
	            this._barsCalculator.keys(keys);
	        return this;
	    };
	    BarsComponent.prototype.transitionDuration = function (duration) {
	        if (duration === undefined)
	            return this._transitionDuration;
	        this._transitionDuration = duration;
	        return this;
	    };
	    BarsComponent.prototype.transitionDelay = function (delay) {
	        if (delay === undefined)
	            return this._transitionDelay;
	        this._transitionDelay = delay;
	        return this;
	    };
	    BarsComponent.prototype.onCreateBars = function (callback) {
	        if (callback === undefined)
	            return this._onCreateBars;
	        this._onCreateBars = callback;
	        return this;
	    };
	    BarsComponent.prototype.onRemoveBars = function (callback) {
	        if (callback === undefined)
	            return this._onRemoveBars;
	        this._onRemoveBars = callback;
	        return this;
	    };
	    BarsComponent.prototype.onUpdateBars = function (callback) {
	        if (callback === undefined)
	            return this._onUpdateBars;
	        this._onUpdateBars = callback;
	        return this;
	    };
	    BarsComponent.prototype.afterLayout = function () {
	        _super.prototype.afterLayout.call(this);
	        console.assert(this.attr('layout') !== null, 'layout attribute must be specified');
	        this._barsCalculator.fitInSize(rectFromString(this.attr('layout')));
	        return this;
	    };
	    BarsComponent.prototype.render = function () {
	        _super.prototype.render.call(this);
	        this.selection()
	            .selectAll('.bar')
	            .data(this._barsCalculator.barData(), function (d) { return d.key; })
	            .join(this._onCreateBars, undefined, this._onRemoveBars)
	            .call(this._onUpdateBars);
	        return this;
	    };
	    BarsComponent.prototype.transition = function () {
	        _super.prototype.transition.call(this);
	        this.selection()
	            .selectAll('.bar')
	            .data(this._barsCalculator.barData(), function (d) { return d.key; })
	            .join(this._onCreateBars, undefined, this._onRemoveBars)
	            .transition()
	            .delay(this._transitionDelay)
	            .duration(this._transitionDuration)
	            .call(this._onUpdateBars);
	        return this;
	    };
	    BarsComponent.prototype.eventData = function (event) {
	        var element = event.target;
	        var barSelection = d3Selection.select(element);
	        if (barSelection.classed('exiting'))
	            return null;
	        return __assign({ component: this }, barSelection.datum());
	    };
	    BarsComponent.defaultColor = categoricalColors[0];
	    return BarsComponent;
	}(MediaQueryConfiguratorsMixin(ConfiguratorsMixin(LayoutTransformMixin(BaseComponent)))));
	function bars() {
	    return new BarsComponent();
	}
	function createBars(enterSelection) {
	    return enterSelection
	        .append('rect')
	        .classed('bar', true)
	        .attr('x', function (d) { return d.rect.x + d.rect.width / 2; })
	        .attr('y', function (d) { return d.rect.y + d.rect.height / 2; })
	        .attr('width', 0)
	        .attr('height', 0);
	}
	function removeBars(exitSelection, transitionDuration) {
	    exitSelection
	        .classed('exiting', true)
	        .transition()
	        .duration(transitionDuration)
	        .attr('x', function (d) { return d.rect.x + d.rect.width / 2; })
	        .attr('y', function (d) { return d.rect.y + d.rect.height / 2; })
	        .attr('width', 0)
	        .attr('height', 0)
	        .remove();
	}
	function updateBars(selection) {
	    selection
	        .attr('x', function (d) { return d.rect.x; })
	        .attr('y', function (d) { return d.rect.y; })
	        .attr('width', function (d) { return d.rect.width; })
	        .attr('height', function (d) { return d.rect.height; });
	}

	var GroupedBarsCalculator = /** @class */ (function () {
	    function GroupedBarsCalculator() {
	        this._mainValues = [];
	        this._mainScale = d3Scale.scaleBand().padding(0.1);
	        this._mainInnerScale = d3Scale.scaleBand().padding(0.1);
	        this._crossValues = [];
	        this._crossScale = d3Scale.scaleLinear();
	        this._orientation = exports.BarOrientation.Vertical;
	        this._bars = [];
	    }
	    GroupedBarsCalculator.prototype.mainValues = function (categories) {
	        if (categories === undefined)
	            return this._mainValues;
	        this._mainValues = categories;
	        this._mainScale.domain(this._mainValues);
	        return this;
	    };
	    GroupedBarsCalculator.prototype.mainScale = function (scale) {
	        if (scale === undefined)
	            return this._mainScale;
	        this._mainScale = scale;
	        this._mainScale.domain(this._mainValues);
	        return this;
	    };
	    GroupedBarsCalculator.prototype.crossValues = function (values) {
	        var _a;
	        if (values === undefined)
	            return this._crossValues;
	        this._crossValues = values;
	        this._mainInnerScale.domain(d3Array.range(((_a = this._crossValues[0]) === null || _a === void 0 ? void 0 : _a.length) || 0));
	        return this;
	    };
	    GroupedBarsCalculator.prototype.crossScale = function (scale) {
	        if (scale === undefined)
	            return this._crossScale;
	        this._crossScale = scale;
	        return this;
	    };
	    GroupedBarsCalculator.prototype.mainInnerScale = function (scale) {
	        var _a;
	        if (scale === undefined)
	            return this._mainInnerScale;
	        this._mainInnerScale = scale;
	        this._mainInnerScale.domain(d3Array.range(((_a = this._crossValues[0]) === null || _a === void 0 ? void 0 : _a.length) || 0));
	        return this;
	    };
	    GroupedBarsCalculator.prototype.orientation = function (orientation) {
	        if (orientation === undefined)
	            return this._orientation;
	        this._orientation = orientation;
	        return this;
	    };
	    GroupedBarsCalculator.prototype.keys = function (keys) {
	        if (keys === undefined)
	            return this._keys;
	        if (keys === null)
	            this._keys = undefined;
	        else
	            this._keys = keys;
	        return this;
	    };
	    GroupedBarsCalculator.prototype.barData = function () {
	        return this._bars;
	    };
	    GroupedBarsCalculator.prototype.fitInSize = function (size) {
	        var _a, _b;
	        if (this._orientation === exports.BarOrientation.Vertical) {
	            this._mainScale.range([0, size.width]);
	            this._crossScale.range([size.height, 0]);
	        }
	        else if (this._orientation === exports.BarOrientation.Horizontal) {
	            this._mainScale.range([0, size.height]);
	            this._crossScale.range([0, size.width]);
	        }
	        this._mainInnerScale.range([0, this._mainScale.bandwidth()]);
	        this._bars = [];
	        for (var i = 0; i < this._crossValues.length; ++i) {
	            var barGroup = [];
	            this._bars.push(barGroup);
	            var subcategoryValues = this._crossValues[i];
	            for (var j = 0; j < subcategoryValues.length; ++j) {
	                var c = this._mainValues[i];
	                var v = subcategoryValues[j];
	                if (this._orientation === exports.BarOrientation.Vertical) {
	                    barGroup.push({
	                        mainIndex: i,
	                        crossIndex: j,
	                        key: ((_a = this._keys) === null || _a === void 0 ? void 0 : _a[i][j]) || i + "/" + j,
	                        rect: {
	                            x: this._mainScale(c) + this._mainInnerScale(j),
	                            y: Math.min(this._crossScale(0), this._crossScale(v)),
	                            width: this._mainInnerScale.bandwidth(),
	                            height: Math.abs(this._crossScale(0) - this._crossScale(v))
	                        }
	                    });
	                }
	                else if (this._orientation === exports.BarOrientation.Horizontal) {
	                    barGroup.push({
	                        mainIndex: i,
	                        crossIndex: j,
	                        key: ((_b = this._keys) === null || _b === void 0 ? void 0 : _b[i][j]) || i + "/" + j,
	                        rect: {
	                            x: Math.min(this._crossScale(0), this._crossScale(v)),
	                            y: this._mainScale(c) + this._mainInnerScale(j),
	                            width: Math.abs(this._crossScale(0) - this._crossScale(v)),
	                            height: this._mainInnerScale.bandwidth()
	                        }
	                    });
	                }
	            }
	        }
	        return this;
	    };
	    return GroupedBarsCalculator;
	}());
	function groupedBarsCalculator() {
	    return new GroupedBarsCalculator();
	}

	var GroupedBarsComponent = /** @class */ (function (_super) {
	    __extends(GroupedBarsComponent, _super);
	    function GroupedBarsComponent() {
	        var _this = _super.call(this, 'g') || this;
	        _this._barsCalculator = new GroupedBarsCalculator();
	        _this._transitionDuration = 250;
	        _this._transitionDelay = 250;
	        _this._onCreateBars = createBars;
	        _this._onRemoveBars = function (selection) { return removeBars(selection, _this._transitionDuration); };
	        _this._onCreateBarGroups = createBarGroups;
	        _this._onUpdateBars = function (selection) {
	            return updateGroupedBars(selection, GroupedBarsComponent.defaultColors);
	        };
	        _this.classed('bars', true).classed('grouped-bars', true).attr('layout', '0, 0, 600, 400');
	        return _this;
	    }
	    GroupedBarsComponent.prototype.mainValues = function (categories) {
	        if (categories === undefined)
	            return this._barsCalculator.mainValues();
	        this._barsCalculator.mainValues(categories);
	        return this;
	    };
	    GroupedBarsComponent.prototype.mainScale = function (scale) {
	        if (scale === undefined)
	            return this._barsCalculator.mainScale();
	        this._barsCalculator.mainScale(scale);
	        return this;
	    };
	    GroupedBarsComponent.prototype.crossValues = function (values) {
	        if (values === undefined)
	            return this._barsCalculator.crossValues();
	        this._barsCalculator.crossValues(values);
	        return this;
	    };
	    GroupedBarsComponent.prototype.crossScale = function (scale) {
	        if (scale === undefined)
	            return this._barsCalculator.crossScale();
	        this._barsCalculator.crossScale(scale);
	        return this;
	    };
	    GroupedBarsComponent.prototype.mainInnerScale = function (scale) {
	        if (scale === undefined)
	            return this._barsCalculator.mainInnerScale();
	        this._barsCalculator.mainInnerScale(scale);
	        return this;
	    };
	    GroupedBarsComponent.prototype.orientation = function (orientation) {
	        if (orientation === undefined)
	            return this._barsCalculator.orientation();
	        this._barsCalculator.orientation(orientation);
	        return this;
	    };
	    GroupedBarsComponent.prototype.barData = function () {
	        return this._barsCalculator.barData();
	    };
	    GroupedBarsComponent.prototype.keys = function (keys) {
	        if (keys === undefined)
	            return this._barsCalculator.keys();
	        if (keys === null)
	            this._barsCalculator.keys(null);
	        else
	            this._barsCalculator.keys(keys);
	        return this;
	    };
	    GroupedBarsComponent.prototype.transitionDuration = function (duration) {
	        if (duration === undefined)
	            return this._transitionDuration;
	        this._transitionDuration = duration;
	        return this;
	    };
	    GroupedBarsComponent.prototype.transitionDelay = function (delay) {
	        if (delay === undefined)
	            return this._transitionDelay;
	        this._transitionDelay = delay;
	        return this;
	    };
	    GroupedBarsComponent.prototype.onCreateBars = function (callback) {
	        if (callback === undefined)
	            return this._onCreateBars;
	        this._onCreateBars = callback;
	        return this;
	    };
	    GroupedBarsComponent.prototype.onRemoveBars = function (callback) {
	        if (callback === undefined)
	            return this._onRemoveBars;
	        this._onRemoveBars = callback;
	        return this;
	    };
	    GroupedBarsComponent.prototype.onCreateBarGroups = function (callback) {
	        if (callback === undefined)
	            return this._onCreateBarGroups;
	        this._onCreateBarGroups = callback;
	        return this;
	    };
	    GroupedBarsComponent.prototype.onUpdateBars = function (callback) {
	        if (callback === undefined)
	            return this._onUpdateBars;
	        this._onUpdateBars = callback;
	        return this;
	    };
	    GroupedBarsComponent.prototype.afterLayout = function () {
	        _super.prototype.afterLayout.call(this);
	        console.assert(this.attr('layout') !== null, 'layout attribute must be specified');
	        this._barsCalculator.fitInSize(rectFromString(this.attr('layout')));
	        return this;
	    };
	    GroupedBarsComponent.prototype.render = function () {
	        _super.prototype.render.call(this);
	        this.selection()
	            .selectAll('.bar-group')
	            .data(this._barsCalculator.barData())
	            .join(this._onCreateBarGroups)
	            .selectAll('.bar')
	            .data(function (d) { return d; }, function (d) { return d.key; })
	            .join(this._onCreateBars, undefined, this._onRemoveBars)
	            .call(this._onUpdateBars);
	        return this;
	    };
	    GroupedBarsComponent.prototype.transition = function () {
	        _super.prototype.transition.call(this);
	        this.selection()
	            .selectAll('.bar-group')
	            .data(this._barsCalculator.barData())
	            .join(this._onCreateBarGroups)
	            .selectAll('.bar')
	            .data(function (d) { return d; }, function (d) { return d.key; })
	            .join(this._onCreateBars, undefined, this._onRemoveBars)
	            .transition()
	            .delay(this._transitionDelay)
	            .duration(this._transitionDuration)
	            .call(this._onUpdateBars);
	        return this;
	    };
	    GroupedBarsComponent.prototype.eventData = function (event) {
	        var barElement = event.target;
	        var barSelection = d3Selection.select(barElement);
	        if (barSelection.classed('exiting'))
	            return null;
	        return __assign({ component: this }, barSelection.datum());
	    };
	    GroupedBarsComponent.defaultColors = categoricalColors;
	    return GroupedBarsComponent;
	}(MediaQueryConfiguratorsMixin(ConfiguratorsMixin(LayoutTransformMixin(BaseComponent)))));
	function groupedBars() {
	    return new GroupedBarsComponent();
	}
	function createBarGroups(enterSelection) {
	    return enterSelection.append('g').classed('bar-group', true);
	}
	function updateGroupedBars(selection, colors) {
	    selection.call(updateBars).attr('fill', function (d) { return colors[d.crossIndex]; });
	}

	var StackedBarsCalculator = /** @class */ (function () {
	    function StackedBarsCalculator() {
	        this._categories = [];
	        this._categoryScale = d3Scale.scaleBand().padding(0.1);
	        this._values = [];
	        this._valueScale = d3Scale.scaleLinear();
	        this._orientation = exports.BarOrientation.Vertical;
	        this._bars = [];
	    }
	    StackedBarsCalculator.prototype.mainValues = function (categories) {
	        if (categories === undefined)
	            return this._categories;
	        this._categories = categories;
	        this._categoryScale.domain(this._categories);
	        return this;
	    };
	    StackedBarsCalculator.prototype.mainScale = function (scale) {
	        if (scale === undefined)
	            return this._categoryScale;
	        this._categoryScale = scale;
	        this._categoryScale.domain(this._categories);
	        return this;
	    };
	    StackedBarsCalculator.prototype.crossValues = function (values) {
	        if (values === undefined)
	            return this._values;
	        this._values = values;
	        return this;
	    };
	    StackedBarsCalculator.prototype.crossScale = function (scale) {
	        if (scale === undefined)
	            return this._valueScale;
	        this._valueScale = scale;
	        return this;
	    };
	    StackedBarsCalculator.prototype.orientation = function (orientation) {
	        if (orientation === undefined)
	            return this._orientation;
	        this._orientation = orientation;
	        return this;
	    };
	    StackedBarsCalculator.prototype.keys = function (keys) {
	        if (keys === undefined)
	            return this._keys;
	        if (keys === null)
	            this._keys = undefined;
	        else
	            this._keys = keys;
	        return this;
	    };
	    StackedBarsCalculator.prototype.barData = function () {
	        return this._bars;
	    };
	    StackedBarsCalculator.prototype.fitInSize = function (size) {
	        var _a, _b;
	        if (this._orientation === exports.BarOrientation.Vertical) {
	            this._categoryScale.range([0, size.width]);
	            this._valueScale.range([size.height, 0]);
	        }
	        else if (this._orientation === exports.BarOrientation.Horizontal) {
	            this._categoryScale.range([0, size.height]);
	            this._valueScale.range([0, size.width]);
	        }
	        this._bars = [];
	        for (var i = 0; i < this._categories.length; ++i) {
	            var barStack = [];
	            this._bars.push(barStack);
	            var subcategoryValues = this._values[i];
	            var sum = 0;
	            for (var j = 0; j < subcategoryValues.length; ++j) {
	                var c = this._categories[i];
	                var v = subcategoryValues[j];
	                if (this._orientation === exports.BarOrientation.Vertical) {
	                    var bar = {
	                        mainIndex: i,
	                        crossIndex: j,
	                        key: ((_a = this._keys) === null || _a === void 0 ? void 0 : _a[i][j]) || i + "/" + j,
	                        rect: {
	                            x: this._categoryScale(c),
	                            y: -sum + Math.min(this._valueScale(0), this._valueScale(v)),
	                            width: this._categoryScale.bandwidth(),
	                            height: Math.abs(this._valueScale(0) - this._valueScale(v))
	                        }
	                    };
	                    barStack.push(bar);
	                    sum += bar.rect.height;
	                }
	                else if (this._orientation === exports.BarOrientation.Horizontal) {
	                    var bar = {
	                        mainIndex: i,
	                        crossIndex: j,
	                        key: ((_b = this._keys) === null || _b === void 0 ? void 0 : _b[i][j]) || i + "/" + j,
	                        rect: {
	                            x: sum + Math.min(this._valueScale(0), this._valueScale(v)),
	                            y: this._categoryScale(c),
	                            width: Math.abs(this._valueScale(0) - this._valueScale(v)),
	                            height: this._categoryScale.bandwidth()
	                        }
	                    };
	                    barStack.push(bar);
	                    sum += bar.rect.width;
	                }
	            }
	        }
	        return this;
	    };
	    return StackedBarsCalculator;
	}());
	function stackedBarsCalculator() {
	    return new StackedBarsCalculator();
	}

	var StackedBarsComponent = /** @class */ (function (_super) {
	    __extends(StackedBarsComponent, _super);
	    function StackedBarsComponent() {
	        var _this = _super.call(this, 'g') || this;
	        _this._barsCalculator = new StackedBarsCalculator();
	        _this._transitionDuration = 250;
	        _this._transitionDelay = 250;
	        _this._onCreateBars = createBars;
	        _this._onRemoveBars = function (selection) { return removeBars(selection, _this._transitionDuration); };
	        _this._onCreateBarStacks = createBarStacks;
	        _this._onUpdateBars = function (selection) {
	            return updateStackedBars(selection, StackedBarsComponent.defaultColors);
	        };
	        _this.classed('bars', true).classed('stacked-bars', true).attr('layout', '0, 0, 600, 400');
	        return _this;
	    }
	    StackedBarsComponent.prototype.mainValues = function (categories) {
	        if (categories === undefined)
	            return this._barsCalculator.mainValues();
	        this._barsCalculator.mainValues(categories);
	        return this;
	    };
	    StackedBarsComponent.prototype.mainScale = function (scale) {
	        if (scale === undefined)
	            return this._barsCalculator.mainScale();
	        this._barsCalculator.mainScale(scale);
	        return this;
	    };
	    StackedBarsComponent.prototype.crossValues = function (values) {
	        if (values === undefined)
	            return this._barsCalculator.crossValues();
	        this._barsCalculator.crossValues(values);
	        return this;
	    };
	    StackedBarsComponent.prototype.crossScale = function (scale) {
	        if (scale === undefined)
	            return this._barsCalculator.crossScale();
	        this._barsCalculator.crossScale(scale);
	        return this;
	    };
	    StackedBarsComponent.prototype.orientation = function (orientation) {
	        if (orientation === undefined)
	            return this._barsCalculator.orientation();
	        this._barsCalculator.orientation(orientation);
	        return this;
	    };
	    StackedBarsComponent.prototype.barData = function () {
	        return this._barsCalculator.barData();
	    };
	    StackedBarsComponent.prototype.keys = function (keys) {
	        if (keys === undefined)
	            return this._barsCalculator.keys();
	        if (keys === null)
	            this._barsCalculator.keys(null);
	        else
	            this._barsCalculator.keys(keys);
	        return this;
	    };
	    StackedBarsComponent.prototype.transitionDuration = function (duration) {
	        if (duration === undefined)
	            return this._transitionDuration;
	        this._transitionDuration = duration;
	        return this;
	    };
	    StackedBarsComponent.prototype.transitionDelay = function (delay) {
	        if (delay === undefined)
	            return this._transitionDelay;
	        this._transitionDelay = delay;
	        return this;
	    };
	    StackedBarsComponent.prototype.onCreateBars = function (callback) {
	        if (callback === undefined)
	            return this._onCreateBars;
	        this._onCreateBars = callback;
	        return this;
	    };
	    StackedBarsComponent.prototype.onRemoveBars = function (callback) {
	        if (callback === undefined)
	            return this._onRemoveBars;
	        this._onRemoveBars = callback;
	        return this;
	    };
	    StackedBarsComponent.prototype.onCreateBarStacks = function (callback) {
	        if (callback === undefined)
	            return this._onCreateBarStacks;
	        this._onCreateBarStacks = callback;
	        return this;
	    };
	    StackedBarsComponent.prototype.onUpdateBars = function (callback) {
	        if (callback === undefined)
	            return this._onUpdateBars;
	        this._onUpdateBars = callback;
	        return this;
	    };
	    StackedBarsComponent.prototype.afterLayout = function () {
	        _super.prototype.afterLayout.call(this);
	        console.assert(this.attr('layout') !== null, 'layout attribute must be specified');
	        this._barsCalculator.fitInSize(rectFromString(this.attr('layout')));
	        return this;
	    };
	    StackedBarsComponent.prototype.render = function () {
	        _super.prototype.render.call(this);
	        this.selection()
	            .selectAll('.bar-stack')
	            .data(this.barData())
	            .join(this._onCreateBarStacks)
	            .selectAll('.bar')
	            .data(function (d) { return d; }, function (d) { return d.key; })
	            .join(this._onCreateBars, undefined, this._onRemoveBars)
	            .call(this._onUpdateBars);
	        return this;
	    };
	    StackedBarsComponent.prototype.transition = function () {
	        _super.prototype.transition.call(this);
	        this.selection()
	            .selectAll('.bar-stack')
	            .data(this.barData())
	            .join(this._onCreateBarStacks)
	            .selectAll('.bar')
	            .data(function (d) { return d; }, function (d) { return d.key; })
	            .join(this._onCreateBars, undefined, this._onRemoveBars)
	            .transition()
	            .delay(this._transitionDelay)
	            .duration(this._transitionDuration)
	            .call(this._onUpdateBars);
	        return this;
	    };
	    StackedBarsComponent.prototype.eventData = function (event) {
	        var element = event.target;
	        var barSelection = d3Selection.select(element);
	        if (barSelection.classed('exiting'))
	            return null;
	        return __assign({ component: this }, barSelection.datum());
	    };
	    StackedBarsComponent.defaultColors = categoricalColors;
	    return StackedBarsComponent;
	}(MediaQueryConfiguratorsMixin(ConfiguratorsMixin(LayoutTransformMixin(BaseComponent)))));
	function stackedBars() {
	    return new StackedBarsComponent();
	}
	function createBarStacks(enterSelection) {
	    return enterSelection.append('g').classed('bar-stack', true);
	}
	function updateStackedBars(selection, colors) {
	    selection.call(updateBars).attr('fill', function (d) { return colors[d.crossIndex]; });
	}

	var BarPointsCalculator = /** @class */ (function () {
	    function BarPointsCalculator(barsAccessor) {
	        this._barsAccessor = barsAccessor;
	        this._heightPercent = 0.5;
	        this._widthPercent = 0.5;
	        this._points = [];
	    }
	    BarPointsCalculator.prototype.barsAccessor = function (accessor) {
	        if (accessor === undefined)
	            return this._barsAccessor;
	        this._barsAccessor = accessor;
	        return this;
	    };
	    BarPointsCalculator.prototype.heightPercent = function (percent) {
	        if (percent === undefined)
	            return this._heightPercent;
	        this._heightPercent = percent;
	        return this;
	    };
	    BarPointsCalculator.prototype.widthPercent = function (percent) {
	        if (percent === undefined)
	            return this._widthPercent;
	        this._widthPercent = percent;
	        return this;
	    };
	    BarPointsCalculator.prototype.points = function () {
	        var bars = this._barsAccessor();
	        var points = [];
	        for (var i = 0; i < bars.length; ++i) {
	            points.push({
	                x: bars[i].x + bars[i].width * this._widthPercent,
	                y: bars[i].y + bars[i].height * (1 - this._heightPercent)
	            });
	        }
	        return points;
	    };
	    return BarPointsCalculator;
	}());

	// todo: add custom BarLabelEventData (or just LabelEventData?)
	var BarLabelsComponent = /** @class */ (function (_super) {
	    __extends(BarLabelsComponent, _super);
	    function BarLabelsComponent(barsAccessor) {
	        var _this = _super.call(this, 'g') || this;
	        _this._barPoints = new BarPointsCalculator(barsAccessor);
	        _this._labels = [];
	        _this._transitionDuration = 250;
	        _this._transitionDelay = 250;
	        _this._onCreateLabels = createLabels;
	        _this._onRemoveLabels = removeLabels;
	        _this._onUpdateLabels = updateLabels;
	        _this.classed('bar-labels', true)
	            .attr('text-anchor', 'middle')
	            .attr('dominant-baseline', 'middle')
	            .attr('font-weight', 'normal');
	        return _this;
	    }
	    BarLabelsComponent.prototype.barsAccessor = function (accessor) {
	        if (accessor === undefined)
	            return this._barPoints.barsAccessor();
	        this._barPoints.barsAccessor(accessor);
	        return this;
	    };
	    BarLabelsComponent.prototype.labels = function (labels) {
	        if (labels === undefined)
	            return this._labels;
	        this._labels = labels;
	        return this;
	    };
	    BarLabelsComponent.prototype.heightPercent = function (percent) {
	        if (percent === undefined)
	            return this._barPoints.heightPercent();
	        this._barPoints.heightPercent(percent);
	        return this;
	    };
	    BarLabelsComponent.prototype.widthPercent = function (percent) {
	        if (percent === undefined)
	            return this._barPoints.widthPercent();
	        this._barPoints.widthPercent(percent);
	        return this;
	    };
	    BarLabelsComponent.prototype.points = function () {
	        return this._barPoints.points();
	    };
	    BarLabelsComponent.prototype.transitionDuration = function (duration) {
	        if (duration === undefined)
	            return this._transitionDuration;
	        this._transitionDuration = duration;
	        return this;
	    };
	    BarLabelsComponent.prototype.transitionDelay = function (delay) {
	        if (delay === undefined)
	            return this._transitionDelay;
	        this._transitionDelay = delay;
	        return this;
	    };
	    BarLabelsComponent.prototype.onCreateLabels = function (callback) {
	        if (callback === undefined)
	            return this._onCreateLabels;
	        this._onCreateLabels = callback;
	        return this;
	    };
	    BarLabelsComponent.prototype.onRemoveLabels = function (callback) {
	        if (callback === undefined)
	            return this._onRemoveLabels;
	        this._onRemoveLabels = callback;
	        return this;
	    };
	    BarLabelsComponent.prototype.onUpdateLabels = function (callback) {
	        if (callback === undefined)
	            return this._onUpdateLabels;
	        this._onUpdateLabels = callback;
	        return this;
	    };
	    BarLabelsComponent.prototype.render = function () {
	        var _this = this;
	        _super.prototype.render.call(this);
	        var labelData = this._barPoints
	            .points()
	            .map(function (p, i) { return ({ position: p, text: _this._labels[i].toString() }); });
	        this.selection()
	            .selectAll('text')
	            .data(labelData)
	            .join(this._onCreateLabels, undefined, this._onRemoveLabels)
	            .call(this._onUpdateLabels);
	        return this;
	    };
	    BarLabelsComponent.prototype.transition = function () {
	        var _this = this;
	        _super.prototype.transition.call(this);
	        var labelData = this._barPoints
	            .points()
	            .map(function (p, i) { return ({ position: p, text: _this._labels[i].toString() }); });
	        this.selection()
	            .selectAll('text')
	            .data(labelData)
	            .join(this._onCreateLabels, undefined, this._onRemoveLabels)
	            .transition()
	            .delay(this._transitionDelay)
	            .duration(this._transitionDuration)
	            .call(this._onUpdateLabels);
	        return this;
	    };
	    return BarLabelsComponent;
	}(MediaQueryConfiguratorsMixin(ConfiguratorsMixin(LayoutTransformMixin(BaseComponent)))));
	function barLabels(barsAccessor) {
	    return new BarLabelsComponent(barsAccessor);
	}
	function createLabels(enterSelection) {
	    return enterSelection.append('text').call(updateLabels);
	}
	function updateLabels(selection) {
	    selection
	        .attr('transform', function (d) { return "translate(" + d.position.x + ", " + d.position.y + ")"; })
	        .text(function (d) { return d.text; });
	}
	function removeLabels(exitSelection) {
	    exitSelection.remove();
	}

	var SwatchComponent = /** @class */ (function (_super) {
	    __extends(SwatchComponent, _super);
	    function SwatchComponent() {
	        var _this = _super.call(this, 'g') || this;
	        _this.layout('grid-template', "auto / auto auto").layout('margin', 10);
	        _this.child('rect', (_this._rect = new RectComponent()
	            .layout('grid-area', '1 / 1 / 2 / 2')
	            .layout('place-self', 'center end')
	            .attr('width', 15, 500)
	            .attr('height', 15, 500))).child('label', (_this._label = new TextComponent()
	            .layout('grid-area', '1 / 2 / 2 / 3')
	            .layout('place-self', 'center start')
	            .layout('margin-left', 5)));
	        return _this;
	    }
	    SwatchComponent.prototype.rect = function () {
	        return this._rect;
	    };
	    SwatchComponent.prototype.label = function () {
	        return this._label;
	    };
	    return SwatchComponent;
	}(MediaQueryConfiguratorsMixin(ConfiguratorsMixin(ChildrenMixin(LayoutTransformMixin(BaseComponent))))));
	function swatch() {
	    return new SwatchComponent();
	}

	var LegendComponent = /** @class */ (function (_super) {
	    __extends(LegendComponent, _super);
	    function LegendComponent(swatchCount) {
	        var _this = _super.call(this, 'g') || this;
	        _this.rowCount(swatchCount).columnCount(1).layout('place-content', 'center center');
	        for (var i = 0; i < swatchCount; ++i)
	            _this.child("swatch-" + i, new SwatchComponent());
	        return _this;
	    }
	    LegendComponent.prototype.swatchCount = function (count) {
	        if (count === undefined)
	            return this.children().length;
	        for (var i = count; i < this.children().length; ++i)
	            this.child("swatch-" + i, null);
	        for (var i = this.children().length; i < count; ++i)
	            this.child("swatch-" + i, new SwatchComponent());
	        return this;
	    };
	    LegendComponent.prototype.swatches = function () {
	        return this.children();
	    };
	    return LegendComponent;
	}(MediaQueryConfiguratorsMixin(ConfiguratorsMixin(GridMixin(ChildrenMixin(LayoutTransformMixin(BaseComponent)))))));
	function legend(swatchCount) {
	    return new LegendComponent(swatchCount);
	}

	var BlendComponent = /** @class */ (function (_super) {
	    __extends(BlendComponent, _super);
	    function BlendComponent() {
	        return _super.call(this, 'feBlend') || this;
	    }
	    return BlendComponent;
	}(MediaQueryConfiguratorsMixin(ConfiguratorsMixin(BaseComponent))));
	function blend() {
	    return new BlendComponent();
	}

	var ColorMatrixComponent = /** @class */ (function (_super) {
	    __extends(ColorMatrixComponent, _super);
	    function ColorMatrixComponent() {
	        return _super.call(this, 'feColorMatrix') || this;
	    }
	    return ColorMatrixComponent;
	}(MediaQueryConfiguratorsMixin(ConfiguratorsMixin(BaseComponent))));

	var GaussianBlurComponent = /** @class */ (function (_super) {
	    __extends(GaussianBlurComponent, _super);
	    function GaussianBlurComponent() {
	        return _super.call(this, 'feGaussianBlur') || this;
	    }
	    return GaussianBlurComponent;
	}(MediaQueryConfiguratorsMixin(ConfiguratorsMixin(BaseComponent))));
	function gaussianBlur() {
	    return new GaussianBlurComponent();
	}

	var OffsetComponent = /** @class */ (function (_super) {
	    __extends(OffsetComponent, _super);
	    function OffsetComponent() {
	        return _super.call(this, 'feOffset') || this;
	    }
	    return OffsetComponent;
	}(MediaQueryConfiguratorsMixin(ConfiguratorsMixin(BaseComponent))));
	function offset() {
	    return new OffsetComponent();
	}

	var DropShadowFilterComponent = /** @class */ (function (_super) {
	    __extends(DropShadowFilterComponent, _super);
	    function DropShadowFilterComponent(offset, blurStdDeviation, rect) {
	        if (rect === void 0) { rect = { x: '-100%', y: '-100%', width: '300%', height: '300%' }; }
	        var _this = _super.call(this, 'filter') || this;
	        _this.classed('drop-shadow', true)
	            .attr('id', v4())
	            .attr('x', rect.x)
	            .attr('y', rect.y)
	            .attr('width', rect.width)
	            .attr('height', rect.height);
	        _this.child('offset', (_this._offset = new OffsetComponent()
	            .attr('in', 'SourceGraphic')
	            .attr('result', 'offOut')
	            .attr('dx', offset.x)
	            .attr('dy', offset.y)))
	            .child('color-matrix', (_this._colorMatrix = new ColorMatrixComponent()
	            .attr('result', 'matrixOut')
	            .attr('in', 'offOut')
	            .attr('type', 'matrix')
	            .attr('values', '0.1 0 0 0 0 0 0.1 0 0 0 0 0 0.1 0 0 0 0 0 1 0')))
	            .child('blur', (_this._blur = new GaussianBlurComponent()
	            .attr('in', 'matrixOut')
	            .attr('result', 'blurOut')
	            .attr('stdDeviation', blurStdDeviation)))
	            .child('blend', (_this._blend = new BlendComponent()
	            .attr('in', 'SourceGraphic')
	            .attr('in2', 'blurOut')
	            .attr('mode', 'normal')));
	        return _this;
	    }
	    DropShadowFilterComponent.prototype.offset = function () {
	        return this._offset;
	    };
	    DropShadowFilterComponent.prototype.blur = function () {
	        return this._blur;
	    };
	    DropShadowFilterComponent.prototype.colorMatrix = function () {
	        return this._colorMatrix;
	    };
	    DropShadowFilterComponent.prototype.blend = function () {
	        return this._blend;
	    };
	    return DropShadowFilterComponent;
	}(MediaQueryConfiguratorsMixin(ConfiguratorsMixin(ChildrenMixin(BaseComponent)))));
	function dropShadowFilter(offset, blurStdDeviation, rect) {
	    if (rect === void 0) { rect = { x: '-25%', y: '-25%', width: '150%', height: '150%' }; }
	    return new DropShadowFilterComponent(offset, blurStdDeviation, rect);
	}

	var PointsCalculator = /** @class */ (function () {
	    function PointsCalculator() {
	        this._mainValues = [];
	        this._mainScale = d3Scale.scaleBand();
	        this._crossValues = [];
	        this._crossScale = d3Scale.scaleLinear();
	        this._radiuses = [];
	        this._radiusScale = d3Scale.scaleLinear().domain([0, 1]).range([5, 10]);
	        this._points = [];
	    }
	    PointsCalculator.prototype.mainValues = function (values) {
	        if (values === undefined)
	            return this._mainValues;
	        this._mainValues = values;
	        return this;
	    };
	    PointsCalculator.prototype.mainScale = function (scale) {
	        if (scale === undefined)
	            return this._mainScale;
	        this._mainScale = scale;
	        return this;
	    };
	    PointsCalculator.prototype.crossValues = function (values) {
	        if (values === undefined)
	            return this._crossValues;
	        this._crossValues = values;
	        return this;
	    };
	    PointsCalculator.prototype.crossScale = function (scale) {
	        if (scale === undefined)
	            return this._crossScale;
	        this._crossScale = scale;
	        return this;
	    };
	    PointsCalculator.prototype.radiuses = function (values) {
	        if (values === undefined)
	            return this._radiuses;
	        this._radiuses = values;
	        return this;
	    };
	    PointsCalculator.prototype.radiusScale = function (scale) {
	        if (scale === undefined)
	            return this._radiusScale;
	        this._radiusScale = scale;
	        return this;
	    };
	    PointsCalculator.prototype.keys = function (keys) {
	        if (keys === undefined)
	            return this._keys;
	        if (keys === null)
	            this._keys = undefined;
	        else
	            this._keys = keys;
	        return this;
	    };
	    PointsCalculator.prototype.pointData = function () {
	        return this._points;
	    };
	    PointsCalculator.prototype.fitInSize = function (size) {
	        var _a;
	        this._mainScale.range([0, size.width]);
	        this._crossScale.range([size.height, 0]);
	        this._points = [];
	        for (var i = 0; i < this._mainValues.length; ++i) {
	            var x = this._mainValues[i], y = this._crossValues[i], r = this._radiuses[i] || 0;
	            this._points.push({
	                index: i,
	                key: ((_a = this._keys) === null || _a === void 0 ? void 0 : _a[i]) || i.toString(),
	                center: {
	                    x: this._mainScale(x),
	                    y: this._crossScale(y)
	                },
	                radius: this._radiusScale(r)
	            });
	        }
	        return this;
	    };
	    return PointsCalculator;
	}());
	function pointsCalculator() {
	    return new PointsCalculator();
	}

	var PointsComponent = /** @class */ (function (_super) {
	    __extends(PointsComponent, _super);
	    function PointsComponent() {
	        var _this = _super.call(this, 'g') || this;
	        _this._calculator = new PointsCalculator();
	        _this._transitionDuration = 250;
	        _this._transitionDelay = 250;
	        _this._onCreatePoints = createPoints;
	        _this._onRemovePoints = function (selection) { return removePoints(selection, _this._transitionDuration); };
	        _this._onUpdatePoints = updatePoints;
	        _this.classed('points', true)
	            .attr('fill', PointsComponent.defaultColor)
	            .attr('layout', '0, 0, 600, 400');
	        return _this;
	    }
	    PointsComponent.prototype.mainValues = function (values) {
	        if (values === undefined)
	            return this._calculator.mainValues();
	        this._calculator.mainValues(values);
	        return this;
	    };
	    PointsComponent.prototype.mainScale = function (scale) {
	        if (scale === undefined)
	            return this._calculator.mainScale();
	        this._calculator.mainScale(scale);
	        return this;
	    };
	    PointsComponent.prototype.crossValues = function (values) {
	        if (values === undefined)
	            return this._calculator.crossValues();
	        this._calculator.crossValues(values);
	        return this;
	    };
	    PointsComponent.prototype.crossScale = function (scale) {
	        if (scale === undefined)
	            return this._calculator.crossScale();
	        this._calculator.crossScale(scale);
	        return this;
	    };
	    PointsComponent.prototype.radiuses = function (values) {
	        if (values === undefined)
	            return this._calculator.radiuses();
	        this._calculator.radiuses(values);
	        return this;
	    };
	    PointsComponent.prototype.radiusScale = function (scale) {
	        if (scale === undefined)
	            return this._calculator.radiusScale();
	        this._calculator.radiusScale(scale);
	        return this;
	    };
	    PointsComponent.prototype.pointData = function () {
	        return this._calculator.pointData();
	    };
	    PointsComponent.prototype.keys = function (keys) {
	        if (keys === undefined)
	            return this._calculator.keys();
	        if (keys === null)
	            this._calculator.keys(null);
	        else
	            this._calculator.keys(keys);
	        return this;
	    };
	    PointsComponent.prototype.transitionDuration = function (duration) {
	        if (duration === undefined)
	            return this._transitionDuration;
	        this._transitionDuration = duration;
	        return this;
	    };
	    PointsComponent.prototype.transitionDelay = function (delay) {
	        if (delay === undefined)
	            return this._transitionDelay;
	        this._transitionDelay = delay;
	        return this;
	    };
	    PointsComponent.prototype.onCreatePoints = function (callback) {
	        if (callback === undefined)
	            return this._onCreatePoints;
	        this._onCreatePoints = callback;
	        return this;
	    };
	    PointsComponent.prototype.onRemovePoints = function (callback) {
	        if (callback === undefined)
	            return this._onRemovePoints;
	        this._onRemovePoints = callback;
	        return this;
	    };
	    PointsComponent.prototype.onUpdatePoints = function (callback) {
	        if (callback === undefined)
	            return this._onUpdatePoints;
	        this._onUpdatePoints = callback;
	        return this;
	    };
	    PointsComponent.prototype.afterLayout = function () {
	        _super.prototype.afterLayout.call(this);
	        console.assert(this.attr('layout') !== null, 'layout attribute must be specified');
	        this._calculator.fitInSize(rectFromString(this.attr('layout')));
	        return this;
	    };
	    PointsComponent.prototype.render = function () {
	        _super.prototype.render.call(this);
	        this.selection()
	            .selectAll('circle')
	            .data(this.pointData(), function (d) { return d.key; })
	            .join(this._onCreatePoints, undefined, this._onRemovePoints)
	            .call(this._onUpdatePoints);
	        return this;
	    };
	    PointsComponent.prototype.transition = function () {
	        _super.prototype.transition.call(this);
	        this.selection()
	            .selectAll('circle')
	            .data(this.pointData(), function (d) { return d.key; })
	            .join(this._onCreatePoints, undefined, this._onRemovePoints)
	            .transition()
	            .delay(this._transitionDelay)
	            .duration(this._transitionDuration)
	            .call(this._onUpdatePoints);
	        return this;
	    };
	    PointsComponent.prototype.eventData = function (event) {
	        var element = event.target;
	        var pointSelection = d3Selection.select(element);
	        if (pointSelection.classed('exiting'))
	            return null;
	        return __assign({ component: this }, pointSelection.datum());
	    };
	    PointsComponent.defaultColor = categoricalColors[0];
	    return PointsComponent;
	}(MediaQueryConfiguratorsMixin(ConfiguratorsMixin(LayoutTransformMixin(BaseComponent)))));
	function points() {
	    return new PointsComponent();
	}
	function createPoints(enterSelection) {
	    return enterSelection
	        .append('circle')
	        .classed('point', true)
	        .attr('cx', function (d) { return d.center.x; })
	        .attr('cy', function (d) { return d.center.y; })
	        .attr('r', 0);
	}
	function removePoints(exitSelection, transitionDuration) {
	    exitSelection
	        .classed('exiting', true)
	        .transition()
	        .duration(transitionDuration)
	        .attr('r', 0)
	        .remove();
	}
	function updatePoints(selection) {
	    selection
	        .attr('cx', function (d) { return d.center.x; })
	        .attr('cy', function (d) { return d.center.y; })
	        .attr('r', function (d) { return d.radius; });
	}

	// source: https://stackoverflow.com/a/16436975
	function arraysEqual(a, b) {
	    if (a === b)
	        return true;
	    if (a == null || b == null)
	        return false;
	    if (a.length !== b.length)
	        return false;
	    for (var i = 0; i < a.length; ++i) {
	        if (a[i] instanceof Array && !arraysEqual(a[i], b[i]))
	            return false;
	        if (a[i] !== b[i])
	            return false;
	    }
	    return true;
	}

	var BrushComponent = /** @class */ (function (_super) {
	    __extends(BrushComponent, _super);
	    function BrushComponent() {
	        var _this = _super.call(this, 'g') || this;
	        _this._brush = d3Brush.brush();
	        _this.classed('brush', true).attr('layout', '0, 0, 600, 400');
	        return _this;
	    }
	    BrushComponent.prototype.afterLayout = function () {
	        // todo: unify duplicate code in render and transition methods?
	        return this;
	    };
	    BrushComponent.prototype.render = function () {
	        _super.prototype.render.call(this);
	        console.assert(this.attr('layout') !== null, 'layout attribute must be specified');
	        var layoutRect = rectFromString(this.attr('layout'));
	        this._brush.extent([
	            [0, 0],
	            [layoutRect.width, layoutRect.height],
	        ]);
	        this.selection().call(this._brush);
	        var newBrushSelection = this._selectionRect
	            ? [
	                [this._selectionRect.x, this._selectionRect.y],
	                [
	                    this._selectionRect.x + this._selectionRect.width,
	                    this._selectionRect.y + this._selectionRect.height,
	                ],
	            ]
	            : null;
	        var oldBrushSelection = d3Brush.brushSelection(this.node());
	        if (!arraysEqual(newBrushSelection, oldBrushSelection)) {
	            // if (animated && config.transitionDuration > 0)
	            //   this.selection()
	            //     .transition()
	            //     .duration(config.transitionDuration)
	            //     .call(this._brush.move, newBrushSelection);
	            // else this.selection().call(this._brush.move, newBrushSelection);
	            this.selection().call(this._brush.move, newBrushSelection);
	        }
	        return this;
	    };
	    BrushComponent.prototype.transition = function () {
	        _super.prototype.transition.call(this);
	        console.assert(this.attr('layout') !== null, 'layout attribute must be specified');
	        var layoutRect = rectFromString(this.attr('layout'));
	        this._brush.extent([
	            [0, 0],
	            [layoutRect.width, layoutRect.height],
	        ]);
	        this.selection().call(this._brush);
	        var newBrushSelection = this._selectionRect
	            ? [
	                [this._selectionRect.x, this._selectionRect.y],
	                [
	                    this._selectionRect.x + this._selectionRect.width,
	                    this._selectionRect.y + this._selectionRect.height,
	                ],
	            ]
	            : null;
	        var oldBrushSelection = d3Brush.brushSelection(this.node());
	        if (!arraysEqual(newBrushSelection, oldBrushSelection)) {
	            // if (animated && config.transitionDuration > 0)
	            //   this.selection()
	            //     .transition()
	            //     .duration(config.transitionDuration)
	            //     .call(this._brush.move, newBrushSelection);
	            // else this.selection().call(this._brush.move, newBrushSelection);
	            this.selection().call(this._brush.move, newBrushSelection);
	        }
	        return this;
	    };
	    BrushComponent.prototype.on = function (typenames, callback) {
	        var _this = this;
	        if (callback === null)
	            this._brush.on(typenames, null);
	        else {
	            this._brush.on(typenames, function (e) {
	                var s = e.selection;
	                var selectionRect;
	                if (s) {
	                    var x = s[0][0], y = s[0][1], width = s[1][0] - x, height = s[1][1] - y;
	                    selectionRect = { x: x, y: y, width: width, height: height };
	                }
	                callback(e.sourceEvent, {
	                    component: _this,
	                    brushEvent: e,
	                    selectionRect: selectionRect
	                });
	            });
	        }
	        return this;
	    };
	    BrushComponent.prototype.eventData = function (event) {
	        console.warn('cannot get event data of brush components');
	        return null;
	    };
	    return BrushComponent;
	}(MediaQueryConfiguratorsMixin(ConfiguratorsMixin(LayoutTransformMixin(BaseComponent)))));
	function brush() {
	    return new BrushComponent();
	}
	// export interface IBrushComponentConfig extends IComponentConfig {
	//   selectionRect: IRect<number> | null;
	//   transitionDuration: number;
	//   events: utils.IDictionary<(event: Event, data: IBrushEventData) => void>;
	// }
	// export interface IBrushEventData extends IComponentEventData {
	//   brushEvent: D3BrushEvent<unknown>;
	//   selectionRect?: IRect<number>;
	// }
	// export interface IBrushComponent extends IComponent<IBrushComponentConfig> {}
	// export class BrushComponent extends Component<IBrushComponentConfig> implements IBrushComponent {
	//   private _brush: BrushBehavior<unknown>;
	//   static setEventListeners(component: BrushComponent, config: IBrushComponentConfig) {
	//     for (const typenames in config.events) {
	//       component._brush.on(typenames, (e: D3BrushEvent<unknown>) => {
	//         const s = e.selection;
	//         let selectionRect: IRect<number> | undefined = undefined;
	//         if (s) {
	//           const x = s[0][0],
	//             y = s[0][1],
	//             width = s[1][0] - x,
	//             height = s[1][1] - y;
	//           selectionRect = { x: x, y: y, width: width, height: height };
	//         }
	//         config.events[typenames](e.sourceEvent, {
	//           component: component,
	//           brushEvent: e,
	//           selectionRect: selectionRect,
	//         });
	//       });
	//     }
	//   }
	//   static clearEventListeners(component: BrushComponent, config: IBrushComponentConfig) {
	//     for (const typenames in config.events) {
	//       component._brush.on(typenames, null);
	//     }
	//   }
	//   constructor() {
	//     super(
	//       create<SVGElement>('svg:g').classed('brush', true),
	//       {
	//         selectionRect: null,
	//         transitionDuration: 0,
	//         attributes: {},
	//         events: {},
	//         responsiveConfigs: {},
	//         parseConfig: (
	//           previousConfig: IBrushComponentConfig,
	//           newConfig: IBrushComponentConfig
	//         ) => {},
	//         applyConfig: (previousConfig: IBrushComponentConfig, newConfig: IBrushComponentConfig) => {
	//           BrushComponent.clearEventListeners(this, previousConfig);
	//           BrushComponent.setEventListeners(this, newConfig);
	//         },
	//       },
	//       Component.mergeConfigs
	//     );
	//     this._brush = d3Brush();
	//   }
	//   mount(selection: Selection<SVGElement, unknown, BaseType, unknown>): this {
	//     selection.append(() => this.selection().node());
	//     return this;
	//   }
	//   render(animated: boolean): this {
	//     const layoutRect = Rect.fromString(this.selection().attr('layout') || '0, 0, 600, 400');
	//     const config = this.activeConfig();
	//     this._brush.extent([
	//       [0, 0],
	//       [layoutRect.width, layoutRect.height],
	//     ]);
	//     this.selection().call(this._brush);
	//     const r = config.selectionRect;
	//     const newBrushSelection = r
	//       ? [
	//           [r.x, r.y],
	//           [r.x + r.width, r.y + r.height],
	//         ]
	//       : null;
	//     const oldBrushSelection = d3BrushSelection(this.selection().node() as SVGGElement);
	//     if (!arraysEqual(newBrushSelection, oldBrushSelection)) {
	//       if (animated && config.transitionDuration > 0)
	//         this.selection()
	//           .transition()
	//           .duration(config.transitionDuration)
	//           .call(this._brush.move, newBrushSelection);
	//       else this.selection().call(this._brush.move, newBrushSelection);
	//     }
	//     return this;
	//   }
	// }
	// export function brush(): BrushComponent {
	//   return new BrushComponent();
	// }

	var ZoomComponent = /** @class */ (function (_super) {
	    __extends(ZoomComponent, _super);
	    function ZoomComponent() {
	        var _this = _super.call(this) || this;
	        _this.attr('pointer-events', 'all').attr('layout', '0, 0, 600, 400');
	        _this._zoomBehavior = d3Zoom.zoom()
	            .extent([
	            [0, 0],
	            [1, 1],
	        ])
	            .scaleExtent([1, 20]);
	        _this._translateExtentFactors = [
	            [0, 0],
	            [1, 1],
	        ];
	        _this.child('rect', (_this._areaRect = new RectComponent())
	            .attr('id', v4())
	            .layout('width', '100%')
	            .layout('height', '100%')
	            .attr('width', '100%')
	            .attr('height', '100%')
	            .attr('opacity', 0));
	        _this.selection().call(_this._zoomBehavior);
	        return _this;
	    }
	    ZoomComponent.prototype.zoomBehavior = function () {
	        return this._zoomBehavior;
	    };
	    ZoomComponent.prototype.scaleExtent = function (extent) {
	        if (extent === undefined)
	            return this._zoomBehavior.scaleExtent();
	        this._zoomBehavior.scaleExtent(extent);
	        return this;
	    };
	    ZoomComponent.prototype.translateExtentFactors = function (extent) {
	        if (extent === undefined)
	            return this._translateExtentFactors;
	        this._translateExtentFactors = extent;
	        return this;
	    };
	    ZoomComponent.prototype.areaRect = function () {
	        return this._areaRect;
	    };
	    // todo: add further missing methods
	    ZoomComponent.prototype.afterLayout = function () {
	        _super.prototype.afterLayout.call(this);
	        console.assert(this.attr('layout') !== null, 'layout attribute must be specified');
	        var layout = rectFromString(this.attr('layout'));
	        this._zoomBehavior
	            .extent([
	            [0, 0],
	            [layout.width, layout.height],
	        ])
	            .translateExtent([
	            [
	                this._translateExtentFactors[0][0] * layout.width,
	                this._translateExtentFactors[0][1] * layout.height,
	            ],
	            [
	                this._translateExtentFactors[1][0] * layout.width,
	                this._translateExtentFactors[1][1] * layout.height,
	            ],
	        ]);
	        return this;
	    };
	    ZoomComponent.prototype.on = function (typenames, callback) {
	        var _this = this;
	        if (callback === null)
	            this._zoomBehavior.on(typenames, null);
	        else
	            this._zoomBehavior.on(typenames, function (event) {
	                callback(event.sourceEvent, { component: _this, zoomEvent: event });
	            });
	        return this;
	    };
	    ZoomComponent.prototype.eventData = function (event) {
	        console.warn('cannot get event data of zoom components');
	        return null;
	    };
	    return ZoomComponent;
	}(SVGComponent));
	function zoom() {
	    return new ZoomComponent();
	}
	function rescaleX(transform, scale, fullDomain) {
	    var zoomedScale = transform.rescaleX(scale.domain(fullDomain));
	    scale.domain(zoomedScale.domain()).range(zoomedScale.range());
	}
	function rescaleY(transform, scale, fullDomain) {
	    var zoomedScale = transform.rescaleY(scale.domain(fullDomain));
	    scale.domain(zoomedScale.domain()).range(zoomedScale.range());
	}

	var CartesianChartComponent = /** @class */ (function (_super) {
	    __extends(CartesianChartComponent, _super);
	    function CartesianChartComponent() {
	        var _this = _super.call(this, 'g') || this;
	        _this.layout('grid-template', 'auto 1fr auto / auto 1fr auto')
	            .layout('margin-horizontal', 20)
	            .layout('margin-vertical', 20)
	            .child('draw-area', (_this._drawArea = new GroupComponent().layout('grid-area', '2 / 2 / 3 / 3')));
	        _this._xAxisPosition = exports.XAxisPosition.Bottom;
	        _this._yAxisPosition = exports.YAxisPosition.Left;
	        _this.bottomAxis(new BottomAxisComponent()).leftAxis(new LeftAxisComponent());
	        return _this;
	    }
	    CartesianChartComponent.prototype.xAxisPosition = function (position) {
	        if (position === undefined)
	            return this._xAxisPosition;
	        var title = this.xAxis().title().text(), scale = this.xAxis().ticks().scale();
	        if (this._xAxisPosition === exports.XAxisPosition.Bottom)
	            this.bottomAxis(null);
	        if (this._xAxisPosition === exports.XAxisPosition.Top)
	            this.topAxis(null);
	        if (position === exports.XAxisPosition.Bottom)
	            this.bottomAxis(new BottomAxisComponent());
	        if (position === exports.XAxisPosition.Top)
	            this.topAxis(new TopAxisComponent());
	        this._xAxisPosition = position;
	        this.xAxis()
	            .call(function (a) { return a.ticks().scale(scale); })
	            .call(function (a) { return a.title().text(title); });
	        return this;
	    };
	    CartesianChartComponent.prototype.yAxisPosition = function (position) {
	        if (position === undefined)
	            return this._yAxisPosition;
	        var title = this.yAxis().title().text(), scale = this.yAxis().ticks().scale();
	        if (this._yAxisPosition === exports.YAxisPosition.Left)
	            this.leftAxis(null);
	        if (this._yAxisPosition === exports.YAxisPosition.Right)
	            this.rightAxis(null);
	        if (position === exports.YAxisPosition.Left)
	            this.leftAxis(new LeftAxisComponent());
	        if (position === exports.YAxisPosition.Right)
	            this.rightAxis(new RightAxisComponent());
	        this._yAxisPosition = position;
	        this.yAxis()
	            .call(function (a) { return a.ticks().scale(scale); })
	            .call(function (a) { return a.title().text(title); });
	        return this;
	    };
	    CartesianChartComponent.prototype.leftAxis = function (axis) {
	        if (axis === undefined)
	            return this.child('left-axis');
	        else if (axis === null)
	            this.child('left-axis', null);
	        else
	            this.child('left-axis', axis.layout('grid-area', '2 / 1 / 3 / 2'));
	        return this;
	    };
	    CartesianChartComponent.prototype.bottomAxis = function (axis) {
	        if (axis === undefined)
	            return this.child('bottom-axis');
	        else if (axis === null)
	            this.child('bottom-axis', null);
	        else
	            this.child('bottom-axis', axis.layout('grid-area', '3 / 2 / 4 / 3'));
	        return this;
	    };
	    CartesianChartComponent.prototype.rightAxis = function (axis) {
	        if (axis === undefined)
	            return this.child('right-axis');
	        else if (axis === null)
	            this.child('right-axis', null);
	        else
	            this.child('right-axis', axis.layout('grid-area', '2 / 3 / 3 / 4'));
	        return this;
	    };
	    CartesianChartComponent.prototype.topAxis = function (axis) {
	        if (axis === undefined)
	            return this.child('top-axis');
	        else if (axis === null)
	            this.child('top-axis', null);
	        else
	            this.child('top-axis', axis.layout('grid-area', '1 / 2 / 2 / 3'));
	        return this;
	    };
	    CartesianChartComponent.prototype.xAxis = function () {
	        if (this._xAxisPosition === exports.XAxisPosition.Bottom)
	            return this.bottomAxis();
	        else
	            return this.topAxis();
	    };
	    CartesianChartComponent.prototype.yAxis = function () {
	        if (this._yAxisPosition === exports.YAxisPosition.Left)
	            return this.leftAxis();
	        else
	            return this.rightAxis();
	    };
	    CartesianChartComponent.prototype.drawArea = function () {
	        return this._drawArea;
	    };
	    return CartesianChartComponent;
	}(MediaQueryConfiguratorsMixin(ConfiguratorsMixin(ChildrenMixin(LayoutTransformMixin(BaseComponent))))));
	function cartesianChart() {
	    return new CartesianChartComponent();
	}

	var BarChartComponent = /** @class */ (function (_super) {
	    __extends(BarChartComponent, _super);
	    function BarChartComponent() {
	        var _this = _super.call(this) || this;
	        _this.drawArea().child('bars', (_this._bars = new BarsComponent()));
	        return _this;
	    }
	    BarChartComponent.prototype.bars = function () {
	        return this._bars;
	    };
	    BarChartComponent.prototype.mainAxis = function () {
	        if (this.orientation() === exports.BarOrientation.Vertical)
	            return this.xAxis();
	        else
	            return this.yAxis();
	    };
	    BarChartComponent.prototype.crossAxis = function () {
	        if (this.orientation() === exports.BarOrientation.Vertical)
	            return this.yAxis();
	        else
	            return this.xAxis();
	    };
	    BarChartComponent.prototype.mainValues = function (values) {
	        if (values === undefined)
	            return this._bars.mainValues();
	        this._bars.mainValues(values);
	        return this;
	    };
	    BarChartComponent.prototype.mainScale = function (scale) {
	        if (scale === undefined)
	            return this._bars.mainScale();
	        this._bars.mainScale(scale);
	        this.mainAxis().ticks().scale(scale);
	        return this;
	    };
	    BarChartComponent.prototype.mainTitle = function (title) {
	        if (title === undefined)
	            return this.mainAxis().title().text();
	        this.mainAxis().title().text(title);
	        return this;
	    };
	    BarChartComponent.prototype.crossValues = function (values) {
	        if (values === undefined)
	            return this._bars.crossValues();
	        this._bars.crossValues(values);
	        return this;
	    };
	    BarChartComponent.prototype.crossScale = function (scale) {
	        if (scale === undefined)
	            return this._bars.crossScale();
	        this._bars.crossScale(scale);
	        this.crossAxis().ticks().scale(scale);
	        return this;
	    };
	    BarChartComponent.prototype.crossTitle = function (title) {
	        if (title === undefined)
	            return this.crossAxis().title().text();
	        this.crossAxis().title().text(title);
	        return this;
	    };
	    BarChartComponent.prototype.orientation = function (orientation) {
	        var _this = this;
	        if (orientation === undefined)
	            return this._bars.orientation();
	        if (this._bars.orientation() !== orientation) {
	            var mainTitle_1 = this.mainAxis().title().text(), crossTitle_1 = this.crossAxis().title().text();
	            this._bars.orientation(orientation);
	            this.mainAxis()
	                .call(function (a) { return a.ticks().scale(_this.mainScale()); })
	                .call(function (a) { return a.title().text(mainTitle_1); });
	            this.crossAxis()
	                .call(function (a) { return a.ticks().scale(_this.crossScale()); })
	                .call(function (a) { return a.title().text(crossTitle_1); });
	        }
	        return this;
	    };
	    BarChartComponent.prototype.keys = function (keys) {
	        if (keys === undefined)
	            return this._bars.keys();
	        if (keys === null)
	            this._bars.keys(null);
	        else
	            this._bars.keys(keys);
	        return this;
	    };
	    BarChartComponent.prototype.barData = function () {
	        return this._bars.barData();
	    };
	    return BarChartComponent;
	}(CartesianChartComponent));
	function barChart() {
	    return new BarChartComponent();
	}

	var GroupedBarChartComponent = /** @class */ (function (_super) {
	    __extends(GroupedBarChartComponent, _super);
	    function GroupedBarChartComponent() {
	        var _this = _super.call(this) || this;
	        _this.drawArea().child('bars', (_this._bars = new GroupedBarsComponent()));
	        return _this;
	    }
	    GroupedBarChartComponent.prototype.bars = function () {
	        return this._bars;
	    };
	    GroupedBarChartComponent.prototype.mainAxis = function () {
	        if (this.orientation() === exports.BarOrientation.Vertical)
	            return this.xAxis();
	        else
	            return this.yAxis();
	    };
	    GroupedBarChartComponent.prototype.crossAxis = function () {
	        if (this.orientation() === exports.BarOrientation.Vertical)
	            return this.yAxis();
	        else
	            return this.xAxis();
	    };
	    GroupedBarChartComponent.prototype.mainValues = function (values) {
	        if (values === undefined)
	            return this._bars.mainValues();
	        this._bars.mainValues(values);
	        return this;
	    };
	    GroupedBarChartComponent.prototype.mainScale = function (scale) {
	        if (scale === undefined)
	            return this._bars.mainScale();
	        this._bars.mainScale(scale);
	        this.mainAxis().ticks().scale(scale);
	        return this;
	    };
	    GroupedBarChartComponent.prototype.mainTitle = function (title) {
	        if (title === undefined)
	            return this.mainAxis().title().text();
	        this.mainAxis().title().text(title);
	        return this;
	    };
	    GroupedBarChartComponent.prototype.crossValues = function (values) {
	        if (values === undefined)
	            return this._bars.crossValues();
	        this._bars.crossValues(values);
	        return this;
	    };
	    GroupedBarChartComponent.prototype.crossScale = function (scale) {
	        if (scale === undefined)
	            return this._bars.crossScale();
	        this._bars.crossScale(scale);
	        this.crossAxis().ticks().scale(scale);
	        return this;
	    };
	    GroupedBarChartComponent.prototype.crossTitle = function (title) {
	        if (title === undefined)
	            return this.crossAxis().title().text();
	        this.crossAxis().title().text(title);
	        return this;
	    };
	    GroupedBarChartComponent.prototype.mainInnerScale = function (scale) {
	        if (scale === undefined)
	            return this._bars.mainInnerScale();
	        this._bars.mainInnerScale(scale);
	        return this;
	    };
	    GroupedBarChartComponent.prototype.keys = function (keys) {
	        if (keys === undefined)
	            return this._bars.keys();
	        if (keys === null)
	            this._bars.keys(null);
	        else
	            this._bars.keys(keys);
	        return this;
	    };
	    GroupedBarChartComponent.prototype.orientation = function (orientation) {
	        var _this = this;
	        if (orientation === undefined)
	            return this._bars.orientation();
	        if (this._bars.orientation() !== orientation) {
	            var mainTitle_1 = this.mainAxis().title().text(), crossTitle_1 = this.crossAxis().title().text();
	            this._bars.orientation(orientation);
	            this.mainAxis()
	                .call(function (a) { return a.ticks().scale(_this.mainScale()); })
	                .call(function (a) { return a.title().text(mainTitle_1); });
	            this.crossAxis()
	                .call(function (a) { return a.ticks().scale(_this.crossScale()); })
	                .call(function (a) { return a.title().text(crossTitle_1); });
	        }
	        return this;
	    };
	    GroupedBarChartComponent.prototype.barData = function () {
	        return this._bars.barData();
	    };
	    return GroupedBarChartComponent;
	}(CartesianChartComponent));
	function groupedBarChart() {
	    return new GroupedBarChartComponent();
	}

	var StackedBarChartComponent = /** @class */ (function (_super) {
	    __extends(StackedBarChartComponent, _super);
	    function StackedBarChartComponent() {
	        var _this = _super.call(this) || this;
	        _this.drawArea().child('bars', (_this._bars = new StackedBarsComponent()));
	        return _this;
	    }
	    StackedBarChartComponent.prototype.bars = function () {
	        return this._bars;
	    };
	    StackedBarChartComponent.prototype.mainAxis = function () {
	        if (this.orientation() === exports.BarOrientation.Vertical)
	            return this.xAxis();
	        else
	            return this.yAxis();
	    };
	    StackedBarChartComponent.prototype.crossAxis = function () {
	        if (this.orientation() === exports.BarOrientation.Vertical)
	            return this.yAxis();
	        else
	            return this.xAxis();
	    };
	    StackedBarChartComponent.prototype.mainValues = function (values) {
	        if (values === undefined)
	            return this._bars.mainValues();
	        this._bars.mainValues(values);
	        return this;
	    };
	    StackedBarChartComponent.prototype.mainScale = function (scale) {
	        if (scale === undefined)
	            return this._bars.mainScale();
	        this._bars.mainScale(scale);
	        this.mainAxis().ticks().scale(scale);
	        return this;
	    };
	    StackedBarChartComponent.prototype.mainTitle = function (title) {
	        if (title === undefined)
	            return this.mainAxis().title().text();
	        this.mainAxis().title().text(title);
	        return this;
	    };
	    StackedBarChartComponent.prototype.crossValues = function (values) {
	        if (values === undefined)
	            return this._bars.crossValues();
	        this._bars.crossValues(values);
	        return this;
	    };
	    StackedBarChartComponent.prototype.crossScale = function (scale) {
	        if (scale === undefined)
	            return this._bars.crossScale();
	        this._bars.crossScale(scale);
	        this.crossAxis().ticks().scale(scale);
	        return this;
	    };
	    StackedBarChartComponent.prototype.crossTitle = function (title) {
	        if (title === undefined)
	            return this.crossAxis().title().text();
	        this.crossAxis().title().text(title);
	        return this;
	    };
	    StackedBarChartComponent.prototype.keys = function (keys) {
	        if (keys === undefined)
	            return this._bars.keys();
	        if (keys === null)
	            this._bars.keys(null);
	        else
	            this._bars.keys(keys);
	        return this;
	    };
	    StackedBarChartComponent.prototype.orientation = function (orientation) {
	        var _this = this;
	        if (orientation === undefined)
	            return this._bars.orientation();
	        if (this._bars.orientation() !== orientation) {
	            var mainTitle_1 = this.mainAxis().title().text(), crossTitle_1 = this.crossAxis().title().text();
	            this._bars.orientation(orientation);
	            this.mainAxis()
	                .call(function (a) { return a.ticks().scale(_this.mainScale()); })
	                .call(function (a) { return a.title().text(mainTitle_1); });
	            this.crossAxis()
	                .call(function (a) { return a.ticks().scale(_this.crossScale()); })
	                .call(function (a) { return a.title().text(crossTitle_1); });
	        }
	        return this;
	    };
	    StackedBarChartComponent.prototype.barData = function () {
	        return this._bars.barData();
	    };
	    return StackedBarChartComponent;
	}(CartesianChartComponent));
	function stackedBarChart() {
	    return new StackedBarChartComponent();
	}

	Object.defineProperty(exports, 'bandScale', {
		enumerable: true,
		get: function () {
			return d3Scale.scaleBand;
		}
	});
	Object.defineProperty(exports, 'linearScale', {
		enumerable: true,
		get: function () {
			return d3Scale.scaleLinear;
		}
	});
	Object.defineProperty(exports, 'logScale', {
		enumerable: true,
		get: function () {
			return d3Scale.scaleLog;
		}
	});
	Object.defineProperty(exports, 'ordinalScale', {
		enumerable: true,
		get: function () {
			return d3Scale.scaleOrdinal;
		}
	});
	Object.defineProperty(exports, 'pointScale', {
		enumerable: true,
		get: function () {
			return d3Scale.scalePoint;
		}
	});
	Object.defineProperty(exports, 'powScale', {
		enumerable: true,
		get: function () {
			return d3Scale.scalePow;
		}
	});
	Object.defineProperty(exports, 'quantileScale', {
		enumerable: true,
		get: function () {
			return d3Scale.scaleQuantile;
		}
	});
	Object.defineProperty(exports, 'quantizeScale', {
		enumerable: true,
		get: function () {
			return d3Scale.scaleQuantize;
		}
	});
	Object.defineProperty(exports, 'sqrtScale', {
		enumerable: true,
		get: function () {
			return d3Scale.scaleSqrt;
		}
	});
	Object.defineProperty(exports, 'thresholdScale', {
		enumerable: true,
		get: function () {
			return d3Scale.scaleThreshold;
		}
	});
	Object.defineProperty(exports, 'timeScale', {
		enumerable: true,
		get: function () {
			return d3Scale.scaleTime;
		}
	});
	exports.BarChartComponent = BarChartComponent;
	exports.BarLabelsComponent = BarLabelsComponent;
	exports.BarPointsCalculator = BarPointsCalculator;
	exports.BarsCalculator = BarsCalculator;
	exports.BarsComponent = BarsComponent;
	exports.BaseComponent = BaseComponent;
	exports.BlendComponent = BlendComponent;
	exports.BottomAxisComponent = BottomAxisComponent;
	exports.BottomTicksComponent = BottomTicksComponent;
	exports.BrushComponent = BrushComponent;
	exports.CartesianChartComponent = CartesianChartComponent;
	exports.Chart = Chart;
	exports.ChildrenMixin = ChildrenMixin;
	exports.ClipPathComponent = ClipPathComponent;
	exports.DefsComponent = DefsComponent;
	exports.DropShadowFilterComponent = DropShadowFilterComponent;
	exports.GaussianBlurComponent = GaussianBlurComponent;
	exports.GridComponent = GridComponent;
	exports.GridMixin = GridMixin;
	exports.GroupComponent = GroupComponent;
	exports.GroupedBarChartComponent = GroupedBarChartComponent;
	exports.GroupedBarsCalculator = GroupedBarsCalculator;
	exports.GroupedBarsComponent = GroupedBarsComponent;
	exports.LayoutTransformMixin = LayoutTransformMixin;
	exports.LeftAxisComponent = LeftAxisComponent;
	exports.LeftTicksComponent = LeftTicksComponent;
	exports.LegendComponent = LegendComponent;
	exports.OffsetComponent = OffsetComponent;
	exports.PointsCalculator = PointsCalculator;
	exports.PointsComponent = PointsComponent;
	exports.RectComponent = RectComponent;
	exports.RightAxisComponent = RightAxisComponent;
	exports.RightTicksComponent = RightTicksComponent;
	exports.SVGComponent = SVGComponent;
	exports.StackedBarChartComponent = StackedBarChartComponent;
	exports.StackedBarsCalculator = StackedBarsCalculator;
	exports.StackedBarsComponent = StackedBarsComponent;
	exports.StaticSizeMixin = StaticSizeMixin;
	exports.SwatchComponent = SwatchComponent;
	exports.TextComponent = TextComponent;
	exports.TicksComponent = TicksComponent;
	exports.TopAxisComponent = TopAxisComponent;
	exports.TopTicksComponent = TopTicksComponent;
	exports.UseComponent = UseComponent;
	exports.ZoomComponent = ZoomComponent;
	exports.barChart = barChart;
	exports.barLabels = barLabels;
	exports.bars = bars;
	exports.barsCalculator = barsCalculator;
	exports.blend = blend;
	exports.bottomAxis = bottomAxis;
	exports.bottomTicks = bottomTicks;
	exports.brighten = brighten;
	exports.brush = brush;
	exports.cartesianChart = cartesianChart;
	exports.categoricalColors = categoricalColors;
	exports.chart = chart;
	exports.clipPath = clipPath;
	exports.createBarGroups = createBarGroups;
	exports.createBarStacks = createBarStacks;
	exports.createBars = createBars;
	exports.createLabels = createLabels;
	exports.createPoints = createPoints;
	exports.darken = darken;
	exports.defs = defs;
	exports.desaturate = desaturate;
	exports.dropShadowFilter = dropShadowFilter;
	exports.gaussianBlur = gaussianBlur;
	exports.grid = grid;
	exports.group = group;
	exports.groupedBarChart = groupedBarChart;
	exports.groupedBars = groupedBars;
	exports.groupedBarsCalculator = groupedBarsCalculator;
	exports.leftAxis = leftAxis;
	exports.leftTicks = leftTicks;
	exports.legend = legend;
	exports.offset = offset;
	exports.points = points;
	exports.pointsCalculator = pointsCalculator;
	exports.rect = rect;
	exports.rectFromString = rectFromString;
	exports.rectToString = rectToString;
	exports.removeBars = removeBars;
	exports.removeLabels = removeLabels;
	exports.removePoints = removePoints;
	exports.rescaleX = rescaleX;
	exports.rescaleY = rescaleY;
	exports.rightAxis = rightAxis;
	exports.rightTicks = rightTicks;
	exports.stackedBarChart = stackedBarChart;
	exports.stackedBars = stackedBars;
	exports.stackedBarsCalculator = stackedBarsCalculator;
	exports.svg = svg;
	exports.swatch = swatch;
	exports.text = text;
	exports.titleTextAttributes = titleTextAttributes;
	exports.topTicks = topTicks;
	exports.updateBars = updateBars;
	exports.updateGroupedBars = updateGroupedBars;
	exports.updateLabels = updateLabels;
	exports.updatePoints = updatePoints;
	exports.updateStackedBars = updateStackedBars;
	exports.use = use;
	exports.utils = utils;
	exports.uuid = v4;
	exports.verticalTextAttributes = verticalTextAttributes;
	exports.zoom = zoom;

	Object.defineProperty(exports, '__esModule', { value: true });

	return exports;

}({}, d3, d3, d3, d3, d3, d3, d3));
//# sourceMappingURL=respvis_old.js.map
