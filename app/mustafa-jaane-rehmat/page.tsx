"use client";

import React, { Suspense, useState } from "react";
import {
  ChakraProvider,
  Box,
  VStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { NextSeo } from "next-seo";

// Import components
import { Line, SalaamText } from "./SalaamText";
import { AudioPlayer } from "./AudioPlayer";

// Extended sample data
const salaamData: Line[] = [
  {
    urdu: "Mustafa Jaan e Rahmat Pe Laakhoñ Salaam",
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
    urdu: "Sham’e Bazm e Hidaayat Pe Laakhoñ Salaam",
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
    urdu: "Mehr e Charkh e Nubuw’wat Pe Roshan Durood",
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
];

export default function MustafaJaaneRehmatPage() {
  const [currentTime, setCurrentTime] = useState(0);
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.800", "gray.100");

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  return (
    <ChakraProvider>
      <NextSeo
        title="Mustafa Jaane Rehmat - Beautiful Salaam Recitation"
        description="Experience the beautiful recitation of Mustafa Jaane Rehmat with word-by-word translations and meanings."
        canonical="https://your-website.com/mustafa-jaane-rehmat"
        openGraph={{
          url: "https://your-website.com/mustafa-jaane-rehmat",
          title: "Mustafa Jaane Rehmat - Beautiful Salaam Recitation",
          description:
            "Experience the beautiful recitation of Mustafa Jaane Rehmat with word-by-word translations and meanings.",
          images: [
            {
              url: "https://your-website.com/images/mustafa-jaane-rehmat-og.jpg",
              width: 1200,
              height: 630,
              alt: "Mustafa Jaane Rehmat Recitation",
            },
          ],
          site_name: "Your Website Name",
        }}
      />
      <Box minHeight="100vh" bg={bgColor} color={textColor} p={4}>
        <VStack spacing={8} align="stretch">
          <Text fontSize="3xl" fontWeight="bold" textAlign="center">
            Mustafa Jaane Rehmat
          </Text>
          <Suspense fallback={<Text>Loading audio player...</Text>}>
            <AudioPlayer onTimeUpdate={handleTimeUpdate} />
          </Suspense>
          <Suspense fallback={<Text>Loading salaam text...</Text>}>
            <SalaamText lines={salaamData} currentTime={currentTime} />
          </Suspense>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}
