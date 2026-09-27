/* SAHNE 3 — VARSAYIMI SINA (28–46 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 3, start: 28, end: 46, name: "Test the guess", nameTr: "Varsayımı sına", concept: "Step 10 is 21, not 22", conceptTr: "10. adım 21, 22 değil", render });
})(window.LI = window.LI || {});
