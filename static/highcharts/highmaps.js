
/*
 Highmaps JS v5.0.0 (2016-09-29)

 (c) 2011-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(I, a) {
    "object" === typeof module && module.exports ? module.exports = I.document ? a(I) : a : I.Highcharts = a(I)
})("undefined" !== typeof window ? window : this, function(I) {
    I = function() {
        var a = window,
            y = a.document,
            D = a.navigator && a.navigator.userAgent || "",
            B = y && y.createElementNS && !! y.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            z = /(edge|msie|trident)/i.test(D) && !window.opera,
            l = !B,
            f = /Firefox/.test(D),
            g = f && 4 > parseInt(D.split("Firefox/")[1], 10);
        return a.Highcharts ? a.Highcharts.error(16, !0) : {
            product: "Highmaps",
            version: "5.0.0",
            deg2rad: 2 * Math.PI / 360,
            doc: y,
            hasBidiBug: g,
            isMS: z,
            isWebKit: /AppleWebKit/.test(D),
            isFirefox: f,
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(D),
            SVG_NS: "http://www.w3.org/2000/svg",
            idCounter: 0,
            chartCount: 0,
            seriesTypes: {},
            svg: B,
            vml: l,
            win: a,
            charts: [],
            marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            noop: function() {}
        }
    }();
    (function(a) {
        var y = [],
            D = a.charts,
            B = a.doc,
            z = a.win;
        a.error = function(a, f) {
            var g = "Highcharts error #" + a + ": www.highcharts.com/errors/" + a;
            if (f) throw Error(g);
            z.console && console.log(g)
        };
        a.Fx = function(a, f, g) {
            this.options = f;
            this.elem = a;
            this.prop = g
        };
        a.Fx.prototype = {
            dSetter: function() {
                var a = this.paths[0],
                    f = this.paths[1],
                    g = [],
                    r = this.now,
                    n = a.length,
                    t;
                if (1 === r) g = this.toD;
                else if (n === f.length && 1 > r) for (; n--;) t = parseFloat(a[n]), g[n] = isNaN(t) ? a[n] : r * parseFloat(f[n] - t) + t;
                else g = f;
                this.elem.attr("d", g)
            },
            update: function() {
                var a = this.elem,
                    f = this.prop,
                    g = this.now,
                    r = this.options.step;
                if (this[f + "Setter"]) this[f + "Setter"]();
                else a.attr ? a.element && a.attr(f, g) : a.style[f] = g + this.unit;
                r && r.call(a, g, this)
            },
            run: function(a, f, g) {
                var r = this,
                    n = function(a) {
                        return n.stopped ? !1 : r.step(a)
                    }, t;
                this.startTime = +new Date;
                this.start = a;
                this.end = f;
                this.unit = g;
                this.now = this.start;
                this.pos = 0;
                n.elem = this.elem;
                n() && 1 === y.push(n) && (n.timerId = setInterval(function() {
                    for (t = 0; t < y.length; t++) y[t]() || y.splice(t--, 1);
                    y.length || clearInterval(n.timerId)
                }, 13))
            },
            step: function(a) {
                var f = +new Date,
                    g, r = this.options;
                g = this.elem;
                var n = r.complete,
                    t = r.duration,
                    d = r.curAnim,
                    p;
                if (g.attr && !g.element) g = !1;
                else if (a || f >= t + this.startTime) {
                    this.now = this.end;
                    this.pos = 1;
                    this.update();
                    a = d[this.prop] = !0;
                    for (p in d)!0 !== d[p] && (a = !1);
                    a && n && n.call(g);
                    g = !1
                } else this.pos = r.easing((f - this.startTime) / t), this.now = this.start + (this.end - this.start) * this.pos, this.update(), g = !0;
                return g
            },
            initPath: function(l, f, g) {
                function r(a) {
                    for (c = a.length; c--;) "M" !== a[c] && "L" !== a[c] || a.splice(c + 1, 0, a[c + 1], a[c + 2], a[c + 1], a[c + 2])
                }
                function n(a, k) {
                    for (; a.length < e;) {
                        a[0] = k[e - a.length];
                        var b = a.slice(0, u);
                        [].splice.apply(a, [0, 0].concat(b));
                        q && (b = a.slice(a.length - u), [].splice.apply(a, [a.length, 0].concat(b)), c--)
                    }
                    a[0] = "M"
                }
                function t(a, k) {
                    for (var c = (e - a.length) / u; 0 < c && c--;) b = a.slice().splice(a.length / h - u, u * h), b[0] = k[e - u - c * u], m && (b[u - 6] = b[u - 2], b[u - 5] = b[u - 1]), [].splice.apply(a, [a.length / h, 0].concat(b)), q && c--
                }
                f = f || "";
                var d, p = l.startX,
                    v = l.endX,
                    m = -1 < f.indexOf("C"),
                    u = m ? 7 : 3,
                    e, b, c;
                f = f.split(" ");
                g = g.slice();
                var q = l.isArea,
                    h = q ? 2 : 1,
                    k;
                m && (r(f), r(g));
                if (p && v) {
                    for (c = 0; c < p.length; c++) if (p[c] === v[0]) {
                        d = c;
                        break
                    } else if (p[0] === v[v.length - p.length + c]) {
                        d = c;
                        k = !0;
                        break
                    }
                    void 0 === d && (f = [])
                }
                f.length && a.isNumber(d) && (e = g.length + d * h * u, k ? (n(f, g), t(g, f)) : (n(g, f), t(f, g)));
                return [f, g]
            }
        };
        a.extend = function(a, f) {
            var g;
            a || (a = {});
            for (g in f) a[g] = f[g];
            return a
        };
        a.merge = function() {
            var l, f = arguments,
                g, r = {}, n = function(l, d) {
                    var p, f;
                    "object" !== typeof l && (l = {});
                    for (f in d) d.hasOwnProperty(f) && (p = d[f], a.isObject(p, !0) && "renderTo" !== f && "number" !== typeof p.nodeType ? l[f] = n(l[f] || {}, p) : l[f] = d[f]);
                    return l
                };
            !0 === f[0] && (r = f[1], f = Array.prototype.slice.call(f, 2));
            g = f.length;
            for (l = 0; l < g; l++) r = n(r, f[l]);
            return r
        };
        a.pInt = function(a, f) {
            return parseInt(a, f || 10)
        };
        a.isString = function(a) {
            return "string" === typeof a
        };
        a.isArray = function(a) {
            a = Object.prototype.toString.call(a);
            return "[object Array]" === a || "[object Array Iterator]" === a
        };
        a.isObject = function(l, f) {
            return l && "object" === typeof l && (!f || !a.isArray(l))
        };
        a.isNumber = function(a) {
            return "number" === typeof a && !isNaN(a)
        };
        a.erase = function(a, f) {
            for (var g = a.length; g--;) if (a[g] === f) {
                a.splice(g, 1);
                break
            }
        };
        a.defined = function(a) {
            return void 0 !== a && null !== a
        };
        a.attr = function(l, f, g) {
            var r, n;
            if (a.isString(f)) a.defined(g) ? l.setAttribute(f, g) : l && l.getAttribute && (n = l.getAttribute(f));
            else if (a.defined(f) && a.isObject(f)) for (r in f) l.setAttribute(r, f[r]);
            return n
        };
        a.splat = function(l) {
            return a.isArray(l) ? l : [l]
        };
        a.syncTimeout = function(a, f, g) {
            if (f) return setTimeout(a, f, g);
            a.call(0, g)
        };
        a.pick = function() {
            var a = arguments,
                f, g, r = a.length;
            for (f = 0; f < r; f++) if (g = a[f], void 0 !== g && null !== g) return g
        };
        a.css = function(l, f) {
            a.isMS && !a.svg && f && void 0 !== f.opacity && (f.filter = "alpha(opacity=" + 100 * f.opacity + ")");
            a.extend(l.style, f)
        };
        a.createElement = function(l, f, g, r, n) {
            l = B.createElement(l);
            var t = a.css;
            f && a.extend(l, f);
            n && t(l, {
                padding: 0,
                border: "none",
                margin: 0
            });
            g && t(l, g);
            r && r.appendChild(l);
            return l
        };
        a.extendClass = function(l, f) {
            var g = function() {};
            g.prototype = new l;
            a.extend(g.prototype, f);
            return g
        };
        a.pad = function(a, f, g) {
            return Array((f || 2) + 1 - String(a).length).join(g || 0) + a
        };
        a.relativeLength = function(a, f) {
            return /%$/.test(a) ? f * parseFloat(a) / 100 : parseFloat(a)
        };
        a.wrap = function(a, f, g) {
            var r = a[f];
            a[f] = function() {
                var a = Array.prototype.slice.call(arguments);
                a.unshift(r);
                return g.apply(this, a)
            }
        };
        a.getTZOffset = function(l) {
            var f = a.Date;
            return 6E4 * (f.hcGetTimezoneOffset && f.hcGetTimezoneOffset(l) || f.hcTimezoneOffset || 0)
        };
        a.dateFormat = function(l, f, g) {
            if (!a.defined(f) || isNaN(f)) return a.defaultOptions.lang.invalidDate || "";
            l = a.pick(l, "%Y-%m-%d %H:%M:%S");
            var r = a.Date,
                n = new r(f - a.getTZOffset(f)),
                t, d = n[r.hcGetHours](),
                p = n[r.hcGetDay](),
                v = n[r.hcGetDate](),
                m = n[r.hcGetMonth](),
                u = n[r.hcGetFullYear](),
                e = a.defaultOptions.lang,
                b = e.weekdays,
                c = e.shortWeekdays,
                q = a.pad,
                r = a.extend({
                    a: c ? c[p] : b[p].substr(0, 3),
                    A: b[p],
                    d: q(v),
                    e: q(v, 2, " "),
                    w: p,
                    b: e.shortMonths[m],
                    B: e.months[m],
                    m: q(m + 1),
                    y: u.toString().substr(2, 2),
                    Y: u,
                    H: q(d),
                    k: d,
                    I: q(d % 12 || 12),
                    l: d % 12 || 12,
                    M: q(n[r.hcGetMinutes]()),
                    p: 12 > d ? "AM" : "PM",
                    P: 12 > d ? "am" : "pm",
                    S: q(n.getSeconds()),
                    L: q(Math.round(f % 1E3), 3)
                }, a.dateFormats);
            for (t in r) for (; - 1 !== l.indexOf("%" + t);) l = l.replace("%" + t, "function" === typeof r[t] ? r[t](f) : r[t]);
            return g ? l.substr(0, 1).toUpperCase() + l.substr(1) : l
        };
        a.formatSingle = function(l,
        f) {
            var g = /\.([0-9])/,
                r = a.defaultOptions.lang;
            /f$/.test(l) ? (g = (g = l.match(g)) ? g[1] : -1, null !== f && (f = a.numberFormat(f, g, r.decimalPoint, - 1 < l.indexOf(",") ? r.thousandsSep : ""))) : f = a.dateFormat(l, f);
            return f
        };
        a.format = function(l, f) {
            for (var g = "{", r = !1, n, t, d, p, v = [], m; l;) {
                g = l.indexOf(g);
                if (-1 === g) break;
                n = l.slice(0, g);
                if (r) {
                    n = n.split(":");
                    t = n.shift().split(".");
                    p = t.length;
                    m = f;
                    for (d = 0; d < p; d++) m = m[t[d]];
                    n.length && (m = a.formatSingle(n.join(":"), m));
                    v.push(m)
                } else v.push(n);
                l = l.slice(g + 1);
                g = (r = !r) ? "}" : "{"
            }
            v.push(l);
            return v.join("")
        };
        a.getMagnitude = function(a) {
            return Math.pow(10, Math.floor(Math.log(a) / Math.LN10))
        };
        a.normalizeTickInterval = function(l, f, g, r, n) {
            var t, d = l;
            g = a.pick(g, 1);
            t = l / g;
            f || (f = [1, 2, 2.5, 5, 10], !1 === r && (1 === g ? f = [1, 2, 5, 10] : .1 >= g && (f = [1 / g])));
            for (r = 0; r < f.length && !(d = f[r], n && d * g >= l || !n && t <= (f[r] + (f[r + 1] || f[r])) / 2); r++);
            return d * g
        };
        a.stableSort = function(a, f) {
            var g = a.length,
                r, n;
            for (n = 0; n < g; n++) a[n].safeI = n;
            a.sort(function(a, d) {
                r = f(a, d);
                return 0 === r ? a.safeI - d.safeI : r
            });
            for (n = 0; n < g; n++) delete a[n].safeI
        };
        a.arrayMin = function(a) {
            for (var f = a.length, g = a[0]; f--;) a[f] < g && (g = a[f]);
            return g
        };
        a.arrayMax = function(a) {
            for (var f = a.length, g = a[0]; f--;) a[f] > g && (g = a[f]);
            return g
        };
        a.destroyObjectProperties = function(a, f) {
            for (var g in a) a[g] && a[g] !== f && a[g].destroy && a[g].destroy(), delete a[g]
        };
        a.discardElement = function(l) {
            var f = a.garbageBin;
            f || (f = a.createElement("div"));
            l && f.appendChild(l);
            f.innerHTML = ""
        };
        a.correctFloat = function(a, f) {
            return parseFloat(a.toPrecision(f || 14))
        };
        a.setAnimation = function(l, f) {
            f.renderer.globalAnimation = a.pick(l, f.options.chart.animation, !0)
        };
        a.animObject = function(l) {
            return a.isObject(l) ? a.merge(l) : {
                duration: l ? 500 : 0
            }
        };
        a.timeUnits = {
            millisecond: 1,
            second: 1E3,
            minute: 6E4,
            hour: 36E5,
            day: 864E5,
            week: 6048E5,
            month: 24192E5,
            year: 314496E5
        };
        a.numberFormat = function(l, f, g, r) {
            l = +l || 0;
            f = +f;
            var n = a.defaultOptions.lang,
                t = (l.toString().split(".")[1] || "").length,
                d, p, v = Math.abs(l); - 1 === f ? f = Math.min(t, 20) : a.isNumber(f) || (f = 2);
            d = String(a.pInt(v.toFixed(f)));
            p = 3 < d.length ? d.length % 3 : 0;
            g = a.pick(g, n.decimalPoint);
            r = a.pick(r,
            n.thousandsSep);
            l = (0 > l ? "-" : "") + (p ? d.substr(0, p) + r : "");
            l += d.substr(p).replace(/(\d{3})(?=\d)/g, "$1" + r);
            f && (r = Math.abs(v - d + Math.pow(10, - Math.max(f, t) - 1)), l += g + r.toFixed(f).slice(2));
            return l
        };
        Math.easeInOutSine = function(a) {
            return -.5 * (Math.cos(Math.PI * a) - 1)
        };
        a.getStyle = function(l, f) {
            var g;
            return "width" === f ? Math.min(l.offsetWidth, l.scrollWidth) - a.getStyle(l, "padding-left") - a.getStyle(l, "padding-right") : "height" === f ? Math.min(l.offsetHeight, l.scrollHeight) - a.getStyle(l, "padding-top") - a.getStyle(l, "padding-bottom") : (g = z.getComputedStyle(l, void 0)) && a.pInt(g.getPropertyValue(f))
        };
        a.inArray = function(a, f) {
            return f.indexOf ? f.indexOf(a) : [].indexOf.call(f, a)
        };
        a.grep = function(a, f) {
            return [].filter.call(a, f)
        };
        a.map = function(a, f) {
            for (var g = [], r = 0, n = a.length; r < n; r++) g[r] = f.call(a[r], a[r], r, a);
            return g
        };
        a.offset = function(a) {
            var f = B.documentElement;
            a = a.getBoundingClientRect();
            return {
                top: a.top + (z.pageYOffset || f.scrollTop) - (f.clientTop || 0),
                left: a.left + (z.pageXOffset || f.scrollLeft) - (f.clientLeft || 0)
            }
        };
        a.stop = function(a) {
            for (var f = y.length; f--;) y[f].elem === a && (y[f].stopped = !0)
        };
        a.each = function(a, f, g) {
            return Array.prototype.forEach.call(a, f, g)
        };
        a.addEvent = function(a, f, g) {
            function r(f) {
                f.target = f.srcElement || z;
                g.call(a, f)
            }
            var n = a.hcEvents = a.hcEvents || {};
            a.addEventListener ? a.addEventListener(f, g, !1) : a.attachEvent && (a.hcEventsIE || (a.hcEventsIE = {}), a.hcEventsIE[g.toString()] = r, a.attachEvent("on" + f, r));
            n[f] || (n[f] = []);
            n[f].push(g)
        };
        a.removeEvent = function(l, f, g) {
            function r(a, m) {
                l.removeEventListener ? l.removeEventListener(a, m, !1) : l.attachEvent && (m = l.hcEventsIE[m.toString()], l.detachEvent("on" + a, m))
            }
            function n() {
                var a, m;
                if (l.nodeName) for (m in f ? (a = {}, a[f] = !0) : a = d, a) if (d[m]) for (a = d[m].length; a--;) r(m, d[m][a])
            }
            var t, d = l.hcEvents,
                p;
            d && (f ? (t = d[f] || [], g ? (p = a.inArray(g, t), - 1 < p && (t.splice(p, 1), d[f] = t), r(f, g)) : (n(), d[f] = [])) : (n(), l.hcEvents = {}))
        };
        a.fireEvent = function(l, f, g, r) {
            var n;
            n = l.hcEvents;
            var t, d;
            g = g || {};
            if (B.createEvent && (l.dispatchEvent || l.fireEvent)) n = B.createEvent("Events"), n.initEvent(f, !0, !0), a.extend(n, g), l.dispatchEvent ? l.dispatchEvent(n) : l.fireEvent(f, n);
            else if (n) for (n = n[f] || [], t = n.length, g.target || a.extend(g, {
                preventDefault: function() {
                    g.defaultPrevented = !0
                },
                target: l,
                type: f
            }), f = 0; f < t; f++)(d = n[f]) && !1 === d.call(l, g) && g.preventDefault();
            r && !g.defaultPrevented && r(g)
        };
        a.animate = function(l, f, g) {
            var r, n = "",
                t, d, p;
            a.isObject(g) || (r = arguments, g = {
                duration: r[2],
                easing: r[3],
                complete: r[4]
            });
            a.isNumber(g.duration) || (g.duration = 400);
            g.easing = "function" === typeof g.easing ? g.easing : Math[g.easing] || Math.easeInOutSine;
            g.curAnim = a.merge(f);
            for (p in f) d = new a.Fx(l, g, p), t = null, "d" === p ? (d.paths = d.initPath(l, l.d, f.d), d.toD = f.d, r = 0, t = 1) : l.attr ? r = l.attr(p) : (r = parseFloat(a.getStyle(l, p)) || 0, "opacity" !== p && (n = "px")), t || (t = f[p]), t.match && t.match("px") && (t = t.replace(/px/g, "")), d.run(r, t, n)
        };
        a.seriesType = function(l, f, g, r, n) {
            var t = a.getOptions(),
                d = a.seriesTypes;
            t.plotOptions[l] = a.merge(t.plotOptions[f], g);
            d[l] = a.extendClass(d[f] || function() {}, r);
            d[l].prototype.type = l;
            n && (d[l].prototype.pointClass = a.extendClass(a.Point, n));
            return d[l]
        };
        z.jQuery && (z.jQuery.fn.highcharts = function() {
            var l = [].slice.call(arguments);
            if (this[0]) return l[0] ? (new(a[a.isString(l[0]) ? l.shift() : "Chart"])(this[0], l[0], l[1]), this) : D[a.attr(this[0], "data-highcharts-chart")]
        });
        B && !B.defaultView && (a.getStyle = function(l, f) {
            var g;
            g = {
                width: "clientWidth",
                height: "clientHeight"
            }[f];
            if (l.style[f]) return a.pInt(l.style[f]);
            "opacity" === f && (f = "filter");
            if (g) return l.style.zoom = 1, Math.max(l[g] - 2 * a.getStyle(l, "padding"), 0);
            g = l.currentStyle[f.replace(/\-(\w)/g, function(a, f) {
                return f.toUpperCase()
            })];
            "filter" === f && (g = g.replace(/alpha\(opacity=([0-9]+)\)/, function(a, f) {
                return f / 100
            }));
            return "" === g ? 1 : a.pInt(g)
        });
        Array.prototype.forEach || (a.each = function(a, f, g) {
            for (var r = 0, n = a.length; r < n; r++) if (!1 === f.call(g, a[r], r, a)) return r
        });
        Array.prototype.indexOf || (a.inArray = function(a, f) {
            var g, r = 0;
            if (f) for (g = f.length; r < g; r++) if (f[r] === a) return r;
            return -1
        });
        Array.prototype.filter || (a.grep = function(a, f) {
            for (var g = [], r = 0, n = a.length; r < n; r++) f(a[r], r) && g.push(a[r]);
            return g
        })
    })(I);
    (function(a) {
        var y = a.each,
            D = a.isNumber,
            B = a.map,
            z = a.merge,
            l = a.pInt;
        a.Color = function(f) {
            if (!(this instanceof a.Color)) return new a.Color(f);
            this.init(f)
        };
        a.Color.prototype = {
            parsers: [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function(a) {
                    return [l(a[1]), l(a[2]), l(a[3]), parseFloat(a[4], 10)]
                }
            }, {
                regex: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
                parse: function(a) {
                    return [l(a[1], 16), l(a[2], 16), l(a[3], 16), 1]
                }
            }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                parse: function(a) {
                    return [l(a[1]), l(a[2]), l(a[3]), 1]
                }
            }],
            names: {
                white: "#ffffff",
                black: "#000000"
            },
            init: function(f) {
                var g, l, n, t;
                if ((this.input = f = this.names[f] || f) && f.stops) this.stops = B(f.stops, function(d) {
                    return new a.Color(d[1])
                });
                else for (n = this.parsers.length; n-- && !l;) t = this.parsers[n], (g = t.regex.exec(f)) && (l = t.parse(g));
                this.rgba = l || []
            },
            get: function(a) {
                var g = this.input,
                    l = this.rgba,
                    n;
                this.stops ? (n = z(g), n.stops = [].concat(n.stops), y(this.stops, function(g, d) {
                    n.stops[d] = [n.stops[d][0], g.get(a)]
                })) : n = l && D(l[0]) ? "rgb" === a || !a && 1 === l[3] ? "rgb(" + l[0] + "," + l[1] + "," + l[2] + ")" : "a" === a ? l[3] : "rgba(" + l.join(",") + ")" : g;
                return n
            },
            brighten: function(a) {
                var g, r = this.rgba;
                if (this.stops) y(this.stops, function(n) {
                    n.brighten(a)
                });
                else if (D(a) && 0 !== a) for (g = 0; 3 > g; g++) r[g] += l(255 * a), 0 > r[g] && (r[g] = 0), 255 < r[g] && (r[g] = 255);
                return this
            },
            setOpacity: function(a) {
                this.rgba[3] = a;
                return this
            }
        };
        a.color = function(f) {
            return new a.Color(f)
        }
    })(I);
    (function(a) {
        function y() {
            var l = a.defaultOptions.global,
                n, t = l.useUTC,
                d = t ? "getUTC" : "get",
                p = t ? "setUTC" : "set";
            a.Date = n = l.Date || g.Date;
            n.hcTimezoneOffset = t && l.timezoneOffset;
            n.hcGetTimezoneOffset = t && l.getTimezoneOffset;
            n.hcMakeTime = function(a, m, d, e, b, c) {
                var q;
                t ? (q = n.UTC.apply(0, arguments), q += z(q)) : q = (new n(a, m, f(d, 1), f(e, 0), f(b, 0), f(c, 0))).getTime();
                return q
            };
            B("Minutes Hours Day Date Month FullYear".split(" "), function(a) {
                n["hcGet" + a] = d + a
            });
            B("Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "), function(a) {
                n["hcSet" + a] = p + a
            })
        }
        var D = a.color,
            B = a.each,
            z = a.getTZOffset,
            l = a.merge,
            f = a.pick,
            g = a.win;
        a.defaultOptions = {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {
                useUTC: !0,
                VMLRadialGradientURL: "http://code.highcharts.com@product.cdnpath@/5.0.0/gfx/vml-radial-gradient.png"
            },
            chart: {
                borderRadius: 0,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {
                    theme: {
                        zIndex: 20
                    },
                    position: {
                        align: "right",
                        x: -10,
                        y: 10
                    }
                },
                width: null,
                height: null,
                borderColor: "#335cad",
                backgroundColor: "#ffffff",
                plotBorderColor: "#cccccc"
            },
            title: {
                text: "Chart title",
                align: "center",
                margin: 15,
                style: {
                    color: "#333333",
                    fontSize: "18px"
                },
                widthAdjust: -44
            },
            subtitle: {
                text: "",
                align: "center",
                style: {
                    color: "#666666"
                },
                widthAdjust: -44
            },
            plotOptions: {},
            labels: {
                style: {
                    position: "absolute",
                    color: "#333333"
                }
            },
            legend: {
                enabled: !0,
                align: "center",
                layout: "horizontal",
                labelFormatter: function() {
                    return this.name
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {
                    activeColor: "#003399",
                    inactiveColor: "#cccccc"
                },
                itemStyle: {
                    color: "#333333",
                    fontSize: "12px",
                    fontWeight: "bold"
                },
                itemHoverStyle: {
                    color: "#000000"
                },
                itemHiddenStyle: {
                    color: "#cccccc"
                },
                shadow: !1,
                itemCheckboxStyle: {
                    position: "absolute",
                    width: "13px",
                    height: "13px"
                },
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {
                    style: {
                        fontWeight: "bold"
                    }
                }
            },
            loading: {
                labelStyle: {
                    fontWeight: "bold",
                    position: "relative",
                    top: "45%"
                },
                style: {
                    position: "absolute",
                    backgroundColor: "#ffffff",
                    opacity: .5,
                    textAlign: "center"
                }
            },
            tooltip: {
                enabled: !0,
                animation: a.svg,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: a.isTouchDevice ? 25 : 10,
                backgroundColor: D("#f7f7f7").setOpacity(.85).get(),
                borderWidth: 1,
                headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
                pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
                shadow: !0,
                style: {
                    color: "#333333",
                    cursor: "default",
                    fontSize: "12px",
                    pointerEvents: "none",
                    whiteSpace: "nowrap"
                }
            },
            credits: {
                enabled: !0,
                href: "http://www.highcharts.com",
                position: {
                    align: "right",
                    x: -10,
                    verticalAlign: "bottom",
                    y: -5
                },
                style: {
                    cursor: "pointer",
                    color: "#999999",
                    fontSize: "9px"
                },
                text: "Highcharts.com"
            }
        };
        a.setOptions = function(f) {
            a.defaultOptions = l(!0, a.defaultOptions, f);
            y();
            return a.defaultOptions
        };
        a.getOptions = function() {
            return a.defaultOptions
        };
        a.defaultPlotOptions = a.defaultOptions.plotOptions;
        y()
    })(I);
    (function(a) {
        var y, D, B = a.addEvent,
            z = a.animate,
            l = a.attr,
            f = a.charts,
            g = a.color,
            r = a.css,
            n = a.createElement,
            t = a.defined,
            d = a.deg2rad,
            p = a.destroyObjectProperties,
            v = a.doc,
            m = a.each,
            u = a.extend,
            e = a.erase,
            b = a.grep,
            c = a.hasTouch,
            q = a.isArray,
            h = a.isFirefox,
            k = a.isMS,
            w = a.isObject,
            C = a.isString,
            H = a.isWebKit,
            E = a.merge,
            J = a.noop,
            G = a.pick,
            x = a.pInt,
            K = a.removeEvent,
            M = a.stop,
            A = a.svg,
            F = a.SVG_NS,
            L = a.win;
        y = a.SVGElement = function() {
            return this
        };
        y.prototype = {
            opacity: 1,
            SVG_NS: F,
            textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textDecoration textOverflow textShadow".split(" "),
            init: function(a, k) {
                this.element = "span" === k ? n(k) : v.createElementNS(this.SVG_NS, k);
                this.renderer = a
            },
            animate: function(a, k, c) {
                k = G(k, this.renderer.globalAnimation, !0);
                M(this);
                k ? (c && (k.complete = c), z(this, a, k)) : this.attr(a, null, c);
                return this
            },
            colorGradient: function(N, k, c) {
                var b = this.renderer,
                    e, A, F, h, w, C, d, p, f, n, G, x = [],
                    u;
                N.linearGradient ? A = "linearGradient" : N.radialGradient && (A = "radialGradient");
                if (A) {
                    F = N[A];
                    w = b.gradients;
                    d = N.stops;
                    n = c.radialReference;
                    q(F) && (N[A] = F = {
                        x1: F[0],
                        y1: F[1],
                        x2: F[2],
                        y2: F[3],
                        gradientUnits: "userSpaceOnUse"
                    });
                    "radialGradient" === A && n && !t(F.gradientUnits) && (h = F, F = E(F, b.getRadialAttr(n, h), {
                        gradientUnits: "userSpaceOnUse"
                    }));
                    for (G in F) "id" !== G && x.push(G, F[G]);
                    for (G in d) x.push(d[G]);
                    x = x.join(",");
                    w[x] ? n = w[x].attr("id") : (F.id = n = "highcharts-" + a.idCounter++, w[x] = C = b.createElement(A).attr(F).add(b.defs), C.radAttr = h, C.stops = [], m(d, function(N) {
                        0 === N[1].indexOf("rgba") ? (e = a.color(N[1]), p = e.get("rgb"), f = e.get("a")) : (p = N[1], f = 1);
                        N = b.createElement("stop").attr({
                            offset: N[0],
                            "stop-color": p,
                            "stop-opacity": f
                        }).add(C);
                        C.stops.push(N)
                    }));
                    u = "url(" + b.url + "#" + n + ")";
                    c.setAttribute(k, u);
                    c.gradient = x;
                    N.toString = function() {
                        return u
                    }
                }
            },
            applyTextShadow: function(a) {
                var c = this.element,
                    b, e = -1 !== a.indexOf("contrast"),
                    A = {}, F = this.renderer.forExport,
                    h = this.renderer.forExport || void 0 !== c.style.textShadow && !k;
                e && (A.textShadow = a = a.replace(/contrast/g, this.renderer.getContrast(c.style.fill)));
                if (H || F) A.textRendering = "geometricPrecision";
                h ? this.css(A) : (this.fakeTS = !0, this.ySetter = this.xSetter, b = [].slice.call(c.getElementsByTagName("tspan")), m(a.split(/\s?,\s?/g),

                function(a) {
                    var N = c.firstChild,
                        k, e;
                    a = a.split(" ");
                    k = a[a.length - 1];
                    (e = a[a.length - 2]) && m(b, function(a, b) {
                        var A;
                        0 === b && (a.setAttribute("x", c.getAttribute("x")), b = c.getAttribute("y"), a.setAttribute("y", b || 0), null === b && c.setAttribute("y", 0));
                        A = a.cloneNode(1);
                        l(A, {
                            "class": "highcharts-text-shadow",
                            fill: k,
                            stroke: k,
                            "stroke-opacity": 1 / Math.max(x(e), 3),
                            "stroke-width": e,
                            "stroke-linejoin": "round"
                        });
                        c.insertBefore(A, N)
                    })
                }))
            },
            attr: function(a, k, c) {
                var b, e = this.element,
                    A, F = this,
                    h;
                "string" === typeof a && void 0 !== k && (b = a, a = {}, a[b] = k);
                if ("string" === typeof a) F = (this[a + "Getter"] || this._defaultGetter).call(this, a, e);
                else {
                    for (b in a) k = a[b], h = !1, this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(b) && (A || (this.symbolAttr(a), A = !0), h = !0), !this.rotation || "x" !== b && "y" !== b || (this.doTransform = !0), h || (h = this[b + "Setter"] || this._defaultSetter, h.call(this, k, b, e), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(b) && this.updateShadows(b, k, h));
                    this.doTransform && (this.updateTransform(),
                    this.doTransform = !1)
                }
                c && c();
                return F
            },
            updateShadows: function(a, k, b) {
                for (var c = this.shadows, e = c.length; e--;) b.call(c[e], "height" === a ? Math.max(k - (c[e].cutHeight || 0), 0) : "d" === a ? this.d : k, a, c[e])
            },
            addClass: function(a, k) {
                var b = this.attr("class") || ""; - 1 === b.indexOf(a) && (k || (a = (b + (b ? " " : "") + a).replace("  ", " ")), this.attr("class", a));
                return this
            },
            hasClass: function(a) {
                return -1 !== l(this.element, "class").indexOf(a)
            },
            removeClass: function(a) {
                l(this.element, "class", (l(this.element, "class") || "").replace(a, ""));
                return this
            },
            symbolAttr: function(a) {
                var k = this;
                m("x y r start end width height innerR anchorX anchorY".split(" "), function(b) {
                    k[b] = G(a[b], k[b])
                });
                k.attr({
                    d: k.renderer.symbols[k.symbolName](k.x, k.y, k.width, k.height, k)
                })
            },
            clip: function(a) {
                return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
            },
            crisp: function(a, k) {
                var b, c = {}, e;
                k = k || a.strokeWidth || 0;
                e = Math.round(k) % 2 / 2;
                a.x = Math.floor(a.x || this.x || 0) + e;
                a.y = Math.floor(a.y || this.y || 0) + e;
                a.width = Math.floor((a.width || this.width || 0) - 2 * e);
                a.height = Math.floor((a.height || this.height || 0) - 2 * e);
                t(a.strokeWidth) && (a.strokeWidth = k);
                for (b in a) this[b] !== a[b] && (this[b] = c[b] = a[b]);
                return c
            },
            css: function(a) {
                var b = this.styles,
                    c = {}, e = this.element,
                    F, h, w = "";
                F = !b;
                a && a.color && (a.fill = a.color);
                if (b) for (h in a) a[h] !== b[h] && (c[h] = a[h], F = !0);
                if (F) {
                    F = this.textWidth = a && a.width && "text" === e.nodeName.toLowerCase() && x(a.width) || this.textWidth;
                    b && (a = u(b, c));
                    this.styles = a;
                    F && !A && this.renderer.forExport && delete a.width;
                    if (k && !A) r(this.element, a);
                    else {
                        b = function(a,
                        N) {
                            return "-" + N.toLowerCase()
                        };
                        for (h in a) w += h.replace(/([A-Z])/g, b) + ":" + a[h] + ";";
                        l(e, "style", w)
                    }
                    this.added && F && this.renderer.buildText(this)
                }
                return this
            },
            strokeWidth: function() {
                return this["stroke-width"] || 0
            },
            on: function(a, k) {
                var b = this,
                    e = b.element;
                c && "click" === a ? (e.ontouchstart = function(a) {
                    b.touchEventFired = Date.now();
                    a.preventDefault();
                    k.call(e, a)
                }, e.onclick = function(a) {
                    (-1 === L.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (b.touchEventFired || 0)) && k.call(e, a)
                }) : e["on" + a] = k;
                return this
            },
            setRadialReference: function(a) {
                var k = this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                k && k.radAttr && k.animate(this.renderer.getRadialAttr(a, k.radAttr));
                return this
            },
            translate: function(a, k) {
                return this.attr({
                    translateX: a,
                    translateY: k
                })
            },
            invert: function(a) {
                this.inverted = a;
                this.updateTransform();
                return this
            },
            updateTransform: function() {
                var a = this.translateX || 0,
                    k = this.translateY || 0,
                    b = this.scaleX,
                    c = this.scaleY,
                    e = this.inverted,
                    A = this.rotation,
                    F = this.element;
                e && (a += this.attr("width"),
                k += this.attr("height"));
                a = ["translate(" + a + "," + k + ")"];
                e ? a.push("rotate(90) scale(-1,1)") : A && a.push("rotate(" + A + " " + (F.getAttribute("x") || 0) + " " + (F.getAttribute("y") || 0) + ")");
                (t(b) || t(c)) && a.push("scale(" + G(b, 1) + " " + G(c, 1) + ")");
                a.length && F.setAttribute("transform", a.join(" "))
            },
            toFront: function() {
                var a = this.element;
                a.parentNode.appendChild(a);
                return this
            },
            align: function(a, k, b) {
                var c, A, F, h, w = {};
                A = this.renderer;
                F = A.alignedObjects;
                var q, m;
                if (a) {
                    if (this.alignOptions = a, this.alignByTranslate = k, !b || C(b)) this.alignTo = c = b || "renderer", e(F, this), F.push(this), b = null
                } else a = this.alignOptions, k = this.alignByTranslate, c = this.alignTo;
                b = G(b, A[c], A);
                c = a.align;
                A = a.verticalAlign;
                F = (b.x || 0) + (a.x || 0);
                h = (b.y || 0) + (a.y || 0);
                "right" === c ? q = 1 : "center" === c && (q = 2);
                q && (F += (b.width - (a.width || 0)) / q);
                w[k ? "translateX" : "x"] = Math.round(F);
                "bottom" === A ? m = 1 : "middle" === A && (m = 2);
                m && (h += (b.height - (a.height || 0)) / m);
                w[k ? "translateY" : "y"] = Math.round(h);
                this[this.placed ? "animate" : "attr"](w);
                this.placed = !0;
                this.alignAttr = w;
                return this
            },
            getBBox: function(a,
            b) {
                var c, e = this.renderer,
                    A, F, w, q = this.element,
                    C = this.styles,
                    p = this.textStr,
                    E, n = q.style,
                    x, f = e.cache,
                    H = e.cacheKeys,
                    g;
                F = G(b, this.rotation);
                w = F * d;
                A = C && C.fontSize;
                void 0 !== p && (g = p.toString().replace(/[0-9]/g, "0") + ["", F || 0, A, q.style.width].join());
                g && !a && (c = f[g]);
                if (!c) {
                    if (q.namespaceURI === this.SVG_NS || e.forExport) {
                        try {
                            x = this.fakeTS && function(a) {
                                m(q.querySelectorAll(".highcharts-text-shadow"), function(b) {
                                    b.style.display = a
                                })
                            }, h && n.textShadow ? (E = n.textShadow, n.textShadow = "") : x && x("none"), c = q.getBBox ? u({},
                            q.getBBox()) : {
                                width: q.offsetWidth,
                                height: q.offsetHeight
                            }, E ? n.textShadow = E : x && x("")
                        } catch (K) {}
                        if (!c || 0 > c.width) c = {
                            width: 0,
                            height: 0
                        }
                    } else c = this.htmlGetBBox();
                    e.isSVG && (e = c.width, A = c.height, k && C && "11px" === C.fontSize && "16.9" === A.toPrecision(3) && (c.height = A = 14), F && (c.width = Math.abs(A * Math.sin(w)) + Math.abs(e * Math.cos(w)), c.height = Math.abs(A * Math.cos(w)) + Math.abs(e * Math.sin(w))));
                    if (g && 0 < c.height) {
                        for (; 250 < H.length;) delete f[H.shift()];
                        f[g] || H.push(g);
                        f[g] = c
                    }
                }
                return c
            },
            show: function(a) {
                return this.attr({
                    visibility: a ? "inherit" : "visible"
                })
            },
            hide: function() {
                return this.attr({
                    visibility: "hidden"
                })
            },
            fadeOut: function(a) {
                var b = this;
                b.animate({
                    opacity: 0
                }, {
                    duration: a || 150,
                    complete: function() {
                        b.attr({
                            y: -9999
                        })
                    }
                })
            },
            add: function(a) {
                var b = this.renderer,
                    k = this.element,
                    c;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                void 0 !== this.textStr && b.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex) c = this.zIndexSetter();
                c || (a ? a.element : b.box).appendChild(k);
                if (this.onAdd) this.onAdd();
                return this
            },
            safeRemoveChild: function(a) {
                var b = a.parentNode;
                b && b.removeChild(a)
            },
            destroy: function() {
                var a = this.element || {}, b = this.renderer.isSVG && "SPAN" === a.nodeName && this.parentGroup,
                    k, c;
                a.onclick = a.onmouseout = a.onmouseover = a.onmousemove = a.point = null;
                M(this);
                this.clipPath && (this.clipPath = this.clipPath.destroy());
                if (this.stops) {
                    for (c = 0; c < this.stops.length; c++) this.stops[c] = this.stops[c].destroy();
                    this.stops = null
                }
                this.safeRemoveChild(a);
                for (this.destroyShadows(); b && b.div && 0 === b.div.childNodes.length;) a = b.parentGroup, this.safeRemoveChild(b.div),
                delete b.div, b = a;
                this.alignTo && e(this.renderer.alignedObjects, this);
                for (k in this) delete this[k];
                return null
            },
            shadow: function(a, b, k) {
                var c = [],
                    e, A, F = this.element,
                    h, w, q, C;
                if (!a) this.destroyShadows();
                else if (!this.shadows) {
                    w = G(a.width, 3);
                    q = (a.opacity || .15) / w;
                    C = this.parentInverted ? "(-1,-1)" : "(" + G(a.offsetX, 1) + ", " + G(a.offsetY, 1) + ")";
                    for (e = 1; e <= w; e++) A = F.cloneNode(0), h = 2 * w + 1 - 2 * e, l(A, {
                        isShadow: "true",
                        stroke: a.color || "#000000",
                        "stroke-opacity": q * e,
                        "stroke-width": h,
                        transform: "translate" + C,
                        fill: "none"
                    }), k && (l(A, "height", Math.max(l(A, "height") - h, 0)), A.cutHeight = h), b ? b.element.appendChild(A) : F.parentNode.insertBefore(A, F), c.push(A);
                    this.shadows = c
                }
                return this
            },
            destroyShadows: function() {
                m(this.shadows || [], function(a) {
                    this.safeRemoveChild(a)
                }, this);
                this.shadows = void 0
            },
            xGetter: function(a) {
                "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
                return this._defaultGetter(a)
            },
            _defaultGetter: function(a) {
                a = G(this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a
            },
            dSetter: function(a, b, k) {
                a && a.join && (a = a.join(" "));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                k.setAttribute(b, a);
                this[b] = a
            },
            dashstyleSetter: function(a) {
                var b, k = this["stroke-width"];
                "inherit" === k && (k = 1);
                if (a = a && a.toLowerCase()) {
                    a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (b = a.length; b--;) a[b] = x(a[b]) * k;
                    a = a.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", a)
                }
            },
            alignSetter: function(a) {
                this.element.setAttribute("text-anchor", {
                    left: "start",
                    center: "middle",
                    right: "end"
                }[a])
            },
            titleSetter: function(a) {
                var b = this.element.getElementsByTagName("title")[0];
                b || (b = v.createElementNS(this.SVG_NS, "title"), this.element.appendChild(b));
                b.firstChild && b.removeChild(b.firstChild);
                b.appendChild(v.createTextNode(String(G(a), "").replace(/<[^>]*>/g, "")))
            },
            textSetter: function(a) {
                a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
            },
            fillSetter: function(a, b, k) {
                "string" === typeof a ? k.setAttribute(b, a) : a && this.colorGradient(a, b, k)
            },
            visibilitySetter: function(a, b, k) {
                "inherit" === a ? k.removeAttribute(b) : k.setAttribute(b, a)
            },
            zIndexSetter: function(a, b) {
                var k = this.renderer,
                    c = this.parentGroup,
                    k = (c || k).element || k.box,
                    e, A, F = this.element,
                    h;
                e = this.added;
                var w;
                t(a) && (F.zIndex = a, a = +a, this[b] === a && (e = !1), this[b] = a);
                if (e) {
                    (a = this.zIndex) && c && (c.handleZ = !0);
                    c = k.childNodes;
                    for (w = 0; w < c.length && !h; w++) e = c[w], A = e.zIndex, e !== F && (x(A) > a || !t(a) && t(A)) && (k.insertBefore(F, e), h = !0);
                    h || k.appendChild(F)
                }
                return h
            },
            _defaultSetter: function(a, b, k) {
                k.setAttribute(b, a)
            }
        };
        y.prototype.yGetter = y.prototype.xGetter;
        y.prototype.translateXSetter = y.prototype.translateYSetter = y.prototype.rotationSetter = y.prototype.verticalAlignSetter = y.prototype.scaleXSetter = y.prototype.scaleYSetter = function(a, b) {
            this[b] = a;
            this.doTransform = !0
        };
        y.prototype.opacitySetter = y.prototype.displaySetter = function(a, b,
        k) {
            this[b] = a;
            k.setAttribute(b, a)
        };
        y.prototype["stroke-widthSetter"] = y.prototype.strokeSetter = function(a, b, k) {
            this[b] = a;
            this.stroke && this["stroke-width"] ? (y.prototype.fillSetter.call(this, this.stroke, "stroke", k), k.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === b && 0 === a && this.hasStroke && (k.removeAttribute("stroke"), this.hasStroke = !1)
        };
        D = a.SVGRenderer = function() {
            this.init.apply(this, arguments)
        };
        D.prototype = {
            Element: y,
            SVG_NS: F,
            init: function(a, b, k, c, e, A) {
                var F;
                c = this.createElement("svg").attr({
                    version: "1.1",
                    "class": "highcharts-root"
                }).css(this.getStyle(c));
                F = c.element;
                a.appendChild(F); - 1 === a.innerHTML.indexOf("xmlns") && l(F, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = F;
                this.boxWrapper = c;
                this.alignedObjects = [];
                this.url = (h || H) && v.getElementsByTagName("base").length ? L.location.href.replace(/#.*?$/, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                this.createElement("desc").add().element.appendChild(v.createTextNode("Created with Highmaps 5.0.0"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = A;
                this.forExport = e;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(b, k, !1);
                var w;
                h && a.getBoundingClientRect && (this.subPixelFix = b = function() {
                    r(a, {
                        left: 0,
                        top: 0
                    });
                    w = a.getBoundingClientRect();
                    r(a, {
                        left: Math.ceil(w.left) - w.left + "px",
                        top: Math.ceil(w.top) - w.top + "px"
                    })
                }, b(), B(L, "resize", b))
            },
            getStyle: function(a) {
                return this.style = u({
                    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                    fontSize: "12px"
                },
                a)
            },
            setStyle: function(a) {
                this.boxWrapper.css(this.getStyle(a))
            },
            isHidden: function() {
                return !this.boxWrapper.getBBox().width
            },
            destroy: function() {
                var a = this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                p(this.gradients || {});
                this.gradients = null;
                a && (this.defs = a.destroy());
                this.subPixelFix && K(L, "resize", this.subPixelFix);
                return this.alignedObjects = null
            },
            createElement: function(a) {
                var b = new this.Element;
                b.init(this, a);
                return b
            },
            draw: J,
            getRadialAttr: function(a, b) {
                return {
                    cx: a[0] - a[2] / 2 + b.cx * a[2],
                    cy: a[1] - a[2] / 2 + b.cy * a[2],
                    r: b.r * a[2]
                }
            },
            buildText: function(a) {
                for (var k = a.element, c = this, e = c.forExport, h = G(a.textStr, "").toString(), w = -1 !== h.indexOf("<"), q = k.childNodes, C, d, p, E, n = l(k, "x"), f = a.styles, u = a.textWidth, H = f && f.lineHeight, g = f && f.textShadow, K = f && "ellipsis" === f.textOverflow, t = q.length, L = u && !a.added && this.box, M = function(a) {
                    var b;
                    b = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : f && f.fontSize || c.style.fontSize || 12;
                    return H ? x(H) : c.fontMetrics(b, a).h
                }; t--;) k.removeChild(q[t]);
                w || g || K || u || -1 !== h.indexOf(" ") ? (C = /<.*class="([^"]+)".*>/, d = /<.*style="([^"]+)".*>/, p = /<.*href="(http[^"]+)".*>/, L && L.appendChild(k), h = w ? h.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">').replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(/<br.*?>/g) : [h], h = b(h, function(a) {
                    return "" !== a
                }), m(h, function(b, h) {
                    var w, q = 0;
                    b = b.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||");
                    w = b.split("|||");
                    m(w, function(b) {
                        if ("" !== b || 1 === w.length) {
                            var m = {}, x = v.createElementNS(c.SVG_NS, "tspan"),
                                G, H;
                            C.test(b) && (G = b.match(C)[1], l(x, "class", G));
                            d.test(b) && (H = b.match(d)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), l(x, "style", H));
                            p.test(b) && !e && (l(x, "onclick", 'location.href="' + b.match(p)[1] + '"'), r(x, {
                                cursor: "pointer"
                            }));
                            b = (b.replace(/<(.|\n)*?>/g, "") || " ").replace(/</g, "<").replace(/>/g, ">");
                            if (" " !== b) {
                                x.appendChild(v.createTextNode(b));
                                q ? m.dx = 0 : h && null !== n && (m.x = n);
                                l(x, m);
                                k.appendChild(x);
                                !q && h && (!A && e && r(x, {
                                    display: "block"
                                }), l(x, "dy", M(x)));
                                if (u) {
                                    m = b.replace(/([^\^])-/g, "$1- ").split(" ");
                                    G = "nowrap" === f.whiteSpace;
                                    for (var g = 1 < w.length || h || 1 < m.length && !G, t, L, P = [], T = M(x), J = a.rotation, O = b, z = O.length;
                                    (g || K) && (m.length || P.length);) a.rotation = 0, t = a.getBBox(!0), L = t.width, !A && c.forExport && (L = c.measureSpanWidth(x.firstChild.data, a.styles)), t = L > u, void 0 === E && (E = t), K && E ? (z /= 2, "" === O || !t && .5 > z ? m = [] : (O = b.substring(0, O.length + (t ? -1 : 1) * Math.ceil(z)), m = [O + (3 < u ? "\u2026" : "")], x.removeChild(x.firstChild))) : t && 1 !== m.length ? (x.removeChild(x.firstChild), P.unshift(m.pop())) : (m = P, P = [], m.length && !G && (x = v.createElementNS(F, "tspan"), l(x, {
                                        dy: T,
                                        x: n
                                    }), H && l(x, "style", H), k.appendChild(x)), L > u && (u = L)), m.length && x.appendChild(v.createTextNode(m.join(" ").replace(/- /g, "-")));
                                    a.rotation = J
                                }
                                q++
                            }
                        }
                    })
                }), E && a.attr("title", a.textStr), L && L.removeChild(k), g && a.applyTextShadow && a.applyTextShadow(g)) : k.appendChild(v.createTextNode(h.replace(/</g, "<").replace(/>/g, ">")))
            },
            getContrast: function(a) {
                a = g(a).rgba;
                return 510 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
            },
            button: function(a, b, c, e, A, F, h, w, q) {
                var m = this.label(a, b, c, q, null, null, null, null, "button"),
                    C = 0;
                m.attr(E({
                    padding: 8,
                    r: 2
                }, A));
                var d, x, p, f;
                A = E({
                    fill: "#f7f7f7",
                    stroke: "#cccccc",
                    "stroke-width": 1,
                    style: {
                        color: "#333333",
                        cursor: "pointer",
                        fontWeight: "normal"
                    }
                }, A);
                d = A.style;
                delete A.style;
                F = E(A, {
                    fill: "#e6e6e6"
                }, F);
                x = F.style;
                delete F.style;
                h = E(A, {
                    fill: "#e6ebf5",
                    style: {
                        color: "#000000",
                        fontWeight: "bold"
                    }
                }, h);
                p = h.style;
                delete h.style;
                w = E(A, {
                    style: {
                        color: "#cccccc"
                    }
                }, w);
                f = w.style;
                delete w.style;
                B(m.element, k ? "mouseover" : "mouseenter", function() {
                    3 !== C && m.setState(1)
                });
                B(m.element, k ? "mouseout" : "mouseleave", function() {
                    3 !== C && m.setState(C)
                });
                m.setState = function(a) {
                    1 !== a && (m.state = C = a);
                    m.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]);
                    m.attr([A, F, h, w][a || 0]).css([d, x, p, f][a || 0])
                };
                m.attr(A).css(u({
                    cursor: "default"
                }, d));
                return m.on("click", function(a) {
                    3 !== C && e.call(m, a)
                })
            },
            crispLine: function(a, b) {
                a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - b % 2 / 2);
                a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + b % 2 / 2);
                return a
            },
            path: function(a) {
                var b = {
                    fill: "none"
                };
                q(a) ? b.d = a : w(a) && u(b, a);
                return this.createElement("path").attr(b)
            },
            circle: function(a, b, k) {
                a = w(a) ? a : {
                    x: a,
                    y: b,
                    r: k
                };
                b = this.createElement("circle");
                b.xSetter = b.ySetter = function(a, b, k) {
                    k.setAttribute("c" + b, a)
                };
                return b.attr(a)
            },
            arc: function(a, b, k, c, e, A) {
                w(a) && (b = a.y, k = a.r, c = a.innerR, e = a.start, A = a.end, a = a.x);
                a = this.symbol("arc", a || 0, b || 0, k || 0, k || 0, {
                    innerR: c || 0,
                    start: e || 0,
                    end: A || 0
                });
                a.r = k;
                return a
            },
            rect: function(a, b, k, c, e, A) {
                e = w(a) ? a.r : e;
                var F = this.createElement("rect");
                a = w(a) ? a : void 0 === a ? {} : {
                    x: a,
                    y: b,
                    width: Math.max(k, 0),
                    height: Math.max(c, 0)
                };
                void 0 !== A && (a.strokeWidth = A, a = F.crisp(a));
                a.fill = "none";
                e && (a.r = e);
                F.rSetter = function(a, b, k) {
                    l(k, {
                        rx: a,
                        ry: a
                    })
                };
                return F.attr(a)
            },
            setSize: function(a, b, k) {
                var c = this.alignedObjects,
                    e = c.length;
                this.width = a;
                this.height = b;
                for (this.boxWrapper.animate({
                    width: a,
                    height: b
                }, {
                    step: function() {
                        this.attr({
                            viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
                        })
                    },
                    duration: G(k, !0) ? void 0 : 0
                }); e--;) c[e].align()
            },
            g: function(a) {
                var b = this.createElement("g");
                return a ? b.attr({
                    "class": "highcharts-" + a
                }) : b
            },
            image: function(a, b, k, c, e) {
                var A = {
                    preserveAspectRatio: "none"
                };
                1 < arguments.length && u(A, {
                    x: b,
                    y: k,
                    width: c,
                    height: e
                });
                A = this.createElement("image").attr(A);
                A.element.setAttributeNS ? A.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : A.element.setAttribute("hc-svg-href", a);
                return A
            },
            symbol: function(a, b, k, c, e, A) {
                var F = this,
                    h, w = this.symbols[a],
                    q = t(b) && w && w(Math.round(b), Math.round(k), c, e, A),
                    C = /^url\((.*?)\)$/,
                    d, x, p = {};
                w ? (h = this.path(q), h.attr("fill", "none"), u(h, {
                    symbolName: a,
                    x: b,
                    y: k,
                    width: c,
                    height: e
                }), A && u(h, A)) : C.test(a) && (d = a.match(C)[1], h = this.image(d), h.imgwidth = G(p[d] && p[d].width, A && A.width), h.imgheight = G(p[d] && p[d].height, A && A.height), x = function() {
                    h.attr({
                        width: h.width,
                        height: h.height
                    })
                }, m(["width", "height"], function(a) {
                    h[a + "Setter"] = function(a, b) {
                        var k = {}, c = this["img" + b];
                        this[b] = a;
                        t(c) && (this.element && this.element.setAttribute(b,
                        c), this.alignByTranslate || (k["width" === b ? "translateX" : "translateY"] = (this[b] - c) / 2, this.attr(k)))
                    }
                }), t(b) && h.attr({
                    x: b,
                    y: k
                }), h.isImg = !0, t(h.imgwidth) && t(h.imgheight) ? x() : (h.attr({
                    width: 0,
                    height: 0
                }), n("img", {
                    onload: function() {
                        var a = f[F.chartIndex];
                        0 === this.width && (r(this, {
                            position: "absolute",
                            top: "-999em"
                        }), v.body.appendChild(this));
                        p[d] = {
                            width: this.width,
                            height: this.height
                        };
                        h.imgwidth = this.width;
                        h.imgheight = this.height;
                        h.element && x();
                        this.parentNode && this.parentNode.removeChild(this);
                        F.imgCount--;
                        if (!F.imgCount && a && a.onload) a.onload()
                    },
                    src: d
                }), this.imgCount++));
                return h
            },
            symbols: {
                circle: function(a, b, k, c) {
                    var e = .166 * k;
                    return ["M", a + k / 2, b, "C", a + k + e, b, a + k + e, b + c, a + k / 2, b + c, "C", a - e, b + c, a - e, b, a + k / 2, b, "Z"]
                },
                square: function(a, b, k, c) {
                    return ["M", a, b, "L", a + k, b, a + k, b + c, a, b + c, "Z"]
                },
                triangle: function(a, b, k, c) {
                    return ["M", a + k / 2, b, "L", a + k, b + c, a, b + c, "Z"]
                },
                "triangle-down": function(a, b, k, c) {
                    return ["M", a, b, "L", a + k, b, a + k / 2, b + c, "Z"]
                },
                diamond: function(a, b, k, c) {
                    return ["M", a + k / 2, b, "L", a + k, b + c / 2, a + k / 2, b + c, a, b + c / 2, "Z"]
                },
                arc: function(a,
                b, k, c, e) {
                    var A = e.start;
                    k = e.r || k || c;
                    var h = e.end - .001;
                    c = e.innerR;
                    var F = e.open,
                        w = Math.cos(A),
                        m = Math.sin(A),
                        q = Math.cos(h),
                        h = Math.sin(h);
                    e = e.end - A < Math.PI ? 0 : 1;
                    return ["M", a + k * w, b + k * m, "A", k, k, 0, e, 1, a + k * q, b + k * h, F ? "M" : "L", a + c * q, b + c * h, "A", c, c, 0, e, 0, a + c * w, b + c * m, F ? "" : "Z"]
                },
                callout: function(a, b, k, c, e) {
                    var A = Math.min(e && e.r || 0, k, c),
                        h = A + 6,
                        F = e && e.anchorX;
                    e = e && e.anchorY;
                    var w;
                    w = ["M", a + A, b, "L", a + k - A, b, "C", a + k, b, a + k, b, a + k, b + A, "L", a + k, b + c - A, "C", a + k, b + c, a + k, b + c, a + k - A, b + c, "L", a + A, b + c, "C", a, b + c, a, b + c, a, b + c - A, "L", a, b + A, "C", a, b, a, b, a + A, b];
                    F && F > k && e > b + h && e < b + c - h ? w.splice(13, 3, "L", a + k, e - 6, a + k + 6, e, a + k, e + 6, a + k, b + c - A) : F && 0 > F && e > b + h && e < b + c - h ? w.splice(33, 3, "L", a, e + 6, a - 6, e, a, e - 6, a, b + A) : e && e > c && F > a + h && F < a + k - h ? w.splice(23, 3, "L", F + 6, b + c, F, b + c + 6, F - 6, b + c, a + A, b + c) : e && 0 > e && F > a + h && F < a + k - h && w.splice(3, 3, "L", F - 6, b, F, b - 6, F + 6, b, k - A, b);
                    return w
                }
            },
            clipRect: function(b, k, c, e) {
                var A = "highcharts-" + a.idCounter++,
                    h = this.createElement("clipPath").attr({
                        id: A
                    }).add(this.defs);
                b = this.rect(b, k, c, e, 0).add(h);
                b.id = A;
                b.clipPath = h;
                b.count = 0;
                return b
            },
            text: function(a, b, k, c) {
                var e = !A && this.forExport,
                    h = {};
                if (c && (this.allowHTML || !this.forExport)) return this.html(a, b, k);
                h.x = Math.round(b || 0);
                k && (h.y = Math.round(k));
                if (a || 0 === a) h.text = a;
                a = this.createElement("text").attr(h);
                e && a.css({
                    position: "absolute"
                });
                c || (a.xSetter = function(a, b, k) {
                    var c = k.getElementsByTagName("tspan"),
                        e, A = k.getAttribute(b),
                        h;
                    for (h = 0; h < c.length; h++) e = c[h], e.getAttribute(b) === A && e.setAttribute(b, a);
                    k.setAttribute(b, a)
                });
                return a
            },
            fontMetrics: function(a, b) {
                var k;
                a = a || this.style && this.style.fontSize;
                a = /px/.test(a) ? x(a) : /em/.test(a) ? 12 * parseFloat(a) : 12;
                k = 24 > a ? a + 3 : Math.round(1.2 * a);
                return {
                    h: k,
                    b: Math.round(.8 * k),
                    f: a
                }
            },
            rotCorr: function(a, b, k) {
                var c = a;
                b && k && (c = Math.max(c * Math.cos(b * d), 4));
                return {
                    x: -a / 3 * Math.sin(b * d),
                    y: c
                }
            },
            label: function(a, b, k, c, e, A, h, F, w) {
                var q = this,
                    C = q.g("button" !== w && "label"),
                    d = C.text = q.text("", 0, 0, h).attr({
                        zIndex: 1
                    }),
                    x, p, f = 0,
                    n = 3,
                    G = 0,
                    H, g, L, v, l, M = {}, r, J, z = /^url\((.*?)\)$/.test(c),
                    B = z,
                    D, I, X, V;
                w && C.addClass("highcharts-" + w);
                B = z;
                D = function() {
                    return (r || 0) % 2 / 2
                };
                I = function() {
                    var a = d.element.style,
                        b = {};
                    p = (void 0 === H || void 0 === g || l) && t(d.textStr) && d.getBBox();
                    C.width = (H || p.width || 0) + 2 * n + G;
                    C.height = (g || p.height || 0) + 2 * n;
                    J = n + q.fontMetrics(a && a.fontSize, d).b;
                    B && (x || (C.box = x = q.symbols[c] || z ? q.symbol(c) : q.rect(), x.addClass(("button" === w ? "" : "highcharts-label-box") + (w ? " highcharts-" + w + "-box" : "")), x.add(C), a = D(), b.x = a, b.y = (F ? -J : 0) + a), b.width = Math.round(C.width), b.height = Math.round(C.height), x.attr(u(b, M)), M = {})
                };
                X = function() {
                    var a = G + n,
                        b;
                    b = F ? 0 : J;
                    t(H) && p && ("center" === l || "right" === l) && (a += {
                        center: .5,
                        right: 1
                    }[l] * (H - p.width));
                    if (a !== d.x || b !== d.y) d.attr("x", a), void 0 !== b && d.attr("y", b);
                    d.x = a;
                    d.y = b
                };
                V = function(a, b) {
                    x ? x.attr(a, b) : M[a] = b
                };
                C.onAdd = function() {
                    d.add(C);
                    C.attr({
                        text: a || 0 === a ? a : "",
                        x: b,
                        y: k
                    });
                    x && t(e) && C.attr({
                        anchorX: e,
                        anchorY: A
                    })
                };
                C.widthSetter = function(a) {
                    H = a
                };
                C.heightSetter = function(a) {
                    g = a
                };
                C["text-alignSetter"] = function(a) {
                    l = a
                };
                C.paddingSetter = function(a) {
                    t(a) && a !== n && (n = C.padding = a, X())
                };
                C.paddingLeftSetter = function(a) {
                    t(a) && a !== G && (G = a, X())
                };
                C.alignSetter = function(a) {
                    a = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[a];
                    a !== f && (f = a, p && C.attr({
                        x: L
                    }))
                };
                C.textSetter = function(a) {
                    void 0 !== a && d.textSetter(a);
                    I();
                    X()
                };
                C["stroke-widthSetter"] = function(a, b) {
                    a && (B = !0);
                    r = this["stroke-width"] = a;
                    V(b, a)
                };
                C.strokeSetter = C.fillSetter = C.rSetter = function(a, b) {
                    "fill" === b && a && (B = !0);
                    V(b, a)
                };
                C.anchorXSetter = function(a, b) {
                    e = a;
                    V(b, Math.round(a) - D() - L)
                };
                C.anchorYSetter = function(a, b) {
                    A = a;
                    V(b, a - v)
                };
                C.xSetter = function(a) {
                    C.x = a;
                    f && (a -= f * ((H || p.width) + 2 * n));
                    L = Math.round(a);
                    C.attr("translateX", L)
                };
                C.ySetter = function(a) {
                    v = C.y = Math.round(a);
                    C.attr("translateY",
                    v)
                };
                var ba = C.css;
                return u(C, {
                    css: function(a) {
                        if (a) {
                            var b = {};
                            a = E(a);
                            m(C.textProps, function(k) {
                                void 0 !== a[k] && (b[k] = a[k], delete a[k])
                            });
                            d.css(b)
                        }
                        return ba.call(C, a)
                    },
                    getBBox: function() {
                        return {
                            width: p.width + 2 * n,
                            height: p.height + 2 * n,
                            x: p.x - n,
                            y: p.y - n
                        }
                    },
                    shadow: function(a) {
                        a && (I(), x && x.shadow(a));
                        return C
                    },
                    destroy: function() {
                        K(C.element, "mouseenter");
                        K(C.element, "mouseleave");
                        d && (d = d.destroy());
                        x && (x = x.destroy());
                        y.prototype.destroy.call(C);
                        C = q = I = X = V = null
                    }
                })
            }
        };
        a.Renderer = D
    })(I);
    (function(a) {
        var y = a.attr,
            D = a.createElement,
            B = a.css,
            z = a.defined,
            l = a.each,
            f = a.extend,
            g = a.isFirefox,
            r = a.isMS,
            n = a.isWebKit,
            t = a.pInt,
            d = a.SVGRenderer,
            p = a.win,
            v = a.wrap;
        f(a.SVGElement.prototype, {
            htmlCss: function(a) {
                var d = this.element;
                if (d = a && "SPAN" === d.tagName && a.width) delete a.width, this.textWidth = d, this.updateTransform();
                a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");
                this.styles = f(this.styles, a);
                B(this.element, a);
                return this
            },
            htmlGetBBox: function() {
                var a = this.element;
                "text" === a.nodeName && (a.style.position = "absolute");
                return {
                    x: a.offsetLeft,
                    y: a.offsetTop,
                    width: a.offsetWidth,
                    height: a.offsetHeight
                }
            },
            htmlUpdateTransform: function() {
                if (this.added) {
                    var a = this.renderer,
                        d = this.element,
                        e = this.translateX || 0,
                        b = this.translateY || 0,
                        c = this.x || 0,
                        q = this.y || 0,
                        h = this.textAlign || "left",
                        k = {
                            left: 0,
                            center: .5,
                            right: 1
                        }[h],
                        w = this.styles;
                    B(d, {
                        marginLeft: e,
                        marginTop: b
                    });
                    this.shadows && l(this.shadows, function(a) {
                        B(a, {
                            marginLeft: e + 1,
                            marginTop: b + 1
                        })
                    });
                    this.inverted && l(d.childNodes, function(b) {
                        a.invertChild(b, d)
                    });
                    if ("SPAN" === d.tagName) {
                        var C = this.rotation,
                            p = t(this.textWidth),
                            E = w && w.whiteSpace,
                            f = [C, h, d.innerHTML, this.textWidth, this.textAlign].join();
                        f !== this.cTT && (w = a.fontMetrics(d.style.fontSize).b, z(C) && this.setSpanRotation(C, k, w), B(d, {
                            width: "",
                            whiteSpace: E || "nowrap"
                        }), d.offsetWidth > p && /[ \-]/.test(d.textContent || d.innerText) && B(d, {
                            width: p + "px",
                            display: "block",
                            whiteSpace: E || "normal"
                        }), this.getSpanCorrection(d.offsetWidth, w, k, C, h));
                        B(d, {
                            left: c + (this.xCorr || 0) + "px",
                            top: q + (this.yCorr || 0) + "px"
                        });
                        n && (w = d.offsetHeight);
                        this.cTT = f
                    }
                } else this.alignOnAdd = !0
            },
            setSpanRotation: function(a, d, e) {
                var b = {}, c = r ? "-ms-transform" : n ? "-webkit-transform" : g ? "MozTransform" : p.opera ? "-o-transform" : "";
                b[c] = b.transform = "rotate(" + a + "deg)";
                b[c + (g ? "Origin" : "-origin")] = b.transformOrigin = 100 * d + "% " + e + "px";
                B(this.element, b)
            },
            getSpanCorrection: function(a, d, e) {
                this.xCorr = -a * e;
                this.yCorr = -d
            }
        });
        f(d.prototype, {
            html: function(a, d, e) {
                var b = this.createElement("span"),
                    c = b.element,
                    q = b.renderer,
                    h = q.isSVG,
                    k = function(a, b) {
                        l(["display", "opacity", "visibility"], function(k) {
                            v(a, k + "Setter", function(a,
                            k, c, e) {
                                a.call(this, k, c, e);
                                b[c] = k
                            })
                        })
                    };
                b.textSetter = function(a) {
                    a !== c.innerHTML && delete this.bBox;
                    c.innerHTML = this.textStr = a;
                    b.htmlUpdateTransform()
                };
                h && k(b, b.element.style);
                b.xSetter = b.ySetter = b.alignSetter = b.rotationSetter = function(a, k) {
                    "align" === k && (k = "textAlign");
                    b[k] = a;
                    b.htmlUpdateTransform()
                };
                b.attr({
                    text: a,
                    x: Math.round(d),
                    y: Math.round(e)
                }).css({
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize,
                    position: "absolute"
                });
                c.style.whiteSpace = "nowrap";
                b.css = b.htmlCss;
                h && (b.add = function(a) {
                    var e,
                    h = q.box.parentNode,
                        d = [];
                    if (this.parentGroup = a) {
                        if (e = a.div, !e) {
                            for (; a;) d.push(a), a = a.parentGroup;
                            l(d.reverse(), function(a) {
                                var b, c = y(a.element, "class");
                                c && (c = {
                                    className: c
                                });
                                e = a.div = a.div || D("div", c, {
                                    position: "absolute",
                                    left: (a.translateX || 0) + "px",
                                    top: (a.translateY || 0) + "px",
                                    display: a.display,
                                    opacity: a.opacity,
                                    pointerEvents: a.styles && a.styles.pointerEvents
                                }, e || h);
                                b = e.style;
                                f(a, {
                                    translateXSetter: function(k, c) {
                                        b.left = k + "px";
                                        a[c] = k;
                                        a.doTransform = !0
                                    },
                                    translateYSetter: function(k, c) {
                                        b.top = k + "px";
                                        a[c] = k;
                                        a.doTransform = !0
                                    }
                                });
                                k(a, b)
                            })
                        }
                    } else e = h;
                    e.appendChild(c);
                    b.added = !0;
                    b.alignOnAdd && b.htmlUpdateTransform();
                    return b
                });
                return b
            }
        })
    })(I);
    (function(a) {
        var y, D, B = a.createElement,
            z = a.css,
            l = a.defined,
            f = a.deg2rad,
            g = a.discardElement,
            r = a.doc,
            n = a.each,
            t = a.erase,
            d = a.extend;
        y = a.extendClass;
        var p = a.isArray,
            v = a.isNumber,
            m = a.isObject,
            u = a.merge;
        D = a.noop;
        var e = a.pick,
            b = a.pInt,
            c = a.SVGElement,
            q = a.SVGRenderer,
            h = a.win;
        a.svg || (D = {
            docMode8: r && 8 === r.documentMode,
            init: function(a, b) {
                var c = ["<", b, ' filled="f" stroked="f"'],
                    e = ["position: ", "absolute", ";"],
                    h = "div" === b;
                ("shape" === b || h) && e.push("left:0;top:0;width:1px;height:1px;");
                e.push("visibility: ", h ? "hidden" : "visible");
                c.push(' style="', e.join(""), '"/>');
                b && (c = h || "span" === b || "img" === b ? c.join("") : a.prepVML(c), this.element = B(c));
                this.renderer = a
            },
            add: function(a) {
                var b = this.renderer,
                    c = this.element,
                    e = b.box,
                    h = a && a.inverted,
                    e = a ? a.element || a : e;
                a && (this.parentGroup = a);
                h && b.invertChild(c, e);
                e.appendChild(c);
                this.added = !0;
                this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform();
                if (this.onAdd) this.onAdd();
                this.className && this.attr("class", this.className);
                return this
            },
            updateTransform: c.prototype.htmlUpdateTransform,
            setSpanRotation: function() {
                var a = this.rotation,
                    b = Math.cos(a * f),
                    c = Math.sin(a * f);
                z(this.element, {
                    filter: a ? ["progid:DXImageTransform.Microsoft.Matrix(M11=", b, ", M12=", - c, ", M21=", c, ", M22=", b, ", sizingMethod='auto expand')"].join("") : "none"
                })
            },
            getSpanCorrection: function(a, b, c, h, d) {
                var q = h ? Math.cos(h * f) : 1,
                    m = h ? Math.sin(h * f) : 0,
                    p = e(this.elemHeight, this.element.offsetHeight),
                    n;
                this.xCorr = 0 > q && -a;
                this.yCorr = 0 > m && -p;
                n = 0 > q * m;
                this.xCorr += m * b * (n ? 1 - c : c);
                this.yCorr -= q * b * (h ? n ? c : 1 - c : 1);
                d && "left" !== d && (this.xCorr -= a * c * (0 > q ? -1 : 1), h && (this.yCorr -= p * c * (0 > m ? -1 : 1)), z(this.element, {
                    textAlign: d
                }))
            },
            pathToVML: function(a) {
                for (var b = a.length, c = []; b--;) v(a[b]) ? c[b] = Math.round(10 * a[b]) - 5 : "Z" === a[b] ? c[b] = "x" : (c[b] = a[b], !a.isArc || "wa" !== a[b] && "at" !== a[b] || (c[b + 5] === c[b + 7] && (c[b + 7] += a[b + 7] > a[b + 5] ? 1 : -1), c[b + 6] === c[b + 8] && (c[b + 8] += a[b + 8] > a[b + 6] ? 1 : -1)));
                return c.join(" ") || "x"
            },
            clip: function(a) {
                var b = this,
                    c;
                a ? (c = a.members, t(c, b), c.push(b), b.destroyClip = function() {
                    t(c, b)
                }, a = a.getCSS(b)) : (b.destroyClip && b.destroyClip(), a = {
                    clip: b.docMode8 ? "inherit" : "rect(auto)"
                });
                return b.css(a)
            },
            css: c.prototype.htmlCss,
            safeRemoveChild: function(a) {
                a.parentNode && g(a)
            },
            destroy: function() {
                this.destroyClip && this.destroyClip();
                return c.prototype.destroy.apply(this)
            },
            on: function(a, b) {
                this.element["on" + a] = function() {
                    var a = h.event;
                    a.target = a.srcElement;
                    b(a)
                };
                return this
            },
            cutOffPath: function(a, c) {
                var e;
                a = a.split(/[ ,]/);
                e = a.length;
                if (9 === e || 11 === e) a[e - 4] = a[e - 2] = b(a[e - 2]) - 10 * c;
                return a.join(" ")
            },
            shadow: function(a, c, h) {
                var d = [],
                    q, m = this.element,
                    p = this.renderer,
                    x, n = m.style,
                    f, A = m.path,
                    F, g, u, t;
                A && "string" !== typeof A.value && (A = "x");
                g = A;
                if (a) {
                    u = e(a.width, 3);
                    t = (a.opacity || .15) / u;
                    for (q = 1; 3 >= q; q++) F = 2 * u + 1 - 2 * q, h && (g = this.cutOffPath(A.value, F + .5)), f = ['<shape isShadow="true" strokeweight="', F, '" filled="false" path="', g, '" coordsize="10 10" style="', m.style.cssText, '" />'], x = B(p.prepVML(f), null, {
                        left: b(n.left) + e(a.offsetX, 1),
                        top: b(n.top) + e(a.offsetY, 1)
                    }), h && (x.cutOff = F + 1), f = ['<stroke color="', a.color || "#000000", '" opacity="', t * q, '"/>'], B(p.prepVML(f), null, null, x), c ? c.element.appendChild(x) : m.parentNode.insertBefore(x, m), d.push(x);
                    this.shadows = d
                }
                return this
            },
            updateShadows: D,
            setAttr: function(a, b) {
                this.docMode8 ? this.element[a] = b : this.element.setAttribute(a, b)
            },
            classSetter: function(a) {
                (this.added ? this.element : this).className = a
            },
            dashstyleSetter: function(a, b, c) {
                (c.getElementsByTagName("stroke")[0] || B(this.renderer.prepVML(["<stroke/>"]),
                null, null, c))[b] = a || "solid";
                this[b] = a
            },
            dSetter: function(a, b, c) {
                var e = this.shadows;
                a = a || [];
                this.d = a.join && a.join(" ");
                c.path = a = this.pathToVML(a);
                if (e) for (c = e.length; c--;) e[c].path = e[c].cutOff ? this.cutOffPath(a, e[c].cutOff) : a;
                this.setAttr(b, a)
            },
            fillSetter: function(a, b, c) {
                var e = c.nodeName;
                "SPAN" === e ? c.style.color = a : "IMG" !== e && (c.filled = "none" !== a, this.setAttr("fillcolor", this.renderer.color(a, c, b, this)))
            },
            "fill-opacitySetter": function(a, b, c) {
                B(this.renderer.prepVML(["<", b.split("-")[0], ' opacity="',
                a, '"/>']), null, null, c)
            },
            opacitySetter: D,
            rotationSetter: function(a, b, c) {
                c = c.style;
                this[b] = c[b] = a;
                c.left = -Math.round(Math.sin(a * f) + 1) + "px";
                c.top = Math.round(Math.cos(a * f)) + "px"
            },
            strokeSetter: function(a, b, c) {
                this.setAttr("strokecolor", this.renderer.color(a, c, b, this))
            },
            "stroke-widthSetter": function(a, b, c) {
                c.stroked = !! a;
                this[b] = a;
                v(a) && (a += "px");
                this.setAttr("strokeweight", a)
            },
            titleSetter: function(a, b) {
                this.setAttr(b, a)
            },
            visibilitySetter: function(a, b, c) {
                "inherit" === a && (a = "visible");
                this.shadows && n(this.shadows,

                function(c) {
                    c.style[b] = a
                });
                "DIV" === c.nodeName && (a = "hidden" === a ? "-999em" : 0, this.docMode8 || (c.style[b] = a ? "visible" : "hidden"), b = "top");
                c.style[b] = a
            },
            displaySetter: function(a, b, c) {
                c.style[b] = a
            },
            xSetter: function(a, b, c) {
                this[b] = a;
                "x" === b ? b = "left" : "y" === b && (b = "top");
                this.updateClipping ? (this[b] = a, this.updateClipping()) : c.style[b] = a
            },
            zIndexSetter: function(a, b, c) {
                c.style[b] = a
            }
        }, D["stroke-opacitySetter"] = D["fill-opacitySetter"], a.VMLElement = D = y(c, D), D.prototype.ySetter = D.prototype.widthSetter = D.prototype.heightSetter = D.prototype.xSetter, D = {
            Element: D,
            isIE8: -1 < h.navigator.userAgent.indexOf("MSIE 8.0"),
            init: function(a, b, c) {
                var e, h;
                this.alignedObjects = [];
                e = this.createElement("div").css({
                    position: "relative"
                });
                h = e.element;
                a.appendChild(e.element);
                this.isVML = !0;
                this.box = h;
                this.boxWrapper = e;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(b, c, !1);
                if (!r.namespaces.hcv) {
                    r.namespaces.add("hcv", "urn:schemas-microsoft-com:vml");
                    try {
                        r.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                    } catch (q) {
                        r.styleSheets[0].cssText += "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                    }
                }
            },
            isHidden: function() {
                return !this.box.offsetWidth
            },
            clipRect: function(a, b, c, e) {
                var h = this.createElement(),
                    q = m(a);
                return d(h, {
                    members: [],
                    count: 0,
                    left: (q ? a.x : a) + 1,
                    top: (q ? a.y : b) + 1,
                    width: (q ? a.width : c) - 1,
                    height: (q ? a.height : e) - 1,
                    getCSS: function(a) {
                        var b = a.element,
                            c = b.nodeName,
                            e = a.inverted,
                            k = this.top - ("shape" === c ? b.offsetTop : 0),
                            h = this.left,
                            b = h + this.width,
                            q = k + this.height,
                            k = {
                                clip: "rect(" + Math.round(e ? h : k) + "px," + Math.round(e ? q : b) + "px," + Math.round(e ? b : q) + "px," + Math.round(e ? k : h) + "px)"
                            };
                        !e && a.docMode8 && "DIV" === c && d(k, {
                            width: b + "px",
                            height: q + "px"
                        });
                        return k
                    },
                    updateClipping: function() {
                        n(h.members, function(a) {
                            a.element && a.css(h.getCSS(a))
                        })
                    }
                })
            },
            color: function(b, c, e, h) {
                var q = this,
                    d, m = /^rgba/,
                    p, f, g = "none";
                b && b.linearGradient ? f = "gradient" : b && b.radialGradient && (f = "pattern");
                if (f) {
                    var A, F, u = b.linearGradient || b.radialGradient,
                        t, v, Q, l, r, P = "";
                    b = b.stops;
                    var O, z = [],
                        y = function() {
                            p = ['<fill colors="' + z.join(",") + '" opacity="', Q, '" o:opacity2="', v, '" type="', f, '" ', P, 'focus="100%" method="any" />'];
                            B(q.prepVML(p), null, null, c)
                        };
                    t = b[0];
                    O = b[b.length - 1];
                    0 < t[0] && b.unshift([0, t[1]]);
                    1 > O[0] && b.push([1, O[1]]);
                    n(b, function(b, c) {
                        m.test(b[1]) ? (d = a.color(b[1]), A = d.get("rgb"), F = d.get("a")) : (A = b[1], F = 1);
                        z.push(100 * b[0] + "% " + A);
                        c ? (Q = F, l = A) : (v = F, r = A)
                    });
                    if ("fill" === e) if ("gradient" === f) e = u.x1 || u[0] || 0, b = u.y1 || u[1] || 0, t = u.x2 || u[2] || 0, u = u.y2 || u[3] || 0, P = 'angle="' + (90 - 180 * Math.atan((u - b) / (t - e)) / Math.PI) + '"', y();
                    else {
                        var g = u.r,
                            D = 2 * g,
                            Y = 2 * g,
                            Z = u.cx,
                            aa = u.cy,
                            W = c.radialReference,
                            U, g = function() {
                                W && (U = h.getBBox(), Z += (W[0] - U.x) / U.width - .5, aa += (W[1] - U.y) / U.height - .5, D *= W[2] / U.width, Y *= W[2] / U.height);
                                P = 'src="' + a.getOptions().global.VMLRadialGradientURL + '" size="' + D + "," + Y + '" origin="0.5,0.5" position="' + Z + "," + aa + '" color2="' + r + '" ';
                                y()
                            };
                        h.added ? g() : h.onAdd = g;
                        g = l
                    } else g = A
                } else m.test(b) && "IMG" !== c.tagName ? (d = a.color(b), h[e + "-opacitySetter"](d.get("a"), e, c), g = d.get("rgb")) : (g = c.getElementsByTagName(e), g.length && (g[0].opacity = 1, g[0].type = "solid"), g = b);
                return g
            },
            prepVML: function(a) {
                var b = this.isIE8;
                a = a.join("");
                b ? (a = a.replace("/>", ' xmlns="urn:schemas-microsoft-com:vml" />'), a = -1 === a.indexOf('style="') ? a.replace("/>", ' style="display:inline-block;behavior:url(#default#VML);" />') : a.replace('style="', 'style="display:inline-block;behavior:url(#default#VML);')) : a = a.replace("<", "<hcv:");
                return a
            },
            text: q.prototype.html,
            path: function(a) {
                var b = {
                    coordsize: "10 10"
                };
                p(a) ? b.d = a : m(a) && d(b, a);
                return this.createElement("shape").attr(b)
            },
            circle: function(a,
            b, c) {
                var e = this.symbol("circle");
                m(a) && (c = a.r, b = a.y, a = a.x);
                e.isCircle = !0;
                e.r = c;
                return e.attr({
                    x: a,
                    y: b
                })
            },
            g: function(a) {
                var b;
                a && (b = {
                    className: "highcharts-" + a,
                    "class": "highcharts-" + a
                });
                return this.createElement("div").attr(b)
            },
            image: function(a, b, c, e, h) {
                var q = this.createElement("img").attr({
                    src: a
                });
                1 < arguments.length && q.attr({
                    x: b,
                    y: c,
                    width: e,
                    height: h
                });
                return q
            },
            createElement: function(a) {
                return "rect" === a ? this.symbol(a) : q.prototype.createElement.call(this, a)
            },
            invertChild: function(a, c) {
                var e = this,
                    h = c.style,
                    q = "IMG" === a.tagName && a.style;
                z(a, {
                    flip: "x",
                    left: b(h.width) - (q ? b(q.top) : 1),
                    top: b(h.height) - (q ? b(q.left) : 1),
                    rotation: -90
                });
                n(a.childNodes, function(b) {
                    e.invertChild(b, a)
                })
            },
            symbols: {
                arc: function(a, b, c, e, h) {
                    var q = h.start,
                        d = h.end,
                        m = h.r || c || e;
                    c = h.innerR;
                    e = Math.cos(q);
                    var p = Math.sin(q),
                        f = Math.cos(d),
                        A = Math.sin(d);
                    if (0 === d - q) return ["x"];
                    q = ["wa", a - m, b - m, a + m, b + m, a + m * e, b + m * p, a + m * f, b + m * A];
                    h.open && !c && q.push("e", "M", a, b);
                    q.push("at", a - c, b - c, a + c, b + c, a + c * f, b + c * A, a + c * e, b + c * p, "x", "e");
                    q.isArc = !0;
                    return q
                },
                circle: function(a,
                b, c, e, h) {
                    h && l(h.r) && (c = e = 2 * h.r);
                    h && h.isCircle && (a -= c / 2, b -= e / 2);
                    return ["wa", a, b, a + c, b + e, a + c, b + e / 2, a + c, b + e / 2, "e"]
                },
                rect: function(a, b, c, e, h) {
                    return q.prototype.symbols[l(h) && h.r ? "callout" : "square"].call(0, a, b, c, e, h)
                }
            }
        }, a.VMLRenderer = y = function() {
            this.init.apply(this, arguments)
        }, y.prototype = u(q.prototype, D), a.Renderer = y);
        q.prototype.measureSpanWidth = function(a, b) {
            var c = r.createElement("span"),
                e;
            e = r.createTextNode(a);
            c.appendChild(e);
            z(c, b);
            this.box.appendChild(c);
            e = c.offsetWidth;
            g(c);
            return e
        }
    })(I);
    (function(a) {
        var y = a.correctFloat,
            D = a.defined,
            B = a.destroyObjectProperties,
            z = a.isNumber,
            l = a.merge,
            f = a.pick,
            g = a.stop,
            r = a.deg2rad;
        a.Tick = function(a, f, d, p) {
            this.axis = a;
            this.pos = f;
            this.type = d || "";
            this.isNew = !0;
            d || p || this.addLabel()
        };
        a.Tick.prototype = {
            addLabel: function() {
                var a = this.axis,
                    g = a.options,
                    d = a.chart,
                    p = a.categories,
                    v = a.names,
                    m = this.pos,
                    u = g.labels,
                    e = a.tickPositions,
                    b = m === e[0],
                    c = m === e[e.length - 1],
                    v = p ? f(p[m], v[m], m) : m,
                    p = this.label,
                    e = e.info,
                    q;
                a.isDatetimeAxis && e && (q = g.dateTimeLabelFormats[e.higherRanks[m] || e.unitName]);
                this.isFirst = b;
                this.isLast = c;
                g = a.labelFormatter.call({
                    axis: a,
                    chart: d,
                    isFirst: b,
                    isLast: c,
                    dateTimeLabelFormat: q,
                    value: a.isLog ? y(a.lin2log(v)) : v
                });
                D(p) ? p && p.attr({
                    text: g
                }) : (this.labelLength = (this.label = p = D(g) && u.enabled ? d.renderer.text(g, 0, 0, u.useHTML).css(l(u.style)).add(a.labelGroup) : null) && p.getBBox().width, this.rotation = 0)
            },
            getLabelSize: function() {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            },
            handleOverflow: function(a) {
                var g = this.axis,
                    d = a.x,
                    p = g.chart.chartWidth,
                    v = g.chart.spacing,
                    m = f(g.labelLeft, Math.min(g.pos, v[3])),
                    v = f(g.labelRight, Math.max(g.pos + g.len, p - v[1])),
                    u = this.label,
                    e = this.rotation,
                    b = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[g.labelAlign],
                    c = u.getBBox().width,
                    q = g.getSlotWidth(),
                    h = q,
                    k = 1,
                    w, C = {};
                if (e) 0 > e && d - b * c < m ? w = Math.round(d / Math.cos(e * r) - m) : 0 < e && d + b * c > v && (w = Math.round((p - d) / Math.cos(e * r)));
                else if (p = d + (1 - b) * c, d - b * c < m ? h = a.x + h * (1 - b) - m : p > v && (h = v - a.x + h * b, k = -1), h = Math.min(q, h), h < q && "center" === g.labelAlign && (a.x += k * (q - h - b * (q - Math.min(c, h)))), c > h || g.autoRotation && (u.styles || {}).width) w = h;
                w && (C.width = w, (g.options.labels.style || {}).textOverflow || (C.textOverflow = "ellipsis"), u.css(C))
            },
            getPosition: function(a, f, d, p) {
                var g = this.axis,
                    m = g.chart,
                    u = p && m.oldChartHeight || m.chartHeight;
                return {
                    x: a ? g.translate(f + d, null, null, p) + g.transB : g.left + g.offset + (g.opposite ? (p && m.oldChartWidth || m.chartWidth) - g.right - g.left : 0),
                    y: a ? u - g.bottom + g.offset - (g.opposite ? g.height : 0) : u - g.translate(f + d, null, null, p) - g.transB
                }
            },
            getLabelPosition: function(a, f, d, p, g, m, u, e) {
                var b = this.axis,
                    c = b.transA,
                    q = b.reversed,
                    h = b.staggerLines,
                    k = b.tickRotCorr || {
                        x: 0,
                        y: 0
                    }, w = g.y;
                D(w) || (w = 0 === b.side ? d.rotation ? -8 : -d.getBBox().height : 2 === b.side ? k.y + 8 : Math.cos(d.rotation * r) * (k.y - d.getBBox(!1, 0).height / 2));
                a = a + g.x + k.x - (m && p ? m * c * (q ? -1 : 1) : 0);
                f = f + w - (m && !p ? m * c * (q ? 1 : -1) : 0);
                h && (d = u / (e || 1) % h, b.opposite && (d = h - d - 1), f += b.labelOffset / h * d);
                return {
                    x: a,
                    y: Math.round(f)
                }
            },
            getMarkPath: function(a, f, d, p, g, m) {
                return m.crispLine(["M", a, f, "L", a + (g ? 0 : -d), f + (g ? d : 0)], p)
            },
            render: function(a, t, d) {
                var p = this.axis,
                    l = p.options,
                    m = p.chart.renderer,
                    u = p.horiz,
                    e = this.type,
                    b = this.label,
                    c = this.pos,
                    q = l.labels,
                    h = this.gridLine,
                    k = e ? e + "Tick" : "tick",
                    w = p.tickSize(k),
                    C = this.mark,
                    H = !C,
                    E = q.step,
                    r = {}, G = !0,
                    x = p.tickmarkOffset,
                    K = this.getPosition(u, c, x, t),
                    M = K.x,
                    K = K.y,
                    A = u && M === p.pos + p.len || !u && K === p.pos ? -1 : 1,
                    F = e ? e + "Grid" : "grid",
                    L = l[F + "LineWidth"],
                    N = l[F + "LineColor"],
                    S = l[F + "LineDashStyle"],
                    F = f(l[k + "Width"], !e && p.isXAxis ? 1 : 0),
                    k = l[k + "Color"];
                d = f(d, 1);
                this.isActive = !0;
                h || (r.stroke = N, r["stroke-width"] = L, S && (r.dashstyle = S), e || (r.zIndex = 1), t && (r.opacity = 0), this.gridLine = h = m.path().attr(r).addClass("highcharts-" + (e ? e + "-" : "") + "grid-line").add(p.gridGroup));
                if (!t && h && (c = p.getPlotLinePath(c + x, h.strokeWidth() * A, t, !0))) h[this.isNew ? "attr" : "animate"]({
                    d: c,
                    opacity: d
                });
                w && (p.opposite && (w[0] = -w[0]), H && (this.mark = C = m.path().addClass("highcharts-" + (e ? e + "-" : "") + "tick").add(p.axisGroup), C.attr({
                    stroke: k,
                    "stroke-width": F
                })), C[H ? "attr" : "animate"]({
                    d: this.getMarkPath(M, K, w[0], C.strokeWidth() * A, u, m),
                    opacity: d
                }));
                b && z(M) && (b.xy = K = this.getLabelPosition(M, K, b, u, q, x, a, E), this.isFirst && !this.isLast && !f(l.showFirstLabel, 1) || this.isLast && !this.isFirst && !f(l.showLastLabel, 1) ? G = !1 : !u || p.isRadial || q.step || q.rotation || t || 0 === d || this.handleOverflow(K), E && a % E && (G = !1), G && z(K.y) ? (K.opacity = d, b[this.isNew ? "attr" : "animate"](K)) : (g(b), b.attr("y", - 9999)), this.isNew = !1)
            },
            destroy: function() {
                B(this, this.axis)
            }
        }
    })(I);
    (function(a) {
        var y = a.arrayMax,
            D = a.arrayMin,
            B = a.defined,
            z = a.destroyObjectProperties,
            l = a.each,
            f = a.erase,
            g = a.merge,
            r = a.pick;
        a.PlotLineOrBand = function(a, f) {
            this.axis = a;
            f && (this.options = f, this.id = f.id)
        };
        a.PlotLineOrBand.prototype = {
            render: function() {
                var a = this,
                    f = a.axis,
                    d = f.horiz,
                    p = a.options,
                    l = p.label,
                    m = a.label,
                    u = p.to,
                    e = p.from,
                    b = p.value,
                    c = B(e) && B(u),
                    q = B(b),
                    h = a.svgElem,
                    k = !h,
                    w = [],
                    C, H = p.color,
                    E = r(p.zIndex, 0),
                    J = p.events,
                    w = {
                        "class": "highcharts-plot-" + (c ? "band " : "line ") + (p.className || "")
                    }, G = {}, x = f.chart.renderer,
                    K = c ? "bands" : "lines",
                    M = f.log2lin;
                f.isLog && (e = M(e), u = M(u), b = M(b));
                q ? (w = {
                    stroke: H,
                    "stroke-width": p.width
                }, p.dashStyle && (w.dashstyle = p.dashStyle)) : c && (H && (w.fill = H), p.borderWidth && (w.stroke = p.borderColor, w["stroke-width"] = p.borderWidth));
                G.zIndex = E;
                K += "-" + E;
                (H = f[K]) || (f[K] = H = x.g("plot-" + K).attr(G).add());
                k && (a.svgElem = h = x.path().attr(w).add(H));
                if (q) w = f.getPlotLinePath(b, h.strokeWidth());
                else if (c) w = f.getPlotBandPath(e, u, p);
                else return;
                if (k && w && w.length) {
                    if (h.attr({
                        d: w
                    }), J) for (C in p = function(b) {
                        h.on(b, function(c) {
                            J[b].apply(a, [c])
                        })
                    }, J) p(C)
                } else h && (w ? (h.show(), h.animate({
                    d: w
                })) : (h.hide(), m && (a.label = m = m.destroy())));
                l && B(l.text) && w && w.length && 0 < f.width && 0 < f.height && !w.flat ? (l = g({
                    align: d && c && "center",
                    x: d ? !c && 4 : 10,
                    verticalAlign: !d && c && "middle",
                    y: d ? c ? 16 : 10 : c ? 6 : -4,
                    rotation: d && !c && 90
                }, l), this.renderLabel(l, w, c, E)) : m && m.hide();
                return a
            },
            renderLabel: function(a, f, d, p) {
                var g = this.label,
                    m = this.axis.chart.renderer;
                g || (g = {
                    align: a.textAlign || a.align,
                    rotation: a.rotation,
                    "class": "highcharts-plot-" + (d ? "band" : "line") + "-label " + (a.className || "")
                }, g.zIndex = p, this.label = g = m.text(a.text, 0, 0, a.useHTML).attr(g).add(), g.css(a.style));
                p = [f[1], f[4], d ? f[6] : f[1]];
                f = [f[2], f[5], d ? f[7] : f[2]];
                d = D(p);
                m = D(f);
                g.align(a, !1, {
                    x: d,
                    y: m,
                    width: y(p) - d,
                    height: y(f) - m
                });
                g.show()
            },
            destroy: function() {
                f(this.axis.plotLinesAndBands, this);
                delete this.axis;
                z(this)
            }
        };
        a.AxisPlotLineOrBandExtension = {
            getPlotBandPath: function(a, f) {
                var d = this.getPlotLinePath(f, null, null, !0),
                    p = this.getPlotLinePath(a, null, null, !0);
                p && d ? (p.flat = p.toString() === d.toString(), p.push(d[4], d[5], d[1], d[2])) : p = null;
                return p
            },
            addPlotBand: function(a) {
                return this.addPlotBandOrLine(a, "plotBands")
            },
            addPlotLine: function(a) {
                return this.addPlotBandOrLine(a, "plotLines")
            },
            addPlotBandOrLine: function(f, g) {
                var d = (new a.PlotLineOrBand(this,
                f)).render(),
                    p = this.userOptions;
                d && (g && (p[g] = p[g] || [], p[g].push(f)), this.plotLinesAndBands.push(d));
                return d
            },
            removePlotBandOrLine: function(a) {
                for (var g = this.plotLinesAndBands, d = this.options, p = this.userOptions, r = g.length; r--;) g[r].id === a && g[r].destroy();
                l([d.plotLines || [], p.plotLines || [], d.plotBands || [], p.plotBands || []], function(d) {
                    for (r = d.length; r--;) d[r].id === a && f(d, d[r])
                })
            }
        }
    })(I);
    (function(a) {
        var y = a.addEvent,
            D = a.animObject,
            B = a.arrayMax,
            z = a.arrayMin,
            l = a.AxisPlotLineOrBandExtension,
            f = a.color,
            g = a.correctFloat,
            r = a.defaultOptions,
            n = a.defined,
            t = a.deg2rad,
            d = a.destroyObjectProperties,
            p = a.each,
            v = a.error,
            m = a.extend,
            u = a.fireEvent,
            e = a.format,
            b = a.getMagnitude,
            c = a.grep,
            q = a.inArray,
            h = a.isArray,
            k = a.isNumber,
            w = a.isString,
            C = a.merge,
            H = a.normalizeTickInterval,
            E = a.pick,
            J = a.PlotLineOrBand,
            G = a.removeEvent,
            x = a.splat,
            K = a.syncTimeout,
            M = a.Tick;
        a.Axis = function() {
            this.init.apply(this, arguments)
        };
        a.Axis.prototype = {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: "%H:%M:%S.%L",
                    second: "%H:%M:%S",
                    minute: "%H:%M",
                    hour: "%H:%M",
                    day: "%e. %b",
                    week: "%e. %b",
                    month: "%b '%y",
                    year: "%Y"
                },
                endOnTick: !1,
                labels: {
                    enabled: !0,
                    style: {
                        color: "#666666",
                        cursor: "default",
                        fontSize: "11px"
                    },
                    x: 0
                },
                minPadding: .01,
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickmarkPlacement: "between",
                tickPixelInterval: 100,
                tickPosition: "outside",
                title: {
                    align: "middle",
                    style: {
                        color: "#666666"
                    }
                },
                type: "linear",
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                tickColor: "#ccd6eb"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {
                    x: -8
                },
                maxPadding: .05,
                minPadding: .05,
                startOnTick: !0,
                title: {
                    rotation: 270,
                    text: "Values"
                },
                stackLabels: {
                    enabled: !1,
                    formatter: function() {
                        return a.numberFormat(this.total, - 1)
                    },
                    style: {
                        fontSize: "11px",
                        fontWeight: "bold",
                        color: "#000000",
                        textShadow: "1px 1px contrast, -1px -1px contrast, -1px 1px contrast, 1px -1px contrast"
                    }
                },
                gridLineWidth: 1,
                lineWidth: 0
            },
            defaultLeftAxisOptions: {
                labels: {
                    x: -15
                },
                title: {
                    rotation: 270
                }
            },
            defaultRightAxisOptions: {
                labels: {
                    x: 15
                },
                title: {
                    rotation: 90
                }
            },
            defaultBottomAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            defaultTopAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            init: function(a, b) {
                var c = b.isX;
                this.chart = a;
                this.horiz = a.inverted ? !c : c;
                this.isXAxis = c;
                this.coll = this.coll || (c ? "xAxis" : "yAxis");
                this.opposite = b.opposite;
                this.side = b.side || (this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3);
                this.setOptions(b);
                var e = this.options,
                    h = e.type;
                this.labelFormatter = e.labels.formatter || this.defaultLabelFormatter;
                this.userOptions = b;
                this.minPixelPadding = 0;
                this.reversed = e.reversed;
                this.visible = !1 !== e.visible;
                this.zoomEnabled = !1 !== e.zoomEnabled;
                this.hasNames = "category" === h || !0 === e.categories;
                this.categories = e.categories || this.hasNames;
                this.names = this.names || [];
                this.isLog = "logarithmic" === h;
                this.isDatetimeAxis = "datetime" === h;
                this.isLinked = n(e.linkedTo);
                this.ticks = {};
                this.labelEdge = [];
                this.minorTicks = {};
                this.plotLinesAndBands = [];
                this.alternateBands = {};
                this.len = 0;
                this.minRange = this.userMinRange = e.minRange || e.maxZoom;
                this.range = e.range;
                this.offset = e.offset || 0;
                this.stacks = {};
                this.oldStacks = {};
                this.stacksTouched = 0;
                this.min = this.max = null;
                this.crosshair = E(e.crosshair, x(a.options.tooltip.crosshairs)[c ? 0 : 1], !1);
                var k, e = this.options.events; - 1 === q(this, a.axes) && (c ? a.axes.splice(a.xAxis.length, 0, this) : a.axes.push(this), a[this.coll].push(this));
                this.series = this.series || [];
                a.inverted && c && void 0 === this.reversed && (this.reversed = !0);
                this.removePlotLine = this.removePlotBand = this.removePlotBandOrLine;
                for (k in e) y(this, k, e[k]);
                this.isLog && (this.val2lin = this.log2lin, this.lin2val = this.lin2log)
            },
            setOptions: function(a) {
                this.options = C(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], C(r[this.coll], a))
            },
            defaultLabelFormatter: function() {
                var b = this.axis,
                    c = this.value,
                    h = b.categories,
                    k = this.dateTimeLabelFormat,
                    q = r.lang.numericSymbols,
                    d = q && q.length,
                    m, f = b.options.labels.format,
                    b = b.isLog ? c : b.tickInterval;
                if (f) m = e(f, this);
                else if (h) m = c;
                else if (k) m = a.dateFormat(k, c);
                else if (d && 1E3 <= b) for (; d-- && void 0 === m;) h = Math.pow(1E3, d + 1), b >= h && 0 === 10 * c % h && null !== q[d] && 0 !== c && (m = a.numberFormat(c / h, - 1) + q[d]);
                void 0 === m && (m = 1E4 <= Math.abs(c) ? a.numberFormat(c, - 1) : a.numberFormat(c, - 1, void 0, ""));
                return m
            },
            getSeriesExtremes: function() {
                var a = this,
                    b = a.chart;
                a.hasVisibleSeries = !1;
                a.dataMin = a.dataMax = a.threshold = null;
                a.softThreshold = !a.isXAxis;
                a.buildStacks && a.buildStacks();
                p(a.series, function(e) {
                    if (e.visible || !b.options.chart.ignoreHiddenSeries) {
                        var h = e.options,
                            q = h.threshold,
                            d;
                        a.hasVisibleSeries = !0;
                        a.isLog && 0 >= q && (q = null);
                        if (a.isXAxis) h = e.xData, h.length && (e = z(h), k(e) || e instanceof Date || (h = c(h, function(a) {
                            return k(a)
                        }), e = z(h)), a.dataMin = Math.min(E(a.dataMin, h[0]), e), a.dataMax = Math.max(E(a.dataMax, h[0]), B(h)));
                        else if (e.getExtremes(), d = e.dataMax, e = e.dataMin, n(e) && n(d) && (a.dataMin = Math.min(E(a.dataMin, e), e), a.dataMax = Math.max(E(a.dataMax, d), d)), n(q) && (a.threshold = q), !h.softThreshold || a.isLog) a.softThreshold = !1
                    }
                })
            },
            translate: function(a, b, c, e, h, q) {
                var d = this.linkedParent || this,
                    m = 1,
                    f = 0,
                    g = e ? d.oldTransA : d.transA;
                e = e ? d.oldMin : d.min;
                var p = d.minPixelPadding;
                h = (d.isOrdinal || d.isBroken || d.isLog && h) && d.lin2val;
                g || (g = d.transA);
                c && (m *= -1, f = d.len);
                d.reversed && (m *= -1, f -= m * (d.sector || d.len));
                b ? (a = (a * m + f - p) / g + e, h && (a = d.lin2val(a))) : (h && (a = d.val2lin(a)), "between" === q && (q = .5), a = m * (a - e) * g + f + m * p + (k(q) ? g * q * d.pointRange : 0));
                return a
            },
            toPixels: function(a, b) {
                return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos)
            },
            toValue: function(a, b) {
                return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0)
            },
            getPlotLinePath: function(a, b, c, e, h) {
                var d = this.chart,
                    q = this.left,
                    m = this.top,
                    f, g, p = c && d.oldChartHeight || d.chartHeight,
                    w = c && d.oldChartWidth || d.chartWidth,
                    x;
                f = this.transB;
                var u = function(a, b, c) {
                    if (a < b || a > c) e ? a = Math.min(Math.max(b, a), c) : x = !0;
                    return a
                };
                h = E(h, this.translate(a, null, null, c));
                a = c = Math.round(h + f);
                f = g = Math.round(p - h - f);
                k(h) ? this.horiz ? (f = m, g = p - this.bottom, a = c = u(a, q, q + this.width)) : (a = q, c = w - this.right, f = g = u(f, m, m + this.height)) : x = !0;
                return x && !e ? null : d.renderer.crispLine(["M", a, f, "L", c, g], b || 1)
            },
            getLinearTickPositions: function(a, b, c) {
                var e, h = g(Math.floor(b / a) * a),
                    d = g(Math.ceil(c / a) * a),
                    q = [];
                if (b === c && k(b)) return [b];
                for (b = h; b <= d;) {
                    q.push(b);
                    b = g(b + a);
                    if (b === e) break;
                    e = b
                }
                return q
            },
            getMinorTickPositions: function() {
                var a = this.options,
                    b = this.tickPositions,
                    c = this.minorTickInterval,
                    e = [],
                    h, k = this.pointRangePadding || 0;
                h = this.min - k;
                var k = this.max + k,
                    d = k - h;
                if (d && d / c < this.len / 3) if (this.isLog) for (k = b.length, h = 1; h < k; h++) e = e.concat(this.getLogTickPositions(c, b[h - 1], b[h], !0));
                else if (this.isDatetimeAxis && "auto" === a.minorTickInterval) e = e.concat(this.getTimeTicks(this.normalizeTimeTickInterval(c), h, k, a.startOfWeek));
                else for (b = h + (b[0] - h) % c; b <= k; b += c) e.push(b);
                0 !== e.length && this.trimTicks(e, a.startOnTick, a.endOnTick);
                return e
            },
            adjustForMinRange: function() {
                var a = this.options,
                    b = this.min,
                    c = this.max,
                    e, h = this.dataMax - this.dataMin >= this.minRange,
                    k, d, q, m, f, g;
                this.isXAxis && void 0 === this.minRange && !this.isLog && (n(a.min) || n(a.max) ? this.minRange = null : (p(this.series, function(a) {
                    m = a.xData;
                    for (d = f = a.xIncrement ? 1 : m.length - 1; 0 < d; d--) if (q = m[d] - m[d - 1], void 0 === k || q < k) k = q
                }), this.minRange = Math.min(5 * k, this.dataMax - this.dataMin)));
                c - b < this.minRange && (g = this.minRange, e = (g - c + b) / 2, e = [b - e, E(a.min, b - e)], h && (e[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), b = B(e), c = [b + g, E(a.max, b + g)], h && (c[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), c = z(c), c - b < g && (e[0] = c - g, e[1] = E(a.min, c - g), b = B(e)));
                this.min = b;
                this.max = c
            },
            getClosest: function() {
                var a;
                this.categories ? a = 1 : p(this.series, function(b) {
                    var c = b.closestPointRange;
                    !b.noSharedTooltip && n(c) && (a = n(a) ? Math.min(a, c) : c)
                });
                return a
            },
            nameToX: function(a) {
                var b = h(this.categories),
                    c = b ? this.categories : this.names,
                    e = a.options.x,
                    k;
                a.series.requireSorting = !1;
                n(e) || (e = !1 === this.options.nameToX ? a.series.autoIncrement() : q(a.name, c)); - 1 === e ? b || (k = c.length) : k = e;
                this.names[k] = a.name;
                return k
            },
            updateNames: function() {
                var a = this;
                0 < this.names.length && (this.names.length = 0, this.minRange = void 0, p(this.series || [], function(b) {
                    b.processedXData || (b.processData(), b.generatePoints());
                    p(b.points, function(c, e) {
                        var h;
                        c.options && void 0 === c.options.x && (h = a.nameToX(c), h !== c.x && (c.x = h, b.xData[e] = h))
                    })
                }))
            },
            setAxisTranslation: function(a) {
                var b = this,
                    c = b.max - b.min,
                    e = b.axisPointRange || 0,
                    h, k = 0,
                    d = 0,
                    q = b.linkedParent,
                    m = !! b.categories,
                    f = b.transA,
                    g = b.isXAxis;
                if (g || m || e) q ? (k = q.minPointOffset, d = q.pointRangePadding) : (h = b.getClosest(), p(b.series, function(a) {
                    var c = m ? 1 : g ? E(a.options.pointRange, h, 0) : b.axisPointRange || 0;
                    a = a.options.pointPlacement;
                    e = Math.max(e, c);
                    b.single || (k = Math.max(k, w(a) ? 0 : c / 2), d = Math.max(d, "on" === a ? 0 : c))
                })), q = b.ordinalSlope && h ? b.ordinalSlope / h : 1, b.minPointOffset = k *= q, b.pointRangePadding = d *= q, b.pointRange = Math.min(e, c), g && (b.closestPointRange = h);
                a && (b.oldTransA = f);
                b.translationSlope = b.transA = f = b.len / (c + d || 1);
                b.transB = b.horiz ? b.left : b.bottom;
                b.minPixelPadding = f * k
            },
            minFromRange: function() {
                return this.max - this.range
            },
            setTickInterval: function(a) {
                var c = this,
                    e = c.chart,
                    h = c.options,
                    d = c.isLog,
                    q = c.log2lin,
                    m = c.isDatetimeAxis,
                    f = c.isXAxis,
                    w = c.isLinked,
                    x = h.maxPadding,
                    C = h.minPadding,
                    G = h.tickInterval,
                    l = h.tickPixelInterval,
                    K = c.categories,
                    t = c.threshold,
                    r = c.softThreshold,
                    M, J, z, y;
                m || K || w || this.getTickAmount();
                z = E(c.userMin, h.min);
                y = E(c.userMax, h.max);
                w ? (c.linkedParent = e[c.coll][h.linkedTo], e = c.linkedParent.getExtremes(), c.min = E(e.min, e.dataMin), c.max = E(e.max, e.dataMax), h.type !== c.linkedParent.options.type && v(11, 1)) : (!r && n(t) && (c.dataMin >= t ? (M = t, C = 0) : c.dataMax <= t && (J = t, x = 0)), c.min = E(z, M, c.dataMin), c.max = E(y,
                J, c.dataMax));
                d && (!a && 0 >= Math.min(c.min, E(c.dataMin, c.min)) && v(10, 1), c.min = g(q(c.min), 15), c.max = g(q(c.max), 15));
                c.range && n(c.max) && (c.userMin = c.min = z = Math.max(c.min, c.minFromRange()), c.userMax = y = c.max, c.range = null);
                u(c, "foundExtremes");
                c.beforePadding && c.beforePadding();
                c.adjustForMinRange();
                !(K || c.axisPointRange || c.usePercentage || w) && n(c.min) && n(c.max) && (q = c.max - c.min) && (!n(z) && C && (c.min -= q * C), !n(y) && x && (c.max += q * x));
                k(h.floor) && (c.min = Math.max(c.min, h.floor));
                k(h.ceiling) && (c.max = Math.min(c.max,
                h.ceiling));
                r && n(c.dataMin) && (t = t || 0, !n(z) && c.min < t && c.dataMin >= t ? c.min = t : !n(y) && c.max > t && c.dataMax <= t && (c.max = t));
                c.tickInterval = c.min === c.max || void 0 === c.min || void 0 === c.max ? 1 : w && !G && l === c.linkedParent.options.tickPixelInterval ? G = c.linkedParent.tickInterval : E(G, this.tickAmount ? (c.max - c.min) / Math.max(this.tickAmount - 1, 1) : void 0, K ? 1 : (c.max - c.min) * l / Math.max(c.len, l));
                f && !a && p(c.series, function(a) {
                    a.processData(c.min !== c.oldMin || c.max !== c.oldMax)
                });
                c.setAxisTranslation(!0);
                c.beforeSetTickPositions && c.beforeSetTickPositions();
                c.postProcessTickInterval && (c.tickInterval = c.postProcessTickInterval(c.tickInterval));
                c.pointRange && !G && (c.tickInterval = Math.max(c.pointRange, c.tickInterval));
                a = E(h.minTickInterval, c.isDatetimeAxis && c.closestPointRange);
                !G && c.tickInterval < a && (c.tickInterval = a);
                m || d || G || (c.tickInterval = H(c.tickInterval, null, b(c.tickInterval), E(h.allowDecimals, !(.5 < c.tickInterval && 5 > c.tickInterval && 1E3 < c.max && 9999 > c.max)), !! this.tickAmount));
                this.tickAmount || (c.tickInterval = c.unsquish());
                this.setTickPositions()
            },
            setTickPositions: function() {
                var a = this.options,
                    b, c = a.tickPositions,
                    e = a.tickPositioner,
                    h = a.startOnTick,
                    k = a.endOnTick,
                    d;
                this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === a.minorTickInterval && this.tickInterval ? this.tickInterval / 5 : a.minorTickInterval;
                this.tickPositions = b = c && c.slice();
                !b && (b = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max,
                a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), b.length > this.len && (b = [b[0], b.pop()]), this.tickPositions = b, e && (e = e.apply(this, [this.min, this.max]))) && (this.tickPositions = b = e);
                this.isLinked || (this.trimTicks(b, h, k), this.min === this.max && n(this.min) && !this.tickAmount && (d = !0, this.min -= .5, this.max += .5), this.single = d, c || e || this.adjustTickAmount())
            },
            trimTicks: function(a,
            b, c) {
                var e = a[0],
                    h = a[a.length - 1],
                    k = this.minPointOffset || 0;
                if (b) this.min = e;
                else for (; this.min - k > a[0];) a.shift();
                if (c) this.max = h;
                else for (; this.max + k < a[a.length - 1];) a.pop();
                0 === a.length && n(e) && a.push((h + e) / 2)
            },
            alignToOthers: function() {
                var a = {}, b, c = this.options;
                !1 !== this.chart.options.chart.alignTicks && !1 !== c.alignTicks && p(this.chart[this.coll], function(c) {
                    var e = c.options,
                        e = [c.horiz ? e.left : e.top, e.width, e.height, e.pane].join();
                    c.series.length && (a[e] ? b = !0 : a[e] = 1)
                });
                return b
            },
            getTickAmount: function() {
                var a = this.options,
                    b = a.tickAmount,
                    c = a.tickPixelInterval;
                !n(a.tickInterval) && this.len < c && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);
                !b && this.alignToOthers() && (b = Math.ceil(this.len / c) + 1);
                4 > b && (this.finalTickAmt = b, b = 5);
                this.tickAmount = b
            },
            adjustTickAmount: function() {
                var a = this.tickInterval,
                    b = this.tickPositions,
                    c = this.tickAmount,
                    e = this.finalTickAmt,
                    h = b && b.length;
                if (h < c) {
                    for (; b.length < c;) b.push(g(b[b.length - 1] + a));
                    this.transA *= (h - 1) / (c - 1);
                    this.max = b[b.length - 1]
                } else h > c && (this.tickInterval *= 2, this.setTickPositions());
                if (n(e)) {
                    for (a = c = b.length; a--;)(3 === e && 1 === a % 2 || 2 >= e && 0 < a && a < c - 1) && b.splice(a, 1);
                    this.finalTickAmt = void 0
                }
            },
            setScale: function() {
                var a, b;
                this.oldMin = this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                b = this.len !== this.oldAxisLength;
                p(this.series, function(b) {
                    if (b.isDirtyData || b.isDirty || b.xAxis.isDirty) a = !0
                });
                b || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks()
            },
            setExtremes: function(a, b, c, e, h) {
                var k = this,
                    d = k.chart;
                c = E(c, !0);
                p(k.series, function(a) {
                    delete a.kdTree
                });
                h = m(h, {
                    min: a,
                    max: b
                });
                u(k, "setExtremes", h, function() {
                    k.userMin = a;
                    k.userMax = b;
                    k.eventArgs = h;
                    c && d.redraw(e)
                })
            },
            zoom: function(a, b) {
                var c = this.dataMin,
                    e = this.dataMax,
                    h = this.options,
                    k = Math.min(c, E(h.min, c)),
                    h = Math.max(e, E(h.max, e));
                this.allowZoomOutside || (n(c) && a <= k && (a = k), n(e) && b >= h && (b = h));
                this.displayBtn = void 0 !== a || void 0 !== b;
                this.setExtremes(a, b, !1, void 0, {
                    trigger: "zoom"
                });
                return !0
            },
            setAxisSize: function() {
                var a = this.chart,
                    b = this.options,
                    c = b.offsetLeft || 0,
                    e = this.horiz,
                    h = E(b.width, a.plotWidth - c + (b.offsetRight || 0)),
                    k = E(b.height, a.plotHeight),
                    d = E(b.top, a.plotTop),
                    b = E(b.left, a.plotLeft + c),
                    c = /%$/;
                c.test(k) && (k = Math.round(parseFloat(k) / 100 * a.plotHeight));
                c.test(d) && (d = Math.round(parseFloat(d) / 100 * a.plotHeight + a.plotTop));
                this.left = b;
                this.top = d;
                this.width = h;
                this.height = k;
                this.bottom = a.chartHeight - k - d;
                this.right = a.chartWidth - h - b;
                this.len = Math.max(e ? h : k, 0);
                this.pos = e ? b : d
            },
            getExtremes: function() {
                var a = this.isLog,
                    b = this.lin2log;
                return {
                    min: a ? g(b(this.min)) : this.min,
                    max: a ? g(b(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            },
            getThreshold: function(a) {
                var b = this.isLog,
                    c = this.lin2log,
                    e = b ? c(this.min) : this.min,
                    b = b ? c(this.max) : this.max;
                null === a ? a = e : e > a ? a = e : b < a && (a = b);
                return this.translate(a, 0, 1, 0, 1)
            },
            autoLabelAlign: function(a) {
                a = (E(a, 0) - 90 * this.side + 720) % 360;
                return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center"
            },
            tickSize: function(a) {
                var b = this.options,
                    c = b[a + "Length"],
                    e = E(b[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);
                if (e && c) return "inside" === b[a + "Position"] && (c = -c), [c, e]
            },
            labelMetrics: function() {
                return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[0] && this.ticks[0].label)
            },
            unsquish: function() {
                var a = this.options.labels,
                    b = this.horiz,
                    c = this.tickInterval,
                    e = c,
                    h = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / c),
                    k, d = a.rotation,
                    q = this.labelMetrics(),
                    m, f = Number.MAX_VALUE,
                    g, w = function(a) {
                        a /= h || 1;
                        a = 1 < a ? Math.ceil(a) : 1;
                        return a * c
                    };
                b ? (g = !a.staggerLines && !a.step && (n(d) ? [d] : h < E(a.autoRotationLimit, 80) && a.autoRotation)) && p(g, function(a) {
                    var b;
                    if (a === d || a && -90 <= a && 90 >= a) m = w(Math.abs(q.h / Math.sin(t * a))), b = m + Math.abs(a / 360), b < f && (f = b, k = a, e = m)
                }) : a.step || (e = w(q.h));
                this.autoRotation = g;
                this.labelRotation = E(k, d);
                return e
            },
            getSlotWidth: function() {
                var a = this.chart,
                    b = this.horiz,
                    c = this.options.labels,
                    e = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                    h = a.margin[3];
                return b && 2 > (c.step || 0) && !c.rotation && (this.staggerLines || 1) * a.plotWidth / e || !b && (h && h - a.spacing[3] || .33 * a.chartWidth)
            },
            renderUnsquish: function() {
                var a = this.chart,
                    b = a.renderer,
                    c = this.tickPositions,
                    e = this.ticks,
                    h = this.options.labels,
                    k = this.horiz,
                    d = this.getSlotWidth(),
                    q = Math.max(1, Math.round(d - 2 * (h.padding || 5))),
                    m = {}, f = this.labelMetrics(),
                    g = h.style && h.style.textOverflow,
                    x, u = 0,
                    G, E;
                w(h.rotation) || (m.rotation = h.rotation || 0);
                p(c, function(a) {
                    (a = e[a]) && a.labelLength > u && (u = a.labelLength)
                });
                this.maxLabelLength = u;
                if (this.autoRotation) u > q && u > f.h ? m.rotation = this.labelRotation : this.labelRotation = 0;
                else if (d && (x = {
                    width: q + "px"
                }, !g)) for (x.textOverflow = "clip", G = c.length; !k && G--;) if (E = c[G], q = e[E].label) q.styles && "ellipsis" === q.styles.textOverflow ? q.css({
                    textOverflow: "clip"
                }) : e[E].labelLength > d && q.css({
                    width: d + "px"
                }), q.getBBox().height > this.len / c.length - (f.h - f.f) && (q.specCss = {
                    textOverflow: "ellipsis"
                });
                m.rotation && (x = {
                    width: (u > .5 * a.chartHeight ? .33 * a.chartHeight : a.chartHeight) + "px"
                }, g || (x.textOverflow = "ellipsis"));
                if (this.labelAlign = h.align || this.autoLabelAlign(this.labelRotation)) m.align = this.labelAlign;
                p(c, function(a) {
                    var b = (a = e[a]) && a.label;
                    b && (b.attr(m), x && b.css(C(x, b.specCss)), delete b.specCss, a.rotation = m.rotation)
                });
                this.tickRotCorr = b.rotCorr(f.b, this.labelRotation || 0, 0 !== this.side)
            },
            hasData: function() {
                return this.hasVisibleSeries || n(this.min) && n(this.max) && !! this.tickPositions
            },
            getOffset: function() {
                var a = this,
                    b = a.chart,
                    c = b.renderer,
                    e = a.options,
                    h = a.tickPositions,
                    k = a.ticks,
                    d = a.horiz,
                    q = a.side,
                    m = b.inverted ? [1, 0, 3, 2][q] : q,
                    f, g, w = 0,
                    x, u = 0,
                    G = e.title,
                    C = e.labels,
                    l = 0,
                    K = a.opposite,
                    t = b.axisOffset,
                    b = b.clipOffset,
                    H = [-1, 1, 1, - 1][q],
                    r, v = e.className,
                    J = a.axisParent,
                    z = this.tickSize("tick");
                f = a.hasData();
                a.showAxis = g = f || E(e.showEmpty, !0);
                a.staggerLines = a.horiz && C.staggerLines;
                a.axisGroup || (a.gridGroup = c.g("grid").attr({
                    zIndex: e.gridZIndex || 1
                }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (v || "")).add(J), a.axisGroup = c.g("axis").attr({
                    zIndex: e.zIndex || 2
                }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (v || "")).add(J), a.labelGroup = c.g("axis-labels").attr({
                    zIndex: C.zIndex || 7
                }).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (v || "")).add(J));
                if (f || a.isLinked) p(h, function(b) {
                    k[b] ? k[b].addLabel() : k[b] = new M(a, b)
                }), a.renderUnsquish(), !1 === C.reserveSpace || 0 !== q && 2 !== q && {
                    1: "left",
                    3: "right"
                }[q] !== a.labelAlign && "center" !== a.labelAlign || p(h, function(a) {
                    l = Math.max(k[a].getLabelSize(), l)
                }), a.staggerLines && (l *= a.staggerLines, a.labelOffset = l * (a.opposite ? -1 : 1));
                else for (r in k) k[r].destroy(), delete k[r];
                G && G.text && !1 !== G.enabled && (a.axisTitle || ((r = G.textAlign) || (r = (d ? {
                    low: "left",
                    middle: "center",
                    high: "right"
                } : {
                    low: K ? "right" : "left",
                    middle: "center",
                    high: K ? "left" : "right"
                })[G.align]), a.axisTitle = c.text(G.text, 0, 0, G.useHTML).attr({
                    zIndex: 7,
                    rotation: G.rotation || 0,
                    align: r
                }).addClass("highcharts-axis-title").css(G.style).add(a.axisGroup), a.axisTitle.isNew = !0),
                g && (w = a.axisTitle.getBBox()[d ? "height" : "width"], x = G.offset, u = n(x) ? 0 : E(G.margin, d ? 5 : 10)), a.axisTitle[g ? "show" : "hide"](!0));
                a.renderLine();
                a.offset = H * E(e.offset, t[q]);
                a.tickRotCorr = a.tickRotCorr || {
                    x: 0,
                    y: 0
                };
                c = 0 === q ? -a.labelMetrics().h : 2 === q ? a.tickRotCorr.y : 0;
                u = Math.abs(l) + u;
                l && (u = u - c + H * (d ? E(C.y, a.tickRotCorr.y + 8 * H) : C.x));
                a.axisTitleMargin = E(x, u);
                t[q] = Math.max(t[q], a.axisTitleMargin + w + H * a.offset, u, f && h.length && z ? z[0] : 0);
                e = e.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
                b[m] = Math.max(b[m], e)
            },
            getLinePath: function(a) {
                var b = this.chart,
                    c = this.opposite,
                    e = this.offset,
                    h = this.horiz,
                    k = this.left + (c ? this.width : 0) + e,
                    e = b.chartHeight - this.bottom - (c ? this.height : 0) + e;
                c && (a *= -1);
                return b.renderer.crispLine(["M", h ? this.left : k, h ? e : this.top, "L", h ? b.chartWidth - this.right : k, h ? e : b.chartHeight - this.bottom], a)
            },
            renderLine: function() {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.axisLine.attr({
                    stroke: this.options.lineColor,
                    "stroke-width": this.options.lineWidth,
                    zIndex: 7
                }))
            },
            getTitlePosition: function() {
                var a = this.horiz,
                    b = this.left,
                    c = this.top,
                    e = this.len,
                    h = this.options.title,
                    k = a ? b : c,
                    d = this.opposite,
                    q = this.offset,
                    m = h.x || 0,
                    f = h.y || 0,
                    g = this.chart.renderer.fontMetrics(h.style && h.style.fontSize, this.axisTitle).f,
                    e = {
                        low: k + (a ? 0 : e),
                        middle: k + e / 2,
                        high: k + (a ? e : 0)
                    }[h.align],
                    b = (a ? c + this.height : b) + (a ? 1 : -1) * (d ? -1 : 1) * this.axisTitleMargin + (2 === this.side ? g : 0);
                return {
                    x: a ? e + m : b + (d ? this.width : 0) + q + m,
                    y: a ? b + f - (d ? this.height : 0) + q : e + f
                }
            },
            render: function() {
                var a = this,
                    b = a.chart,
                    c = b.renderer,
                    e = a.options,
                    h = a.isLog,
                    d = a.lin2log,
                    q = a.isLinked,
                    m = a.tickPositions,
                    f = a.axisTitle,
                    g = a.ticks,
                    w = a.minorTicks,
                    x = a.alternateBands,
                    u = e.stackLabels,
                    G = e.alternateGridColor,
                    C = a.tickmarkOffset,
                    E = a.axisLine,
                    l = b.hasRendered && k(a.oldMin),
                    n = a.showAxis,
                    t = D(c.globalAnimation),
                    H, r;
                a.labelEdge.length = 0;
                a.overlap = !1;
                p([g, w, x], function(a) {
                    for (var b in a) a[b].isActive = !1
                });
                if (a.hasData() || q) a.minorTickInterval && !a.categories && p(a.getMinorTickPositions(), function(b) {
                    w[b] || (w[b] = new M(a, b, "minor"));
                    l && w[b].isNew && w[b].render(null, !0);
                    w[b].render(null, !1, 1)
                }), m.length && (p(m, function(b, c) {
                    if (!q || b >= a.min && b <= a.max) g[b] || (g[b] = new M(a, b)), l && g[b].isNew && g[b].render(c, !0, .1), g[b].render(c)
                }), C && (0 === a.min || a.single) && (g[-1] || (g[-1] = new M(a, - 1, null, !0)), g[-1].render(-1))), G && p(m, function(c, e) {
                    r = void 0 !== m[e + 1] ? m[e + 1] + C : a.max - C;
                    0 === e % 2 && c < a.max && r <= a.max + (b.polar ? -C : C) && (x[c] || (x[c] = new J(a)), H = c + C, x[c].options = {
                        from: h ? d(H) : H,
                        to: h ? d(r) : r,
                        color: G
                    }, x[c].render(), x[c].isActive = !0)
                }), a._addedPlotLB || (p((e.plotLines || []).concat(e.plotBands || []), function(b) {
                    a.addPlotBandOrLine(b)
                }), a._addedPlotLB = !0);
                p([g, w, x], function(a) {
                    var c, e, h = [],
                        k = t.duration;
                    for (c in a) a[c].isActive || (a[c].render(c, !1, 0), a[c].isActive = !1, h.push(c));
                    K(function() {
                        for (e = h.length; e--;) a[h[e]] && !a[h[e]].isActive && (a[h[e]].destroy(), delete a[h[e]])
                    }, a !== x && b.hasRendered && k ? k : 0)
                });
                E && (E[E.isPlaced ? "animate" : "attr"]({
                    d: this.getLinePath(E.strokeWidth())
                }), E.isPlaced = !0, E[n ? "show" : "hide"](!0));
                f && n && (f[f.isNew ? "attr" : "animate"](a.getTitlePosition()), f.isNew = !1);
                u && u.enabled && a.renderStackTotals();
                a.isDirty = !1
            },
            redraw: function() {
                this.visible && (this.render(), p(this.plotLinesAndBands, function(a) {
                    a.render()
                }));
                p(this.series, function(a) {
                    a.isDirty = !0
                })
            },
            destroy: function(a) {
                var b = this,
                    c = b.stacks,
                    e, h = b.plotLinesAndBands,
                    k;
                a || G(b);
                for (e in c) d(c[e]), c[e] = null;
                p([b.ticks, b.minorTicks, b.alternateBands], function(a) {
                    d(a)
                });
                if (h) for (a = h.length; a--;) h[a].destroy();
                p("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "), function(a) {
                    b[a] && (b[a] = b[a].destroy())
                });
                h = ["names", "series", "userMax", "userMin"];
                for (k in b) b.hasOwnProperty(k) && -1 === q(k, h) && delete b[k]
            },
            drawCrosshair: function(a, b) {
                var c, e = this.crosshair,
                    h, k = this.cross;
                a || (a = this.cross && this.cross.e);
                this.crosshair && !1 !== (n(b) || !E(e.snap, !0)) ? (E(e.snap, !0) ? n(b) && (c = this.isXAxis ? b.plotX : this.len - b.plotY) : c = this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos, c = this.isRadial ? this.getPlotLinePath(this.isXAxis ? b.x : E(b.stackY, b.y)) || null : this.getPlotLinePath(null, null, null, null, c) || null, null === c ? this.hideCrosshair() : (h = this.categories && !this.isRadial, k || (this.cross = k = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (h ? "category " : "thin ") + e.className).attr({
                    zIndex: E(e.zIndex, 2)
                }).add(), k.attr({
                    stroke: e.color || (h ? f("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
                    "stroke-width": E(e.width, 1)
                }), e.dashStyle && k.attr({
                    dashstyle: e.dashStyle
                })), k.show().attr({
                    d: c
                }), h && k.attr({
                    "stroke-width": this.transA
                }), this.cross.e = a)) : this.hideCrosshair()
            },
            hideCrosshair: function() {
                this.cross && this.cross.hide()
            }
        };
        m(a.Axis.prototype, l)
    })(I);
    (function(a) {
        var y = a.Axis,
            D = a.getMagnitude,
            B = a.map,
            z = a.normalizeTickInterval,
            l = a.pick;
        y.prototype.getLogTickPositions = function(a, g, r, n) {
            var t = this.options,
                d = this.len,
                p = this.lin2log,
                v = this.log2lin,
                m = [];
            n || (this._minorAutoInterval = null);
            if (.5 <= a) a = Math.round(a), m = this.getLinearTickPositions(a, g, r);
            else if (.08 <= a) for (var d = Math.floor(g), u, e, b, c, q, t = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; d < r + 1 && !q; d++) for (e = t.length, u = 0; u < e && !q; u++) b = v(p(d) * t[u]), b > g && (!n || c <= r) && void 0 !== c && m.push(c), c > r && (q = !0), c = b;
            else g = p(g), r = p(r), a = t[n ? "minorTickInterval" : "tickInterval"], a = l("auto" === a ? null : a, this._minorAutoInterval, t.tickPixelInterval / (n ? 5 : 1) * (r - g) / ((n ? d / this.tickPositions.length : d) || 1)), a = z(a, null, D(a)), m = B(this.getLinearTickPositions(a, g, r), v), n || (this._minorAutoInterval = a / 5);
            n || (this.tickInterval = a);
            return m
        };
        y.prototype.log2lin = function(a) {
            return Math.log(a) / Math.LN10
        };
        y.prototype.lin2log = function(a) {
            return Math.pow(10, a)
        }
    })(I);
    (function(a) {
        var y = a.addEvent,
            D = a.dateFormat,
            B = a.each,
            z = a.extend,
            l = a.format,
            f = a.isNumber,
            g = a.map,
            r = a.merge,
            n = a.pick,
            t = a.splat,
            d = a.stop,
            p = a.syncTimeout,
            v = a.timeUnits;
        a.Tooltip = function() {
            this.init.apply(this, arguments)
        };
        a.Tooltip.prototype = {
            init: function(a, d) {
                this.chart = a;
                this.options = d;
                this.crosshairs = [];
                this.now = {
                    x: 0,
                    y: 0
                };
                this.isHidden = !0;
                this.split = d.split && !a.inverted;
                this.shared = d.shared || this.split;
                this.split ? this.label = this.chart.renderer.g("tooltip") : (this.label = a.renderer.label("", 0, 0, d.shape || "callout", null, null, d.useHTML, null, "tooltip").attr({
                    padding: d.padding,
                    r: d.borderRadius,
                    display: "none"
                }), this.label.attr({
                    fill: d.backgroundColor,
                    "stroke-width": d.borderWidth
                }).css(d.style).shadow(d.shadow));
                this.label.attr({
                    zIndex: 8
                }).add()
            },
            update: function(a) {
                this.destroy();
                this.init(this.chart, r(!0, this.options, a))
            },
            destroy: function() {
                this.label && (this.label = this.label.destroy());
                clearTimeout(this.hideTimer);
                clearTimeout(this.tooltipTimeout)
            },
            move: function(a, d, e, b) {
                var c = this,
                    q = c.now,
                    h = !1 !== c.options.animation && !c.isHidden && (1 < Math.abs(a - q.x) || 1 < Math.abs(d - q.y)),
                    k = c.followPointer || 1 < c.len;
                z(q, {
                    x: h ? (2 * q.x + a) / 3 : a,
                    y: h ? (q.y + d) / 2 : d,
                    anchorX: k ? void 0 : h ? (2 * q.anchorX + e) / 3 : e,
                    anchorY: k ? void 0 : h ? (q.anchorY + b) / 2 : b
                });
                c.label.attr(q);
                h && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() {
                    c && c.move(a, d, e, b)
                }, 32))
            },
            hide: function(a) {
                var d = this;
                clearTimeout(this.hideTimer);
                a = n(a, this.options.hideDelay, 500);
                this.isHidden || (this.hideTimer = p(function() {
                    d.label[a ? "fadeOut" : "hide"]();
                    d.isHidden = !0
                }, a))
            },
            getAnchor: function(a, d) {
                var e, b = this.chart,
                    c = b.inverted,
                    q = b.plotTop,
                    h = b.plotLeft,
                    k = 0,
                    f = 0,
                    p, l;
                a = t(a);
                e = a[0].tooltipPos;
                this.followPointer && d && (void 0 === d.chartX && (d = b.pointer.normalize(d)), e = [d.chartX - b.plotLeft, d.chartY - q]);
                e || (B(a, function(a) {
                    p = a.series.yAxis;
                    l = a.series.xAxis;
                    k += a.plotX + (!c && l ? l.left - h : 0);
                    f += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!c && p ? p.top - q : 0)
                }), k /= a.length, f /= a.length, e = [c ? b.plotWidth - f : k, this.shared && !c && 1 < a.length && d ? d.chartY - q : c ? b.plotHeight - k : f]);
                return g(e, Math.round)
            },
            getPosition: function(a, d, e) {
                var b = this.chart,
                    c = this.distance,
                    q = {}, h = e.h || 0,
                    k, f = ["y", b.chartHeight, d, e.plotY + b.plotTop, b.plotTop, b.plotTop + b.plotHeight],
                    g = ["x", b.chartWidth, a, e.plotX + b.plotLeft, b.plotLeft, b.plotLeft + b.plotWidth],
                    p = !this.followPointer && n(e.ttBelow, !b.inverted === !! e.negative),
                    l = function(a, b, e, k, d, f) {
                        var m = e < k - c,
                            g = k + c + e < b,
                            w = k - c - e;
                        k += c;
                        if (p && g) q[a] = k;
                        else if (!p && m) q[a] = w;
                        else if (m) q[a] = Math.min(f - e, 0 > w - h ? w : w - h);
                        else if (g) q[a] = Math.max(d, k + h + e > b ? k : k + h);
                        else return !1
                    }, t = function(a, b, e, h) {
                        var k;
                        h < c || h > b - c ? k = !1 : q[a] = h < e / 2 ? 1 : h > b - e / 2 ? b - e - 2 : h - e / 2;
                        return k
                    },
                    G = function(a) {
                        var b = f;
                        f = g;
                        g = b;
                        k = a
                    }, x = function() {
                        !1 !== l.apply(0, f) ? !1 !== t.apply(0, g) || k || (G(!0), x()) : k ? q.x = q.y = 0 : (G(!0), x())
                    };
                (b.inverted || 1 < this.len) && G();
                x();
                return q
            },
            defaultFormatter: function(a) {
                var d = this.points || t(this),
                    e;
                e = [a.tooltipFooterHeaderFormatter(d[0])];
                e = e.concat(a.bodyFormatter(d));
                e.push(a.tooltipFooterHeaderFormatter(d[0], !0));
                return e
            },
            refresh: function(a, f) {
                var e = this.chart,
                    b = this.label,
                    c = this.options,
                    q, h, k, g = {}, p, l = [];
                p = c.formatter || this.defaultFormatter;
                var g = e.hoverPoints,
                    E = this.shared;
                clearTimeout(this.hideTimer);
                this.followPointer = t(a)[0].series.tooltipOptions.followPointer;
                k = this.getAnchor(a, f);
                q = k[0];
                h = k[1];
                !E || a.series && a.series.noSharedTooltip ? g = a.getLabelConfig() : (e.hoverPoints = a, g && B(g, function(a) {
                    a.setState()
                }), B(a, function(a) {
                    a.setState("hover");
                    l.push(a.getLabelConfig())
                }), g = {
                    x: a[0].category,
                    y: a[0].y
                }, g.points = l, this.len = l.length, a = a[0]);
                p = p.call(g, this);
                g = a.series;
                this.distance = n(g.tooltipOptions.distance, 16);
                !1 === p ? this.hide() : (this.isHidden && (d(b), b.attr({
                    opacity: 1,
                    display: "block"
                }).show()), this.split ? this.renderSplit(p, e.hoverPoints) : (b.attr({
                    text: p.join ? p.join("") : p
                }), b.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + n(a.colorIndex, g.colorIndex)), b.attr({
                    stroke: c.borderColor || a.color || g.color || "#666666"
                }), this.updatePosition({
                    plotX: q,
                    plotY: h,
                    negative: a.negative,
                    ttBelow: a.ttBelow,
                    h: k[2] || 0
                })), this.isHidden = !1)
            },
            renderSplit: function(d, g) {
                var e = this,
                    b = [],
                    c = this.chart,
                    q = c.renderer,
                    h = !0,
                    k = this.options,
                    f;
                B(d.slice(0, d.length - 1), function(a, d) {
                    var m = g[d - 1] || {
                        isHeader: !0,
                        plotX: g[0].plotX
                    }, p = m.series || e,
                        G = p.tt,
                        x = m.series || {}, l = "highcharts-color-" + n(m.colorIndex, x.colorIndex, "none");
                    G || (p.tt = G = q.label(null, null, null, m.isHeader && "callout").addClass("highcharts-tooltip-box " + l).attr({
                        padding: k.padding,
                        r: k.borderRadius,
                        fill: k.backgroundColor,
                        stroke: m.color || x.color || "#333333",
                        "stroke-width": k.borderWidth
                    }).add(e.label), m.series && (G.connector = q.path().addClass("highcharts-tooltip-connector " + l).attr({
                        "stroke-width": x.options.lineWidth || 2,
                        stroke: m.color || x.color || "#666666"
                    }).add(e.label), y(m.series, "hide", function() {
                        var a = this.tt;
                        a.connector = a.connector.destroy();
                        a.destroy();
                        this.tt = void 0
                    })));
                    G.isActive = !0;
                    G.attr({
                        text: a
                    });
                    x = G.getBBox();
                    m.isHeader ? (f = x.height, l = m.plotX + c.plotLeft - x.width / 2) : l = m.plotX + c.plotLeft - n(k.distance, 16) - x.width;
                    0 > l && (h = !1);
                    x = (m.series && m.series.yAxis && m.series.yAxis.pos) + (m.plotY || 0);
                    x -= c.plotTop;
                    b.push({
                        target: m.isHeader ? c.plotHeight + f : x,
                        rank: m.isHeader ? 1 : 0,
                        size: p.tt.getBBox().height + 1,
                        point: m,
                        x: l,
                        tt: G
                    })
                });
                B(c.series, function(a) {
                    var b = a.tt;
                    b && (b.isActive ? b.isActive = !1 : (b.connector = b.connector.destroy(), b.destroy(), a.tt = void 0))
                });
                a.distribute(b, c.plotHeight + f);
                B(b, function(a) {
                    var b = a.point,
                        e = a.tt,
                        d;
                    d = {
                        display: void 0 === a.pos ? "none" : "",
                        x: h || b.isHeader ? a.x : b.plotX + c.plotLeft + n(k.distance, 16),
                        y: a.pos + c.plotTop
                    };
                    b.isHeader && (d.anchorX = b.plotX + c.plotLeft, d.anchorY = d.y - 100);
                    e.attr(d);
                    b.isHeader || e.connector.attr({
                        d: ["M", b.plotX + c.plotLeft, b.plotY + b.series.yAxis.pos, "L", h ? b.plotX + c.plotLeft - n(k.distance, 16) : b.plotX + c.plotLeft + n(k.distance,
                        16), a.pos + c.plotTop + e.getBBox().height / 2]
                    })
                })
            },
            updatePosition: function(a) {
                var d = this.chart,
                    e = this.label,
                    e = (this.options.positioner || this.getPosition).call(this, e.width, e.height, a);
                this.move(Math.round(e.x), Math.round(e.y || 0), a.plotX + d.plotLeft, a.plotY + d.plotTop)
            },
            getXDateFormat: function(a, d, e) {
                var b;
                d = d.dateTimeLabelFormats;
                var c = e && e.closestPointRange,
                    q, h = {
                        millisecond: 15,
                        second: 12,
                        minute: 9,
                        hour: 6,
                        day: 3
                    }, k, g = "millisecond";
                if (c) {
                    k = D("%m-%d %H:%M:%S.%L", a.x);
                    for (q in v) {
                        if (c === v.week && +D("%w", a.x) === e.options.startOfWeek && "00:00:00.000" === k.substr(6)) {
                            q = "week";
                            break
                        }
                        if (v[q] > c) {
                            q = g;
                            break
                        }
                        if (h[q] && k.substr(h[q]) !== "01-01 00:00:00.000".substr(h[q])) break;
                        "week" !== q && (g = q)
                    }
                    q && (b = d[q])
                } else b = d.day;
                return b || d.year
            },
            tooltipFooterHeaderFormatter: function(a, d) {
                var e = d ? "footer" : "header",
                    b = a.series,
                    c = b.tooltipOptions,
                    q = c.xDateFormat,
                    h = b.xAxis,
                    k = h && "datetime" === h.options.type && f(a.key),
                    e = c[e + "Format"];
                k && !q && (q = this.getXDateFormat(a, c, h));
                k && q && (e = e.replace("{point.key}", "{point.key:" + q + "}"));
                return l(e, {
                    point: a,
                    series: b
                })
            },
            bodyFormatter: function(a) {
                return g(a, function(a) {
                    var e = a.series.tooltipOptions;
                    return (e.pointFormatter || a.point.tooltipFormatter).call(a.point, e.pointFormat)
                })
            }
        }
    })(I);
    (function(a) {
        var y = a.addEvent,
            D = a.attr,
            B = a.charts,
            z = a.color,
            l = a.css,
            f = a.defined,
            g = a.doc,
            r = a.each,
            n = a.extend,
            t = a.fireEvent,
            d = a.offset,
            p = a.pick,
            v = a.removeEvent,
            m = a.splat,
            u = a.Tooltip,
            e = a.win;
        a.hasTouch = g && void 0 !== g.documentElement.ontouchstart;
        a.Pointer = function(a, c) {
            this.init(a, c)
        };
        a.Pointer.prototype = {
            init: function(a,
            c) {
                this.options = c;
                this.chart = a;
                this.runChartClick = c.chart.events && !! c.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                u && c.tooltip.enabled && (a.tooltip = new u(a, c.tooltip), this.followTouchMove = p(c.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            },
            zoomOption: function() {
                var a = this.chart,
                    c = a.options.chart.zoomType,
                    e = /x/.test(c),
                    c = /y/.test(c),
                    a = a.inverted;
                this.zoomX = e;
                this.zoomY = c;
                this.zoomHor = e && !a || c && a;
                this.zoomVert = c && !a || e && a;
                this.hasZoom = e || c
            },
            normalize: function(a, c) {
                var q, h;
                a = a || e.event;
                a.target || (a.target = a.srcElement);
                h = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
                c || (this.chartPosition = c = d(this.chart.container));
                void 0 === h.pageX ? (q = Math.max(a.x, a.clientX - c.left), h = a.y) : (q = h.pageX - c.left, h = h.pageY - c.top);
                return n(a, {
                    chartX: Math.round(q),
                    chartY: Math.round(h)
                })
            },
            getCoordinates: function(a) {
                var c = {
                    xAxis: [],
                    yAxis: []
                };
                r(this.chart.axes, function(e) {
                    c[e.isXAxis ? "xAxis" : "yAxis"].push({
                        axis: e,
                        value: e.toValue(a[e.horiz ? "chartX" : "chartY"])
                    })
                });
                return c
            },
            runPointActions: function(b) {
                var c = this.chart,
                    e = c.series,
                    h = c.tooltip,
                    k = h ? h.shared : !1,
                    d = !0,
                    f = c.hoverPoint,
                    m = c.hoverSeries,
                    l, n, G, x = [],
                    u;
                if (!k && !m) for (l = 0; l < e.length; l++) if (e[l].directTouch || !e[l].options.stickyTracking) e = [];
                m && (k ? m.noSharedTooltip : m.directTouch) && f ? x = [f] : (k || !m || m.options.stickyTracking || (e = [m]), r(e, function(a) {
                    n = a.noSharedTooltip && k;
                    G = !k && a.directTouch;
                    a.visible && !n && !G && p(a.options.enableMouseTracking, !0) && (u = a.searchPoint(b, !n && 1 === a.kdDimensions)) && u.series && x.push(u)
                }), x.sort(function(a, b) {
                    var c = a.distX - b.distX,
                        e = a.dist - b.dist;
                    return 0 !== c ? c : 0 !== e ? e : a.series.group.zIndex > b.series.group.zIndex ? -1 : 1
                }));
                if (k) for (l = x.length; l--;)(x[l].clientX !== x[0].clientX || x[l].series.noSharedTooltip) && x.splice(l, 1);
                if (x[0] && (x[0] !== this.hoverPoint || h && h.isHidden)) {
                    if (k && !x[0].series.noSharedTooltip) {
                        for (l = 0; 0 <= l; l--) x[l].onMouseOver(b, x[l] !== (m && m.directTouch && f || x[0]));
                        if (m && m.directTouch && f && f !== x[0]) f.onMouseOver(b, !1);
                        x.length && h && h.refresh(x.sort(function(a, b) {
                            return a.series.index - b.series.index
                        }), b)
                    } else if (h && h.refresh(x[0],
                    b), !m || !m.directTouch) x[0].onMouseOver(b);
                    this.prevKDPoint = x[0];
                    d = !1
                }
                d && (e = m && m.tooltipOptions.followPointer, h && e && !h.isHidden && (e = h.getAnchor([{}], b), h.updatePosition({
                    plotX: e[0],
                    plotY: e[1]
                })));
                this._onDocumentMouseMove || (this._onDocumentMouseMove = function(b) {
                    if (B[a.hoverChartIndex]) B[a.hoverChartIndex].pointer.onDocumentMouseMove(b)
                }, y(g, "mousemove", this._onDocumentMouseMove));
                r(k ? x : [p(f, x[0])], function(a) {
                    r(c.axes, function(c) {
                        (!a || a.series && a.series[c.coll] === c) && c.drawCrosshair(b, a)
                    })
                })
            },
            reset: function(a,
            c) {
                var e = this.chart,
                    h = e.hoverSeries,
                    k = e.hoverPoint,
                    d = e.hoverPoints,
                    f = e.tooltip,
                    p = f && f.shared ? d : k;
                a && p && r(m(p), function(c) {
                    c.series.isCartesian && void 0 === c.plotX && (a = !1)
                });
                if (a) f && p && (f.refresh(p), k && (k.setState(k.state, !0), r(e.axes, function(a) {
                    a.crosshair && a.drawCrosshair(null, k)
                })));
                else {
                    if (k) k.onMouseOut();
                    d && r(d, function(a) {
                        a.setState()
                    });
                    if (h) h.onMouseOut();
                    f && f.hide(c);
                    this._onDocumentMouseMove && (v(g, "mousemove", this._onDocumentMouseMove), this._onDocumentMouseMove = null);
                    r(e.axes, function(a) {
                        a.hideCrosshair()
                    });
                    this.hoverX = this.prevKDPoint = e.hoverPoints = e.hoverPoint = null
                }
            },
            scaleGroups: function(a, c) {
                var e = this.chart,
                    h;
                r(e.series, function(k) {
                    h = a || k.getPlotBox();
                    k.xAxis && k.xAxis.zoomEnabled && (k.group.attr(h), k.markerGroup && (k.markerGroup.attr(h), k.markerGroup.clip(c ? e.clipRect : null)), k.dataLabelsGroup && k.dataLabelsGroup.attr(h))
                });
                e.clipRect.attr(c || e.clipBox)
            },
            dragStart: function(a) {
                var c = this.chart;
                c.mouseIsDown = a.type;
                c.cancelClick = !1;
                c.mouseDownX = this.mouseDownX = a.chartX;
                c.mouseDownY = this.mouseDownY = a.chartY
            },
            drag: function(a) {
                var c = this.chart,
                    e = c.options.chart,
                    h = a.chartX,
                    k = a.chartY,
                    d = this.zoomHor,
                    f = this.zoomVert,
                    g = c.plotLeft,
                    m = c.plotTop,
                    p = c.plotWidth,
                    l = c.plotHeight,
                    x, n = this.selectionMarker,
                    u = this.mouseDownX,
                    A = this.mouseDownY,
                    t = e.panKey && a[e.panKey + "Key"];
                n && n.touch || (h < g ? h = g : h > g + p && (h = g + p), k < m ? k = m : k > m + l && (k = m + l), this.hasDragged = Math.sqrt(Math.pow(u - h, 2) + Math.pow(A - k, 2)), 10 < this.hasDragged && (x = c.isInsidePlot(u - g, A - m), c.hasCartesianSeries && (this.zoomX || this.zoomY) && x && !t && !n && (this.selectionMarker = n = c.renderer.rect(g,
                m, d ? 1 : p, f ? 1 : l, 0).attr({
                    fill: e.selectionMarkerFill || z("#335cad").setOpacity(.25).get(),
                    "class": "highcharts-selection-marker",
                    zIndex: 7
                }).add()), n && d && (h -= u, n.attr({
                    width: Math.abs(h),
                    x: (0 < h ? 0 : h) + u
                })), n && f && (h = k - A, n.attr({
                    height: Math.abs(h),
                    y: (0 < h ? 0 : h) + A
                })), x && !n && e.panning && c.pan(a, e.panning)))
            },
            drop: function(a) {
                var c = this,
                    e = this.chart,
                    h = this.hasPinched;
                if (this.selectionMarker) {
                    var k = {
                        originalEvent: a,
                        xAxis: [],
                        yAxis: []
                    }, d = this.selectionMarker,
                        g = d.attr ? d.attr("x") : d.x,
                        m = d.attr ? d.attr("y") : d.y,
                        p = d.attr ? d.attr("width") : d.width,
                        u = d.attr ? d.attr("height") : d.height,
                        G;
                    if (this.hasDragged || h) r(e.axes, function(e) {
                        if (e.zoomEnabled && f(e.min) && (h || c[{
                            xAxis: "zoomX",
                            yAxis: "zoomY"
                        }[e.coll]])) {
                            var d = e.horiz,
                                q = "touchend" === a.type ? e.minPixelPadding : 0,
                                w = e.toValue((d ? g : m) + q),
                                d = e.toValue((d ? g + p : m + u) - q);
                            k[e.coll].push({
                                axis: e,
                                min: Math.min(w, d),
                                max: Math.max(w, d)
                            });
                            G = !0
                        }
                    }), G && t(e, "selection", k, function(a) {
                        e.zoom(n(a, h ? {
                            animation: !1
                        } : null))
                    });
                    this.selectionMarker = this.selectionMarker.destroy();
                    h && this.scaleGroups()
                }
                e && (l(e.container, {
                    cursor: e._cursor
                }), e.cancelClick = 10 < this.hasDragged, e.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            },
            onContainerMouseDown: function(a) {
                a = this.normalize(a);
                this.zoomOption();
                a.preventDefault && a.preventDefault();
                this.dragStart(a)
            },
            onDocumentMouseUp: function(b) {
                B[a.hoverChartIndex] && B[a.hoverChartIndex].pointer.drop(b)
            },
            onDocumentMouseMove: function(a) {
                var c = this.chart,
                    e = this.chartPosition;
                a = this.normalize(a, e);
                !e || this.inClass(a.target, "highcharts-tracker") || c.isInsidePlot(a.chartX - c.plotLeft, a.chartY - c.plotTop) || this.reset()
            },
            onContainerMouseLeave: function(b) {
                var c = B[a.hoverChartIndex];
                c && (b.relatedTarget || b.toElement) && (c.pointer.reset(), c.pointer.chartPosition = null)
            },
            onContainerMouseMove: function(b) {
                var c = this.chart;
                f(a.hoverChartIndex) && B[a.hoverChartIndex] && B[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = c.index);
                b = this.normalize(b);
                b.returnValue = !1;
                "mousedown" === c.mouseIsDown && this.drag(b);
                !this.inClass(b.target, "highcharts-tracker") && !c.isInsidePlot(b.chartX - c.plotLeft,
                b.chartY - c.plotTop) || c.openMenu || this.runPointActions(b)
            },
            inClass: function(a, c) {
                for (var e; a;) {
                    if (e = D(a, "class")) {
                        if (-1 !== e.indexOf(c)) return !0;
                        if (-1 !== e.indexOf("highcharts-container")) return !1
                    }
                    a = a.parentNode
                }
            },
            onTrackerMouseOut: function(a) {
                var c = this.chart.hoverSeries;
                a = a.relatedTarget || a.toElement;
                if (c && a && !c.options.stickyTracking && !this.inClass(a, "highcharts-tooltip") && !this.inClass(a, "highcharts-series-" + c.index)) c.onMouseOut()
            },
            onContainerClick: function(a) {
                var c = this.chart,
                    e = c.hoverPoint,
                    h = c.plotLeft,
                    k = c.plotTop;
                a = this.normalize(a);
                c.cancelClick || (e && this.inClass(a.target, "highcharts-tracker") ? (t(e.series, "click", n(a, {
                    point: e
                })), c.hoverPoint && e.firePointEvent("click", a)) : (n(a, this.getCoordinates(a)), c.isInsidePlot(a.chartX - h, a.chartY - k) && t(c, "click", a)))
            },
            setDOMEvents: function() {
                var b = this,
                    c = b.chart.container;
                c.onmousedown = function(a) {
                    b.onContainerMouseDown(a)
                };
                c.onmousemove = function(a) {
                    b.onContainerMouseMove(a)
                };
                c.onclick = function(a) {
                    b.onContainerClick(a)
                };
                y(c, "mouseleave", b.onContainerMouseLeave);
                1 === a.chartCount && y(g, "mouseup", b.onDocumentMouseUp);
                a.hasTouch && (c.ontouchstart = function(a) {
                    b.onContainerTouchStart(a)
                }, c.ontouchmove = function(a) {
                    b.onContainerTouchMove(a)
                }, 1 === a.chartCount && y(g, "touchend", b.onDocumentTouchEnd))
            },
            destroy: function() {
                var b;
                v(this.chart.container, "mouseleave", this.onContainerMouseLeave);
                a.chartCount || (v(g, "mouseup", this.onDocumentMouseUp), v(g, "touchend", this.onDocumentTouchEnd));
                clearInterval(this.tooltipTimeout);
                for (b in this) this[b] = null
            }
        }
    })(I);
    (function(a) {
        var y = a.charts,
            D = a.each,
            B = a.extend,
            z = a.map,
            l = a.noop,
            f = a.pick;
        B(a.Pointer.prototype, {
            pinchTranslate: function(a, f, l, t, d, p) {
                (this.zoomHor || this.pinchHor) && this.pinchTranslateDirection(!0, a, f, l, t, d, p);
                (this.zoomVert || this.pinchVert) && this.pinchTranslateDirection(!1, a, f, l, t, d, p)
            },
            pinchTranslateDirection: function(a, f, l, t, d, p, v, m) {
                var u = this.chart,
                    e = a ? "x" : "y",
                    b = a ? "X" : "Y",
                    c = "chart" + b,
                    q = a ? "width" : "height",
                    h = u["plot" + (a ? "Left" : "Top")],
                    k, w, C = m || 1,
                    H = u.inverted,
                    E = u.bounds[a ? "h" : "v"],
                    J = 1 === f.length,
                    G = f[0][c],
                    x = l[0][c],
                    K = !J && f[1][c],
                    M = !J && l[1][c],
                    A;
                l = function() {
                    !J && 20 < Math.abs(G - K) && (C = m || Math.abs(x - M) / Math.abs(G - K));
                    w = (h - x) / C + G;
                    k = u["plot" + (a ? "Width" : "Height")] / C
                };
                l();
                f = w;
                f < E.min ? (f = E.min, A = !0) : f + k > E.max && (f = E.max - k, A = !0);
                A ? (x -= .8 * (x - v[e][0]), J || (M -= .8 * (M - v[e][1])), l()) : v[e] = [x, M];
                H || (p[e] = w - h, p[q] = k);
                p = H ? 1 / C : C;
                d[q] = k;
                d[e] = f;
                t[H ? a ? "scaleY" : "scaleX" : "scale" + b] = C;
                t["translate" + b] = p * h + (x - p * G)
            },
            pinch: function(a) {
                var r = this,
                    n = r.chart,
                    t = r.pinchDown,
                    d = a.touches,
                    p = d.length,
                    v = r.lastValidTouch,
                    m = r.hasZoom,
                    u = r.selectionMarker,
                    e = {}, b = 1 === p && (r.inClass(a.target, "highcharts-tracker") && n.runTrackerClick || r.runChartClick),
                    c = {};
                1 < p && (r.initiated = !0);
                m && r.initiated && !b && a.preventDefault();
                z(d, function(a) {
                    return r.normalize(a)
                });
                "touchstart" === a.type ? (D(d, function(a, b) {
                    t[b] = {
                        chartX: a.chartX,
                        chartY: a.chartY
                    }
                }), v.x = [t[0].chartX, t[1] && t[1].chartX], v.y = [t[0].chartY, t[1] && t[1].chartY], D(n.axes, function(a) {
                    if (a.zoomEnabled) {
                        var b = n.bounds[a.horiz ? "h" : "v"],
                            c = a.minPixelPadding,
                            e = a.toPixels(f(a.options.min, a.dataMin)),
                            d = a.toPixels(f(a.options.max,
                            a.dataMax)),
                            g = Math.max(e, d);
                        b.min = Math.min(a.pos, Math.min(e, d) - c);
                        b.max = Math.max(a.pos + a.len, g + c)
                    }
                }), r.res = !0) : t.length && (u || (r.selectionMarker = u = B({
                    destroy: l,
                    touch: !0
                }, n.plotBox)), r.pinchTranslate(t, d, e, u, c, v), r.hasPinched = m, r.scaleGroups(e, c), !m && r.followTouchMove && 1 === p ? this.runPointActions(r.normalize(a)) : r.res && (r.res = !1, this.reset(!1, 0)))
            },
            touch: function(g, l) {
                var n = this.chart,
                    t;
                a.hoverChartIndex = n.index;
                1 === g.touches.length ? (g = this.normalize(g), n.isInsidePlot(g.chartX - n.plotLeft, g.chartY - n.plotTop) && !n.openMenu ? (l && this.runPointActions(g), "touchmove" === g.type && (n = this.pinchDown, t = n[0] ? 4 <= Math.sqrt(Math.pow(n[0].chartX - g.chartX, 2) + Math.pow(n[0].chartY - g.chartY, 2)) : !1), f(t, !0) && this.pinch(g)) : l && this.reset()) : 2 === g.touches.length && this.pinch(g)
            },
            onContainerTouchStart: function(a) {
                this.zoomOption();
                this.touch(a, !0)
            },
            onContainerTouchMove: function(a) {
                this.touch(a)
            },
            onDocumentTouchEnd: function(f) {
                y[a.hoverChartIndex] && y[a.hoverChartIndex].pointer.drop(f)
            }
        })
    })(I);
    (function(a) {
        var y = a.addEvent,
            D = a.charts,
            B = a.css,
            z = a.doc,
            l = a.extend,
            f = a.noop,
            g = a.Pointer,
            r = a.removeEvent,
            n = a.win,
            t = a.wrap;
        if (n.PointerEvent || n.MSPointerEvent) {
            var d = {}, p = !! n.PointerEvent,
                v = function() {
                    var a, e = [];
                    e.item = function(a) {
                        return this[a]
                    };
                    for (a in d) d.hasOwnProperty(a) && e.push({
                        pageX: d[a].pageX,
                        pageY: d[a].pageY,
                        target: d[a].target
                    });
                    return e
                }, m = function(d, e, b, c) {
                    "touch" !== d.pointerType && d.pointerType !== d.MSPOINTER_TYPE_TOUCH || !D[a.hoverChartIndex] || (c(d), c = D[a.hoverChartIndex].pointer, c[e]({
                        type: b,
                        target: d.currentTarget,
                        preventDefault: f,
                        touches: v()
                    }))
                };
            l(g.prototype, {
                onContainerPointerDown: function(a) {
                    m(a, "onContainerTouchStart", "touchstart", function(a) {
                        d[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY,
                            target: a.currentTarget
                        }
                    })
                },
                onContainerPointerMove: function(a) {
                    m(a, "onContainerTouchMove", "touchmove", function(a) {
                        d[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY
                        };
                        d[a.pointerId].target || (d[a.pointerId].target = a.currentTarget)
                    })
                },
                onDocumentPointerUp: function(a) {
                    m(a, "onDocumentTouchEnd", "touchend", function(a) {
                        delete d[a.pointerId]
                    })
                },
                batchMSEvents: function(a) {
                    a(this.chart.container,
                    p ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                    a(this.chart.container, p ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                    a(z, p ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                }
            });
            t(g.prototype, "init", function(a, e, b) {
                a.call(this, e, b);
                this.hasZoom && B(e.container, {
                    "-ms-touch-action": "none",
                    "touch-action": "none"
                })
            });
            t(g.prototype, "setDOMEvents", function(a) {
                a.apply(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(y)
            });
            t(g.prototype, "destroy", function(a) {
                this.batchMSEvents(r);
                a.call(this)
            })
        }
    })(I);
    (function(a) {
        var y, D = a.addEvent,
            B = a.css,
            z = a.discardElement,
            l = a.defined,
            f = a.each,
            g = a.extend,
            r = a.isFirefox,
            n = a.marginNames,
            t = a.merge,
            d = a.pick,
            p = a.setAnimation,
            v = a.stableSort,
            m = a.win,
            u = a.wrap;
        y = a.Legend = function(a, b) {
            this.init(a, b)
        };
        y.prototype = {
            init: function(a, b) {
                this.chart = a;
                this.setOptions(b);
                b.enabled && (this.render(), D(this.chart, "endResize", function() {
                    this.legend.positionCheckboxes()
                }))
            },
            setOptions: function(a) {
                var b = d(a.padding, 8);
                this.options = a;
                this.itemStyle = a.itemStyle;
                this.itemHiddenStyle = t(this.itemStyle, a.itemHiddenStyle);
                this.itemMarginTop = a.itemMarginTop || 0;
                this.initialItemX = this.padding = b;
                this.initialItemY = b - 5;
                this.itemHeight = this.maxItemWidth = 0;
                this.symbolWidth = d(a.symbolWidth, 16);
                this.pages = []
            },
            update: function(a, b) {
                var c = this.chart;
                this.setOptions(t(!0, this.options, a));
                this.destroy();
                c.isDirtyLegend = c.isDirtyBox = !0;
                d(b, !0) && c.redraw()
            },
            colorizeItem: function(a, b) {
                a.legendGroup[b ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                var c = this.options,
                    d = a.legendItem,
                    h = a.legendLine,
                    k = a.legendSymbol,
                    f = this.itemHiddenStyle.color,
                    c = b ? c.itemStyle.color : f,
                    m = b ? a.color || f : f,
                    g = a.options && a.options.marker,
                    p = {
                        fill: m
                    }, l;
                d && d.css({
                    fill: c,
                    color: c
                });
                h && h.attr({
                    stroke: m
                });
                if (k) {
                    if (g && k.isMarker && (p = a.pointAttribs(), !b)) for (l in p) p[l] = f;
                    k.attr(p)
                }
            },
            positionItem: function(a) {
                var b = this.options,
                    c = b.symbolPadding,
                    b = !b.rtl,
                    d = a._legendItemPos,
                    h = d[0],
                    d = d[1],
                    k = a.checkbox;
                (a = a.legendGroup) && a.element && a.translate(b ? h : this.legendWidth - h - 2 * c - 4, d);
                k && (k.x = h, k.y = d)
            },
            destroyItem: function(a) {
                var b = a.checkbox;
                f(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function(b) {
                    a[b] && (a[b] = a[b].destroy())
                });
                b && z(a.checkbox)
            },
            destroy: function() {
                var a = this.group,
                    b = this.box;
                b && (this.box = b.destroy());
                f(this.getAllItems(), function(a) {
                    f(["legendItem", "legendGroup"], function(b) {
                        a[b] && (a[b] = a[b].destroy())
                    })
                });
                a && (this.group = a.destroy())
            },
            positionCheckboxes: function(a) {
                var b = this.group.alignAttr,
                    c, d = this.clipHeight || this.legendHeight,
                    h = this.titleHeight;
                b && (c = b.translateY, f(this.allItems, function(k) {
                    var f = k.checkbox,
                        m;
                    f && (m = c + h + f.y + (a || 0) + 3, B(f, {
                        left: b.translateX + k.checkboxOffset + f.x - 20 + "px",
                        top: m + "px",
                        display: m > c - 6 && m < c + d - 6 ? "" : "none"
                    }))
                }))
            },
            renderTitle: function() {
                var a = this.padding,
                    b = this.options.title,
                    c = 0;
                b.text && (this.title || (this.title = this.chart.renderer.label(b.text, a - 3, a - 4, null, null, null, null, null, "legend-title").attr({
                    zIndex: 1
                }).css(b.style).add(this.group)), a = this.title.getBBox(), c = a.height, this.offsetWidth = a.width, this.contentGroup.attr({
                    translateY: c
                }));
                this.titleHeight = c
            },
            setText: function(e) {
                var b = this.options;
                e.legendItem.attr({
                    text: b.labelFormat ? a.format(b.labelFormat, e) : b.labelFormatter.call(e)
                })
            },
            renderItem: function(a) {
                var b = this.chart,
                    c = b.renderer,
                    f = this.options,
                    h = "horizontal" === f.layout,
                    k = this.symbolWidth,
                    m = f.symbolPadding,
                    g = this.itemStyle,
                    p = this.itemHiddenStyle,
                    l = this.padding,
                    n = h ? d(f.itemDistance, 20) : 0,
                    G = !f.rtl,
                    x = f.width,
                    u = f.itemMarginBottom || 0,
                    r = this.itemMarginTop,
                    A = this.initialItemX,
                    v = a.legendItem,
                    L = !a.series,
                    z = !L && a.series.drawLegendSymbol ? a.series : a,
                    y = z.options,
                    y = this.createCheckboxForItem && y && y.showCheckbox,
                    Q = f.useHTML;
                v || (a.legendGroup = c.g("legend-item").addClass("highcharts-" + z.type + "-series highcharts-color-" + a.colorIndex + " " + (a.options.className || "") + (L ? "highcharts-series-" + a.index : "")).attr({
                    zIndex: 1
                }).add(this.scrollGroup), a.legendItem = v = c.text("", G ? k + m : -m, this.baseline || 0, Q).css(t(a.visible ? g : p)).attr({
                    align: G ? "left" : "right",
                    zIndex: 2
                }).add(a.legendGroup), this.baseline || (g = g.fontSize, this.fontMetrics = c.fontMetrics(g, v), this.baseline = this.fontMetrics.f + 3 + r, v.attr("y", this.baseline)),
                z.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, v, Q), y && this.createCheckboxForItem(a));
                this.colorizeItem(a, a.visible);
                this.setText(a);
                c = v.getBBox();
                k = a.checkboxOffset = f.itemWidth || a.legendItemWidth || k + m + c.width + n + (y ? 20 : 0);
                this.itemHeight = m = Math.round(a.legendItemHeight || c.height);
                h && this.itemX - A + k > (x || b.chartWidth - 2 * l - A - f.x) && (this.itemX = A, this.itemY += r + this.lastLineHeight + u, this.lastLineHeight = 0);
                this.maxItemWidth = Math.max(this.maxItemWidth, k);
                this.lastItemY = r + this.itemY + u;
                this.lastLineHeight = Math.max(m, this.lastLineHeight);
                a._legendItemPos = [this.itemX, this.itemY];
                h ? this.itemX += k : (this.itemY += r + m + u, this.lastLineHeight = m);
                this.offsetWidth = x || Math.max((h ? this.itemX - A - n : k) + l, this.offsetWidth)
            },
            getAllItems: function() {
                var a = [];
                f(this.chart.series, function(b) {
                    var c = b && b.options;
                    b && d(c.showInLegend, l(c.linkedTo) ? !1 : void 0, !0) && (a = a.concat(b.legendItems || ("point" === c.legendType ? b.data : b)))
                });
                return a
            },
            adjustMargins: function(a, b) {
                var c = this.chart,
                    m = this.options,
                    h = m.align.charAt(0) + m.verticalAlign.charAt(0) + m.layout.charAt(0);
                m.floating || f([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function(k, f) {
                    k.test(h) && !l(a[f]) && (c[n[f]] = Math.max(c[n[f]], c.legend[(f + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, - 1, - 1, 1][f] * m[f % 2 ? "x" : "y"] + d(m.margin, 12) + b[f]))
                })
            },
            render: function() {
                var a = this,
                    b = a.chart,
                    c = b.renderer,
                    d = a.group,
                    h, k, m, p, l = a.box,
                    n = a.options,
                    u = a.padding;
                a.itemX = a.initialItemX;
                a.itemY = a.initialItemY;
                a.offsetWidth = 0;
                a.lastItemY = 0;
                d || (a.group = d = c.g("legend").attr({
                    zIndex: 7
                }).add(), a.contentGroup = c.g().attr({
                    zIndex: 1
                }).add(d), a.scrollGroup = c.g().add(a.contentGroup));
                a.renderTitle();
                h = a.getAllItems();
                v(h, function(a, b) {
                    return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
                });
                n.reversed && h.reverse();
                a.allItems = h;
                a.display = k = !! h.length;
                a.lastLineHeight = 0;
                f(h, function(b) {
                    a.renderItem(b)
                });
                m = (n.width || a.offsetWidth) + u;
                p = a.lastItemY + a.lastLineHeight + a.titleHeight;
                p = a.handleOverflow(p);
                p += u;
                l || (a.box = l = c.rect().addClass("highcharts-legend-box").attr({
                    r: n.borderRadius
                }).add(d),
                l.isNew = !0);
                l.attr({
                    stroke: n.borderColor,
                    "stroke-width": n.borderWidth || 0,
                    fill: n.backgroundColor || "none"
                }).shadow(n.shadow);
                0 < m && 0 < p && (l[l.isNew ? "attr" : "animate"](l.crisp({
                    x: 0,
                    y: 0,
                    width: m,
                    height: p
                }, l.strokeWidth())), l.isNew = !1);
                l[k ? "show" : "hide"]();
                a.legendWidth = m;
                a.legendHeight = p;
                f(h, function(b) {
                    a.positionItem(b)
                });
                k && d.align(g({
                    width: m,
                    height: p
                }, n), !0, "spacingBox");
                b.isResizing || this.positionCheckboxes()
            },
            handleOverflow: function(a) {
                var b = this,
                    c = this.chart,
                    m = c.renderer,
                    h = this.options,
                    k = h.y,
                    k = c.spacingBox.height + ("top" === h.verticalAlign ? -k : k) - this.padding,
                    g = h.maxHeight,
                    p, l = this.clipRect,
                    n = h.navigation,
                    u = d(n.animation, !0),
                    G = n.arrowSize || 12,
                    x = this.nav,
                    t = this.pages,
                    r = this.padding,
                    A, v = this.allItems,
                    z = function(a) {
                        l.attr({
                            height: a
                        });
                        b.contentGroup.div && (b.contentGroup.div.style.clip = "rect(" + r + "px,9999px," + (r + a) + "px,0)")
                    };
                "horizontal" === h.layout && (k /= 2);
                g && (k = Math.min(k, g));
                t.length = 0;
                a > k && !1 !== n.enabled ? (this.clipHeight = p = Math.max(k - 20 - this.titleHeight - r, 0), this.currentPage = d(this.currentPage, 1), this.fullHeight = a, f(v, function(a, b) {
                    var c = a._legendItemPos[1],
                        e = Math.round(a.legendItem.getBBox().height),
                        h = t.length;
                    if (!h || c - t[h - 1] > p && (A || c) !== t[h - 1]) t.push(A || c), h++;
                    b === v.length - 1 && c + e - t[h - 1] > p && t.push(c);
                    c !== A && (A = c)
                }), l || (l = b.clipRect = m.clipRect(0, r, 9999, 0), b.contentGroup.clip(l)), z(p), x || (this.nav = x = m.g().attr({
                    zIndex: 1
                }).add(this.group), this.up = m.symbol("triangle", 0, 0, G, G).on("click", function() {
                    b.scroll(-1, u)
                }).add(x), this.pager = m.text("", 15, 10).addClass("highcharts-legend-navigation").css(n.style).add(x),
                this.down = m.symbol("triangle-down", 0, 0, G, G).on("click", function() {
                    b.scroll(1, u)
                }).add(x)), b.scroll(0), a = k) : x && (z(c.chartHeight), x.hide(), this.scrollGroup.attr({
                    translateY: 1
                }), this.clipHeight = 0);
                return a
            },
            scroll: function(a, b) {
                var c = this.pages,
                    d = c.length,
                    h = this.currentPage + a,
                    k = this.clipHeight,
                    f = this.options.navigation,
                    m = this.pager,
                    g = this.padding;
                h > d && (h = d);
                0 < h && (void 0 !== b && p(b, this.chart), this.nav.attr({
                    translateX: g,
                    translateY: k + this.padding + 7 + this.titleHeight,
                    visibility: "visible"
                }), this.up.attr({
                    "class": 1 === h ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                }), m.attr({
                    text: h + "/" + d
                }), this.down.attr({
                    x: 18 + this.pager.getBBox().width,
                    "class": h === d ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                }), this.up.attr({
                    fill: 1 === h ? f.inactiveColor : f.activeColor
                }).css({
                    cursor: 1 === h ? "default" : "pointer"
                }), this.down.attr({
                    fill: h === d ? f.inactiveColor : f.activeColor
                }).css({
                    cursor: h === d ? "default" : "pointer"
                }), c = -c[h - 1] + this.initialItemY, this.scrollGroup.animate({
                    translateY: c
                }), this.currentPage = h, this.positionCheckboxes(c))
            }
        };
        a.LegendSymbolMixin = {
            drawRectangle: function(a, b) {
                var c = a.options,
                    f = c.symbolHeight || a.fontMetrics.f,
                    c = c.squareSymbol;
                b.legendSymbol = this.chart.renderer.rect(c ? (a.symbolWidth - f) / 2 : 0, a.baseline - f + 1, c ? f : a.symbolWidth, f, d(a.options.symbolRadius, f / 2)).addClass("highcharts-point").attr({
                    zIndex: 3
                }).add(b.legendGroup)
            },
            drawLineMarker: function(a) {
                var b = this.options,
                    c = b.marker,
                    d = a.symbolWidth,
                    h = this.chart.renderer,
                    k = this.legendGroup;
                a = a.baseline - Math.round(.3 * a.fontMetrics.b);
                var f;
                f = {
                    "stroke-width": b.lineWidth || 0
                };
                b.dashStyle && (f.dashstyle = b.dashStyle);
                this.legendLine = h.path(["M", 0, a, "L", d, a]).addClass("highcharts-graph").attr(f).add(k);
                c && !1 !== c.enabled && (b = c.radius, this.legendSymbol = c = h.symbol(this.symbol, d / 2 - b, a - b, 2 * b, 2 * b, c).addClass("highcharts-point").add(k), c.isMarker = !0)
            }
        };
        (/Trident\/7\.0/.test(m.navigator.userAgent) || r) && u(y.prototype, "positionItem", function(a, b) {
            var c = this,
                d = function() {
                    b._legendItemPos && a.call(c, b)
                };
            d();
            setTimeout(d)
        })
    })(I);
    (function(a) {
        var y = a.addEvent,
            D = a.animate,
            B = a.animObject,
            z = a.attr,
            l = a.doc,
            f = a.Axis,
            g = a.createElement,
            r = a.defaultOptions,
            n = a.discardElement,
            t = a.charts,
            d = a.css,
            p = a.defined,
            v = a.each,
            m = a.error,
            u = a.extend,
            e = a.fireEvent,
            b = a.getStyle,
            c = a.grep,
            q = a.isNumber,
            h = a.isObject,
            k = a.isString,
            w = a.Legend,
            C = a.marginNames,
            H = a.merge,
            E = a.Pointer,
            J = a.pick,
            G = a.pInt,
            x = a.removeEvent,
            K = a.seriesTypes,
            M = a.splat,
            A = a.svg,
            F = a.syncTimeout,
            L = a.win,
            N = a.Renderer,
            S = a.Chart = function() {
                this.getArgs.apply(this, arguments)
            };
        a.chart = function(a, b, c) {
            return new S(a,
            b, c)
        };
        S.prototype = {
            callbacks: [],
            getArgs: function() {
                var a = [].slice.call(arguments);
                if (k(a[0]) || a[0].nodeName) this.renderTo = a.shift();
                this.init(a[0], a[1])
            },
            init: function(b, c) {
                var e, h = b.series;
                b.series = null;
                e = H(r, b);
                e.series = b.series = h;
                this.userOptions = b;
                this.respRules = [];
                var h = e.chart,
                    d = h.events;
                this.margin = [];
                this.spacing = [];
                this.bounds = {
                    h: {},
                    v: {}
                };
                this.callback = c;
                this.isResizing = 0;
                this.options = e;
                this.axes = [];
                this.series = [];
                this.hasCartesianSeries = h.showAxes;
                var k;
                this.index = t.length;
                t.push(this);
                a.chartCount++;
                if (d) for (k in d) y(this, k, d[k]);
                this.xAxis = [];
                this.yAxis = [];
                this.pointCount = this.colorCounter = this.symbolCounter = 0;
                this.firstRender()
            },
            initSeries: function(a) {
                var b = this.options.chart;
                (b = K[a.type || b.type || b.defaultSeriesType]) || m(17, !0);
                b = new b;
                b.init(this, a);
                return b
            },
            isInsidePlot: function(a, b, c) {
                var e = c ? b : a;
                a = c ? a : b;
                return 0 <= e && e <= this.plotWidth && 0 <= a && a <= this.plotHeight
            },
            redraw: function(b) {
                var c = this.axes,
                    h = this.series,
                    d = this.pointer,
                    k = this.legend,
                    f = this.isDirtyLegend,
                    m, g, p = this.hasCartesianSeries,
                    q = this.isDirtyBox,
                    l = h.length,
                    x = l,
                    G = this.renderer,
                    n = G.isHidden(),
                    w = [];
                a.setAnimation(b, this);
                n && this.cloneRenderTo();
                for (this.layOutTitles(); x--;) if (b = h[x], b.options.stacking && (m = !0, b.isDirty)) {
                    g = !0;
                    break
                }
                if (g) for (x = l; x--;) b = h[x], b.options.stacking && (b.isDirty = !0);
                v(h, function(a) {
                    a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(), f = !0);
                    a.isDirtyData && e(a, "updatedData")
                });
                f && k.options.enabled && (k.render(), this.isDirtyLegend = !1);
                m && this.getStacks();
                p && v(c, function(a) {
                    a.updateNames();
                    a.setScale()
                });
                this.getMargins();
                p && (v(c, function(a) {
                    a.isDirty && (q = !0)
                }), v(c, function(a) {
                    var b = a.min + "," + a.max;
                    a.extKey !== b && (a.extKey = b, w.push(function() {
                        e(a, "afterSetExtremes", u(a.eventArgs, a.getExtremes()));
                        delete a.eventArgs
                    }));
                    (q || m) && a.redraw()
                }));
                q && this.drawChartBox();
                v(h, function(a) {
                    a.isDirty && a.visible && (!a.isCartesian || a.xAxis) && a.redraw()
                });
                d && d.reset(!0);
                G.draw();
                e(this, "redraw");
                n && this.cloneRenderTo(!0);
                v(w, function(a) {
                    a.call()
                })
            },
            get: function(a) {
                var b = this.axes,
                    c = this.series,
                    e, h;
                for (e = 0; e < b.length; e++) if (b[e].options.id === a) return b[e];
                for (e = 0; e < c.length; e++) if (c[e].options.id === a) return c[e];
                for (e = 0; e < c.length; e++) for (h = c[e].points || [], b = 0; b < h.length; b++) if (h[b].id === a) return h[b];
                return null
            },
            getAxes: function() {
                var a = this,
                    b = this.options,
                    c = b.xAxis = M(b.xAxis || {}),
                    b = b.yAxis = M(b.yAxis || {});
                v(c, function(a, b) {
                    a.index = b;
                    a.isX = !0
                });
                v(b, function(a, b) {
                    a.index = b
                });
                c = c.concat(b);
                v(c, function(b) {
                    new f(a, b)
                })
            },
            getSelectedPoints: function() {
                var a = [];
                v(this.series, function(b) {
                    a = a.concat(c(b.points || [], function(a) {
                        return a.selected
                    }))
                });
                return a
            },
            getSelectedSeries: function() {
                return c(this.series, function(a) {
                    return a.selected
                })
            },
            setTitle: function(a, b, c) {
                var e = this,
                    h = e.options,
                    d;
                d = h.title = H(h.title, a);
                h = h.subtitle = H(h.subtitle, b);
                v([
                    ["title", a, d],
                    ["subtitle", b, h]
                ], function(a, b) {
                    var c = a[0],
                        h = e[c],
                        d = a[1],
                        k = a[2];
                    h && d && (e[c] = h = h.destroy());
                    k && k.text && !h && (e[c] = e.renderer.text(k.text, 0, 0, k.useHTML).attr({
                        align: k.align,
                        "class": "highcharts-" + c,
                        zIndex: k.zIndex || 4
                    }).add(), e[c].update = function(a) {
                        e.setTitle(!b && a, b && a)
                    }, e[c].css(k.style))
                });
                e.layOutTitles(c)
            },
            layOutTitles: function(a) {
                var b = 0,
                    c, e = this.renderer,
                    h = this.spacingBox;
                v(["title", "subtitle"], function(a) {
                    var c = this[a],
                        d = this.options[a],
                        k;
                    c && (k = d.style.fontSize, k = e.fontMetrics(k, c).b, c.css({
                        width: (d.width || h.width + d.widthAdjust) + "px"
                    }).align(u({
                        y: b + k + ("title" === a ? -3 : 2)
                    }, d), !1, "spacingBox"), d.floating || d.verticalAlign || (b = Math.ceil(b + c.getBBox().height)))
                }, this);
                c = this.titleOffset !== b;
                this.titleOffset = b;
                !this.isDirtyBox && c && (this.isDirtyBox = c, this.hasRendered && J(a, !0) && this.isDirtyBox && this.redraw())
            },
            getChartSize: function() {
                var a = this.options.chart,
                    c = a.width,
                    a = a.height,
                    e = this.renderToClone || this.renderTo;
                p(c) || (this.containerWidth = b(e, "width"));
                p(a) || (this.containerHeight = b(e, "height"));
                this.chartWidth = Math.max(0, c || this.containerWidth || 600);
                this.chartHeight = Math.max(0, J(a, 19 < this.containerHeight ? this.containerHeight : 400))
            },
            cloneRenderTo: function(a) {
                var b = this.renderToClone,
                    c = this.container;
                if (a) {
                    if (b) {
                        for (; b.childNodes.length;) this.renderTo.appendChild(b.firstChild);
                        n(b);
                        delete this.renderToClone
                    }
                } else c && c.parentNode === this.renderTo && this.renderTo.removeChild(c), this.renderToClone = b = this.renderTo.cloneNode(0), d(b, {
                    position: "absolute",
                    top: "-9999px",
                    display: "block"
                }), b.style.setProperty && b.style.setProperty("display", "block", "important"), l.body.appendChild(b), c && b.appendChild(c)
            },
            setClassName: function(a) {
                this.container.className = "highcharts-container " + (a || "")
            },
            getContainer: function() {
                var b, c = this.options,
                    e = c.chart,
                    h, d;
                b = this.renderTo;
                var f = "highcharts-" + a.idCounter++,
                    p;
                b || (this.renderTo = b = e.renderTo);
                k(b) && (this.renderTo = b = l.getElementById(b));
                b || m(13, !0);
                h = G(z(b, "data-highcharts-chart"));
                q(h) && t[h] && t[h].hasRendered && t[h].destroy();
                z(b, "data-highcharts-chart", this.index);
                b.innerHTML = "";
                e.skipClone || b.offsetWidth || this.cloneRenderTo();
                this.getChartSize();
                h = this.chartWidth;
                d = this.chartHeight;
                p = u({
                    position: "relative",
                    overflow: "hidden",
                    width: h + "px",
                    height: d + "px",
                    textAlign: "left",
                    lineHeight: "normal",
                    zIndex: 0,
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                });
                this.container = b = g("div", {
                    id: f
                }, p, this.renderToClone || b);
                this._cursor = b.style.cursor;
                this.renderer = new(a[e.renderer] || N)(b, h, d, null, e.forExport, c.exporting && c.exporting.allowHTML);
                this.setClassName(e.className);
                this.renderer.setStyle(e.style);
                this.renderer.chartIndex = this.index
            },
            getMargins: function(a) {
                var b = this.spacing,
                    c = this.margin,
                    e = this.titleOffset;
                this.resetMargins();
                e && !p(c[0]) && (this.plotTop = Math.max(this.plotTop, e + this.options.title.margin + b[0]));
                this.legend.display && this.legend.adjustMargins(c, b);
                this.extraBottomMargin && (this.marginBottom += this.extraBottomMargin);
                this.extraTopMargin && (this.plotTop += this.extraTopMargin);
                a || this.getAxisMargins()
            },
            getAxisMargins: function() {
                var a = this,
                    b = a.axisOffset = [0, 0, 0, 0],
                    c = a.margin;
                a.hasCartesianSeries && v(a.axes, function(a) {
                    a.visible && a.getOffset()
                });
                v(C, function(e, h) {
                    p(c[h]) || (a[e] += b[h])
                });
                a.setChartSize()
            },
            reflow: function(a) {
                var c = this,
                    e = c.options.chart,
                    h = c.renderTo,
                    d = p(e.width),
                    k = e.width || b(h, "width"),
                    e = e.height || b(h, "height"),
                    h = a ? a.target : L;
                if (!d && !c.isPrinting && k && e && (h === L || h === l)) {
                    if (k !== c.containerWidth || e !== c.containerHeight) clearTimeout(c.reflowTimeout), c.reflowTimeout = F(function() {
                        c.container && c.setSize(void 0, void 0, !1)
                    }, a ? 100 : 0);
                    c.containerWidth = k;
                    c.containerHeight = e
                }
            },
            initReflow: function() {
                var a = this,
                    b = function(b) {
                        a.reflow(b)
                    };
                y(L, "resize", b);
                y(a, "destroy", function() {
                    x(L, "resize", b)
                })
            },
            setSize: function(b, c, h) {
                var k = this,
                    f = k.renderer;
                k.isResizing += 1;
                a.setAnimation(h, k);
                k.oldChartHeight = k.chartHeight;
                k.oldChartWidth = k.chartWidth;
                void 0 !== b && (k.options.chart.width = b);
                void 0 !== c && (k.options.chart.height = c);
                k.getChartSize();
                b = f.globalAnimation;
                (b ? D : d)(k.container, {
                    width: k.chartWidth + "px",
                    height: k.chartHeight + "px"
                }, b);
                k.setChartSize(!0);
                f.setSize(k.chartWidth, k.chartHeight, h);
                v(k.axes, function(a) {
                    a.isDirty = !0;
                    a.setScale()
                });
                v(k.series, function(a) {
                    a.isDirty = !0
                });
                k.isDirtyLegend = !0;
                k.isDirtyBox = !0;
                k.layOutTitles();
                k.getMargins();
                k.setResponsive && k.setResponsive(!1);
                k.redraw(h);
                k.oldChartHeight = null;
                e(k, "resize");
                F(function() {
                    k && e(k, "endResize", null, function() {
                        --k.isResizing
                    })
                },
                B(b).duration)
            },
            setChartSize: function(a) {
                var b = this.inverted,
                    c = this.renderer,
                    e = this.chartWidth,
                    h = this.chartHeight,
                    k = this.options.chart,
                    d = this.spacing,
                    f = this.clipOffset,
                    m, g, p, q;
                this.plotLeft = m = Math.round(this.plotLeft);
                this.plotTop = g = Math.round(this.plotTop);
                this.plotWidth = p = Math.max(0, Math.round(e - m - this.marginRight));
                this.plotHeight = q = Math.max(0, Math.round(h - g - this.marginBottom));
                this.plotSizeX = b ? q : p;
                this.plotSizeY = b ? p : q;
                this.plotBorderWidth = k.plotBorderWidth || 0;
                this.spacingBox = c.spacingBox = {
                    x: d[3],
                    y: d[0],
                    width: e - d[3] - d[1],
                    height: h - d[0] - d[2]
                };
                this.plotBox = c.plotBox = {
                    x: m,
                    y: g,
                    width: p,
                    height: q
                };
                e = 2 * Math.floor(this.plotBorderWidth / 2);
                b = Math.ceil(Math.max(e, f[3]) / 2);
                c = Math.ceil(Math.max(e, f[0]) / 2);
                this.clipBox = {
                    x: b,
                    y: c,
                    width: Math.floor(this.plotSizeX - Math.max(e, f[1]) / 2 - b),
                    height: Math.max(0, Math.floor(this.plotSizeY - Math.max(e, f[2]) / 2 - c))
                };
                a || v(this.axes, function(a) {
                    a.setAxisSize();
                    a.setAxisTranslation()
                })
            },
            resetMargins: function() {
                var a = this,
                    b = a.options.chart;
                v(["margin", "spacing"], function(c) {
                    var e = b[c],
                        k = h(e) ? e : [e, e, e, e];
                    v(["Top", "Right", "Bottom", "Left"], function(e, h) {
                        a[c][h] = J(b[c + e], k[h])
                    })
                });
                v(C, function(b, c) {
                    a[b] = J(a.margin[c], a.spacing[c])
                });
                a.axisOffset = [0, 0, 0, 0];
                a.clipOffset = [0, 0, 0, 0]
            },
            drawChartBox: function() {
                var a = this.options.chart,
                    b = this.renderer,
                    c = this.chartWidth,
                    e = this.chartHeight,
                    h = this.chartBackground,
                    k = this.plotBackground,
                    d = this.plotBorder,
                    f, m = this.plotBGImage,
                    g = a.backgroundColor,
                    p = a.plotBackgroundColor,
                    q = a.plotBackgroundImage,
                    l, x = this.plotLeft,
                    G = this.plotTop,
                    n = this.plotWidth,
                    w = this.plotHeight,
                    u = this.plotBox,
                    t = this.clipRect,
                    A = this.clipBox,
                    r = "animate";
                h || (this.chartBackground = h = b.rect().addClass("highcharts-background").add(), r = "attr");
                f = a.borderWidth || 0;
                l = f + (a.shadow ? 8 : 0);
                g = {
                    fill: g || "none"
                };
                if (f || h["stroke-width"]) g.stroke = a.borderColor, g["stroke-width"] = f;
                h.attr(g).shadow(a.shadow);
                h[r]({
                    x: l / 2,
                    y: l / 2,
                    width: c - l - f % 2,
                    height: e - l - f % 2,
                    r: a.borderRadius
                });
                r = "animate";
                k || (r = "attr", this.plotBackground = k = b.rect().addClass("highcharts-plot-background").add());
                k[r](u);
                k.attr({
                    fill: p || "none"
                }).shadow(a.plotShadow);
                q && (m ? m.animate(u) : this.plotBGImage = b.image(q, x, G, n, w).add());
                t ? t.animate({
                    width: A.width,
                    height: A.height
                }) : this.clipRect = b.clipRect(A);
                r = "animate";
                d || (r = "attr", this.plotBorder = d = b.rect().addClass("highcharts-plot-border").attr({
                    zIndex: 1
                }).add());
                d.attr({
                    stroke: a.plotBorderColor,
                    "stroke-width": a.plotBorderWidth || 0,
                    fill: "none"
                });
                d[r](d.crisp({
                    x: x,
                    y: G,
                    width: n,
                    height: w
                }, - d.strokeWidth()));
                this.isDirtyBox = !1
            },
            propFromSeries: function() {
                var a = this,
                    b = a.options.chart,
                    c, e = a.options.series,
                    h, k;
                v(["inverted", "angular", "polar"], function(d) {
                    c = K[b.type || b.defaultSeriesType];
                    k = b[d] || c && c.prototype[d];
                    for (h = e && e.length; !k && h--;)(c = K[e[h].type]) && c.prototype[d] && (k = !0);
                    a[d] = k
                })
            },
            linkSeries: function() {
                var a = this,
                    b = a.series;
                v(b, function(a) {
                    a.linkedSeries.length = 0
                });
                v(b, function(b) {
                    var c = b.options.linkedTo;
                    k(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b), b.linkedParent = c, b.visible = J(b.options.visible, c.options.visible, b.visible))
                })
            },
            renderSeries: function() {
                v(this.series,

                function(a) {
                    a.translate();
                    a.render()
                })
            },
            renderLabels: function() {
                var a = this,
                    b = a.options.labels;
                b.items && v(b.items, function(c) {
                    var e = u(b.style, c.style),
                        h = G(e.left) + a.plotLeft,
                        k = G(e.top) + a.plotTop + 12;
                    delete e.left;
                    delete e.top;
                    a.renderer.text(c.html, h, k).attr({
                        zIndex: 2
                    }).css(e).add()
                })
            },
            render: function() {
                var a = this.axes,
                    b = this.renderer,
                    c = this.options,
                    e, h, k;
                this.setTitle();
                this.legend = new w(this, c.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                c = this.plotWidth;
                e = this.plotHeight -= 21;
                v(a, function(a) {
                    a.setScale()
                });
                this.getAxisMargins();
                h = 1.1 < c / this.plotWidth;
                k = 1.05 < e / this.plotHeight;
                if (h || k) v(a, function(a) {
                    (a.horiz && h || !a.horiz && k) && a.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries && v(a, function(a) {
                    a.visible && a.render()
                });
                this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({
                    zIndex: 3
                }).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0
            },
            addCredits: function(a) {
                var b = this;
                a = H(!0, this.options.credits, a);
                a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function() {
                    a.href && (L.location.href = a.href)
                }).attr({
                    align: a.position.align,
                    zIndex: 8
                }).css(a.style).add().align(a.position), this.credits.update = function(a) {
                    b.credits = b.credits.destroy();
                    b.addCredits(a)
                })
            },
            destroy: function() {
                var b = this,
                    c = b.axes,
                    h = b.series,
                    k = b.container,
                    d, f = k && k.parentNode;
                e(b, "destroy");
                t[b.index] = void 0;
                a.chartCount--;
                b.renderTo.removeAttribute("data-highcharts-chart");
                x(b);
                for (d = c.length; d--;) c[d] = c[d].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (d = h.length; d--;) h[d] = h[d].destroy();
                v("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "), function(a) {
                    var c = b[a];
                    c && c.destroy && (b[a] = c.destroy())
                });
                k && (k.innerHTML = "", x(k), f && n(k));
                for (d in b) delete b[d]
            },
            isReadyToRender: function() {
                var a = this;
                return A || L != L.top || "complete" === l.readyState ? !0 : (l.attachEvent("onreadystatechange", function() {
                    l.detachEvent("onreadystatechange", a.firstRender);
                    "complete" === l.readyState && a.firstRender()
                }), !1)
            },
            firstRender: function() {
                var a = this,
                    b = a.options;
                if (a.isReadyToRender()) {
                    a.getContainer();
                    e(a, "init");
                    a.resetMargins();
                    a.setChartSize();
                    a.propFromSeries();
                    a.getAxes();
                    v(b.series || [], function(b) {
                        a.initSeries(b)
                    });
                    a.linkSeries();
                    e(a, "beforeRender");
                    E && (a.pointer = new E(a, b));
                    a.render();
                    a.renderer.draw();
                    if (!a.renderer.imgCount && a.onload) a.onload();
                    a.cloneRenderTo(!0)
                }
            },
            onload: function() {
                v([this.callback].concat(this.callbacks), function(a) {
                    a && void 0 !== this.index && a.apply(this, [this])
                }, this);
                e(this, "load");
                this.initReflow();
                this.onload = null
            }
        }
    })(I);
    (function(a) {
        var y, D = a.each,
            B = a.extend,
            z = a.erase,
            l = a.fireEvent,
            f = a.format,
            g = a.isArray,
            r = a.isNumber,
            n = a.pick,
            t = a.removeEvent;
        y = a.Point = function() {};
        y.prototype = {
            init: function(a, f, g) {
                this.series = a;
                this.color = a.color;
                this.applyOptions(f, g);
                a.options.colorByPoint ? (f = a.options.colors || a.chart.options.colors, this.color = this.color || f[a.colorCounter], f = f.length, g = a.colorCounter, a.colorCounter++, a.colorCounter === f && (a.colorCounter = 0)) : g = a.colorIndex;
                this.colorIndex = n(this.colorIndex, g);
                a.chart.pointCount++;
                return this
            },
            applyOptions: function(a, f) {
                var g = this.series,
                    m = g.options.pointValKey || g.pointValKey;
                a = y.prototype.optionsToObject.call(this, a);
                B(this, a);
                this.options = this.options ? B(this.options, a) : a;
                a.group && delete this.group;
                m && (this.y = this[m]);
                this.isNull = n(this.isValid && !this.isValid(),
                null === this.x || !r(this.y, !0));
                "name" in this && void 0 === f && g.xAxis && g.xAxis.hasNames && (this.x = g.xAxis.nameToX(this));
                void 0 === this.x && g && (this.x = void 0 === f ? g.autoIncrement(this) : f);
                return this
            },
            optionsToObject: function(a) {
                var f = {}, l = this.series,
                    m = l.options.keys,
                    n = m || l.pointArrayMap || ["y"],
                    e = n.length,
                    b = 0,
                    c = 0;
                if (r(a) || null === a) f[n[0]] = a;
                else if (g(a)) for (!m && a.length > e && (l = typeof a[0], "string" === l ? f.name = a[0] : "number" === l && (f.x = a[0]), b++); c < e;) m && void 0 === a[b] || (f[n[c]] = a[b]), b++, c++;
                else "object" === typeof a && (f = a, a.dataLabels && (l._hasPointLabels = !0), a.marker && (l._hasPointMarkers = !0));
                return f
            },
            getClassName: function() {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "")
            },
            getZone: function() {
                var a = this.series,
                    f = a.zones,
                    a = a.zoneAxis || "y",
                    g = 0,
                    m;
                for (m = f[g]; this[a] >= m.value;) m = f[++g];
                m && m.color && !this.options.color && (this.color = m.color);
                return m
            },
            destroy: function() {
                var a = this.series.chart,
                    f = a.hoverPoints,
                    g;
                a.pointCount--;
                f && (this.setState(), z(f, this), f.length || (a.hoverPoints = null));
                if (this === a.hoverPoint) this.onMouseOut();
                if (this.graphic || this.dataLabel) t(this), this.destroyElements();
                this.legendItem && a.legend.destroyItem(this);
                for (g in this) this[g] = null
            },
            destroyElements: function() {
                for (var a = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], f, g = 6; g--;) f = a[g], this[f] && (this[f] = this[f].destroy())
            },
            getLabelConfig: function() {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            },
            tooltipFormatter: function(a) {
                var g = this.series,
                    l = g.tooltipOptions,
                    m = n(l.valueDecimals, ""),
                    u = l.valuePrefix || "",
                    e = l.valueSuffix || "";
                D(g.pointArrayMap || ["y"], function(b) {
                    b = "{point." + b;
                    if (u || e) a = a.replace(b + "}", u + b + "}" + e);
                    a = a.replace(b + "}", b + ":,." + m + "f}")
                });
                return f(a, {
                    point: this,
                    series: this.series
                })
            },
            firePointEvent: function(a, f, g) {
                var m = this,
                    n = this.series.options;
                (n.point.events[a] || m.options && m.options.events && m.options.events[a]) && this.importEvents();
                "click" === a && n.allowPointSelect && (g = function(a) {
                    m.select && m.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
                });
                l(this, a, f, g)
            },
            visible: !0
        }
    })(I);
    (function(a) {
        var y = a.addEvent,
            D = a.animObject,
            B = a.arrayMax,
            z = a.arrayMin,
            l = a.correctFloat,
            f = a.Date,
            g = a.defaultOptions,
            r = a.defaultPlotOptions,
            n = a.defined,
            t = a.each,
            d = a.erase,
            p = a.error,
            v = a.extend,
            m = a.fireEvent,
            u = a.grep,
            e = a.isArray,
            b = a.isNumber,
            c = a.isString,
            q = a.merge,
            h = a.pick,
            k = a.removeEvent,
            w = a.splat,
            C = a.stableSort,
            H = a.SVGElement,
            E = a.syncTimeout,
            J = a.win;
        a.Series = a.seriesType("line", null, {
            lineWidth: 2,
            allowPointSelect: !1,
            showCheckbox: !1,
            animation: {
                duration: 1E3
            },
            events: {},
            marker: {
                lineWidth: 0,
                lineColor: "#ffffff",
                radius: 4,
                states: {
                    hover: {
                        enabled: !0,
                        radiusPlus: 2,
                        lineWidthPlus: 1
                    },
                    select: {
                        fillColor: "#cccccc",
                        lineColor: "#000000",
                        lineWidth: 2
                    }
                }
            },
            point: {
                events: {}
            },
            dataLabels: {
                align: "center",
                formatter: function() {
                    return null === this.y ? "" : a.numberFormat(this.y, - 1)
                },
                style: {
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "contrast",
                    textShadow: "1px 1px contrast, -1px -1px contrast, -1px 1px contrast, 1px -1px contrast"
                },
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                padding: 5
            },
            cropThreshold: 300,
            pointRange: 0,
            softThreshold: !0,
            states: {
                hover: {
                    lineWidthPlus: 1,
                    marker: {},
                    halo: {
                        size: 10,
                        opacity: .25
                    }
                },
                select: {
                    marker: {}
                }
            },
            stickyTracking: !0,
            turboThreshold: 1E3
        }, {
            isCartesian: !0,
            pointClass: a.Point,
            sorted: !0,
            requireSorting: !0,
            directTouch: !1,
            axisTypes: ["xAxis", "yAxis"],
            colorCounter: 0,
            parallelArrays: ["x", "y"],
            coll: "series",
            init: function(a, b) {
                var c = this,
                    e, k, d = a.series,
                    f = function(a, b) {
                        return h(a.options.index, a._i) - h(b.options.index, b._i)
                    };
                c.chart = a;
                c.options = b = c.setOptions(b);
                c.linkedSeries = [];
                c.bindAxes();
                v(c, {
                    name: b.name,
                    state: "",
                    visible: !1 !== b.visible,
                    selected: !0 === b.selected
                });
                k = b.events;
                for (e in k) y(c, e, k[e]);
                if (k && k.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) a.runTrackerClick = !0;
                c.getColor();
                c.getSymbol();
                t(c.parallelArrays, function(a) {
                    c[a + "Data"] = []
                });
                c.setData(b.data, !1);
                c.isCartesian && (a.hasCartesianSeries = !0);
                d.push(c);
                c._i = d.length - 1;
                C(d, f);
                this.yAxis && C(this.yAxis.series, f);
                t(d, function(a, b) {
                    a.index = b;
                    a.name = a.name || "Series " + (b + 1)
                })
            },
            bindAxes: function() {
                var a = this,
                    b = a.options,
                    c = a.chart,
                    e;
                t(a.axisTypes || [], function(h) {
                    t(c[h], function(c) {
                        e = c.options;
                        if (b[h] === e.index || void 0 !== b[h] && b[h] === e.id || void 0 === b[h] && 0 === e.index) c.series.push(a), a[h] = c, c.isDirty = !0
                    });
                    a[h] || a.optionalAxis === h || p(18, !0)
                })
            },
            updateParallelArrays: function(a, c) {
                var e = a.series,
                    h = arguments,
                    k = b(c) ? function(b) {
                        var h = "y" === b && e.toYData ? e.toYData(a) : a[b];
                        e[b + "Data"][c] = h
                    } : function(a) {
                        Array.prototype[c].apply(e[a + "Data"], Array.prototype.slice.call(h, 2))
                    };
                t(e.parallelArrays, k)
            },
            autoIncrement: function() {
                var a = this.options,
                    b = this.xIncrement,
                    c, e = a.pointIntervalUnit,
                    b = h(b, a.pointStart, 0);
                this.pointInterval = c = h(this.pointInterval, a.pointInterval, 1);
                e && (a = new f(b), "day" === e ? a = +a[f.hcSetDate](a[f.hcGetDate]() + c) : "month" === e ? a = +a[f.hcSetMonth](a[f.hcGetMonth]() + c) : "year" === e && (a = +a[f.hcSetFullYear](a[f.hcGetFullYear]() + c)), c = a - b);
                this.xIncrement = b + c;
                return b
            },
            setOptions: function(a) {
                var b = this.chart,
                    c = b.options.plotOptions,
                    b = b.userOptions || {}, e = b.plotOptions || {}, h = c[this.type];
                this.userOptions = a;
                c = q(h, c.series, a);
                this.tooltipOptions = q(g.tooltip, g.plotOptions[this.type].tooltip, b.tooltip, e.series && e.series.tooltip, e[this.type] && e[this.type].tooltip, a.tooltip);
                null === h.marker && delete c.marker;
                this.zoneAxis = c.zoneAxis;
                a = this.zones = (c.zones || []).slice();
                !c.negativeColor && !c.negativeFillColor || c.zones || a.push({
                    value: c[this.zoneAxis + "Threshold"] || c.threshold || 0,
                    className: "highcharts-negative",
                    color: c.negativeColor,
                    fillColor: c.negativeFillColor
                });
                a.length && n(a[a.length - 1].value) && a.push({
                    color: this.color,
                    fillColor: this.fillColor
                });
                return c
            },
            getCyclic: function(a, b, c) {
                var e, k = this.userOptions,
                    d = a + "Index",
                    f = a + "Counter",
                    g = c ? c.length : h(this.chart.options.chart[a + "Count"], this.chart[a + "Count"]);
                b || (e = h(k[d], k["_" + d]), n(e) || (k["_" + d] = e = this.chart[f] % g, this.chart[f] += 1), c && (b = c[e]));
                void 0 !== e && (this[d] = e);
                this[a] = b
            },
            getColor: function() {
                this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || r[this.type].color, this.chart.options.colors)
            },
            getSymbol: function() {
                var a = this.options.marker;
                this.getCyclic("symbol", a.symbol, this.chart.options.symbols);
                /^url/.test(this.symbol) && (a.radius = 0)
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
            setData: function(a, k, d, f) {
                var g = this,
                    m = g.points,
                    q = m && m.length || 0,
                    l, n = g.options,
                    w = g.chart,
                    u = null,
                    r = g.xAxis,
                    C = n.turboThreshold,
                    E = this.xData,
                    v = this.yData,
                    H = (l = g.pointArrayMap) && l.length;
                a = a || [];
                l = a.length;
                k = h(k, !0);
                if (!1 !== f && l && q === l && !g.cropped && !g.hasGroupedData && g.visible) t(a, function(a, b) {
                    m[b].update && a !== n.data[b] && m[b].update(a, !1, null, !1)
                });
                else {
                    g.xIncrement = null;
                    g.colorCounter = 0;
                    t(this.parallelArrays, function(a) {
                        g[a + "Data"].length = 0
                    });
                    if (C && l > C) {
                        for (d = 0; null === u && d < l;) u = a[d], d++;
                        if (b(u)) for (d = 0; d < l; d++) E[d] = this.autoIncrement(), v[d] = a[d];
                        else if (e(u)) if (H) for (d = 0; d < l; d++) u = a[d], E[d] = u[0], v[d] = u.slice(1, H + 1);
                        else for (d = 0; d < l; d++) u = a[d], E[d] = u[0], v[d] = u[1];
                        else p(12)
                    } else for (d = 0; d < l; d++) void 0 !== a[d] && (u = {
                        series: g
                    }, g.pointClass.prototype.applyOptions.apply(u, [a[d]]), g.updateParallelArrays(u, d));
                    c(v[0]) && p(14, !0);
                    g.data = [];
                    g.options.data = g.userOptions.data = a;
                    for (d = q; d--;) m[d] && m[d].destroy && m[d].destroy();
                    r && (r.minRange = r.userMinRange);
                    g.isDirty = w.isDirtyBox = !0;
                    g.isDirtyData = !! m;
                    d = !1
                }
                "point" === n.legendType && (this.processData(), this.generatePoints());
                k && w.redraw(d)
            },
            processData: function(a) {
                var b = this.xData,
                    c = this.yData,
                    e = b.length,
                    h;
                h = 0;
                var k, d, f = this.xAxis,
                    g, m = this.options;
                g = m.cropThreshold;
                var l = this.getExtremesFromAll || m.getExtremesFromAll,
                    q = this.isCartesian,
                    m = f && f.val2lin,
                    n = f && f.isLog,
                    w, u;
                if (q && !this.isDirty && !f.isDirty && !this.yAxis.isDirty && !a) return !1;
                f && (a = f.getExtremes(), w = a.min, u = a.max);
                if (q && this.sorted && !l && (!g || e > g || this.forceCrop)) if (b[e - 1] < w || b[0] > u) b = [], c = [];
                else if (b[0] < w || b[e - 1] > u) h = this.cropData(this.xData, this.yData, w, u), b = h.xData, c = h.yData, h = h.start, k = !0;
                for (g = b.length || 1; --g;) e = n ? m(b[g]) - m(b[g - 1]) : b[g] - b[g - 1], 0 < e && (void 0 === d || e < d) ? d = e : 0 > e && this.requireSorting && p(15);
                this.cropped = k;
                this.cropStart = h;
                this.processedXData = b;
                this.processedYData = c;
                this.closestPointRange = d
            },
            cropData: function(a, b, c, e) {
                var k = a.length,
                    d = 0,
                    f = k,
                    g = h(this.cropShoulder, 1),
                    m;
                for (m = 0; m < k; m++) if (a[m] >= c) {
                    d = Math.max(0, m - g);
                    break
                }
                for (c = m; c < k; c++) if (a[c] > e) {
                    f = c + g;
                    break
                }
                return {
                    xData: a.slice(d, f),
                    yData: b.slice(d, f),
                    start: d,
                    end: f
                }
            },
            generatePoints: function() {
                var a = this.options.data,
                    b = this.data,
                    c, e = this.processedXData,
                    h = this.processedYData,
                    k = this.pointClass,
                    d = e.length,
                    f = this.cropStart || 0,
                    g, m = this.hasGroupedData,
                    p, l = [],
                    q;
                b || m || (b = [], b.length = a.length, b = this.data = b);
                for (q = 0; q < d; q++) g = f + q, m ? (l[q] = (new k).init(this, [e[q]].concat(w(h[q]))), l[q].dataGroup = this.groupMap[q]) : (b[g] ? p = b[g] : void 0 !== a[g] && (b[g] = p = (new k).init(this, a[g], e[q])), l[q] = p), l[q].index = g;
                if (b && (d !== (c = b.length) || m)) for (q = 0; q < c; q++) q !== f || m || (q += d), b[q] && (b[q].destroyElements(), b[q].plotX = void 0);
                this.data = b;
                this.points = l
            },
            getExtremes: function(a) {
                var c = this.yAxis,
                    h = this.processedXData,
                    k, d = [],
                    f = 0;
                k = this.xAxis.getExtremes();
                var g = k.min,
                    m = k.max,
                    p, q, l, n;
                a = a || this.stackedYData || this.processedYData || [];
                k = a.length;
                for (n = 0; n < k; n++) if (q = h[n], l = a[n], p = (b(l, !0) || e(l)) && (!c.isLog || l.length || 0 < l), q = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (h[n + 1] || q) >= g && (h[n - 1] || q) <= m, p && q) if (p = l.length) for (; p--;) null !== l[p] && (d[f++] = l[p]);
                else d[f++] = l;
                this.dataMin = z(d);
                this.dataMax = B(d)
            },
            translate: function() {
                this.processedXData || this.processData();
                this.generatePoints();
                for (var a = this.options, c = a.stacking, e = this.xAxis, k = e.categories,
                d = this.yAxis, f = this.points, g = f.length, m = !! this.modifyValue, p = a.pointPlacement, q = "between" === p || b(p), w = a.threshold, u = a.startFromThreshold ? w : 0, t, r, C, E, v = Number.MAX_VALUE, a = 0; a < g; a++) {
                    var H = f[a],
                        z = H.x,
                        J = H.y;
                    r = H.low;
                    var y = c && d.stacks[(this.negStacks && J < (u ? 0 : w) ? "-" : "") + this.stackKey],
                        B;
                    d.isLog && null !== J && 0 >= J && (H.isNull = !0);
                    H.plotX = t = l(Math.min(Math.max(-1E5, e.translate(z, 0, 0, 0, 1, p, "flags" === this.type)), 1E5));
                    c && this.visible && !H.isNull && y && y[z] && (E = this.getStackIndicator(E, z, this.index), B = y[z], J = B.points[E.key],
                    r = J[0], J = J[1], r === u && E.key === y[z].base && (r = h(w, d.min)), d.isLog && 0 >= r && (r = null), H.total = H.stackTotal = B.total, H.percentage = B.total && H.y / B.total * 100, H.stackY = J, B.setOffset(this.pointXOffset || 0, this.barW || 0));
                    H.yBottom = n(r) ? d.translate(r, 0, 1, 0, 1) : null;
                    m && (J = this.modifyValue(J, H));
                    H.plotY = r = "number" === typeof J && Infinity !== J ? Math.min(Math.max(-1E5, d.translate(J, 0, 1, 0, 1)), 1E5) : void 0;
                    H.isInside = void 0 !== r && 0 <= r && r <= d.len && 0 <= t && t <= e.len;
                    H.clientX = q ? l(e.translate(z, 0, 0, 0, 1, p)) : t;
                    H.negative = H.y < (w || 0);
                    H.category = k && void 0 !== k[H.x] ? k[H.x] : H.x;
                    H.isNull || (void 0 !== C && (v = Math.min(v, Math.abs(t - C))), C = t)
                }
                this.closestPointRangePx = v
            },
            getValidPoints: function(a, b) {
                var c = this.chart;
                return u(a || this.points || [], function(a) {
                    return b && !c.isInsidePlot(a.plotX, a.plotY, c.inverted) ? !1 : !a.isNull
                })
            },
            setClip: function(a) {
                var b = this.chart,
                    c = this.options,
                    e = b.renderer,
                    h = b.inverted,
                    k = this.clipBox,
                    d = k || b.clipBox,
                    f = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, d.height, c.xAxis, c.yAxis].join(),
                    g = b[f],
                    m = b[f + "m"];
                g || (a && (d.width = 0, b[f + "m"] = m = e.clipRect(-99, h ? -b.plotLeft : -b.plotTop, 99, h ? b.chartWidth : b.chartHeight)), b[f] = g = e.clipRect(d), g.count = {
                    length: 0
                });
                a && !g.count[this.index] && (g.count[this.index] = !0, g.count.length += 1);
                !1 !== c.clip && (this.group.clip(a || k ? g : b.clipRect), this.markerGroup.clip(m), this.sharedClipKey = f);
                a || (g.count[this.index] && (delete g.count[this.index], --g.count.length), 0 === g.count.length && f && b[f] && (k || (b[f] = b[f].destroy()), b[f + "m"] && (b[f + "m"] = b[f + "m"].destroy())))
            },
            animate: function(a) {
                var b = this.chart,
                    c = D(this.options.animation),
                    e;
                a ? this.setClip(c) : (e = this.sharedClipKey, (a = b[e]) && a.animate({
                    width: b.plotSizeX
                }, c), b[e + "m"] && b[e + "m"].animate({
                    width: b.plotSizeX + 99
                }, c), this.animate = null)
            },
            afterAnimate: function() {
                this.setClip();
                m(this, "afterAnimate")
            },
            drawPoints: function() {
                var a = this.points,
                    c = this.chart,
                    e, k, d, f, g, m, p, q, l = this.options.marker,
                    n, w, u, t = this.markerGroup,
                    r = h(l.enabled, this.xAxis.isRadial ? !0 : null, this.closestPointRangePx > 2 * l.radius);
                if (!1 !== l.enabled || this._hasPointMarkers) for (d = a.length; d--;) f = a[d], e = Math.floor(f.plotX), k = f.plotY, q = f.graphic, n = f.marker || {}, w = !! f.marker, g = r && void 0 === n.enabled || n.enabled, u = f.isInside, g && b(k) && null !== f.y ? (g = l.radius, m = h(n.symbol, this.symbol), p = 0 === m.indexOf("url"), q ? q[u ? "show" : "hide"](!0).animate(v({
                    x: e - g,
                    y: k - g
                }, q.symbolName ? {
                    width: 2 * g,
                    height: 2 * g
                } : {})) : u && (0 < g || p) && (f.graphic = q = c.renderer.symbol(m, e - g, k - g, 2 * g, 2 * g, w ? n : l).attr({
                    r: g
                }).add(t)), q && q.attr(this.pointAttribs(f, f.selected && "select")), q && q.addClass(f.getClassName(), !0)) : q && (f.graphic = q.destroy())
            },
            pointAttribs: function(a, b) {
                var c = this.options.marker,
                    e = a && a.options,
                    h = e && e.marker || {}, k = c.lineWidth,
                    d = this.color,
                    e = e && e.color,
                    f = a && a.color,
                    g, m;
                a && this.zones.length && (m = a.getZone()) && m.color && (g = m.color);
                d = e || g || f || d;
                g = h.fillColor || c.fillColor || d;
                d = h.lineColor || c.lineColor || d;
                b && (c = c.states[b], h = h.states && h.states[b] || {}, k = c.lineWidth || k + c.lineWidthPlus, g = h.fillColor || c.fillColor || g, d = h.lineColor || c.lineColor || d);
                return {
                    stroke: d,
                    "stroke-width": k,
                    fill: g
                }
            },
            destroy: function() {
                var a = this,
                    b = a.chart,
                    c = /AppleWebKit\/533/.test(J.navigator.userAgent),
                    e, h = a.data || [],
                    f, g, q;
                m(a, "destroy");
                k(a);
                t(a.axisTypes || [], function(b) {
                    (q = a[b]) && q.series && (d(q.series, a), q.isDirty = q.forceRedraw = !0)
                });
                a.legendItem && a.chart.legend.destroyItem(a);
                for (e = h.length; e--;)(f = h[e]) && f.destroy && f.destroy();
                a.points = null;
                clearTimeout(a.animationTimeout);
                for (g in a) a[g] instanceof H && !a[g].survive && (e = c && "group" === g ? "hide" : "destroy", a[g][e]());
                b.hoverSeries === a && (b.hoverSeries = null);
                d(b.series, a);
                for (g in a) delete a[g]
            },
            getGraphPath: function(a, b, c) {
                var e = this,
                    h = e.options,
                    k = h.step,
                    d, f = [],
                    g = [],
                    m;
                a = a || e.points;
                (d = a.reversed) && a.reverse();
                (k = {
                    right: 1,
                    center: 2
                }[k] || k && 3) && d && (k = 4 - k);
                !h.connectNulls || b || c || (a = this.getValidPoints(a));
                t(a, function(d, q) {
                    var p = d.plotX,
                        l = d.plotY,
                        w = a[q - 1];
                    (d.leftCliff || w && w.rightCliff) && !c && (m = !0);
                    d.isNull && !n(b) && 0 < q ? m = !h.connectNulls : d.isNull && !b ? m = !0 : (0 === q || m ? w = ["M", d.plotX, d.plotY] : e.getPointSpline ? w = e.getPointSpline(a, d, q) : k ? (w = 1 === k ? ["L", w.plotX, l] : 2 === k ? ["L", (w.plotX + p) / 2, w.plotY, "L", (w.plotX + p) / 2, l] : ["L", p, w.plotY], w.push("L", p, l)) : w = ["L", p, l], g.push(d.x), k && g.push(d.x), f.push.apply(f, w), m = !1)
                });
                f.xMap = g;
                return e.graphPath = f
            },
            drawGraph: function() {
                var a = this,
                    b = this.options,
                    c = (this.gappedPath || this.getGraphPath).call(this),
                    e = [
                        ["graph", "highcharts-graph", b.lineColor || this.color, b.dashStyle]
                    ];
                t(this.zones, function(c, h) {
                    e.push(["zone-graph-" + h, "highcharts-graph highcharts-zone-graph-" + h + " " + (c.className || ""), c.color || a.color, c.dashStyle || b.dashStyle])
                });
                t(e, function(e, h) {
                    var k = e[0],
                        d = a[k];
                    d ? (d.endX = c.xMap, d.animate({
                        d: c
                    })) : c.length && (a[k] = a.chart.renderer.path(c).addClass(e[1]).attr({
                        zIndex: 1
                    }).add(a.group), d = {
                        stroke: e[2],
                        "stroke-width": b.lineWidth,
                        fill: a.fillGraph && a.color || "none"
                    }, e[3] ? d.dashstyle = e[3] : "square" !== b.linecap && (d["stroke-linecap"] = d["stroke-linejoin"] = "round"), d = a[k].attr(d).shadow(2 > h && b.shadow));
                    d && (d.startX = c.xMap, d.isArea = c.isArea)
                })
            },
            applyZones: function() {
                var a = this,
                    b = this.chart,
                    c = b.renderer,
                    e = this.zones,
                    k, d, f = this.clips || [],
                    g, m = this.graph,
                    q = this.area,
                    p = Math.max(b.chartWidth, b.chartHeight),
                    l = this[(this.zoneAxis || "y") + "Axis"],
                    n, w, u = b.inverted,
                    r, C, E, v, H = !1;
                e.length && (m || q) && l && void 0 !== l.min && (w = l.reversed, r = l.horiz, m && m.hide(), q && q.hide(), n = l.getExtremes(), t(e, function(e, t) {
                    k = w ? r ? b.plotWidth : 0 : r ? 0 : l.toPixels(n.min);
                    k = Math.min(Math.max(h(d, k), 0), p);
                    d = Math.min(Math.max(Math.round(l.toPixels(h(e.value, n.max), !0)), 0), p);
                    H && (k = d = l.toPixels(n.max));
                    C = Math.abs(k - d);
                    E = Math.min(k, d);
                    v = Math.max(k, d);
                    l.isXAxis ? (g = {
                        x: u ? v : E,
                        y: 0,
                        width: C,
                        height: p
                    }, r || (g.x = b.plotHeight - g.x)) : (g = {
                        x: 0,
                        y: u ? v : E,
                        width: p,
                        height: C
                    }, r && (g.y = b.plotWidth - g.y));
                    u && c.isVML && (g = l.isXAxis ? {
                        x: 0,
                        y: w ? E : v,
                        height: g.width,
                        width: b.chartWidth
                    } : {
                        x: g.y - b.plotLeft - b.spacingBox.x,
                        y: 0,
                        width: g.height,
                        height: b.chartHeight
                    });
                    f[t] ? f[t].animate(g) : (f[t] = c.clipRect(g), m && a["zone-graph-" + t].clip(f[t]), q && a["zone-area-" + t].clip(f[t]));
                    H = e.value > n.max
                }), this.clips = f)
            },
            invertGroups: function(a) {
                function b() {
                    var e = {
                        width: c.yAxis.len,
                        height: c.xAxis.len
                    };
                    t(["group", "markerGroup"], function(b) {
                        c[b] && c[b].attr(e).invert(a)
                    })
                }
                var c = this,
                    e = c.chart;
                c.xAxis && (y(e, "resize", b), y(c, "destroy",

                function() {
                    k(e, "resize", b)
                }), b(a), c.invertGroups = b)
            },
            plotGroup: function(a, b, c, e, h) {
                var k = this[a],
                    d = !k;
                d && (this[a] = k = this.chart.renderer.g(b).attr({
                    zIndex: e || .1
                }).add(h), k.addClass("highcharts-series-" + this.index + " highcharts-" + this.type + "-series highcharts-color-" + this.colorIndex + " " + (this.options.className || "")));
                k.attr({
                    visibility: c
                })[d ? "attr" : "animate"](this.getPlotBox());
                return k
            },
            getPlotBox: function() {
                var a = this.chart,
                    b = this.xAxis,
                    c = this.yAxis;
                a.inverted && (b = c, c = this.xAxis);
                return {
                    translateX: b ? b.left : a.plotLeft,
                    translateY: c ? c.top : a.plotTop,
                    scaleX: 1,
                    scaleY: 1
                }
            },
            render: function() {
                var a = this,
                    b = a.chart,
                    c, e = a.options,
                    h = !! a.animate && b.renderer.isSVG && D(e.animation).duration,
                    k = a.visible ? "inherit" : "hidden",
                    d = e.zIndex,
                    f = a.hasRendered,
                    g = b.seriesGroup,
                    m = b.inverted;
                c = a.plotGroup("group", "series", k, d, g);
                a.markerGroup = a.plotGroup("markerGroup", "markers", k, d, g);
                h && a.animate(!0);
                c.inverted = a.isCartesian ? m : !1;
                a.drawGraph && (a.drawGraph(), a.applyZones());
                a.drawDataLabels && a.drawDataLabels();
                a.visible && a.drawPoints();
                a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                a.invertGroups(m);
                !1 === e.clip || a.sharedClipKey || f || c.clip(b.clipRect);
                h && a.animate();
                f || (a.animationTimeout = E(function() {
                    a.afterAnimate()
                }, h));
                a.isDirty = a.isDirtyData = !1;
                a.hasRendered = !0
            },
            redraw: function() {
                var a = this.chart,
                    b = this.isDirty || this.isDirtyData,
                    c = this.group,
                    e = this.xAxis,
                    k = this.yAxis;
                c && (a.inverted && c.attr({
                    width: a.plotWidth,
                    height: a.plotHeight
                }), c.animate({
                    translateX: h(e && e.left, a.plotLeft),
                    translateY: h(k && k.top, a.plotTop)
                }));
                this.translate();
                this.render();
                b && delete this.kdTree
            },
            kdDimensions: 1,
            kdAxisArray: ["clientX", "plotY"],
            searchPoint: function(a, b) {
                var c = this.xAxis,
                    e = this.yAxis,
                    h = this.chart.inverted;
                return this.searchKDTree({
                    clientX: h ? c.len - a.chartY + c.pos : a.chartX - c.pos,
                    plotY: h ? e.len - a.chartX + e.pos : a.chartY - e.pos
                }, b)
            },
            buildKDTree: function() {
                function a(c, e, h) {
                    var k, d;
                    if (d = c && c.length) return k = b.kdAxisArray[e % h], c.sort(function(a, b) {
                        return a[k] - b[k]
                    }), d = Math.floor(d / 2), {
                        point: c[d],
                        left: a(c.slice(0, d), e + 1, h),
                        right: a(c.slice(d + 1), e + 1, h)
                    }
                }
                var b = this,
                    c = b.kdDimensions;
                delete b.kdTree;
                E(function() {
                    b.kdTree = a(b.getValidPoints(null, !b.directTouch), c, c)
                }, b.options.kdNow ? 0 : 1)
            },
            searchKDTree: function(a, b) {
                function c(a, b, f, g) {
                    var m = b.point,
                        q = e.kdAxisArray[f % g],
                        p, l, w = m;
                    l = n(a[h]) && n(m[h]) ? Math.pow(a[h] - m[h], 2) : null;
                    p = n(a[k]) && n(m[k]) ? Math.pow(a[k] - m[k], 2) : null;
                    p = (l || 0) + (p || 0);
                    m.dist = n(p) ? Math.sqrt(p) : Number.MAX_VALUE;
                    m.distX = n(l) ? Math.sqrt(l) : Number.MAX_VALUE;
                    q = a[q] - m[q];
                    p = 0 > q ? "left" : "right";
                    l = 0 > q ? "right" : "left";
                    b[p] && (p = c(a, b[p], f + 1, g), w = p[d] < w[d] ? p : m);
                    b[l] && Math.sqrt(q * q) < w[d] && (a = c(a, b[l], f + 1, g), w = a[d] < w[d] ? a : w);
                    return w
                }
                var e = this,
                    h = this.kdAxisArray[0],
                    k = this.kdAxisArray[1],
                    d = b ? "distX" : "dist";
                this.kdTree || this.buildKDTree();
                if (this.kdTree) return c(a, this.kdTree, this.kdDimensions, this.kdDimensions)
            }
        })
    })(I);
    (function(a) {
        var y = a.addEvent,
            D = a.animate,
            B = a.Axis,
            z = a.createElement,
            l = a.css,
            f = a.defined,
            g = a.each,
            r = a.erase,
            n = a.extend,
            t = a.fireEvent,
            d = a.inArray,
            p = a.isObject,
            v = a.merge,
            m = a.pick,
            u = a.Point,
            e = a.Series,
            b = a.seriesTypes,
            c = a.setAnimation,
            q = a.splat;
        n(a.Chart.prototype, {
            addSeries: function(a, b, c) {
                var e, d = this;
                a && (b = m(b, !0), t(d, "addSeries", {
                    options: a
                }, function() {
                    e = d.initSeries(a);
                    d.isDirtyLegend = !0;
                    d.linkSeries();
                    b && d.redraw(c)
                }));
                return e
            },
            addAxis: function(a, b, c, e) {
                var d = b ? "xAxis" : "yAxis",
                    f = this.options;
                a = v(a, {
                    index: this[d].length,
                    isX: b
                });
                new B(this, a);
                f[d] = q(f[d] || {});
                f[d].push(a);
                m(c, !0) && this.redraw(e)
            },
            showLoading: function(a) {
                var b = this,
                    c = b.options,
                    e = b.loadingDiv,
                    d = c.loading,
                    f = function() {
                        e && l(e, {
                            left: b.plotLeft + "px",
                            top: b.plotTop + "px",
                            width: b.plotWidth + "px",
                            height: b.plotHeight + "px"
                        })
                    };
                e || (b.loadingDiv = e = z("div", {
                    className: "highcharts-loading highcharts-loading-hidden"
                }, null, b.container), b.loadingSpan = z("span", {
                    className: "highcharts-loading-inner"
                }, null, e), y(b, "redraw", f));
                setTimeout(function() {
                    e.className = "highcharts-loading"
                });
                b.loadingSpan.innerHTML = a || c.lang.loading;
                l(e, n(d.style, {
                    zIndex: 10
                }));
                l(b.loadingSpan, d.labelStyle);
                b.loadingShown || (l(e, {
                    opacity: 0,
                    display: ""
                }), D(e, {
                    opacity: d.style.opacity || .5
                }, {
                    duration: d.showDuration || 0
                }));
                b.loadingShown = !0;
                f()
            },
            hideLoading: function() {
                var a = this.options,
                    b = this.loadingDiv;
                b && (b.className = "highcharts-loading highcharts-loading-hidden", D(b, {
                    opacity: 0
                }, {
                    duration: a.loading.hideDuration || 100,
                    complete: function() {
                        l(b, {
                            display: "none"
                        })
                    }
                }));
                this.loadingShown = !1
            },
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireUpdateSeries: ["chart.polar", "chart.ignoreHiddenSeries", "chart.type", "colors", "plotOptions"],
            update: function(a, b) {
                var c, e = {
                    credits: "addCredits",
                    title: "setTitle",
                    subtitle: "setSubtitle"
                }, p = a.chart,
                    l, n;
                if (p) {
                    v(!0, this.options.chart, p);
                    "className" in p && this.setClassName(p.className);
                    if ("inverted" in p || "polar" in p) this.propFromSeries(), l = !0;
                    for (c in p) p.hasOwnProperty(c) && (-1 !== d("chart." + c, this.propsRequireUpdateSeries) && (n = !0), - 1 !== d(c, this.propsRequireDirtyBox) && (this.isDirtyBox = !0));
                    "style" in p && this.renderer.setStyle(p.style)
                }
                for (c in a) {
                    if (this[c] && "function" === typeof this[c].update) this[c].update(a[c], !1);
                    else if ("function" === typeof this[e[c]]) this[e[c]](a[c]);
                    "chart" !== c && -1 !== d(c, this.propsRequireUpdateSeries) && (n = !0)
                }
                a.colors && (this.options.colors = a.colors);
                a.plotOptions && v(!0, this.options.plotOptions, a.plotOptions);
                g(["xAxis", "yAxis", "series"], function(b) {
                    a[b] && g(q(a[b]), function(a) {
                        var c = f(a.id) && this.get(a.id) || this[b][0];
                        c && c.coll === b && c.update(a, !1)
                    }, this)
                }, this);
                l && g(this.axes,

                function(a) {
                    a.update({}, !1)
                });
                n && g(this.series, function(a) {
                    a.update({}, !1)
                });
                a.loading && v(!0, this.options.loading, a.loading);
                p && ("width" in p || "height" in p) ? this.setSize(p.width, p.height) : m(b, !0) && this.redraw()
            },
            setSubtitle: function(a) {
                this.setTitle(void 0, a)
            }
        });
        n(u.prototype, {
            update: function(a, b, c, e) {
                function d() {
                    f.applyOptions(a);
                    null === f.y && q && (f.graphic = q.destroy());
                    p(a, !0) && (q && q.element && a && a.marker && a.marker.symbol && (f.graphic = q.destroy()), a && a.dataLabels && f.dataLabel && (f.dataLabel = f.dataLabel.destroy()));
                    l = f.index;
                    g.updateParallelArrays(f, l);
                    u.data[l] = p(u.data[l], !0) ? f.options : a;
                    g.isDirty = g.isDirtyData = !0;
                    !g.fixedBox && g.hasCartesianSeries && (n.isDirtyBox = !0);
                    "point" === u.legendType && (n.isDirtyLegend = !0);
                    b && n.redraw(c)
                }
                var f = this,
                    g = f.series,
                    q = f.graphic,
                    l, n = g.chart,
                    u = g.options;
                b = m(b, !0);
                !1 === e ? d() : f.firePointEvent("update", {
                    options: a
                }, d)
            },
            remove: function(a, b) {
                this.series.removePoint(d(this, this.series.data), a, b)
            }
        });
        n(e.prototype, {
            addPoint: function(a, b, c, e) {
                var d = this.options,
                    f = this.data,
                    g = this.chart,
                    p = this.xAxis && this.xAxis.names,
                    q = d.data,
                    l, n, u = this.xData,
                    t, r;
                b = m(b, !0);
                l = {
                    series: this
                };
                this.pointClass.prototype.applyOptions.apply(l, [a]);
                r = l.x;
                t = u.length;
                if (this.requireSorting && r < u[t - 1]) for (n = !0; t && u[t - 1] > r;) t--;
                this.updateParallelArrays(l, "splice", t, 0, 0);
                this.updateParallelArrays(l, t);
                p && l.name && (p[r] = l.name);
                q.splice(t, 0, a);
                n && (this.data.splice(t, 0, null), this.processData());
                "point" === d.legendType && this.generatePoints();
                c && (f[0] && f[0].remove ? f[0].remove(!1) : (f.shift(), this.updateParallelArrays(l, "shift"), q.shift()));
                this.isDirtyData = this.isDirty = !0;
                b && g.redraw(e)
            },
            removePoint: function(a, b, e) {
                var d = this,
                    f = d.data,
                    g = f[a],
                    p = d.points,
                    q = d.chart,
                    l = function() {
                        p && p.length === f.length && p.splice(a, 1);
                        f.splice(a, 1);
                        d.options.data.splice(a, 1);
                        d.updateParallelArrays(g || {
                            series: d
                        }, "splice", a, 1);
                        g && g.destroy();
                        d.isDirty = !0;
                        d.isDirtyData = !0;
                        b && q.redraw()
                    };
                c(e, q);
                b = m(b, !0);
                g ? g.firePointEvent("remove", null, l) : l()
            },
            remove: function(a, b, c) {
                function e() {
                    d.destroy();
                    f.isDirtyLegend = f.isDirtyBox = !0;
                    f.linkSeries();
                    m(a, !0) && f.redraw(b)
                }
                var d = this,
                    f = d.chart;
                !1 !== c ? t(d, "remove", null, e) : e()
            },
            update: function(a, c) {
                var e = this,
                    d = this.chart,
                    f = this.userOptions,
                    p = this.type,
                    q = a.type || f.type || d.options.chart.type,
                    l = b[p].prototype,
                    u = ["group", "markerGroup", "dataLabelsGroup"],
                    t;
                if (q && q !== p || void 0 !== a.zIndex) u.length = 0;
                g(u, function(a) {
                    u[a] = e[a];
                    delete e[a]
                });
                a = v(f, {
                    animation: !1,
                    index: this.index,
                    pointStart: this.xData[0]
                }, {
                    data: this.options.data
                }, a);
                this.remove(!1, null, !1);
                for (t in l) this[t] = void 0;
                n(this, b[q || p].prototype);
                g(u, function(a) {
                    e[a] = u[a]
                });
                this.init(d, a);
                d.linkSeries();
                m(c, !0) && d.redraw(!1)
            }
        });
        n(B.prototype, {
            update: function(a, b) {
                var c = this.chart;
                a = c.options[this.coll][this.options.index] = v(this.userOptions, a);
                this.destroy(!0);
                this.init(c, n(a, {
                    events: void 0
                }));
                c.isDirtyBox = !0;
                m(b, !0) && c.redraw()
            },
            remove: function(a) {
                for (var b = this.chart, c = this.coll, e = this.series, d = e.length; d--;) e[d] && e[d].remove(!1);
                r(b.axes, this);
                r(b[c], this);
                b.options[c].splice(this.options.index, 1);
                g(b[c], function(a, b) {
                    a.options.index = b
                });
                this.destroy();
                b.isDirtyBox = !0;
                m(a, !0) && b.redraw()
            },
            setTitle: function(a, b) {
                this.update({
                    title: a
                }, b)
            },
            setCategories: function(a, b) {
                this.update({
                    categories: a
                }, b)
            }
        })
    })(I);
    (function(a) {
        var y = a.animObject,
            D = a.color,
            B = a.each,
            z = a.extend,
            l = a.isNumber,
            f = a.merge,
            g = a.pick,
            r = a.Series,
            n = a.seriesType,
            t = a.stop,
            d = a.svg;
        n("column", "line", {
            borderRadius: 0,
            groupPadding: .2,
            marker: null,
            pointPadding: .1,
            minPointLength: 0,
            cropThreshold: 50,
            pointRange: null,
            states: {
                hover: {
                    halo: !1,
                    brightness: .1,
                    shadow: !1
                },
                select: {
                    color: "#cccccc",
                    borderColor: "#000000",
                    shadow: !1
                }
            },
            dataLabels: {
                align: null,
                verticalAlign: null,
                y: null
            },
            softThreshold: !1,
            startFromThreshold: !0,
            stickyTracking: !1,
            tooltip: {
                distance: 6
            },
            threshold: 0,
            borderColor: "#ffffff"
        }, {
            cropShoulder: 0,
            directTouch: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            negStacks: !0,
            init: function() {
                r.prototype.init.apply(this, arguments);
                var a = this,
                    d = a.chart;
                d.hasRendered && B(d.series, function(d) {
                    d.type === a.type && (d.isDirty = !0)
                })
            },
            getColumnMetrics: function() {
                var a = this,
                    d = a.options,
                    f = a.xAxis,
                    l = a.yAxis,
                    e = f.reversed,
                    b, c = {}, q = 0;
                !1 === d.grouping ? q = 1 : B(a.chart.series, function(e) {
                    var d = e.options,
                        h = e.yAxis,
                        k;
                    e.type === a.type && e.visible && l.len === h.len && l.pos === h.pos && (d.stacking ? (b = e.stackKey, void 0 === c[b] && (c[b] = q++), k = c[b]) : !1 !== d.grouping && (k = q++), e.columnIndex = k)
                });
                var h = Math.min(Math.abs(f.transA) * (f.ordinalSlope || d.pointRange || f.closestPointRange || f.tickInterval || 1), f.len),
                    k = h * d.groupPadding,
                    n = (h - 2 * k) / q,
                    d = Math.min(d.maxPointWidth || f.len, g(d.pointWidth, n * (1 - 2 * d.pointPadding)));
                a.columnMetrics = {
                    width: d,
                    offset: (n - d) / 2 + (k + ((a.columnIndex || 0) + (e ? 1 : 0)) * n - h / 2) * (e ? -1 : 1)
                };
                return a.columnMetrics
            },
            crispCol: function(a, d, f, g) {
                var e = this.chart,
                    b = this.borderWidth,
                    c = -(b % 2 ? .5 : 0),
                    b = b % 2 ? .5 : 1;
                e.inverted && e.renderer.isVML && (b += 1);
                f = Math.round(a + f) + c;
                a = Math.round(a) + c;
                g = Math.round(d + g) + b;
                c = .5 >= Math.abs(d) && .5 < g;
                d = Math.round(d) + b;
                g -= d;
                c && g && (--d, g += 1);
                return {
                    x: a,
                    y: d,
                    width: f - a,
                    height: g
                }
            },
            translate: function() {
                var a = this,
                    d = a.chart,
                    f = a.options,
                    l = a.dense = 2 > a.closestPointRange * a.xAxis.transA,
                    l = a.borderWidth = g(f.borderWidth,
                    l ? 0 : 1),
                    e = a.yAxis,
                    b = a.translatedThreshold = e.getThreshold(f.threshold),
                    c = g(f.minPointLength, 5),
                    q = a.getColumnMetrics(),
                    h = q.width,
                    k = a.barW = Math.max(h, 1 + 2 * l),
                    n = a.pointXOffset = q.offset;
                d.inverted && (b -= .5);
                f.pointPadding && (k = Math.ceil(k));
                r.prototype.translate.apply(a);
                B(a.points, function(f) {
                    var m = g(f.yBottom, b),
                        q = 999 + Math.abs(m),
                        q = Math.min(Math.max(-q, f.plotY), e.len + q),
                        l = f.plotX + n,
                        u = k,
                        t = Math.min(q, m),
                        r, z = Math.max(q, m) - t;
                    Math.abs(z) < c && c && (z = c, r = !e.reversed && !f.negative || e.reversed && f.negative, t = Math.abs(t - b) > c ? m - c : b - (r ? c : 0));
                    f.barX = l;
                    f.pointWidth = h;
                    f.tooltipPos = d.inverted ? [e.len + e.pos - d.plotLeft - q, a.xAxis.len - l - u / 2, z] : [l + u / 2, q + e.pos - d.plotTop, z];
                    f.shapeType = "rect";
                    f.shapeArgs = a.crispCol.apply(a, f.isNull ? [f.plotX, e.len / 2, 0, 0] : [l, t, u, z])
                })
            },
            getSymbol: a.noop,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            drawGraph: function() {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            },
            pointAttribs: function(a, d) {
                var f = this.options,
                    g, e, b = this.pointAttrToOptions || {};
                e = b.stroke || "borderColor";
                var c = b["stroke-width"] || "borderWidth",
                    q = a && a.color || this.color,
                    h = f[e] || this.color || q,
                    b = f.dashStyle,
                    k;
                a && this.zones.length && (q = (g = a.getZone()) && g.color || a.options.color || this.color);
                d && (g = f.states[d], k = g.brightness, q = g.color || void 0 !== k && D(q).brighten(g.brightness).get() || q, h = g[e] || h, b = g.dashStyle || b);
                e = {
                    fill: q,
                    stroke: h,
                    "stroke-width": a[c] || f[c] || this[c] || 0
                };
                f.borderRadius && (e.r = f.borderRadius);
                b && (e.dashstyle = b);
                return e
            },
            drawPoints: function() {
                var a = this,
                    d = this.chart,
                    g = a.options,
                    n = d.renderer,
                    e = g.animationLimit || 250,
                    b;
                B(a.points, function(c) {
                    var q = c.graphic;
                    l(c.plotY) && null !== c.y ? (b = c.shapeArgs, q ? (t(q), q[d.pointCount < e ? "animate" : "attr"](f(b))) : c.graphic = q = n[c.shapeType](b).attr({
                        "class": c.getClassName()
                    }).add(c.group || a.group), q.attr(a.pointAttribs(c, c.selected && "select")).shadow(g.shadow, null, g.stacking && !g.borderRadius)) : q && (c.graphic = q.destroy())
                })
            },
            animate: function(a) {
                var f = this,
                    g = this.yAxis,
                    l = f.options,
                    e = this.chart.inverted,
                    b = {};
                d && (a ? (b.scaleY = .001, a = Math.min(g.pos + g.len, Math.max(g.pos, g.toPixels(l.threshold))),
                e ? b.translateX = a - g.len : b.translateY = a, f.group.attr(b)) : (b[e ? "translateX" : "translateY"] = g.pos, f.group.animate(b, z(y(f.options.animation), {
                    step: function(a, b) {
                        f.group.attr({
                            scaleY: Math.max(.001, b.pos)
                        })
                    }
                })), f.animate = null))
            },
            remove: function() {
                var a = this,
                    d = a.chart;
                d.hasRendered && B(d.series, function(d) {
                    d.type === a.type && (d.isDirty = !0)
                });
                r.prototype.remove.apply(a, arguments)
            }
        })
    })(I);
    (function(a) {
        var y = a.Series;
        a = a.seriesType;
        a("scatter", "line", {
            lineWidth: 0,
            marker: {
                enabled: !0
            },
            tooltip: {
                headerFormat: '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 0.85em"> {series.name}</span><br/>',
                pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
            }
        }, {
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            takeOrdinalPosition: !1,
            kdDimensions: 2,
            drawGraph: function() {
                this.options.lineWidth && y.prototype.drawGraph.call(this)
            }
        })
    })(I);
    (function(a) {
        var y = a.addEvent,
            D = a.arrayMax,
            B = a.defined,
            z = a.each,
            l = a.extend,
            f = a.format,
            g = a.map,
            r = a.merge,
            n = a.noop,
            t = a.pick,
            d = a.relativeLength,
            p = a.Series,
            v = a.seriesTypes,
            m = a.stableSort,
            u = a.stop;
        a.distribute = function(a,
        b) {
            function c(a, b) {
                return a.target - b.target
            }
            var d, h = !0,
                k = a,
                f = [],
                l;
            l = 0;
            for (d = a.length; d--;) l += a[d].size;
            if (l > b) {
                m(a, function(a, b) {
                    return (b.rank || 0) - (a.rank || 0)
                });
                for (l = d = 0; l <= b;) l += a[d].size, d++;
                f = a.splice(d - 1, a.length)
            }
            m(a, c);
            for (a = g(a, function(a) {
                return {
                    size: a.size,
                    targets: [a.target]
                }
            }); h;) {
                for (d = a.length; d--;) h = a[d], l = (Math.min.apply(0, h.targets) + Math.max.apply(0, h.targets)) / 2, h.pos = Math.min(Math.max(0, l - h.size / 2), b - h.size);
                d = a.length;
                for (h = !1; d--;) 0 < d && a[d - 1].pos + a[d - 1].size > a[d].pos && (a[d - 1].size += a[d].size, a[d - 1].targets = a[d - 1].targets.concat(a[d].targets), a[d - 1].pos + a[d - 1].size > b && (a[d - 1].pos = b - a[d - 1].size), a.splice(d, 1), h = !0)
            }
            d = 0;
            z(a, function(a) {
                var b = 0;
                z(a.targets, function() {
                    k[d].pos = a.pos + b;
                    b += k[d].size;
                    d++
                })
            });
            k.push.apply(k, f);
            m(k, c)
        };
        p.prototype.drawDataLabels = function() {
            var a = this,
                b = a.options,
                c = b.dataLabels,
                d = a.points,
                h, k, g = a.hasRendered || 0,
                m, p, n = t(c.defer, !0),
                u = a.chart.renderer;
            if (c.enabled || a._hasPointLabels) a.dlProcessOptions && a.dlProcessOptions(c), p = a.plotGroup("dataLabelsGroup", "data-labels", n && !g ? "hidden" : "visible", c.zIndex || 6), n && (p.attr({
                opacity: +g
            }), g || y(a, "afterAnimate", function() {
                a.visible && p.show(!0);
                p[b.animation ? "animate" : "attr"]({
                    opacity: 1
                }, {
                    duration: 200
                })
            })), k = c, z(d, function(d) {
                var g, q = d.dataLabel,
                    n, w, v = d.connector,
                    E = !0,
                    z, y = {};
                h = d.dlOptions || d.options && d.options.dataLabels;
                g = t(h && h.enabled, k.enabled) && null !== d.y;
                if (q && !g) d.dataLabel = q.destroy();
                else if (g) {
                    c = r(k, h);
                    z = c.style;
                    g = c.rotation;
                    n = d.getLabelConfig();
                    m = c.format ? f(c.format, n) : c.formatter.call(n, c);
                    z.color = t(c.color, z.color, a.color, "#000000");
                    if (q) B(m) ? (q.attr({
                        text: m
                    }), E = !1) : (d.dataLabel = q = q.destroy(), v && (d.connector = v.destroy()));
                    else if (B(m)) {
                        q = {
                            fill: c.backgroundColor,
                            stroke: c.borderColor,
                            "stroke-width": c.borderWidth,
                            r: c.borderRadius || 0,
                            rotation: g,
                            padding: c.padding,
                            zIndex: 1
                        };
                        "contrast" === z.color && (y.color = c.inside || 0 > c.distance || b.stacking ? u.getContrast(d.color || a.color) : "#000000");
                        b.cursor && (y.cursor = b.cursor);
                        for (w in q) void 0 === q[w] && delete q[w];
                        q = d.dataLabel = u[g ? "text" : "label"](m, 0, - 9999, c.shape,
                        null, null, c.useHTML, null, "data-label").attr(q);
                        q.addClass("highcharts-data-label-color-" + d.colorIndex + " " + (c.className || ""));
                        q.css(l(z, y));
                        q.add(p);
                        q.shadow(c.shadow)
                    }
                    q && a.alignDataLabel(d, q, c, null, E)
                }
            })
        };
        p.prototype.alignDataLabel = function(a, b, c, d, h) {
            var k = this.chart,
                f = k.inverted,
                g = t(a.plotX, - 9999),
                m = t(a.plotY, - 9999),
                p = b.getBBox(),
                n, r = c.rotation,
                v = c.align,
                z = this.visible && (a.series.forceDL || k.isInsidePlot(g, Math.round(m), f) || d && k.isInsidePlot(g, f ? d.x + 1 : d.y + d.height - 1, f)),
                y = "justify" === t(c.overflow, "justify");
            z && (n = c.style.fontSize, n = k.renderer.fontMetrics(n, b).b, d = l({
                x: f ? k.plotWidth - m : g,
                y: Math.round(f ? k.plotHeight - g : m),
                width: 0,
                height: 0
            }, d), l(c, {
                width: p.width,
                height: p.height
            }), r ? (y = !1, f = k.renderer.rotCorr(n, r), f = {
                x: d.x + c.x + d.width / 2 + f.x,
                y: d.y + c.y + {
                    top: 0,
                    middle: .5,
                    bottom: 1
                }[c.verticalAlign] * d.height
            }, b[h ? "attr" : "animate"](f).attr({
                align: v
            }), g = (r + 720) % 360, g = 180 < g && 360 > g, "left" === v ? f.y -= g ? p.height : 0 : "center" === v ? (f.x -= p.width / 2, f.y -= p.height / 2) : "right" === v && (f.x -= p.width, f.y -= g ? 0 : p.height)) : (b.align(c,
            null, d), f = b.alignAttr), y ? this.justifyDataLabel(b, c, f, p, d, h) : t(c.crop, !0) && (z = k.isInsidePlot(f.x, f.y) && k.isInsidePlot(f.x + p.width, f.y + p.height)), c.shape && !r && b.attr({
                anchorX: a.plotX,
                anchorY: a.plotY
            }));
            z || (u(b), b.attr({
                y: -9999
            }), b.placed = !1)
        };
        p.prototype.justifyDataLabel = function(a, b, c, d, h, f) {
            var g = this.chart,
                m = b.align,
                l = b.verticalAlign,
                p, n, t = a.box ? 0 : a.padding || 0;
            p = c.x + t;
            0 > p && ("right" === m ? b.align = "left" : b.x = -p, n = !0);
            p = c.x + d.width - t;
            p > g.plotWidth && ("left" === m ? b.align = "right" : b.x = g.plotWidth - p, n = !0);
            p = c.y + t;
            0 > p && ("bottom" === l ? b.verticalAlign = "top" : b.y = -p, n = !0);
            p = c.y + d.height - t;
            p > g.plotHeight && ("top" === l ? b.verticalAlign = "bottom" : b.y = g.plotHeight - p, n = !0);
            n && (a.placed = !f, a.align(b, null, h))
        };
        v.pie && (v.pie.prototype.drawDataLabels = function() {
            var e = this,
                b = e.data,
                c, d = e.chart,
                h = e.options.dataLabels,
                f = t(h.connectorPadding, 10),
                m = t(h.connectorWidth, 1),
                l = d.plotWidth,
                n = d.plotHeight,
                u, r = h.distance,
                v = e.center,
                x = v[2] / 2,
                y = v[1],
                B = 0 < r,
                A, F, L, I, S = [
                    [],
                    []
                ],
                Q, R, T, P, O = [0, 0, 0, 0];
            e.visible && (h.enabled || e._hasPointLabels) && (p.prototype.drawDataLabels.apply(e), z(b, function(a) {
                a.dataLabel && a.visible && (S[a.half].push(a), a.dataLabel._pos = null)
            }), z(S, function(b, m) {
                var p, t, u = b.length,
                    w, E, z;
                if (u) for (e.sortByAngle(b, m - .5), 0 < r && (p = Math.max(0, y - x - r), t = Math.min(y + x + r, d.plotHeight), w = g(b, function(a) {
                    if (a.dataLabel) return z = a.dataLabel.getBBox().height || 21, {
                        target: a.labelPos[1] - p + z / 2,
                        size: z,
                        rank: a.y
                    }
                }), a.distribute(w, t + z - p)), P = 0; P < u; P++) c = b[P], L = c.labelPos, A = c.dataLabel, T = !1 === c.visible ? "hidden" : "inherit", E = L[1], w ? void 0 === w[P].pos ? T = "hidden" : (I = w[P].size, R = p + w[P].pos) : R = E, Q = h.justify ? v[0] + (m ? -1 : 1) * (x + r) : e.getX(R < p + 2 || R > t - 2 ? E : R, m), A._attr = {
                    visibility: T,
                    align: L[6]
                }, A._pos = {
                    x: Q + h.x + ({
                        left: f,
                        right: -f
                    }[L[6]] || 0),
                    y: R + h.y - 10
                }, L.x = Q, L.y = R, null === e.options.size && (F = A.width, Q - F < f ? O[3] = Math.max(Math.round(F - Q + f), O[3]) : Q + F > l - f && (O[1] = Math.max(Math.round(Q + F - l + f), O[1])), 0 > R - I / 2 ? O[0] = Math.max(Math.round(-R + I / 2), O[0]) : R + I / 2 > n && (O[2] = Math.max(Math.round(R + I / 2 - n), O[2])))
            }), 0 === D(O) || this.verifyDataLabelOverflow(O)) && (this.placeDataLabels(),
            B && m && z(this.points, function(a) {
                var b;
                u = a.connector;
                if ((A = a.dataLabel) && A._pos && a.visible) {
                    T = A._attr.visibility;
                    if (b = !u) a.connector = u = d.renderer.path().addClass("highcharts-data-label-connector highcharts-color-" + a.colorIndex).add(e.dataLabelsGroup), u.attr({
                        "stroke-width": m,
                        stroke: h.connectorColor || a.color || "#666666"
                    });
                    u[b ? "attr" : "animate"]({
                        d: e.connectorPath(a.labelPos)
                    });
                    u.attr("visibility", T)
                } else u && (a.connector = u.destroy())
            }))
        }, v.pie.prototype.connectorPath = function(a) {
            var b = a.x,
                c = a.y;
            return t(this.options.softConnector, !0) ? ["M", b + ("left" === a[6] ? 5 : -5), c, "C", b, c, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4], a[5]] : ["M", b + ("left" === a[6] ? 5 : -5), c, "L", a[2], a[3], "L", a[4], a[5]]
        }, v.pie.prototype.placeDataLabels = function() {
            z(this.points, function(a) {
                var b = a.dataLabel;
                b && a.visible && ((a = b._pos) ? (b.attr(b._attr), b[b.moved ? "animate" : "attr"](a), b.moved = !0) : b && b.attr({
                    y: -9999
                }))
            })
        }, v.pie.prototype.alignDataLabel = n, v.pie.prototype.verifyDataLabelOverflow = function(a) {
            var b = this.center,
                c = this.options,
                f = c.center,
                h = c.minSize || 80,
                k, g;
            null !== f[0] ? k = Math.max(b[2] - Math.max(a[1], a[3]), h) : (k = Math.max(b[2] - a[1] - a[3], h), b[0] += (a[3] - a[1]) / 2);
            null !== f[1] ? k = Math.max(Math.min(k, b[2] - Math.max(a[0], a[2])), h) : (k = Math.max(Math.min(k, b[2] - a[0] - a[2]), h), b[1] += (a[0] - a[2]) / 2);
            k < b[2] ? (b[2] = k, b[3] = Math.min(d(c.innerSize || 0, k), k), this.translate(b), this.drawDataLabels && this.drawDataLabels()) : g = !0;
            return g
        });
        v.column && (v.column.prototype.alignDataLabel = function(a, b, c, d, h) {
            var f = this.chart.inverted,
                g = a.series,
                m = a.dlBox || a.shapeArgs,
                l = t(a.below, a.plotY > t(this.translatedThreshold,
                g.yAxis.len)),
                n = t(c.inside, !! this.options.stacking);
            m && (d = r(m), 0 > d.y && (d.height += d.y, d.y = 0), m = d.y + d.height - g.yAxis.len, 0 < m && (d.height -= m), f && (d = {
                x: g.yAxis.len - d.y - d.height,
                y: g.xAxis.len - d.x - d.width,
                width: d.height,
                height: d.width
            }), n || (f ? (d.x += l ? 0 : d.width, d.width = 0) : (d.y += l ? d.height : 0, d.height = 0)));
            c.align = t(c.align, !f || n ? "center" : l ? "right" : "left");
            c.verticalAlign = t(c.verticalAlign, f || n ? "middle" : l ? "top" : "bottom");
            p.prototype.alignDataLabel.call(this, a, b, c, d, h)
        })
    })(I);
    (function(a) {
        var y = a.Chart,
            D = a.each,
            B = a.pick,
            z = a.addEvent;
        y.prototype.callbacks.push(function(a) {
            function f() {
                var f = [];
                D(a.series, function(a) {
                    var l = a.options.dataLabels,
                        t = a.dataLabelCollections || ["dataLabel"];
                    (l.enabled || a._hasPointLabels) && !l.allowOverlap && a.visible && D(t, function(d) {
                        D(a.points, function(a) {
                            a[d] && (a[d].labelrank = B(a.labelrank, a.shapeArgs && a.shapeArgs.height), f.push(a[d]))
                        })
                    })
                });
                a.hideOverlappingLabels(f)
            }
            f();
            z(a, "redraw", f)
        });
        y.prototype.hideOverlappingLabels = function(a) {
            var f = a.length,
                g, r, n, t, d, p, v, m, u, e = function(a,
                c, e, d, f, g, m, l) {
                    return !(f > a + e || f + m < a || g > c + d || g + l < c)
                };
            for (r = 0; r < f; r++) if (g = a[r]) g.oldOpacity = g.opacity, g.newOpacity = 1;
            a.sort(function(a, c) {
                return (c.labelrank || 0) - (a.labelrank || 0)
            });
            for (r = 0; r < f; r++) for (n = a[r], g = r + 1; g < f; ++g) if (t = a[g], n && t && n.placed && t.placed && 0 !== n.newOpacity && 0 !== t.newOpacity && (d = n.alignAttr, p = t.alignAttr, v = n.parentGroup, m = t.parentGroup, u = 2 * (n.box ? 0 : n.padding), d = e(d.x + v.translateX, d.y + v.translateY, n.width - u, n.height - u, p.x + m.translateX, p.y + m.translateY, t.width - u, t.height - u)))(n.labelrank < t.labelrank ? n : t).newOpacity = 0;
            D(a, function(a) {
                var c, e;
                a && (e = a.newOpacity, a.oldOpacity !== e && a.placed && (e ? a.show(!0) : c = function() {
                    a.hide()
                }, a.alignAttr.opacity = e, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, c)), a.isOld = !0)
            })
        }
    })(I);
    (function(a) {
        var y = a.Axis,
            D = a.each,
            B = a.pick;
        a = a.wrap;
        a(y.prototype, "getSeriesExtremes", function(a) {
            var l = this.isXAxis,
                f, g, r = [],
                n;
            l && D(this.series, function(a, d) {
                a.useMapGeometry && (r[d] = a.xData, a.xData = [])
            });
            a.call(this);
            l && (f = B(this.dataMin, Number.MAX_VALUE), g = B(this.dataMax, - Number.MAX_VALUE), D(this.series, function(a, d) {
                a.useMapGeometry && (f = Math.min(f, B(a.minX, f)), g = Math.max(g, B(a.maxX, f)), a.xData = r[d], n = !0)
            }), n && (this.dataMin = f, this.dataMax = g))
        });
        a(y.prototype, "setAxisTranslation", function(a) {
            var l = this.chart,
                f = l.plotWidth / l.plotHeight,
                l = l.xAxis[0],
                g;
            a.call(this);
            "yAxis" === this.coll && void 0 !== l.transA && D(this.series, function(a) {
                a.preserveAspectRatio && (g = !0)
            });
            if (g && (this.transA = l.transA = Math.min(this.transA, l.transA), a = f / ((l.max - l.min) / (this.max - this.min)), a = 1 > a ? this : l, f = (a.max - a.min) * a.transA, a.pixelPadding = a.len - f, a.minPixelPadding = a.pixelPadding / 2, f = a.fixTo)) {
                f = f[1] - a.toValue(f[0], !0);
                f *= a.transA;
                if (Math.abs(f) > a.minPixelPadding || a.min === a.dataMin && a.max === a.dataMax) f = 0;
                a.minPixelPadding -= f
            }
        });
        a(y.prototype, "render", function(a) {
            a.call(this);
            this.fixTo = null
        })
    })(I);
    (function(a) {
        var y = a.Axis,
            D = a.Chart,
            B = a.color,
            z, l = a.each,
            f = a.extend,
            g = a.isNumber,
            r = a.Legend,
            n = a.LegendSymbolMixin,
            t = a.noop,
            d = a.merge,
            p = a.pick,
            v = a.wrap;
        z = a.ColorAxis = function() {
            this.init.apply(this,
            arguments)
        };
        f(z.prototype, y.prototype);
        f(z.prototype, {
            defaultColorAxisOptions: {
                lineWidth: 0,
                minPadding: 0,
                maxPadding: 0,
                gridLineWidth: 1,
                tickPixelInterval: 72,
                startOnTick: !0,
                endOnTick: !0,
                offset: 0,
                marker: {
                    animation: {
                        duration: 50
                    },
                    width: .01,
                    color: "#999999"
                },
                labels: {
                    overflow: "justify"
                },
                minColor: "#e6ebf5",
                maxColor: "#003399",
                tickLength: 5,
                showInLegend: !0
            },
            init: function(a, f) {
                var e = "vertical" !== a.options.legend.layout,
                    b;
                this.coll = "colorAxis";
                b = d(this.defaultColorAxisOptions, {
                    side: e ? 2 : 1,
                    reversed: !e
                }, f, {
                    opposite: !e,
                    showEmpty: !1,
                    title: null
                });
                y.prototype.init.call(this, a, b);
                f.dataClasses && this.initDataClasses(f);
                this.initStops(f);
                this.horiz = e;
                this.zoomEnabled = !1;
                this.defaultLegendLength = 200
            },
            tweenColors: function(a, d, e) {
                var b;
                d.rgba.length && a.rgba.length ? (a = a.rgba, d = d.rgba, b = 1 !== d[3] || 1 !== a[3], a = (b ? "rgba(" : "rgb(") + Math.round(d[0] + (a[0] - d[0]) * (1 - e)) + "," + Math.round(d[1] + (a[1] - d[1]) * (1 - e)) + "," + Math.round(d[2] + (a[2] - d[2]) * (1 - e)) + (b ? "," + (d[3] + (a[3] - d[3]) * (1 - e)) : "") + ")") : a = d.input || "none";
                return a
            },
            initDataClasses: function(a) {
                var f = this,
                    e = this.chart,
                    b, c = 0,
                    g = e.options.chart.colorCount,
                    h = this.options,
                    k = a.dataClasses.length;
                this.dataClasses = b = [];
                this.legendItems = [];
                l(a.dataClasses, function(a, m) {
                    var l;
                    a = d(a);
                    b.push(a);
                    a.color || ("category" === h.dataClassColor ? (l = e.options.colors, g = l.length, a.color = l[c], a.colorIndex = c, c++, c === g && (c = 0)) : a.color = f.tweenColors(B(h.minColor), B(h.maxColor), 2 > k ? .5 : m / (k - 1)))
                })
            },
            initStops: function(a) {
                this.stops = a.stops || [
                    [0, this.options.minColor],
                    [1, this.options.maxColor]
                ];
                l(this.stops, function(a) {
                    a.color = B(a[1])
                })
            },
            setOptions: function(a) {
                y.prototype.setOptions.call(this, a);
                this.options.crosshair = this.options.marker
            },
            setAxisSize: function() {
                var a = this.legendSymbol,
                    d = this.chart,
                    e = d.options.legend || {}, b, c;
                a ? (this.left = e = a.attr("x"), this.top = b = a.attr("y"), this.width = c = a.attr("width"), this.height = a = a.attr("height"), this.right = d.chartWidth - e - c, this.bottom = d.chartHeight - b - a, this.len = this.horiz ? c : a, this.pos = this.horiz ? e : b) : this.len = (this.horiz ? e.symbolWidth : e.symbolHeight) || this.defaultLegendLength
            },
            toColor: function(a,
            d) {
                var e, b = this.stops,
                    c, f = this.dataClasses,
                    h, k;
                if (f) for (k = f.length; k--;) {
                    if (h = f[k], c = h.from, b = h.to, (void 0 === c || a >= c) && (void 0 === b || a <= b)) {
                        e = h.color;
                        d && (d.dataClass = k, d.colorIndex = h.colorIndex);
                        break
                    }
                } else {
                    this.isLog && (a = this.val2lin(a));
                    e = 1 - (this.max - a) / (this.max - this.min || 1);
                    for (k = b.length; k-- && !(e > b[k][0]););
                    c = b[k] || b[k + 1];
                    b = b[k + 1] || c;
                    e = 1 - (b[0] - e) / (b[0] - c[0] || 1);
                    e = this.tweenColors(c.color, b.color, e)
                }
                return e
            },
            getOffset: function() {
                var a = this.legendGroup,
                    d = this.chart.axisOffset[this.side];
                a && (this.axisParent = a, y.prototype.getOffset.call(this), this.added || (this.added = !0, this.labelLeft = 0, this.labelRight = this.width), this.chart.axisOffset[this.side] = d)
            },
            setLegendColor: function() {
                var a, d = this.options,
                    e = this.reversed;
                a = e ? 1 : 0;
                e = e ? 0 : 1;
                a = this.horiz ? [a, 0, e, 0] : [0, e, 0, a];
                this.legendColor = {
                    linearGradient: {
                        x1: a[0],
                        y1: a[1],
                        x2: a[2],
                        y2: a[3]
                    },
                    stops: d.stops || [
                        [0, d.minColor],
                        [1, d.maxColor]
                    ]
                }
            },
            drawLegendSymbol: function(a, d) {
                var e = a.padding,
                    b = a.options,
                    c = this.horiz,
                    f = p(b.symbolWidth, c ? this.defaultLegendLength : 12),
                    h = p(b.symbolHeight,
                    c ? 12 : this.defaultLegendLength),
                    k = p(b.labelPadding, c ? 16 : 30),
                    b = p(b.itemDistance, 10);
                this.setLegendColor();
                d.legendSymbol = this.chart.renderer.rect(0, a.baseline - 11, f, h).attr({
                    zIndex: 1
                }).add(d.legendGroup);
                this.legendItemWidth = f + e + (c ? b : k);
                this.legendItemHeight = h + e + (c ? k : 0)
            },
            setState: t,
            visible: !0,
            setVisible: t,
            getSeriesExtremes: function() {
                var a;
                this.series.length && (a = this.series[0], this.dataMin = a.valueMin, this.dataMax = a.valueMax)
            },
            drawCrosshair: function(a, d) {
                var e = d && d.plotX,
                    b = d && d.plotY,
                    c, f = this.pos,
                    h = this.len;
                d && (c = this.toPixels(d[d.series.colorKey]), c < f ? c = f - 2 : c > f + h && (c = f + h + 2), d.plotX = c, d.plotY = this.len - c, y.prototype.drawCrosshair.call(this, a, d), d.plotX = e, d.plotY = b, this.cross && (this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup), this.cross.attr({
                    fill: this.crosshair.color
                })))
            },
            getPlotLinePath: function(a, d, e, b, c) {
                return g(c) ? this.horiz ? ["M", c - 4, this.top - 6, "L", c + 4, this.top - 6, c, this.top, "Z"] : ["M", this.left, c, "L", this.left - 6, c + 6, this.left - 6, c - 6, "Z"] : y.prototype.getPlotLinePath.call(this,
                a, d, e, b)
            },
            update: function(a, f) {
                var e = this.chart,
                    b = e.legend;
                l(this.series, function(a) {
                    a.isDirtyData = !0
                });
                a.dataClasses && b.allItems && (l(b.allItems, function(a) {
                    a.isDataClass && a.legendGroup.destroy()
                }), e.isDirtyLegend = !0);
                e.options[this.coll] = d(this.userOptions, a);
                y.prototype.update.call(this, a, f);
                this.legendItem && (this.setLegendColor(), b.colorizeItem(this, !0))
            },
            getDataClassLegendSymbols: function() {
                var d = this,
                    g = this.chart,
                    e = this.legendItems,
                    b = g.options.legend,
                    c = b.valueDecimals,
                    p = b.valueSuffix || "",
                    h;
                e.length || l(this.dataClasses, function(b, r) {
                    var v = !0,
                        z = b.from,
                        E = b.to;
                    h = "";
                    void 0 === z ? h = "< " : void 0 === E && (h = "> ");
                    void 0 !== z && (h += a.numberFormat(z, c) + p);
                    void 0 !== z && void 0 !== E && (h += " - ");
                    void 0 !== E && (h += a.numberFormat(E, c) + p);
                    e.push(f({
                        chart: g,
                        name: h,
                        options: {},
                        drawLegendSymbol: n.drawRectangle,
                        visible: !0,
                        setState: t,
                        isDataClass: !0,
                        setVisible: function() {
                            v = this.visible = !v;
                            l(d.series, function(a) {
                                l(a.points, function(a) {
                                    a.dataClass === r && a.setVisible(v)
                                })
                            });
                            g.legend.colorizeItem(this, v)
                        }
                    }, b))
                });
                return e
            },
            name: ""
        });
        l(["fill", "stroke"], function(d) {
            a.Fx.prototype[d + "Setter"] = function() {
                this.elem.attr(d, z.prototype.tweenColors(B(this.start), B(this.end), this.pos))
            }
        });
        v(D.prototype, "getAxes", function(a) {
            var d = this.options.colorAxis;
            a.call(this);
            this.colorAxis = [];
            d && new z(this, d)
        });
        v(r.prototype, "getAllItems", function(a) {
            var d = [],
                e = this.chart.colorAxis[0];
            e && e.options && (e.options.showInLegend && (e.options.dataClasses ? d = d.concat(e.getDataClassLegendSymbols()) : d.push(e)), l(e.series, function(a) {
                a.options.showInLegend = !1
            }));
            return d.concat(a.call(this))
        });
        v(r.prototype, "colorizeItem", function(a, d, e) {
            a.call(this, d, e);
            e && d.legendColor && d.legendSymbol.attr({
                fill: d.legendColor
            })
        })
    })(I);
    (function(a) {
        var y = a.defined,
            D = a.each,
            B = a.noop,
            z = a.seriesTypes;
        a.colorPointMixin = {
            setVisible: function(a) {
                var f = this,
                    g = a ? "show" : "hide";
                D(["graphic", "dataLabel"], function(a) {
                    if (f[a]) f[a][g]()
                })
            }
        };
        a.colorSeriesMixin = {
            pointArrayMap: ["value"],
            axisTypes: ["xAxis", "yAxis", "colorAxis"],
            optionalAxis: "colorAxis",
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            getSymbol: B,
            parallelArrays: ["x", "y", "value"],
            colorKey: "value",
            pointAttribs: z.column.prototype.pointAttribs,
            translateColors: function() {
                var a = this,
                    f = this.options.nullColor,
                    g = this.colorAxis,
                    r = this.colorKey;
                D(this.data, function(n) {
                    var t = n[r];
                    if (t = n.options.color || (null === t ? f : g && void 0 !== t ? g.toColor(t, n) : n.color || a.color)) n.color = t
                })
            },
            colorAttribs: function(a) {
                var f = {};
                y(a.color) && (f[this.colorProp || "fill"] = a.color);
                return f
            }
        }
    })(I);
    (function(a) {
        var y = a.color,
            D = a.ColorAxis,
            B = a.colorPointMixin,
            z = a.each,
            l = a.extend,
            f = a.isNumber,
            g = a.map,
            r = a.merge,
            n = a.noop,
            t = a.pick,
            d = a.isArray,
            p = a.Point,
            v = a.Series,
            m = a.seriesType,
            u = a.seriesTypes,
            e = a.splat,
            b = void 0 !== a.doc.documentElement.style.vectorEffect;
        m("map", "scatter", {
            allAreas: !0,
            animation: !1,
            nullColor: "#f7f7f7",
            borderColor: "#cccccc",
            borderWidth: 1,
            marker: null,
            stickyTracking: !1,
            joinBy: "hc-key",
            dataLabels: {
                formatter: function() {
                    return this.point.value
                },
                inside: !0,
                verticalAlign: "middle",
                crop: !1,
                overflow: !1,
                padding: 0
            },
            turboThreshold: 0,
            tooltip: {
                followPointer: !0,
                pointFormat: "{point.name}: {point.value}<br/>"
            },
            states: {
                normal: {
                    animation: !0
                },
                hover: {
                    brightness: .2,
                    halo: null
                },
                select: {
                    color: "#cccccc"
                }
            }
        }, r(a.colorSeriesMixin, {
            type: "map",
            supportsDrilldown: !0,
            getExtremesFromAll: !0,
            useMapGeometry: !0,
            forceDL: !0,
            searchPoint: n,
            directTouch: !0,
            preserveAspectRatio: !0,
            pointArrayMap: ["value"],
            getBox: function(b) {
                var d = Number.MAX_VALUE,
                    e = -d,
                    k = d,
                    g = -d,
                    l = d,
                    m = d,
                    p = this.xAxis,
                    n = this.yAxis,
                    r;
                z(b || [], function(b) {
                    if (b.path) {
                        "string" === typeof b.path && (b.path = a.splitPath(b.path));
                        var c = b.path || [],
                            p = c.length,
                            n = !1,
                            u = -d,
                            v = d,
                            E = -d,
                            z = d,
                            y = b.properties;
                        if (!b._foundBox) {
                            for (; p--;) f(c[p]) && (n ? (u = Math.max(u, c[p]), v = Math.min(v, c[p])) : (E = Math.max(E, c[p]), z = Math.min(z, c[p])), n = !n);
                            b._midX = v + (u - v) * (b.middleX || y && y["hc-middle-x"] || .5);
                            b._midY = z + (E - z) * (b.middleY || y && y["hc-middle-y"] || .5);
                            b._maxX = u;
                            b._minX = v;
                            b._maxY = E;
                            b._minY = z;
                            b.labelrank = t(b.labelrank, (u - v) * (E - z));
                            b._foundBox = !0
                        }
                        e = Math.max(e, b._maxX);
                        k = Math.min(k, b._minX);
                        g = Math.max(g, b._maxY);
                        l = Math.min(l, b._minY);
                        m = Math.min(b._maxX - b._minX, b._maxY - b._minY, m);
                        r = !0
                    }
                });
                r && (this.minY = Math.min(l, t(this.minY, d)), this.maxY = Math.max(g, t(this.maxY, - d)), this.minX = Math.min(k, t(this.minX, d)), this.maxX = Math.max(e, t(this.maxX, - d)), p && void 0 === p.options.minRange && (p.minRange = Math.min(5 * m, (this.maxX - this.minX) / 5, p.minRange || d)), n && void 0 === n.options.minRange && (n.minRange = Math.min(5 * m, (this.maxY - this.minY) / 5, n.minRange || d)))
            },
            getExtremes: function() {
                v.prototype.getExtremes.call(this, this.valueData);
                this.chart.hasRendered && this.isDirtyData && this.getBox(this.options.data);
                this.valueMin = this.dataMin;
                this.valueMax = this.dataMax;
                this.dataMin = this.minY;
                this.dataMax = this.maxY
            },
            translatePath: function(a) {
                var b = !1,
                    d = this.xAxis,
                    e = this.yAxis,
                    g = d.min,
                    l = d.transA,
                    d = d.minPixelPadding,
                    m = e.min,
                    p = e.transA,
                    e = e.minPixelPadding,
                    n, t = [];
                if (a) for (n = a.length; n--;) f(a[n]) ? (t[n] = b ? (a[n] - g) * l + d : (a[n] - m) * p + e, b = !b) : t[n] = a[n];
                return t
            },
            setData: function(b, l, h, k) {
                var m = this.options,
                    p = this.chart.options.chart,
                    n = p && p.map,
                    t = m.mapData,
                    u = m.joinBy,
                    y = null === u,
                    x = m.keys || this.pointArrayMap,
                    B = [],
                    D = {}, A, F = this.chart.mapTransforms;
                !t && n && (t = "string" === typeof n ? a.maps[n] : n);
                y && (u = "_i");
                u = this.joinBy = e(u);
                u[1] || (u[1] = u[0]);
                b && z(b, function(a, e) {
                    var h = 0;
                    if (f(a)) b[e] = {
                        value: a
                    };
                    else if (d(a)) {
                        b[e] = {};
                        !m.keys && a.length > x.length && "string" === typeof a[0] && (b[e]["hc-key"] = a[0], ++h);
                        for (var k = 0; k < x.length; ++k, ++h) x[k] && (b[e][x[k]] = a[h])
                    }
                    y && (b[e]._i = e)
                });
                this.getBox(b);
                if (this.chart.mapTransforms = F = p && p.mapTransforms || t && t["hc-transform"] || F) for (A in F) F.hasOwnProperty(A) && A.rotation && (A.cosAngle = Math.cos(A.rotation), A.sinAngle = Math.sin(A.rotation));
                if (t) {
                    "FeatureCollection" === t.type && (this.mapTitle = t.title, t = a.geojson(t, this.type, this));
                    this.mapData = t;
                    this.mapMap = {};
                    for (A = 0; A < t.length; A++) p = t[A], n = p.properties, p._i = A, u[0] && n && n[u[0]] && (p[u[0]] = n[u[0]]), D[p[u[0]]] = p;
                    this.mapMap = D;
                    b && u[1] && z(b, function(a) {
                        D[a[u[1]]] && B.push(D[a[u[1]]])
                    });
                    m.allAreas ? (this.getBox(t), b = b || [], u[1] && z(b, function(a) {
                        B.push(a[u[1]])
                    }), B = "|" + g(B, function(a) {
                        return a && a[u[0]]
                    }).join("|") + "|", z(t, function(a) {
                        u[0] && -1 !== B.indexOf("|" + a[u[0]] + "|") || (b.push(r(a, {
                            value: null
                        })),
                        k = !1)
                    })) : this.getBox(B)
                }
                v.prototype.setData.call(this, b, l, h, k)
            },
            drawGraph: n,
            drawDataLabels: n,
            doFullTranslate: function() {
                return this.isDirtyData || this.chart.isResizing || this.chart.renderer.isVML || !this.baseTrans
            },
            translate: function() {
                var a = this,
                    b = a.xAxis,
                    d = a.yAxis,
                    e = a.doFullTranslate();
                a.generatePoints();
                z(a.data, function(f) {
                    f.plotX = b.toPixels(f._midX, !0);
                    f.plotY = d.toPixels(f._midY, !0);
                    e && (f.shapeType = "path", f.shapeArgs = {
                        d: a.translatePath(f.path)
                    })
                });
                a.translateColors()
            },
            pointAttribs: function(a, d) {
                var e = u.column.prototype.pointAttribs.call(this, a, d);
                a.isFading && delete e.fill;
                b ? e["vector-effect"] = "non-scaling-stroke" : e["stroke-width"] = "inherit";
                return e
            },
            drawPoints: function() {
                var a = this,
                    d = a.xAxis,
                    e = a.yAxis,
                    f = a.group,
                    g = a.chart,
                    l = g.renderer,
                    m, p = this.baseTrans;
                a.transformGroup || (a.transformGroup = l.g().attr({
                    scaleX: 1,
                    scaleY: 1
                }).add(f), a.transformGroup.survive = !0);
                a.doFullTranslate() ? (g.hasRendered && z(a.points, function(b) {
                    b.shapeArgs && (b.shapeArgs.fill = a.pointAttribs(b, b.state).fill)
                }), a.group = a.transformGroup,
                u.column.prototype.drawPoints.apply(a), a.group = f, z(a.points, function(a) {
                    a.graphic && (a.name && a.graphic.addClass("highcharts-name-" + a.name.replace(" ", "-").toLowerCase()), a.properties && a.properties["hc-key"] && a.graphic.addClass("highcharts-key-" + a.properties["hc-key"].toLowerCase()))
                }), this.baseTrans = {
                    originX: d.min - d.minPixelPadding / d.transA,
                    originY: e.min - e.minPixelPadding / e.transA + (e.reversed ? 0 : e.len / e.transA),
                    transAX: d.transA,
                    transAY: e.transA
                }, this.transformGroup.animate({
                    translateX: 0,
                    translateY: 0,
                    scaleX: 1,
                    scaleY: 1
                })) : (m = d.transA / p.transAX, f = e.transA / p.transAY, d = d.toPixels(p.originX, !0), e = e.toPixels(p.originY, !0), .99 < m && 1.01 > m && .99 < f && 1.01 > f && (f = m = 1, d = Math.round(d), e = Math.round(e)), this.transformGroup.animate({
                    translateX: d,
                    translateY: e,
                    scaleX: m,
                    scaleY: f
                }));
                b || a.group.element.setAttribute("stroke-width", a.options[a.pointAttrToOptions && a.pointAttrToOptions["stroke-width"] || "borderWidth"] / (m || 1));
                this.drawMapDataLabels()
            },
            drawMapDataLabels: function() {
                v.prototype.drawDataLabels.call(this);
                this.dataLabelsGroup && this.dataLabelsGroup.clip(this.chart.clipRect)
            },
            render: function() {
                var a = this,
                    b = v.prototype.render;
                a.chart.renderer.isVML && 3E3 < a.data.length ? setTimeout(function() {
                    b.call(a)
                }) : b.call(a)
            },
            animate: function(a) {
                var b = this.options.animation,
                    d = this.group,
                    e = this.xAxis,
                    f = this.yAxis,
                    g = e.pos,
                    l = f.pos;
                this.chart.renderer.isSVG && (!0 === b && (b = {
                    duration: 1E3
                }), a ? d.attr({
                    translateX: g + e.len / 2,
                    translateY: l + f.len / 2,
                    scaleX: .001,
                    scaleY: .001
                }) : (d.animate({
                    translateX: g,
                    translateY: l,
                    scaleX: 1,
                    scaleY: 1
                }, b), this.animate = null))
            },
            animateDrilldown: function(a) {
                var b = this.chart.plotBox,
                    d = this.chart.drilldownLevels[this.chart.drilldownLevels.length - 1],
                    e = d.bBox,
                    f = this.chart.options.drilldown.animation;
                a || (a = Math.min(e.width / b.width, e.height / b.height), d.shapeArgs = {
                    scaleX: a,
                    scaleY: a,
                    translateX: e.x,
                    translateY: e.y
                }, z(this.points, function(a) {
                    a.graphic && a.graphic.attr(d.shapeArgs).animate({
                        scaleX: 1,
                        scaleY: 1,
                        translateX: 0,
                        translateY: 0
                    }, f)
                }), this.animate = null)
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            animateDrillupFrom: function(a) {
                u.column.prototype.animateDrillupFrom.call(this,
                a)
            },
            animateDrillupTo: function(a) {
                u.column.prototype.animateDrillupTo.call(this, a)
            }
        }), l({
            applyOptions: function(a, b) {
                var d = p.prototype.applyOptions.call(this, a, b),
                    e = this.series,
                    f = e.joinBy;
                e.mapData && ((f = void 0 !== d[f[1]] && e.mapMap[d[f[1]]]) ? (e.xyFromShape && (d.x = f._midX, d.y = f._midY), l(d, f)) : d.value = d.value || null);
                return d
            },
            onMouseOver: function(a) {
                clearTimeout(this.colorInterval);
                if (null !== this.value) p.prototype.onMouseOver.call(this, a);
                else this.series.onMouseOut(a)
            },
            onMouseOut: function() {
                var a = this,
                    b = +new Date,
                    d = y(this.series.pointAttribs(a).fill),
                    e = y(this.series.pointAttribs(a, "hover").fill),
                    f = a.series.options.states.normal.animation,
                    g = f && (f.duration || 500);
                g && 4 === d.rgba.length && 4 === e.rgba.length && "select" !== a.state && (clearTimeout(a.colorInterval), a.colorInterval = setInterval(function() {
                    var f = (new Date - b) / g,
                        l = a.graphic;
                    1 < f && (f = 1);
                    l && l.attr("fill", D.prototype.tweenColors.call(0, e, d, f));
                    1 <= f && clearTimeout(a.colorInterval)
                }, 13));
                a.isFading = !0;
                p.prototype.onMouseOut.call(a);
                a.isFading = null
            },
            zoomTo: function() {
                var a = this.series;
                a.xAxis.setExtremes(this._minX, this._maxX, !1);
                a.yAxis.setExtremes(this._minY, this._maxY, !1);
                a.chart.redraw()
            }
        }, B))
    })(I);
    (function(a) {
        function y(a) {
            a && (a.preventDefault && a.preventDefault(), a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        }
        var D = a.addEvent,
            B = a.Chart,
            z = a.doc,
            l = a.each,
            f = a.extend,
            g = a.merge,
            r = a.pick;
        a = a.wrap;
        f(B.prototype, {
            renderMapNavigation: function() {
                var a = this,
                    l = this.options.mapNavigation,
                    d = l.buttons,
                    p, v, m, u, e, b = function(b) {
                        this.handler.call(a, b);
                        y(b)
                    };
                if (r(l.enableButtons,
                l.enabled) && !a.renderer.forExport) for (p in a.mapNavButtons = [], d) d.hasOwnProperty(p) && (m = g(l.buttonOptions, d[p]), v = m.theme, v.style = g(m.theme.style, m.style), e = (u = v.states) && u.hover, u = u && u.select, v = a.renderer.button(m.text, 0, 0, b, v, e, u, 0, "zoomIn" === p ? "topbutton" : "bottombutton").addClass("highcharts-map-navigation").attr({
                    width: m.width,
                    height: m.height,
                    title: a.options.lang[p],
                    padding: m.padding,
                    zIndex: 5
                }).add(), v.handler = m.onclick, v.align(f(m, {
                    width: v.width,
                    height: 2 * v.height
                }), null, m.alignTo), D(v.element, "dblclick", y), a.mapNavButtons.push(v))
            },
            fitToBox: function(a, f) {
                l([
                    ["x", "width"],
                    ["y", "height"]
                ], function(d) {
                    var g = d[0];
                    d = d[1];
                    a[g] + a[d] > f[g] + f[d] && (a[d] > f[d] ? (a[d] = f[d], a[g] = f[g]) : a[g] = f[g] + f[d] - a[d]);
                    a[d] > f[d] && (a[d] = f[d]);
                    a[g] < f[g] && (a[g] = f[g])
                });
                return a
            },
            mapZoom: function(a, f, d, g, l) {
                var m = this.xAxis[0],
                    u = m.max - m.min,
                    e = r(f, m.min + u / 2),
                    b = u * a,
                    u = this.yAxis[0],
                    c = u.max - u.min,
                    q = r(d, u.min + c / 2),
                    c = c * a,
                    e = this.fitToBox({
                        x: e - b * (g ? (g - m.pos) / m.len : .5),
                        y: q - c * (l ? (l - u.pos) / u.len : .5),
                        width: b,
                        height: c
                    }, {
                        x: m.dataMin,
                        y: u.dataMin,
                        width: m.dataMax - m.dataMin,
                        height: u.dataMax - u.dataMin
                    }),
                    b = e.x <= m.dataMin && e.width >= m.dataMax - m.dataMin && e.y <= u.dataMin && e.height >= u.dataMax - u.dataMin;
                g && (m.fixTo = [g - m.pos, f]);
                l && (u.fixTo = [l - u.pos, d]);
                void 0 === a || b ? (m.setExtremes(void 0, void 0, !1), u.setExtremes(void 0, void 0, !1)) : (m.setExtremes(e.x, e.x + e.width, !1), u.setExtremes(e.y, e.y + e.height, !1));
                this.redraw()
            }
        });
        a(B.prototype, "render", function(a) {
            var f = this,
                d = f.options.mapNavigation;
            f.renderMapNavigation();
            a.call(f);
            (r(d.enableDoubleClickZoom,
            d.enabled) || d.enableDoubleClickZoomTo) && D(f.container, "dblclick", function(a) {
                f.pointer.onContainerDblClick(a)
            });
            r(d.enableMouseWheelZoom, d.enabled) && D(f.container, void 0 === z.onmousewheel ? "DOMMouseScroll" : "mousewheel", function(a) {
                f.pointer.onContainerMouseWheel(a);
                y(a);
                return !1
            })
        })
    })(I);
    (function(a) {
        var y = a.extend,
            D = a.pick,
            B = a.Pointer;
        a = a.wrap;
        y(B.prototype, {
            onContainerDblClick: function(a) {
                var l = this.chart;
                a = this.normalize(a);
                l.options.mapNavigation.enableDoubleClickZoomTo ? l.pointer.inClass(a.target, "highcharts-tracker") && l.hoverPoint && l.hoverPoint.zoomTo() : l.isInsidePlot(a.chartX - l.plotLeft, a.chartY - l.plotTop) && l.mapZoom(.5, l.xAxis[0].toValue(a.chartX), l.yAxis[0].toValue(a.chartY), a.chartX, a.chartY)
            },
            onContainerMouseWheel: function(a) {
                var l = this.chart,
                    f;
                a = this.normalize(a);
                f = a.detail || -(a.wheelDelta / 120);
                l.isInsidePlot(a.chartX - l.plotLeft, a.chartY - l.plotTop) && l.mapZoom(Math.pow(l.options.mapNavigation.mouseWheelSensitivity, f), l.xAxis[0].toValue(a.chartX), l.yAxis[0].toValue(a.chartY), a.chartX,
                a.chartY)
            }
        });
        a(B.prototype, "zoomOption", function(a) {
            var l = this.chart.options.mapNavigation;
            a.apply(this, [].slice.call(arguments, 1));
            D(l.enableTouchZoom, l.enabled) && (this.pinchX = this.pinchHor = this.pinchY = this.pinchVert = this.hasZoom = !0)
        });
        a(B.prototype, "pinchTranslate", function(a, l, f, g, r, n, t) {
            a.call(this, l, f, g, r, n, t);
            "map" === this.chart.options.chart.type && this.hasZoom && (a = g.scaleX > g.scaleY, this.pinchTranslateDirection(!a, l, f, g, r, n, t, a ? g.scaleX : g.scaleY))
        })
    })(I);
    (function(a) {
        var y = a.seriesType,
            D = a.seriesTypes;
        y("mapline", "map", {
            lineWidth: 1,
            fillColor: "none"
        }, {
            type: "mapline",
            colorProp: "stroke",
            pointAttrToOptions: {
                stroke: "color",
                "stroke-width": "lineWidth"
            },
            pointAttribs: function(a, y) {
                var l = D.map.prototype.pointAttribs.call(this, a, y);
                l.fill = this.options.fillColor;
                return l
            },
            drawLegendSymbol: D.line.prototype.drawLegendSymbol
        })
    })(I);
    (function(a) {
        var y = a.merge,
            D = a.Point;
        a = a.seriesType;
        a("mappoint", "scatter", {
            dataLabels: {
                enabled: !0,
                formatter: function() {
                    return this.point.name
                },
                crop: !1,
                defer: !1,
                overflow: !1,
                style: {
                    color: "#000000"
                }
            }
        }, {
            type: "mappoint",
            forceDL: !0
        }, {
            applyOptions: function(a, z) {
                var l = void 0 !== a.lat && void 0 !== a.lon ? y(a, this.series.chart.fromLatLonToPoint(a)) : a;
                return D.prototype.applyOptions.call(this, l, z)
            }
        })
    })(I);
    (function(a) {
        var y = a.arrayMax,
            D = a.arrayMin,
            B = a.Axis,
            z = a.color,
            l = a.each,
            f = a.isNumber,
            g = a.noop,
            r = a.pick,
            n = a.pInt,
            t = a.Point,
            d = a.Series,
            p = a.seriesType,
            v = a.seriesTypes;
        p("bubble", "scatter", {
            dataLabels: {
                formatter: function() {
                    return this.point.z
                },
                inside: !0,
                verticalAlign: "middle"
            },
            marker: {
                lineColor: null,
                lineWidth: 1,
                radius: null,
                states: {
                    hover: {
                        radiusPlus: 0
                    }
                }
            },
            minSize: 8,
            maxSize: "20%",
            softThreshold: !1,
            states: {
                hover: {
                    halo: {
                        size: 5
                    }
                }
            },
            tooltip: {
                pointFormat: "({point.x}, {point.y}), Size: {point.z}"
            },
            turboThreshold: 0,
            zThreshold: 0,
            zoneAxis: "z"
        }, {
            pointArrayMap: ["y", "z"],
            parallelArrays: ["x", "y", "z"],
            trackerGroups: ["group", "dataLabelsGroup"],
            bubblePadding: !0,
            zoneAxis: "z",
            pointAttribs: function(a, f) {
                var e = r(this.options.marker.fillOpacity, .5),
                    b = d.prototype.pointAttribs.call(this, a, f);
                1 !== e && (b.fill = z(b.fill).setOpacity(e).get("rgba"));
                return b
            },
            getRadii: function(a, d, e, b) {
                var c, f, h, g = this.zData,
                    l = [],
                    p = this.options,
                    n = "width" !== p.sizeBy,
                    t = p.zThreshold,
                    r = d - a;
                f = 0;
                for (c = g.length; f < c; f++) h = g[f], p.sizeByAbsoluteValue && null !== h && (h = Math.abs(h - t), d = Math.max(d - t, Math.abs(a - t)), a = 0), null === h ? h = null : h < a ? h = e / 2 - 1 : (h = 0 < r ? (h - a) / r : .5, n && 0 <= h && (h = Math.sqrt(h)), h = Math.ceil(e + h * (b - e)) / 2), l.push(h);
                this.radii = l
            },
            animate: function(a) {
                var d = this.options.animation;
                a || (l(this.points, function(a) {
                    var b = a.graphic;
                    a = a.shapeArgs;
                    b && a && (b.attr("r", 1), b.animate({
                        r: a.r
                    },
                    d))
                }), this.animate = null)
            },
            translate: function() {
                var a, d = this.data,
                    e, b, c = this.radii;
                v.scatter.prototype.translate.call(this);
                for (a = d.length; a--;) e = d[a], b = c ? c[a] : 0, f(b) && b >= this.minPxSize / 2 ? (e.shapeType = "circle", e.shapeArgs = {
                    x: e.plotX,
                    y: e.plotY,
                    r: b
                }, e.dlBox = {
                    x: e.plotX - b,
                    y: e.plotY - b,
                    width: 2 * b,
                    height: 2 * b
                }) : e.shapeArgs = e.plotY = e.dlBox = void 0
            },
            drawLegendSymbol: function(a, d) {
                var e = this.chart.renderer,
                    b = e.fontMetrics(a.itemStyle.fontSize).f / 2;
                d.legendSymbol = e.circle(b, a.baseline - b, b).attr({
                    zIndex: 3
                }).add(d.legendGroup);
                d.legendSymbol.isMarker = !0
            },
            drawPoints: v.column.prototype.drawPoints,
            alignDataLabel: v.column.prototype.alignDataLabel,
            buildKDTree: g,
            applyZones: g
        }, {
            haloPath: function() {
                return t.prototype.haloPath.call(this, this.shapeArgs.r + this.series.options.states.hover.halo.size)
            },
            ttBelow: !1
        });
        B.prototype.beforePadding = function() {
            var a = this,
                d = this.len,
                e = this.chart,
                b = 0,
                c = d,
                g = this.isXAxis,
                h = g ? "xData" : "yData",
                k = this.min,
                p = {}, t = Math.min(e.plotWidth, e.plotHeight),
                v = Number.MAX_VALUE,
                E = -Number.MAX_VALUE,
                z = this.max - k,
                B = d / z,
                x = [];
            l(this.series, function(b) {
                var c = b.options;
                !b.bubblePadding || !b.visible && e.options.chart.ignoreHiddenSeries || (a.allowZoomOutside = !0, x.push(b), g && (l(["minSize", "maxSize"], function(a) {
                    var b = c[a],
                        d = /%$/.test(b),
                        b = n(b);
                    p[a] = d ? t * b / 100 : b
                }), b.minPxSize = p.minSize, b.maxPxSize = p.maxSize, b = b.zData, b.length && (v = r(c.zMin, Math.min(v, Math.max(D(b), !1 === c.displayNegative ? c.zThreshold : -Number.MAX_VALUE))), E = r(c.zMax, Math.max(E, y(b))))))
            });
            l(x, function(d) {
                var e = d[h],
                    l = e.length,
                    p;
                g && d.getRadii(v, E, d.minPxSize,
                d.maxPxSize);
                if (0 < z) for (; l--;) f(e[l]) && a.dataMin <= e[l] && e[l] <= a.dataMax && (p = d.radii[l], b = Math.min((e[l] - k) * B - p, b), c = Math.max((e[l] - k) * B + p, c))
            });
            x.length && 0 < z && !this.isLog && (c -= d, B *= (d + b - c) / d, l([
                ["min", "userMin", b],
                ["max", "userMax", c]
            ], function(b) {
                void 0 === r(a.options[b[0]], a[b[1]]) && (a[b[0]] += b[2] / B)
            }))
        }
    })(I);
    (function(a) {
        var y = a.extend,
            D = a.Point,
            B = a.seriesType,
            z = a.seriesTypes;
        z.bubble && B("mapbubble", "bubble", {
            animationLimit: 500,
            tooltip: {
                pointFormat: "{point.name}: {point.z}"
            }
        }, {
            xyFromShape: !0,
            type: "mapbubble",
            pointArrayMap: ["z"],
            getMapData: z.map.prototype.getMapData,
            getBox: z.map.prototype.getBox,
            setData: z.map.prototype.setData
        }, {
            applyOptions: function(a, f) {
                var g;
                a && void 0 !== a.lat && void 0 !== a.lon ? (g = D.prototype.applyOptions.call(this, a, f), g = y(g, this.series.chart.fromLatLonToPoint(g))) : g = z.map.prototype.pointClass.prototype.applyOptions.call(this, a, f);
                return g
            },
            ttBelow: !1
        })
    })(I);
    (function(a) {
        function y(a, d) {
            var f, g, l, n, e = !1,
                b = a.x,
                c = a.y;
            f = 0;
            for (g = d.length - 1; f < d.length; g = f++) l = d[f][1] > c, n = d[g][1] > c, l !== n && b < (d[g][0] - d[f][0]) * (c - d[f][1]) / (d[g][1] - d[f][1]) + d[f][0] && (e = !e);
            return e
        }
        var D = a.Chart,
            B = a.each,
            z = a.extend,
            l = a.error,
            f = a.format,
            g = a.merge,
            r = a.win,
            n = a.wrap;
        D.prototype.transformFromLatLon = function(a, d) {
            if (void 0 === r.proj4) return l(21), {
                x: 0,
                y: null
            };
            var f = r.proj4(d.crs, [a.lon, a.lat]),
                g = d.cosAngle || d.rotation && Math.cos(d.rotation),
                m = d.sinAngle || d.rotation && Math.sin(d.rotation),
                f = d.rotation ? [f[0] * g + f[1] * m, - f[0] * m + f[1] * g] : f;
            return {
                x: ((f[0] - (d.xoffset || 0)) * (d.scale || 1) + (d.xpan || 0)) * (d.jsonres || 1) + (d.jsonmarginX || 0),
                y: (((d.yoffset || 0) - f[1]) * (d.scale || 1) + (d.ypan || 0)) * (d.jsonres || 1) - (d.jsonmarginY || 0)
            }
        };
        D.prototype.transformToLatLon = function(a, d) {
            if (void 0 === r.proj4) l(21);
            else {
                var f = {
                    x: ((a.x - (d.jsonmarginX || 0)) / (d.jsonres || 1) - (d.xpan || 0)) / (d.scale || 1) + (d.xoffset || 0),
                    y: ((-a.y - (d.jsonmarginY || 0)) / (d.jsonres || 1) + (d.ypan || 0)) / (d.scale || 1) + (d.yoffset || 0)
                }, g = d.cosAngle || d.rotation && Math.cos(d.rotation),
                    m = d.sinAngle || d.rotation && Math.sin(d.rotation),
                    f = r.proj4(d.crs, "WGS84", d.rotation ? {
                        x: f.x * g + f.y * -m,
                        y: f.x * m + f.y * g
                    } : f);
                return {
                    lat: f.y,
                    lon: f.x
                }
            }
        };
        D.prototype.fromPointToLatLon = function(a) {
            var d = this.mapTransforms,
                f;
            if (d) {
                for (f in d) if (d.hasOwnProperty(f) && d[f].hitZone && y({
                    x: a.x,
                    y: -a.y
                }, d[f].hitZone.coordinates[0])) return this.transformToLatLon(a, d[f]);
                return this.transformToLatLon(a, d["default"])
            }
            l(22)
        };
        D.prototype.fromLatLonToPoint = function(a) {
            var d = this.mapTransforms,
                f, g;
            if (!d) return l(22), {
                x: 0,
                y: null
            };
            for (f in d) if (d.hasOwnProperty(f) && d[f].hitZone && (g = this.transformFromLatLon(a, d[f]), y({
                x: g.x,
                y: -g.y
            }, d[f].hitZone.coordinates[0]))) return g;
            return this.transformFromLatLon(a, d["default"])
        };
        a.geojson = function(a, d, g) {
            var l = [],
                m = [],
                n = function(a) {
                    var b, c = a.length;
                    m.push("M");
                    for (b = 0; b < c; b++) 1 === b && m.push("L"), m.push(a[b][0], - a[b][1])
                };
            d = d || "map";
            B(a.features, function(a) {
                var b = a.geometry,
                    c = b.type,
                    b = b.coordinates;
                a = a.properties;
                var f;
                m = [];
                "map" === d || "mapbubble" === d ? ("Polygon" === c ? (B(b, n), m.push("Z")) : "MultiPolygon" === c && (B(b, function(a) {
                    B(a, n)
                }), m.push("Z")), m.length && (f = {
                    path: m
                })) : "mapline" === d ? ("LineString" === c ? n(b) : "MultiLineString" === c && B(b, n), m.length && (f = {
                    path: m
                })) : "mappoint" === d && "Point" === c && (f = {
                    x: b[0],
                    y: -b[1]
                });
                f && l.push(z(f, {
                    name: a.name || a.NAME,
                    properties: a
                }))
            });
            g && a.copyrightShort && (g.chart.mapCredits = f(g.chart.options.credits.mapText, {
                geojson: a
            }), g.chart.mapCreditsFull = f(g.chart.options.credits.mapTextFull, {
                geojson: a
            }));
            return l
        };
        n(D.prototype, "addCredits", function(a, d) {
            d = g(!0, this.options.credits, d);
            this.mapCredits && (d.href = null);
            a.call(this, d);
            this.credits && this.mapCreditsFull && this.credits.attr({
                title: this.mapCreditsFull
            })
        })
    })(I);
    (function(a) {
        function y(a, f, g, l, n, e, b, c) {
            return ["M", a + n, f, "L", a + g - e, f, "C", a + g - e / 2, f, a + g, f + e / 2, a + g, f + e, "L", a + g, f + l - b, "C", a + g, f + l - b / 2, a + g - b / 2, f + l, a + g - b, f + l, "L", a + c, f + l, "C", a + c / 2, f + l, a, f + l - c / 2, a, f + l - c, "L", a, f + n, "C", a, f + n / 2, a + n / 2, f, a + n, f, "Z"]
        }
        var D = a.Chart,
            B = a.defaultOptions,
            z = a.each,
            l = a.extend,
            f = a.merge,
            g = a.pick,
            r = a.Renderer,
            n = a.SVGRenderer,
            t = a.VMLRenderer;
        l(B.lang, {
            zoomIn: "Zoom in",
            zoomOut: "Zoom out"
        });
        B.mapNavigation = {
            buttonOptions: {
                alignTo: "plotBox",
                align: "left",
                verticalAlign: "top",
                x: 0,
                width: 18,
                height: 18,
                padding: 5,
                style: {
                    fontSize: "15px",
                    fontWeight: "bold"
                },
                theme: {
                    "stroke-width": 1,
                    "text-align": "center"
                }
            },
            buttons: {
                zoomIn: {
                    onclick: function() {
                        this.mapZoom(.5)
                    },
                    text: "+",
                    y: 0
                },
                zoomOut: {
                    onclick: function() {
                        this.mapZoom(2)
                    },
                    text: "-",
                    y: 28
                }
            },
            mouseWheelSensitivity: 1.1
        };
        a.splitPath = function(a) {
            var f;
            a = a.replace(/([A-Za-z])/g, " $1 ");
            a = a.replace(/^\s*/, "").replace(/\s*$/, "");
            a = a.split(/[ ,]+/);
            for (f = 0; f < a.length; f++) /[a-zA-Z]/.test(a[f]) || (a[f] = parseFloat(a[f]));
            return a
        };
        a.maps = {};
        n.prototype.symbols.topbutton = function(a, f, g, l, n) {
            return y(a - 1, f - 1, g, l, n.r, n.r, 0, 0)
        };
        n.prototype.symbols.bottombutton = function(a, f, g, l, n) {
            return y(a - 1, f - 1, g, l, 0, 0, n.r, n.r)
        };
        r === t && z(["topbutton", "bottombutton"], function(a) {
            t.prototype.symbols[a] = n.prototype.symbols[a]
        });
        a.Map = a.mapChart = function(d, l, n) {
            var m = "string" === typeof d || d.nodeName,
                r = arguments[m ? 1 : 0],
                e = {
                    endOnTick: !1,
                    visible: !1,
                    minPadding: 0,
                    maxPadding: 0,
                    startOnTick: !1
                }, b, c = a.getOptions().credits;
            b = r.series;
            r.series = null;
            r = f({
                chart: {
                    panning: "xy",
                    type: "map"
                },
                credits: {
                    mapText: g(c.mapText, ' \u00a9 <a href="{geojson.copyrightUrl}">{geojson.copyrightShort}</a>'),
                    mapTextFull: g(c.mapTextFull, "{geojson.copyright}")
                },
                xAxis: e,
                yAxis: f(e, {
                    reversed: !0
                })
            }, r, {
                chart: {
                    inverted: !1,
                    alignTicks: !1
                }
            });
            r.series = b;
            return m ? new D(d, r, n) : new D(r, l)
        }
    })(I);
    (function(a) {
        var y = a.colorPointMixin,
            D = a.each,
            B = a.merge,
            z = a.noop,
            l = a.pick,
            f = a.Series,
            g = a.seriesType,
            r = a.seriesTypes;
        g("heatmap", "scatter", {
            animation: !1,
            borderWidth: 0,
            nullColor: "#f7f7f7",
            dataLabels: {
                formatter: function() {
                    return this.point.value
                },
                inside: !0,
                verticalAlign: "middle",
                crop: !1,
                overflow: !1,
                padding: 0
            },
            marker: null,
            pointRange: null,
            tooltip: {
                pointFormat: "{point.x}, {point.y}: {point.value}<br/>"
            },
            states: {
                normal: {
                    animation: !0
                },
                hover: {
                    halo: !1,
                    brightness: .2
                }
            }
        }, B(a.colorSeriesMixin, {
            pointArrayMap: ["y", "value"],
            hasPointSpecificOptions: !0,
            supportsDrilldown: !0,
            getExtremesFromAll: !0,
            directTouch: !0,
            init: function() {
                var a;
                r.scatter.prototype.init.apply(this, arguments);
                a = this.options;
                a.pointRange = l(a.pointRange, a.colsize || 1);
                this.yAxis.axisPointRange = a.rowsize || 1
            },
            translate: function() {
                var a = this.options,
                    f = this.xAxis,
                    d = this.yAxis,
                    g = function(a, d, f) {
                        return Math.min(Math.max(d, a), f)
                    };
                this.generatePoints();
                D(this.points, function(l) {
                    var m = (a.colsize || 1) / 2,
                        r = (a.rowsize || 1) / 2,
                        e = g(Math.round(f.len - f.translate(l.x - m, 0, 1, 0, 1)), - f.len, 2 * f.len),
                        m = g(Math.round(f.len - f.translate(l.x + m, 0, 1, 0, 1)), - f.len, 2 * f.len),
                        b = g(Math.round(d.translate(l.y - r, 0, 1, 0, 1)), - d.len, 2 * d.len),
                        r = g(Math.round(d.translate(l.y + r, 0, 1, 0, 1)), - d.len, 2 * d.len);
                    l.plotX = l.clientX = (e + m) / 2;
                    l.plotY = (b + r) / 2;
                    l.shapeType = "rect";
                    l.shapeArgs = {
                        x: Math.min(e, m),
                        y: Math.min(b, r),
                        width: Math.abs(m - e),
                        height: Math.abs(r - b)
                    }
                });
                this.translateColors()
            },
            drawPoints: function() {
                r.column.prototype.drawPoints.call(this);
                D(this.points, function(a) {
                    a.graphic.attr(this.colorAttribs(a, a.state))
                }, this)
            },
            animate: z,
            getBox: z,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            alignDataLabel: r.column.prototype.alignDataLabel,
            getExtremes: function() {
                f.prototype.getExtremes.call(this, this.valueData);
                this.valueMin = this.dataMin;
                this.valueMax = this.dataMax;
                f.prototype.getExtremes.call(this)
            }
        }), y)
    })(I);
    (function(a) {
        var y = a.addEvent,
            D = a.Chart,
            B = a.createElement,
            z = a.css,
            l = a.defaultOptions,
            f = a.defaultPlotOptions,
            g = a.each,
            r = a.extend,
            n = a.fireEvent,
            t = a.hasTouch,
            d = a.inArray,
            p = a.isObject,
            v = a.Legend,
            m = a.merge,
            u = a.pick,
            e = a.Point,
            b = a.Series,
            c = a.seriesTypes,
            q = a.svg;
        a = a.TrackerMixin = {
            drawTrackerPoint: function() {
                var a = this,
                    b = a.chart,
                    c = b.pointer,
                    d = function(a) {
                        for (var c = a.target, d; c && !d;) d = c.point, c = c.parentNode;
                        if (void 0 !== d && d !== b.hoverPoint) d.onMouseOver(a)
                    };
                g(a.points, function(a) {
                    a.graphic && (a.graphic.element.point = a);
                    a.dataLabel && (a.dataLabel.element.point = a)
                });
                a._hasTracking || (g(a.trackerGroups, function(b) {
                    if (a[b]) {
                        a[b].addClass("highcharts-tracker").on("mouseover", d).on("mouseout", function(a) {
                            c.onTrackerMouseOut(a)
                        });
                        if (t) a[b].on("touchstart", d);
                        a.options.cursor && a[b].css(z).css({
                            cursor: a.options.cursor
                        })
                    }
                }), a._hasTracking = !0)
            },
            drawTrackerGraph: function() {
                var a = this,
                    b = a.options,
                    c = b.trackByArea,
                    d = [].concat(c ? a.areaPath : a.graphPath),
                    e = d.length,
                    f = a.chart,
                    l = f.pointer,
                    m = f.renderer,
                    p = f.options.tooltip.snap,
                    n = a.tracker,
                    r, u = function() {
                        if (f.hoverSeries !== a) a.onMouseOver()
                    }, v = "rgba(192,192,192," + (q ? 1E-4 : .002) + ")";
                if (e && !c) for (r = e + 1; r--;) "M" === d[r] && d.splice(r + 1, 0, d[r + 1] - p, d[r + 2], "L"), (r && "M" === d[r] || r === e) && d.splice(r, 0, "L", d[r - 2] + p, d[r - 1]);
                n ? n.attr({
                    d: d
                }) : a.graph && (a.tracker = m.path(d).attr({
                    "stroke-linejoin": "round",
                    visibility: a.visible ? "visible" : "hidden",
                    stroke: v,
                    fill: c ? v : "none",
                    "stroke-width": a.graph.strokeWidth() + (c ? 0 : 2 * p),
                    zIndex: 2
                }).add(a.group), g([a.tracker,
                a.markerGroup], function(a) {
                    a.addClass("highcharts-tracker").on("mouseover", u).on("mouseout", function(a) {
                        l.onTrackerMouseOut(a)
                    });
                    b.cursor && a.css({
                        cursor: b.cursor
                    });
                    if (t) a.on("touchstart", u)
                }))
            }
        };
        c.column && (c.column.prototype.drawTracker = a.drawTrackerPoint);
        c.pie && (c.pie.prototype.drawTracker = a.drawTrackerPoint);
        c.scatter && (c.scatter.prototype.drawTracker = a.drawTrackerPoint);
        r(v.prototype, {
            setItemEvents: function(a, b, c) {
                var d = this,
                    e = d.chart,
                    f = "highcharts-legend-" + (a.series ? "point" : "series") + "-active";
                (c ? b : a.legendGroup).on("mouseover", function() {
                    a.setState("hover");
                    e.seriesGroup.addClass(f);
                    b.css(d.options.itemHoverStyle)
                }).on("mouseout", function() {
                    b.css(a.visible ? d.itemStyle : d.itemHiddenStyle);
                    e.seriesGroup.removeClass(f);
                    a.setState()
                }).on("click", function(b) {
                    var c = function() {
                        a.setVisible && a.setVisible()
                    };
                    b = {
                        browserEvent: b
                    };
                    a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : n(a, "legendItemClick", b, c)
                })
            },
            createCheckboxForItem: function(a) {
                a.checkbox = B("input", {
                    type: "checkbox",
                    checked: a.selected,
                    defaultChecked: a.selected
                }, this.options.itemCheckboxStyle, this.chart.container);
                y(a.checkbox, "click", function(b) {
                    n(a.series || a, "checkboxClick", {
                        checked: b.target.checked,
                        item: a
                    }, function() {
                        a.select()
                    })
                })
            }
        });
        l.legend.itemStyle.cursor = "pointer";
        r(D.prototype, {
            showResetZoom: function() {
                var a = this,
                    b = l.lang,
                    c = a.options.chart.resetZoomButton,
                    d = c.theme,
                    e = d.states,
                    f = "chart" === c.relativeTo ? null : "plotBox";
                this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function() {
                    a.zoomOut()
                }, d, e && e.hover).attr({
                    align: c.position.align,
                    title: b.resetZoomTitle
                }).addClass("highcharts-reset-zoom").add().align(c.position, !1, f)
            },
            zoomOut: function() {
                var a = this;
                n(a, "selection", {
                    resetSelection: !0
                }, function() {
                    a.zoom()
                })
            },
            zoom: function(a) {
                var b, c = this.pointer,
                    d = !1,
                    e;
                !a || a.resetSelection ? g(this.axes, function(a) {
                    b = a.zoom()
                }) : g(a.xAxis.concat(a.yAxis), function(a) {
                    var e = a.axis,
                        f = e.isXAxis;
                    if (c[f ? "zoomX" : "zoomY"] || c[f ? "pinchX" : "pinchY"]) b = e.zoom(a.min, a.max), e.displayBtn && (d = !0)
                });
                e = this.resetZoomButton;
                d && !e ? this.showResetZoom() : !d && p(e) && (this.resetZoomButton = e.destroy());
                b && this.redraw(u(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
            },
            pan: function(a, b) {
                var c = this,
                    d = c.hoverPoints,
                    e;
                d && g(d, function(a) {
                    a.setState()
                });
                g("xy" === b ? [1, 0] : [1], function(b) {
                    b = c[b ? "xAxis" : "yAxis"][0];
                    var d = b.horiz,
                        f = a[d ? "chartX" : "chartY"],
                        d = d ? "mouseDownX" : "mouseDownY",
                        g = c[d],
                        k = (b.pointRange || 0) / 2,
                        l = b.getExtremes(),
                        m = b.toValue(g - f, !0) + k,
                        k = b.toValue(g + b.len - f, !0) - k,
                        g = g > f;
                    b.series.length && (g || m > Math.min(l.dataMin, l.min)) && (!g || k < Math.max(l.dataMax, l.max)) && (b.setExtremes(m,
                    k, !1, !1, {
                        trigger: "pan"
                    }), e = !0);
                    c[d] = f
                });
                e && c.redraw(!1);
                z(c.container, {
                    cursor: "move"
                })
            }
        });
        r(e.prototype, {
            select: function(a, b) {
                var c = this,
                    e = c.series,
                    f = e.chart;
                a = u(a, !c.selected);
                c.firePointEvent(a ? "select" : "unselect", {
                    accumulate: b
                }, function() {
                    c.selected = c.options.selected = a;
                    e.options.data[d(c, e.data)] = c.options;
                    c.setState(a && "select");
                    b || g(f.getSelectedPoints(), function(a) {
                        a.selected && a !== c && (a.selected = a.options.selected = !1, e.options.data[d(a, e.data)] = a.options, a.setState(""), a.firePointEvent("unselect"))
                    })
                })
            },
            onMouseOver: function(a, b) {
                var c = this.series,
                    d = c.chart,
                    e = d.tooltip,
                    f = d.hoverPoint;
                if (d.hoverSeries !== c) c.onMouseOver();
                if (f && f !== this) f.onMouseOut();
                this.series && (this.firePointEvent("mouseOver"), !e || e.shared && !c.noSharedTooltip || e.refresh(this, a), this.setState("hover"), b || (d.hoverPoint = this))
            },
            onMouseOut: function() {
                var a = this.series.chart,
                    b = a.hoverPoints;
                this.firePointEvent("mouseOut");
                b && -1 !== d(this, b) || (this.setState(), a.hoverPoint = null)
            },
            importEvents: function() {
                if (!this.hasImportedEvents) {
                    var a = m(this.series.options.point, this.options).events,
                        b;
                    this.events = a;
                    for (b in a) y(this, b, a[b]);
                    this.hasImportedEvents = !0
                }
            },
            setState: function(a, b) {
                var c = Math.floor(this.plotX),
                    d = this.plotY,
                    e = this.series,
                    g = e.options.states[a] || {}, l = f[e.type].marker && e.options.marker || {}, p = !1 === l.enabled,
                    n = l.states && l.states[a] || {}, q = !1 === n.enabled,
                    t = e.stateMarkerGraphic,
                    v = this.marker || {}, y = e.chart,
                    z = e.halo;
                a = a || "";
                if (!(a === this.state && !b || this.selected && "select" !== a || !1 === g.enabled || a && (q || p && !1 === n.enabled) || a && v.states && v.states[a] && !1 === v.states[a].enabled)) {
                    l = n.radius || l.radius + (n.radiusPlus || 0);
                    if (this.graphic) this.state && this.graphic.removeClass("highcharts-point-" + this.state), a && this.graphic.addClass("highcharts-point-" + a), c = l ? {
                        x: c - l,
                        y: d - l,
                        width: 2 * l,
                        height: 2 * l
                    } : {}, c = m(e.pointAttribs(this, a), c), this.graphic.attr(c), t && t.hide();
                    else {
                        if (a && n) {
                            n = v.symbol || e.symbol;
                            t && t.currentSymbol !== n && (t = t.destroy());
                            if (t) t[b ? "animate" : "attr"]({
                                x: c - l,
                                y: d - l
                            });
                            else n && (e.stateMarkerGraphic = t = y.renderer.symbol(n, c - l, d - l, 2 * l, 2 * l).add(e.markerGroup),
                            t.currentSymbol = n);
                            t && t.attr(e.pointAttribs(this, a))
                        }
                        t && (t[a && y.isInsidePlot(c, d, y.inverted) ? "show" : "hide"](), t.element.point = this)
                    }(g = g.halo) && g.size ? (z || (e.halo = z = y.renderer.path().add(y.seriesGroup)), z[b ? "animate" : "attr"]({
                        d: this.haloPath(g.size)
                    }), z.attr({
                        "class": "highcharts-halo highcharts-color-" + u(this.colorIndex, e.colorIndex)
                    }), z.attr(r({
                        fill: this.color || e.color,
                        "fill-opacity": g.opacity,
                        zIndex: -1
                    }, g.attributes))[b ? "animate" : "attr"]({
                        d: this.haloPath(g.size)
                    })) : z && z.attr({
                        d: []
                    });
                    this.state = a
                }
            },
            haloPath: function(a) {
                var b = this.series,
                    c = b.chart,
                    d = b.getPlotBox(),
                    e = c.inverted,
                    f = Math.floor(this.plotX);
                return c.renderer.symbols.circle(d.translateX + (e ? b.yAxis.len - this.plotY : f) - a, d.translateY + (e ? b.xAxis.len - f : this.plotY) - a, 2 * a, 2 * a)
            }
        });
        r(b.prototype, {
            onMouseOver: function() {
                var a = this.chart,
                    b = a.hoverSeries;
                if (b && b !== this) b.onMouseOut();
                this.options.events.mouseOver && n(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this
            },
            onMouseOut: function() {
                var a = this.options,
                    b = this.chart,
                    c = b.tooltip,
                    d = b.hoverPoint;
                b.hoverSeries = null;
                if (d) d.onMouseOut();
                this && a.events.mouseOut && n(this, "mouseOut");
                !c || a.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();
                this.setState()
            },
            setState: function(a) {
                var b = this,
                    c = b.options,
                    d = b.graph,
                    e = c.states,
                    f = c.lineWidth,
                    c = 0;
                a = a || "";
                if (b.state !== a && (g([b.group, b.markerGroup], function(c) {
                    c && (b.state && c.removeClass("highcharts-series-" + b.state), a && c.addClass("highcharts-series-" + a))
                }), b.state = a, !e[a] || !1 !== e[a].enabled) && (a && (f = e[a].lineWidth || f + (e[a].lineWidthPlus || 0)), d && !d.dashstyle)) for (e = {
                    "stroke-width": f
                }, d.attr(e); b["zone-graph-" + c];) b["zone-graph-" + c].attr(e), c += 1
            },
            setVisible: function(a, b) {
                var c = this,
                    d = c.chart,
                    e = c.legendItem,
                    f, l = d.options.chart.ignoreHiddenSeries,
                    m = c.visible;
                f = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !m : a) ? "show" : "hide";
                g(["group", "dataLabelsGroup", "markerGroup", "tracker"], function(a) {
                    if (c[a]) c[a][f]()
                });
                if (d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) === c) c.onMouseOut();
                e && d.legend.colorizeItem(c, a);
                c.isDirty = !0;
                c.options.stacking && g(d.series, function(a) {
                    a.options.stacking && a.visible && (a.isDirty = !0)
                });
                g(c.linkedSeries, function(b) {
                    b.setVisible(a, !1)
                });
                l && (d.isDirtyBox = !0);
                !1 !== b && d.redraw();
                n(c, f)
            },
            show: function() {
                this.setVisible(!0)
            },
            hide: function() {
                this.setVisible(!1)
            },
            select: function(a) {
                this.selected = a = void 0 === a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                n(this, a ? "select" : "unselect")
            },
            drawTracker: a.drawTrackerGraph
        })
    })(I);
    (function(a) {
        var y = a.Chart,
            D = a.each,
            B = a.inArray,
            z = a.isObject,
            l = a.pick,
            f = a.splat;
        y.prototype.setResponsive = function(a) {
            var f = this.options.responsive;
            f && f.rules && D(f.rules, function(f) {
                this.matchResponsiveRule(f, a)
            }, this)
        };
        y.prototype.matchResponsiveRule = function(f, r) {
            var n = this.respRules,
                t = f.condition,
                d;
            d = f.callback || function() {
                return this.chartWidth <= l(t.maxWidth, Number.MAX_VALUE) && this.chartHeight <= l(t.maxHeight, Number.MAX_VALUE) && this.chartWidth >= l(t.minWidth, 0) && this.chartHeight >= l(t.minHeight, 0)
            };
            void 0 === f._id && (f._id = a.idCounter++);
            d = d.call(this);
            !n[f._id] && d ? f.chartOptions && (n[f._id] = this.currentOptions(f.chartOptions), this.update(f.chartOptions, r)) : n[f._id] && !d && (this.update(n[f._id], r), delete n[f._id])
        };
        y.prototype.currentOptions = function(a) {
            function l(a, d, g) {
                var n, m;
                for (n in a) if (-1 < B(n, ["series", "xAxis", "yAxis"])) for (a[n] = f(a[n]), g[n] = [], m = 0; m < a[n].length; m++) g[n][m] = {}, l(a[n][m], d[n][m], g[n][m]);
                else z(a[n]) ? (g[n] = {}, l(a[n], d[n] || {}, g[n])) : g[n] = d[n] || null
            }
            var n = {};
            l(a, this.options, n);
            return n
        }
    })(I);
    return I
});