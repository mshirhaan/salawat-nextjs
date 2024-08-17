import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

async function seed() {
  try {
    const salawatCollection = collection(db, "salawat");

    await addDoc(salawatCollection, {
      "title": "Salawat Uli 'l-'Azam",
      "lines": [
        {
          "arabic": "اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَ سَيِّدِنَا آدَمَ وَ سَيِّدِنَا نُوْحٍ وَسَيِّدِنَا إِبْرَاهِيمَ وَ سَيِّدِنَا مُوسَى وَسَيِّدِنَا عِيسَى وَمَا بَيْنَهُمْ مِنَ النَّبِيِّينَ وَالْمُرْسَلِينَ صَلَوَاتُ اللَّهِ وَسَلَامُهُ عَلَيْهِمْ أَجْمَعِينَ",
          "translations": {
            "en": "O Allah, send prayers upon our masters; Muhammad, Adam, Nuh, Ibrahim, Musa, Isa and upon all the Prophets and Messengers that came amongst them. May the prayers and salutations of Allah be upon them all."
          },
          "words": [
            {
              "word": "اللَّهُمَّ",
              "translations": { "en": "O Allah" }
            },
            {
              "word": "صَلِّ",
              "translations": { "en": "send prayers" }
            },
            {
              "word": "عَلَى",
              "translations": { "en": "upon" }
            },
            {
              "word": "سَيِّدِنَا",
              "translations": { "en": "our master" }
            },
            {
              "word": "مُحَمَّدٍ",
              "translations": { "en": "Muhammad" }
            },
            {
              "word": "و",
              "translations": { "en": "and" }
            },
            {
              "word": "سَيِّدِنَا",
              "translations": { "en": "our master" }
            },
            {
              "word": "آدَمَ",
              "translations": { "en": "Adam" }
            },
            {
              "word": "و",
              "translations": { "en": "and" }
            },
            {
              "word": "سَيِّدِنَا",
              "translations": { "en": "our master" }
            },
            {
              "word": "نُوْحٍ",
              "translations": { "en": "Nuh" }
            },
            {
              "word": "و",
              "translations": { "en": "and" }
            },
            {
              "word": "سَيِّدِنَا",
              "translations": { "en": "our master" }
            },
            {
              "word": "إِبْرَاهِيمَ",
              "translations": { "en": "Ibrahim" }
            },
            {
              "word": "و",
              "translations": { "en": "and" }
            },
            {
              "word": "سَيِّدِنَا",
              "translations": { "en": "our master" }
            },
            {
              "word": "مُوسَى",
              "translations": { "en": "Musa" }
            },
            {
              "word": "و",
              "translations": { "en": "and" }
            },
            {
              "word": "سَيِّدِنَا",
              "translations": { "en": "our master" }
            },
            {
              "word": "عِيسَى",
              "translations": { "en": "Isa" }
            },
            {
              "word": "و",
              "translations": { "en": "and" }
            },
            {
              "word": "مَا",
              "translations": { "en": "all that" }
            },
            {
              "word": "بَيْنَهُمْ",
              "translations": { "en": "between them" }
            },
            {
              "word": "مِنَ",
              "translations": { "en": "from" }
            },
            {
              "word": "النَّبِيِّينَ",
              "translations": { "en": "the Prophets" }
            },
            {
              "word": "و",
              "translations": { "en": "and" }
            },
            {
              "word": "الْمُرْسَلِينَ",
              "translations": { "en": "the Messengers" }
            },
            {
              "word": "صَلَوَاتُ",
              "translations": { "en": "prayers" }
            },
            {
              "word": "اللَّهِ",
              "translations": { "en": "of Allah" }
            },
            {
              "word": "و",
              "translations": { "en": "and" }
            },
            {
              "word": "سَلَامُهُ",
              "translations": { "en": "salutations" }
            },
            {
              "word": "عَلَيْهِمْ",
              "translations": { "en": "upon them" }
            },
            {
              "word": "أَجْمَعِينَ",
              "translations": { "en": "all" }
            }
          ]
        }
      ]
    }
    );
    console.log("Salawat added successfully!");
  } catch (error) {
    console.error("Error adding Salawat: ", error);
  }
}

seed();
