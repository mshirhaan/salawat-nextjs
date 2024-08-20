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
              word: "اللَّهُمَّ",
              translations: { en: "O Allah" },
            },
            {
              word: "صَلِّ",
              translations: { en: "send prayers upon" },
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
              word: "مُحَمَّدٍ",
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
              word: "التَّاجِ",
              translations: { en: "the crown" },
            },
            {
              word: "وَالْمِعْرَاجِ",
              translations: { en: "the Mi’raj" },
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
              word: "اِسْمُهُ",
              translations: { en: "his name" },
            },
            {
              word: "مَكْتُوبٌ",
              translations: { en: "is written" },
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
              translations: { en: "engraved" },
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
              translations: { en: "and the pen" },
            },
            {
              word: "سَيِّدِ",
              translations: { en: "the master of" },
            },
            {
              word: "الْعَرَبِ",
              translations: { en: "Arabs" },
            },
            {
              word: "وَالْعَجَمِ",
              translations: { en: "and non-Arabs" },
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
              translations: { en: "illuminated" },
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
              word: "شَمْسِ",
              translations: { en: "the bright sun" },
            },
            {
              word: "الضُّحَى",
              translations: { en: "of the morning" },
            },
            {
              word: "بَدْرِ",
              translations: { en: "the full moon" },
            },
            {
              word: "الدُّجَى",
              translations: { en: "of the dark night" },
            },
            {
              word: "صَدْرِ",
              translations: { en: "the foremost" },
            },
            {
              word: "الْعُلَى",
              translations: { en: "in loftiness" },
            },
            {
              word: "نُورِ",
              translations: { en: "the light" },
            },
            {
              word: "الْهُدَى",
              translations: { en: "of guidance" },
            },
            {
              word: "كَهْفِ",
              translations: { en: "the cave" },
            },
            {
              word: "الْوَرَى",
              translations: { en: "of refuge" },
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
              word: "جَمِيلِ",
              translations: { en: "of beautiful" },
            },
            {
              word: "الشِّيَمِ",
              translations: { en: "character" },
            },
            {
              word: "شَفِيعِ",
              translations: { en: "the intercessor of" },
            },
            {
              word: "الْأُمَمِ",
              translations: { en: "nations" },
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
              word: "وَاللَّهُ",
              translations: { en: "Allah is" },
            },
            {
              word: "عَاصِمُهُ",
              translations: { en: "his protector" },
            },
            {
              word: "وَجِبْرِيلُ",
              translations: { en: "Gabriel is" },
            },
            {
              word: "خَادِمُهُ",
              translations: { en: "his servant" },
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
              word: "وَالْمِعْرَاجُ",
              translations: { en: "the Mi’raj" },
            },
            {
              word: "سَفَرُهُ",
              translations: { en: "his voyage" },
            },
            {
              word: "وَسِدْرَةُ",
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
              word: "وَقَابَ",
              translations: { en: "two bows" },
            },
            {
              word: "قَوْسَيْنِ",
              translations: { en: "length" },
            },
            {
              word: "مَطْلُوبُهُ",
              translations: { en: "the object of his quest" },
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
              word: "وَالْمَقْصُودُ",
              translations: { en: "and that which he desires" },
            },
            {
              word: "مَوْجُودُهُ",
              translations: { en: "is that which he finds" },
            },
            {
              word: "سَيِّدِ",
              translations: { en: "the master of" },
            },
            {
              word: "الْمُرْسَلِينَ",
              translations: { en: "the Messengers" },
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
              word: "شَفِيعِ",
              translations: { en: "the intercessor of" },
            },
            {
              word: "الْمُذْنِبِينَ",
              translations: { en: "sinners" },
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
              word: "رَحْمَةٍ",
              translations: { en: "the mercy" },
            },
            {
              word: "لِلْعَالَمِينَ",
              translations: { en: "for the worlds" },
            },
            {
              word: "رَاحَةِ",
              translations: { en: "the delight" },
            },
            {
              word: "الْعَاشِقِينَ",
              translations: { en: "of divine lovers" },
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
              word: "شَمْسِ",
              translations: { en: "the sun" },
            },
            {
              word: "الْعَارِفِينَ",
              translations: { en: "of the gnostics" },
            },
            {
              word: "سِرَاجِ",
              translations: { en: "the lamp" },
            },
            {
              word: "السَّالِكِينَ",
              translations: { en: "of the travelers" },
            },
            {
              word: "مِصْبَاحِ",
              translations: { en: "the lantern" },
            },
            {
              word: "الْمُقَرَّبِينَ",
              translations: { en: "of the nearest ones" },
            },
            {
              word: "مُحِبِّ",
              translations: { en: "the beloved" },
            },
            {
              word: "الْفُقَرَاءِ",
              translations: { en: "of the poor" },
            },
            {
              word: "وَالْغُنَاءِ",
              translations: { en: "and the rich" },
            },
            {
              word: "سَيِّدِ",
              translations: { en: "the master of" },
            },
            {
              word: "الثَّقَلَيْنِ",
              translations: { en: "both the worlds" },
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
              word: "إِمَامِ",
              translations: { en: "the Imam of" },
            },
            {
              word: "الْقِبْلَتَيْنِ",
              translations: { en: "the two Qiblas" },
            },
            {
              word: "وَسِيلَتِنَا",
              translations: { en: "our means of intercession" },
            },
            {
              word: "فِي",
              translations: { en: "in" },
            },
            {
              word: "الدَّارَيْنِ",
              translations: { en: "both worlds" },
            },
            {
              word: "صَاحِبِ",
              translations: { en: "the possessor of" },
            },
            {
              word: "قَابَ",
              translations: { en: "two bow lengths" },
            },
            {
              word: "قَوْسَيْنِ",
              translations: { en: "or nearer" },
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
              word: "جَدُّ",
              translations: { en: "the grandfather of" },
            },
            {
              word: "الْحَسَنِ",
              translations: { en: "Hasan" },
            },
            {
              word: "وَالْحُسَيْنِ",
              translations: { en: "and Husayn" },
            },
            {
              word: "مَوْلَانَا",
              translations: { en: "our master" },
            },
            {
              word: "وَمَوْلَى",
              translations: { en: "and the master of" },
            },
            {
              word: "الثَّقَلَيْنِ",
              translations: { en: "both the worlds" },
            },
            {
              word: "أَبِي",
              translations: { en: "the father of" },
            },
            {
              word: "الْقَاسِمِ",
              translations: { en: "al-Qasim" },
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
              word: "نُورٍ",
              translations: { en: "the light of" },
            },
            {
              word: "مِنْ",
              translations: { en: "from" },
            },
            {
              word: "نُورٍ",
              translations: { en: "light" },
            },
            {
              word: "اللَّهُ",
              translations: { en: "Allah" },
            },
            {
              word: "صَلِّ",
              translations: { en: "send blessings" },
            },
            {
              word: "وَسَلِّمْ",
              translations: { en: "and peace" },
            },
            {
              word: "وَبَارِكْ",
              translations: { en: "and bless" },
            },
            {
              word: "عَلَيْهِ",
              translations: { en: "upon him" },
            },
            {
              word: "وَعَلَى",
              translations: { en: "and upon" },
            },
            {
              word: "آلِهِ",
              translations: { en: "his family" },
            },
            {
              word: "وَصَحْبِهِ",
              translations: { en: "and his companions" },
            },
            {
              word: "أَجْمَعِينَ",
              translations: { en: "all of them" },
            },
          ],
        },
      ],
    });

    await addDoc(salawatCollection, {
      title: "Alam Swalath",
      lines: [
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي سَيِّدِنَا مُحَمَّدٍ سَيِّدِ الْمُرْسَلِينَ",
          translations: {
            en: "O Allah, bless and grant peace upon our master Muhammad, The Master of the Messengers.",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "سَيِّدِنَا", translations: { en: "our master" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "سَيِّدِ", translations: { en: "The Master of" } },
            { word: "الْمُرْسَلِينَ", translations: { en: "the Messengers" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي سَيِّدِنَا مُحَمَّدٍ سَيِّدِ الْمُجَاهِدِينَ",
          translations: {
            en: "O Allah, bless and grant peace upon our master Muhammad, The Master of the Mujahideen (those who strive in the path of Allah).",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "سَيِّدِنَا", translations: { en: "our master" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "سَيِّدِ", translations: { en: "The Master of" } },
            {
              word: "الْمُجَاهِدِينَ",
              translations: {
                en: "the Mujahideen (those who strive in the path of Allah)",
              },
            },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي سَيِّدِنَا مُحَمَّدٍ سَيِّدِ الشَّاهِدِينَ",
          translations: {
            en: "O Allah, bless and grant peace upon our master Muhammad, The Master of the Witnesses.",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "سَيِّدِنَا", translations: { en: "our master" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "سَيِّدِ", translations: { en: "The Master of" } },
            { word: "الشَّاهِدِينَ", translations: { en: "the Witnesses" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي سَيِّدِنَا مُحَمَّدٍ سَيِّدِ الْخآئِفِينَ",
          translations: {
            en: "O Allah, bless and grant peace upon our master Muhammad, The Master of those who fear Allah.",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "سَيِّدِنَا", translations: { en: "our master" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "سَيِّدِ", translations: { en: "The Master of" } },
            {
              word: "الْخآئِفِينَ",
              translations: { en: "those who fear Allah" },
            },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي سَيِّدِنَا مُحَمَّدٍ سَيِّدِ الـتّـآئِبِينَ",
          translations: {
            en: "O Allah, bless and grant peace upon our master Muhammad, The Master of those who repent.",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "سَيِّدِنَا", translations: { en: "our master" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "سَيِّدِ", translations: { en: "The Master of" } },
            {
              word: "الـتّـآئِبِينَ",
              translations: { en: "those who repent" },
            },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي سَيِّدِنَا مُحَمَّدٍ سَيِّدِ الْعَابِدِينَ",
          translations: {
            en: "O Allah, bless and grant peace upon our master Muhammad, The Master of the worshippers.",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "سَيِّدِنَا", translations: { en: "our master" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "سَيِّدِ", translations: { en: "The Master of" } },
            { word: "الْعَابِدِينَ", translations: { en: "the worshippers" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي سَيِّدِنَا مُحَمَّدٍ سَيِّدِ الْحَامِدِينَ",
          translations: {
            en: "O Allah, bless and grant peace upon our master Muhammad, The Master of those who praise Allah.",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "سَيِّدِنَا", translations: { en: "our master" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "سَيِّدِ", translations: { en: "The Master of" } },
            {
              word: "الْحَامِدِينَ",
              translations: { en: "those who praise Allah" },
            },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي سَيِّدِنَا مُحَمَّدٍ سَيِّدِ الصَّالِحِينَ",
          translations: {
            en: "O Allah, bless and grant peace upon our master Muhammad, The Master of the righteous.",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "سَيِّدِنَا", translations: { en: "our master" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "سَيِّدِ", translations: { en: "The Master of" } },
            { word: "الصَّالِحِينَ", translations: { en: "the righteous" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي سَيِّدِنَا مُحَمَّدٍ سَيّدِ الرَّاكِعِينَ",
          translations: {
            en: "O Allah, bless and grant peace upon our master Muhammad, The Master of those who are in a state of bowing or praying while bowing down.",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "سَيِّدِنَا", translations: { en: "our master" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "سَيّدِ", translations: { en: "The Master of" } },
            {
              word: "الرَّاكِعِينَ",
              translations: {
                en: "those who are in a state of bowing or praying while bowing down",
              },
            },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي سَيِّدِنَا مُحَمَّدٍ سَيِّدِ السَّاجِدِينَ",
          translations: {
            en: "O Allah, bless and grant peace upon our master Muhammad, The Master of those who prostrate.",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "سَيِّدِنَا", translations: { en: "our master" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "سَيِّدِ", translations: { en: "The Master of" } },
            {
              word: "السَّاجِدِينَ",
              translations: { en: "those who prostrate" },
            },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي سَيِّدِنَا مُحَمَّدٍ سَيِّدِ الْقآئِمِينَ",
          translations: {
            en: "O Allah, bless and grant peace upon our master Muhammad, The Master of those who stand (in worship).",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "سَيِّدِنَا", translations: { en: "our master" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "سَيِّدِ", translations: { en: "The Master of" } },
            {
              word: "الْقآئِمِينَ",
              translations: { en: "those who stand (in worship)" },
            },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي سَيِّدِنَا مُحَمَّدٍ سَيِّدِ الْقَاعِدِينَ",
          translations: {
            en: "O Allah, bless and grant peace upon our master Muhammad, The Master of those who are sitting.",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "سَيِّدِنَا", translations: { en: "our master" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "سَيِّدِ", translations: { en: "The Master of" } },
            {
              word: "الْقَاعِدِينَ",
              translations: { en: "those who are sitting" },
            },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي سَيِّدِنَا مُحَمَّدٍ سَيِّدِ الْمُتَّقِينَ",
          translations: {
            en: "O Allah, bless and grant peace upon our master Muhammad, The Master of the pious.",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "سَيِّدِنَا", translations: { en: "our master" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "سَيِّدِ", translations: { en: "The Master of" } },
            { word: "الْمُتَّقِينَ", translations: { en: "the pious" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي سَيِّدِنَا مُحَمَّدٍ سَيِّدِ الْمُسْتَغْفِرِينَ",
          translations: {
            en: "O Allah, bless and grant peace upon our master Muhammad, The Master of those who seek forgiveness.",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "سَيِّدِنَا", translations: { en: "our master" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "سَيِّدِ", translations: { en: "The Master of" } },
            {
              word: "الْمُسْتَغْفِرِينَ",
              translations: { en: "those who seek forgiveness" },
            },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي سَيِّدِنَا مُحَمَّدٍ سَيِّدِ النَّادِمِينَ",
          translations: {
            en: "O Allah, bless and grant peace upon our master Muhammad, The Master of those who repent.",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "سَيِّدِنَا", translations: { en: "our master" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "سَيِّدِ", translations: { en: "The Master of" } },
            { word: "النَّادِمِينَ", translations: { en: "those who repent" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي سَيِّدِنَا مُحَمَّدٍ سَيِّدِ الشَّاكِرِينَ",
          translations: {
            en: "O Allah, bless and grant peace upon our master Muhammad, The Master of those who are thankful to Allah.",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "سَيِّدِنَا", translations: { en: "our master" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "سَيِّدِ", translations: { en: "The Master of" } },
            {
              word: "الشَّاكِرِينَ",
              translations: { en: "those who are thankful to Allah" },
            },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي سَيِّدِنَا مُحَمَّدٍ سَيِّدِ الْحَافِظِينَ",
          translations: {
            en: "O Allah, bless and grant peace upon our master Muhammad, The Master of the memorizers.",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "سَيِّدِنَا", translations: { en: "our master" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "سَيِّدِ", translations: { en: "The Master of" } },
            { word: "الْحَافِظِينَ", translations: { en: "the memorizers" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي سَيِّدِنَا مُحَمَّدٍ سَيِّدِ الذَّاكِرِينَ",
          translations: {
            en: "O Allah, bless and grant peace upon our master Muhammad, The Master of those who remember.",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "سَيِّدِنَا", translations: { en: "our master" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "سَيِّدِ", translations: { en: "The Master of" } },
            {
              word: "الذَّاكِرِينَ",
              translations: { en: "those who remember" },
            },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي سَيِّدِنَا مُحَمَّدٍ سَيِّدِ الْعَاقِلِينَ",
          translations: {
            en: "O Allah, bless and grant peace upon our master Muhammad, The Master of the wise.",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "سَيِّدِنَا", translations: { en: "our master" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "سَيِّدِ", translations: { en: "The Master of" } },
            { word: "الْعَاقِلِينَ", translations: { en: "the wise" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي سَيِّدِنَا مُحَمَّدٍ سَيِّدِ الْمُحْسِنِينَ",
          translations: {
            en: "O Allah, bless and grant peace upon our master Muhammad, The Master of the doers of good.",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "سَيِّدِنَا", translations: { en: "our master" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "سَيِّدِ", translations: { en: "The Master of" } },
            {
              word: "الْمُحْسِنِينَ",
              translations: { en: "the doers of good" },
            },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي سَيِّدِنَا مُحَمَّدٍ سَيِّدِ الأكْرَمِينَ",
          translations: {
            en: "O Allah, bless and grant peace upon our master Muhammad, The Master of the most generous.",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "سَيِّدِنَا", translations: { en: "our master" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "سَيِّدِ", translations: { en: "The Master of" } },
            { word: "الأكْرَمِينَ", translations: { en: "the most generous" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي سَيِّدِنَا مُحَمَّدٍ سَيِّدِ الْمُنْذِرِينَ",
          translations: {
            en: "O Allah, bless and grant peace upon our master Muhammad, The Master of the warners.",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "سَيِّدِنَا", translations: { en: "our master" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "سَيِّدِ", translations: { en: "The Master of" } },
            { word: "الْمُنْذِرِينَ", translations: { en: "the warners" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي سَيِّدِنَا مُحَمَّدٍ سَيِّدِ الْمُبَشِّرِينَ",
          translations: {
            en: "O Allah, bless and grant peace upon our master Muhammad, The Master of the glad tidings.",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "سَيِّدِنَا", translations: { en: "our master" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "سَيِّدِ", translations: { en: "The Master of" } },
            {
              word: "الْمُبَشِّرِينَ",
              translations: { en: "the glad tidings" },
            },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي سَيِّدِنَا مُحَمَّدٍ سَيِّدِ الطَّيِّبِينَ",
          translations: {
            en: "O Allah, bless and grant peace upon our master Muhammad, The Master of the pure.",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "سَيِّدِنَا", translations: { en: "our master" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "سَيِّدِ", translations: { en: "The Master of" } },
            { word: "الطَّيِّبِينَ", translations: { en: "the pure" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي سَيِّدِنَا مُحَمَّدٍ سَيِّدِ النَّبِيِّينَ",
          translations: {
            en: "O Allah, bless and grant peace upon our master Muhammad, The Master of the Prophets.",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "سَيِّدِنَا", translations: { en: "our master" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "سَيِّدِ", translations: { en: "The Master of" } },
            { word: "النَّبِيِّينَ", translations: { en: "the Prophets" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي سَيِّدِنَا مُحَمَّدٍ سَيّدِ الْعَالَمِينَ",
          translations: {
            en: "O Allah, bless and grant peace upon our master Muhammad, The Master of the worlds.",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "سَيِّدِنَا", translations: { en: "our master" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "سَيِّدِ", translations: { en: "The Master of" } },
            { word: "الْعَالَمِينَ", translations: { en: "the worlds" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي سَيِّدِنَا مُحَمَّدٍ النَّبِيِّ الزَّكِيِّ التَّقِيِّ",
          translations: {
            en: "O Allah, bless and grant peace upon our master Muhammad, The Pure and Pious Prophet.",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "سَيِّدِنَا", translations: { en: "our master" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "النَّبِيِّ", translations: { en: "the Prophet" } },
            { word: "الزَّكِيِّ", translations: { en: "the Pure" } },
            { word: "التَّقِيِّ", translations: { en: "the Pious" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي سَيِّدِنَا مُحَمَّدٍ الْقُرَشِيِّ الْهَاشِمِيِّ",
          translations: {
            en: "O Allah, bless and grant peace upon our master Muhammad, The Quraishi, the Hashemite",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "سَيِّدِنَا", translations: { en: "our master" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "الْقُرَشِيِّ", translations: { en: "The Quraishi" } },
            { word: "الْهَاشِمِيِّ", translations: { en: "the Hashemite" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي سَيِّدِنَا مُحَمَّدٍ الْمَدَنِيِّ الْعَرَبِيِّ الْمُكَرَّمِ يَوْمَ القِيَامَةِ",
          translations: {
            en: "O Allah, bless and grant peace upon our master Muhammad, the Madinan, the Arab, the honored one on the Day of Resurrection.",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "سَيِّدِنَا", translations: { en: "our master" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "الْمَدَنِيِّ", translations: { en: "the Madinan" } },
            { word: "الْعَرَبِيِّ", translations: { en: "the Arab" } },
            { word: "الْمُكَرَّمِ", translations: { en: "the honored one" } },
            { word: "يَوْمَ", translations: { en: "on the Day of" } },
            { word: "القِيَامَةِ", translations: { en: "Resurrection" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي سَيِّدِنَا مُحَمَّدٍ سَيِّدِ اَهْلِ الْجَنَّةِ",
          translations: {
            en: "O Allah, bless and grant peace upon our master Muhammad, The Master of the people of Paradise.",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "سَيِّدِنَا", translations: { en: "our master" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "سَيِّدِ", translations: { en: "The Master of" } },
            { word: "اَهْلِ", translations: { en: "the people of" } },
            { word: "الْجَنَّةِ", translations: { en: "Paradise" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي سَيِّدِنَا مُحَمَّدٍ صَاحِبِ الْمَقَامِ الْمَحْمُودِ",
          translations: {
            en: "O Allah, bless and grant peace upon our master Muhammad, The one who possesses the praiseworthy station.",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "سَيِّدِنَا", translations: { en: "our master" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "صَاحِبِ", translations: { en: "The one who possesses" } },
            { word: "الْمَقَامِ", translations: { en: "the station" } },
            { word: "الْمَحْمُودِ", translations: { en: "praiseworthy" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي سَيِّدِنَا مُحَمَّدٍ صَاحِبِ الصِّرَاطِ الْمُسْتَقِيمِ",
          translations: {
            en: "O Allah, bless and grant peace upon our master Muhammad, The owner of the straight path.",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "سَيِّدِنَا", translations: { en: "our master" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "صَاحِبِ", translations: { en: "The owner of" } },
            { word: "الصِّرَاطِ", translations: { en: "the path" } },
            { word: "الْمُسْتَقِيمِ", translations: { en: "the straight" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي سَيِّدِنَا مُحَمَّدٍ اَفْضَلِ اْلاَوَّلِينَ وَاْلآخِرِينَ",
          translations: {
            en: "O Allah, bless and grant peace upon our master Muhammad, The best of the first and the last.",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "سَيِّدِنَا", translations: { en: "our master" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "اَفْضَلِ", translations: { en: "The best of" } },
            { word: "اْلاَوَّلِينَ", translations: { en: "the first" } },
            { word: "وَاْلآخِرِينَ", translations: { en: "and the last" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي سَيِّدِنَا مُحَمَّدٍ وَعَلَى جَمِيعِ الْمَلآئِكَةِ الْمُقَرَّبِينَ",
          translations: {
            en: "O Allah, bless and grant peace upon our master Muhammad, And upon all the Angels",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "سَيِّدِنَا", translations: { en: "our master" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "وَعَلَى", translations: { en: "And upon" } },
            { word: "جَمِيعِ", translations: { en: "all" } },
            { word: "الْمَلآئِكَةِ", translations: { en: "the Angels" } },
            { word: "الْمُقَرَّبِينَ", translations: { en: "the near ones" } },
          ],
        },
        {
          arabic: "وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ",
          translations: {
            en: "And upon the righteous servants of Allah",
          },
          words: [
            { word: "وَعَلَى", translations: { en: "And upon" } },
            { word: "عِبَادِ", translations: { en: "the servants of" } },
            { word: "اللَّهِ", translations: { en: "Allah" } },
            { word: "الصَّالِحِينَ", translations: { en: "the righteous" } },
          ],
        },

        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي مَنْ سَمَّيْتَهُ ذَاكِرًا وَحَبِيبًا وَمُذَكِّرًا مُحَمَّدٍ رَّسُولِ الله",
          translations: {
            en: "O Allah, bless and grant peace upon The One You named as Caller, Beloved, and a Warner",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "مَنْ", translations: { en: "The One" } },
            { word: "سَمَّيْتَهُ", translations: { en: "You named" } },
            { word: "ذَاكِرًا", translations: { en: "as Caller" } },
            { word: "وَحَبِيبًا", translations: { en: "Beloved" } },
            { word: "وَمُذَكِّرًا", translations: { en: "and a Warner" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "رَّسُولِ", translations: { en: "the Messenger of" } },
            { word: "الله", translations: { en: "Allah" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي مَنْ سَمَّيْتَهُ اَحْمَدًا وَمُحَمَّدًا وَسَيِّدًا مُحَمَّدٍ رَّسُولِ الله",
          translations: {
            en: "O Allah, bless and grant peace upon The One You named as Ahmad, Muhammad, and the Master",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "مَنْ", translations: { en: "The One" } },
            { word: "سَمَّيْتَهُ", translations: { en: "You named" } },
            { word: "اَحْمَدًا", translations: { en: "Ahmad" } },
            { word: "وَمُحَمَّدًا", translations: { en: "and Muhammad" } },
            { word: "وَسَيِّدًا", translations: { en: "and the Master" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "رَّسُولِ", translations: { en: "the Messenger of" } },
            { word: "الله", translations: { en: "Allah" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي مَنْ سَمَّيْتَهُ صَابِرًا وَنَبِيًّا وَمُرَاقِبًا مُحَمَّدٍ رَّسُولِ الله",
          translations: {
            en: "O Allah, bless and grant peace upon The One You named as Patient, a Prophet, and an Observer",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "مَنْ", translations: { en: "The One" } },
            { word: "سَمَّيْتَهُ", translations: { en: "You named" } },
            { word: "صَابِرًا", translations: { en: "Patient" } },
            { word: "وَنَبِيًّا", translations: { en: "and a Prophet" } },
            { word: "وَمُرَاقِبًا", translations: { en: "and an Observer" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "رَّسُولِ", translations: { en: "the Messenger of" } },
            { word: "الله", translations: { en: "Allah" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي مَنْ سَمَّيْتَهُ عَالِيًا وَرَحِيمًا مُحَمَّدٍ رَّسُولِ اللهِ",
          translations: {
            en: "O Allah, bless and grant peace upon The One You named as Exalted and Merciful",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "مَنْ", translations: { en: "The One" } },
            { word: "سَمَّيْتَهُ", translations: { en: "You named" } },
            { word: "عَالِيًا", translations: { en: "Exalted" } },
            { word: "وَرَحِيمًا", translations: { en: "and Merciful" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "رَّسُولِ", translations: { en: "the Messenger of" } },
            { word: "اللهِ", translations: { en: "Allah" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي مَنْ سَمَّيْتَهُ عَاقِبًا وَكَرِيمًا مُحَمَّدٍ رَّسُولِ الله",
          translations: {
            en: "O Allah, bless and grant peace upon The One You named as The Last and Generous",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "مَنْ", translations: { en: "The One" } },
            { word: "سَمَّيْتَهُ", translations: { en: "You named" } },
            { word: "عَاقِبًا", translations: { en: "The Last" } },
            { word: "وَكَرِيمًا", translations: { en: "and Generous" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "رَّسُولِ", translations: { en: "the Messenger of" } },
            { word: "الله", translations: { en: "Allah" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي مَنْ سَمَّيْتَهُ عَدْلاً وَجَوَادًا وَمُزَمِّلاً مُحَمَّدٍ رَّسُولِ االلهِ",
          translations: {
            en: "O Allah, bless and grant peace upon The One You named as Just, Generous, and Modest",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "مَنْ", translations: { en: "The One" } },
            { word: "سَمَّيْتَهُ", translations: { en: "You named" } },
            { word: "عَدْلاً", translations: { en: "Just" } },
            { word: "وَجَوَادًا", translations: { en: "and Generous" } },
            { word: "وَمُزَمِّلاً", translations: { en: "and Modest" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "رَّسُولِ", translations: { en: "the Messenger of" } },
            { word: "اللهِ", translations: { en: "Allah" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي مَنْ سَمَّيْتَهُ قَاسِمًا وَمَهْدِيًّا وَهَادِيًا مُحَمَّدٍ رَّسُولِ الله",
          translations: {
            en: "O Allah, bless and grant peace upon The One You named as a Distributor, a Guided one, and a Guide",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "مَنْ", translations: { en: "The One" } },
            { word: "سَمَّيْتَهُ", translations: { en: "You named" } },
            { word: "قَاسِمًا", translations: { en: "a Distributor" } },
            { word: "وَمَهْدِيًّا", translations: { en: "and a Guided one" } },
            { word: "وَهَادِيًا", translations: { en: "and a Guide" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "رَّسُولِ", translations: { en: "the Messenger of" } },
            { word: "الله", translations: { en: "Allah" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي مَنْ سَمَّيْتَهُ شَكُورًا وَحَرِيصًا مُحَمَّدٍ رَّسُولِ االلهِ",
          translations: {
            en: "O Allah, bless and grant peace upon The One You named as Thankful and Enthusiastic",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "مَنْ", translations: { en: "The One" } },
            { word: "سَمَّيْتَهُ", translations: { en: "You named" } },
            { word: "شَكُورًا", translations: { en: "Thankful" } },
            { word: "وَحَرِيصًا", translations: { en: "and Enthusiastic" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "رَّسُولِ", translations: { en: "the Messenger of" } },
            { word: "اللهِ", translations: { en: "Allah" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي مَنْ سَمَّيْتَهُ قَائِمًا وَصَفِيَّا وَعَبْدَ الله مُحَمَّدٍ رَّسُولِ الله",
          translations: {
            en: "O Allah, bless and grant peace upon The One You named as Steadfast, Sincere, and the Servant of Allah",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "مَنْ", translations: { en: "The One" } },
            { word: "سَمَّيْتَهُ", translations: { en: "You named" } },
            { word: "قَائِمًا", translations: { en: "Steadfast" } },
            { word: "وَصَفِيَّا", translations: { en: "and Sincere" } },
            { word: "وَعَبْدَ", translations: { en: "and the Servant of" } },
            { word: "الله", translations: { en: "Allah" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "رَّسُولِ", translations: { en: "the Messenger of" } },
            { word: "الله", translations: { en: "Allah" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي مَنْ سَمَّيْتَهُ شَاهِدًا وَبَصِيرًا وَمَهْدِيَّا مُحَمَّدٍ رَّسُولِ اللهِ",
          translations: {
            en: "O Allah, bless and grant peace upon The One You named as a Witness, Insightful, and Guided",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "مَنْ", translations: { en: "The One" } },
            { word: "سَمَّيْتَهُ", translations: { en: "You named" } },
            { word: "شَاهِدًا", translations: { en: "a Witness" } },
            { word: "وَبَصِيرًا", translations: { en: "and Insightful" } },
            { word: "وَمَهْدِيَّا", translations: { en: "and Guided" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "رَّسُولِ", translations: { en: "the Messenger of" } },
            { word: "اللهِ", translations: { en: "Allah" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي مَنْ سَمَّيْتَهُ بَاهِيًا وَنُورًا مَكِّيًّا مُحَمَّدٍ رَّسُولِ الله",
          translations: {
            en: "O Allah, bless and grant peace upon The One You named as Beautiful, a Light, from Makkah",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "مَنْ", translations: { en: "The One" } },
            { word: "سَمَّيْتَهُ", translations: { en: "You named" } },
            { word: "بَاهِيًا", translations: { en: "Beautiful" } },
            { word: "وَنُورًا", translations: { en: "and a Light" } },
            { word: "مَكِّيًّا", translations: { en: "from Makkah" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "رَّسُولِ", translations: { en: "the Messenger of" } },
            { word: "الله", translations: { en: "Allah" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي مَنْ سَمَّيْتَهُ شَاكِرًا وَوَلِيًّا وَنَذِيرًا مُحَمَّدٍ رَسُولِ الله",
          translations: {
            en: "O Allah, bless and grant peace upon The One You named as Grateful, a Guardian, and a Warner",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "مَنْ", translations: { en: "The One" } },
            { word: "سَمَّيْتَهُ", translations: { en: "You named" } },
            { word: "شَاكِرًا", translations: { en: "Grateful" } },
            { word: "وَوَلِيًّا", translations: { en: "and a Guardian" } },
            { word: "وَ نَذِيرًا", translations: { en: "and a Warner" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "رَسُولِ", translations: { en: "the Messenger of" } },
            { word: "الله", translations: { en: "Allah" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي مَنْ سَمَّيْتَهُ بُرْهَانًا صَحِيحًا وَشَرِيفًا مُحَمَّدٍ رَّسُولِ الله",
          translations: {
            en: "O Allah, bless and grant peace upon The One You named as a True Evidence and Honorable",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "مَنْ", translations: { en: "The One" } },
            { word: "سَمَّيْتَهُ", translations: { en: "You named" } },
            { word: "بُرْهَانًا", translations: { en: "a True Evidence" } },
            { word: "صَحِيحًا", translations: { en: "and Honorable" } },
            { word: "وَشَرِيفًا", translations: { en: "and Noble" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "رَّسُولِ", translations: { en: "the Messenger of" } },
            { word: "الله", translations: { en: "Allah" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي مَنْ سَمَّيْتَهُ طَاهِرًا وَصَفِيَّا وَمُخْتَارًا مُحَمَّدٍ رَّسُولِ الله",
          translations: {
            en: "O Allah, bless and grant peace upon The One You named as Pure, Noble, and Chosen",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "مَنْ", translations: { en: "The One" } },
            { word: "سَمَّيْتَهُ", translations: { en: "You named" } },
            { word: "طَاهِرًا", translations: { en: "Pure" } },
            { word: "وَصَفِيَّا", translations: { en: "and Noble" } },
            { word: "وَمُخْتَارًا", translations: { en: "and Chosen" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "رَّسُولِ", translations: { en: "the Messenger of" } },
            { word: "الله", translations: { en: "Allah" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي مَنْ سَمَّيْتَهُ مُسْلِمًا وَرَؤُفًا مُحَمَّدٍ رَّسُولِ الله",
          translations: {
            en: "O Allah, bless and grant peace upon The One You named as a Muslim and Compassionate",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "مَنْ", translations: { en: "The One" } },
            { word: "سَمَّيْتَهُ", translations: { en: "You named" } },
            { word: "مُسْلِمًا", translations: { en: "a Muslim" } },
            { word: "وَرَؤُفًا", translations: { en: "and Compassionate" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "رَّسُولِ", translations: { en: "the Messenger of" } },
            { word: "الله", translations: { en: "Allah" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي مَنْ سَمَّيْتَهُ مُؤْمِنًا وَحَلِيمًا مُحَمَّدٍ رَّسُولِ الله",
          translations: {
            en: "O Allah, bless and grant peace upon The One You named as a Believer and Forbearing",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "مَنْ", translations: { en: "The One" } },
            { word: "سَمَّيْتَهُ", translations: { en: "You named" } },
            { word: "مُؤْمِنًا", translations: { en: "a Believer" } },
            { word: "وَحَلِيمًا", translations: { en: "and Forbearing" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "رَّسُولِ", translations: { en: "the Messenger of" } },
            { word: "الله", translations: { en: "Allah" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي مَنْ سَمَّيْتَهُ قآئِمًا وَمَحْمُودًا وَحَامِدًا مُحَمَّدٍ رَّسُولِ الله",
          translations: {
            en: "O Allah, bless and grant peace upon The One You named as Steadfast, Praised, and Praiseworthy",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "مَنْ", translations: { en: "The One" } },
            { word: "سَمَّيْتَهُ", translations: { en: "You named" } },
            { word: "قَائِمًا", translations: { en: "Steadfast" } },
            { word: "وَمَحْمُودًا", translations: { en: "and Praised" } },
            { word: "وَحَامِدًا", translations: { en: "and Praiseworthy" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "رَّسُولِ", translations: { en: "the Messenger of" } },
            { word: "الله", translations: { en: "Allah" } },
          ],
        },
        {
          arabic:
            "اَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَي مَنْ سَمَّيْتَهُ مِصْبَاحًا وَ آمِرًا وَنَاهِيًا مُحَمَّدٍ رَّسُولِ الله",
          translations: {
            en: "O Allah, bless and grant peace upon The One You named as a Lamp (source of guidance and illumination), a Commander, and a Forbider",
          },
          words: [
            { word: "اَللَّهُمَّ", translations: { en: "O Allah" } },
            { word: "صَلِّ", translations: { en: "bless" } },
            { word: "وَسَلِّمْ", translations: { en: "and grant peace" } },
            { word: "عَلَي", translations: { en: "upon" } },
            { word: "مَنْ", translations: { en: "The One" } },
            { word: "سَمَّيْتَهُ", translations: { en: "You named" } },
            {
              word: "مِصْبَاحًا",
              translations: {
                en: "a Lamp (source of guidance and illumination)",
              },
            },
            { word: "وَآمِرًا", translations: { en: "a Commander" } },
            { word: "وَنَاهِيًا", translations: { en: "and a Forbider" } },
            { word: "مُحَمَّدٍ", translations: { en: "Muhammad" } },
            { word: "رَّسُولِ", translations: { en: "the Messenger of" } },
            { word: "الله", translations: { en: "Allah" } },
          ],
        },
        {
          arabic:
            "صَلَّ الله عَلَيْهِ وَعَلَى آلِهِ وَصَحْبِهِ وَأَزْوَاجِهِ وَذُرِّيَّاتِهِ وَأَهْلِ بَيْتِهِ وَعَنْ كُلِ الصَّحَابَةِ أَجْمَعِينَ آمِينَ",
          translations: {
            en: "May Allah's blessings and peace be upon him, his family, his companions, his wives, his descendants, the people of his household, and all of his companions, collectively. Aameen",
          },
          words: [
            { word: "صَلَّ", translations: { en: "May Allah's blessings" } },
            { word: "الله", translations: { en: "be upon" } },
            { word: "عَلَيْهِ", translations: { en: "him" } },
            { word: "وَعَلَى", translations: { en: "and" } },
            { word: "آلِهِ", translations: { en: "his family" } },
            { word: "وَصَحْبِهِ", translations: { en: "his companions" } },
            { word: "وَأَزْوَاجِهِ", translations: { en: "his wives" } },
            {
              word: "وَذُرِّيَّاتِهِ",
              translations: { en: "his descendants" },
            },
            {
              word: "وَأَهْلِ بَيْتِهِ",
              translations: { en: "the people of his household" },
            },
            { word: "وَعَنْ", translations: { en: "and" } },
            { word: "كُلِ", translations: { en: "all of" } },
            { word: "الصَّحَابَةِ", translations: { en: "his companions" } },
            { word: "أَجْمَعِينَ", translations: { en: "collectively" } },
            { word: "آمِينَ", translations: { en: "Aameen" } },
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
