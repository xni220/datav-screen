!(function (e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t(require('echarts')))
    : 'function' == typeof define && define.amd
    ? define(['echarts'], t)
    : 'object' == typeof exports
    ? (exports['echarts-liquidfill'] = t(require('echarts')))
    : (e['echarts-liquidfill'] = t(e.echarts));
})(self, function (e) {
  return (() => {
    'use strict';
    var t = {
        245: (e, t, a) => {
          a.r(t);
          var i = a(83);
          i.extendSeriesModel({
            type: 'series.liquidFill',
            optionUpdated: function () {
              var e = this.option;
              e.gridSize = Math.max(Math.floor(e.gridSize), 4);
            },
            getInitialData: function (e, t) {
              var a = i.helper.createDimensions(e.data, {
                  coordDimensions: ['value'],
                }),
                r = new i.List(a, this);
              return r.initData(e.data), r;
            },
            defaultOption: {
              color: ['#294D99', '#156ACF', '#1598ED', '#45BDFF'],
              center: ['50%', '50%'],
              radius: '50%',
              amplitude: '8%',
              waveLength: '80%',
              phase: 'auto',
              period: 'auto',
              direction: 'right',
              shape: 'circle',
              waveAnimation: !0,
              animationEasing: 'linear',
              animationEasingUpdate: 'linear',
              animationDuration: 2e3,
              animationDurationUpdate: 1e3,
              outline: {
                show: !0,
                borderDistance: 8,
                itemStyle: {
                  color: 'none',
                  borderColor: '#294D99',
                  borderWidth: 8,
                  shadowBlur: 20,
                  shadowColor: 'rgba(0, 0, 0, 0.25)',
                },
              },
              backgroundStyle: { color: '#E3F7FF' },
              itemStyle: {
                opacity: 0.95,
                shadowBlur: 50,
                shadowColor: 'rgba(0, 0, 0, 0.4)',
              },
              label: {
                show: !0,
                color: '#294D99',
                insideColor: '#fff',
                fontSize: 50,
                fontWeight: 'bold',
                align: 'center',
                baseline: 'middle',
                position: 'inside',
              },
              emphasis: { itemStyle: { opacity: 0.8 } },
            },
          });
          const r = i.graphic.extendShape({
            type: 'ec-liquid-fill',
            shape: {
              waveLength: 0,
              radius: 0,
              radiusY: 0,
              cx: 0,
              cy: 0,
              waterLevel: 0,
              amplitude: 0,
              phase: 0,
              inverse: !1,
            },
            buildPath: function (e, t) {
              null == t.radiusY && (t.radiusY = t.radius);
              for (
                var a = Math.max(
                  2 * Math.ceil(((2 * t.radius) / t.waveLength) * 4),
                  8,
                );
                t.phase < 2 * -Math.PI;

              )
                t.phase += 2 * Math.PI;
              for (; t.phase > 0; ) t.phase -= 2 * Math.PI;
              var i = (t.phase / Math.PI / 2) * t.waveLength,
                r = t.cx - t.radius + i - 2 * t.radius;
              e.moveTo(r, t.waterLevel);
              for (var l = 0, o = 0; o < a; ++o) {
                var s = o % 4,
                  h = n((o * t.waveLength) / 4, s, t.waveLength, t.amplitude);
                e.bezierCurveTo(
                  h[0][0] + r,
                  -h[0][1] + t.waterLevel,
                  h[1][0] + r,
                  -h[1][1] + t.waterLevel,
                  h[2][0] + r,
                  -h[2][1] + t.waterLevel,
                ),
                  o === a - 1 && (l = h[2][0]);
              }
              t.inverse
                ? (e.lineTo(l + r, t.cy - t.radiusY),
                  e.lineTo(r, t.cy - t.radiusY),
                  e.lineTo(r, t.waterLevel))
                : (e.lineTo(l + r, t.cy + t.radiusY),
                  e.lineTo(r, t.cy + t.radiusY),
                  e.lineTo(r, t.waterLevel)),
                e.closePath();
            },
          });
          function n(e, t, a, i) {
            return 0 === t
              ? [
                  [e + (0.5 * a) / Math.PI / 2, i / 2],
                  [e + (0.5 * a) / Math.PI, i],
                  [e + a / 4, i],
                ]
              : 1 === t
              ? [
                  [e + ((0.5 * a) / Math.PI / 2) * (Math.PI - 2), i],
                  [e + ((0.5 * a) / Math.PI / 2) * (Math.PI - 1), i / 2],
                  [e + a / 4, 0],
                ]
              : 2 === t
              ? [
                  [e + (0.5 * a) / Math.PI / 2, -i / 2],
                  [e + (0.5 * a) / Math.PI, -i],
                  [e + a / 4, -i],
                ]
              : [
                  [e + ((0.5 * a) / Math.PI / 2) * (Math.PI - 2), -i],
                  [e + ((0.5 * a) / Math.PI / 2) * (Math.PI - 1), -i / 2],
                  [e + a / 4, 0],
                ];
          }
          var l = function (e, t) {
            switch (e) {
              case 'center':
              case 'middle':
                e = '50%';
                break;
              case 'left':
              case 'top':
                e = '0%';
                break;
              case 'right':
              case 'bottom':
                e = '100%';
            }
            return 'string' == typeof e
              ? ((a = e), a.replace(/^\s+|\s+$/g, '')).match(/%$/)
                ? (parseFloat(e) / 100) * t
                : parseFloat(e)
              : null == e
              ? NaN
              : +e;
            var a;
          };
          function o(e) {
            return e && 0 === e.indexOf('path://');
          }
          i.extendChartView({
            type: 'liquidFill',
            render: function (e, t, a) {
              var n = this,
                s = this.group;
              s.removeAll();
              var h = e.getData(),
                d = h.getItemModel(0),
                p = d.get('center'),
                u = d.get('radius'),
                c = a.getWidth(),
                g = a.getHeight(),
                v = Math.min(c, g),
                f = 0,
                y = 0,
                m = e.get('outline.show');
              m &&
                ((f = e.get('outline.borderDistance')),
                (y = l(e.get('outline.itemStyle.borderWidth'), v)));
              var w,
                b,
                x,
                M = l(p[0], c),
                P = l(p[1], g),
                I = !1,
                S = e.get('shape');
              'container' === S
                ? ((I = !0),
                  (b = [(w = [c / 2, g / 2])[0] - y / 2, w[1] - y / 2]),
                  (x = [l(f, c), l(f, g)]),
                  (u = [Math.max(b[0] - x[0], 0), Math.max(b[1] - x[1], 0)]))
                : ((b = (w = l(u, v) / 2) - y / 2),
                  (x = l(f, v)),
                  (u = Math.max(b - x, 0))),
                m && ((Y().style.lineWidth = y), s.add(Y()));
              var L = I ? 0 : M - u,
                C = I ? 0 : P - u,
                T = null;
              s.add(
                (function () {
                  var t = E(u);
                  t.setStyle(e.getModel('backgroundStyle').getItemStyle()),
                    (t.style.fill = null),
                    (t.z2 = 5);
                  var a = E(u);
                  a.setStyle(e.getModel('backgroundStyle').getItemStyle()),
                    (a.style.stroke = null);
                  var r = new i.graphic.Group();
                  return r.add(t), r.add(a), r;
                })(),
              );
              var D = this._data,
                F = [];
              function E(e, t) {
                if (S) {
                  if (o(S)) {
                    var a = i.graphic.makePath(S.slice(7), {}),
                      r = a.getBoundingRect(),
                      n = r.width,
                      l = r.height;
                    n > l
                      ? ((l *= (2 * e) / n), (n = 2 * e))
                      : ((n *= (2 * e) / l), (l = 2 * e));
                    var s = t ? 0 : M - n / 2,
                      h = t ? 0 : P - l / 2;
                    return (
                      (a = i.graphic.makePath(
                        S.slice(7),
                        {},
                        new i.graphic.BoundingRect(s, h, n, l),
                      )),
                      t && ((a.x = -n / 2), (a.y = -l / 2)),
                      a
                    );
                  }
                  if (I) {
                    var d = t ? -e[0] : M - e[0],
                      p = t ? -e[1] : P - e[1];
                    return i.helper.createSymbol(
                      'rect',
                      d,
                      p,
                      2 * e[0],
                      2 * e[1],
                    );
                  }
                  return (
                    (d = t ? -e : M - e),
                    (p = t ? -e : P - e),
                    'pin' === S ? (p += e) : 'arrow' === S && (p -= e),
                    i.helper.createSymbol(S, d, p, 2 * e, 2 * e)
                  );
                }
                return new i.graphic.Circle({
                  shape: { cx: t ? 0 : M, cy: t ? 0 : P, r: e },
                });
              }
              function Y() {
                var t = E(w);
                return (
                  (t.style.fill = null),
                  t.setStyle(e.getModel('outline.itemStyle').getItemStyle()),
                  t
                );
              }
              function k(t, a, n) {
                var o = I ? u[0] : u,
                  s = I ? g / 2 : u,
                  d = h.getItemModel(t),
                  p = d.getModel('itemStyle'),
                  c = d.get('phase'),
                  v = l(d.get('amplitude'), 2 * s),
                  f = l(d.get('waveLength'), 2 * o),
                  y = s - h.get('value', t) * s * 2;
                c = n ? n.shape.phase : 'auto' === c ? (t * Math.PI) / 4 : c;
                var m = p.getItemStyle();
                if (!m.fill) {
                  var w = e.get('color'),
                    b = t % w.length;
                  m.fill = w[b];
                }
                var x = new r({
                  shape: {
                    waveLength: f,
                    radius: o,
                    radiusY: s,
                    cx: 2 * o,
                    cy: 0,
                    waterLevel: y,
                    amplitude: v,
                    phase: c,
                    inverse: a,
                  },
                  style: m,
                  x: M,
                  y: P,
                });
                x.shape._waterLevel = y;
                var S = d.getModel('emphasis.itemStyle').getItemStyle();
                (S.lineWidth = 0),
                  (x.ensureState('emphasis').style = S),
                  i.helper.enableHoverEmphasis(x);
                var L = E(u, !0);
                return L.setStyle({ fill: 'white' }), x.setClipPath(L), x;
              }
              function q(e, t, a) {
                var i = h.getItemModel(e),
                  r = i.get('period'),
                  n = i.get('direction'),
                  l = h.get('value', e),
                  o = i.get('phase');
                o = a ? a.shape.phase : 'auto' === o ? (e * Math.PI) / 4 : o;
                var s, d;
                s =
                  'auto' === r
                    ? 0 === (d = h.count())
                      ? 5e3
                      : 5e3 * (0.2 + ((d - e) / d) * 0.8)
                    : 'function' == typeof r
                    ? r(l, e)
                    : r;
                var p = 0;
                'right' === n || null == n
                  ? (p = Math.PI)
                  : 'left' === n
                  ? (p = -Math.PI)
                  : 'none' === n
                  ? (p = 0)
                  : console.error('Illegal direction value for liquid fill.'),
                  'none' !== n &&
                    i.get('waveAnimation') &&
                    t
                      .animate('shape', !0)
                      .when(0, { phase: o })
                      .when(s / 2, { phase: p + o })
                      .when(s, { phase: 2 * p + o })
                      .during(function () {
                        T && T.dirty(!0);
                      })
                      .start();
              }
              h
                .diff(D)
                .add(function (t) {
                  var a = k(t, !1),
                    r = a.shape.waterLevel;
                  (a.shape.waterLevel = I ? g / 2 : u),
                    i.graphic.initProps(a, { shape: { waterLevel: r } }, e),
                    (a.z2 = 2),
                    q(t, a, null),
                    s.add(a),
                    h.setItemGraphicEl(t, a),
                    F.push(a);
                })
                .update(function (t, a) {
                  for (
                    var r = D.getItemGraphicEl(a),
                      l = k(t, !1, r),
                      d = {},
                      p = [
                        'amplitude',
                        'cx',
                        'cy',
                        'phase',
                        'radius',
                        'radiusY',
                        'waterLevel',
                        'waveLength',
                      ],
                      u = 0;
                    u < p.length;
                    ++u
                  ) {
                    var c = p[u];
                    l.shape.hasOwnProperty(c) && (d[c] = l.shape[c]);
                  }
                  var v = {},
                    f = ['fill', 'opacity', 'shadowBlur', 'shadowColor'];
                  for (u = 0; u < f.length; ++u)
                    (c = f[u]),
                      l.style.hasOwnProperty(c) && (v[c] = l.style[c]);
                  I && (d.radiusY = g / 2),
                    i.graphic.updateProps(r, { shape: d, x: l.x, y: l.y }, e),
                    e.isUniversalTransitionEnabled &&
                    e.isUniversalTransitionEnabled()
                      ? i.graphic.updateProps(r, { style: v }, e)
                      : r.useStyle(v);
                  var y = r.getClipPath(),
                    m = l.getClipPath();
                  r.setClipPath(l.getClipPath()),
                    (r.shape.inverse = l.inverse),
                    y &&
                      m &&
                      n._shape === S &&
                      !o(S) &&
                      i.graphic.updateProps(m, { shape: y.shape }, e, {
                        isFrom: !0,
                      }),
                    q(t, r, r),
                    s.add(r),
                    h.setItemGraphicEl(t, r),
                    F.push(r);
                })
                .remove(function (e) {
                  var t = D.getItemGraphicEl(e);
                  s.remove(t);
                })
                .execute(),
                d.get('label.show') &&
                  s.add(
                    (function (t) {
                      var a = d.getModel('label');
                      var r,
                        n,
                        l,
                        o = {
                          z2: 10,
                          shape: {
                            x: L,
                            y: C,
                            width: 2 * (I ? u[0] : u),
                            height: 2 * (I ? u[1] : u),
                          },
                          style: { fill: 'transparent' },
                          textConfig: {
                            position: a.get('position') || 'inside',
                          },
                          silent: !0,
                        },
                        s = {
                          style: {
                            text:
                              ((r = e.getFormattedLabel(0, 'normal')),
                              (n = 100 * h.get('value', 0)),
                              (l = h.getName(0) || e.name),
                              isNaN(n) || (l = n.toFixed(0) + '%'),
                              null == r ? l : r),
                            textAlign: a.get('align'),
                            textVerticalAlign: a.get('baseline'),
                          },
                        };
                      Object.assign(s.style, i.helper.createTextStyle(a));
                      var p = new i.graphic.Rect(o),
                        c = new i.graphic.Rect(o);
                      (c.disableLabelAnimation = !0),
                        (p.disableLabelAnimation = !0);
                      var g = new i.graphic.Text(s),
                        v = new i.graphic.Text(s);
                      p.setTextContent(g), c.setTextContent(v);
                      var f = a.get('insideColor');
                      v.style.fill = f;
                      var y = new i.graphic.Group();
                      y.add(p), y.add(c);
                      var m = E(u, !0);
                      return (
                        (T = new i.graphic.CompoundPath({
                          shape: { paths: t },
                          x: M,
                          y: P,
                        })).setClipPath(m),
                        c.setClipPath(T),
                        y
                      );
                    })(F),
                  ),
                (this._shape = S),
                (this._data = h);
            },
            dispose: function () {},
          });
        },
        83: (t) => {
          t.exports = e;
        },
      },
      a = {};
    function i(e) {
      if (a[e]) return a[e].exports;
      var r = (a[e] = { exports: {} });
      return t[e](r, r.exports, i), r.exports;
    }
    return (
      (i.r = (e) => {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 });
      }),
      i(245)
    );
  })();
});
//# sourceMappingURL=echarts-liquidfill.min.js.map
