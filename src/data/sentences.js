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
}

export function getPassage(id) {
  return id ? PASSAGES[id] : null
}
