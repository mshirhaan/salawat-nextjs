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

    // Add new data
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

    console.log("Salawat data added!");
  } catch (error) {
    console.error("Error adding Salawat data:", error);
  }
}

seed();
