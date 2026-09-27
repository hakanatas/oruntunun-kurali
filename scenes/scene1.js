/* SAHNE 1 — BÜYÜYEN L (0–10 s)  3, 5, 7, 9 squares.
   The whole film's drawing lives in LI.world(t); each scene only sets the camera. */
(function (LI) {
  'use strict';
  const { seg } = LI.E;
  const KD = LI.KD, F = () => LI.Film, A = LI.Ang, Ink = LI.Ink;
  const END = (t) => 1 - seg(t, 90.4, 91.4);

  function win(t, a, b, fi = 0.4, fo = 0.4) { return seg(t, a, a + fi) * (1 - seg(t, b - fo, b)); }
  function exprs(ctx, t, P, list, sz) {
    const f = F();
    list.forEach(([a, b, items, hot]) => {
      const al = win(t, a, b); if (al <= 0) return;
      f.expr(ctx, typeof items === 'string' ? [items] : items, P.x, P.y, sz ?? P.s, { alpha: al, w: P.w, halo: true, color: hot ? A.amber : undefined });
    });
  }
  const at = (P, k, y) => ({ x: P.x, y: y ?? P.y[k], s: P.s, w: P.w });
  const col = (a, v) => `rgba(${v ? LI.AMBER_RGB : LI.INK_RGB},${a})`;

  /** the L of step n at (x, base): corner (ink), n up (amber), n right (light amber); k = 0..1 share of tiles shown */
  function ell(ctx, x, base, n, u, k, a, parts) {
    if (a <= 0) return;
    const tiles = [[0, 0, 'c']];
    for (let i = 1; i <= n; i++) tiles.push([0, i, 'v']);
    for (let i = 1; i <= n; i++) tiles.push([i, 0, 'h']);
    const m = Math.ceil(tiles.length * k);
    tiles.slice(0, m).forEach(([c, r, p]) => {
      const tx = x + c * u, ty = base - (r + 1) * u, hi = parts ? (parts === p ? 1 : 0.35) : 1;
      ctx.fillStyle = p === 'c' ? col(0.7 * a * hi, false) : col((p === 'v' ? 0.8 : 0.45) * a * hi, true);
      ctx.fillRect(tx + 1.5, ty + 1.5, u - 3, u - 3);
      ctx.strokeStyle = col(0.8 * a, false); ctx.lineWidth = 2; ctx.strokeRect(tx + 1.5, ty + 1.5, u - 3, u - 3);
    });
  }
  /** a two-row table: steps and values, revealed column by column; hops = show +d arcs */
  function table(ctx, P, head, xs, ys, times, t, a, hops, s) {
    if (a <= 0) return;
    const f = F();
    f.T(ctx, head[0], P.lx, P.y[0], { size: s * 0.75, alpha: a }); f.T(ctx, head[1], P.lx, P.y[1], { size: s * 0.75, alpha: a });
    xs.forEach((v, i) => {
      const k = seg(t, times[i], times[i] + 0.4) * a; if (k <= 0) return;
      const x = P.x0 + i * P.dx;
      f.T(ctx, String(v), x, P.y[0], { size: s * 0.85, alpha: k }); f.T(ctx, String(ys[i]), x, P.y[1], Object.assign({ size: s * 0.85, alpha: k }, f.AMB));
      if (hops && i > 0) { const h = seg(t, hops[0] + i * 0.3, hops[0] + i * 0.3 + 0.4) * a; if (h > 0) { A.arc(ctx, [x - P.dx / 2, P.y[1] + 26], P.dx * 0.45, 200, 340, { alpha: h, w: 4, seed: 4000 + i }); f.T(ctx, hops[1], x - P.dx / 2, P.y[1] + 72, Object.assign({ size: s * 0.6, alpha: h }, f.AMB)); } }
    });
  }

  function context(ctx, env, t) {
    exprs(ctx, t, KD.L(env).CX, [
      [4.4, 10.2, 'Karelerle büyüyen bir örüntü'],
      [10.6, 27.8, 'Terimleri inceleyelim: kural ne?'],
      [28.4, 45.8, 'Varsayımı sınayalım: 10. adımı kuralım'],
      [46.4, 63.8, 'Kural şeklin içinde saklı'],
      [64.4, 79.8, 'Kapsayıcı örnekler ve benzer örüntüler'],
    ]);
  }

  function figure(ctx, env, t) {
    const L = KD.L(env), f = F(), a = END(t), s = L.G.s;
    // steps 1–4 (and the table) until 28
    const s1 = win(t, 4.6, 28.2) * a, S = L.ST;
    if (s1 > 0) [1, 2, 3, 4].forEach((n, i) => {
      const k = seg(t, 5.0 + i * 0.9, 5.8 + i * 0.9); if (k <= 0) return;
      ell(ctx, S.x[i], S.base, n, S.u, k, s1);
      f.T(ctx, `${n}. adım`, S.x[i] + (n + 1) * S.u / 2, S.base + 32, { size: s * 0.6, alpha: s1 * k });
    });
    table(ctx, L.TB, ['Adım', 'Kare'], [1, 2, 3, 4, 5], [3, 5, 7, 9, 11], [11.0, 11.6, 12.2, 12.8, 13.4], t, win(t, 10.8, 28.2) * a, [15.6, '+2'], s);
    // step 5 and step 10
    const s2 = win(t, 28.6, 63.8) * a, B = L.BIG;
    if (s2 > 0) {
      const show5 = 1 - seg(t, 46.0, 46.6);
      ell(ctx, B.x[0], B.base, 5, B.u[0], seg(t, 29.0, 30.4), s2 * show5);
      f.T(ctx, '5. adım: 5 + 5 + 1 = 11', B.x[0] + 3 * B.u[0], B.base + 34, Object.assign({ size: s * 0.65, alpha: s2 * show5 * seg(t, 30.4, 30.8) }, f.AMB));
      const parts = t > 47.4 && t < 55.0 ? (t < 49.4 ? 'v' : t < 51.4 ? 'h' : 'c') : null;
      ell(ctx, B.x[1], B.base, 10, B.u[1], seg(t, 31.0, 34.0), s2, parts);
      f.T(ctx, '10. adım: 10 + 10 + 1 = 21', B.x[1] + 5.5 * B.u[1], B.base + 34, Object.assign({ size: s * 0.65, alpha: s2 * seg(t, 34.0, 34.4) }, f.AMB));
      if (t > 36.4 && t < 46.0) f.crossInk(ctx, B.x[1] + 9 * B.u[1], B.base - 8 * B.u[1], 20, seg(t, 36.4, 37.2), win(t, 36.4, 46.0) * a);
      if (parts) { const lab = { v: ['yukarı: adım kadar', B.x[1] - 20, B.base - 6 * B.u[1], 'right'], h: ['sağa: adım kadar', B.x[1] + 6 * B.u[1], B.base - 2.4 * B.u[1], 'center'], c: ['köşe: 1', B.x[1] - 20, B.base - 0.5 * B.u[1], 'right'] }[parts]; f.T(ctx, lab[0], lab[1], lab[2], Object.assign({ size: s * 0.7, alpha: s2, align: lab[3], halo: true }, f.AMB)); }
    }
    // a similar pattern: 4, 7, 10, 13
    const s3 = win(t, 70.0, 79.8) * a;
    table(ctx, L.P2, ['Adım', 'Sayı'], [1, 2, 3, 4], [4, 7, 10, 13], [70.2, 70.6, 71.0, 71.4], t, s3, [71.8, '+3'], s);
    if (s3 > 0) [1, 2, 3, 4].forEach((n, i) => { const k = seg(t, 74.0 + i * 0.4, 74.4 + i * 0.4); if (k > 0) f.tick(ctx, L.P2.x0 + i * L.P2.dx + 34, L.P2.y[1] - 6, k, s3); });
    const s4 = win(t, 64.8, 69.8) * a;
    if (s4 > 0) {
      [['1. adım: 2 × 1 + 1 = 3', 65.2, 1], ['7. adım: 2 × 7 + 1 = 15', 66.4, 7]].forEach(([str, t0, n], i) => {
        const k = seg(t, t0, t0 + 0.4) * s4; if (k <= 0) return;
        const x = [L.ST.x[0], L.ST.x[2]][i];
        ell(ctx, x, L.ST.base, n, L.ST.u * (n > 5 ? 0.7 : 1), 1, k);
        f.T(ctx, str, x + (n + 1) * L.ST.u * (n > 5 ? 0.35 : 0.5), L.ST.base + 34, Object.assign({ size: s * 0.65, alpha: k }, f.AMB));
        f.tick(ctx, x + (n + 1) * L.ST.u * (n > 5 ? 0.7 : 1) + 30, L.ST.base - 40, seg(t, t0 + 0.6, t0 + 1.2), s4);
      });
    }
  }

  function words(ctx, env, t) {
    const W = KD.L(env).W;
    exprs(ctx, t, at(W, 0), [[6.4, 10.2, '3, 5, 7, 9 kare…'], [11.4, 27.8, 'Her adımda 2 kare ekleniyor'],
      [29.4, 45.8, '5. adım 11 kare, 10. adım 21 kare'], [47.4, 63.8, 'Yukarı adım kadar, sağa adım kadar, köşede 1'],
      [65.0, 69.8, 'Kapsayıcı örnekler: 1. adım 3, 7. adım 15'], [70.4, 79.8, 'Benzer örüntü: 4, 7, 10, 13 → adımın 3 katının 1 fazlası']]);
    exprs(ctx, t, at(W, 1), [[13.4, 27.8, 'Ece’nin varsayımı: 10. adım, 5. adımın 2 katı: 11 × 2 = 22'], [38.0, 45.8, '21, 22 değil: varsayım tutmadı'],
      [51.4, 63.8, 'Önerme: kare sayısı = 2 × adım sayısı + 1'], [74.4, 79.8, 'Aynı doğrulama bu örüntüde de işe yarıyor']]);
    exprs(ctx, t, at(W, 2), [[20.6, 27.8, 'Varsayımı sınamadan kabul etmeyelim', true], [41.4, 45.8, 'Köşedeki 1 kare iki kez sayılmaz!', true],
      [55.4, 63.8, 'Çizmeden bulabiliriz: 100. adım 2 × 100 + 1 = 201', true]]);
  }

  function summary(ctx, env, t) {
    if (t < 80.4) return;
    const S = KD.L(env).SUM, f = F(), a = END(t);
    [['Terimleri incele: her adımda +2', 80.6], ['Varsayımı sına: 10. adım 21, 22 değil', 81.6], ['Kural: 2 × adım sayısı + 1', 82.6], ['Kural, çizmeden bulmayı sağlar!', 83.6, true]].forEach(([s, t0, hot], i) => {
      const al = seg(t, t0, t0 + 0.4) * a; if (al <= 0) return;
      f.expr(ctx, [s], S.x, S.y[i], S.s * (i === 3 ? 1.15 : 1), { alpha: al, w: S.w, halo: true, color: hot ? A.amber : undefined });
    });
  }

  LI.fireworks = function (ctx, env, t) {
    const k = seg(t, 84.4, 86.4);
    if (k <= 0 || t >= 91) return;
    const n = F().nokta(t, env), C = [n.x, n.y - 170];
    [30, 60, 90, 120, 150].forEach((d, i) => {
      const r = 150 + 30 * Math.sin(t * 2 + i);
      A.arc(ctx, C, r, d - 12, d + 12, { p: seg(k, i * 0.12, i * 0.12 + 0.4), alpha: 0.8 * (1 - seg(t, 90.2, 91)), w: 6, seed: 80 + i });
    });
  };

  LI.world = function (ctx, env, t) { context(ctx, env, t); figure(ctx, env, t); words(ctx, env, t); summary(ctx, env, t); };
  void Ink;

  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 10, name: 'A growing L', nameTr: 'Büyüyen L', concept: '3, 5, 7, 9 squares', conceptTr: '3, 5, 7, 9 kare', render });
})(window.LI = window.LI || {});
