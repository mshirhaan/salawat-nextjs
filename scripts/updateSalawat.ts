import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

async function seed() {
  try {
    const salawatCollection = collection(db, "salawat");

    await addDoc(salawatCollection, {
      title: "Allahumma Salli wa Sallim 'ala Nabiyyina Muhammad",
      lines: [
        {
          arabic: "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلىٰ نَبِيِّنَا مُحَمَّدٍ",
          transliteration: "Allahumma Salli wa Sallim 'ala Nabiyyina Muhammad",
          translations: {
            en: "O Allah, send prayers and peace upon our Prophet Muhammad.",
          },
          words: [
            {
              word: "اللَّهُمَّ",
              translations: { en: "O Allah" },
              transliteration: "Allahumma",
            },
            {
              word: "صَلِّ",
              translations: {
                en: "send prayers",
              },
              transliteration: "Salli",
            },
            {
              word: "وَسَلِّمْ",
              translations: {
                en: "and peace",
              },
              transliteration: "wa Sallim",
            },
            {
              word: "عَلىٰ",
              translations: { en: "upon" },
              transliteration: "'ala",
            },
            {
              word: "نَبِيِّنَا",
              translations: {
                en: "our Prophet",
              },
              transliteration: "Nabiyyina",
            },
            {
              word: "مُحَمَّدٍ",
              translations: { en: "Muhammad" },
              transliteration: "Muhammad",
            },
          ],
        },
      ],
    });

    console.log("Salawat added successfully!");
  } catch (error) {
    console.error("Error adding Salawat: ", error);
  }
}

seed();
