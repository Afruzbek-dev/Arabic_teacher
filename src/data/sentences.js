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

  // ═══════════ A1 ROADMAP PASSAGES & DIALOGUES ═══════════

  'p-tanishuv': {
    id: 'p-tanishuv',
    level: 'A1',
    title: 'Tanishuv dialogi',
    tokens: [
      { ar: 'مَرْحَبًا', uz: 'Salom' },
      { ar: 'مَا', uz: 'nima' },
      { ar: 'اسْمُكَ', uz: 'isming' },
      { ar: 'اِسْمِي', uz: 'mening ismim' },
      { ar: 'سَعِيد', uz: 'Said' },
      { ar: 'مِنْ أَيْنَ', uz: 'qayerdan' },
      { ar: 'أَنْتَ', uz: 'sen' },
    ],
    text: 'مَرْحَبًا! مَا اسْمُكَ؟ اِسْمِي سَعِيدٌ. مِنْ أَيْنَ أَنْتَ؟ أَنَا مِنْ أُوزْبَكِسْتَانَ.',
    uz: "Salom! Isming nima? Mening ismim Said. Qayerdansan? Men O'zbekistondanman.",
    questions: [
      { q: 'Bu odamning ismi nima?', options: ['Ali', 'Said', 'Omar'], answer: 'Said' },
      { q: 'U qayerdan?', options: ["O'zbekistondan", 'Misrdan', 'Turkiyadan'], answer: "O'zbekistondan" },
    ],
  },

  'p-university': {
    id: 'p-university',
    level: 'A1',
    title: 'Mening universitetim',
    tokens: [
      { ar: 'أَنَا', uz: 'men' },
      { ar: 'طَالِبٌ', uz: 'talaba' },
      { ar: 'فِي الْجَامِعَةِ', uz: 'universitetda' },
      { ar: 'أَدْرُسُ', uz: "o'rganaman" },
      { ar: 'الْعَرَبِيَّةَ', uz: 'arab tilini' },
      { ar: 'وَالتَّارِيخَ', uz: 'va tarixni' },
      { ar: 'كَبِيرَةٌ', uz: 'katta' },
    ],
    text: 'أَنَا طَالِبٌ فِي الْجَامِعَةِ. أَدْرُسُ اللُّغَةَ الْعَرَبِيَّةَ وَالتَّارِيخَ. الْجَامِعَةُ كَبِيرَةٌ وَجَمِيلَةٌ.',
    uz: "Men universitetda talabaman. Arab tili va tarixni o'rganaman. Universitet katta va chiroyli.",
    questions: [
      { q: 'U nimani o\'rganadi?', options: ['Matematika', 'Arab tili va tarix', 'Fizika'], answer: 'Arab tili va tarix' },
      { q: 'Universitet qanday?', options: ['Kichik', 'Katta va chiroyli', 'Eski'], answer: 'Katta va chiroyli' },
    ],
  },

  'p-restaurant': {
    id: 'p-restaurant',
    level: 'A1',
    title: 'Restoranda',
    tokens: [
      { ar: 'مَاذَا', uz: 'nima' },
      { ar: 'تُرِيدُ', uz: 'xohlaysan' },
      { ar: 'أُرِيدُ', uz: 'xohlayman' },
      { ar: 'خُبْزًا', uz: 'non' },
      { ar: 'وَدَجَاجًا', uz: 'va tovuq' },
      { ar: 'تَشْرَبُ', uz: 'ichasan' },
      { ar: 'عَصِيرًا', uz: 'sharbat' },
    ],
    text: 'مَاذَا تُرِيدُ؟ أُرِيدُ خُبْزًا وَدَجَاجًا. وَمَاذَا تَشْرَبُ؟ أَشْرَبُ عَصِيرًا.',
    uz: 'Nima xohlaysiz? Non va tovuq xohlayman. Nima ichasiz? Sharbat ichaman.',
    questions: [
      { q: 'U nima xohladi?', options: ['Baliq va guruch', 'Non va tovuq', 'Tuxum va sut'], answer: 'Non va tovuq' },
      { q: 'U nima ichadi?', options: ['Choy', 'Sharbat', 'Suv'], answer: 'Sharbat' },
    ],
  },

  'p-city': {
    id: 'p-city',
    level: 'A1',
    title: "Yo'l so'rash",
    tokens: [
      { ar: 'عَفْوًا', uz: 'kechirasiz' },
      { ar: 'أَيْنَ', uz: 'qayerda' },
      { ar: 'الْمُسْتَشْفَى', uz: 'kasalxona' },
      { ar: 'اِذْهَبْ', uz: 'boring' },
      { ar: 'إِلَى الْيَمِينِ', uz: "o'ngga" },
      { ar: 'أَمَامَ', uz: 'oldida' },
      { ar: 'الْبَنْكِ', uz: 'bank' },
    ],
    text: 'عَفْوًا، أَيْنَ الْمُسْتَشْفَى؟ اِذْهَبْ إِلَى الْيَمِينِ، الْمُسْتَشْفَى أَمَامَ الْبَنْكِ.',
    uz: "Kechirasiz, kasalxona qayerda? O'ngga boring, kasalxona bank oldida.",
    questions: [
      { q: 'U nimani qidiryapti?', options: ['Maktab', 'Kasalxona', 'Bozor'], answer: 'Kasalxona' },
      { q: 'Kasalxona qayerda?', options: ['Bank oldida', 'Maktab ortida', "Ko'cha oxirida"], answer: 'Bank oldida' },
    ],
  },

  'p-travel': {
    id: 'p-travel',
    level: 'A1',
    title: 'Safarga chiqdim',
    tokens: [
      { ar: 'سَافَرْتُ', uz: 'sayohat qildim' },
      { ar: 'إِلَى الْقَاهِرَةِ', uz: 'Qohiraga' },
      { ar: 'بِالطَّائِرَةِ', uz: 'samolyotda' },
      { ar: 'أَخَذْتُ', uz: 'oldim' },
      { ar: 'جَوَازِي', uz: 'pasportimni' },
      { ar: 'وَتَذْكِرَتِي', uz: 'va chiptamni' },
      { ar: 'الْمَطَارِ', uz: 'aeroport' },
    ],
    text: 'سَافَرْتُ إِلَى الْقَاهِرَةِ بِالطَّائِرَةِ. أَخَذْتُ جَوَازِي وَتَذْكِرَتِي وَذَهَبْتُ إِلَى الْمَطَارِ.',
    uz: 'Qohiraga samolyotda sayohat qildim. Pasportim va chiptamni oldim va aeroportga bordim.',
    questions: [
      { q: 'U qayerga sayohat qildi?', options: ['Madinaga', 'Qohiraga', 'Istanbulga'], answer: 'Qohiraga' },
      { q: 'U nima oldi?', options: ['Pasport va chipta', 'Kitob va qalam', 'Pul va kalit'], answer: 'Pasport va chipta' },
    ],
  },

  'p-doctor': {
    id: 'p-doctor',
    level: 'A1',
    title: 'Shifokorda',
    tokens: [
      { ar: 'أَنَا', uz: 'men' },
      { ar: 'مَرِيضٌ', uz: 'kasalman' },
      { ar: 'عِنْدِي', uz: 'menda bor' },
      { ar: 'حُمَّى', uz: 'isitma' },
      { ar: 'أَلَمٌ', uz: "og'riq" },
      { ar: 'فِي رَأْسِي', uz: 'boshimda' },
      { ar: 'خُذْ', uz: 'ol' },
      { ar: 'الدَّوَاءَ', uz: 'dorini' },
    ],
    text: 'أَنَا مَرِيضٌ يَا دُكْتُور. عِنْدِي حُمَّى وَأَلَمٌ فِي رَأْسِي. خُذْ هَذَا الدَّوَاءَ وَنَمْ جَيِّدًا.',
    uz: 'Men kasalman, doktor. Isitmam bor va boshim og\'riyapti. Bu dorini ol va yaxshi uxla.',
    questions: [
      { q: 'Bemorda nima bor?', options: ["Isitma va bosh og'rig'i", 'Yo\'tal', 'Qorin og\'rig\'i'], answer: "Isitma va bosh og'rig'i" },
      { q: 'Doktor nima dedi?', options: ['Yuring', 'Dori olib uxlang', 'Suv iching'], answer: 'Dori olib uxlang' },
    ],
  },

  'p-routine': {
    id: 'p-routine',
    level: 'A1',
    title: 'Kun tartibim',
    tokens: [
      { ar: 'أَسْتَيْقِظُ', uz: "uyg'onaman" },
      { ar: 'صَبَاحًا', uz: 'ertalab' },
      { ar: 'ثُمَّ', uz: 'keyin' },
      { ar: 'أَذْهَبُ', uz: 'boraman' },
      { ar: 'الْجَامِعَةِ', uz: 'universitet' },
      { ar: 'فِي الْمَسَاءِ', uz: 'kechqurun' },
      { ar: 'أَقْرَأُ', uz: "o'qiyman" },
    ],
    text: 'أَسْتَيْقِظُ صَبَاحًا، ثُمَّ أَذْهَبُ إِلَى الْجَامِعَةِ. فِي الْمَسَاءِ أَدْرُسُ وَأَقْرَأُ كِتَابًا.',
    uz: "Ertalab uyg'onaman, keyin universitetga boraman. Kechqurun o'qiyman va kitob o'qiyman.",
    questions: [
      { q: 'Ertalab nima qiladi?', options: ['Uxlaydi', 'Universitetga boradi', 'Ovqat pishiradi'], answer: 'Universitetga boradi' },
      { q: 'Kechqurun nima qiladi?', options: ["O'qiydi", 'Sayohat qiladi', 'Ishlaydi'], answer: "O'qiydi" },
    ],
  },
}

export function getPassage(id) {
  return id ? PASSAGES[id] : null
}
