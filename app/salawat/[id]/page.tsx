import {
  Box,
  Heading,
  Text,
  Button,
  Tooltip,
  Select,
  Stack,
  Divider,
} from "@chakra-ui/react";

import { ReactNode, Suspense } from "react";

import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import ClientSideCounter from "./ClientSideCounter";
import TooltipWithTouch from "./TooltipWithTouch";

interface SalawatWord {
  word: string;
  translations: { [key: string]: string };
}

interface SalawatLine {
  arabic: string;
  translations: { [key: string]: string };
  words: SalawatWord[];
}

interface SalawatData {
  title: string;
  lines: SalawatLine[];
}

async function getSalawatData(id: string): Promise<SalawatData> {
  const salawatRef = doc(db, "salawat", id);
  const salawatSnap = await getDoc(salawatRef);

  if (!salawatSnap.exists()) {
    throw new Error("Salawat not found");
  }

  return salawatSnap.data() as SalawatData;
}

export default async function SalawatPage({
  params,
}: {
  params: { id: string };
}) {
  const salawat = await getSalawatData(params.id);

  const language = "en";
  const renderArabicTextWithTooltips = (
    arabicText: string,
    words: SalawatWord[]
  ) => {
    const wordMap = new Map(
      words.map((word) => [
        word.word,
        (word.translations && word.translations[language]) || "",
      ])
    );

    return (
      <Text
        fontFamily="'Uthmanic', 'Amiri', serif"
        fontSize="2xl"
        color="white"
        textAlign="center"
        lineHeight="1.8"
      >
        {arabicText.split(" ").map((word, index) => (
          <Suspense key={index} fallback={<span>{word} </span>}>
            <TooltipWithTouch label={wordMap.get(word) || ""} hasArrow>
              <Text
                as="span"
                display="inline"
                cursor="pointer"
                _hover={{ color: "teal.500" }}
                transition="color 0.3s ease"
              >
                {word}
              </Text>
            </TooltipWithTouch>{" "}
          </Suspense>
        ))}
      </Text>
    );
  };

  return (
    <Box position="relative" minHeight="100vh" overflow="hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        // src="https://cdn.pixabay.com/video/2022/03/30/112361-694236354_large.mp4"
        src="https://cdn.pixabay.com/video/2024/01/26/198164-906869460_large.mp4"
        style={{
          position: "fixed", // Changed to fixed
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      />

      {/* Overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        background="rgba(0, 0, 0, 0.5)" // Semi-transparent overlay
        zIndex={0}
      />

      {/* Content */}
      <Box
        position="relative"
        zIndex={1}
        p={5}
        height="calc(100vh - 100px)" // Adjust height to leave space for the button
        overflowY="auto" // Scrollable content
        pb="100px" // Space for the button
      >
        <Heading as="h2" size="lg" mb={6} textAlign="center" color="white">
          {salawat.title}
        </Heading>
        {/* <Stack spacing={4} mb={6} align="center">
              <Select
                width="auto"
                onChange={(e) => setLanguage(e.target.value)}
                value={language}
                variant="outline"
                placeholder="Select Language"
                size="lg"
                color="white"
                borderColor="white"
                _focus={{ borderColor: "teal.500" }}
              >
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
              </Select>
            </Stack> */}
        {salawat.lines.map((line, index) => (
          <Box key={index} mb={6}>
            {renderArabicTextWithTooltips(line.arabic, line.words)}
            <Text mb={4} fontSize="md" color="gray.200" textAlign="center">
              {line.translations[language]}
            </Text>
            {index < salawat.lines.length - 1 && (
              <Divider my={4} borderColor="gray.200" />
            )}
          </Box>
        ))}

        {/* Improved Button with Vibration */}
        <Suspense fallback={<div>Loading counter...</div>}>
          <ClientSideCounter />
        </Suspense>
      </Box>
    </Box>
  );
}
