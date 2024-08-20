import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

async function seed() {
  try {
    const salawatCollection = collection(db, "salawat");


    await addDoc(salawatCollection, {
      title: "Friday After Asr Salawat for 80 YEARS OF WORSHIP & FORGIVENESS OF 80 YEARS OF SIN",
      lines: [
        {
          arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدِنِ النَّبِيِّ الْأُمِّيِّ وَعَلَى آلِهِ وَسَلَّمْ تَسْلِيمًا",
          translations: {
            en: "O Allah shower your mercy upon Muhammad, the unlettered Prophet, and upon his family and grant them best of peace."
          },
          words: [
            {
              word: "اللَّهُمَّ",
              translations: { en: "O Allah" }
            },
            {
              word: "صَلِّ",
              translations: { en: "shower your mercy" }
            },
            {
              word: "عَلَى",
              translations: { en: "upon" }
            },
            {
              word: "مُحَمَّدِنِ",
              translations: { en: "Muhammad" }
            },
            {
              word: "النَّبِيِّ",
              translations: { en: "the Prophet" }
            },
            {
              word: "الْأُمِّيِّ",
              translations: { en: "the unlettered" }
            },
            {
              word: "وَعَلَى",
              translations: { en: "and upon" }
            },
            {
              word: "آلِهِ",
              translations: { en: "his family" }
            },
            {
              word: "وَسَلَّمْ",
              translations: { en: "and grant them peace" }
            },
            {
              word: "تَسْلِيمًا",
              translations: { en: "best of peace" }
            }
          ]
        }
      ]
    });
    console.log("Salawat added successfully!");
  } catch (error) {
    console.error("Error adding Salawat: ", error);
  }
}

seed();
