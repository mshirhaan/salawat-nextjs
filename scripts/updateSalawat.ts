import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

async function seed() {
  try {
    const salawatCollection = collection(db, "salawat");


    await addDoc(salawatCollection, {
      title: "Salat al-Tibbiyya",
      lines: [
        {
          arabic:
            "اللَّهُمَّ صَلِّ عَلَىٰ سَيِّدِنَا مُحَمَّدٍ طِبِّ الْقُلُوبِ وَدَوَائِهَا ❁ وَعَافِيَةِ الْأَبدَانِ وَشِفَائِهَا ❁ وَنُورِ الْأَبصَارِ وَضِيَائِهَا ❁ وَعَلَىٰ آلِهِ وَصَحْبِهِ وَسَلِّمْ",
          translations: {
            en: "O Allah, send prayers and peace upon our Master Muhammad, the medicine of hearts and their treatment, the soundness of bodies and their cure, the light of vision and its illumination, and [send blessings] upon his family and his Companions.",
            fr: "Ô Allah, envoie des prières et la paix sur notre Maître Muhammad, le remède des cœurs et leur traitement, la santé des corps et leur guérison, la lumière de la vision et son illumination, et [envoie des bénédictions] sur sa famille et ses Compagnons.",
            es: "Oh Allah, envía oraciones y paz sobre nuestro Maestro Muhammad, la medicina de los corazones y su tratamiento, la salud de los cuerpos y su cura, la luz de la visión y su iluminación, y [envía bendiciones] sobre su familia y sus Compañeros.",
          },
          words: [
            {
              word: "اللَّهُمَّ",
              translations: { en: "O Allah", fr: "Ô Allah", es: "Oh Allah" },
            },
            {
              word: "صَلِّ",
              translations: {
                en: "send prayers",
                fr: "envoie des prières",
                es: "envía oraciones",
              },
            },
            {
              word: "عَلَىٰ",
              translations: { en: "upon", fr: "sur", es: "sobre" },
            },
            {
              word: "سَيِّدِنَا",
              translations: {
                en: "our master",
                fr: "notre maître",
                es: "nuestro maestro",
              },
            },
            {
              word: "مُحَمَّدٍ",
              translations: { en: "Muhammad", fr: "Muhammad", es: "Muhammad" },
            },
            {
              word: "طِبِّ",
              translations: {
                en: "medicine",
                fr: "remède",
                es: "medicina",
              },
            },
            {
              word: "الْقُلُوبِ",
              translations: { en: "hearts", fr: "cœurs", es: "corazones" },
            },
            {
              word: "وَدَوَائِهَا",
              translations: {
                en: "and their treatment",
                fr: "et leur traitement",
                es: "y su tratamiento",
              },
            },
            { word: "❁", translations: { en: "", fr: "", es: "" } },
            {
              word: "وَعَافِيَةِ",
              translations: {
                en: "the soundness",
                fr: "la santé",
                es: "la salud",
              },
            },
            {
              word: "الْأَبدَانِ",
              translations: {
                en: "of bodies",
                fr: "des corps",
                es: "de los cuerpos",
              },
            },
            {
              word: "وَشِفَائِهَا",
              translations: {
                en: "and their cure",
                fr: "et leur guérison",
                es: "y su cura",
              },
            },
            { word: "❁", translations: { en: "", fr: "", es: "" } },
            {
              word: "وَنُورِ",
              translations: {
                en: "the light",
                fr: "la lumière",
                es: "la luz",
              },
            },
            {
              word: "الْأَبصَارِ",
              translations: {
                en: "of vision",
                fr: "de la vision",
                es: "de la visión",
              },
            },
            {
              word: "وَضِيَائِهَا",
              translations: {
                en: "and its illumination",
                fr: "et son illumination",
                es: "y su iluminación",
              },
            },
            { word: "❁", translations: { en: "", fr: "", es: "" } },
            {
              word: "وَعَلَىٰ",
              translations: { en: "and upon", fr: "et sur", es: "y sobre" },
            },
            {
              word: "آلِهِ",
              translations: {
                en: "his Family",
                fr: "sa famille",
                es: "su Familia",
              },
            },
            {
              word: "وَصَحْبِهِ",
              translations: {
                en: "and his Companions",
                fr: "et ses Compagnons",
                es: "y sus Compañeros",
              },
            },
            {
              word: "وَسَلِّمْ",
              translations: {
                en: "and peace",
                fr: "et la paix",
                es: "y la paz",
              },
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
