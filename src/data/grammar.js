// Grammar rules keyed by id. Referenced from curriculum lessons.
// Each rule: {
//   id, level, title, summary (uz),
//   points: [{ ar, uz }],        // explanation bullets
//   examples: [{ ar, uz }],
//   blanks: [{ prompt, sentence(with __), options:[], answer, uz }]  // fill-in-the-blank
// }

export const GRAMMAR = {
  // ── A1 ──────────────────────────────────────────────
  'g-gender': {
    id: 'g-gender',
    level: 'A1',
    title: "Jins: muzakkar va muannas (المذكر والمؤنث)",
    summary:
      "Arab tilida har bir ot erkak (muzakkar) yoki ayol (muannas) jinsiga ega. Ko'pincha muannas so'z oxirida ة (ta marbuta) bo'ladi.",
    points: [
      { ar: 'مُذَكَّر', uz: "Muzakkar — erkak jinsi. Belgisi yo'q. Masalan: مُعَلِّم (o'qituvchi)." },
      { ar: 'مُؤَنَّث', uz: "Muannas — ayol jinsi. Ko'pincha oxirida ة bo'ladi. Masalan: مُعَلِّمَة (o'qituvchi ayol)." },
    ],
    examples: [
      { ar: 'طَالِبٌ', uz: "talaba (o'g'il) — muzakkar" },
      { ar: 'طَالِبَةٌ', uz: 'talaba (qiz) — muannas' },
    ],
    blanks: [
      {
        prompt: "Muannas shaklni tanlang: 'o'qituvchi ayol'",
        sentence: 'هِيَ ___',
        options: ['مُعَلِّم', 'مُعَلِّمَة', 'مَكْتَب'],
        answer: 'مُعَلِّمَة',
        uz: "هِيَ (u, ayol) so'zidan keyin muannas shakl keladi.",
      },
      {
        prompt: "Muzakkar shaklni tanlang: 'u (o'g'il) talaba'",
        sentence: 'هُوَ ___',
        options: ['طَالِبَة', 'طَالِب', 'بِنْت'],
        answer: 'طَالِب',
        uz: "هُوَ (u, erkak) so'zidan keyin muzakkar shakl keladi.",
      },
    ],
  },

  'g-article': {
    id: 'g-article',
    level: 'A1',
    title: "Aniqlik artikli: ال (alif-lam)",
    summary:
      "ال so'z boshiga qo'shilib, otni aniq qiladi (ingliz tilidagi 'the' kabi). كِتَاب = (bir) kitob, الْكِتَاب = (o'sha) kitob.",
    points: [
      { ar: 'الـ', uz: "ال — aniqlik artikli, otga qo'shilib yoziladi." },
      { ar: 'حُرُوف شَمْسِيّة', uz: "Quyosh harflari oldida ل o'qilmaydi: الشَّمْس (ash-shams)." },
      { ar: 'حُرُوف قَمَرِيّة', uz: "Oy harflari oldida ل o'qiladi: الْقَمَر (al-qamar)." },
    ],
    examples: [
      { ar: 'بَيْت ← الْبَيْت', uz: 'uy ← (o\'sha) uy' },
      { ar: 'شَمْس ← الشَّمْس', uz: 'quyosh ← (o\'sha) quyosh' },
    ],
    blanks: [
      {
        prompt: "Aniq shaklni hosil qiling: 'kitob'",
        sentence: '___',
        options: ['كِتَاب', 'الْكِتَاب', 'كُتُب'],
        answer: 'الْكِتَاب',
        uz: "ال qo'shilganda ot aniq bo'ladi.",
      },
    ],
  },

  // ── A2 ──────────────────────────────────────────────
  'g-dual': {
    id: 'g-dual',
    level: 'A2',
    title: "Ikkilik son (المُثَنَّى)",
    summary:
      "Ikkita narsani bildirish uchun otga ـَانِ (raf' holatida) yoki ـَيْنِ qo'shiladi. Masalan: كِتَاب → كِتَابَانِ (ikki kitob).",
    points: [
      { ar: 'ـَانِ', uz: "Ega holatida: مُعَلِّمَانِ (ikki o'qituvchi)." },
      { ar: 'ـَيْنِ', uz: "To'ldiruvchi holatida: مُعَلِّمَيْنِ." },
    ],
    examples: [
      { ar: 'طَالِب ← طَالِبَانِ', uz: 'talaba ← ikki talaba' },
      { ar: 'بَيْت ← بَيْتَانِ', uz: 'uy ← ikki uy' },
    ],
    blanks: [
      {
        prompt: "Ikkilik shaklni tanlang: 'ikki kitob'",
        sentence: 'عِنْدِي ___',
        options: ['كِتَاب', 'كِتَابَانِ', 'كُتُب'],
        answer: 'كِتَابَانِ',
        uz: "ـَانِ qo'shimchasi ikkilikni bildiradi.",
      },
    ],
  },

  'g-verb-past': {
    id: 'g-verb-past',
    level: 'A2',
    title: "O'tgan zamon fe'li (الفِعْل الماضي)",
    summary:
      "O'tgan zamon fe'li shaxsga qarab oxiri o'zgaradi. كَتَبَ (u yozdi) → كَتَبْتُ (men yozdim) → كَتَبْنَا (biz yozdik).",
    points: [
      { ar: 'هُوَ كَتَبَ', uz: 'u (erkak) yozdi' },
      { ar: 'أَنَا كَتَبْتُ', uz: 'men yozdim' },
      { ar: 'نَحْنُ كَتَبْنَا', uz: 'biz yozdik' },
      { ar: 'أَنْتَ كَتَبْتَ', uz: 'sen (erkak) yozding' },
    ],
    examples: [
      { ar: 'ذَهَبَ إِلَى الْمَدْرَسَةِ', uz: 'U maktabga bordi' },
      { ar: 'دَرَسْتُ اللُّغَةَ الْعَرَبِيَّةَ', uz: "Men arab tilini o'rgandim" },
    ],
    blanks: [
      {
        prompt: "To'g'ri shaklni tanlang: 'men o'qidim'",
        sentence: 'أَنَا ___ الْكِتَابَ',
        options: ['قَرَأَ', 'قَرَأْتُ', 'قَرَأْنَا'],
        answer: 'قَرَأْتُ',
        uz: "أَنَا (men) bilan ـْتُ qo'shimchasi ishlatiladi.",
      },
      {
        prompt: "To'g'ri shaklni tanlang: 'biz yedik'",
        sentence: 'نَحْنُ ___ الطَّعَامَ',
        options: ['أَكَلْتُ', 'أَكَلْنَا', 'أَكَلَ'],
        answer: 'أَكَلْنَا',
        uz: "نَحْنُ (biz) bilan ـْنَا qo'shimchasi ishlatiladi.",
      },
    ],
  },

  // ── B1 ──────────────────────────────────────────────
  'g-broken-plural': {
    id: 'g-broken-plural',
    level: 'B1',
    title: "Siniq ko'plik (جَمْع التَّكْسِير)",
    summary:
      "Ko'p arab otlari ko'plikda so'z ichki tuzilishini o'zgartiradi. كِتَاب → كُتُب (kitoblar), قَلَم → أَقْلَام (qalamlar).",
    points: [
      { ar: 'كِتَاب ← كُتُب', uz: 'kitob ← kitoblar' },
      { ar: 'قَلَم ← أَقْلَام', uz: 'qalam ← qalamlar' },
      { ar: 'بَيْت ← بُيُوت', uz: 'uy ← uylar' },
    ],
    examples: [
      { ar: 'رَجُل ← رِجَال', uz: 'erkak ← erkaklar' },
      { ar: 'وَلَد ← أَوْلَاد', uz: 'bola ← bolalar' },
    ],
    blanks: [
      {
        prompt: "Ko'plik shaklni tanlang: 'kitoblar'",
        sentence: 'فِي الْمَكْتَبَةِ ___ كَثِيرَةٌ',
        options: ['كِتَاب', 'كُتُب', 'كِتَابَانِ'],
        answer: 'كُتُب',
        uz: "كِتَاب so'zining siniq ko'pligi كُتُب.",
      },
    ],
  },

  'g-kana': {
    id: 'g-kana',
    level: 'B1',
    title: "كَانَ va uning 'singillari'",
    summary:
      "كَانَ otli gapga kirib, egani raf' (ega) holatida qoldiradi, xabarni esa nasb (tushum) holatiga o'tkazadi. الجَوُّ جَمِيلٌ → كَانَ الجَوُّ جَمِيلًا.",
    points: [
      { ar: 'كَانَ', uz: 'edi (o\'tgan zamon)' },
      { ar: 'الاسْم مَرْفُوع', uz: "Ega raf' holatida qoladi." },
      { ar: 'الخَبَر مَنْصُوب', uz: 'Xabar nasb holatiga o\'tadi (ـً / ـًا).' },
    ],
    examples: [
      { ar: 'كَانَ الطَّالِبُ مُجْتَهِدًا', uz: 'Talaba tirishqoq edi' },
      { ar: 'كَانَتِ السَّمَاءُ صَافِيَةً', uz: 'Osmon ochiq edi' },
    ],
    blanks: [
      {
        prompt: "To'g'ri shaklni tanlang (xabar nasbda):",
        sentence: 'كَانَ الْجَوُّ ___',
        options: ['جَمِيلٌ', 'جَمِيلًا', 'جَمِيلٍ'],
        answer: 'جَمِيلًا',
        uz: "كَانَ ning xabari nasb (ـًا) holatida bo'ladi.",
      },
    ],
  },

  // ═══════════ B2 GRAMMAR ═══════════
  'g-inna': {
    id: 'g-inna',
    level: 'B2',
    title: "إِنَّ va uning singillari",
    summary:
      "إِنَّ gapga kirib, egani nasb (ـَ) holatiga, xabarni raf' holatida qoldiradi. إِنَّ الْعِلْمَ نُورٌ — albatta ilm nurdir.",
    points: [
      { ar: 'إِنَّ', uz: 'albatta / haqiqatdan' },
      { ar: 'أَنَّ', uz: "...ligini (to'ldiruvchi gapda)" },
      { ar: 'لَكِنَّ', uz: 'lekin' },
      { ar: 'لَعَلَّ', uz: 'balki / ehtimol' },
    ],
    examples: [
      { ar: 'إِنَّ الْعِلْمَ مُفِيدٌ', uz: 'Albatta ilm foydali' },
      { ar: 'أَعْلَمُ أَنَّ الِاقْتِصَادَ مُهِمٌّ', uz: 'Bilaman, iqtisod muhim' },
    ],
    blanks: [
      {
        prompt: "To'ldiring: إِنَّ ning egasi nasb (ـَ) holatida",
        sentence: 'إِنَّ ___ جَمِيلٌ',
        options: ['الطَّقْسَ', 'الطَّقْسُ', 'الطَّقْسِ'],
        answer: 'الطَّقْسَ',
        uz: "إِنَّ ism nasb qiladi (ـَ).",
      },
    ],
  },

  'g-passive': {
    id: 'g-passive',
    level: 'B2',
    title: "Majhul (المَبْنِيّ لِلْمَجْهُول)",
    summary:
      "Noma'lum nisbat: fe'l egasi ko'rsatilmaydi. كُتِبَ (yozildi), يُكْتَبُ (yoziladi). Harakat o'zgaradi: فُعِلَ / يُفْعَلُ.",
    points: [
      { ar: 'كَتَبَ ← كُتِبَ', uz: 'yozdi ← yozildi' },
      { ar: 'يَكْتُبُ ← يُكْتَبُ', uz: 'yozadi ← yoziladi' },
    ],
    examples: [
      { ar: 'كُتِبَ الْمَقَالُ أَمْسِ', uz: 'Maqola kecha yozildi' },
      { ar: 'يُدَرَّسُ هَذَا الْكِتَابُ فِي الْجَامِعَةِ', uz: 'Bu kitob universitetda o\'qitiladi' },
    ],
    blanks: [
      {
        prompt: "Majhul shaklini tanlang: 'kitob yozildi'",
        sentence: '___ الْكِتَابُ',
        options: ['كَتَبَ', 'كُتِبَ', 'يَكْتُبُ'],
        answer: 'كُتِبَ',
        uz: "Madi majhul: فُعِلَ vazni.",
      },
    ],
  },

  'g-relative': {
    id: 'g-relative',
    level: 'B2',
    title: "Sifatdosh gap (الجُمْلَة الْمَوْصُولَة)",
    summary:
      "الَّذِي (muzakkar) / الَّتِي (muannas) bilan bog'lanuvchi gap: الطَّالِبُ الَّذِي دَرَسَ نَجَحَ — o'qigan talaba muvaffaq bo'ldi.",
    points: [
      { ar: 'الَّذِي', uz: 'qaysi/..gan (muzakkar)' },
      { ar: 'الَّتِي', uz: 'qaysi/..gan (muannas)' },
      { ar: 'الَّذِينَ', uz: "qaysi/..ganlar (ko'plik)" },
    ],
    examples: [
      { ar: 'الرَّجُلُ الَّذِي سَافَرَ عَادَ', uz: 'Sayohat qilgan odam qaytdi' },
      { ar: 'الْمَدِينَةُ الَّتِي زُرْتُهَا جَمِيلَةٌ', uz: 'Borgan shahrim chiroyli' },
    ],
    blanks: [
      {
        prompt: "To'ldiring: 'kitob o'qigan talaba'",
        sentence: 'الطَّالِبُ ___ قَرَأَ الْكِتَابَ',
        options: ['الَّذِي', 'الَّتِي', 'الَّذِينَ'],
        answer: 'الَّذِي',
        uz: "Muzakkar birlik: الَّذِي.",
      },
    ],
  },

  // ═══════════ C1 GRAMMAR ═══════════
  'g-subjunctive': {
    id: 'g-subjunctive',
    level: 'C1',
    title: "Nasb holat (المُضَارِع المَنْصُوب)",
    summary:
      "أَنْ / لَنْ / كَيْ / حَتَّى kabi harflardan keyin mudori' nasb holatida: أُرِيدُ أَنْ أَدْرُسَ — o'qishni xohlayman.",
    points: [
      { ar: 'أَنْ + فِعْل', uz: "...moqchi (maqsad)" },
      { ar: 'لَنْ + فِعْل', uz: "hech...maydi (kelajakda inkor)" },
      { ar: 'كَيْ / لِكَيْ', uz: "...ish uchun" },
    ],
    examples: [
      { ar: 'أُرِيدُ أَنْ أَتَعَلَّمَ', uz: "O'rganmoqchiman" },
      { ar: 'لَنْ أُسَافِرَ غَدًا', uz: 'Ertaga sayohat qilmayman' },
    ],
    blanks: [
      {
        prompt: "أَنْ dan keyin mudori' nasb (ـَ) bo'ladi:",
        sentence: 'أُرِيدُ أَنْ ___',
        options: ['أَدْرُسَ', 'أَدْرُسُ', 'دَرَسَ'],
        answer: 'أَدْرُسَ',
        uz: "أَنْ dan keyin fe'l nasb: ـَ.",
      },
    ],
  },

  'g-conditionals': {
    id: 'g-conditionals',
    level: 'C1',
    title: "Shart gaplar (الجُمْلَة الشَّرْطِيَّة)",
    summary:
      "إِنْ (real shart) / لَوْ (noreal shart) + jazm: إِنْ تَدْرُسْ تَنْجَحْ — agar o'qisang, muvaffaq bo'lasan.",
    points: [
      { ar: 'إِنْ + مُضَارِع مَجْزُوم', uz: 'agar... (real shart)' },
      { ar: 'لَوْ + مَاضٍ', uz: 'agar...ganda edi (noreal)' },
    ],
    examples: [
      { ar: 'إِنْ تَجْتَهِدْ تَنْجَحْ', uz: 'Agar tirishsang, muvaffaq bo\'lasan' },
      { ar: 'لَوْ دَرَسْتَ لَنَجَحْتَ', uz: 'Agar o\'qiganing uchun muvaffaq bo\'larding' },
    ],
    blanks: [
      {
        prompt: "إِنْ dan keyin fe'l jazm (ـْ) holatida:",
        sentence: 'إِنْ ___ تَنْجَحْ',
        options: ['تَدْرُسْ', 'تَدْرُسُ', 'دَرَسْتَ'],
        answer: 'تَدْرُسْ',
        uz: "إِنْ dan keyin mudori' majzum (ـْ).",
      },
    ],
  },

  'g-advanced-verb': {
    id: 'g-advanced-verb',
    level: 'C1',
    title: "Ilg'or fe'l vaznlari (أَفْعَلَ، تَفَاعَلَ، اِسْتَفْعَلَ)",
    summary:
      "Arab tilida fe'l vaznlari ma'noni o'zgartiradi: عَلِمَ (bildi) → أَعْلَمَ (xabar berdi) → تَعَلَّمَ (o'rgandi) → اِسْتَعْلَمَ (so'radi).",
    points: [
      { ar: 'أَفْعَلَ (IV)', uz: "O'timli / ta'sir qiluvchi" },
      { ar: 'تَفَاعَلَ (VI)', uz: "O'zaro harakat" },
      { ar: 'اِسْتَفْعَلَ (X)', uz: "So'rash / talab qilish" },
    ],
    examples: [
      { ar: 'أَعْلَنَ الْخَبَرَ', uz: 'Yangilikni e\'lon qildi' },
      { ar: 'تَبَادَلُوا الْآرَاءَ', uz: 'Fikr almashdilar' },
      { ar: 'اِسْتَخْدَمَ الْحَاسُوبَ', uz: 'Kompyuterni ishlatdi' },
    ],
    blanks: [
      {
        prompt: "اِسْتَفْعَلَ vazni — 'ishlatdi':",
        sentence: '___ الْبَرْنَامَجَ',
        options: ['خَدَمَ', 'أَخْدَمَ', 'اِسْتَخْدَمَ'],
        answer: 'اِسْتَخْدَمَ',
        uz: "X vazn (اِسْتَفْعَلَ): so'rash/ishlatish ma'nosi.",
      },
    ],
  },

  // ═══════════ C2 GRAMMAR ═══════════
  'g-rhetoric': {
    id: 'g-rhetoric',
    level: 'C2',
    title: "Balog'a: bayoniy san'atlar",
    summary:
      "Tashbih (o'xshatish), isti'ora (metafora), kinoya (metonimiya) — arab ritorikasining asosiy san'atlari.",
    points: [
      { ar: 'التَّشْبِيه', uz: 'Tashbih — A kabi B (o\'xshatish)' },
      { ar: 'الِاسْتِعَارَة', uz: 'Isti\'ora — metafora' },
      { ar: 'الكِنَايَة', uz: 'Kinoya — anglatish' },
    ],
    examples: [
      { ar: 'الْعِلْمُ نُورٌ', uz: 'Ilm nurdir (isti\'ora)' },
      { ar: 'هُوَ أَسَدٌ فِي الْمَعْرَكَةِ', uz: 'U jangda sherdir (tashbih)' },
    ],
    blanks: [
      {
        prompt: "'Ilm nurdir' qanday san'at?",
        sentence: 'الْعِلْمُ نُورٌ — bu ___',
        options: ['تَشْبِيه', 'اِسْتِعَارَة', 'كِنَايَة'],
        answer: 'اِسْتِعَارَة',
        uz: "Bevosita o'xshatilganda, ya'ni 'kabi' so'zi yo'q — isti'ora.",
      },
    ],
  },

  'g-irab': {
    id: 'g-irab',
    level: 'C2',
    title: "Murakkab i'rob tahlili",
    summary:
      "Gapni to'liq i'rob qilish: har bir so'zning grammatik rolini (mubtado, xabar, maf'ul, hal, tamyiz...) aniqlash.",
    points: [
      { ar: 'المَفْعُول بِهِ', uz: "Maf'ul bihi — to'g'ri to'ldiruvchi (nasb)" },
      { ar: 'الحَال', uz: "Hol — holat bildiruvchi (nasb)" },
      { ar: 'التَّمْيِيز', uz: "Tamyiz — farqlovchi (nasb)" },
    ],
    examples: [
      { ar: 'شَرِبْتُ الْمَاءَ بَارِدًا', uz: "Suv ichdim sovuq holda (بَارِدًا — hol)" },
      { ar: 'عِنْدِي عِشْرُونَ كِتَابًا', uz: "Menda yigirmata kitob bor (كِتَابًا — tamyiz)" },
    ],
    blanks: [
      {
        prompt: "بَارِدًا gap ichida qanday vazifada?",
        sentence: 'شَرِبْتُ الْمَاءَ بَارِدًا',
        options: ['مَفْعُول بِهِ', 'حَال', 'تَمْيِيز'],
        answer: 'حَال',
        uz: "Holat bildiradi: suv qanday holda ichildi — sovuq.",
      },
    ],
  },
}

export function getGrammar(id) {
  return id ? GRAMMAR[id] : null
}
