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
}

export function getGrammar(id) {
  return id ? GRAMMAR[id] : null
}
