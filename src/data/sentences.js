// Reading & listening passages keyed by id, referenced from curriculum lessons.
// Each: {
//   id, level, title,
//   tokens: [{ ar, uz }],          // word-by-word for tap-to-reveal highlight
//   text (full, with harakat),
//   uz (full translation),
//   questions: [{ q, options:[], answer }]   // comprehension MCQ
// }

export const PASSAGES = {
  'p-greet': {
    id: 'p-greet',
    level: 'A1',
    title: 'Tanishish',
    tokens: [
      { ar: 'مَرْحَبًا', uz: 'Salom' },
      { ar: 'اِسْمِي', uz: 'mening ismim' },
      { ar: 'أَحْمَد', uz: 'Ahmad' },
      { ar: 'أَنَا', uz: 'men' },
      { ar: 'طَالِبٌ', uz: 'talaba' },
    ],
    text: 'مَرْحَبًا، اِسْمِي أَحْمَد. أَنَا طَالِبٌ.',
    uz: "Salom, mening ismim Ahmad. Men talabaman.",
    questions: [
      {
        q: "Bu odamning ismi nima?",
        options: ['Ali', 'Ahmad', 'Omar'],
        answer: 'Ahmad',
      },
      {
        q: "U kim?",
        options: ["O'qituvchi", 'Talaba', 'Shifokor'],
        answer: 'Talaba',
      },
    ],
  },

  'p-family': {
    id: 'p-family',
    level: 'A1',
    title: 'Mening oilam',
    tokens: [
      { ar: 'هَذِهِ', uz: 'bu (ayol)' },
      { ar: 'عَائِلَتِي', uz: 'mening oilam' },
      { ar: 'أَبِي', uz: 'otam' },
      { ar: 'مُعَلِّمٌ', uz: "o'qituvchi" },
      { ar: 'وَأُمِّي', uz: 'va onam' },
      { ar: 'طَبِيبَةٌ', uz: 'shifokor (ayol)' },
    ],
    text: 'هَذِهِ عَائِلَتِي. أَبِي مُعَلِّمٌ وَأُمِّي طَبِيبَةٌ.',
    uz: "Bu mening oilam. Otam o'qituvchi va onam shifokor.",
    questions: [
      {
        q: "Otasi kim bo'lib ishlaydi?",
        options: ["O'qituvchi", 'Shifokor', 'Muhandis'],
        answer: "O'qituvchi",
      },
      {
        q: 'Onasi kim?',
        options: ['Talaba', 'Shifokor', 'Savdogar'],
        answer: 'Shifokor',
      },
    ],
  },

  'p-home': {
    id: 'p-home',
    level: 'A2',
    title: 'Mening uyim',
    tokens: [
      { ar: 'بَيْتِي', uz: 'mening uyim' },
      { ar: 'كَبِيرٌ', uz: 'katta' },
      { ar: 'فِيهِ', uz: 'unda bor' },
      { ar: 'ثَلَاثُ', uz: 'uchta' },
      { ar: 'غُرَفٍ', uz: 'xonalar' },
      { ar: 'وَمَطْبَخٌ', uz: 'va oshxona' },
    ],
    text: 'بَيْتِي كَبِيرٌ. فِيهِ ثَلَاثُ غُرَفٍ وَمَطْبَخٌ.',
    uz: "Mening uyim katta. Unda uchta xona va oshxona bor.",
    questions: [
      {
        q: "Uy qanday?",
        options: ['Kichik', 'Katta', 'Eski'],
        answer: 'Katta',
      },
      {
        q: 'Nechta xona bor?',
        options: ['Ikkita', 'Uchta', "To'rtta"],
        answer: 'Uchta',
      },
    ],
  },

  'p-market': {
    id: 'p-market',
    level: 'A2',
    title: 'Bozorda',
    tokens: [
      { ar: 'ذَهَبْتُ', uz: 'men bordim' },
      { ar: 'إِلَى', uz: '...ga' },
      { ar: 'السُّوقِ', uz: 'bozorga' },
      { ar: 'وَاشْتَرَيْتُ', uz: 'va sotib oldim' },
      { ar: 'خُبْزًا', uz: 'non' },
      { ar: 'وَتُفَّاحًا', uz: 'va olma' },
    ],
    text: 'ذَهَبْتُ إِلَى السُّوقِ وَاشْتَرَيْتُ خُبْزًا وَتُفَّاحًا.',
    uz: "Men bozorga bordim va non hamda olma sotib oldim.",
    questions: [
      {
        q: 'U qayerga bordi?',
        options: ['Maktabga', 'Bozorga', 'Uyga'],
        answer: 'Bozorga',
      },
      {
        q: 'U nima sotib oldi?',
        options: ['Non va olma', "Go'sht va sut", 'Choy va qahva'],
        answer: 'Non va olma',
      },
    ],
  },

  'p-opinion': {
    id: 'p-opinion',
    level: 'B1',
    title: 'Mutolaa haqida fikr',
    tokens: [
      { ar: 'أَعْتَقِدُ', uz: "o'ylaymanki" },
      { ar: 'أَنَّ', uz: '...ligini' },
      { ar: 'الْقِرَاءَةَ', uz: "o'qishni" },
      { ar: 'مُفِيدَةٌ', uz: 'foydali' },
      { ar: 'لِأَنَّهَا', uz: 'chunki u' },
      { ar: 'تُنَمِّي', uz: 'rivojlantiradi' },
      { ar: 'الْعَقْلَ', uz: 'aqlni' },
    ],
    text: 'أَعْتَقِدُ أَنَّ الْقِرَاءَةَ مُفِيدَةٌ لِأَنَّهَا تُنَمِّي الْعَقْلَ.',
    uz: "Menimcha, o'qish foydali, chunki u aqlni rivojlantiradi.",
    questions: [
      {
        q: "Muallif o'qish haqida nima deydi?",
        options: ['Zerikarli', 'Foydali', 'Qiyin'],
        answer: 'Foydali',
      },
      {
        q: "Nega foydali deb hisoblaydi?",
        options: ['Aqlni rivojlantiradi', 'Vaqtni o\'ldiradi', 'Pul keltiradi'],
        answer: 'Aqlni rivojlantiradi',
      },
    ],
  },

  'p-news': {
    id: 'p-news',
    level: 'B1',
    title: 'Yangilik',
    tokens: [
      { ar: 'أَعْلَنَتِ', uz: "e'lon qildi" },
      { ar: 'الْحُكُومَةُ', uz: 'hukumat' },
      { ar: 'عَنْ', uz: 'haqida' },
      { ar: 'مَشْرُوعٍ', uz: 'loyiha' },
      { ar: 'جَدِيدٍ', uz: 'yangi' },
      { ar: 'لِتَحْسِينِ', uz: 'yaxshilash uchun' },
      { ar: 'الصِّحَّةِ', uz: "sog'liqni" },
    ],
    text: 'أَعْلَنَتِ الْحُكُومَةُ عَنْ مَشْرُوعٍ جَدِيدٍ لِتَحْسِينِ الصِّحَّةِ.',
    uz: "Hukumat sog'liqni yaxshilash uchun yangi loyiha e'lon qildi.",
    questions: [
      {
        q: "Kim e'lon qildi?",
        options: ['Maktab', 'Hukumat', 'Shifokor'],
        answer: 'Hukumat',
      },
      {
        q: 'Loyiha nima uchun?',
        options: ["Ta'limni yaxshilash", "Sog'liqni yaxshilash", 'Yo\'llarni qurish'],
        answer: "Sog'liqni yaxshilash",
      },
    ],
  },
  // ═══════════ B2 PASSAGES ═══════════
  'p-economy': {
    id: 'p-economy',
    level: 'B2',
    title: 'Iqtisodiy tahlil',
    tokens: [
      { ar: 'يَعْتَمِدُ', uz: 'tayanaadi' },
      { ar: 'الِاقْتِصَادُ', uz: 'iqtisodiyot' },
      { ar: 'عَلَى', uz: '..ga' },
      { ar: 'التِّجَارَةِ', uz: 'savdoga' },
      { ar: 'وَالِاسْتِثْمَارِ', uz: 'va investitsiyaga' },
    ],
    text: 'يَعْتَمِدُ الِاقْتِصَادُ الْحَدِيثُ عَلَى التِّجَارَةِ الدَّوْلِيَّةِ وَالِاسْتِثْمَارِ الأَجْنَبِيِّ.',
    uz: "Zamonaviy iqtisodiyot xalqaro savdo va xorijiy investitsiyaga tayanadi.",
    questions: [
      { q: 'Zamonaviy iqtisod nimaga tayanadi?', options: ['Savdo va investitsiya', 'Faqat qishloq xo\'jaligi', 'Sanoat'], answer: 'Savdo va investitsiya' },
    ],
  },

  'p-science': {
    id: 'p-science',
    level: 'B2',
    title: "Sun'iy intellekt",
    tokens: [
      { ar: 'يُغَيِّرُ', uz: 'o\'zgartirmoqda' },
      { ar: 'الذَّكَاءُ الِاصْطِنَاعِيُّ', uz: 'sun\'iy intellekt' },
      { ar: 'حَيَاتَنَا', uz: 'hayotimizni' },
      { ar: 'بِسُرْعَةٍ', uz: 'tezlik bilan' },
    ],
    text: 'يُغَيِّرُ الذَّكَاءُ الِاصْطِنَاعِيُّ حَيَاتَنَا بِسُرْعَةٍ كَبِيرَةٍ فِي مَجَالَاتِ الطِّبِّ وَالتَّعْلِيمِ وَالصِّنَاعَةِ.',
    uz: "Sun'iy intellekt tibbiyot, ta'lim va sanoat sohalarida hayotimizni katta tezlik bilan o'zgartirmoqda.",
    questions: [
      { q: 'SI qaysi sohalarda ta\'sir qilmoqda?', options: ['Tibbiyot, ta\'lim, sanoat', 'Faqat sanoat', 'Qishloq xo\'jaligi'], answer: 'Tibbiyot, ta\'lim, sanoat' },
    ],
  },

  // ═══════════ C1 PASSAGES ═══════════
  'p-academic': {
    id: 'p-academic',
    level: 'C1',
    title: 'Ilmiy tadqiqot',
    tokens: [
      { ar: 'تَهْدِفُ', uz: 'maqsad qiladi' },
      { ar: 'هَذِهِ الدِّرَاسَةُ', uz: 'bu tadqiqot' },
      { ar: 'إِلَى تَحْلِيلِ', uz: 'tahlil qilishni' },
      { ar: 'أَثَرِ', uz: 'ta\'sirini' },
      { ar: 'التَّعْلِيمِ الإِلِكْتِرُونِيِّ', uz: 'elektron ta\'limning' },
    ],
    text: 'تَهْدِفُ هَذِهِ الدِّرَاسَةُ إِلَى تَحْلِيلِ أَثَرِ التَّعْلِيمِ الإِلِكْتِرُونِيِّ عَلَى تَحْصِيلِ الطُّلَّابِ فِي الْمَرْحَلَةِ الْجَامِعِيَّةِ.',
    uz: "Bu tadqiqot elektron ta'limning universitet bosqichidagi talabalar yutuqlariga ta'sirini tahlil qilishni maqsad qiladi.",
    questions: [
      { q: 'Tadqiqot nimani tahlil qiladi?', options: ['Elektron ta\'lim ta\'sirini', 'Iqtisodiy o\'sishni', 'Sog\'liq muammolarini'], answer: 'Elektron ta\'lim ta\'sirini' },
    ],
  },

  'p-politics': {
    id: 'p-politics',
    level: 'C1',
    title: 'Demokratiya va inson huquqlari',
    tokens: [
      { ar: 'تَقُومُ', uz: 'asoslanadi' },
      { ar: 'الدِّيمُقْرَاطِيَّةُ', uz: 'demokratiya' },
      { ar: 'عَلَى', uz: '..ga' },
      { ar: 'مَبْدَأِ', uz: 'tamoyiliga' },
      { ar: 'حُقُوقِ الإِنْسَانِ', uz: 'inson huquqlari' },
      { ar: 'وَالْمُسَاوَاةِ', uz: 'va tenglik' },
    ],
    text: 'تَقُومُ الدِّيمُقْرَاطِيَّةُ عَلَى مَبْدَأِ حُقُوقِ الإِنْسَانِ وَالْمُسَاوَاةِ أَمَامَ الْقَانُونِ وَحُرِّيَّةِ التَّعْبِيرِ.',
    uz: "Demokratiya inson huquqlari, qonun oldida tenglik va so'z erkinligi tamoyiliga asoslanadi.",
    questions: [
      { q: 'Demokratiya nimaga asoslanadi?', options: ['Inson huquqlari va tenglik', 'Faqat saylovlarga', 'Harbiy kuchga'], answer: 'Inson huquqlari va tenglik' },
    ],
  },

  // ═══════════ C2 PASSAGES ═══════════
  'p-classical': {
    id: 'p-classical',
    level: 'C2',
    title: "Imru'ul-Qays she'ridan",
    tokens: [
      { ar: 'قِفَا', uz: 'to\'xtanglar' },
      { ar: 'نَبْكِ', uz: 'yig\'laylik' },
      { ar: 'مِنْ ذِكْرَى', uz: 'xotirasidan' },
      { ar: 'حَبِيبٍ', uz: 'sevgilining' },
      { ar: 'وَمَنْزِلِ', uz: 'va manzilning' },
    ],
    text: 'قِفَا نَبْكِ مِنْ ذِكْرَى حَبِيبٍ وَمَنْزِلِ بِسِقْطِ اللِّوَى بَيْنَ الدَّخُولِ فَحَوْمَلِ',
    uz: "To'xtanglar! Sevgilining va manzilning xotirasidan yig'laylik — qumtepa etagida, Daxul va Hawmal o'rtasida.",
    questions: [
      { q: 'Bu she\'r kim tomonidan yozilgan?', options: ['Imru\'ul-Qays', 'Al-Mutanabbi', 'Abu Nuwas'], answer: 'Imru\'ul-Qays' },
      { q: 'She\'r qanday ohang bilan boshlanadi?', options: ['Quvnoq', 'Hasratli', 'G\'azabli'], answer: 'Hasratli' },
    ],
  },

  'p-translation': {
    id: 'p-translation',
    level: 'C2',
    title: 'Tarjima nazariyasi',
    tokens: [
      { ar: 'تَتَطَلَّبُ', uz: 'talab qiladi' },
      { ar: 'التَّرْجَمَةُ', uz: 'tarjima' },
      { ar: 'الأَدَبِيَّةُ', uz: 'badiiy' },
      { ar: 'إِتْقَانَ', uz: 'mukammal bilishni' },
      { ar: 'اللُّغَتَيْنِ', uz: 'ikki tilni' },
    ],
    text: 'تَتَطَلَّبُ التَّرْجَمَةُ الأَدَبِيَّةُ إِتْقَانَ اللُّغَتَيْنِ وَفَهْمَ السِّيَاقِ الثَّقَافِيِّ وَالقُدْرَةَ عَلَى نَقْلِ الأُسْلُوبِ وَلَيْسَ الْمَعْنَى فَحَسْبُ.',
    uz: "Badiiy tarjima ikki tilni mukammal bilishni, madaniy kontekstni tushunishni va faqat ma'noni emas, balki uslubni ham ko'chirishni talab qiladi.",
    questions: [
      { q: 'Badiiy tarjima nima talab qiladi?', options: ['Ikki tilni bilish va uslubni ko\'chirish', 'Faqat lug\'at bilish', 'Grammatikani bilish'], answer: 'Ikki tilni bilish va uslubni ko\'chirish' },
    ],
  },
}

export function getPassage(id) {
  return id ? PASSAGES[id] : null
}
