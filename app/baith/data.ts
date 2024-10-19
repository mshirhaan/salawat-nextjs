export type AllBaiths = {
  [title: string]: {
    title: string;
    lines: Line[];
    audioUrl?: string;
  };
};

type Translation = {
  en: string;
};

type Word = {
  word: string;
  translations: Translation;
};

export type Line = {
  arabic: string;
  translations: Translation;
  words: Word[];
  startTime: number;
  endTime: number;
};

const allBaiths: AllBaiths = {
  salam: {
    title: "Salam",
    lines: [
      {
        arabic: "Mustafa Jaan e Rahmat Pe Laakhoñ Salaam",
        translations: {
          en: "Upon Mustafa ‘The Chosen One’, The Soul Of Mercy, Millions Of Salutations",
        },
        words: [
          { word: "Mustafa", translations: { en: "The Chosen One" } },
          { word: "Jaan", translations: { en: "Soul" } },
          { word: "e", translations: { en: "of" } },
          { word: "Rahmat", translations: { en: "Mercy" } },
          { word: "Pe", translations: { en: "Upon" } },
          { word: "Laakhoñ", translations: { en: "Millions" } },
          { word: "Salaam", translations: { en: "Salutations" } },
        ],
        startTime: 0,
        endTime: 5,
      },
      {
        arabic: "Sham’e Bazm e Hidaayat Pe Laakhoñ Salaam",
        translations: {
          en: "Upon The Glowing Lamp Of The Assembly Of Guidance, Millions Of Salutations",
        },
        words: [
          { word: "Sham’e", translations: { en: "Glowing Lamp" } },
          { word: "Bazm", translations: { en: "Assembly" } },
          { word: "e", translations: { en: "of" } },
          { word: "Hidaayat", translations: { en: "Guidance" } },
          { word: "Pe", translations: { en: "Upon" } },
          { word: "Laakhoñ", translations: { en: "Millions" } },
          { word: "Salaam", translations: { en: "Salutations" } },
        ],
        startTime: 5,
        endTime: 10,
      },

      {
        arabic: "Mehr e Charkh e Nubuw’wat Pe Roshan Durood",
        translations: {
          en: "Upon The Sun Of The Sky Of Prophethood, Radiant Benedictions",
        },
        words: [
          { word: "Mehr", translations: { en: "Sun" } },
          { word: "e", translations: { en: "of" } },
          { word: "Charkh", translations: { en: "Sky" } },
          { word: "Nubuw’wat", translations: { en: "Prophethood" } },
          { word: "Pe", translations: { en: "Upon" } },
          { word: "Roshan", translations: { en: "Radiant" } },
          { word: "Durood", translations: { en: "Benedictions" } },
        ],
        startTime: 10,
        endTime: 15,
      },
    ],
  },

  "ashraqa-baith": {
    title: "Ashraqa Baith",
    lines: [
      {
        arabic: "يَا نَبِي سَلاَمْ عَلَيْكُمْ يَا رَسُولْ سَلاَمْ عَلَيْكُمْ",
        translations: {
          en: "Oh Prophet (ﷺ), peace be upon you, Oh Messenger (ﷺ), peace be upon you",
        },
        words: [
          { word: "يَا", translations: { en: "Oh" } },
          { word: "نَبِي", translations: { en: "Prophet" } },
          { word: "سَلاَمْ", translations: { en: "Peace" } },
          { word: "عَلَيْكُمْ", translations: { en: "Be upon you" } },
          { word: "يَا", translations: { en: "Oh" } },
          { word: "رَسُولْ", translations: { en: "Messenger" } },
          { word: "سَلاَمْ", translations: { en: "Peace" } },
          { word: "عَلَيْكُمْ", translations: { en: "Be upon you" } },
        ],
        startTime: 0,
        endTime: 10.8, // Adjusted end time
      },
      {
        arabic: "ياَ حَبِيبْ سَلاَمْ عَلَيْكُمْ صَلَوَاتُ الله عَلَيْكُمْ",
        translations: {
          en: "Oh Beloved (ﷺ), peace be upon you, Allah’s blessings be upon you",
        },
        words: [
          { word: "ياَ", translations: { en: "Oh" } },
          { word: "حَبِيبْ", translations: { en: "Beloved" } },
          { word: "سَلاَمْ", translations: { en: "Peace" } },
          { word: "عَلَيْكُمْ", translations: { en: "Be upon you" } },
          { word: "صَلَوَاتُ", translations: { en: "Blessings" } },
          { word: "الله", translations: { en: "Allah" } },
          { word: "عَلَيْكُمْ", translations: { en: "Be upon you" } },
        ],
        startTime: 10.9, // Start time adjusted for the next segment
        endTime: 42,
      },
      {
        arabic: "أَشْرَقَ الْبَدْرُ عَلَيْنَا فَاخْتَفَتْ مِنْهُ الْبُدُورُ",
        translations: {
          en: "The full moon (the prophet (ﷺ) has risen on us, Then all other full moons have disappeared",
        },
        words: [
          { word: "أَشْرَقَ", translations: { en: "has risen" } },
          { word: "الْبَدْرُ", translations: { en: "the full moon" } },
          { word: "عَلَيْنَا", translations: { en: "on us" } },
          { word: "فَاخْتَفَتْ", translations: { en: "then disappeared" } },
          { word: "مِنْهُ", translations: { en: "from him" } },
          { word: "الْبُدُورُ", translations: { en: "the full moons" } },
        ],
        startTime: 42.5,
        endTime: 52.5, // Adjusted end time for this segment
      },
      {
        arabic: "مِثْلَ حُسْنِكَ مَا رَأَيْنَا قَطُّ يَا وَجْهَ السُّرُورِ",
        translations: {
          en: "We have not seen anything similar to your beauty, Never, Oh the face of happiness",
        },
        words: [
          { word: "مِثْلَ", translations: { en: "similar to" } },
          { word: "حُسْنِكَ", translations: { en: "your beauty" } },
          { word: "مَا", translations: { en: "anything" } },
          { word: "رَأَيْنَا", translations: { en: "we have seen" } },
          { word: "قَطُّ", translations: { en: "never" } },
          { word: "يَا", translations: { en: "Oh" } },
          { word: "وَجْهَ", translations: { en: "the face of" } },
          { word: "السُّرُورِ", translations: { en: "happiness" } },
        ],
        startTime: 52.5, // Start time adjusted for the next segment
        endTime: 63,
      },
      {
        arabic: "أَنْتَ شَمْسٌ أَنْتَ بَدْرٌ أَنْتَ نُورٌ فَوْقَ نُورٍ",
        translations: {
          en: "You are a ‘sun’, you are a ‘full moon’, You are the light over light",
        },
        words: [
          { word: "أَنْتَ", translations: { en: "You are" } },
          { word: "شَمْسٌ", translations: { en: "Sun" } },
          { word: "أَنْتَ", translations: { en: "You are" } },
          { word: "بَدْرٌ", translations: { en: "Full moon" } },
          { word: "أَنْتَ", translations: { en: "You are" } },
          { word: "نُورٌ", translations: { en: "Light" } },
          { word: "فَوْقَ", translations: { en: "Over" } },
          { word: "نُورٍ", translations: { en: "Light" } },
        ],
        startTime: 85,
        endTime: 94.8,
      },
      {
        arabic: "أَنْتَ إِكْسِيرٌ وَ غَالِي أَنْتَ مِصْباَحُ الصُّدُورِ",
        translations: {
          en: "You are the Elixir of life and precious, You are the lamps of the chests/hearts",
        },
        words: [
          { word: "أَنْتَ", translations: { en: "You are" } },
          { word: "إِكْسِيرٌ", translations: { en: "Elixir of life" } },
          { word: "وَ", translations: { en: "And" } },
          { word: "غَالِي", translations: { en: "Precious" } },
          { word: "أَنْتَ", translations: { en: "You are" } },
          { word: "مِصْباَحُ", translations: { en: "Lamp" } },
          { word: "الصُّدُورِ", translations: { en: "Chests/Hearts" } },
        ],
        startTime: 95,
        endTime: 106,
      },

      {
        arabic: "يَا حَبِيبِي يَا مُحَمَّدْ يَا عَرُوسَ الْخَافِقَيْنِ",
        translations: {
          en: "Oh, my beloved one (ﷺ), O Muhammad (ﷺ), Oh, the bridegroom of the east and the west",
        },
        words: [
          { word: "يَا", translations: { en: "Oh" } },
          { word: "حَبِيبِي", translations: { en: "my beloved one" } },
          { word: "مُحَمَّدْ", translations: { en: "Muhammad" } },
          { word: "عَرُوسَ", translations: { en: "bridegroom" } },
          {
            word: "الْخَافِقَيْنِ",
            translations: { en: "of the east and the west" },
          },
        ],
        startTime: 127.5,
        endTime: 138, // Adjusted end time for this segment
      },
      {
        arabic: "ياَ مُؤَيَّدْ يَا مُمَجَّدْ يَا إِمَامَ القِبْلَتَيْنِ",
        translations: {
          en: "Oh, The Supported One, O the Glorified, Oh, Imam of the Two Qiblas",
        },
        words: [
          { word: "ياَ", translations: { en: "Oh" } },
          { word: "مُؤَيَّدْ", translations: { en: "The Supported One" } },
          { word: "مُمَجَّدْ", translations: { en: "the Glorified" } },
          { word: "إِمَامَ", translations: { en: "Imam" } },
          { word: "القِبْلَتَيْنِ", translations: { en: "of the Two Qiblas" } },
        ],
        startTime: 138, // Start time adjusted for the next segment
        endTime: 148,
      },
      {
        arabic: "مَنْ رَأَى وَجْهَكَ يَسْعَدْ يَا كَرِيمَ الْوَالِدَيْنِ",
        translations: {
          en: "Whoever has seen your face, they are very fortunate, Oh, The One whose parents are very noble",
        },
        words: [
          { word: "مَنْ", translations: { en: "Whoever" } },
          { word: "رَأَى", translations: { en: "has seen" } },
          { word: "وَجْهَكَ", translations: { en: "your face" } },
          { word: "يَسْعَدْ", translations: { en: "they are fortunate" } },
          { word: "يَا", translations: { en: "Oh" } },
          { word: "كَرِيمَ", translations: { en: "The Noble" } },
          { word: "الْوَالِدَيْنِ", translations: { en: "of the parents" } },
        ],
        startTime: 169.8,
        endTime: 180, // Adjusted end time for this segment
      },
      {
        arabic: "حَوْضُكَ الصَّافِي الْمُبَرَّدْ وِرْدُنَا يَوْمَ النُّشُورِ",
        translations: {
          en: "Your pure, and cooled Haudhul Kauthar, Is our gathering point on the day of resurrection",
        },
        words: [
          { word: "حَوْضُكَ", translations: { en: "Your Haudhul Kauthar" } },
          { word: "الصَّافِي", translations: { en: "pure" } },
          { word: "الْمُبَرَّدْ", translations: { en: "cooled" } },
          { word: "وِرْدُنَا", translations: { en: "Is our gathering point" } },
          { word: "يَوْمَ", translations: { en: "on the day of" } },
          { word: "النُّشُورِ", translations: { en: "resurrection" } },
        ],
        startTime: 180, // Start time adjusted for the next segment
        endTime: 191,
      },
      {
        arabic: "مَا رَأَيْنَا الْعِيسَ حَنَّتْ بِالسُّرَى إِلاَّ إِلَيْكَ",
        translations: {
          en: "We didn’t see the camel yearning, To travel at night except towards you",
        },
        words: [
          { word: "مَا", translations: { en: "We didn’t" } },
          { word: "رَأَيْنَا", translations: { en: "see" } },
          { word: "الْعِيسَ", translations: { en: "the camel" } },
          { word: "حَنَّتْ", translations: { en: "yearning" } },
          { word: "بِالسُّرَى", translations: { en: "at night" } },
          { word: "إِلاَّ", translations: { en: "except" } },
          { word: "إِلَيْكَ", translations: { en: "towards you" } },
        ],
        startTime: 212,
        endTime: 222, // Adjusted end time for this segment
      },
      {
        arabic: "وَالْغَمَامَة قَدْ أَظَلَّتْ وَالْمَلاَ صَلَّوْا عَلَيْكَ",
        translations: {
          en: "And the cloud gave you shade (while you travelled), And all in the earth and the heavens prayed for sending blessing upon you",
        },
        words: [
          { word: "وَ", translations: { en: "And" } },
          { word: "الْغَمَامَة", translations: { en: "the cloud" } },
          { word: "قَدْ", translations: { en: "gave" } },
          { word: "أَظَلَّتْ", translations: { en: "you shade" } },
          { word: "وَ", translations: { en: "And" } },
          { word: "الْمَلاَ", translations: { en: "all" } },
          { word: "صَلَّوْا", translations: { en: "prayed" } },
          { word: "عَلَيْكَ", translations: { en: "for you" } },
        ],
        startTime: 222, // Start time adjusted for the next segment
        endTime: 233,
      },
      {
        arabic: "وَأَتَاكَ الْعُودُ يَبْكِي وَتَذَلَّلْ بَيْنَ يَدَيْكَ",
        translations: {
          en: "And the wood came to you weeping, And became very emotional in front of you",
        },
        words: [
          { word: "وَأَتَاكَ", translations: { en: "And came to you" } },
          { word: "الْعُودُ", translations: { en: "the wood" } },
          { word: "يَبْكِي", translations: { en: "weeping" } },
          { word: "وَتَذَلَّلْ", translations: { en: "And became emotional" } },
          { word: "بَيْنَ", translations: { en: "in front of" } },
          { word: "يَدَيْكَ", translations: { en: "you" } },
        ],
        startTime: 254.4,
        endTime: 265, // Adjusted end time for this segment
      },
      {
        arabic: "وَاسْتَجَارَكَ يَا حَبِيبِي عِنْدَكَ الظَّبْيُ النَّفُورُ",
        translations: {
          en: "Oh, my Dear, sought protection to you, The frightened deer in your presence",
        },
        words: [
          {
            word: "وَاسْتَجَارَكَ",
            translations: { en: "And sought protection from you" },
          },
          { word: "يَا", translations: { en: "Oh" } },
          { word: "حَبِيبِي", translations: { en: "my dear" } },
          { word: "عِنْدَكَ", translations: { en: "in your presence" } },
          { word: "الظَّبْيُ", translations: { en: "the deer" } },
          { word: "النَّفُورُ", translations: { en: "the frightened" } },
        ],
        startTime: 265, // Start time adjusted for the next segment
        endTime: 276,
      },
      {
        arabic: "حِينَمَا شَدُّوا الْمَحَامِلْ وَتَنَادَوْا لِلرَّحِيلِ",
        translations: {
          en: "When the caravan had already prepared for leaving to Madheena, And they called each other announcing the starting of the journey",
        },
        words: [
          { word: "حِينَمَا", translations: { en: "When" } },
          { word: "شَدُّوا", translations: { en: "prepared" } },
          { word: "الْمَحَامِلْ", translations: { en: "the caravan" } },
          {
            word: "وَتَنَادَوْا",
            translations: { en: "and called each other" },
          },
          { word: "لِلرَّحِيلِ", translations: { en: "for leaving" } },
        ],
        startTime: 296.8,
        endTime: 307, // Adjusted end time for this segment
      },
      {
        arabic: "جِئْتُهُمْ وَالدَّمْعُ سَائِلْ قُلْتُ قِفْ لِي يَا دَلِيلُ",
        translations: {
          en: "I went to them with flowing tears, I said: Please stop for me a while. Oh guide",
        },
        words: [
          { word: "جِئْتُهُمْ", translations: { en: "I went to them" } },
          { word: "وَالدَّمْعُ", translations: { en: "with flowing tears" } },
          { word: "سَائِلْ", translations: { en: "flowing" } },
          { word: "قُلْتُ", translations: { en: "I said" } },
          { word: "قِفْ", translations: { en: "stop" } },
          { word: "لِي", translations: { en: "for me" } },
          { word: "يَا", translations: { en: "Oh" } },
          { word: "دَلِيلُ", translations: { en: "guide" } },
        ],
        startTime: 307, // Start time adjusted for the next segment
        endTime: 318,
      },
      {
        arabic: "وَتَحَمَّلْ لِي رَسَائِلْ أَيُّهَا الشَّوْقُ الْجَزِيلُ",
        translations: {
          en: "And carry messages for me, Oh, This extreme yearning and desire towards my beloved",
        },
        words: [
          { word: "وَتَحَمَّلْ", translations: { en: "And carry" } },
          { word: "لِي", translations: { en: "for me" } },
          { word: "رَسَائِلْ", translations: { en: "messages" } },
          { word: "أَيُّهَا", translations: { en: "Oh" } },
          { word: "الشَّوْقُ", translations: { en: "the yearning" } },
          { word: "الْجَزِيلُ", translations: { en: "the extreme" } },
        ],
        startTime: 339,
        endTime: 349, // Adjusted end time for this segment
      },
      {
        arabic: "نَحْوَهَا تِلْكَ الْمَنَازِلْ فِي الْعَشَايَا وَالْبُكُورِ",
        translations: {
          en: "Towards those houses and destinations (Madheena), In the morning and evening (always)",
        },
        words: [
          { word: "نَحْوَهَا", translations: { en: "Towards" } },
          { word: "تِلْكَ", translations: { en: "those" } },
          { word: "الْمَنَازِلْ", translations: { en: "houses" } },
          { word: "فِي", translations: { en: "in" } },
          { word: "الْعَشَايَا", translations: { en: "the evening" } },
          { word: "وَالْبُكُورِ", translations: { en: "and the morning" } },
        ],
        startTime: 349, // Start time adjusted for the next segment
        endTime: 360,
      },
      {
        arabic: "كُلُّ مَنْ فِي الْكَوْنِ هَامُوا فِيكَ يَا بَاهِي الْجَبِينُ",
        translations: {
          en: "All in this universe are fond, Of you, oh the one whose forehead was large and shining",
        },
        words: [
          { word: "كُلُّ", translations: { en: "All" } },
          { word: "مَنْ", translations: { en: "in this universe" } },
          { word: "فِي", translations: { en: "are fond" } },
          { word: "الْكَوْنِ", translations: { en: "of you" } },
          { word: "هَامُوا", translations: { en: "oh" } },
          { word: "فِيكَ", translations: { en: "the one" } },
          { word: "يَا", translations: { en: "whose" } },
          { word: "بَاهِي", translations: { en: "large" } },
          { word: "الْجَبِينُ", translations: { en: "and shining" } },
        ],
        startTime: 381.5,
        endTime: 392, // Adjusted end time for this segment
      },
      {
        arabic: "وَلَهُمْ فِيكَ غَرَامٌ وَاشْتِيَاقٌ وَحَنِينٌ",
        translations: {
          en: "And they have deep affection towards you, longing and special passion",
        },
        words: [
          { word: "وَلَهُمْ", translations: { en: "And they have" } },
          { word: "فِيكَ", translations: { en: "in you" } },
          { word: "غَرَامٌ", translations: { en: "affection" } },
          { word: "وَاشْتِيَاقٌ", translations: { en: "and longing" } },
          { word: "وَحَنِينٌ", translations: { en: "and special passion" } },
        ],
        startTime: 392, // Start time adjusted for the next segment
        endTime: 402,
      },
      {
        arabic: "فِي مَعَانِيكَ اْلأَنَامُ قَد تَّبَدَّتْ حَائِرِينَ",
        translations: {
          en: "Thinking about your characters, All the people, Are seen astonished",
        },
        words: [
          { word: "فِي", translations: { en: "In" } },
          { word: "مَعَانِيكَ", translations: { en: "your characters" } },
          { word: "اْلأَنَامُ", translations: { en: "the people" } },
          { word: "قَد", translations: { en: "have" } },
          { word: "تَّبَدَّتْ", translations: { en: "become astonished" } },
          { word: "حَائِرِينَ", translations: { en: "seen amazed" } },
        ],
        startTime: 423.8,
        endTime: 434, // Adjusted end time for this segment
      },
      {
        arabic: "أَنْتَ للِرُّسُلِ خِتَامُ أَنْتَ لِلْمَوْلىَ شَكُورُ",
        translations: {
          en: "You are the last of all Prophets, You are very grateful to the Master (Allah)",
        },
        words: [
          { word: "أَنْتَ", translations: { en: "You are" } },
          {
            word: "للِرُّسُلِ",
            translations: { en: "the last of the Prophets" },
          },
          { word: "خِتَامُ", translations: { en: "the last" } },
          { word: "أَنْتَ", translations: { en: "You are" } },
          { word: "لِلْمَوْلىَ", translations: { en: "to the Master" } },
          { word: "شَكُورُ", translations: { en: "very grateful" } },
        ],
        startTime: 434, // Start time adjusted for the next segment
        endTime: 445,
      },
      {
        arabic: "عَبْدُكَ الْمِسْكِينُ يَرْجُو فَضْلَكَ الْجَمَّ الْغَفِيرُ",
        translations: {
          en: "Your poor servant / follower wills, For Your extreme bounties",
        },
        words: [
          { word: "عَبْدُكَ", translations: { en: "Your servant" } },
          { word: "الْمِسْكِينُ", translations: { en: "the poor" } },
          { word: "يَرْجُو", translations: { en: "hopes" } },
          { word: "فَضْلَكَ", translations: { en: "Your bounty" } },
          { word: "الْجَمَّ", translations: { en: "extreme" } },
          { word: "الْغَفِيرُ", translations: { en: "the forgiving" } },
        ],
        startTime: 516,
        endTime: 524, // Adjusted end time for this segment
      },
      {
        arabic: "فِيكَ قَدْ أَحْسَنْتُ ظَنِّي يَا بَشِيرُ يَا نَذِيرُ",
        translations: {
          en: "I have very good expectations on you, Oh, bringer of good news and Warner (from Allah)",
        },
        words: [
          { word: "فِيكَ", translations: { en: "In you" } },
          { word: "قَدْ", translations: { en: "I have" } },
          { word: "أَحْسَنْتُ", translations: { en: "done good" } },
          { word: "ظَنِّي", translations: { en: "my expectation" } },
          { word: "يَا", translations: { en: "Oh" } },
          { word: "بَشِيرُ", translations: { en: "bringer of good news" } },
          { word: "يَا", translations: { en: "Oh" } },
          { word: "نَذِيرُ", translations: { en: "Warner" } },
        ],
        startTime: 524,
        endTime: 530,
      },
      {
        arabic: "فَأَغِثْنِي وَأَجِرْنِي يَا مُجِيرُ مِنَ السَّعِيرِ",
        translations: {
          en: "So, help me and protect me (by your shafa-a’ and Miracles), Oh, the one who safeguards from hellfire (through your shaf-a’ which is granted to you by Allah)",
        },
        words: [
          { word: "فَأَغِثْنِي", translations: { en: "So help me" } },
          { word: "وَأَجِرْنِي", translations: { en: "and protect me" } },
          { word: "يَا", translations: { en: "Oh" } },
          { word: "مُجِيرُ", translations: { en: "the one who protects" } },
          { word: "مِنَ", translations: { en: "from" } },
          { word: "السَّعِيرِ", translations: { en: "the hellfire" } },
        ],
        startTime: 546.3,
        endTime: 558.3, // Adjusted end time for this segment
      },
      {
        arabic: "يَا غِيَاثِي يَا مَلاَذِي فِي مُلِمَّاتِ اْلأُمُورِ",
        translations: {
          en: "Oh, my help and my asylum (i.e. The One who helps me by shafa-a’), In all matters faced to me",
        },
        words: [
          { word: "يَا", translations: { en: "Oh" } },
          { word: "غِيَاثِي", translations: { en: "my help" } },
          { word: "يَا", translations: { en: "Oh" } },
          { word: "مَلاَذِي", translations: { en: "my asylum" } },
          { word: "فِي", translations: { en: "in" } },
          { word: "مُلِمَّاتِ", translations: { en: "difficulties" } },
          { word: "اْلأُمُورِ", translations: { en: "the matters" } },
        ],
        startTime: 558.3,
        endTime: 592,
      },
      {
        arabic: "فَازَ عَبْدٌ قَدْ تَمَلَّى وَانْجَلَى عَنْهُ الْهُمُومُ",
        translations: {
          en: "The person who is filled with your love has won, And all sorrows will move away from him",
        },
        words: [
          { word: "فَازَ", translations: { en: "won" } },
          { word: "عَبْدٌ", translations: { en: "a servant" } },
          { word: "قَدْ", translations: { en: "has" } },
          { word: "تَمَلَّى", translations: { en: "filled" } },
          { word: "وَانْجَلَى", translations: { en: "moved away" } },
          { word: "عَنْهُ", translations: { en: "from him" } },
          { word: "الْهُمُومُ", translations: { en: "sorrows" } },
        ],
        startTime: 607.5,
        endTime: 620, // Adjusted end time for this segment
      },
      {
        arabic: "فِيكَ يَا بَدْرٌ تَجَلَّى فَلَكَ الْوَصْفُ الْحَسِينُ",
        translations: {
          en: "In you, Oh The clear full moon, You have the best description (in shape and character)",
        },
        words: [
          { word: "فِيكَ", translations: { en: "In you" } },
          { word: "يَا", translations: { en: "Oh" } },
          { word: "بَدْرٌ", translations: { en: "full moon" } },
          { word: "تَجَلَّى", translations: { en: "has appeared" } },
          { word: "فَلَكَ", translations: { en: "for you" } },
          { word: "الْوَصْفُ", translations: { en: "the description" } },
          { word: "الْحَسِينُ", translations: { en: "the beautiful" } },
        ],
        startTime: 620,
        endTime: 653,
      },
      {
        arabic: "لَيْسَ أَزْكَى مِنْكَ أَصْلاً قَطُّ يَا جَدَّ الْحُسَيْنِ",
        translations: {
          en: "No one is more righteous than you at all, Indeed Oh, Grandfather of Hasan and Husain",
        },
        words: [
          { word: "لَيْسَ", translations: { en: "there is not" } },
          { word: "أَزْكَى", translations: { en: "more righteous" } },
          { word: "مِنْكَ", translations: { en: "than you" } },
          { word: "أَصْلاً", translations: { en: "at all" } },
          { word: "قَطُّ", translations: { en: "ever" } },
          { word: "يَا", translations: { en: "Oh" } },
          { word: "جَدَّ", translations: { en: "Grandfather" } },
          { word: "الْحُسَيْنِ", translations: { en: "of Husayn" } },
        ],
        startTime: 668.5,
        endTime: 680, // Adjusted end time for this segment
      },
      {
        arabic: "فَعَلَيْكَ اللهُ صَلَّى دَائِمًا طُولَ الدُّهُورِ",
        translations: {
          en: "May Allah bestow His blessings on you, Always along the years and time",
        },
        words: [
          { word: "فَعَلَيْكَ", translations: { en: "upon you" } },
          { word: "اللهُ", translations: { en: "Allah" } },
          { word: "صَلَّى", translations: { en: "bestow blessings" } },
          { word: "دَائِمًا", translations: { en: "always" } },
          { word: "طُولَ", translations: { en: "throughout" } },
          { word: "الدُّهُورِ", translations: { en: "the ages" } },
        ],
        startTime: 680,
        endTime: 714,
      },
      {
        arabic: "يَا وَلِيَّ الْحَسَنَاتِ ياَرَفِيِعَ الدَّرَجَاتِ",
        translations: {
          en: "Oh, Master of all good deeds (Allah), Oh, the one who is high in status",
        },
        words: [
          { word: "يَا", translations: { en: "Oh" } },
          { word: "وَلِيَّ", translations: { en: "Master" } },
          { word: "الْحَسَنَاتِ", translations: { en: "of all good deeds" } },
          {
            word: "ياَرَفِيِعَ",
            translations: { en: "Oh, the one who is high" },
          },
          { word: "الدَّرَجَاتِ", translations: { en: "in status" } },
        ],
        startTime: 754.3,
        endTime: 766.5, // Adjusted end time for this segment
      },
      {
        arabic: "كَفِّرَنْ عَنِّي ذُنُوبِي وَاغْفِرَنْ لِي سَيِّئَاتِي",
        translations: {
          en: "Remove all my sins, And forgive me all my offences",
        },
        words: [
          { word: "كَفِّرَنْ", translations: { en: "Remove" } },
          { word: "عَنِّي", translations: { en: "from me" } },
          { word: "ذُنُوبِي", translations: { en: "my sins" } },
          { word: "وَاغْفِرَنْ", translations: { en: "and forgive" } },
          { word: "لِي", translations: { en: "me" } },
          { word: "سَيِّئَاتِي", translations: { en: "my offences" } },
        ],
        startTime: 766.5,
        endTime: 775,
      },
      {
        arabic: "أَنْتَ غَفَّارُ الْخَطَايَا وَالذُّنُوبِ الْمُوبِقَاتِ",
        translations: {
          en: "You are the Forgiver of all sins, and of all destructive sins",
        },
        words: [
          { word: "أَنْتَ", translations: { en: "You are" } },
          { word: "غَفَّارُ", translations: { en: "the Forgiver" } },
          { word: "الْخَطَايَا", translations: { en: "of sins" } },
          { word: "وَالذُّنُوبِ", translations: { en: "and sins" } },
          { word: "الْمُوبِقَاتِ", translations: { en: "destructive" } },
        ],
        startTime: 807.3,
        endTime: 819, // Adjusted end time for this segment
      },
      {
        arabic: "أَنْتَ سَتَّارُ الْمَسَاوِي وَمُقِيلُ الْعَثَرَاتِ",
        translations: {
          en: "You are the Hider of all defects, And the Remover of falls and slips",
        },
        words: [
          { word: "أَنْتَ", translations: { en: "You are" } },
          { word: "سَتَّارُ", translations: { en: "the Hider" } },
          { word: "الْمَسَاوِي", translations: { en: "of all defects" } },
          { word: "وَمُقِيلُ", translations: { en: "and the Remover" } },
          { word: "الْعَثَرَاتِ", translations: { en: "of falls and slips" } },
        ],
        startTime: 819,
        endTime: 828,
      },
      {
        arabic: "عَالِمُ السِّرِّ وَأَخْفَى مُسْتَجِيبُ الدَّعَوَاتِ",
        translations: {
          en: "You are the one who knows all secrets and hidden matters, The One who responds to invocations",
        },
        words: [
          { word: "عَالِمُ", translations: { en: "the one who knows" } },
          { word: "السِّرِّ", translations: { en: "all secrets" } },
          { word: "وَأَخْفَى", translations: { en: "and hidden matters" } },
          { word: "مُسْتَجِيبُ", translations: { en: "the One who responds" } },
          { word: "الدَّعَوَاتِ", translations: { en: "to invocations" } },
        ],
        startTime: 849.5,
        endTime: 860, // Adjusted end time for this segment
      },
      {
        arabic: "رَبَّنَا ارْحَمْنَا جَمِيعًا لِجَمِيعِ الصَّالِحَاتِ",
        translations: {
          en: "Oh, our Lord, bless all of us, For all kinds of good deeds",
        },
        words: [
          { word: "رَبَّنَا", translations: { en: "Oh, our Lord" } },
          { word: "ارْحَمْنَا", translations: { en: "bless us" } },
          { word: "جَمِيعًا", translations: { en: "all of us" } },
          { word: "لِجَمِيعِ", translations: { en: "for all" } },
          { word: "الصَّالِحَاتِ", translations: { en: "good deeds" } },
        ],
        startTime: 860,
        endTime: 871,
      },
    ],
    audioUrl: "https://od.lk/s/NjRfNDE4MTQ5OTdf/ashraqa-baith.mp3", // Optional audio URL if needed
  },
  "tala-al-badru-alayna-baith": {
    title: "Tala‘al Badru ‘Alayna",
    lines: [
      {
        arabic: "طَلَعَ الْبَدْرُ عَلَيْنَا مِنْ ثَنِيَّاتِ الْوِدَاعْ",
        translations: {
          en: "The full moon rose over us from the Pass of Wada.",
        },
        words: [
          { word: "طَلَعَ", translations: { en: "Rose" } },
          { word: "الْبَدْرُ", translations: { en: "The full moon" } },
          { word: "عَلَيْنَا", translations: { en: "Over us" } },
          { word: "مِنْ", translations: { en: "From" } },
          { word: "ثَنِيَّاتِ", translations: { en: "The Pass" } },
          { word: "الْوِدَاعْ", translations: { en: "Of Wada" } },
        ],
        startTime: 0,
        endTime: 9, // Adjusted end time
      },
      {
        arabic: "وَجَبَ الشَّكْرُ عَلَيْنَا مَا دَعَا لِلَّهِ دَاعْ",
        translations: {
          en: "Giving thanks is incumbent upon us as long as a caller calls to Allah.",
        },
        words: [
          { word: "وَجَبَ", translations: { en: "It is incumbent" } },
          { word: "الشَّكْرُ", translations: { en: "The thanks" } },
          { word: "عَلَيْنَا", translations: { en: "Upon us" } },
          { word: "مَا", translations: { en: "As long as" } },
          { word: "دَعَا", translations: { en: "A caller calls" } },
          { word: "لِلَّهِ", translations: { en: "To Allah" } },
          { word: "دَاعْ", translations: { en: "A caller" } },
        ],
        startTime: 10,
        endTime: 18, // Adjusted end time
      },
      {
        arabic: "أَيُّهَا الْمَبْعُوثُ فِيْنَا جِئْتَ بِالْأَمْرِ الْمُطَاعْ",
        translations: {
          en: "O he who has been sent to us, you came with a command that is obeyed.",
        },
        words: [
          { word: "أَيُّهَا", translations: { en: "O" } },
          {
            word: "الْمَبْعُوثُ",
            translations: { en: "He who has been sent" },
          },
          { word: "فِيْنَا", translations: { en: "To us" } },
          { word: "جِئْتَ", translations: { en: "You came" } },
          { word: "بِالْأَمْرِ", translations: { en: "With a command" } },
          { word: "الْمُطَاعْ", translations: { en: "That is obeyed" } },
        ],
        startTime: 18.1,
        endTime: 27, // Adjusted end time
      },
      {
        arabic: "جِئْتَ شَرَّفْتَ الْمَدِينَةُ مَرْحَباً يَا خَيْرَ دَاعْ",
        translations: {
          en: "You came and honoured Medina. Welcome, O best of callers.",
        },
        words: [
          { word: "جِئْتَ", translations: { en: "You came" } },
          { word: "شَرَّفْتَ", translations: { en: "And honoured" } },
          { word: "الْمَدِينَةُ", translations: { en: "Medina" } },
          { word: "مَرْحَباً", translations: { en: "Welcome" } },
          { word: "يَا", translations: { en: "O" } },
          { word: "خَيْرَ", translations: { en: "Best of" } },
          { word: "دَاعْ", translations: { en: "Callers" } },
        ],
        startTime: 27.1,
        endTime: 35, // Adjusted end time
      },
      {
        arabic: "مَرْحَباً يَا مُصْطَفَانَا نُورُكَ الْبَاهِي أَضَاءُ",
        translations: {
          en: "Welcome, O our chosen one. Your precious light shines.",
        },
        words: [
          { word: "مَرْحَباً", translations: { en: "Welcome" } },
          { word: "يَا", translations: { en: "O" } },
          { word: "مُصْطَفَانَا", translations: { en: "Our chosen one" } },
          { word: "نُورُكَ", translations: { en: "Your light" } },
          { word: "الْبَاهِي", translations: { en: "Precious" } },
          { word: "أَضَاءُ", translations: { en: "Shines" } },
        ],
        startTime: 35.1,
        endTime: 44, // Adjusted end time
      },
      {
        arabic: "رَغْمَ أَنْفِ الْمُلْحِدِينَ فَيْضُهُ عَمَّ الْبِقَاعْ",
        translations: {
          en: "Despite the unbelievers, His generous overflowing has encompassed all quarters.",
        },
        words: [
          { word: "رَغْمَ", translations: { en: "Despite" } },
          { word: "أَنْفِ", translations: { en: "The nose" } },
          {
            word: "الْمُلْحِدِينَ",
            translations: { en: "Of the unbelievers" },
          },
          {
            word: "فَيْضُهُ",
            translations: { en: "His generous overflowing" },
          },
          { word: "عَمَّ", translations: { en: "Has encompassed" } },
          { word: "الْبِقَاعْ", translations: { en: "All quarters" } },
        ],
        startTime: 44.1,
        endTime: 54, // Adjusted end time
      },
      {
        arabic: "صَفْوَةُ الْبَارِي مُحَمَّدٌ دُرَّةٌ لِّلْكَائِنَاتْ",
        translations: {
          en: "The elect one of the Creator, Muhammad, the pearl of all creation.",
        },
        words: [
          { word: "صَفْوَةُ", translations: { en: "The elect one" } },
          { word: "الْبَارِي", translations: { en: "Of the Creator" } },
          { word: "مُحَمَّدٌ", translations: { en: "Muhammad" } },
          { word: "دُرَّةٌ", translations: { en: "The pearl" } },
          { word: "لِّلْكَائِنَاتْ", translations: { en: "Of all creation" } },
        ],
        startTime: 70.9,
        endTime: 79, // Adjusted end time
      },
      {
        arabic: "مَدْحُهُ بَلْسَمْ لِرُوحِي وَلَهُ يَحْلُو السَّمَاعُ",
        translations: {
          en: "Praising him is a healing balm for my soul; it is sweet to hear.",
        },
        words: [
          { word: "مَدْحُهُ", translations: { en: "Praising him" } },
          { word: "بَلْسَمْ", translations: { en: "Is a healing balm" } },
          { word: "لِرُوحِي", translations: { en: "For my soul" } },
          { word: "وَلَهُ", translations: { en: "It is" } },
          { word: "يَحْلُو", translations: { en: "Sweet" } },
          { word: "السَّمَاعُ", translations: { en: "To hear" } },
        ],
        startTime: 79.1,
        endTime: 87, // Adjusted end time
      },
      {
        arabic: "أَشْرَقَتْ شَمْسُ الْكَمَالِ بِكَ يَا بَاهِي الجَمَالُ",
        translations: {
          en: "The sun of perfection rose with you, O possessor of splendid beauty.",
        },
        words: [
          { word: "أَشْرَقَتْ", translations: { en: "The rose" } },
          { word: "شَمْسُ", translations: { en: "The sun" } },
          { word: "الْكَمَالِ", translations: { en: "Of perfection" } },
          { word: "بِكَ", translations: { en: "With you" } },
          { word: "يَا", translations: { en: "O" } },
          { word: "بَاهِي", translations: { en: "Possessor of splendid" } },
          { word: "الجَمَالُ", translations: { en: "Beauty" } },
        ],
        startTime: 106,
        endTime: 115, // Adjusted end time
      },
      {
        arabic: "جَلَّ مَنْ سَوَّاكَ حَقًّا دَائِماً لِلْخَيْرِ سَاعْ",
        translations: {
          en: "Exalted is He who has made you in truth; you always hasten to that which is good.",
        },
        words: [
          { word: "جَلَّ", translations: { en: "Exalted" } },
          { word: "مَنْ", translations: { en: "Is He who" } },
          { word: "سَوَّاكَ", translations: { en: "Has made you" } },
          { word: "حَقًّا", translations: { en: "In truth" } },
          { word: "دَائِماً", translations: { en: "Always" } },
          { word: "لِلْخَيْرِ", translations: { en: "To that which is good" } },
          { word: "سَاعْ", translations: { en: "Hasten" } },
        ],
        startTime: 97.3,
        endTime: 108.0, // Adjusted end time
      },
    ],
    audioUrl:
      "https://od.lk/s/NjRfNDE4MTY2ODRf/Tala%20Al%20Badru%20%27Alayna%20By%20Syrian%20Munshids.mp3", // Optional audio URL if needed
  },
  "ya-akrama-baith": {
    title: "Ya Akraman Baith",
    lines: [
      {
        arabic:
          "مَوْلاَىَ صَلِّ وَسَلِّمْ دَائِمًا اَبَدًا\nعَلَى حَبِيْبِيكَ خَيْرٍ الْخَلْقِ كُلِّهِمِ",
        translations: {
          en: "My Master, descend peace and blessings continuously and eternally (non-existence)\nOn Your Beloved, the Best of All Creation.",
        },
        words: [
          { word: "مَوْلاَىَ", translations: { en: "My Master" } },
          { word: "صَلِّ", translations: { en: "Descend peace" } },
          { word: "وَسَلِّمْ", translations: { en: "And blessings" } },
          { word: "دَائِمًا", translations: { en: "Continuously" } },
          { word: "اَبَدًا", translations: { en: "And eternally" } },
          { word: "عَلَى", translations: { en: "On" } },
          { word: "حَبِيْبِيكَ", translations: { en: "Your Beloved" } },
          { word: "خَيْرٍ", translations: { en: "The Best of" } },
          { word: "الْخَلْقِ", translations: { en: "All Creation" } },
          { word: "كُلِّهِمِ", translations: { en: "Among them" } },
        ],
        startTime: 59,
        endTime: 75, // Adjusted end time
      },

      {
        arabic:
          "يَا أَكْرَمَ الْخَلْقِ مَا لِي مَنْ أَلُوذُ بِهِ\nسِوَاكَ عِنْدَ حُلُولِ الْحَادِثِ الْعَمِمِ",
        translations: {
          en: "O Noblest of Creation, whose protection can I seek but yours, when the Universal Event comes to pass?",
        },
        words: [
          { word: "يَا", translations: { en: "O" } },
          { word: "أَكْرَمَ", translations: { en: "Noblest" } },
          { word: "الْخَلْقِ", translations: { en: "Of Creation" } },
          { word: "مَا", translations: { en: "Whose" } },
          { word: "لِي", translations: { en: "Can I" } },
          { word: "مَنْ", translations: { en: "Seek" } },
          { word: "أَلُوذُ", translations: { en: "Protection" } },
          { word: "بِهِ", translations: { en: "But yours" } },
          { word: "سِوَاكَ", translations: { en: "When" } },
          { word: "عِنْدَ", translations: { en: "The" } },
          { word: "حُلُولِ", translations: { en: "Universal" } },
          { word: "الْحَادِثِ", translations: { en: "Event" } },
          { word: "الْعَمِمِ", translations: { en: "Comes to pass" } },
        ],
        startTime: 75.6,
        endTime: 91.3, // Adjusted end time
      },
      {
        arabic:
          "وَلَنْ يَضِيقَ رَسُولَ اللهِ جَاهُكَ بِي\nإِذَا الْكَرِيمُ تَجَلَّى بِاسْمِ مُنْتَقِمِ",
        translations: {
          en: "O Emissary of Allah, your rank will not be diminished by me when the Generous One appears, named as the Avenger.",
        },
        words: [
          { word: "وَلَنْ", translations: { en: "And will not" } },
          { word: "يَضِيقَ", translations: { en: "Be diminished" } },
          { word: "رَسُولَ", translations: { en: "O Emissary" } },
          { word: "اللهِ", translations: { en: "Of Allah" } },
          { word: "جَاهُكَ", translations: { en: "Your rank" } },
          { word: "بِي", translations: { en: "By me" } },
          { word: "إِذَا", translations: { en: "When" } },
          { word: "الْكَرِيمُ", translations: { en: "The Generous One" } },
          { word: "تَجَلَّى", translations: { en: "Appears" } },
          { word: "بِاسْمِ", translations: { en: "Named as" } },
          { word: "مُنْتَقِمِ", translations: { en: "The Avenger" } },
        ],
        startTime: 107.6,
        endTime: 123, // Adjusted end time
      },
      {
        arabic:
          "فَإِنَّ مِنْ جُودِكَ الدُّنْيَا وَضَرَّتَهَا\nوَمِنْ عُلُومِكَ عِلْمَ اللَّوْحِ وَالْقَلَمِ",
        translations: {
          en: "For this world and its companion the Next come from your bounty, and part of what you know is knowledge of the Tablet and Pen.",
        },
        words: [
          { word: "فَإِنَّ", translations: { en: "For" } },
          { word: "مِنْ", translations: { en: "This" } },
          { word: "جُودِكَ", translations: { en: "World" } },
          { word: "الدُّنْيَا", translations: { en: "And its" } },
          { word: "وَضَرَّتَهَا", translations: { en: "Companion the Next" } },
          { word: "وَمِنْ", translations: { en: "Come from" } },
          { word: "عُلُومِكَ", translations: { en: "Your bounty" } },
          { word: "عِلْمَ", translations: { en: "And part of" } },
          { word: "اللَّوْحِ", translations: { en: "What you know" } },
          {
            word: "وَالْقَلَمِ",
            translations: { en: "Is knowledge of the Tablet and Pen" },
          },
        ],
        startTime: 139.5,
        endTime: 155, // Adjusted end time
      },
      {
        arabic:
          "يَا نَفْسُ لَا تَقْنَطِي مِنْ زَلَّةٍ عَظُمَتْ\nإِنَّ الْكَبَائِرَ فِي الْغُفْرَانِ كَاللَّمَمِ",
        translations: {
          en: "O soul, despair not over a fault that is immense; Enormities, with divine forgiveness, are like minor errors.",
        },
        words: [
          { word: "يَا", translations: { en: "O" } },
          { word: "نَفْسُ", translations: { en: "Soul" } },
          { word: "لَا", translations: { en: "Do not" } },
          { word: "تَقْنَطِي", translations: { en: "Despair" } },
          { word: "مِنْ", translations: { en: "Over" } },
          { word: "زَلَّةٍ", translations: { en: "A fault" } },
          { word: "عَظُمَتْ", translations: { en: "That is immense" } },
          { word: "إِنَّ", translations: { en: "Indeed" } },
          { word: "الْكَبَائِرَ", translations: { en: "The enormities" } },
          { word: "فِي", translations: { en: "With" } },
          { word: "الْغُفْرَانِ", translations: { en: "Divine forgiveness" } },
          {
            word: "كَاللَّمَمِ",
            translations: { en: "Are like minor errors" },
          },
        ],
        startTime: 171.5,
        endTime: 186.5, // Adjusted end time
      },
      {
        arabic:
          "لَعَلَّ رَحْمَةَ رَبِّي حِينَ يَقْسِمُهَا\nتَأْتِي عَلَى حَسَبِ الْعِصْيَانِ فِي الْقِسَمِ",
        translations: {
          en: "Perchance my Lord’s mercy, when He apportions it, will be distributed in accordance with the measure of sins.",
        },
        words: [
          { word: "لَعَلَّ", translations: { en: "Perchance" } },
          { word: "رَحْمَةَ", translations: { en: "Mercy" } },
          { word: "رَبِّي", translations: { en: "Of my Lord" } },
          { word: "حِينَ", translations: { en: "When" } },
          { word: "يَقْسِمُهَا", translations: { en: "He apportions it" } },
          { word: "تَأْتِي", translations: { en: "Will come" } },
          { word: "عَلَى", translations: { en: "In accordance with" } },
          { word: "حَسَبِ", translations: { en: "The measure of" } },
          { word: "الْعِصْيَانِ", translations: { en: "Sins" } },
          { word: "فِي", translations: { en: "In" } },
          { word: "الْقِسَمِ", translations: { en: "The distribution" } },
        ],
        startTime: 203,
        endTime: 218.83, // Adjusted end time
      },
      {
        arabic:
          "يَا رَبِّ وَاجْعَلْ رَجَائِي غَيْرَ مُنْعَكِسٍ\nلَدَيْكَ وَاجْعَلْ حِسَابِي غَيْرَ مُنْخَرِمِ",
        translations: {
          en: "O my Lord, let not my hope in You be overturned and do not make my account devoid of value.",
        },
        words: [
          { word: "يَا", translations: { en: "O" } },
          { word: "رَبِّ", translations: { en: "My Lord" } },
          { word: "وَاجْعَلْ", translations: { en: "Let" } },
          { word: "رَجَائِي", translations: { en: "My hope" } },
          { word: "غَيْرَ", translations: { en: "Not" } },
          { word: "مُنْعَكِسٍ", translations: { en: "Overturned" } },
          { word: "لَدَيْكَ", translations: { en: "In You" } },
          { word: "وَاجْعَلْ", translations: { en: "And make" } },
          { word: "حِسَابِي", translations: { en: "My account" } },
          { word: "غَيْرَ", translations: { en: "Not" } },
          { word: "مُنْخَرِمِ", translations: { en: "Devoid of value" } },
        ],
        startTime: 235.08,
        endTime: 250.9, // Adjusted end time
      },
      {
        arabic:
          "وَالْطُفْ بِعَبْدِكَ فِي الدَّارَيْنِ إِنَّ لَهُ\nصَبْرًا مَتَى تَدْعُهُ الْأَهْوَالُ يَنْهَزِمِ",
        translations: {
          en: "Be gentle with Your servant in this life and the Next; for his patience flees when he is visited by terrors.",
        },
        words: [
          { word: "وَالْطُفْ", translations: { en: "And be gentle" } },
          { word: "بِعَبْدِكَ", translations: { en: "With Your servant" } },
          { word: "فِي", translations: { en: "In" } },
          {
            word: "الدَّارَيْنِ",
            translations: { en: "This life and the Next" },
          },
          { word: "إِنَّ", translations: { en: "For" } },
          { word: "لَهُ", translations: { en: "He has" } },
          { word: "صَبْرًا", translations: { en: "Patience" } },
          { word: "مَتَى", translations: { en: "When" } },
          { word: "تَدْعُهُ", translations: { en: "He is visited by" } },
          { word: "الْأَهْوَالُ", translations: { en: "Terrors" } },
          { word: "يَنْهَزِمِ", translations: { en: "Fleets" } },
        ],
        startTime: 267.01,
        endTime: 285.4, // Adjusted end time
      },
      {
        arabic:
          "وَأْذَنْ لِسُحْبِ صَلَاةٍ مِنْكَ دَائِمَةٍ\nعَلَى النَّبِيِّ بِمُنْهَلٍّ وَمُنْسَجِمِ",
        translations: {
          en: "And may clouds of Your blessings rain down constantly upon the Prophet, pouring down in abundance.",
        },
        words: [
          { word: "وَأْذَنْ", translations: { en: "And may grant" } },
          { word: "لِسُحْبِ", translations: { en: "To the clouds of" } },
          { word: "صَلَاةٍ", translations: { en: "Blessings" } },
          { word: "مِنْكَ", translations: { en: "From You" } },
          { word: "دَائِمَةٍ", translations: { en: "Constantly" } },
          { word: "عَلَى", translations: { en: "Upon" } },
          { word: "النَّبِيِّ", translations: { en: "The Prophet" } },
          { word: "بِمُنْهَلٍّ", translations: { en: "In abundance" } },
          { word: "وَمُنْسَجِمِ", translations: { en: "Pouring down" } },
        ],
        startTime: 303.5,
        endTime: 321.5, // Adjusted end time
      },
      {
        arabic:
          "وَالْآلِ وَالصَّحْبِ ثُمَّ التَّابِعِينَ فَهُمْ\nأَهْلُ التُّقَى وَالنَّقَى وَالْحِلْمِ وَالْكَرَمِ",
        translations: {
          en: "And to the Family and the Companions, and then the Followers—the people of Godfearingness, purity, forbearance and generosity.",
        },
        words: [
          { word: "وَالْآلِ", translations: { en: "And to the Family" } },
          { word: "وَالصَّحْبِ", translations: { en: "And the Companions" } },
          { word: "ثُمَّ", translations: { en: "And then" } },
          { word: "التَّابِعِينَ", translations: { en: "The Followers" } },
          { word: "فَهُمْ", translations: { en: "They are" } },
          { word: "أَهْلُ", translations: { en: "The people of" } },
          { word: "التُّقَى", translations: { en: "Godfearingness" } },
          { word: "وَالنَّقَى", translations: { en: "Purity" } },
          { word: "وَالْحِلْمِ", translations: { en: "Forbearance" } },
          { word: "وَالْكَرَمِ", translations: { en: "And Generosity" } },
        ],
        startTime: 339.5,
        endTime: 357, // Adjusted end time
      },
      {
        arabic:
          "مَا رَنَّحَتْ عَذَبَاتِ الْبَانِ رِيحُ صَبًا\nوَأَطْرَبَ الْعِيسَ حَادِي الْعِيسِ بِالنَّغَمِ",
        translations: {
          en: "For as long as the east wind stirs the branches of willows, and camel-drivers bring joy to their camels with melody.",
        },
        words: [
          { word: "مَا", translations: { en: "For as long as" } },
          { word: "رَنَّحَتْ", translations: { en: "The stirs" } },
          { word: "عَذَبَاتِ", translations: { en: "Of willows" } },
          { word: "الْبَانِ", translations: { en: "Branches" } },
          { word: "رِيحُ", translations: { en: "The wind" } },
          { word: "صَبًا", translations: { en: "Of the east" } },
          { word: "وَأَطْرَبَ", translations: { en: "And brings joy" } },
          { word: "الْعِيسَ", translations: { en: "To the camels" } },
          { word: "حَادِي", translations: { en: "Camel-drivers" } },
          { word: "الْعِيسِ", translations: { en: "The camels" } },
          { word: "بِالنَّغَمِ", translations: { en: "With melody" } },
        ],
        startTime: 375.5,
        endTime: 391.29, // Adjusted end time
      },
      {
        arabic:
          "ثُمَّ الرِّضَا عَنْ أَبِي بَكْرٍ وَعَنْ عُمَرَ\nوَعَنْ عَلِيٍّ وَعَنْ عُثْمَانَ ذِي الْكَرَمِ",
        translations: {
          en: "Then extend Your good-pleasure to Abū Bakr and to ʿUmar and to ‘Ali, and to ʿUthmān, the generous.",
        },
        words: [
          { word: "ثُمَّ", translations: { en: "Then" } },
          { word: "الرِّضَا", translations: { en: "Your good-pleasure" } },
          { word: "عَنْ", translations: { en: "To" } },
          { word: "أَبِي", translations: { en: "Abū" } },
          { word: "بَكْرٍ", translations: { en: "Bakr" } },
          { word: "وَعَنْ", translations: { en: "And to" } },
          { word: "عُمَرَ", translations: { en: "ʿUmar" } },
          { word: "وَعَنْ", translations: { en: "And to" } },
          { word: "عَلِيٍّ", translations: { en: "‘Ali" } },
          { word: "وَعَنْ", translations: { en: "And to" } },
          { word: "عُثْمَانَ", translations: { en: "ʿUthmān" } },
          { word: "ذِي", translations: { en: "The" } },
          { word: "الْكَرَمِ", translations: { en: "Generous" } },
        ],
        startTime: 407.7,
        endTime: 423.35, // Adjusted end time
      },
      {
        arabic:
          "سَعْدٍ سَعِيدٍ زُبَيْرٍ طَلْحَةٍ وَأَبِى\nعُبَيْدَةٍ وَابْنِ عَوْفٍ عَاشِرِ الْكَرَمِ",
        translations: {
          en: "And extend Your good-pleasure to Sa'd, Sa'eed, Zubayr, Talha, and Abu 'Ubaydah, and Ibn 'Awf, the tenth of the generous ones.",
        },
        words: [
          { word: "سَعْدٍ", translations: { en: "Sa'd" } },
          { word: "سَعِيدٍ", translations: { en: "Sa'eed" } },
          { word: "زُبَيْرٍ", translations: { en: "Zubayr" } },
          { word: "طَلْحَةٍ", translations: { en: "Talha" } },
          { word: "وَأَبِى", translations: { en: "And Abu" } },
          { word: "عُبَيْدَةٍ", translations: { en: "'Ubaydah" } },
          { word: "وَابْنِ", translations: { en: "And Ibn" } },
          { word: "عَوْفٍ", translations: { en: "'Awf" } },
          { word: "عَاشِرِ", translations: { en: "The tenth of" } },
          { word: "الْكَرَمِ", translations: { en: "The generous ones" } },
        ],
        startTime: 439.5,
        endTime: 455.5, // Adjusted end time
      },
      {
        arabic:
          "يَا رَبِّ بِالْمُصْطَفَى بَلِّغْ مَقَاصِدَنَا\nوَاغْفِرْ لَنَا مَا مَضَى يَا وَاسِعَ الْكَرَمِ",
        translations: {
          en: "O Lord, by the Chosen One, allow us to attain our hopes\nAnd forgive us for what has gone past, O Vastly Generous.",
        },
        words: [
          { word: "يَا", translations: { en: "O" } },
          { word: "رَبِّ", translations: { en: "Lord" } },
          { word: "بِالْمُصْطَفَى", translations: { en: "By the Chosen One" } },
          { word: "بَلِّغْ", translations: { en: "Allow us to attain" } },
          { word: "مَقَاصِدَنَا", translations: { en: "Our hopes" } },
          { word: "وَاغْفِرْ", translations: { en: "And forgive" } },
          { word: "لَنَا", translations: { en: "Us" } },
          { word: "مَا", translations: { en: "What" } },
          { word: "مَضَى", translations: { en: "Has gone past" } },
          { word: "يَا", translations: { en: "O" } },
          { word: "وَاسِعَ", translations: { en: "Vastly" } },
          { word: "الْكَرَمِ", translations: { en: "Generous" } },
        ],
        startTime: 471.8,
        endTime: 503.9, // Adjusted end time
      },
    ],
    audioUrl:
      "https://od.lk/s/NjRfNDE4MTY2OTJf/Qasweedathul%20burdah%20%20Ya%20akrama%20baith%20%20Hafiz%20Swadiq%20Ali%20Fazili.mp3",
  },
};

export default allBaiths;
