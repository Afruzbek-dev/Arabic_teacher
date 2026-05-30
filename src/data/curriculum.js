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
  A1: { title: "Mutlaq Boshlang'ich", color: '#58CC02', desc: 'Alifbo, salomlashish, asosiy soʻzlar' },
  A2: { title: "Boshlang'ich", color: '#1CB0F6', desc: 'Uy, oziq-ovqat, vaqt, kasblar' },
  B1: { title: "O'rta daraja", color: '#CE82FF', desc: 'Fikr bildirish, yangiliklar, sayohat' },
  B2: { title: "O'rta-yuqori", color: '#FF9600', desc: 'Ilm-fan, adabiyot, rasmiy muloqot' },
  C1: { title: "Ilg'or daraja", color: '#FF4B4B', desc: 'Akademik yozish, media, islomiy matnlar' },
  C2: { title: "Mukammal daraja", color: '#FFC800', desc: 'Klassik adabiyot, tarjima, tadqiqot' },
}

export const CURRICULUM = {
  A1: {
    title: "Mutlaq Boshlang'ich",
    units: [
      {
        id: 'A1-U1',
        title: 'Alifbo va Harflar',
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
            title: 'Harflar: Daal – Siin',
            type: 'alphabet',
            objectives: ['7 ta harfni tanish', 'Harflarni ajrata olish'],
            skills: ['letters'],
            letters: ['د', 'ذ', 'ر', 'ز', 'س', 'ش'],
            xp: 10,
          },
        ],
      },
      {
        id: 'A1-U2',
        title: 'Salom va Tanishish',
        book: 'Al-Manhaj 1',
        lessons: [
          {
            id: 'A1-U2-L1',
            title: 'Salomlashish iboralari',
            type: 'standard',
            objectives: ['Salomlashishni o\'rganish', 'ال artikli'],
            skills: ['vocab', 'recognition', 'listening', 'grammar', 'reading', 'speaking', 'writing', 'quiz'],
            vocabIds: ['v001', 'v002', 'v005', 'v007', 'v008', 'v011'],
            grammarId: 'g-article',
            readingId: 'p-greet',
            xp: 15,
          },
        ],
      },
      {
        id: 'A1-U3',
        title: "Oila a'zolari",
        book: 'Al-Manhaj 1',
        lessons: [
          {
            id: 'A1-U3-L1',
            title: 'Oila va jins',
            type: 'standard',
            objectives: ['Oila a\'zolari', 'Muzakkar/muannas'],
            skills: ['vocab', 'recognition', 'listening', 'grammar', 'reading', 'speaking', 'quiz'],
            vocabIds: ['v020', 'v021', 'v022', 'v023', 'v026', 'v028'],
            grammarId: 'g-gender',
            readingId: 'p-family',
            xp: 15,
          },
        ],
      },
      {
        id: 'A1-U4',
        title: 'Sonlar 1-10',
        book: 'Al-Manhaj 1',
        lessons: [
          {
            id: 'A1-U4-L1',
            title: 'Sonlar 1 dan 10 gacha',
            type: 'standard',
            objectives: ['1-10 sonlarini o\'rganish'],
            skills: ['vocab', 'recognition', 'listening', 'speaking', 'quiz'],
            vocabIds: ['v040', 'v041', 'v042', 'v043', 'v044', 'v045', 'v046', 'v049'],
            grammarId: null,
            readingId: null,
            xp: 12,
          },
        ],
      },
      {
        id: 'A1-U5',
        title: 'Ranglar va Shakllar',
        book: 'Al-Manhaj 1',
        lessons: [
          {
            id: 'A1-U5-L1',
            title: 'Asosiy ranglar',
            type: 'standard',
            objectives: ['Ranglarni o\'rganish'],
            skills: ['vocab', 'recognition', 'listening', 'speaking', 'writing', 'quiz'],
            vocabIds: ['v060', 'v061', 'v062', 'v063', 'v064', 'v065'],
            grammarId: null,
            readingId: null,
            xp: 12,
          },
        ],
      },
      {
        id: 'A1-U6',
        title: 'Maktab va Buyumlar',
        book: 'Al-Manhaj 1',
        lessons: [
          {
            id: 'A1-U6-L1',
            title: 'Maktab buyumlari',
            type: 'standard',
            objectives: ['Sinf buyumlari nomlari'],
            skills: ['vocab', 'recognition', 'listening', 'speaking', 'writing', 'quiz'],
            vocabIds: ['v080', 'v081', 'v082', 'v083', 'v084', 'v087'],
            grammarId: null,
            readingId: null,
            xp: 12,
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
