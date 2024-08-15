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

    await addDoc(salawatCollection, {
      title: "Salat al-Ali al-Qadar",
      lines: [
        {
          arabic:
            "اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ عَلَىٰ سَيِّدِنَا مُحَمَّدٍ النَّبِيِّ الْأُمِّيِّ الْحَبِيبِ الْعَالِي الْقَدرِ الْعَظِيمِ الْجَاهِ وَعَلَىٰ آلِهِ وَصَحْبِهِ وَسَلِّمْ",
          translations: {
            en: "O Allah, send salutations, peace and blessings upon our Master Muhammad, the Prophetic source, the Beloved of Great Worth and standing, and upon his Family and Companions.",
            fr: "Ô Allah, envoie des salutations, la paix et des bénédictions sur notre maître Muhammad, la source prophétique, le Bien-Aimé de grande valeur et de stature, et sur sa famille et ses compagnons.",
            es: "Oh Allah, envía saludos, paz y bendiciones sobre nuestro Maestro Muhammad, la fuente profética, el Amado de Gran Valor y estatura, y sobre su Familia y Compañeros.",
          },
          words: [
            {
              word: "اللَّهُمَّ",
              translations: { en: "O Allah", fr: "Ô Allah", es: "Oh Allah" },
            },
            {
              word: "صَلِّ",
              translations: {
                en: "send salutations",
                fr: "envoie des salutations",
                es: "envía saludos",
              },
            },
            {
              word: "وَسَلِّمْ",
              translations: {
                en: "and peace",
                fr: "et la paix",
                es: "y paz",
              },
            },
            {
              word: "وَبَارِكْ",
              translations: {
                en: "and blessings",
                fr: "et des bénédictions",
                es: "y bendiciones",
              },
            },
            {
              word: "عَلَىٰ",
              translations: { en: "upon", fr: "sur", es: "sobre" },
            },
            {
              word: "سَيِّدِنَا",
              translations: {
                en: "our Master",
                fr: "notre Maître",
                es: "nuestro Maestro",
              },
            },
            {
              word: "مُحَمَّدٍ",
              translations: { en: "Muhammad", fr: "Muhammad", es: "Muhammad" },
            },
            {
              word: "النَّبِيِّ",
              translations: {
                en: "the Prophetic source",
                fr: "la source prophétique",
                es: "la fuente profética",
              },
            },
            {
              word: "الْأُمِّيِّ",
              translations: {
                en: "the Unlettered",
                fr: "l'analphabète",
                es: "el iletrado",
              },
            },
            {
              word: "الْحَبِيبِ",
              translations: {
                en: "the Beloved",
                fr: "le Bien-Aimé",
                es: "el Amado",
              },
            },
            {
              word: "الْعَالِي",
              translations: { en: "of Great", fr: "de Grande", es: "de Gran" },
            },
            {
              word: "الْقَدرِ",
              translations: { en: "Worth", fr: "Valeur", es: "Valor" },
            },
            {
              word: "الْعَظِيمِ",
              translations: {
                en: "and standing",
                fr: "et stature",
                es: "y estatura",
              },
            },
            {
              word: "الْجَاهِ",
              translations: {
                en: "and stature",
                fr: "et stature",
                es: "y estatura",
              },
            },
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
                en: "and Companions",
                fr: "et ses Compagnons",
                es: "y Compañeros",
              },
            },
            {
              word: "وَسَلِّمْ",
              translations: {
                en: "and peace",
                fr: "et la paix",
                es: "y paz",
              },
            },
          ],
        },
      ],
    });

    await addDoc(salawatCollection, {
      title: "Salawat Nariya",
      lines: [
        {
          arabic:
            "اللَّهُمَّ صَلِّ صَلَاةً كَامِلَةً ❁ وَسَلِّمْ سَلَامًا تَامًّا ❁ عَلَىٰ سَيِّدِنَا مُحَمَّدٍ الَّذِي تَنْحَلُّ بِهِ الْعُقَدُ ❁ وَتَنْفَرِجُ بِهِ الْكُرَبُ ❁ وَتُقْضَىٰ بِهِ الْحَوَائِجُ ❁ وَتُنَالُ بِهِ الرَّغَائِبُ وَحُسْنُ الْخَوَاتِمِ ❁ وَيُسْتَسْقَى الْغَمَامُ بِوَجْهِهِ الْكَرِيمِ ❁ وَعَلىٰ آلِهِ وَصَحْبِهِ ❁ فِي كُلِّ لَمْحَةٍ وَنَفَسٍ بِعَدَدِ كُلِّ مَعْلُومٍ لَكَ",
          translations: {
            en: "O Allah, send a perfect prayer and complete greeting of peace upon our master Muhammad — the one by whom problems are solved, and anxieties are relieved, and needs are fulfilled, and aspirations are attained and good endings are received, and by whose noble face the clouds give rain — and upon his Family and Companions, with every glance and every breath, by the number of everything that is known to You.",
          },
          words: [
            {
              word: "اللَّهُمَّ",
              translations: { en: "O Allah" },
            },
            {
              word: "صَلِّ",
              translations: { en: "send a prayer" },
            },
            {
              word: "صَلَاةً",
              translations: { en: "prayer" },
            },
            {
              word: "كَامِلَةً",
              translations: { en: "perfect" },
            },
            {
              word: "وَسَلِّمْ",
              translations: { en: "and peace" },
            },
            {
              word: "سَلَامًا",
              translations: { en: "greeting of peace" },
            },
            {
              word: "تَامًّا",
              translations: { en: "complete" },
            },
            {
              word: "عَلَىٰ",
              translations: { en: "upon" },
            },
            {
              word: "سَيِّدِنَا",
              translations: { en: "our master" },
            },
            {
              word: "مُحَمَّدٍ",
              translations: { en: "Muhammad" },
            },
            {
              word: "الَّذِي",
              translations: { en: "the one by whom" },
            },
            {
              word: "تَنْحَلُّ",
              translations: { en: "problems are solved" },
            },
            {
              word: "بِهِ",
              translations: { en: "by" },
            },
            {
              word: "الْعُقَدُ",
              translations: { en: "the problems" },
            },
            {
              word: "وَتَنْفَرِجُ",
              translations: { en: "and anxieties are relieved" },
            },
            {
              word: "بِهِ",
              translations: { en: "by" },
            },
            {
              word: "الْكُرَبُ",
              translations: { en: "the anxieties" },
            },
            {
              word: "وَتُقْضَىٰ",
              translations: { en: "and needs are fulfilled" },
            },
            {
              word: "بِهِ",
              translations: { en: "by" },
            },
            {
              word: "الْحَوَائِجُ",
              translations: { en: "the needs" },
            },
            {
              word: "وَتُنَالُ",
              translations: { en: "and aspirations are attained" },
            },
            {
              word: "بِهِ",
              translations: { en: "by" },
            },
            {
              word: "الرَّغَائِبُ",
              translations: { en: "the aspirations" },
            },
            {
              word: "وَحُسْنُ",
              translations: { en: "and good" },
            },
            {
              word: "الْخَوَاتِمِ",
              translations: { en: "endings" },
            },
            {
              word: "وَيُسْتَسْقَى",
              translations: { en: "and by" },
            },
            {
              word: "الْغَمَامُ",
              translations: { en: "the clouds" },
            },
            {
              word: "بِوَجْهِهِ",
              translations: { en: "by his noble face" },
            },
            {
              word: "الْكَرِيمِ",
              translations: { en: "the noble" },
            },
            {
              word: "وَعَلىٰ",
              translations: { en: "and upon" },
            },
            {
              word: "آلِهِ",
              translations: { en: "his Family" },
            },
            {
              word: "وَصَحْبِهِ",
              translations: { en: "and Companions" },
            },
            {
              word: "فِي",
              translations: { en: "with" },
            },
            {
              word: "كُلِّ",
              translations: { en: "every" },
            },
            {
              word: "لَمْحَةٍ",
              translations: { en: "glance" },
            },
            {
              word: "وَنَفَسٍ",
              translations: { en: "breath" },
            },
            {
              word: "بِعَدَدِ",
              translations: { en: "by the number of" },
            },
            {
              word: "كُلِّ",
              translations: { en: "everything" },
            },
            {
              word: "مَعْلُومٍ",
              translations: { en: "that is known" },
            },
            {
              word: "لَكَ",
              translations: { en: "to You" },
            },
          ],
        },
      ],
    });

    await addDoc(salawatCollection, {
      title: "Salawat Taj",
      lines: [
        {
          arabic:
            "اللَّهُمَّ صَلِّ عَلَىٰ سَيِّدِنَا وَمَوْلَانَا مُحَمَّدٍ ❁ صَاحِبِ التَّاجِ وَالْمِعْرَاجِ وَالْبُرَاقِ وَالْعَلَمِ ❁ دَافِعِ الْبَلآءِ وَالْوَبَآءِ وَالْقَحْطِ وَالْمَرَضِ وَالْأَلَمِ ❁ اِسْمُهُ مَكْتُوبٌ مَرْفُوعٌ مَشْفُوعٌ مَنْقُوشٌ فِي اللَّوْحِ وَالْقَلَمِ ❁ سَيِّدِ الْعَرَبِ وَالْعَجَمِ ❁ جِسْمُهُ مُقَدَّسٌ مُعَطَّرٌ مُطَهَّرٌ مُنَوَّرٌ فِي الْبَيْتِ وَالْحَرَمِ ❁ شَمْسِ الضُّحَى ❁ بَدْرِ الدُّجَى ❁ صَدْرِ الْعُلَى ❁ نُورِ الْهُدَى ❁ كَهْفِ الْوَرَى ❁ مِصْبَاحِ الظُّلَمِ ❁ جَمِيلِ الشِّيَمِ ❁ شَفِيعِ الْأُمَمِ ❁ صَاحِبِ الْجُودِ وَالْكَرَمِ ❁ وَاللهُ عَاصِمُهُ ❁ وَجِبْرِيلُ خَادِمُهُ ❁ وَالْبُرَاقُ مَرْكَبُهُ ❁ وَالْمِعْرَاجُ سَفَرُهُ ❁ وَسِدْرَتُ الْمُنْتَهَى مَقَامُهُ ❁ وَقَابَ قَوْسَيْنِ مَطْلُوبُهُ ❁ وَالْمَطْلُوبُ مَقْصُودُهُ ❁ وَالْمَقْصُودُ مَوْجُودُهُ ❁ سَيِّدِ الْمُرْسَلِينَ ❁ خَاتِمِ النَّبِيِّينَ ❁ شَفِيعِ الْمُذْنِبِينَ ❁ أَنِيسِ الْغَرِيبِينَ ❁ رَحْمَةٍ لِلْعَالَمِينَ ❁ رَاحَةِ الْعَاشِقِينَ ❁ مُرَادِ الْمُشْتَاقِينَ ❁ شَمْسِ الْعَارِفِينَ ❁ سِرَاجِ السَّالِكِينَ ❁ مِصْبَاحِ الْمُقَرَّبِينَ ❁ مُحِبِّ الْفُقَرَاءِ وَالْغُرَبَاءِ وَالْمَسَاكِينِ ❁ سَيِّدِ الثَّقَلَيْنِ ❁ نَبِيِّ الْحَرَمَيْنِ ❁ إِمَامِ الْقِبْلَتَيْنِ ❁ وَسِيلَتِنَا فِي الدَّارَيْنِ ❁ صَاحِبِ قَابَ قَوْسَيْنِ ❁ مَحْبُوبِ رَبِّ الْمَشْرِقَيْنِ وَالْمَغْرِبَيْنِ ❁ جَدِّ الْحَسَنِ وَالْحُسَيْنِ ❁ مَوْلَانَا وَمَوْلَى الثَّقَلَيْنِ ❁ أَبِي الْقَاسِمِ مُحَمَّدِ بْنِ عَبْدِ اللهِ ❁ نُورٍ مِنْ نُورِ اللهِ ❁ يَا أَيُّهَا الْمُشْتَاقُونَ بِنُورِ جَمَالِهِ ❁ صَلّوُا عَلَيْهِ وَآلِهِ وَأَصْحَابِهِ وَسَلِّمُوا تَسْلِيمًا",
          translations: {
            en: "O Allah, send prayers upon our master and patron Muhammad, the possessor of the crown, the Mi’raj, the Buraq and the flag, the repeller of hardships, epidemics, droughts, diseases and pain. His name is written, exalted, combined and engraved upon the tablet and pen. The master of both Arabs and non-Arabs, whose body is sanctified, fragrant, pure and illuminated in the House and the Sanctuary.\n\nHe is the bright sun, the full moon of the dark night, the foremost in loftiness, the light of guidance, the cave of refuge for mankind, the lantern in darkness. He is of beautiful character, the intercessor for nations, the possessor of graciousness and generosity.\n\nAllah is his protector, Gabriel his servant, the Buraq his mount, the Mi’raj his voyage, the Lote Tree of the Uppermost Limit his station, two bows’ length or nearer the object of his quest; that which is sought is that which he desires and that which he desires is that which he finds.\n\nHe is the master of the Messengers, the Seal of the Prophets, the intercessor of sinners, the comforter of strangers, the mercy for the worlds, the delight of divine lovers, the object of yearning, the sun of the gnostics, the lamp for travellers upon the path to Allah, the lantern of those brought near, the lover of the poor, the strangers and the destitute.\n\nThe master of the two weighty things (humans and Jinn), the Prophet of the two sanctuaries, the Imam of the two Qiblas, our means of salvation in both abodes, the one at two bows length, the beloved of the Lord of the two Easts and the two Wests, the grandfather of Imam Hasan and Imam Husayn, our protector and the protector of the two worlds, the Father of Qasim, Muhammad, the son of Abdullah, a light from the light of Allah.\n\nO you who yearns for the light of his beauty, invoke abundant blessings and peace upon him, his family and Companions.",
          },
          words: [
            {
              word: "اللَّهُمَّ",
              translations: { en: "O Allah" },
            },
            {
              word: "صَلِّ",
              translations: { en: "send prayers" },
            },
            {
              word: "عَلَىٰ",
              translations: { en: "upon" },
            },
            {
              word: "سَيِّدِنَا",
              translations: { en: "our master" },
            },
            {
              word: "وَمَوْلَانَا",
              translations: { en: "and patron" },
            },
            {
              word: "مُحَمَّدٍ",
              translations: { en: "Muhammad" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "صَاحِبِ",
              translations: { en: "the possessor of" },
            },
            {
              word: "التَّاجِ",
              translations: { en: "the crown" },
            },
            {
              word: "وَالْمِعْرَاجِ",
              translations: { en: "the Mi'raj" },
            },
            {
              word: "وَالْبُرَاقِ",
              translations: { en: "the Buraq" },
            },
            {
              word: "وَالْعَلَمِ",
              translations: { en: "and the flag" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "دَافِعِ",
              translations: { en: "the repeller of" },
            },
            {
              word: "الْبَلآءِ",
              translations: { en: "hardships" },
            },
            {
              word: "وَالْوَبَآءِ",
              translations: { en: "epidemics" },
            },
            {
              word: "وَالْقَحْطِ",
              translations: { en: "droughts" },
            },
            {
              word: "وَالْمَرَضِ",
              translations: { en: "diseases" },
            },
            {
              word: "وَالْأَلَمِ",
              translations: { en: "and pain" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "اِسْمُهُ",
              translations: { en: "His name is" },
            },
            {
              word: "مَكْتُوبٌ",
              translations: { en: "written" },
            },
            {
              word: "مَرْفُوعٌ",
              translations: { en: "exalted" },
            },
            {
              word: "مَشْفُوعٌ",
              translations: { en: "combined" },
            },
            {
              word: "مَنْقُوشٌ",
              translations: { en: "and engraved" },
            },
            {
              word: "فِي",
              translations: { en: "upon" },
            },
            {
              word: "اللَّوْحِ",
              translations: { en: "the tablet" },
            },
            {
              word: "وَالْقَلَمِ",
              translations: { en: "and pen" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "سَيِّدِ",
              translations: { en: "the master of" },
            },
            {
              word: "الْعَرَبِ",
              translations: { en: "both Arabs" },
            },
            {
              word: "وَالْعَجَمِ",
              translations: { en: "and non-Arabs" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "جِسْمُهُ",
              translations: { en: "whose body" },
            },
            {
              word: "مُقَدَّسٌ",
              translations: { en: "is sanctified" },
            },
            {
              word: "مُعَطَّرٌ",
              translations: { en: "fragrant" },
            },
            {
              word: "مُطَهَّرٌ",
              translations: { en: "pure" },
            },
            {
              word: "مُنَوَّرٌ",
              translations: { en: "and illuminated" },
            },
            {
              word: "فِي",
              translations: { en: "in" },
            },
            {
              word: "الْبَيْتِ",
              translations: { en: "the House" },
            },
            {
              word: "وَالْحَرَمِ",
              translations: { en: "and the Sanctuary" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "شَمْسِ",
              translations: { en: "He is the bright sun" },
            },
            {
              word: "الضُّحَى",
              translations: { en: "" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "بَدْرِ",
              translations: { en: "the full moon of" },
            },
            {
              word: "الدُّجَى",
              translations: { en: "the dark night" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "صَدْرِ",
              translations: { en: "the foremost in" },
            },
            {
              word: "الْعُلَى",
              translations: { en: "loftiness" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "نُورِ",
              translations: { en: "the light of" },
            },
            {
              word: "الْهُدَى",
              translations: { en: "guidance" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "كَهْفِ",
              translations: { en: "the cave of refuge for" },
            },
            {
              word: "الْوَرَى",
              translations: { en: "mankind" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "مِصْبَاحِ",
              translations: { en: "the lantern" },
            },
            {
              word: "الظُّلَمِ",
              translations: { en: "in darkness" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "جَمِيلِ",
              translations: { en: "He is of beautiful" },
            },
            {
              word: "الشِّيَمِ",
              translations: { en: "character" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "شَفِيعِ",
              translations: { en: "the intercessor for" },
            },
            {
              word: "الْأُمَمِ",
              translations: { en: "nations" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "صَاحِبِ",
              translations: { en: "the possessor of" },
            },
            {
              word: "الْجُودِ",
              translations: { en: "graciousness" },
            },
            {
              word: "وَالْكَرَمِ",
              translations: { en: "and generosity" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "وَاللهُ",
              translations: { en: "Allah is" },
            },
            {
              word: "عَاصِمُهُ",
              translations: { en: "his protector" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "وَجِبْرِيلُ",
              translations: { en: "Gabriel" },
            },
            {
              word: "خَادِمُهُ",
              translations: { en: "his servant" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "وَالْبُرَاقُ",
              translations: { en: "the Buraq" },
            },
            {
              word: "مَرْكَبُهُ",
              translations: { en: "his mount" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "وَالْمِعْرَاجُ",
              translations: { en: "the Mi'raj" },
            },
            {
              word: "سَفَرُهُ",
              translations: { en: "his voyage" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "وَسِدْرَتُ",
              translations: { en: "the Lote Tree" },
            },
            {
              word: "الْمُنْتَهَى",
              translations: { en: "of the Uppermost Limit" },
            },
            {
              word: "مَقَامُهُ",
              translations: { en: "his station" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "وَقَابَ",
              translations: { en: "two bows' length" },
            },
            {
              word: "قَوْسَيْنِ",
              translations: { en: "" },
            },
            {
              word: "مَطْلُوبُهُ",
              translations: { en: "the object of his quest" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "وَالْمَطْلُوبُ",
              translations: { en: "that which is sought" },
            },
            {
              word: "مَقْصُودُهُ",
              translations: { en: "is that which he desires" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "وَالْمَقْصُودُ",
              translations: { en: "that which he desires" },
            },
            {
              word: "مَوْجُودُهُ",
              translations: { en: "is that which he finds" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "سَيِّدِ",
              translations: { en: "He is the master of" },
            },
            {
              word: "الْمُرْسَلِينَ",
              translations: { en: "the Messengers" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "خَاتِمِ",
              translations: { en: "the Seal of" },
            },
            {
              word: "النَّبِيِّينَ",
              translations: { en: "the Prophets" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "شَفِيعِ",
              translations: { en: "the intercessor of" },
            },
            {
              word: "الْمُذْنِبِينَ",
              translations: { en: "sinners" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "أَنِيسِ",
              translations: { en: "the comforter of" },
            },
            {
              word: "الْغَرِيبِينَ",
              translations: { en: "strangers" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "رَحْمَةٍ",
              translations: { en: "the mercy" },
            },
            {
              word: "لِلْعَالَمِينَ",
              translations: { en: "for the worlds" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "رَاحَةِ",
              translations: { en: "the delight of" },
            },
            {
              word: "الْعَاشِقِينَ",
              translations: { en: "divine lovers" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "مُرَادِ",
              translations: { en: "the object of" },
            },
            {
              word: "الْمُشْتَاقِينَ",
              translations: { en: "yearning" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "شَمْسِ",
              translations: { en: "the sun of" },
            },
            {
              word: "الْعَارِفِينَ",
              translations: { en: "the gnostics" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "سِرَاجِ",
              translations: { en: "the lamp" },
            },
            {
              word: "السَّالِكِينَ",
              translations: { en: "for travelers upon the path to Allah" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "مِصْبَاحِ",
              translations: { en: "the lantern of" },
            },
            {
              word: "الْمُقَرَّبِينَ",
              translations: { en: "those brought near" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "مُحِبِّ",
              translations: { en: "the lover of" },
            },
            {
              word: "الْفُقَرَاءِ",
              translations: { en: "the poor" },
            },
            {
              word: "وَالْغُرَبَاءِ",
              translations: { en: "the strangers" },
            },
            {
              word: "وَالْمَسَاكِينِ",
              translations: { en: "and the destitute" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "سَيِّدِ",
              translations: { en: "the master of" },
            },
            {
              word: "الثَّقَلَيْنِ",
              translations: { en: "the two weighty things (humans and Jinn)" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "نَبِيِّ",
              translations: { en: "the Prophet of" },
            },
            {
              word: "الْحَرَمَيْنِ",
              translations: { en: "the two sanctuaries" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "إِمَامِ",
              translations: { en: "the Imam of" },
            },
            {
              word: "الْقِبْلَتَيْنِ",
              translations: { en: "the two Qiblas" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "وَسِيلَتِنَا",
              translations: { en: "our means of salvation" },
            },
            {
              word: "فِي",
              translations: { en: "in" },
            },
            {
              word: "الدَّارَيْنِ",
              translations: { en: "both abodes" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "صَاحِبِ",
              translations: { en: "the one at" },
            },
            {
              word: "قَابَ",
              translations: { en: "two bows' length" },
            },
            {
              word: "قَوْسَيْنِ",
              translations: { en: "" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "مَحْبُوبِ",
              translations: { en: "the beloved of" },
            },
            {
              word: "رَبِّ",
              translations: { en: "the Lord of" },
            },
            {
              word: "الْمَشْرِقَيْنِ",
              translations: { en: "the two Easts" },
            },
            {
              word: "وَالْمَغْرِبَيْنِ",
              translations: { en: "and the two Wests" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "جَدِّ",
              translations: { en: "the grandfather of" },
            },
            {
              word: "الْحَسَنِ",
              translations: { en: "Imam Hasan" },
            },
            {
              word: "وَالْحُسَيْنِ",
              translations: { en: "and Imam Husayn" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "مَوْلَانَا",
              translations: { en: "our protector" },
            },
            {
              word: "وَمَوْلَى",
              translations: { en: "and the protector of" },
            },
            {
              word: "الثَّقَلَيْنِ",
              translations: { en: "the two worlds" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "أَبِي",
              translations: { en: "the Father of" },
            },
            {
              word: "الْقَاسِمِ",
              translations: { en: "Qasim" },
            },
            {
              word: "مُحَمَّدِ",
              translations: { en: "Muhammad" },
            },
            {
              word: "بْنِ",
              translations: { en: "the son of" },
            },
            {
              word: "عَبْدِ اللهِ",
              translations: { en: "Abdullah" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "نُورٍ",
              translations: { en: "a light" },
            },
            {
              word: "مِنْ",
              translations: { en: "from" },
            },
            {
              word: "نُورِ اللهِ",
              translations: { en: "the light of Allah" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "يَا",
              translations: { en: "O you" },
            },
            {
              word: "أَيُّهَا",
              translations: { en: "who" },
            },
            {
              word: "الْمُشْتَاقُونَ",
              translations: { en: "yearns" },
            },
            {
              word: "بِنُورِ",
              translations: { en: "for the light" },
            },
            {
              word: "جَمَالِهِ",
              translations: { en: "of his beauty" },
            },
            {
              word: "❁",
              translations: { en: "" },
            },
            {
              word: "صَلّوُا",
              translations: { en: "invoke abundant blessings" },
            },
            {
              word: "عَلَيْهِ",
              translations: { en: "upon him" },
            },
            {
              word: "وَآلِهِ",
              translations: { en: "and his family" },
            },
            {
              word: "وَأَصْحَابِهِ",
              translations: { en: "and Companions" },
            },
            {
              word: "وَسَلِّمُوا",
              translations: { en: "and send peace" },
            },
            {
              word: "تَسْلِيمًا",
              translations: { en: "" },
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
