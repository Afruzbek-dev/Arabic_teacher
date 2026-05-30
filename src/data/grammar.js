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

  // ═══════════ A1 ROADMAP GRAMMAR ═══════════

  'g-pronouns': {
    id: 'g-pronouns',
    level: 'A1',
    title: 'Shaxs olmoshlari (الضَّمَائِر)',
    summary:
      "Ajralgan shaxs olmoshlari gap egasini bildiradi: أَنَا (men), أَنْتَ/أَنْتِ (sen), هُوَ/هِيَ (u), نَحْنُ (biz).",
    points: [
      { ar: 'أَنَا', uz: 'men' },
      { ar: 'أَنْتَ / أَنْتِ', uz: 'sen (erkak / ayol)' },
      { ar: 'هُوَ / هِيَ', uz: 'u (erkak / ayol)' },
      { ar: 'نَحْنُ', uz: 'biz' },
    ],
    examples: [
      { ar: 'أَنَا طَالِبٌ', uz: 'Men talabaman' },
      { ar: 'هِيَ مُعَلِّمَةٌ', uz: "U (ayol) o'qituvchi" },
    ],
    blanks: [
      {
        prompt: "Bo'sh joyni to'ldiring: 'Men talabaman'",
        sentence: '___ طَالِبٌ',
        options: ['أَنَا', 'هُوَ', 'نَحْنُ'],
        answer: 'أَنَا',
        uz: "'Men' = أَنَا.",
      },
      {
        prompt: "Bo'sh joyni to'ldiring: 'U (ayol) shifokor'",
        sentence: '___ طَبِيبَةٌ',
        options: ['هُوَ', 'هِيَ', 'أَنْتَ'],
        answer: 'هِيَ',
        uz: "Ayol uchun هِيَ ishlatiladi.",
      },
    ],
  },

  'g-ishara': {
    id: 'g-ishara',
    level: 'A1',
    title: "Ishora olmoshlari (اسْمُ الإِشَارَة)",
    summary:
      "هَذَا (bu — muzakkar), هَذِهِ (bu — muannas) yaqindagini; ذَلِكَ (u — muzakkar), تِلْكَ (u — muannas) uzoqdagini ko'rsatadi.",
    points: [
      { ar: 'هَذَا', uz: 'bu (yaqin, muzakkar)' },
      { ar: 'هَذِهِ', uz: 'bu (yaqin, muannas)' },
      { ar: 'ذَلِكَ', uz: 'u (uzoq, muzakkar)' },
      { ar: 'تِلْكَ', uz: 'u (uzoq, muannas)' },
    ],
    examples: [
      { ar: 'هَذَا كِتَابٌ', uz: 'Bu kitob' },
      { ar: 'هَذِهِ مَدْرَسَةٌ', uz: 'Bu maktab' },
    ],
    blanks: [
      {
        prompt: "Tanlang: 'Bu qalam' (qalam — muzakkar)",
        sentence: '___ قَلَمٌ',
        options: ['هَذَا', 'هَذِهِ', 'تِلْكَ'],
        answer: 'هَذَا',
        uz: 'Muzakkar yaqin ot uchun هَذَا.',
      },
      {
        prompt: "Tanlang: 'Bu mashina' (مَدْرَسَة kabi muannas)",
        sentence: '___ سَيَّارَةٌ',
        options: ['هَذَا', 'هَذِهِ', 'ذَلِكَ'],
        answer: 'هَذِهِ',
        uz: 'Muannas yaqin ot uchun هَذِهِ.',
      },
    ],
  },

  'g-idafa': {
    id: 'g-idafa',
    level: 'A1',
    title: 'Izofa (المُضَاف وَالمُضَاف إِلَيْه)',
    summary:
      "Egalik birikmasi: birinchi ot (mudaf) ال va tanvin olmaydi; ikkinchi ot (mudaf ilayh) majrur (ـِ) bo'ladi. كِتَابُ الطَّالِبِ — talabaning kitobi.",
    points: [
      { ar: 'المُضَاف', uz: "Birinchi ot — ال va tanvinsiz." },
      { ar: 'المُضَاف إِلَيْه', uz: 'Ikkinchi ot — majrur (ـِ).' },
    ],
    examples: [
      { ar: 'كِتَابُ الطَّالِبِ', uz: 'talabaning kitobi' },
      { ar: 'بَابُ الْبَيْتِ', uz: 'uyning eshigi' },
    ],
    blanks: [
      {
        prompt: "To'ldiring: 'talabaning kitobi'",
        sentence: 'كِتَابُ ___',
        options: ['الطَّالِبُ', 'الطَّالِبِ', 'طَالِبٌ'],
        answer: 'الطَّالِبِ',
        uz: 'Mudaf ilayh majrur (ـِ) bo\'ladi.',
      },
    ],
  },

  'g-naat': {
    id: 'g-naat',
    level: 'A1',
    title: "Sifat va mavsuf (النَّعْت وَالمَنْعُوت)",
    summary:
      "Sifat (na't) o'zidan oldingi otga jins, son, holat va aniqlikda mos keladi va otdan KEYIN keladi. بَيْتٌ كَبِيرٌ — katta uy.",
    points: [
      { ar: 'الِاسْم ثُمَّ الصِّفَة', uz: 'Avval ot, keyin sifat keladi.' },
      { ar: 'مُطَابَقَة', uz: 'Sifat jins va aniqlikda otga mos keladi.' },
    ],
    examples: [
      { ar: 'بَيْتٌ كَبِيرٌ', uz: 'katta uy' },
      { ar: 'الْبِنْتُ الْجَمِيلَةُ', uz: 'chiroyli qiz' },
    ],
    blanks: [
      {
        prompt: "To'ldiring: 'yangi kitob' (كِتَاب — muzakkar)",
        sentence: 'كِتَابٌ ___',
        options: ['جَدِيدٌ', 'جَدِيدَةٌ', 'جُدُدٌ'],
        answer: 'جَدِيدٌ',
        uz: 'Muzakkar ot uchun sifat ham muzakkar.',
      },
    ],
  },

  'g-plural': {
    id: 'g-plural',
    level: 'A1',
    title: "Birlik va ko'plik (المُفْرَد وَالجَمْع)",
    summary:
      "Mufrad — birlik. Sog'lom ko'plik: muzakkar ـُونَ/ـِينَ (مُعَلِّمُونَ), muannas ـَات (مُعَلِّمَات).",
    points: [
      { ar: 'جَمْع مُذَكَّر سَالِم', uz: 'Muzakkar: ـُونَ / ـِينَ — مُسْلِمُونَ.' },
      { ar: 'جَمْع مُؤَنَّث سَالِم', uz: 'Muannas: ـَات — مُعَلِّمَات.' },
    ],
    examples: [
      { ar: 'مُعَلِّم ← مُعَلِّمُونَ', uz: "o'qituvchi ← o'qituvchilar" },
      { ar: 'مُعَلِّمَة ← مُعَلِّمَات', uz: "o'qituvchi (ayol) ← o'qituvchilar" },
    ],
    blanks: [
      {
        prompt: "Ko'plik (ayol): 'o'qituvchilar'",
        sentence: 'هُنَّ ___',
        options: ['مُعَلِّمَة', 'مُعَلِّمَات', 'مُعَلِّمُونَ'],
        answer: 'مُعَلِّمَات',
        uz: 'Muannas sog\'lom ko\'plik ـَات bilan.',
      },
    ],
  },

  'g-jar': {
    id: 'g-jar',
    level: 'A1',
    title: "Jar harflari (حُرُوف الجَرّ)",
    summary:
      "فِي (ichida), مِنْ (...dan), إِلَى (...ga), عَلَى (ustida), بِ (bilan). Jar harfidan keyingi ot majrur (ـِ) bo'ladi.",
    points: [
      { ar: 'فِي الْبَيْتِ', uz: 'uyda' },
      { ar: 'مِنَ الْمَدْرَسَةِ', uz: 'maktabdan' },
      { ar: 'إِلَى الْجَامِعَةِ', uz: 'universitetga' },
      { ar: 'عَلَى الطَّاوِلَةِ', uz: 'stol ustida' },
    ],
    examples: [
      { ar: 'الْكِتَابُ عَلَى الْمَكْتَبِ', uz: 'Kitob stol ustida' },
      { ar: 'أَذْهَبُ إِلَى السُّوقِ', uz: 'Bozorga boraman' },
    ],
    blanks: [
      {
        prompt: "To'ldiring: 'Maktabga boraman'",
        sentence: 'أَذْهَبُ ___ الْمَدْرَسَةِ',
        options: ['فِي', 'إِلَى', 'عَلَى'],
        answer: 'إِلَى',
        uz: "Yo'nalish uchun إِلَى.",
      },
    ],
  },

  'g-numbers': {
    id: 'g-numbers',
    level: 'A1',
    title: 'Sonlar (الأَعْدَاد ١–١٠)',
    summary:
      "Asosiy sanoq sonlar: وَاحِد (1), اِثْنَان (2), ثَلَاثَة (3), أَرْبَعَة (4), خَمْسَة (5) ... عَشَرَة (10).",
    points: [
      { ar: '١ وَاحِد · ٢ اِثْنَان · ٣ ثَلَاثَة', uz: 'bir, ikki, uch' },
      { ar: '٤ أَرْبَعَة · ٥ خَمْسَة', uz: "to'rt, besh" },
      { ar: 'ثَلَاثَةُ كُتُبٍ', uz: 'uch kitob (son + ot)' },
    ],
    examples: [
      { ar: 'عِنْدِي خَمْسَةُ أَقْلَامٍ', uz: 'Mende beshta qalam bor' },
      { ar: 'فِي الْفَصْلِ عَشَرَةُ طُلَّابٍ', uz: "Sinfda o'nta talaba bor" },
    ],
    blanks: [
      {
        prompt: "'Besh (5)' qaysi?",
        sentence: '٥ = ___',
        options: ['ثَلَاثَة', 'خَمْسَة', 'سَبْعَة'],
        answer: 'خَمْسَة',
        uz: '5 = خَمْسَة.',
      },
    ],
  },

  'g-ordinals': {
    id: 'g-ordinals',
    level: 'A1',
    title: 'Tartib sonlar (الأَعْدَاد التَّرْتِيبِيَّة)',
    summary:
      "Tartibni bildiradi: الأَوَّل (birinchi), الثَّانِي (ikkinchi), الثَّالِث (uchinchi), الرَّابِع (to'rtinchi), الخَامِس (beshinchi).",
    points: [
      { ar: 'الأَوَّل', uz: 'birinchi' },
      { ar: 'الثَّانِي', uz: 'ikkinchi' },
      { ar: 'الثَّالِث', uz: 'uchinchi' },
    ],
    examples: [
      { ar: 'الدَّرْسُ الأَوَّلُ', uz: 'birinchi dars' },
      { ar: 'الْيَوْمُ الثَّالِثُ', uz: 'uchinchi kun' },
    ],
    blanks: [
      {
        prompt: "To'ldiring: 'ikkinchi dars'",
        sentence: 'الدَّرْسُ ___',
        options: ['الأَوَّل', 'الثَّانِي', 'الثَّالِث'],
        answer: 'الثَّانِي',
        uz: 'ikkinchi = الثَّانِي.',
      },
    ],
  },

  'g-questions': {
    id: 'g-questions',
    level: 'A1',
    title: "So'roq so'zlari (أَدَوَات الِاسْتِفْهَام)",
    summary:
      "مَا (nima), مَنْ (kim), أَيْنَ (qayerda), كَمْ (qancha), مَتَى (qachon), كَيْفَ (qanday), هَلْ (...mi).",
    points: [
      { ar: 'مَا اسْمُكَ؟', uz: 'Isming nima?' },
      { ar: 'أَيْنَ الْبَيْتُ؟', uz: 'Uy qayerda?' },
      { ar: 'كَمْ سَاعَةً؟', uz: 'Necha soat?' },
      { ar: 'مَتَى الِامْتِحَانُ؟', uz: 'Imtihon qachon?' },
    ],
    examples: [
      { ar: 'مَنْ هَذَا؟', uz: 'Bu kim?' },
      { ar: 'كَيْفَ حَالُكَ؟', uz: 'Qalaysan?' },
    ],
    blanks: [
      {
        prompt: "To'ldiring: 'Isming nima?'",
        sentence: '___ اسْمُكَ؟',
        options: ['مَا', 'مَنْ', 'أَيْنَ'],
        answer: 'مَا',
        uz: 'Narsa/ism uchun مَا.',
      },
      {
        prompt: "To'ldiring: 'Uy qayerda?'",
        sentence: '___ الْبَيْتُ؟',
        options: ['مَتَى', 'أَيْنَ', 'كَمْ'],
        answer: 'أَيْنَ',
        uz: 'Joy uchun أَيْنَ.',
      },
    ],
  },

  'g-verb-present': {
    id: 'g-verb-present',
    level: 'A1',
    title: "Hozirgi-kelasi zamon fe'li (الفِعْل المُضَارِع)",
    summary:
      "Mudori' fe'l boshida shaxs prefiksi bo'ladi: أَ (men), تَ (sen/u-ayol), يَ (u-erkak), نَ (biz). يَكْتُبُ — u yozadi.",
    points: [
      { ar: 'أَكْتُبُ', uz: 'men yozaman' },
      { ar: 'تَكْتُبُ', uz: 'sen yozasan' },
      { ar: 'يَكْتُبُ', uz: 'u (erkak) yozadi' },
      { ar: 'نَكْتُبُ', uz: 'biz yozamiz' },
    ],
    examples: [
      { ar: 'أَذْهَبُ إِلَى الْجَامِعَةِ', uz: 'Universitetga boraman' },
      { ar: 'هُوَ يَدْرُسُ الْعَرَبِيَّةَ', uz: "U arab tilini o'rganadi" },
    ],
    blanks: [
      {
        prompt: "To'ldiring: 'Men kitob o'qiyman'",
        sentence: 'أَنَا ___ الْكِتَابَ',
        options: ['أَقْرَأُ', 'يَقْرَأُ', 'قَرَأَ'],
        answer: 'أَقْرَأُ',
        uz: "'Men' uchun أَ prefiksi: أَقْرَأُ.",
      },
    ],
  },

  'g-amr': {
    id: 'g-amr',
    level: 'A1',
    title: "Buyruq fe'li (فِعْل الأَمْر)",
    summary:
      "Buyruq beradi: اُكْتُبْ (yoz!), اِقْرَأْ (o'qi!), اِذْهَبْ (bor!), اِشْرَبْ (ich!). Ayolga ـِي qo'shiladi: اُكْتُبِي.",
    points: [
      { ar: 'اُكْتُبْ', uz: 'yoz!' },
      { ar: 'اِقْرَأْ', uz: "o'qi!" },
      { ar: 'اِسْمَعْ', uz: 'tingla!' },
    ],
    examples: [
      { ar: 'اِفْتَحِ الْبَابَ', uz: 'Eshikni och!' },
      { ar: 'اِشْرَبِ الدَّوَاءَ', uz: 'Dorini ich!' },
    ],
    blanks: [
      {
        prompt: "Buyruq shaklini tanlang: 'yoz!'",
        sentence: '___ الدَّرْسَ',
        options: ['كَتَبَ', 'يَكْتُبُ', 'اُكْتُبْ'],
        answer: 'اُكْتُبْ',
        uz: 'Buyruq fe\'li: اُكْتُبْ.',
      },
    ],
  },

  'g-masdar': {
    id: 'g-masdar',
    level: 'A1',
    title: 'Masdar (المَصْدَر)',
    summary:
      "Masdar — harakatning ot shakli: القِرَاءَة (o'qish), الكِتَابَة (yozish), الذَّهَاب (borish).",
    points: [
      { ar: 'قَرَأَ ← القِرَاءَة', uz: "o'qidi ← o'qish" },
      { ar: 'كَتَبَ ← الكِتَابَة', uz: 'yozdi ← yozish' },
      { ar: 'ذَهَبَ ← الذَّهَاب', uz: 'bordi ← borish' },
    ],
    examples: [
      { ar: 'القِرَاءَةُ مُفِيدَةٌ', uz: "O'qish foydali" },
      { ar: 'أُحِبُّ السِّبَاحَةَ', uz: "Suzishni yaxshi ko'raman" },
    ],
    blanks: [
      {
        prompt: "Masdarni tanlang: 'o'qish'",
        sentence: '___ مُفِيدَةٌ',
        options: ['قَرَأَ', 'القِرَاءَة', 'اِقْرَأْ'],
        answer: 'القِرَاءَة',
        uz: 'Masdar (ot shakli): القِرَاءَة.',
      },
    ],
  },

  'g-mubtada-khabar': {
    id: 'g-mubtada-khabar',
    level: 'A1',
    title: 'Mubtado va xabar (المُبْتَدَأ وَالخَبَر)',
    summary:
      "Otli gap egadan (mubtado, aniq, raf') va xabardan (raf') tuziladi. الْبَيْتُ كَبِيرٌ — uy katta.",
    points: [
      { ar: 'المُبْتَدَأ', uz: 'Ega — aniq va raf‘ (ـُ).' },
      { ar: 'الخَبَر', uz: 'Xabar — raf‘ (ـٌ).' },
    ],
    examples: [
      { ar: 'الطَّالِبُ مُجْتَهِدٌ', uz: 'Talaba tirishqoq' },
      { ar: 'الْكِتَابُ جَدِيدٌ', uz: 'Kitob yangi' },
    ],
    blanks: [
      {
        prompt: "To'ldiring: 'Uy katta'",
        sentence: 'الْبَيْتُ ___',
        options: ['كَبِيرٌ', 'كَبِيرًا', 'كَبِيرٍ'],
        answer: 'كَبِيرٌ',
        uz: 'Xabar raf‘ (ـٌ) holatida bo\'ladi.',
      },
    ],
  },
}

export function getGrammar(id) {
  return id ? GRAMMAR[id] : null
}
