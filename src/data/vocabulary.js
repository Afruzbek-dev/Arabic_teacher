// Arabic vocabulary database
// Each word: { id, ar (with harakat), uz, translit, emoji, level, tags: [] }
// `tags` group words into lesson vocab sets.

export const VOCAB = [
  // ───────────── A1 · Greetings & basics (tag: greetings) ─────────────
  { id: 'v001', ar: 'مَرْحَبًا', uz: 'Salom', translit: "marhaban", emoji: '👋', level: 'A1', tags: ['greetings'] },
  { id: 'v002', ar: 'أَهْلًا', uz: 'Xush kelibsiz', translit: 'ahlan', emoji: '🤝', level: 'A1', tags: ['greetings'] },
  { id: 'v003', ar: 'صَبَاحُ الْخَيْرِ', uz: 'Xayrli tong', translit: "sabahu-l-khayr", emoji: '🌅', level: 'A1', tags: ['greetings'] },
  { id: 'v004', ar: 'مَسَاءُ الْخَيْرِ', uz: 'Xayrli kech', translit: "masau-l-khayr", emoji: '🌇', level: 'A1', tags: ['greetings'] },
  { id: 'v005', ar: 'شُكْرًا', uz: 'Rahmat', translit: 'shukran', emoji: '🙏', level: 'A1', tags: ['greetings'] },
  { id: 'v006', ar: 'عَفْوًا', uz: 'Arzimaydi', translit: 'afwan', emoji: '😊', level: 'A1', tags: ['greetings'] },
  { id: 'v007', ar: 'نَعَمْ', uz: 'Ha', translit: "na'am", emoji: '✅', level: 'A1', tags: ['greetings'] },
  { id: 'v008', ar: 'لَا', uz: "Yo'q", translit: 'la', emoji: '❌', level: 'A1', tags: ['greetings'] },
  { id: 'v009', ar: 'مَعَ السَّلَامَةِ', uz: 'Xayr (xayrlashish)', translit: "ma'a-s-salama", emoji: '👋', level: 'A1', tags: ['greetings'] },
  { id: 'v010', ar: 'مِنْ فَضْلِكَ', uz: 'Iltimos', translit: 'min fadlik', emoji: '🤲', level: 'A1', tags: ['greetings'] },
  { id: 'v011', ar: 'كَيْفَ حَالُكَ', uz: 'Qalaysiz?', translit: 'kayfa haluk', emoji: '❓', level: 'A1', tags: ['greetings'] },
  { id: 'v012', ar: 'بِخَيْرٍ', uz: 'Yaxshi', translit: 'bi-khayr', emoji: '👍', level: 'A1', tags: ['greetings'] },

  // ───────────── A1 · Family (tag: family) ─────────────
  { id: 'v020', ar: 'أَبٌ', uz: 'Ota', translit: 'ab', emoji: '👨', level: 'A1', tags: ['family'] },
  { id: 'v021', ar: 'أُمٌّ', uz: 'Ona', translit: 'umm', emoji: '👩', level: 'A1', tags: ['family'] },
  { id: 'v022', ar: 'أَخٌ', uz: 'Aka / uka', translit: 'akh', emoji: '👦', level: 'A1', tags: ['family'] },
  { id: 'v023', ar: 'أُخْتٌ', uz: 'Opa / singil', translit: 'ukht', emoji: '👧', level: 'A1', tags: ['family'] },
  { id: 'v024', ar: 'اِبْنٌ', uz: "O'g'il", translit: 'ibn', emoji: '🧒', level: 'A1', tags: ['family'] },
  { id: 'v025', ar: 'بِنْتٌ', uz: 'Qiz', translit: 'bint', emoji: '👧', level: 'A1', tags: ['family'] },
  { id: 'v026', ar: 'جَدٌّ', uz: 'Bobo', translit: 'jadd', emoji: '👴', level: 'A1', tags: ['family'] },
  { id: 'v027', ar: 'جَدَّةٌ', uz: 'Buvi', translit: 'jadda', emoji: '👵', level: 'A1', tags: ['family'] },
  { id: 'v028', ar: 'عَائِلَةٌ', uz: 'Oila', translit: "'a'ila", emoji: '👨‍👩‍👧‍👦', level: 'A1', tags: ['family'] },
  { id: 'v029', ar: 'زَوْجٌ', uz: 'Er', translit: 'zawj', emoji: '🤵', level: 'A1', tags: ['family'] },
  { id: 'v030', ar: 'زَوْجَةٌ', uz: 'Xotin', translit: 'zawja', emoji: '👰', level: 'A1', tags: ['family'] },

  // ───────────── A1 · Numbers 1-10 (tag: numbers) ─────────────
  { id: 'v040', ar: 'وَاحِدٌ', uz: 'Bir (1)', translit: 'wahid', emoji: '1️⃣', level: 'A1', tags: ['numbers'] },
  { id: 'v041', ar: 'اِثْنَانِ', uz: 'Ikki (2)', translit: 'ithnan', emoji: '2️⃣', level: 'A1', tags: ['numbers'] },
  { id: 'v042', ar: 'ثَلَاثَةٌ', uz: 'Uch (3)', translit: 'thalatha', emoji: '3️⃣', level: 'A1', tags: ['numbers'] },
  { id: 'v043', ar: 'أَرْبَعَةٌ', uz: "To'rt (4)", translit: "arba'a", emoji: '4️⃣', level: 'A1', tags: ['numbers'] },
  { id: 'v044', ar: 'خَمْسَةٌ', uz: 'Besh (5)', translit: 'khamsa', emoji: '5️⃣', level: 'A1', tags: ['numbers'] },
  { id: 'v045', ar: 'سِتَّةٌ', uz: 'Olti (6)', translit: 'sitta', emoji: '6️⃣', level: 'A1', tags: ['numbers'] },
  { id: 'v046', ar: 'سَبْعَةٌ', uz: 'Yetti (7)', translit: "sab'a", emoji: '7️⃣', level: 'A1', tags: ['numbers'] },
  { id: 'v047', ar: 'ثَمَانِيَةٌ', uz: 'Sakkiz (8)', translit: 'thamaniya', emoji: '8️⃣', level: 'A1', tags: ['numbers'] },
  { id: 'v048', ar: 'تِسْعَةٌ', uz: "To'qqiz (9)", translit: "tis'a", emoji: '9️⃣', level: 'A1', tags: ['numbers'] },
  { id: 'v049', ar: 'عَشَرَةٌ', uz: "O'n (10)", translit: "'ashara", emoji: '🔟', level: 'A1', tags: ['numbers'] },

  // ───────────── A1 · Colors (tag: colors) ─────────────
  { id: 'v060', ar: 'أَحْمَرُ', uz: 'Qizil', translit: 'ahmar', emoji: '🔴', level: 'A1', tags: ['colors'] },
  { id: 'v061', ar: 'أَزْرَقُ', uz: "Ko'k", translit: 'azraq', emoji: '🔵', level: 'A1', tags: ['colors'] },
  { id: 'v062', ar: 'أَخْضَرُ', uz: 'Yashil', translit: 'akhdar', emoji: '🟢', level: 'A1', tags: ['colors'] },
  { id: 'v063', ar: 'أَصْفَرُ', uz: 'Sariq', translit: 'asfar', emoji: '🟡', level: 'A1', tags: ['colors'] },
  { id: 'v064', ar: 'أَبْيَضُ', uz: 'Oq', translit: 'abyad', emoji: '⚪', level: 'A1', tags: ['colors'] },
  { id: 'v065', ar: 'أَسْوَدُ', uz: 'Qora', translit: 'aswad', emoji: '⚫', level: 'A1', tags: ['colors'] },
  { id: 'v066', ar: 'بُرْتُقَالِيٌّ', uz: "To'q sariq", translit: 'burtuqali', emoji: '🟠', level: 'A1', tags: ['colors'] },
  { id: 'v067', ar: 'بَنَفْسَجِيٌّ', uz: 'Binafsha', translit: 'banafsaji', emoji: '🟣', level: 'A1', tags: ['colors'] },

  // ───────────── A1 · School & objects (tag: school) ─────────────
  { id: 'v080', ar: 'كِتَابٌ', uz: 'Kitob', translit: 'kitab', emoji: '📕', level: 'A1', tags: ['school'] },
  { id: 'v081', ar: 'قَلَمٌ', uz: 'Qalam', translit: 'qalam', emoji: '✏️', level: 'A1', tags: ['school'] },
  { id: 'v082', ar: 'مَدْرَسَةٌ', uz: 'Maktab', translit: 'madrasa', emoji: '🏫', level: 'A1', tags: ['school'] },
  { id: 'v083', ar: 'مُعَلِّمٌ', uz: "O'qituvchi", translit: "mu'allim", emoji: '👨‍🏫', level: 'A1', tags: ['school'] },
  { id: 'v084', ar: 'طَالِبٌ', uz: 'Talaba', translit: 'talib', emoji: '🧑‍🎓', level: 'A1', tags: ['school'] },
  { id: 'v085', ar: 'كُرْسِيٌّ', uz: 'Stul', translit: 'kursi', emoji: '🪑', level: 'A1', tags: ['school'] },
  { id: 'v086', ar: 'مَكْتَبٌ', uz: 'Yozuv stoli', translit: 'maktab', emoji: '🪑', level: 'A1', tags: ['school'] },
  { id: 'v087', ar: 'بَابٌ', uz: 'Eshik', translit: 'bab', emoji: '🚪', level: 'A1', tags: ['school'] },
  { id: 'v088', ar: 'نَافِذَةٌ', uz: 'Deraza', translit: 'nafidha', emoji: '🪟', level: 'A1', tags: ['school'] },

  // ───────────── A2 · Home (tag: home) ─────────────
  { id: 'v100', ar: 'بَيْتٌ', uz: 'Uy', translit: 'bayt', emoji: '🏠', level: 'A2', tags: ['home'] },
  { id: 'v101', ar: 'غُرْفَةٌ', uz: 'Xona', translit: 'ghurfa', emoji: '🛋️', level: 'A2', tags: ['home'] },
  { id: 'v102', ar: 'مَطْبَخٌ', uz: 'Oshxona', translit: 'matbakh', emoji: '🍳', level: 'A2', tags: ['home'] },
  { id: 'v103', ar: 'حَمَّامٌ', uz: 'Hammom', translit: 'hammam', emoji: '🛁', level: 'A2', tags: ['home'] },
  { id: 'v104', ar: 'سَرِيرٌ', uz: 'Karavot', translit: 'sarir', emoji: '🛏️', level: 'A2', tags: ['home'] },
  { id: 'v105', ar: 'مِفْتَاحٌ', uz: 'Kalit', translit: 'miftah', emoji: '🔑', level: 'A2', tags: ['home'] },
  { id: 'v106', ar: 'طَاوِلَةٌ', uz: 'Stol', translit: 'tawila', emoji: '🪑', level: 'A2', tags: ['home'] },

  // ───────────── A2 · Food & market (tag: food) ─────────────
  { id: 'v120', ar: 'سُوقٌ', uz: 'Bozor', translit: 'suq', emoji: '🏬', level: 'A2', tags: ['food'] },
  { id: 'v121', ar: 'مَطْعَمٌ', uz: 'Restoran', translit: "mat'am", emoji: '🍽️', level: 'A2', tags: ['food'] },
  { id: 'v122', ar: 'خُبْزٌ', uz: 'Non', translit: 'khubz', emoji: '🍞', level: 'A2', tags: ['food'] },
  { id: 'v123', ar: 'مَاءٌ', uz: 'Suv', translit: "ma'", emoji: '💧', level: 'A2', tags: ['food'] },
  { id: 'v124', ar: 'تُفَّاحٌ', uz: 'Olma', translit: 'tuffah', emoji: '🍎', level: 'A2', tags: ['food'] },
  { id: 'v125', ar: 'مَوْزٌ', uz: 'Banan', translit: 'mawz', emoji: '🍌', level: 'A2', tags: ['food'] },
  { id: 'v126', ar: 'لَحْمٌ', uz: "Go'sht", translit: 'lahm', emoji: '🥩', level: 'A2', tags: ['food'] },
  { id: 'v127', ar: 'أَرُزٌّ', uz: 'Guruch', translit: 'aruzz', emoji: '🍚', level: 'A2', tags: ['food'] },
  { id: 'v128', ar: 'حَلِيبٌ', uz: 'Sut', translit: 'halib', emoji: '🥛', level: 'A2', tags: ['food'] },
  { id: 'v129', ar: 'شَايٌ', uz: 'Choy', translit: 'shay', emoji: '🍵', level: 'A2', tags: ['food'] },
  { id: 'v130', ar: 'قَهْوَةٌ', uz: 'Qahva', translit: 'qahwa', emoji: '☕', level: 'A2', tags: ['food'] },

  // ───────────── A2 · Time (tag: time) ─────────────
  { id: 'v140', ar: 'يَوْمٌ', uz: 'Kun', translit: 'yawm', emoji: '📅', level: 'A2', tags: ['time'] },
  { id: 'v141', ar: 'أُسْبُوعٌ', uz: 'Hafta', translit: "usbu'", emoji: '🗓️', level: 'A2', tags: ['time'] },
  { id: 'v142', ar: 'شَهْرٌ', uz: 'Oy', translit: 'shahr', emoji: '🌙', level: 'A2', tags: ['time'] },
  { id: 'v143', ar: 'سَنَةٌ', uz: 'Yil', translit: 'sana', emoji: '📆', level: 'A2', tags: ['time'] },
  { id: 'v144', ar: 'سَاعَةٌ', uz: 'Soat', translit: "sa'a", emoji: '🕐', level: 'A2', tags: ['time'] },
  { id: 'v145', ar: 'صَبَاحٌ', uz: 'Tong', translit: 'sabah', emoji: '🌄', level: 'A2', tags: ['time'] },
  { id: 'v146', ar: 'مَسَاءٌ', uz: 'Kech', translit: "masa'", emoji: '🌆', level: 'A2', tags: ['time'] },
  { id: 'v147', ar: 'لَيْلٌ', uz: 'Tun', translit: 'layl', emoji: '🌃', level: 'A2', tags: ['time'] },

  // ───────────── A2 · Work & professions (tag: work) ─────────────
  { id: 'v160', ar: 'عَمَلٌ', uz: 'Ish', translit: "'amal", emoji: '💼', level: 'A2', tags: ['work'] },
  { id: 'v161', ar: 'طَبِيبٌ', uz: 'Shifokor', translit: 'tabib', emoji: '👨‍⚕️', level: 'A2', tags: ['work'] },
  { id: 'v162', ar: 'مُهَنْدِسٌ', uz: 'Muhandis', translit: 'muhandis', emoji: '👷', level: 'A2', tags: ['work'] },
  { id: 'v163', ar: 'سَائِقٌ', uz: 'Haydovchi', translit: "sa'iq", emoji: '🚗', level: 'A2', tags: ['work'] },
  { id: 'v164', ar: 'تَاجِرٌ', uz: 'Savdogar', translit: 'tajir', emoji: '🧑‍💼', level: 'A2', tags: ['work'] },
  { id: 'v165', ar: 'شُرْطِيٌّ', uz: 'Politsiyachi', translit: 'shurti', emoji: '👮', level: 'A2', tags: ['work'] },

  // ───────────── B1 · Opinion & society (tag: opinion) ─────────────
  { id: 'v200', ar: 'رَأْيٌ', uz: 'Fikr', translit: "ra'y", emoji: '💭', level: 'B1', tags: ['opinion'] },
  { id: 'v201', ar: 'فِكْرَةٌ', uz: "G'oya", translit: 'fikra', emoji: '💡', level: 'B1', tags: ['opinion'] },
  { id: 'v202', ar: 'مُجْتَمَعٌ', uz: 'Jamiyat', translit: "mujtama'", emoji: '🏙️', level: 'B1', tags: ['opinion'] },
  { id: 'v203', ar: 'ثَقَافَةٌ', uz: 'Madaniyat', translit: 'thaqafa', emoji: '🎭', level: 'B1', tags: ['opinion'] },
  { id: 'v204', ar: 'مُشْكِلَةٌ', uz: 'Muammo', translit: 'mushkila', emoji: '⚠️', level: 'B1', tags: ['opinion'] },
  { id: 'v205', ar: 'حَلٌّ', uz: 'Yechim', translit: 'hall', emoji: '🧩', level: 'B1', tags: ['opinion'] },
  { id: 'v206', ar: 'أَعْتَقِدُ', uz: 'Menimcha / o\'ylaymanki', translit: "a'taqidu", emoji: '🤔', level: 'B1', tags: ['opinion'] },

  // ───────────── B1 · News & travel (tag: news) ─────────────
  { id: 'v220', ar: 'خَبَرٌ', uz: 'Yangilik', translit: 'khabar', emoji: '📰', level: 'B1', tags: ['news'] },
  { id: 'v221', ar: 'حُكُومَةٌ', uz: 'Hukumat', translit: 'hukuma', emoji: '🏛️', level: 'B1', tags: ['news'] },
  { id: 'v222', ar: 'صِحَّةٌ', uz: "Sog'liq", translit: 'sihha', emoji: '❤️‍🩹', level: 'B1', tags: ['news'] },
  { id: 'v223', ar: 'سَفَرٌ', uz: 'Sayohat', translit: 'safar', emoji: '✈️', level: 'B1', tags: ['news'] },
  { id: 'v224', ar: 'طَائِرَةٌ', uz: 'Samolyot', translit: "ta'ira", emoji: '🛫', level: 'B1', tags: ['news'] },
  { id: 'v225', ar: 'مَدِينَةٌ', uz: 'Shahar', translit: 'madina', emoji: '🌃', level: 'B1', tags: ['news'] },

  // ───────────── Verbs (used across grammar lessons) ─────────────
  { id: 'v300', ar: 'ذَهَبَ', uz: 'bordi', translit: 'dhahaba', emoji: '🚶', level: 'A2', tags: ['verbs'] },
  { id: 'v301', ar: 'كَتَبَ', uz: 'yozdi', translit: 'kataba', emoji: '✍️', level: 'A2', tags: ['verbs'] },
  { id: 'v302', ar: 'قَرَأَ', uz: "o'qidi", translit: "qara'a", emoji: '📖', level: 'A2', tags: ['verbs'] },
  { id: 'v303', ar: 'أَكَلَ', uz: 'yedi', translit: 'akala', emoji: '🍽️', level: 'A2', tags: ['verbs'] },
  { id: 'v304', ar: 'شَرِبَ', uz: 'ichdi', translit: 'shariba', emoji: '🥤', level: 'A2', tags: ['verbs'] },
  { id: 'v305', ar: 'دَرَسَ', uz: "o'rgandi", translit: 'darasa', emoji: '📚', level: 'A2', tags: ['verbs'] },

  // ═══════════ B2 · Iqtisodiyot, ilm-fan, adabiyot, rasmiy muloqot ═══════════
  { id: 'v400', ar: 'اِقْتِصَاد', uz: 'Iqtisodiyot', translit: 'iqtisad', emoji: '📊', level: 'B2', tags: ['economics'] },
  { id: 'v401', ar: 'تِجَارَة', uz: 'Savdo', translit: 'tijara', emoji: '🏪', level: 'B2', tags: ['economics'] },
  { id: 'v402', ar: 'اِسْتِثْمَار', uz: 'Investitsiya', translit: 'istithmar', emoji: '💹', level: 'B2', tags: ['economics'] },
  { id: 'v403', ar: 'مَشْرُوع', uz: 'Loyiha', translit: "mashru'", emoji: '📋', level: 'B2', tags: ['economics'] },
  { id: 'v404', ar: 'مِيزَانِيَّة', uz: 'Byudjet', translit: 'mizaniyya', emoji: '💰', level: 'B2', tags: ['economics'] },
  { id: 'v405', ar: 'صَادِرَات', uz: 'Eksport', translit: 'sadirat', emoji: '📦', level: 'B2', tags: ['economics'] },
  { id: 'v406', ar: 'وَارِدَات', uz: 'Import', translit: 'waridat', emoji: '🚢', level: 'B2', tags: ['economics'] },

  { id: 'v410', ar: 'تَقْنِيَّة', uz: 'Texnologiya', translit: 'taqniyya', emoji: '💻', level: 'B2', tags: ['science'] },
  { id: 'v411', ar: 'اِخْتِرَاع', uz: "Ixtiro", translit: "ikhtira'", emoji: '🔬', level: 'B2', tags: ['science'] },
  { id: 'v412', ar: 'ذَكَاء اِصْطِنَاعِيّ', uz: "Sun'iy intellekt", translit: "dhaka' istina'i", emoji: '🤖', level: 'B2', tags: ['science'] },
  { id: 'v413', ar: 'بَحْث', uz: 'Tadqiqot', translit: 'bahth', emoji: '🔍', level: 'B2', tags: ['science'] },
  { id: 'v414', ar: 'تَجْرِبَة', uz: 'Tajriba', translit: 'tajriba', emoji: '🧪', level: 'B2', tags: ['science'] },
  { id: 'v415', ar: 'نَتِيجَة', uz: 'Natija', translit: 'natija', emoji: '📈', level: 'B2', tags: ['science'] },

  { id: 'v420', ar: 'أَدَب', uz: 'Adabiyot', translit: 'adab', emoji: '📜', level: 'B2', tags: ['literature'] },
  { id: 'v421', ar: 'شِعْر', uz: "She'riyat", translit: "shi'r", emoji: '✒️', level: 'B2', tags: ['literature'] },
  { id: 'v422', ar: 'رِوَايَة', uz: 'Roman', translit: 'riwaya', emoji: '📖', level: 'B2', tags: ['literature'] },
  { id: 'v423', ar: 'قِصَّة', uz: 'Hikoya', translit: 'qissa', emoji: '📕', level: 'B2', tags: ['literature'] },
  { id: 'v424', ar: 'مُؤَلِّف', uz: 'Muallif', translit: "mu'allif", emoji: '🖊️', level: 'B2', tags: ['literature'] },
  { id: 'v425', ar: 'نَقْد', uz: 'Tanqid', translit: 'naqd', emoji: '📝', level: 'B2', tags: ['literature'] },

  { id: 'v430', ar: 'خِطَاب', uz: 'Nutq / xitob', translit: 'khitab', emoji: '🎤', level: 'B2', tags: ['formal'] },
  { id: 'v431', ar: 'مُؤْتَمَر', uz: 'Konferensiya', translit: "mu'tamar", emoji: '🏛️', level: 'B2', tags: ['formal'] },
  { id: 'v432', ar: 'اِتِّفَاقِيَّة', uz: 'Shartnoma', translit: 'ittifaqiyya', emoji: '📄', level: 'B2', tags: ['formal'] },
  { id: 'v433', ar: 'دِبْلُومَاسِيَّة', uz: 'Diplomatiya', translit: 'diblumasiyya', emoji: '🤝', level: 'B2', tags: ['formal'] },
  { id: 'v434', ar: 'تَفَاوُض', uz: 'Muzokaralar', translit: 'tafawud', emoji: '⚖️', level: 'B2', tags: ['formal'] },

  // ═══════════ C1 · Akademik yozish, siyosat, media, islom ═══════════
  { id: 'v500', ar: 'أُطْرُوحَة', uz: 'Dissertatsiya', translit: 'utruha', emoji: '🎓', level: 'C1', tags: ['academic'] },
  { id: 'v501', ar: 'مَنْهَجِيَّة', uz: 'Metodologiya', translit: 'manhajiyya', emoji: '📐', level: 'C1', tags: ['academic'] },
  { id: 'v502', ar: 'اِسْتِنْتَاج', uz: 'Xulosa', translit: 'istintaj', emoji: '🎯', level: 'C1', tags: ['academic'] },
  { id: 'v503', ar: 'مَرْجِع', uz: 'Manba', translit: "marji'", emoji: '📚', level: 'C1', tags: ['academic'] },
  { id: 'v504', ar: 'تَحْلِيل', uz: 'Tahlil', translit: 'tahlil', emoji: '🔎', level: 'C1', tags: ['academic'] },
  { id: 'v505', ar: 'فَرَضِيَّة', uz: 'Gipoteza', translit: 'faradiyya', emoji: '💡', level: 'C1', tags: ['academic'] },

  { id: 'v510', ar: 'سِيَاسَة', uz: 'Siyosat', translit: 'siyasa', emoji: '🏛️', level: 'C1', tags: ['politics'] },
  { id: 'v511', ar: 'دِيمُقْرَاطِيَّة', uz: 'Demokratiya', translit: 'dimuqratiyya', emoji: '🗳️', level: 'C1', tags: ['politics'] },
  { id: 'v512', ar: 'اِنْتِخَابَات', uz: 'Saylovlar', translit: 'intikhabat', emoji: '🗳️', level: 'C1', tags: ['politics'] },
  { id: 'v513', ar: 'بَرْلَمَان', uz: 'Parlament', translit: 'barlaman', emoji: '🏛️', level: 'C1', tags: ['politics'] },
  { id: 'v514', ar: 'دُسْتُور', uz: 'Konstitutsiya', translit: 'dustur', emoji: '📜', level: 'C1', tags: ['politics'] },
  { id: 'v515', ar: 'حُقُوق الإِنْسَان', uz: 'Inson huquqlari', translit: 'huquq al-insan', emoji: '⚖️', level: 'C1', tags: ['politics'] },

  { id: 'v520', ar: 'صَحَافَة', uz: 'Jurnalistika', translit: 'sahafa', emoji: '📰', level: 'C1', tags: ['media'] },
  { id: 'v521', ar: 'بَثّ مُبَاشِر', uz: 'Jonli efir', translit: 'bathth mubashir', emoji: '📡', level: 'C1', tags: ['media'] },
  { id: 'v522', ar: 'تَحْقِيق', uz: 'Jurnalistik tekshiruv', translit: 'tahqiq', emoji: '🕵️', level: 'C1', tags: ['media'] },
  { id: 'v523', ar: 'مَصَادِر مَوْثُوقَة', uz: 'Ishonchli manbalar', translit: 'masadir mawthuqa', emoji: '✅', level: 'C1', tags: ['media'] },

  { id: 'v530', ar: 'تَفْسِير', uz: 'Tafsir', translit: 'tafsir', emoji: '📖', level: 'C1', tags: ['islamic'] },
  { id: 'v531', ar: 'حَدِيث', uz: 'Hadis', translit: 'hadith', emoji: '📿', level: 'C1', tags: ['islamic'] },
  { id: 'v532', ar: 'فِقْه', uz: 'Fiqh (islom huquqi)', translit: 'fiqh', emoji: '⚖️', level: 'C1', tags: ['islamic'] },
  { id: 'v533', ar: 'عَقِيدَة', uz: 'Aqida', translit: "'aqida", emoji: '🕌', level: 'C1', tags: ['islamic'] },
  { id: 'v534', ar: 'إِجْمَاع', uz: 'Ijmo (konsensus)', translit: "ijma'", emoji: '🤝', level: 'C1', tags: ['islamic'] },

  // ═══════════ C2 · Klassik adabiyot, ilmiy tadqiqot, dialektlar, tarjima ═══════════
  { id: 'v600', ar: 'بَلَاغَة', uz: 'Balog\'a (ritorika)', translit: 'balagha', emoji: '🏆', level: 'C2', tags: ['classical'] },
  { id: 'v601', ar: 'نَحْو', uz: 'Nahv (sintaksis)', translit: 'nahw', emoji: '📐', level: 'C2', tags: ['classical'] },
  { id: 'v602', ar: 'صَرْف', uz: 'Sarf (morfologiya)', translit: 'sarf', emoji: '🔬', level: 'C2', tags: ['classical'] },
  { id: 'v603', ar: 'إِعْرَاب', uz: "I'rob (gap bo'laklash)", translit: "i'rab", emoji: '📝', level: 'C2', tags: ['classical'] },
  { id: 'v604', ar: 'مَجَاز', uz: 'Majoz (metafora)', translit: 'majaz', emoji: '🎭', level: 'C2', tags: ['classical'] },
  { id: 'v605', ar: 'اِسْتِعَارَة', uz: "Isti'ora (ko'chma)", translit: "isti'ara", emoji: '🌊', level: 'C2', tags: ['classical'] },
  { id: 'v606', ar: 'قَصِيدَة', uz: 'Qasida (she\'r turi)', translit: 'qasida', emoji: '📜', level: 'C2', tags: ['classical'] },

  { id: 'v610', ar: 'مَقَال عِلْمِيّ', uz: 'Ilmiy maqola', translit: "maqal 'ilmi", emoji: '📄', level: 'C2', tags: ['research'] },
  { id: 'v611', ar: 'مُلَخَّص', uz: 'Annotatsiya', translit: 'mulakhkhas', emoji: '📋', level: 'C2', tags: ['research'] },
  { id: 'v612', ar: 'اِقْتِبَاس', uz: 'Sitata (iqtibos)', translit: 'iqtibas', emoji: '💬', level: 'C2', tags: ['research'] },
  { id: 'v613', ar: 'حَاشِيَة', uz: 'Izoh (footnote)', translit: 'hashiya', emoji: '🔖', level: 'C2', tags: ['research'] },
  { id: 'v614', ar: 'مُرَاجَعَة', uz: "Ekspert tekshiruvi", translit: "muraja'a", emoji: '🔍', level: 'C2', tags: ['research'] },

  { id: 'v620', ar: 'لَهْجَة', uz: 'Lahja (dialekt)', translit: 'lahja', emoji: '🗣️', level: 'C2', tags: ['dialects'] },
  { id: 'v621', ar: 'فُصْحَى', uz: 'Fusha (adabiy til)', translit: 'fusha', emoji: '📖', level: 'C2', tags: ['dialects'] },
  { id: 'v622', ar: 'عَامِّيَّة', uz: 'Ammiya (so\'zlashuv tili)', translit: "'ammiyya", emoji: '💬', level: 'C2', tags: ['dialects'] },
  { id: 'v623', ar: 'مَصْرِيَّة', uz: 'Misr dialekti', translit: 'masriyya', emoji: '🇪🇬', level: 'C2', tags: ['dialects'] },
  { id: 'v624', ar: 'شَامِيَّة', uz: 'Shom dialekti', translit: 'shamiyya', emoji: '🇸🇾', level: 'C2', tags: ['dialects'] },

  { id: 'v630', ar: 'تَرْجَمَة', uz: 'Tarjima', translit: 'tarjama', emoji: '🌐', level: 'C2', tags: ['translation'] },
  { id: 'v631', ar: 'تَرْجَمَة فَوْرِيَّة', uz: "Sinxron tarjima", translit: 'tarjama fawriyya', emoji: '🎧', level: 'C2', tags: ['translation'] },
  { id: 'v632', ar: 'سِيَاق', uz: 'Kontekst', translit: 'siyaq', emoji: '🔗', level: 'C2', tags: ['translation'] },
  { id: 'v633', ar: 'مُصْطَلَح', uz: 'Termin', translit: 'mustalah', emoji: '📘', level: 'C2', tags: ['translation'] },
]

// ── Helpers ──────────────────────────────────────────────
const VOCAB_INDEX = Object.fromEntries(VOCAB.map((w) => [w.id, w]))

export function getWord(id) {
  return VOCAB_INDEX[id]
}

export function getWords(ids = []) {
  return ids.map((id) => VOCAB_INDEX[id]).filter(Boolean)
}

export function wordsByTag(tag) {
  return VOCAB.filter((w) => w.tags.includes(tag))
}

export function wordsByLevel(level) {
  return VOCAB.filter((w) => w.level === level)
}

// Return `n` random distractor Uzbek meanings that are not `correctId`.
export function distractors(correctId, n = 3, pool = VOCAB) {
  const others = pool.filter((w) => w.id !== correctId)
  const shuffled = [...others].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, n)
}

export const VOCAB_COUNT = VOCAB.length
