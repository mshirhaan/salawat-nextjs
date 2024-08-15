import { db } from "../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  CollectionReference,
} from "firebase/firestore";

// Define the type for the 'collectionRef' parameter
async function clearCollection(collectionRef: CollectionReference) {
  const snapshot = await getDocs(collectionRef);
  const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref));
  await Promise.all(deletePromises);
}

async function seed() {
  try {
    const salawatCollection = collection(db, "salawat");

    // Clear existing data
    await clearCollection(salawatCollection);

    // Add first Salawat
    await addDoc(salawatCollection, {
      title: "Salawat Example",
      lines: [
        {
          arabic:
            "اللَّهُمَّ صَلِّ عَلَىٰ سَيِّدِنَا مُحَمَّدٍ ❁ الْفَاتِحِ لِمَا أُغْلِقَ ❁ وَالْخَاتِمِ لِمَا سَبَقَ ❁ نَاصِرِ الْحَقِّ بِالْحَقِّ ❁ وَالْهَادِي إِلَىٰ صِرَاطِكَ الْمُسْتَقِيمِ ❁ وَعَلَىٰ آلِهِ حَقَّ قَدْرِهِ وَمِقْدَارِهِ الْعَظِيمِ",
          translations: {
            en: "O Allah, send prayers upon our master Muhammad, the opener of what was closed, and the seal of what had preceded, the helper of the truth by the Truth, and the guide to Your straight path. May Allah send prayers upon his Family according to his greatness and magnificent rank.",
            fr: "Ô Allah, envoie des prières sur notre maître Muhammad, l’ouvreur de ce qui était fermé, et le sceau de ce qui avait précédé, l’aide de la vérité par la Vérité, et le guide vers Ton droit chemin. Qu'Allah envoie des prières sur sa famille selon sa grandeur et son rang magnifique.",
            es: "Oh Allah, envía oraciones sobre nuestro maestro Muhammad, el que abre lo que estaba cerrado, y el sello de lo que había precedido, el ayudante de la verdad por la Verdad, y el guía hacia Tu camino recto. Que Allah envíe oraciones sobre su Familia según su grandeza y rango magnífico.",
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
            { word: "❁", translations: { en: "", fr: "", es: "" } },
            {
              word: "الْفَاتِحِ",
              translations: {
                en: "the opener",
                fr: "l’ouvreur",
                es: "el que abre",
              },
            },
            {
              word: "لِمَا",
              translations: { en: "of what", fr: "de ce qui", es: "de lo que" },
            },
            {
              word: "أُغْلِقَ",
              translations: {
                en: "was closed",
                fr: "était fermé",
                es: "estaba cerrado",
              },
            },
            { word: "❁", translations: { en: "", fr: "", es: "" } },
            {
              word: "وَالْخَاتِمِ",
              translations: {
                en: "and the seal",
                fr: "et le sceau",
                es: "y el sello",
              },
            },
            {
              word: "لِمَا",
              translations: { en: "of what", fr: "de ce qui", es: "de lo que" },
            },
            {
              word: "سَبَقَ",
              translations: {
                en: "had preceded",
                fr: "avait précédé",
                es: "había precedido",
              },
            },
            { word: "❁", translations: { en: "", fr: "", es: "" } },
            {
              word: "نَاصِرِ",
              translations: {
                en: "the helper",
                fr: "l’aide",
                es: "el ayudante",
              },
            },
            {
              word: "الْحَقِّ",
              translations: {
                en: "of the truth",
                fr: "de la vérité",
                es: "de la verdad",
              },
            },
            {
              word: "بِالْحَقِّ",
              translations: {
                en: "by the Truth",
                fr: "par la Vérité",
                es: "por la Verdad",
              },
            },
            { word: "❁", translations: { en: "", fr: "", es: "" } },
            {
              word: "وَالْهَادِي",
              translations: {
                en: "and the guide",
                fr: "et le guide",
                es: "y el guía",
              },
            },
            {
              word: "إِلَىٰ",
              translations: { en: "to", fr: "vers", es: "hacia" },
            },
            {
              word: "صِرَاطِكَ",
              translations: {
                en: "Your straight path",
                fr: "Ton droit chemin",
                es: "Tu camino recto",
              },
            },
            {
              word: "الْمُسْتَقِيمِ",
              translations: { en: "straight", fr: "droit", es: "recto" },
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
              word: "حَقَّ",
              translations: { en: "according to", fr: "selon", es: "según" },
            },
            {
              word: "قَدْرِهِ",
              translations: {
                en: "his greatness",
                fr: "sa grandeur",
                es: "su grandeza",
              },
            },
            {
              word: "وَمِقْدَارِهِ",
              translations: {
                en: "and magnificent rank",
                fr: "et son rang magnifique",
                es: "y rango magnífico",
              },
            },
            {
              word: "الْعَظِيمِ",
              translations: {
                en: "magnificent",
                fr: "magnifique",
                es: "magnífico",
              },
            },
          ],
        },
      ],
    });

    // Add second Salawat (Salat al-Tibbiyya)
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
              translations: { en: "of bodies", fr: "des corps", es: "de los cuerpos" },
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
              translations: { en: "of vision", fr: "de la vision", es: "de la visión" },
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
