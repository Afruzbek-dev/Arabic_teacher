// Curriculum tree (A1–C2) based on Al-Manhaj & At-Takallum.
// A lesson references vocab/grammar/reading by id; the ExerciseEngine
// auto-builds an exercise sequence from `skills`.
//
// lesson = {
//   id, title, objectives: [],
//   type: 'standard' | 'alphabet',
//   skills: [],            // ordered exercise families to include
//   vocabIds: [], grammarId, readingId,
//   letters: [],           // for type 'alphabet'
//   xp
// }
//
// A1 follows a full 18-unit CEFR-A1 roadmap (Al-Manhaj A1):
//   pronouns → questions → ishara → idafa → na't → plural → jar →
//   numbers → ordinals → question words → present → past → adjectives →
//   imperative → masdar → present(routine) → mubtada/khabar.

// ── Arabic letters (for the alphabet unit) ──────────────
export const LETTERS = [
  { ar: 'ا', name: 'Alif', translit: 'a' },
  { ar: 'ب', name: 'Baa', translit: 'b' },
  { ar: 'ت', name: 'Taa', translit: 't' },
  { ar: 'ث', name: 'Thaa', translit: 'th' },
  { ar: 'ج', name: 'Jiim', translit: 'j' },
  { ar: 'ح', name: 'Haa', translit: 'ḥ' },
  { ar: 'خ', name: 'Khaa', translit: 'kh' },
  { ar: 'د', name: 'Daal', translit: 'd' },
  { ar: 'ذ', name: 'Dhaal', translit: 'dh' },
  { ar: 'ر', name: 'Raa', translit: 'r' },
  { ar: 'ز', name: 'Zaay', translit: 'z' },
  { ar: 'س', name: 'Siin', translit: 's' },
  { ar: 'ش', name: 'Shiin', translit: 'sh' },
  { ar: 'ص', name: 'Saad', translit: 'ṣ' },
  { ar: 'ض', name: 'Daad', translit: 'ḍ' },
  { ar: 'ط', name: 'Taa', translit: 'ṭ' },
  { ar: 'ظ', name: 'Zaa', translit: 'ẓ' },
  { ar: 'ع', name: 'Ayn', translit: "'" },
  { ar: 'غ', name: 'Ghayn', translit: 'gh' },
  { ar: 'ف', name: 'Faa', translit: 'f' },
  { ar: 'ق', name: 'Qaaf', translit: 'q' },
  { ar: 'ك', name: 'Kaaf', translit: 'k' },
  { ar: 'ل', name: 'Laam', translit: 'l' },
  { ar: 'م', name: 'Miim', translit: 'm' },
  { ar: 'ن', name: 'Nuun', translit: 'n' },
  { ar: 'ه', name: 'Haa', translit: 'h' },
  { ar: 'و', name: 'Waaw', translit: 'w' },
  { ar: 'ي', name: 'Yaa', translit: 'y' },
]

// Level meta (banner color, etc.)
export const LEVEL_META = {
  A1: { title: "Mutlaq Boshlang'ich", color: '#58CC02', desc: '18 ta unit · alifbo, tanishuv, kundalik hayot' },
  A2: { title: "Boshlang'ich", color: '#1CB0F6', desc: 'Uy, oziq-ovqat, vaqt, kasblar' },
  B1: { title: "O'rta daraja", color: '#CE82FF', desc: 'Fikr bildirish, yangiliklar, sayohat' },
  B2: { title: "O'rta-yuqori", color: '#FF9600', desc: 'Ilm-fan, adabiyot, rasmiy muloqot' },
  C1: { title: "Ilg'or daraja", color: '#FF4B4B', desc: 'Akademik yozish, media, islomiy matnlar' },
  C2: { title: "Mukammal daraja", color: '#FFC800', desc: 'Klassik adabiyot, tarjima, tadqiqot' },
}

