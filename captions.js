/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 5. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 4.4, end: 10.2, tr: '3, 5, 7, 9 kare: büyüyen bir L', en: '3, 5, 7, 9 squares: a growing L',
      note: 'Karelerle bir örüntü: birinci adımda 3 kare, ikincide 5, üçüncüde 7, dördüncüde 9 kare var.' },
    { scene: 2, start: 10.8, end: 20.2, tr: 'Her adımda 2 kare ekleniyor', en: 'Each step adds 2 squares',
      note: 'Terimleri bir tabloya yazalım: 3, 5, 7, 9, 11. Her adımda 2 kare ekleniyor. Ece bir varsayımda bulunuyor: 10. adım, 5. adımın 2 katıdır; 11 çarpı 2, 22 kare.' },
    { scene: 2, start: 20.6, end: 27.8, tr: 'Varsayım: 10. adım 22 kare mi?', en: 'A guess: is step 10 22 squares?',
      note: 'Bu varsayım doğru mu? Kabul etmeden önce sınayalım.' },
    { scene: 3, start: 28.6, end: 37.6, tr: '10. adımı kuralım: 21 kare', en: 'Build step 10: 21 squares',
      note: '5. adımı kuralım: yukarı 5, sağa 5, köşede 1: 11 kare. 10. adımı kuralım: yukarı 10, sağa 10, köşede 1: 21 kare.' },
    { scene: 3, start: 38.0, end: 45.8, tr: '21, 22 değil: varsayım tutmadı', en: '21, not 22: the guess fails',
      note: '21 kare çıktı, 22 değil. Varsayım tutmadı; çünkü köşedeki kare iki kez sayılmaz.' },
    { scene: 4, start: 46.6, end: 55.0, tr: 'Adım kadar yukarı, adım kadar sağa, 1 köşe', en: 'Up by the step, right by the step, 1 corner',
      note: 'Kural şeklin içinde saklı: yukarıda adım sayısı kadar, sağda adım sayısı kadar kare var, köşede de 1 kare.' },
    { scene: 4, start: 55.4, end: 63.8, tr: 'Kare sayısı = 2 × adım sayısı + 1', en: 'Squares = 2 × step + 1',
      note: 'Önermemiz: kare sayısı, adım sayısının 2 katının 1 fazlasıdır. Bu kural çizmeden bulmamızı sağlar: 100. adımda 2 çarpı 100 artı 1, 201 kare.' },
    { scene: 5, start: 64.6, end: 70.0, tr: '1. adım 3, 7. adım 15: kural tutuyor', en: 'Step 1 is 3, step 7 is 15: the rule holds',
      note: 'Kuralı kapsayıcı örneklerle sınayalım: 1. adım 2 çarpı 1 artı 1, 3 kare. 7. adım 2 çarpı 7 artı 1, 15 kare. Kural tutuyor.' },
    { scene: 5, start: 70.4, end: 79.8, tr: 'Benzer örüntü: 4, 7, 10, 13', en: 'A similar pattern: 4, 7, 10, 13',
      note: 'Benzer bir örüntü: 4, 7, 10, 13. Her adımda 3 artıyor; kural adımın 3 katının 1 fazlası. Aynı doğrulama yöntemi bu örüntüde de işe yarıyor.' },
    { scene: 6, start: 80.6, end: 86.4, tr: 'İncele, sına, kuralı yaz', en: 'Examine, test, write the rule',
      note: 'Aklında kalsın: terimleri incele, varsayımını sına, kuralı sözle ve sembolle yaz, örneklerle doğrula.' },
    { scene: 6, start: 86.8, end: 91.0, tr: 'Kural çizmeden bulmayı sağlar!', en: 'A rule saves drawing!',
      note: 'Kural, çizmeden bulmayı sağlar!' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
