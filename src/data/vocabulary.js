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

  // ═══════════ A1 18-UNIT ROADMAP (Al-Manhaj A1) ═══════════

  // U1 · Tanishuv va olmoshlar (tag: intro)
  { id: 'v700', ar: 'اِسْم', uz: 'Ism', translit: 'ism', emoji: '🏷️', level: 'A1', tags: ['intro'] },
  { id: 'v701', ar: 'صَدِيق', uz: "Do'st", translit: 'sadiq', emoji: '🤝', level: 'A1', tags: ['intro'] },
  { id: 'v702', ar: 'بَلَد', uz: 'Yurt / davlat', translit: 'balad', emoji: '🌍', level: 'A1', tags: ['intro'] },
  { id: 'v703', ar: 'جِنْسِيَّة', uz: 'Fuqarolik', translit: 'jinsiyya', emoji: '🪪', level: 'A1', tags: ['intro'] },
  { id: 'v704', ar: 'لُغَة', uz: 'Til', translit: 'lugha', emoji: '🗣️', level: 'A1', tags: ['intro'] },
  { id: 'v705', ar: 'طَالِبَة', uz: 'Talaba (qiz)', translit: 'taliba', emoji: '👩‍🎓', level: 'A1', tags: ['intro'] },
  { id: 'v706', ar: 'مُدِير', uz: 'Rahbar', translit: 'mudir', emoji: '🧑‍💼', level: 'A1', tags: ['intro'] },
  { id: 'v707', ar: 'أَنَا', uz: 'Men', translit: 'ana', emoji: '🙋', level: 'A1', tags: ['intro'] },
  { id: 'v708', ar: 'أَنْتَ', uz: 'Sen (erkak)', translit: 'anta', emoji: '👉', level: 'A1', tags: ['intro'] },
  { id: 'v709', ar: 'أَنْتِ', uz: 'Sen (ayol)', translit: 'anti', emoji: '👈', level: 'A1', tags: ['intro'] },
  { id: 'v710', ar: 'هُوَ', uz: 'U (erkak)', translit: 'huwa', emoji: '👨', level: 'A1', tags: ['intro'] },
  { id: 'v711', ar: 'هِيَ', uz: 'U (ayol)', translit: 'hiya', emoji: '👩', level: 'A1', tags: ['intro'] },
  { id: 'v712', ar: 'نَحْنُ', uz: 'Biz', translit: 'nahnu', emoji: '👥', level: 'A1', tags: ['intro'] },

  // U2 · Oila (tag: family, qo'shimcha)
  { id: 'v720', ar: 'عَمّ', uz: 'Amaki', translit: "'amm", emoji: '👨', level: 'A1', tags: ['family'] },
  { id: 'v721', ar: 'خَال', uz: "Tog'a", translit: 'khal', emoji: '🧔', level: 'A1', tags: ['family'] },
  { id: 'v722', ar: 'عَمَّة', uz: 'Amma', translit: "'amma", emoji: '👩', level: 'A1', tags: ['family'] },
  { id: 'v723', ar: 'طِفْل', uz: 'Bola', translit: 'tifl', emoji: '👶', level: 'A1', tags: ['family'] },
  { id: 'v724', ar: 'صَغِير', uz: 'Kichik', translit: 'saghir', emoji: '🐣', level: 'A1', tags: ['family'] },
  { id: 'v725', ar: 'كَبِير', uz: 'Katta', translit: 'kabir', emoji: '🐘', level: 'A1', tags: ['family'] },

  // U3 · Uy (tag: home, qo'shimcha)
  { id: 'v730', ar: 'شَقَّة', uz: 'Kvartira', translit: 'shaqqa', emoji: '🏢', level: 'A1', tags: ['home'] },
  { id: 'v733', ar: 'جِدَار', uz: 'Devor', translit: 'jidar', emoji: '🧱', level: 'A1', tags: ['home'] },
  { id: 'v735', ar: 'حَدِيقَة', uz: "Bog'", translit: 'hadiqa', emoji: '🌳', level: 'A1', tags: ['home'] },

  // U4 · Universitet va sinf (tag: school, qo'shimcha)
  { id: 'v740', ar: 'فَصْل', uz: 'Sinf', translit: 'fasl', emoji: '🏫', level: 'A1', tags: ['school'] },
  { id: 'v741', ar: 'دَفْتَر', uz: 'Daftar', translit: 'daftar', emoji: '📓', level: 'A1', tags: ['school'] },
  { id: 'v743', ar: 'جَامِعَة', uz: 'Universitet', translit: "jami'a", emoji: '🎓', level: 'A1', tags: ['school'] },
  { id: 'v744', ar: 'دَرْس', uz: 'Dars', translit: 'dars', emoji: '📖', level: 'A1', tags: ['school'] },
  { id: 'v745', ar: 'اِمْتِحَان', uz: 'Imtihon', translit: 'imtihan', emoji: '📝', level: 'A1', tags: ['school'] },
  { id: 'v747', ar: 'رِيَاضِيَّات', uz: 'Matematika', translit: 'riyadiyyat', emoji: '➗', level: 'A1', tags: ['school'] },
  { id: 'v748', ar: 'تَارِيخ', uz: 'Tarix', translit: 'tarikh', emoji: '📜', level: 'A1', tags: ['school'] },

  // U5 · Kundalik buyumlar (tag: objects)
  { id: 'v752', ar: 'نَظَّارَة', uz: "Ko'zoynak", translit: 'nazzara', emoji: '👓', level: 'A1', tags: ['objects'] },
  { id: 'v753', ar: 'حَقِيبَة', uz: 'Sumka', translit: 'haqiba', emoji: '🎒', level: 'A1', tags: ['objects'] },
  { id: 'v754', ar: 'هَاتِف', uz: 'Telefon', translit: 'hatif', emoji: '📱', level: 'A1', tags: ['objects'] },
  { id: 'v755', ar: 'مِظَلَّة', uz: 'Soyabon', translit: 'mizalla', emoji: '☂️', level: 'A1', tags: ['objects'] },
  { id: 'v757', ar: 'مَحْفَظَة', uz: 'Hamyon', translit: 'mahfaza', emoji: '👛', level: 'A1', tags: ['objects'] },
  { id: 'v758', ar: 'جَدِيد', uz: 'Yangi', translit: 'jadid', emoji: '✨', level: 'A1', tags: ['objects'] },
  { id: 'v759', ar: 'قَدِيم', uz: 'Eski', translit: 'qadim', emoji: '📦', level: 'A1', tags: ['objects'] },

  // U6 · Ovqat (tag: food, qo'shimcha)
  { id: 'v760', ar: 'دَجَاج', uz: "Tovuq go'shti", translit: 'dajaj', emoji: '🍗', level: 'A1', tags: ['food'] },
  { id: 'v761', ar: 'سَمَك', uz: 'Baliq', translit: 'samak', emoji: '🐟', level: 'A1', tags: ['food'] },
  { id: 'v762', ar: 'بَيْض', uz: 'Tuxum', translit: 'bayd', emoji: '🥚', level: 'A1', tags: ['food'] },
  { id: 'v764', ar: 'فَاكِهَة', uz: 'Meva', translit: 'fakiha', emoji: '🍇', level: 'A1', tags: ['food'] },
  { id: 'v766', ar: 'عَصِير', uz: 'Sharbat', translit: "'asir", emoji: '🧃', level: 'A1', tags: ['food'] },

  // U7 · Masjid (tag: mosque)
  { id: 'v770', ar: 'مَسْجِد', uz: 'Masjid', translit: 'masjid', emoji: '🕌', level: 'A1', tags: ['mosque'] },
  { id: 'v771', ar: 'صَلَاة', uz: 'Namoz', translit: 'salat', emoji: '🤲', level: 'A1', tags: ['mosque'] },
  { id: 'v772', ar: 'قِبْلَة', uz: 'Qibla', translit: 'qibla', emoji: '🧭', level: 'A1', tags: ['mosque'] },
  { id: 'v773', ar: 'مِئْذَنَة', uz: 'Minora', translit: "mi'dhana", emoji: '🕌', level: 'A1', tags: ['mosque'] },
  { id: 'v774', ar: 'وُضُوء', uz: 'Tahorat', translit: "wudu'", emoji: '💧', level: 'A1', tags: ['mosque'] },
  { id: 'v776', ar: 'إِمَام', uz: 'Imom', translit: 'imam', emoji: '🧎', level: 'A1', tags: ['mosque'] },
  { id: 'v777', ar: 'سَجَّادَة', uz: 'Joynamoz', translit: 'sajjada', emoji: '🧶', level: 'A1', tags: ['mosque'] },

  // U8 · Vaqt va sonlar 11-20 (tag: numbers / time)
  { id: 'v780', ar: 'أَحَدَ عَشَرَ', uz: "O'n bir (11)", translit: 'ahada ashar', emoji: '🔢', level: 'A1', tags: ['numbers'] },
  { id: 'v781', ar: 'اِثْنَا عَشَرَ', uz: "O'n ikki (12)", translit: 'ithna ashar', emoji: '🔢', level: 'A1', tags: ['numbers'] },
  { id: 'v783', ar: 'عِشْرُونَ', uz: 'Yigirma (20)', translit: "'ishrun", emoji: '🔢', level: 'A1', tags: ['numbers'] },
  { id: 'v784', ar: 'دَقِيقَة', uz: 'Daqiqa', translit: 'daqiqa', emoji: '⏱️', level: 'A1', tags: ['time'] },
  { id: 'v786', ar: 'صَبَاحًا', uz: 'Ertalab', translit: 'sabahan', emoji: '🌅', level: 'A1', tags: ['time'] },
  { id: 'v787', ar: 'مَسَاءً', uz: 'Kechqurun', translit: "masa'an", emoji: '🌆', level: 'A1', tags: ['time'] },

  // U9 · Kunlar va oylar (tag: calendar)
  { id: 'v790', ar: 'السَّبْت', uz: 'Shanba', translit: 'as-sabt', emoji: '📅', level: 'A1', tags: ['calendar'] },
  { id: 'v791', ar: 'الأَحَد', uz: 'Yakshanba', translit: 'al-ahad', emoji: '📅', level: 'A1', tags: ['calendar'] },
  { id: 'v792', ar: 'الاِثْنَيْن', uz: 'Dushanba', translit: 'al-ithnayn', emoji: '📅', level: 'A1', tags: ['calendar'] },
  { id: 'v793', ar: 'الجُمُعَة', uz: 'Juma', translit: "al-jumu'a", emoji: '🕌', level: 'A1', tags: ['calendar'] },
  { id: 'v797', ar: 'أَمْس', uz: 'Kecha', translit: 'ams', emoji: '⬅️', level: 'A1', tags: ['calendar'] },
  { id: 'v798', ar: 'الْيَوْم', uz: 'Bugun', translit: 'al-yawm', emoji: '⭐', level: 'A1', tags: ['calendar'] },
  { id: 'v799', ar: 'غَدًا', uz: 'Ertaga', translit: 'ghadan', emoji: '➡️', level: 'A1', tags: ['calendar'] },

  // U10 · Shahar (tag: city)
  { id: 'v800', ar: 'شَارِع', uz: "Ko'cha", translit: "shari'", emoji: '🛣️', level: 'A1', tags: ['city'] },
  { id: 'v802', ar: 'مُسْتَشْفَى', uz: 'Kasalxona', translit: 'mustashfa', emoji: '🏥', level: 'A1', tags: ['city'] },
  { id: 'v804', ar: 'بَنْك', uz: 'Bank', translit: 'bank', emoji: '🏦', level: 'A1', tags: ['city'] },
  { id: 'v806', ar: 'مَكْتَبَة', uz: 'Kutubxona', translit: 'maktaba', emoji: '📚', level: 'A1', tags: ['city'] },
  { id: 'v807', ar: 'مَحَطَّة', uz: 'Bekat', translit: 'mahatta', emoji: '🚉', level: 'A1', tags: ['city'] },
  { id: 'v808', ar: 'يَمِين', uz: "O'ng", translit: 'yamin', emoji: '➡️', level: 'A1', tags: ['city'] },
  { id: 'v809', ar: 'يَسَار', uz: 'Chap', translit: 'yasar', emoji: '⬅️', level: 'A1', tags: ['city'] },

  // U11 · Transport (tag: transport)
  { id: 'v810', ar: 'سَيَّارَة', uz: 'Mashina', translit: 'sayyara', emoji: '🚗', level: 'A1', tags: ['transport'] },
  { id: 'v811', ar: 'حَافِلَة', uz: 'Avtobus', translit: 'hafila', emoji: '🚌', level: 'A1', tags: ['transport'] },
  { id: 'v812', ar: 'قِطَار', uz: 'Poyezd', translit: 'qitar', emoji: '🚆', level: 'A1', tags: ['transport'] },
  { id: 'v814', ar: 'تَاكْسِي', uz: 'Taksi', translit: 'taksi', emoji: '🚕', level: 'A1', tags: ['transport'] },
  { id: 'v815', ar: 'مَتْرُو', uz: 'Metro', translit: 'metro', emoji: '🚇', level: 'A1', tags: ['transport'] },
  { id: 'v817', ar: 'سَفِينَة', uz: 'Kema', translit: 'safina', emoji: '🚢', level: 'A1', tags: ['transport'] },

  // U12 · Xarid (tag: shopping)
  { id: 'v820', ar: 'مَتْجَر', uz: "Do'kon", translit: 'matjar', emoji: '🏬', level: 'A1', tags: ['shopping'] },
  { id: 'v821', ar: 'ثَمَن', uz: 'Narx', translit: 'thaman', emoji: '🏷️', level: 'A1', tags: ['shopping'] },
  { id: 'v822', ar: 'نُقُود', uz: 'Pul', translit: 'nuqud', emoji: '💵', level: 'A1', tags: ['shopping'] },
  { id: 'v823', ar: 'رَخِيص', uz: 'Arzon', translit: 'rakhis', emoji: '💲', level: 'A1', tags: ['shopping'] },
  { id: 'v824', ar: 'غَالٍ', uz: 'Qimmat', translit: 'ghalin', emoji: '💰', level: 'A1', tags: ['shopping'] },
  { id: 'v825', ar: 'زَبُون', uz: 'Mijoz', translit: 'zabun', emoji: '🧍', level: 'A1', tags: ['shopping'] },
  { id: 'v827', ar: 'كَمْ', uz: 'Qancha / necha', translit: 'kam', emoji: '❓', level: 'A1', tags: ['shopping'] },

  // U13 · Safar (tag: travel / verbs)
  { id: 'v830', ar: 'مَطَار', uz: 'Aeroport', translit: 'matar', emoji: '✈️', level: 'A1', tags: ['travel'] },
  { id: 'v831', ar: 'جَوَاز', uz: 'Pasport', translit: 'jawaz', emoji: '🛂', level: 'A1', tags: ['travel'] },
  { id: 'v832', ar: 'تَذْكِرَة', uz: 'Chipta', translit: 'tadhkira', emoji: '🎫', level: 'A1', tags: ['travel'] },
  { id: 'v834', ar: 'فُنْدُق', uz: 'Mehmonxona', translit: 'funduq', emoji: '🏨', level: 'A1', tags: ['travel'] },
  { id: 'v835', ar: 'رِحْلَة', uz: 'Sayohat', translit: 'rihla', emoji: '🧭', level: 'A1', tags: ['travel'] },
  { id: 'v836', ar: 'سَافَرَ', uz: 'sayohat qildi', translit: 'safara', emoji: '🧳', level: 'A1', tags: ['verbs'] },
  { id: 'v838', ar: 'وَصَلَ', uz: 'yetib keldi', translit: 'wasala', emoji: '📍', level: 'A1', tags: ['verbs'] },

  // U14 · Ob-havo va kiyim (tag: weather)
  { id: 'v840', ar: 'طَقْس', uz: 'Ob-havo', translit: 'taqs', emoji: '🌤️', level: 'A1', tags: ['weather'] },
  { id: 'v841', ar: 'حَارّ', uz: 'Issiq', translit: 'harr', emoji: '🥵', level: 'A1', tags: ['weather'] },
  { id: 'v842', ar: 'بَارِد', uz: 'Sovuq', translit: 'barid', emoji: '🥶', level: 'A1', tags: ['weather'] },
  { id: 'v843', ar: 'مَطَر', uz: "Yomg'ir", translit: 'matar', emoji: '🌧️', level: 'A1', tags: ['weather'] },
  { id: 'v846', ar: 'مَلَابِس', uz: 'Kiyim', translit: 'malabis', emoji: '👕', level: 'A1', tags: ['weather'] },
  { id: 'v847', ar: 'قَمِيص', uz: "Ko'ylak", translit: 'qamis', emoji: '👔', level: 'A1', tags: ['weather'] },
  { id: 'v848', ar: 'حِذَاء', uz: 'Oyoq kiyim', translit: "hidha'", emoji: '👟', level: 'A1', tags: ['weather'] },
  { id: 'v849', ar: 'مِعْطَف', uz: 'Palto', translit: "mi'taf", emoji: '🧥', level: 'A1', tags: ['weather'] },

  // U15 · Sog'liq (tag: health)
  { id: 'v850', ar: 'مَرِيض', uz: 'Kasal', translit: 'marid', emoji: '🤒', level: 'A1', tags: ['health'] },
  { id: 'v852', ar: 'دَوَاء', uz: 'Dori', translit: "dawa'", emoji: '💊', level: 'A1', tags: ['health'] },
  { id: 'v854', ar: 'أَلَم', uz: "Og'riq", translit: 'alam', emoji: '🤕', level: 'A1', tags: ['health'] },
  { id: 'v855', ar: 'رَأْس', uz: 'Bosh', translit: "ra's", emoji: '🧠', level: 'A1', tags: ['health'] },
  { id: 'v856', ar: 'بَطْن', uz: 'Qorin', translit: 'batn', emoji: '🫃', level: 'A1', tags: ['health'] },
  { id: 'v857', ar: 'حُمَّى', uz: 'Isitma', translit: 'humma', emoji: '🌡️', level: 'A1', tags: ['health'] },
  { id: 'v858', ar: 'اِشْرَبْ', uz: 'ich! (buyruq)', translit: 'ishrab', emoji: '🥤', level: 'A1', tags: ['health'] },

  // U16 · Hobbi (tag: hobbies)
  { id: 'v860', ar: 'هِوَايَة', uz: 'Hobbi', translit: 'hiwaya', emoji: '🎨', level: 'A1', tags: ['hobbies'] },
  { id: 'v861', ar: 'قِرَاءَة', uz: "O'qish", translit: "qira'a", emoji: '📖', level: 'A1', tags: ['hobbies'] },
  { id: 'v862', ar: 'كِتَابَة', uz: 'Yozish', translit: 'kitaba', emoji: '✍️', level: 'A1', tags: ['hobbies'] },
  { id: 'v863', ar: 'سِبَاحَة', uz: 'Suzish', translit: 'sibaha', emoji: '🏊', level: 'A1', tags: ['hobbies'] },
  { id: 'v864', ar: 'رَسْم', uz: 'Rasm chizish', translit: 'rasm', emoji: '🖌️', level: 'A1', tags: ['hobbies'] },
  { id: 'v865', ar: 'مُوسِيقَى', uz: 'Musiqa', translit: 'musiqa', emoji: '🎵', level: 'A1', tags: ['hobbies'] },
  { id: 'v867', ar: 'طَبْخ', uz: 'Ovqat pishirish', translit: 'tabkh', emoji: '🍳', level: 'A1', tags: ['hobbies'] },

  // U17 · Kundalik hayot — mudori' fe'llar (tag: routine)
  { id: 'v870', ar: 'أَسْتَيْقِظُ', uz: "uyg'onaman", translit: 'astayqizu', emoji: '⏰', level: 'A1', tags: ['routine'] },
  { id: 'v871', ar: 'أَذْهَبُ', uz: 'boraman', translit: 'adhhabu', emoji: '🚶', level: 'A1', tags: ['routine'] },
  { id: 'v872', ar: 'أَدْرُسُ', uz: "o'qiyman", translit: 'adrusu', emoji: '📚', level: 'A1', tags: ['routine'] },
  { id: 'v873', ar: 'أَعْمَلُ', uz: 'ishlayman', translit: "a'malu", emoji: '💼', level: 'A1', tags: ['routine'] },
  { id: 'v874', ar: 'آكُلُ', uz: 'yeyman', translit: 'akulu', emoji: '🍽️', level: 'A1', tags: ['routine'] },
  { id: 'v875', ar: 'أَنَامُ', uz: 'uxlayman', translit: 'anamu', emoji: '😴', level: 'A1', tags: ['routine'] },
  { id: 'v876', ar: 'أَقْرَأُ', uz: "(kitob) o'qiyman", translit: "aqra'u", emoji: '📖', level: 'A1', tags: ['routine'] },
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