// Shared skill sets for standard lessons.
const FULL = ['vocab', 'recognition', 'listening', 'grammar', 'reading', 'speaking', 'writing', 'quiz']
const NO_READING = ['vocab', 'recognition', 'listening', 'grammar', 'speaking', 'writing', 'quiz']

export const CURRICULUM = {
  A1: {
    title: "Mutlaq Boshlang'ich",
    units: [
      {
        id: 'A1-U1',
        title: 'التعارف والتحيات — Alifbo va tanishuv',
        book: 'Al-Manhaj 1',
        lessons: [
          {
            id: 'A1-U1-L1',
            title: 'Harflar: Alif – Khaa',
            type: 'alphabet',
            objectives: ['7 ta harfni tanish', 'Harf nomlarini bilish'],
            skills: ['letters'],
            letters: ['ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ'],
            xp: 10,
          },
          {
            id: 'A1-U1-L2',
            title: 'Harflar: Daal – Shiin',
            type: 'alphabet',
            objectives: ['6 ta harfni tanish'],
            skills: ['letters'],
            letters: ['د', 'ذ', 'ر', 'ز', 'س', 'ش'],
            xp: 10,
          },
          {
            id: 'A1-U1-L3',
            title: 'Harflar: Saad – Qaaf',
            type: 'alphabet',
            objectives: ['8 ta harfni tanish'],
            skills: ['letters'],
            letters: ['ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق'],
            xp: 10,
          },
          {
            id: 'A1-U1-L4',
            title: 'Harflar: Kaaf – Yaa',
            type: 'alphabet',
            objectives: ['Qolgan harflarni tanish', 'Alifboni yakunlash'],
            skills: ['letters'],
            letters: ['ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي'],
            xp: 10,
          },
          {
            id: 'A1-U1-L5',
            title: 'Salomlashish va olmoshlar',
            type: 'standard',
            objectives: ["O'zini tanishtirish", 'Shaxs olmoshlari (أنا، أنت، هو، هي)'],
            skills: FULL,
            vocabIds: ['v707', 'v708', 'v710', 'v711', 'v001', 'v701', 'v704', 'v702'],
            grammarId: 'g-pronouns',
            readingId: 'p-tanishuv',
            xp: 15,
          },
        ],
      },
      {
        id: 'A1-U2',
        title: 'الأسرة — Oila',
        book: 'Al-Manhaj 1',
        lessons: [
          {
            id: 'A1-U2-L1',
            title: 'Oila a\'zolari va jins',
            type: 'standard',
            objectives: ['Oila so\'zlari', 'Muzakkar / muannas'],
            skills: FULL,
            vocabIds: ['v020', 'v021', 'v022', 'v023', 'v720', 'v723', 'v724', 'v725'],
            grammarId: 'g-gender',
            readingId: 'p-family',
            xp: 15,
          },
        ],
      },
      {
        id: 'A1-U3',
        title: 'السكن — Uy va yashash',
        book: 'Al-Manhaj 1',
        lessons: [
          {
            id: 'A1-U3-L1',
            title: 'Uy va ishora olmoshlari',
            type: 'standard',
            objectives: ['Uy so\'zlari', 'هذا / هذه'],
            skills: FULL,
            vocabIds: ['v100', 'v101', 'v102', 'v103', 'v730', 'v733', 'v735'],
            grammarId: 'g-ishara',
            readingId: 'p-home',
            xp: 15,
          },
        ],
      },
      {
        id: 'A1-U4',
        title: 'الجامعة والفصل — Universitet va sinf',
        book: 'Al-Manhaj 1',
        lessons: [
          {
            id: 'A1-U4-L1',
            title: 'Sinf, fanlar va izofa',
            type: 'standard',
            objectives: ['Universitet va fanlar', 'Izofa (mudaf / mudaf ilayh)'],
            skills: FULL,
            vocabIds: ['v743', 'v740', 'v741', 'v744', 'v745', 'v747', 'v748'],
            grammarId: 'g-idafa',
            readingId: 'p-university',
            xp: 15,
          },
        ],
      },
      {
        id: 'A1-U5',
        title: 'الأشياء اليومية — Kundalik buyumlar',
        book: 'Al-Manhaj 1',
        lessons: [
          {
            id: 'A1-U5-L1',
            title: 'Buyumlar va sifat',
            type: 'standard',
            objectives: ['Kundalik buyumlar', 'Sifat + mavsuf (na\'t)'],
            skills: NO_READING,
            vocabIds: ['v752', 'v753', 'v754', 'v755', 'v757', 'v758', 'v759'],
            grammarId: 'g-naat',
            readingId: null,
            xp: 15,
          },
        ],
      },
      {
        id: 'A1-U6',
        title: 'الطعام والشراب — Ovqat va ichimlik',
        book: 'Al-Manhaj 1',
        lessons: [
          {
            id: 'A1-U6-L1',
            title: 'Ovqat va ko\'plik',
            type: 'standard',
            objectives: ['Oziq-ovqat so\'zlari', 'Birlik / ko\'plik'],
            skills: FULL,
            vocabIds: ['v122', 'v124', 'v760', 'v761', 'v762', 'v764', 'v766'],
            grammarId: 'g-plural',
            readingId: 'p-restaurant',
            xp: 16,
          },
        ],
      },
      {
        id: 'A1-U7',
        title: 'المسجد — Masjid',
        book: 'Al-Manhaj 1',
        lessons: [
          {
            id: 'A1-U7-L1',
            title: 'Masjid va jar harflari',
            type: 'standard',
            objectives: ['Masjid so\'zlari', 'Jar harflari (في، من، إلى، على)'],
            skills: NO_READING,
            vocabIds: ['v770', 'v771', 'v772', 'v773', 'v774', 'v776', 'v777'],
            grammarId: 'g-jar',
            readingId: null,
            xp: 16,
          },
        ],
      },
      {
        id: 'A1-U8',
        title: 'الوقت — Soat va vaqt',
        book: 'Al-Manhaj 1',
        lessons: [
          {
            id: 'A1-U8-L1',
            title: 'Vaqt va sonlar',
            type: 'standard',
            objectives: ['Vaqt so\'zlari', 'Sonlar 1–20'],
            skills: NO_READING,
            vocabIds: ['v044', 'v049', 'v780', 'v781', 'v783', 'v784', 'v786', 'v787'],
            grammarId: 'g-numbers',
            readingId: null,
            xp: 16,
          },
        ],
      },
      {
        id: 'A1-U9',
        title: 'الأيام والشهور — Kunlar va oylar',
        book: 'Al-Manhaj 1',
        lessons: [
          {
            id: 'A1-U9-L1',
            title: 'Kunlar va tartib sonlar',
            type: 'standard',
            objectives: ['Hafta kunlari', 'Tartib sonlar'],
            skills: NO_READING,
            vocabIds: ['v790', 'v791', 'v792', 'v793', 'v797', 'v798', 'v799'],
            grammarId: 'g-ordinals',
            readingId: null,
            xp: 16,
          },
        ],
      },
      {
        id: 'A1-U10',
        title: 'المدينة — Shahar',
        book: 'Al-Manhaj 1',
        lessons: [
          {
            id: 'A1-U10-L1',
            title: 'Shahar va so\'roq so\'zlari',
            type: 'standard',
            objectives: ['Shahar joylari', 'So\'roq so\'zlari (أين، ما، من)'],
            skills: FULL,
            vocabIds: ['v800', 'v802', 'v804', 'v806', 'v807', 'v808', 'v809'],
            grammarId: 'g-questions',
            readingId: 'p-city',
            xp: 18,
          },
        ],
      },
      {
        id: 'A1-U11',
        title: 'المواصلات — Transport',
        book: 'Al-Manhaj 1',
        lessons: [
          {
            id: 'A1-U11-L1',
            title: 'Transport va hozirgi zamon',
            type: 'standard',
            objectives: ['Transport so\'zlari', 'Mudori\' fe\'l + makon'],
            skills: NO_READING,
            vocabIds: ['v810', 'v811', 'v812', 'v814', 'v815', 'v817', 'v871'],
            grammarId: 'g-verb-present',
            readingId: null,
            xp: 18,
          },
        ],
      },
      {
        id: 'A1-U12',
        title: 'التسوق — Xarid',
        book: 'Al-Manhaj 1',
        lessons: [
          {
            id: 'A1-U12-L1',
            title: 'Do\'konda: narx va savol',
            type: 'standard',
            objectives: ['Xarid so\'zlari', 'كم؟ بكم؟ — savol gaplar'],
            skills: NO_READING,
            vocabIds: ['v820', 'v821', 'v822', 'v823', 'v824', 'v825', 'v827'],
            grammarId: 'g-questions',
            readingId: null,
            xp: 18,
          },
        ],
      },
      {
        id: 'A1-U13',
        title: 'السفر — Safar',
        book: 'Al-Manhaj 1',
        lessons: [
          {
            id: 'A1-U13-L1',
            title: 'Safar va o\'tgan zamon',
            type: 'standard',
            objectives: ['Safar so\'zlari', 'Madi (o\'tgan zamon): ذهب، سافر، رجع'],
            skills: FULL,
            vocabIds: ['v830', 'v831', 'v832', 'v834', 'v835', 'v836', 'v838'],
            grammarId: 'g-verb-past',
            readingId: 'p-travel',
            xp: 18,
          },
        ],
      },
      {
        id: 'A1-U14',
        title: 'الطقس والملابس — Ob-havo va kiyim',
        book: 'Al-Manhaj 1',
        lessons: [
          {
            id: 'A1-U14-L1',
            title: 'Ob-havo, kiyim va sifatlar',
            type: 'standard',
            objectives: ['Ob-havo va kiyim', 'Sifatlar (na\'t) takrori'],
            skills: NO_READING,
            vocabIds: ['v840', 'v841', 'v842', 'v843', 'v846', 'v847', 'v848', 'v849'],
            grammarId: 'g-naat',
            readingId: null,
            xp: 18,
          },
        ],
      },
      {
        id: 'A1-U15',
        title: 'الصحة — Sog\'liq',
        book: 'Al-Manhaj 1',
        lessons: [
          {
            id: 'A1-U15-L1',
            title: 'Sog\'liq va buyruq fe\'li',
            type: 'standard',
            objectives: ['Tana va sog\'liq so\'zlari', 'Buyruq fe\'li (amr)'],
            skills: FULL,
            vocabIds: ['v850', 'v852', 'v854', 'v855', 'v856', 'v857', 'v858'],
            grammarId: 'g-amr',
            readingId: 'p-doctor',
            xp: 18,
          },
        ],
      },
      {
        id: 'A1-U16',
        title: 'الهوايات — Hobbi',
        book: 'Al-Manhaj 1',
        lessons: [
          {
            id: 'A1-U16-L1',
            title: 'Hobbi va masdar',
            type: 'standard',
            objectives: ['Mashg\'ulotlar', 'Masdar (harakat oti)'],
            skills: NO_READING,
            vocabIds: ['v860', 'v861', 'v862', 'v863', 'v864', 'v865', 'v867'],
            grammarId: 'g-masdar',
            readingId: null,
            xp: 18,
          },
        ],
      },
      {
        id: 'A1-U17',
        title: 'الحياة اليومية — Kundalik hayot',
        book: 'Al-Manhaj 1',
        lessons: [
          {
            id: 'A1-U17-L1',
            title: 'Kun tartibi va mudori\'',
            type: 'standard',
            objectives: ['Kun tartibi fe\'llari', 'Mudori\' (أدرس، أذهب، أقرأ)'],
            skills: FULL,
            vocabIds: ['v870', 'v871', 'v872', 'v873', 'v874', 'v875', 'v876'],
            grammarId: 'g-verb-present',
            readingId: 'p-routine',
            xp: 20,
          },
        ],
      },
      {
        id: 'A1-U18',
        title: 'المراجعة الشاملة — Umumiy takror',
        book: 'Al-Manhaj 1',
        lessons: [
          {
            id: 'A1-U18-L1',
            title: 'A1 yakuniy takror',
            type: 'standard',
            objectives: ['Barcha mavzularni takrorlash', 'Mubtado va xabar'],
            skills: FULL,
            vocabIds: ['v001', 'v020', 'v743', 'v770', 'v810', 'v830', 'v850', 'v122'],
            grammarId: 'g-mubtada-khabar',
            readingId: 'p-tanishuv',
            xp: 25,
          },
        ],
      },
    ],
  },

  A2: {
    title: "Boshlang'ich",
    units: [
      {
        id: 'A2-U1',
        title: 'Uy va Manzil',
        book: 'Al-Manhaj 2',
        lessons: [
          {
            id: 'A2-U1-L1',
            title: 'Uy xonalari',
            type: 'standard',
            objectives: ['Uy bilan bog\'liq so\'zlar'],
            skills: ['vocab', 'recognition', 'listening', 'reading', 'speaking', 'writing', 'quiz'],
            vocabIds: ['v100', 'v101', 'v102', 'v103', 'v104', 'v105'],
            grammarId: null,
            readingId: 'p-home',
            xp: 18,
          },
        ],
      },
      {
        id: 'A2-U2',
        title: 'Oziq-ovqat va bozor',
        book: 'Al-Manhaj 2',
        lessons: [
          {
            id: 'A2-U2-L1',
            title: 'Bozorda',
            type: 'standard',
            objectives: ['Oziq-ovqat so\'zlari', 'Bozor dialogi'],
            skills: ['vocab', 'recognition', 'listening', 'reading', 'speaking', 'writing', 'quiz'],
            vocabIds: ['v120', 'v122', 'v123', 'v124', 'v126', 'v129'],
            grammarId: null,
            readingId: 'p-market',
            xp: 18,
          },
        ],
      },
      {
        id: 'A2-U3',
        title: 'Vaqt va kun tartibi',
        book: 'At-Takallum 1',
        lessons: [
          {
            id: 'A2-U3-L1',
            title: "Vaqt va o'tgan zamon",
            type: 'standard',
            objectives: ['Vaqt so\'zlari', 'O\'tgan zamon fe\'li'],
            skills: ['vocab', 'recognition', 'listening', 'grammar', 'speaking', 'writing', 'quiz'],
            vocabIds: ['v140', 'v141', 'v142', 'v143', 'v144', 'v300', 'v301', 'v302'],
            grammarId: 'g-verb-past',
            readingId: null,
            xp: 18,
          },
        ],
      },
      {
        id: 'A2-U4',
        title: 'Kasb va ish',
        book: 'At-Takallum 1',
        lessons: [
          {
            id: 'A2-U4-L1',
            title: 'Kasblar va ikkilik son',
            type: 'standard',
            objectives: ['Kasb nomlari', 'Ikkilik son (muthanna)'],
            skills: ['vocab', 'recognition', 'listening', 'grammar', 'speaking', 'writing', 'quiz'],
            vocabIds: ['v160', 'v161', 'v162', 'v163', 'v164', 'v165'],
            grammarId: 'g-dual',
            readingId: null,
            xp: 18,
          },
        ],
      },
    ],
  },

  B1: {
    title: "O'rta daraja",
    units: [
      {
        id: 'B1-U1',
        title: 'Fikr bildirish',
        book: 'At-Takallum 2',
        lessons: [
          {
            id: 'B1-U1-L1',
            title: 'Fikrni ifodalash',
            type: 'standard',
            objectives: ['Fikr bildirish iboralari', 'Siniq ko\'plik'],
            skills: ['vocab', 'recognition', 'listening', 'grammar', 'reading', 'speaking', 'writing', 'quiz'],
            vocabIds: ['v200', 'v201', 'v202', 'v203', 'v204', 'v205', 'v206'],
            grammarId: 'g-broken-plural',
            readingId: 'p-opinion',
            xp: 22,
          },
        ],
      },
      {
        id: 'B1-U2',
        title: 'Yangiliklar va voqealar',
        book: 'At-Takallum 2',
        lessons: [
          {
            id: 'B1-U2-L1',
            title: "Yangiliklar va كَانَ",
            type: 'standard',
            objectives: ['Yangilik so\'zlari', 'كَانَ va singillari'],
            skills: ['vocab', 'recognition', 'listening', 'grammar', 'reading', 'speaking', 'writing', 'quiz'],
            vocabIds: ['v220', 'v221', 'v222', 'v223', 'v224', 'v225'],
            grammarId: 'g-kana',
            readingId: 'p-news',
            xp: 22,
          },
        ],
      },
    ],
  },

  B2: {
    title: "O'rta-yuqori daraja",
    units: [
      { id: 'B2-U1', title: 'Iqtisodiyot asoslari', book: 'At-Takallum 3', lessons: [] },
      { id: 'B2-U2', title: 'Ilm-fan va texnologiya', book: 'At-Takallum 3', lessons: [] },
      { id: 'B2-U3', title: "Adabiyot va she'riyat", book: 'At-Takallum 3', lessons: [] },
      { id: 'B2-U4', title: 'Murakkab grammatika', book: 'At-Takallum 3', lessons: [] },
      { id: 'B2-U5', title: 'Rasmiy muloqot', book: 'At-Takallum 3', lessons: [] },
    ],
  },
  C1: {
    title: "Ilg'or daraja",
    units: [
      { id: 'C1-U1', title: 'Akademik yozish', book: 'At-Takallum 4', lessons: [] },
      { id: 'C1-U2', title: 'Siyosiy nutq', book: 'At-Takallum 4', lessons: [] },
      { id: 'C1-U3', title: 'Islomiy matnlar', book: 'At-Takallum 4', lessons: [] },
      { id: 'C1-U4', title: 'Media va jurnalistika', book: 'At-Takallum 4', lessons: [] },
    ],
  },
  C2: {
    title: "Mukammal daraja",
    units: [
      { id: 'C2-U1', title: 'Klassik arab adabiyoti', book: 'At-Takallum 5', lessons: [] },
      { id: 'C2-U2', title: 'Ilmiy tadqiqot yozish', book: 'At-Takallum 5', lessons: [] },
      { id: 'C2-U3', title: 'Dialektlar va fusha', book: 'At-Takallum 5', lessons: [] },
      { id: 'C2-U4', title: 'Tarjima va interpretatsiya', book: 'At-Takallum 5', lessons: [] },
    ],
  },
}

export const LEVEL_ORDER = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

// Flatten all lessons in study order with level/unit context attached.
export function flattenLessons() {
  const out = []
  for (const level of LEVEL_ORDER) {
    const lv = CURRICULUM[level]
    if (!lv) continue
    for (const unit of lv.units) {
      for (const lesson of unit.lessons || []) {
        out.push({ ...lesson, level, unitId: unit.id, unitTitle: unit.title, book: unit.book })
      }
    }
  }
  return out
}

export function getLessonById(id) {
  return flattenLessons().find((l) => l.id === id) || null
}

// Stats for the landing page.
export function curriculumStats() {
  let lessons = 0
  let units = 0
  for (const level of LEVEL_ORDER) {
    for (const unit of CURRICULUM[level].units) {
      units += 1
      lessons += (unit.lessons || []).length
    }
  }
  return { levels: LEVEL_ORDER.length, units, lessons }
}
